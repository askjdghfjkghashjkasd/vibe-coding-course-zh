---
title: '在真实工作流程中发现 AI 机会'
description: '使用六十多个咨询、行业研究和产品案例来考察已经出现在商业和日常生活中的 AI 应用。'
---

# 在真实工作流程中发现 AI 机会

许多“AI 行业用例合集”看起来很令人印象深刻：金融、医疗、教育、制造业，然后在每个类别下列出十几个想法。然而，当真正要构建时，它们并没有告诉你该采访谁，连接哪些数据，替换哪一步，或者谁会为结果付费。

问题在于，**一个行业不是一个用例**。“AI 医疗”只是一个领域。“经过咨询后，医生花十分钟完成临床记录；系统根据对话草拟记录，医生批准它”是一个可以研究、设计并测试的工作流程。

本附录采用了第二种方法。我们审查了六十多个报告和第一方产品案例。我们没有列出每个行业，而是选择了一些已经在使用且能量化价值的商业和消费者工作流程。将其作为寻找值得采访问题的地图，而不是现成的创业答案。

<div class="research-note">
  <div>
    <span class="research-note__eyebrow">记住这句话</span>
    <strong>对于企业来说，寻找工作流程中的阻塞点。对于消费者来说，寻找全天重复出现的时刻。</strong>
  </div>
  <p>前者需要明确的工作人员、系统、交接和负责人。后者需要返回的理由，以及相比搜索、模板或人工服务，AI 可以去除的一步。</p>
</div>

## 首先，区分商业和消费者产品

### 商业：公司为结果付费

公司很少单独购买“聊天机器人”。它购买的是更短的处理时间、更少的返工、更稳定的合规性或更多销售量。一个可研究的商业工作流程应至少回答四个问题：每天谁执行它，材料来自哪里，哪个系统接收结果，出现错误时谁负责。

