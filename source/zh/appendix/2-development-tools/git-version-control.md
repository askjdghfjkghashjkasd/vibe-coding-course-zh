# Git 版本控制的原则

> 💡 **学习指南**：本章专为从未使用过 Git 的人而写。我们不会一开始就让你死记命令。相反，我们会先理解“Git 为你解决了什么问题”，然后一步步将命令与概念连接起来。阅读后，你应该能够独立完成：本地提交、创建分支以及推送到 GitHub。

---

## 0. 首先，一个问题：你是否经历过这些噩梦

**场景一：版本地狱**

你正在写论文或代码，写到一半你意识到自己犯了一个错误，想回到三天前的版本——但你找不到它。

```
project_v1.zip
project_v2_revised.zip
project_v3_final.zip
project_v3_final_really_final.zip
project_v3_final_absolutely_no_more_changes.zip
```

每次保存新副本，硬盘都会变得更乱，你甚至记不得哪个版本改了什么。

**情景二：合作噩梦**

你和队友都修改同一个文件：
- 你改了第10行，增加了登录功能
- 你的队友换了10号线，修复了一个漏洞
- 你通过邮件发送代码，合并过程中，一个人的更改覆盖另一个人的
- 没人知道最终哪个代码才是正确版本

**场景三：无“撤销”按钮**

你将新代码部署到生产环境，结果出现了一个bug。你急切地想回滚到之前的稳定版本——但你不知道该怎么做，于是你疯狂地寻找备份。

---

**Git 的创建就是为了解决这三个问题。**

Git 是一个**版本控制系统**。其核心是：**记录你所做的每一次“保存”操作，形成一个完整的历史时间线，让你可以随时返回历史上的任何一个历史节点。**

毫不夸张地说，Git 是现代软件开发中最重要的工具之一。几乎每家公司和每个开源项目都在使用它。

---

## 1.Git 和 GitHub 概述

许多初学者会混淆这两个概念。让我们澄清一下：

| |Git |GitHub |
|:--- |:--- |:--- |
|**这是什么** |运行在你电脑上的版本控制工具 |托管Git仓库的网站（云端） |
|**它在哪里** |你的本地电脑 |在互联网上 |
|**它可以独立使用** |✅可以，它只管理本地历史 |❌需要与Git |
|**比喻**你本地的日记本 |你的日记的云存储 |

简单来说：**Git 是工具，GitHub 是托管服务。** 就像 Word 是工具，OneDrive 是云存储——它们协同工作，但不是同一回事。

除了GitHub，类似的服务还包括GitLab、Gitee（中国）等。

---

## 2.核心概念：三大领域

这是整个Git中最重要的设计。一旦你了解了这三个方面，你就能理解Git的灵魂。

Git 将文件状态划分为三层：

**工作目录**
这是你的**常规文件夹**——你能看到和正在编辑的所有文件都在这里。你可以自由更改任何内容;Git会感知你改动了什么，但不会记录任何内容。

**集结区（索引）**
这是一个**“预提交中转站”。** 你可以把工作目录里想保存的文件“放”到备用区——就像把包裹放进运输箱一样。这些文件还没发出去，但你已经选择了要发送的内容。

**仓库**
这是**永久历史档案库**，隐藏在`.git`文件夹中。每次运行`git commit`，暂停区的内容都会封存到仓库中，形成不可篡改的历史记录。

👇 **试试看**：按顺序点击命令按钮，观察文件在三个区域之间的流动。

<GitCommitFlow />

### “两步”流程的动机（添加提交）

许多初学者会问：为什么不能一键保存？为什么先用`add`，然后才是`commit`？

**因为在现实开发中，你往往不想把所有改动都一次性提交。**

例如：今天你修改了 5 个文件：
- `login.js`：完成了登录功能（想要提交）
- `style.css`：调整了登录页面样式（想要提交）
- `debug.log`：临时调试输出（**不**想要提交）
- `experiment.js`：测试新功能，还未完成（**不**想要提交）
- `todo.txt`：你的个人笔记（**不**想要提交）

如果没有暂存区，你要么提交这 5 个文件（提交历史混乱），要么一个也不提交。

有了暂存区，你可以精确控制：`git add login.js style.css` —— 只把这两个文件放入“发货箱”，然后 `commit`。这次提交清楚地记录了“登录功能完成”。

---

## 3. 第一次使用 Git：初始化与基本工作流程

### 3.1 安装与初始化

安装 Git 后（macOS 自带 Git；Windows 请从 git-scm.com 下载），打开终端并导航到你的项目文件夹：

```bash
# Initialize a Git repository in the current folder
git init

# Git will create a hidden .git folder where all history is stored
# Output: Initialized empty Git repository in .../your-project/.git/
```

第一次使用它时，你还需要告诉 Git 你是谁（这些信息将附加到每次提交中）：

