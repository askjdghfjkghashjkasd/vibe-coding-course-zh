# API 设计原则：前端-后端通信协议

::: tip 🎯 核心问题
**前端和后端如何高效沟通？** 这就像是在问：餐厅应该如何设计菜单，让客人一目了然？服务员应该如何接单才能不出错？菜品应该如何端上桌以让顾客满意？API 设计解决了“沟通规则”的问题。
:::

---

## 0. 首先，一个问题：你是否经历过这些噩梦

**场景 1：API 命名不一致**

```
GET /getUserData
GET /fetchUserInfo
GET /queryUserById
GET /users/query
```

四个端点，相同的功能，命名风格完全不同。新员工感到困惑：我应该使用哪一个？

**场景 2：错误处理不一致**

```json
// Some return HTTP status codes
HTTP/1.1 404 Not Found

// Some return 200 + code
HTTP/1.1 200 OK
{ "code": 404, "message": "User not found" }

// Some just throw exceptions
HTTP/1.1 200 OK
{ "error": "Something went wrong" }
```

前端不知道如何判断请求是否成功。

**场景 3：响应结构不一致**

```json
// Endpoint A
{ "data": { ... } }

// Endpoint B
{ "result": { ... } }

// Endpoint C
{ "content": { ... } }
```

每个端点返回的格式不同，前端需要单独处理每个端点。

---

**良好的API设计就像餐厅的点餐系统**——清晰的菜单、标准化流程和信息丰富的错误信息。

---

## 1.API 概述

**API**（应用程序编程接口）就是“程序间通信协议”。

### 1.1 餐厅比喻

|餐厅角色 |对应概念 |描述 |
|:--- |:--- |:--- |
|菜单 |API 文档 |告诉你有哪些“菜肴”可选 |
|服务员 |HTTP协议 |一种标准化的“通信方式” |
|厨房 |服务器 |根据“订单”处理请求 |
|提供食物 |响应 |返回结果给“客人” |

### 1.2 完整的API请求

👇 **试试看**：点击下方按钮，查看完整的API请求-响应流程：

<ApiRequestDemo />

---

## 2.API设计理念：RPC / REST / GraphQL / gRPC

在深入具体的RESTful设计之前，让我们先了解四种主要的API设计风格：

<ApiStyleCompare />

### 2.1 REST 与 RESTful：有什么区别

许多人混淆了这两个概念：

|概念 |含义 |描述 |
|:--- |:--- |:--- |
|**休息** |一种建筑风格 |罗伊·菲尔丁提出的设计理念，由一组约束组成 |
|**RESTful** |符合 REST 风格 |一个形容词，表示 API 设计遵循 REST 原则 |

**类比**：
- REST 就像“极简主义”——一种设计理念
- RESTful API 就像“极简主义房间”——这一理念的具体实现

**六个REST约束**：

|约束 |描述 |
|:--- |:--- |
|**客户端-服务器分离**前端和后端独立开发，接口解耦 |
|**无状态** |每个请求包含所有必要信息;服务器不保存会话状态 |
|**可缓存** |响应应说明是否可缓存，从而提升性能 |
|**统一接口** |使用标准HTTP方法和状态码 |
|**分层系统** |客户端不需要知道他们连接的是哪一层服务器 |
|**按需代码**（可选）|服务器可以扩展客户端功能 |

::: 提示 💡 为什么REST最受欢迎？
1. **低学习曲线**：HTTP协议本身体现了REST原则
2. **成熟的生态系统**：丰富的工具、框架和文档
3. **高度多样性**：任何语言、任何平台都可以称之为
4. **易于缓存**：GET请求自然可缓存，支持CDN
:::

---

## 3.RESTful 设计：让网址相互传达

**REST**（表示状态转移）是一种具有核心原则的建筑风格：

- 网络上的抽象事物，称为“资源”
- 使用URL来识别资源
- 使用 HTTP 方法操作资源

### 3.1 仓库类比

|仓库概念 |REST 对应 |示例 |
|:--- |:--- |:--- |
|书架地址 |网址 |`/users`， `/orders` |
|操作方法 |HTTP 方法 |GET（视图），POST（加法） |
|商品 |资源 |用户数据，订单数据 |

**关键原则**：URL是名词，不是动词。

### 3.2 URL设计规则

