# 序列化原理：数据转换

::: tip 核心问题
**数据如何在网络中传输？** 这就像在问：一个人的话语如何被另一人理解？序列化解决了“数据转换”的问题——将内存中的对象转换为可传输的格式。
:::

---

## 数据序列化的必要性

在前端与后端交互过程中，数据会经历多次“转换”，以便从服务器传递到客户端。

**场景 1：前端收到的数据已经“改变”**

```javascript
// Backend sends
Date birth = new Date(1990, 5, 15)

// Frontend receives
{ "birth": "1990-06-15T00:00:00Z" }  // A string!
```

前端尝试使用 `.getFullYear()` 并发生错误——因为这不是一个 Date 对象，而是一个字符串。

**场景 2：中文乱码**

```json
// Expected
{ "name": "Zhang San" }

// Actually received
{ "name": "å¼ ä¸" }
```

字符编码问题会导致中文字符变成乱码。

**场景 3：性能瓶颈**

```json
// A response containing 10,000 product listings
{
  "products": [
    { "id": 1, "name": "...", "description": "...", ... },
    // ... 9999 more
  ]
}
// Size: 5.2 MB, transfer time: 3.5 seconds
```

JSON 格式的冗余导致数据包过大，严重影响性能。

---

**序列化就像“翻译”**——将内存中的对象“翻译”成可传输的格式，接收方再将其“翻译”回来。

---

## 1. 序列化和反序列化概述

**序列化**是将对象转换为可传输格式的过程。

**反序列化**是将传输格式转换回对象的过程。

### 1.1 包裹投递类比

| 包裹投递 | 序列化 | 描述 |
| :--- | :--- | :--- |
| 打包物品 | 序列化 | 将物品装箱，并贴上标签 |
| 运输 | 网络传输 | 运输车将包裹送到目的地 |
| 打开取出 | 反序列化 | 收件人打开箱子，取出物品 |

### 1.2 需要序列化的动机

| 原因 | 描述 | 示例 |
| :--- | :--- | :--- |
| **网络传输** | 网络只能传输字节流 | API 调用，RPC 通信 |
| **持久化存储** | 磁盘只能存储字节 | 将对象保存到文件、数据库 |
| **跨语言** | 不同语言有不同的数据结构 | Java 对象 → Python 字典 |
| **分布式缓存** | Redis/Memcached 存储字节 | 缓存用户信息 |

---

## 2. 常见的序列化格式

**试一试**：点击下面按钮，观察不同语言的序列化过程：

<SerializationDemo />

### 2.1 JSON：最通用的

**优点**：
- 可读性好，易于调试
- 所有语言均支持
- 浏览器原生支持 (`JSON.parse` / `JSON.stringify`)

**缺点**：
- 文件体积大（大量 `{}` `""` 标记）
- 不支持丰富数据类型（Date、Map、Set 被转换为字符串）

**使用场景**：
- 公共 API
- 前后端通信
- 配置文件

### 2.2 XML：过去的主流

```xml
<?xml version="1.0" encoding="UTF-8"?>
<user>
  <id>123</id>
  <name>Zhang San</name>
  <email>zhangsan@example.com</email>
  <age>28</age>
</user>
```

**优点**：
- 结构清晰，支持注释
- 支持复杂的嵌套结构
- 具有模式验证（XSD）

**缺点**：
- 体积大，解析慢
- 标签冗余（`<open></close>`）

**使用场景**：
- 配置文件（Spring、MyBatis）
- SOAP 协议
- 复杂数据交换

### 2.3 Protobuf：最高效的

```protobuf
// user.proto
syntax = "proto3";
message User {
  int32 id = 1;
  string name = 2;
  string email = 3;
  int32 age = 4;
}
```

**优点**：
- 体积小（比 JSON 小 30-50%）
- 速度快（解析速度快 5-10 倍）
- 向后兼容（添加字段不会影响旧版本）

**缺点**：
- 不可读（二进制格式）
- 需要 .proto 文件定义
- 不支持动态类型

**使用场景**：
- 微服务内部通信
- 高性能场景（游戏、实时通信）
- 移动应用（节省带宽）