```bash
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

### 3.2 每日工作流程：三步保存法

初始化后，90%的日常开发只是重复以下三个步骤：

**步骤 1：检查状态**

```bash
git status
```

这是你最常使用的命令，无可匹敌。它会告诉你：
- 你所在的分支
- 哪些文件已被修改（红色 = 未暂存）
- 哪些文件在暂存区（绿色 = 已暂存，准备提交）

**步骤 2：将文件放入暂存区**

```bash
# Add a single file
git add login.js

# Add multiple files
git add login.js style.css

# Add all modified files in the current folder (. means "everything")
git add .
```

> ⚠️ 常见的初学者陷阱：`git add .` 非常方便，但会添加所有更改，包括你可能不想提交的文件。养成精确添加的习惯，或者使用 `.gitignore` 来排除你不想追踪的文件（稍后会讲到）。

**第三步：带消息提交**

```bash
git commit -m "feat: add user login feature"
```

`-m` 后面引号中的文本称为 **提交信息**。这是为你未来的自己和你的团队成员而写的——使其有意义。

### 3.3 如何撰写专业的提交信息

```bash
# ❌ Bad examples — reading them tells you nothing about what was done
git commit -m "update"
git commit -m "fix"
git commit -m "changed some things"

# ✅ Good examples: type + colon + one-sentence description
git commit -m "feat: add user login feature"
git commit -m "fix: fix white screen issue on iOS Safari homepage"
git commit -m "docs: update deployment instructions in README"
git commit -m "refactor: split UserService into independent module"
git commit -m "style: unify code indentation to 2 spaces"
```

**常见前缀含义：**

| 前缀 | 含义 |
| :--- | :--- |
| `feat:` | 新功能 |
| `fix:` | Bug 修复 |
| `docs:` | 文档更改 |
| `style:` | 代码格式调整（无功能变化） |
| `refactor:` | 代码重构（功能相同，结构优化） |
| `chore:` | 构建、工具、依赖 |
| `test:` | 测试相关 |

养成这个习惯，几个月后当你浏览历史记录时，你可以一目了然每次提交的内容。这在团队协作中尤为重要。

### 3.4 查看历史

```bash
# Detailed format (full info for each commit)
git log

# Compact format (one line per commit, recommended for daily use)
git log --oneline

# Example output:
# a1b2c3d (HEAD -> main) feat: add user login feature
# 9f3e1b2 init: project initialization
```

---

## 4. 分支概念

**分支** 是 Git 最强大——也是初学者最困惑——的功能。但一旦你理解它们，你会发现其设计非常优雅。

### 4.1 通过分支隔离理解分支概述

想象你在玩一款角色扮演游戏，需要做一个关键选择：
- 选项 A：挑战最终boss（开发新功能）
- 选项 B：继续稳定当前状态（保持主剧情不变）

如果你直接在主存档上选择 A 并失败，你的整个游戏进度都会被破坏。

但如果你**复制你的存档**并在副本中挑战boss：
- 赢了？将副本的进度合并回主存档
- 输了？主存档完全不受影响——删除副本再试

**Git 分支就是这种“复制存档”机制。**

在 Git 中，`main`（或 `master`）分支就是你的“主存档”，它应始终保持稳定和可用。当你想开发新功能时，你会从主分支创建一个新分支，在那里开发和测试，完成后再合并回主分支。

### 4.2 分支可视化演示

👇 **尝试一下**：按顺序点击命令按钮，观察下面的分支图如何分叉、延伸并最终合并。密切注意 HEAD 标签的位置——它始终指向“你当前所在的位置”。

<GitBranchVisual />

### 4.3 分支操作详解

**创建并切换到新分支：**

```bash
# Method 1: Create first, then switch (two steps)
git branch feature-login      # Create branch
git checkout feature-login    # Switch to it

# Method 2: One step (recommended)
git checkout -b feature-login

# Output: Switched to a new branch 'feature-login'
```

创建分支后，你的命令提示符将显示当前分支名称，例如：```
user@mac ~/project (feature-login) $
```

**查看所有分支：**

```bash
git branch

# Output (* indicates the current branch):
# * feature-login
#   main
```

**在一个分支上正常开发：**

```bash
# On the feature-login branch, modify code, add, commit — exactly the same as usual
git add login.js
git commit -m "feat: add login form HTML structure"

git add login.js api.js
git commit -m "feat: complete login API integration"
```

这些提交仅存在于 `feature-login` 分支上。`main` 分支对你所做的更改一无所知。

**切换回主分支并合并：**

```bash
# Switch back to main
git checkout main

# Merge all changes from feature-login
git merge feature-login

