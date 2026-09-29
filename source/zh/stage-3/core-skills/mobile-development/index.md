# Claude Code 移动端远程开发

## 引言

想象一下这样的场景：你在通勤地铁上突然想到一个绝妙的修复漏洞;你在咖啡馆排队时收到紧急生产事件警报;你想在陪女友购物时查看你AI构建的项目进展情况。

在传统的开发流程中，这些场景通常意味着你需要找地方打开笔记本电脑，或者无助地拖延工作。但在AI辅助编码时代，规则已经改变。Claude Code让你随时随地都能随身携带开发环境，保持高效。

2025年夏天，随着Claude Code的普及，开发者开始探索不同的“手机编码”方法。从简单的本地Termux使用，到复杂的SSH Tailscale远程连接，再到专用的Happy Coder应用，一个完整的移动开发生态系统逐渐成型。

本章核心问题是：如何让Claude Code跟随你的手机，成为真正的“口袋开发助理”。

---

::: 信息 社区反馈一览

根据真实社区反馈，每种方法的体验如下：

**快乐的程序员（方法2）**
- 连接稳定性问题：断线频繁发生，断线后上下文丢失
- 功能受限：不能使用 `/` 命令
- 安全问题：取决于官方中继服务器，部分用户对数据安全表示担忧

**HAPI（进近3）**
- 支持自托管服务器：可部署在您自己的VPS上
- 与 Tailscale 配合使用体验更好：在电脑上运行 `hapi server`，并通过 Tailscale IP 从手机连接
- 连接相对稳定，适合长期使用

**Claude 遥控器（官方方法）**
- 官方解决方案，原生集成于 Claude 代码
- 支持对本地环境（MCP、工具、项目配置）的全面访问
- 需要Max订阅（Pro支持即将上线）
- 依赖Anthropic云连接

**建议**：如果您需要高连接稳定性，或担心第三方继电器的安全性，请选择**HAPI Tailscale**或**官方远程控制**方式。

:::

---

## 核心原则：移动开发架构模式

在引入具体方法之前，首先要理解问题的本质。

### 为什么移动开发会成为问题？

传统的集成开发环境（如VS Code和IntelliJ）需要完整的操作系统环境、强大的CPU、大内存和存储空间。尽管手机功能日益强大，但它们在开发经验上仍有自然的限制：

**输入约束**：虚拟键盘编码效率低，且复杂的语法容易打错

**屏幕限制**：小屏幕使得同时查看代码、终端和浏览器变得困难

**环境限制**：手机无法运行完整的开发工具链（编译器、数据库、调试器）

**连接限制**：移动网络不稳定，SSH会话容易断开连接

### 核心理念：瘦客户端架构

所有移动开发方法的核心理念都是一样的：手机只是“控制台”;真正的开发工作在别处完成。

```text
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│    ┌─────────────┐              ┌─────────────┐             │
│    │   Phone     │              │ Host/Cloud  │             │
│    │ (Controller)│   ────────►  │ (Executor)  │             │
│    │             │   Commands   │             │             │
│    │ • Send cmds │              │ • Run CLI   │             │
│    │ • View out  │              │ • Exec code │             │
│    │ • Review    │              │ • Access fs │             │
│    └─────────────┘              └─────────────┘             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

这种架构允许手机只专注于人机交互，而重度计算则交由主机或云端处理。

---

## 方法 1：官方 iOS 应用

在 2025 年 10 月，Anthropic 正式在 iOS 应用中推出了 Claude Code 移动端支持。这是最简单的移动开发选项。

### 地区限制

重要提示：Claude 应用 **在中国大陆无法直接使用**。

如果你在中国大陆，建议直接使用 **Happy Coder**（方法 2），通过配置的国内 API 中继服务可以正常使用。

如果你有海外 Apple ID，可以切换地区下载 Claude 应用。

### 工作原理

```text
┌─────────────┐                    ┌─────────────────┐
│  iOS App    │ ──────────────────► │ Anthropic Cloud │
│  (Phone)    │   HTTPS + OAuth     │  Claude Code    │
└─────────────┘                    └────────┬────────┘
                                           │
                                           ▼
                                   ┌───────────────┐
                                   │   GitHub API  │
                                   └───────────────┘
