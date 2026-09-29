#!/usr/bin/env node
'use strict';
/**
 * bing.js —— 批量课程翻译引擎（基于 cn.bing.com/ttranslatev3，免密钥、国内可达）
 *
 * 关键能力：
 *  1) 会话自动引导：抓取页面里的 IG / IID / token / key + Cookie，token 到期（1h）自动刷新
 *  2) 失败自愈：ShowCaptcha / 429 / 网络错误 → 重建会话 + 指数退避重试
 *  3) 断点续跑：已存在且未被截断的译文自动跳过（--force 强制重译）
 *  4) 结构保护：围栏代码块与行内代码不翻译；段落分批送译，段落数校验失败则逐段回退
 *  5) 术语统一：读取「术语表.md」，译文中的英文术语按表统一为中文译法
 *  6) 逐文件日志 pipeline/bing.log + 结束打印覆盖率
 *
 * 用法：
 *   node pipeline/bing.js --probe                  # 会话连通性自检
 *   node pipeline/bing.js --scope guide            # 只译 guide 目录
 *   node pipeline/bing.js --scope guide --limit 2  # 只译前 2 个文件
 *   node pipeline/bing.js --all                    # 全量（断点续跑）
 *   node pipeline/bing.js --all --force            # 全量强制重译
 * 环境变量：TR_LIMIT(单请求字符上限,默认3500) TR_SLEEP(请求间隔ms,默认1200)
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const EN = path.join(ROOT, 'source/en');
const ZH = path.join(ROOT, 'source/zh');
const LOGF = path.join(__dirname, 'bing.log');
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';
const LIMIT = Number(process.env.TR_LIMIT || 3500);
const SLEEP = Number(process.env.TR_SLEEP || 1200);
const MIN_RATIO = 0.3;

const argv = process.argv.slice(2);
const argOf = (k) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : null; };
const has = (k) => argv.includes(k);
const SCOPE = argOf('--scope');
const LIMIT_FILES = Number(argOf('--limit') || 0);
const FORCE = has('--force');
const PROBE = has('--probe');

let session = null;
const stats = { files: 0, skipped: 0, req: 0, chars: 0, failed: 0 };

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
function log(msg) {
  const line = `[${new Date().toISOString()}] ${msg}`;
  console.log(line);
  try { fs.appendFileSync(LOGF, line + '\n'); } catch (e) {}
}

/* ---------------- 会话 ---------------- */
async function newSession() {
  const r = await fetch('https://cn.bing.com/translator', {
    headers: { 'User-Agent': UA, 'Accept-Language': 'zh-CN,zh;q=0.9' },
    signal: AbortSignal.timeout(30000)
  });
  const html = await r.text();
  const jar = {};
  const sc = typeof r.headers.getSetCookie === 'function' ? r.headers.getSetCookie() : [r.headers.get('set-cookie') || ''];
  for (const c of sc) {
    const kv = String(c).split(';')[0];
    const i = kv.indexOf('=');
    if (i > 0) jar[kv.slice(0, i).trim()] = kv.slice(i + 1).trim();
  }
  const m = html.match(/params_AbusePreventionHelper\s*=\s*\[(\d+),"([^"]+)",(\d+)\]/);
  const ig = (html.match(/IG:"([^"]+)"/) || [])[1];
  const iid = (html.match(/data-iid="([^"]+)"/) || [])[1];
  if (!m || !ig || !iid) throw new Error('会话初始化失败（页面结构变化或网络受限）');
  session = { jar, key: m[1], token: m[2], ttl: Number(m[3]), ig, iid, born: Date.now() };
  log(`  会话刷新 IG=${ig.slice(0, 8)}… token=${m[2].slice(0, 6)}… ttl=${Math.round(Number(m[3]) / 60000)}min`);
  return session;
}

