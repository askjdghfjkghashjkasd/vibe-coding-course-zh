# Dify 基础知识与知识库集成

# 上一课复习

在上一课中，我们以小组形式学习了 AI 编程、提示工程和 AI 图像生成的基础知识。这些主题帮助我们初步理解了不同大型语言模型（LLM）和生成模型的边界与能力。

为了帮助你复习上一课内容，请思考以下简短问题：

1. 什么是 AI 编程？你如何使用 AI 编程工具（例如 [z.ai](https://z.ai)）创建网页？
2. 什么是大型语言模型？什么是提示工程和上下文工程？如何撰写复杂的提示？
3. 在文本、AI 编程和图像生成中，你认为模型的优势和劣势最清晰地表现在哪些方面？
4. 什么是 API？如何使用 [z.ai](https://z.ai) 连接第三方 API？

如果有任何问题仍然不清楚，你可以回顾上一课的文档或直接在微信群中提问。

在本课中，我们将从简单的 AI 文本/图像工具过渡到更接近实际业务部署的工作流构建平台。我们将从聊天机器人过渡到 AI 代理与 AI 工作流，然后使用 API 将它们转化为交互式的“智能”聊天机器人页面。

在动手操作过程中，如果某个步骤难以理解，不必担心。推荐的做法是截取当前页面的截图，然后直接向模型提问。目前的模型已经可以解决大多数常见问题。

如果问了还是解决不了，请继续尝试。不要害怕犯错，每一次尝试都是学习和进步的一部分。随着练习的增多，你将变得更加熟练和自信。

# 本课你将学到的内容

1. 为什么需要从聊天机器人升级到代理和工作流编排。
2. 代理/工作流开发平台是什么，以及如何将 AI 能力转化为 SOP 风格、可编排的流程。
3. Dify 是什么，以及如何在这个开源 LLM 平台上快速构建应用，特别是知识库问答型聊天机器人。
4. RAG 的工作原理，以及为什么需要检索增强生成（retrieval-augmented generation）。
5. 如何从 0 到 1 学习 Dify 和 AI 集成开发环境 Trae (`Extra Knowledge 4 - What is AI 集成开发环境 and Trae`)，包括使用 Dify API 构建代理、工作流和前端聊天机器人页面。

- Dify 的基本原理、代理/工作流构建方法及 API 调用。
- AI 集成开发环境 的使用及 AI 辅助编程工作流。
- 一个可以进行聊天的前端代理程序。

# 1. 从对话到代理

在前一阶段，我们学习了如何使用提示让模型扮演角色、生成文本或编写简单代码。但仔细思考会发现一个关键问题：聊天机器人本身实际上无法执行工作。

它可以回答“如何查询订单”，但不能真正查询数据库中的订单号；它可以描述周报应包含哪些内容，但不能自动收集项目数据并发送邮件。这种“能说但不能做”的限制，使得纯对话型 AI 很难真正嵌入业务流程。

要将 AI 从聊天伙伴升级为数字员工，我们需要赋予它三项核心能力：

1. 专有知识：让它阅读并理解你的产品文档、客户资料和内部政策。
2. 工具调用（或插件）：让它操作数据库并调用 API。
3. 结构化执行：让它按照预定义逻辑逐步完成任务，而不是自由发挥。

这是一个 AI 代理的原型：一个具有目标、知识、工具和执行路径的自动化单元。

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image1.png)

> 注意：在当前行业使用中，“简单代理”通常指由 LLM、工具、知识库构建的增强应用，而不是完全自主规划的代理。尽管这些简单代理没有真正的长周期推理和规划能力，但对于许多企业自动化场景已经足够。我们将在后续章节介绍真正自主的代理。

## 1.1 最简单的代理：知识库问答聊天机器人

在明确了代理的核心能力之后，自然会产生一个问题：是否可以通过仅实现其中一个能力来构建一个实用的基础代理？答案是肯定的。

在许多真实的业务场景中，用户并不需要 AI 执行复杂操作（例如跨多个系统的 API 协作）。他们的核心需求是基于公司特定资料的准确、可靠的问答。这正好对应第一个核心能力：专有知识服务。

这就引出了最简单且最广泛使用的代理形式：知识库问答聊天机器人。

虽然它尚未包括工具调用或自主规划，但关键突破在于：模型回答不再是“凭空生成”，而是有证据支撑。这是如何实现的？我们需要解决一个核心挑战：当内部文档成千上万页时，模型如何快速找到每个用户问题最相关的部分？

一种解决方案是检索增强生成（检索增强生成, RAG）。

RAG 的核心思路是：当用户提出问题时，系统首先从企业知识中检索最语义相关的文本片段（例如，从产品手册中提取一段，从人力资源文档中提取一个政策条款），然后将这些片段注入模型上下文，使答案基于真实的来源材料生成。

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image2.png)

图片来源：[https://www.datacamp.com/blog/what-is-retrieval-augmented-generation-rag](https://www.datacamp.com/blog/what-is-retrieval-augmented-generation-rag)

这意味着回答不再仅依赖于通用训练知识，而是依托企业权威信息。RAG 的目标正是这种动态外部知识注入，它显著提高了答案的真实性、准确性和一致性。它甚至可以强制回答的语气/风格，例如客服语气或技术文档风格。

在实际业务中，这尤其重要，因为模型可能会产生幻觉。例如，如果你以首席财务官或顾问的身份要求具体指标，模型可能会编造日期和事件。使用 RAG 后，可控性和可靠性会大幅提升。

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image3.png)

图片来源：[https://www.databricks.com/glossary/retrieval-augmented-generation-rag](https://www.databricks.com/glossary/retrieval-augmented-generation-rag)

在本课的实践环节中，我们将使用 Dify —— 一个流行的 AI 工作流平台，来构建知识库问答聊天机器人。你可以轻松将多种专有资料转化为知识库，例如产品手册、公司政策文档、项目文档、研究论文、知识库文章，甚至个人笔记。

设置完成后，你可以尝试以下问题：

- “Product A 最新版本的主要升级有哪些？”
- “根据员工手册，今年的年假政策是如何定义的？”
- “在项目 XX 中，我们是如何解决技术挑战 'XXX' 的？”
- “本文描述的核心研究方法是什么？”

你将直接感受到 RAG 如何将静态、零散的文档转化为精准的智能知识库，从而支持跨场景的高准确度问答。

## 1.2 从会话代理到工作流程

然而，即使是具备知识库和工具调用的“增强型代理”，对于更复杂的业务流程仍然不足。

想象以下请求：
“我们新发布的 SaaS 产品最近发布了哪些新功能？你能将它们整理成面向客户的简报吗？”

这看起来很简单，但背后实际上需要协调多个步骤：首先从内部文档或 Notion 知识库中检索上个月的发布说明；然后筛选面向客户的关键功能；再调用 LLM 将技术描述重写为客户友好语言；最后将生成的内容发送到市场团队的邮箱或保存到 Google 文档模板中。

如果仅依靠单一 LLM 自由推理，很难在一次对话中完成整个过程。即使完成，也可能遗漏关键细节，将内部术语与客户语言混淆，或无法以结构化形式输出。更重要的是，企业需要可审计、可复用、可监控的标准化执行路径，而不是每次运行的临时即兴操作。监控和可重复性对于企业风险控制至关重要。

这引出了更高级的 AI 应用模式：AI 工作流程。

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image4.png)

工作流程意味着将复杂任务分解为有序、可配置、可自动执行的子步骤，然后在步骤之间编排逻辑（条件、循环、并行）——可通过可视化或代码完成。将 AI 能力转化为 SOP 意味着将“AI 如何完成此任务”固化为可复用的模板。