这就是为什么许多试点项目从未扩展的原因。德勤对 2,773 名商业领袖的调查发现，只有一部分生成式 AI 实验能达到规模，埃森哲对 2,000 多个项目的回顾发现，相对少数组织能够产生企业范围的价值。困难通常不在于模型能否回答，而在于它是否参与完整的工作流程。[德勤：企业生成式 AI 状况](https://www2.deloitte.com/us/en/pages/about-deloitte/articles/press-releases/state-of-generative-ai.html) · [埃森哲：用生成式 AI 实现重塑](https://www.accenture.com/us-en/insights/consulting/making-reinvention-real-with-gen-ai)

### 消费者：个人为更轻松的时刻付费

消费者产品不需要十个企业集成，但个人可以随时结束使用。强有力的消费者使用场景出现在可识别的时刻：准备旅行、比较产品、练习演讲、制作海报或整理账单。他们先完成一个任务，并随着时间积累偏好。

在凯捷对12,000名消费者的调查中，生成式人工智能已经进入了产品发现和比较领域。QuestMobile还发现，中国的人工智能正从独立的聊天产品转向搜索、生产力、形象和音乐。这个机会不仅是另一个聊天框，更是与下一步行动相连的对话。[Capgemini：当今消费者2025年的重要事]（https://www.capgemini.com/insights/research-library/top-consumer-trends-in-2025/）·[QuestMobile：2025年中国移动互联网春季报告]（https://www.questmobile.cn/research/report/1919961024158601218/）

## 业务：已有八个工作流程正在进行

每个部分开头都有一个具体的角色。不要先复制产品名称。问问为什么旧工作慢，AI接手了哪个步骤，以及还需要留给一个人什么。

### 1.客服不是在回答问题;而是在结束案件

<figure class=“product-shot”>
  <a href=“https://www.klarna.com/international/press/klarna-ai-assistant-handles-two-thirds-of-customer-service-chats-in-its-first-month/” target=“_blank” rel=“noreferrer”>
    <img src=“../../../zh-cn/stage-1/appendix-industry-scenarios/images/products/klarna.webp” alt=“Klarna AI 助手接口用于支付扩展、多语言支持及退款解释” loading =“lazy” />
  </a>
  <figcaption><strong>Klarna AI助手：</strong>左侧不仅显示“联系代理人”;它开启付款延期操作。右侧列出退款。有用的服务AI会找到订单并继续执行。</figcaption>
</figure>

**谁来做工作：** 一线代理、团队负责人和售后运营。

当客户询问退款为何未到时，客服人员会核实身份，检查订单、支付和物流系统，解释规则，并可能创建工单。慢的部分不是礼貌句子;而是跨系统收集上下文。

Klarna的助理负责退款、退货和多语言支持。ResultCX连接语音路由、账户查询和后端API。两者都表明，价值来自**查找状态→应用规则→记录操作→必要时升级**，而非来自常见问题解答。[Klarna案例]（https://openai.com/index/klarna/） ·[结果CX案例]（https://aws.amazon.com/solutions/case-studies/resultscx/）·[Salesforce：2025年服务状态]（https://www.salesforce.com/news/stories/state-of-service-report-announcement-2025/）

第一个版本可以在人工对话后开始：起草摘要，识别意图，检索相关政策并建议下一步操作，然后让代理批准后再写工单。这揭示了节省的时间，同时不赋予模型退款权限。

<div class=“scene-check”>
  <span>值得思考的问题</span>
  <p>代理人最常在哪些页面间切换？哪些重复的问题需要针对不同订单状态采取不同动作？案件转移时，下一位代理人会不会重新问一次所有内容？</p>
</div>

### 2.销售并不缺乏文案;而是缺少合适的下一场对话

<figure class="product-shot">
  <a href="https://openai.com/index/morgan-stanley/" target="_blank" rel="noreferrer">
    <img src="../../../zh-cn/stage-1/appendix-industry-scenarios/images/products/morgan-stanley.webp" alt="摩根士丹利内部 AI@MS 助手界面" loading="lazy" />
  </a>
  <figcaption><strong>摩根士丹利 AI@MS 助手：</strong>顾问可以查找开户文件和案例状态。页面上还显示“仅限内部使用”，并需要人工验证。它是嵌入工作站的检索入口，而不是为顾问做决策的聊天机器人。</figcaption>
</figure>

**工作执行者:** B2B 销售人员、客户经理、解决方案顾问和销售主管。

会议结束后，销售人员会更新 CRM，识别决策者和异议，找到相关案例，撰写跟进邮件，并决定何时联系客户。证据分散在录音、聊天、邮件和私人笔记中，因此 CRM 经常陈旧。

麦肯锡将生成式 AI 映射到 B2B 销售周期：潜在客户挖掘、会议准备、沟通、方案、成交和续约。摩根士丹利的顾问工具不会做投资决策；它们检索内部知识，并将会议内容转化为笔记和任务。[麦肯锡：在 B2B 销售中释放生成式 AI 的潜力](https://www.mckinsey.com/capabilities/growth-marketing-and-sales/our-insights/unlocking-profitable-b2b-growth-through-gen-ai) · [摩根士丹利案例](https://openai.com/index/morgan-stanley/)

第一个版本可以处理会议后的十五分钟：提取目标、异议、承诺和下一步行动，起草可编辑邮件，并填写 CRM 字段。衡量 CRM 完整性和跟进时间，而不是生成文字的数量。

### 3. 公司知识库必须回答这次适用哪个规则

<figure class="product-shot">
  <a href="https://www.notion.com/help/guides/find-answers-and-generate-reports-with-enterprise-search" target="_blank" rel="noreferrer">
    <img src="../../../zh-cn/stage-1/appendix-industry-scenarios/images/products/notion-enterprise-search.webp" alt="Notion 企业搜索界面" loading="lazy" />
  </a>
  <figcaption><strong>Notion 企业搜索：</strong>一个问题即可搜索 Notion 和 Slack，用户可在“问答”、“研究”和“构建”之间切换。企业助手连接现有的资源和权限；它不仅仅是上传一个 PDF 的地方。</figcaption>
</figure>

**工作执行者:** 顾问、运营、HR、财务、IT 支持和新员工。

大多数公司内部已有答案，但分散在政策、手册、旧邮件、培训视频和以前的项目中。“这个客户可以退款吗？”需要当前规则、其条件及其来源，而不是任何包含“退款”一词的文件。

太阳生命的内部助手每周处理超过一万条员工查询。摩根士丹利将可搜索的内部材料扩展到约十万份文件。Notion 将企业搜索、会议记录和行动整合到同一工作区。核心是权限、版本、引用和反馈，而不是“上传 PDF 并聊天”。[太阳生命案例](https://aws.amazon.com/solutions/case-studies/sun-life-case-study/) · [Notion AI 概览](https://www.notion.com/help/notion-ai-faqs)

不要先将整个公司连接起来。选择一个问题多且边界清晰的团队，比如退货政策或 IT 支持。每个答案都应引用其来源；缺失的答案应承认并加入材料待办清单。

### 4. 财务、法律与合规：阅读与起草，但不签署

<figure class="product-shot">
  <a href="https://mena.thomsonreuters.com/en/products-services/legal/cocounsel.html" target="_blank" rel="noreferrer">
    <img src="../../../zh-cn/stage-1/appendix-industry-scenarios/images/products/cocounsel.webp" alt="Thomson Reuters CoCounsel 合同起草与研究界面" loading="lazy" />
  </a>
  <figcaption><strong>Thomson Reuters CoCounsel：</strong>起草和研究的进展显示在左侧，然后草稿在 Word 中打开。AI 可阅读、查找支持信息并起草；专业人士在熟悉的文档中审阅并完成工作。</figcaption>
</figure>

**执行人员：** 财务分析师、税务、法律、采购和合规团队。

这些角色会看到许多看似相似但不同的合同、发票、报表、政策、审计文件和尽职调查文件。AI 可以提取、比较、分类、检索和起草，但最终的判断必须回到来源，并由负责的审阅者处理。

汤森路透 2025 年的调查报告显示，法律、税务和风险工作中生成式 AI 的使用正在上升，包括研究、文档摘要、合同起草和备案准备。Moderna 的 Contract Companion 为员工提供合同摘要；OpenAI 和普华永道讨论用于对账、风险信号和跨系统工作流的财务代理。 [汤森路透：2025 年专业服务中的生成式 AI](https://www.thomsonreuters.com/en-us/posts/technology/genai-professional-services-report-2025/) · [Moderna 案例](https://openai.com/index/moderna/) · [OpenAI × PwC：首席财务官工作流](https://openai.com/index/openai-pwc-finance-collaboration/)

一个小团队可以从一个文档和一套规则开始：检查供应商合同中的付款、续约、赔偿和数据条款，并附上引用和风险说明。在声称提供“AI 法务部”之前，应验证遗漏率、审阅时间和引用准确性。

### 5. 软件开发：价值体现在代码库中

<figure class="product-shot">
  <a href="https://github.blog/changelog/2024-10-29-github-copilot-code-review-in-github-com-private-preview/" target="_blank" rel="noreferrer">
    <img src="../../../zh-cn/stage-1/appendix-industry-scenarios/images/products/github-copilot-review.webp" alt="GitHub Copilot 在拉取请求中审查代码" loading="lazy" />
  </a>
  <figcaption><strong>GitHub Copilot 代码审查：</strong>当 Copilot 被指派为审查者时，评论会附加到具体行，并可包括建议修改。开发人员仍需检查差异、批量处理或拒绝这些修改。价值体现在拉取请求中，而不是另一个聊天窗口。</figcaption>
</figure>

**执行人员：** 开发人员、测试人员、运维和安全工程师。

时间用于理解旧代码、添加测试、阅读日志、审查变更以及学习不熟悉的仓库。在GitHub的受控实验中，参与者使用Copilot完成指定任务的速度更快。但在真实团队中，仓库上下文、工程规则和通过测试远比能否生成代码更为重要。[GitHub Copilot生产力研究]（https://github.blog/news-insights/research/research-quantifying-github-copilots-impact-on-developer-productivity-and-happiness/ 年） ·[GitHub后续报告]（https://github.blog/wp-content/uploads/2023/06/Sea-Change-in-Software-Dev.pdf）

一个有用的内部工具可以从失败的配置项运行开始：读取错误和相关变更，找出可能原因，建议修复方案，并准备补丁进行评审。它必须运行测试，显示差异，并接受评审，而不是直接推送到生产环境。

### 6.制造与现场服务：让设备、手册和工单共同沟通

<figure class=“product-shot”>
  <a href=“https://blog.siemens.com/2026/02/the-digital-enterprise-and-the-synthesis-of-industrial-ai-digital-twin-and-data/” target=“_blank” rel=“noreferrer”>
    <img src=“../../../zh-cn/stage-1/appendix-industry-scenarios/images/products/siemens-industrial-copilot.webp” alt=“Siemens Engineering Copilot side TIA Portal” loading =“lazy” />
  </a>
  <figcaption><strong>西门子工程副驾驶：</strong>副驾驶和TIA门户并排开放。助理查看当前自动化项目、设备结构和工程文档，而非回答无上下文的机器故障原因。</figcaption>
</figure>

**谁来做这些工作：**设备操作员、维护工程师、现场服务人员和工艺工程师。

当机器停机时，操作员可能只看到错误代码。答案埋藏在数百页的手册、零件清单和维修历史中，而损失却每分钟都在累积。维修后，现场工程师仍需撰写一份客户可阅读、公司可归档的报告。

西门子工业Copilot用于解释设备、获取维护支持并协助自动化编程。另一项西门子试验将超过140万份年度工单中的简短工程师笔记转化为一致的客户报告。德勤的制造调查还指出数据质量和设备背景是主要障碍。[西门子工业副驾驶]（https://news.microsoft.com/source/emea/features/how-ai-is-helping-siemens-and-thyssenkrupp-bridge-skilling-gaps-in-manufacturing/） ·[西门子现场报告案例]（https://www.microsoft.com/en/customers/story/19736-siemens-ag-germany-dynamics-365-field-service）·[德勤：2025年智能制造调查]（https://www2.deloitte.com/us/en/insights/industry/manufacturing/2025-smart-manufacturing-survey.html）

一个好的起点是某种设备类型，而不是“预测整个工厂”：识别错误代码，检索其手册页和之前的工作单，并提出诊断流程。维修后，将笔记转化为报告。为每一个建议提供证据，让工程师标记为无用。

### 7.在医疗领域，应从文档和协调开始——而非诊断演示

<figure class="product-shot">
  <a href="https://www.abridge.com/product" target="_blank" rel="noreferrer">
    <img src="../../../zh-cn/stage-1/appendix-industry-scenarios/images/products/abridge-note.webp" alt="Abridge 将临床记录链接到其原始对话" loading="lazy" />
  </a>
  <figcaption><strong>Abridge：</strong>生成的临床记录显示在匹配的医患对话上方。链接证据返回到原始内容。关键不在于快速书写，而在于医师能够追踪、编辑并批准每一条记录。</figcaption>
</figure>

**负责工作的人：** 医生、护士、病历团队、保险审核人员和患者服务人员。

医疗负担很大部分来自诊断之外：文档记录、转诊、授权、理赔和患者沟通。麦肯锡的近期案例主要集中在总结、福利问题、拒绝说明、出院指导以及后台工作，而非自主诊断。[麦肯锡：用生成式 AI 解决医疗最大负担](https://www.mckinsey.com/industries/healthcare/our-insights/tackling-healthcares-biggest-burdens-with-generative-ai)

例如 Abridge 这样的环境系统可以从咨询中起草结构化记录，并由医生批准。这种起草-复核-写回的边界在不改变临床责任的前提下减少了纸面工作。[Abridge 医疗系统案例](https://www.abridge.com/press-release/abridge-hartford-healthcare) · [麦肯锡：医疗中的生成式 AI](https://www.mckinsey.com/industries/healthcare/our-insights/generative-ai-in-healthcare-current-trends-and-future-outlook)

在没有临床伙伴、合适数据和合规专业知识的情况下，不要从诊断开始。可以先研究风险较低的患者服务，例如将准备指导转化为逐步清单，或帮助员工整理电话，但需经机构审核。

### 8. 零售和内容运营：一件资产必须经过多个渠道

<figure class="product-shot">
  <a href="https://www.canva.com/newsroom/news/magic-studio/" target="_blank" rel="noreferrer">
    <img src="../../../zh-cn/stage-1/appendix-industry-scenarios/images/products/canva-magic-switch.webp" alt="Canva Magic Switch 菜单用于调整大小、翻译和文档转换" loading="lazy" />
  </a>
  <figcaption><strong>Canva Magic Switch：</strong>同一份批准的设计可以被调整大小、翻译或生成文档。这是内容团队常见的任务，将一个已接受的素材生成适用于多个渠道的不同版本。</figcaption>
</figure>

**负责工作的人：** 电商运营、品牌营销、设计、商品策划和本地化团队。

产品发布不仅仅是一段文字。团队需要解读产品数据，为不同渠道撰写标题和卖点、处理图片、调整尺寸、翻译、检查禁用词，并在反馈后进行更新。大部分时间花在素材搬运和一致性检查上。

德勤的零售展望将个性化、商品管理、供应链和营销列为人工智能的应用领域。Canva Magic Switch 可根据尺寸和语言调整内容，而 Adobe Firefly 则结合了生成、编辑和生产资产。AI 并不取代品牌判断；它减少了制作版本的机械工作。[德勤：2025 年零售行业展望](https://www.deloitte.com/us/en/insights/industry/retail-distribution/retail-distribution-industry-outlook-2025.html) · [Canva Magic Studio](https://www.canva.com/newsroom/news/magic-studio/) · [Adobe Firefly](https://news.adobe.com/news/2025/04/adobe-revolutionizes-ai-assisted-creativity-firefly)

首个版本可以服务单一渠道和单一产品类型：从结构化数据草拟详情页，检查必填字段、尺寸和禁止声明，然后让操作人员发布。它将比“通用营销助手”获得更多有用反馈。

## 消费者：七个用户自行打开产品的时刻

最常见的消费者错误是把七个提示放在同一个聊天框后面。以下产品之所以有效，是因为对话与产品、课程、旅行、画布、音乐或财务数据相连接，使用户能够继续完成任务。

### 1. “减少我的选择”：搜索、比较和购买

<figure class="product-shot product-shot--mobile">
  <a href="https://www.aboutamazon.com/news/retail/amazon-rufus" target="_blank" rel="noreferrer">
    <img src="../../../zh-cn/stage-1/appendix-industry-scenarios/images/products/amazon-rufus.webp" alt="Amazon Rufus 购物助手" loading="lazy" />
  </a>
  <figcaption><strong>Amazon Rufus:</strong> 入口位于亚马逊搜索下方，示例问题为购物任务：比较桌布、为 Prime Day 做准备、寻找可用于睡眠跟踪的手表。它将答案与真实产品连接，而不是提供通用建议。</figcaption>
</figure>

购买相机、婴儿车或雨天通勤鞋的人并不缺少产品页面；他们缺少的是将模糊条件转化为可比较选项的方式。Rufus 结合了目录、评论和问答，而 Capgemini 和 Adobe 都观察到消费者使用 AI 进行发现、比较和售前咨询。[Amazon Rufus](https://www.aboutamazon.com/news/retail/amazon-rufus) · [Adobe：2025 年 AI 与数字趋势](https://business.adobe.com/content/dam/dx/us/en/resources/digital-trends-report-2025/2025_Digital_Trends_Report.pdf)

研究一个难懂的产品类别，而不是词组“AI 购物助手”。租客选择投影仪必须结合投影距离、日光亮度、噪音和预算。展示对比证据、缺失信息和真实产品，而不是编造的专家结论。

### 2. “我不想开二十个标签页”：旅行规划和实时变更

<figure class=“product-shot”>
  <a href=“https://www.expedia.com/newsroom/expedia-launches-conversational-trip-planning-powered-by-chatgpt-to-inspire-members-to-dream-about-travel-in-new-ways/” target=“_blank” rel=“noreferrer”>
    <img src=“../../../zh-cn/stage-1/appendix-industry-scenarios/images/products/expedia-chatgpt.webp” alt=“Expedia conversational trip-planning interface” loading=“lazy” />
  </a>
  <figcaption><strong>Expedia对话规划：</strong>用户先比较毛伊岛和考艾岛的蜜月旅行，然后将酒店建议直接保存到Trips。当对话变成保存的行程和预订操作时，循环结束。</figcaption>
</figure>

旅行规划反复结合目的地、日期、交通、营业时间、预算和同伴偏好。Expedia将开放对话与保存的酒店、价格和预订连接起来。当建议成为可保存、可查看和购买的行程时，旅行AI才有价值——而不是它写出漂亮的指南。[Expedia对话规划]（https://www.expedia.com/newsroom/expedia-launches-conversational-trip-planning-powered-by-chatgpt-to-inspire-members-to-dream-about-travel-in-new-ways/） ·[Expedia AI服务案例]（https://www.expedia.com/newsroom/expedia-group-sets-the-standard-with-ai-powered-service-agent/）

较小的开放时间可能是“带孩子在一个城市待半天”或“演唱会后的安全路线”。Live Facts需要可靠的API，天气、价格和开放时间需要更新时间戳。

### 3.“让我练习，而不仅仅是听”：学习与反馈

<figure class=“product-shot product-shot--portrait”>
  <a href=“https://blog.duolingo.com/duolingo-max/” target=“_blank” rel=“noreferrer”>
    <img src=“../../../zh-cn/stage-1/appendix-industry-scenarios/images/products/duolingo-roleplay.webp” alt=“Duolingo Max 角色扮演练习在巴黎咖啡馆” loading =“lazy” />
  </a>
  <figcaption><strong>Duolingo Max 角色扮演：</strong>练习不是“法语聊天”，而是在巴黎咖啡馆点餐的具体任务。场景、角色、目标和奖励都已准备好，使学习者能够立即练习。</figcaption>
</figure>

生成式人工智能使得曾经昂贵的步骤随时可用：练习并获得反馈。Duolingo Max 通过角色扮演和视频通话进行语言练习;Khanmigo 强调问题和提示，而非直接传授答案。[Duolingo Max]（https://blog.duolingo.com/duolingo-max/） ·[可汗学院：Khanmigo]（https://2023-2024.annualreport.khanacademy.org/khanmigo）

一个产品可以满足一个练习动作：面试回答、口语英语、销售反对意见或论文答辩。反馈应引用实际答案，并提出一个可执行的修改建议，用于下一次尝试，而非泛泛而谈的表扬。

### 4.“给我一个我可以修改的初稿”：个人创作

<figure class=“product-shot”>
  <a href=“https://firefly.adobe.com/” target=“_blank” rel=“noreferrer”>
    <img src=“../../../zh-cn/stage-1/appendix-industry-scenarios/images/products/adobe-firefly.webp” alt=“Adobe Firefly text-to-image workspace” loading=“lazy” />
  </a>
  <figcaption><strong>Adobe Firefly：</strong>真实界面包含模型、宽高比、内容类型、视觉强度、参考资料和多个结果——不仅仅是一个提示框。创意产品让用户控制下一次编辑，而不是一个“重新生成”按钮。</figcaption>
</figure>

对于生日请柬、二手产品照片、短视频封面或俱乐部海报，空白画布和复杂的软件往往是最大的障碍。Canva将生成、背景移除、扩展、调整大小和翻译置于画布中;Firefly则允许创作者在图像、视频、音频和矢量资产之间继续使用。[Canva魔法工作室]（https://www.canva.com/newsroom/news/magic-studio/）·[Adobe Firefly发布]（https://news.adobe.com/news/2025/04/adobe-revolutionizes-ai-assisted-creativity-firefly）

提供控制权，而不仅仅是“重新生成”。一个有用的开场需要明确的文物：房产照片、播客封面，或三种尺寸的活动海报。让用户锁定文字、人物和品牌颜色，同时AI调整一个区域。

### 5.“这次又出了什么问题？”：个性化解释

<figure class=“product-shot”>
  <a href=“https://blog.duolingo.com/duolingo-max/” target=“_blank” rel=“noreferrer”>
    <img src=“../../../zh-cn/stage-1/appendix-industry-scenarios/images/products/duolingo-explain.webp” alt=“Duolingo Max Explain My Answer interface” loading=“lazy” />
  </a>
  <figcaption><strong>解释我的答案：</strong>屏幕引用学习者的回答，解释复数 vestidos 为什么要用 gustan，并允许另一个例子。它恰好满足了“为什么我的答案错了？”的时刻，而不是重新开始一节通用的语法课。</figcaption>
</figure>

同一个答案对初学者和专家来说需要不同的解释。“解释我的答案”是从刚才犯的错误开始的。这比单独的一般问答更自然，因为系统已经知道问题、答案和学习进度。[Duolingo：解释我的答案]（https://blog.duolingo.com/explain-my-answer-now-free/）

同样的模式也适用于练习姿势、相机设置、国际象棋复习或音乐练习：先记录一次真实表现，然后找出最有价值的纠正。没有个人意见的“个性化建议”通常是带有名称的通用内容。

### 6.“不仅仅是推荐——记住”：音乐与持续体验

<figure class=“product-shot product-shot--mobile”>
  <a href=“https://newsroom.spotify.com/2023-02-22/spotify-debuts-a-new-ai-dj-right-in-your-pocket/” target=“_blank” rel=“noreferrer”>
    <img src=“../../../zh-cn/stage-1/appendix-industry-scenarios/images/products/spotify-ai-dj.webp” alt=“Spotify AI DJ player” loading ing=“lazy” />
  </a>
  <figcaption><strong>Spotify AI DJ：</strong>DJ 是一个持续的主屏幕播放条目，直接连接到曲目和控制。它依赖于收听历史、Spotify 目录和下一次播放操作——而不仅仅是生成的主持人声音。</figcaption>
</figure>

Spotify AI DJ 不仅仅是生成介绍。它从长期听觉历史中挑选音乐，并以持续的声音加入体验。偏好数据、内容权利和播放动作比 DJ 的语气更难复制。[Spotify AI DJ]（https://newsroom.spotify.com/2023-02-22/spotify-debuts-a-new-ai-dj-right-in-your-pocket/） ·[德勤：2025 数字媒体趋势]（https://www.deloitte.com/us/en/insights/industry/technology/digital-media-trends-consumption-habits-survey/2025.html）

其他持续的时刻包括跑步、做饭和睡前阅读。产品应调整下一次疗程，调整过去的选择，使纠正变得容易，而不是假装比对方更了解对方。

### 7.“将复杂的规则转化为我的下一步”：个人理财与人身管理

<figure class=“product-shot product-shot--portrait”>
  <a href=“https://turbotax.intuit.com/personal-taxes/mobile-apps/turbotax/” target=“_blank” rel=“noreferrer”>
    <img src=“../../../zh-cn/stage-1/appendix-industry-scenarios/images/products/intuit-assist.jpg” alt=“Intuit Assist 比较 TurboTax 中两年税收抵免” loading = “lazy” />
  </a>
  <figcaption><strong>TurboTax中的Intuit协助：</strong>它不是讨论从无到有的税务，而是比较今年和去年的抵免金额，并提出后续问题，比如申请人可能申领的其他抵免。基础是个人数据和当前任务。</figcaption>
</figure>

税务、信用、保险和账单共享复杂的规则、零散的文件以及每个人不同的下一步步骤。Intuit Assist 出现在 TurboTax、Credit Karma 和 QuickBooks 中，用于将现有财务数据与解释和操作结合起来，而非提供陪伴。[Intuit Assist]（https://www.intuit.com/intuitassist/）

这些产品也存在更高的风险。第一版更适合记录清单、概念解释、账单分类和提醒，并明确区分事实、估算和建议。报税、投资或保险选择需要用户确认并获得专业支持。

## 在哪里可以找到自己的企业或消费者方向

上述案例展示了用例的样貌;它们不是要更换行业名称的指令。你的方向通常隐藏在你能接触到的人、材料和习惯中。商业和消费者调研的起点不同。

### 商业：在整个工作中跟随一个角色

商业材料很少写“这是一个创业机会”。它以职位描述、采购文件、操作手册、软件评审和项目案例的形式出现。选择一个具体角色——出口协调员、物业服务代理、诊所接待员或维修技术员——并跟随工作进展。

<div class=“idea-routes”>
  <div class=“idea-route idea-route--b”>
    <span>在哪里可以寻找业务工作流程</span>
    <ul>
      <li><strong>招聘网站：</strong>学习日常职责、系统、表格和报告。</li>
      <li><strong>招标和采购通知：</strong>查看公司支付的费用;验收标准和界限通常明确。</li>
      <li><strong>软件评测：</strong>在G2、Capterra、应用商店和论坛上看到“仍然导出到Excel”和“每次手动填充”的低评分。</li>
      <li><strong>公司案例和年报：</strong>搜索具有数字化转型、效率或客户服务的公司，以寻找有资金的项目。</li>
      <li><strong>真实工作材料：</strong>旧工单、报价单、清单、帮助信息和培训文件，往往更接近产品切入点，而非行业报告。</li>
    </ul>
  </div>
  <div class=“idea-route idea-route--c”>
    <span>你可以直接使用的查询</span>
    <p><code>维护技术员的日常工作流程</code></p>
    <p><code>物业客户服务招标自动化文件类型：PDF</code></p>
    <p><code>site:g2.com 现场服务软件评测</code></p>
    <p><code>客户支持工作流程痛点报告</code></p>
    <p><code>行业数字化转型案例年度报告</code></p>
  </div>
</div>

如果你对出口贸易感兴趣，不要只搜索“AI export”。阅读协调员职位空缺，记录询问回复、报价、规格核查、交付提醒和海关文件。然后查看真实报价和跨境软件的差评。最有力的开口可能是“英文查询到来后，根据历史价格和产品参数起草报价以确认”，而非通用出口助手。

### 消费者：一天后会发现反复的摩擦

消费者调研始于有人伸手拿起手机。思考搜索、比较、录音、练习、等待和分享。每周都会发生什么？目前用截图、笔记、书签或群聊拼凑出什么？

<div class=“idea-routes”>
  <div class=“idea-route idea-route--c”>
    <span>在哪里可以寻找消费者时刻</span>
    <ul>
      <li><strong>App Store 和 Android 商店：</strong>阅读一星到三星的评价，内容涵盖缺失功能、付款中断以及放弃原因。</li>
      社交<li><strong>平台和Reddit：</strong>搜索“我该怎么做”、“有工具吗”和“推荐”;评论往往会带来真正的限制。</li>
      <li><strong>产品狩猎与排名：</strong>看看新产品解决了哪些小问题，以及评测者希望它下一步做什么。</li>
      <li><strong>趋势和流量报告：</strong>使用谷歌趋势、QuestMobile、iResearch和年度报告来确认持久的群体行为。</li>
      <li><strong>你自己的照片和书签：</strong>重复的截图、未打开的指南和复制的文字，都是未完成的工作流程。</li>
    </ul>
  </div>
  <div class=“idea-route idea-route--b”>
    <span>你可以直接使用的查询</span>
    <p><code>site:reddit.com“真希望有个应用”</code></p>
    <p><code>带孩子旅行，计划得太紧张了</code></p>
    <p><code>预算应用 难度评测</code></p>
    <p><code>产品狩猎人工智能语言学习</code></p>
    <p><code>人工智能应用用户增长报告</code></p>
  </div>
</div>

如果你经常旅行，不要立刻制定“AI行程表”。找出人们为何会保存十个指南：餐厅可能突然关门，年长的同伴需要更少的步骤，或者演唱会晚结束。选择一个反复出现的时刻，让产品成为人们打开的工具，而不是生成的文章。

### 找到素材后不要立刻写代码

至少准备三种证据：一份揭示工作流程的文件、三人提到的同样难题，以及有人已经付费或花时间的替代方案。然后花六十分钟把想法具体化。

<div class=“fieldwork”>
  <div class=“fieldwork__step”><b>01</b><span>请列出一个人</span><p>业务中，陈述角色。消费者请说明生活状况。“企业用户”和“年轻人”过于宽泛。</p></div>
  <div class=“fieldwork__step”><b>02</b><span>观察一次情况</span><p>获取表格、屏幕录制、差评或实际操作，并确定具体堵塞。</p></div>
  <div class=“fieldwork__step”><b>03</b><span>找到三</span>次 <p>同样的问题应该来自三个人或三个来源，而不是一个有趣的抱怨。</p></div>
  <div class=“fieldwork__step”><b>04</b><span>只需一步</span><p>定义输入、输出、评审者和指标，然后再决定 AI 是否适合。</p></div>
</div>

最后，用一句话描述方向，让别人可以想象：

> 当**谁**遇到**哪个时刻**时，他们目前使用**哪些材料或临时方法**来完成**哪项工作**。我将先让 AI 处理**一步**，由**谁**批准结果，并用**哪些改变**来评估其价值。

一个商业示例：

> 当包装线操作员看到错误 E37 时，他们会查阅纸质手册和旧工单。系统检索相关设备型号的相关章节和三步诊断步骤，由维护工程师批准。试点测量平均停机时间。

一个消费者示例：

> 当父母在周末带孩子参观博物馆时，他们目前会根据公共帖子、地图和评价自己安排路线。产品根据孩子的年龄和可用时间生成一个三小时计划，注明开放时间和价格，并在父母批准后添加到日历中。

一旦你的想法如此具体，你就拥有可以进行访谈、制作原型并在小范围内尝试的内容。

## 来源

列表包含**67 个来源**。正文主要侧重于具有明确研究方法和一手案例的报告。券商报告用于观察中国的商业主题，而不是作为用户需求的证据。供应商案例可能带有营销视角，应通过访谈和实际运营数据进行验证。

<details class="source-group">
<summary>1. 整体采用情况与企业价值 (15)</summary>

1. [麦肯锡：生成式人工智能的经济潜力](https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/the-economic-potential-of-generative-ai-the-next-productivity-frontier)
2. [麦肯锡：2025 年的人工智能现状](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai)
3. [普华永道：2025 年全球人工智能就业晴雨表](https://www.pwc.com/gx/en/issues/c-suite-insights/the-leadership-agenda/AI-jobs-barometer.html)
4. [普华永道：2025 年全球劳动力希望与担忧调查](https://www.pwc.com/gr/en/publications/specific-to-all-industries-index/hopes-and-fears-2025.html)
5. [德勤：企业生成式人工智能现状](https://www2.deloitte.com/us/en/pages/about-deloitte/articles/press-releases/state-of-generative-ai.html)
6. [微软：2025 年工作趋势指数](https://www.microsoft.com/en-us/worklab/work-trend-index/2025-the-year-the-frontier-firm-is-born)
7. [IBM：2025 年的 5 大趋势](https://www.ibm.com/thought-leadership/institute-business-value/en-us/report/business-trends-2025)
8. [IBM：2025 年首席数据官研究](https://www.ibm.com/thought-leadership/institute-business-value/en-us/report/2025-cdo)
9. [思科：2025 年人工智能就绪指数](https://www.cisco.com/c/m/en_us/solutions/ai/readiness-index/realizing-the-value-of-ai.html)
10. [安永：2025 年人工智能脉搏调查](https://www.ey.com/en_us/insights/emerging-technologies/pulse-ai-survey)
11. [埃森哲：在生成式人工智能时代重新定义企业模式](https://www.accenture.com/us-en/insights/artificial-intelligence/ai-investments)
12. [埃森哲：用生成式人工智能实现重塑](https://www.accenture.com/us-en/insights/consulting/making-reinvention-real-with-gen-ai)
13. [OpenAI：2025 企业人工智能现状](https://openai.com/business/guides-and-resources/the-state-of-enterprise-ai-2025-report/)
14. [中国信息通信研究院：人工智能发展报告（2024）](https://hrssit.cn/Uploads/file/20241217/1734400434600250.pdf)
15. [CNNIC：生成式人工智能应用发展报告（2025）](https://www3.cnnic.cn/n4/2025/1021/c88-11391.html)

</details>

<details class="source-group">
<summary>2. 行业、岗位和工作流程 (24)</summary>

16. [麦肯锡：通过生成式人工智能解锁盈利的B2B增长]（https://www.mckinsey.com/capabilities/growth-marketing-and-sales/our-insights/unlocking-profitable-b2b-growth-through-gen-ai）
17. [麦肯锡：捕捉生成式人工智能在银行业的全部价值]（https://www.mckinsey.com/industries/financial-services/our-insights/capturing-the-full-value-of-generative-ai-in-banking）
18. [麦肯锡：人工智能驱动的银行——客户服务]（https://www.mckinsey.com/industries/financial-services/our-insights/the-ai-powered-bank-rewiring-for-excellence-in-customer-care）
19. [麦肯锡：保险领域人工智能的未来]（https://www.mckinsey.com/industries/financial-services/our-insights/the-future-of-ai-in-the-insurance-industry）
20. [麦肯锡：用生成式人工智能应对医疗最大负担]（https://www.mckinsey.com/industries/healthcare/our-insights/tackling-healthcares-biggest-burdens-with-generative-ai）
21. [麦肯锡：医疗领域的生成式人工智能]（https://www.mckinsey.com/industries/healthcare/our-insights/generative-ai-in-healthcare-current-trends-and-future-outlook）
22. [德勤：2025年制造业展望]（https://www.deloitte.com/us/en/insights/industry/manufacturing-industrial-products/manufacturing-industry-outlook/2025.html）
23. [德勤：2025年智能制造调查]（https://www2.deloitte.com/us/en/insights/industry/manufacturing/2025-smart-manufacturing-survey.html）
24. [德勤：2025年零售业展望]（https://www.deloitte.com/us/en/insights/industry/retail-distribution/retail-distribution-industry-outlook-2025.html）
25. [德勤：2025年全球医疗保健展望]（https://www.deloitte.com/content/dam/assets-zone1/tw/en/docs/industries/life-sciences-health-care/2025/2025-healthcare-outlook-en.pdf）
26. [埃森哲：商业银行趋势2024]（https://www.accenture.com/content/dam/accenture/final/accenture-com/document-2/Accenture-Commercial-Banking-Trends-2024.pdf）
27. [埃森哲：2026年银行趋势]（https://www.accenture.com/us-en/insights/banking/accenture-banking-trends-2026）
28. [汤森路透：2025 专业服务中的生成式人工智能]（https://www.thomsonreuters.com/en-us/posts/technology/genai-professional-services-report-2025/）
29. [Salesforce：服务状态 2025]（https://www.salesforce.com/news/stories/state-of-service-report-announcement-2025/）
30. [Salesforce：2026年销售现状]（https://www.salesforce.com/en/wp-content/uploads/sites/4/documents/reports/sales/salesforce-state-of-sales-report-2026.pdf）
31. [Adobe：2025 人工智能与数字趋势]（https://business.adobe.com/content/dam/dx/us/en/resources/digital-trends-report-2025/2025_Digital_Trends_Report.pdf）
32. [Adobe：2025 内容创作与管理]（https://business.adobe.com/content/dam/dx/us/en/resources/reports/content-management-digital-trends/2025-ai-and-digital-trends-content-creation-and-management.pdf）
33. [iResearch：2025年中国企业人工智能应用产业研究报告]（https://www.bsia.org.cn/site/content/31686.html）
34. [GitHub：量化Copilot对开发者生产力的影响]（https://github.blog/news-insights/research/research-quantifying-github-copilots-impact-on-developer-productivity-and-happiness/）
35. [西门子×Microsoft：工业副驾驶]（https://news.microsoft.com/source/2024/10/24/siemens-and-microsoft-scale-industrial-ai/）
36. [Abridge：哈特福德医疗环境人工智能案例研究]（https://www.abridge.com/press-release/abridge-hartford-healthcare）
37. [AWS：Sun Life 内部知识助手]（https://aws.amazon.com/solutions/case-studies/sun-life-case-study/）
38. [AWS：ResultsCX 客户服务自动化]（https://aws.amazon.com/solutions/case-studies/resultscx/）
39. [AWS：赛诺菲企业级人工智能助手]（https://aws.amazon.com/solutions/case-studies/sanofi-bedrock-case-study/）

</details>

<details class=“source-group”>
<summary>3. 部署产品和企业案例（10）</summary>

40. [OpenAI：摩根士丹利]（https://openai.com/index/morgan-stanley/）
41. [OpenAI：Klarna]（https://openai.com/index/klarna/）
42. [OpenAI：Moderna]（https://openai.com/index/moderna/）
43. [OpenAI：BBVA]（https://openai.com/index/bbva-2025/）
44. [OpenAI × 普华永道：重新构想首席财务官办公室]（https://openai.com/index/openai-pwc-finance-collaboration/）
45. [Microsoft：西门子现场服务报告]（https://www.microsoft.com/en/customers/story/19736-siemens-ag-germany-dynamics-365-field-service）
46. [AWS：法律及一般文件处理]（https://aws.amazon.com/solutions/case-studies/aws-innovator-legal-and-general/）
47. [AWS × Infosys：医疗保险客户服务助理]（https://aws.amazon.com/blogs/apn/how-infosys-built-aws-generative-ai-based-assistant-for-a-healthcare-payer-company/）
48. [Notion： Notion AI 功能指南]（https://www.notion.com/help/notion-ai-faqs）
49. [Canva：魔法工作室]（https://www.canva.com/newsroom/news/magic-studio/）

</details>

<details class=“source-group”>
<summary>4. 消费品与行为（13）</summary>

50. [Capgemini：2025年消费者关注的事物]（https://www.capgemini.com/insights/research-library/top-consumer-trends-in-2025/）
51. [埃森哲：我、我的品牌与人工智能]（https://www.accenture.com/us-en/insights/consulting/me-my-brand-ai-new-world-consumer-engagement）
52. [德勤：2025数字媒体趋势]（https://www.deloitte.com/us/en/insights/industry/technology/digital-media-trends-consumption-habits-survey/2025.html）
53. [QuestMobile：2025年中国移动互联网春季报告]（https://www.questmobile.cn/research/report/1919961024158601218/）
54. [QuestMobile：2025年8月人工智能应用行业报告]（https://www.questmobile.com.cn/research/report/1967853261412208641/）
55. [iResearch：2025年中国AI应用流量分析报告]（https://www.etc.org.cn/UserFiles/Article/file/6388341575962762472758248.pdf）
56. [亚马逊：Rufus购物助理]（https://www.aboutamazon.com/news/retail/amazon-rufus）
57. [Expedia：对话式旅行规划]（https://www.expedia.com/newsroom/expedia-launches-conversational-trip-planning-powered-by-chatgpt-to-inspire-members-to-dream-about-travel-in-new-ways/）
58. [Duolingo：Duolingo Max]（https://blog.duolingo.com/duolingo-max/）
59. [汗学院：汗米戈]（https://2023-2024.annualreport.khanacademy.org/khanmigo）
60. [Spotify：AI DJ]（https://newsroom.spotify.com/2023-02-22/spotify-debuts-a-new-ai-dj-right-in-your-pocket/）
61. [Intuit：Intuit 辅助]（https://www.intuit.com/intuitassist/）
62. [土坯：萤火虫]（https://news.adobe.com/news/2025/04/adobe-revolutionizes-ai-assisted-creativity-firefly）

</details>

<details class=“source-group”>
<summary>5. 中国经纪研究（5）</summary>

63. [中国财富证券：WAIC后AI应用商业化]（https://pdf.dfcfw.com/pdf/H3_AP202507291717868704_1.pdf）
64. [国信证券：AI特别报告——AI代理]（https://pdf.dfcfw.com/pdf/H3_AP202503121644302597_1.pdf）
65. [苏州证券：2025年人工智能应用采用趋势]（https://pdf.dfcfw.com/pdf/H301_AP202501021641518997_1.pdf）
66. [BOC International：“人工智能”应用与平台]（https://pdf.dfcfw.com/pdf/H3_AP202510201765533690_1.pdf）
67. [AIGC行业报告：计算、模型与应用创新的整合]（https://pdf.dfcfw.com/pdf/H3_AP202411151640914780_1.pdf）

</details>

<p 类=“source-footnote”>来源检索并整理于2026年8月。百分比取决于样本、地区和供应商定义，无法替代目标用户的访谈和试验数据。</p>

<式瞄准镜>
.research-note {
  显示：网格;
  网格模板列：minmax（0， 1.1fr） minmax（0， 1fr）;
  间隙：24像素;
  边距：32px 0 42px;
  填充：28像素;
  边框：1px实心变色（--VP-C-分隔）;
  边界半径：20px;
  背景：
    径向渐变（圆圈8% 12%，色混合（SRGB中，变色（--VP-C-品牌-1）16%，透明），透明34%）
    VAR（--vp-c-bg-soft）;
}

.research-note__eyebrow {
  显示：方块;
  边距底部：10px;
  颜色：VAR（--VP-C-Brand-1）;
  字体大小：12px;
  字体粗大：700;
  字母间距：0.12em;
}

.research-note strong {
  显示：方块;
  字体大小：21px;
  线高：1.5;
}

.research-note p {
  优势：0;
  颜色：var（--vp-c-text-2）;
  线高：1.8;
}

.scene-check {
  边距：24px 0 38px;
  填充：18像素 20像素;
  边框左侧：3px实心变色（--VP-C-Brand-1）;
  边框半径：0 12px 12px 0;
  背景：VAR（--VP-C-BG-Soft）;
}

.scene-check span {
  颜色：VAR（--VP-C-Brand-1）;
  字体大小：13px;
  字体粗大：700;
}

.scene-check p {
  边距：6px 0 0;
}

.product-shot {
  边距：20px 0 30px;
  溢出：隐藏;
  边框：1px实心变色（--VP-C-分隔）;
  边框半径：18px;
  背景：VAR（--VP-C-BG-Soft）;
  盒影：0 14px 38px 色彩混合（srgb，var（--vp-c-text-1） 8%，透明）;
}

.product-shot a {
  显示：方块;
  背景：#f5f5f3;
}

.product-shot img {
  显示：方块;
  宽度：100%;
  最大高度：520像素;
  对象拟合：包含;
}

.product-shot--portrait img {
  最大高度：560像素;
}

.product-shot--mobile img {
  最大高度：520像素;
}

.product-shot figcaption {
  填充：14px 17px 16px;
  边框顶端：1px实心变色（--VP-C-分隔）;
  颜色：var（--vp-c-text-2）;
  字体大小：13px;
  线高：1.75;
}

.product-shot figcaption strong {
  颜色：var（--vp-c-text-1）;
}

.idea-routes {
  显示：网格;
  网格模板列：minmax（0， 1.25fr） minmax（240px， .75fr）;
  间隙：14像素;
  边距：24px 0 28px;
}

.idea-route {
  填充：22像素;
  边框：1px实心变色（--VP-C-分隔）;
  边框半径：18px;
}

.idea-route--b {
  背景：颜色混合（SRGB，VAR（--VP-C-品牌软）58%，VAR（--VP-C-BG））;
}

.idea-route--c {
  背景：VAR（--VP-C-BG-Soft）;
}

.idea-route > span {
  显示：方块;
  margin-bottom：12px;
  颜色：VAR（--VP-C-Brand-1）;
  字体大小：13px;
  字体粗大：700;
}

.idea-route ul {
  优势：0;
  左侧垫：20像素;
}

.idea-route li {
  边距：10px 0;
}

.idea-route p {
  边距：8px 0;
}

.idea-route code {
  空白：正常;
  词分段：分词;
}

.fieldwork {
  显示：网格;
  grid-template-columns： repeat（2， minmax（0， 1fr））;
  间隙：14像素;
  边距：28px 0 34px;
}

.fieldwork__step {
  最小高度：150像素;
  填充：20像素;
  边框：1px实心变色（--VP-C-分隔）;
  边界半径：16px;
  背景：VAR（--VP-C-BG-Soft）;
}

.fieldwork__step b {
  显示：方块;
  颜色：VAR（--VP-C-Brand-1）;
  字体大小：12px;
  字距：0.1 em;
}

.fieldwork__step span {
  显示：方块;
  margin-top：12px;
  字体大小：18px;
  字体粗大：700;
}

.fieldwork__step p {
  边距：8px 0 0;
  颜色：var（--vp-c-text-2）;
}

.source-group {
  边距：12px 0;
  边框：1px实心变色（--VP-C-分隔）;
  边界半径：14px;
  背景：VAR（--VP-C-BG-Soft）;
}

.source-group summary {
  填充：16像素 18像素;
  光标：指针;
  字体粗大：700;
}

.source-group ol {
  margin: 0;
  padding: 0 22px 18px 44px;
}

.source-group li {
  margin: 8px 0;
}

.source-footnote {
  margin-top: 18px;
  color: var(--vp-c-text-3);
  font-size: 13px;
}

@media (max-width: 720px) {
  .research-note,
  .idea-routes,
  .fieldwork {
    grid-template-columns: 1fr;
  }

  .research-note {
    padding: 22px;
  }

  .fieldwork__step {
    min-height: auto;
  }
}
</style>