async function tt(text, tries = 4) {
  let last = null;
  for (let a = 0; a < tries; a++) {
    try {
      if (!session || Date.now() - session.born > session.ttl - 120000) await newSession();
      const cookie = Object.entries(session.jar).map(([k, v]) => `${k}=${v}`).join('; ');
      const body = new URLSearchParams({
        fromLang: 'en', text, to: 'zh-Hans',
        token: session.token, key: session.key,
        tryFetchingGenderDebiasedTranslations: 'true'
      });
      const r = await fetch(`https://cn.bing.com/ttranslatev3?isVertical=1&IG=${session.ig}&IID=${session.iid}`, {
        method: 'POST',
        headers: {
          'User-Agent': UA, 'Content-Type': 'application/x-www-form-urlencoded',
          Referer: 'https://cn.bing.com/translator', Origin: 'https://cn.bing.com', Cookie: cookie
        },
        body: body.toString(),
        signal: AbortSignal.timeout(90000)
      });
      const j = await r.json();
      if (Array.isArray(j) && j[0] && j[0].translations && j[0].translations[0] && j[0].translations[0].text) {
        stats.req++; stats.chars += text.length;
        return j[0].translations[0].text;
      }
      last = new Error('响应异常 ' + JSON.stringify(j).slice(0, 90));
    } catch (e) { last = e; }
    session = null;                       // 下一轮强制重建会话
    await sleep(1500 * (a + 1));
  }
  throw last || new Error('未知失败');
}

/* ---------------- 术语表 ---------------- */
const SKIP_TERMS = new Set(['API', 'CSS', 'HTML', 'JSON', 'URL', 'HTTP', 'HTTPS', 'SQL', 'CLI', 'SDK', 'IDE', 'UI', 'UX', 'AI', 'LLM', 'Mac', 'Windows', 'PC', 'CPU', 'GPU', 'RAM', 'OS', 'IP', 'DNS', 'CDN', 'Git', 'GitHub', 'VPS', 'MVP', 'PRD', 'Figma', 'Supabase', 'Vercel', 'Stripe', 'Zeabur', 'Trae', 'Dify', 'Docker', 'React', 'Next.js', 'Node.js', 'Python', 'JavaScript', 'TypeScript', 'HTML5', 'Terminal', 'DevOps']);
function loadGlossary() {
  try {
    const md = fs.readFileSync(path.join(ROOT, '术语表.md'), 'utf8');
    const rows = [];
    for (const line of md.split('\n')) {
      if (!line.trim().startsWith('|')) continue;
      const c = line.split('|').slice(1, -1).map((s) => s.trim());
      if (c.length < 2) continue;
      const en = c[0], zh = c[1];
      if (!en || !zh || /^-+$/.test(en) || en === '英文术语') continue;
      if (SKIP_TERMS.has(en)) continue;
      if (zh.includes(en)) continue;                 // 中文译法里已含英文原词 → 不必替换
      if (en.length < 4 || /[，。、；：]/.test(zh)) continue;
      rows.push([en, zh]);
    }
    rows.sort((a, b) => b[0].length - a[0].length);   // 长词优先，避免子串误替换
    return rows;
  } catch (e) { return []; }
}
const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
function glossaryFix(text, glossary) {
  let out = text;
  for (const [en, zh] of glossary) {
    out = out.replace(new RegExp('(?<![A-Za-z0-9_-])' + escapeRe(en) + '(?![A-Za-z0-9_-])', 'g'), zh);
  }
  return out;
}

/* ---------------- Markdown 翻译 ---------------- */
let GLOSSARY = [];
const countParas = (s) => s.split(/\n{2,}/).filter((x) => x.trim()).length;

