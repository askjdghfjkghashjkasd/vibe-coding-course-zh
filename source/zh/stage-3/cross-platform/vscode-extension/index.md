# 如何构建 VS Code 扩展：创建你的 AI 项目助手

# 第一章：什么是 VS Code 扩展开发

在本教程中，我们将完成一个完整的闭环：从零开始构建一个 VS Code 扩展，作为你的 AI 项目助手，具有一键生成项目模板、对选定文件或代码片段进行 AI 聊天、多文件问答分析以及自定义快捷键的功能。你将完成开发、调试，并学习如何发布到 VS Code 市场。

对于本教程，你至少需要具备：

- Node.js 环境（版本 18.0）
- VS Code 编辑器（版本 1.90）
- 你的 AI 编程助手（Cursor / Trae / Claude Code）
- （可选）GitHub Copilot 订阅（用于语言模型 API）

> **端到端 Vibe 编码**：我们将使用 AI 编程助手生成大部分代码。你只需理解核心概念和架构，然后用自然语言描述需求。

## 1.1 VS Code 扩展能做什么？

你每天都在使用 VS Code 扩展。Prettier 格式化你的代码，GitLens 显示 Git 历史，GitHub Copilot 帮助你编写代码。这些扩展本质上是用 TypeScript/JavaScript 编写的程序，通过 VS Code API 扩展编辑器功能。

VS Code 扩展能做的事情，比很多人预期的要多：

* **添加新的 UI 元素**：侧边栏面板、状态栏信息、自定义 Webview 页面
* **处理文件和代码**：读取、修改和创建文件；分析代码结构
* **集成外部服务**：调用 API、连接数据库、集成 持续集成 / 持续部署
* **扩展编辑器功能**：自定义语言支持、代码补全、诊断
* **增加 AI 功能**：使用 Chat Participant API 创建 AI 助手，用 Language Model API 调用模型

<!-- ![placeholder: VS Code 扩展生态系统示意图，显示可扩展区域：侧边栏、编辑器、状态栏、命令面板、聊天面板](../../../../zh-cn/stage-3/cross-platform/vscode-extension/images/image1.png) -->
![VS Code 扩展生态系统示意图，显示扩展可以扩展的区域：侧边栏、编辑器、状态栏、命令面板和聊天面板](/zh-cn/stage-3/cross-platform/vscode-extension/images/image1.png)

## 1.2 VS Code 扩展的核心架构

VS Code 扩展在一个独立的 **扩展主机（Extension Host）** 进程中运行，与编辑器主进程分离。这意味着即使扩展崩溃，编辑器本身也不会受到影响。

一个典型的扩展有以下核心部分：

* **package.json（清单）**：扩展的“身份证”，声明名称、入口文件、贡献点（`commands`, `menus`, `keybindings` 等）
* **extension.ts（入口文件）**：扩展的“大脑”，导出 `activate()` 和 `deactivate()`
* **贡献点（Contribution Points）**：你在 package.json 中为 VS Code 提供的功能（命令、菜单项、快捷键、视图等）
* **VS Code API**：用于操作编辑器功能的 TypeScript API 集

```text
VS Code editor
    │
    ├── Extension Host (extension process)
    │   ├── Your extension
    │   │   ├── package.json  -> declares "what I can do"
    │   │   ├── extension.ts  -> implements "how to do it"
    │   │   └── other modules -> concrete feature code
    │   ├── Other extension A
    │   └── Other extension B
    │
    └── Editor main process (UI rendering)
```

<!-- ![占位符: VS Code 扩展架构图，显示扩展主机与编辑器主进程的对比](../../../../zh-cn/stage-3/cross-platform/vscode-extension/images/image2.png) -->
![VS Code 扩展架构图，显示扩展主机进程和编辑器主进程](/zh-cn/stage-3/cross-platform/vscode-extension/images/image2.png)

## 1.3 我们要构建什么扩展？

我们将构建一个名为 **"AI 项目助手"** 的 VS Code 扩展，一个具有以下功能的 AI 项目助手：