|规则 |错误示例 |正确示例 |描述 |
|:--- |:--- |:--- |:--- |
|使用名词，而非动词 |`/getUsers` |`/users` |URL 表示资源，HTTP 方法表示操作 |
|使用复数形式 |`/user` |`/users` |统一复数风格 |
|小写连字符 |`/UserProfiles` |`/user-profiles` |URL区分大小写 |
|避免深度筑巢 |`/a/b/c/d/e` |`/a/b/c` |最多3层 |
|使用查询参数进行筛选 |`/products/phone/5000` |`/products?cat=phone` |使用 `?` 参数进行筛选 |

::: 提示💡网址区分大小写
使用小写连字符（-）是最安全的做法，避免大小写混淆和不一致的下划线样式。
:::

### 3.3 HTTP 方法选择

|方法 |目的 |幂零 |安全 |典型场景 |
|:--- |:--- |:--- |:--- |:--- |
|**获取** |检索资源 |是的 |是的 |查询列表，查看详情 |
|**发帖** |创建资源 |不 |不 |添加用户，提交订单 |
|**PUT** |完整更新 |是的 |不 |替换整个用户配置文件 |
|**补丁** |部分更新 |不 |不 |只需修改昵称 |
|**删除** |删除资源 |是的 |不 |删除用户，取消订单 |

::: 提示 💡 什么是幂等性？
**幂等性**：多次执行结果相同。

- **幂零操作**（GET/PUT/DELETE）：点击10次与点击一次结果相同
- **非幂等操作**（POST）：点击10次可能生成10个命令

**解决方案**：使用唯一ID进行POST操作以防止重复处理。
:::

---

## 4.状态代码：出错“沟通”

HTTP 状态码是服务器告诉客户端“发生了什么”的标准方式。

### 4.1 状态代码分类

|类别 |含义 |典型状态代码 |
|:--- |:--- |:--- |
|**2xx** |成功 |200 正常，201 创建，204 无内容 |
|**3xx** |重定向 |301永久移动，304 未修改 |
|**4xx** |客户端错误 |400 错误请求，401 未授权，404 未找到 |
|**5xx** |服务器错误 |500 内部错误，503 服务不可用 |

### 4.2 通用状态码演示

👇 **试用一下**：点击下方按钮了解常见状态代码：

<StatusCodeDemo />

---

## 5.错误处理：优雅的“拒绝”

良好的错误处理让客户端“从状态码中理解发生了什么”，而不是盲目猜测。

### 4.1 错误处理“陷阱指南”

**陷阱1：所有错误返还200**

```json
// ❌ Bad practice
HTTP/1.1 200 OK
{ "error": "Something went wrong" }
```

问题：缓存层会缓存这个“成功”的响应，而监控系统不会检测到该问题。

**陷阱2：错误信息太模糊**

```json
// ❌ Bad practice
HTTP/1.1 400 Bad Request
{ "message": "Invalid parameters" }
```

问题：客户不知道哪个参数有误，也不知道原因。

**陷阱 3：暴露敏感信息**

```json
// ❌ Dangerous practice
HTTP/1.1 500 Internal Server Error
{ "stack": "at UserService.login...", "sql": "SELECT * FROM..." }
```

危险：暴露代码结构和数据库查询，攻击者可能利用。

### 5.2 正确错误处理演示

👇 **试试看**：比较“好”和“坏”的错误响应设计：

<ErrorHandlingDemo />

---

## 6.版本管理：API“向后兼容”

### 6.1 版本控制的动机

场景：你的应用有100万用户，你需要修改订单端点。

**未进行版本调整**：
- 新应用调用新端点→运行良好
- 旧应用调用新端点→缺失字段，崩溃！

**正确的方法**：
- `/v1/orders` - 旧端点，继续提供旧应用
- `/v2/orders` - 新端点，新功能请见此处

### 6.2 版本控制策略

|策略 |示例 |优点 |缺点 |
|:--- |:--- |:--- |:--- |
|**URL路径** |`/v1/users` |直观，可缓存 |更长的URL|
|**请求头** |`Accept: vnd.api.v2+json` |干净的网址 |更难调试 |
|**查询参数** |`/users?version=2` |简单 |较不标准 |

### 6.3 版本演化示例

以用户端点为例，展示了v1到v2的演进：