这带来了多重好处：非技术角色（如产品经理或运营人员）可以通过拖拽快速构建 AI 应用；开发者可以将 RAG 检索、LLM 调用、API 工具封装为标准节点，在各业务场景中复用；整个流程可以被追踪、调试并持续优化，以满足企业对稳定性和合规性的要求。

AI 工作流程的用户范围广泛。产品经理可以在不写代码的情况下设计完整交互流程；运营人员可以快速构建客服机器人、内容生成器或通知系统；开发者及 ML 工程师可以模块化能力以便前端集成；创始人和独立开发者可以低成本验证 AI MVP，并通过查询生成操作在几天内发布原型。

另需注意，AI 工作流程通常通过中间表示描述。平台具体实现不同，但大多数使用结构化文件（JSON、YAML 等）来定义节点类型、输入/输出以及执行逻辑，如下所示：

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image5.png)

总之，如果代理让 AI 从“会聊天”到“能做事”，那么工作流程则让 AI 从“偶尔完成一个任务”到“稳定、可靠、大规模完成一类任务”。在接下来的实践中，我们将在 Dify 上构建完整的 AI 工作流程，体验从想法到可运行应用的完整路径。

## 1.3 常见的智能代理 / 工作流平台

随着生成式 AI 的快速发展，许多低代码和无代码的代理/工作流平台应运而生，帮助开发者和业务用户在不陷入底层编码复杂性的情况下快速构建智能流程。

首先，明确低代码的含义：指通过拖拽式可视化组件、预设逻辑模板和图形化规则配置，大幅减少手动编码的开发工具。核心思想是用可视化节点编排替代直接编程。这解放了技术用户的重复工作，同时让熟悉业务逻辑的非技术用户参与应用构建。本质上，它是效率与灵活性之间的桥梁。

低代码/无代码 AI 平台的关键价值在于降低开发门槛。以前需要跨部门协作数周（需求、编码、测试、部署）的工作，现在在常见代理场景中，如客户问答机器人和数据处理助手，几小时内即可从想法落地到上线。

主流低代码 AI 工作流平台包括：

| 平台 | 特点 | 典型场景 |
| --------------------------------------------- | -------------------------------------------------- | -------------------------------------- |
| Dify | 开源；支持知识库 RAG、LLM 编排、API 输出；中文友好 | 企业知识问答、定制代理、API 服务 |
| Coze（字节跳动） | 国内可用，整合豆宝/飞书生态，插件丰富 | 社交机器人、国内小程序集成 |
| n8n | 通用自动化平台，带 AI 节点，擅长 API 编排 | 跨系统同步、AI 与传统 SaaS 自动化 |
| 百度前沿 AppBuilder / 阿里百链 / 腾讯混元 | 云原生厂商栈，内置模型 | 企业部署、严格合规场景 |

市场上选择众多。尽管 AWS、Azure、阿里云等也提供工作流解决方案，但 Dify、Coze 和 n8n 因三个主要优势，目前仍是最常用的平台：

1. 极致易用：可视化拖拽界面，上手简单，无需深入理解底层技术。
2. 高度灵活：自定义组件和可扩展 API 支持轻量演示/MVP 和 SMB 团队的敏捷迭代。
3. 生态成熟：文档详尽，支持响应及时，活跃社区和可复用模板丰富。

三者均支持将构建的代理作为标准化 API 暴露，实现与前端 Web 应用、企业 ERP 系统及移动应用的无缝集成，进一步降低部署门槛。

### 1.3.1 Dify：企业 LLMOps 与应用生命周期平台

Dify 定位为 LLM 应用开发与运营平台，专注于从概念到部署再到优化的全生命周期管理。核心是低代码平台，帮助开发者和非技术创新者快速构建生产级 AI 应用。

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image6.png)

功能方面，Dify 包括可视化工作流编排、代理构建、知识库管理及多模型支持。你可以通过拖拽节点设计复杂流程，并创建基于意图的代理。其知识库功能可处理多种文档格式，并支持高效向量检索。Dify 支持 GPT、Claude 及多种开源模型，并可一键将应用发布为标准 API。

![]（/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image7.png）

在架构上，Dify强调开源和私有部署，具备灵活性、可扩展性和企业合规性。典型用户包括开发团队和业务创新者。典型用例包括企业知识质量保证/客户支持、内容自动化、垂直AI助手和企业AI中间平台。

### 1.3.2 Coze（字节跳动）：推广零代码AI代理构建

Coze 是字节跳动的 AI 代理平台。其核心价值是极高的可用性，使没有编程背景的用户也能创建、调试并发布丰富的 AI 聊天机器人。

![]（/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image8.png）

其核心互动是“构建模块”。用户可以通过界面配置机器人角色和知识库，并使用丰富的内置插件库实现新闻、旅游和图片生成等外部功能。构建好的机器人可一键发布到豆包、飞书、微信官方账号及其他渠道。

![]（/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image9.png）

其架构围绕低门槛使用设计，将字节跳动模型集成到云服务后面，抽象复杂的流程细节，强调多模态理解和实时响应。私有部署能力相对有限。典型场景包括个人助理和娱乐机器人、客户质量保证系统、在线学习助手以及快速原型制作。

### 1.3.2 n8n：可编程后端工作流自动化引擎

n8n 是一个通用可编程的工作流程自动化平台。其核心定位是连接应用程序、数据库和 API，以实现数据移动和任务执行的自动化。

它通过庞大的集成节点生态系统支持数百个SaaS服务、数据库和协议，结合了视觉设计与代码：你可以在画布上拖动节点，同时注入JavaScript/Python以实现自定义逻辑。N8N在后端、数据密集型工作流方面表现强劲，如同步、ETL和API编排。

![]（/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image10.png）

其关键技术特点是可见源代码和自托管，允许对数据和环境的完全控制。这对数据安全要求严格的行业尤为有吸引力。主要用户包括开发者、技术操作员和数据分析师。N8N最大的优势是其强大的社区生态系统：丰富的在线教程和共享模板降低学习成本。它还连接YouTube和Instagram等全球生态系统，帮助用户突破跨平台数据/服务壁垒。

### 1.3.3 其他工作流程平台

除了这些知名平台，中国主要科技厂商也推出了集成的AI平台。例如，百度千帆AppBuilder支持端到端模型选择、RAG构建和代理发布，深度集成文心模型;阿里百联（通义）强调企业安全和私有部署;腾讯云TI专注于金融/医疗垂直模板。这些模板通常深度集成于其云生态系统中，适合已处于这些架构中的企业。

然而，从通用性、开放性和社区生态系统来看，Dify和Coze仍是最广泛采用的选择之一，这得益于易用性、广泛的模型支持和活跃的开发者社区。

尽管平台定位和生态系统各不相同，但核心逻辑类似：以可视化方式编排并连接能力模块。一旦掌握了一个平台的设计和操作，就可以快速迁移到其他平台。在接下来的实践中，我们以 Dify 为例。

# 2. 逐步理解 Dify

## 2.1 什么是 Dify

我们之前已经介绍过 Dify 的基本情况。更多详情请访问 [https://cloud.dify.ai/apps](https://cloud.dify.ai/apps)，要获取官方信息请访问 https://dify.ai。

Dify 是一个开源平台，用于开发大型语言模型（LLM）应用。它提供了一个直观的界面，将代理工作流、RAG 流水线、工具能力、模型管理和可观测性结合在一起，帮助你快速从原型走向生产。

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image11.png)

在 Dify 中，你可以将大型模型和各种工具结合起来构建“工作流”。工作流是一个业务逻辑链，自动执行你本来需要手动逐步完成的操作，例如数据检索、LLM 调用、网络搜索、结果过滤以及格式整理。没有工作流，你需要反复复制/粘贴相似的提示，这效率低下、容易出错且难以在实际业务中复用。