| 功能 | 描述 |
|------|------|
| 项目模板 | 侧边栏模板列表，一键生成项目脚手架 |
| AI 聊天 | `@project-bot` 参与 VS Code 聊天，用于项目问答 |
| 文件/代码片段聊天 | 右键选中代码或文件并发送给 AI 进行分析/解释/重构 |
| 多文件问答 | 在资源管理器中多选文件，让 AI 分析关系和逻辑 |
| 快捷键 | 自定义快捷键快速触发常用操作 |

<!-- ![占位符: AI 项目助手预览，显示侧边栏模板、@project-bot 聊天面板和右键菜单](../../../../zh-cn/stage-3/cross-platform/vscode-extension/images/image3.png) -->
![AI 项目助手扩展预览，显示侧边栏模板列表、@project-bot 聊天面板和右键菜单](/zh-cn/stage-3/cross-platform/vscode-extension/images/image3.png)

## 1.4 教程路线图

我们将通过以下步骤完成流程：

1. **创建扩展项目**（3 分钟）：生成项目脚手架并理解核心文件
2. **实现项目模板**（5 分钟）：使用 TreeView 在侧边栏展示模板并生成项目
3. **实现 AI 聊天参与者**（5 分钟）：通过 Chat Participant API 创建 `@project-bot`
4. **实现文件/代码片段聊天和多文件问答**（5 分钟）：右键菜单和多文件选择分析
5. **添加快捷键和优化用户体验**（3 分钟）：快捷键和状态栏提示
6. **发布到市场**（可选）：打包并提交

# 第 2 章：创建扩展项目（3 分钟）

## 2.1 使用脚手架生成项目

VS Code 官方提供了 Yeoman 脚手架工具。请让 AI 运行:

```text
Please help me install VS Code extension scaffolding tools and create a project:
1. Install Yeoman and generator-code: npm install -g yo generator-code
2. Run yo code and choose:
   - Type: New Extension (TypeScript)
   - Name: ai-project-bot
   - Identifier: ai-project-bot
   - Description: AI project assistant - template generation, intelligent chat, multi-file Q&A
   - Package manager: npm
3. Enter project directory and install dependencies
```

生成的结构：

```text
ai-project-bot/
├── .vscode/
│   ├── launch.json          # Debug config (F5 starts debugging)
│   └── tasks.json           # Build tasks
├── src/
│   └── extension.ts         # Extension entry file
├── package.json             # Extension manifest (most important file)
├── tsconfig.json            # TypeScript config
└── vsc-extension-quickstart.md  # Quick start guide (can be removed)
```

## 2.2 了解 package.json：扩展 “ID Card"

`package.json` 是 VS Code 扩展的核心文件。除了常规的 npm 字段外，它还有 `contributes` 用于声明你的扩展对 VS Code 的所有贡献：

```json
{
  "name": "ai-project-bot",
  "displayName": "AI Project Bot",
  "description": "AI project assistant - template generation, intelligent chat, multi-file Q&A",
  "version": "0.0.1",
  "engines": { "vscode": "^1.90.0" },
  "activationEvents": [],
  "main": "./out/extension.js",
  "contributes": {
    "commands": [],
    "menus": {},
    "keybindings": [],
    "viewsContainers": {},
    "views": {},
    "chatParticipants": []
  }
}
```

**关键字段:**

| 字段 | 作用 |
|------|------|
| `engines.vscode` | 最低支持的 VS Code 版本 |
| `activationEvents` | 扩展何时激活（为空表示按需激活） |
| `main` | 编译后入口文件的路径 |
| `contributes` | 所有贡献的功能（命令、菜单、快捷键、视图等） |

<!-- ![占位符: package.json 截图，contributes 字段已突出显示](../../../../zh-cn/stage-3/cross-platform/vscode-extension/images/image4.png) -->
![编辑器中 package.json 文件的截图，contributes 字段已突出显示](/zh-cn/stage-3/cross-platform/vscode-extension/images/image4.png)

## 2.3 理解 extension.ts：扩展的“核心”

打开 `src/extension.ts`，你会看到两个核心函数：

```typescript
import * as vscode from 'vscode'

// Called when extension is activated (first command execution, opening specific files, etc.)
export function activate(context: vscode.ExtensionContext) {
  console.log('AI Project Bot activated!')

  // Register commands, views, chat participants, etc.
  const disposable = vscode.commands.registerCommand(
    'ai-project-bot.helloWorld',
    () => {
      vscode.window.showInformationMessage('Hello from AI Project Bot!')
    }
  )

  context.subscriptions.push(disposable)
}

// Called when extension is deactivated (for example when VS Code closes)
export function deactivate() {}
```

