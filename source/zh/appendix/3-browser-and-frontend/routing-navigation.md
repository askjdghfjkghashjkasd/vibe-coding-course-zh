# 路线与导航导论
::: 提示 🎯 核心问题
**为什么有些网站切换页面时没有像原生应用那样流畅的白屏刷新？**这就是前端路由的魔力所在。本章将带你从传统的“翻页”式网站导航，进入单页应用的“滑动过渡”世界，帮助你理解前端路由如何将用户体验提升到新高度。
:::

---

## 1.“前端路由”的动机

### 1.1 从传统网站到SPA：用户体验的飞跃

回想一下网页浏览的早期——每一次点击链接都是一次完整的“翻页”：一道白光闪烁，一个旋转加载器，整个页面重新渲染。在慢速连接下，你会盯着那个旋转器看几秒钟。这种体验现在看来有些过时，但当时这是标准做法。

现代前端开发彻底改变了这一模式。我们使用前端路由技术，使页面过渡像移动应用一样平滑——没有白色闪烁，没有加载旋转器，用户几乎不会注意到“导航”。这种改进不是魔法;它是前端路由系统的成果。

<div style=“display： flex; gap： 20px; margin： 20px 0;”>
<div style=“flex： 1;填充：16px;border： 1px 实心 #e4e7ed;border-radius： 12px;”>

** 📖 传统网站（MPA）**
- 点击链接→整页刷新
- 每个页面都是独立的HTML文件
- 浏览器重新下载所有资源
- 感觉像“翻书页”——明显的过渡

</div>
<div style=“flex： 1;填充：16px;border： 1px 实心 #e4e7ed;border-radius： 12px;”>

** 📱 单页应用（SPA）**
- 点击链接→无刷新过渡
- 仅有一个HTML输入文件
- 仅下载必要数据
- 感觉像“幻灯片秀”——流畅自然

</div>
</div>

**这就是前端路由解决的核心问题：切换视图和同步URL——且无需刷新页面。**

<路线匹配演示 />

### 1.2 现实世界的陷阱：为什么你需要理解路由模式

你可能会想：“我只要用Vue Router或React Router，配置几条路由就能行了。为什么我需要理解背后的原理？”让我讲一个真实的故事，让你明白这些知识的重要性。

::: 警告 小李的部署噩梦
小李是一名初级前端开发者，负责构建基于Vue的SPA。本地开发一切运行完美——路由切换非常顺畅。但一旦他将项目部署到测试服务器，问题出现了：当用户直接访问像`example.com/user/123`这样的路由或刷新详细信息页面时，会看到**404未找到**错误。

小李很困惑：本地运行正常，为什么部署后还要用404？他花了很长时间排查故障，甚至怀疑是服务器配置问题。

他最终询问了一位资深同事，后者立刻发现了问题：小力使用了历史模式，但服务器没有配置备份。当用户直接访问`/user/123`时，服务器会尝试在该路径寻找文件——但在SPA中，所有路由都指向同一个`index.html`。修复方法很简单：配置服务器所有路由都退回`index.html`，让前端路由器接手。

小李那天学到了一个教训：**如果你不了解路由模式的工作原理及其服务器配置要求，你甚至不知道错误为何发生，更别说如何修复了。**
:::

::: 信息 💡 重点摘要
前端路由不是“黑魔法”。理解其工作原理能让你快速定位并解决部署、性能和SEO问题。更重要的是，它赋予你更聪明的架构决策权——何时使用哈希模式，何时使用历史模式，以及如何避免常见陷阱。
:::

---

## 2.核心概念：路线、模式、导航

在深入具体实现之前，我们需要澄清几个核心概念。为了帮助你更好地理解，我们用库类比。

::: 提示 🤔 这些概念和路由有什么关系？
路线、模式和导航是前端路由系统的三大支柱。

当你使用 Vue Router 或 React Router 时，框架会处理：
1. **路由映射** →定义URL与组件之间的对应关系
2. **模式选择** →在哈希模式和历史模式之间做出选择
3. **导航控制** →处理页面转换、浏览器的前进/后退

