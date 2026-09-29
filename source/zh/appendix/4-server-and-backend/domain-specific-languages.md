# 专用领域语言（DSL）原则

::: tip 介绍
在一个现实案例中，工程师Armin在他的新公司使用AI构建了一套基础设施服务，总计约40,000行代码（Go   YAML   Pulumi   SDK胶水代码），其中超过90%是由AI生成的。这个案例涉及许多初学者不熟悉的术语：YAML、Pulumi、HCL、Lua、SDK胶水代码……它们既不是Python也不是JavaScript，但在后端项目中无处不在。本文将从统一视角系统地介绍这些技术——**专用领域语言（DSL）**。
:::

**学习目标**

在后端开发中，除了用通用编程语言（Python、Go、Java等）编写的业务逻辑外，还有许多具有**不同用途、不同语法，但不属于通用编程语言**的文件和代码。它们共享一个共同的概念：**DSL（专用领域语言）**。

阅读本文后，你将能够：

- 理解DSL与通用编程语言（GPL）的本质区别
- 掌握DSL分类系统：数据序列化格式、嵌入式脚本语言、基础设施定义语言
- 区分XML、JSON、YAML、TOML、CSV、Protobuf等数据格式的适用场景
- 理解嵌入式脚本语言（如Lua）的设计目的
- 解释Terraform（HCL）与Pulumi的原理及差异
- 理解OpenAPI规范和SDK自动生成的工作原理
- 判断哪些类型的代码适合由AI生成

| 章节 | 主题 | 核心概念 |
|-----|------|---------|
| **第1章** | DSL概览 | DSL与GPL的定义、分类系统及全景 |
| **第2章** | 数据序列化格式 | XML、JSON、YAML、TOML、CSV、Protobuf等 |
| **第3章** | 嵌入式脚本语言 | Lua及类似语言的设计理念和典型应用 |
| **第4章** | 基础设施即代码 | Terraform（HCL）与Pulumi的原理与对比 |
| **第5章** | 胶水代码与SDK生成 | OpenAPI规范与客户端代码自动生成 |
| **第6章** | AI与DSL | AI为何特别擅长生成DSL代码 |

---

## 1. DSL概览：通用语言之外的另一个世界

### 1.1 DSL概述

**DSL（专用领域语言）**是为特定领域或特定任务设计的语言。相比之下，**GPL（通用编程语言）**，如Python、Java、Go、C  等，是为解决任意计算问题而设计的。

核心区别：

| 维度 | GPL（通用编程语言） | DSL（专用领域语言） |
|------|-------------------|-------------------|
| **设计目标** | 解决任意计算问题 | 解决特定领域中的问题 |
| **表达范围** | 图灵完备，理论上可计算任何问题 | 通常刻意限制表达范围 |
| **学习成本** | 较高，需要理解整个语言体系 | 较低，只需理解领域概念 |
| **典型示例** | Python、Java、Go、C  、JavaScript | SQL、HTML/CSS、正则表达式、YAML、HCL |

实际上，你一直都在使用DSL：

- **SQL** 是数据库查询领域的 DSL —— 你使用 `SELECT * FROM users WHERE age > 18` 来查询数据，而不是手动在 Python 中编写遍历逻辑
- **HTML/CSS** 是用于网页结构和样式的 DSL —— 你使用标签和属性来描述页面，而不是在 C 中操作像素
- **正则表达式** 是用于文本模式匹配的 DSL —— 你使用 `\d{3}-\d{4}` 来匹配电话号码，而不是手工编写字符比较循环

### 1.2 DSL 分类

基于“是否图灵完备”，DSL 可以分为两大类：

**外部 DSL**

具有独立的语法和解析器，不依赖于任何通用编程语言。用户编写的代码由专用的解释器或编译器处理。

- 纯数据描述型：JSON、YAML、XML、TOML、CSV、Protobuf（不包含任何逻辑）
- 查询/操作型：SQL、GraphQL、正则表达式（逻辑能力有限）
- 域建模型：HCL（Terraform）、Dockerfile、Nginx 配置语法（声明性描述特定域的状态）

