# 用UI设计指南设计页面和按钮

很多人说“我希望页面看起来更像苹果”或“我希望按钮感觉更高级”，但当它们真正开始工作时，他们常常卡在一个问题上：

**我到底应该引用什么？**

盯着截图并复制它们只会让你判断某件事是否“相似”。但当你打开苹果、谷歌、Microsoft和Atlassian的设计指南时，你会发现让他们印象深刻的并不是视觉风格——而是**他们清晰地表达了设计问题**：页面上应该先高亮什么，如何排序按钮，如何强调动作。这些判断标准才是真正的核心。

> 参考设计指南并不是要让某样东西“看起来像别人的作品”——而是学习别人如何做设计决策。

::: 信息 为什么现在才学这个
设计规则已经被训练成模型，成为设计工具的默认标准，AI甚至能从几张截图中学习。但理解这些规则的来源以及为何如此定义仍然值得。
:::

## 首先，读几段摘录，感受一下不同

如果你曾经认为“设计指南只是关于风格”，那么先读几句官方资料。

在日常的团队讨论中，我们常说：

- 做一个下拉菜单
- 把菜单放这里
- 在菜单栏中添加一些功能
- 这里放两个按钮，一个确认，一个取消

听起来不错，但在主要设计指南中，这些术语并非模糊的概念——它们被详细拆解。

|我们随口说的话 |官方来源 |简而言之 |
|:--- |:--- |:--- |
|“创建菜单” |苹果： [“菜单显示其选项......”]（https://developer.apple.com/design/human-interface-guidelines/menus） |`Menu` 用于触发动作 |
|“将功能放入菜单栏” |苹果： [“菜单栏菜单包含所有命令......”]（https://developer.apple.com/design/human-interface-guidelines/menus） |这是顶部的应用级命令菜单 |
|“创建一个下拉菜单” |苹果：“弹出列表允许用户在多个选项中选择一个。”（https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/MenuList/Articles/ManagingPopUpItems.html） |`pop-up` 用于从列表中选择一个值 |
|“也制作下拉菜单” |苹果：“拉拉列表通常用于在特定上下文中选择命令。”]（https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/MenuList/Articles/ManagingPopUpItems.html） |`pull-down` 用于触发上下文特定命令 |
|“菜单不能也用于筛选吗？” |流利：“如果你需要从别人那里收集信息，可以试试选择、下拉或组合框。”（https://fluent2.microsoft.design/components/web/react/core/menu/usage） |`Menu` 不用于选择值 |
|“菜单不能用于导航吗？” |材料：“菜单不应作为应用内的主要导航方式。”]（https://m1.material.io/components/menus.html） |`Menu` 不是主要导航 |
|“只需在按钮上写上 OK / 取消” |苹果： [“总是用'取消'来命名取消警报动作的按钮。”]（https://developer.apple.com/design/human-interface-guidelines/alerts） |按钮标签不应是任意的 |

> 表格中的所有报价均可点击，并会引导您进入相应的官方页面。

这是人们第一次阅读设计指南时最震撼的：

> 我们常常以为自己在讨论UI，但大多数时候我们只是用一堆模糊的词来交流。

苹果不会只是说“制作菜单”;它还进一步区分：

- `menu`
- `menu bar menu`
- `pop-up button`
- `pull-down button`
- `context menu`

Fluent不仅仅是说“下拉菜单”;它还进一步区分了：

- `menu`
- `dropdown`
- `select`
- `combobox`

这就是为什么设计指南是必要的。

它们的存在不是为了让页面看起来更专业，而是为了当团队讨论界面时，大家不会脑海中浮现出不同的画面。

## 你将学到什么

1. 为什么在设计页面和按钮前应先看设计指南
2. Apple、Material、Fluent和Atlassian指南中哪些部分最值得参考
3. 如何设计清晰的“页面层级”和“按钮层级”
4. 如何让AI在生成页面和按钮时参考既定指南

## 1.为什么设计指南能帮助你构建更清晰的页面

阅读上述摘录后，你会注意到一个关键点：

**设计指南不是锦上添花——它们首先要把术语用对。**

许多页面看起来不好看，不是因为色彩调色板不够复杂，而是因为信息层级结构混乱。

许多按钮无法使用，不是因为边框半径错误，而是：

- 主按钮太多，用户不知道该点击哪个
- 破坏性按钮看起来和普通按钮一样
- 页面上的每个按钮都在争夺注意力
- 不同页面的按钮样式和语义不一致

