# 将你的网站上线（简单）：一键PaaS部署

> 💡 **“上线网站”是什么意思？** 也叫“上线”或“部署/发布”。你自己搭建的网站只能由你自己打开。**把网站放到24小时运行的服务器上，任何人都可以在浏览器里输入网址访问**——就像只有你能读的Word文档一旦发布到博客，所有人都能看到一样;区别在于这次你发布的是完整的网站。

在这本教程中，我们将讲解**最简单的上线网站方式——无需购买服务器，无需学习DevOps**。只需连接您的GitHub仓库，点击几个按钮，您的网站即可上线。我们涵盖四个热门平台：**腾讯云CloudBase**、Vercel**、**Netlify**和**Zeabur**。

# 为什么要使用PaaS平台，而不是自己搭建服务器？

你可能会想：如果所有东西都“在服务器上”，为什么不直接买自己的服务器部署在那里？答案是：**平台帮你处理所有复杂的部分**。

如果你手动部署所有内容，项目通常包含多个步骤：

1. **准备服务器**
   你首先需要从阿里云、腾讯云或AWS EC2等服务提供商购买或租用云服务器。然后你选择其区域、CPU、内存和存储，学习如何远程连接，通常通过SSH连接。
   ![]（/zh-cn/stage-2/backend/zeabur-deployment/images/image2.png）

2. **配置运行环境**
   网页应用只能在正确的环境下运行。Node.js项目需要安装 Node。Python 项目需要 Python 及其依赖。如果版本不匹配，应用可能无法启动。

3. **上传你的文件**
   你需要将本地代码和资源迁移到服务器，通常通过Git或文件传输工具。大型项目如果上传中断，这一步会变得很挫败。

![]（/zh-cn/stage-2/backend/zeabur-deployment/images/image3.png）

4. **启动服务并测试**
   上传后，你需要启动应用，检查分配地址是否能正常使用。如果不行，问题可能是防火墙端口被阻挡，或者是应用的漏洞。这种情况下，你需要检查日志。

5. **维护和更新**
   每次代码更新通常意味着要再上传一次并重启。如果服务器崩溃，你可能需要手动重启服务，或者配置进程管理器来保持服务正常。

像CloudBase、Vercel、Netlify和Zeabur这样的平台存在，旨在消除大部分复杂性。它们自动化了枯燥的部分：

- 购买和配置服务器
- 配置运行时
- 拉取代码
- 启动服务
- 监控运行时间

很多情况下，你只需连接一个GitHub仓库或上传代码，平台就能完成剩下的。

![]（/zh-cn/stage-2/backend/zeabur-deployment/images/image4.png）

---

# 部署平台比较

| 平台 | 主要优势 | 最适合 | 免费套餐 |
|------|------|----------|----------|
| **腾讯云 CloudBase** | 中国大陆访问速度快，强大的微信生态集成 | 面向中国用户，支持微信小程序 | 是 |
| **Vercel** | 前端框架支持优秀，与 GitHub 集成紧密 | 现代 React/Vue/Next.js 前端项目 | 是 |
| **Netlify** | 功能丰富，良好的 Git 工作流，支持表单和认证 | 需要表单或认证的静态网站 | 是 |
| **Zeabur** | 服务组合灵活，多种模板 | 更复杂的项目，包括像 Dify 和 n8n 的工具 | 免费额度约 $5/月 |

---

# 1. 腾讯云 CloudBase

腾讯云 CloudBase 是腾讯的集成云端后端平台，特别适合面向国内用户的开发者使用。

其优势包括：

- **国内访问速度快**
- **微信生态集成**
- **一体化后端解决方案**，包括静态托管、云函数、数据库和存储
- **实用的免费套餐**

## 使用 CloudBase 部署 Web 应用

### 第一步：注册并登录