构建工作流就像组装积木或拼图。你连接 LLM 节点（理解/生成）、工具节点（特定操作例如查询数据库、发送邮件、翻译文本）和数据节点（读取/存储信息）。这些节点然后按照你预设的逻辑自动协作，无需人工重复。你也可以把它理解为“低代码编程”：通过拖拽和输入/输出配置，你可以实现相当复杂的业务逻辑。

例如，如果你经营亚马逊或抖音电商店铺，并希望建立 AI 客服系统，你可以设计如下工作流：

1. 触发节点 (`START`)：接收用户查询，例如“这款产品保修期是多久？”
2. 问题分类节点 (`QUESTION CLASSIFIER`)：使用 LLM（例如 GPT）将查询分类为售后（保修）、使用指南或其它类型。
3. 知识检索节点 (`KNOWLEDGE RETRIEVAL`)：根据分类自动查询相应知识库。如果与保修相关，则提取精确的保修 SOP 内容。
4. LLM 节点：将用户查询和检索到的上下文发送给模型，生成用户友好的回复。
5. 条件节点：检查回复是否包含明确的保修期条款（例如“1 年”或“3 年”）。如果是，继续；如果不是，返回“请提供产品型号”。
6. 输出节点 (`ANSWER`)：返回最终答案并自动将此次咨询记录到表中。

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image12.png)

在这个过程中，你不需要手动浏览文档、反复调试输出或单独记录数据。工作流会自动将这一切串联起来。同时它也非常灵活：如果以后你添加新规则，比如“当用户询问保修范围时，查询另一个知识库”，只需添加一个条件节点，而无需重建系统。

这是一个相对简单的工作流示例。要完全掌握所有功能，目前阶段可能仍然感觉困难。因此，在本课中，我们将从更基础的知识库代理入手，后续再逐步学习高级工作流技术。

### 2.1.1 部署你自己的 Dify（可选）

这部分原本安排在后续课程。由于部分学习者因网络限制无法访问Dify官方云，我们提前提供此可选路径，以便顺利继续。

你需要参考这个教程来了解基本的网页部署平台使用：
[如何部署一个网页应用]（/en/stage-2/backend/zeabur-deployment/）

![]（/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image13.png）

学习如何在Zeabur上部署您自己的Dify。部署后，注册并通过部署URL登录，然后继续执行以下步骤。

注意：不同版本的Dify可能存在细微的UI/操作差异，但整体逻辑相似。如果出现不同，不要慌;找到对应的入口点继续操作。

## 2.2 创建你的第一个Dify聊天机器人应用