成熟的设计指南正是为了解决这些问题而存在。它们通常定义：

|指南内容 |它解决了什么问题 |
|:--- |:--- |
|**页面层级** |先看哪里，接下来看哪里，如何组织信息 |
|**视觉基础** |如何统一颜色、间距、排版、边框半径、阴影 |
|**按钮层级** |如何区分主按钮、次按钮、文本按钮和破坏按钮 |
|**状态规则**如何表示悬停、聚焦、禁用、加载状态 |
|**交互语义** |哪个按钮代表“确认”，哪个按钮意味着“取消”，意味着“更多动作” |

所以设计指南真正提供的不是“皮肤”，而是一套**判断标准**。

## 2.在参考主要设计指导原则时，你应该关注哪些方面

### 2.1 参考苹果：学会“足够精确地定义事物”

最值得从苹果身上学到的，不仅仅是它的视觉克制，更在于它如何细致地定义概念。

对于许多团队随意称为“菜单”或“下拉菜单”的部分，苹果对此进行了进一步细分：

- `menu`：一组命令、选项或状态
- `menu bar menu`：应用级命令集合
- `pop-up button`：选择一个值
- `pull-down button`：在当前上下文中触发命令
- `context menu`：与当前对象或任务相关的常见操作

这一区别至关重要，因为它直接影响：

- 组件是用于选择值还是触发动作
- 它是否属于页面的本地部分或应用层面
- 是否应持续显示当前选择，还是仅暂时展开命令

当你开始以这种细致程度思考时，你设计的页面会突然变得更加清晰。

### 2.2 参考苹果：学习页面层级与约束

苹果的人机界面指南特别适合学习两点：

- 如何在页面上建立清晰的层级结构
- 如何保持控制的明确性而不抢走焦点

苹果强调`Hierarchy`、`Harmony`和`Consistency`。这意味着在设计页面时，你需要回答：

- 当前页面上最重要的信息是什么
- 用户的主要任务是什么
- 哪个动作应最突出，哪个应退却

如果你参考苹果页面设计，重点是：

- 不要让上游内容过于分散;优先关注核心内容
- 利用空白、字体大小和分组来创建顺序，而不是堆叠大量边框
- 不要让所有按钮都过分强调;只有关键动作应最突出

### 2.3 参考资料：学习清晰的页面结构

材质设计非常适合学习“页面如何组织任务流程”。

其许多组件和布局指南旨在帮助您澄清：

- 页面是用于浏览还是执行任务
- 当前页面是否用于阅读、选择或提交
- 页面上哪些元素应保持稳定，哪些应响应上下文变化

如果你参考页面设计材料，重点是：

- 清晰的页面部分，模块职责明确
- 清晰划分导航、内容领域和行动区域
- 对应不同动作优先级的不同按键样式

### 2.4 参考流利：学习组件边界和按钮层级结构

Fluent 2 非常适合管理面板、工具类产品和复杂的表单系统。最值得学习的是它直接告诉你“不要混淆概念”。

例如，它明确指出：如果你想“收集信息”，不要继续使用 `menu`;相反，考虑 `select`、`dropdown` 或 `combobox`。

这句话很重要，因为它打破了许多人“它们基本上都一样”的假设。

流利2还强调：

- 动作层级
- 组成语义边界
- 在密集信息场景下的清晰度

如果你参考Fluent来设计按钮，重点是：

- `Primary button` 表示当前语境中最重要的动作
- `Secondary button` 支持行动
- `Subtle` 和 `Transparent` 低重点按钮，用于不与主流程冲突的动作
- 页面上的按钮越多，你就越需要控制视觉优先级

### 2.5 参考地图集：学习系统管理页面和按钮

Atlassian设计系统特别适合“一个团队制作多页”的情况。它强调：

- 基础作为共享基准
- 代币作为统一视觉决策的方法
- 组件作为可重复使用的交互构建单元

如果你参考Atlassian的页面和按钮，最有价值的方面有：

- 将按钮的大小、颜色、边框半径和间距统一成统一规则
- 固定页面布局的节奏
- 即使内容不同，也使不同页面在结构语言上保持一致

## 3.设计页面时，应该参考指南的哪些部分

当你看一个设计系统时，不要一开始就问“这页看起来好吗？”相反，要先提出以下几个问题。

### 3.1 乍一看，页面层级是否清晰

