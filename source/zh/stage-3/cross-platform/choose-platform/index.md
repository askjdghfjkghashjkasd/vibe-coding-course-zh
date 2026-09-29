# 如何为你的申请选择合适的平台

你有一个想法，想把它变成真正的产品。但面对这么多平台选项——微信小程序、iOS应用、安卓应用、网站、浏览器扩展、桌面应用——你应该从哪里开始呢？

::: 提示 💡 快速导航
如果你已经了解每个平台的特性，可以直接跳转到[第2节]（#2-问自己三个问题先）查看决策过程，或者查看[第7节的决策流程图]（#7-summary-platform-selection-decision-flow）。
:::

本文将帮助你理清思路，并根据你的具体情况找到最合适的开发平台。

## 1 先了解这些平台

在讨论“选择哪种”之前，先了解“有哪些平台存在”。以下是目前主流平台的类别：

### 1.1 移动平台

#### iOS 原生应用

你从 iPhone 上从 App Store 下载的应用是 iOS 原生应用。它们的功能包括：快速启动、流畅体验，以及完全访问手机功能（相机、定位、健康数据等）。但开发需要 Mac，App Store 发布也需要苹果审核。

**常见例子**：微信、抖音（TikTok中国）、小红书、Keep、美团、支付宝

#### 安卓原生应用

从安卓应用商店下载的应用，或从朋友发送的APK文件安装的应用，属于安卓原生应用。它们类似于iOS应用，但安卓拥有更多用户和更多分发渠道。缺点是设备碎片化：开发者必须适应多种屏幕尺寸和系统版本。

**常见示例**：Tasker（自动化）、MX Player（视频播放器）、AirDroid（手机管理器）、Greenify（电池优化）、Xposed Framework（系统定制）

#### 微信小程序

这些“小型应用”可以通过扫描代码或按名称搜索直接在微信内部使用，无需安装。优点是用户摩擦低：每个人都已经有微信，用户可以立即开始使用。缺点是功能有限，且仅运行在微信内部。

**常见例子：拼多多（群购电商）、美团外迈（本地服务）、摩拜（共享单车）、跳跃跳跃（小游戏）、周黑屋（订购/购物）

#### PWA（渐进式网页应用）

听起来很技术，但基本上就是“一个可以像应用一样安装的网页”。当用户在移动浏览器中打开网站时，可能会看到“添加到主屏幕”。轻触一次后，主屏幕上会出现一个图标，表现得像应用程序。优势是移动端和桌面端都有一个代码库。缺点是许多用户不了解这种使用模式。

**常见例子**：Twitter Lite、星巴克、Pinterest、Uber、Spotify 网页播放器

### 1.2 桌面平台

#### 电子桌面应用

你可能每天都用到：VS Code、Slack、Discord、Notion、Figma——这些都是用Electron构建的。关键功能是：用网页技术（HTML、CSS、JavaScript）构建桌面软件，并在Windows、Mac和Linux上运行一个代码库。缺点是安装程序更大，运行时内存占用更高。

**常见例子**：VS Code、Slack、Discord、Notion、Figma、微信开发工具

#### Qt 桌面应用

如果你用过WPS、VirtualBox或OBS，它们可能是用Qt构建的。Qt用的是C语言，性能和稳定性都很好，尤其适合工业场景。但学习曲线更高，而且需要掌握C语言。

**常见示例**：WPS Office、VirtualBox、Autodesk Maya、Telegram 桌面版、OBS Studio

#### 原生桌面应用

这些“重量级”应用通常使用原生技术构建。Windows 常用 C# 或 C，macOS 使用 Swift。它们提供最佳性能和最流畅的体验，但 Windows 和 macOS 版本必须分别开发，成本高昂。

**常见示例**：Microsoft Office、Adobe Photoshop、Final Cut Pro、微信（Windows/Mac）、QQ 音乐

### 1.3 与网页相关的平台

#### 网站

这些是通过在浏览器中输入 URL 打开的页面。优点：可在任何设备（手机、电脑、平板）访问，无需安装，并且可以被搜索引擎检索。缺点：需要网络连接，因此离线无法使用。

**常见示例**：淘宝、知乎、GitHub、哔哩哔哩、掘金、CSDN

#### 浏览器扩展