访问 Dify 主页 [https://cloud.dify.ai/apps]（https://cloud.dify.ai/apps），注册并登录，然后选择 Studio。你会看到一个类似的界面：

![]（/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image14.png）

在左侧找到`CREATE APP`，点击`Create from Blank`。

![]（/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image15.png）

![]（/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image16.png）

在应用类型中，选择聊天机器人（如果一开始看不到，点击“查看更多类型”，在完整列表中找到它）。然后填写应用名称和描述，点击创建。

![]（/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image17.png）

创建后，你会看到这样的界面：

![]（/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image18.png）

中间的“指令”区域表示内置指令（默认/系统提示）。

下面是“知识”区域，我们之后会上传知识库。

右侧面板是调试窗口，编辑提示后可以实时测试交互。

你可以在指令中输入自己的角色提示，或者点击生成让模型自行草拟。

![]（/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image19.png）

注意右上角的模型选择：你可以切换不同模型，比较语气、推理和长上下文处理的差异，以选择最适合你需求的。

![]（/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image20.png）

## 2.3 支持自定义模型提供者

为了充分发挥 Dify 的灵活性，且由于模型可用性因地区和业务限制（成本/隐私）而异，我们通常需要定制模型。Dify 支持三种核心模型类型：LLM、嵌入和重新排序。本节将介绍自定义配置。

Dify 可以连接主流提供商（OpenAI、Azure、Anthropic），并支持任何遵循 OpenAI API 兼容性的自托管或第三方模型。你可以通过安装内置的 OpenAI 兼容插件和厂商专用插件来实现这一点。

详细步骤：

1. 安装 `OpenAI-API-compatible` 和 `SiliconFlow` 插件以支持大多数大型语言模型和嵌入模型。第一个插件支持兼容 OpenAI的 API;第二个是包含许多常见高质量开源模型的服务枢纽。
   1. https://marketplace.dify.ai/plugins/langgenius/openai_api_compatible
   2. https://marketplace.dify.ai/plugins/langgenius/siliconflow
2. 如果你是自架Dify，去系统设置的插件市场安装。

![]（/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image21.png）

![]（/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image22.png）

进入插件市场后，直接搜索插件名称。

![]（/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image23.png）

3. 安装后，配置模型提供者。在设置 -> 模型提供者中，您可以查看所有当前支持的提供者：
   ![]（/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image24.png）
4. 使用前，先完成模型配置。对于兼容 OpenAI API 的插件，点击“添加模型”并配置任意模型。在“模型类型”中选择是 LLM 还是嵌入，并确保类型正确。
   你需要模型名、端点 URL 和 API 密钥来启用它。如果一开始觉得麻烦，可以直接跳到 SiliconFlow 密钥设置，或者安装 OpenRouter 插件，这样更方便地支持提供者（确保你的提供商账户还有剩余配额）。

   ![]（/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image25.png）

   对于`SiliconFlow`，只需点击设置并配置密钥，以便使用嵌入/重新排序进行测试。你可以点击“从SiliconFlow获取你的API密钥”来获取凭证。

   ![]（/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image26.png）

5. 配置完成后，打开模型列表检查支持的模型。基础模型设置完成。
   ![]（/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image27.png）

   它支持大多数常见的嵌入和重秩模型：

   ![]（/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image28.png）

   如果你想修改 Dify 的默认模型集，请点击 `System Model Settings` 并更新默认值。

   ![]（/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image29.png）

## 2.4 创建你的第一个Dify知识库

此时我们创建了一个基础代理，但仍缺乏知识库。点击顶部菜单中的`Knowledge`进入知识库创建。

![]（/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image30.png）

然后点击左侧的`Create Knowledge`创建你的第一个知识库。

![]（/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image31.png）

在这个页面上，你可以上传多种文件类型（PDF、TXT等）来积累知识。你可以上传长文本，或者将维基百科内容复制到TXT中再上传。在这个例子中，我们上传了一个Elon Musk的维基百科TXT文件。

点击“下一步”后，你进入知识库设置。选项众多，让我们一步步带你来看看。

首先在**通用**设置中，这是“文本分块规则”区域。因为长文本必须拆分成更小的部分，我们先定义分块策略。入门级只关注**最大分块长度**。尝试512、2048或4096，点击**预览分块**进行比较效果。

你还可以调整**块重叠**。它控制相邻块是否保留重叠内容。适当的重叠有助于避免关键信息在块间拆分，从而损害理解。

![]（/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image32.png）

还有使用英文Q&A格式的**块**。启用后，系统使用LLM将部分知识转换为Q&A格式，在存储前显著提升检索效率。

在实际商业中，根据情景选择区块策略极大影响检索质量以及返回内容是否符合预期。

向下滚动查看嵌入模型设置。

简单解释：嵌入模型将非结构化数据（文本、图片等）转换为机器可理解的数值向量。这使得快速的相似度计算和语义匹配成为可能，例如检索与用户输入意义最接近的文档/图片/产品。

嵌入选择显著影响检索质量（准确性、延迟等）。这里我们建议从Qwen 0.6B嵌入开始。你可以切换到4B或8B，比较参数尺度的影响。

![]（/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image33.png）

你还会看到**Rerank model**，默认是 **Jina-rerank-m0**。（如果你在校园外环境，可能会看到缺少Rerank模型错误。在这种情况下，先在模型提供者设置中配置Rerank模型。）

Rerank的目的是对初始候选人进行第二阶段的细致筛选，将最符合用户意图的结果推向前列，提升相关性和用户体验。

简单的直觉：重新排序解决了“第一阶段检索不够精细的问题”。搜索引擎可以通过简单规则检索1000个潜在页面，然后将前十个重新排序为首页。推荐者的运作方式类似：从500个可能的项目中，重新排序促进最有可能的转化。

![]（/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image34.png）

设置完成后，点击**保存并处理**开始矢量化。嵌入模型在此阶段将分块文本转换为矢量。

![]（/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image35.png）

处理结束后，点击**前往文档**检查已处理/存储的知识库内容。

![]（/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image36.png）

直接点击知识库名称查看每个区块的详细信息。

![]（/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image37.png）

你可以在这里精确编辑或删除不合适的片段。

![]（/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image38.png）

在左侧栏中，选择**检索测试**以测试回忆并验证检索质量。每个测试返回多个最高相似度的块。

![]（/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image39.png）

如果你想要更多检索到的区块，请点击 `VECTOR SEARCH` 设置：

![]（/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image40.png）

![]（/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image41.png）

Top K 表示向量搜索返回的最相似文本块数。当前值 3 表示返回的前三个块。

分数阈值是一种最低分数过滤器：仅返回相似度分数>= 阈值（例如0.5）的块，过滤低相关性内容以提高精度。

现在知识库设置完成了。接下来，点击顶部菜单“studio”，找到我们之前创建的代理，连接这个知识键。

![]（/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image42.png）

![]（/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image43.png）

在每轮聊天中，你现在可以在回答中看到引用的知识来源。点击条目检查检索到的文本块。

![]（/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image44.png）

![]（/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image45.png）

## 2.5 更多常见的Dify操作

掌握了基本的聊天机器人知识库设置后，我们可以更深入地了解常见的Dify操作。

### 2.5.1 工作流程导入与导出

还记得之前提到的中间表示吗？Dify支持导入/导出DSL（领域特定语言）格式的工作流程。DSL是一种基于JSON的标准化表示，保留了节点结构、链接和配置参数。你可以轻松导出/导入DSL文件，以分享工作流程或研究他人设计。

实际上，你可以在工作流程工作区找到导入条目：

![]（/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image46.png）

对于导出，点击工作流程块的右下角以查找导出操作：

![]（/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image47.png）

使用 DSL 使复杂工作流程在 Dify 实例间迁移/共享变得简单。

### 2.5.2 探索更多Dify项目

如果你的工作流程感觉过于简单，Dify提供了丰富的示例项目，帮助你学习更高级的应用构建。这些示例涵盖了许多业务场景。点击“探索”查看他人构建的工作流程。

![]（/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image48.png）

## 2.6 创建你的第一个 Dify 工作流程应用

从聊天机器人风格的代理开始，我们现在构建更复杂的业务流程。工作流程是Dify可视化复杂业务逻辑的核心方法。你可以直接观察节点间的数据流，决策逻辑的放置位置，人工干预点的设置位置，以及最终业务成果的产生方式。

你可以从空白或模板中创建。这里我们演示从空白创建：

![]（/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image49.png）

![]（/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image50.png）

这里你会看到Chatflow和工作流。你如何选择？根据你的核心需求是持续对话还是任务流水线执行来决定。

Chatflow 专为对话设计。它模拟一个具有内存和上下文连续性的对话实体，非常适合多回合交互和有状态会话。对于客户支持，它能连贯地处理后续问题。流式输出也更自然。如果你需要一个能“对话”的座席，选择 Chatflow。

工作流程侧重于自动化流程执行。它就像一个预定义的管道，用于一次性输入、多步处理和确定性输出。例如，每日报表生成、批处理文件或链式API调用。这些任务通常是事件触发的，而非实时对话式。如果你的需求是“自动化”，请选择工作流。

为避免架构不匹配，请用四个问题进行评估：

1. 这个过程需要用户反复输入或调整吗？
2. 输出是否需要分步式/流式呈现？
3. 逻辑是否强烈依赖于以往的互动历史？
4. 任务是否由事件触发，且主要是一次性输入/输出？

如果前三个是肯定的，Chatflow是理想的选择（客户支持、辅导、创意协作）。如果第四个主导，工作流程更适合（数据清理、报告生成、批量处理）。

这里我们选择 Chatflow 进行演示，进入 Workspace：

![]（/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image51.png）

快速界面导览：中心画布是你可视化构建应用逻辑的地方。一个基本的工作流程通常从`START`（输入）开始，通过链接传递数据到 `LLM`，输出到`ANSWER`。每个节点是一个函数模块;链接决定执行顺序。

画布周围是管理控制。顶部区域包含全局操作，如 `Preview`（测试）和 `Publish`（发布）。画布角落包含缩放/撤销及其他视图控制。

左侧面板包含应用管理区域。`Orchestrate` 用于流程设计。构建后，使用 `API Access` 进行集成凭证。`Logs & Annotations` 记录执行跟踪以供调试。`Monitoring` 提供运行状态/性能可视化。

你可以在Chatflow LLM节点SYSTEM中输入简单的提示指令，运行预览，并按预期验证行为变化。

### 2.6.1 常见节点类型

Dify提供多种节点类型。首先了解每个节点的角色。实用时，直接测试、从模板学习，或用截图向模型询问参数和使用情况。一个不错的初学策略：替换现有模板中的节点，并从已知的工作模式中推断最佳实践。

右键点击画布，选择 `Add Node`，或者从侧面板检查所有可用节点：

![]（/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image52.png）

你还可以打开工具选择面板查看可调用的工具类别：

![]（/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image53.png）

下面是常见节点/工具的简要介绍。你不需要一次性全部精通。保持一个基础的心理图，并在实践中逐步学习。

1. 大型语言模型与推理节点

![]（/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image54.png）

![]（/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image55.png）

这些节点是核心处理组件：

- LLM 节点：调用 LLM 的核心计算单元。主要关注点是即时工程和参数调优，将业务任务映射为可执行的模型指令。
- 知识检索节点：从配置的知识库或外部权威来源检索相关信息，以支持LLM并降低幻觉风险。
- 答复节点：输出单元，将处理后的内容格式化为最终可商业化的结果（响应模板、格式规范等）。
- 代理节点：高级决策单元。除了模型调用外，它还能进行多步规划和动态工具选择，适用于复杂的任务链。
- 问题分类器节点：按意图/主题分类用户输入，并引导至相应的下游路径（每个类别不同的提示/工具链）。

2. 逻辑节点与流量控制节点

![]（/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image56.png）

这些节点定义执行路径/规则：

- 条件节点（`IF/ELSE`）：基于布尔的分支。关键是严格的条件设计，全面覆盖业务场景。
- 迭代节点：无状态批处理并行处理，最佳情况下子任务之间没有相互依赖（批处理翻译、并行审查、多报告生成）。它接收输入数组，切片元素，并行运行同一链。当前元素使用 `{{item}}`，索引使用 `{{index}}`。输出汇聚回数组。配置并行性以平衡速度和负载;配置重试/失败处理以保证可靠性。
- 循环节点：有状态递归迭代器，最佳选择在每轮依赖于前一轮输出（参数调优循环、迭代内容润饰、链式依赖计算）时使用。核心是状态变量管理：在循环前初始化，更新每轮，并定义严格的停止条件（最大轮数、质量阈值、外部停止信号）以及超时和异常路径以避免无限循环。

3. 数据操作与集成节点

![]（/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image57.png）

- 代码节点：执行数据转换、复杂计算等自定义逻辑。注重语法正确性和运行时兼容性。
- 模板节点：将动态数据填充到模板中（自定义复制/报告骨架）。重点关注模板语法和变量映射。
- 变量聚合节点：收集多个节点的输出，形成统一数据集。重点关注范围和合并规则。
- 文档提取节点：从PDF/Word中提取文本/表格，并转换为结构化可处理数据。
- 变量分配节点：定义/初始化/更新数据传递的工作流程变量。
- 参数提取节点：从用户/API输入（正则表达式/JSON路径等）提取结构化参数。
- HTTP 请求节点：发送外部 API 请求（GET/POST 等）以实现系统集成。
- 列表操作符节点：过滤/排序/拆分列表数据以匹配下游结构。

### 2.6.2 通用工具

![]（/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image58.png）

在Dify中，大多数工具可以直接作为画布节点使用，并像其他节点一样连接。只要你的输入符合预期参数，工具就会运行并输出结果进行后续处理。

从侧面板，你可以检查可用的工具节点，并通过插件市场扩展功能。几个常见的工具类别：

- 网页搜索工具
  - Tavily Search是一个常见的代表，提供AI优化的实时事实检索。
  - 它返回结构化的结果（标题/摘要/链接等），适合注入LLM提示中，获取最新信息和证据所需的答案。
- 数据处理工具
  - 例如，JSON Process 插件支持对 JSON 数据进行查询/过滤/转换/合并。
  - 在处理复杂的 API 响应和嵌套数据时非常有用，减少了 Code 节点中重复的手动解析代码。
- 格式处理工具
  - 例如，Markdown 导出器可以将生成内容导出为目标格式（Markdown、自定义模板等），用于显示/报告/系统集成。

你可以在工具列表中查看安装数量和描述。一开始优先选择“特色/推荐”工具，因为它们涵盖了常见场景。

工具使用仍然可能很复杂。一个实用的捷径是搜索每个工具的官方DSL工作流程示例并直接导入，这通常比从零开始构建要快得多。

### 2.6.3 构建一个简单的意图分类工作流程

既然我们已经了解了Dify的工作流程和工具基础，就需要动手操作。没有练习，细节永远不会变得流畅。我们需要一个现实的商业场景。

例如，在真实的点餐聊天场景中，用户输入从来不会是干净的参数。有些用户下单，有些抱怨，有些聊天随意，有些则偏离主题。如果所有这些输入都发送到同一条共享的大型语言模型路径，会出现两个常见问题：

1. 不稳定的响应风格
   同样的投诉可能在一次游戏中得到道歉，另一次则是借口。同一订单可能在一次游戏中触发信息缺失的后续追查，而在另一轮游戏中出现幻觉的订单细节。
2. 无法控制的业务逻辑
   你希望“投诉必须以道歉开始”，但模型可能并不总是遵守。你希望“非主题查询应被重定向”，但模型可以继续在域外聊天。

一种更工程化的方法是标准化的管道分解：
先进行意图分类（确定用户需求），然后是基于意图的路由（每个场景不同的提示/角色），最后是路由分支的统一输出打包（用于前端/系统集成）。

目标：在餐饮场景中处理多种对话类型。跟着一个动作来建立熟悉感。

首先定义意图：

- **buy_food**：用户显示明确的购买/订单意图。
  - 例子：“给我一份炸鸡和一杯可乐。”
- **抱怨**：用户表达不满/愤怒/抱怨。
  - 例子：“为什么这么慢？我已经等了一个小时。”
- **闲聊**：用户请求开放推荐，但没有明确的订单命令。
  - 例子：“我今天应该吃什么？有什么推荐吗？”
- **其他**：与点餐场景无关。
  - 示例：“帮我写一个有趣的社交帖子。”

针对这四个意图，通过四个专用LLM节点预定义四个通信角色：

- **LLM_BuyFood**：专业高效。确认订单详情并主动补全缺失信息。
- **LLM_Complain**：富有同理心且冷静。首先安抚用户，并提供明确的解决方案步骤。
- **LLM_Chitchat**：轻松友好。提供个性化推荐并引导潜在转化。
- **LLM_Other**：礼貌且注重界限。将离题的话题引导回核心业务。

#### 工作流程编排设计

现在定义节点架构。初学者通常不知道该用哪些节点（即使是高级用户也常要求模型进行第一遍设计，因为它速度快）。核心结构：

- 启动：数据录入节点接收原始输入 `user_text`。
- 问题分类器：“大脑调度器”。它分析 `user_text`，并输出四个意图标签之一。
- 条件：“路由阀”。它根据分类器标签将流量转发到相应的处理分支。
- 四个并行的大型语言模型节点（`LLM_BuyFood`， `LLM_Complain`， `LLM_Chitchat`， `LLM_Other`）：每个节点有原始问题，但根据自身的系统提示角色以不同方式回应。
- 变量聚合器：分支处理后，将唯一激活的分支输出聚合为统一变量 `final_reply`，以实现稳定输出结构。
- 输出：最终结构化输出（例如JSON），包括意图、原始查询和回复，适合下游集成/调试。

#### 工作流程编排实现

在本教程中，我们选择工作流程（而非聊天流程）。选择用户输入：

![]（/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image59.png）

然后点击 Start -> 用户输入，定义字符串变量 `user_text` 作为全局流输入源。

![]（/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image60.png）

保存并点击“测试运行”（右上角）。系统会提示您提供测试文本。

![]（/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image61.png）

接下来点击输入节点后的`+`，添加问题分类器。配置四个标签，每个标签都有清晰的描述和示例：

- `buy_food`：用户显然想买/点餐。
- `complain`：用户抱怨/愤怒，通常表示不满。
- `chitchat`：用户聊天，讨论吃什么，询问推荐。
- `other`：与食物情境无关或难以分类。

还要在高级设置中设置分类行为的提示。示例提示：

```text
Choose the most appropriate label from buy_food / complain / chitchat / other.
If user both complains and orders, prioritize core emotion: if dissatisfaction is primary, classify as complain.
If complaint is minor and primary intent is ordering, classify as buy_food.
If truly hard to determine, use other as fallback.
```

![]（/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image62.png）

设置后，使用该节点右上角的播放图标测试分类。

![]（/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image63.png）

![]（/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image64.png）

从输出数据中我们可以看到分类是准确的。测试多种输入类型以验证分类器的稳定性。

接下来，将分类器连接到下游的LLM分支。例如，当`label == "buy_food"`时，路由到`LLM_BuyFood`。
创建四个LLM节点并设置不同的系统提示：

- LLM_BuyFood（点餐助理）：

  你是一名点餐助理。要求：
  1. 确认用户想订购的订单。
  2. 如果信息不完整，请礼貌地提问后续问题。
  3. 保持语气礼貌且简洁。

- LLM_Complain（支持专家）：

  您是处理投诉的餐饮客户服务专家。要求：
  1. 真诚道歉。
  2. 简要说明可能的原因（不推卸责任）。
  3. 提供明确的下一步解决方案。

- LLM_Chitchat（聊天伙伴）：

  你是一名随意的食物推荐助理。要求：
  1. 使用轻松友好的语气。
  2. 给出1-3个简单的建议。
  3. 如果没有偏好，提供不同风格的选项。

- LLM_Other（礼貌的守门人）：

  你是一名专注于食品话题的点餐助理。对于无关用户输入：
  1. 礼貌地说明范围。
  2. 引导用户回到核心场景。

重要提示：在每个节点中，设置 SYSTEM 提示后，启用 USER 提示变量映射。点击 `{x}`，选择 `user_text` 作为用户输入变量，并在前加 `user input:` 以表示源语义。在响应生成过程中，模型同时使用初始用户输入和系统提示。

一如既往，点击节点级游戏图标，用“我想喝珍珠奶茶”等样本输入测试并验证行为。

![]（/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image65.png）

接下来处理并行分支输出。在 `Variable Aggregator`@ 中，找到 `ASSIGN VARIABLES`，并逐个添加分支输出。

![]（/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image66.png）

现在汇总最终输出，包括用户输入、意图和回复。因为这是工作流程（不是聊天流），没有针对此结构的答案节点，因此我们可以使用模板节点进行等效的输出打包。变量区域中指定意图结果、用户输入和聚合器最终回复。在代码中，编写最终的JSON模板：

- `intent` <- `class_name`
- `original_text` <- `user_text`
- `final_reply` <- `variable_aggregator`

```text
{
  "intent": "{{ intent }}",
  "original_text": "{{ original_text }}",
  "reply": {{ final_reply }}
}
```

![]（/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image67.png）

最后添加输出节点，所有设置就完成了。

![]（/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image68.png）

#### 工作流程运行时测试

完成。现在运行这个工作流程，观察不同输入的明显行为：

- 输入（点餐）：“给我一份辣味鸡肉汉堡套餐和一大杯可乐。”
  - 路径：`buy_food` -> `LLM_BuyFood`
  - 输出回复：“好的，一份辣味鸡肉汉堡套餐和一杯大杯可乐已记录。你想在套餐中交换薯条吗？”
- 输入（抱怨）：“你怎么这么慢？我已经等了一个多小时了！”
  - 路径：`complain` -> `LLM_Complain`
  - 输出回复：“我们对长时间等待深感抱歉。这是我们的失误，导致您体验不佳。我们正在紧急检查您的送达状态，并将安排赔偿。感谢您的耐心和反馈。”
- 输入（闲聊）：“今天吃什么更健康？”
  - 路径：`chitchat` -> `LLM_Chitchat`
  - 输出回复：“如果你更喜欢健康的选择，可以尝试我们的清淡沙拉系列或烤鸡胸肉配蔬菜。你喜欢清淡口味还是更浓郁的口味？我可以更具体地推荐。”
- 输入（无关紧要）：“帮我想明天会议的笑话。”
  - 路径：`other` -> `LLM_Other`
  - 输出回复：“听起来很有趣，但我主要专注于食物推荐和点餐。如果你想点东西奖励你的努力，我随时可以帮忙。”

> 隐藏的bug：如果你遇到奇怪的`aggregation group`问题，很可能是Dify内置的bug。它可能被某些操作序列触发。如果AGGREGATION GROUP被启用后又禁用，残留组配置可能会存在，即使开关关闭，也可能引发错误（例如`any`参数）。解决方案：删除该节点并重新创建。

在测试运行中运行后，你可以检查完整的执行路径。它应该遵循正确的分支，并输出预期的最终结果。全流程完成。

![]（/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image69.png）

## 2.7 运行你的第一个模板工作流程应用

在简单的分类流程之后，接下来学习如何运行他人创建的工作流程。通常你只需做些小修改，就能将它们变成自己的。这里我们以官方的DeepResearch工作流程为例。它利用LLM搜索引擎构建了一个深度搜索框架，并返回丰富的答案，包含引用和模型生成的综合。

导入后，先直接运行。然后根据失败的节点和原因一步步修正每个错误。如果卡住了，截图并向模型求助调试。

![]（/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image70.png）

乍一看，这可能显得复杂。没关系。点击右上角的`Preview`，然后一直跑到出现第一个错误：

![]（/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image71.png）

![]（/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image72.png）

排查故障节点。此例中缺少 Tavily API 令牌。Tavily Search 是一个 AI 原生搜索 API，提供实时且准确的事实结果。请按提示配置：

![]（/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image73.png）

修复后，搜索引擎正常工作：

![]（/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image74.png）

然后根据需要修复模型调用问题。你应该能通过模型理解的综合得到这样的结果：

![]（/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image75.png）

最后，你可以检查引用的源链接：

![]（/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image76.png）

如果你想深入了解每一步，最好的方法是将每个节点输出保存到中间变量中，并在最终输出时打印所有变量。另一种方法是：打开顶部的 `Process` 视图，查看详细的每步执行。

![]（/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image77.png）

## 2.8 使用 Dify 作为 API 提供者

接下来我们通过API调用知识库代理，并将Dify变成模型中心后端。

回忆如何调用模型API：从文档中准备密钥请求/响应示例，输入给LLM编码助手，并让其生成调用代码并解析响应中的期望字段。

这次我们使用本地代码编辑器[Trae]（https://www.trae.cn/）。

如果你不熟悉IDE的概念，请阅读：
[额外知识4 - 什么是 AI 集成开发环境 和 Trae]（/en/stage-1/introduction-to-ai-ide/）

如果你的本地环境配置不够，不用担心。如果你信任你的编码助理（无论是[z.ai]（https://z.ai）还是Trae），你可以直接发送任何问题或错误，它会提供解决方案指导。

![]（/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image78.png）

右侧面板是副驾驶/代理交互窗口。如果看不到，点击右上角侧边栏图标打开。

![]（/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image79.png）

打开侧边栏后，你会看到 `Builder` 选项。这是代理模式。你可以大致把“构建者”当作 [z.ai]（https://z.ai）的“开发模式”：它可以帮助本地环境操作、依赖安装、打开网页等。

![]（/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image80.png）

在Builder内部，有“聊天”模式和“带MCP的建造者”模式。
聊天模式主要与当前文件夹和自然语言模型聊天互动。
（从Trae左上角打开一个文件夹 `File`，然后在该文件夹内进行构建文件操作。）

带MCP的构建器为代理提供了更多工具（例如连接其他软件、获取天气等）。你可以把MCP当作一个能力层，让模型更容易调用外部工具。

![]（/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image81.png）

底部有一个模型选择下拉菜单。你可以选择Kimi k2或GLM。在国际版Trae中，你也可以选择ChatGPT或Claude。随着国内模型的快速发展，Kimi/Qwen/GLM现在在日常开发场景中接近Claude 3.5/3.7。

![]（/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image82.png）

这就是Trae的简短介绍。接下来我们将在Trae中重用[z.ai]（https://z.ai）中的操作理念。

## 2.9 使用 Dify API 构建前端聊天应用

要用 Dify API 构建前端聊天应用，首先获取 Dify API 文档和端点。

还记得我们创建的那个特工吗？点击右上角`Publish`，然后`Publish Update`，然后`Access API Reference`。

![]（/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image83.png）

![]（/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image84.png）

在API文档中，找到`Send Chat Message`，打开它，然后复制右侧的`Request`和`Response`示例。

为什么要复制这两部分？因为它们是核心的 API 信息。通过关键请求示例响应示例，你可以让模型生成调用代码，并从返回的结构中解析所需字段。

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image85.png)

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image86.png)