所以，**理解这三个概念是了解路由系统实际在做什么、为什么有时需要特殊配置以及为什么生产环境中出现故障的关键**
:::

### 2.1 通过库类比理解路由系统

想象你在图书馆找一本书。这个过程和前端路由的运作方式惊人地相似：

|概念 |📚图书馆类比 |实际角色 |具体示例 |
|------|-------------|----------|----------|
|**路由**书架号与书籍之间的映射 |定义了URL与页面组件之间的映射 |路径`/user/123`映射到`UserDetail.vue`组件 |
|**路由器**库的目录系统和位置服务 |管理所有路由并处理导航的核心模块 |Vue 路由器、React 路由器都是路由器 |
|**路由模式**索引方法（卡片目录与电子系统）|确定URL格式及底层实现 |哈希模式使用 `#`，历史模式使用常规路径 |
|**导航** |从一个书架走到另一个书架 |切换页面的行为 |点击链接、程序导航、浏览器前进/前进 |

::: 提示 📊 你能从这张桌子学到什么？
让我们逐行逐一分析：

**路由**：仅仅是一个“配置”，告诉系统“哪个URL对应哪个页面”。就像索书号映射到书籍位置。

**路由器**：“管理器”，负责找到当前URL匹配的组件并渲染。就像图书管理员根据你提供的索书号找到书籍一样。

**路由模式**：“实现方法”，决定URL的外观及所用底层技术。就像图书馆使用纸质目录与电子检索系统。

**导航**：“动作”——用户触发的翻页行为。比如在图书馆从A区走到B区。

理解这四者的区别至关重要：**路由是静态配置，路由器是动态管理器，模式是技术选择，导航是用户行为。**
:::

### 2.2 路由：URL 与组件之间的契约

路由本质上是一种“契约”，规定在访问给定URL时应显示哪些内容。在Vue Router中，典型的路由配置如下：

```javascript
const routes = [
  {
    path: '/',           // URL path
    component: Home      // the corresponding component
  },
  {
    path: '/user/:id',   // dynamic route with a parameter
    component: UserDetail,
    children: [          // nested routes
      { path: 'profile', component: UserProfile },
      { path: 'posts', component: UserPosts }
    ]
  }
]
```

**你可能会想：为什么不直接使用 `<a>` 标签进行导航，而要用路由器呢？**

答案在于 SPA 的特性：SPA 只有一个 HTML 页面，所有的“页面跳转”实际上只是该单页面内组件的替换。如果你使用传统的 `<a href="/user/123">`，浏览器实际上会请求 `/user/123` 路径，导致页面刷新或 404 错误。路由器的作用是拦截这些导航操作，通过 JavaScript 动态替换组件，从而实现无需刷新的页面切换。

::: details 🔧 常见路由配置模式
**静态路由**（最简单）：```javascript
{ path: '/home', component: Home }
{ path: '/about', component: About }
```

**动态路由**（带参数）：```javascript
{ path: '/user/:id', component: UserDetail }
// Matches /user/123, /user/abc, etc.
// The component can access the parameter via route.params.id
```

**嵌套路由**（父子关系）：```javascript
{
  path: '/user/:id',
  component: UserLayout,    // parent component
  children: [
    { path: 'profile', component: UserProfile },   // actual path: /user/:id/profile
    { path: 'posts', component: UserPosts }        // actual path: /user/:id/posts
  ]
}
```

**捕获所有路由**（404 页面）：```javascript
{ path: '/:pathMatch(.*)*', component: NotFound }
// Matches all undefined routes
```:::

### 2.3 路由模式：哈希与历史的本质区别

前端路由有两种主流实现模式：哈希模式和历史模式。它们在URL格式、底层实现和兼容性上有根本差异。

::: 提示 🤔 为什么有两个模式？
这是历史和技术权衡的结果。

**哈希模式**是最早的前端路由方法。它利用了URL中的哈希部分（`#`之后的所有部分）。哈希更改不会触发页面刷新，且兼容性极佳（甚至IE8也支持）。

**历史模式**是HTML5引入的“标准方法”。它使用历史API的`pushState`和`replaceState`方法使URL看起来“正常”（不含`#`），但需要服务器端协作。

