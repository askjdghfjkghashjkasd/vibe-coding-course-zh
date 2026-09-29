# Claude Code MCP 完整指南

## 什么是 Claude Code MCP？

**Claude Code** 是 Anthropic 官方的 AI 命令行工具，而 **MCP（模型上下文协议）** 是允许 Claude Code 连接外部工具和服务的协议。

简单来说，MCP 将 Claude Code 从只能读取和写入本地文件的 AI 助手，变成可以访问 GitHub、数据库、API 和云服务的超级助手。

## 为什么在 Claude Code 中使用 MCP？

### 没有 MCP 的 Claude Code

```text
What you can do:
✓ Read local files
✓ Edit code
✓ Run commands
✓ Use Bash tools

What you cannot do:
✗ View your GitHub Issues
✗ Access a cloud database
✗ Call external APIs
✗ Get real-time weather
```

### 使用 MCP 的 Claude 代码

```text
What you can do:
✓ All original functions
✓ View / create GitHub Issues and PRs
✓ Query SQLite and PostgreSQL databases
✓ Access external services such as Notion and Slack
✓ Get real-time weather and map data
✓ Browser automation
✓ ...and more
```

## 快速开始

### 第一步：了解配置文件的位置

Claude Code 的 MCP 配置文件位于：

| 级别 | 配置文件路径 | 作用范围 |
|-----|-------------|----------|
| **用户级别** | `~/.claude.json` | 所有项目 |
| **项目级别** | `.claude/mcp.json` | 当前项目 |

建议首先使用 **项目级配置**，这样不同项目可以使用不同的 MCP 服务。

### 第二步：用自然语言添加 MCP 服务器

在 Claude Code 中，你无需手动编辑配置文件或记住命令。你可以用自然语言描述你想要的内容：

```text
You: Help me add a GitHub MCP server. My token is ghp_xxx

Claude: I'll help you configure the GitHub MCP server...

[Automatically updates .claude/mcp.json]
```

```text
You: Add a SQLite database server. The database file is at ./data/app.db

Claude: Okay, I'll configure the SQLite MCP server...
```

```text
You: Add an HTTP-type MCP server with the address https://api.example.com/mcp

Claude: I'll add that remote MCP server...
```

### 第3步：验证配置

直接问Claude Code：

```text
You: What MCP servers are available now?

Claude: Currently configured MCP servers:
• github - GitHub integration
• sqlite - SQLite database
• filesystem - Filesystem access
```

或者使用诊断命令：

```text
/doctor
```

### 第4步：开始使用它

配置成功后，你可以用自然语言直接调用MCP功能：

```text
You: Help me create an Issue on GitHub

Claude: I can help you create a GitHub Issue. Please tell me:
- the repository address, for example owner/repo
- the Issue title
- the Issue description
```

## Claude Code 中的自然语言管理

### 查看和管理 MCP 服务器

你可以完全用自然语言与 Claude Code 互动：

```text
You: List all configured MCP servers

You: Check the connection status of the MCP servers

You: Delete the MCP server named notion

You: Update the token for the github server
```

### 诊断问题

当你遇到问题时：

```text
You: Check what's wrong with the MCP connection

Claude: [will automatically run diagnostics, analyze configuration files, and check server status]
```

## 配置方法详解

### 用户级配置，全局

编辑 `~/.claude.json`：

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/yourname/Documents"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "your-token"
      }
    }
  }
}
```

### 项目级配置，推荐

在项目根目录中编辑 `.claude/mcp.json`:

```json
{
  "mcpServers": {
    "project-db": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sqlite", "--db-path", "./data/app.db"]
    }
  }
}
```

**项目级配置的优势：**

- 团队成员可以通过将配置提交到 Git 来共享配置
- 不同的项目可以使用不同的 MCP 服务
- 配置更灵活，不会污染全局设置

### 传输模式

Claude Code 支持三种传输模式：

#### STDIO，本地进程

```json
{
  "mcpServers": {
    "local-tool": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path"]
    }
  }
}
```

#### HTTP，远程服务

```json
{
  "mcpServers": {
    "remote-api": {
      "url": "https://api.example.com/mcp",
      "transport": "http",
      "headers": {
        "Authorization": "Bearer your-token"
      }
    }
  }
}
```

#### SSE，服务器发送事件

```json
{
  "mcpServers": {
    "streaming": {
      "url": "https://api.example.com/sse",
      "transport": "sse"
    }
  }
}
```

## 实用示例

### 示例 1：GitHub 工作流自动化

```text
You: Help me push the current changes to GitHub, then create a PR titled "Add new feature"

