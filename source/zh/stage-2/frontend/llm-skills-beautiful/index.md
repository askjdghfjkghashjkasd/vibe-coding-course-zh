# 用大型语言模型和技能让界面美观：提示词和插件工作流程

在之前的章节中，你已经学会了如何用AI集成开发环境将设计转化为代码，以及如何使用组件库快速构建界面。但你可能也注意到一个尴尬的问题：**即使有同样的要求，AI生成的页面往往感觉有些泛泛**。字体总是Inter，色彩调色板是某种过度使用的紫色渐变，布局是完美对称的卡片网格，页面散发出强烈的“AI生成”感觉。

这其实并不是AI的错。真正的问题是你从未告诉它你想要什么样的**风格**。

想象一下去理发店。如果你只说“给我理发”，发型师可能会选择安全但容易被遗忘的发型。但如果你说“我想要柔和的日式层次波浪、窗帘刘海、及肩长度和浓郁的质地”，你更有可能得到你想要的效果。

人工智能也是如此。**它需要明确的美学方向**才能生成美丽且独特的界面。

本章介绍了两种实用方法，使AI生成的界面看起来更美观：

1. **设计良好的提示模板**，这样你才能描述你想要的精准美学
2. **前端技能插件**让AI自动加载可重复使用的设计规则

## 你将学到什么

1. 为什么AI生成的界面默认看起来“正常”的原因
2. 如何通过五维来描述设计风格：排版、色彩、布局、动态和细节
3. 如何使用3个有用的技能插件来美化界面
4. 如何通过提示生成更美观的界面 三种实际场景中的技能

## 1.为什么AI生成的界面默认看起来“普通”？

AI是在大量前端代码上训练的，而这些代码大多采用了安全且高度重复的选择：

|维度 |AI的默认选择 |问题 |
|:--- |:--- |:--- |
|排版 |Inter、Roboto、Arial |太常见，没有个性 |
|颜色 |紫色渐变，蓝色三原色 |科技界过度使用，视觉上令人疲惫 |
|布局 |对称网格，堆叠的卡片 |可预测，不令人印象深刻 |
|运动 |淡入，简单的悬停效果 |不够细腻，缺乏深度 |
|背景 |纯色，简单渐变 |平面且低纹理 |

这些选择单独看都没问题。但**一旦每个AI生成页面都用上了它们，它们就开始显得泛泛无奇且可互换**。

> 💡 **关键见解**：人工智能可以设计，但默认情况下它倾向于**统计平均值**。你的任务是告诉它如何摆脱这个平均值。

## 2.方法一：通过提示描述风格

### 2.1 设计风格的五维

为了生成视觉上强烈的界面，请描述你在这五个维度上的需求：

|维度 |描述内容 |示例关键词 |
|:--- |:--- |:--- |
|**排版** |标题用显示字体，正文用可读字体 |Space Grotesk，Playfair Display，JetBrains 单色 |
|**颜色**原色点缀色，分布不均 |原色 `#4F46E5` 重音 `#F59E0B` |
|**布局**不对称、重叠、破格结构 |便当格网、不对称截面、浮动元素 |
|**动作** |有意义的页面加载和微互动 |错开揭示，滚动触发动作 |
|**细节**背景、阴影、边框、纹理 |颗粒、几何体、渐变网格 |

### 2.2 看看区别：通用提示与美学提示

让我们比较同一登录页面的两个提示。

**通用提示：**

```text
Please build a landing page for an AI writing assistant. Include a navbar, hero section, feature section, pricing section, and footer.
```

**美化提示：**

