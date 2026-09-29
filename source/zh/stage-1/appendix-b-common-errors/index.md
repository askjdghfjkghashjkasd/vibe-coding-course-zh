---
title: '编程时遇到错误该怎么办——带截图向 AI 提问的实用指南'
description: '学习如何高效地向 AI 解决开发中的各种错误问题。掌握截图、描述和定位问题的标准流程，让 AI 成为你的调试助手。'
---

<script setup>
const duration = '大约 <strong>30 分钟</strong>'
</script>

# 编程时遇到错误该怎么办

## 章节概览

<ChapterIntroduction :duration="duration" :tags="['调试技能', 'AI 协作', '问题解决', '开发者工具']" coreOutput="标准化的错误排查流程" expectedOutput="能够独立解决 90% 的常见错误">

在 AI 时代，我们排查错误的方式已经发生了变化。

你不需要记住所有错误类型，不需要成为调试专家，甚至无需完全理解错误的含义。

<strong>你只需要学会一件事：如何向 AI 提问。</strong>

本章将教你一个从 <strong>简单到高级</strong>的排查流程：

1. <strong>步骤 1：直接提问</strong>：描述现象并截图，用一句话提问
2. <strong>步骤 2：补充信息</strong>：如果无法解决，打开 F12 添加关键信息

掌握这个流程后，<strong>你将能够自己解决 90% 的错误</strong>。

</ChapterIntroduction>

::: info 注意
本章中的所有方法均基于实际使用 Cursor/Trae/Claude 等 AI 集成开发环境 的经验，可直接应用于日常开发。
:::

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="0" :items="[
      { title: '直接提问', description: '描述现象并截图' },
      { title: '补充信息', description: '打开 F12 定位问题' },
      { title: '迭代', description: '直到问题解决' }
    ]" />
  </ClientOnly>
</div>

## 1. 核心心态：截图并向 AI 提问

::: warning 为什么本章重要？

许多初学者在遇到错误时的第一反应是：
- 惊慌并开始随机修改代码
- 花半小时搜索“如何解决这个特定错误”
- 尝试自己理解错误的含义
- 独自调试到深夜

<strong>这些都是在浪费时间。</strong>

在 AI 时代，调试变得非常简单：

```
See error → Screenshot → Ask AI → Do what AI says
```

你不需要理解错误，你不需要知道如何调试，甚至不需要知道问题出在哪里。

<strong>你只需要学会如何提问。</strong>

:::

### 1.1 最简单的提问方式

不需要复杂的模板，从两种方法中选择：

**方法一：描述现象**

格式：你刚做了什么，现在发生了什么

```
I just modified the login page code, now the page is blank, what should I do?
```

**方法二：截图**

直接截图当前页面或错误信息

```
[Screenshot]

How to solve this error?
```

**最佳方法：描述   截图**

```
I just modified the login page code, now the page is blank.

[Screenshot]

What should I do?
```

**记住：清楚地描述上下文，添加截图，AI 可以帮助你更快解决问题。**

### 1.2 如何清楚地说明问题

许多初学者知道他们需要提问，但不知道如何表达。实际上，你只需说明三件事情：

**1. 你刚刚做了什么**

```
I just clicked the save button
I just modified the login page code
I just refreshed the page
```

**2. 你现在看到的**

```
Now the page is blank
Now the button has no response when clicked
Now it shows an error message
```

**3. 你想要达到的效果**

```
I want the data to save successfully
I want the page to display normally
I want a prompt to pop up after clicking the button
```

**完整示例：**

```
I just clicked the save button, now the page shows "Save failed" error.

[Screenshot]

I want the form data to save to the database successfully, what should I do?
```

**关键原则：**
- 使用简单语言，不需要技术术语
- 按时间顺序说明：先说你做了什么，然后发生了什么
- 说明你的期望，让AI知道你想要什么

## 2. 第一步：直接描述现象并提问

遇到问题时，<strong>不要急着打开F12</strong>。首先直接描述现象，截图当前页面，并展示给AI。

很多时候，AI在看到截图后可以直接给出解决方案。

### 2.1 如何描述常见现象

::: tip 直接描述即可

**页面为空白**```
The page opens blank, what should I do?

[Screenshot]
```

**按钮点击无响应**```
Clicking this button has no response, help me check.

[Screenshot]
```

**数据不会保存**```
Clicked save, data didn't save, what should I do?

[Screenshot]
```

**样式显示不正确**```
This button position is off, how to adjust?

[Screenshot]
```

**API 错误**```
Calling the API resulted in an error, help me check.

[Screenshot]
```

:::

### 2.2 如果人工智能直接解决它

恭喜，问题解决了！只需根据 AI 的指示进行修改。

### 2.3 如果 AI 说“需要更多信息”

然后你需要打开 F12 并添加关键信息。继续阅读。

## 3. 步骤 2：添加关键信息

当人工智能说它需要更多信息时，打开 F12 并根据问题类型截图相应内容。

### 3.1 何时添加信息

AI 可能会这样回复：
- “请打开控制台看看是否有任何错误”
- “帮我截一下网络面板的屏幕”
- “需要看到具体的错误信息”

此时，根据以下指导添加截图。

### 3.2 添加控制台信息（页面空白/错误）

::: 提示 操作步骤

**步骤 1：按 F12 打开开发者工具**

在 Mac 上是 `Cmd+Option+I`，或者右键点击页面并选择“检查”。

**步骤 2：切换到控制台标签**

**步骤3：截取红色错误消息的屏幕截图**

**第4步：发送到人工智能**

```
Console error is as follows:

[Screenshot]
```

::: 

### 3.3 添加网络信息（数据问题/API 错误）

::: tip 操作步骤

**步骤 1：按 F12 打开开发者工具**

**步骤 2：切换到网络（Network）标签**

**步骤 3：再次执行操作**（点击保存/刷新页面）

**步骤 4：找到对应的请求并截图**

- 查看 URL 和状态码
- 查看 Payload（传递的参数）
- 查看 Response（返回的结果）

**步骤 5：发送给 AI**

```
Network information is as follows:

Request: [Screenshot 1]
Parameters: [Screenshot 2]
Response: [Screenshot 3]
```

::: 

### 3.4 添加元素信息（样式问题）

::: 提示 操作步骤

**步骤 1：右键点击元素 → “检查”**

开发者工具会自动定位到该元素。

**步骤 2：截图样式面板**

**步骤 3：发送给 AI**

```
Element styles are as follows:

[Screenshot]
```

:::

## 4. 第三步：迭代直到解决

### 4.1 低效的方法

这些方法会浪费你的时间：

- 看到错误就恐慌并开始随意修改代码
- 花半小时搜索错误解决方案
- 尝试自己理解每个错误的含义
- 独自调试直到深夜

### 4.2 高效方法

按照这个过程：

- 首先直接描述现象并截图提问
- 当 AI 说需要更多信息时，打开 F12 添加
- 根据建议修改代码
- 修改后进行测试；如果问题仍然存在，继续截图提问

## 5. 总结：完整流程

```
Encounter problem
    ↓
Describe phenomenon directly + screenshot
    ↓
Send to AI: "What should I do?"
    ↓
AI solves directly?
    ↓ Yes
Do what AI says
    ↓
Test if solved
    ↓
    ↓ No / AI needs more information
Open F12, add key information
    ↓
Send to AI again
    ↓
Repeat until solved
```
