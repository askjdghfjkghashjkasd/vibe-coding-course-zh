# 如何构建跨平台Electron桌面应用：语音转文本应用

# 第一章：什么是Electron和桌面应用开发

在本教程中，我们将完成一个完整的闭环：从零开始用Electron构建语音转文字桌面应用，支持云API和本地模型识别模式，最终将其打包成一个可安装并运行于Windows、macOS和Linux的真实桌面应用中。

对于这个教程，你至少应该具备：

- 计算机（Windows或Mac，推荐Mac，因为本地型号在苹果硅片上运行非常快）
- Node.js环境（版本18.0及以上）
- 你的AI编码助手（Cursor / Trae / Claude Code）
- （可选）OpenAI API 密钥（如果你使用云模式）
- 麦克风（内置笔记本麦克风即可）

## 1.1 什么是电子？

你每天使用的应用，比如 **VS Code、Slack、Discord 和 Notion**，有一个共同点：它们都是用 **Electron** 构建的桌面应用程序。

Electron 是一个开源框架，允许你使用 **HTML CSS JavaScript**（与网页相同的栈）构建能在 **Windows、macOS 和 Linux 上运行的桌面应用。其原理很简单：将 Chromium 和 Node.js 打包在一起，你的网页就成为一个独立的桌面应用。

**一句话理解**：Electron = “隐形的Chrome浏览器”Node.js系统能力。

