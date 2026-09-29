---
title: 在 ModelScope 上发布你的 Vibe 编程项目
description: 使用官方 ModelScope Skills 和静态工作室发布纯 HTML 或 Vue、React 及 Vite 构建输出的完整指南。
---

# 在 ModelScope 上发布你的 Vibe 编程项目

你的网站终于可以正常运行了。下一步是把它放到某个地方，让同学、朋友或真实用户可以直接访问。

你可以租用服务器并自行配置域名、HTTPS 和部署。你也可以将作品托管在成熟的开源社区上，从而减少在运维上的时间。本课程选择第二种方式，并在 **ModelScope** 上发布网站。

ModelScope 是由阿里巴巴与 CCF 开源发展委员会共同发起的开源社区。除了 20 万余个开源模型和 3 万个数据集之外，它还提供用于展示应用的 **工作室（Studios）**。对我们来说，实际优势很简单：我们可以为项目提供一个免费的、可分享的地址，而无需先成为服务器管理员。

> 本指南已于 **2026 年 8 月 11 日** 根据当前的工作室页面、官方 Skills 和命令行资料进行检查。按钮位置可能会有所变化，但主要路径仍然是：创建静态工作室、上传构建输出、部署，并打开工作室链接。

工作室可以运行 Gradio、Streamlit 和 Docker 应用。它还支持 `static` 类型，用于已构建的网站。如果最终网站由 `index.html`、CSS、JavaScript 和图片组成，这就是正确的类型。

部署后，公开页面将拥有类似于以下的地址：

```text
https://modelscope.cn/studios/your-name/your-studio
```

## 选择正确的发布方式

| 你的项目 | 工作室类型 | 发布前的操作 |
| --- | --- | --- |
| 纯 HTML、CSS 和 JavaScript | **静态** | 不需要构建；准备网站文件 |
| Vue、React、Vite、Svelte 及类似项目 | **静态** | 本地构建后，仅上传 `dist` 或 `build` 的内容 |
| Gradio 应用 | Gradio | 准备 `app.py` 和 `requirements.txt` |
| Streamlit 应用 | Streamlit | 准备 Streamlit 入口文件及依赖 |
| 自定义后端、系统包或启动流程 | Docker | 编写 Dockerfile 并监听平台所需端口 |

本章重点关注前两行。**不要将 Vue 或 React 源代码作为静态站点上传。** 访问者的浏览器无法为你运行 `npm install` 和 `npm run build`。

## 推荐：使用官方 Skill 发布

