# Git 和 GitHub 工作流程

在前面的章节中，我们已经学习了如何使用基于网页的 Vibe 编程工具编写代码。每次对话都可能生成代码的新版本。但这就提出了一个重要问题：如果我们想回到以前的版本，有没有方便的方法可以做到？有没有工具可以在不同阶段记录我们的代码，以便我们可以自由切换版本？

这正是版本控制软件存在的原因。在本章中，我们将介绍最著名的版本控制系统 **Git**，以及最流行的代码托管平台 **GitHub**。你将学习如何使用 Git 管理代码，如何从 GitHub 下载代码，如何上传自己的工作，以及如何与他人合作完成更大的项目。

无论你是在跟踪个人项目的变化、与团队同步代码，还是参与开源贡献，Git 和 GitHub 都是现代开发者必备的工具。一旦你理解了它们，你就可以更自信地管理代码，在需要时创建检查点，在项目的不同阶段之间切换，并保持每次更改可追踪。

> 💡 **先决条件**
>
> 在学习 Git 之前，最好了解以下内容：
> - [什么是终端 / 命令行](/en/appendix/2-development-tools/command-line-shell)
> - [什么是 Git](/en/appendix/2-development-tools/git-version-control)
>
> 本章重点是 GitHub 工作流程和实际操作，而以上链接涵盖了核心基础知识。

# Git 快速入门

在使用 Git 之前，请确保你已经了解了命令行和 Git 本身的基础知识。本章假设你有这些基础，直接进入安装、配置和 GitHub 实践协作。

## 如何安装 Git

我们将简要介绍在三大操作系统上的安装方法。

### Windows

