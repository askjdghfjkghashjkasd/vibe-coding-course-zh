---
标题：“为原型添加人工智能能力”
描述：“从提示词设计、官方文档和服务控制台设置开始，然后为网页原型添加文本、视觉、图像、语音和视频功能。”
---

<脚本设置>
从 '@theme/data/relatedArticles' 导入 { relatedArticlesMap }
导入 AiCapabilityGuide from '../../../zh-cn/stage-1/integrating-ai-capabilities/AiCapabilityGuide.vue'
从 '@theme/components/StageAssignmentCard.vue' 导入 StageAssignmentCard

持续时间 = “约<strong>1–2天</strong>”
与文章相关的文章 =
  relatedArticlesMap['en/stage-1/integrating-ai-capabilities'] ？？[]
</script>

# 为原型添加人工智能能力


## 章节概述

<章节引言 :d uration=“duration” ：tags=“['Prompts'， 'API documentation'， 'Service consoles'， 'Multimodal AI']” coreOutput=“为原型添加一两项真实AI能力” expectedOutput=“一个能够调用文本、图像、语音或视频服务的网页原型”>

上一章的原型已经可以测试其页面结构和交互流程，但其生成的结果仍来自模拟数据。在本章中，我们将将其核心动作之一与真实的人工智能服务连接起来。

添加人工智能不仅仅是复制一些API代码。我们必须同时处理三件事：**如何描述任务，如何阅读官方文档，以及如何安全地将调用置于产品流程中。**

我们先建立一个通用方法，然后再看文本、图像理解、图像生成、语音和视频。模型名称和控制台界面不断变化，这里的示例将解释结构。当你构建自己的版本时，复制当前模型ID和参数，参考服务官方文档。

</ChapterIntroduction>

<div style=“margin： 50px 0;”>
  <ClientOnly>
    <StepBar ：active=“0” ：items=“[ { title： '定义任务'， description： '准备业务提示' }， { title： '阅读文档'， description： '查找端点和参数' }， { title： '连接服务'， description： '完成安全API调用' }， { title： '添加更多模态'， description： '图片、语音和视频' } ]” />
  </ClientOnly>
</div>

## 1.决定连接哪个功能

上一章的电子商务内容工作区已经有产品信息和“生成文案”按钮。结果仍来自模拟数据，所以我们的首要任务是让那个按钮真正工作。

流程很简单：用户输入产品名称、材料和卖点，点击按钮，收到一份产品文案。输入和结果都是文本，因此我们需要一个能够生成文本的模型。

如果你的页面有不同的功能，它就需要不同的功能。例如：

- 上传产品照片并识别其颜色和风格需要图像理解。
- 从产品信息制作海报需要图像生成。
- 将录音转换为会议记录首先需要语音转文字，然后是组织文字记录的文本模型。
- 将文章转换为可播放音频需要文本转语音。
- 让产品照片移动需要图像生成视频。

在选择服务之前，请再次查看页面：用户将提交什么，最终期望看到什么？一旦这两点明确，通常就能判断你需要的是文本、图片、语音还是视频模型。

<人工智能能力指南/>

### 1.1 一个功能可能需要几个步骤

并不是每个功能都能由一个模型在一次调用中完成。例如，“上传产品照片并生成卖点”，首先需要应用程序理解图片中的产品，然后再从该结果中撰写文案。“从公司文件中回答问题”同样需要应用程序先找到相关资料，然后才能生成答案。

在分解任务时，不需要一开始就考虑模型名称。应遵循用户的流程：哪一步理解现有内容，哪一步创建新内容，哪一步仅检索信息？必要时，将两到三个功能按顺序连接起来。

AI 应该只处理适合它的部分。登录、支付、文件存储和页面导航遵循明确规则，仍然应使用普通程序逻辑实现。

![一个工作页面：先理解产品图像，再生成其描述](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-15-35-41.webp)

*在这个原型中，用户首先上传产品图像。页面识别产品信息，然后创建描述和卖点，用户可以继续编辑。*

### 1.2 在服务控制台中需要注意的内容

一旦决定生成文本，我们就可以打开服务平台，例如 DeepSeek、SiliconFlow、Volcengine Ark 或 MiniMax。平台提供账户、计费和 API 入口；我们选择的模型处理实际请求。