ModelScope 维护了 [ModelScope Skills](https://github.com/modelscope/modelscope-skills)。两个最相关的 Skills 是：

| Skill | 目的 | 何时使用 |
| --- | --- | --- |
| `ms-hub` | 一个通用的 ModelScope 入口点，用于仓库、模型、数据集、工作室、MCP 和 Skills 中心 | 第一次连接 ModelScope 或执行一般工作室操作时 |
| `ms-studio-deploy` | 将本地项目发布到工作室，包括项目检测、工作室创建、Git 同步、部署、日志检查和诊断 | **发布或更新本地网站的首选选项** |

`ms-studio-deploy` 会检查项目文件以选择运行环境。根目录中包含构建后的 `index.html` 的目录会被识别为 `static`。静态工作室不运行 `npm run build`，因此框架项目仍需先在本地构建。

### 安装 Skills

安装 ModelScope SDK、通用 Skill 和工作室部署 Skill:

```bash
python -m pip install -U modelscope
modelscope skills add @ModelScope/ms-hub @ModelScope/ms-studio-deploy
```

如果你的 `modelscope` 命令不包含 `skills` 子命令，请使用官方安装脚本：

```bash
curl -fsSL https://modelscope.cn/skills/install.sh | bash -s -- @ModelScope/ms-hub
curl -fsSL https://modelscope.cn/skills/install.sh | bash -s -- @ModelScope/ms-studio-deploy
```

技能默认安装在 `~/.agents/skills/` 中。Codex、Cursor、Claude Code 以及其他兼容 智能体 Skills 的工具可以在那里发现它们。安装后启动一个新的代理会话，以便工具刷新其技能列表。

### 使用技能发布

根据官方 [`ms-studio-deploy` 指南](https://github.com/modelscope/modelscope-skills/blob/main/skills/ms-studio-deploy/SKILL.md)，你不需要自己执行每个创建、推送、部署和日志命令。请准备如下三项：

1. 安装 `ms-studio-deploy` 并启动一个新的代理会话。
2. 打开你打算发布的目录。其根目录必须包含 `index.html`。
3. 在你的计算机上配置 ModelScope 访问令牌。

首次使用时，请打开 [访问令牌页面](https://modelscope.cn/my/myaccesstoken) 并在终端中设置令牌：

```bash
export MODELSCOPE_API_KEY="your-token"
```

对于纯 HTML，请直接打开网站目录。对于 Vue、React 或 Vite，请构建项目并进入输出目录：

```bash
npm run build
cd dist
```

该示例使用 Vite 的 `dist` 目录。如果您的项目生成 `build`，请改为打开该目录。

现在在 Codex、Cursor、Claude Code 或其他支持 智能体 Skills 的工具中打开此目录。

#### 最简提示

只说：

```text
Use the ms-studio-deploy Skill to publish this website to a Static Studio on ModelScope. Send me the URL when it works.
```

首先检查技能 `index.html` 和登录配置。如果需要创建工作室，它会询问名称以及是否应该是公开或私密的。私密工作室是一个更安全的初始选择。

如果您想一次性提供所有详细信息，请使用：

```text
Use the ms-studio-deploy Skill to publish this directory to a Static Studio on the ModelScope China site.
Name the Studio my-portfolio and make it private first. Check its status and logs after deployment.
If deployment fails, diagnose the logs, fix the problem, and deploy again. Return the working URL.
```

#### 接下来 AI 会做什么

官方技能将工作组织如下：

```text
detect project type → choose China or international site → read account details
→ create or reuse a Studio → inspect sensitive files → synchronize to master
→ trigger deployment → inspect status and logs → diagnose and repair → return the URL
```

当被问及 Studio 应该是公开还是私密时，首次部署请选择私密，只有在页面通过检查后才将其设为公开。静态网站不需要付费硬件。如果其他运行时需要付费资源，该 Skill 必须先获得您的明确批准。

令牌用于 API 身份验证和 Git 推送。切勿将其放在前端代码、README 文件、提示或可分享的截图中。

## 手动路线：第 0 步 — 准备可发布网站

Skill 路线更快。下面的手动路线可以帮助您了解 Studio 界面，并在您的代理工具不可用时仍然有用。

### 情况 A：纯 HTML 网站

最小目录如下。`index.html` 必须位于发布内容的根目录中：

```text
my-site/
├── index.html
├── styles.css
├── app.js
└── images/
    └── cover.jpg
```

在发布之前，通过本地 HTTP 服务器进行测试：

```bash
cd my-site
python3 -m http.server 8000
```

打开 `http://localhost:8000`。不要仅仅依赖双击 `index.html`，因为 `file://` 和实际的 HTTP 访问处理模块、跨域请求以及路径处理方式不同。

### 情况 B：Vue、React、Vite 及类似项目

首先安装依赖并构建：

```bash
npm install
npm run build
```

常见的输出目录有：

| 工具或框架 | 常见输出目录 |
| --- | --- |
| Vite、使用 Vite 的 Vue、使用 Vite 的 React | `dist/` |
| Create React App | `build/` |
| Vue CLI | `dist/` |

发布输出目录的**内容**，以便 `index.html` 直接出现在 Studio 仓库的根目录下：

```text
Correct: index.html
Wrong:   dist/index.html
```

如果在部署后 CSS、JavaScript 或图片返回 404，请尝试在 Vite 项目中使用相对资源基础路径：

```js
// vite.config.js / vite.config.ts
export default {
  base: './'
}
```

之后再重新构建。单页应用程序也可以使用哈希路由，如`/#/about`，因为静态主机可能不会将所有路径重写为`index.html`。

## 手动路线：步骤1——打开工作室并登录

打开[ModelScope Studio]（https://modelscope.cn/studios）。页面顶部展示了从创建和构建Studio到发布和分享的流程。

![ModelScope Studio 主页展示创建、构建、发布和分享流程](../../../zh-cn/stage-1/appendix-modelscope-static-site/images/modelscope-static-site/01-studios-home.webp）

选择创建按钮或打开[Create Studio]（https://modelscope.cn/studios/create）。如果你已登出，ModelScope会要求你登录或注册。中国网站`modelscope.cn`和国际网站`modelscope.ai`不共享账户、代币或内容。中国网站通常是中国用户实际的选择。

## 手动路线：第二步——填写基本信息

请在创建页面填写基本信息：

![创建包含姓名、所有者、许可、可见性和描述的工作室表单](../../../zh-cn/stage-1/appendix-modelscope-static-site/images/modelscope-static-site/02-create-studio.jpg）

1. **所有者或组织：**决定URL中的所有者分段。
2. **工作室名称：** 使用小写字母、数字和连字符，如`my-portfolio`。
3. **显示名称和描述：** 用访客能理解的语言解释网站。
4. **可见性：** 私下开始，检查后公开。
5. **许可：** 根据项目选择。

确认表格后，等待工作室详情页面打开。

## 手动路线：步骤3 — 上传网站文件

下图显示了一个运行中的静态工作室的文件页面。`index.html` 直接出现在仓库根节点，与 `README.md` 并列。

![静态工作室文件页面，根节点为index.html和 README.md](../../../zh-cn/stage-1/appendix-modelscope-static-site/images/modelscope-static-site/04-studio-files.jpg）

打开**文件**页面，上传`index.html`、CSS、JavaScript和图片。上传后，根节点必须包含`index.html`;不要将发布文件包裹在额外的`dist`、`build`或项目文件夹中。

手动上传适合普通的 HTML 网站或只有少量文件的项目。如果文件多或频繁更新，返回 `ms-studio-deploy`，让它执行 Git 同步。

## 手动路由：步骤4 — 在部署设置中选择静态

上传文件后，打开 Studio 部署设置，选择 **Static** 作为 SDK 类型。页面说明 Static 适用于已有的 HTML 网站;同一区域还列出了 Gradio、Streamlit 和 Docker。

![在Studio部署设置中选择静态](../../../zh-cn/stage-1/appendix-modelscope-static-site/images/modelscope-static-site/03-select-static.webp）

再次检查 `index.html` 是否在仓库根节点，然后保存部署设置。

> 需要数据库、秘密API密钥或服务器端计算的网站，并不是纯静态网站。请使用Gradio、Streamlit、Docker或独立的后端。用前端JavaScript编写的密钥不能保持秘密。

## 手动路线：第5步——等待部署并检查

保存部署设置通常会启动部署。如果没有，请使用Studio页面上的部署、重启或重运行控制。等待状态变为运行状态后，打开类似的地址：

```text
https://modelscope.cn/studios/your-name/your-studio
```

仔细检查最后一页：

- 主页能打开吗？
- CSS、JavaScript 和图片都加载了吗？
- 浏览器控制台是否有 404、CORS 或 JavaScript 错误？
- 页面在移动端宽度下是否仍可使用？
- 如果 Studio 是公开的，未登录的浏览器窗口能否打开复制的 URL？

如果 Studio 是私有的，请在页面可用后再将其设为公开，然后在未登录窗口测试公开地址。

## 手动操作：步骤 6 — 更新已发布的网站

修改源码后，本地测试并重新构建。返回 **文件** 页面，用 `dist` 或 `build` 的新内容替换旧文件，然后重新部署。

```text
change source → test locally → build again → replace Studio files
→ redeploy → inspect the final URL
```

对于 Vite、React 和 Vue，仅继续上传构建输出。不要上传 `node_modules`、开发配置或完整的源项目。一旦更新变得频繁，请改用 Skill 路径。

## 也可使用 Skill 进行故障排除

<ModelScopeTroubleshooter />

## 来源

- [ModelScope Studio](https://modelscope.cn/studios)（页面和截图检查日期：2026 年 8 月 11 日）
- [ModelScope 开发者社区活动回顾](https://community.modelscope.cn/683562c6870cef7360622f7f.html)
- [官方 `ms-hub` 指南](https://github.com/modelscope/modelscope-skills/blob/main/skills/ms-hub/SKILL.md)
- [官方 `ms-studio-deploy` Skill](https://github.com/modelscope/modelscope-skills/blob/main/skills/ms-studio-deploy/SKILL.md)
- [ModelScope Hub 客户端](https://github.com/modelscope/modelscope_hub)
- [公开静态 Studio 示例](https://modelscope.cn/studios/studio-demo-station/funasr-demo-static-multiple/summary)