**内部 DSL（嵌入式 DSL）**

寄生在通用编程语言中，使用宿主语言的语法构建领域特定表达式。代码本身是有效的宿主语言代码，但读起来像专用语言。

- Pulumi（用 TypeScript/Python/Go 编写，但 API 设计读起来像声明式配置）
- Ruby on Rails 路由定义（`get '/users', to: 'users#index'` —— 有效 Ruby 代码，但读起来像配置）
- 测试框架断言语法（`expect(value).toBe(42)` —— 有效 JavaScript，但读起来像自然语言）

### 1.3 后端项目中的 DSL 生态

在典型的后端项目中，你会遇到以下类别的 DSL：

```
DSLs in Backend Projects
├── Data Serialization Formats (describe data structures)
│   ├── Text formats: JSON, YAML, XML, TOML, CSV, INI
│   └── Binary formats: Protobuf, MessagePack, Avro, BSON
├── Embedded Scripting Languages (programmable configuration layer)
│   ├── Lua (game engines, Nginx, Redis)
│   ├── GDScript (Godot engine)
│   └── Jsonnet (configuration template generation)
├── Infrastructure and Ops DSLs (declaratively describe system state)
│   ├── HCL (Terraform)
│   ├── Dockerfile / Docker Compose YAML
│   └── Nginx / Apache configuration syntax
└── Interface Description Languages (describe API contracts)
    ├── OpenAPI / Swagger
    ├── Protocol Buffers (.proto files)
    └── GraphQL Schema
```

考虑到这个背景，以下章节将逐一展开每个分支。

---

## 2. 数据序列化格式：以文本描述结构化数据

### 2.1 数据序列化概述

**序列化**是将内存中的数据结构（对象、字典、数组等）转换为可存储或可传输的文本/字节流的过程。相反的过程——从文本/字节流恢复内存中的数据结构——称为**反序列化**。

数据序列化格式是 DSL 中最基本的类别——它们是纯数据描述的外部 DSL，没有逻辑能力，仅负责静态描述“值是什么”。

### 2.2 需要这些格式的动机

假设你开发了一个后端服务，其数据库地址为 `localhost:5432`。如果在源代码中硬编码这个地址，本地开发可以正常，但在部署到生产环境时，数据库地址变为 `db.prod.company.com:5432`，你就需要修改源代码并重新编译。

标准工程实践是：**将可变参数与代码分离，存储在独立的配置文件中。** 程序在启动时读取配置文件，并根据其中的值决定其行为。

除了配置之外，数据序列化格式还被广泛用于：系统间数据交换（API 请求/响应）、数据持久化存储、跨语言通信等。

### 2.3 可读文本格式

以下是工程中最常见的文本序列化格式，按时间顺序介绍。

**INI**

最早的配置格式，起源于 Windows 系统。结构简单，由节（section）和键值对（key-value）组成：

```ini
[database]
host = localhost
port = 5432

[server]
debug = true
```

优点是可读性强。限制是无法支持嵌套结构或数组类型，导致无法表达复杂配置。目前主要出现在遗留系统和一些 Linux 配置中（例如 `php.ini`、`my.cnf`）。

**CSV**

**CSV（逗号分隔值）** 是最简单的表格数据格式：

```csv
name,age,city
Alice,30,Beijing
Bob,25,Shanghai
```

每一行都是一条记录，字段之间用逗号分隔。CSV 广泛用于数据导入/导出、电子表格交换和数据分析管道。它的局限性在于只能表达平面的二维表，不支持嵌套结构，而且没有类型信息（所有值都是字符串）。

**XML**

**XML（可扩展标记语言）**诞生于1998年，曾经是数据交换的主流标准：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<config>
  <database>
    <host>localhost</host>
    <port>5432</port>
  </database>
  <server>
    <debug>true</debug>
    <allowed_origins>
      <origin>https://example.com</origin>
      <origin>https://app.example.com</origin>
    </allowed_origins>
  </server>