在首次集成时，你不需要研究控制台的每个菜单。找到以下四件事：

1. 创建应用程序可以使用的 **API 密钥**。
2. 记录你计划使用的 **模型 ID**。
3. 查找官方文档中最小的 curl 或 JavaScript 示例。
4. 检查配额、价格和请求限制。

应用程序通过 **API** 将产品数据发送给模型。如果文档提供 JavaScript 或 Python **SDK**，你也可以使用它；它只是请求代码的便捷封装。在请求中包含的句子“根据这些产品信息写标题和卖点”就是发送给模型的提示词。

平台名称、模型 ID 和 API 地址不是一回事。请使用官方代码示例中的地址和模型 ID。不要将平台在线演示的 URL 粘贴到你的程序中。

### 1.3 不熟悉的 API 可以留到以后

控制台可能还列出 向量嵌入、Rerank、Function Calling、OCR 和内容审核端点。向量嵌入 和 Rerank 对知识库有用；OCR 对读取 PDF 和收据有用；Function Calling 让模型使用外部工具，如搜索或数据库。

你现在不需要全部学习。首先连接一个直接支持页面功能的 API。当产品实际需要其他功能时，再回到相关文档。

## 2. 先尝试生成的结果

在编写 API 代码之前，先在平台的在线演示中测试模型。我们不仅仅是在检查它“能否写产品文案”，我们需要知道它是否能返回页面所需格式的结果。

### 2.1 用户只需描述目标

在在线演示中，从真实用户的角度开始：

```text
I want to list a lightweight commuter backpack made from black nylon.
It is mainly for everyday commuting.
Please write a short product title and three selling points.
```

一旦这成为一个页面，用户甚至可能不需要整理那段文字。他们可以填入产品名称、材质和颜色，然后点击“生成文案”。程序会读取这些字段，并在请求中添加固定的指令：不要编造价格或销售数据，标题保持简短，并以指定格式返回结果。

每个用户都不需要重复这些规则。如果页面分别显示标题、摘要和卖点，程序可以要求模型返回三个 JSON 字段：`title`、`summary` 和 `selling_points`。用户输入保持自然，而页面可以可靠地读取结果。

在第一次测试时，尝试几个产品并故意省略一个字段。检查模型是否会编造缺失的信息。如果格式不稳定，应调整程序添加的固定指令，而不是让用户学习提示工程。

### 2.2 将 API 连接到页面

官方文档通常会提供 curl、JavaScript 或 Python 示例。将该示例与您想要的功能一起提供给您的 AI 集成开发环境，并让它将请求连接到您现有的页面。

```text
Add a “Generate copy” button to the product details page.

When the user clicks it, send the current product information to the API below,
then show the generated copy on the page.

Do not put the API key in the browser. Show a message while waiting and when the request fails.
When it is ready, tell me what to configure and how to start and test it.

Here is the official API example:
<paste a curl or SDK example without a real key>
```

在页面位置和官方示例在手的情况下，AI 集成开发环境 不需要猜测 API 格式。首先确保一个请求能够正常返回。当你以后添加图像、语音或视频支持时，可以替换功能描述和官方示例。

## 3. 从官方示例发送第一个请求

在提示正常工作后，从代码中发送请求。打开官方文档，查找“快速开始”或“API 参考”。服务文档在外观上可能有所不同，但你的第一次调用只需要四个信息：请求地址、API 密钥放置位置、`model` 的值，以及最小的官方示例。

首先复制官方的 curl、JavaScript 或 Python 示例，只更改模型 ID 和测试内容。在终端运行，获取一个正常响应后再放入项目中。如果页面集成以后失败，至少你知道账户、密钥和模型是正常工作的。

同时检查返回值。文本通常位于 JSON 字段中，图像可能返回 URL，语音可能直接返回二进制数据，视频通常先返回任务编号。你接下来要构建的页面取决于端点实际返回的内容。

### 3.1 请 AI 帮助阅读冗长的文档

你不必从头到尾阅读长篇的 API 文档。将你正在阅读的页面提供给 AI 集成开发环境，并让它只找出第一次调用所需的内容：

