# CLI AI 编码工具

在本教程中，我们介绍了直接运行在命令行中的AI编码代理。它们与我们之前在Trae和Cursor中使用的代理不同。CLI的AI编码工具只能在终端中使用。与集成在AI集成环境中的代理相比，它们通常拥有更长的上下文窗口、更快的工具调用速度，并且兼容更广泛的大型模型。在最新的AI氛围编码实践中，我们通常优先考虑CLI的AI编码工具，而非内置的IDE编码代理。

## 从CLI开始

你还记得我们之前介绍的CLI吗？CLI是指在终端或命令提示符中使用纯文本命令来操作软件应用，而不是依赖图形界面（GUI）。你可以简单地把GUI看作是电脑或手机上的可点击界面，带有按钮，不需要输入命令。

> 在Windows上，常见的终端包括命令提示符（`cmd`）和PowerShell。你可以在运行/搜索框中输入`cmd`或`powershell`来启动它们。

![]（/zh-cn/stage-2/backend/modern-cli/images/image1.png）！[]（/zh-cn/stage-2/backend/modern-cli/images/image2.png）

CLI自然适合文本命令工作流程。在一小部分极客（追求极致效率的编程爱好者）中，CLI甚至比图形界面更受欢迎。他们想用键盘完成所有操作，觉得移动鼠标会降低编码效率。

在工业界，CLI通常是最常见的接口形式，因为图形界面需要操作系统绘制接口和管理窗口，这需要更多的计算机资源。CLI只需将接收到的命令传递给系统执行。因此，当连接到大型服务器集群时，我们通常只通过CLI进行交互。

![]（/zh-cn/stage-2/backend/modern-cli/images/image3.png）

对于许多没有 CLI 经验的学习者来说，命令行操作可能显得复杂，命令太多，甚至担心“意外损坏电脑”。完全不用担心。还记得之前的教程中，我们经常请 Trae 帮忙做基础操作吗？这里我们完全可以用同样的想法。我们可以让 CLI 编码工具帮我们执行所有 CLI 操作：输入特定文件夹、搜索和处理文件、运行或复制开源项目等等。整个过程可以通过与 CLI AI 编码工具的对话完成。

## 它与人工智能集成开发环境有何不同

我们可以将CLI的AI编码工具与之前使用的 z.ai 和Trae进行比较。从某种意义上说，CLI的AI编码工具可以被视为一种特殊的 z.ai：它们只需简单的聊天录入，然后自动执行所需的操作（有时只需手动打开浏览器查看最终结果）。与AI集成开发环境（IDE）相比，CLI的AI编码工具可以看作是IDE中的代理模块，也就是侧边聊天面板。

![]（/zh-cn/stage-2/backend/modern-cli/images/image4.png）！[]（/zh-cn/stage-2/backend/modern-cli/images/image5.png）

然而，由于不同的 AI 集成开发环境 实现代理的方式不同，它们的能力差距很大，且 AI 编码质量往往不稳定。CLI 的 AI 编码工具通常由大型科技公司直接开发，比如 Claude 背后的 Anthropic 和 ChatGPT 背后的 OpenAI。

与其他 AI 编程代理相比，直接使用这些大公司的产品往往是更好的做法。特别是 Claude Code，它是 Anthropic 自己的研发团队使用的工具，从一开始就围绕着“满足真正的工程师需求”而设计。

为了更直观地比较，我们可以看看 Claude Code 与一款 AI 集成开发环境 代理（以 Cursor 为例）之间的区别：

| 功能                  | Claude Code       | Cursor              | 更优选择       |
| ------------------ | ----------------- | ------------------- | ------------- |
| 自动执行             | ✅ 非常强          | ❌ 有限             | Claude Code   |
| IDE 集成             | ❌ 仅 CLI         | ✅ 原生 VS Code     | Cursor        |
| 实时补全             | ❌ 无            | ✅ 很好             | Cursor        |
| 多文件操作           | ✅ 非常强         | ⚠️ 相当不错         | Claude Code   |
| GitHub 集成工作流     | ✅ 可直接提交     | ⚠️ 更手动           | Claude Code   |
| 学习成本             | ⚠️ 中等          | ✅ 容易上手         | Cursor        |
| 上下文长度           | ✅ 非常长         | ⚠️ 好               | Claude Code   |
| 调试辅助             | ✅ 自动化          | ⚠️ 更多手动工作      | Claude Code   |

表格来源: <https://northflank.com/blog/claude-code-vs-cursor-comparison>

总之，CLI AI 编程工具通常可以：

- 支持更长的连续对话（它们甚至可以“全天为你工作”）。
- 提供更长的上下文窗口（你不再需要频繁说“继续”）。
- 响应更快（支持更多定制模型 API）。

对于编程相关操作，它们通常比大多数 IDE 内置代理更智能、更稳定。

## 常见的 CLI AI 编程工具

尽管现在有很多开源实现，但在实际操作中，我们只推荐两类主要的 CLI AI 编程工具作为“首选组合”。你可以根据自己的习惯选择其中一种，我们强烈建议在决定最适合自己的工具前，先尝试两者。

- Codex 使用 GPT-5，总体能力更强。
- Claude Code，通过 GLM 4.6 兼容的 API 路由，提供接近 Claude 4 的体验，成本较低。
- OpenCode 允许自由切换和组合模型，包含免费模型选项，并提供更好的成本控制。

然而，哪一个在你实际项目中效果更好，只有通过实践测试才能确定。掌握多种 AI 编程工具总是有益的。一旦熟练，你可以在不同场景中灵活切换 Claude Code、Codex 或 Trae。如果某个工具在多次尝试后表现不佳，只需切换到另一款工具或模型继续尝试。

同时，由于模型版本更新非常快，我们建议优先选择当前性价比（质量/成本）最优的选项。

### Claude Code

Claude Code 是 Anthropic 基于 Claude 模型能力开发的 AI 编程工具。它的主要交互发生在终端，也可以作为 VS Code 扩展使用。类似于 AI 集成开发环境 内的代理，它可以深度理解开发者的代码库，并通过自然语言指令完成端到端的开发任务，包括代码编辑、修复 bug、运行和修复测试、管理 Git 工作流（如解决合并冲突和创建 PR）、解释复杂代码以及执行终端命令。

![](/zh-cn/stage-2/backend/modern-cli/images/image6.png)