打个比方：哈希模式就像“在房间门上贴便签”（不影响房间结构），而历史模式则像“重新编号房间”（需要更新标识系统）。
:::

|功能 |哈希模式 |历史模式 |
|------|-----------|--------------|
|**网址示例** |`https://example.com/#/user/123` |`https://example.com/user/123` |
|**实现** |监听`hashchange`事件 |使用历史API（`pushState`， `replaceState`） |
|**服务器配置** |不需要（哈希未发送到服务器）|**必须配置备份到index.html** |
|**浏览器支持** |IE8（几乎所有浏览器）|IE10（现代浏览器）|
|**SEO友好性** |差（搜索引擎可能忽略哈希）|良好（干净的URL结构）|
|**用户体验** |URL为`#`，看起来像“锚点跳跃”|网址干净，类似传统网站 |
|**部署难度** |低，无需特殊配置 |高，需要正确的服务器配置 |

<HashVsHistoryDemo />

::: 提示 📊 你能从这张桌子学到什么？
让我们逐行逐一分析：

**URL示例**：哈希模式URL有可见的`#`，用户能立即识别为SPA。历史模式URL看起来像传统网站——更“专业”。

**实现方式**：哈希模式监听`hashchange`事件（哈希变化时触发）。历史模式使用HTML5历史API，可以“假装”浏览页面，但不进行实际刷新。

**服务器配置**：这是最常见的陷阱！在哈希模式下，`#`之后的所有内容都不会发送到服务器，所以服务器不需要知道路由。但在历史模式中，完整路径会发送到服务器——如果配置不当，会出现404。

**SEO友好性**：搜索引擎爬虫通常不执行JavaScript，因此哈希模式URL可能被忽略。历史模式URL结构干净，更容易被索引。

**部署难度**：哈希模式“开箱即用”。历史模式需要运维知识（如Nginx、Apache等）。这也是许多个人项目默认使用哈希模式的原因。
:::

---

## 3.演变：从传统网站到现代路由

涵盖了所有这些概念后，让我们来看看一个真实案例：一个电商网站如何一步步从传统的多页应用演变为带有路由功能的现代SPA。这将让你更直观地理解前端路由解决的问题。

::: 提示 📖 背景：什么是MPA、SPA和SSR？
在进入案例研究之前，先简单介绍一下这些术语：

- **MPA（多页应用）**：传统的网站构建方式。每个页面是一个独立的HTML文件，导航触发全页面刷新。
- **SPA（单页应用）**：主流的现代前端方法。只有一个HTML入口点;页面转换通过动态更换组件来处理——无需刷新。
- **SSR（服务器端渲染）**：在服务器上生成完整的 HTML。结合了 SPA 和 MPA 的优点——快速初始渲染和良好的 SEO。

**一个简单的理解方式**：MPA是“每次都重新画整页”，SPA是“在同一张纸上擦掉再重新画”，SSR是“纸在你拿到之前就已经画好了”。
:::

### 3.1 进化的宏观图景

下表展示了前端应用的四个演进阶段，展示了路由技术的逐步发展：

|阶段 |应用类型 |路由实现 |核心特征 |用户体验 |
|------|---------|---------|---------|---------|
|**第一阶段：传统MPA** |MPA |服务器端路由 |每个页面都是独立的HTML文件 |每次导航刷新 |
|**第二阶段：早期SPA** |SPA（哈希模式）|哈希路由 |URL为`#`，兼容性良好 |无刷新，但URL看起来未打磨 |
|**第三阶段：现代SPA** |SPA（历史模式）|历史路由 |干净的URL，需要服务器配置 |平滑，URL类似传统网站 |
|**第四阶段：混合渲染**SPA SSR |同构路由 |服务器渲染的第一屏，之后为客户端路由 |快速的第一屏，良好的SEO，流畅的交互 |

::: 提示 📊 你能从这张桌子学到什么？
让我们逐行逐一分析：

**第一阶段→第二阶段**：从“有刷新”到“无刷新”——一个质的飞跃。用户首次体验到类似应用的流畅性，但代价是URL中的`#`看起来不那么专业。

