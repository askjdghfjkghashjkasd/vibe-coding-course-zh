# Vibe Coding 课程 · 中文资料包（C1）

> C1 挑战：课程资料获取与翻译——从获取到翻译到发布，完整的信息获取与处理管线。

## 项目状态

- [x] 定位一手来源（结论：官方「Stanford Vibe Coding」不存在，采用 DataWhale easy-vibe）
- [x] 批量抓取并归档（186 个英文 .md → source/en）
- [x] 术语表统一（58 条，≥50 达标）
- [x] 可复跑翻译流水线（fetch / bing / postfix / coverage / validate）
- [x] 全量翻译完成：文件 186/186 = 100.0%，字符 90.0%（免密钥 Bing 引擎，分批跑完）
- [x] 发布到 GitHub（`github.com/askjdghfjkghashjkasd/vibe-coding-course-zh`）

## 来源（一手来源清单）

- 任务点名的「Stanford Vibe Coding course (2025)」：公开网络不存在官方课程（无官网 / 讲义 / 字幕 / 官方仓库）。
- 实际采用：DataWhale easy-vibe《Vibe Coding 101》（`github.com/datawhalechina/easy-vibe`），约 19563 star，许可证 CC BY-NC-SA 4.0，英文母版、10 语言支持。

## 覆盖范围

- 归档覆盖率：100%（`source/en` 下 186 个英文 .md 全部归档）。
- 翻译覆盖率：文件 186/186 = 100.0%，字符 90.0%（数字可由 `node pipeline/coverage.js` 复算）。
  - 16 个分组全部覆盖完成（stage-1/2/3、index、guide、appendix 全部分组、vibe-stories），分组明细见 `node pipeline/coverage.js`。

## 翻译流程（可复跑）

1. `pipeline/fetch.js`：从 GitHub 抓取英文原稿 → `source/en`
2. `术语表.md`：统一术语译法（58 条）
3. `pipeline/bing.js`：免密钥批量机器翻译（cn.bing.com/ttranslatev3；代码块不译、术语表强制统一、会话自动刷新、断点续跑）→ `source/zh`；另备 `pipeline/mt.js`（LibreTranslate + MyMemory 兜底）
4. `pipeline/postfix.js`：译文结构规范化（容器标记 / 占位符）
5. `pipeline/coverage.js`：覆盖率核算（文件 / 字符，按目录分组）
6. `pipeline/validate.js`：校验覆盖与术语一致性

## 使用方法

- 环境：Node.js ≥ 18
- 抓取：`node pipeline/fetch.js`
- 翻译：`node pipeline/bing.js --all`
- 收尾：`bash pipeline/finish.sh`（等翻译进程结束 → 规范化 → 覆盖率 → 报告）
- 校验：`node pipeline/validate.js`

## 已知缺口

- 字符覆盖率 90.0%（文件 100.0%）：代码块按设计不翻译；个别超长文件（如 `appendix/8-artificial-intelligence/ai-capability-dictionary.md`）字符覆盖率偏低，人工逐字校对尚未完成。本仓库**如实标注，未伪造完成度**。
- 待办：平台提交需在学生端确认提交摘要后才写入。