Claude:
1. Check current git status...
2. Create a new branch feature/new-feature...
3. Commit changes...
4. Push to remote...
5. Call github_create_pull_request to create the PR...
6. PR created: https://github.com/owner/repo/pull/123
```

### 示例 2：数据库查询

```text
You: Query the 10 most recently registered users in the database

Claude:
1. Connect to the SQLite database...
2. Execute query: SELECT * FROM users ORDER BY created_at DESC LIMIT 10
3. Return results:
   - Zhang San (zhang@example.com) - 2025-02-28
   - Li Si (li@example.com) - 2025-02-27
   ...
```

### 示例 3：网页截图分析

```text
You: Open https://example.com, take a screenshot, and analyze the page design

Claude:
1. Launch browser...
2. Navigate to https://example.com...
3. Capture screenshot...
4. [Returns screenshot]
5. Page design analysis:
   - The layout uses a centered design with a max width of 1200px
   - The main color is blue (#3b82f6)
   - The navigation bar is fixed to the top
   ...
```

### 示例 4：与 Notion 的集成

```text
You: Save the notes I just wrote to Notion

Claude:
1. Use the Notion MCP server...
2. Create a new page...
3. Saved: https://notion.so/page/xxx
```

## 调试技巧

### 使用自然语言诊断

当出现问题时，只需直接告诉 Claude Code：

```text
You: My MCP server cannot connect. Please check it for me

You: The GitHub MCP tool call failed. What is the reason?

You: Why does the sqlite server always show "connecting"?
```

Claude Code 将自动执行：

1. 检查配置文件格式
2. 验证环境变量
3. 测试服务器连接
4. 提供具体修复建议

### 常见问题排查

| 问题 | 可能原因 | 解决方法 |
|-----|---------|----------|
| 服务器未连接 | 配置文件格式错误 | 检查 JSON 语法 |
| 工具无法调用 | 权限不足 | 检查环境变量 |
| 连接超时 | 网络问题 | 检查 URL 或网络 |
| 进程崩溃 | 服务器代码错误 | 检查服务器日志 |

### 手动诊断命令

```text
/doctor
```

示例输出：

```text
System Diagnostic Report:
===============

Claude Code: v2.5.0 ✓
Node.js: v20.0.0 ✓

MCP server status:
• github: ✓ Connected (12 tools)
• sqlite: ✗ Connection failed - Database file not found
• puppeteer: ✓ Connected (8 tools)

Suggestions:
1. Check whether the sqlite database path is correct
2. Make sure the .claude/mcp.json format is correct
```

## 最佳实践

### 1. 优先使用项目级配置

**为什么推荐项目级配置？**

不同的项目通常需要不同的 MCP 服务。例如，一个前端项目可能需要浏览器测试工具，而一个后端项目可能需要数据库连接。通过项目级配置，每个项目都可以拥有自己专用的 MCP 服务器集合，避免了使用一个大型全局配置带来的混乱。

更重要的是，项目级配置可以提交到 Git。团队成员克隆项目后，可以直接使用相同的 MCP 服务，而无需重新配置所有内容。

```text
Project A, frontend project -> .claude/mcp.json contains browser testing MCP
Project B, backend project -> .claude/mcp.json contains database MCP
```

### 2. 将敏感信息存储在环境变量中

**绝不要在配置文件中硬编码秘密。**

配置文件可能会意外提交到 Git，从而泄露密钥。正确的方法是将敏感值存储在环境变量中，并且在配置文件中仅引用变量名。这样，即使配置文件公开，真实的秘密仍然被隐藏。

```json
{
  "env": {
    "GITHUB_TOKEN": "$GITHUB_TOKEN",
    "GITHUB_TOKEN": "ghp_abc123"
  }
}
```

第一种形式很好，因为它从环境变量中读取。第二种形式不好，因为它直接硬编码了一个密钥。

### 3. 固定版本

**为什么需要固定版本？**

默认情况下，`npx -y` 总是会使用 MCP 服务器的最新版本。这可能导致问题：新版本可能引入破坏性更改，或者某个包可能突然被移除或重命名。

通过在包名后添加 `@version`，你可以确保始终使用经过验证的版本，从而减少自动升级带来的意外情况。

```json
{
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-github@1.2.3"]
}
```

### 4. 记录你的 MCP 配置

**帮助团队成员快速理解 MCP 设置**

当一个项目包含多个 MCP 服务器时，新加入的团队成员可能不明白每台服务器的用途或所需的配置。在 `.claude/` 目录下创建一个 `README.md`，说明每台服务器的用途、所需配置以及如何获取凭证，可以显著降低沟通成本。

在你的项目中创建 `.claude/README.md`：

```markdown
# MCP Configuration Notes

MCP servers used in this project:

## github
Used for GitHub automation. Requires GITHUB_TOKEN.

## sqlite
Connects to ./data/app.db for querying and modifying data.

## puppeteer
Used for E2E testing.
```

## Claude Code 与 Claude Desktop

| 功能 | Claude Code | Claude Desktop |
|-----|-------------|----------------|
| **配置文件** | `~/.claude.json` 或 `.claude/mcp.json` | `claude_desktop_config.json` |
| **项目级配置** | ✓ 支持 | ✗ 不支持 |
| **自然语言管理** | ✓ 支持 | ✗ 需要手动编辑 |
| **诊断** | ✓ `/doctor` | ✗ 无 |
| **热重载** | ✓ 自动 | ✗ 需要重启应用 |
| **使用场景** | 开发工作流, 持续集成 / 持续部署 | 日常使用, 办公任务 |

## 常见 MCP 服务器

> 💡 有关完整的 MCP 服务器列表，请参阅附录：[MCP 服务器目录](/zh-cn/appendix/8-artificial-intelligence/ai-protocols)

### GitHub 服务器

**功能:** 问题, PR, 仓库管理

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "your-token"
      }
    }
  }
}
```

**从获取令牌:** https://github.com/settings/tokens

### SQLite 服务器

**功能:** 查询和管理 SQLite 数据库

```json
{
  "mcpServers": {
    "sqlite": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sqlite", "--db-path", "./data/database.db"]
    }
  }
}
```

### 文件系统服务器

**功能：** 访问指定目录中的文件

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/yourname/Documents"]
    }
  }
}
```

### Puppeteer 浏览器自动化

**功能：** 浏览器控制、截图、自动化测试

```json
{
  "mcpServers": {
    "puppeteer": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-puppeteer"]
    }
  }
}
```

### 勇敢搜索服务器

**功能：** 网络搜索

```json
{
  "mcpServers": {
    "brave-search": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-brave-search"],
      "env": {
        "BRAVE_API_KEY": "your-brave-api-key"
      }
    }
  }
}
```

## 参考资料

### 官方文件

- [Claude Code 官方文档 - MCP]（https://docs.anthropic.com/zh-CN/docs/claude-code/mcp）
- [MCP官方网站]（https://modelcontextprotocol.io/）
- [MCP 规范文档]（https://modelcontextprotocol.io/specification/）
- [MCP GitHub 仓库]（https://github.com/modelcontextprotocol）

### 官方服务器

- [@modelcontextprotocol/server-github]（https://github.com/modelcontextprotocol/servers/tree/main/src/github） - GitHub集成
- [@modelcontextprotocol/server-sqlite]（https://github.com/modelcontextprotocol/servers/tree/main/src/sqlite） - SQLite 数据库
- [@modelcontextprotocol/server-postgres]（https://github.com/modelcontextprotocol/servers/tree/main/src/postgres） - PostgreSQL 数据库
- [@modelcontextprotocol/server-filesystem]（https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem） - 文件系统访问
- [@modelcontextprotocol/服务器操纵者]（https://github.com/modelcontextprotocol/servers/tree/main/src/puppeteer） - 浏览器自动化
- [@modelcontextprotocol/服务器取取]（https://github.com/modelcontextprotocol/servers/tree/main/src/fetch） - 网页取用
- [@modelcontextprotocol/服务器勇者搜索]（https://github.com/modelcontextprotocol/servers/tree/main/src/brave-search） - 勇者搜索
- [@modelcontextprotocol/server-git]（https://github.com/modelcontextprotocol/servers/tree/main/src/git） - Git 操作

### 教程文章

- [对MCP原则与实践的详尽解释]（https://view.inews.qq.com/a/20250414A023WV00）
- [MCP（模型上下文协议）架构及其工作原理]（https://m.toutiao.com/w/1826385835060307/）
- [2025年最新大型模型教程：从入门到掌握MCP协议]（https://m.blog.csdn.net/weixin_45653328/article/details/150916706）
- [从零开始学习MCP（8）——构建MCP服务器]（https://juejin.cn/post/7582510291667419187）

### 配置指南

- [Claude Code 最佳实践]（https://www.anthropic.com/engineering/claude-code-best-practices）
- [Claude Code 完整配置指南]（https://juejin.cn/post/7576838552472043563）

### 开发教程

- [适合初学者的MCP服务器实用指南，支持TypeScript和Python]（https://m.blog.csdn.net/ztt123654/article/details/150844207）
- [Ultimate MCP 服务器构建指南：完整 TypeScript 和 Python 教程]（https://m.blog.csdn.net/gitblog_00703/article/details/154862128）
- [用TypeScript构建最简单的MCP服务器]（https://m.blog.csdn.net/weixin_45653525/article/details/148433757）
- [使用 Azure 容器应用生成 TypeScript MCP 服务器]（https://learn.microsoft.com/zh-cn/azure/developer/ai/build-mcp-server-ts）

### MCP服务器资源

- [Awesome MCP Servers]（https://github.com/punkpeye/awesome-mcp-servers） - 最全面的 MCP 服务器列表
- [官方MCP注册库]（https://registry.modelcontextprotocol.io） - Anthropic官方应用商店
- [MCP.so]（https://mcp.so） - 社区MCP服务器中心
- [Glama.ai MCP]（https://glama.ai/mcp/servers） - MCP目录，包含评分和评论
- [Smithery]（https://smithery.ai） - MCP 服务器市场
- [MCPHub]（https://mcphub.io/registry） - 干净的接口目录
- [LobeHub MCP]（https://lobehub.com/zh/mcp） - 中文 MCP 目录

### 地图与气象服务

- [高德 MCP 服务器](https://lobehub.com/zh/mcp/luozengchang-mcp-amap)
- [腾讯位置服务 MCP 文档](https://lbs.qq.com/service/MCPServer/MCPServerGuide/overview)
- [彩云天气 MCP 服务器](https://github.com/caiyunapp/mcp-caiyun-weather)
- [OpenWeatherMap MCP 服务器](https://github.com/CodeByWaqas/weather-mcp-server)

### 社区资源

- [Everything Claude 代码配置](https://github.com/affaan-m/everything-claude-code) - 生产级 Claude 代码配置集合
- [AI 编程指南](https://github.com/hacket/AICodingGuide) - Claude 代码中文学习路径

### 现实应用案例

- [BlenderMCP - AI 驱动的 3D 建模](https://github.com/Belthur/blender-mcp) - 4,100 ⭐
- [生产环境中 MCP 的 15 个最佳实践](https://learn.microsoft.com/zh-cn/azure/azure-functions/scenario-mcp-apps)