**第二阶段→第三阶段**：从“它能用”到“它运行良好”。历史模式使URL变得干净，更接近传统网站，但代价是增加了部署复杂度（需要服务器配置）。

**第三阶段→第四阶段**：从“优秀的用户体验”到“出色的用户体验卓越SEO”。SSR解决了SPA的SEO难题，使第一屏渲染更快，但显著增加了实现复杂度。

**总结一下**：前端路由的演变不仅仅是“更快的过渡”——更是**升级整个应用架构**。从服务器驱动到客户端驱动，再到两者的混合，每一步都在平衡用户体验、开发成本、SEO及其他维度。
:::

### 3.2 第一阶段：传统多页应用——每次刷新

为什么叫“传统的多页应用”？因为在那个阶段，每个页面都是独立的HTML文件，浏览器在每次导航时都会重新下载所有资源（HTML、CSS、JS）。这是最早的网页构建方式，许多传统网站至今仍是这样运作的。

此时，电子商务网站“BuyMore”采用了典型的MPA架构：

**开发方法**：
- **路由**：服务器端路由——每个页面对应服务器上的一个HTML文件
- **导航**：使用 `<a href="/products/123">`，触发整页刷新
- **状态管理**：页面状态（滚动位置、表单内容等）在每次导航中丢失

**这个阶段的特点**：
- ✅ **优点**：实现简单，搜索引擎友好（SEO好），浏览器的前进/后退按钮开箱即用
- ❌ **缺点**：每次导航都刷新，用户体验差，服务器负载高（重复下载相同的资源）

::: details 查看项目结构和导航流程
**项目结构**（典型的服务器渲染设置）：```
server/
├── views/              # HTML templates
│   ├── index.html      # Homepage template
│   ├── products.html   # Product listing template
│   └── product.html    # Product detail template
├── public/             # Static assets
│   ├── css/
│   ├── js/
│   └── images/
└── server.js           # Server entry point
```

**页面导航流程**：```
1. User clicks link <a href="/products/123">
       ↓
2. Browser sends a GET request to the server
       ↓
3. Server renders product.html, injects data
       ↓
4. Returns a complete HTML page
       ↓
5. Browser parses HTML, downloads CSS/JS, renders the page
       ↓
6. User sees the page (this process typically takes 1–3 seconds)
```

**用户痛点**：
- 点击链接后出现白屏，等待时间长
- 每次导航都会重新下载相同的 CSS/JS 文件
- 浏览器的前进/后退会重新加载页面
- 无法保留复杂的页面状态（过滤器、滚动位置）
:::

这种方式对于小型网站还可以接受，但随着网站规模扩大和用户期望增加，这些问题开始严重影响用户留存率和转化率。

### 3.3 阶段 2：早期单页应用（SPA）——哈希路由时代

随着传统多页应用（MPA）的问题积累，BuyMore 团队决定采用前端路由并升级到 SPA 架构。这是一个重大转折点——从“服务器驱动”到“客户端驱动”。

但这一阶段也有其成本：URL 中的 `#` 看起来不够专业，而且搜索引擎索引存在问题。

**开发方法**：
- **路由**：哈希路由，利用 URL 的 `#` 部分
- **导航**：JavaScript 拦截链接点击并动态交换组件
- **状态管理**：页面状态在客户端保存，无需重新加载

**该阶段特点**：
- ✅ **优点**：无需刷新即可过渡，用户体验流畅，减轻服务器负载
- ❌ **缺点**：URL 中有 `#`，SEO 较差，初始加载较慢

::: details 哈希路由的实现方式
**项目结构**（典型早期 SPA 设置）：```
project/
├── index.html          # The single HTML entry file
├── css/
│   └── app.css         # All styles bundled into one file
├── js/
│   ├── router.js       # Simple routing implementation
│   ├── views/          # Page components
│   │   ├── Home.js
│   │   ├── ProductList.js
│   │   └── ProductDetail.js
│   └── app.js          # App entry point
└── server.js           # Simple static file server
```