```

你的手机应用只发送命令。所有代码的执行都在Anthropic的云沙箱中进行，结果通过GitHub同步。

### 基本使用

**前提条件:**

- 运行iOS 15或更高版本的iPhone
- Claude Pro/Team/Enterprise订阅（不支持免费计划）
- GitHub账户

**步骤:**

1. 从App Store下载Claude应用
2. 登录你的Anthropic账户
3. 在应用中找到“代码”标签
4. 通过OAuth连接你的GitHub仓库
5. 开始创建任务

### 优缺点

优点是零设置门槛、体验流畅、支持推送通知。缺点是仅支持iOS、主要依赖GitHub工作流、功能相对有限（无法访问本地文件系统）、在中国大陆不可直接使用。

---

## 方法2：Happy Coder

Happy Coder是一个开源的移动和网页客户端，设计用于Claude Code和Codex，提供端到端加密，并可以从任何地方远程控制你的AI编码助手。

### 工作原理

```text
┌─────────────┐              ┌─────────────┐              ┌─────────────┐
│  Happy App  │   ────────►  │ Happy Server │   ◄────────  │happy-coder  │
│ (Phone/Web) │ Encrypted WS │   (Relay)    │  WebSocket   │ (Desktop)   │
└─────────────┘              └─────────────┘              └──────┬──────┘
                                                               │
                                                               ▼
                                                        ┌─────────────┐
                                                        │Claude Code  │
                                                        │    CLI      │
                                                        └─────────────┘
```

在你的电脑上，运行 `happy` 而不是 `claude` 来启动你的 AI 编程助手。当你需要手机控制时，会话会自动切换到远程模式。按下电脑上的任意键即可切换回本地控制。

### 安装和使用

**步骤 1：下载应用**

| 平台 | 链接 |
|------|------|
| iOS | [App Store](https://apps.apple.com/us/app/happy-claude-code-client/id6748571505) |
| Android | [Google Play](https://play.google.com/store/apps/details?id=com.ex3ndr.happy) |
| Web | [app.happy.engineering](https://app.happy.engineering) |

**步骤 2：在电脑上安装 CLI**

```bash
npm install -g happy-coder
```

**第3步：启动并配对**

```bash
# run in your project directory
cd ~/my-project
happy

# a pairing QR code will be shown
```

**步骤 4：在手机上扫描并配对**

打开 Happy 应用并扫描电脑上显示的二维码。配对成功后，你可以在手机上控制 Claude Code。

**步骤 5：使用**

```bash
# launch Claude Code
happy

# or launch Codex
happy codex
```

### 资源链接

- [GitHub 项目](https://github.com/slopus/happy) - 源代码
- [文档](https://happy.engineering/docs) - 使用文档
- [Discord 社区](https://discord.gg/fX9WBAhyfD) - 社区讨论

### 优缺点

优点包括简单的设置、跨平台支持、端到端加密以及开源可审计性。缺点是依赖第三方中继基础设施，并且需要在自己的环境中验证移动应用的可用性。

---

## 方法 3：HAPI

HAPI 是 Happy Coder 的替代方案，具有本地优先设计并支持在多个 AI 模型之间无缝切换设备。

### 工作原理

```text
┌─────────────┐              ┌─────────────┐              ┌─────────────┐
│  HAPI App   │   ────────►  │ HAPI Server │   ◄────────  │    hapi     │
│ (Phone/PWA/ │  WireGuard   │ (Self-hosted│  WireGuard   │ (Desktop)   │
│ Telegram)   │   + TLS      │   relay)    │   + TLS      │             │
└─────────────┘              └─────────────┘              └──────┬──────┘
                                                               │
                                                               ▼
                                                        ┌─────────────┐
                                                        │Claude Code  │
                                                        │ / Codex /   │
                                                        │ Gemini etc. │
                                                        └─────────────┘