Claude Code 的主要优势包括：非常长的上下文窗口（可以处理整个文件甚至小项目）、主动澄清模糊需求、自动规划和分配执行任务，以及深入理解和解释整个代码库。与普通 IDE 代理相比，它更适合沉浸式的氛围编码工作流。

实际使用时，你可以通过聊天请求它创建新项目，执行CLI操作（如组织文件夹、批量重命名文件、部署开源项目），以及配置开发环境（如安装和调试Python环境）。如果你觉得某些代码难以理解，或者文件夹结构不清晰，可以直接让Claude Code生成结构化分析文档或逐步解释具体部分。

![]（/zh-cn/stage-2/backend/modern-cli/images/image7.png）！[]（/zh-cn/stage-2/backend/modern-cli/images/image8.png）

![]（/zh-cn/stage-2/backend/modern-cli/images/image9.png）！[]（/zh-cn/stage-2/backend/modern-cli/images/image10.png）

如果你想系统地学习Claude Code，可以参考Andrew Ng和Anthropic联合开办的课程：  
<https://www.bilibili.com/video/BV176t2zSEpr>

接下来，我们将学习如何使用Claude代码。由于直接使用官方Claude代码通常非常昂贵（如下所示），我们将改用兼容Claude代码协议但基于其他大型模型的API平台。

![]（/zh-cn/stage-2/backend/modern-cli/images/image11.png）

你需要了解下面的不同选项（最好全部尝试），最终选择最适合你的作为主线路径。

第一种方法是直接使用“Anthropic接口兼容”的API。随着Claude代码的普及，越来越多的模型提供者支持Anthropic风格的调用。常见的提供者包括GLM、Kimi、DeepSeek和Siliconflow。它们都提供兼容的API接口。我们将稍后解释具体配置细节。

需要注意的是：Claude Code 通常消耗大量代币。如果你担心 API 成本过高，可以考虑 GLM 月费计划（约 20 元/月）来控制成本。如果你想先估算实际支出，也可以充值 10 元用于小规模实验。

另一种方法是使用“Claude Code Route”项目。这是一个开源工具，支持所有常见的API调用接口，并允许针对不同场景进行细粒度模型配置，包括本地模型访问。但该选项配置更复杂，因此我们建议从第一种方法开始。

#### 使用Zhipu GLM作为后端（推荐）

GLM（通用语言模型）是一系列由志普AI独立开发的大型语言模型。GLM-4.6目前是GLM家族的最新版本。其核心亮点是强大的编码性能（在公开基准测试和实际任务中基准测试Claude Sonnet 4，国内被视为顶尖水平）。

![]（/zh-cn/stage-2/backend/modern-cli/images/image12.png）

它还将上下文窗口扩展到20万，便于处理长文本和大型代码库，同时增强推理和工具调用能力，实现性能与成本的良好平衡。

![]（/zh-cn/stage-2/backend/modern-cli/images/image13.png）

在连接GLM之前，我们首先需要安装Claude代码。

如果命令行安装感觉麻烦，或中途出现错误，你可以直接让 Trae 的代理为你完成安装。

```python
# Install Claude Code
npm install -g @anthropic-ai/claude-code

# Enter your project
cd your-awesome-project

# Start Claude Code
claude

# Press Ctrl+C to exit Claude
```

接下来，我们需要更改 Claude Code 的默认 API 请求端点，以便它支持 GLM 的 API 服务。你可以复制下面的内容，并让 Trae 为你创建相应的环境变量。你也可以选择将它们永久写入系统环境变量（如果出现问题，你也可以请 智能体 帮助修改它们）。

首先，你需要获取你的 GLM API 密钥，并以最方便的方式存储。

国内网址：<https://bigmodel.cn/usercenter/proj-mgmt/apikeys>  
国际网址：<https://z.ai/manage-apikey/apikey-list>

如果你使用 **国内 GLM** 服务，请使用以下变量配置：

```python
# Run the following command in Cmd
# Replace `your_zhipu_api_key` with the API key you just obtained
setx ANTHROPIC_AUTH_TOKEN your_zhipu_api_key
setx ANTHROPIC_BASE_URL https://open.bigmodel.cn/api/anthropic
```

如果您正在使用**国际 GLM**服务，请使用此配置：

```python
# Run the following command in Cmd
# Also replace `your_zai_api_key`
setx ANTHROPIC_AUTH_TOKEN your_zai_api_key
setx ANTHROPIC_BASE_URL https://api.z.ai/api/anthropic
```

你可以直接在 Trae 中输入这样的提示：

⚠️ 如果你通过 Trae 配置了“永久环境变量”，那么配置完成后你**必须重启 Trae**。否则 Trae 内置终端中的环境变量不会刷新，这可能导致登录失败或网络连接错误。

```python
Based on my environment variable settings:
setx ANTHROPIC_AUTH_TOKEN your_zai_api_key
setx ANTHROPIC_BASE_URL https://api.z.ai/api/anthropic

and my key(Replace it with your own key):
681fea485851d29060cc.13gfaendggaFOhb

please help me configure and start Claude Code
```

您将看到类似如下的输出：

![](/zh-cn/stage-2/backend/modern-cli/images/image14.png)

> 💡 什么是环境变量？
>
> 环境变量本质上是存储在操作系统中的键值配置条目，通常形式为“变量名 = 特定值”。如果在终端或系统设置中提前配置好，程序可以随时读取这些变量以获取相关信息。因为环境变量可以直接在终端中书写而无需修改代码，我们通常将大型模型访问密钥存储在环境变量中以避免泄漏。程序只需读取对应的环境变量即可完成模型调用。
>
> 在 Windows 中，除了存储模型访问密钥，环境变量也常用于存储命令行工具的可执行文件“路径位置”。
>
> 我们知道终端本身也是一个程序。有时我们希望从终端启动外部程序。例如，在终端中输入 `claude` 来启动 Claude Code。之所以可以这样操作，是因为终端读取了系统环境变量，而 PATH 变量包含 Claude Code 可执行文件所在的目录，因此终端可以找到并执行它（相当于将该程序的绝对路径粘贴到终端并按回车）。
>
> 一个典型的环境变量可能如下所示：`PATH=C:\Windows\system32;C:\Program Files\Python`。然后我们可以在任意目录下执行这些程序，例如直接在命令行中输入 `python` 来启动 Python 解释器。
>
> 如果想查看当前系统环境变量，在 Windows 搜索中输入“环境变量”，然后在“编辑系统环境变量”窗口中就可以看到所有变量及其值。有些存储模型密钥，而有些则添加程序目录以便从任意路径调用。