<!-- ![占位符：显示Electron架构的示意图：Chromium（用于UI渲染）Node.js（用于系统访问）= 桌面应用](../../../../zh-cn/stage-3/跨平台/电子-语音转文本/images/image1.png） -->

## 1.2 核心电子架构

Electron 应用由两种工艺类型组成。理解它们是开发的关键：

**主流程**

* 应用的“总经理”
* 负责创建窗口、管理应用生命周期，以及访问如文件系统等原生功能
* 运行于Node.js环境，并可使用所有Node.js模块
* 每个应用只有一个主要流程

**渲染过程**

* 应用的“前脸”
* 本质上是一个负责UI渲染的Chromium网页
* 每个窗口对应一个渲染进程
* 出于安全原因，渲染进程不能直接访问Node.js API

**预载脚本**

* 主进程与渲染过程之间的“桥梁”
* 使用 `contextBridge` 安全地将选定的 API 暴露给渲染进程

它们通过**进程间通信（IPC）**进行通信，就像打电话一样：渲染器说“我想开始录制”，主进程收到请求并调用系统麦克风。

<!-- ![占位符：Electron 进程架构图，显示主进程、渲染过程和预加载脚本，以及它们之间的 IPC 通信](../../../../zh-cn/stage-3/跨平台/电子-语音转文本/images/image2.png） -->

## 1.3 我们在建造什么？

在本教程中，我们将构建一个**语音转文本**桌面应用。其功能简单明了：

1. 点击“开始录音”按钮，应用开始监听麦克风
2. 说完话后，点击“停止”，应用会将音频发送给AI进行识别
3. 识别出的文本会显示在界面中，并可一键复制

**提供两种识别模式：**

| 比较维度 | 云端 API 模式 | 本地模型模式 |
|---------|-------------|------------|
| 代表解决方案 | OpenAI Whisper API | whisper.cpp |
| 是否需要网络 | 是 | 否 |
| 识别速度 | 取决于网络 | 取决于硬件（Apple Silicon 上非常快） |
| 中文识别质量 | 优秀 | 优秀（large-v3 模型） |
| 成本 | $0.006/分钟 | 免费 |
| 模型大小 | 无需下载 | tiny 模型 75MB，large 模型 3GB |
| 适用场景 | 快速上手、轻量使用 | 注重隐私、离线使用、长期高频使用 |

<!-- ![占位图：应用预览显示语音转文字界面：顶部录音按钮和波形动画，下面是识别文本，右上角有模式切换](../../../../zh-cn/stage-3/cross-platform/electron-voice-to-text/images/image3.png) -->

## 1.4 重要提示：Electron 中不可用 Web Speech API

如果你搜索过“Electron 语音识别”，可能会看到有人推荐使用浏览器内置的 `Web Speech API`。**请注意：这在 Electron 中不起作用。**

Google 已停止对非 Chrome/Edge 浏览器内核的语音 API 支持。Electron 基于 Chromium，但它本身不是 Chrome，因此 `window.SpeechRecognition` 会直接失败。

这就是为什么我们需要独立的解决方案，例如 OpenAI Whisper API 或 whisper.cpp。

## 1.5 教程路线图

我们将按照以下步骤完成完整流程：

1. **创建 Electron 项目**：使用 Electron Forge 搭建项目并了解进程间通信
2. **实现录音功能**：在 renderer 进程中获取麦克风输入并处理音频数据
3. **云端识别（选项 A）**：使用 OpenAI Whisper API 进行语音转文字
4. **本地识别（选项 B）**：在本地使用 whisper.cpp，无需网络连接
5. **打包与分发**：将应用打包为可安装桌面程序

# 第 2 章：创建 Electron 项目

## 2.1 使用 AI 初始化项目

打开你的 AI 编程助手并输入以下提示：

```
Please help me create a new Electron project with Electron Forge using the Vite template.
The project name is voice-to-text.
Please run: npx create-electron-app voice-to-text --template=vite
After creation, enter the project directory and install dependencies.
```

Electron Forge 是官方推荐的 Electron 脚手架工具。它有助于项目初始化、打包、分发以及其他繁琐的设置任务。

创建后，项目结构大致如下：

```text
voice-to-text/
├── src/
│   ├── main.js            # Main process entry
│   ├── preload.js         # Preload script (bridge)
│   ├── renderer.js        # Renderer process entry
│   └── index.html         # App HTML page
├── forge.config.js        # Electron Forge config
├── vite.main.config.mjs   # Main process Vite config
├── vite.preload.config.mjs # Preload script Vite config
├── vite.renderer.config.mjs # Renderer process Vite config
└── package.json
```

## 2.2 启动与预览

请让 AI 启动开发服务器：

```
Please help me start the Electron development server by running npm start
```

几秒钟后，会出现一个桌面窗口。这就是你的 Electron 应用程序。即使现在它只显示一个默认的欢迎页面，它已经是一个真正的桌面程序了。

<!-- ![占位符：第一次启动 Electron 应用程序时显示默认欢迎页面的截图](../../../../zh-cn/stage-3/cross-platform/electron-voice-to-text/images/image4.png) -->

## 2.3 理解 IPC（进程间通信）

在实现语音功能之前，我们需要了解 Electron 最重要的概念：**IPC（进程间通信）**。

由于渲染进程（UI）和主进程（系统功能）是隔离的，它们必须使用 IPC “电话”进行协作：

```text
Renderer process (UI)                 Main process (system)
    │                                │
    │── "I want to start recording" ──────────→   │
    │                                │── Call microphone
    │                                │── Process audio
    │   ←──── "Here is the result" ─────────────│
    │                                │
    │── Display text in UI           │
```

在代码中，这种通信通过 `preload.js` 进行桥接：

```javascript
// preload.js - safely expose APIs to renderer process
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  // Renderer -> Main
  sendAudio: (audioData) => ipcRenderer.invoke('transcribe-audio', audioData),
  // Main -> Renderer
  onResult: (callback) => ipcRenderer.on('transcription-result', callback)
})
```

```javascript
// main.js - main process listens for messages
const { ipcMain } = require('electron')

ipcMain.handle('transcribe-audio', async (event, audioData) => {
  // Call Whisper API or whisper.cpp here
  const text = await transcribe(audioData)
  return text
})
```

<!-- ![占位符：IPC 流程图显示消息从 Renderer -> Preload -> Main 的传递](../../../../zh-cn/stage-3/cross-platform/electron-voice-to-text/images/image5.png) -->

# 第三章：实现录音

## 3.1 在渲染进程中捕获麦克风输入

浏览器（即 Electron 渲染进程）提供 `navigator.mediaDevices.getUserMedia` 来访问麦克风。请让 AI 帮助实现录音：

```
Please help me modify src/index.html and src/renderer.js to implement:

UI:
1. A large circular "Start Recording" button, which turns into a red "Stop Recording" button when clicked
2. Show a simple pulse animation while recording
3. A text display area below for recognition results
4. Two buttons at the bottom: "Copy Text" and "Clear"
5. A settings icon at top-right to switch recognition mode (cloud/local)

Recording logic (in renderer.js):
1. On button click, request microphone access via navigator.mediaDevices.getUserMedia
2. Use MediaRecorder to record audio in webm format
3. After stopping, convert audio Blob to ArrayBuffer
4. Send it to main process via window.electronAPI.sendAudio
5. Wait for recognition result from main process and display it
```

核心录音代码：

```javascript
// renderer.js
let mediaRecorder = null
let audioChunks = []

async function startRecording() {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: {
      channelCount: 1,
      sampleRate: 16000,
      echoCancellation: true,
      noiseSuppression: true
    }
  })

  mediaRecorder = new MediaRecorder(stream, {
    mimeType: 'audio/webm;codecs=opus'
  })

  audioChunks = []
  mediaRecorder.ondataavailable = (e) => audioChunks.push(e.data)

  mediaRecorder.onstop = async () => {
    const audioBlob = new Blob(audioChunks, { type: 'audio/webm' })
    const arrayBuffer = await audioBlob.arrayBuffer()

    // Send to main process for transcription
    const result = await window.electronAPI.sendAudio(arrayBuffer)
    document.getElementById('result').textContent = result
  }

  mediaRecorder.start()
}
```

<!-- ![占位符：录音界面截图，显示红色录音状态按钮和脉冲动画，下方还有文本结果区域](../../../../zh-cn/stage-3/cross-platform/electron-voice-to-text/images/image6.png) -->

## 3.2 处理麦克风权限

Electron 默认阻止权限请求。我们需要在主进程中显式允许麦克风访问：

```
Please help me add microphone permission handling in main.js:
1. Use session.defaultSession.setPermissionRequestHandler to handle permission requests
2. Auto-allow when request type is 'media'
3. For macOS, ensure microphone usage description is declared in package.json or entitlements
```

```javascript
// Add to main.js
const { session } = require('electron')

session.defaultSession.setPermissionRequestHandler(
  (webContents, permission, callback) => {
    if (permission === 'media') {
      callback(true)
    } else {
      callback(false)
    }
  }
)
```

> **macOS 用户注意**：macOS 会显示系统级的麦克风权限对话框。这是正常的。点击“允许”。

# 第4章：选项A - 云端识别（OpenAI Whisper API）

这是最简单的选项。你只需要一个 API 密钥和几行代码。

## 4.1 获取 OpenAI API 密钥

1. 访问 [OpenAI 平台](https://platform.openai.com/)，注册并登录
2. 前往 API 密钥页面，点击 **"创建新的密钥"**
3. 复制生成的密钥（以 `sk-` 开头）并妥善保存

> **费用参考**：Whisper API 的费用为 **每分钟 $0.006**。这意味着识别 1 小时音频只需 $0.36，非常实惠。

## 4.2 在主进程中调用 Whisper API

请 AI 在主进程中实现语音识别：

```
Please help me implement OpenAI Whisper API in main.js:
1. Install node-fetch (if needed) or use built-in fetch in Node.js
2. Create transcribeWithWhisper function that accepts audio ArrayBuffer
3. Convert ArrayBuffer to Blob/File and build FormData
4. Call https://api.openai.com/v1/audio/transcriptions
5. Use model whisper-1 and set language to zh (Chinese)
6. Return the recognized text
7. Read API key from environment variables or config file
```

核心代码：

```javascript
// main.js
async function transcribeWithWhisper(audioBuffer, apiKey) {
  const blob = new Blob([audioBuffer], { type: 'audio/webm' })
  const formData = new FormData()
  formData.append('file', blob, 'audio.webm')
  formData.append('model', 'whisper-1')
  formData.append('language', 'zh')

  const response = await fetch(
    'https://api.openai.com/v1/audio/transcriptions',
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}` },
      body: formData
    }
  )

  const data = await response.json()
  return data.text
}
```

<!-- ![占位符：运行应用截图显示 Whisper API 返回的已识别中文语音](../../../../zh-cn/stage-3/cross-platform/electron-voice-to-text/images/image7.png) -->

## 4.3 添加设置界面

让 AI 在渲染进程中添加一个简单的设置面板，用于输入 API 密钥和切换识别模式：

```
Please help me add a settings panel in index.html:
1. Add a gear icon in the top-right corner; click to expand settings panel
2. The panel includes:
   - Recognition mode switch (Cloud API / Local model)
   - API Key input (only visible in cloud mode)
   - Language dropdown (Chinese / English / Auto detect)
