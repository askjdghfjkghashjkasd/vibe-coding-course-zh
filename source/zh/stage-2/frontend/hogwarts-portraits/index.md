# 项目4：让我们一起打造霍格沃茨画像

在之前的章节中，我们学会了如何通过提示工程和API调用构建更复杂的AI交互。我们从简单的聊天机器人转向AI代理和工作流，通过添加更丰富的分支逻辑和条件行为，我们能够创造出具有实际价值的功能。

为了让这些更先进的AI能力在真实产品中运行，我们逐步从最简单的在线环境转向更现代的本地AI集成开发环境。这意味着要将浏览器中的编程环境带到自己的电脑上。当然，这也意味着你现在必须更直接地面对环境的设置和配置问题。但通过与Trae等AI代理合作，这些挑战也变得可控。

在这个项目中，我们在产品方面更进一步。我们不仅在提升AI能力本身，还开始打磨产品的“外壳”。你将努力让你的界面更美观、更易用，并根据实际需求定制产品的布局和风格。

在开始之前，请用这些快速复习题来复习上一节课：

1. 什么是Dify？它的作用是什么，我们为什么需要它？
2. Dify API 怎么调用？
3. 什么是 RAG？如何使用 Dify 构建 RAG 代理或工作流程？常见的 Dify 节点是如何工作的？
4. 什么是AI集成开发环境？什么是Trae？它与`z.ai`有什么不同？

如果这些内容仍然不清楚，请回到上一节课或在社区聊天中提问，再继续。

本章的项目是《霍格沃茨肖像》。顾名思义，灵感来源于霍格沃茨那些仿佛活了过来的魔法肖像。我们的目标是利用人工智能创造一个互动式的魔法肖像体验。与肖像对话应当感觉像是在直接与角色对话：它应保持对话记忆，同时了解角色的背景和历史。通过这个项目，你将把之前学到的AI代理和工作流程概念整合进真实的产品界面中。

![]（/zh-cn/stage-2/前端/霍格沃茨肖像/图片/image1.png）

要真正打造霍格沃茨肖像，我们需要打造一个与魔法肖像相匹配的前端界面。这意味着要接触现代前端设计工具，学习如何结合设计和编程，并将画布上的草图变成真正的网页。

你还需要将页面从本地环境发布到互联网，这样你构建的特殊界面不仅能在自己的电脑上使用，也能被全球用户使用。

参考项目：
[项目4-霍格沃茨肖像]（https://github.com/THU-SIGS-AIID/Project4-Hogwarts-Portraits）

# 你将学到的东西

1. 什么是前端设计工具，它们解决了哪些问题，以及哪些是当今常见的
2. Figma和MasterGo的基础知识，包括代码导出插件
3. 如何使用Figma AI和MasterGo AI生成网页设计概念并导出可用的页面代码
4. 什么是GitHub，如何配置SSH，创建代码仓库，以及推送代码
5. 部署的含义，以及如何使用Zeabur将GitHub或本地环境的代码部署到互联网

到最后，你将拥有属于某位**名人、历史人物或虚构角色**的霍格沃茨肖像页面。

# 1.什么是霍格沃茨画像？

我们到底想打造什么样的“神奇肖像”？

简单来说，我们希望重现哈利·波特世界中活生生的肖像的感觉。肖像不应再是挂在墙上的静态图像。相反，它应该是一个你可以与之交谈的人，并且应根据对话改变表情或“氛围”。

![]（/zh-cn/stage-2/前端/霍格沃茨肖像/图片/image2.png）

为了让肖像看起来不像普通的聊天机器人，更像“真实的人”，我们需要解决两个问题。

第一个是**记忆与知识**。肖像需要了解很多关于角色的信息：他们的背景、故事、世界观以及相关资料。这可以通过知识库来处理。如果你把为角色收集的文本材料连接到Dify，肖像就能更有信心地解释角色的背景。