现在您可以使用最新的 GLM 来进行 Claude Code 开发。您可以尝试重新运行之前的项目，或者重新执行 Trae 未完成好的任务，并比较体验差异。

🎉 反复重建并不是浪费时间，每一次重复都会让您的技能更加扎实。

使用与 GLM 完全相同的逻辑，您也可以连接其他支持 Anthropic 兼容格式的接口。

#### 使用 Kimi K2 作为后端（推荐）

Kimi K2 是 Moonshot AI 发布的新一代大型语言模型，在代码理解和生成方面表现优异。Kimi K2 支持超长上下文窗口（高达 20 万 token），能够轻松处理大型代码库和复杂项目。

**核心优势：**
- **超长上下文**：支持 20 万上下文窗口，可一次性处理整个项目代码
- **强大的编码能力**：在代码生成、重构和调试方面表现出色
- **更好的中文理解**：对中文编程需求理解更加准确
- **稳定的工具调用**：支持可靠的函数调用和工具使用

**获取 API Key：**

访问 <https://platform.moonshot.cn/console/account> 注册并获取 API Key。

**配置方法：**

参考文档：<https://platform.moonshot.cn/docs/guide/agent-support>

```bash
export ANTHROPIC_BASE_URL=https://api.moonshot.cn/anthropic
export ANTHROPIC_AUTH_TOKEN=sk-YOURKEY
```

#### 使用 Minimax 作为后端（推荐）

Minimax 是 MiniMax 发布的新一代大型语言模型，在编程任务中表现出色。Minimax 模型以强大的推理能力和高质量代码生成著称，尤其适用于复杂的编程场景。

**核心优势:**
- **强大的推理能力**：在复杂逻辑推理和代码架构设计中表现良好
- **高质量代码**：生成的代码结构清晰，可读性高
- **多语言支持**：支持多语言的代码生成和转换
- **快速响应**：API 响应迅速，适合高频调用场景

**获取 API 密钥:**

访问 <https://platform.minimax.io/> 注册并获取 API 密钥。

**配置方法:**

```bash
export ANTHROPIC_BASE_URL=https://api.minimax.io/anthropic
export ANTHROPIC_AUTH_TOKEN=YOUR_MINIMAX_API_KEY
export ANTHROPIC_MODEL=MiniMax-M2.7
```

#### 使用 DeepSeek 作为后端（推荐）

DeepSeek 是由 DeepSeek 发布的开源大型语言模型，因其强大的编程能力和高性价比而在开发者中广受欢迎。DeepSeek Coder 经过专门训练优化，适用于编程任务。

**核心优势：**
- **卓越的编码能力**：在代码生成、理解和修复漏洞方面表现出色
- **开源且可定制**：开源模型，可根据需求进行微调
- **高性价比**：API 定价相对低，适合高频使用
- **良好的中文支持**：能够准确理解中文编程场景

**获取 API Key：**

访问 <https://platform.deepseek.com/usage> 注册并获取 API Key。

**配置方法：**

```bash
export ANTHROPIC_BASE_URL=https://api.deepseek.com/anthropic
export ANTHROPIC_AUTH_TOKEN=YOU_DEEPSEEK_API_KEY
export API_TIMEOUT_MS=600000
export ANTHROPIC_MODEL=deepseek-chat
export ANTHROPIC_SMALL_FAST_MODEL=deepseek-chat
export CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1
```

#### 使用火山引擎编码计划作为后端（推荐）

火山引擎是字节跳动的云服务平台，提供企业级 AI 模型服务。火山引擎的编码计划针对编码场景进行了专门优化，提供稳定高效的代码生成能力。

**核心优势：**
- **企业级稳定性**：提供服务稳定性的 SLA 保证
- **编码场景优化**：专门针对编程任务进行优化
- **丰富的模型选择**：支持包括 Doubao-pro 和 Doubao-lite 在内的多种模型
- **国内快速访问**：国内节点部署，访问速度更快

**获取 API Key：**

访问 <https://console.volcengine.com/ark/region:ark cn-beijing/apiKey> 注册并获取 API Key。

**配置方法：

```bash
export ANTHROPIC_BASE_URL=https://ark.volces.com/api/anthropic
export ANTHROPIC_AUTH_TOKEN=YOUR_VOLCANO_API_KEY
export ANTHROPIC_MODEL=doubao-pro-32k
```

#### 其他与 Anthropic 兼容的 API

Siliconflow：

```bash
export ANTHROPIC_BASE_URL="https://api.siliconflow.cn/"
export ANTHROPIC_MODEL="moonshotai/Kimi-K2-Instruct-0905"    # You can change to the model you need
export ANTHROPIC_API_KEY="YOUR_SILICONCLOUD_API_KEY"    # Replace with your API key
```

阿里云 DashScope (Aliyuncs)：<https://help.aliyun.com/zh/model-studio/get-api-key>

```python
export ANTHROPIC_BASE_URL="https://dashscope.aliyuncs.com/apps/anthropic"
export ANTHROPIC_API_KEY="YOUR_DASHSCOPE_API_KEY"
```

::: 详细信息 使用 Claude Code Route 作为后端（高级用法）

上文我们解释了如何将 Claude Code 的 Anthropic 接口替换为官方 GLM API。接下来，我们来看 Claude Code Router 如何让 Claude Code 适配更多模型 API。