```

HAPI 使用 WireGuard 加 TLS 进行端到端加密。所有通信都通过加密中继服务器。你可以自建中继服务器以完全控制数据流。

### 核心功能

- **无缝切换**：在桌面和手机之间切换控制；按任意键即可返回本地控制
- **原生优先**：移动应用采用原生技术封装，交互流畅
- **离开审批**：在电脑离开时，通过手机接收审批请求
- **多模型支持**：支持 Claude Code、Codex、Gemini、OpenCode 等更多模型
- **随处终端**：通过 PWA、Telegram 小程序等访问
- **语音控制**：支持语音输入命令，让你的双手保持自由

### 安装与使用

**步骤 1：启动中继服务器**

```bash
# run on your server (or launch directly with npx)
npx @twsxtd/hapi hub --relay
```

**步骤 2：在电脑上安装 CLI**

```bash
# run in your project directory
cd ~/my-project
npx @twsxtd/hapi

# or install globally
npm install -g @twsxtd/hapi
hapi
```

**步骤 3：配对设备**

按照终端提示操作，在手机上打开 HAPI 应用，并扫描二维码完成配对。

**步骤 4：访问方式**

| 访问方式 | 描述 |
|---------|------|
| Web PWA | 浏览器访问，支持安装到主屏幕 |
| Telegram 小程序 | 可直接在 Telegram 内使用 |
| 移动应用 | 原生应用体验（如果已发布） |

### 与 Happy Coder 的区别

| 功能 | Happy Coder | HAPI |
|------|-------------|------|
| 设计理念 | 云优先 | 本地优先 |
| 加密方式 | WebSocket 端到端加密 | WireGuard TLS |
| 多模型支持 | Claude Code, Codex | Claude, Codex, Gemini, OpenCode |
| 访问方式 | iOS/Android/Web | PWA, Telegram 等 |
| 语音控制 | 否 | 是 |
| AFK 审批 | 否 | 是 |
| 自托管中继 | 需要手动部署 | 开箱即用 |

### 资源链接

- [GitHub 项目](https://github.com/tiann/hapi) - 源代码
- [PWA 文档](https://github.com/tiann/hapi/blob/main/docs/pwa.md) - PWA 安装与使用
- [工作原理](https://github.com/tiann/hapi/blob/main/docs/how-it-works.md) - 技术实现细节
- [语音助手](https://github.com/tiann/hapi/blob/main/docs/voice.md) - 语音控制功能
- [为什么选择 HAPI](https://github.com/tiann/hapi/blob/main/docs/why-hapi.md) - 设计理念
- [常见问题](https://github.com/tiann/hapi/blob/main/docs/faq.md) - 常见问答

### 优缺点

优点包括本地优先设计、多模型支持、端到端加密、语音控制以及自托管中继能力。缺点是项目相对较新，生态系统仍在发展。

---

## 方法 4：SSH Tailscale Tmux

这是专业开发者的最佳选择。您可以通过 SSH 远程连接到开发机器，并通过 Tmux 保持会话的持久性。

### 工作原理

```text
┌─────────────┐              ┌─────────────┐              ┌─────────────┐
│   Phone     │   ────────►  │  Tailscale  │   ◄────────  │  Computer   │
│ (SSH client)│   VPN P2P    │ relay/hole  │   VPN P2P    │ (dev host)  │
└─────────────┘              └─────────────┘              └──────┬──────┘
                                                               │
                                                               ▼
                                                        ┌─────────────┐
                                                        │    Tmux     │
                                                        │ (session    │
                                                        │ persistence)│
                                                        └─────────────┘
```

Tailscale 创建了一个点对点 VPN，这样你就可以从任何网络访问你的家庭电脑。Tmux 确保 Claude Code 即使在 SSH 断开连接时也能在后台继续运行。

### 为什么你需要 Tailscale？

**传统 SSH 的问题:**

```text
Phone (4G) ──XX──> Router NAT ──XX──> Home Computer
             (cannot penetrate)   (LAN isolation)
```

您的电脑在私人网络上，而您的手机在公共网络上，因此直接访问失败。传统解决方案需要端口转发加动态 DNS，这既复杂又有风险。

**Tailscale 解决方案：**

```text
Phone (4G) ──► Tailscale Relay ──◄── Home Computer
            (auto hole-punch or relay)
```

Tailscale 使用 NAT 穿透，如果穿透失败会自动回退到中继。整个连接都是加密的。

### 完整安装步骤

**步骤 1：在电脑上安装 Tailscale**

```bash
# macOS
brew install --cask tailscale