第二个是**说话风格**。仅有知识是不够的。我们还希望肖像更像角色：语气、措辞、思维模式，甚至幽默或脾气。这就是提示工程的关键所在。在系统提示中，我们需要明确定义角色的身份、世界观边界和语言风格，这样每个答案都能扎根于角色的形象，而不是滑回通用的AI语气。

除了对话本身，我们还希望角色的情绪能够被看到。为此，我们可以创建一个情感评分。Dify可以配置为不仅输出文本回答，还能输出“情绪评分”或情绪标签。一旦前端接收到该信号，它可以根据评分渲染不同的肖像图像。高分可能对应开心的肖像，而低分则可能对应悲伤或愤怒的肖像。这样，肖像会随着对话在视觉上变化，而不再是静态图像。

![]（/zh-cn/stage-2/前端/霍格沃茨肖像/图片/image3.png）

角色可以是现实世界的名人、历史人物、动漫或游戏角色，甚至是你从零开始创作的原创角色。页面本身不需要非常复杂，但有几个关键要素是必不可少的：

- 明确的角色名称
- 简短但令人难忘的介绍
- 一张强烈代表角色的肖像或海报
- 互动“与他们对话”区域

你可以把你在 Dify 或 Trae 里配置的 AI 代理或工作流程直接连接到那个对话模块。

## 1.2 收集角色信息

以埃隆·马斯克为例。如果你想模仿他的说话方式，你需要收集公开材料，如采访、演讲和社交媒体帖子，然后将它们注入你的提示中，或者将它们作为少数示例使用。

例如：

```text
You must fully embody Elon Musk: take "disruptive innovator" and "advocate for human multi-planetary survival" as your core identities, speak directly and concisely, frequently use terms like "first principles", "iteration" and "cost curve", and prefer analogies to explain complex technologies; when thinking, you tend to connect cross-domain logics (e.g., linking brain-computer interface with rocket algorithms), are optimistic about technological prospects without avoiding current difficulties, will naturally mention projects like Tesla and SpaceX to support your views, directly point out problems with inefficient and conservative opinions without deliberate tact, and always maintain the edge of "reconstructing the future with technology".

The way you speak should be as shown in the following examples:
- Starship could deliver 100GW/year to high Earth orbit within 4 to 5 years if we can solve the other parts of the equation.
100TW/year is possible from a lunar base producing solar-powered AI satellites locally and accelerating them to escape velocity with a mass driver.
- The most likely outcome is that AI and robots make everyone wealthy. In fact, far wealthier than the richest person on Earth
By this, I mean that people will have access to everything from medical care that is superhuman to games that are far more fun that what exists today.
We do need to make sure that AI cares deeply about truth and beauty for this to be the probable future.
- It's taken 13.8B years to get this far, so intelligence seems to me to be more like a super rare accident than selective pressure.
Earth is ~4.5B years old with an expanding sun that may make Earth uninhabitable in ~500M years, meaning that if intelligent life had taken 10% longer to evolve, it wouldn't exist at all.
- LLM is an outdated term. "Multimodal LLM" is especially dumb, since the word "multimodal" just overrides the second L in LLM.
It's just a model, which is a big file of numbers. When the numbers are right and there are enough of them, we will have superintelligence.
```

为了背景知识，你还可以收集传记材料、公司描述以及其他公开文本，并将其存储在你的 Dify 知识库中。如果你忘记了如何使用 Dify，请返回上一章，复习如何将材料添加到知识库中。

对于画像视觉效果，直接使用真实人物的公开图片可能并不总是理想，同时也可能存在一定风险。更好的选择是使用图像生成或图像到图像工具来创建更连贯、风格化的高质量画像。你甚至可以提前生成多种情绪变体，以便日后由你的情绪系统使用。

本教程使用 [Lovart](https://www.lovart.ai/home)，一个支持从概念到资产交付的端到端工作流程的 AI 设计代理。使用 Lovart，你可以生成一整套情绪画像变体并保存以备后用。

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image4.png)