[Claude Code Router](https://github.com/musistudio/claude-code-router) 是专门为 Claude Code 设计的智能路由增强工具。它的核心功能是帮助用户根据需要将 AI 请求分发到不同平台的模型上，并且具有高度自定义性。它支持访问包括 OpenRouter、DeepSeek、Ollama、Gemini 等数十个平台。它还可以按照场景将任务路由到特定模型，例如 GLM-4.5、Kimi-K2 和 Qwen3-Coder。例如，你可以将后台任务路由到本地 Ollama 以节省成本，将长文本/长代码任务路由到 Gemini-2.5-Pro，将代码讲解任务路由到 DeepSeek。

![](/zh-cn/stage-2/backend/modern-cli/images/image16.png)

该工具还提供了方便的 UI/CLI 配置管理，并使用转换器适配不同平台的 API 格式。它支持 GitHub Actions 等自动化集成以及自定义扩展，解决了“单一模型无法覆盖所有场景”和“频繁切换平台很麻烦”的问题，帮助用户更灵活、低成本地使用 AI 工具。

![](/zh-cn/stage-2/backend/modern-cli/images/image17.png)

以下是 Claude Code Router 安装的快速介绍。大致步骤如下（你也可以让 Trae 来执行这些步骤）以准备环境:

```markdown
npm install -g @anthropic-ai/claude-code
npm install -g @musistudio/claude-code-router
```

安装完成后，您需要确认本地是否可以使用 `ccr` 命令。如果您看到类似以下的输出，则说明安装成功：

![](/zh-cn/stage-2/backend/modern-cli/images/image18.png)

接下来，有两种方法可以初始化和配置模型：

- 使用 CCR 内置的 UI 并在其浏览器页面上进行配置。
- 直接编辑 CCR 的默认配置文件（UI 本质上也是在编辑配置文件，只是提供了更直观的界面）。

如果您选择 CCR UI，将看到类似如下的界面：

![](/zh-cn/stage-2/backend/modern-cli/images/image19.png)

此时，点击“添加提供者”按钮，会看到以下界面。您需要：

1. 在名称中输入提供者名称；
2. 在 API 完整 URL 中填写该提供者兼容 OpenAI 的端点；
3. 在 API Key 中填写对应平台的 API 密钥；
4. 在 Models 区域填写模型名称，然后点击“添加模型”；
5. 最后点击“保存”以保存配置。

（如果向下滚动，还会有许多高级选项，但现在可以忽略它们。）

![](/zh-cn/stage-2/backend/modern-cli/images/image20.png)

以下是 DeepSeek 和 Kimi 的配置示例：

![](/zh-cn/stage-2/backend/modern-cli/images/image21.png)

![](/zh-cn/stage-2/backend/modern-cli/images/image22.png)

保存模型配置后，您还需要在右侧的路由器区域指定默认模型。从下拉菜单中选择，并设置为 `kimi`（推荐），然后点击右上角的 `Save and Restart`。

![](/zh-cn/stage-2/backend/modern-cli/images/image23.png)

之后，只需在终端中运行 `ccr code`，即可通过 Claude Code Router 启动 Claude Code 工作流程。

![](/zh-cn/stage-2/backend/modern-cli/images/image24.png)

:::

#### Claude Code 高级用法

许多人最初把 Claude Code 仅作为普通聊天工具使用。但实际上，它内置了许多功能，可以使您的工作流程更高效、更灵活。以下是常用命令和使用示例：

参考文档：

<https://docs.claude.com/en/docs/claude-code/cli-reference>  
<https://docs.claude.com/en/docs/claude-code/slash-commands>

| 命令              | 作用                                      | 示例                                      |
| ----------------- | ----------------------------------------- | ---------------------------------------- |
| claude            | 启动交互模式                                | `claude`                                     |
| claude "query"    | 执行一次性任务并输出结果                    | `claude "explain this project"`                                     |
| claude -p "query" | 提出一次性问题并自动退出                     | `claude -p "explain this function xxxx"`                                     |
| claude -c         | 继续最近的会话                              | `claude -c`                                     |
| claude -r         | 恢复之前的会话                              | `claude -r`                                     |
| /resume           | 在当前聊天中切换到之前的会话                | `claude -c`, `/resume`                             |
| /plugin           | 管理插件并安装提交/审核扩展                 | `/plugin`                                    |
| /init             | 使用 CLAUDE.md 初始化项目说明                | `/init`                                    |
| /clear            | 清除当前上下文以防超载                      | `/clear`                                    |
| /compact          | 压缩历史记录并减少上下文令牌使用            | `/compact`                                    |
| /cost             | 查看当前费用使用情况                          | `/cost`                                    |
| /model            | 切换模型（在兼容 API 的情况下通常可忽略）     | `/model`                                    |
| /memory           | 管理 CLAUDE.md 记忆文件                     |                                          |
| /help             | 显示可用命令列表                            | `/help`                                    |
| exit 或 Ctrl C    | 退出 Claude Code                           | `exit` 或 `Ctrl+C`                          |
| /agents           | 高级功能，稍后解释                           |                                          |
| /mcp              | 高级功能，稍后解释                           |                                          |

**CLAUDE.md**

参考: <https://www.anthropic.com/engineering/claude-code-best-practices>

`CLAUDE.md` 是一个 Claude 会在会话开始时自动读取并包含在上下文中的特殊文件。因此非常适合记录：

- 常用的 bash 命令
- 核心文件和工具函数
- 代码风格约定
- 测试方法笔记
- 仓库协作约定（例如分支命名、合并 vs 重构等）
- 开发环境设置笔记（例如是否使用 pyenv、首选编译器等）
- 项目中需要额外注意的行为或陷阱
- 任何你希望 Claude “记住”的信息

`CLAUDE.md` 本身没有严格的格式要求，只要简洁且可读。例如：

```
# Bash commands
- npm run build: Build the project
- npm run typecheck: Run the typechecker

# Code style
- Use ES modules (import/export) syntax, not CommonJS (require)
- Destructure imports when possible (eg. import { foo } from 'bar')

# Workflow
- Be sure to typecheck when you’re done making a series of code changes
- Prefer running single tests, and not the whole test suite, for performance
```

#### Claude Code 的内部原理

参考：<https://github.com/shareAI-lab/analysis_claude_code>

如果你好奇为什么 Claude Code 在许多场景下比 Trae 或 Cursor 代理工具表现更好，我们可以简单了解一下它的内部工作机制。

其他 CLI AI 编程工具的整体实现风格大致相似。

![](/zh-cn/stage-2/backend/modern-cli/images/image25.png)

Claude Code 将编码任务分解为一个连续的“感知 - 思考 - 行动 - 验证”循环，并在循环中调用不同工具以完成工作。它模仿人类开发者的工作流程：持续“写代码 -> 运行 -> 检查结果 -> 继续改进”。在内部，主任务循环不断执行各个步骤。每个循环中，Claude 可以调用不同的工具，如读写文件、执行命令和搜索代码，然后根据实际工具的输出决定下一步操作。

几个值得注意的关键特性：

- **流处理**：Claude 可以在输出结果的同时进行思考，而不是等待所有代码完成后再执行。
- **智能压缩**：长对话可能导致上下文过大。Claude 将历史内容压缩成关键信息以减少“遗忘”，并区分长期记忆与短期记忆，以保持执行效率。
- **并发控制**：内部的并行设计允许多个任务同时进行而不互相干扰。
- **子代理管理**：在实际工作中，不只是一个“角色”处理所有事务。你可以协作管理多个子代理，每个子代理负责不同任务，例如专门的测试或文档编写代理。

### Codex

![](/zh-cn/stage-2/backend/modern-cli/images/image26.png)

![](/zh-cn/stage-2/backend/modern-cli/images/image27.png)

与 Claude Code 类似，Codex 是 OpenAI 开发的 AI 协作编程工具。你可以把它看作是“OpenAI 版本的 Claude Code”。它最大的优势是能够高效适应 GPT-5。

根据实际经验，GPT-5 目前响应更快，错误更少（在复杂多轮任务中成功概率更高）。一个缺点是解释可能显得更“学术化”和技术化，有时过于严谨和信息密集，对于初学者来说略显难以理解。

你可以使用以下命令安装 Codex：

```
npm i -g @openai/codex
```

#### 使用官方 OpenAI API 作为后端

如果你直接使用官方 OpenAI 的 Codex 接口，设置非常简单。一旦你拥有 OpenAI 订阅访问权限或相应的 API 配额，你只需在命令行中运行 `codex` 并按照提示完成登录。

![](/zh-cn/stage-2/backend/modern-cli/images/image28.png)

![](/zh-cn/stage-2/backend/modern-cli/images/image29.png)

#### 使用中继 OpenAI API 作为后端

由于官方 OpenAI API 可能存在高成本和严格的网络要求等问题，我们也可以通过其他 API 网关服务来绕过这些限制。

通过这种方式，我们只需在第三方中继平台购买相应的 Codex API 配额，就可以获得接近原生 OpenAI Codex 的使用体验。

参考：<https://open-dev.feishu.cn/wiki/PAqUwWG4IiuwTvkQ2sGcaQuPnXc>  
充值链接：<https://api.zyai.online/account/topup/recharge>

需要注意的一点是：在获得 token 配额后，我们仍然需要在本地配置 API Key。

在 key-group 设置中，确保选择专门针对 Codex 的项目。

![](/zh-cn/stage-2/backend/modern-cli/images/image30.png)

接下来，我们需要将你获得的 key 填入下面的提示中，然后将整个提示提供给 Trae，以便它为你完成整个配置过程：

````bash
My API key is: [Paste your obtained sk-xxxxx key here]

Please help me complete the following configuration tasks:

1. Create configuration directory
   - Create a `.codex` folder under my user directory
   - Windows path should be: `C:\Users\[My Username]\.codex`
2. Backup existing configuration (if exists)
   - Check if `.codex\config.toml` exists
   - If it exists, rename it to `config.toml.bak.[current timestamp]` (timestamp format: yyyyMMddHHmmss)
3. Create configuration file
   - Create `config.toml` in the `.codex` directory
   - Write the following complete content:
   ```toml
   preferred_auth_method = "apikey"

   [model_providers.myrelay]
   name = "我的中继站"
   base_url = "https://api.zyai.online/v1"
   env_key = "MYRELAY_API_KEY"
   wire_api = "responses"
   request_max_retries = 4
   stream_max_retries = 10
   stream_idle_timeout_ms = 300000

   [profiles.myrelay]
   model_provider = "myrelay"
   model = "gpt-5"
   model_reasoning_effort = "中"

   [tools]
   web_search = true

4. 设置系统环境变量
变量名: MYRELAY_API_KEY
变量值: 我给你的密钥

5. 确认完成并汇报:

配置文件的完整路径
环境变量是否设置成功
我可以使用命令 `codex --profile myrelay` 来运行它````

After configuration, you can launch Codex with relayed API through `codex --profile myrelay`. Usage afterward is similar to Claude Code: just keep entering your ideas and requirements in chat at any time.

### OpenCode

![](/zh-cn/stage-2/backend/modern-cli/images/image32.png)

![](/zh-cn/stage-2/backend/modern-cli/images/image33.png)

OpenCode is an open-source AI coding agent platform for developers, positioned like a "multi-model version of Claude Code." It uses the terminal as the core interaction entry, while also supporting editor integrations (such as VS Code and Neovim). It can deeply connect with local repositories and complete an end-to-end workflow through natural language, from code understanding to engineering execution.

It is not bound to one single model. Instead, it is an open platform where you can switch freely among GPT, Claude, Gemini, and even local models. OpenAI itself also supports connecting Codex/OpenAI subscription access through OpenCode.

![](/zh-cn/stage-2/backend/modern-cli/images/image34.png)

You can install OpenCode with the following commands:

```bash
# Linux / Unix
curl -fsSL https://opencode.ai/install | bash

# Windows
npm i -g opencode-ai```

#### Use Free Models in OpenCode

OpenCode periodically provides free models, and setup is very simple. In any folder where you want to use OpenCode, run `opencode` in terminal to open the chat panel. Then use `/models` and search for the keyword `free` to find models marked as free.

![](/zh-cn/stage-2/backend/modern-cli/images/image35.png)

In most cases, free models are slower than paid/subscription models for coding tasks. This usually depends on route congestion, peak usage hours, and the model's own capability.

#### Use Third-Party Models as OpenCode's Main Coding Model

This is OpenCode's core advantage: with the same MCP, Skills, and context, you can freely switch models for different coding tasks. Below we use OpenAI's official GPT-5.3 Codex as an example for connecting OpenCode as the main coding model.

In OpenCode chat, enter `/connect`, select the first relevant command, and press Enter to choose third-party provider authentication.

![](/zh-cn/stage-2/backend/modern-cli/images/image36.png)

Here we use OpenAI as an example and press Enter to choose an authentication method.

![](/zh-cn/stage-2/backend/modern-cli/images/image37.png)

Either option works; the only difference is the auth flow. Here we choose browser login.

![](/zh-cn/stage-2/backend/modern-cli/images/image38.png)

Copy the link to your browser and complete normal OpenAI login. After "Authorization Successful" appears in the browser, OpenCode will automatically move to the OpenAI model selection screen.

![](/zh-cn/stage-2/backend/modern-cli/images/image39.png)

![](/zh-cn/stage-2/backend/modern-cli/images/image40.png)

#### Install the Oh My OpenAgent Plugin

Another strength of OpenCode is its active community ecosystem. You can find many OpenCode-related plugins on GitHub. If OpenCode is a model-switchable AI collaboration tool, then Oh-My-OpenAgent is a "multi-agent AI coding orchestration system" running on top of OpenCode. It can split a complex task into sub-tasks and assign them to different models for specialized execution.

![](/zh-cn/stage-2/backend/modern-cli/images/image41.png)

You can copy the following prompt and send it to the model you already configured in OpenCode to install Oh My OpenAgent:

```文本
按照此处的说明安装和配置 oh-my-openagent：
https://raw.githubusercontent.com/code-yeongyu/oh-my-openagent/refs/heads/dev/docs/guide/installation.md```

Below is a brief feature overview of Oh-My-OpenAgent.

| Feature | Description |
| :-------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Discipline Agents** | Sisyphus coordinates Hephaestus, Oracle, Librarian, and Explore. A complete AI dev team works in parallel. |
| **Team Mode** (v4.0, optional) | One leader agent + up to 8 parallel members, real-time tmux visualization, dedicated `team_*` tool family. Powers `hyperplan` (5 adversarial reviewers) and `security-research` (3 hunters + 2 PoC engineers). [Docs →](docs/guide/team-mode.md) |
| **`ultrawork` / `ulw`** | One command launch; all agents mobilize. They do not stop until the task is done. |
| **[IntentGate](https://factory.ai/news/terminal-bench)** | Analyze true user intent before acting. Avoid literal-interpretation AI noise. |
| **Hash-based editing tools** | Every edit is validated with `LINE#ID` content hashes for 0% wrong-line edits. Inspired by [oh-my-pi](https://github.com/can1357/oh-my-pi). [The Harness Problem →](https://blog.can.ac/2026/02/12/the-harness-problem/) |
| **LSP + AST-Grep** | Workspace-level rename, pre-build diagnostics, AST-based rewrites. IDE-grade precision for agents. |
| **Background agents** | Launch 5+ experts in parallel while keeping the main context clean. |
| **Built-in MCP** | Exa (web search), Context7 (official docs), Grep.app (GitHub code search). Enabled by default. |
| **Ralph Loop / `/ulw-loop`** | Self-referential loop. It does not stop before 100% completion. |
| **Forced todo execution** | If an agent drifts, the system pulls it back. Your task must be finished. |
| **Comment reviewer** | Removes AI-flavored noisy comments so code reads like senior-engineer output. |
| **Tmux integration** | Full interactive terminal support: REPL, debugger, TUI tools in live sessions. |
| **Claude Code compatibility** | Existing hooks, commands, skills, MCPs, and plugins can migrate seamlessly. |
| **Skill-embedded MCP** | Skills can carry their own MCP servers, loaded on demand to protect context window size. |
| **Prometheus planner** | Strategic interview-style planning before writing code. |
| **`/init-deep`** | Auto-generates `AGENTS.md` through the project tree. Saves tokens and improves agent understanding. |

Sisyphus (claude-opus-4-7 / kimi-k2.6 / glm-5.1) is your chief orchestrator. It plans, delegates to specialists, and pushes tasks with aggressive parallel execution until complete.

Hephaestus (gpt-5.5) is your autonomous deep worker. Give goals, not hand-holding steps. It explores repo patterns and executes tasks end-to-end without babysitting.

Prometheus (claude-opus-4-7 / kimi-k2.6 / glm-5.1) is your strategic planner. Through interview-style clarification, it defines scope and builds a detailed execution plan before any coding starts.

After this, you can use OpenCode with the Oh-My-OpenAgent plugin to complete coding tasks.

#### Advanced Model and API Configuration

The `/connect` command offers a quick way to bring in a model through the chat UI. For finer control — assigning different models to different task types or keeping multiple API providers as backups — you can edit OpenCode's configuration file `opencode.json` directly.

This file lives at `~/.config/opencode/opencode.json` (Windows: `C:\Users\YourUserName\.config\opencode\opencode.json`) and is generated automatically the first time you launch OpenCode.

Here is a sample configuration for connecting Alibaba Cloud's Qwen model via the Bailian platform:

```json
{
  "model": "bailian-coding-plan/qwen3.5-plus",
  "small_model": "bailian-coding-plan/qwen3.5-plus",
  "provider": {
    "bailian-coding-plan": {
      "options": {
        "apiKey": "sk-your-api-key"
      }
    }
  }
}```

> 💡 The `model` field uses a `provider/model-name` format. Replace the `apiKey` value with your own key after registering on the corresponding platform.

To route different task types to different models:

```json
{
  "model": "bailian-coding-plan/qwen3.5-plus",
  "categories": {
    "visual-engineering": {
      "model": "bailian-coding-plan/qwen3.5-plus",
      "description": "前端，UI/UX，设计，样式"
    },
    "ultrabrain": {
      "model": "bailian-coding-plan/qwen3-coder-next",
      "description": "复杂逻辑，算法，架构"
    },
    "quick": {
      "model": "opencode-go/minimax-m2.5",
      "description": "简单编辑，错别字修正"
    }
  }
}```

Now OpenCode automatically picks the best model for each task — fast models for simple changes to save cost, stronger models for complex architecture decisions.

#### Extending OpenCode with MCP Servers

MCP (Model Context Protocol) is an open standard that lets AI coding tools call external services — browsers, web search, image analysis, and more. OpenCode supports MCP natively, with configuration similar to Claude Code.

Add server entries to the `mcp` field in `opencode.json`:

```json
{
  "mcp": {
    "chrome-devtools": {
      "type": "本地",
      "command": ["npx", "-y", "chrome-devtools-mcp@latest"]
    },
    "zai-mcp-server": {
      "type": "本地",
      "command": ["npx", "-y", "@z_ai/mcp-server"]
    }
  }
}```

After restarting OpenCode, the AI can call these tools automatically during conversation — opening a browser to take screenshots, analyzing UI mockups, searching the web, and more.

> 🎯 **Practical example**: With the chrome-devtools MCP configured, you can simply say "Open this page and check why the button is misaligned" — the AI will open the browser, take a screenshot, analyze the layout, and suggest a fix.

#### Tips and Troubleshooting

**Guiding AI behavior with AGENTS.md**

Create an `AGENTS.md` file in your project root to tell OpenCode about your project's conventions and preferences. The AI reads this file automatically on each launch:

```markdown
## 项目规范
- 使用 TypeScript 严格模式
- 所有 API 响应必须符合 JSON Schema
- 使用自定义 Error 子类进行错误处理

## 开发工作流程
1. 在进行修改前先了解现有代码
2. 以小而合理的单位提交代码
3. 每次修改后运行 npm test 验证

## 禁止
- 不要使用 `any` 类型
- 不要删除测试文件```

**Exploring codebases in parallel**

When you're unfamiliar with a project, ask OpenCode to search multiple aspects at once:

> Please do the following in parallel:
> 1. Find all places handling HTTP requests
> 2. Locate database-related code
> 3. Map out the project directory structure and module responsibilities

OpenCode executes these explorations simultaneously, giving you a complete codebase map in one go.

**Common Issues**

| Problem | Solution |
|---------|----------|
| `opencode` command not found | npm global directory not in PATH. Run: `[Environment]::SetEnvironmentVariable("Path", "$env:Path;$env:USERPROFILE\AppData\Roaming\npm", "User")` and restart terminal |
| AI response is slow | Use the `quick` category for simple tasks (routes to fast models); start a fresh session if conversation history is too long |
| API call fails | Check that your API Key is correct, the model name uses the right format (provider/model-name), and your account has sufficient balance |
| Skills not working | Verify that the SKILL.md file has valid YAML frontmatter and that the description accurately describes the trigger condition |
| Context too long | Open a new session, or define key conventions in AGENTS.md so new sessions inherit them |

## More Use Cases for CLI AI Coding Tools

### Use AI to Write Requirement Documents: Learn to "Concretize Requirements"

For large language models, abstract requirements should be "concretized." For example, "I'm hungry" is an abstract requirement. We need to convert it into: "My stomach is a little hungry. I may need a red-bean bun and a cup of soy milk." That becomes an executable, concrete requirement.

But turning abstract requirements into concrete ones is actually a process that costs a lot of energy. If we have not seen enough examples, it is hard to quickly think of how to break abstract problems into detailed modules. In such cases, the best approach is to let AI help with this "concretization" step.  
For example, if I want to build a daily planner app, the most basic idea might be:

`Please help me write a daily planning app where I can write my plans each day and get reminders.`

AI can indeed split tasks directly from this requirement and complete them step by step, but errors or understanding drift can occur in the middle. To reduce this risk, we can ask AI to expand the requirement first:

`Based on my needs, please elaborate and provide a more detailed Product Requirement Document for reference. My idea is: Please help me write a daily planner app that supports daily plan-writing and provides reminders .`

At this point, AI may produce a complete PRD like the following:

```产品需求文档（PRD）：“今日计划”应用
文档版本：1.0
创建日期：2023年10月27日
作者：（您的姓名/产品经理）

1. 产品介绍
1.1 产品名称
今日计划
1.2 产品愿景
“今日计划”是一款极简且高效的日常规划与提醒工具，致力于帮助用户消除拖延和健忘，清晰规划每天的事务，并通过智能提醒系统确保任务执行——最终让用户对自己的时间拥有更强的掌控感和成就感。
1.3 目标用户（用户画像）
我们主要服务三类用户：
学生（小明）：
特征：多任务，例如课程、作业、社团活动、考试准备，需要有条理的时间安排。
痛点：容易忘记小任务或作业截止日期；在任务间切换感到手忙脚乱；希望养成规律的学习和生活习惯。
需求：需要一个简单的工具列出每天待办事项，并在上课/自习前提供提醒。
办公室职员（张伟）：
特征：工作节奏快，会议多，报告多，项目节点多，还要处理个人事务（健身、接送孩子）。
痛点：容易忘记重要会议或工作节点；被紧急任务打断而忘记原定计划；每天结束时觉得忙碌但效率低。
需求：需要一个工具能快速记录和安排每日工作，并在关键时间（如会议前15分钟）发出强提醒。
自由职业者/自律追求者（李娜）：
特征：时间高度自由，但工作产出和个人成长需要强自律管理。
痛点：容易拖延，缺乏外部监督；一天开始没有明确计划，导致时间利用率低。
需求：需要一个工具帮助建立每日固定作息（早晨例行事务）并回顾每日成就以获得正向反馈。

2. 用户故事
作为用户，我想快速创建今日计划列表，这样我就能概览全天的任务。
作为用户，我想为每个任务设置具体开始和结束时间，以便创建可视化时间线。
作为用户，我想在任务开始前接收推送通知提醒，这样我就不会错过任何重要安排。
作为用户，我想自定义提醒时间（如提前5分钟、15分钟或60分钟），以便提醒更适合我的习惯。
作为用户，我想轻松标记已完成的任务，这样我可以获得成就感，并清楚看到我的进度。
作为用户，我想在每天结束时查看完成计划的总结，以便复盘和自我激励。
作为用户，我想方便地编辑和删除任务，以应对临时变化。
作为用户，我想查看前几天的计划和完成情况，以复盘我的效率和习惯。

3. 功能细分
核心功能 (MVP - 最小可行产品)
模块 1：计划管理
3.1.1 每日计划首页
界面：“今日”为核心视图，顶部显示当前日期。
视图：时间轴列表，清晰显示从早到晚的任务。没有时间的任务可列在顶部或底部的“待办事项”区域。
交互：
点击右下角的“ ”按钮快速创建新任务。
下拉刷新页面。
左右滑动查看昨天和明天的计划。
3.1.2 创建/编辑任务
入口：点击首页的“ ”或列表中的时间段。
字段：
任务标题（必填）：简要描述任务，例如：“上午10点每周产品会议”。
任务时间（可选）：
设置“开始时间”和“结束时间”。
提供“全天”选项以适应未指定时间的任务。
默认时间选择器应快速方便。
提醒设置（必填，带默认值）：见模块 2。
备注（可选）：添加进一步描述、链接或位置信息。
操作：保存、取消、删除任务。
3.1.3 任务交互
标记完成：每个任务前有复选框；勾选后加删除线和灰色背景，表示完成。可根据需要取消标记。
编辑任务：点击任务本身进入编辑页面。
删除任务：左滑任务显示“删除”按钮。
模块 2：智能提醒系统
3.2.1 提醒触发
机制：根据任务设置的“开始时间”和用户的“提醒提前时间”，从设备发送推送通知。
离线支持：本地定时提醒在用户离线时也必须触发。
3.2.2 提醒内容与格式
通知标题：应用名称“今日计划”。
正文：“提醒：[任务标题] 将在 [开始时间] 开始。” 例如：“提醒：产品会议将于10:00开始。”
声音：使用系统默认或提供几种简单有效的提示音。
3.2.3 提醒设置
全局设置（在设置页面）：
用户可以设置默认提醒时间，例如“任务开始前15分钟”。新任务默认采用此设置。
单个任务设置（在创建/编辑页面）：
用户可针对重要任务覆盖全局设置，选择具体提醒时间，如“准时”、“提前5分钟”、“提前30分钟”或“提前1小时”。
提供“无提醒”选项。
后续功能（V1.1，V2.0）
3.3 每日回顾与统计
每天夜间固定时间推送总结通知（例如 22:00）：“今天过得怎么样？看看你的成就吧！”
生成简单的每日报告卡：显示计划任务总数、完成任务数、完成率以及鼓励信息。
3.4 历史回顾
日历视图，可点击任意过去日期查看其计划和完成情况。高完成率的日子标记特殊颜色。
3.5 模板
允许用户将成功的每日计划保存为模板，例如“高效工作日”、“轻松周末”。
创建明日计划时，一键导入模板，稍作修改以节省时间。
3.6 主题与个性化
提供暗色模式。
允许更改若干主色主题。

4. 非功能性需求
4.1 性能
回复：应用启动时间不到2秒;添加/编辑任务必须流畅且无延迟。
资源使用：低电池和内存消耗在后台;不要在等待提醒时过度消耗资源。
4.2 可用性
简约直观：用户界面必须简洁，主要功能三次点击即可访问。新用户无需教程。
错误容忍度：提供撤销（例如错误删除任务后短暂撤销）。
4.3 可靠性
可靠的提醒：提醒功能是产品的生命线;必须保证99.99%的及时和准确交付。
无数据丢失：用户计划必须可靠地存储在本地。未来版本可支持云同步，以防止设备更换时的数据丢失。
4.4 兼容性
平台：支持主要iOS和Android版本（最新3-4版本）。
屏幕：布局必须适合不同手机屏幕尺寸。

5. 路线图
V1.0（MVP）：
目标：验证核心价值——规划和提醒。
功能：完成上述所有“核心功能”（计划管理、智能提醒）。
V1.1（快速优化）：
目标：提高留存率和成就。
功能：新增“每日回顾与统计”、“历史回顾”。
V2.0（增强体验）：
目标：提高效率和个性化。
功能：添加“模板”、“主题与个性化”，并开始开发“云同步”。
```

相比我们最初的句子“帮我写一个可以记录计划和每天提醒的应用”，这份文档现在详细得多。你可以根据实际需求添加、删除和修改内容。对于你不确定的模块，你可以不断向AI请求更多替代方案，然后选择并合并成最终版本。

这样，我们就能轻松地将抽象的想法转化为具体描述。对于人工智能开发来说，“具体”意味着生产力。需求越具体，越容易获得稳定的结构和更高质量的项目产出。你可以尝试用这种方式重做之前的小型项目，并对比差异。

如果你觉得这种“需求提示”太长，一个很自然的做法是把它写成独立的Markdown文档，作为需求文档/开发文档/PRD。这样每次你让AI构建项目时，只需让它“参考此文档”，而不是每次都重复打长提示。你还可以在多次迭代中不断改进这份文档，让未来的项目直接受益。

以下是一些其他常见的使用场景：

### 管理文件夹

我们可以尝试用CLI的AI编码工具来管理当前文件夹中的各种文件。例如，如果你有一堆需要整理和分组的杂乱文件，你可以告诉Claude Code或Codex：

`Please help me organize the contents of the current folder. I want to group files with the same content together & I want to group files from the same time period together. Please help me handle this.`

### 开发新项目

这几乎和我们之前用 z.ai 和Trae的方式完全一样。我们可以直接使用CLI的AI编码工具，从零开始开发全新的项目。当然，最好提前准备一份需求文档。

需求文档越详细，最终结果越好。随着想法的发展，你可以在多个轮次中优化该文档。文档越完整，实施通常越稳定成熟。

### 部署开源项目（例如 Dify）

对于刚接触计算机的学习者来说，从GitHub部署开源项目往往很困难。但我们可以完全把这些交给Claude Code，就像我们在Dify教程中所做的那样：

https://github.com/langgenius/dify

如果我想运行我自己的本地 Dify，我只需要将此链接扔给 Claude Code，然后输入：

`I want to deploy this GitHub project ``https://github.com/langgenius/dify`` . Please help me clone the project and run it.`

在收到你的请求后，Claude Code 会自动完成一系列操作，包括从 GitHub 拉取代码、配置运行环境以及启动项目。如果任何步骤失败或启动状态异常，你只需根据提示进行少量手动处理。除了 Dify，你还可以让 Claude Code 为你部署大多数常见的开源 GitHub 项目。你只需要一个聊天窗口和喝一杯咖啡的时间 ☕️。

![](/zh-cn/stage-2/backend/modern-cli/images/image31.png)

### 解释代码并编写文档

对于一些复杂项目，或由 AI 生成的大型项目，你可能会觉得代码太长、逻辑太密集而难以理解。此时，你可以让 CLI AI 编程工具“阅读代码”。你可以这样问：

- 请向我解释这个项目：如何运行它、如何使用它，以及如何修改并继续开发它。
- 请说明这个项目的整体工作流程：程序如何运行，用户在界面上可以执行哪些操作？
- 请为这个项目编写完整的文档，包括开发文档和运行文档。
- 根据我当前文件夹中的所有内容，编写详细说明并保存到指定的 Markdown 文档中。

### 更多使用场景

当然，CLI AI 编程工具能做的远不止我们上面列出的内容。不要仅仅把它们当作“写代码的工具”。要把它们当作具有独立行动能力的智能代理。你可以让它们：

- 管理和整理本地文件；
- 撰写日志和总结；
- 分析和修复系统错误；
- 执行各种重复的命令行任务。

在不久的将来，它可能会成为你电脑上最重要、最理解你的 AI 伙伴。