# 从设计原型到项目代码

::: tip 核心问题
**如何将设计工具中的原型转化为可以在浏览器中运行的前端代码？**
:::

---

## 1. 从原型到代码的三条主要路径

在完成 Figma 或 MasterGo 等工具的 UI 设计后，自然而然会出现一个实际问题：如何将结构化的设计转换为真实的前端代码？

在实践中，有三条常见路径：

| 路径 | 方法 | 特点 | 适合场景 |
|------|--------|-----------------|----------|
| **路径 1** | 使用多模态模型直接从截图重建代码 | 灵活，无特定平台限制 | 快速验证原型，简单页面 |
| **路径 2** | 通过平台本身或插件导出可用代码 | 高保真，编辑性强 | 已有 Figma 或 MasterGo 工作流程 |
| **路径 3** | 将设计平台与 MCP 导出结合 | 高度自动化，可定制 | 深度整合的设计到开发工作流程 |

本章将讲解这三种路径，帮助你选择最适合你项目的方法。

::: tip 前置条件
在开始本章之前，建议先阅读 [Figma 与 MasterGo 基础](../figma-mastergo/)。
:::

---

## 2. 路径 1：使用多模态 AI 直接重建代码

具备视觉能力的模型天生适合将图像转换为代码。你所需要做的只是上传设计截图，并让模型生成实现代码。

### 2.1 工作流程

1. **捕捉设计**
   - 从 Figma 或 MasterGo 导出页面为 PNG 或 JPG 格式
   - 确保截图包含完整布局

2. **选择多模态 AI 模型**
   - 可以使用 Gemini、Qwen、Claude 或任何接受图像输入的模型
   - 以下示例使用 Gemini

3. **编写提示**

   ```
   Generate the corresponding HTML/CSS code from this design image.
   Requirements:
   - Use modern CSS layout techniques such as Flexbox or Grid
   - Make it responsive for different screen sizes
   - Include all visible UI elements
   - Match colors and font sizes as closely as possible
   ```

![]（/zh-cn/stage-2/frontend/design-to-code/images/image42.png）

4. **保存生成的代码**
   - 要求模型返回完整的HTML
   - 将其保存为单一的 `.html` 文件，便于本地测试
   - 之后，你可以在本地IDE中将其转换为React或Vue结构

### 2.2 常见问题与解决方案

设计到代码从来不是完全自动化的。以下是你可能会遇到的一些问题：

|问题 |解决方案 |
|---------|----------|
|布局不均匀 |清晰描述布局问题，并要求模型调整CSS `margin`和`padding` |
|页面被截断 |检查视口是否设置正确，并请求响应式断点 |
|颜色不准确 |在设计中使用颜色选择器并提供精确数值 |
|字体不匹配 |指定字体家族或请求谷歌字体替代 |

::: 提示
通常先生成纯HTML会更容易，然后再导入本地IDE，再转换成React或Vue项目。
:::

### 2.3 用MasterGo AI生成页面

MasterGo 还提供强大的 AI 页面生成功能，并能从参考图片生成可用的网页代码。

#### 查找AI条目

在MasterGo编辑器的顶部工具栏中，你可以找到AI工具的条目：

![]（/zh-cn/stage-2/frontend/design-to-code/images/image47.png）

#### 世代流

1. **上传参考图片**
   - 上传设计参考图像
   - 添加你想要内容的文本描述

2. **检查生成的结果**

![]（/zh-cn/stage-2/frontend/design-to-code/images/image48.png）

![]（/zh-cn/stage-2/frontend/design-to-code/images/image49.png）

3. **获取密码**
   - 点击蓝色的`Insert to canvas`按钮，想视觉编辑结果
   - 或者点击右侧的 `Code` 按钮，将实现复制到本地

![]（/zh-cn/stage-2/frontend/design-to-code/images/image50.png）

---

## 3.路径二：通过设计平台或插件导出代码

### 3.1 用Figma Make生成代码

Figma Make 是 Figma 的官方 AI 设计功能。它可以根据提示或参考图片，以更高的保真度重现网页 UI 原型。

#### 主要特征

- **高保真还原**：通常优于通用的截图代码生成
- **可编辑结果**：你可以将结果转换回可编辑的Figma设计文件
- **GitHub集成**：生成的代码可以直接同步到GitHub