**核心哈希路由代码**：```javascript
// router.js - simplified Hash routing implementation
class HashRouter {
  constructor(routes) {
    this.routes = routes
    this.currentPath = null

    // Listen for hash changes
    window.addEventListener('hashchange', () => {
      this.matchRoute()
    })

    // Initialize
    this.matchRoute()
  }

  matchRoute() {
    // Get the current hash (strip the #)
    const hash = window.location.hash.slice(1) || '/'
    const route = this.routes.find(r => r.path === hash)

    if (route) {
      this.render(route.component)
    } else {
      this.render(NotFoundComponent)
    }
  }

  render(component) {
    const app = document.getElementById('app')
    app.innerHTML = component.template()
    component.mount?.(app)
  }

  navigate(path) {
    window.location.hash = path
  }
}

// Usage
const router = new HashRouter([
  { path: '/', component: Home },
  { path: '/products', component: ProductList },
  { path: '/products/:id', component: ProductDetail }
])

// Navigate
router.navigate('/products/123')
```

**URL 格式**：
- 首页：`https://example.com/#/`
- 产品列表：`https://example.com/#/products`
- 产品详情：`https://example.com/#/products/123`

**改进效果**：
1. **更好的用户体验**：页面切换无需刷新，流畅自然
2. **降低服务器负载**：HTML/CSS/JS 只加载一次，后续请求仅获取数据
3. **状态保持**：滚动位置、表单内容及其他状态在导航间保持不变
4. **支持离线**：可通过 Service Workers 支持离线访问

**新产生的问题**：
1. **URL 不够美观**：`#` 使 URL 看起来像“锚点跳转”，不够专业
2. **SEO 问题**：搜索引擎爬虫可能会忽略井号后的内容，从而无法建立索引
3. **首屏加载慢**：所有 JavaScript 必须提前加载，增加首屏显示时间
:::

### 3.4 阶段 3：现代 SPA — History 路由成为主流

Hash 路由（URL 不够美观、SEO 差）的问题困扰开发者多年。随着 HTML5 的广泛应用和浏览器兼容性的提升，History 路由逐渐成为主流。

History 路由利用 HTML5 History API 让 URL 看起来“正常”（无 `#`），但需要服务器端配合。

**开发方式**：
- **路由**：History 路由，使用 `pushState` 和 `replaceState`
- **路由库**：成熟的库，如 Vue Router、React Router
- **服务器配置**：必须配置服务器将所有路由回退到 `index.html`

**阶段特点**：
- ✅ **优点**：清晰的 URL、SEO 友好、用户体验顺畅
- ❌ **缺点**：需要特殊部署配置，必须有服务器端配合

::: details History 路由实现与部署配置
**项目结构**（典型现代 SPA 设置）：
```
project/
├── public/
│   └── index.html          # The single HTML entry
├── src/
│   ├── router/
│   │   └── index.js        # Route configuration
│   ├── views/              # Page components
│   │   ├── Home.vue
│   │   ├── ProductList.vue
│   │   └── ProductDetail.vue
│   ├── App.vue
│   └── main.js
├── package.json
└── vite.config.js          # Build configuration
```

**Vue 路由配置示例**:```javascript
// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),  // History mode
  routes: [
    { path: '/', component: () => import('@/views/Home.vue') },
    { path: '/products', component: () => import('@/views/ProductList.vue') },
    { path: '/products/:id', component: () => import('@/views/ProductDetail.vue') },
    { path: '/:pathMatch(.*)*', component: () => import('@/views/NotFound.vue') }
  ]
})

export default router
```

**URL 格式**：
- 首页：`https://example.com/`
- 产品列表：`https://example.com/products`
- 产品详情：`https://example.com/products/123`

**重要：Nginx 配置**（必须配置以进行部署）：```nginx
server {
    listen 80;
    server_name example.com;
    root /var/www/app;
    index index.html;

    # Key configuration: all routes fall back to index.html
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

**为什么需要这个配置？**

```
Scenario: user directly accesses https://example.com/products/123

❌ Without the configuration:
1. Browser requests /products/123 from the server
2. Nginx looks for /products/123 in the filesystem
3. File not found → returns 404

