---
标题：《截图克隆：你的第一次模仿练习》
描述：“跟随老师一步步，把一张产品截图变成一个网页或小游戏，打开并做出响应。”
---

<脚本设置>
从 '@theme/components/StageAssignmentCard.vue' 导入 StageAssignmentCard

持续时长 = “约<strong>2小时</strong>”
</script>

# 截图中的克隆：你的第一次模仿练习

在上一节课中，我们让AI从一句话中写出一个程序。这次我们用一个更容易看见的方法：<strong>选择一个你喜欢的截图，然后让AI从中构建。</strong>

这有点像看图片时的积木。你不需要事先描述每一种颜色、缝隙和按键位置;截图已经传达了大部分信息。

<div style=“text-align： center;”>
<div style=“display： inline-block;填充：8px 20px;border-radius：8px;border：虚 #FFB6C1 1px;背景：线性渐变（135度，#FFF0F5 0%，#FFE4EC 100%）;margin：12px 0;”>
  <span style=“font-size： 15px; font-weight： 500; color： #666;”>先复制，然后逐步制作成自己的作品 🧱</span>
</div>
</div>

## 这节课的意义

<章节引言 :d uration=“duration” ：tags=“['截图克隆'，'AI编码'，'初学者练习']” coreOutput=“一个小项目” expectedOutput=“一个打开并响应输入的网页或小游戏”>

我们将从一个真实产品的截图开始，创建一个在浏览器中运行的小型项目。你可以选择产品主页、数据仪表盘或简单的游戏。

这节课练习一件事：<strong>找到一张你喜欢的截图，交给AI，然后用你自己的话说出你想做什么。</strong>

你不需要懂得编码或准备完整的需求文档。让AI创建第一个版本，查看结果，然后描述应当修改的地方。

</ChapterIntroduction>

<div style=“margin： 50px 0;”>
  <ClientOnly>
    <StepBar ：active=“0” ：items=“[ { 标题：”选择一张图片“，描述：”找到你喜欢的页面“}， { 标题：”给AI“，描述：”拖进聊天“}， { 标题：”说一句话“，描述：”让AI来构建它“}， { 标题：”继续改进“，描述：”一次修正一个差异“} ]” />
  </ClientOnly>
</div>

## 1.选择你想要的工作类型

打开工具前，先决定你今天想要什么样的小结果。

目标不是拥有所有功能的完整产品。它是一个<strong>打开、合理且仅有简单交互的页面</strong>。范围越小，第一次尝试成功的可能性更大。

请选择以下一项：

- <strong>产品主页：</strong>标题、介绍、图片和按钮
- <strong>SaaS仪表盘：</strong>侧边栏、数据卡和图表
- <strong>简单游戏：</strong>移动、点击或一个小目标

选择推荐人时，请检查三点：

1. 你能从一张截图看懂主要内容吗？
2. 页面里有你真正喜欢的内容吗？
3. 构建后，你能否快速判断结果是否相似？

如果你喜欢主页的大标题和颜色，就捕捉它的第一个屏幕。如果你喜欢游戏中的方块世界，保存一张清晰代表它的图片。

::: tip 接近原作到什么程度？
结果越接近，说明你对视觉细节的观察越仔细，也说明你在向 AI 描述差异方面的能力越强。将最终结果与参考图放在一起。感觉相似度是 50%、70% 还是 90%？
:::

::: tip 仅制作一页
不要从登录、付款、聊天、管理面板或移动应用开始。本课的重点是重现你面前的这一屏。
:::

## 2. 跟随老师制作一个网页

首先观看完整过程。一旦理解了，就用自己的截图重复操作。

老师创建了一个空文件夹并在 Trae 中打开。项目名为 `trae-screenshot-demo`；开始时它没有网页或代码。

### 2.1 将参考图提供给 Trae

参考图来自 Framer 展示页面。可以看到大标题、导航、紫色山景和小控件。

![在 Trae 中放置的网页截图](../../../zh-cn/stage-1/clone-your-favorite-app/images/framer-official-interface.webp)