**核心概念：**

* `activate(context)`：扩展初始化，在这里注册所有功能
* `context.subscriptions`：自动清理列表；VS Code 在停用时会释放已注册的项目
* `vscode.commands.registerCommand`：注册命令，可从命令面板调用 (`Ctrl+Shift+P`)

## 2.4 开始调试

按 **F5**，VS Code 会打开一个新的 **扩展开发主机** 窗口。这是一个加载了你的扩展的全新 VS Code 实例。

在新窗口中，按 **Ctrl Shift P**，输入 "Hello World"，你将看到消息弹出。这意味着你的扩展正在运行。

<!-- ![占位符：VS Code 扩展调试截图，显示扩展开发主机和 Hello World 消息](../../../../zh-cn/stage-3/cross-platform/vscode-extension/images/image5.png) -->
![调试 VS Code 扩展的截图，显示扩展开发主机窗口和 Hello World 消息](/zh-cn/stage-3/cross-platform/vscode-extension/images/image5.png)

> **调试提示**：代码更改后，在扩展开发主机中按 **Ctrl Shift P** -> **开发人员：重新加载窗口** 可以快速重新加载扩展。

# 第3章：实现项目模板（5 分钟）

## 3.1 设计模板系统

我们希望在 VS Code 侧边栏中添加一个“项目模板”面板，用户可以浏览模板并一键生成项目骨架。这将使用 VS Code **TreeView API**。

请 AI 实现：

```text
Please help me implement project templates in ai-project-bot:

1. Add contribution points in package.json:
   - Add a new viewsContainers.activitybar item with id "project-bot", title "AI Project Bot"
   - Add a view under it with id "projectTemplates", name "Project Templates"
   - Add command "ai-project-bot.createFromTemplate", title "Create Project from Template"

2. Create src/templates/templateProvider.ts:
   - Implement TreeDataProvider with template categories and templates:
     - Frontend: React + TypeScript, Vue 3 + TypeScript, Next.js App
     - Backend: Express API, FastAPI Python
     - Full-stack: T3 Stack (Next.js + tRPC + Prisma)
   - Each template item shows name, description, and icon

3. Create src/templates/scaffolder.ts:
   - Implement createProjectFromTemplate function
   - Let users choose target folder
   - Generate project structure by template type
```

## 3.2 在 package.json 中声明视图

首先在 `package.json` 中添加侧边栏视图贡献：

```json
{
  "contributes": {
    "viewsContainers": {
      "activitybar": [
        {
          "id": "project-bot",
          "title": "AI Project Bot",
          "icon": "resources/bot-icon.svg"
        }
      ]
    },
    "views": {
      "project-bot": [
        {
          "id": "projectTemplates",
          "name": "Project Templates"
        }
      ]
    },
    "commands": [
      {
        "command": "ai-project-bot.createFromTemplate",
        "title": "Create Project from Template",
        "icon": "$(add)"
      }
    ],
    "menus": {
      "view/title": [
        {
          "command": "ai-project-bot.createFromTemplate",
          "when": "view == projectTemplates",
          "group": "navigation"
        }
      ]
    }
  }
}
```

此配置执行三件事：

1. 在活动栏中添加一个“AI 项目机器人”图标条目
2. 在该条目下创建一个“项目模板”视图
3. 在视图标题栏中添加一个“ ”按钮以创建项目

<!-- ![占位符: 显示 VS Code 侧边栏中 AI 项目机器人图标和项目模板列表的截图](../../../../zh-cn/stage-3/cross-platform/vscode-extension/images/image6.png) -->
![显示 VS Code 侧边栏中 AI 项目机器人图标和项目模板列表的截图](/zh-cn/stage-3/cross-platform/vscode-extension/images/image6.png)

## 3.3 实现 TreeDataProvider

TreeDataProvider 是 VS Code 用来填充树形数据的接口。我们需要 `getTreeItem`（一个节点的显示信息）和 `getChildren`（子节点列表）。

核心代码：

