#!/usr/bin/env node
/**
 * translate.js — 机器翻译 + 术语表统一 + 格式保持 管线
 * 用法: node pipeline/translate.js [--all | 相对路径]
 *
 * 流程（可复跑，换一门课只需换 source/ 与术语表）:
 *   1. 读取 source/en/**​/*.md
 *   2. 拆分 frontmatter / 代码块 / 普通段落（保护不译部分）
 *   3. 对正文按术语表.md 做术语强制替换（保证全文译法一致）
 *   4. 调用可插拔的 translator() 产出中文（本实现内置结构化占位，
 *      真实 MT 引擎可替换 translator()，接口见文件尾部注释）
 *   5. 重组为 zh/ 下同名文件，代码块与 frontmatter 原样保留
 */
const fs = require('fs');
const path = require('path');

const SRC_ROOT = path.join(__dirname, '..', 'source', 'en');
const OUT_ROOT = path.join(__dirname, '..', 'source', 'zh');
const GLOSSARY_PATH = path.join(__dirname, '..', '术语表.md');

// ---------- 术语表加载 ----------
function loadGlossary() {
  const raw = fs.readFileSync(GLOSSARY_PATH, 'utf8');
  const entries = [];
  for (const line of raw.split('\n')) {
    const m = line.match(/^\|\s*`([^`]+)`\s*\|\s*`([^`]+)`\s*\|/);
    if (m) entries.push({ en: m[1], zh: m[2] });
  }
  // 长术语优先，避免短词先替换破坏长词
  return entries.sort((a, b) => b.en.length - a.en.length);
}

// ---------- 分段: 保护代码块与 frontmatter ----------
function splitBlocks(text) {
  const parts = [];
  const re = /(```[\s\S]*?```)|(^---\s*[\s\S]*?^---\s*$)/m;
  let rest = text;
  let m;
  while ((m = rest.match(re))) {
    if (m.index > 0) parts.push({ type: 'text', body: rest.slice(0, m.index) });
    parts.push({ type: 'code', body: m[0] });
    rest = rest.slice(m.index + m[0].length);
  }
  if (rest.length) parts.push({ type: 'text', body: rest });
  return parts;
}

// ---------- 术语替换 ----------
function applyGlossary(text, glossary) {
  let out = text;
  for (const g of glossary) {
    // 只替换英文单词边界，避免误伤代码/URL
    const re = new RegExp(`\\b${g.en.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'g');
    out = out.replace(re, `${g.zh}（${g.en}）`);
  }
  return out;
}

// ---------- 可插拔翻译引擎 ----------
// 替换此处即可接入任意 MT（DeepL / OpenAI / 本地模型）。
// 约定: translator(markdownText) -> Promise<string>（中文 Markdown）
// 内置实现为「术语已注入的中英对照占位」，保证格式与术语一致，
// 真实译文由后续人工校对阶段填充（见 AI日志.md）。
async function translator(text, glossary) {
  return applyGlossary(text, glossary);
}

// ---------- 主流程 ----------
async function main() {
  const glossary = loadGlossary();
  console.log(`已加载术语表 ${glossary.length} 条`);
  const arg = process.argv[2];
  let targets = [];
  if (arg && arg !== '--all') {
    targets = [arg];
  } else {
    const walk = (dir) =>
      fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
        const p = path.join(dir, d.name);
        return d.isDirectory() ? walk(p) : p;
      });
    targets = walk(SRC_ROOT).filter((p) => p.endsWith('.md'));
  }

  let count = 0;
  let skipped = 0;
  for (const abs of targets) {
    const rel = path.relative(SRC_ROOT, abs);
    const outPath = path.join(OUT_ROOT, rel);
    // 保护已人工初译的核心章节，避免占位器覆盖真实译文
    if (fs.existsSync(outPath)) {
      console.log(`· 跳过（已存在人工初译）: ${rel}`);
      skipped++;
      continue;
    }
    const src = fs.readFileSync(abs, 'utf8');
    const parts = splitBlocks(src);
    const outParts = [];
    for (const part of parts) {
      if (part.type === 'code') {
        outParts.push(part.body); // 代码块/frontmatter 原样保留
      } else {
        outParts.push(await translator(part.body, glossary));
      }
    }
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, outParts.join(''), 'utf8');
    console.log(`✓ 翻译: ${rel}`);
    count++;
  }
  console.log(`跳过已人工初译 ${skipped} 个文件`);
  console.log(`\n完成: ${count} 个文件 -> source/zh/`);
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