|端点 |v1（旧）|v2（新）|变更描述 |
|:--- |:--- |:--- |:--- |
|**获取用户** |`GET /v1/users`<br>返回：`name, email` | `GET /v2/users`<br>返回：`name, email, avatar, phone` |新增头像和电话字段 |
|**创建订单** |`POST /v1/orders`<br>接受：`items[]` | `POST /v2/orders`接受<br>：`items[], coupons[]` |新增优惠券支持|
|**批处理操作**无 |`POST /v2/orders/batch` |新增批处理创建端点 |

::: 提示 💡 版本管理最佳实践
- **保持向后兼容性**：至少保留v1端点6-12个月，以便为客户提供升级时间
- **同步更新文档**：每个版本应有自己的API文档
- **弃用通知**：提前宣布v1何时退役并引导迁移
- **监控使用情况**：跟踪v1通话量，确认在停止服务前安全可退出
:::

---

## 7.响应结构设计

响应结构是前端-后端协作的“数据契约”。统一格式显著降低通信成本。

<ResponseStructureDemo />

### 7.1 行业最佳实践

::: 详细内容 Google API 设计指南
参见[Google API设计指南]（https://cloud.google.com/apis/design/errors）。谷歌要求所有API错误响应包含`google.rpc.Status`消息结构：

```json
{
  "error": {
    "code": 429,
    "message": "Resource exhausted, please try again later",
    "status": "RESOURCE_EXHAUSTED",
    "details": [
      {
        "@type": "type.googleapis.com/google.rpc.ErrorInfo",
        "reason": "RESOURCE_AVAILABILITY",
        "domain": "compute.googleapis.com",
        "metadata": {
          "zone": "us-east1-a",
          "service": "compute"
        }
      }
    ]
  }
}
```

**核心要求**：
- 必须包括 `ErrorInfo` 提供机器可读的错误标识符
- `message` 面向开发者，用简明的语言描述问题和解决方案
- `details` 数组可以包括 `LocalizedMessage`、`Help`（帮助链接）等
:::