一页通常至少需要三层：

- **主要信息**：当前页面上最重要的内容
- **辅助信息**：帮助解释或补充的内容
- **次要动作**：不应干扰主要任务的动作

如果这三层没有区分，页面就会变成“一切都重要”，也就是说“没有什么重要的”。

### 3.2 页面布局是否服务于任务，而不仅仅是堆叠模块

参考指南时，特别注意：

- 标题区域是否明确说明页面目的
- 主要内容区域是否围绕任务组织
- 动作按钮是否放置在相关内容附近
- 是否适当淡化次级信息

### 3.3 页面动作是否有明确的优先级

很多页面一眼就能看到6个按钮，每个按钮看起来都像CTA——这就是典型的层级崩溃案例。

更合理的做法是：

- 一个部分通常只有一个主要动作
- 次要动作可以使用轮廓、文本或低强调风格
- 风险行动不应与主要行动看起来相同

## 4.设计纽扣时，应该参考哪些指导原则

按钮是最容易“随便拼凑”的部分，但它们也是最能判断设计系统是否成熟的部分。

### 4.1 先按“语义”分类按钮，再按“样式” 分类

不要一开始就想着“蓝色按钮还是黑色按钮”。首先想想这个按钮起的作用。

常见的按键角色可以分为：

|按钮类型 |目的 |通用风格策略 |
|:--- |:--- |:--- |
|**主要动作**当前部分中最关键的动作 |填充、高对比度、最显著 |
|**次要**辅助动作 |大纲或低重点 |
|**三级 / 文本** |次要动作 |仅文本或低视觉权重 |
|**破坏性**风险操作如删除、禁用、清除 |警告颜色或明显的风险样式 |
|**图标按钮** |本地工具操作 |简约，贴近上下文 |

### 4.2 不要在一页上放太多主按钮

这是初学者最常见的陷阱。

如果一个页面有4个主按钮，那么实际上就没有主要按钮。主按钮的全部意义就是“告诉用户他们现在应该做什么”。

你可以借用许多设计系统中常用的方法：

- 一个主区通常只有一个主按钮
- 取消、返回和关闭通常不应与确认处于同一级别竞争
- 额外操作则进入次要按钮或菜单

### 4.3 按钮应传递状态变化

设计指南通常会明确说明按钮状态：

- 默认状态
- 悬停状态
- 聚焦态
- 残疾状态
- 加载状态
- 破坏性状态

这很重要，因为按钮不是静态图像——它是用户交互中最常被触发的控制按钮之一。

### 4.4 按钮复制也是设计的一部分

按钮标签不仅仅是“文案问题”——它们直接影响用户的理解。

例如：

- `Save`
- `Save Changes`
- `Publish Now`
- `Delete Project`
- `Move to Trash`

这些标签传达的心理期望完全不同。成熟指南通常要求按钮标签清晰表达动作，而非模糊措辞。

## 5.实用的页面和按钮设计清单

自己设计页面时，你可以先快速完成以下清单：

### 页面清单

- 页面标题是否清晰地说明了当前任务  
- 最重要的首屏信息是否一目了然  
- 页面是否按照任务流而不是随意想法进行组织  
- 每个部分是否只有一个主要操作  
- 次要内容是否被适当淡化  

### 按钮检查清单

- 这个按钮是主要操作还是次要操作  
- 为什么它比其他按钮更突出  
- 页面上是否有太多主要按钮  
- 是否明确标注了破坏性操作  
- 按钮标签是否足够具体  

## 6. 如何使用 AI 参考已建立的页面设计指南

本节最实用。

当许多人请 AI 设计页面时，他们只会说：

```md
Make me a settings page, make it look premium, reference Apple's style
```

这种提示太模糊了，AI 通常最终只会模仿“白色背景、圆角、阴影”。

对于初学者来说，更实际的方法不是自己总结所有内容，而是直接将**官方指南中的关键句子**粘贴给 AI。

这样有两个好处：

- 你不需要先自己“翻译”设计理念
- AI 可以更容易根据官方定义理解页面和按钮

### 6.1 示例 1：让 AI 参考 Apple 设计设置页面

首先，从 Apple 官方文本中找到一句话：