</config>
```

XML 具有非常强的表达能力，支持嵌套、属性、命名空间、模式验证以及其他高级功能。但它的语法冗长——大量的开始/结束标签导致信噪比低，手工编写和阅读的体验较差。

XML 仍然广泛用于：
- Java 生态系统（Maven 的 `pom.xml`、Spring 配置、Android 布局文件）
- 企业 Web 服务（SOAP 协议）
- 办公文档格式（`.docx`、`.xlsx` 本质上是 ZIP 压缩的 XML 文件集合）
- RSS/Atom 订阅源、SVG 矢量图形

**JSON**

**JSON（JavaScript 对象表示法）**诞生于 2001 年，由于其简单性，迅速取代 XML 成为 Web API 数据交换的事实标准：

```json
{
  "database": {
    "host": "localhost",
    "port": 5432
  },
  "server": {
    "debug": true
  }
}
```

它的优点是结构清晰，并且几乎在所有编程语言中都原生支持解析。主要缺点是**不支持注释**，而且在手动编写时，众多的括号和引号容易出错。JSON 也是前端项目配置的标准格式 (`package.json`, `tsconfig.json`)。

**YAML**

**YAML（YAML 不是标记语言）** 也诞生于 2001 年，目前是后端和 DevOps 世界中使用最广泛的配置格式。Docker Compose、Kubernetes、GitHub Actions 等工具都使用 YAML：

```yaml
# Database configuration
database:
  host: localhost
  port: 5432

# Server configuration
server:
  debug: true
  allowed_origins:
    - https://example.com
    - https://app.example.com
```

优点包括支持注释、语法简洁，以及能够表达复杂的嵌套结构。缺点是它**依赖缩进来表示层级**——缩进错误会导致解析失败，这是初学者最常遇到的问题。

> 注意：YAML 的全称“YAML Ain't Markup Language”是一个递归首字母缩略词。

**TOML**

**TOML (Tom 的明显最小语言)**诞生于2013年，并被 Rust 的包管理器 Cargo 和 Python 的`pyproject.toml`采用：

```toml
[database]
host = "localhost"
port = 5432

[server]
debug = true
allowed_origins = [
  "https://example.com",
  "https://app.example.com"
]
```

TOML 尝试将 INI 的简单性与 YAML 的表达能力结合，同时避免缩进敏感性问题。

### 2.4 二进制序列化格式

上述格式都是人类可读的文本。对于对性能和大小有更高要求的场景，也存在 **二进制序列化格式**——它们牺牲可读性以换取更小的体积和更快的解析速度。

| 格式 | 开发者 | 特点 | 典型使用场景 |
|------|-------|------|------------|
| **Protocol Buffers (Protobuf)** | 谷歌 | 需要预定义的 `.proto` 模式文件，强类型，体积极小 | gRPC 通信、谷歌内部服务、高性能微服务 |
| **MessagePack** | 社区 | 类 JSON 格式的二进制版本，不需要模式 | Redis 内部编码、跨语言高性能通信 |
| **Avro** | Apache | 支持模式演进，适用于大数据场景 | Hadoop/Kafka 生态系统数据序列化 |
| **BSON** | MongoDB | JSON 的二进制扩展，支持更多数据类型 | MongoDB 数据库内部存储格式 |

以 Protocol Buffers 为例，你需要先定义模式：

```protobuf
// user.proto
syntax = "proto3";