_截图来源: [Framer 网站构建器](https://www.framer.com/solutions/website-builder/)_

将图片拖入 Trae 的聊天后，老师使用了一个非常短的提示语：

```text
Build a webpage that looks like this image. Open it for me when it is ready.
```

图像大致告诉 Trae 页面应该是什么样子；句子说明图像应该变成一个网页。

发送后，等待 Trae 创建文件。在第一个请求完成之前，不要发送更多请求。

### 2.2 查看第一个版本

Trae 创建了 `index.html`、`styles.css` 和 `script.js`，然后在浏览器中打开了网页。课程中生成的动画结果如下：

![从截图生成并运行的 Wishlabs 页面](../../../zh-cn/stage-1/clone-your-favorite-app/images/trae-generated-wishlabs.webp)

暂时不要研究代码。看看页面并与参考比较：

- 紫色的天空和山的氛围保留了。
- 一个大标题仍然占据中心位置。
- 顶部有导航栏，底部附近有一排控制项。
- 文本、按钮和图片构成了完整的第一屏。

这不是精确的复制，但捕捉到了最显眼的结构和氛围。这是一个不错的第一个版本。

### 2.3 第一个版本只需要可见

不要因为字体或按钮位置略有不同而全部推翻。确认页面能够打开，然后选择最明显的问题。

如果标题太小，说：

```text
Make the heading in the center larger.
```

在更改之后再次打开页面。如果它更接近你想要的效果，那么这次迭代是有用的。

::: tip 普通语言就够了
你是在用 Trae 创作，而不是参加提示写作考试。用你平时使用的语言描述你看到的内容。
:::

## 3. 亲自尝试

打开 Trae，创建一个空文件夹，并在 Trae 中打开该文件夹。一个简单的名字，比如 `my-first-page`，就足够了。

然后按照以下步骤操作：

1. 找到你喜欢的网页或游戏截图。
2. 点击聊天旁边的图片按钮，选择该截图。
3. 检查图片是否出现在消息中。
4. 输入一个简短的请求并发送。

```text
Build a webpage that looks like this image.
Open it for me when it is ready.
```

对于这个第一个练习，你不需要指定框架、目录结构或文件名。让 Trae 来选择它们。

如果你只想要视觉风格而不是原始名称和文本，请添加：

```text
Use the style of this image, but replace the name and content with something new.
```

等特雷完成。如果它要求，批准文件创建或项目执行。如果网页没有自动打开，请说：

```text
Start this project for me. I want to see the result.
```

当页面出现时，花十秒钟检查它是否打开，主要内容是否存在，以及主要按钮是否响应。不要一开始就同时更改五件事。

## 4. 同样的方法适用于其他产品

截屏方法不限于产品主页。为了验证这一点，老师又创建了两个空项目：一个数据仪表板和一个积木游戏。

### 示例 1：SaaS 仪表板

SaaS 产品通常使用仪表板来显示项目进度、销售或用户数据。在这个 Linear 截屏中，导航在左侧，仪表板内容在右侧。

![官方 Linear 仪表板界面](../../../zh-cn/stage-1/clone-your-favorite-app/images/linear-official-dashboard.webp)

_课程参考：[Linear 仪表板](https://linear.app/docs/dashboards)_

老师将这张图片放入 Trae 并说：

```text
Build a data dashboard like this one.
Use sample data for now.
```

Trae 生成了一个侧边栏、数据卡片和图表。这是浏览器中运行的页面：

![从截图生成并运行的仪表板](../../../zh-cn/stage-1/clone-your-favorite-app/images/trae-generated-linear-dashboard.webp)

这些数字并不是真实的商业数据，这没关系。第一个练习是构建仪表板结构。在页面稳定后再替换标签和数据。

### 示例 2：方块游戏

如果普通网页不吸引你，可以使用游戏截图。老师选择了一个 Minecraft 方块世界的图片。

![Minecraft 创造模式界面](../../../zh-cn/stage-1/clone-your-favorite-app/images/minecraft-official-creative-mode.webp)

_类参考：[Microsoft Learn 上的 Minecraft 示例](https://learn.microsoft.com/en-us/xbox/accessibility/xbox-accessibility-guidelines/108)_

请求仍然很简短：

```text
Build a block game like this one.
The character should move and place blocks.
```

Trae 创建了一个可玩的浏览器游戏，角色可以移动并放置或移除方块：

![从截图生成并运行的 2D 方块游戏](../../../zh-cn/stage-1/clone-your-favorite-app/images/trae-generated-block-game.webp)

请注意，这个结果是一个<strong>2D 侧视游戏</strong>。角色在平面上移动，画面没有前后深度。因为提示只说了“方块游戏”，Trae 选择了更简单的解释。

打开页面，按箭头键，并点击场景。如果角色可以移动并且可以放置方块，那么第一个 2D 版本就可以运行了。

### 制作另一个 3D 版本

如果你想要类似 Minecraft 的第一人称视角，请在请求中加入“3D”。老师新建了一个空项目，添加了相同的截图，并说道：

```text
Build a 3D block game like this one.
Let the player walk, turn the camera, and place blocks.
```

这一次，Trae 创建了一个真正的 3D 方块世界：

![从截图生成并运行的 3D 方块游戏](../../../zh-cn/stage-1/clone-your-favorite-app/images/trae-generated-3d-block-game.webp)

选择“开始游戏”后，使用 `WASD` 行走，并用鼠标转动视角。左键移除方块，右键放置方块，数字键改变方块类型。

二维和三维各有优势，不能说哪一个永远更好。对于第一款游戏来说，二维更容易。如果在世界中前后行走是你核心的想法，请明确说明你想要三维。

::: tip 使其不同
参考只能作为起点。改变颜色、主题、文字、图片或互动方式，让最终结果逐渐成为你自己的作品。
:::

## 5. 如果第一版不好怎么办？

第一版看起来不同或包含不响应的按钮是正常的。一个项目很少能一次性完成。观察一次，稍作修改，再次观察。

一个常见的新手错误是把所有问题都放在同一条信息中。当一次性修改太多东西时，你无法判断哪一个修改产生了结果。

使用一个更简单的规则：<strong>每轮选择最清晰的问题。</strong>

### 页面看起来不对

如果卡片太高:

```text
The card at the top is too tall. Make it shorter.
```

如果主图太小：

```text
The image in the center is too small. Make it larger.
```

如果背景太暗：

```text
The background is too dark. Use a lighter color.
```

### 页面行为不正确

如果一个按钮没有任何反应：

```text
This button does not respond when I click it. Please fix it.
```

如果游戏角色无法移动：

```text
The arrow keys do nothing. Please fix the movement.
```

### 你不知道如何描述问题

截取当前页面的截图并说：

```text
This is the current result. Compare it with the reference and fix the biggest difference.
```

你不需要知道“边距”或“响应式布局”等术语。“感觉拥挤”、“文字难以阅读”和“移动端页面很杂乱”都是有用的描述。先解决一个问题，然后继续处理下一个。

## 6.教室检查

不要只检查静态图片。打开结果，自己点击或播放。

请检查四件事：

- <strong>打开：</strong>刷新不产生空白页面或错误。
- <strong>这是可以理解的：</strong>另一个人能分辨出这是主页、仪表盘还是游戏。
- <strong>它响应：</strong>主按钮或基本游戏控制正常。
- <strong>保持可读性：</strong>缩小窗口不会让文字和图片重叠严重。

如果有一项失败，就把你观察到的情况告诉Trae，并要求它只修正那个问题。当四项都通过时，练习就算完成了。

::: 提示 完成一件小作品
登录、付款、群聊和在线多人游戏都不是今天课程的一部分。一个完成的小页面比十个未完成的开始更有价值。
:::

## 📚 任务

<StageAssignmentCard 标题=“从一张截图构建你自己的页面”>

  <p>选择你喜欢的网页或游戏图片，交给AI，只复制一个屏幕。</p>

  <ol>
    <li>保留参考截图。</li>
    <li>生成页面并改进你不喜欢的部分。</li>
    <li>保存修订版作品的截图。</li>
  </ol>

  <p>在展示时，将参考文献和你的作品并排放置，并解释你所做的修改。</p>
</StageAssignmentCard>

## 记住什么

我们没有从代码开始。我们从一张截图开始。整个练习包含四个步骤：

1. 截图或保存。
2. 把它交给AI。
3. 用一句话描述作品。
4. 一次解决一个明显的差异。

图片告诉AI产品应该是什么样子。你的文字告诉它产品应该做什么。一旦第一个版本出现，点击、观察和截图可以帮助你解释下一步的变化。

提示词不需要听起来像技术手册。说一句简单的话，开始工作，然后根据眼前的内容继续对话。构建项目会开始感觉不那么遥远。