1. 访问 [Git 官方下载页面](https://git-scm.com/download/win)，下载与你的系统匹配的安装程序。在大多数情况下，推荐使用 x64 安装程序。
2. 双击安装程序并按照安装向导进行操作：
   ![](/zh-cn/stage-2/backend/git-workflow/images/image5.png)
   1. 在大多数情况下，保留默认设置即可。如果你要自定义，请注意以下选项：
      - **默认编辑器**：你可以保持 Vim，或者如果已经安装 Visual Studio Code，可以选择它。
        ![](/zh-cn/stage-2/backend/git-workflow/images/image6.png)
      - **如何从命令行使用 Git**：实际的默认选项是在不复杂化系统设置的情况下，将 Git 添加到命令行和第三方软件中。
        ![](/zh-cn/stage-2/backend/git-workflow/images/image7.png)
3. 安装完成后，在桌面右键点击。如果你看到 `Git Bash Here`，说明安装成功。

![](/zh-cn/stage-2/backend/git-workflow/images/image8.png)

### macOS

在 macOS 上，你可以先在终端中运行 `git --version` 来检查 Git 是否已安装。如果没有，macOS 通常会提示你自动安装开发者工具。

1. 方法一：使用 Homebrew 安装
   如果你有 [Homebrew](https://brew.sh/)，打开终端并运行 `brew install git`
2. 方法二：安装 Xcode 工具
   你也可以从 Apple 安装 Xcode 或 Xcode 命令行工具。Git 包含在该工具链中。

### Linux

大多数 Linux 发行版通过系统包管理器安装 Git：

- Ubuntu / Debian:

```bash
sudo apt update
sudo apt install git
```

- CentOS / RHEL：

```bash
sudo yum install git
```

要验证安装，请运行 `git --version`。如果出现版本号，说明 Git 已准备好。

## 初始化 Git 身份

安装 Git 后，你首先应该做的是配置用户信息。在终端中运行以下命令，并将值替换为你自己的信息：

```bash
# Set the global username shown in commit history
git config --global user.name "Your Name"

# Set the global email, ideally the same one you use on GitHub
git config --global user.email "your.email@example.com"
```

Git 会将此信息写入每个提交作为作者身份。当你查看版本历史时，你可以清楚地看到谁修改了什么，并在协作项目中更容易进行交流。

你可以通过以下命令确认配置：

```bash
git config --list
```

# 什么是GitHub？

GitHub 是一个基于 Git 构建的代码托管平台。它为 Git 仓库提供远程存储，并增加了 Issue、Pull Request 和 Projects 等协作工具。简单来说，Git 是本地版本控制工具，而 GitHub 是远程代码仓库和协作层。

GitHub 也是全球最大、最具影响力的开源社区。开源的理念是任何人都可以下载并运行项目的源代码。这让全球的人们能够相互检查、改进，并在其基础上构建新内容。

![]（/zh-cn/stage-2/backend/git-workflow/images/image9.png）

大型公司通常会在GitHub上开源工具和教程，作为其技术战略的一部分。在GitHub生态系统中，项目获得的`stars`数量是衡量信任和影响力的最显著指标之一。

![]（/zh-cn/stage-2/backend/git-workflow/images/image10.png）

本课程还发布了许多辅助资源和作业，发布在GitHub仓库中。通过学会上传自己的作品，你逐步构建出未来用于实际应用开发的工作流程。

## 创建一个GitHub账号

1. 访问[GitHub]（https://github.com/），点击右上角的`Sign up`。
   ![]（/zh-cn/stage-2/backend/git-workflow/images/image11.png）
2. 输入您的电子邮件地址，创建密码，并完成验证步骤。
3. 确认您的邮箱，您的账户即可完成。

## 在GitHub上创建你的第一个仓库

接下来，让我们创建你的第一个仓库，通常简称为 `repo`。

![]（/zh-cn/stage-2/backend/git-workflow/images/image12.png）！[]（/zh-cn/stage-2/backend/git-workflow/images/image13.png）

![]（/zh-cn/stage-2/backend/git-workflow/images/image14.png）

创建仓库时，主要字段的含义为：

1. **仓库名称**：仓库的公开名称
2. **描述**：简要说明仓库的用途
3. **可见度**：
   - `Private`：只有你和你明确邀请的人能看到
   - `Public`：任何人都能看到
4. **README**：添加README是个好习惯。可以把它看作仓库的介绍和使用指南。
5. **.gitignore 和许可**：
   1. `.gitignore`告诉Git哪些文件或文件夹不应被追踪，如临时文件、依赖文件夹或本地秘密。
   2. `license` 决定他人如何使用你的开源代码。

对于你的第一个仓库，合理的做法是勾选`Add README`，将可见性设置为`Private`，并填写你喜欢的名字和描述。然后点击`Create repository`。

![]（/zh-cn/stage-2/backend/git-workflow/images/image15.png）

你现在将拥有一个干净的仓库，准备好存放你的文件。

![]（/zh-cn/stage-2/backend/git-workflow/images/image16.png）

下载仓库时，使用`git clone`，需要仓库网址。点击绿色的`Code`按钮即可找到。GitHub通常会同时显示HTTPS和SSH选项。

![]（/zh-cn/stage-2/backend/git-workflow/images/image17.png）

一般来说，HTTPS适合临时下载或快速测试，但对于你自己的日常开发流程，SSH通常是更好的体验。

## 将本地SSH绑定到GitHub

在GitHub中，“绑定SSH”意味着将你本地机器的SSH公钥连接到你的GitHub账户，以便GitHub通过SSH协议识别你的设备。一旦设置好，你可以安全地`clone`、`pull`和`push`，而无需每次重新输入密码。

简单来说：这就像给你的设备发一张专门的GitHub访问卡。

> 💡 什么是SSH？

### 为什么要使用SSH认证？

GitHub 支持两种主要的仓库操作协议：

- **HTTPS**：推送通常需要密码或个人访问令牌
- **SSH**：使用密钥对，无需频繁重复认证

SSH 绑定是使用 GitHub 配合 SSH 的前提条件。你必须将本地的 SSH 公钥上传到 GitHub，这样 GitHub 才能验证你的机器。

### 核心逻辑：SSH 密钥对

SSH 认证依赖于一对密钥：

1. **私钥**：存储在本地机器上，绝不共享
2. **公钥**：已上传到 GitHub

当你通过SSH执行Git操作时：

- 你的机器用私钥签署请求
- GitHub会对照你上传的公钥
- 如果匹配成功，则允许该操作

### 实际步骤

核心工作流程很简单：**生成密钥对，→将公钥上传到GitHub**。

1. **本地生成SSH密钥对**
   1. **利用Trae来帮助生成它**
      提示：
      `Help me create the SSH key needed for GitHub login. My email is your_email@gmail.com. Please return the public key for me to copy.`

   ![]（/zh-cn/stage-2/backend/git-workflow/images/image18.png）

   输入提示后，你可能还需要在终端面板中按 `Enter` 以继续命令。Trae 完成后，会显示要复制的公钥。

   ![]（/zh-cn/stage-2/backend/git-workflow/images/image19.png）

   2. **手动生成它**
      打开终端并运行 `ssh-keygen -t ed25519 -C "your_email@example.com"`
      除非你想要自定义路径或密码短语，否则请按 `Enter` 接受默认设置。这会创建：

      - `id_ed25519`：你的私钥，必须保持本地状态
      - `id_ed25519.pub`：你的公钥，你将上传到 GitHub

2. **将公钥上传到GitHub**

   这就是绑定步骤本身。

   1. 复制公钥：
      - 在Windows上，打开`C:\Users\<your>\.ssh\id_ed25519.pub`
      - 在macOS/Linux上运行`cat ~/.ssh/id_ed25519.pub`
   2. 在GitHub中，访问你的头像→`Settings` → `SSH and GPG keys` → `New SSH key`
      ![]（/zh-cn/stage-2/backend/git-workflow/images/image20.png）！[]（/zh-cn/stage-2/backend/git-workflow/images/image21.png）
   3. 输入标题并粘贴公钥。

![]（/zh-cn/stage-2/backend/git-workflow/images/image22.png）

![]（/zh-cn/stage-2/backend/git-workflow/images/image23.png）

3. **验证绑定**

跑 `ssh -T git@github.com`

如果你看到类似`Hi [your GitHub username]! You've successfully authenticated...`的提示，说明设置成功了。

### 重要注释

- 如果你使用多个设备，为每个设备创建一个独立的 SSH 密钥对，并将每个公钥上传到同一个 GitHub 账户。
- 永远不要分享你的私钥。
- 设置SSH后，使用如`git@github.com:username/repository.git`等SSH仓库URL，而非HTTPS URL。
- 如果你之前通过HTTPS克隆了仓库，可以用`git remote set-url origin <new-ssh-url>`进行切换

# 使用 Trae 进行 GitHub 运营

现在我们已经涵盖了Git、GitHub、SSH和设置流程，你可以开始请Trae协助Git操作。

## `git clone`：下载现有仓库

你可以直接告诉Trae你想克隆哪个仓库的URL。

![]（/zh-cn/stage-2/backend/git-workflow/images/image24.png）

## `git pull`：获取最新的远程更新

在编辑之前，尤其是在共享仓库中，你应该先拉取最新的更改。

**务必包含文件夹名称及其相对或绝对路径，以免误拉错误的仓库。**

提示：
`Help me pull this repository AIID-TEST in ./AIID-TEST.`

## `git commit` 和 `git push`：准备、保存并上传你的更新

在你本地修改文件后，可以让Trae检测这些更改，帮你推送到GitHub。

提示：
`I finished. Commit and push to the repository AIID-TEST in ./AIID-TEST.`

![](/zh-cn/stage-2/backend/git-workflow/images/image25.png)

如果推送成功，您将能够立即在 GitHub 上看到更新的内容。

# 参考资料

- Pro Git 书籍: https://git-scm.com/book/en/v2
- GitHub 文档: https://docs.github.com/en