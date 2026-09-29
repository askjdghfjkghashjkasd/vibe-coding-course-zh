# Claude 智能体 SDK 完整指南

## 介绍

你可能已经使用过 Claude 的基础 API：发送一条消息，获得一个回复，就像聊天一样。但如果你希望 Claude 帮助你读取文件、运行命令、搜索代码、修复错误、验证结果本身并继续迭代，这种“自主工作”是基础 API 无法做到的。

Claude 智能体 SDK 正是为这种场景而构建。它将 Claude Code 的所有功能打包——读写文件、执行命令、搜索代码、编辑文件、浏览网页——成为一个可编程的库。你无需自己编写工具调用循环。Claude 可以自主执行工具，并自主迭代，直到任务真正完成。

一句话总结：基础 SDK 是“你问，它答”；智能体 SDK 是“你指派，它工作”。

---

## 与基础 SDK 有何不同？

先看代码，区别就很明显：

```python
# Basic anthropic SDK: you must write your own loop to handle tool calls
import anthropic

client = anthropic.Anthropic()
response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Fix the bug in auth.py"}],
    tools=[...]  # You must define tools yourself
)
# Claude asks to call some tool
while response.stop_reason == "tool_use":
    result = your_tool_executor(response.tool_use)  # You must execute it yourself
    response = client.messages.create(tool_result=result, **params)  # You must feed it back yourself
```

```python
# Agent SDK: one block and done, Claude reads files, finds bugs, and edits code by itself
from claude_agent_sdk import query, ClaudeAgentOptions

async for message in query(
    prompt="Fix the bug in auth.py",
    options=ClaudeAgentOptions(allowed_tools=["Read", "Edit", "Bash"]),
):
    print(message)  # Claude reads files, locates issues, and edits code by itself
```

区别很明显：

| 比较项目 | 基本 anthropic SDK | Claude 智能体 SDK |
|--------|-------------------|-----------------|
| 工具执行 | 你实现它 | Claude 处理它 |
| 工具循环 | 你实现它 | 内置代理循环 |
| 内置工具 | 没有，全部自定义 | 开箱即用的读/写文件、Bash、搜索等 |
| 上下文管理 | 你维护它 | 自动压缩和自动管理 |
| 最适合 | 聊天、生成、简单工具使用 | 自主完成复杂任务 |

---

## 与其他代理框架有何不同？

市面上有很多代理框架——LangChain、LlamaIndex、CrewAI、AutoGPT 等。那么 Claude 智能体 SDK 与它们相比有什么独特之处？

> 📚 **详细比较请参见附录**：[主流代理框架比较](/en/appendix/8-artificial-intelligence/ai-agents.html)

简而言之：

| 框架 | 最适用场景 |
|------|-------------|
| **Claude 智能体 SDK** | 让 Claude 自主完成编码、文件操作和命令执行 |
| **LangChain** | 构建具有高度自定义流程的复杂通用 AI 应用 |
| **CrewAI** | 模拟多角色协作场景（虚拟团队、角色扮演） |
| **LlamaIndex** | 构建将企业数据与大型语言模型连接的知识库问答系统 |

---

## 安装与配置

### 安装

Python 需要 3.10，TypeScript 需要 Node.js 18 :

```bash
# Python
pip install claude-agent-sdk

# TypeScript
npm install @anthropic-ai/claude-agent-sdk
```

### 身份验证

只需设置 API 密钥环境变量：

```bash
export ANTHROPIC_API_KEY=your-api-key
```

云平台认证也受支持：
- AWS Bedrock：设置 `CLAUDE_CODE_USE_BEDROCK=1`   AWS 凭证
- Google Vertex AI：设置 `CLAUDE_CODE_USE_VERTEX=1`   GCP 凭证
- Microsoft Azure：设置 `CLAUDE_CODE_USE_FOUNDRY=1`   Azure 凭证

### 自定义 API 端点

如果您使用代理、网关或自托管的 API 端点，可以通过 `env` 参数更改默认 API URL：

```python
from claude_agent_sdk import query, ClaudeAgentOptions

async for message in query(
    prompt="Hello",
    options=ClaudeAgentOptions(
        env={
            "ANTHROPIC_BASE_URL": "https://your-proxy.example.com",
            "ANTHROPIC_API_KEY": "your-api-key",
        }
    ),
):
    print(message)
```

