# Claude 代理团队完整指南

## 代理团队简介

**代理团队** 是 Claude Code 中的一项革命性功能，它允许 **多个独立的 AI 实例像真正的开发团队一样协作**。

想象一下，在过去，使用 Claude Code 就像是作为一个项目经理与一个异常出色的助手合作。无论任务多么复杂，只有那一个助手在完成工作。现在，通过代理团队，你可以组建一个完整的 AI 开发团队：一个成员可以负责前端，一个负责后端，一个负责测试，他们可以 **同时工作、相互交流并协作完成复杂任务**。

### 从单一助手到团队协作

在深入了解代理团队之前，让我们先理解它解决的问题。

**单 AI 模式的局限**：

当你使用单个 Claude 实例处理复杂项目时，你会遇到这些瓶颈：

- **串行处理瓶颈**：AI 一次只能做一件事。例如，在重构一个项目时，它可能需要先分析认证模块，再分析数据库模块，最后分析 API 模块。这些步骤必须按顺序完成，即使它们之间相互独立。

- **上下文拥挤问题**：所有信息都存在于一个对话窗口中。随着对话变长，早期的重要细节可能被埋没，AI 可能会忘记之前讨论的关键决策。

- **单一视角限制**：只有一个 AI 在思考，因此没有多角度讨论或验证。当出现复杂的设计决策时，没有“队友”可以辩论或提供不同的观点。

- **效率上限**：大规模重构或多模块开发需要很长时间，并且无法通过并行处理提高速度。

**代理团队的解决方案**：

代理团队通过 **多个实例的并行协作** 解决这些问题：

- **真正的并行工作**：多个 AI 可以同时处理不同任务。一个负责前端 UI，另一个负责后端 API，再另一个负责数据库设计，互不干扰。

- **独立的上下文空间**：每个团队成员都有完整的 20 万 token 上下文窗口，因此重要信息不会因为对话过长而“被遗忘”。

- **团队协作能力**：成员可以直接沟通，讨论设计决策，互相验证代码质量，就像真实开发团队一样。

- **明显的效率提升**：根据 Anthropic 的内部测试，大型项目重构的效率可以提高约 50%。

---

## 代理团队 vs 子代理

在深入研究代理团队的架构之前，我们首先要澄清一个常见的疑问：**代理团队和子代理有什么区别**？

这两项功能都涉及“多个 AI 协作”，但它们的协作模式完全不同，适用于不同场景。

### 核心区别一览

| 维度 | 子代理 | 代理团队 |
|---------|-------------------|----------------------|
| **拓扑结构** | 星型拓扑：所有子代理向主代理汇报 | 网状拓扑：成员之间可以相互通信 |
| **通信方式** | 主代理通过提示明确传递信息，子代理完成后返回结果 | 成员可以直接沟通、讨论和协调 |
| **上下文管理** | 每个子代理都有独立的上下文，主代理只传递必要的信息 | 每个成员都有完全独立的上下文 |
| **并行性** | 可以并行运行，但协作链仍以主代理为中心 | 真正的并行开发和协作 |
| **任务协调** | 主代理集中分派和协调所有任务 | 成员可以更自主地承担任务 |
| **成本** | 不低。当多个子代理并行运行时，令牌使用量会累积 | 更高。成员独立运行并更频繁地通信 |

### 一个直观的类比

**子代理就像**：一个经理为几个助手分别写任务单。每个助手根据自己的任务单独工作，完成后只将结果返回给经理。助手之间不直接交流，经理在工作过程中也无法看到助手的完整思维过程。

```
You → Main Agent → Subagent A: "Analyze this file"
You → Main Agent → Subagent B: "Search for that function"
         ↓
    Subagent A completes → reports result to Main Agent
    Subagent B completes → reports result to Main Agent
         ↓
    Main Agent synthesizes the results → reports back to you
```

**代理团队就像**：一个项目经理领导着一个真正的开发团队。团队成员可以直接沟通、讨论和协作，而不是将每一个细节都通过项目经理传递。

```
You → Team Lead: "Build a user authentication feature"
         ↓
    Team Lead creates the team and assigns tasks
         ↓
    Teammate A: "@Teammate B, is the API interface design ready?"
    Teammate B: "Yes, here's the format..."
    Teammate C: "I reviewed the interface and found something we should discuss..."
         ↓
    Team members collaborate to finish the work → Team Lead synthesizes the result → reports back to you
```

### 何时使用哪一个

**使用子代理（Subagent）的情况**：

- 你有一个快速、明确、单一的任务，比如“搜索这个错误代码”
- 任务之间依赖不大
- 你希望并行执行，但不需要成员之间持续讨论

**使用代理团队（智能体 Teams）的情况**：

- 你正在进行涉及多个模块的复杂系统重构
- 你需要多角度分析和讨论，例如安全专家和性能专家讨论解决方案
- 你需要真正的并行开发，前端、后端和测试同时进行
- 任务需要频繁协调和信息共享

### 简单总结

- **子代理（Subagent）**：一个任务分配工具，将大任务拆分为小任务并分派给不同的“工作者”
- **代理团队（智能体 Teams）**：真正的协作团队，成员可以像真实团队一样沟通、讨论、共同工作

---

## 核心架构

代理团队不仅仅是一个“打开多个实例”的功能，它是一个完整的**多代理协作系统**。要理解它，我们需要了解核心组件及其协作方式。

### 团队组成

一个代理团队由四个核心组件组成，每个组件有自己的职责，共同完成复杂任务。

**团队负责人（Team Lead）**

团队负责人是整个团队的“头脑”和“协调者”。它不会直接执行编码任务，而是负责：

- **需求分析与任务分解**：将用户复杂需求拆分成可并行执行的多个子任务
- **团队创建与管理**：决定需要多少成员以及每个成员的工作内容
- **任务分配与调度**：将任务分配给合适的成员，并管理任务依赖关系
- **结果整合与质量控制**：收集每个成员的工作成果，整合并做最终审核

**团队成员（Teammates）**

团队成员是实际执行工作的“开发者”。每个成员都是独立的 Claude 实例：

- **独立上下文窗口**：每个成员拥有完整的 200K 令牌上下文窗口，与团队负责人和其他成员完全隔离
- **完整工具权限**：可以使用所有工具，如读取、写入、编辑和 Bash
- **自主领取任务**：可以独立选择并认领共享任务板上的任务
- **直接沟通能力**：可以直接与其他成员沟通，而不必总通过团队负责人

**任务列表（TaskList）**

任务列表是团队的“项目管理工具”，类似于 Jira 或 Trello：

- **任务状态管理**：每个任务有明确状态：`pending`、`in_progress` 或 `completed`
- **依赖管理**：任务可以定义依赖关系，依赖任务只能在前置任务完成后开始
- **自动解锁机制**：当一个任务完成时，系统会自动检查并解锁等待的任务
- **文件锁机制**：当成员认领并开始任务时，会在任务目录创建锁文件，以防多个成员同时编辑同一文件

**消息系统（Messaging System）**

消息系统是团队成员之间的“聊天工具”：

- **点对点通信**：成员 A 可以直接向成员 B 发送消息
- **广播公告**：消息可以一次发送给所有成员
- **基于文件系统**：消息以 JSON 文件的形式存储在 `~/.claude/teams/{team-name}/inboxes/`
- **无需网络**：所有操作完全通过本地文件系统完成，无需网络连接或端口监听

### 协作流程

一个典型的 智能体 Teams 工作流程如下：

```
The user submits a complex requirement
       ↓
Team Lead analyzes the requirement and breaks it into tasks
       ↓
Creates team members and initializes TaskList
       ↓
       ├─→ Teammate A claims Task 1 ─┐
       ├─→ Teammate B claims Task 2 ─┼→ Run in parallel
       ├─→ Teammate C claims Task 3 ─┤
       │                             ↓
       └──────────────────────────── Members coordinate through the messaging system
                                     ↓
                          Once all tasks are complete, Team Lead synthesizes the result
                                     ↓
                          Final output is delivered to the user
```

### 文件系统布局

智能体 Teams 在您的本地文件系统上创建专用目录来管理团队状态：

```
~/.claude/
├── teams/
│   └── {team-name}/
│       ├── config.json          # Team config (member list, model selection, etc.)
│       └── inboxes/
│           ├── team-lead.json   # Team Lead inbox
│           ├── teammate-1.json  # Member 1 inbox
│           └── teammate-2.json  # Member 2 inbox
└── tasks/
    └── {team-name}/
        ├── task-1.json          # Detailed info for Task 1
        ├── task-2.json          # Detailed info for Task 2
        └── current_tasks/
            └── parse_if_statement.txt  # Lock file created while a task is running
```

这种设计的优势是**完全透明**：您可以随时查看团队状态、任务进度以及成员之间的沟通历史。

---

## 快速开始

### 启用实验性功能

智能体 Teams 目前是一个**实验性功能**，默认情况下是禁用的。要使用它，您需要先启用它。

**最简单的方法：让 Claude Code 为您启用**

直接在 Claude Code 中输入以下内容：

```
Help me enable Agent Teams in settings.json
```

或者：

```
Enable the experimental feature agentTeams
```

Claude Code 将自动修改 `~/.claude/settings.json` 并添加以下配置：

```json
{
  "experimental": {
    "agentTeams": true
  }
}
```

**重启 Claude Code**

在添加配置后，**完全退出并重启 Claude Code**，该功能将生效。

**手动配置（如果自动方法不起作用）**：

您可以手动编辑 `~/.claude/settings.json` 并添加或修改：

```json
{
  "experimental": {
    "agentTeams": true
  }
}
```

**如何验证它已启用**

重启 Claude Code 后，尝试进行如下对话：

```
You: Can you help me create an Agent Team?

Claude: Yes! I can help you create an Agent Team to collaborate on a task...
```

如果Claude理解并回应创建团队的请求，则该功能已成功启用。

### 可视模式配置（可选）

如果您想实时查看团队成员的工作，可以配置**分屏显示模式**。

**让Claude Code为您配置**：

直接在Claude Code中输入如下内容：