```text
Please build a landing page for an AI writing assistant with the following style requirements:

**Aesthetic style: Neubrutalism**

**Typography:**
- Headings: Space Grotesk, weight 700-900
- Body: IBM Plex Sans, weight 400

**Colors:**
- Primary: #000000
- Accent: #FF6B00
- Background: #FFFDF0
- Borders: 3px solid black

**Layout:**
- Asymmetrical composition
- Bold black dividers between regions
- Cards with hard shadows (box-shadow: 8px 8px 0px #000)
- Strong contrast through generous whitespace

**Motion:**
- Elements pop in from below on page load
- Buttons shift upward by 2px on hover

**Details:**
- All corners set to 0px
- Buttons should feel strongly 3D
- Add subtle grain texture to the background
```

第二个提示为 AI 提供了足够的方向，使其能够生成大胆且令人难忘的内容，而不仅仅是功能性的内容。

### 2.3 前端美化技能资源列表

你不需要从零发明每一个样式提示。以下是一些有用的资源：

| 仓库 | 内容 | 星标 | 链接 |
|:---|:---|:---|:---|
| **ui-ux-pro-max-skill** | 57 种样式，95 种配色系统，56 种字体组合 | 10k | [GitHub](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) |
| **antigravity-awesome-skills** | 帮助避免通用 AI 视觉模式 | - | [GitHub](https://github.com/sickn33/antigravity-awesome-skills) |
| **superdesigndev/superdesign** | AI 原生 UI 开发工具 | 4.7k | [GitHub](https://github.com/superdesigndev/superdesign) |
| **anthropics/skills/frontend-design** | Anthropic 官方前端设计技能 | - | [GitHub](https://github.com/anthropics/skills) |

> 💡 更多样式提示，请参见 [附录：样式提示备忘单](#style-prompts)。

### 2.5 三个可靠的样式模板

以下是三个经过验证的模板，你可以直接复制并进行调整。

#### 模板 1：极简主义

```text
**Aesthetic style: Minimalism**

**Typography:**
- Headings: PP Neue Montreal, weight 500-700
- Body: Inter, weight 400

**Colors:**
- Primary: #FFFFFF
- Text: #1A1A1A
- Accent: #3B82F6, used sparingly

**Layout:**
- Large amounts of whitespace (minimum 64px section padding)
- One-column or two-column centered layout
- Use spacing instead of divider lines

**Motion:**
- Slow fade-in transitions (duration 600ms)
- Soft color transitions on hover

**Details:**
- Radius: 8px
- Shadows: subtle (0 4px 12px rgba(0,0,0,0.08))
- No decorative background elements
```

#### 模板 2：玻璃拟态

```text
**Aesthetic style: Glassmorphism**

**Typography:**
- Headings: Outfit, weight 600-800
- Body: Plus Jakarta Sans, weight 400-500

**Colors:**
- Background: gradient from #667eea to #764ba2
- Card background: rgba(255, 255, 255, 0.1)
- Text: #FFFFFF

**Layout:**
- Floating card design
- Slight overlap between cards

**Motion:**
- Cards appear in staggered sequence on page load
- Cards scale to 1.05x on hover

**Details:**
- Radius: 20px
- Blur: backdrop-blur-xl
- Border: 1px rgba(255, 255, 255, 0.2)
- Subtle glow effects
```

#### 模板 3：便当网格

```text
**Aesthetic style: Bento Grid**

**Typography:**
- Headings: SF Pro Display, weight 700
- Body: SF Pro Text, weight 400

**Colors:**
- Background: #F5F5F7
- Cards: #FFFFFF
- Accent: #0071E3

**Layout:**
- Grid-based composition with mixed card sizes
- 16px gaps
- 24px radius

**Motion:**
- Subtle hover lift
- Press feedback on click

**Details:**
- Large cards for primary content
- Smaller cards for secondary info
- Use icons to replace some text
- Clean shadows (0 4px 24px rgba(0,0,0,0.06))
```

## 3. 方法二：使用 Skills 插件自动加载设计规则

每次手动编写写作风格提示很累人。**Skills** 是可重复使用的设计规则包，可以安装一次并重复应用。

### 3.1 三个让界面更好看的 Skills

| 技能 | 主要优势 | 安装命令 |
| :--- | :--- | :--- |
| **UI/UX Pro Max** | 67 种风格，96 种配色系统，57 种字体组合 | `npm install -g uipro-cli && uipro init --ai claude` |
| **frontend-design** | Anthropic 官方 Skill，专注于避免通用 AI 审美 | `npx skills add anthropics/skills/frontend-design` |
| **SuperDesign** | IDE 插件，可生成多种设计变体 | 在 VS Code 扩展市场搜索 `SuperDesign` |

### 3.2 安装 UI/UX Pro Max

UI/UX Pro Max 是最完整的设计规则 Skills 包之一。它包括：

- **67 种 UI 风格**：Glassmorphism、Neumorphism、Brutalism、Bento Grid 等
- **96 种配色系统**：按产品类型组织，如 SaaS、电商和社交应用
- **57 种字体组合**：经过专业设计师验证的组合
- **100 条设计规则**：间距、圆角、阴影等

**安装步骤：**

```bash
# 1. Install the CLI globally
npm install -g uipro-cli

# 2. Initialize it for your AI tool
uipro init --ai claude
# or
uipro init --ai cursor
# or
uipro init --ai trae
```

安装完成后，您只需说：

```text
Use UI/UX Pro Max's Glassmorphism style to build me a landing page for an AI writing assistant.
```

AI 将自动应用匹配的排版、颜色和布局规范。

### 3.3 安装 Anthropic 官方 `frontend-design` 技能

这是 Anthropic 官方的前端设计技能，专门用于防止生成通用 AI 输出：

```bash
# Run in Claude Code
npx skills add anthropics/skills/frontend-design
```

安装后，AI 倾向于避免：

- ❌ Inter、Roboto、Arial 字体
- ❌ 紫色渐变背景
- ❌ 对称的网格布局
- ❌ 过于柔和的阴影

而它会倾向于：

- ✅ 更有特色的字体组合
- ✅ 具有更强主色并带有锐利点缀的颜色
- ✅ 非对称或重叠的布局
- ✅ 更有质感的背景，如颗粒和几何图案

## 4. 实际场景一：使用美学提示重设计登陆页面

让我们把刚学到的知识运用起来，把一个普通的登陆页面变得更吸引人。

### 4.1 简单版

首先查看 AI 使用通用提示给出的结果：

```text
Please build a landing page for a pet adoption platform. Include:
- a navbar (logo, links, sign-up button)
- a hero section (headline, subheadline, CTA button, pet image)
- a pet gallery (three pet cards)
- an about-us section
- a footer
```

结果可能会有效果，但感觉会相当普通。

### 4.2 改进版本

现在添加样式指导：

```text
Please build a landing page for a pet adoption platform with the following design requirements:

**Aesthetic style: warm, soft, with a hand-drawn feeling**

**Typography:**
- Headings: Nunito, weight 700-800
- Body: Nunito, weight 400-600

**Colors:**
- Primary: #FFB347
- Secondary: #FFCCB3
- Background: #FFF8F0
- Text: #5D4037

**Layout:**
- Rounded cards (border-radius: 24px)
- Slightly tilted cards at different angles
- Floating and overlapping elements

**Motion:**
- Elements slide in from both sides on page load
- Pet cards slightly rotate on hover like an animal tilting its head
- Buttons bounce on hover

**Details:**
- Use 16-24px radii throughout
- Warm soft shadows (0 8px 24px rgba(255,179,71,0.3))
- Add paw-print decorations in the background
- Use irregular image crops via clip-path
- Use outline-style hand-drawn icons
```

该版本将生成一个更加温暖、情感上更有说服力的界面。

## 5. 实际场景二：使用技能快速生成仪表板

技能对于管理员仪表板和内部系统特别有用，这些系统中许多页面共享相同的设计语言。

### 5.1 使用 UI/UX Pro Max

```text
Use UI/UX Pro Max's Dashboard Dark style and build a dashboard page for a SaaS admin panel that includes:

**Top:** Four stats cards (users, active users, revenue, API calls)

**Middle:**
- Left: 7-day user growth line chart
- Right: subscription plan distribution pie chart

**Bottom:** a recent activity list showing time, user, and action
```

该技能将自动应用一致的仪表板外观：

- 深灰色背景，例如 `#1A1A2E`
- 高对比度卡片，如 `#16213E`
- 明亮的数据颜色，如蓝色、绿色和橙色
- 带有轻微玻璃化效果的浮动卡片

### 5.2 使用 `frontend-design`

```text
Use the frontend-design skill and build a homepage for a personal blog. Make it distinctive and full of personality.
```

AI 通常会选择更具体的美学方向，例如复古未来主义或编辑杂志风格，并通过排版、颜色和布局决策来实现它，从而打破通用模式。

## 6. 实际场景三：创建你自己的设计系统技能

如果你的产品已经有固定的品牌风格，你可以创建自己的技能，这样每个 AI 生成的页面都会自动遵循该风格。

### 6.1 创建技能文件

在你的项目中创建 `.claude/skills/my-brand/SKILL.md` ：

````markdown
---
name: my-brand
description: My project's custom design system, ensuring every UI follows a consistent visual language
---

# My Project Design System

## Brand Colors
- Primary: #6366F1 (Indigo 500)
- Secondary: #8B5CF6 (Violet 500)
- Success: #10B981
- Warning: #F59E0B
- Error: #EF4444
- Background: #F9FAFB
- Card: #FFFFFF

## Typography
- Headings: Plus Jakarta Sans
  - H1: 700, 48px
  - H2: 600, 36px
  - H3: 600, 24px
- Body: Inter
  - Body: 400, 16px
  - Small: 400, 14px

## Spacing
- Base unit: 4px
- Component padding: 8px / 12px / 16px
- Section spacing: 24px / 32px / 48px
- Page margin: 64px

## Radius
- Buttons: 8px
- Cards: 12px
- Inputs: 8px
- Modals: 16px

## Shadows
- Small: 0 1px 3px rgba(0,0,0,0.1)
- Medium: 0 4px 12px rgba(0,0,0,0.1)
- Large: 0 8px 24px rgba(0,0,0,0.12)

## Motion
- Transition duration: 150ms / 300ms
- Easing: cubic-bezier(0.4, 0, 0.2, 1)
- Hover effect: slight scale-up (scale-105)

## Forbidden Styles
- Do not use purple gradient backgrounds
- Do not use fonts other than Inter for body text
- Do not use radii larger than 16px
- Do not use pure black (#000000); use #1F2937 instead
````

### 6.2 使用你的自定义技能

创建后，你只需说：

```text
Use my-brand skill to build me a user settings page.
```

AI 将自动应用您的颜色、字体、间距系统以及其他设计约束。

## 7. 总结

让 AI 生成更好看的界面有两种主要方法：

| 方法 | 优势 | 弱点 | 适合 |
| :--- | :--- | :--- | :--- |
| **提示描述** | 灵活，每次都容易变化 | 必须重复 | 一次性页面，风格探索 |
| **技能插件** | 安装一次，收益持续 | 需要设置 | 视觉系统稳定的项目 |

**建议的风格编码工作流程：**

1. **探索阶段**：尝试不同的提示风格，以找到您喜欢的美学方向
2. **选择风格后**：安装匹配的技能，例如 UI/UX Pro Max 或 `frontend-design`
3. **针对品牌驱动的产品**：构建您自己的技能，使整个项目保持视觉一致性

### 实践

尝试以下操作之一：

1. 使用基于提示的设计指令，用更强的视觉风格重新设计您之前的项目
2. 安装 UI/UX Pro Max 并使用其风格之一生成新页面
3. 使用您喜欢的颜色和排版创建您自己的设计系统技能

---

## 附录：风格速查表

| 风格 | 关键词 | 适合 | 示例 |
| :--- | :--- | :--- | :--- |
| **极简主义** | 空白，单色调，清爽 | 高端产品，作品集 | 苹果 |
| **玻璃拟态** | 磨砂玻璃，模糊，渐变 | SaaS 登陆页，科技工具 | macOS Big Sur |
| **新粗野主义** | 粗边框，硬阴影，实心填充 | 创意品牌，艺术网站 | Brassius |
| **便当网格** | 模块化卡片，拼贴布局 | 仪表盘，功能展示 | 苹果营销页面 |
| **复古未来主义** | 霓虹灯，合成波，暗对比 | 游戏，音乐，娱乐 | 《怪奇物语》美学 |
| **手绘风** | 不规则，柔和，插画感 | 教育，儿童产品 | 多邻国风格 |
| **编辑/杂志风** | 超大字体，非对称，留白 | 博客，内容网站 | Medium 风格布局 |
| **黑暗奢华** | 深色调，金色点缀，精致细节 | 高端与奢侈品 | 奢侈品牌网站 |

## 附录：技能安装速查表

```bash
# UI/UX Pro Max
npm install -g uipro-cli
uipro init --ai claude

# Anthropic frontend-design
npx skills add anthropics/skills/frontend-design

# Anthropic brand-guidelines
npx skills add anthropics/skills/brand-guidelines

# Check installed Skills in Claude Code
/help
```

## 附录：推荐色彩系统

|调色板 |主色调 |口音 |背景 |氛围 |
|:--- |:--- |:--- |:--- |:--- |
|**日落** |#F97316 |#FBBF24 |#FFF7ED |温暖，充满活力 |
|**海洋** |#0EA5E9 |#06B6D4 |#F0F9FF |新鲜、专业 |
|**森林**#10B981 |#34D399 |#ECFDF5 |自然，健康 |
|**浆果** |#8B5CF6 |#EC4899 |#FAF5FF |浪漫，富有创意 |
|**咖啡** |#78350F |#D97706 |#FFFBEB |温暖，复古 |
|**单石**#6B7280 |#9CA3AF |#F9FAFB |中立，专业 |

## 附录：风格提示小抄 {#style-prompts}

在提示改善前端界面时，你可以尝试一些有用的视觉指引：

### 风格分类

|风格 |英语关键词 |核心视觉特征 |示例提示片段 |
|:---|:---|:---|:---|
|**波普艺术** |波普艺术 |大胆的色彩对比、黑色轮廓、半色调纹理 |波普艺术风格网站，大胆的色彩和漫画点，鲜艳 |
|**极简主义**极简主义 |大量留白，几乎没有装饰 |极简网页设计，充裕的空白，几何，宁静 |
|**抽象表现主义**抽象表现主义 |充满活力的笔触，富有表现力的飞溅 |抽象表现主义背景，动态的颜料飞溅，情感 |
|**复古** |复古 / 复古 |复古类型，陈旧纹理，复古调色板 |复古80年代网站设计，霓虹网格和合成波色彩调色板 |
|**赛博朋克**赛博朋克 |霓虹暗对比，故障效果 |赛博朋克界面，霓虹灯配暗背景，故障效果 |
|**中同态写作**中同态写作 |柔和的高光和阴影，凸起或凹陷的表面 |新同态主义设计风格，柔和阴影，干净现代 |
|**生成艺术**生成艺术 |算法流动形状与图案 |生成艺术背景，流动算法图案，数字 |
|**酸性图形**酸性图形 |金属纹理、玻璃效果、混沌字体 |酸性图形网页布局、玻璃态射、混乱字体 |
|**沉浸式3D** |沉浸式3D|高度空间化的场景和产品深度 |沉浸式3D网站，空间互动产品模型 |