```typescript
// src/templates/templateProvider.ts
import * as vscode from 'vscode'

interface Template {
  name: string
  description: string
  category: string
  command: string // command to generate project, for example "npx create-react-app"
}

const TEMPLATES: Template[] = [
  { name: 'React + TypeScript', description: 'React project built with Vite', category: 'Frontend', command: 'npm create vite@latest {{name}} -- --template react-ts' },
  { name: 'Vue 3 + TypeScript', description: 'Vue 3 project built with Vite', category: 'Frontend', command: 'npm create vite@latest {{name}} -- --template vue-ts' },
  { name: 'Next.js App', description: 'Next.js App Router full-stack project', category: 'Frontend', command: 'npx create-next-app@latest {{name}} --typescript --app' },
  { name: 'Express API', description: 'Express + TypeScript REST API', category: 'Backend', command: 'npx create-express-api {{name}}' },
  { name: 'FastAPI Python', description: 'Python FastAPI backend project', category: 'Backend', command: 'pip install fastapi uvicorn' },
]

// Tree node: category or template
class TemplateItem extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly template?: Template
  ) {
    super(label, collapsibleState)
    if (template) {
      this.description = template.description
      this.tooltip = `${template.name}\n${template.description}\nCommand: ${template.command}`
      this.contextValue = 'template'
      this.command = {
        command: 'ai-project-bot.createFromTemplate',
        title: 'Create Project',
        arguments: [template]
      }
    }
  }
}

export class TemplateProvider implements vscode.TreeDataProvider<TemplateItem> {
  getTreeItem(element: TemplateItem): vscode.TreeItem {
    return element
  }

  getChildren(element?: TemplateItem): TemplateItem[] {
    if (!element) {
      // Root: return category list
      const categories = [...new Set(TEMPLATES.map(t => t.category))]
      return categories.map(
        cat => new TemplateItem(cat, vscode.TreeItemCollapsibleState.Expanded)
      )
    }
    // Children: templates in category
    return TEMPLATES
      .filter(t => t.category === element.label)
      .map(t => new TemplateItem(t.name, vscode.TreeItemCollapsibleState.None, t))
  }
}
```

## 3.4 注册视图和创建命令

在 `extension.ts` 中注册 TreeView 和项目创建命令：

```typescript
// src/extension.ts
import { TemplateProvider } from './templates/templateProvider'

export function activate(context: vscode.ExtensionContext) {
  // Register template view
  const templateProvider = new TemplateProvider()
  vscode.window.registerTreeDataProvider('projectTemplates', templateProvider)

  // Register create project command
  const createCmd = vscode.commands.registerCommand(
    'ai-project-bot.createFromTemplate',
    async (template) => {
      if (!template) {
        // If no template passed (called from command palette), let user pick
        const pick = await vscode.window.showQuickPick(
          TEMPLATES.map(t => ({ label: t.name, description: t.description, template: t })),
          { placeHolder: 'Choose a project template' }
        )
        if (!pick) return
        template = pick.template
      }

      // Ask for project name
      const name = await vscode.window.showInputBox({
        prompt: 'Enter project name',
        placeHolder: 'my-awesome-project'
      })
      if (!name) return

      // Ask for target folder
      const folder = await vscode.window.showOpenDialog({
        canSelectFolders: true,
        openLabel: 'Select target folder'
      })
      if (!folder) return

      // Execute creation command
      const terminal = vscode.window.createTerminal('AI Project Bot')
      terminal.show()
      const cmd = template.command.replace('{{name}}', name)
      terminal.sendText(`cd "${folder[0].fsPath}" && ${cmd}`)

      vscode.window.showInformationMessage(`Creating ${template.name} project: ${name}`)
    }
  )

  context.subscriptions.push(createCmd)
}
```

现在按 F5 进行调试。你将在活动栏中看到 AI Project Bot。展开模板列表，然后点击任意模板以创建项目。

<!-- ![占位符：点击模板后显示项目名称输入框和文件夹选择对话框的截图](../../../../zh-cn/stage-3/cross-platform/vscode-extension/images/image7.png) -->
![点击模板后显示项目名称输入框和文件夹选择对话框的截图](/zh-cn/stage-3/cross-platform/vscode-extension/images/image7.png)

# 第4章：实现 AI 聊天参与者（5分钟）

