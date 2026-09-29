# 如何构建浏览器 AI 助手扩展：一键总结任何网页

# 第一章：浏览器扩展和 Chrome 扩展开发是什么

在本教程中，我们将完成一个完整的闭环：从零开始构建一个 AI 驱动的 Chrome 浏览器扩展。它可以读取你浏览的任何网页内容，然后使用 AI 生成一键总结。你将亲自完成扩展开发、调试，并学习如何将其发布到 Chrome 网上应用店。

对于本教程，你至少需要具备：

- Chrome 浏览器（推荐使用版本 138，如果你想使用内置 AI）
- 一款代码编辑器（VS Code / Cursor / Trae）
- （可选）OpenAI 或 Claude API Key

## 1.1 浏览器扩展是什么？

你肯定以前使用过浏览器扩展：广告拦截器、翻译工具、密码管理器……它们就像浏览器的“额外装备”，在上网时赋予你超能力。

想象一下：你打开了一篇 5,000 字的技术博客文章，点击一次扩展按钮，几秒钟后在侧边栏中出现一份简洁的中文总结。这正是我们要构建的功能。

![占位符：预览图显示左侧为长篇文章网页，右侧为 Chrome 侧边栏中生成的 AI 总结](../../../../zh-cn/stage-3/cross-platform/browser-ai-extension/images/image1.png)

<!-- ![占位符：预览图显示左侧为长篇文章网页，右侧为 Chrome 侧边栏中生成的 AI 总结](../../../../zh-cn/stage-3/cross-platform/browser-ai-extension/images/image1.png) -->

## 1.2 Chrome 扩展的基本架构

基于 Manifest V3 的 Chrome 扩展由几个核心部分组成，每个部分都有自己的角色：

* **Manifest 文件 (`manifest.json`)**：扩展的“身份证”，声明其名称、权限、入口文件等。
* **Service Worker（后台脚本）**：扩展的“大脑”，处理事件并在后台调用 API。它不会持续运行，而是在需要时启动。
* **Content Script**：扩展的“眼睛”，注入网页并能够读取 DOM 内容。
* **侧边栏**：扩展的“面部”，在浏览器右侧显示 UI，让用户看到 AI 总结结果。
* **选项页面**：让用户配置 API Key 及相关设置。

它们的工作流程如下：

```text
User clicks the extension icon
    -> Side panel opens
    -> User clicks the "Summarize" button
    -> Side panel notifies the Service Worker
    -> Service Worker asks Content Script to read page text
    -> Content Script returns page content
    -> Service Worker sends content to AI API
    -> AI returns the summary
    -> Service Worker sends the summary back to the side panel for display
```

![占位符：一个架构流程图，显示内容脚本、服务工作线程和侧边面板如何相互传递消息](../../../../zh-cn/stage-3/cross-platform/browser-ai-extension/images/image2.png)
<!-- ![占位符：一个架构流程图，显示内容脚本、服务工作线程和侧边面板如何相互传递消息](../../../../zh-cn/stage-3/cross-platform/browser-ai-extension/images/image2.png) -->

## 1.3 两种 AI 选项：云 API 与 内置浏览器 AI

我们的扩展有两种方式访问 AI 功能：

**选项 A：调用云 AI API（OpenAI / Claude）**

* 优点：模型能力强，支持所有设备
* 缺点：需要 API Key，需要联网，有使用成本
* 最适合：高质量摘要和处理更复杂内容

**选项 B：使用 Chrome 内置 AI（Summarizer API）**

从 Chrome 138 开始，Google 基于 Gemini Nano 将 AI 能力直接内置到浏览器中。其中之一是 **Summarizer API**——它完全本地运行，不需要 API Key，不需要联网，完全免费。

* 优点：免费、隐私友好、不需要 API Key
* 缺点：需要 Chrome 138，硬件要求较高（4GB 显存或 16GB 内存），模型能力弱于云 AI
* 最适合：注重隐私、不想付费且硬件足够的用户