✅ With try_files configured:
1. Browser requests /products/123 from the server
2. Nginx tries to find the file → doesn't exist
3. Falls back to /index.html (per try_files rule)
4. Browser loads index.html
5. Vue Router takes over, parses /products/123
6. Renders the ProductDetail component
7. Page displays correctly!
```

**与 Hash 模式的比较**：
| 比较 | Hash 模式 | History 模式 |
|--------|----------|-------------|
| URL | `/#/products/123` | `/products/123` |
| 服务器配置 | 不需要 | **必须配置** |
| 直接访问 | ✅ 正常工作 | ❌ 需要服务器支持 |
| SEO | ⚠️ 差 | ✅ 良好 |
:::

### 3.5 第四阶段：混合渲染 — 终极 SPA SSR 解决方案

一旦 History 路由成熟，团队开始关注更深层次的问题：如何在保持流畅 SPA 体验的同时，还能解决 SEO 和首次加载慢的问题？

该阶段的核心是“同构渲染”——首屏在服务器渲染（SEO 优化，加载快），后续交互由前端路由处理（体验流畅）。

**开发方法**：
- **框架选择**：Next.js（React）、Nuxt.js（Vue）
- **渲染策略**：服务端渲染 + 客户端水合
- **路由模式**：History 模式（服务器已配置）

**该阶段特点**：
- ✅ **优点**：首屏快，SEO 好，后续交互顺畅
- ❌ **缺点**：实现复杂度高，需要服务器运行环境

::: details 混合渲染工作原理
**页面加载流程**：```
1. User visits /products/123
       ↓
2. Server receives the request
       ↓
3. Server renders the ProductDetail component → generates complete HTML
       ↓
4. Returns HTML to the browser (with full content)
       ↓
5. Browser displays content quickly (fast first-screen render)
       ↓
6. JavaScript loads, hydration executes
       ↓
7. Subsequent navigation is handled by the frontend router (no refresh)
```

**传统 SPA vs. SSR — 首屏对比**：

| 对比项 | 传统 SPA | SSR |
|--------|---------|-----|
| 首屏内容 | 白屏 → 加载 JS → 渲染 | 内容立即显示 |
| SEO | 爬虫可能看不到内容 | 爬虫可以看到完整 HTML |
| 首屏时间 | 较慢（需要加载 JS） | 较快（HTML 已包含内容） |
| 后续交互 | 流畅（前端路由） | 流畅（前端路由） |
:::

---

## 4. 内部原理：路由的工作机制

既然我们已经看过了实际案例，现在让我们更深入地了解前端路由是如何在后台工作的，并理解 Hash 模式和 History 模式到底有什么不同。

<RouterArchitectureDemo />

### 4.1 Hash 模式如何工作

Hash 模式利用 URL 中的 `hash` 部分（`#` 之后的所有内容）。Hash 有两个重要特性：

1. **Hash 变化不会触发页面刷新**
2. **Hash 变化会被记录在浏览器的历史记录堆栈中**

这意味着我们可以在不刷新页面的情况下改变 URL，同时浏览器的前进/后退按钮仍然可以正常工作。

**工作流程**：

```
User clicks link <a href="#/user/123">
       ↓
Browser updates the URL (no page refresh)
https://example.com/#/user/123
       ↓
hashchange event fires
       ↓
Route listener captures the event
       ↓
Parses the hash value → /user/123
       ↓
Matches against route config → finds UserDetail component
       ↓
Renders component into the page
```

**核心实现**：

```javascript
class HashRouter {
  constructor(routes) {
    this.routes = routes

    // Listen for hash changes
    window.addEventListener('hashchange', () => {
      this.loadRoute()
    })

    // Initial load
    this.loadRoute()
  }

  loadRoute() {
    // Get current hash, strip the leading #
    const hash = window.location.hash.slice(1) || '/'
    const route = this.matchRoute(hash)

    if (route) {
      this.render(route.component)
    }
  }

  matchRoute(path) {
    return this.routes.find(r => r.path === path)
  }

  render(component) {
    document.getElementById('app').innerHTML = component.template()
  }

  push(path) {
    window.location.hash = path
  }
}
```

::: 提示 💡 Hash 模式的优点
- **兼容性好**：支持 IE8，几乎适用于所有浏览器
- **部署简单**：无需服务器配置，开箱即用
- **实现简单**：只需监听 `hashchange` 事件
:::