3. Save settings to localStorage
4. Close panel when clicking outside
```

<!-- ![placeholder: 扩展设置面板截图，显示模式切换和 API 密钥输入](../../../../zh-cn/stage-3/cross-platform/electron-voice-to-text/images/image8.png) -->

# 第5章：选项B - 本地识别（whisper.cpp）

如果你不想依赖云端 API，或者需要离线使用，whisper.cpp 是最佳选择。它是 OpenAI Whisper 模型的 C 语言移植版本，完全在本地运行，无需互联网。

## 5.1 安装 whisper.cpp 的 Node.js 绑定

请 AI 安装和配置：

```
Please help me install nodejs-whisper in the project:
npm install nodejs-whisper

After installation, please help me download the whisper tiny model (small size, fast for testing).
nodejs-whisper will handle model download automatically.
```

> **模型选择指南**：
> * `tiny`（75MB）：最快，适合测试和轻量级使用，平均准确率
> * `base`（142MB）：速度与准确率的平衡
> * `small`（466MB）：中文识别质量明显更好
> * `large-v3-turbo`（1.5GB）：推荐；比大型模型快5-8倍，准确率仅低1-2%
> * `large-v3`（3GB）：最高准确率，但运行较慢，需要更好的硬件

## 5.2 在主进程中集成 whisper.cpp

请求 AI 实现本地识别：

```
Please help me add whisper.cpp local recognition in main.js:
1. Import nodejs-whisper
2. Create transcribeWithLocal function
3. Accept audio ArrayBuffer and save it as a temporary WAV file first (16kHz mono)
4. Call nodejs-whisper for recognition
5. Return recognized text
6. Delete temporary file after recognition
```

核心代码：

```javascript
// main.js
const { nodewhisper } = require('nodejs-whisper')
const path = require('path')
const fs = require('fs')
const os = require('os')