message User {
  string name = 1;
  int32 age = 2;
  string email = 3;
}
```

然后编译器（`protoc`）会自动生成各种语言的序列化/反序列化代码。这种“先定义Schema，再生成代码”的模式与后来引入的OpenAPI SDK生成方法一致。

### 2.5 完整对比

|格式 |类型 |出生年份 |可读性 |支持评论 |典型用例 |
|------|------|---------|--------|---------|------------|
|**INI** |文本 |1980年代 |高档 |是的 |系统配置，遗留项目 |
|**CSV** |文本 |1972 |高 |无 |数据导入/导出，电子表格交换 |
|**XML** |文本 |1998年 |Medium |是的 |Java 生态系统，企业 Web 服务，文档格式 |
|**JSON** |文本 |2001 |高 |否 |Web API 数据交换，前端配置 |
|**YAML** |文本 |2001 |高 |是的 |Docker，K8s，持续集成 / 持续部署，后端服务配置 |
|**TOML** |文本 |2013 |高 |是的 |Rust/Python 项目配置 |
|**原始buf* |二进制 |2008 |无 |— |gRPC，高性能微服务通信 |
|**消息包** |二进制 |2008 |无 |— |高性能跨语言交流 |
|**Avro** |二进制 |2009 |无 |— |Hadoop/Kafka 大数据管道 |
|**BSON** |二进制 |2009 |无 |— |MongoDB 内部存储 |

**关键总结**：所有这些格式的基本功能都是相同的——**将结构化数据转换为可存储、可传输的形式**。文本格式优先考虑人类的可读性和编辑便利性;二进制格式优先考虑解析性能和传输大小。选择哪种格式取决于具体场景所需的权衡。


---

## 3.嵌入式脚本语言：可编程配置层

### 3.1 概念定义

Python、JavaScript、Go 等类似语言是通用编程语言（GPL），可以独立运行并构建完整的应用程序。

相比之下，还有另一类语言 **专门设计用于嵌入其他主机程序**，为主机程序提供可编程扩展能力。这些被称为**嵌入式脚本语言**。

他们解决的核心问题是：**当静态配置文件（YAML/JSON）缺乏足够的表达性和条件逻辑、循环及其他逻辑时，如何在不修改主机程序源代码的情况下实现动态行为。**

### 3.2 Lua：最具代表性的嵌入式脚本语言

Lua（葡萄牙语意为“月亮”）是一种极其轻量级的脚本语言;整个解释器编译后仅有几百KB。其设计目标不是独立运行，而是作为可嵌入的扩展层。

典型的Lua应用场景：

- **游戏引擎**：魔兽世界的插件系统和Roblox的游戏脚本都使用Lua。游戏引擎以C/C实现核心渲染和物理计算，同时将频繁变化的部分如关卡逻辑和NPC对话委托给Lua脚本。这样设计师可以在不重新编译引擎的情况下修改游戏内容。

- **Web 服务器**：OpenResty 将 Lua 嵌入 Nginx，使运维人员能够使用 Lua 脚本实现请求过滤、速率限制、认证等逻辑，而无需修改 Nginx 的 C 源代码。

- **数据库**：Redis 支持向服务器发送 Lua 脚本执行，用于实现需要原子性保证的复合操作（如“读后写”）。

这是一个嵌入在 Nginx（OpenResty）中的 Lua 脚本示例：

```lua
-- Function: Token authentication for /api/secret path
local uri = ngx.var.uri
local token = ngx.req.get_headers()["Authorization"]

if uri == "/api/secret" and token ~= "Bearer my-secret-token" then
    ngx.status = 403
    ngx.say("Access denied")
    return ngx.exit(403)