### 4.2 History 模式的工作原理

History 模式利用 HTML5 History API，该 API 提供 `pushState`、`replaceState` 以及其他方法，可以在不刷新页面的情况下更改 URL。

**核心 API**:

```javascript
// Add a new history entry
history.pushState(state, title, url)
// Example: history.pushState({id: 123}, 'User Detail', '/user/123')

// Replace the current history entry
history.replaceState(state, title, url)

// Listen for history changes (back/forward buttons)
window.addEventListener('popstate', (event) => {
  // event.state contains the state passed to pushState
})
```

**工作流程**：

```
User clicks link <a href="/user/123">
       ↓
JavaScript intercepts the click event
event.preventDefault()
       ↓
Calls history.pushState
history.pushState({id: 123}, 'User Detail', '/user/123')
       ↓
URL updates (no page refresh)
https://example.com/user/123
       ↓
Route matches and renders the component
       ↓
User clicks browser back button
       ↓
popstate event fires
       ↓
Route listener captures the event
       ↓
Renders the corresponding component based on the new URL
```

**核心实现**：

```javascript
class HistoryRouter {
  constructor(routes) {
    this.routes = routes

    // Intercept all link clicks
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a')
      if (link && link.getAttribute('href').startsWith('/')) {
        e.preventDefault()
        this.push(link.getAttribute('href'))
      }
    })

    // Listen for browser back/forward
    window.addEventListener('popstate', () => {
      this.loadRoute()
    })

    // Initial load
    this.loadRoute()
  }

  loadRoute() {
    const path = window.location.pathname
    const route = this.matchRoute(path)

    if (route) {
      this.render(route.component)
    }
  }

  push(path) {
    history.pushState({}, '', path)
    this.loadRoute()
  }

  render(component) {
    document.getElementById('app').innerHTML = component.template()
  }
}
```

::: 警告 ⚠️ 历史模式陷阱
历史模式的最大问题是：**当用户直接访问一个 URL 或刷新页面时，浏览器会向服务器发送请求**。

如果服务器配置不正确，它将返回 404。解决方案是配置服务器将所有路由回退到 `index.html`，让前端路由从那里接管。
:::

---

## 5. 路由配置：实用指南

理论讲得差不多了。下面是实际项目中常用的路由模式和最佳实践。

### 5.1 基本路由配置

::: details 完整的 Vue Router 配置示例

```javascript
// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import NotFound from '@/views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/user/:id',
      name: 'UserDetail',
      component: () => import('@/views/UserDetail.vue'),
      props: true  // pass route params as props
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    // Scroll behavior: preserve position on back, otherwise scroll to top
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router
```

:::

### 5.2 路由懒加载：提升初始加载性能

路由懒加载意味着只有在访问其路由时才加载组件，而不是一开始就加载所有组件。这会显著减少初始加载时间。

```javascript
// ❌ Loading all components at once (slow initial load)
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import User from '@/views/User.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/user', component: User }
]

// ✅ Lazy loading (fast initial load)
const routes = [
  { path: '/', component: () => import('@/views/Home.vue') },
  { path: '/about', component: () => import('@/views/About.vue') },
  { path: '/user', component: () => import('@/views/User.vue') }
]
```

<CodeSplittingDemo />

::: tip 💡 懒加载的工作原理
当你使用 `import('@/views/Home.vue')` 时，Webpack/Vite 会把该组件打包到一个单独的文件中。只有当用户访问那个路由时，才会下载该文件。

一个类比：懒加载就像“按需点菜”，而不是“一次把所有菜都端上桌”。这可以减少初始加载时间并改善用户体验。
:::

### 5.3 路由守卫：访问控制和导航拦截

路由守卫允许你在路由切换前后执行逻辑。它们通常用于身份验证、页面标题设置、数据预取等。