::: 提示 许可
要使用完整的Figma Make体验，通常需要Figma Pro。学生通常可以通过教育验证获得Pro访问权限。
:::

#### 脚步声

1. **打开Figma制造**
   - 点击Figma主页上的`Make`按钮
   - 或者访问[Figma Make]（https://www.figma.com/make）

2. **上传你的推荐信**
   - 上传你想重现的设计
   - 添加一个描述你想要内容的提示

![]（/zh-cn/stage-2/frontend/design-to-code/images/image43.png）

3. **检查结果**
   - 稍等一会儿后，你会看到渲染结果
   - 点击右上角的播放按钮可全屏预览

![]（/zh-cn/stage-2/frontend/design-tocode/images/image44.png）

4. **细致调整细节**
   - 点击右上角的编辑器图标
   - 回到熟悉的Figma编辑器中进行详细调整

![]（/zh-cn/stage-2/frontend/design-to-code/images/image45.png）

5. **导出代码**
   - 一旦结果看起来不错，导出代码
   - 你甚至可以直接连接到GitHub

![](/zh-cn/stage-2/frontend/design-to-code/images/image46.png)

### 3.2 使用插件导出代码

除了原生 AI 功能外，Figma 和 MasterGo 都支持通过插件导出代码。

**常用 Figma 插件**

- **Figma to Code**：将设计转换为 React、Vue、HTML 等
- **Anima**：支持高保真导出及交互
- **Locofy**：AI 辅助设计到代码工作流

**典型工作流程**

1. 打开 Figma 的插件面板
2. 搜索并安装你想要的导出插件
3. 选择你想导出的设计元素
4. 运行插件并选择目标框架和输出格式
5. 复制或下载生成的代码

---

## 4. 路径三：通过支持 MCP 的设计工具导出代码

### 4.1 什么是 MCP？

MCP，即 **模型上下文协议（模型上下文协议）**，是一种开放标准，使 AI 模型能够以安全可控的方式访问外部工具和数据源。在前端设计的背景下，MCP 允许模型直接读取设计文件的结构、样式和组件元数据，而不是通过截图来猜测。

### 4.2 MCP 的工作原理

```text
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  AI model   │ ←→  │ MCP server  │ ←→  │ Design tool │
│ (Claude etc.)│    │(protocol adapter)│ │(Figma/MasterGo)│
└─────────────┘     └─────────────┘     └─────────────┘
```

**典型流程**

1. AI 模型通过 MCP 协议发送请求
2. 设计工具返回结构化设计数据，如图层、样式和组件
3. 模型理解结构并生成匹配代码
4. 结果然后可以导出或写入开发环境

### 4.3 Figma 实践中的 MCP

#### 环境设置

1. **安装 MCP 服务器**

   ```bash
   npx figma-mcp-server
   ```

2. **配置 Claude Desktop 或其他支持 MCP 的 AI 工具**

   ```json
   {
     "mcpServers": {
       "figma": {
         "command": "npx",
         "args": ["figma-mcp-server"],
         "env": {
           "FIGMA_ACCESS_TOKEN": "your-figma-token"
         }
       }
     }
   }
   ```

3. **创建 Figma 访问令牌**
   - 进入 Figma → 设置 → 个人访问令牌
   - 生成并保存一个新的令牌

#### 工作流程

1. **在你的 AI 工具中启用 MCP**
   - 打开 Claude Code 或其他支持 MCP 的 IDE
   - 确认 MCP 服务器已连接

2. **提供设计文件链接**

   ```text
   User: Please convert this Figma design into React code
   Link: https://www.figma.com/file/xxxxx

   AI: I have connected to Figma through MCP and I am reading the design structure...
   ```

3. **让 AI 分析并生成**
   - MCP 服务器获取图层树
   - AI 理解组件结构和样式属性
   - 它生成具有更准确名称和结构的 React 或 Vue 组件

4. **迭代**

   ```text
   User: Please extract the button into a reusable component

   AI: I identified the Button component from the design system via MCP and I am generating a reusable React component with props...
   ```

### 4.4 为什么 MCP 很强大