end
```

### 3.3 其他嵌入式脚本语言

| 语言 | 主机环境 | 典型用途 |
|------|---------|---------|
| **Lua** | 游戏引擎, Nginx (OpenResty), Redis | 游戏逻辑, 网关策略, 缓存操作 |
| **VimScript / Lua** | Vim / Neovim 编辑器 | 编辑器插件开发 |
| **Emacs Lisp** | Emacs 编辑器 | 编辑器行为定制 |
| **GDScript** | Godot 游戏引擎 | 游戏逻辑脚本 |
| **Jsonnet** | Kubernetes 生态系统 / 配置生成工具 | 基于模板生成大量类似的 JSON/YAML 配置 |

**关键点**: 嵌入式脚本语言处于 DSL 分类中**内部 DSL 与外部 DSL 的边界**——它们是独立的语言（有自己的语法和解释器），但设计目标是嵌入主程序而非独立构建应用程序。它们填补了“静态配置文件”（纯数据描述 DSL）与“通用编程语言”（GPL）之间的空白：当配置需要表达逻辑（条件分支、循环、函数调用）时，嵌入轻量级脚本语言是标准的工程解决方案。


---

## 4. 基础设施即代码

### 4.1 什么是“基础设施” 

在后端工程中，“基础设施”指应用运行所依赖的底层资源：

- 计算资源：服务器（虚拟机或容器）
- 数据存储：数据库实例、对象存储桶
- 网络：防火墙规则、负载均衡器、DNS 配置
- 中间件：消息队列、缓存集群

在云计算时代，这些资源通过云服务提供商（AWS、阿里云、腾讯云）的控制台以图形界面方式创建和管理。

### 4.2 手动管理的局限性

通过控制台的手动操作对于小规模项目可行，但随着项目规模增长，会出现以下问题：

1. **不可重复**：操作没有记录，无法精确复现相同环境
2. **不可审计**：无法追踪“谁在什么时候修改了哪些配置”
3. **不可协作**：操作无法纳入版本控制或代码评审
4. **易出错**：生产环境中的手动操作存在错误风险

**基础设施即代码（IaC）**的核心理念：**使用代码声明式定义基础设施资源，使其具备版本控制、自动执行和可重复部署能力。**

### 4.3 Terraform

Terraform 是最广泛使用的 IaC 工具，由 HashiCorp 开发。它使用专用的 **HCL（HashiCorp 配置语言）**。

Terraform 采用**声明式**范式：用户描述期望的最终状态，Terraform 自动计算从当前状态到目标状态所需的操作。

```hcl
# Define a cloud server
resource "aws_instance" "my_server" {
  ami           = "ami-0c55b159cbfafe1f0"  # OS image
  instance_type = "t3.micro"               # Instance type

  tags = {
    Name = "my-first-server"
  }
}

# Define a PostgreSQL database instance
resource "aws_db_instance" "my_database" {
  engine         = "postgres"
  instance_class = "db.t3.micro"
  username       = "admin"
  password       = "please-use-secrets-manager"
}
```

执行流程：

```bash
terraform plan    # Preview the changes to be made
terraform apply   # Confirm and execute, automatically creating resources on the cloud platform
```

### 4.4 Pulumi

Pulumi 提供了一种不同的方法：**直接使用通用编程语言（TypeScript、Python、Go 等）来定义基础设施**，而不是学习专用的 HCL 语法。

使用 Pulumi TypeScript 表示的相同服务器定义：

```typescript
import * as aws from "@pulumi/aws";

const server = new aws.ec2.Instance("my-server", {
    ami: "ami-0c55b159cbfafe1f0",
    instanceType: "t3.micro",
    tags: { Name: "my-first-server" },
});

const bucket = new aws.s3.Bucket("my-bucket", {
    acl: "private",
});