### 2.4 MessagePack：在可读性和性能之间的平衡

```json
// MessagePack is a binary version of JSON
// Same data, MessagePack is about 30% smaller than JSON
```

**优势**：
- 比 JSON 更小，比 JSON 更快
- 保持 JSON 的数据模型
- 支持所有 JSON 类型

**劣势**：
- 不可人类可读
- 不如 Protobuf 高效

**使用场景**：
- 需要性能但不想使用 Protobuf
- Redis 缓存
- WebSocket 消息

---

## 3. 按语言划分的序列化方法

| 语言 | JSON 库 | Protobuf 库 | XML 库 |
| :--- | :--- | :--- | :--- |
| **JavaScript** | `JSON.stringify()` | `protobuf.js` | `fast-xml-parser` |
| **Python** | `json.dumps()` | `protobuf` | `xmltodict` |
| **Java** | `Jackson` / `Gson` | `protobuf-java` | `JAXB` |
| **Go** | `encoding/json` | `proto` | `encoding/xml` |
| **C** | `nlohmann/json` | `protobuf` | `tinyxml2` |
| **C#** | `System.Text.Json` | `Google.Protobuf` | `System.Xml` |

::: tip 选择建议
- **前后端通信**：JSON（易于调试）
- **微服务内部**：Protobuf（性能最佳）
- **配置文件**：JSON 或 YAML
- **遗留系统集成**：XML（可能别无选择）
:::

---

## 4. 性能比较

### 4.1 大小比较（以用户对象为例）

| 格式 | 大小 | 相对于 JSON |
| :--- | :--- | :--- |
| JSON | 68 字节 | 100% |
| XML | 142 字节 | 209% |
| Protobuf | 38 字节 | 56% |
| MessagePack | 52 字节 | 76% |

### 4.2 速度比较（序列化 10,000 次）

| 格式 | 时间 | 相对于 JSON |
| :--- | :--- | :--- |
| JSON | 45 毫秒 | 100% |
| XML | 120 毫秒 | 267% |
| Protobuf | 8 毫秒 | 18% |
| MessagePack | 28 毫秒 | 62% |

::: tip 性能测试结论
- **Protobuf 最快**：适用于高性能场景
- **MessagePack 第二**：比 JSON 快约 40%
- **JSON 最慢**：但足以应对大多数场景
:::

---

## 5. 常见问题

### 5.1 日期序列化问题

**问题**：日期对象序列化后变为字符串

```javascript
// Before serialization
const date = new Date('2024-01-01')

// After serialization
JSON.stringify(date)  // "2024-01-01T00:00:00.000Z"
```

**解决方案**：```javascript
// Option 1: Convert to timestamp
{ createdAt: date.getTime() }  // 1704067200000

// Option 2: Convert to ISO string
{ createdAt: date.toISOString() }  // "2024-01-01T00:00:00.000Z"

// Option 3: Custom serialization
JSON.stringify(obj, (key, value) => {
  if (value instanceof Date) {
    return { __type: 'Date', value: value.toISOString() }
  }
  return value
})
```

### 5.2 循环引用问题

**问题**：对象中的循环引用会导致错误

```javascript
const obj = { name: 'test' }
obj.self = obj
JSON.stringify(obj)  // TypeError: Converting circular structure to JSON
```

**解决方案**：```javascript
// Option 1: Filter out circular references
const seen = new WeakSet()
JSON.stringify(obj, (key, value) => {
  if (typeof value === 'object' && value !== null) {
    if (seen.has(value)) return
    seen.add(value)
  }
  return value
})

// Option 2: Use the flatted library
import { parse, stringify } from 'flatted'
stringify(obj)  // Automatically handles circular references
```

### 5.3 中文乱码问题

**问题**：序列化后中文字符出现乱码

**原因**：
- 字符编码不匹配（UTF-8 对 GBK）
- BOM 标记

**解决方案**：```python
# Python: Ensure UTF-8
import json
json.dumps(data, ensure_ascii=False)  # Don't escape Chinese characters
```

```javascript
// Node.js: Set response header
res.setHeader('Content-Type', 'application/json; charset=utf-8')
```

---

## 6. 实践：电子商务系统序列化方案

