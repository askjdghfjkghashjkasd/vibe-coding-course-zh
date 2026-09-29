# 使用现代组件库升级你的界面

在之前的课程中，你已经学会了如何使用设计工具设计界面，使用 AI 集成开发环境 将设计转化为代码，甚至完成一个完整的前端项目。但你可能已经注意到一个问题：当你从零构建按钮、表单和模态框时，它们虽然能用，但仍然感觉有些不够“专业”——样式不够统一，交互细节不够流畅，适配不同屏幕还很麻烦。

这正是 **组件库** 所解决的问题。

组件库是一组预设计并预构建好的 UI 构建块。按钮、输入框、下拉菜单、对话框、表格……这些界面元素在几乎每个产品中都会重复出现。组件库已经通过大规模真实使用为你构建并打磨好了这些元素。你只需像搭积木一样组合它们，就能快速构建专业级界面。

## 你将学到的内容

1. 了解前端组件库是什么，以及为什么现代开发几乎总会使用它  
2. 学习四个代表性组件库及其各自最适合的场景  
3. 通过三个实用场景（登陆页、产品页、管理后台），学习如何在 AI 集成开发环境 中使用组件库进行 Vibe 编码  
4. 学会阅读组件库文档，以便找到合适的组件并正确使用它们  

## 1. 为什么我们需要组件库？

想象一下布置房子。你可以用原木自己制作一把椅子，但常见的方法是去宜家买一把——设计良好、质量稳定、说明清楚，你只需在家组装即可。

组件库就是前端开发的“宜家”。它提供的不是家具，而是界面部件：

| 全手工编码 | 使用组件库 |
| :--- | :--- |
| 你自己处理样式、交互和动画 | 开箱即可使用，样式和交互已打磨完善 |
| 不同页面上的按钮可能会不一样 | 全局统一样式，自动保持一致性 |
| 移动端/平板适配需要额外工作 | 大多数组件库已经包含响应式支持 |
| 无障碍容易被忽略 | 专业库已经处理了键盘导航、屏幕阅读等 |
| 开发速度慢 | 开发速度快，更专注于业务逻辑 |

简而言之：**组件库让你把时间花在“做什么”而不是“怎么绘制”。**

### 清楚地看清：相同需求，有组件库和没有组件库的区别

光说不练是不够的。在 Trae 中，我们可以用几乎相同的需求进行两次测试：一次不指定组件库，一次指定组件库。然后对比生成结果。

**示例 1：不使用组件库**

```text
Please help me build a data dashboard page for an AI writing assistant, including:
- a top title bar and an export button
- four statistic cards showing user count, active users, document count, and revenue, with trend changes
- one line chart and one pie chart
- a user list table with pagination
- a left navigation sidebar
```

直接在 Trae 中运行的结果：

<!-- TODO: 替换为在 Trae 中生成的没有组件库的仪表板截图 -->
<!-- ![Trae 生成的仪表板（没有组件库）](images/compare-without-lib.png) -->

**提示 2：使用 shadcn/ui 组件库**

```text
Please help me build a data dashboard page for an AI writing assistant using the shadcn/ui component library, including:
- a top title bar and an export button
- four statistic cards showing user count, active users, document count, and revenue, with trend changes
- one line chart and one pie chart
- a user list table with pagination
- a left navigation sidebar
```

在 Trae 中直接运行的结果：

<!-- TODO: 用 Trae 和 shadcn/ui 生成的仪表盘截图替换 -->
<!-- ![Trae 生成的仪表盘（使用 shadcn/ui）](images/compare-with-lib.png) -->

需求相同。唯一的区别是在提示的开头添加 `shadcn/ui + Tailwind CSS`。但生成的结果在视觉一致性、交互细节和整体打磨上跃升到完全不同的水平。这就是组件库带来的“免费升级”——你只需在提示中添加一个库的名字。

## 2. 了解四大核心组件库