你是否使用过广告拦截器、翻译工具或密码管理器？这些就是浏览器扩展。它们在浏览器内运行，可以读取/修改网页内容。例如，安装一个翻译扩展，就可以一键翻译英文页面。优点：轻量，随浏览器启动。缺点：仅在浏览器中有效，扩展在 Chrome、Edge 和 Firefox 之间并不总是兼容。

**常见示例**：AdBlock Plus、Immersive Translate、1Password、Grammarly、Tampermonkey、Dark Reader

### 1.4 其他平台

#### VS Code 扩展

如果你是开发者，很可能使用 VS Code。VS Code 扩展是“小型程序”，用于“增加编辑器功能”。优点：面向高度特定的开发者群体。缺点：仅对开发者用户有用。

**常见示例**：Prettier、GitLens、GitHub Copilot、ESLint、Live Server、中文语言包

#### NFT 智能合约

你可能听说过 NFT——那些售价数百万的“数字头像”。NFT 本质上是基于区块链的所有权证书，证明某个数字物品属于你。智能合约是在区块链上运行的程序，用于创建和管理 NFT。优点：防篡改且可交易。缺点：技术门槛高且市场波动大。

**常见示例**：BAYC、CryptoPunks、NBA Top Shot、Azuki、Moonbirds

### 1.5 还有更多选项吗？

除了上述平台，还有“中间路径”和更多可能性：

#### 跨平台框架

::: details 点击查看跨平台框架详情

**React Native / Flutter**：想同时支持 iOS 和 Android，却不想写两套代码？这些框架可以一次编写，生成两平台应用。许多公司在使用，如 Airbnb 和 Instagram。

**Tauri**：“轻量级替代方案” Electron。它同样使用网页技术构建桌面应用，但安装包更小、运行更快。缺点：生态系统不够成熟。

**uni-app**：在中国非常流行。一套代码即可面向微信小程序、iOS 应用、Android 应用和 H5 网站。适合希望“一次构建，到处运行”的团队。

**Capacitor / Ionic**：已经有网站，想快速转换为应用？这些工具可以将网站“封装”为可安装的应用，用于应用商店。

这些框架本质上是在原生开发和网页开发之间的权衡：开发效率更高，但在性能和体验上有所妥协。
:::

#### 中国小程序生态

::: details 点击查看中国小程序选项

**支付宝小程序**：金融和本地服务场景。如果你的用户在支付宝上支付账单、点餐或使用交通工具，那么支付宝小程序是合适的。类似芝麻信用和信任身份的功能在支付宝独有。

**抖音小程序**：内容电商和直播销售。如果你在抖音上销售产品，小程序可以在视频下方附加，实现即时转化。

**快手小程序**：下沉市场和强社区经济。快手用户参与度高，适合社区团购和本地服务。

**百度小程序**：搜索流量入口。如果用户在百度搜索“附近的餐厅”，你的小程序可以直接出现在搜索结果中。
:::

#### 鸿蒙生态

**鸿蒙应用**：可以在华为手机、平板、手表和智能家居设备上运行。使用 ArkTS（类似 TypeScript）开发，一个代码库可以支持多种设备。如果你的受众在华为生态中，或者你的产品涉及物联网联动，鸿蒙是一个关键选择。

#### 更多开发者工具

::: details 点击查看更多开发者工具选项

**命令行工具（CLI）**：开发者每天使用终端。CLI 工具可以自动化重复工作、生成代码模板和部署项目。例如包括 `create-react-app`、`git` 和 `npm`。适合提升开发效率和 DevOps 自动化。

**JetBrains 插件**：除了 VS Code，很多开发者使用 IntelliJ IDEA、PyCharm 和 WebStorm。如果你的工具面向 Java、Python 或前端开发者，JetBrains Marketplace 也值得考虑。

**Cursor / Windsurf 插件**：新兴的 AI 编程工具生态系统。如果你在构建 AI 辅助编程功能，这些 IDE 插件生态正在快速成长。
:::

#### 社区机器人

::: details 点击查看社区机器人选项

**Telegram 机器人**：海外用户基础大，API 开发者友好。适合通知、自动化任务和社区管理。许多加密项目和开发者社区使用 Telegram。

**Discord 机器人**：游戏和开发者社区的核心平台。适用于音乐播放、游戏数据查询和服务器管理。如果你的用户是游戏玩家或海外开发者，Discord 机器人通常必不可少。
:::