async function transcribeWithLocal(audioBuffer) {
  // Save as temp file
  const tempPath = path.join(os.tmpdir(), `recording-${Date.now()}.wav`)
  fs.writeFileSync(tempPath, Buffer.from(audioBuffer))

  try {
    const result = await nodewhisper(tempPath, {
      modelName: 'base',
      autoDownloadModelName: 'base',
      whisperOptions: {
        language: 'zh',
        word_timestamps: true
      }
    })
    return result.map(r => r.speech).join('')
  } finally {
    // Clean up temp file
    fs.unlinkSync(tempPath)
  }
}
```

<!-- ![占位符：本地模型在离线情况下使用中文语音输入识别的截图](../../../../zh-cn/stage-3/cross-platform/electron-voice-to-text/images/image9.png) -->

## 5.3 对 Apple Silicon 用户的好消息

如果你使用的是 M1/M2/M3/M4 Mac，whisper.cpp 可以自动使用 **Metal GPU 加速** 和 **Apple Neural Engine**。识别速度可以 **快于实时**，这意味着 1 分钟的音频可能只需几秒钟就能处理完毕。

对于 NVIDIA GPU 用户，whisper.cpp 也支持 **CUDA 加速**，同样提供强大的性能。

# 第 6 章：打包与分发

开发完成后，我们需要将应用打包成可分发的安装程序。

## 6.1 使用 Electron Forge 打包

我们的项目已经包含了 Electron Forge，因此打包非常简单：

```
Please help me run the Electron Forge packaging command:
npx electron-forge make
```

该命令会自动生成您当前操作系统的安装程序：

* **macOS**：`.dmg` 安装器镜像和 `.zip` 归档
* **Windows**： `.exe` 安装器（Squirrel格式）
* **Linux**：`.deb`（Debian/Ubuntu）和`.rpm`（Fedora）包

构建输出在 `out/make/` 目录中。

<!-- ![占位符：out/make 目录中生成.dmg或.exe安装程序的文件截图](../../../../zh-cn/stage-3/跨平台/电子-语音-文本/图像/image10.png） -->

## 6.2 应用大小优化

Electron 应用的一个“痛点”是包容量大（因为 Chromium 是捆绑的）。优化建议：

* 确保只捆绑在 `dependencies`@ 中的包，并将开发依赖保留在 `devDependencies`
* 使用 Vite 树摇动来缩小 JavaScript 大小
* 如果使用本地模型，建议在首次发布时下载模型，而不是捆绑到安装程序中

|配置 |估计规模 |
|------|---------|
|纯电子应用（无型号） |~150-200 MB |
|低语微型模型 |~250 MB |
|Whisper 大型V3涡轮增压车型 |~1.7 GB |

## 6.3 跨平台注释

**macOS：**
* 发布到 App Store 或分发给他人需要 **代码签名**（Apple 开发者身份证，年费 99 美元）
* 还需要苹果的**公证**流程
* 麦克风权限必须声明为`NSMicrophoneUsageDescription`@，在`Info.plist`中
* 建议构建一个支持英特尔和苹果硅片的通用二进制

**Windows：**
* 建议使用代码签名，否则Windows SmartScreen会显示安全警告
* 用户仍可选择“运行”以查看未签名应用

**Linux：**
* 无需代码签名
* 建议同时提供`.deb`和`.AppImage`格式

> **提示**：对于个人项目或小规模分发，你可以暂时跳过代码签名，直接与朋友分享打包文件。

# 第七章：最后的笔记

恭喜你！你从零开始打造了一个跨平台的语音转文字桌面应用。让我们回顾一下我们的工作：

1. 使用 Electron Forge 搭建跨平台桌面应用
2. 理解主进程、渲染过程和IPC通信
3. 实现了麦克风录音和音频采集
4. 集成了两种语音识别选项：云 Whisper API 和本地 whisper.cpp
5. 学会了如何打包和分发Electron应用

Electron强大的原因是，你可以利用网络技术栈构建桌面应用，达到VS Code或Slack的水平。随着AI语音识别的成熟，像语音转文字这样的功能，曾经需要专业团队，现在可以由一个人完成。

**高级说明：**

* **实时字幕**：使用AudioWorklet进行音频流式传输，并配合流媒体识别API进行实时转录
* **会议助手**：录制完整会议，自动生成带时间戳的文字记录，并用AI总结关键内容
* **多语言翻译**：转录语音和通话翻译API，实现实时语言转换
* **语音笔记本**：与本地数据库（如SQLite）结合，构建可搜索的语音笔记

让你的声音，让代码帮你记录一切。***

# 参考文献

* [Electron 官方文档](https://www.electronjs.org/docs/latest/)
* [Electron Forge 官方文档](https://www.electronforge.io/)
* [OpenAI Whisper API 文档](https://platform.openai.com/docs/guides/speech-to-text)
* [whisper.cpp GitHub 仓库](https://github.com/ggml-org/whisper.cpp)
* [nodejs-whisper npm 包](https://www.npmjs.com/package/nodejs-whisper)
* [MDN MediaDevices.getUserMedia()](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)