`ClaudeAgentOptions` 没有直接的 `base_url` 参数，但 `env` 字段可以将任意环境变量传递给底层的 Claude Code CLI。常用环境变量：

| 环境变量 | 用途 |
|---------|------|
| `ANTHROPIC_BASE_URL` | 自定义 API 端点（代理、网关） |
| `ANTHROPIC_API_KEY` | API 密钥 |
| `ANTHROPIC_AUTH_TOKEN` | 备用认证令牌 |
| `ANTHROPIC_CUSTOM_HEADERS` | 自定义请求头 |

---

## 核心概念

智能体 SDK 的运行原理可以用一句话概括：**收集上下文 -> 执行操作 -> 验证结果 -> 重复**。

这正是人类开发者的工作方式：先阅读代码，然后修改代码，再运行测试并检查结果。如果有错误，就不断迭代。智能体 SDK 自动化了这个循环。

### 两种使用模式

**模式 1：`query()` 函数 - 无状态，适合一次性任务**

```python
import asyncio
from claude_agent_sdk import query, ClaudeAgentOptions

async def main():
    async for message in query(
        prompt="What files are in this directory?",
        options=ClaudeAgentOptions(allowed_tools=["Bash", "Glob"]),
    ):
        if hasattr(message, "result"):
            print(message.result)

asyncio.run(main())
```

**模式 2：`ClaudeSDKClient` - 有状态，适合多轮对话**

当你需要保留上下文并进行多轮交互时，请使用此模式。例如，先让 Claude 阅读一个模块，然后让它找到该模块的所有调用点——在第二轮对话中，它仍然记得第一轮中所读取的内容。

```python
import asyncio
from claude_agent_sdk import query, ClaudeAgentOptions

async def main():
    session_id = None

    # Turn 1: read the auth module
    async for message in query(
        prompt="Read the authentication module code",
        options=ClaudeAgentOptions(allowed_tools=["Read", "Glob"]),
    ):
        if hasattr(message, "subtype") and message.subtype == "init":
            session_id = message.session_id

    # Turn 2: continue based on previous context
    async for message in query(
        prompt="Find all places that call it",
        options=ClaudeAgentOptions(resume=session_id),
    ):
        if hasattr(message, "result"):
            print(message.result)

asyncio.run(main())
```

---

## 内置工具：即刻可用

这是 智能体 SDK 最棒的功能之一——你无需自己实现任何工具，Claude 可以直接使用它们：

| 工具 | 功能 | 典型用途 |
|------|------|---------|
| Read | 读取文件 | 查看代码，读取配置 |
| Write | 创建文件 | 生成新文件 |
| Edit | 精确编辑文件 | 修复错误，重构 |
| Bash | 运行终端命令 | 运行测试，安装依赖，git 操作 |
| Glob | 基于模式的文件搜索 | `**/*.py`, `src/**/*.ts` |
| Grep | 正则内容搜索 | 查找函数定义，TODO |
| WebSearch | 搜索网页 | 查找文档，寻找方法 |
| WebFetch | 获取网页内容 | 阅读在线文档 |
| Task | 启动子代理 | 子任务并行化 |

使用 `allowed_tools` 来控制代理可以使用哪些工具：

```python
# Read-only agent: can inspect but cannot modify
options = ClaudeAgentOptions(
    allowed_tools=["Read", "Glob", "Grep"],
    permission_mode="bypassPermissions"
)

# Full agent: can read, write, and execute commands
options = ClaudeAgentOptions(
    allowed_tools=["Read", "Write", "Edit", "Bash", "Glob", "Grep"]
)
```

---

## 高级功能

### 钩子：在关键点插入您自己的逻辑

钩子允许您在代理执行的关键时刻注入自定义代码——例如，记录日志、拦截风险操作以及审计文件更改。

支持的钩子类型包括：`PreToolUse`（工具执行前）、`PostToolUse`（工具执行后）、`Stop`（代理停止时）、`SessionStart`、`SessionEnd`，以及更多。