async function translatePlain(text) {
  const paras = text.split(/(\n{2,})/);
  const idx = [];
  paras.forEach((p, i) => { if (i % 2 === 0 && p.trim()) idx.push(i); });
  let start = 0;
  while (start < idx.length) {
    let end = start, len = 0;
    while (end < idx.length) {
      const p = paras[idx[end]];
      if (end > start && len + p.length > LIMIT) break;
      len += p.length + 2; end++;
    }
    const positions = idx.slice(start, end);
    const batch = positions.map((i) => paras[i]);
    let done = false;
    try {
      const zh = await tt(batch.join('\n\n'));
      if (countParas(zh) === batch.length) {
        const zp = zh.split(/\n{2,}/).filter((x) => x.trim());
        positions.forEach((pos, k) => { paras[pos] = zp[k]; });
        done = true;
      } else {
        log(`  ~ 段落数不一致（${batch.length}→${countParas(zh)}），逐段回退`);
      }
    } catch (e) { log('  !! 批量失败: ' + e.message); }
    if (!done) {
      for (let k = 0; k < positions.length; k++) {
        try { paras[positions[k]] = await tt(batch[k]); }
        catch (e) { log('  !! 段落失败: ' + e.message); stats.failed++; }
        await sleep(300);
      }
    }
    start = end;
    await sleep(SLEEP);
  }
  return paras.join('');
}

async function translateMarkdown(md) {
  const parts = md.split(/(```[\s\S]*?```)/g);   // 围栏代码块整体保留，不翻译
  const out = [];
  for (const part of parts) {
    if (part.startsWith('```') || !part.trim()) { out.push(part); continue; }
    const codes = [];
    const masked = part.replace(/`[^`\n]+`/g, (m) => { codes.push(m); return '@@' + (codes.length - 1) + '@@'; });
    let zh = await translatePlain(masked);
    zh = zh.replace(/@@\s*(\d+)\s*@@/g, (m, n) => (codes[Number(n)] !== undefined ? codes[Number(n)] : m));
    out.push(glossaryFix(zh, GLOSSARY));
  }
  return out.join('');
}

/* ---------------- 主流程 ---------------- */
function walk(dir, base) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = base ? path.join(base, e.name) : e.name;
    if (e.isDirectory()) out.push(...walk(path.join(dir, e.name), rel));
    else if (e.name.endsWith('.md')) out.push(rel);
  }
  return out;
}

(async function main() {
  GLOSSARY = loadGlossary();
  log(`=== bing.js 启动：术语表 ${GLOSSARY.length} 条，单请求上限 ${LIMIT} 字，间隔 ${SLEEP}ms ===`);
  if (PROBE) {
    await newSession();
    log('探测译文: ' + await tt('Let us verify that the translation channel works properly.'));
    return;
  }
  let files = walk(EN, '');
  if (SCOPE) files = files.filter((f) => f === SCOPE || f.startsWith(SCOPE + path.sep) || f.startsWith(SCOPE + '/'));
  files.sort();
  if (LIMIT_FILES) files = files.slice(0, LIMIT_FILES);
  log(`待处理 ${files.length} 个文件`);
  for (const rel of files) {
    const enPath = path.join(EN, rel), zhPath = path.join(ZH, rel);
    const en = fs.readFileSync(enPath, 'utf8');
    if (fs.existsSync(zhPath) && !FORCE) {
      const zh = fs.readFileSync(zhPath, 'utf8');
      const ratio = zh.length / Math.max(en.length, 1);
      if (en.length > 1500 && ratio < MIN_RATIO) log(`  重译（疑似截断 ${ratio.toFixed(2)}）: ${rel}`);
      else { stats.skipped++; continue; }
    }
    try {
      const zh = await translateMarkdown(en);
      fs.mkdirSync(path.dirname(zhPath), { recursive: true });
      fs.writeFileSync(zhPath, zh);
      stats.files++;
      log(`  ✅ ${rel}  en ${en.length} → zh ${zh.length}`);
    } catch (e) { stats.failed++; log(`  ❌ ${rel} : ${e.message}`); }
  }
  log(`=== 完成 ${stats.files} 个，跳过 ${stats.skipped} 个，请求 ${stats.req} 次 / ${stats.chars} 字符，失败 ${stats.failed} ===`);
})().catch((e) => { log('致命错误: ' + ((e && e.stack) || e)); process.exit(1); });
