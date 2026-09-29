#!/usr/bin/env node
/**
 * fetch.js — 抓取 easy-vibe 英文课程正文（docs/en/**​/*.md）
 * 用法: node pipeline/fetch.js
 * 产出: source/en/ 下按原目录结构存放的 .md 文件 + source/manifest.json
 * 来源: datawhalechina/easy-vibe (CC BY-NC-SA 4.0) — 见资料源清单.md
 */
const https = require('https');
const fs = require('fs');
const path = require('path');

const REPO = 'datawhalechina/easy-vibe';
const BRANCH = 'main';

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'cogseed-c1-pipeline' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return get(res.headers.location).then(resolve, reject);
      }
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => {
        if (res.statusCode === 200) resolve(data);
        else reject(new Error(`HTTP ${res.statusCode}: ${url}`));
      });
    }).on('error', reject);
  });
}

async function main() {
  const tree = JSON.parse(
    await get(`https://api.github.com/repos/${REPO}/git/trees/${BRANCH}?recursive=1`)
  );
  const files = tree.tree.filter(
    (t) => t.type === 'blob' && t.path.startsWith('docs/en/') && t.path.endsWith('.md')
  );
  const outRoot = path.join(__dirname, '..', 'source', 'en');
  const manifest = [];
  for (const f of files) {
    const rawUrl = `https://raw.githubusercontent.com/${REPO}/${BRANCH}/${f.path}`;
    const body = await get(rawUrl);
    const rel = f.path.replace(/^docs\/en\//, '');
    const outPath = path.join(outRoot, rel);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, body, 'utf8');
    const bytes = Buffer.byteLength(body, 'utf8');
    manifest.push({ path: f.path, rel, bytes });
    console.log(`+ ${rel} (${bytes} B)`);
  }
  manifest.sort((a, b) => a.rel.localeCompare(b.rel));
  fs.writeFileSync(
    path.join(__dirname, '..', 'source', 'manifest.json'),
    JSON.stringify(manifest, null, 2),
    'utf8'
  );
  const total = manifest.reduce((s, m) => s + m.bytes, 0);
  console.log(`\n完成: ${files.length} 个文件，共 ${total} 字节 -> source/en/`);
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
