#!/usr/bin/env node
/**
 * C1 批量机器翻译流水线（免密钥引擎版）
 * 引擎：LibreTranslate 公共实例（主）+ MyMemory（兜底），均无需 API key
 * 用法：
 *   node pipeline/mt.js --probe                 # 探测引擎连通性/长度上限/限流
 *   node pipeline/mt.js --scope guide --limit 2 # 试跑某段
 *   node pipeline/mt.js --scope stage-1         # 整段翻译
 *   node pipeline/mt.js --all                   # 全量
 *   node pipeline/mt.js --all --force           # 覆盖已有译文
 * 特性：断点续跑、代码块不翻译、术语表强制统一、429 指数退避、逐文件日志
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const EN = path.join(ROOT, 'source', 'en');
const ZH = path.join(ROOT, 'source', 'zh');
const LOGF = path.join(ROOT, 'pipeline', 'mt.log');

const MAIN = 'https://translate.disroot.org/translate';
const FALLBACK = 'https://api.mymemory.translated.net/get';
const LLM_KEY = process.env.MT_LLM_KEY || '';
const LLM_BASE = (process.env.MT_LLM_BASE || 'https://api.deepseek.com').replace(/\/$/, '');
const LLM_MODEL = process.env.MT_LLM_MODEL || 'deepseek-chat';
const LIMIT = Number(process.env.MT_LIMIT || (LLM_KEY ? 3000 : 460));
const SLEEP = Number(process.env.MT_SLEEP || 2500);

const args = process.argv.slice(2);
const has = (f) => args.includes(f);
const val = (f, d) => { const i = args.indexOf(f); return i >= 0 ? args[i + 1] : d; };
const SCOPE = val('--scope', null);
const LIMITN = Number(val('--limit', 0)) || 0;
const FORCE = has('--force');
const PROBE = has('--probe');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
function log(line) {
  const s = `[${new Date().toISOString()}] ${line}`;
  fs.appendFileSync(LOGF, s + '\n');
  console.log(s);
}

// ---------- 术语表 ----------
function loadGlossary() {
  const p = path.join(ROOT, '术语表.md');
  if (!fs.existsSync(p)) return [];
  const pairs = [];
  for (const line of fs.readFileSync(p, 'utf8').split('\n')) {
    const t = line.trim();
    if (!t.startsWith('|') || /^\|[\s:|-]+\|$/.test(t)) continue;
    const c = t.split('|').map((x) => x.trim());
    // | 英文 | 中文 | 说明 |  -> c[1]=英文 c[2]=中文
    if (c.length >= 4 && c[1] && c[2] && c[1].length > 1 && !/^英文$|^原文$/i.test(c[1])) {
      if (/[a-zA-Z]/.test(c[1]) && /[\u4e00-\u9fa5]/.test(c[2])) pairs.push([c[1], c[2]]);
    }
  }
  return pairs;
}
const GLOSSARY = loadGlossary();

// ---------- 引擎 ----------
async function post(url, body, timeout = 40000) {
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), timeout);
  try {
    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: ac.signal,
    });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    const j = await r.json();
    const out = j.translatedText;
    if (typeof out !== 'string' || !out.trim()) throw new Error('empty');
    return out;
  } finally { clearTimeout(t); }
}

async function viaMain(text) {
  return post(MAIN, { q: text, source: 'en', target: 'zh', format: 'text' });
}

async function viaFallback(text) {
  const u = `${FALLBACK}?q=${encodeURIComponent(text)}&langpair=en|zh-CN&de=c1-pipeline%40example.com`;
  const r = await fetch(u, { signal: AbortSignal.timeout(40000) });
  if (!r.ok) throw new Error('HTTP ' + r.status);
  const j = await r.json();
  const out = j?.responseData?.translatedText || '';
  if (!out.trim() || /MYMEMORY WARNING/i.test(out)) throw new Error('quota/empty');
  return out;
}

async function viaLLM(text) {
  const sys = [
    '你是资深技术文档译者，把用户给的英文 Markdown 技术教程翻译成简体中文。',
    '硬性要求：1) 只输出译文，不要任何解释或前后缀；',
    '2) 完整保持 Markdown 结构：标题层级、列表、表格、链接、图片、围栏代码块、行内代码一律原样保留；',
    '3) 代码、命令、URL、文件路径、变量名、产品名不翻译；4) 术语必须与下方术语表完全一致。',
    '术语表（英文=中文）：' + GLOSSARY.map(([e, c]) => `${e}=${c}`).join('；'),
  ].join('\n');
  const r = await fetch(`${LLM_BASE}/chat/completions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${LLM_KEY}` },
    body: JSON.stringify({
      model: LLM_MODEL,
      temperature: 0.2,
      messages: [{ role: 'system', content: sys }, { role: 'user', content: text }],
    }),
    signal: AbortSignal.timeout(180000),
  });
  if (!r.ok) throw new Error('LLM HTTP ' + r.status + ' ' + (await r.text()).slice(0, 140));
  const j = await r.json();
  const out = j?.choices?.[0]?.message?.content || '';
  if (!out.trim()) throw new Error('LLM empty');
  return out.replace(/^```(?:markdown|md)?\s*\n/, '').replace(/\n```\s*$/, '').trim();
}

let sleepMs = SLEEP;
async function translate(text) {
  if (LLM_KEY) {
    let last;
    for (let a = 1; a <= 3; a++) {
      try { return await viaLLM(text); }
      catch (e) { last = e; await sleep(1200 * a); }
    }
    throw last;
  }
  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      const out = await viaMain(text);
      if (attempt > 1) sleepMs = Math.max(1200, sleepMs - 500);
      return out;
    } catch (e) {
      if (attempt === 4) break;
      await sleep(sleepMs);
      sleepMs = Math.min(20000, Math.round(sleepMs * 1.8));
    }
  }
  try { return await viaFallback(text); }
  catch (e) { throw new Error('both engines failed: ' + e.message); }
}

// ---------- 分块 ----------
function buildSegments(md) {
  const lines = md.replace(/\r\n/g, '\n').split('\n');
  const segs = [];
  let buf = [], fence = false, front = false;
  const flush = () => { if (buf.length) { segs.push({ text: buf.join('\n'), code: fence }); buf = []; } };
  for (let i = 0; i < lines.length; i++) {
    const L = lines[i];
    if (/^```/.test(L.trim())) {
      if (!fence) { flush(); fence = true; buf.push(L); }
      else { buf.push(L); flush(); fence = false; }
      continue;
    }
    if (fence) { buf.push(L); continue; }
    if (i === 0 && L.trim() === '---') { front = true; }
    if (front) { buf.push(L); if (i > 0 && L.trim() === '---') { front = false; flush(); } continue; }
    if (L.trim() === '') { flush(); segs.push({ text: '', code: false }); continue; }
    if (/^#{1,6}\s/.test(L.trim())) { flush(); segs.push({ text: L, code: false }); continue; }
    buf.push(L);
  }
  flush();
  return segs;
}

function chunkList(items) {
  const chunks = [];
  let cur = [];
  let n = 0;
  for (const s of items) {
    const len = s.text.length + 2;
    if (n + len > LIMIT && cur.length) { chunks.push(cur); cur = []; n = 0; }
    cur.push(s); n += len;
  }
  if (cur.length) chunks.push(cur);
  return chunks;
}

// ---------- 术语统一 ----------
function applyGlossary(zh) {
  let out = zh;
  for (const [en, cn] of GLOSSARY) {
    if (!en) continue;
    const re = new RegExp(`(?<![A-Za-z])${en.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?![A-Za-z])`, 'gi');
    out = out.replace(re, cn);
  }
  return out.replace(/([\u4e00-\u9fa5])([A-Za-z0-9])/g, '$1 $2')
            .replace(/([A-Za-z0-9])([\u4e00-\u9fa5])/g, '$1 $2');
}

async function translateMarkdown(md) {
  const segs = buildSegments(md);
  const todo = segs
    .map((s, i) => ({ i, text: s.text }))
    .filter((j) => !segs[j.i].code && j.text.trim() && !/^---$/.test(j.text.trim()));
  const out = new Array(segs.length).fill(null);

  for (const ch of chunkList(todo)) {
    const joined = ch.map((j) => j.text).join('\n\n');
    let parts = null;
    try {
      const res = await translate(joined);
      const p = res.split(/\n{2,}/);
      if (p.length === ch.length) parts = p;   // 段落数一致才批量回填
    } catch (e) {
      log('  !! chunk 失败: ' + e.message);
    }
    if (parts) {
      ch.forEach((j, k) => { out[j.i] = parts[k]; });
      await sleep(sleepMs);
    } else {
      for (const j of ch) {                    // 段落错位则逐段重译，保证不串行
        try { out[j.i] = await translate(j.text); }
        catch (e2) { log('  !! seg 失败: ' + e2.message); }
        await sleep(sleepMs);
      }
    }
  }
  return segs
    .map((s, i) => (s.code || !s.text.trim() ? s.text : out[i] == null ? s.text : out[i]))
    .join('\n');
}

// ---------- 主流程 ----------
function walk(dir, base = dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, base, acc);
    else if (e.name.endsWith('.md')) acc.push(path.relative(base, p));
  }
  return acc.sort();
}

async function main() {
  if (PROBE) {
    log('PROBE 主引擎 ...');
    for (const n of [200, 460]) {
      const txt = ('Vibe coding is a new way of building software with AI. '.repeat(20)).slice(0, n);
      const t0 = Date.now();
      try { const o = await viaMain(txt); log(`  len=${n} OK ${Date.now() - t0}ms -> ${o.slice(0, 50)}`); }
      catch (e) { log(`  len=${n} FAIL ${Date.now() - t0}ms ${e.message}`); }
      await sleep(SLEEP);
    }
    return;
  }
  fs.mkdirSync(ZH, { recursive: true });
  let files = walk(EN);
  if (!has('--all')) files = files.filter((f) => SCOPE && f.startsWith(SCOPE));
  if (LIMITN) files = files.slice(0, LIMITN);
  log(`开始：${files.length} 个文件，术语表 ${GLOSSARY.length} 条，间隔 ${sleepMs}ms`);
  let done = 0, skipped = 0, chars = 0, failed = 0;
  const t0 = Date.now();
  for (const rel of files) {
    const src = path.join(EN, rel);
    const dst = path.join(ZH, rel);
    if (fs.existsSync(dst) && !FORCE) { skipped++; continue; }
    fs.mkdirSync(path.dirname(dst), { recursive: true });
    try {
      const md = fs.readFileSync(src, 'utf8');
      const zh = applyGlossary(await translateMarkdown(md));
      fs.writeFileSync(dst, zh, 'utf8');
      done++; chars += md.length;
      log(`  ✓ ${rel} (${md.length} -> ${zh.length} 字符)`);
    } catch (e) {
      failed++;
      log(`  ✗ ${rel} 失败: ${e.message}`);
    }
  }
  const mins = ((Date.now() - t0) / 60000).toFixed(1);
  log(`结束：完成 ${done}，跳过 ${skipped}，失败 ${failed}，源字符 ${chars}，用时 ${mins} 分钟`);
}

main().catch((e) => { log('FATAL ' + e.stack); process.exit(1); });