# or download installer
# https://tailscale.com/download
```

**步骤2：登录并获取IP**

```bash
# start Tailscale
sudo tailscale up

# check Tailscale IPv4
tailscale ip -4
# example output: 100.x.x.x
```

**步骤3：在手机上安装Tailscale**

从App Store或Google Play下载Tailscale，并使用相同的账户登录。

**步骤4：安装和配置Tmux**

```bash
# macOS
brew install tmux

# create ~/.tmux.conf
cat > ~/.tmux.conf << 'EOF'
# enable mouse support
set -g mouse on

# default terminal with 256 colors
set -g default-terminal "screen-256color"

# change prefix key to Ctrl+A (optional)
unbind C-b
set -g prefix C-a

# simplified split shortcuts
bind v split-window -h
bind h split-window
EOF
```

**步骤 5：创建一个持久会话**

```bash
# create session named "claude"
tmux new -s claude

# start Claude Code in this session
cd ~/my-project
claude

# detach without closing
# press Ctrl+B then D
```

**步骤 6：从手机 SSH 客户端连接**

推荐的 SSH 客户端：

| 客户端 | 平台 | 备注 |
|--------|------|------|
| Blink Shell | iOS | 支持 MOSH，适合不稳定网络 |
| Termius | iOS/Android | 跨平台且界面精美 |
| a-Shell | iOS | 免费且轻量 |

连接配置：

```text
Host: 100.x.x.x (your Tailscale IP)
Port: 22
Username: your computer username
```

连接后，附加到 Tmux：

```bash
tmux attach -t claude
```

### 高级技巧

**防止你的电脑进入睡眠状态：**

```bash
# macOS
caffeinate -dimsu &

# or set System Settings > Energy Saver > prevent automatic sleep
```

**在不稳定的网络中使用 MOSH：**

MOSH（移动 Shell）是一种针对移动网络优化的 SSH 替代方案，能够在网络变化时实现无缝恢复。

```bash
# install on computer
brew install mosh

# use MOSH from phone client
# Blink Shell supports MOSH natively
```

**一键连接脚本：**

在你的 SSH 客户端中将此设置为启动命令：

```bash
tmux attach -t claude || tmux new -s claude
```

这将自动附加到现有会话或创建一个新的会话。

### 优缺点

优点是具有完整功能和桌面等效的工作流程，配备所有开发工具。缺点是设置更复杂，并且需要保持电脑在线。

---

## 方法5：本地Termux运行时

如果你是安卓用户，你可以直接在手机上运行Claude Code，无需连接外部设备。

### 工作原理

```text
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                    ┌─────────────┐                          │
│                    │   Termux    │                          │
│                    │ (Linux env) │                          │
│                    │             │                          │
│                    │ • Node.js   │                          │
│                    │ • Claude    │                          │
│                    │   Code CLI  │                          │
│                    │             │                          │
│                    │ • Project   │                          │
│                    │   files     │                          │
│                    │ • Git       │                          │
│                    └─────────────┘                          │
│                         │                                   │
│                         ▼                                   │
│                   ┌─────────────┐                           │
│                   │Anthropic API│                           │
│                   └─────────────┘                           │
└─────────────────────────────────────────────────────────────┘
```

Termux 是一个适用于 Android 的终端模拟器和 Linux 环境。你可以直接在其中安装 Node.js 和 Claude Code。

### 安装步骤

**重要**：请从 [F-Droid](https://f-droid.org/) 下载 Termux，而不是从 Google Play 下载（Play 版本已经过时）。

**步骤 1：安装基础工具**

```bash
# update package manager
pkg update && pkg upgrade

# install development tools
pkg install git nodejs python vim
```

**第2步：安装Claude代码**

```bash
npm install -g @anthropic-ai/claude-code
```

**步骤 3：配置环境**

```bash
# create workspace
mkdir -p ~/projects
cd ~/projects

# initialize project
git clone https://github.com/your-repo.git
cd your-repo

# launch Claude Code
claude
```

**步骤4：配置外部键盘（推荐）**

在 Termux 中：

```bash
# enable extra keys row
# long press screen > More > Extra keys row