**本教程将同时实现这两种选项**，你可以根据自己的情况选择。

## 1.4 教程路线图

我们将从零开始构建一个名为 **"AI 页面摘要器"** 的 Chrome 扩展，步骤如下：

1. **构建扩展骨架**：创建 Manifest V3 项目结构并加载到 Chrome
2. **实现核心功能**：内容脚本读取页面，服务工作线程调用 AI API，侧边面板显示结果
3. **集成 Chrome 内置 AI**：使用 Summarizer API 提供免费本地摘要
4. **测试与调试**：学习 Chrome 扩展调试技巧
5. **发布至 Chrome 网上应用店**：打包并提交审核

# 第 2 章：构建扩展骨架

## 2.1 创建项目结构

打开你的 AI 编程助手（Cursor / Trae / Claude Code），创建一个名为 `ai-page-summarizer` 的空文件夹，然后在聊天框中输入以下内容：

```text
Please help me create a Chrome browser extension project using Manifest V3.
The project name is ai-page-summarizer, and its function is to summarize webpage content with AI.
Please create the following file structure:

ai-page-summarizer/
├── manifest.json          # MV3 manifest file
├── background.js          # Service Worker background script
├── content.js             # Content script (reads webpage text)
├── sidepanel.html         # Side panel HTML
├── sidepanel.js           # Side panel logic
├── sidepanel.css          # Side panel styling
├── options.html           # Settings page
├── options.js             # Settings page logic
└── icons/                 # Icons folder

Requirements for manifest.json:
1. manifest_version: 3
2. Permissions: storage, activeTab, scripting, sidePanel
3. Use service_worker: "background.js" for background
4. Configure side_panel with default path sidepanel.html
5. Configure default icon and title for action
```

人工智能将为你生成完整的项目框架。让我们来看看每个文件的作用。

## 2.2 `manifest.json`：扩展程序的“身份证”

这是 Chrome 扩展中最重要的文件。它告诉浏览器扩展程序是什么，需要什么权限，以及包含哪些组件：

```json
{
  "manifest_version": 3,
  "name": "AI Page Summarizer",
  "version": "1.0",
  "description": "Use AI to summarize any webpage in one click",
  "permissions": ["storage", "activeTab", "scripting", "sidePanel"],
  "background": {
    "service_worker": "background.js"
  },
  "action": {
    "default_title": "AI Page Summarizer",
    "default_icon": {
      "16": "icons/icon-16.png",
      "48": "icons/icon-48.png",
      "128": "icons/icon-128.png"
    }
  },
  "side_panel": {
    "default_path": "sidepanel.html"
  },
  "options_page": "options.html",
  "icons": {
    "16": "icons/icon-16.png",
    "48": "icons/icon-48.png",
    "128": "icons/icon-128.png"
  }
}
```

**权限说明：**

* `storage`：允许扩展存储数据，例如用户的 API 密钥
* `activeTab`：允许扩展访问用户正在浏览的当前标签页（仅在用户交互后，因此非常安全）
* `scripting`：允许扩展向页面注入脚本以读取内容
* `sidePanel`：允许扩展使用 Chrome 侧边面板 API

![占位符：编辑器中 manifest.json 的截图](../../../../zh-cn/stage-3/cross-platform/browser-ai-extension/images/image2b.png)
<!-- ![占位符：编辑器中 manifest.json 的截图](../../../../zh-cn/stage-3/cross-platform/browser-ai-extension/images/image2b.png) -->

## 2.3 准备图标

Chrome 扩展需要三种尺寸的图标：16x16、48x48 和 128x128。你可以让 AI 生成它们：

```text
Please help me generate three simple Chrome extension icons (16x16, 48x48, 128x128),
with a rounded rectangle, gradient purple background, and a white AI lightning symbol in the center.
Save them in the icons/ directory as icon-16.png, icon-48.png, and icon-128.png.
```

## 2.4 将扩展程序加载到 Chrome