export const serverIp = server.publicIp;
```

由于它使用通用编程语言，开发人员可以利用语言特性，如循环、条件分支和函数抽象，来处理复杂的基础设施逻辑。

### 4.5 Terraform 与 Pulumi 对比

| 维度 | Terraform | Pulumi |
|------|-----------|--------|
| **语言** | HCL（专用语言） | TypeScript / Python / Go 以及其他通用语言 |
| **学习成本** | 需要学习 HCL 语法 | 使用已掌握的编程语言，学习成本低 |
| **社区生态** | 很成熟，几乎覆盖所有云提供商 | 快速增长，但规模比 Terraform 小 |
| **使用场景** | 运维团队主导的标准化基础设施管理 | 开发者主导、需要复杂逻辑的项目 |
| **AI 代码生成适配度** | 高（固定模式） | 非常高（本质上是通用语言代码） |

**关键要点**：IaC 工具中的 HCL 是典型的外部 DSL——它具有独立的语法和解析器，专门用于声明式描述基础设施状态。Pulumi 采用内部 DSL 策略——使用通用编程语言语法来表达领域特定概念。二者的目标相同（将基础设施管理从手动操作转变为代码驱动），但路径不同（专用语言 vs 通用语言）。代码可以放入 Git 版本控制，经过团队审查，并可自动执行和回滚。


---

## 5. Glue Code 与 SDK 自动生成

### 5.1 什么是 Glue Code

在软件工程中，**Glue Code（胶水代码）**指的是本身不包含业务逻辑，仅用于连接两个系统或模块的代码。

典型 glue code 包括：

- 前端调用后端 API 时编写的 HTTP 请求代码（URL 构建、头部设置、响应解析）
- 后端服务 A 调用服务 B 接口时编写的 HTTP 客户端代码
- 不同编程语言之间的接口适配代码

这种代码的特点是：**高度重复、模式固定，但不可或缺。**

### 5.2 OpenAPI 规范与代码自动生成

由于 glue code 具有高度模式化的特点，工程界的解决方案是：**先用标准格式描述 API 接口，然后使用工具自动生成客户端代码。**

**OpenAPI 规范**（前称 Swagger）是描述 REST API 的行业标准。它使用 YAML 或 JSON 格式精确地定义 API 路径、参数、请求体和响应结构：

```yaml
openapi: 3.0.0
info:
  title: Email Service API
  version: 1.0.0

paths:
  /emails:
    post:
      summary: Send email
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                to:
                  type: string
                  example: "user@example.com"
                subject:
                  type: string
                body:
                  type: string
      responses:
        '200':
          description: Sent successfully