## 4.1 什么是聊天参与者 API？

从 VS Code 1.90 开始，扩展可以使用 **聊天参与者 API** 在聊天面板中创建自己的 AI 助手。如果用户输入 `@project-bot help me analyze this project architecture`，你的扩展会收到消息并返回模型生成的响应。

核心概念：

* **参与者**：你在聊天面板中的助手身份，通过 `@name` 调用
* **斜杠命令**：参与者支持的快捷命令，例如 `/explain`、`/refactor`
* **语言模型 API**：调用 VS Code 内置模型（例如 Copilot GPT-4o）
* **流**：通过 `stream.markdown()` 逐步输出响应

## 4.2 在 package.json 中声明聊天参与者

在 `contributes` 中添加此内容：

```json
{
  "contributes": {
    "chatParticipants": [
      {
        "id": "ai-project-bot.projectBot",
        "name": "project-bot",
        "fullName": "AI Project Bot",
        "description": "Your AI project assistant for code analysis, architecture explanation, and solution generation",
        "isSticky": true
      }
    ]
  }
}
```

`isSticky: true` 的意思是，一旦选择，后续消息将默认发送给此参与者，无需每次输入 `@project-bot`。

## 4.3 实现聊天参与者处理程序

让 AI 编写核心逻辑：

```text
Please help me create src/chat/chatParticipant.ts and implement Chat Participant:
1. Register participant "ai-project-bot.projectBot"
2. Support three slash commands:
   - /explain: explain selected code or current file
   - /refactor: provide refactoring suggestions
   - /template: recommend suitable tech stack templates
3. Use Language Model API with VS Code built-in model
4. Return response in streaming mode (stream.markdown)
```

核心代码：

```typescript
// src/chat/chatParticipant.ts
import * as vscode from 'vscode'

export function registerChatParticipant(context: vscode.ExtensionContext) {
  const participant = vscode.chat.createChatParticipant(
    'ai-project-bot.projectBot',
    async (request, chatContext, stream, token) => {
      // Select available model
      const models = await vscode.lm.selectChatModels({ family: 'gpt-4o' })
      const model = models[0]

      if (!model) {
        stream.markdown('No language model available. Please make sure GitHub Copilot is installed.')
        return
      }

      // Build system prompt by slash command
      let systemPrompt = 'You are a professional project development assistant.'

      if (request.command === 'explain') {
        systemPrompt = 'You are a code explanation expert. Please explain user code in concise Chinese, including purpose, logic flow, and key design decisions.'
      } else if (request.command === 'refactor') {
        systemPrompt = 'You are a code refactoring expert. Analyze user code and provide specific refactoring suggestions with improved code examples.'
      } else if (request.command === 'template') {
        systemPrompt = 'You are a tech stack selection expert. Recommend suitable tech stacks and project templates based on user requirements.'
      }

      // Build messages
      const messages = [
        vscode.LanguageModelChatMessage.User(systemPrompt),
        vscode.LanguageModelChatMessage.User(request.prompt)
      ]

      // Stream output
      const response = await model.sendRequest(messages, {}, token)
      for await (const chunk of response.stream) {
        stream.markdown(chunk)
      }

      return { metadata: { command: request.command || '' } }
    }
  )

  // Register slash commands
  participant.slashCommandProvider = {
    provideSlashCommands: () => [
      { name: 'explain', description: 'Explain code function and logic' },
      { name: 'refactor', description: 'Provide refactoring suggestions and improvements' },
      { name: 'template', description: 'Recommend suitable project templates and tech stacks' }
    ]
  }

  // Register follow-up suggestions
  participant.followupProvider = {
    provideFollowups: (result) => {
      if (result.metadata?.command === 'explain') {
        return [
          { prompt: 'Can you draw a flowchart?', label: 'Generate flowchart' },
          { prompt: 'Any potential bugs here?', label: 'Check potential issues' }
        ]
      }
      return []
    }
  }

  context.subscriptions.push(participant)
}
```

`extension.ts` 的呼叫登记：

```typescript
import { registerChatParticipant } from './chat/chatParticipant'

export function activate(context: vscode.ExtensionContext) {
  // ... previous template registration code ...
  registerChatParticipant(context)
}
```

