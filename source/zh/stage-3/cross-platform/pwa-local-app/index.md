# 如何打造本地PWA应用：将网站变成“真实应用”

# 1 什么是PWA和PWA发展

在这个教程中，我们将完成一个完整的闭环：**从普通的网页项目到一个“真正的应用”，可以安装在桌面和手机主屏幕，离线时依然能正常工作。** 你将亲自将React应用转为PWA，部署到网上，并安装在手机上进行测试。

我们将打造一个**番茄农场**应用——一款完美结合番茄工作法与农耕游戏的PWA。你通过25分钟的专注工作赚取积分，然后用这些积分购买种子和种植作物。随着等级提升，你会解锁更多农田和更好的种子。最重要的是，即使没有网络，它也能持续运行，所有数据都存储在本地。

对于这个教程，你至少应该具备：

- 一台计算机（Windows或Mac）
- Node.js环境（版本18.0及以上）
- 你的AI编码助手（Cursor / Trae / Claude Code等）
- 电话（用于移动安装测试）

## 1.1 PWA的定义

**PWA（渐进式网页应用）** 是一种特殊类型的网站。通过 **Service Worker** 技术，它获得了“缓存并自我接管”的能力。

### 为什么普通网站无法离线运行，而PWA可以

普通网站每次打开时都需要从服务器下载HTML、CSS和JS文件，因此如果网络瘫痪，根本无法加载。而PWA则使用**Service Worker**（浏览器后台运行的JavaScript脚本）在首次访问时将这些文件缓存到本地。之后，即使网络断开，Service Worker仍能直接从本地缓存读取文件并正常显示页面。

**一个简单的比喻**：普通网站就像每次都从图书馆借书（你必须有网络），而PWA就像买了书，然后放到自己的书架上（第一次下载后，你仍然可以离线阅读）。

### PWA vs 普通网站 vs 原生应用

|功能 |普通网站 |PWA |原生应用 |
|------|---------|-----|---------|
|**安装**不需要 |可选（添加到主屏幕）|必须从应用商店下载 |
|**离线使用** |❌不 |✅是的（缓存后）|✅是的 |
|**更新方法** |自动刷新 |自动/后台更新 |手动用户更新 |
|**大小** |无 |几百KB到几MB |数十MB或更多|
|**开发成本** |低 |低（单一代码库）|高（独立的 iOS / Android） |

**一句话总结**：PWA是“能够存储自身文件的网页”——它具有网站的轻便性（无需安装，自动更新），同时拥有原生应用的体验（离线支持，可安装到桌面或主屏幕）。