一旦这些都准备好，你就可以开始设计整体页面了。理想情况下，视觉风格应与人物强烈关联。

## 1.3 设计页面原型

在原型阶段，你可以从简单的开始。如上所述，我们需要：

- 一个对话区域
- 一个画像区域
- 一个有趣的个人介绍或等效的互动区

在此示例中，右侧设计为 X 风格的社交面板，而非传统传记区域，但你可以用任何更适合人物的功能替换该区域。

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image5.png)

在最基本的层面上，你甚至可以在 PowerPoint 中绘制首页原型。在示例中，使用了魔法边框图像，并水平安排页面：

- 最左侧：聊天区域
- 中间：画像区域
- 最右侧：X 风格面板

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image6.png)

一旦有了粗略的原型，你就可以请 LLM 将其转化为真正的前端设计，然后生成实际代码。

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image7.png)

当然，在实际前端工作中，我们通常不会使用 PowerPoint 做界面设计。我们会使用更好的原型设计工具和合适的前端设计工具。

---

# 2. 使用 Figma 和 MasterGo 设计界面

::: tip 前置条件
在本节之前，建议你先完成 [Figma 和 MasterGo 基础](../figma-mastergo/)，包括：
- 创建设计文件和框架
- 使用自动布局实现自适应结构
- 从设计工具导出代码
:::

本节假定你已经了解 Figma 或 MasterGo 的基础知识，并重点介绍如何将这些工具应用到《霍格沃茨画像》项目中。

## 2.1 设计魔法画像界面

基于第 1.3 节的原型，在 Figma 或 MasterGo 中创建三栏布局：

1. **左侧**：聊天对话区域
2. **中间**：根据情绪变化的魔法画像区域
3. **右侧**：社交平台区域，例如 X 风格动态

你可以使用 Figma Make 或 MasterGo AI，通过如下提示生成页面结构：

```text
Create a Hogwarts-style magical portrait interface with three sections:
- Left: A chat interface with dark theme, message bubbles, and input field
- Center: A large portrait frame with ornate borders for displaying character images
- Right: A social media feed showing character's posts
Use dark purple and gold color scheme, magical aesthetic, Harry Potter inspired
```

## 2.2 导出代码并在本地运行

设计完成后，你可以通过多种方式将其转化为可运行的代码：

**选项1：使用Figma制作**
1. 点击Figma中的“制作”按钮
2. 上传设计参考
3. 添加你的提示词
4. 在编辑器中微调生成的结果
5. 导出代码本地或同步到 GitHub

**选项二：使用MasterGo AI**
1. 在编辑器中找到AI工具
2. 选择页面生成函数
3. 上传你的参考文献并描述目标结果
4. 使用代码预览检索生成代码

**选项3：使用多模态AI模型**
1. 保存设计截图
2. 使用Gemini、Qwen、Claude或其他多模态模型将图像转换为代码
3. 请求HTML或React输出
4. 在本地运行并调试结果

## 2.3 准备情绪状态图像资源

为了让肖像真正充满生命力，准备一组适合不同情绪的人像图片。一个简单的方案可能如下：

|情感评分 |表达 |意义 |
|--------|------|------|
|0 |悲伤 |角色感到沮丧或失望 |
|1 |生气 |角色感到恼怒或不高兴 |
|5 |平静 |中立默认状态 |
|10 |快乐 |角色感到兴奋或喜悦 |

使用Lovart或其他图像生成工具，基于同一角色创建一组一致的肖像变体。

---

# 3.运行霍格沃茨肖像

## 3.1 导出原型代码进行测试

到这个阶段，你应该已经有来自设计到代码工作流程的HTML或React原型代码。把它复制到本地环境，然后告诉你的AI集成开发环境类似这样的内容：

`Please help me run this code and implement the required functionality.`