```
Help me enable split-pane display mode for Agent Teams in settings.json, using tmux
```

或者：

```
Configure agent-teams to use split-panes mode
```

**安装 tmux（如果你还没有安装）**：

如果 `tmux` 还没有安装，你可以请求 Claude Code 安装它：

```
Help me install tmux
```

Claude Code 会根据你的操作系统（无论是 macOS 还是 Linux）自动运行相应的安装命令。

**配置结果的样子**：

配置完成后，团队成员将在不同的 tmux 窗格中工作，你将能够同时看到他们的所有输出，就像一个“监控墙”一样。

```
┌─────────────────┬─────────────────┬─────────────────┐
│  Teammate 1     │  Teammate 2     │  Teammate 3     │
│  Analyzing code │  Building API   │  Writing tests  │
│  ...            │  ...            │  ...            │
│                 │                 │                 │
└─────────────────┴─────────────────┴─────────────────┘
```

**手动配置（如果自动方法不起作用）**：

您可以手动编辑 `~/.claude/settings.json`：

```json
{
  "experimental": {
    "agentTeams": true
  },
  "agent-teams": {
    "displayMode": "split-panes",
    "terminalMultiplexer": "tmux"
  }
}
```

---

### 实战示例：使用智能体团队构建宝可梦风格的RPG游戏

让我们通过一个完整的项目体验智能体团队的强大功能。本示例将展示多个AI团队成员如何协作从零开始构建RPG游戏，包括战斗系统、对话功能和探索元素。

**项目需求**：

构建一个宝可梦风格的网页RPG，具有以下功能：

- **角色系统**：玩家可以创建具有等级、HP、攻击、防御和其他属性的角色
- **战斗系统**：回合制战斗，包括攻击、技能、物品和逃跑选项
- **怪物系统**：多种野生怪物，拥有不同的属性和技能
- **对话系统**：NPC对话和支线任务
- **地图探索**：一个简单的2D地图，玩家可以在各场景间移动
- **存档系统**：保存游戏进度，包括等级、位置、完成的任务等
- **音效与动画**：攻击、受伤和升级的视觉效果和音效

**在Claude Code中输入以下内容**：

```
I want to build a Pokemon-style web RPG game.

Create a team to collaborate on development:

Team member responsibilities:
- Teammate A (Game Architect): design the overall architecture, define the game state machine, and plan the data structures
- Teammate B (Battle System): implement turn-based combat logic, the skill system, and damage calculation
- Teammate C (Dialogue System): implement NPC dialogue, the quest system, and story scripts
- Teammate D (Map Rendering): use Canvas to implement 2D map rendering, character movement, and scene switching
- Teammate E (UI & Audio): design the game interface, battle UI, and sound playback

Technical requirements:
- Use React + TypeScript + Vite
- Use Tailwind CSS for styling
- Use Framer Motion for animation
- Use Zustand for state management
- Turn-based battle system
- Save data with localStorage
- Use the Web Audio API for sound

Use Sonnet for each member, and Opus for the Team Lead.

First ask the architect to design the overall solution. After the data structures are defined, let the other members develop in parallel.
```

**Claude 将如何执行它**：

**第一阶段：架构设计**

团队负责人将首先请队友 A，即游戏架构师，设计整体结构：

```
Teammate A is designing the game architecture...

Tech stack: React 18 + TypeScript + Vite + Tailwind CSS + Framer Motion + Zustand

Project initialization:
npm create vite@latest pokemon-rpg -- --template react-ts
npm install zustand framer-motion
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

File structure:
src/
├── App.tsx                 # Main app component
├── main.tsx                # Entry file
├── types/
│   ├── player.ts           # Player type definitions
│   ├── monster.ts          # Monster type definitions
│   ├── skill.ts            # Skill type definitions
│   └── game.ts             # Game state types
├── stores/
│   └── gameStore.ts        # Zustand state management
├── components/
│   ├── map/                # Map-related components
│   │   ├── MapCanvas.tsx   # Map Canvas
│   │   ├── PlayerSprite.tsx # Player sprite
│   │   └── NPCSprite.tsx   # NPC sprite
│   ├── battle/             # Battle-related components
│   │   ├── BattleScreen.tsx    # Battle screen
│   │   ├── BattleMenu.tsx      # Battle menu
│   │   ├── HPBar.tsx           # HP bar component
│   │   └── BattleLog.tsx       # Battle log
│   ├── dialog/             # Dialogue-related components
│   │   ├── DialogBox.tsx   # Dialogue box
│   │   └── Choices.tsx     # Choices component
│   └── ui/                 # Shared UI components
│       ├── Button.tsx
│       ├── ProgressBar.tsx
│       └── StatCard.tsx
├── systems/
│   ├── BattleSystem.ts     # Battle system logic
│   ├── DialogSystem.ts     # Dialogue system logic
│   ├── QuestSystem.ts      # Quest system logic
│   └── MapSystem.ts        # Map system logic
├── hooks/
│   ├── useBattle.ts        # Battle hook
│   ├── useDialog.ts        # Dialogue hook
│   └── useAudio.ts         # Audio hook
├── data/
│   ├── monsters.ts         # Monster data
│   ├── skills.ts           # Skill data
│   ├── dialogues.ts        # Dialogue scripts
│   └── maps.ts             # Map data
└── utils/
    ├── audio.ts            # Audio utilities
    └── storage.ts          # Save utilities

Core data structure design:

// types/player.ts - Player type
interface Player {
  id: string;
  name: string;
  level: number;
  exp: number;
  maxExp: number;
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
  skills: Skill[];
  position: { x: number; y: number };
  direction: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
  gold: number;
  items: string[];
}

// types/skill.ts - Skill type
  id: string,
  name: string,
  type: 'attack' | 'heal' | 'buff' | 'special',
  power: number,
  accuracy: number,
  pp: number,
  maxPp: number,
  effect?: string
}

// Game state
{
  screen: 'map' | 'battle' | 'dialog' | 'menu',
  player: Player,
  currentMap: string,
  position: {x: number, y: number},
  inBattle: boolean,
  dialogQueue: Array<Dialog>,
  gameData: {
    completedQuests: string[],
    items: string[],
    visitedMaps: string[]
  }
}

Battle system design:
- Turn-based, with the player acting first
- Each turn the player can choose: attack, skill, item, or flee
- Skills have PP limits and must be restored when depleted
- Damage formula: (attacker attack / defender defense) × skill power × random factor (0.85~1.0)

Dialogue system design:
- Typewriter effect for text display
- Supports branching options
- Supports conditional triggers, such as after a quest is completed
- NPCs have facing direction, and conversations trigger automatically when the player approaches
```

**阶段 2：并行开发**

一旦架构确认，团队负责人制定任务清单，其余成员开始并行工作：

```
Task list:
├── [Teammate B] Implement battle system core logic (in progress...)
├── [Teammate C] Implement dialogue and quest systems (in progress...)
├── [Teammate D] Implement 2D map rendering (in progress...)
└── [Teammate E] Design UI and audio (in progress...)
```

<details>
<summary>📁 队友 B：战斗系统核心代码</summary>

```javascript
// battle.js - Battle system
class BattleSystem {
  constructor(player, monster) {
    this.player = player;
    this.monster = monster;
    this.turn = 'player';
    this.log = [];
    this.state = 'active'; // active, victory, defeat, flee
  }

  // Player attack
  playerAttack(skill) {
    if (this.turn !== 'player') return;

    const damage = this.calculateDamage(this.player, this.monster, skill);
    this.monster.hp = Math.max(0, this.monster.hp - damage);

    this.log.push(`${this.player.name} used ${skill.name}!`);
    this.log.push(`It dealt ${damage} damage!`);

    // Skill effect
    if (skill.effect) {
      this.applyEffect(this.player, this.monster, skill.effect);
    }

    // Check whether battle is over
    if (this.monster.hp <= 0) {
      this.state = 'victory';
      this.log.push(`${this.monster.name} collapsed!`);
      this.giveExp();
    } else {
      this.turn = 'monster';
      setTimeout(() => this.monsterAttack(), 1000);
    }
  }

  // Monster attack
  monsterAttack() {
    if (this.state !== 'active') return;

    // Randomly choose a skill
    const skill = this.monster.skills[Math.floor(Math.random() * this.monster.skills.length)];
    const damage = this.calculateDamage(this.monster, this.player, skill);

    this.player.hp = Math.max(0, this.player.hp - damage);

    this.log.push(`${this.monster.name} used ${skill.name}!`);
    this.log.push(`It dealt ${damage} damage!`);

    if (this.player.hp <= 0) {
      this.state = 'defeat';
      this.log.push(`${this.player.name} fell...`);
    } else {
      this.turn = 'player';
    }
  }

  // Damage calculation
  calculateDamage(attacker, defender, skill) {
    const levelFactor = (2 * attacker.level / 5 + 2);
    const attackDefense = attacker.attack / defender.defense;
    const baseDamage = levelFactor * attackDefense * skill.power + 2;
    const randomFactor = 0.85 + Math.random() * 0.15;

    // Type advantage bonus (simplified)
    let typeBonus = 1;
    // if (skill.type > defender.type) typeBonus = 1.5;

    return Math.floor(baseDamage * randomFactor * typeBonus);
  }

  // Apply skill effect
  applyEffect(user, target, effect) {
    switch(effect) {
      case 'burn':
        this.log.push(`${target.name} was burned!`);
        break;
      case 'heal':
        const healAmount = Math.floor(user.maxHp * 0.3);
        user.hp = Math.min(user.maxHp, user.hp + healAmount);
        this.log.push(`${user.name} recovered ${healAmount} HP!`);
        break;
      case 'buff':
        user.attack = Math.floor(user.attack * 1.2);
        this.log.push(`${user.name}'s attack increased!`);
        break;
    }
  }

  // Gain experience
  giveExp() {
    const baseExp = this.monster.level * 50;
    const expGain = Math.floor(baseExp * (1 + this.player.level / 10));

    this.player.exp += expGain;
    this.log.push(`${this.player.name} gained ${expGain} EXP!`);

    // Level-up check
    while (this.player.exp >= this.player.maxExp) {
      this.levelUp();
    }
  }

  // Level up
  levelUp() {
    this.player.level++;
    this.player.exp -= this.player.maxExp;
    this.player.maxExp = Math.floor(this.player.maxExp * 1.5);

    // Stat growth
    const hpGain = 10 + Math.floor(Math.random() * 5);
    const atkGain = 3 + Math.floor(Math.random() * 2);
    const defGain = 2 + Math.floor(Math.random() * 2);

    this.player.maxHp += hpGain;
    this.player.hp = this.player.maxHp;
    this.player.attack += atkGain;
    this.player.defense += defGain;

    this.log.push(`${this.player.name} leveled up to ${this.player.level}!`);
    this.log.push(`HP +${hpGain}, ATK +${atkGain}, DEF +${defGain}`);
  }

  // Flee
  flee() {
    if (Math.random() < 0.7) {
      this.state = 'flee';
      this.log.push('You fled successfully!');
      return true;
    } else {
      this.log.push('Failed to flee!');
      this.turn = 'monster';
      setTimeout(() => this.monsterAttack(), 1000);
      return false;
    }
  }
}