<!-- ![](../../../../zh-cn/stage-3/cross-platform/pwa-local-app/images/image1.png） -->

## 1.2 为什么选择PWA？

在Vibe编码时代，PWA是最经济实惠的“跨平台解决方案”之一：

| 比较维度 | 原生应用 | PWA |
|---------|---------|-----|
| 开发成本 | 必须分别开发 iOS / Android / 桌面版本 | 一个代码库适用于所有平台 |
| 安装方式 | 必须到应用商店 | 可在浏览器中直接安装，即装即用 |
| 更新方式 | 用户必须手动更新 | 自动更新，对用户不可见 |
| 包体积 | 通常几十 MB | 通常只有几百 KB |
| 离线支持 | 天然支持 | 通过 Service Worker 支持 |
| 最佳场景 | 需要深度硬件访问（AR / 蓝牙等） | 内容展示、工具、轻量级应用 |

**一句话总结**：如果你的应用不需要通过摄像头进行 AR 或蓝牙硬件访问，PWA 几乎是最简单的选择。

## 1.5 教程路线图

为了让学习过程不那么枯燥，本教程围绕一个有趣且实用的案例——**番茄农场**。它是一款将专注工作与游戏化奖励结合的番茄钟农场游戏。结合 AI 编程助手的 氛围编程 模式，我们将从零到手机安装的过程拆解成一个可复用的路线：

1. **建立认知与环境**：了解什么是 PWA，安装 Node.js 和 AI 编程助手，确保工具链顺畅。
2. **构建项目骨架**：创建一个可以本地运行的 React   TypeScript 项目。
3. **AI 迭代开发**：通过与 AI 对话，构建番茄钟倒计时、农场系统、等级系统、SVG 作物渲染等功能。
4. **PWA 配置与离线测试**：添加 Service Worker 和 Manifest，并验证离线支持。
5. **部署与手机安装**：部署到 Vercel 获取 HTTPS URL，然后在手机上安装使用。

本节仅给出大致流程，不展开具体命令。目前只需记住主线：**环境搭建 -> 骨架构建 -> AI 描述与生成 -> PWA 配置 -> 部署交付**。在接下来的章节中，我们将带你逐步完成每一步。

# 2 开发环境搭建

## 2.1 本教程使用的工具

在整个开发过程中，我们将同时使用三种工具，它们分别承担“设计”、“构建”和“验收”的角色。

- **AI 编程助手 (Cursor / Trae / Claude Code)**：这是你的**AI 编程伙伴**。在 氛围编程 模式下，我们不再需要逐行写代码，而是主要以自然语言告诉 AI 我们想要的功能，由它负责代码生成和修改。
- **Node.js   Vite**：这是**项目构建工厂**。Node.js 提供 JavaScript 运行环境，Vite 是新一代前端构建工具，速度极快，特别适合构建 PWA。
- **一部手机**：作为**测试设备**用来验证运行结果。你可以直接在手机浏览器访问已部署的 PWA，测试实际安装和离线功能。

## 2.2 安装 Node.js

Node.js 是 PWA 开发的基础环境。访问官方网站 [https://nodejs.org](https://nodejs.org) 并下载 **LTS（长期支持）** 版本（本教程基于 Node.js 18.x 及以上）。

下载完成后，像安装普通软件一样双击安装程序并保持默认选项。

安装完成后，打开终端（Windows 使用 CMD / PowerShell，Mac 使用 Terminal），运行：

```bash
node --version
npm --version
```

如果你看到类似 `v18.17.0` 和 `9.6.7` 的版本输出，这意味着安装成功。

<!-- 0 -->

## 2.3 安装 AI 编程助手

AI 编程助手是 **氛围编程** 的主要战场。你可以简单地理解为一个**“内置超强 AI 的编辑器”**。

**推荐选择：**

- **Trae**：访问 [https://www.trae.cn](https://www.trae.cn) 并下载与你操作系统匹配的版本
- **Cursor**：访问 [https://cursor.sh](https://cursor.sh) 并安装
- **Claude Code**：如果你已经在使用 Claude，可以直接使用 Claude Code

安装过程非常简单，就像安装普通软件一样。准备好这个工具后，在后续实践中我们不再需要盯着枯燥的代码窗口看。相反，我们将打开项目，在聊天框中使用自然语言，让 AI 编写代码并修复错误。

<!-- 0 -->

## 2.4 创建新项目

打开你的 AI 编程助手，在聊天框中输入以下提示语:

```text
Please help me create a React project named tomato-farm-pwa for building a Tomato Farm app.
It needs to support TypeScript, and also include PWA functionality (the kind that can be installed to a phone home screen).
```

人工智能将自动执行以下步骤：

**步骤1：创建项目**

```bash
npm create vite@latest tomato-farm-pwa -- --template react-ts
```

**步骤 2：进入项目并安装依赖**

```bash
cd tomato-farm-pwa
npm install
```

**步骤3：安装PWA插件**

```bash
npm install vite-plugin-pwa -D
```

在人工智能完成后，你的项目结构大致会是这样的：

```text
tomato-farm-pwa/
├── public/              # Static assets (icons, SVG materials go here)
├── src/
│   ├── App.tsx          # Main component
│   ├── main.tsx         # Entry file
│   └── App.css          # Styles
├── index.html           # HTML entry
├── vite.config.ts       # Vite config (PWA config goes here)
├── package.json
└── tsconfig.json
```

## 2.5 了解项目结构

在创建项目后，我们需要了解几个关键文件的作用：

| 文件/目录 | 作用 |
|----------|---------|
| `src/App.tsx` | 主应用组件，编写核心页面逻辑的地方 |
| `src/main.tsx` | 应用入口文件，负责挂载 React 应用 |
| `vite.config.ts` | Vite 配置文件，编写核心 PWA 配置的地方 |
| `public/` | 静态资源目录，放置 PWA 图标和 SVG 资源 |
| `index.html` | HTML 入口文件，通常不需要修改 |

作为初学者，我们主要需要关注三部分：

- `App.tsx`：控制程序行为，决定“屏幕上显示什么”
- `vite.config.ts`：配置 PWA 行为，决定“应用如何安装和缓存”
- `public/`：存放应用图标和资源

## 2.6 准备应用图标

PWA 在安装前需要图标。至少我们需要两张 **192x192** 和 **512x512** 的 PNG 图片。

你可以让 AI 来生成它们：

```text
Please help me generate two app icons with sizes 192x192 and 512x512.
Use a green gradient background and draw a red tomato in the middle. Save them in the public folder.
```

或者你也可以使用任何设计工具（Figma、Canva）创建你自己的图标，并将它们放入 `public/` 目录中。

<!-- 0 -->

## 2.7 配置 `vite-plugin-pwa`

这是最关键的步骤。打开 `vite.config.ts` 并让 AI 配置 PWA 插件：

```text
Please help me change vite.config.ts into a PWA configuration so the webpage can be installed to a phone home screen:
- The app name is "Tomato Farm", with a green theme
- Use icon-192.png and icon-512.png from the public directory as icons
- Enable automatic updates
- Cache all js, css, html, and image files so the app can work offline
```

人工智能将生成类似这样的配置：

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Tomato Farm',
        short_name: 'Tomato Farm',
        description: 'Focus, plant, and grow',
        theme_color: '#4CAF50',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      }
    })
  ]
})
```

**关键配置说明：**

* `registerType: 'autoUpdate'`：当你发布新版本时，用户下次打开应用时会自动更新，无需手动操作。
* `display: 'standalone'`：安装后，它在自己的窗口中运行，没有浏览器地址栏，感觉像原生应用。
* `workbox.globPatterns`：告诉 Service Worker 哪些文件类型应该被缓存，并在离线时仍然可以访问。

<!-- 0 -->

# 3 构建番茄农场 PWA

在前两个章节中，我们已经了解了什么是 PWA，并完成了环境设置。从本节开始，我们将不再只停留在理论，而是进入实际操作。我们将使用 氛围编程 模式从零开始构建一个有趣且实用的应用——**番茄农场**。它完美结合了番茄工作法与游戏化激励，并涵盖了 PWA 开发的核心要素：**UI 交互（番茄计时器）、数据存储（积分和作物）、以及离线功能（Service Worker 缓存）**。

现在，让我们向 AI 发送第一条指令。

## 3.1 第一个“主提示”：从零到一

在 氛围编程 模式下，我们不需要遵循传统的先创建布局文件再编写逻辑代码的方法。我们需要做的是**一次性清晰地描述需求，让 AI 生成第一个可运行版本**。

在你刚创建的项目目录中打开 AI 编码助手，然后输入以下提示：

```text
Please help me write the main page for the Tomato Farm app, with the following functions:

**Pomodoro Timer**
- A 25-minute countdown timer with start, pause, and reset
- Show remaining time and a progress bar
- Give the user 10 points after completing one focus session

**Farming System**
- 3 plots of farmland, but initially only the first one is available; the later ones are unlocked after leveling up
- A shop to buy seeds: carrot costs 5 points, tomato 10 points, corn 15 points
- After buying seeds and planting them, crops slowly grow, and when mature they can be harvested for points

**Level System**
- Level by total points: 0-100 points = Beginner Farmer, 100-300 = Skilled Farmer, above 300 = Farm Master
- Unlock new land and better seeds after leveling up

**UI Design**
- Top shows level, points, and upgrade progress bar
- Middle shows the Pomodoro countdown
- Below is the farmland grid
- Bottom has the shop button
- Use a green theme and make it look fresh and cute
- Must adapt to phone screens

**Data Saving**
- All data (points, level, farmland state) must be saved, and refreshing the page should not lose it
```

发送后，你将看到 AI 开始推理和分析你的项目结构。几秒钟后，它将直接为 `App.tsx` 生成完整代码。

1. 从它的回复中，我们可以看到它的推理逻辑和交互逻辑
2. 我们可以直接看到它修改了哪些代码
3. 如果不满意，我们可以回滚到上一个版本

<!-- 0 -->

## 3.2 运行与预览（本地开发服务器）

现在 AI 已经完成了第一轮开发，但请记住：我们在编码助手中看到的仍然只是代码“蓝图”，并不是一个真正可交互的应用。我们需要启动本地开发服务器，这样才能真正运行代码并查看实际效果。

在你的 AI 编码助手终端中运行如下命令：

```bash
npm run dev
```

几秒钟后，终端将显示如下输出：

```text
  VITE v5.0.0  ready in 300 ms

  ->  Local:   http://localhost:5173/
  ->  Network: use --host to expose
  ->  press h + enter to show help