```python
from datetime import datetime
from claude_agent_sdk import query, ClaudeAgentOptions, HookMatcher

# Record an audit log every time a file is modified
async def log_file_change(input_data, tool_use_id, context):
    file_path = input_data.get("tool_input", {}).get("file_path", "unknown")
    with open("./audit.log", "a") as f:
        f.write(f"{datetime.now()}: modified {file_path}\n")
    return {}

async def main():
    async for message in query(
        prompt="Refactor utils.py for better readability",
        options=ClaudeAgentOptions(
            permission_mode="acceptEdits",
            hooks={
                "PostToolUse": [
                    HookMatcher(matcher="Edit|Write", hooks=[log_file_change])
                ]
            },
        ),
    ):
        if hasattr(message, "result"):
            print(message.result)
```

实际应用:
- 审计日志：记录代理执行的每一个操作
- 安全拦截：阻止对关键文件的修改
- 通知推送：在代理任务完成时发送消息
- 成本监控：统计工具调用次数和令牌使用量

### 子代理：将大任务拆分给专家

当任务足够复杂时，你可以定义多个专业子代理，让主代理将子任务分配给它们。每个子代理都有自己的指令和工具权限，彼此隔离。

```python
from claude_agent_sdk import query, ClaudeAgentOptions, AgentDefinition

async for message in query(
    prompt="Use the code-reviewer agent to review this project's code quality",
    options=ClaudeAgentOptions(
        allowed_tools=["Read", "Glob", "Grep", "Task"],
        agents={
            "code-reviewer": AgentDefinition(
                description="Professional code reviewer responsible for quality and security reviews",
                prompt="Analyze code quality, identify potential issues, and provide improvement suggestions.",
                tools=["Read", "Glob", "Grep"],
            ),
            "test-writer": AgentDefinition(
                description="Testing specialist responsible for writing unit tests",
                prompt="Write unit tests for functions that are missing tests.",
                tools=["Read", "Write", "Bash"],
            ),
        },
    ),
):
    if hasattr(message, "result"):
        print(message.result)
```

来自子代理的消息包括一个 `parent_tool_use_id` 字段，使跟踪哪些消息来自哪个子代理变得容易。

### MCP 集成：连接外部世界