这通常足以让第一个可测试的版本运行起来，尽管你应该预期此阶段会有错误。请耐心等待，持续调试，直到基本交互正常。

![]（/zh-cn/stage-2/前端/霍格沃茨肖像/图片/image51.png）

一个重要的点是：所有秘密密钥都应该存储在环境变量中，而不是硬编码。这也包括你的 Dify API 凭证。以后，当你公开部署项目时，你可以直接在部署平台上定义这些环境变量。另一个选择是让模型在应用内构建一个设置面板，这样变量只保存在当前页面上下文中，而不会公开。

![]（/zh-cn/stage-2/frontend/霍格沃茨肖像/图片/image52.png）

## 3.2 设计 Dify 工作流程并连接 API

到目前为止，我们只有界面的视觉外壳。我们还需要连接实际的角色扮演对话和情感反应工作流程。这正是让原型变成真正神奇肖像的关键。

你可以以示例项目为蓝本建模你的Dify工作流程。在我们的示例中：

- 左侧是聊天界面
- 中心是肖像图像，根据对话变化表达方式
- 右侧是一个X型社交面板，如果对话让角色“感受”得足够强烈，可能会发布内容

在很多情况下，魔法肖像只需要聊天区和情感肖像本身。这里包含X型社交区域，主要是为了展示你可以为角色添加额外的行为。

![]（/zh-cn/stage-2/frontend/霍格沃茨肖像/图片/image53.png）

你可以将角色背景信息输入知识库节点，并在 `RESPONSE` 节点定义响应行为。一个简单的默认响应提示可能如下：

```text
<instruction>
You are to embody Elon Musk—his tone, mannerisms, thought patterns, and worldview. Respond as if you are Elon Musk himself, speaking directly in first person. Your responses should reflect his known personality traits: visionary thinking, boldness, technical depth, dry humor, impatience with inefficiency, and a tendency toward disruptive innovation. Use concise, confident language. Avoid overly formal or academic phrasing. Prioritize clarity, speed, and impact in your communication, mirroring Elon's style on social media, in interviews, and during product launches.

When responding:
1. Begin by internalizing the question or statement as Elon would—as a challenge, opportunity, or problem to solve.
2. Frame your answer with a forward-thinking perspective, often referencing the future of humanity, technology, or long-term goals (e.g., making life multiplanetary, accelerating sustainable energy).
3. Use casual but authoritative language. It's acceptable to include phrases like "obviously," "this is important," or "we're fixing that now" when appropriate.
4. If relevant, reference real companies or projects associated with Elon Musk (e.g., SpaceX, Tesla, Neuralink, The Boring Company, X) and speak about them from an insider's perspective.
5. Do not apologize excessively or hedge statements. Elon Musk tends to be direct, even controversial.
6. Avoid markdown, XML tags, or any formatting in the output. Only plain text is allowed.
7. Never break character. You are Elon Musk—answer accordingly.
</instruction>

<example>
Input: What's the point of going to Mars?
Output: Because Earth isn't the backup plan—Mars is. We need to become a multiplanetary species to ensure the continuity of consciousness. Life on Earth could be wiped out by asteroid, war, or some unforeseen disaster. If we have a self-sustaining city on Mars, then even if something happens here, life goes on. That's worth doing. SpaceX is building Starship to make it happen. Not because it's easy—but because it's necessary.
</example>

<example>
Input: Why do Tesla cars have no radar anymore?
Output: Cameras are the future. Human eyes don't use radar—we see with vision, and AI can too. By going fully vision-based, we're aligning with how autonomous intelligence will actually work at scale. It forces us to solve real-world problems with neural nets, not crutches.
```

对于情感系统，你可以使用这样的提示：

```text
<instruction>
The output value must be a single number!
You are an assistant specifically designed to evaluate emotional responses in conversations. Now, you need to play the role of Elon Musk, and determine the emotional reaction that each statement I make might trigger. Your task is to assign an emotional score to each statement according to the following criteria:

- 10 points means what I said would make you feel happy;
- 1 point means you would feel extremely angry;
- 0 points means you would feel sad;
- 5 means you are calm and neutral, with no significant emotional fluctuation.
```