```

在你的浏览器中打开 `http://localhost:5173/`，你应该会看到：

- 顶部显示等级、积分和进度条
- 中间有番茄钟倒计时
- 下方是农田区域
- 底部有商店按钮

尝试点击“开始专注”按钮，看看倒计时是否正常工作。点击农田方块，看看是否可以购买种子并种植。这是你 PWA 应用的第一个版本。

<!-- 0 -->

## 3.3 优化迭代（添加 SVG 作物和动画）

此时，我们的应用已经有了基本雏形：番茄钟、农耕系统和升级系统。但它可能看起来仍然很粗糙，作物或许只显示为文字或简单的方块。接下来，我们将添加精美的 SVG 作物和生长动画，让番茄农场真正活起来。

**这正是 氛围编程 的魅力所在。** 在传统开发中，绘制 SVG 图形和构建复杂生长动画对初学者来说可能是一场噩梦。你不仅需要处理 SVG 路径绘制，还要计算动画曲线。在 氛围编程 模式下，你无需担心这些底层细节。你只需像导演一样告诉 AI：“给作物更漂亮的 SVG 图形并让它们带动画生长，”复杂的代码几乎瞬间就生成了。

**步骤 1：准备 SVG 作物素材**

你可以让 AI 直接在代码中绘制 SVG，或者准备 SVG 文件并放在 `public/` 下。在本教程中，我们推荐直接让 AI 生成 SVG 代码，因为这样更灵活。

**步骤 2：发送迭代指令**

回到 AI 编程助手，输入以下提示：

```text
Please make the crops look better and add growth animation:

**Crop graphics**
- Carrot: orange body with green leaves
- Tomato: red round shape with little green leaves
- Corn: yellow corn cob with green outer leaves
Just use simple shapes

**Growth animation**
- When first planted, it starts as a small sprout and gradually grows to maturity
- Show 3 stages

**Harvest effect**
- When clicking a mature crop, play a simple harvest animation
- Show how many points were gained

**Overall polish**
- Farmland tiles should have borders and background color
- Crops should appear centered in the tile
- Overall style should feel a little cuter
```

AI 将再次修改代码，并处理 SVG 渲染和动画逻辑。完成后，刷新浏览器，你应该能看到更好的作物图形和流畅的生长动画。

<!-- 0 -->

## 3.4 添加音效和通知（可选）

如果你想让番茄农场感觉更沉浸，也可以添加音效和通知。这同样只需要一个简单的提示：

```text
Please add sound effects and notifications to Tomato Farm:

**Sound effects**
- Play a "ding" when focus starts
- Play a victory sound when focus is completed
- Also add matching sound effects for planting and harvesting

**Notifications**
- Show "Congratulations, you finished a focus session!" after a focus cycle ends
- Show "Congratulations, you leveled up to XX!" when leveling up
- Show "You unlocked a new farmland plot!" when new land is unlocked

You can implement this with simple audio files or the Web Audio API
```

