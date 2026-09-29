# 包管理器简介

> 💡 **学习指南**：写代码时不必重新发明轮子——你所需功能的 99% 已经有人在线编写并发布了。**包管理器**就是帮助你查找、下载并管理这些“现成部件”的工具。本章围绕一个核心问题：**如何让代码依赖可复现、可协作且可维护？**

---

## 0. 为什么确实需要包管理器

想象你想编写一个发送 HTTP 请求的 Node.js 程序。有两条路径：

- **方法 A（手动）**：自己实现 TCP 连接、HTTP 协议解析、重定向处理、超时机制……可能需要数千行代码，几个月的调试。
- **方法 B（包管理器）**：`npm install axios`，一行代码，十秒完成。

包管理器本质上是 **代码的“应用商店”**。它可以帮助你：

1. 在中央仓库（Registry）找到他人发布的库
2. 自动下载并安装到你的项目中
3. 处理你的库所依赖的库（依赖的依赖）
4. 记录你使用的确切版本，保证团队协作不出问题

---

## 1. 不同语言/系统生态下的包管理器

不同的编程语言和操作系统有各自的工具链，但底层逻辑完全相同。

👇 **动手试试**：选择一个你熟悉的生态，探索其主流包管理工具。

<PackageManagerOverviewDemo />

### 1.1 包从哪里来——中央仓库

每个生态背后都有一个中央仓库，用于存储所有可下载的包：