// monster.js - Monster data
const MONSTER_DATA = [
  {
    id: 'slime',
    name: 'Slime',
    baseHp: 30,
    baseAtk: 8,
    baseDef: 5,
    skills: [
      {id: 'tackle', name: 'Tackle', type: 'attack', power: 40, accuracy: 100, pp: 35}
    ],
    expGain: 20
  },
  {
    id: 'goblin',
    name: 'Goblin',
    baseHp: 45,
    baseAtk: 12,
    baseDef: 8,
    skills: [
      {id: 'tackle', name: 'Tackle', type: 'attack', power: 40, accuracy: 100, pp: 35},
      {id: 'scratch', name: 'Scratch', type: 'attack', power: 55, accuracy: 100, pp: 25}
    ],
    expGain: 35
  },
  {
    id: 'dragon',
    name: 'Young Dragon',
    baseHp: 80,
    baseAtk: 20,
    baseDef: 15,
    skills: [
      {id: 'scratch', name: 'Scratch', type: 'attack', power: 55, accuracy: 100, pp: 25},
      {id: 'ember', name: 'Ember', type: 'attack', power: 70, accuracy: 90, pp: 15},
      {id: 'growl', name: 'Growl', type: 'buff', power: 0, accuracy: 100, pp: 20}
    ],
    expGain: 80
  }
];
```

</details>

<details>
<summary>📁 队友 C：对话和任务系统代码</summary>

```javascript
// dialog.js - Dialogue system
class DialogSystem {
  constructor() {
    this.dialogQueue = [];
    this.currentDialog = null;
    this.isShowing = false;
    this.onComplete = null;
  }

  // Show dialogue
  showDialog(dialog, onComplete) {
    this.dialogQueue = Array.isArray(dialog) ? dialog : [dialog];
    this.onComplete = onComplete;
    this.isShowing = true;
    this.showNext();
  }

  // Show the next dialogue item
  showNext() {
    if (this.dialogQueue.length === 0) {
      this.isShowing = false;
      if (this.onComplete) this.onComplete();
      return;
    }

    this.currentDialog = this.dialogQueue.shift();

    // Handle special dialogue types
    if (typeof this.currentDialog === 'function') {
      this.currentDialog();
      this.showNext();
      return;
    }

    this.renderDialog();
  }

  // Render the dialogue box
  renderDialog() {
    const dialogBox = document.getElementById('dialogBox');
    const speakerEl = document.getElementById('dialogSpeaker');
    const textEl = document.getElementById('dialogText');

    if (this.currentDialog.speaker) {
      speakerEl.textContent = this.currentDialog.speaker;
      speakerEl.style.display = 'block';
    } else {
      speakerEl.style.display = 'none';
    }

    // Typewriter effect
    textEl.textContent = '';
    let i = 0;
    const text = this.currentDialog.text;
    const speed = this.currentDialog.speed || 30;

    const typeWriter = setInterval(() => {
      if (i < text.length) {
        textEl.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(typeWriter);
      }
    }, speed);

    // Show choices, if any
    this.renderChoices();
  }

  // Render choices
  renderChoices() {
    if (!this.currentDialog.choices) return;

    const choicesEl = document.getElementById('dialogChoices');
    choicesEl.innerHTML = '';
    choicesEl.style.display = 'block';

    this.currentDialog.choices.forEach(choice => {
      const btn = document.createElement('button');
      btn.textContent = choice.text;
      btn.onclick = () => {
        if (choice.condition === undefined || choice.condition()) {
          this.dialogQueue = [];
          this.showDialog(choice.dialog, this.onComplete);
        }
      };
      choicesEl.appendChild(btn);
    });
  }

  // Next
  next() {
    if (this.currentDialog && this.currentDialog.choices) return; // must choose when options exist
    this.showNext();
  }
}

// Quest system
class QuestSystem {
  constructor() {
    this.quests = {};
    this.activeQuests = [];
    this.completedQuests = [];
  }

  // Accept a quest
  acceptQuest(questId) {
    if (this.completedQuests.includes(questId)) return false;
    if (this.activeQuests.includes(questId)) return false;

    this.activeQuests.push(questId);
    return true;
  }

  // Update quest progress
  updateProgress(type, target) {
    this.activeQuests.forEach(questId => {
      const quest = this.quests[questId];
      if (!quest) return;

      quest.objectives.forEach(obj => {
        if (obj.type === type && obj.target === target && !obj.completed) {
          obj.current = (obj.current || 0) + 1;
          if (obj.current >= obj.required) {
            obj.completed = true;
          }
        }
      });

      this.checkCompletion(questId);
    });
  }

  // Check quest completion
  checkCompletion(questId) {
    const quest = this.quests[questId];
    if (!quest) return;

    const allComplete = quest.objectives.every(obj => obj.completed);
    if (allComplete) {
      this.completeQuest(questId);
    }
  }

  // Complete quest
  completeQuest(questId) {
    const index = this.activeQuests.indexOf(questId);
    if (index > -1) {
      this.activeQuests.splice(index, 1);
      this.completedQuests.push(questId);

      // Give rewards
      const quest = this.quests[questId];
      this.giveRewards(quest.rewards);
    }
  }

  // Give rewards
  giveRewards(rewards) {
    if (rewards.exp) player.gainExp(rewards.exp);
    if (rewards.gold) player.gold += rewards.gold;
    if (rewards.items) rewards.items.forEach(item => player.addItem(item));
  }
}