AI 将帮助你添加音效和通知，使番茄农场更加生动有趣。

<!-- 0 -->

# 4 本地体验 PWA

## 4.1 构建和预览

PWA 服务工作者只在生产构建中生效（在开发模式下不会注册）。所以我们需要先构建，然后预览：

```text
Please help me run these commands:
1. npm run build (build production version)
2. npm run preview (start local preview server)
```

构建后，Vite 会生成 `dist/` 目录中的所有文件，包括自动生成的 `sw.js`（服务工作者）和 `manifest.webmanifest`。

预览服务器启动后，打开终端显示的地址（通常是 `http://localhost:4173`）。

## 4.2 在桌面上安装PWA

打开预览网址后，你会注意到浏览器地址栏右侧出现一个**安装图标**（通常是小的下载箭头或“”“标志）。

**Chrome / Edge 安装步骤：**

1. 点击地址栏右侧的安装图标
2. 在弹窗对话框中点击**安装**
3. PWA会在独立窗口中打开，并在你的桌面/开始菜单/Dock上创建快捷方式

安装后的PWA看起来就像原生桌面应用——没有地址栏、没有标签页，有自己的窗口和图标。现在你可以随时打开Tomato Farm，开始你的专注与耕作之旅。

<!-- 0 -->

**macOS Safari 安装步骤：**

1. 在Safari中打开PWA网址
2. 点击**文件->添加到Dock**
3. PWA图标会出现在Dock中

## 4.3 离线测试能力

这是PWA最酷的部分。让我们验证离线模式是否真的有效：

1. 确保 PWA 至少在浏览器中打开过一次（以便服务工作者缓存资源）
2. **断开网络**（关闭Wi-Fi或拔掉线缆）
3. 刷新页面——你会发现**Tomato Farm依然正常加载！**
4. 开始番茄钟游戏——结束后你会获得积分、购买种子、种植作物——所有数据仍正常保存在`localStorage`

你也可以打开Chrome DevTools（F12）->应用->服务工作者，检查服务工作者状态和缓存资源列表。

<!-- 0 -->

## 4.4 数据持久化与同步选项

现在你的番茄农场已经可以离线运行，所有数据都保存在浏览器的`localStorage`中。但有一个关键问题：**如果用户切换设备或清除浏览器数据，所有农场数据都会丢失**。对于严肃的生产应用，我们需要考虑数据持久性和跨设备同步。

### 4.4.1 本地存储的局限性

我们目前使用的`localStorage`有几个明显的局限性：

|限制 |描述 |
|--------|------|
|**设备绑定** |数据只存储在当前设备上的当前浏览器中;切换设备意味着数据丢失 |
|**容量有限**通常只有5-10MB的存储空间 |
|**容易丢失** |清除浏览器数据或卸载PWA会导致数据丢失 |
|**无法同步** |手机进度无法同步到桌面 |

如果你的番茄农场只是个人工具，这可能不是问题。但如果你希望用户长期投资并积累数据，就需要更可靠的解决方案。

### 4.4.2 选项1：云同步（推荐）

最可靠的解决方案是将数据同步到云数据库。对于PWA，**Supabase**是极佳的选择——它提供PostgreSQL数据库、实时订阅和认证，并且提供免费套餐。

**实施理念：**

1. **用户登录**：使用电子邮件或社交登录确认用户身份
2. **自动数据同步**：所有操作都会自动保存到云端
3. **离线优先**：应用离线时依然可用，网络恢复时会自动同步
4. **跨设备同步**：桌面端手机进度可立即查看

**提示示例：**

```text
Please help me migrate Tomato Farm data storage from localStorage to Supabase cloud sync:

**Functional requirements**
- Add user login (email + password or Google login)
- Save user data (points, level, farmland state) to Supabase database
- Still work offline, and automatically sync when the network recovers
- Support multi-device sync, so crops planted on the phone can also be seen on desktop

**Tech stack**
- Use @supabase/supabase-js client
- Implement optimistic updates (update UI first, then sync to cloud)
- Add a simple sync status indicator
```

**优点：**