```

基于该规范文件，像 `openapi-generator` 这样的工具可以自动生成多种语言的客户端 SDK：

- **Python**：`client.emails.send(to="user@example.com", subject="Hi", body="Hello")`
- **TypeScript**： `client.emails.send({ to: "user@example.com", subject: "Hi", body: "Hello" })`
- **加油**：`client.Emails.Send(ctx, &SendEmailRequest{To: "user@example.com", ...})`

生成的SDK封装了所有HTTP请求细节;调用者无需关心URL路径、请求方法、序列化格式或其他底层实现细节。

### 5.2 重审阿尔敏案

回到本文开头的案例，我们现在可以准确理解每个组成部分：

|组成部分 |自然 |描述 |
|---------|------|------|
|**Go** |业务逻辑代码 |电子邮件服务的核心功能实现 |
|**YAML** |配置文件 |服务配置、持续集成 / 持续部署流水线定义、OpenAPI规范文件 |
|**Pulumi** |基础设施代码 |使用 Go/TypeScript 定义云资源（服务器、数据库、网络） |
|**SDK 胶合代码** |自动生成客户端库 |从 OpenAPI 规范自动生成的 Python 和 TypeScript SDK |

YAML配置、Pulumi资源定义和SDK粘合代码都是高度基于模式且有明确规范约束的代码——这正是AI代码生成最擅长的领域。因此，“4万行代码中有90%由AI生成”是完全合理的。


---

## 6.人工智能与数字数字语言

### 6.1 AI代码生成适用性分析

|特征维度 |适合生成 |不适合 |
|---------|-------------|---------------|
|**图案等级** |高度重复，模板固定 |需要创意设计，无需遵循先例 |
|**规范约束** |有明确的模式或语法规范 |模糊的需求，边界不明确 |
|**上下文依赖性** |局部自洽的个体定义不依赖于全局理解 |需要理解整个系统的架构意图 |
|**可验证性** |可由工具自动验证（例如，`terraform validate`） |只能依赖人类对设计合理性的判断 |

本文介绍的四类技术——配置文件、嵌入式脚本、IaC代码和SDK粘合代码——都与左列相同的特征相同。这解释了为什么AI在这些领域的代码生成效率远优于业务逻辑代码。

### 6.2 评估框架

在判断一段代码是否适合AI生成时，你可以参考以下三个标准：

1. **有现有规范或方案吗？** — 如果有，则对AI友好
2. **是大量重复模式吗？** — 如果是，则对AI友好
3. **生成的结果能否被工具自动验证？** — 如果可以，则对AI友好

满足这三个条件的代码（如从OpenAPI规范生成SDK，或用Terraform批量定义同质资源）可以高度依赖AI生成。而不满足任何条件的代码（如设计新的分布式一致性协议）仍需工程师自行完成。

---

## 7.术语表

| 术语 | 全称 | 定义 |
|------|------------|------|
| **DSL** | 特定领域语言 | 为特定领域设计的语言，与通用编程语言相对 |
| **GPL** | 通用编程语言 | 可以解决任意计算问题的编程语言，例如 Python、Java、Go |
| **External DSL** | 外部 DSL | 拥有独立语法和解析器的特定领域语言，例如 SQL、HCL、YAML |
| **Internal DSL** | 内部 DSL / 嵌入式 DSL | 使用宿主语言语法构建的特定领域表达式，寄生在通用编程语言中，例如 Pulumi |
| **Data Serialization** | 数据序列化 | 将内存中的数据结构转换为可存储或可传输格式的过程 |
| **INI** | 初始化 | 最早的键值配置格式，起源于 Windows 系统 |
| **CSV** | 逗号分隔值 | 一种以逗号分隔字段的纯文本表格格式 |
| **XML** | 可扩展标记语言 | 一种基于标签的文本数据格式，表达能力强，但语法冗长 |
| **JSON** | JavaScript 对象表示法 | 一种轻量级的键值型数据交换格式，Web API 的事实标准 |
| **YAML** | YAML 不是标记语言 | 一种基于缩进的配置文件格式，广泛用于后端和 DevOps |
| **TOML** | Tom 的显而易见的最小语言 | 一种语法明确的配置格式，在 Rust 和 Python 生态中常用 |
| **Protobuf** | 协议缓冲 | 谷歌开发的二进制序列化格式，需要预定义 Schema，体积小、速度快 |
| **MessagePack** | — | 类似 JSON 的二进制序列化格式，无需 Schema |
| **Lua** | — | 轻量级嵌入式脚本语言，常用于游戏引擎、Web 服务器和数据库扩展 |
| **IaC** | 基础设施即代码 | 通过编码定义和管理云计算资源的工程实践 |
| **Terraform** | — | HashiCorp 开发的 IaC 工具，使用 HCL 声明式语言 |
| **HCL** | HashiCorp 配置语言 | Terraform 使用的专用配置语言 |
| **Pulumi** | — | 支持通用编程语言的 IaC 工具 |
| **OpenAPI** | — | 描述 REST API 接口的行业标准规范（前身为 Swagger） |
| **SDK** | 软件开发工具包 | 封装了 API 调用细节的客户端库 |
| **Glue Code** | 粘合代码 | 无业务逻辑的适配代码，仅用于连接两个系统 |

---

## 总结

后端工程中存在大量无业务逻辑的代码，它们共享一个共同的概念：**DSL（特定领域语言）**——为特定领域设计的语言，与通用编程语言相对。

本文介绍的 DSL 可以分为四类：

1. **数据序列化格式**（XML / JSON / YAML / TOML / CSV / Protobuf 等）——纯数据描述的外部 DSL，将结构化数据转换为可存储、可传输的形式
2. **嵌入式脚本语言**（Lua 等）——介于配置语言和通用语言之间，为宿主程序提供可编程的扩展能力
3. **基础设施定义语言**（HCL / Dockerfile 等）——描述期望系统状态的声明式外部 DSL；Pulumi 通过内部 DSL 实现同样的目标
4. **接口描述语言与胶水代码生成**（OpenAPI / .proto）——通过规范描述自动生成系统间连接代码

理解 DSL 分类框架可以让你快速识别后端项目中“看起来不像代码的代码”的性质：它属于哪一类 DSL，解决了什么领域问题，以及为什么不使用通用编程语言编写。

同时，由于 DSL 代码具有高度模式化、规范驱动和可自动验证的特性，它也是当前 AI 代码生成技术最有效的应用领域。