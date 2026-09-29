#!/usr/bin/env node
'use strict';
/**
 * postfix.js —— 译文结构规范化（在批量翻译之后运行，可重复执行）
 *
 * 修复 Bing 译文里被破坏的 Markdown/VitePress 结构：
 *   1) 全角冒号容器标记  ：：： tip  →  ::: tip
 *   2) 半全角混用容器标记  ：:： / ：::  →  :::
 *   3) 代码围栏/行内代码内不做改动（这些位置由分词器保护，本就未翻译）
 *   4) 扫描残留占位符 @@n@@（说明该段行内代码在翻译中丢失），只报告、不臆改
 *
 * 用法：node pipeline/postfix.js            # 跳过 2 分钟内新写入的文件（避免与批量翻译抢写）
 *       node pipeline/postfix.js --all      # 不跳过
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const ZH = path.join(ROOT, 'source/zh');
const LOGF = path.join(__dirname, 'postfix.log');
const ALL = process.argv.includes('--all');
const FRESH_MS = 120000;

const fixes = [
  [/[：:]{3,}/g, ':::'],                       // ：：：/：:: 等混合 → 统一半角
  [/：：：/g, ':::']
];
function normalize(text) {
  let out = text;
  for (const [re, rep] of fixes) out = out.replace(re, rep);
  return out;
}
function walk(dir, base) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = base ? path.join(base, e.name) : e.name;
    if (e.isDirectory()) out.push(...walk(path.join(dir, e.name), rel));
    else if (e.name.endsWith('.md')) out.push(rel);
  }
  return out;
}
function log(msg) {
  const line = `[${new Date().toISOString()}] ${msg}`;
  console.log(line);
  try { fs.appendFileSync(LOGF, line + '\n'); } catch (e) {}
}

const st = { scanned: 0, changed: 0, fixed: 0, skipped: 0, placeholder: [] };
for (const rel of walk(ZH, '')) {
  const p = path.join(ZH, rel);
  const stt = fs.statSync(p);
  if (!ALL && Date.now() - stt.mtimeMs < FRESH_MS) { st.skipped++; continue; }
  const src = fs.readFileSync(p, 'utf8');
  st.scanned++;
  const out = normalize(src);
  if (out !== src) {
    const n = (src.match(/[：:]{3,}/g) || []).length;
    st.fixed += n; st.changed++;
    fs.writeFileSync(p, out);
    log(`  🔧 ${rel}  修复容器标记 ${n} 处`);
  }
  const ph = (out.match(/@@[0-9]+@@/g) || []);
  if (ph.length) st.placeholder.push(`${rel} (${ph.length})`);
}
log(`=== 扫描 ${st.scanned}，修复 ${st.changed} 个文件 / ${st.fixed} 处，跳过（太新）${st.skipped} ===`);
if (st.placeholder.length) log(`⚠ 残留占位符需人工核对：${st.placeholder.join('；')}`);
else log('✅ 无残留占位符');