```javascript
// Global before-guard
router.beforeEach(async (to, from, next) => {
  // Set page title
  document.title = to.meta.title || 'My App'

  // Authentication check
  if (to.meta.requiresAuth) {
    const isAuthenticated = await checkAuth()
    if (!isAuthenticated) {
      next('/login')
      return
    }
  }

  next()
})

// Global after-hook
router.afterEach((to, from) => {
  // Page view analytics
  analytics.trackPageView(to.path)
})

// Per-route guard
const routes = [
  {
    path: '/admin',
    component: Admin,
    meta: { requiresAuth: true, roles: ['admin'] },
    beforeEnter: (to, from, next) => {
      // Logic specific to this route
      if (hasPermission()) {
        next()
      } else {
        next('/403')
      }
    }
  }
]
```

::: 提示 💡 路由守卫的常见用例
- **身份验证**：检查用户是否有权限访问某个页面
- **页面标题**：动态设置 document.title
- **数据预获取**：进入页面前获取数据
- **进度条**：在页面切换期间显示进度指示器
- **分析**：跟踪页面浏览量
:::

---

## 6. 常见问题及解决方案

### 6.1 部署后刷新出现 404

**问题**：在本地开发时工作正常，但部署到服务器后，直接访问某个路由或刷新页面会显示 404。

**原因**：在 History 模式下，服务器将 URL 视为要查找的文件路径，但在单页应用（SPA）中，所有路由都指向 `index.html`。

**解决方案**：配置服务器回退。

```nginx
# Nginx configuration
location / {
    try_files $uri $uri/ /index.html;
}
```

```apache
# Apache configuration (.htaccess)
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### 6.2 刷新时路由参数丢失

**问题**：页面刷新后，`$route.params` 丢失。

**原因**：路由参数仅在导航期间存在；刷新后需要从 URL 重新解析。

**解决方案**：

```javascript
// ❌ Wrong approach: only fetch params in created
created() {
  const userId = this.$route.params.id
  this.fetchUser(userId)
}

// ✅ Correct approach: watch for route changes
watch: {
  '$route.params.id': {
    immediate: true,
    handler(newId) {
      this.fetchUser(newId)
    }
  }
}
```

### 6.3 页面切换时的异常滚动位置

**问题**：导航后，滚动位置没有重置，或者返回时未保留之前的位置。

**解决方案**：配置路由器的 `scrollBehavior`。

```javascript
const router = createRouter({
  scrollBehavior(to, from, savedPosition) {
    // Preserve scroll position when going back
    if (savedPosition) {
      return savedPosition
    }
    // Scroll to anchor
    if (to.hash) {
      return { el: to.hash }
    }
    // Otherwise scroll to top
    return { top: 0 }
  }
})
```

---

## 7. 总结

让我们通过一张表来回顾前端路由的核心概念：

| 概念 | 一句话说明 | 解决的问题 | 代表性解决方案 |
|------|-----------|-----------|----------|
| **路由(Route)** | URL 与组件之间的映射 | 为不同的 URL 显示不同内容 | Vue Router, React Router |
| **哈希模式(Hash Mode)** | 通过 URL 哈希进行路由 | 兼容性好，部署简单 | Vue Router 哈希模式 |
| **历史模式(History Mode)** | 通过 History API 进行路由 | URL 简洁，SEO 友好 | Vue Router 历史模式 |
| **路由懒加载(Route Lazy Loading)** | 按需加载路由组件 | 减少初始加载时间 | `() => import('./Page.vue')` |
| **路由守卫(Route Guards)** | 路由切换前后钩子 | 访问控制，数据预取 | `beforeEach`, `beforeEnter` |
| **动态路由(Dynamic Routes)** | 带参数的路由 | 匹配一类路径而非单一路径 | `/user/:id` |

::: info 最后的话
前端路由是现代单页应用的核心技术之一。从早期的哈希模式到现今主流的历史模式，路由技术不断演进，以提供更流畅的浏览体验。

理解路由的原理和模式可以让你快速定位和解决部署、性能以及 SEO 问题。更重要的是，它能让你做出更明智的架构决策——何时使用哈希模式，何时使用历史模式，以及如何避免常见的陷阱。

希望本文能帮助你建立前端路由的完整认知模型，这样当你在实际项目中遇到路由相关问题时，就知道从哪里入手，如何诊断，以及如何解决。
:::