找到请求/响应示例后，你还需要 API 密钥。在右上角的文档区域，找到 `API key` 选项。

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image87.png)

点击 `Create new Secret key` 来创建你自己的密钥。

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image88.png)

现在一切就绪。将 API 密钥、请求示例、响应示例发送到 Trae Builder。

注意：将 `{DIFY_API_URL}` 替换为你实际的 Dify API URL。

```json
key:
app-zKdCHUXXXXXXXX

Please write me a front-end based on the following reference:

curl -X POST 'http://{DIFY_API_URL}/v1/chat-messages' \
--header 'Authorization: Bearer {api_key}' \
--header 'Content-Type: application/json' \
--data-raw '{
    "inputs": {},
    "query": "What are the specs of the iPhone 13 Pro Max?",
    "response_mode": "streaming",
    "conversation_id": "",
    "user": "abc-123",
    "files": [
      {
        "type": "image",
        "transfer_method": "remote_url",
        "url": "https://cloud.dify.ai/logo/logo-site.png"
      }
    ]
}'

{
    "event": "message",
    "task_id": "c3800678-a077-43df-a102-53f23ed20b88",
    "id": "9da23599-e713-473b-982c-4328d4f5c78a",
    "message_id": "9da23599-e713-473b-982c-4328d4f5c78a",
    "conversation_id": "45701982-8118-4bc5-8e9b-64562b4555f2",
    "mode": "chat",
    "answer": "iPhone 13 Pro Max specs are listed here:...",
    "metadata": {
        "usage": {
            "prompt_tokens": 1033,
            "prompt_unit_price": "0.001",
            "prompt_price_unit": "0.001",
            "prompt_price": "0.0010330",
            "completion_tokens": 128,
            "completion_unit_price": "0.002",
            "completion_price_unit": "0.001",
            "completion_price": "0.0002560",
            "total_tokens": 1161,
            "total_price": "0.0012890",
            "currency": "USD",
            "latency": 0.7682376249867957
        },
        "retriever_resources": [
            {
                "position": 1,
                "dataset_id": "101b4c97-fc2e-463c-90b1-5261a4cdcafb",
                "dataset_name": "iPhone",
                "document_id": "8dd1ad74-0b5f-4175-b735-7d98bbbb4e00",
                "document_name": "iPhone List",
                "segment_id": "ed599c7f-2766-4294-9d1d-e5235a61270a",
                "score": 0.98457545,
                "content": "\"Model\",\"Release Date\",\"Display Size\",\"Resolution\",\"Processor\",\"RAM\",\"Storage\",\"Camera\",\"Battery\",\"Operating System\"\n\"iPhone 13 Pro Max\",\"September 24, 2021\",\"6.7 inch\",\"1284 x 2778\",\"Hexa-core (2x3.23 GHz Avalanche + 4x1.82 GHz Blizzard)\",\"6 GB\",\"128, 256, 512 GB, 1TB\",\"12 MP\",\"4352 mAh\",\"iOS 15\""
            }
        ]
    },
    "created_at": 1705407629
}
```

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image89.png)