# configure shortcuts
# add in ~/.termux/termux.properties
extra-keys = [['ESC','/','-','HOME','UP','END','PGUP','~'], \
              ['TAB','CTRL','ALT','LEFT','DOWN','RIGHT','PGDN','|']]
```

### 性能考虑

| 任务类型 | 安卓性能 |
|---------|-------------|
| Web 开发 (HTML/CSS/JS) | 优秀 |
| Python 脚本 | 优秀 |
| Node.js 应用 | 良好 |
| 运行测试套件 | 一般 |
| 编译大型项目 | 不推荐 |

### 优缺点

优点是完全的本地控制、无需依赖外部主机，以及离线优先操作。缺点是手机性能有限、文本输入体验较差，并且仅支持安卓。

---

## 方法 6: Claude Code UI

Claude Code UI（也称为 CloudCLI）是一个开源项目，为 Claude Code 提供网页界面，并支持手机浏览器。

### 工作原理

```text
┌─────────────┐              ┌─────────────┐              ┌─────────────┐
│Phone Browser│   ────────►  │ Web Server  │   ◄────────  │Claude Code  │
│             │  HTTP/HTTPS  │ (localhost) │   invoke     │    CLI      │
└─────────────┘              └─────────────┘              └─────────────┘
```

你在电脑上运行一个网页服务器，然后从手机浏览器访问它。这需要局域网访问或隧道。

### 安装和使用

**步骤 1：安装**

```bash
# one-command start (recommended)
npx @siteboon/claude-code-ui

# or global install
npm install -g @siteboon/claude-code-ui
claude-code-ui
```

**步骤 2：打开界面**

服务器默认设置为 `http://localhost:3001`。

**步骤 3：通过手机访问**

方法 A - 局域网访问（同一 Wi-Fi）：

```bash
# bind all interfaces
claude-code-ui --host 0.0.0.0

# access from phone
http://<computer-lan-ip>:3001
```

方法 B - ngrok 隧道：

```bash
# install ngrok
brew install ngrok

# start tunnel
ngrok http 3001

# open ngrok URL from phone
```

### 功能

- 响应式设计，支持移动设备
- 内置聊天界面
- 文件浏览器
- Git 操作界面
- 会话管理

### 优缺点

优点是图形界面和丰富的功能。缺点是局域网外需要隧道，相对设置较复杂。

---

## 方法 7：云开发环境

如果你没有一直开机的本地计算机，可以使用云开发环境，在云服务器上运行 Claude Code。

### 工作原理

```text
┌─────────────┐              ┌─────────────┐              ┌─────────────┐
│   Phone     │   ────────►  │ Cloud Box   │   ─────────► │Claude Code  │
│(Browser/App)│    HTTPS     │  (DevBox)   │              │    CLI      │
└─────────────┘              └─────────────┘              └─────────────┘
```

云容器预装了 Claude Code，你可以通过浏览器或移动应用访问它。

### 使用 Sealos DevBox

**第一步：创建环境**