| 功能 | 传统方法 | MCP 方法 |
|---------|----------------------|--------------|
| **数据准确性** | 基于截图，可能丢失细节 | 直接读取原始设计数据 |
| **组件识别** | 模型必须猜测边界 | 可获得确切的组件定义 |
| **样式保真度** | 从像素估算 | 读取确切的设计令牌 |
| **迭代速度** | 每次更改后重新截图 | 设计更改可直接同步 |
| **自动化** | 手动复制和粘贴 | 可直接写入项目文件 |

### 4.5 当前可用的 MCP 工具

**设计端 MCP 工具**

- **Figma MCP 服务器**：Figma 的官方 MCP 支持
- **MasterGo MCP**：社区构建的 MasterGo 适配器

**开发端 MCP 工具**

- **Claude Code**：原生 MCP 支持
- **Cline**：支持 MCP 的 VS Code 扩展
- **Trae**：可通过配置启用 MCP

::: tip 展望未来
MCP 生态系统正在快速发展。随着时间推移，设计工具和开发环境将变得更加紧密集成，一键设计到代码的工作流程可能会变得更加普遍。
:::

---

## 5. 导出代码后的操作

### 5.1 本地测试

一旦获得代码，在本地 IDE 中打开并测试：

1. **创建或打开一个项目**

   ```bash
   # For plain HTML, open it directly in the browser
   open index.html

   # For React/Vue projects
   npm install
   npm run dev
   ```

2. **与你的AI集成开发环境协作**
   - 将生成代码导入 Trae 或其他 AI 集成开发环境
   - 请求AI帮助修复布局问题或添加交互功能

### 5.2 常见问题

|阶段 |问题 |解决方案 |
|-------|---------|----------|
|布局 |元素错位 |检查 `display`、`position` 和容器结构 |
|样式 |颜色不匹配 |使用浏览器开发工具检查实际应用的值 |
|响应式行为 |移动版布局中断 |添加或细化媒体查询断点 |
|交互 |按钮无用 |检查JavaScript事件绑定 |

---

## 6.如何在三条道路中做出选择

### 6.1 比较

|维度 |路径1：多模态人工智能 |路径2：平台功能 |路径3：MCP |
|-----------|------------------------|---------------------------|-------------|
|**入门方便** |⭐简单 |⭐⭐中等 |⭐⭐⭐更复杂 |
|**保真度** |⭐⭐⭐中等 |⭐⭐⭐⭐高 |⭐⭐⭐⭐⭐ 最高 |
|**灵活性** |⭐⭐⭐⭐⭐ 高 |⭐⭐⭐中等 |⭐⭐⭐⭐相当高 |
|**自动化** |⭐⭐低频 |⭐⭐⭐中等 |⭐⭐⭐⭐⭐ 高频 |
|**成本** |低价 |中等 |低价 |

### 6.2 推荐

**如果**，请选择路径1**

- 你需要快速验证一个想法
- 你的设计工具经常更换
- 完美保真度并非关键
- 你的预算有限

**如果**，选择路径2**

- 你的团队主要使用 Figma 或 MasterGo
- 你需要高保真输出
- 设计师与开发者频繁协作
- 你愿意在需要时支付专业工具费用

**如果**，请选择路径3**

- 你想要最高程度的自动化
- 你具备配置MCP的技术能力
- 项目经常从设计迭代到代码
- 你需要一个标准化的设计-开发流程

---

## 7.摘要

在本章中，你学习了从设计原型到代码的三条核心路径：

1. **直接多模态AI转换**：灵活快速，适合早期验证
2. **平台原生能力**：更高保真度，更适合专业设计工作流程
3. **MCP协议集成**：最自动化的路径，也是未来工作流程的方向

::: 提示 最佳实践
- **如果你是新手**：从路径1开始以加快速度
- **团队协作时**：使用路径2以保持设计一致性
- **为了最大化效率**：尝试路径3并构建自动化工作流程
- **一起使用**：根据项目阶段切换路径
:::

---

## 参考文献

- [Figma和MasterGo基础]（../figma-mastergo/）
- [让我们一起制作霍格沃茨画像]（../霍格沃茨画像/）
- [MCP官方文档]（https://modelcontextprotocol.io/）
- [Figma Make 文档]（https://help.figma.com/hc/en-us/sections/360007453634-Figma-Make）
- [MasterGo AI 教程]（https://mastergo.com/tutorials）