| 生态系统 | 仓库 | 包数量 |
| :--- | :--- | :--- |
| JavaScript | [npmjs.com](https://npmjs.com) | 200 万 |
| Python | [pypi.org](https://pypi.org) | 50 万 |
| Rust | [crates.io](https://crates.io) | 15 万 |
| Go | [pkg.go.dev](https://pkg.go.dev) | 50 万 |
| macOS/Linux 工具 | [formulae.brew.sh](https://formulae.brew.sh) | 7,000 |
| Windows 软件 | [winget.run](https://winget.run) / [chocolatey.org](https://chocolatey.org) | 数万 |

### 1.2 JavaScript 的三巨头：npm vs yarn vs pnpm

功能类似，主要差异在 **速度和磁盘占用** ：

```text
Disk usage: pnpm (hard link sharing) < yarn PnP (zero node_modules) < npm (full copy)
Install speed: pnpm ≈ yarn > npm
Usage: npm (most universal) > pnpm (recommended for new projects) > yarn (some teams)
```

**推荐**：新项目使用 `pnpm`，现有项目继续使用现有工具，不要随意切换。

### 1.3 Windows 三巨头：winget vs Chocolatey vs Scoop

| | winget | Chocolatey | Scoop |
| :--- | :--- | :--- | :--- |
| **官方支持** | 微软官方 | 第三方 | 第三方 |
| **需要管理员权限** | 部分需要 | 是 | **不需要** |
| **最适合** | 日常软件安装 | 企业批量部署 | 开发工具管理 |
| **软件包数量** | 多，增长快 | 最多（10,000） | 专注于开发工具 |

**推荐**：日常使用 `winget`，开发工具使用 `scoop`，企业自动化使用 `Chocolatey`。

---

## 2. 安装软件包 — 背后发生了什么

在输入 `npm install axios` 之后，命令行会安静几秒钟，然后完成。那几秒钟到底发生了什么？

👇 **动手试试**：选择一个软件包，点击“运行”，观察完整安装过程。

<PackageInstallDemo />

### 2.1 四个阶段说明

**① 依赖关系解析**

包管理器首先“理解”你要安装的内容。以 `axios` 为例——它自身依赖于 `follow-redirects`、`form-data` 等软件包，这些也需要安装。这个过程称为 **构建依赖树**。

**② 获取**

从注册表下载所有需要的软件包（压缩的 `.tgz` 文件）。智能包管理器会：
- 并行下载多个软件包，而不是逐个等待
- 先检查本地缓存——如果命中，则跳过网络

**③ 链接**

将下载的软件包解压到 `node_modules/` 目录，并建立引用关系。

**④ 写入锁文件**

将此次安装的 **精确版本号** 写入 `package-lock.json`（或 `yarn.lock` / `pnpm-lock.yaml`）。

### 2.2 最常用命令速查表

```bash
# ── JavaScript (npm) ──────────────────────────────────
npm install              # Install all dependencies per package.json
npm install axios        # Install a new package (production dependency)
npm install -D jest      # Install a dev dependency (only used during development)
npm install -g tsx       # Global install (available in any directory)
npm uninstall axios      # Uninstall a package
npm update               # Upgrade all packages to latest compatible versions
npm run build            # Run scripts defined in package.json
npx create-react-app .   # Run temporarily without installing to project

# ── Python (pip) ──────────────────────────────────────
pip install requests           # Install a package
pip install requests==2.28.0   # Install a specific version
pip freeze > requirements.txt  # Export current dependency list
pip install -r requirements.txt # Install from a list

# ── Rust (cargo) ──────────────────────────────────────
cargo add serde    # Add a dependency (auto-updates Cargo.toml)
cargo build        # Build the project
cargo test         # Run tests
cargo run          # Run the project

# ── Go (go mod) ───────────────────────────────────────
go get github.com/gin-gonic/gin  # Add a dependency
go mod tidy                      # Clean up dependencies (remove extras, add missing)
go build ./...                   # Build

# ── Windows (winget) ──────────────────────────────────
winget install Git.Git           # Install software
winget upgrade --all             # Update all installed software
```

### 2.3 npm 脚本概述

`package.json` 中的 `scripts` 字段是 npm 内置的 **任务运行器**：

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "test": "jest",
    "lint": "eslint src/"
  }
}
```

运行：`npm run dev`，`npm run build`。好处：
- **统一入口点**：团队成员无需记住底层工具命令
- **自动环境设置**：运行时会自动将`node_modules/.bin`添加到PATH中，因此本地安装的工具可以直接使用

---

## 3. 全局安装与本地安装

这是初学者最容易困惑的概念之一。

### 3.1 区别

```bash
npm install axios        # Local install: into ./node_modules/, only available in current project
npm install -g typescript  # Global install: into system directory, available in any project/directory
```

| | 本地安装 | 全局安装 |
| :--- | :--- | :--- |
| **位置** | `./node_modules/` | 系统级目录（例如 `/usr/local/lib/`） |
| **最佳用途** | 项目依赖库（axios、vue、react） | CLI 工具（tsc、eslint、create-react-app） |
| **版本隔离** | 每个项目有独立版本 ✅ | 全机共享一个版本 ⚠️ |
| **团队一致性** | 锁文件确保一致性 ✅ | 不同人可能有不同版本 ⚠️ |

### 3.2 黄金法则

> **库依赖（axios、lodash、vue）应始终本地安装；
> CLI 工具（tsc、eslint）也最好本地安装，通过 `npx` 调用。**

**为什么 CLI 工具也推荐本地安装？**

假设你全局安装了 `eslint@8`，但项目 A 需要 `eslint@9` 的新规则——你就得在全局版本和项目版本之间来回切换。将 `eslint` 本地安装并通过 `npx eslint .` 调用，这样每个项目都可以独立配置自己的版本。

### 3.3 npx — 临时运行，不污染环境

`npx` 是 npm 内置的包运行器，它可以让你**在不安装的情况下运行一个包**：

```bash
# Run create-vue without installing it, to initialize a project
npx create-vue my-project

# Run prettier without installing it, to format files
npx prettier --write src/

# Force a specific version (ignoring any installed version)
npx typescript@5.4 tsc --version
```

Python 的 `uvx` 和 Rust 的 `cargo run` 也提供类似的“临时运行”功能：

```bash
uvx ruff check .       # Python: temporarily run the ruff checker
cargo install ripgrep  # Rust: install globally, becomes system command rg
```

---

## 4. 版本号的秘密——语义化版本

在`package.json`，你会看到如下条目：

```json
{
  "dependencies": {
    "axios": "^1.6.8",
    "typescript": "~5.4.0"
  }
}
```

这里的@@0@和`~`是什么意思？

👇 **试用**：将鼠标悬停在版本号的各个部分上以理解其含义;点击范围操作符查看哪些版本被接受。

<DependencyTreeDemo />

### 4.1 注释动机 别动

|方法|优点 |缺点 |
|:--- |:--- |:--- |
|`"axios": "1.6.8"`（精确密码）|完全可预测 |安全补丁无法自动更新 |
|`"axios": "^1.6.8"`（兼容范围，推荐）|自动获取漏洞修复及新功能 |偶尔可能会引入轻微不兼容 |
|`"axios": "*"`（任何版本） |始终更新 |重大版本升级可能会完全破坏代码 |

**最佳实践**：用`^`声明范围，用锁文件固定实际版本——两者同时使用。

### 4.2 依赖地狱概述

当你依赖50个包，而每个包又依赖几个包时，“依赖树”可能有数百个节点。如果你的两个依赖需要**同一个库的不兼容版本**，你就存在“依赖冲突”。

不同生态系统如何解决这个问题：
- **npm v3 **：同一主版本被提升到顶层并共享;不同的主版本各自获得独立副本
- **pnpm**：硬链接严格隔离，根本防止“幻影依赖”（无需声明即可使用包）
- **cargo（Rust）**：语言层面强制每个包只能依赖同一版本，完全避免冲突
- **go mod （Go）**：最小版本选择（MVS）策略，选择满足所有约束的最低版本

---

## 5.Lockfiles — 团队协作的基石

### 5.1 需要锁档的动机

假设`package.json`说`"axios": "^1.6.0"`：

- 你今天安装→会收到`1.6.8`
- 你的队友明天安装→可能会收到`1.7.0`（昨晚发布）
- 下周CI服务器→可能会收到`1.7.1`

代码相同，结果却不同。**lockfile** 记录每个软件包的具体版本，所以每个人安装方式完全相同。

|场景 |指挥 |行为 |
|:--- |:--- |:--- |
|开发环境同步 |`npm install` |引用锁文件，不升级版本 |
|CI / 生产部署 |`npm ci` |**严格遵循锁文件;存在差异时会报错 |
|当前版本升级 |`npm update` |升级在允许范围内，更新锁文件 |

### 5.2 锁文件是否应该提交到 git

**应用程序必须提交;发布到NPM的库则不必提交。**

- ✅ **Web 应用、后端服务**：必须提交以确保部署环境和开发环境完全相同
- ❌ **npm-publish library**：通常不提交;库用户有自己的锁文件
- ✅ **Python 项目**：`requirements.txt` 本身作为锁文件，应提交
- ✅ **围棋项目**：`go.sum`必须提交以进行完整性验证

---

## 6.Python 虚拟环境

Python 有一个需要特别关注的概念：**虚拟环境（venv）**。

**为什么需要他们？**

Python 默认是全局安装包。你的项目 A 需要 `requests==2.28`，项目 B 需要 `requests==2.31`——它们会冲突。

**解决方案**：为每个项目创建一个独立的虚拟环境，避免它们相互干扰。

```bash
# 1. Create a virtual environment (run in project root directory)
python -m venv .venv

# 2. Activate the virtual environment
source .venv/bin/activate        # macOS / Linux
.venv\Scripts\activate           # Windows (Command Prompt CMD)
.venv\Scripts\Activate.ps1       # Windows (PowerShell)

# 3. After activation, pip install only affects the current virtual environment, not the global one
pip install requests

# 4. Exit the virtual environment
deactivate
```

> ⚠️ **常见的 Windows 问题**：PowerShell 默认阻止脚本执行。首次运行：
> ```powershell
> Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
> ```

**现代替代方案**：
- `conda create -n myproject python=3.11` — 甚至管理 Python 版本本身
- `uv venv && source .venv/bin/activate` — 用 Rust 编写，运行速度极快

**`.venv` 应该提交到 Git 吗？**

不！`.venv` 是本地生成的，应该添加到 `.gitignore`。使用 `requirements.txt` 或 `pyproject.toml` 来描述依赖项。

---

## 7. 常见问题速查表

**问：`node_modules` 应该提交到 Git 吗？**

不！它通常有数百 MB 大，应添加到 `.gitignore`。使用 `package-lock.json`，任何人都可以快速用 `npm install` 重新构建它。

**问：安装失败 / 出现奇怪错误？**

```bash
# Clear cache, delete old installation, start fresh
npm cache clean --force
rm -rf node_modules package-lock.json   # macOS/Linux
rmdir /s /q node_modules && del package-lock.json  # Windows CMD
npm install
```

**问：安装太慢？**

```bash
# Switch to a domestic mirror (recommended to write to .npmrc file, don't pollute global config)
echo "registry=https://registry.npmmirror.com" > .npmrc

# pip can also configure mirrors
pip install requests -i https://pypi.tuna.tsinghua.edu.cn/simple
```

**问：如何处理软件包安全漏洞？**

```bash
npm audit          # Scan for known vulnerabilities
npm audit fix      # Auto-fix compatible vulnerabilities
npm audit fix --force  # Force upgrade (may be breaking, use with caution)
```

**问：如何判断一个包是否值得信赖？**

在 [npmjs.com](https://npmjs.com) 或 [bundlephobia.com](https://bundlephobia.com) 上查看：
- 每周下载量（越高越值得信赖）
- 最近更新时间（如果两年未更新需谨慎）
- 依赖数量（依赖越多 = 风险越大）
- GitHub 星标和 issue 活跃度

**问：winget 在 Windows 上将软件安装到哪里？**

winget 会安装到系统目录（需要管理员权限）或默认安装到 `%LOCALAPPDATA%\Microsoft\WindowsApps`。Scoop 会将所有软件统一安装在 `%USERPROFILE%\scoop\apps\`，便于管理和迁移。

---

## 8.术语参考

| 英文术语 | 中文翻译 | 说明 |
| :--- | :--- | :--- |
| **Package** | 包 / 库 | 由他人编写并发布的代码模块 |
| **Registry** | 注册表 / 仓库 | 存储所有包的中央服务器（如 npmjs.com） |
| **依赖** | 依赖 | 项目运行所需的其他包 |
| **devDependency** | 开发依赖 | 仅在开发阶段需要的包（测试框架、构建工具等） |
| **Lockfile** | 锁文件 | 记录确切版本号，确保环境一致性 |
| **SemVer** | 语义化版本 | MAJOR.MINOR.PATCH 版本命名规范 |
| **node_modules** | 模块目录 | npm 安装包实际存放的目录 |
| **venv** | 虚拟环境 | Python 项目的独立沙箱环境 |
| **tarball** | 压缩包 | 包的分发格式，通常为 `.tgz` 文件 |
| **Hoisting** | 提升 | npm 将子依赖提升到顶层以避免重复安装 |
| **Phantom 依赖** | 幽灵依赖 | 可以使用而未在配置中声明的包（pnpm 可防止出现） |
| **npx** | — | npm 内置的包运行工具，可临时运行包而无需安装 |
| **go.sum** | — | Go 模块哈希验证文件，防止依赖篡改 |
| **Crate** | — | Rust 生态中“包”的单位 |
| **winget** | — | Windows 官方包管理器（内置于 Windows 10/11） |

---

## 总结：包管理器的精髓

牢记以下四点核心内容：

1. **包管理器 = 应用商店**：帮助你找到、安装和管理代码模块，不必重复造轮子。
2. **锁文件 = 团队契约**：锁定确切版本，让“在我机器上能运行”不再成为问题。
3. **语义化版本 = 沟通语言**：`^` 可安全获取更新；当 MAJOR 变更时，需要谨慎。
4. **本地 > 全局**：尽可能将项目依赖本地安装；使用 `npx` / `uvx` 临时运行工具，保持环境清洁。