访问 [腾讯云 CloudBase 控制台](https://console.cloud.tencent.com/tcb)，使用微信或 QQ 登录。

### 第二步：创建环境

点击 `Create Environment` 并选择一个环境名称，例如 `my-web-app`。

> ⚠️ **注意**：CloudBase 免费试用版通常需要兑换码，通常需要关注 CloudBase 官方公众号并获取兑换码。

### 第三步：启用静态网站托管

在环境管理界面中，启用 `Static Website Hosting` 功能。启用后，你将获得一个默认的公共域名。

CloudBase 支持多种部署方式：

- 上传本地构建输出
- 从模板部署
- 从 Git 仓库部署

### 第四步：部署代码

CloudBase 提供三种主要工作流程：

**选项 1：上传本地项目**

- 选择 `Local Project 部署`
- 上传构建好的静态文件，如 HTML、CSS 和 JS
- 通常上传 `dist` 或 `build` 目录

**选项 2：使用模板**

- 从预设项目模板开始
- 常用选项包括 React 和 Vue 入门模板

**选项 3：从 Git 部署**

- 连接 GitHub 仓库
- 设置构建命令，例如 `npm run build`
- 每次推送都可以触发自动重新部署

> 💡 **提示**：你也可以通过命令行进行部署：
>```bash
> # Install CloudBase CLI
> npm install -g @cloudbase/cli
> # Log in
> tcb login
> # Deploy
> tcb hosting deploy ./dist -e your-env-id
> ```

### 步骤5：添加自定义域名（可选）

CloudBase 还支持绑定自己的域名并应用免费的 HTTPS 证书。

---

# 2.维尔塞尔

Vercel 是全球最受欢迎的前端部署平台之一，尤其适合 React、Vue 和 Next.js 项目。

其主要优势：

- **深度GitHub集成**
- **拉取请求的自动预览部署**
- **全球CDN分发**
- **支持无服务器函数**

> ⚠️ **注**：在某些中国大陆网络环境中，Vercel的稳定性可能不如国内选择如CloudBase。

## 用Vercel部署一个网页应用

### 步骤1：注册

访问[Vercel]（https://vercel.com）并登录GitHub。

### 步骤2：导入项目

1. 点击 `Add New Project`
2. 选择你想部署的 GitHub 仓库
3. 如有需要，调整GitHub应用权限

### 步骤3：配置构建设置

Vercel 经常自动检测该框架：

|框架 |构建命令 |输出目录 |
|------|----------|----------|
|反应 |`npm run build` |`build` |
|Vue |`npm run build` |`dist` |
|Next.js |`next build` |- |
|纯HTML|- |根部项目 |

如果检测失败，请手动配置：

- **构建命令**
- **输出目录**
- **安装命令**

### 第四步：部署

点击 `Deploy`，等待构建完成。成功的项目将获得 `xxx.vercel.app` 域名。

### 步骤5：添加自定义域名（可选）

在项目设置中使用 `Domains` 部分绑定你自己的域名。HTTPS 会自动处理。

---

# 3.Netlify

Netlify是另一个强大的前端部署平台，尤其适用于静态网站和单页应用。

其优势：

- **功能丰富的托管**，包括表单处理、认证和边缘/无服务器功能
- **强Git集成**
- **分支预览链接**
- **全球CDN**
- **内置表单处理**
- **内置用户认证工具**

> ⚠️ **注**：Netlify对中国国内用户可能不及CloudBase快。

## 用Netlify部署一个网页应用

### 步骤1：注册

访问[Netlify]（https://www.netlify.com）并注册GitHub、GitLab、Bitbucket或电子邮件。

### 步骤2：导入项目

1. 点击 `Add new site` → `Import an existing project`
2. 选择您的Git服务提供商
3. 授权Netlify
4. 选择存储库

### 步骤3：配置构建设置

|框架 |构建命令 |发布目录 |
|------|----------|----------|
|反应 |`npm run build` |`build` |
|Vue |`npm run build` |`dist` |
|角 |`ng build` |`dist/<project-name>` |
|Next.js |`next build` |`out` |
|纯HTML|- |`.` |

### 第四步：部署

点击`Deploy site`。成功后，你将获得`xxx.netlify.app`域名。

### 步骤5：添加自定义域名（可选）

1. 打开网站设置
2. 访问 `Domain management`
3. 添加你的自定义域名
4. 按照DNS指令操作

### Netlify实用功能

#### 1.形态处理

Netlify 可以采集表单提交，无需专用后端。

```html
<form name="contact" netlify>
  <p>
    <label>Name: <input type="text" name="name" /></label>
  </p>
  <p>
    <label>Email: <input type="email" name="email" /></label>
  </p>
  <p>
    <label>Message: <textarea name="message"></textarea></label>
  </p>
  <p>
    <button type="submit">Send</button>
  </p>
</form>
```

部署后，Netlify 会自动存储提交的数据，并可以将其转发到电子邮件或其他服务。

#### 2. Netlify 功能

Netlify 还支持无服务器函数，这对于不需要维护完整后端的小型 API 非常有用。

例如：

```javascript
exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello from Netlify!" })
  };
};
```

部署后，该函数可通过以下方式访问：

`https://your-domain/.netlify/functions/hello`

#### 3. 本地开发支持

Netlify 提供了一个 CLI：

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Log in
netlify login

# Start local development
netlify dev

# Test functions locally
netlify functions:serve
```

这样你就可以在部署前本地模拟Netlify的表单和功能行为。

---

# 4.泽伯

Zeabur 是一个较新的部署平台，尤其适用于涉及多项服务的复杂项目。

其主要优势：

- **许多内置服务模板**
- **支持多种部署方法**
- **灵活的多军种组合**
- **基于使用量的计费**

## 部署迪菲与泽伯

在前面的章节中，我们已经简要提到了Dify。现在我们可以通过[Zeabur]（https://zeabur.com/projects）轻松启动完整的Dify服务。

首先，打开[控制台页面]（https://zeabur.com/projects）：

![]（/zh-cn/stage-2/backend/zeabur-deployment/images/image5.png）

在该界面中，你会看到一组服务块。顶部有诸如`智能体`、`Servers`、`Docs`和`Templates`这样的选项：

1. **特工**：Zeabur内置的操作问题助手
2. **服务器**：添加或购买云服务器
3. **文档**：官方文件
4. **模板**：内置应用模板

> **image** 可以理解为一个打包的运行环境应用状态。如果服务已经在一台机器上成功配置，它可以打包到镜像中并在其他地方重复使用。

在右上角，你还可以看到你的余额。默认情况下，Zeabur 通常会给你一个大约5美元的每月免费配额。

![]（/zh-cn/stage-2/backend/zeabur-deployment/images/image6.png）

您可以点击天平查看每日用电量：

![]（/zh-cn/stage-2/backend/zeabur-deployment/images/image7.png）

现在让我们创建一个Dify服务。

请点击[控制台主页]（https://zeabur.com/projects）上的`New Project`：

![]（/zh-cn/stage-2/backend/zeabur-deployment/images/image8.png）

Zeabur 支持多种创建服务的方式：

1. **GitHub**
   连接你的GitHub账户，直接从仓库部署。
2. **模板**
   从内置的应用模板开始，比如Dify或n8n。
   ![]（/zh-cn/stage-2/backend/zeabur-deployment/images/image9.png）
3. **数据库**
   部署数据库如MySQL或MongoDB。
   ![]（/zh-cn/stage-2/backend/zeabur-deployment/images/image10.png）
4. **功能**
   部署JavaScript或Python函数。
   ![]（/zh-cn/stage-2/backend/zeabur-deployment/images/image11.png）
   ![]（/zh-cn/stage-2/backend/zeabur-deployment/images/image12.png）
5. **本地项目**
   上传一个本地文件夹，让Zeabur检测如何运行它。
   ![]（/zh-cn/stage-2/backend/zeabur-deployment/images/image13.png）
6. **Docker 映像**
   从已经构建好的 Docker 镜像部署。
   ![]（/zh-cn/stage-2/backend/zeabur-deployment/images/image14.png）
7. **光标**
   直接从你正在编辑的项目中部署到光标。

如果你想部署 Dify，最简单的路径是 **Template**。搜索 `dify`，选择你喜欢的版本，然后继续。

![]（/zh-cn/stage-2/backend/zeabur-deployment/images/image15.png）

然后选择任意项目名称。Zeabur 会根据该名称生成一个临时域名。

![]（/zh-cn/stage-2/backend/zeabur-deployment/images/image16.png）

创建后，你会看到多个服务接连启动。Dify不是单一程序，而是一组协调的服务，所以你需要等它们全部运行起来。

在许多设置中，你可以点击主 Dify 应用获取访问地址。但在这个示例中，最终入口是通过 `nginx` 暴露的，所以你需要打开 `nginx` 服务，找到公共服务地址。

![]（/zh-cn/stage-2/backend/zeabur-deployment/images/image17.png）

等待一段时间后，你应该会看到Dify登录界面。用你的邮箱和密码注册账户，你的Dify服务就准备好了。

![]（/zh-cn/stage-2/backend/zeabur-deployment/images/image18.png）

如果你想要另一个AI工作流程工具，也可以用类似方式启动`n8n`：

![]（/zh-cn/stage-2/backend/zeabur-deployment/images/image19.png）！[]（/zh-cn/stage-2/backend/zeabur-deployment/images/image20.png）

## 用Zeabur和Trae部署一场蛇类游戏

为了探索Zeabur更高级的用途，我们先部署一个更简单的游戏：一款用Trae生成的Snake游戏。

### 部署基于HTML的版本

![]（/zh-cn/stage-2/backend/zeabur-deployment/images/image23.png）

Trae 可以轻松地从纯 HTML 生成基于浏览器的 Snake 游戏。项目本地创建后，您可以使用上述本地项目部署方法将整个文件夹上传到 Zeabur。

![]（/zh-cn/stage-2/backend/zeabur-deployment/images/image24.png）！[]（/zh-cn/stage-2/backend/zeabur-deployment/images/image25.png）！[]（/zh-cn/stage-2/backend/zeabur-deployment/images/image26.png）

部署后，您需要进入服务详情页面：

![]（/zh-cn/stage-2/backend/zeabur-deployment/images/image27.png）

点击左侧的 `Network`，找到 `Public Address`，然后点击 `Generate Domain` 创建公开网址。

![]（/zh-cn/stage-2/backend/zeabur-deployment/images/image28.png）
![]（/zh-cn/stage-2/backend/zeabur-deployment/images/image29.png）

一旦生成了该地址，在浏览器中打开它，你就可以公开玩你的蛇游戏：

![]（/zh-cn/stage-2/backend/zeabur-deployment/images/image30.png）

这种方法同样适用于其他基于静态HTML的网页应用。

### 部署React版本

现在让我们部署一个React应用，而不是普通的HTML应用。与静态HTML相比，React是一个更现代且基于组件的前端框架，在生产环境中很常见。

![]（/zh-cn/stage-2/backend/zeabur-deployment/images/image31.png）

#### 重构为 React 架构

在Trae语中，你可以简单地说：

`Help me refactor this code into a React architecture.`

![]（/zh-cn/stage-2/backend/zeabur-deployment/images/image32.png）

不过，React 应用部署起来要求更高一些，因为它们依赖构建工具链和更结构化的项目布局。

一个特别重要的问题是 **port**。本地 React 开发服务器通常默认监听端口 `3000`。然而，Zeabur 期望部署的应用监听端口 `8080`。

如果你的 React 应用仍然监听 `3000`，部署可能会失败，因为 Zeabur 无法正确路由流量到它。

#### 什么是港口？

你可以把IP地址看作楼里的地址，端口号当作房间号。`IP:port`一起指向特定的服务。

大多数网站不会明确显示端口，因为浏览器会自动假设默认端口：

- `80` 用于 HTTP
- `443` 代表 HTTPS

但对于应用专用服务，如React开发服务器（`3000`）或Zeabur部署（`8080`），移植变得非常重要。

#### “监听端口”是什么意思？

当程序监听端口时，它会告诉操作系统：

`I am waiting here for incoming network requests. Send them to me.`

在建筑类比中，IP 是建筑地址，端口是房间号。React 开发服务器打开房间 `3000`，告诉建筑经理：“任何针对 3000 房间的请求都应该送到我这里。”

当你在本地运行 `npm start` 时，React 通常会选择端口 `3000`。然而，Zeabur 设计用于监听 `8080` 的应用，因此你需要更改默认设置。

#### 更改默认监听端口

最简单的方法就是直接询问 Trae：

`Please help me change the default port of this React project to 8080.`

Trae 可以为你修改相关配置。之后，重新构建项目并再次上传到 Zeabur。

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image33.png)
![](/zh-cn/stage-2/backend/zeabur-deployment/images/image34.png)

一旦你像配置 HTML 项目那样配置了公网地址，React 应用也可以成功提供服务。

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image35.png)
![](/zh-cn/stage-2/backend/zeabur-deployment/images/image36.png)

同样的思路适用于任何在部署前需要调整端口的应用。

---

# ⚠️ 如何暂停或删除 Zeabur 项目

由于服务器资源是有成本的，你应该养成停止不再使用的服务的习惯。

打开项目的 `Settings`：

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image21.png)

滚动到页面底部，你会看到如下控件：

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image22.png)

你可以：

- 点击 `Suspend All Services` 暂停所有服务以降低成本
- 点击 `Restart All Services` 如果某些服务卡住，重新启动它们
- 点击 `Delete Project` 如果你确定不再需要它

---

# 总结

在本教程中，我们介绍了四个常用的部署平台：

1. **腾讯云 CloudBase**：适合中国国内用户，且与微信生态集成良好
2. **Vercel**：非常适合现代前端框架和基于 GitHub 的工作流
3. **Netlify**：强于托管静态网站，同时支持表单、身份验证及其他功能
4. **Zeabur**：非常适合具有多个服务和模板的复杂项目

你选择哪一个平台取决于你的需求：

- 针对主要中国国内用户，**CloudBase** 往往是首选
- 对于 React、Next.js 等技术栈，**Vercel** 或 **Netlify** 是很好的选项
- 需要静态站点且附加表单或身份验证功能，**Netlify** 特别有用
- 对于 Dify、n8n 等多服务设置，**Zeabur** 往往是最简单的选择

无论你选择哪个平台，部署工作流程在概念上都是类似的：

**准备代码 → 选择平台 → 配置构建 → 部署**

一旦你理解了这个流程，你就可以开始为全球用户发布自己的项目。