现在在聊天面板中输入 `@project-bot /explain what does this code do?`，你的扩展将调用模型并生成解释。

<!-- ![占位符：显示 @project-bot、/explain 命令及流式响应的 VS Code 聊天界面截图](../../../../zh-cn/stage-3/cross-platform/vscode-extension/images/image8.png) -->
![VS Code 聊天面板截图，显示 @project-bot、/explain 命令及流式响应](/zh-cn/stage-3/cross-platform/vscode-extension/images/image8.png)

# 第5章：文件/代码片段聊天和多文件问答（5分钟）

## 5.1 右键菜单：将选中代码发送到 AI

我们希望用户在编辑器中选择代码，并通过上下文菜单将其发送到 AI。这使用了 VS Code **上下文菜单** 贡献点。

在 `package.json` 中添加:

```json
{
  "contributes": {
    "commands": [
      {
        "command": "ai-project-bot.explainSelection",
        "title": "AI: Explain Selected Code"
      },
      {
        "command": "ai-project-bot.refactorSelection",
        "title": "AI: Refactor Selected Code"
      }
    ],
    "menus": {
      "editor/context": [
        {
          "command": "ai-project-bot.explainSelection",
          "when": "editorHasSelection",
          "group": "ai-project-bot@1"
        },
        {
          "command": "ai-project-bot.refactorSelection",
          "when": "editorHasSelection",
          "group": "ai-project-bot@2"
        }
      ]
    }
  }
}
```

**关键配置说明：**

* `when: "editorHasSelection"`：仅在选中文本时显示菜单
* `group: "ai-project-bot@1"`：菜单分组和顺序（`@1`，`@2`）

## 5.2 实现选中代码分析

```typescript
// src/commands/selectionCommands.ts
import * as vscode from 'vscode'

export function registerSelectionCommands(context: vscode.ExtensionContext) {
  // Explain selected code
  const explainCmd = vscode.commands.registerCommand(
    'ai-project-bot.explainSelection',
    async () => {
      const editor = vscode.window.activeTextEditor
      if (!editor) return

      const selection = editor.selection
      const selectedText = editor.document.getText(selection)
      const fileName = editor.document.fileName.split('/').pop()
      const startLine = selection.start.line + 1
      const endLine = selection.end.line + 1

      // Build prompt with context
      const prompt = [
        `Please explain the following code (from ${fileName}, lines ${startLine}-${endLine}):`,
        '```',
        选文本，
        '```',
        'Please explain: 1) what this code does 2) core logic 3) possible improvements'
      ].join('\n')

      // Call Language Model API
      const models = await vscode.lm.selectChatModels({ family: 'gpt-4o' })
      if (!models.length) {
        vscode.window.showErrorMessage('No language model available')
        return
      }

      // Show results in output panel
      const outputChannel = vscode.window.createOutputChannel('AI Project Bot')
      outputChannel.show()
      outputChannel.appendLine(`\n--- Code Explanation (${fileName}:${startLine}-${endLine}) ---\n`)

      const messages = [
        vscode.LanguageModelChatMessage.User(prompt)
      ]
      const response = await models[0].sendRequest(messages, {})
      for await (const chunk of response.stream) {
        outputChannel.append(chunk)
      }
    }
  )

  context.subscriptions.push(explainCmd)
}
```

<!-- ![占位符：选择代码后显示 AI 项目的编辑器上下文菜单截图](../../../../zh-cn/stage-3/cross-platform/vscode-extension/images/image9.png) -->
![选择代码后显示 AI 项目的编辑器上下文菜单截图](/zh-cn/stage-3/cross-platform/vscode-extension/images/image9.png)

## 5.3 多文件问答：批量分析文件关系

这是最强大的功能之一：在资源管理器中多选文件，然后让 AI 一键分析关系和逻辑。

在 `package.json` 中添加资源管理器上下文菜单：

```json
{
  "contributes": {
    "commands": [
      {
        "command": "ai-project-bot.analyzeFiles",
        "title": "AI: Analyze Relationships of Selected Files"
      }
    ],
    "menus": {
      "explorer/context": [
        {
          "command": "ai-project-bot.analyzeFiles",
          "when": "explorerResourceIsFile",
          "group": "ai-project-bot"
        }
      ]
    }
  }
}
```

执行多文件分析命令：

```typescript
// src/commands/multiFileAnalysis.ts
import * as vscode from 'vscode'