在编写代码之前，让我们先将这个“空壳”扩展加载到 Chrome 中，这样每次后续更改都可以立即预览：

1. 打开 Chrome 并在地址栏输入 `chrome://extensions/`
2. 在右上角开启 **开发者模式**
3. 点击 **加载已解压的扩展**
4. 选择你的 `ai-page-summarizer` 文件夹

你会看到扩展程序出现在列表中，并且它的图标会显示在 Chrome 工具栏上。

![占位符：Chrome 扩展程序页面的截图，显示如何启用开发者模式并加载扩展程序](../../../../zh-cn/stage-3/cross-platform/browser-ai-extension/images/image3.png)

<!-- ![占位符：Chrome 扩展页面截图，显示如何启用开发者模式并加载扩展程序](../../../../zh-cn/stage-3/cross-platform/browser-ai-extension/images/image3.png) -->

> **提示**：每次修改代码后，回到 `chrome://extensions/` 并点击扩展卡片上的 **刷新按钮 (🔄)** 以更新它。

# 第3章：实现核心功能 - 阅读页面   AI 摘要

## 3.1 内容脚本：读取页面文本

内容脚本是注入到网页中的脚本。它可以直接访问页面的 DOM。我们使用它来提取页面文本。

让 AI 写 `content.js`：

```text
Please help me write content.js with the following functions:
1. Listen for messages from Service Worker
2. When receiving a "getPageContent" message, extract the current page text content
3. Extraction logic: get document.body.innerText, and also get the page title and URL
4. Return the extracted content via sendResponse
```

人工智能将生成这样的代码：

```javascript
// content.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getPageContent') {
    const content = document.body.innerText || document.body.textContent
    sendResponse({
      content: content.trim(),
      title: document.title,
      url: window.location.href
    })
  }
  return true // Keep the message channel open
})
```

## 3.2 服务工作者：调用 AI API

服务工作者是扩展程序的“脑袋”。它协调各组件之间的通信，并调用外部 AI API。

请 AI 编写 `background.js`：

```text
Please help me write background.js with the following functions:
1. When the user clicks the extension icon, open the side panel
2. Listen for "summarize" messages from the side panel
3. After receiving the message, send "getPageContent" to the content script in the current tab to get page content
4. After receiving the page content, read the user's configured API Key and model selection from chrome.storage.local
5. Call the corresponding AI API according to the configuration (support OpenAI and Claude)
6. Send the AI summary back to the side panel

For OpenAI, call https://api.openai.com/v1/chat/completions and use model gpt-4o-mini
For Claude, call https://api.anthropic.com/v1/messages and use model claude-sonnet-4-20250514
System prompt: Please summarize the following webpage content in Chinese, extract the key points, and keep it within 300 Chinese characters.
```

核心代码看起来是这样的：

```javascript
// background.js

// Open the side panel when the user clicks the icon
chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })

// Listen for messages from the side panel
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'summarize') {
    handleSummarize(request.tabId).then(sendResponse)
    return true // Async response
  }
})

async function handleSummarize(tabId) {
  // 1. Get page content
  const [response] = await chrome.tabs.sendMessage(tabId, {
    action: 'getPageContent'
  })

  // 2. Read user settings
  const { apiKey, provider } = await chrome.storage.local.get([
    'apiKey', 'provider'
  ])

  if (!apiKey) {
    return { error: 'Please configure your API Key in the settings page first' }
  }

  // 3. Call AI API
  const summary = provider === 'claude'
    ? await callClaude(response.content, apiKey)
    : await callOpenAI(response.content, apiKey)

  return { summary, title: response.title }
}
```

![](../../../../zh-cn/stage-3/cross-platform/browser-ai-extension/images/image4.png)
<!-- ![占位符：编辑器中 background.js 代码的截图](../../../../zh-cn/stage-3/cross-platform/browser-ai-extension/images/image4.png) -->

## 3.3 侧边栏 UI：显示摘要结果