在这个阶段，生成的代码可能不会一次就完美运行。你可能会看到奇怪的错误或没有响应。如果发生这种情况，可以更换模型，或者复制完整的错误详情并要求模型根据反馈迭代。

这种工作方式已经接近真实开发。在与模型的日常协作中，你通常需要提供更多的上下文来解决问题。除了错误信息之外，你还可以复制更多文档上下文（例如“发送消息”文档部分）一起发送，以获得更高质量的修复。

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image90.png)

浏览器嵌入在 Trae 内。点击顶部的指南针图标即可在外部浏览器中全屏打开。

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image91.png)

如果幸运的话，第一次尝试可能就会生成一个可用的互动前端页面。

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image92.png)

因为大语言模型是随机性的，一轮可能成功，但多轮聊天可能失败。所以一定要进行多轮测试，以验证对话场景中的稳定性。

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image93.png)

此时，你可以构建一个简单的 Dify 知识库代理，并使用 Trae（而不是 [z.ai](https://z.ai)）来构建互动前端。从现在起，Trae 将成为我们的主要原型工具，逐步取代 [z.ai](https://z.ai)。你可以尝试在 Trae 中重新实现贪吃蛇游戏，并比较体验。继续努力。

# 3. 更多业务工作流参考

你可以通过关键字如 `Dify workflow reference` 在搜索引擎中查找，或者在 GitHub 上找到工作流共享仓库。质量参差不齐，所以最好对比多个来源。记住，工作流本质上是将业务 SOP 映射为可执行流程。思考你日常工作或学习中可以固化的重复性工作流。

以下是 AI 生成的工作流设计参考（实际实现通常相似；高质量的人类制作工作流仍然需要技巧）。如果任何想法吸引你，可以发送给模型，进一步优化为具体的 Dify 节点设计和配置细节。

## 3.1 社交媒体平台工作流

1. 一键跨平台内容分发工作流程（复杂）
   1. 想法：将一个核心草案视为“原材料”，自动生成平台适配版本。
   2. 实现：`Start` 文章输入 -> `LLM` 波兰语 -> 平台专家节点 `LLM` 平台专家节点（例如小红书病毒文案专家，知湖专业答复者） -> `Iterator`@ 平台格式规则 -> `Variable Aggregator` 合并 -> `Answer` 输出所有版本。
2. 热点主题规划与初稿生成器（中介）
   1. 创意：自动捕捉趋势，快速生成主题建议和草稿。
   2. 实现：`Start` 关键词 -> `Tool` 趋势数据搜索API-> `LLM` 提取3-5个主题 -> `LLM` 生成大纲/草稿。
3. 评论区智能分类与回复助手（复杂）
   1. 想法：对评论的情感/意图进行分类，并生成分类的回复建议。
   2. 实现：`HTTP Request` 获取评论 -> `Question Classifier`/`LLM` 多标签分类（正面/提问/投诉/垃圾邮件） -> `Condition` 路由 -> 平行 `LLM` 回复起草 -> `Answer`。
4. 短视频剧本与分镜自动生成器（复杂）
   1. 创意：给定趋势主题/产品描述，自动生成脚本、分镜和推荐标签。
   2. 实现：`Start` 主题 -> `LLM` 脚本构思 ->秒 `LLM` 场景分解（视觉/对话/时长） -> `Tool` TTS 样本生成 -> `Variable Aggregator` 合并 -> `Answer` 结构化脚本。
5. 直播交互质量保证摘要器（中介）
   1. 想法：几乎实时处理实时评论，总结关键问题/观众情绪。
   2. 实现：`HTTP Request` 流评论 -> `Iterator` 窗口批处理 -> `LLM` 每个窗口趋势总结 -> `Answer`/`Webhook` 输出给主机。

## 3.2 工作场所工作流程

1. 智能会议记录和任务自动分配系统（复杂）
   1. 想法：从文字记录中提取会议记录并自动创建任务。
   2. 实施：`Start` 会议文本 -> `LLM` 议程/结论摘要 -> `Parameter Extractor` 行动项目（任务/负责人/截止日期） -> `LLM` 格式会议记录 -> 平行 `HTTP Request` Jira/Trello/Feishu 任务创建。
2. 批量简历筛选与初评助理（中介）
   1. 想法：解析简历，评估匹配度，并生成面试问题。
   2. 实施：`Start` 上传简历 JD -> `Document Extractor` 解析文本 -> `LLM` 人力资源风格匹配评估 ->高匹配，另一个 `LLM` 生成深入面试问题。
3. 一键多语言邮件翻译及草稿回复（简单）
   1. 想法：自动翻译来邮件并草拟回复。
   2. 实现：`Start` 邮件 -> `LLM` 语言检测翻译 -> `LLM` 回复点 -> `LLM` 翻译并润色。
4. 周报/月报自动聚合与洞察生成（复杂）
   1. 想法：连接多个数据源并自动生成结构化报告。
   2. 实现：并行调用 `HTTP Request`/`Tool` 对 CRM/Git/PM API 的调用 -> `Code`/`LLM` 数据清理/计算 -> `LLM` 趋势/突出/风险叙述 -> `Answer` 丰富的报告。
5. 合同/文档智能审查与关键点提取（媒介）
   1. 想法：快速审查法律/商业文件，揭示风险，并提取关键条款。
   2. 执行：`Start` 合同 PDF -> `Document Extractor` 文本提取 -> `LLM` 法律专家条款审查 -> `Parameter Extractor` 日期/金额/当事人提取 -> `Answer` 风险摘要密钥表。

## 3.3 学习与生活工作流程

1. 学术论文深度分析与笔记生成器（复杂）
   1. 想法：上传纸质PDF并自动生成结构化笔记。
   2. 实现：`Start` PDF -> `Document Extractor` 全文 -> 平行 `LLM` 摘要（摘要/方法/发现/参考文献）-> `Variable Aggregator` 合并 -> `Answer` 标记注释。
2. 个性化旅行规划器（中介）
   1. 想法：根据用户偏好自动规划详细行程。
   2. 实施：`Start` 目的地/天/预算/兴趣 -> `Tool` 搜索/地图 API -> `LLM` 每日行程及日程/活动/预算估算。
3. 互动外语对话伙伴（简单）
   1. 想法：带有语法纠正的角色扮演对话机器人。
   2. 实现：系统角色设置 -> `Start` 用户语句 -> `LLM` 双任务（角色回复语法纠正/解释）-> `Answer`。
4. 个人知识库质检及相关链接推荐器（复杂）
   1. 想法：基于你保存的文档/笔记/链接，并结合相关的旧知识推荐，构建一个质量保证系统。
   2. 实现：离线索引，使用 `Document Extractor` `向量嵌入`;在线流程：`Start` 问题 -> `Retrieval` 从向量存储 -> `LLM` 基于上下文的答案;并行分支使用检索内容和 `LLM` 生成相关旧知识列表 -> `Answer` 合并输出。
5. 健身/饮食追踪与调整顾问（中等）
   1. 想法：分析每日饮食/训练日志，输出营养/训练建议。
   2. 实施：`Start` 文本日志（例如午餐训练记录）-> `Parameter Extractor` 结构解析 -> `LLM` 健身教练对营养/训练量的分析 -> 与长期目标比较 ->微调整建议。

# 6.工作流程平台的局限性

工作流（低代码）平台并非通用解决方案。它们对业务友好且直接编码门槛较低，但从另一个角度看，“低代码”也可以是“高代码”：用户仍需理解平台概念、规则和操作逻辑。这本身就是一种学习成本。

你可能会问：许多简单的工作流程其实就是围绕模型API串联的函数调用。在代码中，几行就能解决。为什么要用繁重的视觉包装，让API调用更繁琐？

这一点是合理的。随着振动编码和AI代码生成的快速推进，直接读取或生成代码有时会更高效。理想情况下，我们应该能够直接用自然语言操作应用逻辑。但当前的工作流平台在用户意图和最终实现之间仍有不可避免的“中间层”。学习这一中间层需要时间。理想情况下，未来平台应支持完整的AI对话驱动操作，既能构建工作流，也能实现参数级控制。

即便如此，熟练掌握这些平台正日益成为一项基础技能，类似于办公软件：在商业环境中广泛使用且具有实际价值。

在后续的高级课程中，我们将介绍代码级工作流和RAG开发平台，你可以比较不同实现风格的复杂性与灵活性权衡。（另外请注意，许多简单的对话应用和嵌套逻辑在工作流形式中仍然很直接。）

# 📚 作业

## 基础Dify操作大师

为了验证你理解常见的Dify操作，请完成一个基础作业和两个小挑战：

你需要将提供的两个DSL文件导入Dify工作流程，并成功完成相应的挑战（如果不明白，可以截图并询问模型，或者自己探索每个参数直到达到目标行为）：

1. 基于意图分类工作流程方法，要求模型建议一个完全不同的场景，但你仍必须使用意图分类工作流。提交工作流运行截图、场景描述和结果。
2. `Log in workflow` 解密挑战：

在本挑战中，提供工作流程支持：

- 找到正确的密码。
- 将密码更改为 `0925`。
- 密码错误时提供第二次尝试（无第三次尝试）。
- 当用户再次请求登录时，允许密码重新输入。

![]（/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image94.png）

参考输入/输出：

![]（/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image95.png）

3. `Love loop workflow` 解密挑战：

![]（/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image96.png）

修复当前的工作流程问题，使最终输出看起来类似：

![]（/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image97.png）

如果解决不了问题，可以截图并询问模型，或者查看官方文档：
[https://docs.dify.ai/en/use-dify/getting-started/quick-start]（https://docs.dify.ai/en/use-dify/getting-started/quick-start）

## 实现 Dify API 调用

为了验证你真正掌握了Dify API的使用，请填写：

1. 部署Dify并创建一个简单的知识库（选择你喜欢的材料）。
2. 在 Trae IDE 中构建聊天前端，并通过 API 集成 Dify 知识库。
3. 测试多回合对话行为，确保程序正常运行。

提交最终运行时截图和知识库处理截图。

## 尝试第三方工作流程 / 打造您自己的业务流程

找一个由他人在GitHub、微信公开文章、Reddit、X等平台分享的Dify工作流程，导入并成功运行;或者根据上述业务参考基于实际需求构建自己的工作流程。

最后提交成功的运行截图并说明工作流程的目的。

# [漏洞] 如何修复HTTP请求错误

只有遇到下面显示的问题时才需要参考本节。否则你可以忽略这部分。

有时你会在自己的服务器上部署 Dify，而公共端点是 HTTP（不是 HTTPS）。如果你请求仅支持 HTTP 的服务，可能会遇到类似这样的错误（启用浏览器 F12 调试信息以便检查）：

![]（/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image98.png）

根本原因：Dify部署在支持HTTP但不支持HTTPS的服务器上。
HTTPS（HyperText Transfer Protocol Secure）在HTTP基础上增加了SSL/TLS加密，基本上是更安全的HTTP。

为了支持 HTTPS，常见的选项有：

- 通过其他服务转发请求（例如在启用证书的nginx上的反向代理），或
- 绑定域名并签发TLS证书。

这些都比较复杂，所以我们用Zeabur作为网络转发网关。

Zeabur 页面默认通过 HTTPS 访问。所以如果你把原域名转发到 Zeabur 域名，问题就解决了。

- 原始网址：`http://{DIFY_API_URL}/v1/chat-messages`
- 新网址：`https://{DIFY_NEW_API_URL}.zeabur.app/v1/chat-messages`

你只需要用你部署的 Zeabur 域名替换 URL 域名（公共 IP/域名）。转发功能在服务中是预先配置好的。

如果感兴趣，你可以在 Zeabur 上部署自己的转发服务。创建一个 Python 服务，使用以下代码。部署完成后，你会得到一个正常工作的 HTTPS 端点。

部署后，将服务监听端口设置为本地 `8080` 并公开此端口。

注意：将 `{DIFY_API_URL}` 替换为您的实际 Dify API URL。

```python
from flask import Flask, request, Response
import requests

app = Flask(__name__)

TARGET_BASE_URL = "{DIFY_API_URL}"
LISTEN_PORT = 8080

@app.route('/', defaults={'path': ''}, methods=['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'])
@app.route('/<path:path>', methods=['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'])
def proxy_request(path):
    target_url = f"{TARGET_BASE_URL}/{path}"
    if request.query_string:
        target_url += f"?{request.query_string.decode('utf-8')}"

    headers = {key: value for key, value in request.headers if key.lower() not in ['host', 'connection', 'content-length', 'accept-encoding']}

    try:
        resp = requests.request(
            method=request.method,
            url=target_url,
            headers=headers,
            data=request.get_data(),
            cookies=request.cookies,
            allow_redirects=False,
            timeout=30
        )

        excluded_headers = ['content-encoding', 'content-length', 'transfer-encoding', 'connection']
        response_headers = [(name, value) for name, value in resp.raw.headers.items() if name.lower() not in excluded_headers]

        return Response(resp.content, resp.status_code, response_headers)

    except requests.exceptions.RequestException as e:
        print(f"Error forwarding request to {target_url}: {e}")
        return Response(f"Proxy Error: Could not reach target server or invalid response: {e}", status=502)
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return Response(f"Internal Proxy Error: {e}", status=500)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=LISTEN_PORT, debug=True)
```
