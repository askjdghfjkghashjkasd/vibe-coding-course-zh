# 如何构建iOS应用——原生SwiftUI开发

## 第一章：什么是iOS应用和iOS应用开发

在本教程中，我们将完成一个完整的闭环：**从你脑海中的一个想法，到一个可以成功安装并运行在iPhone上的真实iOS应用。**

对于这个教程，你至少应该具备：

1. 一台运行相对较新macOS的Mac
2. 一部运行相对较新iOS版本的iPhone，启用开发者模式
3. Xcode 成功安装
4. Trae安装并开通
5. 可用的Apple ID

![](../../../../zh-cn/stage-3/跨平台/ios-app/images/image1.png）

### 1.1 iOS 应用

iOS 应用是运行在 iPhone 操作系统上的原生应用。它启动快速，手感流畅，并能深度利用通知、相机和本地存储等系统功能。

![](../../../../zh-cn/stage-3/跨平台/ios-app/images/image2.png）

### 1.2 iOS 应用开发

从核心来看，构建一个iOS应用只需完成几件事：

1. 明确你的应用正在解决的问题
2. 设计用户可查看和操作的界面
3. 定义应用在不同动作下的表现
4. 正确构建应用并在iPhone上安装

### 1.3 构建iOS应用的常见方法

在实际开发中，构建iOS应用的方法不止一种。我们这里不会深入探讨，只提供整体理解。

第一种是苹果官方的原生方法：在Xcode中创建项目，并使用Swift和SwiftUI来构建界面和逻辑。

![](../../../../zh-cn/stage-3/跨平台/ios-app/images/image3.png）

第二种方式是使用跨平台框架，如React Native和Flutter，并将一个代码库适配到多个平台。

![](../../../../zh-cn/stage-3/跨平台/ios-app/images/image4.png）

基于上述方法，本教程选择：**以原生SwiftUI开发为基础，AI工具承担大部分编码工作**。

![](../../../../zh-cn/stage-3/跨平台/ios-app/images/image5.png）

### 1.4 本教程涵盖的iOS应用开发步骤（高级预览）

本教程中使用的示例应用是**FridgeChef**。

用户输入冰箱中现有的食材，应用使用真实的 AI API 生成可行的食谱，并将结果保存在本地以便后续审核。这个示例完全涵盖了真实 iOS 应用的核心部分，包括界面输入和显示、网络请求、数据解析、本地存储，以及最终安装并在真实设备上运行。

![](../../../../zh-cn/stage-3/跨平台/ios-app/images/image6.png）

- 从原型到原生应用的整体理念

在实现过程中，本教程采用分阶段方法。我们将先利用人工智能快速生成带有HTML和CSS的界面原型，确认浏览器中的布局结构和信息层级，然后将其迁移到SwiftUI。

- 整体开发流程预览

总体来说，接下来的章节将按顺序经历这些阶段：

1. 建立基础理解  
   了解 iOS 应用的结构、常见开发方法，以及这个示例应用解决了什么问题。
2. 完成环境搭建  
   准备一台 Mac 和一部 iPhone，更新系统，安装 Xcode 和 Trae，并创建一个可以在模拟器中成功运行的基础 iOS 项目。
3. 进入正式开发  
   在 Trae 中打开项目，通过与 AI 对话逐步生成界面和基本交互，将应用从空壳变为可用状态。
4. 调试与整理  
   当出现编译错误或行为不符合预期时，让 AI 帮助排查；当结构变得混乱时，使用 AI 重构和简化。
5. 在真机上运行  
   配置签名，将应用安装到真实 iPhone 上，并完成从代码到硬件的一次完整验证。

## 第二章：开发环境准备

### 2.1 所需设备和系统

在本次实践中，有两块硬件是不可替代的：一台 Mac 和一部 iPhone。  
同时，这两台设备都应运行**相对较新的官方系统版本**。

#### 2.1.1 Mac

iOS 应用只能在 macOS 上开发和编译。这是苹果平台的硬性要求。

为了确保 Xcode 可以正常安装和使用，建议先将 macOS 更新到相对较新的官方版本。你可以通过 **系统设置 -> 通用 -> 软件更新** 检查并更新。

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image7.png)

#### 2.1.2 真机 iPhone

除了 Mac，本教程还需要一部真机 iPhone，用于验证应用能否正确安装和启动。

为了保持调试顺利，iPhone 也应运行相对较新的 iOS 版本。你可以通过 **设置 -> 通用 -> 软件更新** 检查并更新。

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image8.png)

在后续开发中，这部 iPhone 会通过数据线连接到 Mac 进行真机调试。

#### 2.1.3 在 iPhone 上启用开发者模式

要在真机上安装并运行 Xcode 调试的应用，需要在 iPhone 上启用开发者模式。

步骤：

1. 打开 **设置**
2. 进入 **隐私与安全**
3. 滚动到最底部找到 **开发者模式**
4. 打开它，然后按提示重启设备
5. 重启后，解锁设备并确认启用开发者模式

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image9.png)

如果你的 iPhone 从未连接过 Xcode 或其他开发工具，你可能会发现 **隐私与安全** 下没有出现 **开发者模式**。这不是系统问题——仅意味着开发者模式尚未触发。

在这种情况下，你可以通过以下步骤让它出现：

1. 打开 **设置 -> 隐私与安全 -> 分析与改进**
2. 打开 **与应用开发者共享**
3. 返回上一层，再次进入 **隐私与安全**，滚动到最底部
4. 此时你应该可以看到 **开发者模式**，然后启用它并重启设备

完成上述步骤后，开发者模式只需启用一次。未来使用 Xcode 进行真机调试无需重复此配置。

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image10.png)

### 2.2 所需软件

设备和系统准备就绪后，你仍然需要安装用于开发的软件。本教程仅使用两类工具：官方iOS开发工具和AI辅助开发工具。

#### 2.2.1 Xcode

Xcode 是苹果官方的 iOS 开发工具。在本教程中，Xcode 主要用于创建 iOS 项目、编译 Swift / SwiftUI 代码，以及在模拟器或真实设备上运行应用。

![](../../../../zh-cn/stage-3/跨平台/ios-app/images/image11.png）

Xcode 可以直接从 App Store 找到并安装。安装后，当你第一次打开它时，会看到欢迎界面。之后的项目创建就从这里开始。

![](../../../../zh-cn/stage-3/跨平台/ios-app/images/image12.png）

#### 2.2.2 特雷

Trae 是本教程中进行开发工作的主要环境。你需要将整个 iOS 项目放入 Trae，并通过对话与 AI 协作完成开发。

![](../../../../zh-cn/stage-3/跨平台/ios-app/images/image13.png）

### 2.3 Apple ID 与开发调试笔记

在iOS平台上，应用要安装到真实设备上，必须经过开发者签名。本教程不要求你支付苹果开发者计划会员费。个人Apple ID就足够了。

### 2.4 继续前的清单

在进入下一章之前，你可以将当前状态与下面的清单进行比较。

你现在应该已经拥有：

1. 一台运行相对较新macOS的Mac
2. 一部运行相对较新iOS版本并启用开发者模式的iPhone。
3. Xcode 成功安装
4. Trae安装并开通
5. 可用的Apple ID

如果这些都准备好了，你就可以继续并创建你的第一个iOS应用了。

## 第三章：创建第一个iOS项目

### 3.1 使用 Xcode 创建新项目

打开Xcode。在欢迎界面，选择创建一个新项目。

![](../../../../zh-cn/stage-3/跨平台/ios-app/images/image14.png）

点击**创建新项目**进入项目模板选择界面。

### 3.2 选择应用模板和技术栈

在模板选择界面，请使用以下配置：

1. 平台：iOS
2. 应用类型：应用

![](../../../../zh-cn/stage-3/跨平台/ios-app/images/image15.png）

点击 **Next** 进入项目信息配置界面。

### 3.3 配置项目信息

在项目信息界面，只需填写基本设置：

1. 产品名称：应用名称（例如 `FridgeChef`）
2. 团队：选择你的个人Apple ID
3. 组织标识符：反向域格式（例如 `com.example`）
4. 捆绑包标识符：自动生成，保持默认状态
5. 测试系统：采用XCTest UI测试的快速测试
6. 存储：选择核心数据（用于后续保存配方历史）
7. 将其他选项保留为默认状态

![](../../../../zh-cn/stage-3/跨平台/ios-app/images/image16-private-redacted.png）

点击 ** 下一步**，选择项目存储位置。

![](../../../../zh-cn/stage-3/跨平台/ios-app/images/image17-cropped.png）

### 3.4 创建后识别项目结构

项目创建后，Xcode 会自动打开工作区。此时，你不需要理解每个文件。你只需要识别几个关键部分。

![](../../../../zh-cn/stage-3/跨平台/ios-app/images/image18.png）

在默认项目中，你会看到：

- 以项目命名的文件夹
- 以 `App` 结尾的 Swift 文件（应用程序条目）
- `ContentView.swift` 文件（默认页面）

这已经是最小的可运行iOS应用了。

### 3.5 运行第一个iOS应用

在更改任何代码之前，先直接运行原始项目。

在Xcode顶部工具栏中，保持默认的iPhone模拟器选项，然后点击左上角的**运行**按钮。

![](../../../../zh-cn/stage-3/跨平台/ios-app/images/image19.png）

![](../../../../zh-cn/stage-3/跨平台/ios-app/images/image20.png）

如果一切正常，模拟器会显示一个可以成功启动的空白应用。第一次编译可能需要较长时间。在后面章节，我们会先使用HTML原型来减少等待时间。

![](../../../../zh-cn/stage-3/跨平台/ios-app/images/image21.png）

要停止应用，请点击运行按钮旁的**停止**。

### 3.6 你目前实际取得的成就

虽然界面依然简单，但你已经完成了几个关键确认：

1. 项目能够成功编译
2. 模拟器能够正确运行应用
3. 开发过程已被证明是端到端的可行性

这意味着未来的问题主要会聚焦于**代码和逻辑本身**，而非环境问题。

### 3.7 把项目交给Trae

从下一部分开始，主要开发工作将逐步转移到Trae。

你需要做的很简单：**打开你刚在Trae里创建的iOS项目文件夹。**

![](../../../../zh-cn/stage-3/跨平台/ios-app/images/image22.png）

## 第四章：AI辅助开发实践——从零开始打造FridgeChef

这一章是整个教程的核心部分。

这个教程没有采用传统的“先写 SwiftUI，反复编译，然后不断调整预览”的路线。相反，我们采用了更高效的流程：  
**首先使用 \*\***HTML\***\* 快速验证接口结构，然后将确认结果迁移到 SwiftUI，最后逐步完成业务逻辑、本地数据和交互细节。**

### 4.1 第一阶段：需求澄清

在写代码之前，第一步不是构建页面——而是明确我们正在构建的内容。**让AI先像产品经理一样\*\****，将需求组织成结构化的规范文档。**

在 Trae 的聊天窗口中，输入以下指令。Trae 会在项目根生成一个 `REQUIREMENTS.md` 文件，描述整个应用的功能和结构。

📋 **提示复制：**

```text
We are now going to develop an iOS App called "FridgeChef".

1. Core concept
This is an AI assistant that solves the problem of "I don't know what to cook with the leftover ingredients in my fridge."
Users input the ingredients they currently have, and the app calls a large model to generate a practical recipe.

2. Core functions
- Home page:
  Show a prominent "Start Cooking" entry, and below it display historical recipe records in card or list form.
- Input page:
  Users input ingredients, supporting text input or simple quick tags.
- Result page:
  Display the AI-generated recipe, including dish name, ingredient list, and cooking steps.

3. Technical requirements
- Use SwiftUI
- Save data locally (Core Data)
- Support basic page navigation and state updates

Please help me organize this into a clear, structured REQUIREMENTS.md document from the perspective of a product manager, and save it in the project root.
```

生成后，快速浏览文档并确认功能点是否符合您的预期。

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image23-terminal-cropped.png)

### 4.2 第二阶段：可视化原型

让 AI 使用 **HTML** 和 **CSS** 快速绘制高保真界面原型，这样我们可以先确认整体布局和风格。然后继续在 Trae 中输入以下内容：

📋 **可复制提示:**

```text
The requirements are confirmed.
Please use HTML + Tailwind CSS to generate a high-fidelity interface prototype for me.

Design style: Neo-Pop
Colors:
- Background: light cream #FFFDF5
- Accent colors: acid green #CCFF00, hot pink

Visual characteristics:
- 3px thick black borders
- Hard shadow without blur (offset 4px)
- Large rounded cards, overall sticker / comic feeling

Layout requirements:
- Home page should use a Bento Grid-like layout
- Include two screens: home page and input page

Please generate a single-file index.html and simulate an iPhone screen ratio around the content.
```

生成后，在文件列表中找到 `index.html` 并直接在浏览器中打开它。

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image24.png)

在此阶段，关键不在于每个细节是否完美。关键在于 **页面结构是否合理，主要元素是否完整，以及整体方向是否正确。**

### 4.3 第三阶段：原生重建

一旦 HTML 原型确定，**将确认的界面翻译为 SwiftUI。**

步骤：

1. 将 `index.html` 文件（或浏览器截图）上传到 Trae
2. 告诉 AI 根据它生成 SwiftUI 代码

📋 **可复制的提示：**

```text
[index.html uploaded]

Please read the layout and style of this HTML file.

Task: recreate this interface in the current project using SwiftUI.

Requirements:
1. Encapsulate a NeoPopStyle modifier including background color, thick border, and hard shadow
2. Create HomeView.swift for the home layout
3. Create InputView.swift for the input page
4. Use Mock Data for now, and make sure it can display correctly in Xcode Preview and simulator
```

完成后，打开 Xcode 并运行模拟器。你将看到一个已经有完整视觉结构的 iOS 应用程序。

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image25.png)

### 4.4 第四阶段：连接 AI API

界面完成后，应用程序仍然只是一个展示层。接下来我们需要连接真正的 AI 功能。在本教程中，我们使用 **SiliconFlow** 提供的大模型服务：
[https://cloud.siliconflow.cn](https://cloud.siliconflow.cn/)

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image26.png)

SiliconFlow 提供与 OpenAI API 规范兼容的 API，因此可以非常方便地在 iOS 项目中通过标准网络请求调用。

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image27.png)

开始之前，你需要在网站上注册一个账户并创建一个 API Key。

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image28.png)

这个 Key 将用于之后的模型调用。

📋 **提示要复制的内容：**

```text
Now we need to connect AI capability.

Please create APIService.swift.

Configuration:
- Base URL: https://api.siliconflow.cn/v1
- Model: Qwen/Qwen2.5-7B-Instruct
- API Key: define it as a variable for now, I will fill it later

Functions:
- Write a generateRecipe(ingredients: [String]) method
- The System Prompt must strictly require the model to return pure JSON only
- JSON fields should include: dishName, ingredients, steps

Also define a RecipeModel struct for parsing the returned data.
```

生成代码后，在 `APIService.swift` 中填写您自己的 Key。

### 4.5 第五阶段：核心数据本地存储

为了让应用记住它生成的食谱，我们需要引入本地数据存储。此阶段分为两个步骤。

**步骤 1：在 Xcode 中手动配置 Core Data**

1. 打开 `FridgeChef.xcdatamodeld`
2. 创建一个名为 `RecipeEntity` 的新实体

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image29.png)

3. 添加以下属性：
   1. `id`：**UUID**
   2. `name`：**字符串**
   3. `cookTime`：**字符串**
   4. `difficulty`：**字符串**
   5. `desc`：**字符串**
   6. `timestamp`：**日期**
   7. `colorIndex`：**16 位整数**

      ![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image30.png)

**步骤 2：让 AI 编写逻辑代码**

📋 **可复制提示：**

```text
I have finished configuring the Core Data Entity.

Entity: RecipeEntity
Attributes: id, name, difficulty, timestamp, colorindex, cookTime, desc

Please complete the following tasks:
1. Save data into Core Data after recipe generation succeeds
2. Use FetchRequest on the home page to read historical records and display them in reverse chronological order
3. When the database is empty, show a friendly empty-state message
```

### 4.6 第六阶段：生成应用图标

最后一步是为应用准备一个合适的图标。在这里，我们使用 **Lovart** 来生成图标资源：[https://www.lovart.ai/zh](https://www.lovart.ai/zh)

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image31.png)![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image32.png)

📋 **要复制到 Lovart 的提示：**

```text
Subject: A cute anthropomorphic fridge character with a happy face
Style: Minimalistic App Icon, Neo-pop style, thick black outlines, vector art
Colors: Acid green (#CCFF00) and deep blue
Background: Solid cream color
Negative Prompt: Text, realistic details, 3D render, complex background
```

生成后，将图像裁剪为 1024x1024，然后拖入 Xcode 的 `Assets.xcassets` -> `AppIcon`。

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image33.png)

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image34.png)

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image35.png)

再次运行应用程序，现在您将看到一个完整的、可识别的真实 iOS 应用程序。

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image36.png)

### 4.7 第七阶段：高级体验升级

一旦功能稳定，如果您想进一步提升视觉风格，只需向 AI 描述您想要的效果，让它生成新的设计方案，然后将确认的结果迁移到 SwiftUI 中。

📋 参考提示：

```text
The app's functionality is already complete, but I want to try a more visually impactful UI style.
Please first generate a new design draft in HTML + Tailwind CSS for me, with the file name design_v2.html.

Design style: Neo-Pop (dopamine style)
Color requirements:
Use Deep Royal Blue as the full-screen background
Use Acid Green (#CCFF00) as the accent color

Visual feel:
All cards should use a 3px thick black border
Use a hard shadow without transparency blur, shifted down-right

Layout requirements:
Keep the home page structure unchanged
Use pill-shaped buttons and input boxes

Please generate the full code so I can preview it in a browser.
```

生成后，在浏览器中打开此 HTML 文件。

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image37.png)

一旦 HTML 版本最终确定，你就可以开始修改 iOS 项目。

📋 参考提示：

```text
[design_v2.html uploaded]
Please analyze the visual style of this HTML and migrate it into the current iOS project.

Task requirements:
Create a new NeoPopStyle.swift file
Encapsulate a neoPopBlue() style modifier

The modifier needs to include:
- rounded corners
- thick black border
- opaque hard shadow

Refactor HomeView:
- change the background to Deep Royal Blue
- use Acid Green for the primary button
- use white background for historical record cards
- make sure text remains clear and readable on the dark background

Please provide the full modified code.
```

再次点击“在Xcode中运行”。如果一切正常，你应该会看到：

- 功能与之前完全相同
- 视觉风格发生了显著变化
- 整体应用质量明显提升

![](../../../../zh-cn/stage-3/跨平台/ios-app/images/image38.png）

## 第五章：运行、调试与错误处理

在上一章，你已经完成了核心功能，并成功在模拟器中运行了应用。  
但对于iOS应用来说，真正的完成不仅仅是“成功编译”——而是**稳定的运行，并且知道如何在问题出现时处理**。

### 5.1 在Xcode中运行应用

首先，确保项目能在Xcode中正确运行。

在Xcode左上角，选择运行设备并保持默认的iPhone模拟器。点击**运行**按钮以编译并运行。如果一切正常，应用将在模拟器中启动，并显示第四章内置的界面。

### 5.2 在真实设备上运行应用

用一根线把你的iPhone连接到Mac。

![](../../../../zh-cn/stage-3/跨平台/ios-app/images/image39.png）

第一次连接时，手机会显示**信任这台电脑？** 点击信任并输入解锁密码。

![](../../../../zh-cn/stage-3/跨平台/ios-app/images/image40-device-redacted.png）

在Xcode的设备列表中，选择你的iPhone，然后再次点击**运行**。

此时，你应该能在手机主屏幕上看到**FridgeChef**图标，并正常打开并使用。

![](../../../../zh-cn/stage-3/跨平台/ios-app/images/image41.png）

这一步标志着一个完整的iOS开发闭环完成。

### 5.3 iOS 开发错误通常来自哪里

在实际开发中，**遇到错误是正常的**，不是例外。

常见问题通常来自以下几类：

1. **编译错误**  
   语法快速、类型不匹配、缺失参数等。Xcode 会直接用红色高亮显示。
2. **运行时错误**  
   应用编译成功，但在执行过程中会崩溃——例如数组超出边界或强制展开 nil 值。
3. **权限或配置错误**  
   网络请求被系统阻挡，Info.plist 配置缺失，签名问题等。
4. **逻辑错误**  
   应用没有崩溃，但行为不对——比如按钮不响应或数据无法刷新。

![](../../../../zh-cn/stage-3/跨平台/ios-app/images/image42.png）

当出现错误时，你只需**将完整错误信息完全复制到Trae的聊天框中。** 了解项目上下文后，Trae可以帮助你进行调试。

### 5.4 常见的实设备调试错误与解决方案

真实设备调试时的错误非常常见。这些问题通常不是代码本身引起的，而是设备信任、安全规则或签名配置造成的。如果应用无法在你的iPhone上流畅运行，你可以先检查这一部分。

#### 1.签名与注册问题

**常见症状：**

- Xcode 显示红色错误，如 
  `"Communication with Apple failed"`  
  或 
  `"No profiles for 'com.xxx.xxx' were found"`
- 或者上面写着 
  `"Your team has no devices which are compatible"`

**原因：**

- 捆绑标识符不唯一或无效
- 目前的iPhone尚未在您的Apple ID下注册开发

**解决方案：**

1. **修改捆绑标识符**  
   在 Xcode 项目设置中，将捆绑标识符改为更独特的，例如：  
   `com.yourname.FridgeChef`
2. **让Xcode自动注册设备**  
   在错误提示中，点击 `Try Again` 或 `Register Device`，让 Xcode 自动完成设备注册和证书配置。

#### 2.设备配对与连接问题

**常见症状：**

- Xcode 显示 
  `"Device is not available because pairing is in progress"`
- 或者上面写着 
  `"Device Locked"`
- 或者你已经点了信任，但Xcode依然卡住了

![](../../../../zh-cn/stage-3/跨平台/ios-app/images/image43.png）

**原因：**

- iPhone还锁着
- 配对过程尚未完全完成
- Xcode 未刷新连接状态

**解决方案：**

1. 解锁手机 
   确保iPhone解锁并保持在主屏幕。
2. 完成信托流程 
   当手机弹出时 **Trust This Computer？**，点击**Trust**并**输入锁屏密码**。
3. 刷新连接状态 
   如果还是卡住，拔掉线缆，等2-3秒后重新连接。如果需要，重启Xcode再试一次。

#### 3.应用安装了，但无法打开

**常见症状：**

- 应用图标已经出现在iPhone主屏幕
- 系统显示 
  **不可信开发者**

![](../../../../zh-cn/stage-3/跨平台/ios-app/images/image44.png）

**原因：**

这是iOS的安全机制。使用个人Apple ID安装的调试应用需要手动信任授权。

**解决方案：**

1. 打开**设置**
2. 进入**将军**
3. 点击 **VPN 和设备管理**
4. 在**开发者应用**中，查找你的Apple ID
5. 点击**信任**，然后再次确认

![](../../../../zh-cn/stage-3/跨平台/ios-app/images/image45.png）

之后，回到主屏幕再次点击应用。这样它应该能正常运行了。

## 第六章：如果你想把应用发布到App Store。

在这个教程中，我们主要完成了**个人开发和调试版本应用**的完整闭环：从创建项目、实现函数、调试，到成功安装并在真实设备上使用。

如果你想更进一步，正式将应用发布到**Apple App Store**，让所有用户都能下载并使用，那么你需要进入更正式的发布流程。由于该流程涉及付费开发者账户、审核规则和合规要求，且不是本教程的主要实践重点，以下内容仅作为**整体参考和路线图**提供。

![](../../../../zh-cn/stage-3/跨平台/ios-app/images/image46.png）

> 以下内容参考了苹果官方的评审要求和公众体验讨论（包括最初的知湖分享）。链接列在下方。如果任何链接无法使用，您可以通过标题或关键词搜索原始来源。

### 6.1 苹果开发者项目

要将应用发布到App Store，您必须加入苹果的付费开发者计划：

- **苹果开发者计划**（每年99美元）
- 官方网站：[https://developer.apple.com/]（https://developer.apple.com/）

加入后，你可以使用**App Store Connect**创建应用条目，管理版本，并正式发布。

### 6.2 App Store Connect：创建应用条目

在 App Store Connect 中，您需要创建完整的应用记录，包括但不限于：

1. 应用名称和 Bundle ID
2. 描述、关键词和隐私政策链接
3. 应用图标、截图和预览材料
4. 定价和分发地区设置

所有这些信息必须填写完整，才能继续提交。

### 6.3 构建并提交审核

在元数据准备好之后，你需要：

1. 使用 Xcode 中的付费开发者账户签署 Release 构建
2. 构建并上传正式版本
3. 在 App Store Connect 中提交审核

提交后，应用会进入苹果的审核队列。审核时间通常为 1-3 天，取决于具体情况。

### 6.4 审核规则与常见拒绝原因

苹果主要从以下方面审核应用：

- 功能性与稳定性
- 隐私与数据合规性
- 元数据与实际功能的一致性
- 是否存在侵权或误导行为

如果应用不符合要求，审核将被拒绝，苹果会提供具体原因。开发者需要根据反馈修改应用并重新提交。

### 6.5 拒绝后的处理方式

如果应用被拒绝，你可以：

- 根据反馈修改代码或描述
- 重新提交版本
- 通过 App Store Connect 与审核团队沟通

这是发布流程中非常常见的环节，并不意味着项目失败。

### 参考资源

以下内容参考苹果官方文档及公开经验分享：

- App Store 审核指南（苹果官方）  
  [https://developer.apple.com/app-store/review/guidelines/](https://developer.apple.com/app-store/review/guidelines/?utm_source=chatgpt.com)
- 官方提交审核指南  
  [https://developer.apple.com/cn/help/app-store-connect/manage-submissions-to-app-review/submit-for-review](https://developer.apple.com/cn/help/app-store-connect/manage-submissions-to-app-review/submit-for-review?utm_source=chatgpt.com)
- iOS App Store 发布与审核陷阱全图解（知乎）  
  [https://zhuanlan.zhihu.com/p/146128612](https://zhuanlan.zhihu.com/p/146128612)

## 第 7 章：总结

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image47.png)

恭喜！至此，你已经亲自完成了从 0 到 1 的完整 iOS 应用开发流程。从环境搭建、项目运行，再逐步落地界面、功能、数据以及真机测试，各关键阶段已顺利完成。更重要的是，你并不是靠记忆 Swift 语法才能做到这里——大部分实现都交给了 AI。无论你的背景如何，每一次这样的尝试都能让你更加熟练，你会发现 iOS 开发并不像以前看起来那么困难。即便你以前一行代码都不会写，现在也能打造属于自己的应用。

回头看，整个过程其实并不复杂：先决定你想做的应用，用 HTML 快速测试界面，再转换为 SwiftUI，连接 API 和本地数据，然后运行调试一遍。基于此，未来你也可以轻松打造个人闹钟、极简待办清单，甚至是模仿你喜欢的名人语气的聊天机器人。

这正是本教程——以及轻松氛围——最想教给你的最重要的事情。我期待着你们这些未来的氛围编码大师们带来的最新创作，以及期待着有一天被你们的作品所惊艳。