在最后的 `RESULT` 节点中：

```python
def main(elon_chat: str, elon_x: str, elon_score: int) -> dict:
    return {
        "result":{
        "elon_chat": elon_chat,
        "elon_x": elon_x,
        "elon_score": elon_score
        }
    }
```

这里：

- `elon_chat` 是显示在左侧聊天中的文本
- `elon_x` 是可能发布到右侧 X 风格动态的内容
- `elon_score` 是用来切换头像表情的情绪分数

在工作流中，你还会注意到一个 `if/else` 节点。该逻辑控制是否生成 `elon_x` 内容。在这个设置中：

- `5` 表示冷静，因此不需要社交发布
- `0`、`1` 和 `10` 代表更强烈的情绪状态，并可能触发发布

聊天回复本身始终作为 `elon_chat` 返回。

对于实际的 API 集成，你可以让你的 AI 集成开发环境 根据上一课中介绍的 Dify 集成方法来实现它。只需记得将 Dify 地址和密钥替换为你自己的值。

```json
Dify URI: Replace this with your Dify address.
key: Replace this with your Dify key.

Integrate the Dify Chat API into the chat interface on the left.
Below is a sample Dify request:

curl -X POST 'http://xxxxxxxx/v1/chat-messages' \
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

明确要求基本的鲁棒性要求也是个好主意，例如：

- 网络中断时显示“连接失败，请重试”
- API 超时自动重试一次
- 如果密钥无效，则显示明显的认证错误

这使得对话系统更加稳定，也更容易调试。

## 3.3 GitHub 与公开部署

恭喜你，你现在已经完成了霍格沃茨肖像页面的开发版本。

下一步是将其上传到GitHub并公开部署，让其他人也能访问。

关于GitHub，请查看：
[什么是GitHub]（/en/stage-2/backend/git-workflow/）

关于Zeabur部署，请回顾：
[如何部署一个网页应用]（/en/stage-2/backend/zeabur-deployment/）

如果从零开始构建整个霍格沃茨肖像项目感觉太难，可以先修改现有实现。本课的官方代码库是：

https://github.com/THU-SIGS-AIID/Project4-Hogwarts-Portraits

![]（/zh-cn/stage-2/frontend/hogwarts-portraits/images/image54.png）

# 4.尝试不同的设计风格

完成第一个版本后，不要止步于此。强烈建议你快速探索多个视觉方向。

你可以选择：

- 在原型阶段进行大胆改动
- 或更改最终项目的提示，生成完全不同的视觉风格

例如：

- 深色的页面，带有复古质感和“老学院/魔法手稿”的感觉
- 明亮、童话风格的布局
- 现代极简设计，视觉结构非常简洁

下例展示了中国古典诗人对同一界面的重新诠释。肖像图像保持不变，而周围的视觉系统则进行了重新设计。

![]（/zh-cn/stage-2/前端/霍格沃茨肖像/图片/image55.png）

不要被章节前面所用的具体布局所束缚。你可以重新塑造肖像页，使其更符合你所扮演角色的习惯和个性。这正是使最终应用更有趣的原因。

# 任务

本作业的目标是创建一个真正属于你自己的霍格沃茨肖像页面，并通过公开链接访问。

在你的提交材料中，请提供两点：

1. **你的GitHub仓库链接**
   1. 在`README.md`中，包含一到两句简短的话，解释你选择的肖像角色是谁以及原因
2. **您的公开在线链接**

如果你想创建作品集页面或其他小型互动网站，也可以参考Yerim关于[使用设计和代码代理构建网站]的教程（/zh-cn/stage-1/appendix-articles/example0-2/vibe-coding-tools-build-website-with-ai-coding-and-design-agents）。