// dialogues.js - Dialogue script examples
const DIALOGUES = {
  villageChief: {
    firstMeeting: [
      {speaker: 'Village Chief', text: 'Oh, adventurer... you finally arrived.'},
      {speaker: 'Village Chief', text: 'Lately, many wild monsters have appeared near our village, and everyone is frightened.'},
      {speaker: 'Village Chief', text: 'If you can help drive them away, I would be deeply grateful!'},
      {
        choices: [
          {text: 'Okay, I accept this quest', dialog: () => {
            quests.acceptQuest('defeatMonsters');
            return [
              {speaker: 'Village Chief', text: 'Wonderful! Please defeat 3 slimes to the north.'},
              {speaker: 'System', text: 'Quest [Drive Away the Slimes] accepted!'}
            ];
          }},
          {text: 'I am a little busy right now', dialog: [
            {speaker: 'Village Chief', text: 'All right. Come back when you are ready.'}
          ]}
        ]
      }
    ],
    afterQuest: [
      {speaker: 'Village Chief', text: 'You really did it! Thank you so much!'},
      {speaker: 'System', text: 'Quest [Drive Away the Slimes] completed! You gained 100 EXP!'},
      {speaker: 'Village Chief', text: 'Please take this. It is a small token of my thanks.'}
    ]
  },

  shopkeeper: [
    {speaker: 'Shopkeeper', text: 'Welcome! Looking for something?'},
    {
      choices: [
        {text: 'Browse goods', dialog: () => {
          game.openShop();
          return [{speaker: 'Shopkeeper', text: 'Take whatever catches your eye!'}];
        }},
        {text: 'Leave', dialog: [{speaker: 'Shopkeeper', text: 'Come again next time!'}]}
      ]
    }
  ]
};
```

</details>

<details>
<summary>📁 队友 D：二维地图渲染系统代码</summary>

```javascript
// map.js - Map rendering system
class MapRenderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.tileSize = 32;
    this.currentMap = null;
    this.player = null;
    this.npcs = [];
    this.camera = {x: 0, y: 0};
  }

  // Load map
  loadMap(mapData) {
    this.currentMap = mapData;
    this.npcs = mapData.npcs || [];
    this.updateCamera();
  }

  // Render the map
  render() {
    if (!this.currentMap) return;

    // Clear the canvas
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Save context
    this.ctx.save();

    // Apply camera offset
    this.ctx.translate(-this.camera.x, -this.camera.y);

    // Render map layers
    this.renderLayers();

    // Render NPCs
    this.renderNPCs();

    // Render player
    this.renderPlayer();

    // Restore context
    this.ctx.restore();
  }

  // Render map layers
  renderLayers() {
    const map = this.currentMap;

    for (let layer = 0; layer < map.layers.length; layer++) {
      const data = map.layers[layer].data;

      for (let y = 0; y < map.height; y++) {
        for (let x = 0; x < map.width; x++) {
          const tileId = data[y * map.width + x];
          if (tileId === 0) continue;

          const tileX = x * this.tileSize;
          const tileY = y * this.tileSize;

          this.renderTile(tileX, tileY, tileId);
        }
      }
    }
  }

  // Render a single tile
  renderTile(x, y, tileId) {
    // Draw different tiles based on tile ID
    const tileType = this.getTileType(tileId);

    switch(tileType) {
      case 'grass':
        this.ctx.fillStyle = '#4a8f4a';
        this.ctx.fillRect(x, y, this.tileSize, this.tileSize);
        // Grass texture
        this.ctx.fillStyle = '#3d7f3d';
        for (let i = 0; i < 3; i++) {
          const px = x + Math.random() * this.tileSize;
          const py = y + Math.random() * this.tileSize;
          this.ctx.fillRect(px, py, 2, 2);
        }
        break;

      case 'water':
        this.ctx.fillStyle = '#4a90d9';
        this.ctx.fillRect(x, y, this.tileSize, this.tileSize);
        // Ripple effect
        const wave = Math.sin(Date.now() / 500 + x / 20) * 2;
        this.ctx.fillStyle = '#5aa0e9';
        this.ctx.fillRect(x, y + 10 + wave, this.tileSize, 2);
        break;

      case 'wall':
        this.ctx.fillStyle = '#8b7355';
        this.ctx.fillRect(x, y, this.tileSize, this.tileSize);
        this.ctx.fillStyle = '#7a6248';
        this.ctx.fillRect(x + 2, y + 2, this.tileSize - 4, this.tileSize - 4);
        break;

      case 'path':
        this.ctx.fillStyle = '#c4a77d';
        this.ctx.fillRect(x, y, this.tileSize, this.tileSize);
        break;

      case 'house':
        this.ctx.fillStyle = '#a0522d';
        this.ctx.fillRect(x, y, this.tileSize, this.tileSize);
        // Roof
        this.ctx.fillStyle = '#8b4513';
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x + this.tileSize / 2, y - 10);
        this.ctx.lineTo(x + this.tileSize, y);
        this.ctx.fill();
        break;
    }
  }

  // Get tile type
  getTileType(tileId) {
    const types = {
      1: 'grass', 2: 'water', 3: 'wall', 4: 'path', 5: 'house'
    };
    return types[tileId] || 'grass';
  }

  // Render NPCs
  renderNPCs() {
    this.npcs.forEach(npc => {
      const x = npc.x * this.tileSize;
      const y = npc.y * this.tileSize;

      // Draw NPC
      this.ctx.fillStyle = npc.color || '#ff6b6b';
      this.ctx.beginPath();
      this.ctx.arc(
        x + this.tileSize / 2,
        y + this.tileSize / 2,
        this.tileSize / 3,
        0,
        Math.PI * 2
      );
      this.ctx.fill();

      // Draw name
      this.ctx.fillStyle = '#fff';
      this.ctx.font = '10px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.fillText(npc.name, x + this.tileSize / 2, y - 5);
    });
  }

  // Render player
  renderPlayer() {
    if (!this.player) return;

    const x = this.player.x * this.tileSize;
    const y = this.player.y * this.tileSize;

    // Player body
    this.ctx.fillStyle = '#4ecdc4';
    this.ctx.beginPath();
    this.ctx.arc(
      x + this.tileSize / 2,
      y + this.tileSize / 2,
      this.tileSize / 3,
      0,
      Math.PI * 2
    );
    this.ctx.fill();

    // Player direction indicator
    const directions = {UP: [0, -8], DOWN: [0, 8], LEFT: [-8, 0], RIGHT: [8, 0]};
    const [dx, dy] = directions[this.player.direction] || [0, 0];

    this.ctx.fillStyle = '#2d3436';
    this.ctx.beginPath();
    this.ctx.arc(
      x + this.tileSize / 2 + dx,
      y + this.tileSize / 2 + dy,
      4,
      0,
      Math.PI * 2
    );
    this.ctx.fill();
  }

  // Update camera position
  updateCamera() {
    if (!this.player) return;

    // Camera follows player and keeps them centered
    const targetX = this.player.x * this.tileSize - this.canvas.width / 2;
    const targetY = this.player.y * this.tileSize - this.canvas.height / 2;

    // Smooth movement
    this.camera.x += (targetX - this.camera.x) * 0.1;
    this.camera.y += (targetY - this.camera.y) * 0.1;

    // Prevent camera from going beyond map bounds
    const maxX = this.currentMap.width * this.tileSize - this.canvas.width;
    const maxY = this.currentMap.height * this.tileSize - this.canvas.height;
    this.camera.x = Math.max(0, Math.min(this.camera.x, maxX));
    this.camera.y = Math.max(0, Math.min(this.camera.y, maxY));
  }

  // Check collision
  checkCollision(x, y) {
    // Check map bounds
    if (x < 0 || x >= this.currentMap.width || y < 0 || y >= this.currentMap.height) {
      return true;
    }

    // Check tile collision
    const tileId = this.currentMap.layers[0].data[y * this.currentMap.width + x];
    const solidTiles = [3, 5]; // walls and houses are obstacles

    if (solidTiles.includes(tileId)) {
      return true;
    }

    // Check NPC collision
    for (const npc of this.npcs) {
      if (npc.x === x && npc.y === y) {
        // Trigger NPC dialogue
        this.triggerNPC(npc);
        return true;
      }
    }

    return false;
  }

  // Trigger NPC dialogue
  triggerNPC(npc) {
    if (npc.dialogue) {
      game.dialogSystem.showDialog(npc.dialogue);
    }
  }
}

// Example map data
const VILLAGE_MAP = {
  name: 'Starter Village',
  width: 20,
  height: 15,
  layers: [
    {
      name: 'ground',
      data: [
        // Map data (simplified)
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,4,4,4,1,1,5,5,5,1,1,4,4,4,4,1,1,1,1,1,
        1,4,1,4,1,1,5,5,5,1,1,4,1,1,4,1,1,1,1,1,
        1,4,4,4,1,1,1,1,1,1,1,4,4,4,4,1,2,2,1,1,
        1,1,1,1,1,1,4,4,4,1,1,1,1,1,1,1,2,2,1,1,
        1,4,4,4,1,1,4,4,4,1,1,1,1,1,1,1,2,2,1,1,
        1,4,1,4,1,1,1,1,1,1,1,4,4,4,1,1,1,1,1,1,
        1,4,4,4,1,1,1,1,1,1,1,4,1,1,4,1,1,1,1,1,
        // ... more map data
      ]
    }
  ],
  npcs: [
    {
      id: 'village_chief',
      name: 'Village Chief',
      x: 5,
      y: 5,
      color: '#ffd93d',
      dialogue: DIALOGUES.villageChief.firstMeeting,
      direction: 'DOWN'
    },
    {
      id: 'shopkeeper',
      name: 'Shopkeeper',
      x: 15,
      y: 8,
      color: '#6bcf7f',
      dialogue: DIALOGUES.shopkeeper,
      direction: 'DOWN'
    }
  ],
  exits: [
    {x: 10, y: 0, to: 'forest_map', spawnX: 5, spawnY: 14}
  ]
};
```

</details>

<details>
<summary>📁 队友 E：战斗界面代码</summary>

```html
<!-- Battle screen HTML -->
<div id="battleScreen" class="screen hidden">
  <!-- Enemy area -->
  <div class="enemy-area">
    <div class="monster-sprite">
      <canvas id="monsterSprite" width="128" height="128"></canvas>
    </div>
    <div class="monster-info">
      <div class="name" id="enemyName">Slime</div>
      <div class="level">Lv. <span id="enemyLevel">3</span></div>
      <div class="hp-bar">
        <div class="hp-fill" id="enemyHpBar" style="width: 100%"></div>
      </div>
      <div class="hp-text">
        <span id="enemyHp">30</span> / <span id="enemyMaxHp">30</span>
      </div>
    </div>
  </div>

  <!-- Player area -->
  <div class="player-area">
    <div class="player-info">
      <div class="name" id="playerName">Hero</div>
      <div class="level">Lv. <span id="playerLevel">5</span></div>
      <div class="hp-bar">
        <div class="hp-fill" id="playerHpBar" style="width: 80%"></div>
      </div>
      <div class="hp-text">
        <span id="playerHp">80</span> / <span id="playerMaxHp">100</span>
      </div>
      <div class="exp-bar">
        <div class="exp-fill" id="expBar" style="width: 60%"></div>
      </div>
    </div>
    <div class="player-sprite">
      <canvas id="playerSprite" width="128" height="128"></canvas>
    </div>
  </div>

  <!-- Battle menu -->
  <div class="battle-menu" id="battleMenu">
    <div class="menu-row">
      <button class="menu-btn" data-action="attack">Attack</button>
      <button class="menu-btn" data-action="skills">Skills</button>
      <button class="menu-btn" data-action="items">Items</button>
      <button class="menu-btn" data-action="flee">Flee</button>
    </div>
  </div>

  <!-- Skill submenu -->
  <div class="submenu hidden" id="skillsMenu">
    <div class="submenu-title">Choose a skill</div>
    <div class="submenu-list" id="skillsList"></div>
    <button class="back-btn" onclick="hideSubmenu()">Back</button>
  </div>

  <!-- Battle log -->
  <div class="battle-log">
    <div id="battleLog"></div>
  </div>
</div>
```

```css
/* battle.css - Battle screen styles */
.battle-screen {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #87ceeb 0%, #e0f7fa 50%, #4a5568 50%, #2d3748 100%);
  display: flex;
  flex-direction: column;
}

.enemy-area {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
}

