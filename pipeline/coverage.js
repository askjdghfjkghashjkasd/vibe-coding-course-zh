#!/usr/bin/env node
/**
 * coverage.js — 统计 source/en → source/zh 的翻译覆盖率
 * 用法: node pipeline/coverage.js
 *
 * 输出:
 *   - 按「一级目录」汇总: 文件数覆盖率、字符数覆盖率
 *   - 未翻译文件清单（用于下一批派单）
 *   - 疑似截断文件（zh/en 字符比 < 0.30，中文通常约为英文的 0.4~0.6）
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const EN = path.join(ROOT, 'source', 'en');
const ZH = path.join(ROOT, 'source', 'zh');
const SUSPECT_RATIO = 0.30;

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : p.endsWith('.md') ? [p] : [];
  });
}

function groupOf(rel) {
  const seg = rel.split(path.sep);
  if (seg.length === 1) return seg[0]; // index.md / guide 等
  // 一级目录 + 二级目录（如 appendix/1-computer-fundamentals）
  if (seg[0] === 'appendix' && seg.length > 2) return seg[0] + '/' + seg[1];
  return seg[0];
}

const enFiles = walk(EN).map((p) => ({ rel: path.relative(EN, p), abs: p, chars: fs.statSync(p).size }));
const groups = new Map();

let gEn = 0, gZh = 0, gN = 0, gOK = 0;
const missing = [];
const suspects = [];

for (const f of enFiles) {
  const g = groupOf(f.rel);
  if (!groups.has(g)) groups.set(g, { files: 0, ok: 0, chars: 0, zhChars: 0 });
  const agg = groups.get(g);
  agg.files++;
  agg.chars += f.chars;
  gN++; gEn += f.chars;

  const zhAbs = path.join(ZH, f.rel);
  if (fs.existsSync(zhAbs)) {
    const zc = fs.statSync(zhAbs).size;
    agg.ok++; agg.zhChars += zc;
    gOK++; gZh += zc;
    const ratio = zc / f.chars;
    if (ratio < SUSPECT_RATIO) suspects.push({ rel: f.rel, en: f.chars, zh: zc, ratio: ratio.toFixed(2) });
  } else {
    missing.push({ rel: f.rel, chars: f.chars, group: g });
  }
}

const pct = (a, b) => (b === 0 ? '0.0' : ((a / b) * 100).toFixed(1)) + '%';

console.log('分组明细 (目录 | 文件覆盖率 | 字符覆盖率)');
console.log('-'.repeat(72));
for (const [g, a] of [...groups.entries()].sort((x, y) => y[1].chars - x[1].chars)) {
  console.log(
    `${g.padEnd(38)} ${String(a.ok).padStart(3)}/${String(a.files).padEnd(3)} ${pct(a.ok, a.files).padStart(7)}   ` +
    `${pct(a.zhChars, a.chars).padStart(7)}  (en ${a.chars} chars)`
  );
}
console.log('-'.repeat(72));
console.log(`合计: 文件 ${gOK}/${gN} = ${pct(gOK, gN)}   字符 ${pct(gZh, gEn)}  (en ${gEn} / zh ${gZh})`);

if (missing.length) {
  console.log(`\n未翻译 ${missing.length} 个文件（按字符数降序，供下一批派单）:`);
  for (const m of missing.sort((a, b) => b.chars - a.chars)) {
    console.log(`  ${String(m.chars).padStart(7)}  ${m.rel}`);
  }
}

if (suspects.length) {
  console.log(`\n⚠ 疑似截断 ${suspects.length} 个（zh/en < ${SUSPECT_RATIO}）:`);
  for (const s of suspects) console.log(`  en ${s.en} / zh ${s.zh} (${s.ratio})  ${s.rel}`);
}