通过模型上下文协议 (MCP)，您的代理可以连接到外部系统，例如数据库、浏览器和第三方 API。社区已经提供了 [数百个 MCP 服务器](https://github.com/modelcontextprotocol/servers) 供您直接使用。

```python
# Connect Playwright so the agent can operate a browser
async for message in query(
    prompt="Open example.com and describe what you see",
    options=ClaudeAgentOptions(
        mcp_servers={
            "playwright": {
                "command": "npx",
                "args": ["@playwright/mcp@latest"]
            }
        }
    ),
):
    if hasattr(message, "result"):
        print(message.result)
```

常见的 MCP 集成场景：
- Playwright：浏览器自动化、页面抓取、表单填写
- PostgreSQL/MySQL：直接数据库查询和操作
- Slack/邮件：发送通知和消息
- GitHub：操作 PR、问题和代码仓库

---

## 使用它可以构建什么？实际场景

了解功能之后，最重要的问题是：它到底能做什么？以下是社区验证过的真实场景。

### 场景 1：自动修复代理

给它一个错误描述，它可以查找代码、定位问题、修复错误，并运行测试进行验证：

```python
async for message in query(
    prompt="Users report occasional HTTP 500 errors during login. Investigate and fix code under src/auth/",
    options=ClaudeAgentOptions(
        allowed_tools=["Read", "Edit", "Bash", "Glob", "Grep"],
        permission_mode="acceptEdits",
    ),
):
    print(message)
```

Claude 将会使用 grep 检查日志，阅读相关代码，找到错误，修改代码，并运行测试以确认修复。

### 场景 2：代码审查代理

构建一个只读的代码审查代理，它可以审计质量而不进行任何修改：

```python
async for message in query(
    prompt="Review code under src/ with focus on security vulnerabilities, performance issues, and coding conventions",
    options=ClaudeAgentOptions(
        allowed_tools=["Read", "Glob", "Grep"],
        permission_mode="bypassPermissions",
    ),
):
    if hasattr(message, "result"):
        print(message.result)
```

### 场景 3：持续集成 / 持续部署 集成

在 CI 流水线中，让代理分析失败的测试并尝试自动修复：

```python
async for message in query(
    prompt="Run npm test, analyze failing test cases, and fix the code so all tests pass",
    options=ClaudeAgentOptions(
        allowed_tools=["Read", "Edit", "Bash", "Glob"],
        max_turns=20,
    ),
):
    print(message)
```

这是代理 SDK 相对于 CLI 的一个主要优势——当有人坐在终端前时，CLI 很好，而 SDK 是嵌入自动化工作流程的理想选择。

### 场景 4：研究代理

让代理搜索网络、阅读文档、综合信息并生成报告：

```python
async for message in query(
    prompt="Research mainstream Python Web frameworks in 2026. Compare FastAPI, Django, and Litestar, then write a technical selection report to report.md",
    options=ClaudeAgentOptions(
        allowed_tools=["WebSearch", "WebFetch", "Write"],
    ),
):
    print(message)
```

### 场景5：具备浏览器功能的全栈代理

通过将Playwright连接到MCP，代理不仅可以编写代码，还可以打开浏览器来验证结果：

```python
async for message in query(
    prompt="Fix the homepage style issue, then open a browser and take screenshots to verify the result",
    options=ClaudeAgentOptions(
        allowed_tools=["Read", "Edit", "Bash"],
        mcp_servers={
            "playwright": {
                "command": "npx",
                "args": ["@playwright/mcp@latest"]
            }
        },
    ),
):
    print(message)
```

### 场景快速参考

| 场景 | 核心工具 | 难度 |
|------|---------|------|
| 自动修复漏洞 | 读取, 编辑, Bash, Grep | 初级 |
| 代码审查 | 读取, Glob, Grep | 初级 |
| 持续集成 / 持续部署 自动修复 | 读取, 编辑, Bash | 中级 |
| 技术调研报告 | 网络搜索, 网络抓取, 写作 | 初级 |
| 浏览器自动化 | MCP (Playwright) | 中级 |
| 多代理协作 | 任务, 代理定义 | 高级 |
| 数据库操作 | MCP (PostgreSQL/MySQL) | 中级 |
| 邮件/通知助手 | MCP (Slack/Email) | 中级 |

---

## 何时应使用 智能体 SDK？

并非所有场景都需要 智能体 SDK。选择正确的工具很重要：

| 您想做什么 | 推荐工具 |
|-----------|---------|
| 简单聊天、文本生成、翻译 | 基础 `anthropic` SDK |
| 一次性工具使用（天气查询、算术运算） | 基础 `anthropic` SDK |
| 自主完成多步骤开发任务 | 智能体 SDK |
| 嵌入 持续集成 / 持续部署 流水线 | 智能体 SDK |
| 构建可操作文件系统的应用 | 智能体 SDK |
| 每日互动开发 | Claude Code CLI |
| 一次性快速任务 | Claude Code CLI |

总之：如果您的任务需要 Claude 自己“动手”操作（读取文件、编辑代码、运行命令），请使用 智能体 SDK。如果只需要问答，则基础 SDK 就足够。

---

## 企业实践：构建代码质量护栏流水线

之前的场景都是一个代理完成一项工作。在真实企业环境中，您需要的是完整流水线——多个代理串联，每个阶段有明确的输入/输出，并包含审计、回滚和通知。

现在我们将构建一个真实场景：在每次 PR 提交后，自动触发 **代码审查 -> 安全扫描 -> 自动修复 -> 测试验证 -> 报告生成** 作为完整流水线。

### 架构设计

```text
PR submitted
  │
  ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  Code Review │───▶│ Security Scan│───▶│   Auto Fix   │
│    Agent     │    │    Agent     │    │    Agent     │
│ (read-only)  │    │ (read-only)  │    │ (writable)   │
└─────────────┘    └─────────────┘    └─────────────┘
                                            │
                                            ▼
                                     ┌─────────────┐    ┌─────────────┐
                                     │ Test Verify  │───▶│ Report Build │
                                     │    Agent     │    │    Agent     │
                                     │   (Bash)     │    │   (Write)    │
                                     └─────────────┘    └─────────────┘
                                                              │
                                                              ▼
                                                       Slack notification
```

核心理念：**每个代理只做一件事，权限最小化，结果按顺序传递**。

### 第一步：定义管道框架

```python
import asyncio
import json
from datetime import datetime
from claude_agent_sdk import query, ClaudeAgentOptions, HookMatcher

# Audit log: record every operation by every agent
audit_log = []

async def audit_hook(input_data, tool_use_id, context):
    audit_log.append({
        "time": datetime.now().isoformat(),
        "tool": input_data.get("tool_name"),
        "input": input_data.get("tool_input", {}),
    })
    return {}

# Shared hook config: all agents share audit capability
audit_hooks = {
    "PostToolUse": [HookMatcher(matcher=".*", hooks=[audit_hook])]
}
```

### 步骤 2：代码审查代理（只读）

```python
async def run_code_review(pr_diff: str) -> str:
    """Read-only agent, reviews code quality and outputs a structured report"""
    result_text = ""
    async for message in query(
        prompt=f"""Review the following PR diff from these dimensions:
1. Code conventions: naming, formatting, comments
2. Logic issues: edge cases, null pointer risks, race conditions
3. Performance risks: N+1 queries, memory leaks, unnecessary loops
4. Maintainability: oversized functions, unclear responsibilities, magic numbers

PR Diff:
{pr_diff}

Output JSON format: {{"issues": [{{"severity": "high/medium/low", "file": "...", "line": ..., "description": "..."}}], "summary": "..."}}""",
        options=ClaudeAgentOptions(
            allowed_tools=["Read", "Glob", "Grep"],
            permission_mode="bypassPermissions",
            hooks=audit_hooks,
            max_turns=10,
        ),
    ):
        if hasattr(message, "result"):
            result_text = message.result
    return result_text
```

### 步骤 3：安全扫描代理（只读）

```python
async def run_security_scan() -> str:
    """Read-only agent focused on vulnerability scanning"""
    result_text = ""
    async for message in query(
        prompt="""Scan the project code for security vulnerabilities:
1. SQL injection, XSS, CSRF
2. Hardcoded keys or credentials
3. Insecure dependency versions
4. Missing permission checks

Output JSON: {{"vulnerabilities": [{{"severity": "critical/high/medium", "type": "...", "file": "...", "description": "...", "fix_suggestion": "..."}}]}}""",
        options=ClaudeAgentOptions(
            allowed_tools=["Read", "Glob", "Grep", "Bash"],
            permission_mode="bypassPermissions",
            hooks=audit_hooks,
            max_turns=15,
        ),
    ):
        if hasattr(message, "result"):
            result_text = message.result
    return result_text
```

### 第4步：自动修复代理（可写）

```python
async def run_auto_fix(review_result: str, security_result: str) -> str:
    """Writable agent that auto-fixes code based on review and scan results"""
    result_text = ""
    async for message in query(
        prompt=f"""Fix code according to the following review results:

Code review report:
{review_result}

Security scan report:
{security_result}

Fix rules:
1. Only fix issues with severity high or critical
2. Run related tests after each change to ensure no existing functionality is broken
3. Do not refactor unrelated code, apply minimal fixes only
4. Output the list of modified files after completion""",
        options=ClaudeAgentOptions(
            allowed_tools=["Read", "Edit", "Bash", "Glob", "Grep"],
            permission_mode="acceptEdits",
            hooks=audit_hooks,
            max_turns=30,
        ),
    ):
        if hasattr(message, "result"):
            result_text = message.result
    return result_text
```

### 第5步：测试验证   报告生成

```python
async def run_test_and_report(fix_result: str) -> str:
    """Run tests and generate final report"""
    result_text = ""
    async for message in query(
        prompt=f"""Execute these actions:
1. Run the full test suite (npm test or pytest)
2. Compute test pass rate
3. Generate a Markdown quality report into pr-report.md, including:
   - Count of issues found in code review and severity distribution
   - Number of security vulnerabilities
   - Auto-fix changes: {fix_result}
   - Test pass rate
   - Final conclusion: whether merge is recommended""",
        options=ClaudeAgentOptions(
            allowed_tools=["Read", "Bash", "Write", "Glob"],
            hooks=audit_hooks,
            max_turns=15,
        ),
    ):
        if hasattr(message, "result"):
            result_text = message.result
    return result_text
```

### 第6步：将整个流程链起来

```python
import subprocess

async def run_pipeline():
    """Full PR quality-guard pipeline"""
    print("🔍 Stage 1/4: code review...")
    pr_diff = subprocess.run(
        ["git", "diff", "main...HEAD"], capture_output=True, text=True
    ).stdout
    review_result = await run_code_review(pr_diff)

    print("🛡️ Stage 2/4: security scan...")
    security_result = await run_security_scan()

    print("🔧 Stage 3/4: auto-fix...")
    fix_result = await run_auto_fix(review_result, security_result)

    print("✅ Stage 4/4: test verification + report generation...")
    report = await run_test_and_report(fix_result)

    # Save audit log
    with open("audit-log.json", "w") as f:
        json.dump(audit_log, f, indent=2, ensure_ascii=False)

    print(f"Pipeline finished, audit log saved ({len(audit_log)} operation records)")
    return report

asyncio.run(run_pipeline())
```

### 企业设计思维

该流水线反映了几个关键的企业设计原则：

**最小权限**：代码审查和安全扫描代理是只读的，无法意外修改代码。只有自动修复代理具有写权限，即便如此，这种权限也受到`acceptEdits`的限制。

**可审计**：每个代理的每一步都会通过 Hooks 进行日志记录。如果出现问题，你可以追踪哪个代理在何时做了什么。

**结果链式处理**：每个代理的输出成为下一个代理的输入。审查结果供自动修复使用；自动修复结果供测试验证使用。每个阶段都有清晰的输入/输出契约。

**成本控制**：每个代理都有一个`max_turns`限制，以防止无限循环。在生产环境中，你还可以添加`max_budget_usd`进行预算控制。

**可扩展性**：想要增加另一个阶段，例如“文档检查代理”或“性能基准代理”吗？只需添加一个新函数并将其插入流水线即可。

此模型可以直接嵌入 GitHub Actions 或 GitLab CI，每次 PR 自动触发，真正实现“AI 驱动的代码质量护栏”。

---

## 错误处理

智能体 SDK 提供了清晰的异常类型，使你能够在生产中构建健壮的容错机制：

```python
from claude_agent_sdk import query, CLINotFoundError, ProcessError

try:
    async for msg in query(prompt="Analyze code"):
        print(msg)
except CLINotFoundError:
    print("Claude Code CLI is not installed. Please install it first.")
except ProcessError as e:
    print(f"Process exited unexpectedly with exit code: {e.exit_code}")
```

---

## 摘要

Claude 智能体 SDK 的核心价值在于将“模型推理”升级为“受控执行”。它不仅仅是生成文本。它可以真正完成任务，并且是在一个可审计、受约束的工具系统中完成。

记住 Anthropic 官方博客中的一句话：智能体 SDK 的设计理念是“给代理一个电脑，让它像人类一样工作”。

一个好的代理应用 = 清晰的工具设计 + 明确的任务边界 + 适当的人类监督。工具赋予代理能力，边界赋予它约束，监督给予你信心。这三者缺一不可。

---

## 参考资料

### 官方资源

- [智能体 SDK 官方文档](https://platform.claude.com/docs/en/agent-sdk/overview) - 最权威的参考
- [GitHub - claude-agent-sdk-python](https://github.com/anthropics/claude-code-sdk-python) - Python SDK 源码
- [GitHub - claude-agent-sdk-typescript](https://github.com/anthropics/claude-agent-sdk-typescript) - TypeScript SDK 源码
- [智能体 SDK 演示项目](https://github.com/anthropics/claude-agent-sdk-demos) - 邮件助手、研究代理等

### 博客与教程

- [使用 Claude 智能体 SDK 构建代理](https://claude.com/blog/building-agents-with-the-claude-agent-sdk) - Anthropic 工程博客，讲解设计理念与架构
- [Claude 智能体 SDK Python 学习指南](https://redreamality.com/blog/claude-agent-sdk-python-) - 面向中文用户的完整零基础教程
- [Claude 智能体 SDK 完整教程](https://blog.wenhaofree.com/en/posts/articles/claude-agent-sdk-tutorial/) - 工具系统、智能体 循环与受控执行的实用指南
- [12 个实用的 智能体 SDK 场景](https://skywork.ai/blog/claude-agent-sdk-use-cases-2025/) - 涵盖编码、数据、自动化等
- [逐步 智能体 教程](https://skywork.ai/blog/how-to-use-claude-agent-sdk-step-by-step-ai-agent-tutorial/) - TypeScript 与 Python 双轨教程