export function registerMultiFileCommands(context: vscode.ExtensionContext) {
  const analyzeCmd = vscode.commands.registerCommand(
    'ai-project-bot.analyzeFiles',
    async (clickedFile: vscode.Uri, selectedFiles: vscode.Uri[]) => {
      // selectedFiles contains all selected files
      const files = selectedFiles || [clickedFile]

      if (files.length < 2) {
        vscode.window.showWarningMessage('Please select at least 2 files for analysis')
        return
      }

      // Read all selected files
      const fileContents: string[] = []
      for (const file of files) {
        const content = await vscode.workspace.fs.readFile(file)
        const fileName = vscode.workspace.asRelativePath(file)
        fileContents.push(
          `--- ${fileName} ---\n${Buffer.from(content).toString('utf8')}`
        )
      }

      const prompt = [
        `Please analyze relationships among these ${files.length} files:`,
        '',
        ...fileContents,
        '',
        'Please explain:',
        '1. Responsibilities of each file',
        '2. Dependency/call relationships among them',
        '3. Data flow (if any)',
        '4. Architectural suggestions or potential issues'
      ].join('\n')

      // Call model and show result
      const models = await vscode.lm.selectChatModels({ family: 'gpt-4o' })
      if (!models.length) {
        vscode.window.showErrorMessage('No language model available')
        return
      }

      const outputChannel = vscode.window.createOutputChannel('AI Project Bot')
      outputChannel.show()
      outputChannel.appendLine(`\n--- Multi-file Analysis (${files.length} files) ---\n`)

      const messages = [
        vscode.LanguageModelChatMessage.User(prompt)
      ]
      const response = await models[0].sendRequest(messages, {})
      for await (const chunk of response.stream) {
        outputChannel.append(chunk)
      }
    }
  )

  context.subscriptions.push(analyzeCmd)
}
```

用法：在资源管理器中，按住 `Ctrl`（Mac 上为 `Cmd`）可多选文件，右键单击并选择“AI：分析所选文件的关系”。AI 会读取所有选中的文件并返回分析结果。

<!-- ![占位符：资源管理器多选文件及 AI 分析上下文菜单截图](../../../../zh-cn/stage-3/cross-platform/vscode-extension/images/image10.png) -->
![资源管理器中多选文件及上下文菜单中的 AI 分析项截图](/zh-cn/stage-3/cross-platform/vscode-extension/images/image10.png)

# 第6章：快捷键和用户体验优化（3分钟）

## 6.1 自定义快捷键

快捷键是提高效率的关键。在 `package.json` 中添加：

```json
{
  "contributes": {
    "keybindings": [
      {
        "command": "ai-project-bot.explainSelection",
        "key": "ctrl+shift+e",
        "mac": "cmd+shift+e",
        "when": "editorTextFocus && editorHasSelection"
      },
      {
        "command": "ai-project-bot.refactorSelection",
        "key": "ctrl+shift+r",
        "mac": "cmd+shift+r",
        "when": "editorTextFocus && editorHasSelection"
      },
      {
        "command": "ai-project-bot.createFromTemplate",
        "key": "ctrl+shift+n",
        "mac": "cmd+shift+n",
        "when": ""
      }
    ]
  }
}
```

**`when` 条件：**

| 条件 | 含义 |
|------|------|
| `editorTextFocus` | 光标在编辑器中 |
| `editorHasSelection` | 选中了一些文本 |
| `explorerViewletVisible` | 资源管理器面板可见 |
| `!editorReadonly` | 文件不是只读 |

多个通过 `&&` 连接的条件表示必须全部满足。

## 6.2 状态栏提示

添加一个快速状态栏条目，让用户随时知道扩展正在运行：

```typescript
// src/statusBar.ts
import * as vscode from 'vscode'