#### 设计和生产力工具

::: details 点击查看设计工具选项

**Figma 插件**：设计师每天使用 Figma。插件可以自动化设计工作流程、生成代码并管理设计系统。适合设计工具和前端辅助。

**Notion 集成**：通过 Notion API 可以自动化工作流程、同步数据和生成报告。适合知识管理和项目管理工具。
:::

#### 空间计算

**visionOS 应用（Apple Vision Pro）**：空间计算新时代。适合 3D 内容展示、沉浸式体验、教育/培训和虚拟协作。技术门槛高，但作为前沿探索，这是未来方向。

---

## 2 先问自己三个问题

在选择平台之前，请先回答以下三个核心问题：

<el-card shadow=“悬停” style=“边距：20px 0;border-radius：12px;border-left：4px 实心 #409EFF;”>
  <模板 #header>
    <div style=“display： flex;align-items： center; gap： 8px;”>
      <span style=“font-size： 20px;”> 🎯</span>
      <span style=“font-weight： blo; font-size： 16px;”>问题1：你的用户在哪里？</span>
    </div>
  </template>
  <div style=“行高：1.8;color： #606266;”>
    <ul>
      <li>用户需要随时随地使用吗？（移动优先）</li>
      <li>用户习惯在微信内完成任务吗？（小程序）</li>
      <li>用户会在办公场景中长时间使用吗？（桌面应用）</li>
      <li>用户需要通过搜索引擎找到你吗？（网站）</li>
    </ul>
  </div>
</el-card>

<el-card shadow=“hover” style=“margin： 20px 0; border-radius： 12px; border-left： 4px 实心 #67C23A;”>
  <模板 #header>
    <div style=“display： flex;align-items： center; gap： 8px;”>
      <span style=“font-size： 20px;”> ⚡</span>
      <span style=“font-weight： borgan; font-size： 16px;”>问题2：你的应用需要哪些功能？</span>
    </div>
  </template>
  <div style=“行高：1.8;color： #606266;”>
    <ul>
      <li>它需要访问摄像头、麦克风、GPS或其他硬件吗？</li>
      <li>需要离线支持吗？</li>
      <li>需要推送通知吗？</li>
      <li>它需要处理大量本地数据吗？</li>
    </ul>
  </div>
</el-card>

<el-card shadow=“hover” style=“margin： 20px 0; border-radius： 12px; border-left： 4px 实心 #E6A23C;”>
  <模板 #header>
    <div style=“display： flex;align-items： center; gap： 8px;”>
      <span style=“font-size： 20px;”> 💰</span>
      <span style=“font-weight：加粗;font-size：16px;”>问题3：你有多少资源？</span>
    </div>
  </template>
  <div style=“行高：1.8;color： #606266;”>
    <ul>
      <li>你的开发时间预算是多少？</li>
      <li>你有Mac设备吗（iOS开发必备）？</li>
      <li>你需要同时覆盖多个平台吗？</li>
    </ul>
  </div>
</el-card>

---

## 3 平台选择决策表

请使用这张表格快速识别你的合适度：

|你的情景 |推荐平台 |为什么 |
|---------|---------|------|
|用户在微信生态中，你想要快速的用户增长 |<el-tag type=“成功”>微信迷你程序</el-tag> |无需下载，微信分享简单，获取成本低 |
|需要持续的后台GPS追踪和健康数据访问 |<el-tag类型=“primary”>iOS / Android 原生</el-tag> |直接系统API访问，最佳性能 |
|想要一个代码库支持多个平台 |<el-tag 类型=“warning”>PWA / Electron</el-tag> |高效，低维护成本 |
|用户需要长时间在电脑上会话 |<el-tag type=“primary”>桌面应用</el-tag>（Electron / Qt） |独立窗口，离线支持，强系统集成 |
|浏览时需要自动摘要/翻译/密码管理 |<el-tag 类型=“info”>浏览器扩展</el-tag> |可以读取/修改网页内容，浏览器启动 |
|想让技术文章/项目展示被谷歌索引 |<el-tag type=“warning”>网站 / 个人博客</el-tag> |SEO友好、可搜索内容 |
|想发行可交易的数字会员卡或收藏品 |<el-tag 类型=“danger”（危险）>NFT 智能合约</el-tag> |链上所有权，可转让/交易 |