侧边栏是用户主要的交互界面。请 AI 编写侧边栏的 HTML、CSS 和 JS：

```text
Please help me write these three files for the side panel:

sidepanel.html:
- Show the plugin name "AI Page Summarizer" at the top
- A blue "Summarize Current Page" button
- A loading animation area (hidden by default)
- A result display area showing the page title and AI summary
- A "Copy Summary" button at the bottom

sidepanel.css:
- Clean modern design, similar to Notion typography
- Width adapts to the side panel
- Buttons have hover effects
- Loading animation implemented with CSS

sidepanel.js:
- When clicking the "Summarize" button, get the current tab ID
- Send a summarize message to background.js
- Show loading animation
- Hide loading and display summary after receiving result
- Use navigator.clipboard.writeText in the "Copy" button to copy text
```

![占位符：侧边面板 UI 截图显示三种状态：摘要按钮、加载状态和摘要结果](../../../../zh-cn/stage-3/cross-platform/browser-ai-extension/images/image5.png)

<!-- ![占位符：侧边面板 UI 截图显示三种状态：摘要按钮、加载状态和摘要结果](../../../../zh-cn/stage-3/cross-platform/browser-ai-extension/images/image5.png) -->

## 3.4 设置页面：配置 API 密钥

用户需要有一个地方输入他们自己的 API 密钥。请 AI 编写设置页面：

```text
Please help me write options.html and options.js:
- A dropdown to choose AI provider (OpenAI / Claude)
- A password input for API Key (type="password")
- A "Save" button
- Save config with chrome.storage.local.set
- Read saved config from storage and fill the form on page load
- Show "Settings saved" after saving
```

> **安全提醒**：API 密钥存储在 `chrome.storage.local`，并且仅保存在本地设备上。但如果你想将此扩展程序发布到 Chrome 网上应用店供他人使用，比较安全的做法是建立一个后端代理服务器，这样 API 密钥就不会直接暴露在客户端。

![占位符：设置页面截图，显示提供商选择和 API 密钥输入 p1](../../../../zh-cn/stage-3/cross-platform/browser-ai-extension/images/image6-1.png)
![占位符：设置页面截图，显示提供商选择和 API 密钥输入 p2](../../../../zh-cn/stage-3/cross-platform/browser-ai-extension/images/image6-2.png)
![占位符：设置页面截图，显示提供商选择和 API 密钥输入 p3](../../../../zh-cn/stage-3/cross-platform/browser-ai-extension/images/image6-3.png)
<!-- ![占位符：设置页面截图，显示提供商选择和 API 密钥输入](../../../../zh-cn/stage-3/cross-platform/browser-ai-extension/images/image6.png) -->

# 第4章：使用 Chrome 内置 AI（无需 API 密钥）

从 Chrome 138 版本开始，谷歌基于 **Gemini Nano** 将 AI 功能直接内置到浏览器中。最适合我们使用的功能是 **Summarizer API**——它完全在本地运行，无需 API 密钥，无需联网，并且免费。

## 4.1 检查浏览器支持

内置 AI 具有硬件要求：

* 桌面 Chrome 138 版（Windows 10、macOS 13、Linux、ChromeOS）
* 22 GB 可用存储空间（用于模型下载）
* 4GB GPU 显存，或 16GB 系统内存且有 4 个 CPU 核心

在 Chrome 地址栏中输入 `chrome://flags`，搜索与摘要相关的标志，并确保其为 **已启用**。
* 在 Chrome 131-137 版本中，这个开关称为 Summarization API。
* 在 Chrome 138-144 版本中，被重命名为 Gemini Nano 的 Summarization API。
* 在 Chrome 145 版本中，Gemini Nano 的 Summarization API 被移除，其摘要功能整合到 Gemini Nano 的 提示词 API 中。