export function createStatusBarItem(context: vscode.ExtensionContext) {
  const statusBar = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100
  )
  statusBar.text = '$(hubot) AI Bot'
  statusBar.tooltip = 'Click to open AI Project Bot'
  statusBar.command = 'ai-project-bot.createFromTemplate'
  statusBar.show()

  context.subscriptions.push(statusBar)
}
```

`$(hubot)` 是 VS Code 内置图标语法。你可以在 [Codicon library](https://microsoft.github.io/vscode-codicons/dist/codicon.html) 中找到所有图标。

<!-- ![占位符：VS Code 状态栏中显示的 AI 机器人图标截图](../../../../zh-cn/stage-3/cross-platform/vscode-extension/images/image11.png) -->
![VS Code 状态栏中显示的 AI 机器人图标截图](/zh-cn/stage-3/cross-platform/vscode-extension/images/image11.png)

# 第7章：发布到市场（可选）

## 7.1 发布准备

VS Code 扩展使用 **vsce** 进行打包和发布：

```text
Please help me install vsce: npm install -g @vscode/vsce
```

发布前，准备：

1. **Azure DevOps 账户**：在 [dev.azure.com](https://dev.azure.com/) 注册并创建一个组织
2. **个人访问令牌 (PAT)**：在 Azure DevOps 中创建，权限为 **Marketplace -> Manage**
3. **发布者 ID**：在 [VS Code Marketplace](https://marketplace.visualstudio.com/manage) 创建发布者身份

## 7.2 改进 package.json 元数据

在发布前添加元数据：

```json
{
  "publisher": "your-publisher-id",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourname/ai-project-bot"
  },
  "categories": ["AI", "Other"],
  "keywords": ["ai", "project", "template", "chat"],
  "icon": "resources/icon.png",
  "galleryBanner": {
    "color": "#1e1e2e",
    "theme": "dark"
  }
}
```

你还需要一个 `README.md` 来填写市场描述，以及一个 `CHANGELOG.md` 来填写版本历史。

## 7.3 打包与发布

```bash
# Package to .vsix (manual install file)
vsce package

# Publish to marketplace
vsce publish
```

打包后，你会得到 `ai-project-bot-0.0.1.vsix`。你可以将此文件发送给朋友，他们可以通过 VS Code 的“从 VSIX 安装”进行安装。

要发布到官方市场，请运行 `vsce publish`；扩展通常会在几分钟内显示。

<!-- ![占位符：VS Code 市场中 AI 项目机器人扩展页面截图](../../../../zh-cn/stage-3/cross-platform/vscode-extension/images/image12.png) -->

> **提示**：首次发布可能需要审核。确保 README 清晰，截图完整，以加快审批。

# 第8章：最终说明

恭喜！你已经从零构建了一个功能齐全的 VS Code 扩展。总结如下：

1. 使用 Yeoman 脚手架创建了扩展项目，并了解了 `package.json` 和 `extension.ts` 的角色
2. 使用 TreeView API 实现了侧边栏项目模板列表和一键创建新项目功能
3. 使用 Chat Participant API 创建了 `@project-bot` AI 助手，包括斜杠命令和流式响应
4. 实现了右键代码选择分析功能
5. 实现了多文件关系分析功能
6. 添加了自定义快捷键和状态栏提示

VS Code 扩展开发的想象空间巨大。你每天使用的有用扩展背后的技术就是你刚刚学到的。

**高级方向：**

* **自定义 Webview 面板**：使用 HTML/CSS/JS 构建完全自定义的 UI，例如可视化架构图和交互式代码审查界面
* **语言模型工具**：注册可由 AI 调用的自定义工具，例如查询数据库或执行 API 请求
* **诊断与 CodeLens**：内联显示 AI 建议、性能提示和安全警告
* **自定义语言支持**：为 DSL 或特定配置格式提供语法高亮、补全和诊断
* **远程开发集成**：使扩展能够在 SSH、容器和 WSL 中工作

***你的编辑器，你的规则。***

# 参考资料

* [VS Code 扩展 API 文档](https://code.visualstudio.com/api)
* [Chat Participant API 指南](https://code.visualstudio.com/api/extension-guides/chat)
* [语言模型 API 指南](https://code.visualstudio.com/api/extension-guides/language-model)
* [TreeView API 指南](https://code.visualstudio.com/api/extension-guides/tree-view)
* [Webview API 指南](https://code.visualstudio.com/api/extension-guides/webview)
* [VS Code 扩展发布指南](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
* [Codicon 图标库](https://microsoft.github.io/vscode-codicons/dist/codicon.html)