- 数据不会丢失；用户在更换设备时只需重新登录
- 免费套餐足够用于个人项目
- 支持实时订阅，提供良好的多设备同步体验

**缺点：**

- 需要用户注册/登录，增加使用障碍
- 同步需要网络连接

### 4.4.3 选项 2：导出 / 导入备份

如果你不想增加后端服务，一个更简单的折中方案是**手动备份和恢复**。

**实现思路：**

1. **导出**：将农场数据打包为 JSON 文件，并让用户下载
2. **导入**：用户可以选择之前导出的 JSON 文件来恢复数据
3. **自动提醒**：定期提醒用户进行备份

**提示示例：**

```text
Please add data backup functionality to Tomato Farm:

**Export**
- Add an "Export Data" button on the settings page
- Package all data in localStorage into a JSON file
- Automatically download it to the user's device

**Import**
- Add an "Import Data" button that accepts a JSON file
- Validate file format before restoring
- Show a warning before import because it overwrites current data

**Automatic reminders**
- If the user has not backed up for over 7 days, show a friendly reminder
```

**优点：**

- 实现简单，无需后端服务
- 用户完全控制自己的数据
- 通过共享导出文件可在设备间传输

**缺点：**

- 需要手动操作，使用体验不流畅
- 如果用户忘记备份，数据可能仍然丢失

### 4.4.4 选项 3：浏览器扩展同步（针对 Chrome 用户）

如果你的 PWA 主要面向 Chrome 用户，可以考虑 **Chrome Storage Sync API**。这是 Chrome 提供的跨设备同步存储服务，数据会自动与用户的 Google 账户同步。

**注意：** 这需要将 PWA 打包成 Chrome 扩展，更适合有技术经验的开发者。

### 4.4.5 推荐选择策略

| 场景 | 推荐方案 |
|------|----------|
| 个人轻量工具 | 仅 `localStorage` 就足够 |
| 想避免数据丢失，但不想增加复杂性 | 导出 / 导入备份 |
| 官方产品，注重用户体验 | Supabase 云同步 |
| 主要用户为 Chrome 用户 | Chrome Storage Sync |

**对于像番茄农场这样的应用，我的建议是：**

1. **MVP 阶段**：使用 `localStorage` 快速验证产品想法
2. **迭代阶段**：增加导出 / 导入备份，让用户有数据安全保障
3. **成熟阶段**：整合 Supabase，实现真正的云端同步

记住：**渐进增强** 是 PWA 的核心理念。先让应用能运行，然后逐步增加更高级的功能。

<!-- 0 -->

# 5 在线部署

PWA 必须在 HTTPS 下运行才能正常工作。好消息是主流部署平台现在都提供免费的 HTTPS。我们将以 **Vercel** 为例（你也可以使用 Netlify 或 GitHub Pages）。

## 5.1 部署到 Vercel

**步骤 1：安装部署工具**

```text
Please help me install Vercel's deployment tool
```

**第2步：部署项目**

```text
Please help me deploy this project to Vercel. The project name is tomato-farm-pwa
```

AI 将自动处理部署步骤。您只需：
- 选择您的账户
- 确认创建一个新项目
- 保持其他选项为默认值

等待几十秒后，Vercel 将自动构建并部署您的项目。完成后，您将获得一个类似 `https://tomato-farm-pwa.vercel.app` 的 HTTPS URL。

<!-- 0 -->

**步骤 3：验证 PWA**

在浏览器中打开已部署的 URL，您应该可以看到：

1. 地址栏右侧出现安装图标
2. 在 DevTools -> Application -> Manifest 中，显示您配置的应用信息，如名称 "Tomato Farm"
3. 在 Service Workers 标签中，Service Worker 显示为已激活

## 5.2 使用 GitHub Pages 部署（备选）

如果您更喜欢 GitHub Pages，则需要额外的路径配置：

```text
Please help me modify the config so the project can be deployed to GitHub Pages.
My repository name is tomato-farm-pwa, so please adjust the path configuration accordingly.
```

然后将构建输出推送到你 GitHub 仓库的 `gh-pages` 分支。