---

## 4 实际场景示例

### 场景1：我想打造一个社区群购工具

** 💡 推荐：微信小程序 **

为什么选择迷你项目？

- **用户已在微信**：社区用户活跃于微信群组;迷你程序可直接在群中分享
- **用完就走的行为**：没人愿意安装专门的应用来点菜
- **无缝支付**：一键微信支付，无需切换上下文
- **低用户获取成本**：一个群组共享流程可带来数十用户

::: 提示 💡 适用场景
如果你的产品类似——团购、预订、调查、活动报名——迷你项目通常是首选。
:::

---

### 情景二：我想开发一个跑步追踪应用

** ⚡ 推荐：iOS / Android 原生版本**

为什么选择原生应用？

- **后台运行**：应用在运行过程中必须跟踪路线，而迷你程序和网站无法可靠地完成这点
- **GPS 精度**：原生应用可以访问高精度位置，误差范围很小
- **健康数据访问**：步数和心率访问需要Apple HealthKit / Google Fit
- **可靠的推送提醒**：每日“该跑了”提醒最好通过原生推送实现

::: 警告 ⚠️ 重要提示
任何需要**长期后台执行**或**深度硬件访问**的应用都应该选择原生开发。
:::

---

### 情景三：我想开发一个记账应用

** 📝 推荐：PWA或迷你程序**

为什么？

- **高频率但短时间录音**：每天录制一首，30秒完成
- **无复杂硬件需求**：主要是数据录入和显示
- **强烈的跨平台要求**：用户可以在电话录制并在桌面端查看报告
- **离线场景**：用户可能想在地铁无信号的情况下记录费用

PWA可以安装在主界面，感觉像个应用，而开发成本大约只有原生的三分之一。迷你程序通常更适合中国用户。

---

### 情景4：我想打造一个在线教育平台

** 📚 推荐：网站迷你程序组合**

为什么？

- **网站负责获取**：课程页面、教师简介、SEO优化
- **迷你程序处理转换**：试用课程、报名付款、通过二维码加入组别
- **网站负责配送**：视频播放在较大屏幕上更佳
- **迷你程序处理接触点**：课堂提醒和作业通知

::: 提示 💡 组合策略
复杂的业务通常需要**多平台组合**，而非单一平台。
:::

---

### 情景5：我想构建一个团队协作工具

** 🤝 推荐：Electron桌面应用网页版**

为什么？

- **桌面端**：用户在工作时保持电脑开机;桌面应用可以驻留并接收消息
- **网页端**：在未安装的情况下临时在其他计算机上使用
- **系统集成**：桌面应用可访问本地文件、系统通知和快捷方式
- **一个代码库**：Electron使用Web堆栈，桌面/网页可重用约80%的代码

Slack、Notion和Discord都遵循这种模式。

---

### 场景6：我想构建一个密码管理器

** 🔐 推荐：桌面应用浏览器扩展**

为什么？

- **桌面应用**：安全的本地密码数据库存储，支持生物识别解锁
- **浏览器扩展**：登录页面自动填充，无需切换窗口
- **离线可用性**：密码数据存储在本地，独立于网络
- **安全控制**：用户知道数据位置，减少云泄露问题

1Password 和 Bitwarden 都使用这种组合。

---

### 场景 7：我想建立一个内容创作平台

**✍️ 推荐：网站 个人博客**

为什么？

- **SEO 是生命线**：搜索是你最大的长期流量来源
- **内容就是产品**：文章、教程和视频是核心价值
- **长期资产**：网站可以运行多年，而社交账号随时可能被封
- **灵活的变现方式**：广告、付费订阅和知识付费都可以在网站上实现

Medium、知乎专栏和个人技术博客本质上都是内容平台。

---

### 场景 8：我想开发一个开发者生产力工具

**🛠️ 推荐：VS Code 插件或 CLI 工具**

为什么？

- **用户已经在编辑器里**：开发者不喜欢频繁切换上下文
- **上下文感知**：工具可以读取当前代码并提供精准建议
- **易于分发**：发布到插件市场，用户一键安装
- **快速迭代**：无应用商店审核延迟，当天即可发布/更新

Prettier、ESLint 和 GitHub Copilot 都是 VS Code 插件。

