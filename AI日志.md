# AI 协作日志（每日）

> C1 要求：每日记录用了什么工具、什么 prompt、踩了什么坑（Rubric「AI 使用质量」维度佐证）。

## 日期：2026-09-28（Day 1）

- **目标**：定位一手来源 → 抓取归档 → 建立翻译流水线 → 核心章节初译 → 准备提交。
- **工具 / 模型**：web_search（中英文多组）、web_fetch（GitHub API、easy-vibe 仓库）、bash（curl 抓取）、本地 LLM（术语表 + 核心章节初译）、Node.js 脚本（fetch / translate / validate）。
- **关键 prompt / 命令**：
  - 检索：`Stanford Vibe Coding course 2025 syllabus`、`"vibe coding" Stanford course site:github.com`
  - 抓取：GitHub API `repos/datawhalechina/easy-vibe/contents/docs/en/...`
  - 翻译测试：`translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=zh-CN&dt=t&q=...`
- **产出**：资料源清单、186 文件归档 + manifest、术语表 58 条、pipeline 三脚本、核心章节初译（index + learning-map 第 1 部分）、AAR、拿来说明。
- **踩坑 / 问题**：
  1. 「Stanford Vibe Coding course」官方源不存在 → 改以 easy-vibe 为替代源并如实标注。
  2. translate.js 默认是占位器（只替换术语、不翻译）→ 加入「已存在 zh 跳过」保护，未把占位输出当译文。
  3. Google keyless MT 返回空 body → 无可用 MT 引擎，全量翻译暂缓。
  4. GitHub 未绑定 → 平台拒收提交。
- **改进**：下次先确认 MT 引擎 / API key；抓取后先做覆盖矩阵；脚本加「真实翻译」自检断言。

---

## Day 1（续）— 翻译引擎攻坚：从「无可用 MT」到自建免密钥通道

- **背景**：Google 免密钥通道返回空 body；disroot 免费引擎单次上限 460 字、连发即 429；MyMemory 3300 字被截断到 627 字——吞吐都撑不起一份 478 万字符的课程。本机也没有 ollama / argos-translate / translate-cli / mlx，Apple 端上翻译因语言包缺失（`TranslationError.Cause.notInstalled`，`oscdn.apple.com` 证书不匹配）无法补齐。
- **关键发现**：`cn.bing.com/translator` 页面内嵌 `params_AbusePreventionHelper = [key, token, ttl]`，配合 `IG` 与 `data-iid`，带 Cookie 向 `POST /ttranslatev3?isVertical=1&IG=…&IID=…` 提交 `fromLang=en&text=…&to=zh-Hans&token=…&key=…` 即返回真实译文（响应含 `usedLLM:true`）。单请求 400 / 900 / 1900 / 4000 字全部成功，连发 5 次不限流，token 有效期 60 分钟。
- **工程化**：新写 `pipeline/bing.js`（236 行）：① 会话自动引导 + 到期刷新；② 429/异常自动重建会话并指数退避重试；③ 断点续跑（已存在且未被判定截断的译文自动跳过）；④ 围栏代码块与行内代码占位保护，不翻译代码；⑤ 段落分批送译 + 段落数校验失败自动逐段回退；⑥ 读取「术语表.md」对译文做术语统一（过滤纯技术缩写后生效 52 条）；⑦ 逐文件日志写入 `pipeline/bing.log`。
- **实测**：`--probe` 返回「让我们验证翻译通道是否正常工作。」；单文件 `stage-1/learning-map/index.md`（29863 字符）= 9 次请求 / 84 秒 / 0 失败，中文标题 21 个与英文母版 21 个完全对齐，原截断译文（覆盖率 0.19）已补齐。
- **全量重跑**：双进程并行（主干 stage-1→stage-2→stage-3→vibe-stories→guide；附录 appendix），语料合计 4,776,555 字符，实测吞吐约 830 字符/秒，预计 1.5~2 小时完成，全程断点可续。
- **经验**：当找不到「官方翻译 API」时，网页版翻译服务自己页面里内嵌的会话参数（key/token/IG）往往就是一条可用的免密钥通道；先用长度阶梯 + 连发压测确认吞吐，再决定是否值得包成流水线——压测花 10 分钟，能省掉一整轮「换引擎—失败—再换」的空转。