有很多组件库（完整列表见[附录](#appendix-more-component-libraries)），但你只需先了解这四个具有代表性的：

| 组件库 | 框架 | 一句话定位 | 网站 |
| :--- | :--- | :--- | :--- |
| [Ant Design](https://ant.design) | React | 由蚂蚁集团出品；企业后台系统的事实标准，组件覆盖面非常广 | ant.design |
| [shadcn/ui](https://ui.shadcn.com) | React | 不需要大 npm 安装包；将组件代码直接复制到项目中，基于 Tailwind CSS 构建，自定义自由度最大 | ui.shadcn.com |
| [HeroUI](https://heroui.com)（前 NextUI） | React | 默认样式精美，动画流畅；非常适合视觉要求高的落地页和产品展示 | heroui.com |
| [Material UI](https://mui.com) | React | 最成熟的 React 组件库，实现谷歌 Material Design，生态最完善 | mui.com |

> Vue 用户也有丰富的选择：[Element Plus](https://element-plus.org)（中国最受欢迎）、[Ant Design Vue](https://antdv.com)、[Naive UI](https://www.naiveui.com) 等。参见[附录](#appendix-more-component-libraries)。

不同的库擅长不同的场景。接下来通过三个真实开发场景，你将体验如何在 AI 集成开发环境 组件库中进行 氛围编程。

为了展示不同风格和优势，我们在每个场景中故意使用不同的库。但注意：**这仅是为了让你看到更多选项**。在真实项目中，你完全可以坚持使用自己最喜欢的一个库。例如，如果你喜欢 shadcn/ui，可以用它做落地页、产品页和后台系统。选择一个你觉得好看并且使用舒适的即可——这最重要。

## 3. 场景一：用 HeroUI 构建产品落地页

**场景**：你开发了一个 AI 写作助手，需要一个漂亮的落地页来展示产品功能并吸引用户注册。落地页应具有强烈的视觉冲击、流畅动画和良好的移动端表现。

**为什么选 HeroUI**：HeroUI 默认样式非常精美，过渡动画流畅，非常适合面向用户的展示页面。

### 3.1 创建项目

```bash
# Use the official HeroUI CLI
npx create-heroui-app@latest ai-writer-landing
cd ai-writer-landing
npm install
```

<!-- 待办事项：替换为 HeroUI 首页或组件展示截图 -->
<!-- ![HeroUI 组件库首页](images/heroui-homepage.png) -->

### 3.2 使用 AI 集成开发环境 生成登陆页面

打开你的 AI 集成开发环境（例如 Cursor、Trae 等）并输入：

```text
Please help me build a landing page for an AI writing assistant using the HeroUI component library:

**Page structure:**
1. Top navigation bar: put Logo and product name on the left, three links "Features", "Pricing", "About" on the right, plus a "Get Started" button
2. Hero section: main headline "Make AI your writing partner", subtitle introducing product value, two buttons "Try Free" and "View Demo", and a product screenshot below
3. Feature section: three-column cards introducing "Smart Continuation", "Style Adjustment", and "Multilingual Translation"; each card should have icon, title, and description
4. Pricing section: three pricing cards (Free, Pro, Team), with Pro highlighted as recommended
5. Bottom CTA: one compelling line of copy and a signup button
6. Footer: copyright information and social media links

**Design requirements:**
- modern and professional look
- support dark mode
- should also look good on mobile
```

<!-- TODO：替换为 AI 集成开发环境 生成过程的截图或生成结果 -->
<!-- ![AI 生成的 HeroUI 登录页面](images/heroui-landing-result.png) -->

### 3.3 AI 将使用的关键组件

在 AI 生成的代码中，你会看到这些 HeroUI 组件：

```jsx
import {
  Navbar, NavbarBrand, NavbarContent, NavbarItem,
  Button,
  Card, CardHeader, CardBody, CardFooter,
  Divider,
  Link,
  Chip
} from '@heroui/react'
```

每个组件的作用：

| 组件 | 用途 | 在登陆页的位置 |
| :--- | :--- | :--- |
| `Navbar` | 顶部导航栏 | 页面顶部，固定 |
| `Button` | 具有多种变体和颜色的按钮 | CTA 按钮，导航按钮 |
| `Card` | 卡片容器 | 功能卡片，定价卡片 |
| `Chip` | 小徽章/标签 | “推荐”、“最受欢迎”标记 |
| `Divider` | 分隔线 | 用于在各部分之间视觉分隔 |

### 3.4 迭代与优化

首次生成的版本可能并不完美。请继续与 AI 对话：

```text
Please help me improve the landing page:

1. Add a gradient color to the main headline, from blue to purple
2. Add a hover lift animation to feature cards
3. Highlight the Pro pricing card with a border and a "Most Popular" badge
4. On mobile, change the nav bar to a hamburger menu (three horizontal lines)
```

<!-- TODO: 替换为迭代后的登录页面截图 -->
<!-- ![迭代后的登录页面](images/heroui-landing-iterated.png) -->

> **氛围编程 的核心理念**：你不需要记住每一个组件的 API。只需用自然语言描述你想要的效果，AI 会选择合适的组件并实现。如果效果不理想，可以在对话中继续迭代。

## 4. 场景二：使用 shadcn/ui 构建产品界面

**场景**：你的 AI 写作助手需要一个已登录的主界面——左侧是文档列表，右侧是编辑器，上方是工具栏。这是一个功能完整的产品页面，需要高度可定制的 UI。

**为什么选择 shadcn/ui**：shadcn/ui 将组件代码直接放入你的项目中，因此你可以自由修改任何细节。对于高度定制的产品界面，这种“拥有代码”的模式是最灵活的。

<!-- TODO: 替换为 shadcn/ui 主页或组件展示截图 -->
<!-- ![shadcn/ui 组件库主页](images/shadcn-homepage.png) -->

### 4.1 创建项目

```bash
# Create a Next.js project
npx create-next-app@latest ai-writer-app --typescript --tailwind --app
cd ai-writer-app

# Initialize shadcn/ui
npx shadcn@latest init

# Add components on demand (do not install everything at once)
npx shadcn@latest add button card input sidebar sheet dialog
```

shadcn/ui 的独特之处：每次你 `add` 一个组件时，它都会将源代码复制到你项目的 `components/ui/` 目录中。你可以打开这些文件，直接编辑样式和行为。

### 4.2 使用 AI 集成开发环境 生成产品界面

```text
Please help me build the main interface of an AI writing assistant using the shadcn/ui component library:

**Overall layout:**
- Left side: a collapsible sidebar, about 280px wide:
  - Put a "New Document" button at the top
  - Below is a document list; each document shows title and last edited time
  - Right-click on a document should allow rename or delete
- Right side: main editor area, split into upper and lower parts:
  - Top toolbar: editable document title, word count, "AI Continue" button, and an "Export" dropdown
  - Bottom editor area: one large text input filling remaining space

**Interaction details:**
- After clicking "AI Continue", the button shows loading state, and AI-generated text appears at the bottom of the editor (shown character by character like a typewriter)
- On mobile, the sidebar becomes a drawer that slides in from the left
- The currently selected document should be highlighted
```

<!-- TODO: 替换为 AI 生成的 shadcn/ui 产品界面截图 -->
<!-- ![由 AI 使用 shadcn/ui 生成的产品页面](images/shadcn-product-result.png) -->

### 4.3 AI 将使用的关键组件

```tsx
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  Sheet,
  SheetContent,
  SheetTrigger
} from '@/components/ui/sheet'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader
} from '@/components/ui/sidebar'
```

| 组件 | 用途 | 产品页面中的位置 |
| :--- | :--- | :--- |
| `Sidebar` | 可折叠侧边栏 | 左侧文档列表 |
| `Sheet` | 移动抽屉 | 移动端侧边栏替代 |
| `DropdownMenu` | 下拉菜单 | “导出”按钮，右键菜单 |
| `Dialog` | 对话框 | 重命名和删除确认 |
| `Button` | 按钮，支持多种变体和加载状态 | 各种操作按钮 |
| `Input` | 输入框 | 文档标题编辑 |

### 4.4 自定义组件样式

shadcn/ui 的优势在于你可以直接修改组件源码。例如，如果你想要更大的按钮圆角：

```text
Please edit components/ui/button.tsx,
change all default button radius from rounded-md to rounded-xl,
and add a subtle shadow effect to the primary variant.
```

AI 将直接修改你项目中的组件文件，而不是覆盖 npm 包的样式——这就是 shadcn/ui “代码所有权”的价值。

<!-- TODO: 替换为显示 shadcn/ui 组件源文件可以在项目中直接编辑的截图 -->
<!-- ![shadcn/ui 组件代码可以在项目中直接编辑](images/shadcn-code-ownership.png) -->

## 5. 场景三：使用 Ant Design 构建管理后台

**场景**：在你的 AI 写作助手上线后，你需要一个管理后台来查看用户数据、管理文档内容以及处理付费订单。管理系统的核心是数据展示和操作效率。

**为什么选择 Ant Design**：Ant Design 在后端系统方面积累最深。表格、表单、图表以及其他业务组件都开箱即用，并且内置了许多企业级交互模式（批量操作、高级筛选、数据导出等）。

<!-- TODO: 替换为 Ant Design 首页或 Pro Components 展示截图 -->
<!-- ![Ant Design 组件库首页](images/antd-homepage.png) -->

### 5.1 创建项目

```bash
# Use Ant Design Pro scaffolding (built-in layout, routing, permissions)
npx create-umi@latest ai-writer-admin
# Choose the Ant Design Pro template
cd ai-writer-admin
npm install
```

或者从头开始：

```bash
npx create-react-app ai-writer-admin --template typescript
cd ai-writer-admin
npm install antd @ant-design/icons @ant-design/pro-components
```

### 5.2 使用 AI 集成开发环境生成管理后台

```text
Please help me build an admin backend for an AI writing assistant using the Ant Design component library:

**Overall layout:**
- Left side menu: Dashboard, User Management, Document Management, Order Management, System Settings
- Top area shows breadcrumb navigation

**User Management page:**
- Top area has four stats cards: total users, today's new users, active users, paid users
- Search/filter area: search by username, select registration time range, filter by user status, plus "Search" and "Reset" buttons
- User table:
  - Show avatar, username, email, registration time, subscription plan (distinguished by different tag colors), status, operations
  - 20 rows per page, with pagination
  - Support batch selection, batch disable, or export
  - Operation column: view details, edit, disable (disable requires secondary confirmation)
- Clicking "View Details" opens a right-side drawer showing detailed user information and recent document list
```

<!-- TODO: 替换为 AI 生成的 Ant Design 管理界面截图 -->
<!-- ![AI 生成的 Ant Design 管理界面](images/antd-admin-result.png) -->

### 5.3 AI 将使用的关键组件

```tsx
import { PageContainer, ProLayout } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { StatisticCard } from '@ant-design/pro-components'
import {
  Button, Tag, Badge, Space, Drawer,
  Popconfirm, message, Modal
} from 'antd'
import {
  UserOutlined, SearchOutlined, ExportOutlined
} from '@ant-design/icons'
```

| 组件 | 用途 | 后端位置 |
| :--- | :--- | :--- |
| `ProLayout` | 整体管理布局框架 | 页面骨架（菜单 内容区域） |
| `ProTable` | 带内置搜索、分页、列设置的高级表格 | 用户列表、文档列表、订单列表 |
| `StatisticCard` | 数据统计卡片 | 仪表板和页面顶部概览 |
| `Tag` / `Badge` | 状态标签 | 订阅计划、用户状态 |
| `Drawer` | 侧边抽屉 | 用户详情、编辑表单 |
| `Popconfirm` | 确认弹出框 | 危险操作，如删除/禁用 |

### 5.4 持续迭代：新增仪表板

```text
Please help me build a dashboard page:

1. Top four statistic cards: total users, total documents, today's API calls, monthly revenue. Each card should show value and period-over-period change (up or down)
2. Put two charts in the middle:
   - Left: user growth line chart for the last 7 days
   - Right: pie chart of subscription plan distribution
3. Bottom: recent operation log table, showing time, user, operation type, details

Use Ant Design components for layout, and you can use Ant Design Charts for charts.
```

<!-- TODO：用仪表盘页面截图替换——>
<!-- ![蚂蚁设计仪表盘页面结果]（图片/antd-dashboard-result.png）-->

> **管理系统Vibe编码技巧**：管理员页面结构相对固定（表搜索模态），非常适合用AI批量生成。你可以先让AI生成一个“用户管理”页面作为模板，然后说“基于相同结构，生成文档管理页面”。AI会重复使用相同的布局模式。

## 6.Learn to Read Docs：组件库的“手册”

在Vibe编码中，AI会帮你写大部分代码。但当生成的结果不正确，或者你想微调组件行为时，**阅读文档**是最快解决的方法。

以Ant Design为例。它的文档网址是：`https://ant.design/components/overview-cn`

标准文档工作流程：

1. **澄清需求**：例如，“我需要表格中的行选择。”
2. **在文档中搜索**：搜索“表格”并输入表格组件页面
3. **检查示例**：每个组件有多个活跃示例;查找“可选行”示例
4. **复制代码**：将示例代码复制到你的项目中
5. **查看API表**：页面底部，查找`rowSelection`的完整配置

> 你也可以直接向你的 AI 集成开发环境 发送文档链接：“请参考 https://ant.design/components/table-cn 中的 rowSelection API，并帮我向用户表添加批量选择。”给 AI 文档链接能让生成代码更准确。

每个图书馆的快速文档链接：

|组件库 |文档网址 |
|:--- |:--- |
|蚁设计 |`https://ant.design/components/overview-cn` |
|ShadCN/UI频道 |`https://ui.shadcn.com/docs/components` |
|HeroUI |`https://heroui.com/docs/components` |
|材质界面 |`https://mui.com/material-ui/all-components/` |
|元素加 |`https://element-plus.org/zh-CN/component/overview.html` |

## 7.摘要

这三种实际场景涵盖了最常见的前端开发需求：

|场景 |推荐组件库 |核心优势 |
|:--- |:--- |:--- |
|着陆页/展示页面 |HeroUI |漂亮的默认风格，流畅的动画，强烈的视觉冲击力 |
|产品功能页面 |shadcn/UI |完整代码控制，灵活深度定制 |
|管理系统 |Ant Design |丰富的业务组件，开箱即用的表格/表单 |

氛围编程 工作流程总结：

1. 根据场景选择合适的组件库
2. 使用 AI 集成开发环境 来描述你想要的页面结构和交互
3. AI生成第一版代码，你预览结果
4. 继续用自然语言迭代
5. 当细节卡住时，阅读组件库文档

### 练习

选择下面一个场景，用 AI 集成开发环境 组件库从零开始完成：

1. 用HeroUI为你之前做的项目（比如霍格沃茨肖像）搭建展示着陆页
2. 使用shadcn/ui构建笔记应用的主界面（侧边栏编辑器）
3. 使用 Ant Design 构建一个简单的内容管理后端（文章列表-新文章形式）

---

## 附录：更多组件库

除了正文中介绍的四个核心库外，前端生态系统还有许多优秀的组件库。下面按框架分类，帮助你根据项目需求选择。

### Vue生态系统

|组件库 |星星 |描述 |合适场景 |
|:--- |:--- |:--- |:--- |
|[元素加]（https://element-plus.org） |~27k |Ele.me 团队提供的Vue 3企业组件库，中国最广泛使用，优良的中国生态系统 |后台管理系统 |
|[Vuetify]（https://vuetifyjs.com） |~41k |最受欢迎的Vue材质设计组件库，80个组件，完整文档 |Google设计风格项目 |
|[Ant Design Vue]（https://antdv.com） |~21k |基于 Ant Design 系统的 Vue 3 组件库，统一设计规范 |企业后台系统 |
|[朴素的用户界面]（https://www.naiveui.com） |~18k |用TypeScript编写，高度可主题定制，无CSS预处理器依赖 |具有独特设计需求的项目 |
|[类星体]（https://quasar.dev） |~27k |一个适用于SPA、SSR、PWA、移动和桌面应用的代码库 |跨平台项目 |
|[Vant]（https://vant-ui.github.io/vant）|~24k |Youzan提供的轻量级移动组件库，涵盖常见电商需求 |移动H5页面 |
|[PrimeVue]（https://primevue.org） |~14k |90个组件，多主题（Material、Bootstrap等） |需要丰富组件和多主题支持的项目 |
|[Arco Design Vue]（https://arco.design/vue） |~3k |由字节跳动生产，高组件质量，内置暗黑模式 |后台产品 |
|[TDesign Vue Next]（https://tdesign.tencent.com/vue-next） |~2k |由腾讯开发，统一设计语言，涵盖常见桌面场景 |腾讯生态系统或企业项目 |

### React生态系统

|组件库 |星星 |描述 |合适场景 |
|:--- |:--- |:--- |:--- |
|[材质界面（MUI）]（https://mui.com） |~95k |谷歌材质设计的长期实现，最完整的组件，最成熟的生态系统 |快速的企业应用构建 |
|【蚁设计】（https://ant.design） |~94k |由蚁集团生产，拥有许多高质量的业务组件，在中国开发者中占主导地位 |企业后台系统 |
|[shadcn/ui]（https://ui.shadcn.com） |~83k |将代码复制到项目中，而非 npm 安装，基于 Radix UI Tailwind CSS，完全可控 |高度定制化的项目 |
|[Chakra界面]（https://chakra-ui.com） |~39k |注重开发者体验，简洁的API，内置无障碍支持|快速原型开发 |
|[曼廷]（https://mantine.dev） |~28k |100个组件和50个钩子，包括高级组件如日期选择器和富文本编辑器 |需要一体化开箱即用解决方案的团队 |
|[无头界面]（https://headlessui.com） |~27k |来自Tailwind Labs的无样式组件库，支持React和Vue |最适合Tailwind CSS |
|[HeroUI]（https://heroui.com） |~24k |基于Tailwind CSS React Aria，默认画面精美，动画流畅 |追求视觉质量的项目 |
|[Radix 用户界面]（https://www.radix-ui.com） |~17k |无样式原始组件库，专注于可访问性和行为;Shadcn/UI 的基础层 |构建自定义设计系统 |

#### shadcn/ui 扩展生态系统

除了上述通用组件库外，shadcn/ui生态系统还基于相同理念开发了许多扩展库，为特定场景提供了差异化的选择。这些扩展还采用“将代码复制到项目”模式，赋予开发者完整的源代码控制权。

| 组件库 | 描述 | 适用场景 |
| :--- | :--- | :--- |
| [Aceternity UI](https://ui.aceternity.com) | 200 个生产级组件，包含发光卡片、渐变文字、3D 地球等标志性视觉组件 | 高质量落地页、SaaS 产品 |
| [Tailark UI](https://tailark.com) | 营销网站模块集合，包括常用模块如产品展示、用户推荐和 CTA 按钮 | 营销落地页、产品网站 |
| [UI Tripled](https://ui.tripled.work) | 基于 Framer Motion 的动态交互组件，包括模态框、导航、卡片动画 | 创意工具、个人作品集 |
| [Neobrutalism UI](https://neobrutalism.dev) | 新野性主义风格，线条厚重、高对比、颜色大胆 | 个性化品牌网站、创意项目 |
| [REUI](https://reui.io) | 来自真实业务场景的 967 个组件组合模式 | 企业后台、复杂表单 |
| [Cult UI](https://cult-ui.com) | 更精细的交互和视觉打磨，包括数据表和筛选面板等复合组件 | 高质量商业产品 |
| [Kibo UI](https://kibo-ui.com) | 高级业务组件，如颜色选择器、富文本编辑器、文件上传 | 管理系统、工具产品 |
| [Kokonut UI](https://kokonutui.com) | 100 个组件，7 个完整模板，风格清新简约 | SaaS 网站、博客、电商 |
| [Commerce UI](https://ui.stackzero.co) | 专注于电商场景，包括产品卡片、购物车、结账表单 | 电商平台 |
| [shadcnblocks](https://shadcnblocks.com) | 1373 个 UI 模块，13 个完整模板，资源最全面 | 所有场景 |
| [Shoogle](https://shoogle.dev) | shadcn/ui 生态的聚合搜索平台 | 快速查找资源 |
| [Discover All Shadcn](https://allshadcn.com) | 聚合资源导航 | 快速查找资源 |

> **为什么选择 shadcn/ui 扩展？** 这些扩展继承了 shadcn/ui “代码所有权”的理念，同时为特定场景增加了深度定制。在 氛围编程 时代，它们帮助你快速找到符合设计目标的组件，摆脱同质化的主流 UI 模式，构建更具差异化的产品。