::: 详细信息 Microsoft REST API 指南
参考 [Microsoft REST API 指南](https://github.com/microsoft/api-guidelines/blob/vNext/Guidelines.md)。Microsoft 强调响应一致性：

**错误与故障分类**：
- **错误（Error）**：客户端发送了无效数据，返回 4xx，不影响 API 可用性
- **故障（Fault）**：服务器无法正确响应有效请求，返回 5xx，影响 API 可用性

**响应头标准**：
- `Date`：必须返回，使用 RFC 5322 格式（GMT 时区）
- `Content-Type`：必须返回
- `ETag`：对于支持乐观并发控制的资源必须返回
:::

::: 详细信息 阿里巴巴 Java 开发手册
参考 [阿里巴巴 Java 开发手册](https://developer.aliyun.com/special/tech-java)。阿里巴巴有以下 API 响应标准：

**统一返回对象**：
```java
public class Result<T> {
    private Integer code;
    private String message;
    private T data;
    private String requestId;
}
```

**错误代码分段设计**：
| 范围 | 类型 | 示例 |
| :--- | :--- | :--- |
| 0 | 成功 | 0 |
| 1xxxx | 参数错误 | 10001 缺少必填参数 |
| 2xxxx | 业务错误 | 20001 余额不足 |
| 3xxxx | 认证错误 | 30001 未登录 |
| 5xxxx | 系统错误 | 50001 数据库异常 |
:::

::: details Stripe API 响应设计
参考 [Stripe API 文档](https://docs.stripe.com/api/errors)。Stripe 的错误响应设计非常精细：

```json
{
  "error": {
    "type": "card_error",
    "code": "card_declined",
    "message": "Your card was declined.",
    "param": "number",
    "decline_code": "insufficient_funds",
    "doc_url": "https://stripe.com/docs/error-codes/card-declined"
  }
}
```

**设计亮点**：
- `type` 区分错误类型：`api_error`、`card_error`、`invalid_request_error`
- `param` 确定具体哪个参数有错误，前端可以直接定位表单字段
- `doc_url` 提供开发者学习更多的文档链接
- `decline_code` 提供更细粒度的错误原因
:::

::: 详情 JSON:API 规范
参考 [JSON:API 规范](https://jsonapi.org/format/)，这是业界广泛采用的 JSON API 响应规范：

```json
{
  "data": {
    "type": "articles",
    "id": "1",
    "attributes": {
      "title": "JSON:API Specification Explained"
    },
    "relationships": {
      "author": {
        "data": { "type": "users", "id": "9" }
      }
    }
  },
  "included": [
    {
      "type": "users",
      "id": "9",
      "attributes": {
        "name": "John Doe"
      }
    }
  ]
}
```

**核心设计**：
- `data` 包含主要资源，必须有 `type` 和 `id`
- `attributes` 存储资源属性
- `relationships` 描述资源关联
- `included` 通过一次返回相关数据来避免重复请求
:::

::: 详细信息 GitHub REST API 响应设计
参考 [GitHub REST API 文档](https://docs.github.com/en/rest)。GitHub 的响应设计强调开发者体验：

**成功响应**：```json
{
  "id": 1296269,
  "node_id": "MDEwOlJlcG9zaXRvcnkxMjk2MjY5",
  "name": "Hello-World",
  "full_name": "octocat/Hello-World",
  "owner": {
    "login": "octocat",
    "id": 1,
    "avatar_url": "https://github.com/images/error/octocat_happy.gif"
  },
  "private": false,
  "html_url": "https://github.com/octocat/Hello-World"
}
```

**错误响应**:```json
{
  "message": "Bad credentials",
  "documentation_url": "https://docs.github.com/rest"
}
```

**设计亮点**：
- 响应包含多种 URL 格式（`html_url`, `url`）以应对不同场景
- 错误响应包含 `documentation_url` 指向文档
- 使用 `Link` 响应头进行分页导航
:::

::: 详细信息 Twitter/X API v2 响应设计
请参阅 [Twitter API v2 文档](https://developer.twitter.com/en/docs/twitter-api)。Twitter API v2 使用简明的响应格式：

```json
{
  "data": {
    "id": "1460323737035677698",
    "text": "Hello, Twitter!"
  },
  "includes": {
    "users": [
      {
        "id": "2244994945",
        "name": "Twitter Dev",
        "username": "TwitterDev"
      }
    ]
  }
}
```

**设计亮点**：
- `data` 包含主要数据，`includes` 包含相关数据（类似于 JSON:API）
- 支持字段选择：`?tweet.fields=created_at,public_metrics`
- 分页使用 `next_token` 和 `previous_token`
:::

### 7.2 最佳实践总结

结合上述规范，响应结构设计应遵循以下原则：

1. **一致性优先**：所有端点使用相同的响应结构；前端可以构建统一的请求层
2. **机器可读**：错误代码和错误原因允许程序自动处理错误
3. **人性化**：清晰的消息描述，包括解决建议
4. **可追踪**：request_id 覆盖整个请求链，便于问题定位
5. **支持国际化**：通过 details 扩展本地化消息

### 7.3 数据字段设计标准

`data` 是响应的核心，其设计直接影响前端开发效率。

<DataFieldDesignDemo />

### 7.4 高级错误响应设计

<ErrorResponseDesignDemo />

::: tip 参考资料
- [Google API 设计指南 - 错误](https://cloud.google.com/apis/design/errors)
- [Microsoft REST API 指南](https://github.com/microsoft/api-guidelines)
- [阿里巴巴 Java 开发手册](https://developer.aliyun.com/special/tech-java)
- [Heroku HTTP API 设计指南](https://github.com/interagent/http-api-design)
- [Stripe API - 错误](https://docs.stripe.com/api/errors)
- [JSON:API 规范](https://jsonapi.org/format/)
:::

---

## 8. 实践：电商系统 API 设计示例

```
# User Module
GET    /v1/users                    # Get user list
POST   /v1/users                    # Create new user
GET    /v1/users/{id}               # Get user details
PUT    /v1/users/{id}               # Full update user
PATCH  /v1/users/{id}               # Partial update user
DELETE /v1/users/{id}               # Delete user

# Order Module
GET    /v1/users/{id}/orders        # Get orders for a user
POST   /v1/orders                   # Create order
GET    /v1/orders/{id}              # Get order details
PATCH  /v1/orders/{id}/status       # Update order status

# Product Module (use query params for complex filtering)
GET    /v1/products?category=phone&price_max=5000&sort=price_desc&page=1
```

---

## 9. 使用 AI 辅助 API 设计

AI 可以帮助您快速生成符合规范的 API 设计。关键是提供清晰的上下文和约束。

### 9.1 提示模板

```
You are a senior backend architect, proficient in RESTful API design. Please help me design a set of API endpoints.

## Business Background
[Describe your business scenario, e.g., e-commerce system, blog platform, task management, etc.]

## Functional Requirements
[List the required functional modules, e.g.:
- User management: registration, login, personal information
- Order management: create order, query orders, cancel order
- Product management: product list, product details, search]

## Design Requirements
1. Follow RESTful conventions
2. URLs use plural nouns, lowercase + hyphens
3. Use HTTP methods correctly (GET/POST/PUT/PATCH/DELETE)
4. Unified response format: { code, message, data, request_id }
5. Appropriate status code usage
6. Versioning: URL path approach (/v1/)

## Output Format
Please output in the following format:

### Endpoint List
| Method | URL | Description | Request Body | Response Body |
|--------|-----|-------------|--------------|---------------|

### Request/Response Examples
[Detailed examples for key endpoints]

### Status Code Descriptions
[Status codes used and their meanings]
```

### 9.2 实际示例：电子商务订单API

**输入提示：**

```
You are a senior backend architect, proficient in RESTful API design. Please help me design a set of API endpoints for an e-commerce order system.

## Business Background
A B2C e-commerce platform where users can browse products, place orders, and view order status.

## Functional Requirements
- Order module: create order, query order list, query order details, cancel order, pay order
- Cart module: add product, modify quantity, remove product, view cart

## Design Requirements
1. Follow RESTful conventions
2. URLs use plural nouns, lowercase + hyphens
3. Use HTTP methods correctly
4. Unified response format
5. Versioning: /v1/
```

**AI 输出示例：**

| 方法 | URL | 描述 |
| :--- | :--- | :--- |
| `POST` | `/v1/orders` | 创建订单 |
| `GET` | `/v1/orders` | 查询订单列表 |
| `GET` | `/v1/orders/{id}` | 查询订单详情 |
| `PATCH` | `/v1/orders/{id}/status` | 更新订单状态（取消/支付） |
| `GET` | `/v1/users/{id}/cart` | 获取购物车 |
| `POST` | `/v1/users/{id}/cart/items` | 添加商品到购物车 |
| `PATCH` | `/v1/users/{id}/cart/items/{itemId}` | 修改购物车商品数量 |
| `DELETE` | `/v1/users/{id}/cart/items/{itemId}` | 删除购物车商品 |

### 9.3 AI 辅助设计注意事项

| 注意事项 | 描述 |
| :--- | :--- |
| **提供完整上下文** | 应明确说明业务背景、用户角色及数据关系 |
| **清晰定义约束条件** | 命名规范、版本策略及响应格式应提前定义 |
| **迭代与优化** | 初次输出可能不完美；可提出后续问题并请求修改 |
| **人工审核** | AI 生成内容需要人工核对，确保符合业务需求 |
| **覆盖边缘案例** | 可要求 AI 考虑错误处理、权限控制、分页等边缘情况 |

::: tip 💡 后续问题技巧
- “请为每个接口添加错误响应示例”
- “请考虑分页、排序和过滤参数”
- “请为接口添加权限控制描述”
- “请检查是否符合 RESTful 最佳实践”
:::

---

## 术语表

| 术语 | 英文 | 解释 |
| :--- | :--- | :--- |
| **API** | Application Programming Interface | 程序间通讯的约定 |
| **REST** | Representational State Transfer | 一种使用 URL 标识资源的架构风格 |
| **资源** | Resource | REST 架构的核心概念，具有唯一标识（URL） |
| **幂等性** | Idempotency | 多次执行结果相同 |
| **状态码** | Status Code | HTTP 协议定义的响应状态 |
| **版本控制** | Versioning | 允许旧接口和新接口共存，实现平滑升级 |
| **请求体** | Request Body | POST/PUT/PATCH 请求携带的数据 |
| **响应体** | Response Body | 服务器返回的数据 |
| **头信息** | Header | 请求/响应的元数据（如 Content-Type） |
| **身份验证** | Authentication | 验证“你是谁”（登录、令牌） |
| **授权** | Authorization | 验证“你可以做什么”（权限） |