---

### 场景 9：我想构建工业监控仪表盘

**🏭 推荐：Qt 桌面应用**

为什么？

- **稳定性至上**：工厂全天候运行，软件不能崩溃
- **硬件通信**：需要与传感器进行串口/Modbus 通信
- **实时图表**：压力/温度/流量常需要毫秒级刷新
- **工业环境**：工业电脑通常运行 Windows，Qt 兼容性强

::: warning ⚠️ 工业场景
工业场景需要稳定性和硬件接口，而网页技术通常无法满足。
:::

---

### 场景 10：我想发行数字会员卡

**🎫 推荐：NFT 智能合约**

为什么？

- **不可伪造**：链上记录不可篡改
- **可转让**：会员资格可以赠送或在二级市场交易
- **可编程**：智能合约可以自动化权益（例如一年后自动升级）
- **全球覆盖**：没有国界限制，可以全球参与

星巴克 Odyssey 和 NBA Top Shot 都在会员系统中使用了 NFT。

---

## 5 个快速平台能力对比

### 5.1 移动解决方案对比

| 能力 | 微信小程序 | iOS 原生 | 安卓原生 | PWA |
|-----|----------|---------|-------------|-----|
| 用户获取成本 | <el-tag type="success">低</el-tag>（微信分享） | <el-tag type="danger">高</el-tag>（应用商店） | <el-tag type="danger">高</el-tag>（应用商店） | <el-tag type="warning">中等</el-tag>（搜索引擎） |
| 离线使用 | <el-tag type="warning">有限</el-tag> | <el-tag type="success">完全</el-tag> | <el-tag type="success">完全</el-tag> | <el-tag type="success">支持</el-tag> |
| 推送通知 | <el-tag type="success">支持</el-tag> | <el-tag type="success">支持</el-tag> | <el-tag type="success">支持</el-tag> | <el-tag type="warning">部分</el-tag> |
| 硬件访问 | <el-tag type="warning">受限</el-tag> | <el-tag type="success">完全访问</el-tag> | <el-tag type="success">完全访问</el-tag> | <el-tag type="warning">受限</el-tag> |
| 后台运行 | <el-tag type="warning">受限</el-tag> | <el-tag type="success">支持</el-tag> | <el-tag type="success">支持</el-tag> | <el-tag type="warning">受限</el-tag> |
| 开发成本 | <el-tag type="success">低</el-tag> | <el-tag type="danger">高</el-tag> | <el-tag type="danger">高</el-tag> | <el-tag type="success">低</el-tag> |
| 需要审核 | <el-tag type="warning">是</el-tag> | <el-tag type="warning">是</el-tag> | <el-tag type="warning">是</el-tag> | <el-tag type="success">否</el-tag> |

### 5.2 桌面解决方案对比

| 能力 | Electron | Qt | 浏览器扩展 |
|-----|----------|-----|-----------|
| 跨平台 | Win/Mac/Linux | Win/Mac/Linux | Chrome/Edge/Firefox |
| 系统集成 | <el-tag type="warning">中等</el-tag> | <el-tag type="success">高</el-tag> | <el-tag type="warning">低</el-tag> |
| 离线使用 | <el-tag type="success">支持</el-tag> | <el-tag type="success">支持</el-tag> | <el-tag type="warning">部分</el-tag> |
| 硬件访问 | <el-tag type="warning">通过 Node.js</el-tag> | <el-tag type="success">完全访问</el-tag> | <el-tag type="warning">受限</el-tag> |
| 安装方式 | 安装包 | 安装包 | 浏览器扩展商店 |
| 开发技术栈 | Web 技术 | C / QML | JavaScript |

---

## 6 常见误解

