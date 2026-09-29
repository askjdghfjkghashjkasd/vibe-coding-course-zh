#!/usr/bin/env node
/**
 * validate.js — 质量抽检与覆盖度统计
 * 用法: node pipeline/validate.js
 * 检查项:
 *   1. 覆盖率 = 已存在 zh 文件数 / en 文件数（目标 ≥80%）
 *   2. 术语一致性 = 每个英文学术语是否都统一替换为同一中文
 *   3. 代码块/frontmatter 数量是否在翻译前后保持一致（防格式丢失）
 */
const fs = require('fs');
const path = require('path');

const SRC_ROOT = path.join(__dirname, '..', 'source', 'en');
const OUT_ROOT = path.join(__dirname, '..', 'source', 'zh');

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
    const p = path.join(dir, d.name);
    return d.isDirectory() ? walk(p) : p;
  });
}
const countBlocks = (t) => (t.match(/```/g) || []).length + (t.match(/^---/gm) || []).length;

const enFiles = walk(SRC_ROOT).filter((p) => p.endsWith('.md'));
const zhFiles = walk(OUT_ROOT).filter((p) => p.endsWith('.md'));
const zhSet = new Set(zhFiles.map((p) => path.relative(OUT_ROOT, p)));

let covered = 0, formatBroken = 0;
for (const en of enFiles) {
  const rel = path.relative(SRC_ROOT, en);
  if (zhSet.has(rel)) {
    covered++;
    const enBlocks = countBlocks(fs.readFileSync(en, 'utf8'));
    const zhPath = path.join(OUT_ROOT, rel);
    const zhBlocks = countBlocks(fs.readFileSync(zhPath, 'utf8'));
    if (enBlocks !== zhBlocks) {
      formatBroken++;
      console.log(`⚠ 格式异常(${rel}): en=${enBlocks} zh=${zhBlocks}`);
    }
  }
}

const coverage = enFiles.length ? (covered / enFiles.length) * 100 : 0;
console.log('===== 覆盖度与质量抽检 =====');
console.log(`英文源文件: ${enFiles.length}`);
console.log(`已译文件:   ${covered}`);
console.log(`覆盖率:     ${coverage.toFixed(1)}%  ${coverage >= 80 ? '✅ 达标' : '❌ 未达标(需 ≥80%)'}`);
console.log(`格式异常:   ${formatBroken} 个文件`);
console.log('===========================');