# 6 在手机上安装PWA

最令人兴奋的部分是——把你的番茄农场网页变成手机上的“应用”。

## 6.1 安装在安卓上

1. 在手机的**Chrome浏览器**中打开你已部署的Tomato Farm PWA网址
2. Chrome 可能会自动显示**“添加到主屏幕”**提示横幅——只需点击它
3. 如果不自动显示，点击右上角的**三点菜单** -> **安装应用**或**添加到主屏幕**
4. 确认安装，手机主屏幕上会出现一个番茄农场应用图标

打开它，你会发现它以全屏模式运行，没有浏览器地址栏或导航按钮，看起来几乎和原生应用一模一样。现在你可以随时开始专注和刷素材。

<!-- 0 -->

## 6.2 在iPhone上安装

在 iOS 上，PWA 只能通过 **Safari** 浏览器安装（其他浏览器不支持安装）：

1. 在 **Safari 中打开你部署的 Tomato Farm PWA URL
2. 点击底部的**分享**按钮（方块带向上箭头）
3. 在菜单中选择**添加到主屏幕**
4. 给应用命名并点击**添加**

从 iOS 26 开始，所有添加到主屏幕的网站默认会以独立应用模式打开，这是一项重大改进。

<!-- 0 -->

> **iOS已知的限制：**
> * 推送通知需要iOS 16.4及以上版本，且PWA必须已经添加到主屏幕
> * 不支持后台同步
> * 存储空间比安卓更有限

## 6.3 用Lighthouse审计你的PWA

谷歌提供了一个叫做**Lighthouse**的工具，可以为你的PWA评分。打开Chrome DevTools（F12）->Lighthouse->勾选“渐进式网页应用”->点击“分析页面加载”。

合格的番茄农场PWA应在PWA类别中获得满分。如果不行，Lighthouse会告诉你具体原因并提出解决方案。

<!-- 0 -->

# 7 最后的注释

恭喜！你成功构建了一个番茄钟农场 PWA，可以安装在桌面端和移动端。让我们回顾一下我们的做法：

1. 用 Vite React 创建了一个 Tomato Farm 网页应用
2. 新增服务人员及清单，通过`vite-plugin-pwa`
3. 部署到 Vercel 获取 HTTPS URL
4. 成功在桌面和移动端安装，并测试了离线功能

现在，您的番茄农场PWA已经能够实现：
* **专注耕作**：通过番茄钟机制帮助用户保持专注
* **游戏化奖励**：利用种植、升级和解锁来激励反复使用
**离线可用性**：即使没有网络，用户仍能专注于、种植和管理农场
* **跨平台安装**：一次性开发后安装于多种设备上

PWA的魅力在于它的“渐进性”——你不需要一开始就做到完美。首先让网站可安装并离线访问，然后逐步添加推送通知和后台同步等高级功能。

**高级说明：**

* **推送通知**：使用 Push API 和 Notification API 在番茄钟结束或作物准备收获时提醒用户
* **后台同步**：使用 Background Sync API 在网络恢复后将农场数据同步到云端
* **更智能的缓存策略**：针对不同类型的资源使用不同的 Workbox 策略，如 CacheFirst、NetworkFirst 和 StaleWhileRevalidate
* **发布到应用商店**：使用 [PWA Builder](https://www.pwabuilder.com/) 将 Tomato Farm PWA 打包成 Android APK 或 Microsoft Store 应用
* **社交功能**：添加好友系统，让用户可以访问彼此的农场并交换作物

***一份代码库，覆盖所有平台——这就是 PWA 的力量。专注、种植、成长！***

# 参考资料

* [Vite PWA 官方文档](https://vite-pwa-org.netlify.app/guide/)
* [Google PWA 开发指南](https://web.dev/progressive-web-apps/)
* [MDN Web 应用清单文档](https://developer.mozilla.org/en-US/docs/Web/Manifest)
* [Workbox 缓存策略概览](https://developer.chrome.com/docs/workbox/caching-strategies-overview/)
* [PWA Builder - 将 PWA 发布到应用商店](https://www.pwabuilder.com/)