访问 [Sealos DevBox](https://sealos.io/devbox)，选择一个 Claude Code 模板，并创建一个环境。

**第二步：启动开发环境**

大约 30-60 秒后环境就绪，你将获得一个网页终端。

**第三步：配置 Claude API**

```bash
export ANTHROPIC_API_KEY="your-api-key"
```

**第4步：连接Happy应用**

```bash
# install happy-coder (or use preinstalled)
npm install -g happy-coder

# generate pairing QR code
happy
```

在手机上扫描后，您可以立即使用它。

### 云选项比较

| 平台 | Claude 代码 | 移动端优化 | 启动时间 | 价格 |
|------|------------|----------|----------|------|
| Sealos DevBox | 预装 | Happy 支持 | ~60秒 | 按需付费 |
| GitHub Codespaces | 手动设置 | 浏览器流程 | ~2-3 分钟 | 免费额度按小时 |
| Gitpod | 手动设置 | 浏览器流程 | ~1-2 分钟 | 免费额度按小时 |
| Replit | 无原生 Claude 代码 | 原生应用 | 即时 | 免费 / 订阅 |

### 优缺点

优点是不需要本地电脑、环境一致性以及可扩展性。缺点是需要付费使用、依赖网络以及代码托管在云端。

---

## 比较与选择

每种方法有不同的优势，适合不同的场景。

### 比较表

| 方法 | 难度 | 是否需要隧道 | 成本 | 最佳场景 |
|------|------|-------------|------|----------|
| 官方 iOS 应用 | 简单 | 否 | $20/月 | 快速检查、简单任务 |
| Happy Coder | 相对容易 | 否 | 免费 | 日常使用、方便 |
| HAPI | 中等 | 否 | 免费 | 多模型、本地优先 |
| SSH + Tailscale | 相对复杂 | 否 | 免费 | 专业开发、全面功能 |
| Termux | 中等 | 否 | 免费 | 安卓本地开发 |
| Claude Code UI | 中等 | 是 | 免费 | 偏好网页界面 |
| 云 DevBox | 简单 | 否 | 按需付费 | 无本地电脑 |

### 选择指南

**如果您在中国大陆**：使用 **Happy Coder**；配合国内 API 中继设置效果很好。

**如果您想要最大便利**：请选择 Happy Coder。扫描即用的流程非常方便。

**如果您需要多模型支持**：选择 HAPI。它支持多个 AI 编程助手，非常适合模型切换的工作流。

**如果您有一台长期开机的电脑**：选择 SSH + Tailscale。这样可以获得最完整的体验。

**如果您是 iPhone 用户（中国大陆以外）**：官方应用是最简单的入门方式。

**如果您只有安卓设备**：Termux 提供完全本地的移动开发路径。

**如果您没有电脑**：云 DevBox 是理想选择。

---

## 安全与隐私

移动开发涉及代码在网络上传输，因此安全需要特别注意。

### 中继服务器的风险

在使用依赖中继的服务（如 Happy Coder 或 HAPI）时，需要考虑以下风险：

```text
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  What can a relay server potentially see?                  │
│                                                             │
│  • Data before encryption (if E2E is implemented poorly)   │
│  • Metadata (when you connect, how long sessions run)      │
│  • Your API key (if configured incorrectly)                 │
│                                                             │
│  What can a relay server potentially do?                   │
│                                                             │
│  • Record your code content                                │
│  • Steal API credentials                                   │
│  • Inject malicious commands                               │
│  • Abuse your device as an attack node                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 安全最佳实践

**1. 代码敏感性分级**

```text
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Public projects/learning code -> any approach is acceptable│
│                                                             │
│  Private projects -> prefer SSH+Tailscale or self-hosted   │
│                                                             │
│  Commercial code -> use SSH+Tailscale only, disable all    │
│  third-party relay paths                                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**2. 密钥管理**

```bash
# do not hard-code keys in source
const apiKey = "sk-ant-xxxxx"

# use environment variables
const apiKey = process.env.ANTHROPIC_API_KEY

# use .env files (add to .gitignore)
ANTHROPIC_API_KEY=sk-ant-xxxxx
```

**3. 使用沙盒模式**

Claude Code 支持沙盒模式以限制访问范围：

```bash
claude --sandbox /path/to/project
```

**4. 自托管中继**

如果使用 Happy Coder，可以考虑自托管中继：

```bash
# clone project (includes server implementation)
git clone https://github.com/slopus/happy.git
cd happy

# deploy server to your VPS
# follow project documentation for details
```

**5. 使用 Headscale**

Headscale 是 Tailscale 的开源实现，并且可以自托管：

```bash
# one-command Docker deployment
docker run -d \
  --name headscale \
  -v /srv/headscale:/etc/headscale \
  -p 3478:3478/udp \
  -p 8080:8080 \
  headscale/headscale:latest
```

---

## 常见问题解答

### 我需要 NAT 穿透吗？

大多数现代方法**不**需要手动 NAT 穿透：

| 方法 | 原理 |
|------|------|
| Happy Coder | 中继模式，双方主动连接服务器 |
| HAPI | 中继模式, WireGuard TLS |
| Tailscale | NAT 打孔或中继 |
| iOS 应用 | 云端执行 |
| Claude Code UI | 需要入站访问 |

### 为什么中继模式不需要穿透？

```text
Outbound connection (NAT allows):
Computer ──► Relay Server yes

Inbound connection (NAT blocks):
External ──► Computer no

Relay trick:
Both sides make outbound connections to the relay,
so neither side needs inbound connectivity.
```

### 移动开发会影响电池续航吗？

不同方法消耗不同的功耗：

|方法|功耗 |理由 |
|------|--------|------|
|SSH终端 |低 |纯文本渲染 |
|iOS应用 |中等 |云端执行，仅支持手机控制 |
|Termux |High |本地 CLI 运行时 |
|浏览器 |中介 |网页界面渲染加载 |

长时间使用时，保持手机充电。

### 网络断开时会发生什么？

|方法 |网络断开的影响 |
|------|-------------|
|SSH Tmux |Claude 继续运行;重新连接时恢复 |
|快乐的程序员 |自动重连 |
|HAPI |自动重连 |
|iOS 应用 |云端继续;应用显示断线 |
|Termux |会话中断 |

### 我可以在手机上编译大型项目吗？

不推荐。手机CPU和内存有限，大型配置可能导致：

- 显著加热
- 电池快速耗尽
- 编译时间非常长

在远程主机或云环境中运行繁重的构建任务。

---

## 摘要

Claude Code 移动开发的核心理念是：**手机是控制器，真正的开发在别处进行**。

你应该选择哪种方式取决于你的具体需求。

如果你在中国大陆，建议使用 **Happy Coder**，尤其是配合国内 API 中继配置时。

如果你想要最方便的设置，可以用**Happy Coder**。扫描连接，接收推送通知，顺畅切换设备。

如果你需要多模型支持或本地优先架构，可以使用**HAPI**。它支持多个助手和自托管中继。

如果你想要最完整的开发体验，可以使用**SSH Tailscale**。设置更复杂，但功能最接近桌面。

如果你是中国大陆以外的iOS用户，**官方应用**是最简单的入门方式。

如果你是安卓用户，**Termux** 支持手机的完全本地开发。

如果你没有常开电脑，**cloud DevBox**是理想的选择。

无论选择哪种方案，安全都很重要：敏感代码要谨慎使用第三方中继，妥善管理API密钥，并优先使用自托管或私有路径处理重要项目。

---

## 参考文献

### 官方资源

- [Claude Code 官方文档]（https://docs.anthropic.com/en/docs/claude-code） - 完整的官方 Claude Code 文档
- [Claude iOS 应用]（https://apps.apple.com/app/claude/id6473753684） - 官方 iOS 应用

### 开源项目

- [slopus/happy]（https://github.com/slopus/happy） （2.5k 星） - 快乐程序员移动客户端
- [tiann/hapi]（https://github.com/tiann/hapi） - HAPI 本地优先多模型 AI 编码助手
- [siteboon/claudecodeui]（https://github.com/siteboon/claudecodeui） - Claude Code UI（CloudCLI）
- [juanfont/headscale]（https://github.com/juanfont/headscale）（19k 星）- 开源 Tailscale 实现

### 中文教程

- [Code Anytime Anywhere： 配置电话上的 Claude 代码]（https://m.blog.csdn.net/haa_y/article/details/151156494） - Termux 设置指南
- [口袋中的AI实验室：始终在线的Claude Code移动工作流程]（https://www.cnblogs.com/swizard/p/19308983）- Tmux Docker 方法
- [我和女朋友一起去购物Claude代码]（https://post.m.smzdm.com/p/a3r7d63d/）- Tailscale远程连接
- [从手机构建生产应用]（https://m.toutiao.com/article/7611823834756301318/）——真实移动开发案例

### 英文资源

- [在手机上使用 Claude Code 的终极指南 | Sealos 博客](https://sealos.io/blog/claude-code-on-phone/) - 最全面的移动端指南
- [SSH  Tailscale  Termius 完整指南](https://m.blog.csdn.net/Lvyizhuo/article/details/157692953) - 详细的远程连接指南

### 工具下载

- [Tailscale](https://tailscale.com/download) - 点对点 VPN 工具
- [Termux (F-Droid)](https://f-droid.org/en/packages/com.termux/) - Android 终端模拟器
- [Blink Shell](https://blink.sh/) - iOS SSH 客户端（支持 MOSH）
- [Termius](https://termius.com/) - 跨平台 SSH 客户端