```text
Read this API documentation: <documentation link>

I want to call it with JavaScript. Show me the simplest example,
where to put the API key and model, and how to read the generated result.
Use only parameters documented on this page.
```

## 4.你第一次访问服务台

创建键、选择模型和查看使用情况通常在服务控制台中完成。菜单名称不同，但工作内容大致相同。

### 4.1 创建密钥并确认请求已到达平台

API 密钥是你的应用程序用来调用模型的凭证。创建模型后将其存储在本地环境变量中。不要将其粘贴到截图、聊天消息或浏览器代码中。如果你认为它泄露了，请立即在控制台中撤销并创建一个新的。

发送第一个请求后，打开使用或计费页面，寻找新的记录。该页面还显示你的余额和配额。当请求失败时，首先确定代码是否未发送任何信息，平台是否拒绝了呼叫，或者账户已无剩余配额。

![DeepSeek 使用页面显示余额、每月支出和请求趋势](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-13-57-41.webp）

*DeepSeek 的使用页面显示请求量、费用及剩余余额。*

如果错误包含请求ID或追踪ID，请保存。多个呼叫可能同时发生;该标识符有助于你在日志中找到失败呼叫。

### 4.2 选择一个型号并复制其准确的呼号

模型目录或模型页面显示平台当前提供的文本、图像、语音和视频模型。打开详细信息并复制代码中使用的型号ID;它可能与页面上的显示名称不同。

![SiliconFlow模型目录，包含文本、图像、视频和语音功能的滤镜](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-15-05-04.webp）

*SiliconFlow的目录可按文本、图片、视频和语音进行筛选。*

有些平台还要求你先选择区域或创建部署，才能提供基础URL和端点。在这种情况下，请按照平台的快速入门指南操作。不要将控制台页面的URL作为API地址使用。

![Volcengine Ark 快速 API 访问页面显示 API 密钥和快速测试步骤](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-23-13-01.webp）

*Volcengine Ark将密钥创建、模型选择和可运行示例置于同一快速启动流程中。*

### 4.3 使用限制与长期任务

文本端点通常会列出 RPM 和 TPM：即每分钟允许的请求数和令牌数。图像、语音和视频服务也可能限制并发，即同时可运行的作业数量。超过限制通常会收到 `429` 响应。请等待并稍后重试，而不是反复点击按钮。

长时间运行的任务，如视频生成，不会立即返回文件。它们首先返回一个任务ID。应用程序可以利用该任务ID查询进度，或提供回调或webhook，以便平台在作业完成时通知服务器。最终文件ID或临时下载URL可能会过期，因此生产应用程序必须决定是否将文件复制到自身存储中。

文档还会提到诸如 `max_tokens`、`temperature` 和 `stream` 等参数。保留第一版的官方默认值。只有在输出被切断时才增加 `max_tokens`，只有在需要实时显示内容时才启用 `stream`。需要时可以在模型文档中查找单个参数;没有理由一次性更改所有参数。

## 5.从官方示例移到页面

一旦最小的终端示例返回结果，将其按以下顺序连接到原型：

1. 将密钥放入如 `.env.local` 的环境文件中，该文件不会提交到 Git。
2. 从服务器或无服务器功能调用模型。
3. 让页面调用你自己的 `/api/...` 端点，而不是携带第三方密钥。
4. 为按钮添加等待、成功和失败状态。
5. 返回使用页面，并确认该操作产生了实际请求。

```text
Browser page
    │ sends only business input
    ▼
Your /api endpoint ── reads the API key from a server environment variable
    │
    ▼
AI service ── returns text, JSON, a file, or a task_id
```

::: 警告 保持 API 密钥安全
不要将 API 密钥放在 Vue、React 或普通前端 HTML 代码中。即使变量名以 `VITE_` 或 `NEXT_PUBLIC_` 开头，也可能被打包到浏览器中。对于公开部署，请从后端、无服务器函数或受保护的网关调用模型。
:::

### 5.1 一些端点不会立即返回

短文本、图像理解和短音频转录通常在一次请求中返回，因此页面可以显示“生成中”。对话和实时语音可能会流式返回响应，让页面在每个片段到达时显示。

图像和视频生成通常是异步运行的。第一次请求只返回一个 `task_id`；后续请求检查任务是否排队、处理中、成功或失败。这些任务可能需要几十秒，因此页面不应停留在不变的加载信息上。

## 6. 首先连接文本生成

[DeepSeek API 文档](https://api-docs.deepseek.com/) 提供一个兼容广泛使用 SDK 的文本端点。模型会随时间变化，因此在集成之前，请从[模型列表](https://api-docs.deepseek.com/api/list-models)复制当前 ID。

首先使用 curl 发送一个请求。它使用与在线试玩测试相同的产品详情，这使得两个结果更容易比较。

```bash
curl https://api.deepseek.com/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${DEEPSEEK_API_KEY}" \
  -d '{
    "model": "deepseek-v4-flash",
    "messages": [
      {"role": "system", "content": "Return JSON with title, summary, and selling_points. selling_points must contain three items. Do not invent prices, sales figures, or product effects."},
      {"role": "user", "content": "I want to list a black nylon commuter backpack. Write a short title, one introduction, and three selling points."}
    ],
    "stream": false
  }'
```

将密钥设置在环境变量中，然后在终端运行命令。一旦命令正常返回，将相同的官方示例和第2节的集成提示提供给 AI 集成开发环境。在第一个版本中只保留一个按钮和一个固定产品。只有在页面能够显示真实结果后，才连接完整的表单。

### 测试两个产品

更改产品名称、材质和颜色，然后重新生成。如果两个结果都与各自的输入匹配且页面正确显示它们，则最小集成是有效的。接下来，删除一个字段，并检查模型是否会虚构价格、效果或销售数据。你也可以暂时使用错误的密钥，以确保页面显示错误。

最后，打开使用页面，确认这些调用是否出现。页面上的文本本身并不能证明它来自 API；剩余的模拟数据看起来同样可信。

## 7. 使用 Qwen3-VL 的图像理解

视觉模型接收一张图像和一个问题。询问页面实际需要的信息。像“这张图片里有什么？”这样的模糊问题通常会产生难以使用的广泛描述。

```text
Look at this product photo. Tell me what the item is, its main color,
and any visible material and structural details. Copy any text in the image.

Say when something is unclear. Do not guess the brand, price, or sales figures.
Return JSON so I can display the result on the page.
```

可以通过[SiliconFlow 模型目录](https://cloud.siliconflow.cn/models)筛选以显示当前可用的视觉模型。本节使用 `Qwen/Qwen3-VL-8B-Instruct` 来说明输入结构；在运行前请确认当前的模型 ID。

```python
import base64
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["SILICONFLOW_API_KEY"],
    base_url="https://api.siliconflow.cn/v1"
)

with open("product.jpg", "rb") as image_file:
    image_data = base64.b64encode(image_file.read()).decode("utf-8")

response = client.chat.completions.create(
    model="Qwen/Qwen3-VL-8B-Instruct",
    messages=[{
        "role": "user",
        "content": [
            {"type": "text", "text": "Look at this product photo. Return JSON with its category, color, visible material and structure, and text in the image. Do not guess anything that is unclear."},
            {"type": "image_url", "image_url": {
                "url": f"data:image/jpeg;base64,{image_data}"
            }}
        ]
    }]
)
```

![在 AI 集成开发环境 中连接图像理解 API](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-15-34-36.webp)

*让用户在生成文案之前确认识别出的产品信息，通常比直接从图像生成最终文案更容易发现错误。*

## 8. 生成和编辑产品图片

[Seedream](https://seed.bytedance.com/en/blog/deeper-thinking-more-accurate-generation-introducing-seedream-5-0-lite) 可以根据文本生成图像或编辑参考图像。产品摄影中最大的风险是生成的效果虽然吸引人，但产品本身发生了改变。除了背景、构图和光线，还要明确说明哪些部分必须保持不变。

```text
Turn the black backpack in the reference image into a vertical product poster.
Place it in the center of a light-gray surface with soft lighting,
and leave some room above it for a title.
Do not add text, a logo, or a price. Do not change the zippers, straps, or pockets.
```

此提示解释了图像的用途、产品定位、视觉风格及受保护的细节。生成第一次图像后，在判断背景和构图之前，应先检查背包是否有变形。不要在提示中一开始就堆砌许多风格术语。

从 [Volcengine Ark 控制台](https://www.volcengine.com/experience/ark?launch=seedream) 复制当前图像模型 ID 和最小请求。不要在生产代码中保留旧教程版本号。

```bash
curl -X POST https://ark.cn-beijing.volces.com/api/v3/images/generations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${ARK_API_KEY}" \
  -d '{
    "model": "<copy the current image model ID from the console>",
    "prompt": "Turn the black backpack in the reference image into a clean vertical product poster. Do not add text, a logo, or a price, and do not change the structure of the backpack.",
    "image": ["https://example.com/product-reference.png"],
    "response_format": "url",
    "stream": false,
    "watermark": false
  }'
```

![图像生成集成到产品中](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-23-21-13.webp)

图像网址通常会过期。原型可以直接显示图像，但生产应用应决定是否根据服务条款将图像复制到自己的存储中，并应记录提示、模型版本和生成时间。

## 9. 语音识别和语音合成是不同的 API

“添加语音”至少包含两个方向：

- **ASR / STT** 将用户的语音或音频文件转换为文本。
- **TTS** 将文本转换为可播放的语音。

它们具有不同的输入、输出和页面交互。不要将它们合并在一个模糊的“语音 API”按钮下。

### 9.1 语音转文本：上传音频并返回转录文本

[SiliconFlow 转录文档](https://docs.siliconflow.cn/cn/api-reference/audio/create-audio-transcriptions) 上传文件为 `multipart/form-data`，与上述 JSON 请求不同。

```bash
curl --request POST \
  --url https://api.siliconflow.cn/v1/audio/transcriptions \
  -H "Authorization: Bearer ${SILICONFLOW_API_KEY}" \
  -F "file=@meeting.mp3" \
  -F "model=FunAudioLLM/SenseVoiceSmall"
```

当你向 AI 集成开发环境 提供官方示例时，请这样描述页面功能：

```text
Add an “Upload and transcribe” button to the current page.

After the user uploads an mp3, m4a, or wav file, call the API below from the server,
then put the returned transcript in an editable text box.
Keep the API key in an environment variable and let the user retry after an upload or transcription error.

Here is the official example:
<paste the curl example above>
```

### 9.2 文本转语音可能返回音频而非 JSON

[MiniMax T2A HTTP 文档](https://platform.minimax.io/docs/api-reference/speech-t2a-http) 提供了同步语音合成功能。其当前示例使用了 `speech-2.8-hd`；请始终在平台上确认模型和语音。

对于语音合成，“提示”主要包括要朗读的文本和语音设置。在选择语音、速度、音量、情感和输出格式之前，请先将数字、英文缩写和停顿为语音进行改写。不要将整页的 Markdown、URL 和按钮标签发送给朗读器。

```bash
curl --request POST \
  --url https://api.minimax.io/v1/t2a_v2 \
  --header "Authorization: Bearer ${MINIMAX_API_KEY}" \
  --header "Content-Type: application/json" \
  --data '{
    "model": "speech-2.8-hd",
    "text": "This is a preview of the product introduction.",
    "stream": false,
    "output_format": "hex",
    "language_boost": "auto",
    "voice_setting": {
      "voice_id": "<copy the voice_id from the voice list>",
      "speed": 1,
      "vol": 1,
      "pitch": 0
    },
    "audio_setting": {
      "sample_rate": 32000,
      "bitrate": 128000,
      "format": "mp3",
      "channel": 1
    }
  }'
```

一个语音页面通常还需要预览、停止、重新生成和下载控件。流式 TTS 使用 WebSocket 或流式 HTTP，并在每个音频片段到达时播放它。

::: warning 语音与隐私
在上传录音之前，说明其用途、保存期限和删除方式。语音克隆需要语音所有者的明确许可。当来源和许可不明确时，请勿使用公众人物或他人的录音。
:::

## 10. 视频生成：创建任务，然后等待结果

视频生成通常使用异步 API。[MiniMax 视频生成指南](https://platform.minimax.io/docs/guides/video-generation)将过程分为三个步骤：创建任务并接收一个 `task_id`，查询其状态以获取 `file_id`，然后请求下载地址。

### 10.1 说明场景如何变化

一张图片描述一帧；视频提示还必须说明接下来几秒钟内发生的事情。说明产品的起始位置、移动顺序、摄像机方向和持续时间：

```text
Show this black backpack on a light-gray display stand for six seconds.
Move the camera slowly from the front toward the right, then move slightly closer.
Keep the video vertical. Do not change the backpack or add people, text, or a logo.
```

如果提示包含许多动作，请先从一次射击和一个主要动作开始。在短视频中要求旋转、开启、缩放和场景变化会使保持产品一致性变得更加困难。

### 10.2 创建和状态检查是独立的请求

```bash
# Step 1: create the task
curl --request POST \
  --url https://api.minimax.io/v1/video_generation \
  --header "Authorization: Bearer ${MINIMAX_API_KEY}" \
  --header "Content-Type: application/json" \
  --data '{
    "model": "MiniMax-Hailuo-2.3",
    "prompt": "Show this black backpack on a light-gray display stand. Move the camera slowly from the front toward the right, then move slightly closer. Do not change the backpack or add people, text, or a logo.",
    "duration": 6,
    "resolution": "1080P"
  }'

# Step 2: query status with the task_id returned above
curl --request GET \
  --url "https://api.minimax.io/v1/query/video_generation?task_id=<TASK_ID>" \
  --header "Authorization: Bearer ${MINIMAX_API_KEY}"
```

该页面应至少显示 `Preparing`，`Queueing`，`Processing`，`Success` 和 `Fail`。定期轮询并定义何时停止。生产服务可以使用文档中的 `callback_url`，以便平台在状态更改时通知您的服务器。

::: warning 视频和真人素材
在从真人照片或声音、商标或受版权保护的材料生成视频时，请确认权限和平台规则。一些服务还要求进行面部验证、素材注册或内容审核。这些不是可以在浏览器中绕过的技术步骤。
:::

## 11. 诊断常见问题

| 症状 | 首先检查 |
| --- | --- |
| `401 / 403` | 密钥是否正确、是否有权限以及是否在正确的请求头中 |
| `404` | 基础 URL、端点或模型 ID 是否已更改 |
| `429` | RPM、TPM、并发数或帐户使用等级 |
| `400` | 必需的参数、文件类型、JSON 结构和大小限制 |
| `5xx / timeout` | 服务状态、超时设置和重试策略 |
| 任务持续排队 | 并发数、任务状态查询、配额和服务负载 |
| 页面报告成功但未显示内容 | 响应字段路径、二进制处理以及临时 URL 是否已过期 |
| 本地可用但在线失败 | 环境变量、CORS、无服务器超时和区域网络访问 |

调试时保留四条信息：时间、请求类型、HTTP 状态以及请求 ID 或追踪 ID。切勿将 API 密钥、完整用户录音或敏感业务数据写入日志。

## 12. 📚 章节作业

<StageAssignmentCard title="为您的原型添加一个 AI 功能">

  <p>选择页面上真正需要 AI 的一个按钮。第一个版本只需一个功能；您无需一次性添加文本、图像、语音和视频。</p>

  <ol>
    <li>查找官方文档中的当前模型 ID 和最小示例。</li>
    <li>将示例提供给 AI 集成开发环境 并将其连接到页面上的按钮。</li>
    <li>将 API 密钥存储在服务器环境变量中，并添加等待和失败消息。</li>
    <li>进行真实调用，然后在使用情况或日志中确认它已经到达服务。</li>
  </ol>

  <p>运行成功后，保存一张截图，并用一句话说明 AI 在该页面上帮助用户做了什么。在使用他人的图片、声音或真人素材前请确认权限。</p>
</StageAssignmentCard>

## 下一步

下一章将把这些功能整合回完整的产品流程。我们将添加数据、状态和用户反馈，使一次 API 调用变为人们可以重复使用的原型。

<RelatedArticlesSection
  title="相关文章"
  description="从单一 AI 功能到完整产品流程。"
  :items="relatedArticles"
/>