### 6.1 场景分析

| 场景 | 格式选择 | 依据 |
| :--- | :--- | :--- |
| **应用 → 后端 API** | JSON | 调试方便，前后端统一 |
| **后端 → 后端 RPC** | Protobuf | 性能最佳，节省带宽 |
| **缓存到 Redis** | MessagePack | 比 JSON 更小，能序列化复杂对象 |
| **日志记录** | JSON | 日志分析工具易于解析 |

### 6.2 代码示例

```javascript
// API response (JSON)
app.get('/api/products/:id', async (req, res) => {
  const product = await db.getProduct(req.params.id)
  res.json({
    code: 0,
    data: product
  })
})

// Microservice communication (Protobuf)
// product.proto
syntax = "proto3";
message Product {
  int32 id = 1;
  string name = 2;
  int32 price = 3;
}

// Server side
const proto = require('./product.proto')
const message = proto.Product.create(product)
const buffer = proto.Product.encode(message).finish()

// Client side
const decoded = proto.Product.decode(buffer)

// Redis cache (MessagePack)
const msgpack = require('msgpack-lite')
await redis.set(
  `product:${id}`,
  msgpack.encode(product)
)
const cached = msgpack.decode(await redis.get(`product:${id}`))
```

---

## 7. 使用人工智能帮助选择序列化解决方案

人工智能可以根据您的场景帮助您选择合适的序列化格式。

### 7.1 提示模板

```
You are a senior system architect, proficient in data serialization technology. Please help me choose an appropriate serialization solution.

## Business Scenario
[Describe your scenario, e.g.: e-commerce app, game backend, microservices, etc.]

## Technical Requirements
[List constraints, e.g.:
- Frontend-backend separation (Vue + Node.js)
- High performance requirements (QPS > 10000)
- Bandwidth sensitive (mobile, need to save data)
- Cross-language needed (Java + Python + Go)]

## Data Characteristics
[Describe data features, e.g.:
- Large data volume (single response > 1MB)
- Complex structure (deeply nested)
- Contains dates, binary data, and other special types]

## Output Format
Please output in the following format:
1. Recommended solution (JSON/Protobuf/MessagePack/XML)
2. Rationale
3. Performance comparison (estimated size and speed)
4. Code examples
```

### 7.2 实践示例

**输入提示**：

```
You are a senior system architect. Our e-commerce app needs to optimize the product list API performance.

## Business Scenario
- E-commerce app product list API
- Returns 100 products per request
- Each product contains: id, name, price, image, description, and 20 other fields
- Currently using JSON, response size ~200KB, time ~800ms

## Technical Requirements
- Frontend is Vue.js
- Backend is Node.js + Go microservices
- Need to balance performance and development efficiency

## Optimization Goal
- Response time under 300ms
- Data packet size reduced by 30%
```

**人工智能输出**：

```
Recommended solution: Hybrid approach

1. **API layer**: Continue using JSON (frontend-friendly)
2. **Microservice communication**: Switch to Protobuf (performance improvement)
3. **Static data**: Enable gzip compression

### Rationale
- JSON is most frontend-friendly, no extra parsing needed
- Backend microservices using Protobuf can reduce data volume by 40%
- gzip compression is very effective for text (JSON can be compressed by 70%)

### Performance Comparison
| Solution | Size | Time |
|------|------|------|
| Current (JSON) | 200 KB | 800 ms |
| + gzip | 60 KB | 350 ms |
| + Protobuf | 50 KB | 280 ms |

### Code Examples
[Specific implementation code...]
```

---

## 术语表

| 术语 | 英文 | 描述 |
| :--- | :--- | :--- |
| **序列化** | Serialization | 对象 → 字节流 |
| **反序列化** | Deserialization | 字节流 → 对象 |
| **JSON** | JavaScript 对象表示法 | 最常用的文本格式 |
| **XML** | 可扩展标记语言 | 标记语言，以前的主流 |
| **Protobuf** | 协议缓冲 | 谷歌开源的高效格式 |
| **MessagePack** | - | JSON 的二进制版本 |
| **编码** | Encoding | 字符 → 字节 |
| **解码** | Decoding | 字节 → 字符 |