> [“建立清晰的视觉层次...”](https://developer.apple.com/design/human-interface-guidelines/)

你可以像这样直接粘贴给 AI：

```md
Reference this sentence from the Apple Human Interface Guidelines:
"Establish a clear visual hierarchy..."

Help me design an account security settings page.
The page hierarchy should be clear, important information first, and groupings should be tidy.
```

这里的关键是：你不需要自己解释太多；只需直接粘贴苹果的原话。

### 6.2 示例 2：让 AI 参考 Fluent 来设计管理员面板按钮

首先，从 Fluent 的官方文本中找到一句话：

> [“在一个布局中只使用一个主要按钮...”](https://fluent2.microsoft.design/components/web/react/core/button/usage)

你可以像这样直接将其粘贴给 AI：

```md
Reference this sentence from Fluent 2:
"Only use one primary button in a layout..."

Help me design the buttons for a team management admin panel.
The "Add Member" button should be most prominent; Export, Filter, and More Actions should be lower emphasis; the Delete button should stand out separately.
```

这个句子对于初学者特别有用，因为它直接告诉 AI：不要在一个区域放太多主要按钮。

### 6.3 示例 3：让 AI 同时参考页面和按钮指南

你也可以一次粘贴两句话原文，让 AI 同时参考页面和按钮指南：

> Apple: ["建立清晰的视觉层次结构..." ](https://developer.apple.com/design/human-interface-guidelines/)
>
> Fluent: ["在布局中只使用一个主要按钮..." ](https://fluent2.microsoft.design/components/web/react/core/button/usage)

然后像这样写:

```md
Reference the following two design guideline excerpts:
Apple: "Establish a clear visual hierarchy..."
Fluent: "Only use one primary button in a layout..."

Help me design a project detail page.
The page includes project introduction, members, recent activity, and settings entry.
The page hierarchy should be clear, keep only one primary button, and make other buttons less prominent.
```

这种方法尤其适合初学者，因为你所需要做的只是复制原始文本，并添加几句关于你自己需求的说明。

## 7. 如何使用 AI 参考按钮指南并直接生成按钮设计

如果你只是想从按钮开始，你也可以直接粘贴按钮指南的摘录。

例如，Atlassian 对按钮的定义非常简短：

> [“按钮触发一个事件或操作。”](https://atlassian.design/components/button/)

你可以这样向 AI 提问：

```md
Reference this sentence from Atlassian:
"A button triggers an event or action."

Help me design a set of button styles for an admin panel.
I need a primary button, a secondary button, and a delete button. Also tell me where each should be used.
```

这种提示特别适合初学者——它基本上是“粘贴原始文本 并说明你的需求”。

## 8. 总结

在参考 UI 设计指南来设计页面和按钮时，最重要的不是“让它看起来像别人的作品”，而是学习以下内容：

1. 使用层级来组织页面，而不是堆叠内容
2. 使用按钮等级来表达操作优先级，而不是让所有按钮都同样引人注目
3. 使用设计指南中的定义、边界和判断标准来引导你的设计
4. 在让 AI 参考已建立的指南时，参考“原则和结构”，而不仅仅是外观

当你以这种方式使用指南时，你不仅仅是在参考一种风格——你在采纳一种成熟的设计思维方式。

---

## 参考资料

以下链接均来自官方设计系统或官方文档：

- Apple 人机界面指南: [概览](https://developer.apple.com/design/human-interface-guidelines/)
- Apple 人机界面指南: [菜单](https://developer.apple.com/design/human-interface-guidelines/menus)
- Apple 人机界面指南: [警报](https://developer.apple.com/design/human-interface-guidelines/alerts)
- Apple 人机界面指南: [按钮](https://developer.apple.com/design/human-interface-guidelines/buttons)
- Apple 档案: [菜单如何工作](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/MenuList/Articles/HowMenusWork.html)
- Apple 档案: [管理弹出按钮和下拉列表](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/MenuList/Articles/ManagingPopUpItems.html)
- 材料设计: [按钮概览](https://m3.material.io/components/buttons/overview)
- 材料设计: [菜单](https://m1.material.io/components/menus.html)
- Microsoft Fluent 2: [开始设计](https://fluent2.microsoft.design/get-started/design)
- Microsoft Fluent 2: [菜单使用](https://fluent2.microsoft.design/components/web/react/core/menu/usage)
- Microsoft Fluent 2: [按钮使用](https://fluent2.microsoft.design/components/web/react/core/button/usage)
- Atlassian 设计系统: [基础](https://atlassian.design/foundations/)
- Atlassian 设计系统: [按钮](https://atlassian.design/components/button/)