![占位符：chrome://flags 截图，显示 Summarization API 开关](../../../../zh-cn/stage-3/cross-platform/browser-ai-extension/images/image7.png)
<!-- ![占位符：chrome://flags 截图，显示 Summarization API 开关](../../../../zh-cn/stage-3/cross-platform/browser-ai-extension/images/image7.png) -->

## 4.2 使用 Summarizer API

请在 `background.js` 中向 AI 提出添加内置 AI 支持的请求：

```text
Please help me add Chrome built-in Summarizer API support in background.js:
1. Add a summarizeWithBuiltinAI function
2. First check whether Summarizer.availability() returns 'readily-available'
3. If available, create a summarizer instance, configure type as 'key-points', format as 'markdown', and length as 'medium'
4. Call summarizer.summarize() to summarize
5. In handleSummarize, add a branch for provider === 'builtin'
```

核心代码：

```javascript
async function summarizeWithBuiltinAI(text) {
  // Check availability
  const availability = await Summarizer.availability()
  if (availability !== 'readily-available') {
    throw new Error('Chrome built-in AI is not available. Please check browser version and hardware requirements.')
  }

  // Create summarizer
  const summarizer = await Summarizer.create({
    type: 'key-points',
    format: 'markdown',
    length: 'medium'
  })

  // Run summary
  const summary = await summarizer.summarize(text, {
    context: 'This is a webpage article'
  })

  return summary
}
```

## 4.3 更新设置页面

在 `options.html` 的提供者下拉菜单中添加一个 **“Chrome 内置 AI（免费，无需 API 密钥）”** 选项。当用户选择它时，隐藏 API 密钥输入框，因为不再需要它。

```text
Please help me modify options.html and options.js:
1. Add an option "Chrome built-in AI (free, no API Key needed)" to the provider dropdown, with value "builtin"
2. Hide the API Key input when builtin is selected
3. Show the API Key input when OpenAI or Claude is selected
```

![占位符：更新后的设置页面截图显示三个 AI 提供商选项，当选择 Chrome 内置 AI 时隐藏 API Key 输入](../../../../zh-cn/stage-3/cross-platform/browser-ai-extension/images/image8.png)
<!-- ![占位符：更新后的设置页面截图显示三个 AI 提供商选项，当选择 Chrome 内置 AI 时隐藏 API Key 输入](../../../../zh-cn/stage-3/cross-platform/browser-ai-extension/images/image8.png) -->

# 第5章：测试与调试

## 5.1 本地测试工作流程

调试 Chrome 扩展与调试普通网页有些不同：

**调试服务工作线程：**
1. 打开 `chrome://extensions/`
2. 找到你的扩展并点击 **Service Worker** 链接
3. 会打开一个专用的 DevTools 窗口，你可以在其中看到 `console.log` 输出和网络请求

**调试侧边面板：**
1. 打开侧边面板
2. 在侧边面板内容中右键点击
3. 选择 **检查**
4. 这会为侧边面板打开 DevTools

**调试内容脚本：**
1. 在任何网页上按 F12 打开 DevTools
2. 在控制台面板，点击左上角的执行上下文下拉菜单
3. 选择你的扩展名称
4. 然后你可以看到内容脚本的 `console` 输出

![占位符：Chrome DevTools 截图显示如何选择不同执行上下文来调试不同扩展组件](../../../../zh-cn/stage-3/cross-platform/browser-ai-extension/images/image9.png)
<!-- ![占位符：Chrome DevTools 截图显示如何选择不同执行上下文来调试不同扩展组件](../../../../zh-cn/stage-3/cross-platform/browser-ai-extension/images/image9.png) -->

## 5.2 常见问题排查

| 问题 | 可能原因 | 解决方法 |
|------|---------|---------|
| 点击图标无反应 | 服务工作线程错误 | 检查 Service Worker DevTools 控制台 |
| 无法获取页面内容 | 内容脚本未注入 | 刷新页面重试，检查 manifest 中的 `matches` 配置 |
| API 调用失败 | API Key 错误或过期 | 在设置页面重新输入 API Key |
| 侧边面板为空 | `sidepanel.html` 路径错误 | 检查 manifest 中的 `side_panel.default_path` |


# 第6章：发布到 Chrome 网上应用店（可选）

如果你想与他人分享扩展，可以将其发布到 Chrome 网上应用店。

## 6.1 发布准备

1. **注册开发者账号**：访问 [Chrome 网上应用店开发者控制台](https://chrome.google.com/webstore/devconsole) 并支付一次性 $5 注册费用
2. **启用两步验证**：你的 Google 账号在发布前必须启用两步验证
3. **准备素材**：
   * 扩展图标：128x128 PNG 格式
   * 至少一张截图：建议 1280x800
   * 详细功能描述
   * 隐私政策说明（如果扩展处理用户数据）

## 6.2 打包与上传

1. 将扩展文件夹压缩为 `.zip` 文件（而非 `.crx`）
2. 在开发者控制台点击 **新建项目**
3. 上传 `.zip` 文件
4. 填写商店信息（名称、描述、截图、类别等）
5. 填写隐私声明（声明扩展会收集哪些用户数据）
6. 点击 **提交审核**

Google 会审核提交的扩展，通常需要几个工作日。请求权限越少、描述越清晰，审核通常越快。

![占位符：Chrome 网上应用店开发者控制台截图，显示扩展程序上传和元数据表单](../../../../zh-cn/stage-3/cross-platform/browser-ai-extension/images/image10.png)
![占位符：Chrome 网上应用店开发者控制台截图，显示扩展程序上传和元数据表单 p2](../../../../zh-cn/stage-3/cross-platform/browser-ai-extension/images/image10-1.png)

<!-- ![占位符：Chrome 网上应用店开发者控制台截图，显示扩展程序上传和元数据表单](../../../../zh-cn/stage-3/cross-platform/browser-ai-extension/images/image10.png) -->

# 第七章：最终说明

恭喜！你已经从零构建了一个由 AI 驱动的浏览器扩展程序。让我们回顾一下我们所做的事情：

1. 了解了 Chrome 扩展的 Manifest V3 架构
2. 使用 Content Script（内容脚本）读取网页内容
3. 使用 Service Worker 调用 AI API 并生成摘要
4. 使用侧边面板显示摘要结果
5. 还学习了如何使用 Chrome 内置 AI，无需任何 API 密钥

浏览器扩展开发是一个非常有趣的领域——它可以让你“增强”互联网上的任何网页。除了总结网页内容之外，你还可以用类似的架构构建更多功能：

**高级方向：**

* **翻译助手**：一键将外文网页翻译成中文
* **阅读注释**：高亮并注释页面，然后保存到云端
* **价格追踪**：监控电商页面的价格变化并通知用户
* **代码解析器**：在 GitHub 上选择代码，让 AI 自动解释

Chrome 内置 AI 的出现进一步降低了门槛——你甚至无需 API 密钥就能构建 AI 驱动的扩展程序。随着浏览器 AI 功能的不断增强，这一领域的想象空间只会越来越大。

***快给你的浏览器赋予超级能力吧！***

# 参考资料

* [Chrome 扩展官方文档 - Manifest V3](https://developer.chrome.com/docs/extensions/develop/)
* [发布 Chrome 扩展到 Chrome 网上应用店](https://developer.chrome.com/docs/webstore/publish?hl=zh-cn)
* [Chrome 侧边面板 API](https://developer.chrome.com/docs/extensions/reference/api/sidePanel)
* [Chrome 内置 AI - 摘要 API](https://developer.chrome.com/docs/ai/summarizer-api)
* [Chrome 内置 AI - 提示 API](https://developer.chrome.com/docs/ai/prompt-api)
* [OpenAI API 文档](https://platform.openai.com/docs/api-reference)
* [Anthropic Claude API 文档](https://docs.anthropic.com/en/docs/)
* [Anthropic Claude API 文档](https://developer.chrome.com/docs/webstore/publish?hl=zh-cn)