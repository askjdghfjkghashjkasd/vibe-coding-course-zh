# 环境变量与 PATH 入门

> 💡 **学习指南**：每次你在终端输入 `git` 或 `python` 时，系统都需要找到该程序的位置。每次你的代码调用大型模型 API 时，程序都需要知道使用哪个密钥。这两项任务都依赖相同的底层机制——**环境变量**。

---

## 0. 每个程序都有一组配置

每个运行中的程序都保存一组“键=值”形式的配置，称为**环境变量**。程序可以在任何时候读取这些配置，以了解其当前的运行环境。

点击下面列表中的任何变量即可在终端“查看”其值：

<EnvVarOverviewDemo />

---

## 1. PATH：Shell 如何找到你输入的命令

`PATH` 是一个特殊的环境变量，用于存储目录路径列表（用冒号分隔）。当你输入 `git` 时，Shell 会按顺序搜索这些目录中的可执行文件 `git`，一旦找到第一个匹配项就停止搜索。

```bash
$ echo $PATH
/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin
```

选择一个命令并观察 Shell 如何逐步搜索目录：

<PathSearchDemo />

**三个关键规则**：
- PATH 中列出的目录越靠前，优先级越高
- 搜索在找到第一次匹配时停止 —— 不再检查其他目录
- 如果所有目录都不包含该命令 → `command not found`

---

## 2. 安装工具后需要重启终端的原因

当你安装像 nvm、Homebrew 或 conda 这样的工具时，安装脚本会自动向 `~/.zshrc` 添加一行，将其目录加入 PATH：

```bash
# Content automatically written by the installer (example)
export PATH="/usr/local/opt/python@3.12/bin:$PATH"
```

这行代码只有在**新的 Shell 启动**时才会执行。已经打开的终端窗口不会受到影响，所以：

```bash
# Take effect immediately without restarting
source ~/.zshrc
```

**使用 AI 开发工具的常见场景**：

```bash
# Ollama / pipx installed but getting "command not found"
which ollama          # Check actual installation location

# pip-installed CLI tool paths (add to PATH)
# macOS: ~/Library/Python/3.x/bin
# Linux: ~/.local/bin
export PATH="$PATH:$HOME/.local/bin"

# Recommended: use pipx to install CLI tools, manages PATH automatically
pipx install aider-chat
```

---

## 3. 变量作用域：谁可以查看变量概览

环境变量不会广播到所有程序——每个进程都持有**自己的副本**，继承自父进程。修改自己的副本不会影响父进程。

下图显示了三个层级。在“用户层级”导出一个新变量，看看它是否会出现在“进程层级”中：

<EnvScopeDemo />

---

## 4. export：确定子进程是否可以读取变量

在设置变量时，包含或省略 `export` 会产生完全不同的效果：

<EnvExportDemo />

为了使变量在会话之间持续存在，请将 `export` 语句写入配置文件：

```bash
# macOS (zsh)
echo 'export MY_VAR="value"' >> ~/.zshrc
source ~/.zshrc       # Takes effect immediately, no need to reopen the terminal

# Linux (bash)
echo 'export MY_VAR="value"' >> ~/.bashrc
source ~/.bashrc
```

---

## 5. API 密钥：绝不要在源代码中硬编码它们

在调用 OpenAI、Anthropic、DeepSeek 等的 API 时，你的密钥本质上就是你的“身份证·信用卡”。如果泄露，别人可以消耗你的配额——费用由你承担。

最常见的错误是将密钥直接硬编码在源代码中：

<ApiKeyDangerDemo />

---

## 6. 本地开发：使用 .env 文件管理密钥

在本地开发期间，将密钥存储在项目根目录下的 `.env` 文件中。你的代码通过 dotenv 库读取它们。`.env` 必须添加到 `.gitignore`，且绝不可提交到 Git。

左侧配置，右侧读取——切换语言查看两种方法：

<DotEnvDemo />

---

## 7. 生产环境：让运行时平台注入密钥

`.env` 是开发阶段的便利工具。在服务器和云平台上，**运行时环境** 应负责注入密钥。代码本身应完全不知密钥存储位置：

<ServerSecretDemo />

---

## 8. 实用故障排除

### `command not found`

```bash
# Step 1: Check if it's in PATH
which python3         # If there's output, it was found

# Step 2: Find the program's actual location (macOS)
brew list python | grep bin

# Step 3: Add the directory to PATH
export PATH="/found/path:$PATH"
source ~/.zshrc       # Remember to source after writing to config file
```

### 安装了两个版本，但没有使用我想要的那个

```bash
which python
# /usr/bin/python ← Old system version, earlier in PATH

# Put the new version's directory at the front of PATH
export PATH="/usr/local/bin:$PATH"

which python
# /usr/local/bin/python ← New version, now takes priority
```

### 变量已设置，但程序无法读取它

| 原因 | 解决方案 |
|:---|:---|
| 忘记了 `export` | 添加 `export` 并重试 |
| 修改了 `~/.zshrc` 但没有生效 | 运行 `source ~/.zshrc` |
| 使用 `.env` 但未安装 dotenv | `pip install python-dotenv` / `npm install dotenv` |
| 在服务器上，变量只在 SSH 会话中有效 | 使用 systemd `EnvironmentFile` |

---

## 快速词汇表

| 术语 | 含义 |
|:---|:---|
| **PATH** | Shell 用于搜索可执行文件的目录列表，冒号分隔；顺序决定优先级 |
| **export** | 将变量标记为可继承，使子进程自动获得一份副本 |
| **source** | 在当前 Shell 中重新执行配置文件，使更改立即生效 |
| **which** | 显示命令的可执行文件路径（PATH 搜索的结果） |
| **.env** | 用于开发密钥的项目本地配置文件；必须添加到 `.gitignore` |
| **.env.example** | 包含完整变量名但值为空的模板；可安全提交到 Git |
| **chmod 600** | 文件权限：只有所有者可以读写；适合保护密钥文件 |
| **Secret Scanner** | GitHub 及其他平台会自动扫描泄露的密钥，并通知供应商吊销它们 |