#!/usr/bin/env bash
# finish.sh —— 批量翻译收尾链路（等翻译跑完 → 结构规范化 → 覆盖率核算 → 生成完成报告）
# 用法：bash pipeline/finish.sh          # 后台等待，适合 nohup 挂起
#      WAIT=0 bash pipeline/finish.sh   # 不等翻译，立即收尾
set -u
cd "$(dirname "$0")/.."
ROOT="$(pwd)"
WAIT="${WAIT:-1}"

if [ "$WAIT" = "1" ]; then
  echo "[finish] 等待翻译进程结束 ..."
  while pgrep -f "node pipeline/bing.js" >/dev/null 2>&1; do sleep 30; done
fi
echo "[finish] 翻译进程已结束，开始收尾"

echo "[finish] 1/3 译文结构规范化"
node pipeline/postfix.js --all

echo "[finish] 2/3 覆盖率核算"
node pipeline/coverage.js | tee pipeline/coverage.log

echo "[finish] 3/3 生成完成报告"
{
  echo "# 翻译完成报告"
  echo
  echo "生成时间：$(date '+%Y-%m-%d %H:%M:%S')"
  echo
  echo "| 指标 | 数值 |"
  echo "| --- | --- |"
  echo "| 英文母版文件数 | $(find source/en -name '*.md' | wc -l | tr -d ' ') |"
  echo "| 中文译文文件数 | $(find source/zh -name '*.md' | wc -l | tr -d ' ') |"
  echo "| 英文总字符 | $(find source/en -name '*.md' -exec cat {} + | wc -c | tr -d ' ') |"
  echo "| 中文总字符 | $(find source/zh -name '*.md' -exec cat {} + | wc -c | tr -d ' ') |"
  echo "| 翻译成功 | $(grep -ch '✅' main.log appendix.log 2>/dev/null | paste -sd+ - | bc) |"
  echo "| 整文件失败 | $(grep -ch '❌' main.log appendix.log 2>/dev/null | paste -sd+ - | bc) |"
  echo "| 拼接修复 | $(grep -c '拼接修复' pipeline/bing.log 2>/dev/null || echo 0) |"
  echo
  echo "## 译文文件清单"
  echo
  (cd source/zh && find . -name '*.md' | sed 's|^\./||' | sort | sed 's|^|- |')
} > 翻译完成报告.md

echo "[finish] 完成 → 翻译完成报告.md"