.monster-sprite canvas {
  image-rendering: pixelated;
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
  animation: float 2s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.monster-info {
  margin-left: 40px;
  text-align: center;
}

.monster-info .name {
  font-size: 24px;
  font-weight: bold;
  color: #2d3748;
}

.monster-info .level {
  font-size: 14px;
  color: #718096;
  margin: 8px 0;
}

.hp-bar {
  width: 200px;
  height: 20px;
  background: #e2e8f0;
  border-radius: 10px;
  overflow: hidden;
  border: 2px solid #4a5568;
}

.hp-fill {
  height: 100%;
  background: linear-gradient(90deg, #48bb78, #38a169);
  transition: width 0.3s ease;
}

.hp-text {
  margin-top: 8px;
  font-size: 14px;
  color: #4a5568;
}

.player-area {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 40px;
}

.player-info {
  background: rgba(255,255,255,0.9);
  border-radius: 12px;
  padding: 20px;
  border: 3px solid #4a5568;
}

.exp-bar {
  width: 200px;
  height: 8px;
  background: #e2e8f0;
  border-radius: 4px;
  margin-top: 8px;
}

.exp-fill {
  height: 100%;
  background: linear-gradient(90deg, #4299e1, #3182ce);
  border-radius: 4px;
}

.battle-menu {
  background: rgba(255,255,255,0.95);
  border: 3px solid #4a5568;
  border-radius: 12px;
  padding: 20px;
  margin: 0 40px 40px;
}

.menu-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.menu-btn {
  padding: 16px 24px;
  font-size: 18px;
  font-weight: bold;
  background: linear-gradient(180deg, #fff 0%, #e2e8f0 100%);
  border: 2px solid #4a5568;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.menu-btn:hover {
  background: linear-gradient(180deg, #4299e1 0%, #3182ce 100%);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.battle-log {
  position: absolute;
  bottom: 120px;
  left: 40px;
  right: 40px;
  max-height: 100px;
  overflow-y: auto;
  background: rgba(0,0,0,0.7);
  border-radius: 8px;
  padding: 12px;
}

#battleLog {
  color: #fff;
  font-size: 14px;
  line-height: 1.8;
}

.log-entry {
  margin-bottom: 4px;
  opacity: 0;
  animation: fadeIn 0.3s forwards;
}

@keyframes fadeIn {
  to { opacity: 1; }
}

/* Hit animation */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

.shake {
  animation: shake 0.3s ease-in-out;
}

/* Attack animation */
@keyframes attackRight {
  0% { transform: translateX(0); }
  50% { transform: translateX(30px); }
  100% { transform: translateX(0); }
}

.attack-right {
  animation: attackRight 0.3s ease-in-out;
}
```

</details>

<details>
<summary>📁 音频系统代码</summary>

```javascript
// audio.js - Audio system
class AudioManager {
  constructor() {
    this.audioContext = null;
    this.sounds = {};
    this.musicVolume = 0.3;
    this.sfxVolume = 0.5;
    this.currentBgm = null;
  }

  // Initialize audio context
  init() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }

  // Play background music
  playBgm(bgmName) {
    if (this.currentBgm === bgmName) return;

    this.stopBgm();

    // Use oscillators to generate simple BGM
    this.currentBgm = bgmName;
    this.playGeneratedBgm(bgmName);
  }

  // Generate simple background music
  playGeneratedBgm(type) {
    const melodies = {
      battle: [262, 294, 330, 262, 294, 330, 349, 330],
      village: [330, 349, 392, 349, 330, 294, 262, 294],
      victory: [392, 440, 494, 523, 494, 440, 392, 349]
    };

    const melody = melodies[type] || melodies.village;
    let noteIndex = 0;

    const playNote = () => {
      if (this.currentBgm !== type) return;

      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();

      osc.connect(gain);
      gain.connect(this.audioContext.destination);

      osc.frequency.value = melody[noteIndex];
      osc.type = 'triangle';

      gain.gain.setValueAtTime(this.musicVolume, this.audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(
        0.01,
        this.audioContext.currentTime + 0.4
      );

      osc.start(this.audioContext.currentTime);
      osc.stop(this.audioContext.currentTime + 0.4);

      noteIndex = (noteIndex + 1) % melody.length;
      setTimeout(playNote, 500);
    };

    playNote();
  }

  // Stop background music
  stopBgm() {
    this.currentBgm = null;
  }

  // Play sound effect
  playSfx(sfxName) {
    this.init();

    switch(sfxName) {
      case 'attack':
        this.playAttackSound();
        break;
      case 'hit':
        this.playHitSound();
        break;
      case 'victory':
        this.playVictorySound();
        break;
      case 'levelup':
        this.playLevelUpSound();
        break;
      case 'dialog':
        this.playDialogSound();
        break;
    }
  }

  // Attack sound effect
  playAttackSound() {
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    osc.connect(gain);
    gain.connect(this.audioContext.destination);

    osc.frequency.setValueAtTime(200, this.audioContext.currentTime);
    osc.frequency.exponentialRampToValueAtTime(
      100,
      this.audioContext.currentTime + 0.1
    );
    osc.type = 'sawtooth';

    gain.gain.setValueAtTime(this.sfxVolume, this.audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(
      0.01,
      this.audioContext.currentTime + 0.1
    );

    osc.start(this.audioContext.currentTime);
    osc.stop(this.audioContext.currentTime + 0.1);
  }

  // Hit sound effect
  playHitSound() {
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    osc.connect(gain);
    gain.connect(this.audioContext.destination);

    osc.frequency.value = 100;
    osc.type = 'square';

    gain.gain.setValueAtTime(this.sfxVolume * 0.8, this.audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(
      0.01,
      this.audioContext.currentTime + 0.2
    );

    osc.start(this.audioContext.currentTime);
    osc.stop(this.audioContext.currentTime + 0.2);
  }

  // Victory sound effect
  playVictorySound() {
    const notes = [523, 659, 784, 1047];
    notes.forEach((freq, i) => {
      setTimeout(() => {
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();

        osc.connect(gain);
        gain.connect(this.audioContext.destination);

        osc.frequency.value = freq;
        osc.type = 'sine';

        gain.gain.setValueAtTime(this.sfxVolume, this.audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(
          0.01,
          this.audioContext.currentTime + 0.5
        );

        osc.start(this.audioContext.currentTime);
        osc.stop(this.audioContext.currentTime + 0.5);
      }, i * 150);
    });
  }

  // Level-up sound effect
  playLevelUpSound() {
    const notes = [392, 523, 659, 784, 1047];
    notes.forEach((freq, i) => {
      setTimeout(() => {
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();

        osc.connect(gain);
        gain.connect(this.audioContext.destination);

        osc.frequency.value = freq;
        osc.type = 'triangle';

        gain.gain.setValueAtTime(this.sfxVolume, this.audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(
          0.01,
          this.audioContext.currentTime + 0.3
        );

        osc.start(this.audioContext.currentTime);
        osc.stop(this.audioContext.currentTime + 0.3);
      }, i * 100);
    });
  }

  // Dialogue sound effect
  playDialogSound() {
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    osc.connect(gain);
    gain.connect(this.audioContext.destination);

    osc.frequency.value = 800;
    osc.type = 'sine';

    gain.gain.setValueAtTime(this.sfxVolume * 0.3, this.audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(
      0.01,
      this.audioContext.currentTime + 0.05
    );

    osc.start(this.audioContext.currentTime);
    osc.stop(this.audioContext.currentTime + 0.05);
  }
}
```

</details>

**成员之间的协作对话**:

```
Teammate B → Teammate C:
"The battle system is done. When the player wins, it calls giveExp() to level up.
Please check the quest system and make sure level-up data is saved correctly."

Teammate C → Teammate B:
"Got it. The quest system stores game data with localStorage,
including level, experience, and the list of completed quests. I'll add an autosave mechanism."

Teammate D → All:
"The map rendering system is finished, and the NPC facing data is now connected to the dialogue system.
When the player faces an NPC, dialogue will trigger automatically. Please confirm the trigger logic in the dialogue system."

Teammate C → Teammate D:
"Confirmed. DialogSystem has a showDialog() method that can accept a dialogue array.
I'll make sure all NPC dialogue data follows that format."

Teammate E → Teammate B:
"The battle UI is finished, but I need real-time player and monster data to update the HP bars.
Does the battle system provide a callback?"

Teammate B → Teammate E:
"Yes. BattleSystem has an onUpdate callback that fires at the end of each turn.
You can register that callback to update the UI."

Teammate E → Teammate D:
"When switching maps, we need to reposition the camera.
Does MapRenderer provide an updateCamera() method?"

Teammate D → Teammate E:
"Yes. updateCamera() is called automatically after every loadMap().
You can also call it manually after the player moves to smoothly update the camera."
```

**第3阶段：集成和测试**

在所有组件完成后，团队负责人负责集成：

<details>
<summary>📁 主游戏控制器代码</summary>

```javascript
// game.js - Main game controller
class Game {
  constructor() {
    this.state = 'map'; // map, battle, dialog, menu
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');

    // Initialize each system
    this.player = this.createPlayer();
    this.mapRenderer = new MapRenderer(this.canvas);
    this.battleSystem = null;
    this.dialogSystem = new DialogSystem();
    this.questSystem = new QuestSystem();
    this.audioManager = new AudioManager();

    // Load map
    this.currentMapId = 'village';
    this.mapRenderer.loadMap(VILLAGE_MAP);
    this.mapRenderer.player = this.player;

    // Input handling
    this.setupInput();

    // Start game loop
    this.lastTime = 0;
    this.gameLoop = this.gameLoop.bind(this);
    requestAnimationFrame(this.gameLoop);

    // Auto-load save
    this.loadGame();
  }

  // Create player
  createPlayer() {
    return {
      name: 'Hero',
      level: 1,
      exp: 0,
      maxExp: 100,
      hp: 50,
      maxHp: 50,
      attack: 15,
      defense: 10,
      skills: [
        {id: 'tackle', name: 'Tackle', type: 'attack', power: 40, accuracy: 100, pp: 35}
      ],
      x: 10,
      y: 7,
      direction: 'DOWN',
      gold: 100,
      items: ['potion', 'potion', 'antidote']
    };
  }

  // Set up input handling
  setupInput() {
    document.addEventListener('keydown', (e) => {
      if (this.state === 'map') {
        this.handleMapInput(e);
      } else if (this.state === 'dialog') {
        this.handleDialogInput(e);
      } else if (this.state === 'battle') {
        this.handleBattleInput(e);
      }
    });
  }

  // Map input handling
  handleMapInput(e) {
    if (this.dialogSystem.isShowing) {
      if (e.key === ' ' || e.key === 'Enter') {
        this.dialogSystem.next();
      }
      return;
    }

    let dx = 0, dy = 0;
    switch(e.key) {
      case 'ArrowUp': case 'w': dy = -1; this.player.direction = 'UP'; break;
      case 'ArrowDown': case 's': dy = 1; this.player.direction = 'DOWN'; break;
      case 'ArrowLeft': case 'a': dx = -1; this.player.direction = 'LEFT'; break;
      case 'ArrowRight': case 'd': dx = 1; this.player.direction = 'RIGHT'; break;
      default: return;
    }

    const newX = this.player.x + dx;
    const newY = this.player.y + dy;

    if (!this.mapRenderer.checkCollision(newX, newY)) {
      this.player.x = newX;
      this.player.y = newY;
      this.mapRenderer.updateCamera();

      // Check random battle
      if (Math.random() < 0.05) {
        this.startBattle();
      }

      // Save game
      this.saveGame();
    }
  }

  // Dialogue input handling
  handleDialogInput(e) {
    if (e.key === ' ' || e.key === 'Enter') {
      this.dialogSystem.next();
      if (!this.dialogSystem.isShowing) {
        this.state = 'map';
      }
    }
  }

  // Battle input handling
  handleBattleInput(e) {
    if (!this.battleSystem) return;
    if (this.battleSystem.turn !== 'player') return;
  }

  // Start battle
  startBattle(monsterData) {
    // Randomly choose a monster
    const randomMonster = MONSTER_DATA[Math.floor(Math.random() * MONSTER_DATA.length)];

    // Create monster instance
    const monster = {
      ...randomMonster,
      level: Math.max(1, this.player.level + Math.floor(Math.random() * 3) - 1),
      hp: randomMonster.baseHp + randomMonster.baseHp * 0.2 * this.player.level,
      maxHp: randomMonster.baseHp + randomMonster.baseHp * 0.2 * this.player.level,
      attack: randomMonster.baseAtk + randomMonster.baseAtk * 0.15 * this.player.level,
      defense: randomMonster.baseDef + randomMonster.baseDef * 0.1 * this.player.level
    };

    this.battleSystem = new BattleSystem(this.player, monster);
    this.state = 'battle';

    // Play battle music
    this.audioManager.playBgm('battle');

    // Show battle screen
    document.getElementById('battleScreen').classList.remove('hidden');
    document.getElementById('mapScreen').classList.add('hidden');

    // Update battle UI
    this.updateBattleUI();
  }

  // Update battle UI
  updateBattleUI() {
    if (!this.battleSystem) return;

    const player = this.battleSystem.player;
    const monster = this.battleSystem.monster;

    document.getElementById('playerName').textContent = player.name;
    document.getElementById('playerLevel').textContent = player.level;
    document.getElementById('playerHp').textContent = Math.floor(player.hp);
    document.getElementById('playerMaxHp').textContent = player.maxHp;
    document.getElementById('playerHpBar').style.width =
      (player.hp / player.maxHp * 100) + '%';

    document.getElementById('enemyName').textContent = monster.name;
    document.getElementById('enemyLevel').textContent = monster.level;
    document.getElementById('enemyHp').textContent = Math.floor(monster.hp);
    document.getElementById('enemyMaxHp').textContent = Math.floor(monster.maxHp);
    document.getElementById('enemyHpBar').style.width =
      (monster.hp / monster.maxHp * 100) + '%';

    // Update battle log
    const logEl = document.getElementById('battleLog');
    this.battleSystem.log.forEach(log => {
      const entry = document.createElement('div');
      entry.className = 'log-entry';
      entry.textContent = log;
      logEl.appendChild(entry);
    });
    logEl.scrollTop = logEl.scrollHeight;
  }

  // End battle
  endBattle() {
    this.state = 'map';
    this.battleSystem = null;

    // Hide battle screen
    document.getElementById('battleScreen').classList.add('hidden');
    document.getElementById('mapScreen').classList.remove('hidden');

    // Play map music
    this.audioManager.playBgm('village');

    // Save game
    this.saveGame();
  }

  // Save game
  saveGame() {
    const saveData = {
      player: this.player,
      currentMapId: this.currentMapId,
      completedQuests: this.questSystem.completedQuests,
      timestamp: Date.now()
    };

    localStorage.setItem('rpgSave', JSON.stringify(saveData));
  }

  // Load game
  loadGame() {
    const saveData = localStorage.getItem('rpgSave');
    if (saveData) {
      const data = JSON.parse(saveData);
      this.player = {...this.player, ...data.player};
      this.questSystem.completedQuests = data.completedQuests || [];
      this.currentMapId = data.currentMapId || 'village';
    }
  }

  // Main game loop
  gameLoop(timestamp) {
    const deltaTime = timestamp - this.lastTime;
    this.lastTime = timestamp;

    // Clear canvas
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Render by state
    if (this.state === 'map') {
      this.mapRenderer.render();
    }

    requestAnimationFrame(this.gameLoop);
  }
}

// Start the game
window.addEventListener('DOMContentLoaded', () => {
  window.game = new Game();
});
```

</details>

**最终结果**：

大约1到2小时后，一个功能齐全的宝可梦风格RPG就完成了！

```
Project summary:
✅ Game architecture design - Teammate A
✅ Turn-based battle system - Teammate B
✅ Dialogue and quest system - Teammate C
✅ 2D map rendering - Teammate D
✅ UI and sound effects - Teammate E

Project files:
├── index.html (120 lines)
├── css/
│   ├── main.css (100 lines)
│   ├── battle.css (180 lines)
│   └── dialog.css (80 lines)
├── js/
│   ├── game.js (250 lines)
│   ├── state.js (60 lines)
│   ├── player.js (50 lines)
│   ├── monster.js (80 lines)
│   ├── battle.js (220 lines)
│   ├── dialog.js (180 lines)
│   ├── map.js (280 lines)
│   └── audio.js (150 lines)
└── data/
    ├── monsters.js (100 lines)
    ├── skills.js (80 lines)
    └── dialogues.js (120 lines)

Total: about 2050 lines of code, completed collaboratively by 5 AI team members!

Game features:
🎮 Turn-based battle system (attack, skills, items, flee)
💬 NPC dialogue system (typewriter effect, branching choices)
📜 Quest system (accept quests, update progress, completion rewards)
🗺️ 2D map exploration (multi-scene transitions, NPC interaction)
💾 Autosave (progress stored with localStorage)
🔊 Sound effects and BGM (Web Audio API)
📊 Character growth (experience, leveling up, stat increases)
```

**观察团队工作**：

如果你配置了 tmux 分屏模式，你将看到多个终端窗口同时工作：

```
┌─────────────────┬─────────────────┬─────────────────┐
│  Teammate B     │  Teammate C     │  Teammate D     │
│  Implementing   │  Writing        │  Rendering      │
│  damage formula │  dialogue       │  tiles          │
│                 │  scripts        │                 │
│  "Teammate E,   │  "Is            │  "The monsters  │
│   is the HP bar │   MapRenderer   │   need attack   │
│   width a       │   ready yet?"   │   animations..."│
│   percentage?"  │                 │                 │
└─────────────────┴─────────────────┴─────────────────┘
```

**关键要点**：

这个动手示例展示了代理团队的几个核心优势：

1. **真正的并行开发**：5名成员同时开发不同的游戏系统  
2. **复杂项目管理**：2000行代码以结构化方式拆分和集成  
3. **专业化分工**：战斗、对话、地图和UI各有专责负责人  
4. **接口协调**：成员通过消息系统协商接口和数据格式  
5. **快速交付**：一个人可能需要几周的工作，团队几小时即可完成  

你可以亲自运行这个游戏，体验AI团队如何协作构建一个宝可梦风格的RPG。

---

### 单个提问 vs 代理团队：自行测试

为了让你更直观地感受代理团队的威力，我们准备了两个测试方案，你可以自行尝试并进行比较。

#### 测试方案A：单个提问方法

这是传统的方法：使用一个完整的提示词，让AI开发游戏。

**在Claude Code中输入以下内容**：

```
Help me build a Pokemon-style web RPG game with the following features:
- Character system (level, HP, attack, defense)
- Turn-based battle system (attack, skills, items, flee)
- NPC dialogue system
- 2D map exploration
- Save system
- Audio system

Use React + TypeScript + Vite + Tailwind CSS.
Please give me complete code that can run directly.
```

**预期结果**:

| 项目 | 预期情况 |
|------|---------|
| **代码质量** | AI 会尝试生成所有代码，但由于上下文限制，许多细节会被省略或替换为注释 |
| **功能完整性** | 核心功能可能存在，但许多高级功能会缺失或简化 |
| **可运行性** | 可能存在漏洞，你可能需要多轮调试才能运行 |
| **开发时间** | 一次对话可能需要 30 到 60 分钟，并且需要多次来回 |
| **代码量** | 大约 500 到 800 行，因为 AI 倾向于压缩代码 |

**你可能遇到的问题**:

1. **代码被截断**：AI 响应有长度限制，所以生成可能中途停止
2. **功能不完整**：对话系统可能只是基础版本，没有任务系统
3. **缺少细节**：音频系统可能只保留为 TODO 注释
4. **难以调试**：如果代码有问题，你必须在同一次对话中请 AI 修复，且上下文会越来越混乱

#### 测试计划 B：智能体 Teams 方法

这是本文介绍的方法：让多个 AI 团队成员协作开发。

**在 Claude Code 中输入此内容**（启用 智能体 Teams 后）:

```
I want to build a Pokemon-style web RPG game.

Create a team to collaborate on development:

Team member responsibilities:
- Teammate A (Game Architect): design the overall architecture, define the game state machine, and plan the data structures
- Teammate B (Battle System): implement turn-based combat logic, the skill system, and damage calculation
- Teammate C (Dialogue System): implement NPC dialogue, the quest system, and story scripts
- Teammate D (Map Rendering): use Canvas to implement 2D map rendering, character movement, and scene transitions
- Teammate E (UI & Audio): design the game interface, battle UI, and sound playback

Technical requirements:
- Use plain HTML/CSS/JavaScript
- Use Canvas to render the game screen
- Turn-based battle system
- Save data with localStorage
- Use the Web Audio API for sound

Use Sonnet for each member, and Opus for the Team Lead.

First ask the architect to design the overall solution. After the data structures are defined, let the other members develop in parallel.
```

**预期结果**：

| 项目 | 预期情况 |
|------|---------|
| **代码质量** | 每个成员专注于自己的领域，因此代码更加专业和完整 |
| **功能完整性** | 所有功能实现得更加全面，包括任务系统和多场景地图 |
| **可运行性** | 成员之间交叉检查接口，因此集成问题较少 |
| **开发时间** | 因为开发是并行进行的，所以完成所有功能大约需要1到2小时 |
| **代码量** | 大约2000行，代码是完整实现而不是压缩的 |

#### 定量对照表

| 维度 | 单次提示 | 代理团队 |
|---------|-------------|-------------|
| **总代码行数** | 500-800行 | 2000行 |
| **开发时间** | 30-60分钟，但功能不完整 | 1-2小时，功能完整 |
| **功能完整度** | 60-70% | 95% |
| **可维护性** | 中等，通常是一个大文件 | 高，采用模块化设计 |
| **错误数量** | 较高，因为验证较少 | 较低，因为成员相互校验 |
| **未来可扩展性** | 困难，因为代码耦合紧密 | 容易，因为结构是模块化的 |
| **词元使用量** | 约50K tokens | 约200K tokens（5名成员） |
| **成本** | 约$0.50 | 约$2.00 |

#### 建议的真实测试流程

**步骤1：先测试单次提示方法**

```
1. Open a new Claude Code conversation
2. Use the prompt from "Test Plan A" above
3. Record: how long did it take? How many lines of code were produced? Which features were missing?
```

**步骤 2：然后测试代理团队的方法**

```
1. Confirm that Agent Teams has been enabled
2. Use the prompt from "Test Plan B" above
3. Observe: how do team members collaborate? Is the code more complete?
```

**步骤 3：比较这两个结果**

```
1. Run both versions of the code separately
2. Compare the feature lists: which features are missing in the single-prompt version?
3. Compare the code structure: is the Agent Teams version more modular?
4. Evaluate: if you wanted to continue developing this game, which version would be easier to extend?
```

#### 为什么会发生这些差异？

**单次提示方法的局限性**：

1. **上下文压力**：AI必须在一次回应中处理所有内容，因此简化是不可避免的
2. **注意力分散**：战斗、对话、地图和界面都在争夺注意力，所以细节容易被忽略
3. **没有协作验证**：没有人检查接口是否匹配，因此更可能出现漏洞

**智能体 团队的优势**：

1. **专业化分工**：每个成员专注于一个领域，可以深入处理细节
2. **并行处理**：战斗、对话和地图开发同时进行，提高效率
3. **互相验证**：成员之间协商接口，减少集成问题
4. **独立上下文**：每个成员都有自己的20万字上下文，不会相互干扰

#### 结论

智能体 团队的核心价值不仅仅在于“更快”，而在于 **“更完整、更专业。”**

- 对于像贪吃蛇这样的简单项目，单次提示就足够
- 对于像宝可梦RPG这样的复杂项目，智能体 团队能够产出更好的结果

关键在于 **选择正确的工具**：不要用智能体团队去重命名一个变量，也不要用单次提示去制作完整的RPG游戏。

---

## 最佳实践

智能体 团队是一个强大的工具，但要充分利用它，你需要了解一些最佳实践。这些经验教训来自社区的真实案例，可以帮助你避免常见陷阱，同时最大化团队协作的价值。

### 实践1：合同优先

在多个智能体开始并行工作之前，花时间定义一个清晰的“合同”，即接口协议。

**为什么重要**：

假设队友A负责后端API，队友B负责前端集成。如果他们同时开始工作而没有先就接口格式达成一致，可能会发生如下情况：

```
Teammate A: implemented POST /api/login and expects {username, password}
Teammate B: implemented the frontend call and sends {user, pass}
Result: they do not match, and rework is required
```

**如何操作**：

在启动团队之前，先请Claude设计界面：

```
Do not start development yet. First help me design the interfaces for the user authentication system:

1. The request and response formats for the login interface
2. The request and response formats for the registration interface
3. The password reset flow and interfaces
4. The error-handling conventions

Write these interfaces down clearly, and only then let the team begin development.
```

**合同应包括**：

- 函数签名和数据结构
- 输入和输出 JSON 格式
- HTTP 状态码的含义
- 错误处理约定
- 字段验证规则

### 练习 2：明智地分配模型

不同的任务需要不同的模型。合理的模型分配有助于平衡质量和成本。

**为团队负责人使用 Opus**：

团队负责人负责任务分解和结果综合，这需要较强的推理能力，因此推荐使用 Opus：

```
Create a team where the Team Lead uses Opus for overall planning and final review.
The Teammates use Sonnet for implementation work.
```

**为队友使用 Sonnet**：

对于具体的编码和测试工作，Sonnet 完全可以胜任，且成本显著更低：

- Opus 4.6：每百万输出标记约 15 美元  
- Sonnet 4.5：每百万输出标记约 3 美元  

为成员使用 Sonnet 可以显著降低整体成本。

**特殊情况下使用 Haiku**：

对于诸如文档更新或小型测试编写任务等简单任务，可以考虑使用 Haiku，每百万输出标记约 0.80 美元。

### 练习 3：控制任务粒度

任务过大或过小都会影响效率。你需要找到合适的粒度。

**经验法则**：

每个任务应该是一个成员可以独立完成的，**15 到 30 分钟**。

**任务过大**：

```
Bad: implement the user authentication system
```

这个任务太宽泛了。它包含几个子任务，一个人需要很长时间才能完成，这会浪费并行性的优势。

**任务太小**：

```
Bad: create an empty file called auth.js
```

这个任务太小了。成员花在协调上的时间比实际工作更多。

**适当的粒度**：

```
Good: implement the login API, including:
1. The POST /api/login endpoint
2. Username and password validation
3. JWT token response
4. Error handling
```

这个任务有明确的边界和交付物。一个人可以独立完成，而且它不会过于零散。

**推荐设置**：

让每个成员负责 **5 到 6 个中等规模的任务**。这可以提供足够的并行性，同时不会使协调成本过高。

### 练习 4：避免文件冲突

多个成员同时修改同一个文件是代理团队中最常见的问题。

**分配原则**：

尽量让不同成员负责 **不同的文件**：

```
Good:
- Teammate A: owns all files under src/auth/
- Teammate B: owns all files under src/api/
- Teammate C: owns all files under tests/auth/

Bad:
- Teammate A and Teammate B both modify src/app.js
```

**如果必须修改同一个文件**：

设计一个串行编辑阶段：

```
Phase 1 (parallel):
- Teammate A: analyze what functionality needs to be added to auth.js
- Teammate B: design the new feature interface
- Teammate C: write the test cases

Phase 2 (serial):
- Team Lead synthesizes all inputs
- One member modifies auth.js in a single integrated pass
```

### 练习 5：提供丰富的初始上下文

当队友开始时，他们的对话历史是空的。他们不知道团队负责人和用户之前讨论了什么。

**错误的方法**：

```
Create the team and let the members start working.
```

成员们一开始会感到迷茫：这是一个什么项目？它使用了什么技术栈？他们究竟应该构建什么？

**正确的方法**：

```
This is a React + Node.js e-commerce project using TypeScript.

The project structure is:
- src/frontend/: React frontend code
- src/backend/: Node.js backend code
- prisma/: database models

Code style:
- Use function components and Hooks
- Use Express.js on the backend
- Use PostgreSQL for the database

Now create a team and have the members add user authentication under src/auth/.
```

只有在有足够的上下文时，成员才能高效工作。

### 练习 6：在实施前进行研究

不要让成员立即开始编码。请他们先研究并设计解决方案。

**两阶段过程**：

**阶段 1：研究与设计**

```
Create a team. In phase one, do research:
- One member investigates existing authentication approaches (JWT vs Session)
- One member analyzes the project's tech stack and determines best practices
- One member designs the database schema

After the research is complete, let the members discuss through the messaging system and settle on a final plan.
```

**阶段 2：实施**

```
After the plan is finalized, begin implementation:
- One member implements the backend authentication logic
- One member implements the frontend login page
- One member writes tests
```

以这种方式做的好处是你可以**及早发现架构不匹配**，而不是在实施过程中半途才意识到计划不可行。

### 实践 7：积极监控和干预

即使你配置了自动化，也仍然应该积极监控团队的工作状态。

**使用分屏模式**：

如果你配置了 tmux 窗格，你可以实时看到所有成员的输出：

```
┌─────────────────┬─────────────────┐
│  Teammate 1     │  Teammate 2     │
│  Analyzing code │  Implementing   │
│  ...            │  API...         │
│                 │                 │
│  Wait, this     │                 │
│  approach seems │                 │
│  wrong...       │                 │
└─────────────────┴─────────────────┘
```

当你注意到某个成员走错方向时，你可以快速干预：

```
@Teammate1 Stop for a moment. Your analysis is headed in the wrong direction. The authentication module should be under src/auth/, not src/user/.
```

**定期检查任务状态**：

使用 TaskList 命令检查所有任务的状态：

```
/tasks
```

这显示了所有任务状态，因此您可以查看哪些已完成、哪些仍在运行以及哪些被阻塞。

---

## 适用场景

智能体 Teams 功能强大，但并非每个任务都适合使用它。了解合适的场景有助于您做出正确选择。

### 智能体 Teams 适合的场景

**复杂系统重构**

当重构涉及多个具有明确边界的模块时：

```
Scenario: split a monolithic application into microservices

Create a team:
- Teammate A: analyze dependencies in the user module
- Teammate B: analyze dependencies in the order module
- Teammate C: analyze dependencies in the payment module
- Teammate D: design the inter-service communication protocol
```

这些模块可以同时进行分析，最终结果可以在之后合成，这比按顺序分析它们要快得多。

**多角度代码审查**

当你需要从多个维度审查代码时：

```
Scenario: conduct a full security review of the payment module

Create a team:
- Teammate A: focus on security vulnerabilities (SQL injection, XSS, etc.)
- Teammate B: inspect performance issues (N+1 queries, memory leaks, etc.)
- Teammate C: verify completeness of error handling
- Teammate D: evaluate test coverage
```

每个成员专注于一个维度，使评审更深入，最终报告更完整。

**前端和后端的并行开发**

当你需要同时构建前端和后端时：

```
Scenario: build a user management feature

Create a team:
- Teammate A (frontend): implement the user list page
- Teammate B (frontend): implement the user edit page
- Teammate C (backend): implement the CRUD API
- Teammate D (coordination): design the API contract and make sure frontend and backend stay aligned
```

前端和后端可以并行进行，只要首先定义了 API 合同，并遵循合同优先原则。

**竞争调试**

当你有多个可能的解决方案时：

```
Scenario: fix a complex bug with two possible repair strategies

Create a team:
- Teammate A: implement solution 1
- Teammate B: implement solution 2
- Teammate C: evaluate the pros and cons of both
```

两种解决方案都可以并行实现和测试，然后可以选择更好的一个。

**文档生成**

当你需要产生大量文档时：

```
Scenario: write documentation for the whole project

Create a team:
- Teammate A: write API documentation
- Teammate B: write the deployment guide
- Teammate C: write the development guide
- Teammate D: write the troubleshooting manual
```

可以同时编写多个文档，大大提高效率。

### 智能体 Teams 不适用的场景

**简单的修改任务**

```
Not suitable: variable renaming, single bug fixes, tiny feature additions
```

对于这些任务，组建团队的成本大于实际工作量。

**高度连续的任务**

```
Not suitable: tasks that must happen strictly in sequence
```

如果任务B必须等任务A完成后才能开始，那么实际上没有并行的空间。

**对成本敏感的任务**

代理团队消耗的代币是单实例的**2到4倍**，具体取决于团队规模。如果成本是主要考虑因素，单实例可能是更好的选择。

### 决策流程图

```
Are there multiple independent subtasks?
    │
    ├─ No → Use a single instance
    │
    └─ Yes →
         │
         Can the subtasks be assigned to different files?
         │
         ├─ No → Consider serial execution or split the task further
         │
         └─ Yes →
              │
              Is the cost acceptable (2-4x)?
              │
              ├─ No → Use a single instance
              │
              └─ Yes → Use Agent Teams ✓
```

---

## 成本与性能

使用代理团队会增加成本，但也能带来显著的效率提升。理解这种权衡有助于您做出明智的决策。

### 成本分析

**令牌消耗与团队规模**

代理团队的令牌消耗大致与团队规模呈**线性**关系：

| 团队规模 | 相对成本 | 适用场景 |
|---------|---------|---------|
| 1 人（单实例） | 1 倍 | 简单任务 |
| 2 人团队 | 2-2.5 倍 | 中等复杂度 |
| 3 人团队 | 3-4 倍 | 复杂任务 |
| 5 人团队 | 5-6 倍 | 大型项目 |

**为什么不是完全线性**：

- **启动成本**：每个成员在启动时都必须接收初始上下文
- **协作成本**：通过消息系统在成员之间交流也会消耗令牌
- **团队领导成本**：团队领导通常使用 Opus，成本更高

**具体示例数字**（Claude 4.5 Sonnet）：

- 输入：每百万令牌 $3
- 输出：每百万令牌 $15

假设一个任务需要：
- 团队领导（Opus）：50K 输入  20K 输出 ≈ $2.25
- 3 个队员（Sonnet）：每人 30K 输入 15K 输出 ≈ $2.7 × 3 = $8.1
- **总计**：约 $10.35

同样的任务在单个 Sonnet 实例上：
- 100K 输入 50K 输出 ≈ $1.05

**成本倍数**：约 10 倍

**但节省时间**：可能从 3 小时减少到 1 小时

### 效率提升

**Anthropic 内部测试数据**：

- 大型项目重构：效率提升约 **50%**
- 并行多模块开发：效率提升约 **60-70%**
- 文档生成任务：效率提升约 **80%**

**实际案例**：

Anthropic 的工程团队曾使用 **16 个并行代理** 在约 2 周内构建了一个 C 编译器，可编译 Linux 6.9 内核、约 10 万行 Rust 代码，并通过了 99% 的 GCC 测试。

### 成本优化策略

**策略 1：混合模型**

```
Team Lead: Opus (strong reasoning needed)
Teammates: Sonnet (high value for cost)
Simple tasks: Haiku (cheapest)
```

**策略 2：动态调整团队规模**

```
Analysis phase: 5-person team (multi-angle analysis)
Implementation phase: 3-person team (parallel coding)
Testing phase: 2-person team (testing and fixing)
```

**策略三：仅在特定阶段使用代理团队**

不要在整个项目中使用代理团队。仅在最复杂的阶段使用它：

```
Phase 1 (requirements analysis): single instance
Phase 2 (architecture design): Agent Teams (multiple plans explored in parallel)
Phase 3 (coding): single instance
Phase 4 (code review): Agent Teams (multi-angle review)
Phase 5 (documentation): Agent Teams (parallel writing)
```

### 什么时候值得使用

**值得使用的情况**：

- 项目时间紧迫，效率提升的价值超过了令牌成本
- 任务高度复杂，单次执行可能会遗漏细节
- 需要多角度分析和验证

**不值得使用的情况**：

- 任务简单，启动团队的额外开销太大
- 成本非常敏感且令牌预算有限
- 任务高度线性，没有并行空间

---

## 常见问题解答

### Q1：智能体 Teams 是否稳定？可以在生产环境中使用吗？

智能体 Teams 目前是**实验性功能**，因此可能仍存在漏洞和不稳定行为。建议：

- 先备份重要项目
- 从小项目开始，以测试和熟悉功能
- 关注官方发布说明，查看新版本改进
- 问题出现时及时向官方团队反馈

### Q2：最多可以创建多少成员？

理论上没有硬性限制，但从实际角度：

- 小型项目：2 到 3 人
- 中型项目：3 到 5 人
- 大型项目：5 到 10 人

成员过多会引发以下问题：

- 协调开销急剧增加
- 令牌使用量线性增长
- 文件冲突概率上升
- 监控和管理难度加大

### Q3：团队成员可以看到彼此的上下文吗？

**不可以**。每个成员都有完全独立的上下文窗口。他们通过消息系统进行沟通，而不是直接共享上下文。

这是一个刻意的设计选择，其好处包括：

- 一名成员的推理不会被其他成员的推理干扰
- 上下文不会因对话过长而变得混乱
- 更接近真实团队的运作，每个人都有自己的思路

### Q4：如何在不同成员之间切换？

如果未配置分屏模式，可以使用快捷键：

- `Shift+Up`：切换到上一位成员
- `Shift+Down`：切换到下一位成员
- `Ctrl+O`：返回团队负责人

### Q5：如果任务失败怎么办？

如果某成员的任务失败：

1. 阅读该成员的输出日志，检查失败原因
2. 如有需要，可将任务重新分配给其他成员
3. 手动介入，直接帮助解决问题

### Q6：可以在过程中添加或移除成员吗？

可以。你可以随时向团队负责人发出命令：

```
Add a new member and let it handle XXX.
```

```
Let Teammate 3 leave the team after finishing the current task.
```

### 问题7：代理团队可以与MCP和技能一起使用吗？

当然可以。实际上，它们一起使用效果更好：

- **代理团队 + 技能**：每个成员可以拥有不同的技能
- **代理团队 + MCP**：不同成员可以通过不同的MCP服务器访问外部资源

```
Create a team:
- Teammate A: carries the frontend-design Skill and is responsible for UI
- Teammate B: accesses the repository through GitHub MCP and handles PR management
- Teammate C: queries data through Database MCP and handles analysis
```

---

## 参考文献

### 官方资源

- [官方 Claude 代码文档]（https://docs.anthropic.com/en/docs/claude-code） - 完整的 Claude 代码文档
- [人类工程博客]（https://www.anthropic.com/engineering）- 官方技术博客及更新

### 特工团队教程合集

**中文完整指南**：

- [Claude Code 智能体 Teams 完整指南：从入门到实践]（https://m.blog.csdn.net/u010634066/article/details/157903022） - 包含配置细节、实操示例，以及16个并行代理构建C编译器的引人注目案例
- [与 Claude Code 智能体 Team 的协作开发：完整实践指南]（https://m.blog.csdn.net/u010028049/article/details/158126612） - 完整的协作项目工作流程
- [Claude Code 智能体 Teams的搭建和使用步骤指南]（https://cloud.tencent.com/developer/article/2630088） - 腾讯云教程，附有详细的设置说明

**开始实践**：

- [原生 Claude Code 代理团队的实际操作：从启用到运营三人团队]（https://www.cnblogs.com/147api/p/19606317） - 三人团队攻略
- [Claude Code 智能体 Teams的新手练习]（https://m.toutiao.com/article/7606744384960266793/）- 适合初学者的入门，包含如合同优先的最佳实践
- [不再单打独斗：让7个Claudes协助你同时与智能体 Teams一起开发]（https://m.toutiao.com/a7605229732241736202/）- 7人团队案例研究

**最佳实践**：

- [代理团队最佳实践：合同优先、任务细分性和模型分配]（https://blog.csdn.net/sinat_37574187/article/details/144727588）- 详细解释7项最佳实践
- [一位拥有七年大科技经验的Claude代码现场手册：从初学者到专家的八条规则]（https://new.qq.com/rain/a/20260111A02HE900）- 企业级真实世界经验

**原则与比较**：

- [Claude Code 代理团队：多代理协作的正确方法]（https://post.m.smzdm.com/p/adoezrmz/）- 多代理协作的深入分析
- [Claude Code 多智能体团队开发：从原则到陷阱的完整指南]（https://m.toutiao.com/a7605229732241736202/）- 现实使用的原则与陷阱

### 官方指南翻译

- [Claude 正式发布了“特工构建指南”（含 PDF 下载）]（https://m.blog.csdn.net/sinat_37574187/article/details/144724124）- 官方特工构建指南
- [Claude官方《构建有效代理指南》完整翻译版]（https://m.blog.csdn.net/gyn_enyaer/article/details/144827922）- 完整中文翻译

### 相关技术

- [代理技能标准]（https://agentskills.io/） - 技能生态系统
- [skills.sh - 特工技能应用商店]（https://skills.sh/） - 7万技能库