<el-collapse accordion style="margin: 20px 0;">
  <el-collapse-item name="1">
    <template #title>
      <span style="font-weight: bold; color: #F56C6C;">❌ 误区1：“我想做一个应用，所以必须同时做iOS和Android”</span>
    </template>
    <div style="padding: 10px; color: #606266; line-height: 1.8;">
      并非一定。如果你的应用轻量且使用即走，迷你程序或PWA可能是更好的选择。只有当你需要深度系统访问或顶级性能时，原生开发才值得。 
    </div>
  </el-collapse-item>
  
  <el-collapse-item name="2">
    <template #title>
      <span style="font-weight: bold; color: #F56C6C;">❌ 误区2：“网站过时了，没人再看了”</span>
    </template>
    <div style="padding: 10px; color: #606266; line-height: 1.8;">
      事实正好相反。网站是搜索引擎唯一可以索引的平台。如果你想要以内容驱动的用户增长，网站和个人博客是首选。技术文章和项目展示可以持续带来SEO流量。
    </div>
  </el-collapse-item>
  
  <el-collapse-item name="3">
    <template #title>
      <span style="font-weight: bold; color: #F56C6C;">❌ 误区3：“桌面应用不再使用”</span>
    </template>
    <div style="padding: 10px; color: #606266; line-height: 1.8;">
      在办公场景中，桌面应用仍然是主流。VS Code、Slack和Notion都是桌面应用。如果你的应用需要长时间使用、大量数据处理或系统集成，桌面通常是最佳选择。
    </div>
  </el-collapse-item>
  
  <el-collapse-item name="4">
    <template #title>
      <span style="font-weight: bold; color: #F56C6C;">❌ 误区4：“PWA体验比原生差”</span>
    </template>
    <div style="padding: 10px; color: #606266; line-height: 1.8;">
      现代PWA已经非常接近原生体验。星巴克、Pinterest和优步都有PWA版本。如果你的应用不需要复杂的硬件集成，PWA通常是最具性价比的跨平台解决方案。
    </div>
  </el-collapse-item>
</el-collapse>

---

## 7 总结：平台选择决策流程

```text
Start
  │
  ├─ Are users in WeChat ecosystem? ───────────────────→ WeChat Mini Program
  │
  ├─ Need best performance and deep hardware access? ──→ iOS / Android Native
  │
  ├─ Need long usage sessions on computers? ───────────→ Desktop App
  │     │
  │     ├─ Industrial scenario? ───────────────────────→ Qt
  │     └─ General scenario? ──────────────────────────→ Electron
  │
  ├─ Need to process browser page content? ────────────→ Browser Extension
  │
  ├─ Lightweight + cross-platform + offline? ──────────→ PWA
  │
  ├─ Need to be discoverable by search? ───────────────→ Website / Blog
  │
  ├─ Developer tool? ───────────────────────────────────→ VS Code Extension
  │
  └─ Blockchain asset? ────────────────────────────────→ NFT Smart Contract
```

---

## 8 下一步

::: tip 🎯 开始行动
根据上述分析，你现在应该对“选择哪个平台”有一个初步答案。接下来，点击匹配的教程开始学习：
:::

<NavGrid>
  <NavCard
    href="/en/stage-3/cross-platform/wechat-miniprogram/"
    title="如何构建微信小程序"
    description="从零开始构建微信小程序，掌握核心开发流程"
  />
  <NavCard
    href="/en/stage-3/cross-platform/android-app/"
    title="如何构建 Android 应用"
    description="使用现代跨平台框架构建原生 Android 应用"
  />
  <NavCard
    href="/en/stage-3/cross-platform/ios-app/"
    title="如何构建 iOS 应用"
    description="遵循苹果生态最佳实践开发并发布 iOS 应用"
  />
  <NavCard
    href="/en/stage-3/cross-platform/pwa-local-app/"
    title="如何构建本地 PWA 应用"
    description="将网站转换为支持离线和桌面安装的真实应用"
  />
  <NavCard
    href="/en/stage-3/cross-platform/browser-ai-extension/"
    title="如何构建浏览器 AI 助手扩展"
    description="一键总结任意网页，打造你的浏览器 AI 助手"
  />
  <NavCard
    href="/en/stage-3/cross-platform/electron-voice-to-text/"
    title="如何构建跨平台 Electron 桌面应用"
    description="为 Windows、macOS 和 Linux 构建语音转文字桌面应用"
  />
  <NavCard
    href="/en/stage-3/cross-platform/vscode-extension/"
    title="如何构建 VS Code 扩展"
    description="创建你的 AI 项目助手，支持多文件问答和自定义快捷键"
  />
  <NavCard
    href="/en/stage-3/cross-platform/qt-industrial-hmi/"
    title="如何构建 Qt 工业 HMI"
    description="构建工业级人机界面，并连接真实硬件"
  />
</NavGrid>