# After merging, you can delete the branch (optional)
git branch -d feature-login
```

### 4.4 分支创建的标准

| 场景 | 建议 | 原因 |
| :--- | :--- | :--- |
| 开发新功能 | ✅ 创建分支 | 在功能完成之前不会影响主线；可以随时放弃 |
| 修复紧急生产漏洞 | ✅ 从 main 创建 `hotfix-xxx` 分支 | 直接修复并合并到生产，不会带入未完成的功能 |
| 与团队成员并行开发 | ✅ 每个人创建自己的分支 | 相互不干扰；完成后通过 Pull Request 合并 |
| 修复单个拼写错误 | ❌ 直接在 main 上修复 | 风险很低，无需单独分支 |

### 4.5 常见团队分支策略

在真实项目中，团队通常会统一分支命名约定和用途：

| 分支名称 | 目的 | 特点 |
| :--- | :--- | :--- |
| `main` / `master` | 稳定的生产代码 | 只有经过测试的代码才能进入；禁止直接推送 |
| `dev` / `develop` | 每日集成分支 | 所有功能分支先合并到这里；测试后再合并到 main |
| `feature/xxx` | 特定功能开发 | 例如 `feature/user-login`；完成后合并到 dev |
| `hotfix/xxx` | 紧急修复 | 从 main 创建；修复后直接合并回 main 和 dev |

---

## 5. 与团队协作：远程仓库

到目前为止，你学到的都是关于 **本地** Git 操作——所有历史都存储在你自己的电脑上。要与团队共享代码，你需要一个 **远程仓库**，例如 GitHub 或 GitLab。

### 5.1 远程仓库的工作原理

可以把远程仓库看作团队的 **“共享存档文件”**：

- 每个人在本地编写代码并提交
- 完成后 `push`（上传）到远程仓库
- 团队成员 `pull`（下载）最新内容到自己的本地
- 这样可以保持每个人的代码同步

👇 **动手试试**：按顺序点击命令，体验从关联远程仓库、推送，到拉取队友更新的完整流程。

<GitSyncDemo />

### 5.2 第一次将项目推送到 GitHub

**步骤 1**：在 GitHub 上创建一个新仓库（点击右上角 → New repository）。不要勾选任何初始化选项。

**步骤 2**：回到本地终端，关联远程仓库：

```bash
# Link the local repository with the GitHub repository
# "origin" is the remote repository's alias — a conventional name (you can change it, but there's no need)
git remote add origin https://github.com/your-username/your-repo.git

# Confirm the link was successful
git remote -v
# Output:
# origin https://github.com/your-username/your-repo.git (fetch)

# origin https://github.com/your-username/your-repo.git (push)

```

**步骤 3**：将本地内容推送到远程：

```bash
# First push. -u means "for future git push, default to origin's main branch"
git push -u origin main

# After that, each push only needs:
git push
```

### 5.3 日常协作命令

**提交（你进行了更改并希望队友看到它们）：**```bash
git push
```

**拉取（队友做了更改，你需要同步）：**```bash
git pull
```

`git pull` 实际上是两个命令的组合：
1. `git fetch`：从远程仓库下载最新的提交
2. `git merge`：将下载的内容合并到你当前的分支

**第一次从 GitHub 获取别人项目:**```bash
# Copy the entire remote repository to your local machine (only needs to be done once)
git clone https://github.com/someone/some-project.git

# clone automatically sets up the remote link, so you can just push/pull afterwards
```

### 5.4 推拉的方向

```
Your Computer (Local Repo)  ←→  GitHub (Remote Repo)

git push:   Local → Remote   (you made changes, upload for teammates)
git pull:   Remote → Local   (teammates made changes, download to your machine)
git clone:  Remote → Local   (first-time full copy of the entire repository)
```

> **最佳实践**：每天工作开始时 `git pull` 以获取最新代码；完成工作或完成功能时 `git push` 立即备份并让队友看到你的进展。

---

## 6. 高级：解决冲突

在协作中冲突是不可避免的，但并不可怕。

### 6.1 冲突发生的方式

当你和队友 **同时修改同一文件的同一行** 时，Git 在合并过程中不知道使用哪一个版本，于是就发生了冲突。

例如：
- 你在 `login.js` 的第 5 行写了：`const timeout = 3000`
- 你的队友同时在同一行写了：`const timeout = 5000`
- 当你 `git pull` 或 `git merge` 时，Git 会发现这种矛盾并“暂停”，告诉你：我不知道该使用哪一个 — 由你来决定。

### 6.2 冲突文件是什么样子

Git 会在冲突位置插入特殊标记：

```javascript
function login() {
  const url = '/api/login'

 <<<<<<< HEAD
  const timeout = 3000   // Your version
 =======
  const timeout = 5000   // Teammate's version
 >>>>>>> feature/update-timeout

  return fetch(url, { timeout })
}
```

- 在 `<<<<<<< HEAD` 和 `=======` 之间：你当前分支的内容
- 在 `=======` 和 `>>>>>>> xxx` 之间：正在合并的内容

### 6.3 解决冲突的方法

**步骤1**：打开有冲突的文件，找到所有 `<<<<<<<` 标记（像 VS Code 这样的编辑器通常会自动高亮显示它们）

**步骤2**：决定保留哪部分代码，然后手动编辑文件，移除所有标记符号（`<<<<<<<`、`=======`、`>>>>>>>`）。

例如，决定使用 5000（队友的版本）：```javascript
function login() {
  const url = '/api/login'
  const timeout = 5000   // Adopt teammate's change
  return fetch(url, { timeout })
}
```

**步骤 3**：再次提交

```bash
# Mark the conflict as resolved
git add login.js

# Complete the merge commit (Git will auto-generate a merge commit message)
git commit
```

### 6.4 减少冲突的好习惯

- **经常拉取**：在开始工作前同步最新代码，以减少“落后太多”的情况
- **小而频繁的提交**：不要写了一周代码才提交一次。频繁的小提交更容易发现和解决冲突
- **分支隔离**：为不同功能使用不同分支，以减少对相同行代码的竞争
- **沟通**：在修改共享文件（如 `config.js`）之前，提前通知你的团队成员

---

## 7. 常用命令速查表

<GitCommandCheatsheet />

---

## 8. 实践：加入团队项目的完整工作流程

这是加入新团队或新项目时的标准工作流程 — 你可以直接按照它执行:

```bash
# ① Day one: clone the project to your local machine (only once)
git clone https://github.com/team/project.git
cd project

# ② Start of each workday: pull the latest code to ensure yours is up to date
git pull origin main

# ③ Create your own feature branch (don't modify main directly)
git checkout -b feature/user-profile

# ④ Normal development... write code...

# ⑤ After completing a small feature, commit immediately (don't hoard changes)
git add src/UserProfile.vue
git commit -m "feat: complete user avatar upload feature"

git add src/UserProfile.vue src/api/user.js
git commit -m "feat: complete user profile editing API"

# ⑥ Push your branch to remote so teammates can see it
git push origin feature/user-profile

# ⑦ Create a Pull Request (PR) on GitHub, requesting merge into main
# (This step is done on the GitHub website)

# ⑧ Wait for teammates' Code Review, make changes based on feedback, continue committing + pushing

# ⑨ After PR is merged, go back to main, update local, delete the feature branch
git checkout main
git pull
git branch -d feature/user-profile
```

---

## 9. .gitignore：选择不应被跟踪的文件

有些文件你**不**希望提交到 Git 仓库，例如：
- `node_modules/`：依赖包，体积大，可以通过 `npm install` 重新生成
- `.env`：可能包含数据库密码、API 密钥的环境变量文件——**绝对不能上传到公共仓库**
- `*.log`：日志文件
- `.DS_Store`：macOS 自动生成的隐藏文件
- `dist/`、`build/`：可以重新构建的构建产物

在项目根目录下创建一个 `.gitignore` 文件，用来写入你不想跟踪的文件规则：

```gitignore
# Dependencies
node_modules/

# Environment variables (important! passwords must not be committed)
.env
.env.local

# Build output
dist/
build/

# System files
.DS_Store
Thumbs.db

# Logs
*.log
```

GitHub 提供了适用于各种语言和框架的 .gitignore 模板：[github.com/github/gitignore](https://github.com/github/gitignore)

---

## 术语表

| 术语 | 英文 | 解释 |
| :--- | :--- | :--- |
| **仓库** | 代码仓库 (代码仓库) | 存储项目所有版本历史的数据库，位于 `.git` 文件夹内 |
| **提交** | Commit | 一个完整的版本记录，就像游戏存档一样，包含描述和时间戳 |
| **分支** | Branch | 独立的开发线，就像互不影响的平行时间线 |
| **合并** | Merge | 将一个分支的更改集成到另一个分支 |
| **冲突** | Conflict | 当同一行代码被多人修改且 Git 不知道使用哪个版本时，需要人工解决 |
| **暂存** | Stage / Index | 将修改放入“准备提交”列表的操作 |
| **远程** | Remote | 仓库的云端副本（GitHub / GitLab / Gitee） |
| **克隆** | Clone | 将整个远程仓库复制到本地计算机 |
| **推送** | Push | 将本地提交上传到远程仓库 |
| **拉取** | Pull | 下载远程最新内容并在本地合并 |
| **HEAD** | HEAD | 指向当前分支/提交的指针，表示“你现在的位置” |
| **origin** | origin | 远程仓库的默认别名（约定名称） |
| **储藏** | Stash | 临时保存未提交的更改，在切换任务时非常有用 |
| **拉取请求/合并请求** | Pull Request / Merge Request | 请求将你的分支合并到主分支，通常需要队友审查 |

