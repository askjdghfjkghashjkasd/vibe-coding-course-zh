# 从数据库到 Supabase

在上一课中，我们学习了UI设计工具 MasterGo 和 Figma 的基础，如何使用 GitHub 进行代码管理和版本控制，以及如何通过 Zeabur 部署网站，使我们的应用可以被更多用户访问。

为了帮助你更好地连接已经学过的内容，在本课深入讲解设计工具和部署之前，让我们通过几个简单的问题快速回顾上一课的核心知识点：

1. 什么是前端设计工具，以及 Figma 和 MasterGo 的定义和使用方法？
2. 将设计稿转换成代码的基本方法。
3. 什么是 GitHub，如何配置 SSH，以及如何创建你的第一个仓库。
4. 部署意味着什么，如何使用 Zeabur，以及如何从 GitHub 或本地将代码部署到公共互联网上供他人访问。

如果上述问题仍然不清楚，建议复习上一课的文档和讲义笔记。也可以随时在微信学习群里提问。

在本课中，我们将学习如何将一个 APP/网站从“能运行”变成更接近真实在线产品：除了使用数据库管理程序运行期间的各种数据变化，我们还需要一个完整的用户系统（注册、登录、权限等）以及其他关键的后端能力。我们将使用 Supabase 作为主要后端服务平台，先实现“数据库+用户系统”两个基础功能，然后以 Supabase 的组件为参考，进一步理解现代云服务后端通常包含的核心模块，以及每个模块的具体功能和逻辑。

# 你将学到的内容

1. 什么是数据，什么是数据库，以及常见的数据库类型和使用方法
2. 什么是 Supabase，以及如何使用 Supabase 进行基本数据库操作
3. 如何使用 Supabase 给你的应用添加基础用户管理功能
4. 学习 Supabase 高级功能：实时、存储、边缘函数
5. 学习如何为 Supabase 添加 Google 和 GitHub 登录支持

- 一个支持用户注册/登录，并能够将数据存储到在线数据库的基础应用
- 一个可复用的 Supabase 后端代码模板（数据库+用户管理等），可以直接应用于后续项目

# 1. 什么是数据库

## 1.1 什么是数据

在数字世界中，数据无处不在。简单来说，数据是信息的载体。你朋友的联系方式、一篇微信文章、一个短视频、一个游戏角色的等级——这些都是数据。在我们的应用中，数据是所有需要被记录和管理的信息，如用户资料、订单历史、程序设置等。

通常，数据在程序中有不同的表示形式。最简单的是变量——我们可以使用不同的变量记录简单的数字：

```python
# Python variable definition examples

# Integer variable: stores age information
age = 30

# Boolean variable: stores status (whether active)
is_active = True  # True means active, False means inactive

# List variable: stores a set of score data
scores = [85, 92, 78, 90]  # Contains 4 integer elements representing different scores

# Dictionary variable: stores multiple related information of a user
user_info = {
    "age": 30,           # Key "age" corresponds to the value of age
    "height": 1.80,      # Key "height" corresponds to the value of height (unit: meter)
    "login_count": 156   # Key "login_count" corresponds to the value of login times
}
```

对于复杂的数据，比如前面提到的用户资料和订单历史，我们可以使用更复杂的表格来表示数据：

| user_id | name  | email             |
| ------- | ----- | ----------------- |
| 1001    | Alice | alice@example.com |
| 1002    | Bob   | bob@example.com   |

| order_id | user_id | amount | status    |
| -------- | ------- | ------ | --------- |
| 901      | 1001    | 29.99  | completed |
| 902      | 1002    | 15.50  | pending   |

然而，对于具有复杂结构、层级关系或可变字段的数据，我们可以使用 JSON 格式进行描述——它是互联网上的通用中间数据格式，几乎所有程序都可以读取和解析，使跨系统的数据传输非常方便。例如，一个订单可能包含多个商品，每个商品都有自己的名称、数量和价格。用传统表格表示会很繁琐：你要么需要将它拆分为“订单表”和“商品表”，并用外键字段显示“订单包含商品”的关系，要么在单个表中使用冗余字段，比如“商品1名称、商品1价格、商品2名称...”等，但这无法容纳可变数量的商品。而 JSON 可以直接使用嵌套结构清晰地表达“订单 - 商品 - 商品属性”的层级，使其既直观又灵活。

```json
{
  "order_id": 901,
  "user_id": 1001,
  "amount": 29.99,
  "status": "completed",
  "items": [
    { "sku": "BG-001", "name": "Beef Burger", "quantity": 1, "price": 18.00 },
    { "sku": "SD-003", "name": "French Fries", "quantity": 1, "price": 6.99 },
    { "sku": "DK-002", "name": "Cola", "quantity": 1, "price": 5.00 }
  ],
  "shipping_address": {
    "street": "123 Kejiyuan Road",
    "city": "Shenzhen",
    "zip_code": "518057"
  }
}
```

进一步说，如果我们考虑以向量形式编码的数据，向量数据通常是通过人工智能模型（例如嵌入模型）处理文本、图像或音频等非结构化数据后得到的数值表示。它的表示可能看起来像这样：

`[0.123, -0.456, 0.789, ..., -0.234]`（由数百甚至数千个浮点数组成的数组）

总之，现实世界中有许多不同形式和用途的数据值得详细分析，每种类型的数据可能都需要专门的数据库来存储。详情见下图——是不是感觉数据量很大？

![](/zh-cn/stage-2/backend/database-supabase/images/image1.png)

## 1.2 我们为什么需要数据库

我们已经了解到，现实世界中的数据通常具有复杂的结构。**为了高效地存储和使用这些数据，我们需要一个专门的程序或容器来管理它们**——这就是数据库的最初目的。数据库本质上是一个特殊的程序，其核心功能是以标准化的方式组织数据、安全地存储数据、系统化地管理数据，并支持高效的查询和获取。

想象一下没有数据库，应用数据会发生什么。当用户关闭浏览器或退出应用时，所有临时加载的信息将直接丢失；我们将无法永久保存用户状态（如登录信息、个性化设置），也无法在用户之间共享关键数据（如产品库存、订单记录）。我们需要一个机制来帮助我们存储所有数据！

更灵活的是，数据库的部署可以根据需要选择：可以部署在本地服务器上以满足数据本地化管理的需求，也可以部署到云端。云数据库支持弹性扩展，随着数据量和访问量的增长可以扩充容量，应对海量数据和高并发，即使用户显著增加，也能保证正常的用户体验。

总之，数据库凭借其高效的持久化存储、细致的管理和快速的查询能力，主要解决以下核心问题：

- **持久数据存储**：没有数据库时，数据仅存在于应用的内存中。一旦应用关闭，数据就会丢失。数据库通过在硬盘等存储介质上持久存储数据解决了这一问题，确保数据长期保存并降低数据丢失的风险。
- **便捷的数据查询与分析**：数据库提供强大的查询语言（如 SQL），允许用户轻松高效地对海量数据进行复杂查询、筛选和分析，帮助企业做出更明智的决策。没有数据库时，从大量无序文件中查找特定信息将是一项非常耗时且困难的任务。
- **支持高性能与高并发访问**：数据库使用索引优化、查询缓存、连接池和分布式架构等技术，在毫秒级响应查询请求，并支持成千上万用户的并发访问。这对于现代互联网应用（如电商秒杀、社交网络实时信息流）至关重要，可保证系统响应速度和用户体验。缺乏数据库高性能支持，系统在面对大量用户请求时将出现严重延迟甚至崩溃。
- **保证数据完整性和一致性**：数据库使用一系列机制（如约束、触发器）来确保数据的准确性和一致性。这意味着数据库中的数据必须符合预定义规则——例如，用户年龄必须是数字、订单编号必须唯一——有效防止非法或无效数据的产生。
- **确保数据安全**：数据库提供强大的安全机制，包括用户认证、访问控制和数据加密，以保护数据免受未授权访问、修改或破坏。为应对硬件故障、人为错误或恶意攻击等意外情况，数据库还提供数据备份和恢复功能。通过定期备份，当数据丢失或损坏时，可以及时恢复，确保业务连续性。

## 1.3 关系型数据库与非关系型数据库

我们已经介绍了数据库的核心价值、部署方式和弹性优势。在实际选择时，需要首先面对数据库的两个核心类别：关系型数据库和非关系型数据库（NoSQL）。我们可以通过两段简单描述来理解它们的区别：

关系型数据库就像一个严格结构化的 Excel 表格，所有数据必须预先格式化（定义模式内容，例如必须包含姓名和年龄，其中姓名为文本，年龄为数字），不同表通过外键字段（用于连接不同表的标识，如身份证号）进行关联。它的优势是数据精准可靠，特别适合银行转账、库存管理等不能出错的场景。缺点是调整结构相对繁琐，且在海量数据情况下性能受限。

非关系型数据库就像一个灵活的文件夹，可以存储文档、图片或键值对（类似于词典的“词-定义”结构），并且格式多样，无需预先定义每条数据的结构。它更容易应对快速变化的需求和超大规模数据（例如大量社交媒体帖子），扩展（通过增加服务器以提高性能）也更方便，但会牺牲一些跨表查询能力（在不同数据表之间组织信息的能力）和一致性保证（确保数据始终准确且不矛盾），因此适合对容错要求较高的互联网应用。

那么，在实际中应该如何选择数据库呢？按场景总结，关系型数据库常见于金融交易、库存管理、订单处理、会计系统以及其他需要强一致性、复杂事务处理和频繁平衡读写的场景。非关系型数据库更适合用于社交媒体内容存储、实时日志分析、物联网大规模数据采集、推荐系统特征读写，以及其他高并发、读写不平衡、结构灵活性要求高的场景。

然而，对于处于初期阶段的企业，不必花太多时间考虑使用哪种数据库。目前的数据库都是非常成熟的产品服务。最直接的方法是咨询不同的云服务提供商（提供服务器、存储、数据库、软件、计算力等IT资源与技术服务的供应商）。我们可以直接与云服务官方销售团队沟通，根据我们的产品业务需求匹配合适的数据库方案。构建企业应用的便捷路径是优先与专业厂商合作。（注：企业级服务通常价格较高。建议先进行多方调研和对比，或者选择自行购买服务器并部署开源数据库程序作为替代方案。）

我们也可以参考云厂商的[数据库选择推荐](https://help.aliyun.com/zh/govcloud/getting-started/select-database-services)，根据场景选择不同类型的数据库。你可以比较不同云服务提供商的数据库规格，以选择最合适的那一个。

|数据库类型 |数据库名称 |价格 |适用场景 |
|------------ |------------- |----- |------------------- |
|关系数据库 |RDS MySQL 版 |低级 |基础版：学习与小型网站;高可用性版：中型数据库场景，具有一定业务压力;集群版：业务无法容忍中断，高访问压力 |
| |RDS SQL Server 版本 |高级版 |基础版：测试和小型商业网站;高可用性版：企业级商业网站;集群版：企业业务无法容忍中断，访问压力高 |
| |RDS PostgreSQL 版本 |最低 |基础版：学习和小型网站;高可用性版：中型数据库场景，具有一定业务压力;集群版：业务无法容忍中断，访问压力高的场景，性能通常高于 MySQL |
| |RDS PPAS 版 |高 |通用：兼容 Oracle 业务，但业务压力较低，虚拟化可满足需求;专用：适用于需要专用物理机器的业务，通常为高并发的 Oracle 类业务 |
| |DRDS |中型 |入门版：4核心8G，价格实惠，适合中小型在线业务;企业版：16核心32G，具备良好的复杂SQL响应能力，适合超高并发在线业务;至尊版：32核心64G，最佳复杂SQL执行响应，提供超大型规格选项|
|NoSQL 数据库 |Redis |中等 |双机热备用 Redis：通常用作持久数据库以提升业务可用性;集群版本 Redis：通常用作缓存层，加速应用访问，解决普通数据库无法承受的读取压力 |
| |MongoDB版 |中介 |单节点实例：适用于开发、测试及其他非企业核心数据存储场景;副本集实例：适用于某些业务场景中对数据库读取性能要求更高的场景，如面向阅读的网站、读取多于写的订单查询系统，或临时活动及其他突发业务需求;分片集群实例：基于多个副本集（每个副本集遵循三副本模式）组成分片集群实例，提供更高的读取性能要求，为实时在线业务提供高速读取性能 |

仅凭阅读很难理解。我们用一个具体的“博客文章”场景来看看，如何将相同数据存储在关系数据库（SQL）中，与不同类型的非关系数据库（NoSQL）相比。

假设我们有一个博客平台需要存储以下信息：

- 用户：用户ID、用户名、电子邮件
- 帖子：帖子ID、标题、内容、作者ID
- 评论：评论ID、内容、评论者ID、相关帖子ID
- 标签：标签ID，标签名称
- 帖子标签关系：单个帖子关联多个标签，多个标签关联单个标签

### 关系数据库（SQL）示例

在SQL数据库中，我们会将不同类型的数据存储在不同的表格中，并通过“外键”将它们链接起来。这种结构清晰、标准化，并且减少了数据冗余。

以“内容平台文章管理”为例，我们不会把“用户、帖子、评论、标签”混在一起。相反，我们会将它们拆分成 5 个表，每个表只有单一功能。每个表都有明确的“责任边界”和严格的结构定义（Schema）：

- `users` 表（存储用户信息）

| user_id (主键) | username | email             |
| --------------------- | -------- | ----------------- |
| 101                   | Alice    | alice@example.com |
| 102                   | Bob      | bob@example.com   |

- `posts` 表（存储帖子信息）

| post_id (主键) | title | content | author_id (外键) |
| --------------------- | ----- | ------- | ----------------------- |
| 1                     | SQL 入门 | 这是一篇关于 SQL 数据库的文章... | 101 |
| 2                     | NoSQL 入门 | NoSQL 提供灵活的数据模型... | 102 |

- `comments` 表（存储评论信息）

| comment_id (主键) | body | commenter_id (外键) | post_id (外键) |
| ------------------------ | ---- | -------------------------- | --------------------- |
| 1001 | 写得很好！ | 102 | 1 |
| 1002 | 学到新东西。 | 101 | 2 |
| 1003 | 有更多例子吗？ | 101 | 1 |

- `tags` 表（存储标签）

| tag_id (主键) | tag_name |
| -------------------- | -------- |
| 51 | 数据库 |
| 52 | 技术 |
| 53 | 初学者 |

- `post_tags` 表（存储帖子与标签之间的多对多关系，用于展示连接表特性）

| post_id (外键) | tag_id (外键) |
| --------------------- | -------------------- |
| 1 | 51 |
| 1 | 52 |
| 2 | 51 |
| 2 | 52 |
| 2 | 53 |

要查询“Alice 的帖子 'SQL 入门'（post_id=1）的完整信息（包括帖子内容、作者、评论、标签）”，需要执行一个多表连接（JOIN）查询，通过外键关联这 5 个表并聚合数据。SQL 语句如下：

```sql
SELECT
    p.title,
    p.content,
    u.username AS author,
    c.body AS comment,
    t.tag_name AS tag
FROM
    posts p
JOIN
    users u ON p.author_id = u.user_id
LEFT JOIN
    comments c ON p.post_id = c.post_id
LEFT JOIN
    post_tags pt ON p.post_id = pt.post_id
LEFT JOIN
    tags t ON pt.tag_id = t.tag_id
WHERE
    p.post_id = 1;
```

此查询跨越了 5 张表，将所有相关数据聚合在一起。这是关系型数据库的核心优势：通过规范化和连接操作，您可以灵活地执行各种复杂查询，同时保证数据一致性并减少冗余。

### 非关系型数据库（NoSQL）示例

NoSQL 数据库（如 MongoDB、Redis）的设计理念与 SQL 相反。它们不强调数据拆分和规范化，通常将所有业务相关数据聚合在一起，以减少查询时的连接操作，从而提高读取性能。

在 NoSQL 数据库中，文档数据库是最常用的类型之一，MongoDB 是典型代表。它以“文档”作为基本存储单元。这里的“文档”并不是我们通常理解的“文章”，而是一种类 JSON 的数据结构（MongoDB 实际使用 BSON 格式，支持更多数据类型）：无需预先定义统一的 Schema（数据结构），每个文档的字段可以灵活添加或删除，字段类型可以自由调整，非常适应具有可变数据格式的场景。

在文档数据库中，一篇帖子及其所有相关信息（如评论、标签）通常存储在单个文档中（文档格式类似 JSON，字段定义灵活，无需预定义 Schema）。核心逻辑是“将一个业务场景的完整信息存储在一个文档中”，避免查询时多来源数据的拼接。

`posts` 集合中的示例文档：

```json
{
  "_id": 1,
  "title": "Introduction to SQL",
  "content": "This is an article about SQL databases...",
  "author": {
    "user_id": 101,
    "username": "Alice",
    "email": "alice@example.com"
  },
  "tags": [
    "Database",
    "Technology"
  ],
  "comments": [
    {
      "comment_id": 1001,
      "body": "Great writing!",
      "commenter": {
        "user_id": 102,
        "username": "Bob"
      }
    },
    {
      "comment_id": 1003,
      "body": "Any more examples?",
      "commenter": {
        "user_id": 101,
        "username": "Alice"
      }
    }
  ]
}
```

这种设计的优势非常直观：当你需要获取“第一篇帖子的完整信息（包括作者、评论、标签）”时，你只需要通过 `_id:1` 查询这个文档，数据库就可以在一次读取中返回所有数据，而无需像 SQL 那样执行 3-4 个表的联合操作，从而大大提高读取效率。

然而，也存在显而易见的权衡：由于数据是“聚合存储”的，数据冗余是不可避免的——例如，作者 "Alice" 的 `username` 嵌入在她撰写的每一个帖子文档中。如果有一天 "Alice" 将用户名更改为 "Alice_New"，理论上你需要遍历所有包含她信息的帖子文档，并逐个更新 `author.username` 字段。这不仅繁琐，而且可能由于网络或服务器问题导致某些文档未能更新，从而产生“同一用户在不同帖子中的用户名不一致”的情况。

然而在实际中，这种冗余通常是“可以接受的”：对于“读多写少”的场景，如博客、新闻和电商产品详情（用户查看内容的频率远高于作者修改用户名的频率），以少量冗余换取“极致的读取性能”是更优选择。对于“写多读少”的场景（如频繁更新用户信息），需要权衡业务需求以决定是否使用文档数据库。

以上是对不同数据库的简要介绍。如果你对更具体的数据库类型感兴趣，可以参考以下资源尝试不同类型的数据库。

SQL 数据库示例：
[Db2](https://www.ibm.com/products/db2-database), [MySQL](https://cloud.ibm.com/catalog#highlights), [PostgreSQL](https://www.ibm.com/think/topics/postgresql), [YugabyteDB](https://www.yugabyte.com/), [CockroachDB](https://www.cockroachlabs.com/), [Oracle Database](https://www.ibm.com/products/postgres-enterprise), [Azure SQL Database](https://www.ibm.com/consulting/microsoft)

NoSQL 数据库示例：
[Redis](https://www.ibm.com/think/topics/redis), [CouchDB](https://www.ibm.com/think/topics/couchdb), [MongoDB](https://www.ibm.com/think/topics/mongodb), [Cassandra](https://cloud.ibm.com/catalog#highlights), [Elasticsearch](https://www.ibm.com/think/topics/elasticsearch), [BigTable](https://www.techtarget.com/searchdatamanagement/news/252512583/Google-scales-up-Cloud-Bigtable-NoSQL-database), [Neo4j](https://neo4j.com/users/ibm/), [HBase](https://www.ibm.com/think/topics/hbase)

# 2. Supabase

前面我们介绍了几种常见的数据库类型及其适用场景。然而，在实际项目中，数据库通常只是后端系统中的一个基础模块。除了存储和查询数据，你还需要解决一整套问题：**用户注册与登录、权限验证、文件上传与存储、外部 API 接口，甚至定时任务和实时通知**。仅仅选择合适的数据库，并不会让你的应用“立即可投入生产使用”——在这之间仍然有大量繁琐的后端工程工作。

所以，我们需要考虑一个更宏观的图景：**后端服务**。一个完整的应用通常由“前端后端”组成：前端负责页面显示和用户交互，后端负责数据存储、用户登录、业务逻辑处理等。过去，开发者常常需要自己搭建服务器、配置数据库、设计和实现API，并手动处理权限管理、安全策略、可扩展性以及监控和运营——整个过程既重复又耗时。为了解决这种重复性工作，业界推出了**BaaS（后端即服务）**：将常见的后端功能如数据库、用户认证、文件存储和实时功能打包到云平台上，开发者可以通过SDK/API直接调用这些功能，无需从零构建和运营基础设施。

在这样的背景下，[Supabase]（https://supabase.com/）可以被视为新一代BaaS的代表。它以PostgreSQL为核心数据库，并整合了包括认证、存储、实时、边缘功能、向量等完整的后端功能，为开发者提供了一个“以Postgres为中心的一站式后台平台”。接下来，从“仅仅选择一个数据库”升级到“选择一个完整的后端开发平台”，具体看看Supabase能帮我们跳过哪些工作，以及它如何显著缩短从原型到可用产品的距离。

## 2.1 逐步指南

在明确了解Supabase整体定位后，我们将跟踪Supabase控制台的操作路径，解析其具体核心能力及各能力的核心职责。我们将详细介绍Supabase中的每个选项，帮助您快速开始基础的Supabase操作。

![]（/zh-cn/stage-2/backend/database-supabase/images/image2.png）

访问Supabase官方网站并登录后，点击控制台主页的“新项目”进入创建流程。

输入所需的配置：项目名称和数据库密码。对于区域，只需选择离目标用户最近的区域即可。

![]（/zh-cn/stage-2/backend/database-supabase/images/image3.png）

成功创建后，控制台左侧栏将显示所有核心功能模块（表格编辑器、SQL 编辑器、数据库、认证等）。后续操作将围绕这些模块展开。

![]（/zh-cn/stage-2/backend/database-supabase/images/image4.png）

### 表格编辑

表格编辑器可以被视为Supabase的可视化数据表编辑器。它允许你像操作Excel一样，直接查看和修改数据库中的数据，无需编写SQL语句——只需鼠标操作即可修改数据内容。

![]（/zh-cn/stage-2/backend/database-supabase/images/image5.png）

值得注意的是 Schema。Schema 可以理解为数据库中的“资源容器”，用于分组和管理表、视图、函数、索引及其他资源。其两个主要目的是：首先，避免命名冲突（同名表可能存在于不同 Schema 下），其次，实现权限隔离（例如只允许特定用户访问特定 Schema 下的表）。

点击编辑器顶部的“Schema”下拉菜单，切换不同的容器。在日常开发中，你通常只需要专注于两种类型：

- `public`：默认的公共资源容器。开发者创建的业务表（如“articles table”和“comments table”）都存储在这里。
- `auth`：专用的用户认证容器。其 `users` 表自动存储所有注册用户信息（如用户 ID、电子邮件、登录时间）。不建议手动修改该模式下的默认表，以避免影响认证功能。

![]（/zh-cn/stage-2/backend/database-supabase/images/image6.png）！[]（/zh-cn/stage-2/backend/database-supabase/images/image7.png）

### SQL 编辑器

SQL 编辑器作为 Supabase 的 SQL 语句执行器，允许你直接用代码操作数据库。你可以让大型语言模型直接生成 SQL 语句，粘贴到右侧输入区，点击 RUN 创建或修改表。你也可以直接在结果部分查看筛选后的表数据。

![]（/zh-cn/stage-2/backend/database-supabase/images/image8.png）

运行 RUN 后，你可以在表格编辑器的公共模式中找到新创建的数据表。执行的语句会保存在左侧的 PRIVATE 部分，你甚至可以点击下方的爱心图标来收藏某个查询或创建语句。

### 数据库管理中心

Database是Supabase的数据库管理中心，支持对所有数据表的可视化查看和管理，并通过连接（即表示数据间引用关系的外键约束）理解不同表之间的关系。

![]（/zh-cn/stage-2/backend/database-supabase/images/image9.png）

如果你想手动创建新表，可以在表格部分直接创建。我们将在后续教程中详细讲解这一点。

![]（/zh-cn/stage-2/backend/database-supabase/images/image10.png）

### 认证

认证管理用户注册、登录和权限。默认的用户管理系统数据存储于此。它提供开箱即用的用户注册、登录、密码重置、电子邮件验证及其他功能，并支持第三方 OAuth 登录（如微信、GitHub、谷歌等）。所有用户数据会自动同步到数据库中的 `auth.users` 表。

![]（/zh-cn/stage-2/backend/database-supabase/images/image11.png）

你可以在提供者选项中找到Supabase支持的不同登录入口点。默认使用电子邮件。如果你想使用GitHub或Google账户登录，需要额外的配置，我们将在下面的课程中详细介绍。

![]（/zh-cn/stage-2/backend/database-supabase/images/image12.png）

登录/服务提供者部分还包含注册邮件行为的控制。如果你不希望每次邮件注册都要求用户在成为用户前接受邀请，可以关闭强制确认邮件的要求。

![]（/zh-cn/stage-2/backend/database-supabase/images/image13.png）

如果你想切换到Supabase以外的其他认证系统提供商，可以点击第三方认证。例如，你可以将Clerk作为第三方系统提供商使用。

![]（/zh-cn/stage-2/backend/database-supabase/images/image14.png）

如果你担心短期内注册用户的访问量过多，可以在“速率限制”中启用相应的速率限制策略：

![]（/zh-cn/stage-2/backend/database-supabase/images/image15.png）

### 存储

存储是 Supabase 的存储系统，兼容亚马逊云的 S3 概念。它可以用于存储任何类型的文件（如图片、视频、文档、音频等），并提供访问权限管理（公开或私有）和下载链接生成（永久链接或临时链接）。你可以方便地为应用中的用户管理文件上传和下载，并无缝集成 Supabase 的认证系统，实现细粒度的访问控制。

![]（/zh-cn/stage-2/backend/database-supabase/images/image16.png）

我们将在本课的高级项目部分介绍存储的具体用途。

![]（/zh-cn/stage-2/backend/database-supabase/images/image17.png）

如果你想使用与S3相关的协议进行操作，可以直接使用相应的配置：

![]（/zh-cn/stage-2/backend/database-supabase/images/image18.png）

> 亚马逊云（Amazon Web Services，或称 AWS）是亚马逊的云计算平台（类似于大型网络服务器室，您可以按需租赁计算和存储资源）。S3（简单存储服务）是 AWS 专用的文件存储服务（类似于无限云驱动器，可以存储图片、视频、备份及各种文件）。它目前是最受欢迎的对象存储服务，并已成为事实上的行业标准。
>
> **为什么要让它兼容S3的API？**：S3已经存在近20年，市场上有大量现有工具、SDK和文档。兼容S3意味着你可以直接使用这些资源，而无需从零开始构建各种相关工具，从而实现快速业务启动。

### 边缘函数

如果你不想部署后端，但想使用数据库和函数操作，可以使用Edge Functions构建后端核心能力，而无需自管理服务器。这些是Supabase全球分布式的服务器端功能。简单来说，它们让你无需购买和管理自己的后端服务器，即可在云端编写和部署后端代码。这些功能部署在全球网络的边缘节点上，并自动运行在离用户最近的位置，显著降低网络延迟，提供极高响应速度。你可以直接在Supabase仪表盘中创建、编辑和部署它们，使整个开发过程非常方便。

![]（/zh-cn/stage-2/backend/database-supabase/images/image19.png）

Edge Functions 的核心用例是作为一个安全的中间件层，保护您的敏感信息和认证密钥。直接从前端代码调用第三方服务（如 OpenAI、Stripe）会暴露你的 API 密钥，带来重大安全风险。而 Edge Functions，你的前端应用只与 Supabase 函数通信，所有秘密仅存储在 Supabase 内部。

![]（/zh-cn/stage-2/backend/database-supabase/images/image20.png）

Edge 函数使用通过 `Deno.env.get` 加载的密钥作为环境变量，作为环境变量，以启用调用第三方服务。这样，敏感密钥在客户端（浏览器）就不会被暴露，完全消除了被盗的风险。

![]（/zh-cn/stage-2/backend/database-supabase/images/image21.png）

在请求 Supabase Edge Function 时，您需要在请求头中包含相应的 Supabase 密钥。以下是一个最小示例：

```javascript
// Core configuration (replace with your actual information)
const projectId = "your-supabase-project-id";
const functionName = "target-edge-function-name";
const supabaseKey = "Supabase anon_key";

// Call the function
async function callEdgeFunction() {
  const url = `https://${projectId}.supabase.co/functions/v1/${functionName}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${supabaseKey}` // Key: include key for authentication
      },
      body: JSON.stringify({ order_id: "123", action: "refund" }) // Custom request data
    });

    const result = await response.json();
    console.log("Call successful:", result);
  } catch (error) {
    console.error("Call failed:", error.message);
  }
}

// Execute the call
callEdgeFunction();
```

此外，Edge Functions 能与 Supabase 的用户身份验证系统无缝集成。当已登录用户调用函数时，他们的身份信息会被传递给该函数。这使您能够轻松在函数内识别当前用户，并根据其身份执行权限控制。更重要的是，当函数操作数据库时，它会自动遵循您设置的行级安全策略，确保用户只能访问和修改自己被授权的数据，从而轻松构建安全的多用户应用程序。

Edge Functions 具有广泛的应用场景，可处理各种后端任务。它们非常适合监听来自第三方服务的 Webhook 事件（如支付成功、代码提交等）并自动执行相应的数据处理逻辑。您还可以使用它们发送电子邮件通知、生成 PDF 报告、创建封装复杂业务逻辑的自定义 API 接口，或执行任何希望在服务器端完成的计算任务，从而大大扩展应用程序的功能。

一个具体的常见案例：身份验证工具 Clerk。Clerk 仅用于处理与身份验证相关的操作，如用户登录、注册和信息更新，并不直接管理您的业务数据库。如果您希望将这些身份验证动态同步到业务数据库中，则需要触发 Webhook 事件来请求 Edge Functions。Edge Functions 可以监听 Clerk 的 Webhook 信号，自动执行数据同步逻辑，并实时保持 Supabase 数据库中的用户信息与 Clerk 的登录状态一致，而无需部署独立的后端。

### 实时数据同步引擎

Realtime 是 Supabase 的实时数据同步引擎。它允许应用程序无需反复轮询 API，即可即时接收数据库变化通知。当数据库中的数据发生 `INSERT`、`UPDATE` 或 `DELETE` 操作时，Realtime 会通过 WebSocket 将这些变化实时推送给所有连接的客户端。这对于构建需要实时交互的应用程序至关重要。

Realtime 主要包括三个核心功能，涵盖了绝大多数实时场景：

1. **Postgres 变化：** 直接监听数据库表的变化。您可以精确订阅特定表、特定事件（插入、删除、更新），甚至根据筛选条件接收通知，完美结合行级安全策略，确保用户仅接收有权限查看的数据变化。
2. **广播（Broadcast）：** 允许客户端通过频道向彼此发送低延迟的临时消息。这非常适合实现聊天室、实时光标跟踪、在线游戏状态同步等功能。
3. **在线状态（Presence）：** 用于跟踪和同步在线用户状态。您可以用它轻松实现“谁在线”、“当前有 X 人在查看”等功能，非常适合协作应用。

我们将在后续基于项目的学习中详细介绍这一部分。

### 项目设置

项目设置是 Supabase 项目的高级配置部分。在这里，您可以实现计算资源的深度调度，并对各种功能的底层参数进行细粒度配置。

![](/zh-cn/stage-2/backend/database-supabase/images/image22.png)

在初学者阶段，我们只需要关注以下两个核心部分。一个是数据 API，我们可以在这里获取关键的“Supabase URL”——它是一个 RESTful 端点，格式为 `https://xxx.supabase.co`，作为所有数据查询、插入、更新和删除操作的“入口地址”。前端或服务器端需要使用此 URL 来初始化 Supabase 客户端并与数据库建立连接。

![](/zh-cn/stage-2/backend/database-supabase/images/image23.png)

另一个重要部分是 API 密钥。选择“Legacy anon, service_role API keys”标签。anon 公钥是前端场景的重要凭证。其权限严格受 RLS 限制，只能访问用户被授权的数据。service_role 密钥是“服务器端高权限密钥”，能够绕过行级安全（RLS），执行批量数据操作、系统级配置及其他敏感操作。绝对不能公开共享。如若泄露，必须立即生成新密钥并更新服务器端配置。

![](/zh-cn/stage-2/backend/database-supabase/images/image24.png)

其他配置项在目前阶段无需深入探索。当后续有高级使用需求时，可以逐一探索。

## 2.1 创建你的第一个 SQL 数据表

以上是对 Supabase 界面的介绍。接下来，我们将深入了解 Supabase 的核心数据库操作。

在 Supabase 中创建数据表主要有两种方式。你可以根据需求选择：

1.（推荐）使用大语言模型生成适用于 Supabase 的 SQL 语句，并直接在 **SQL Editor**（前文介绍的 SQL 语句执行器）中粘贴执行。这种方式高效快捷，我们将在下一节重点讲解此操作流程。
2. 通过可视化操作创建：在左侧边栏找到 Database 模块，点击进入并在侧边栏选择 Tables，然后点击右侧的“New table”按钮，通过图形界面创建数据表。

![](/zh-cn/stage-2/backend/database-supabase/images/image25.png)

注意，可以在下方的 Columns 栏指定对应的数据表名称和要存储的数据类型。

![](/zh-cn/stage-2/backend/database-supabase/images/image26.png)

对于关系型数据库，一个重要特性是表与表之间的关系。你可以在下方找到 `Foreign keys` 并点击创建对应的关系：

![](/zh-cn/stage-2/backend/database-supabase/images/image27.png)

一个 `Foreign key` 表示表之间的关系：当前表（子表）中的一个字段或字段集合，其值引用另一表（父表）的主键值。

例如，在创建 `students` 表时，我们可以这样定义外键：（`class_id` 列是外键。该外键引用 `classes` 表中的 `class_id` 列。）

```sql
CREATE TABLE students (
    student_id INT PRIMARY KEY,
    student_name VARCHAR(50),
    class_id INT,
    FOREIGN KEY (class_id) REFERENCES classes(class_id)
);
```

更具体地说，我们可以直观地观察到相应表的结构：

班级表：
该表记录所有班级的信息，每个班级都有一个唯一的班级ID。班级ID是该表的主键，作为每个班级的唯一标识。

| class_id | class_name |
| -------- | ---------- |
| 101 | 一年级一班 |
| 102 | 一年级二班 |

学生表：
该表记录所有学生的信息。每个学生都属于特定的班级，对吗？那么我们如何知道哪个学生属于哪个班级呢？

我们可以在学生表中添加一列，称为 `class_id`。

| student_id | student_name | class_id |
| ---------- | ------------ | -------- |
| 2024001    | 张三        | 101      |
| 2024002    | 李四        | 102      |
| 2024003    | 王五        | 101      |

在这个例子中，学生表中的 `class_id` 列是外键。

在 Supabase 中，点击添加外键后，可以直接选择相关表的对应列。

![](/zh-cn/stage-2/backend/database-supabase/images/image28.png)

## 2.3 SQL 编辑器介绍及基本数据库操作

接下来，我们将逐步执行一系列 SQL 脚本，以熟悉 SQL 中常用的 CRUD（创建、读取、更新、删除）操作。你可以将每一步的代码复制到 SQL 编辑器中执行，并观察结果。

你可以在以下目录找到所有的测试 SQL 文件：

https://github.com/THU-SIGS-AIID/Project5-Supabase-Demos/tree/main/apps/sql-examples

### **2.3.1 `CREATE` - 创建表结构**

`CREATE TABLE` 语句用于定义新表的模式，包括其列、相应的数据类型及任何约束。简单来说，它用于创建数据表。

```sql
-- Step 1: Create the 'orders' table
-- This file is fully independent and creates a sample table for later steps.
CREATE TABLE IF NOT EXISTS orders (
  id serial PRIMARY KEY,
  user_id int NOT NULL,            -- User ID
  status text NOT NULL,            -- Order status (e.g. paid, pending)
  amount numeric(10, 2) NOT NULL,  -- Order total amount
  details jsonb,                   -- Item and extra details as JSON
  placed_at timestamptz DEFAULT now(), -- Order creation time
  is_paid boolean DEFAULT false    -- Paid flag
);

-- Expected Output:
-- Orders table created if it did not exist.
-- No data inserted. (Querying returns zero rows for now.)
-- If table already exists, no error occurs.
```

执行成功后，系统将显示脚本已完成。您可以在表格编辑器中看到创建的相应表格：

![](/zh-cn/stage-2/backend/database-supabase/images/image29.png)

### **2.3.2 `INSERT` - 填充初始数据**

在表结构创建完成后，下一步是使用 `INSERT INTO` 语句向表中添加数据行。

```sql
-- Step 2: Insert initial rows into the orders table
-- Provides realistic, varied data for demo/testing. All values are self-contained.
INSERT INTO orders (user_id, status, amount, details, placed_at, is_paid) VALUES
  (2001, 'pending', 23.50, '{"items":[{"sku":"BGR001","name":"Beef Burger","qty":1,"price":12.00}]}', now() - interval '2 days', false),
  (2002, 'paid', 50.00, '{"items":[{"sku":"BGR002","name":"Chicken Burger","qty":2,"price":10.00},{"sku":"DRK001","name":"Lemonade","qty":2,"price":5.00}]}', now() - interval '1 day', true),
  (2003, 'cancelled', 15.00, '{"items":[{"sku":"FRY001","name":"French Fries","qty":3,"price":5.00}], "reason":"Not available"}', now() - interval '45 days', false),
  (2004, 'paid', 22.98, '{"items":[{"sku":"BGR003","name":"Veggie Burger","qty":2,"price":9.99}], "promo":"SUMMER22"}', now() - interval '10 days', true),
  (2005, 'pending', 18.75, '{"items":[{"sku":"SAL001","name":"Salad","qty":1,"price":6.75},{"sku":"BGR001","name":"Beef Burger","qty":1,"price":12.00}]}', now() - interval '7 hours', false),
  (2006, 'paid', 8.00, '{"items":[{"sku":"DRK002","name":"Cola","qty":2,"price":4.00}]}', now() - interval '3 hours', true),
  (2007, 'refunded', 14.50, '{"items":[{"sku":"BGR003","name":"Veggie Burger","qty":1,"price":9.99},{"sku":"FRY001","name":"French Fries","qty":1,"price":4.51}], "refund_reason":"Late delivery"}', now() - interval '15 days', false),
  (2008, 'paid', 26.99, '{"items":[{"sku":"BGR002","name":"Chicken Burger","qty":2,"price":10.00},{"sku":"DRK001","name":"Lemonade","qty":1,"price":6.99}]}', now() - interval '12 days', true),
  (2009, 'pending', 9.99, '{"items":[{"sku":"BGR003","name":"Veggie Burger","qty":1,"price":9.99}]}', now() - interval '30 minutes', false),
  (2010, 'paid', 19.89, '{"items":[{"sku":"BGR001","name":"Beef Burger","qty":1,"price":12.00},{"sku":"DRK002","name":"Cola","qty":2,"price":3.95}]}', now() - interval '5 days', true),
  (2011, 'cancelled', 0.00, '{"items":[], "reason":"User cancelled"}', now() - interval '2 days', false);

-- Expected Output:
-- After running this script, SELECT * FROM orders will show about 11 rows with varied user_id, status, amount, details (JSON), placed_at, and is_paid fields.
-- For example:
-- | id | user_id | status    | amount | is_paid | placed_at           |
-- |----|---------|-----------|--------|---------|---------------------|
-- | 1  | 2001    | pending   | 23.50  | false   | 2025-10-28 13:40:00Z|
-- | 2  | 2002    | paid      | 50.00  | true    | ...                 |
-- |... | ...     | ...       | ...    | ...     | ...                 |
```

在成功执行后，初始数据已被插入到表中。您可以前往表编辑器界面并刷新以查看结果，或者在 SQL 编辑器界面打开新窗口并执行查询 `SELECT * FROM orders;` 来查看结果：

![](/zh-cn/stage-2/backend/database-supabase/images/image30.png)

### **2.3.3 `SELECT` - 读取和查询数据**

`SELECT` 语句用于从表中检索数据。通过使用不同的子句，您可以实现对数据的精确筛选、排序和格式化。让我们逐步执行以下语句以查看结果：

```sql
-- Step 3: SELECT query examples for the orders table

-- Example 1: Select all fields for all orders
SELECT * FROM orders;
-- Expected Output: Returns all rows and fields. Columns: id, user_id, status, amount, details, placed_at, is_paid.

-- Example 2: Select only pending orders
SELECT id, user_id, amount FROM orders WHERE status = 'pending';
-- Expected Output: All rows with status 'pending'; columns: id, user_id, amount.

-- Example 3: Select specific fields and filter by payment status
SELECT id, status, is_paid, amount FROM orders WHERE is_paid = true;
-- Expected Output: All rows where is_paid is true; columns: id, status, is_paid, amount.

-- Example 4: Extract all item names from the details (JSON) for each order
SELECT id, details -> 'items' AS item_list FROM orders;
-- Expected Output: Each row shows id and an array from JSON with item details.
```

- **示例 1：** 返回 `orders` 表中的所有行和列，类似于步骤 2 中的输出。
- **示例 2：** 仅返回状态为“pending”的订单，并且只包含指定的列：

![](/zh-cn/stage-2/backend/database-supabase/images/image31.png)

- **示例 3：** 仅返回已付款订单及指定列：

| id  | status | is_paid | amount |
| --- | ------ | ------- | ------ |
| 2   | paid   | true    | 50.00  |
| 4   | paid   | true    | 22.98  |
| 6   | paid   | true    | 8.00   |
| 8   | paid   | true    | 26.99  |
| 10  | paid   | true    | 19.89  |

- **示例 4：** 返回每个订单的 `id` 和从 `details` 字段中提取的 `items` 数组：

| id  | item_list                                                                                                            |
| --- | -------------------------------------------------------------------------------------------------------------------- |
| 1   | `[{"qty":1,"sku":"BGR001","name":"Beef Burger","price":12}]`                                                         |
| 2   | `[{"qty":2,"sku":"BGR002","name":"Chicken Burger","price":10},{"qty":2,"sku":"DRK001","name":"Lemonade","price":5}]` |
| 3   | `[{"qty":3,"sku":"FRY001","name":"French Fries","price":5}]`                                                         |
| ... | ...                                                                                                                  |

### **2.3.4 `INSERT` - 插入单条记录**

在 2.3.2 节中，我们演示了开头的批量数据插入。现在让我们看看如何插入一条新的记录。

```sql
-- Step 4: INSERT a new order (single row)
-- Example: Add a new paid order for user 2012 with one Chicken Burger
INSERT INTO orders (user_id, status, amount, details, is_paid)
VALUES (
  2012, 'paid', 9.99,
  '{"items":[{"sku":"BGR002","name":"AIID Burger","qty":100,"price":1000}]}',
  true
);
-- Expected Output:
-- Before (table fragment):
-- | id | user_id | status | amount | is_paid |
-- | ...|   ...   |  ...   |  ...   |  ...    |
--
-- After (last row):
-- | id | user_id | status | amount | is_paid |
-- | xx |  2012   |  paid  |  9.99  |  true   |
-- (where xx = next serial value)
```

现在当你使用 `SELECT * FROM orders;` 再次查询数据时，你可以看到 orders 表的记录已经从 11 条成功增加到 12 条。

### **2.3.5 `UPDATE` - 修改现有数据**

在实际工作中，我们经常需要更新表中的数据。我们可以使用 `UPDATE` 语句来修改表中已有的记录。

```sql
-- Step 5: UPDATE example
-- Example: Mark order with id=1 as paid and update its status
UPDATE orders SET status = 'paid', is_paid = true WHERE id = 1;
-- Expected Output:
-- Before (row with id=1):
-- | id | status  | is_paid |
-- | 1  | pending |  false  |
-- After (row with id=1):
-- | id | status | is_paid |
-- | 1  | paid   |  true   |
-- All other rows remain unchanged.
```

### **2.3.6 `DELETE` - 删除数据**

`DELETE` 语句可以用于从表中移除记录，并结合条件修改指定部分的数据。

```sql
-- Step 6: DELETE example
-- Example: Delete orders older than 2 days to clean up old data
DELETE FROM orders WHERE placed_at < now() - interval '2 days';
-- Expected Output:
-- Before (filtered for affected rows):
-- | id | status    | placed_at           |
-- |  3 | shipped   | 2025-10-13 ...     |  <-- will be deleted
--
-- After:
-- No such rows remain. SELECT * FROM orders WHERE placed_at < now()-interval '2 days' yields zero rows.
-- Other rows in orders table are unaffected.
```

在执行之前，您可以先运行 `SELECT id, status, placed_at FROM orders WHERE placed_at < now() - interval '2 days';` 来查看数据表中过滤后的结果。在运行 `DELETE` 命令之后，执行相同的 `SELECT` 查询 `SELECT id, status, placed_at FROM orders WHERE placed_at < now() - interval '2 days';` 将返回空结果，这表明这些行已被成功删除。

## 2.4 行级安全

在学习了基本的数据库操作之后，我们需要深入了解一个核心概念，以确保数据安全 —— RLS（行级安全）。

让我们首先考虑实际场景中的一个关键问题：如何实现对数据的“隔离访问”？例如，仅允许用户A查看自己的数据，同时阻止其查看用户B的信息。或者，即使某个角色拥有数据库访问权限，我们如何防止其意外操作或泄露其他用户的敏感数据？

RLS 正是为了满足这些数据安全和隔离需求而诞生的。它允许开发者为数据库表定义细粒度的安全策略，精确控制哪些用户可以基于用户身份信息（如用户ID、角色权限等）访问和修改哪些数据行。

一个典型示例：对于订单表 (`orders`)，我们可以定义一条 RLS 策略 —— “只有当 `orders` 表中某条记录的 `user_id` 列精确匹配当前登录用户的 ID 时，该用户才能查询该订单数据”，从而实现“用户只能看到自己的订单”的核心需求。

当您为某个表启用 RLS 时，针对该表的所有数据操作请求（包括 `SELECT` 查询、`INSERT` 插入、`UPDATE` 修改、`DELETE` 删除）都会触发 RLS 验证：只有通过至少一条安全策略检查的操作才能继续执行。如果没有策略允许该操作，或者请求不符合任何策略条件，数据库将直接拒绝该操作，从根本上阻止未经授权的访问。

在 Supabase 中，RLS 与用户认证系统深度集成，使其使用更加方便。Supabase 提供了一个专用函数 `auth.uid()`，可以直接返回“当前发起请求的登录用户”的唯一 ID（UUID 格式）。使用该函数，我们可以轻松编写策略，实现“数据行与用户身份”之间的精确关联（例如前面提到的“订单 `user_id` 与当前用户 ID 匹配”）。

启用 RLS 策略的方法非常灵活。您可以直接通过 Supabase 数据库管理界面的“RLS”按钮配置并启用策略：

![](/zh-cn/stage-2/backend/database-supabase/images/image32.png)

![](/zh-cn/stage-2/backend/database-supabase/images/image33.png)

![](/zh-cn/stage-2/backend/database-supabase/images/image34.png)

手动配置可能比较繁琐。通常，我们在创建和初始化数据表时，会自动考虑嵌入相应的 RLS 策略。我们只需在 SQL 编辑器中执行如下语句，即可自动为对应数据表启用行级安全。

![](/zh-cn/stage-2/backend/database-supabase/images/image35.png)

# 3. 您的第一个 SQL 应用

在掌握了基础数据库操作和 RLS 核心逻辑后，我们终于进入本教程的动手实践部分。之前较长的学习准备是为了让后续“从 0 到 1 构建应用”的过程更加清晰。接下来，我们将以“汉堡店订单管理”场景为例，逐步带你完成常见的 Supabase 操作：从应用与 Supabase 连接配置，到数据库与登录功能集成，逐步学习不同的操作逻辑。

## 3.1 克隆并运行 Supabase 演示项目

要开始动手实践，首先需要获取配套的演示代码仓库。你可以让 Trae 或 Claude Code 帮你 git 克隆以下仓库：https://github.com/THU-SIGS-AIID/Project5-Supabase-Demos

如果你已经配置了 SSH 密钥，建议使用 SSH 地址进行克隆（git@github.com:THU-SIGS-AIID/Project5-Supabase-Demos.git），以提高安全性。如果 SSH 或 HTTPS 连接遇到网络问题，也可以直接在仓库页面点击“Download ZIP”获取压缩文件——解压后即可看到完整代码。

![](/zh-cn/stage-2/backend/database-supabase/images/image36.png)

克隆完成后，你也可以让 Trae 或 Claude Code 帮你启动项目。例如，直接在 智能体 界面中输入 `Help me start project 1 in this project`，或者复制要启动的项目的绝对路径并粘贴到大语言模型中直接启动。

## 3.2 项目 1 - 汉堡店菜单 CRUD

接下来，让我们进入动手实践部分——以 `project-burger-shop-menu-crud-1` 为例。我们将学习如何使用 SQL 脚本一键初始化 Supabase 数据库，并完成本地项目与 Supabase 数据库的连接配置，以便前端能够正确读写菜单数据。

### 使用脚本创建数据库

首先，我们需要在 Supabase 中创建相关数据表。在 Project 1 目录下，你会找到一个名为 `scripts` 的文件夹，其中包含一个 `init.sql` 数据库脚本文件。它可以帮助我们自动创建所有数据库相关资源（包括表结构、初始数据等）。我们将在数据库中频繁使用该文件进行表初始化。

```sql
......

-- ============================================================================
-- 2. Create Menu Items Table
-- ============================================================================

create table if not exists public.menu_items (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  category text check (category in ('burger','side','drink')) default 'burger',
  price_cents int not null check (price_cents > 0),
  available boolean default true,
  emoji text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Comments for documentation
comment on table public.menu_items is 'Burger shop menu items for CRUD demo';
comment on column public.menu_items.id is 'Unique identifier for each menu item';
comment on column public.menu_items.name is 'Display name of the menu item';
comment on column public.menu_items.description is 'Detailed description of the menu item';
comment on column public.menu_items.category is 'Category: burger, side, or drink';
comment on column public.menu_items.price_cents is 'Price in cents (integer) to avoid floating point issues';
comment on column public.menu_items.available is 'Whether the item is currently available for order';
comment on column public.menu_items.emoji is 'Optional emoji representation of the menu item';
comment on column public.menu_items.created_at is 'Timestamp when the item was created';
comment on column public.menu_items.updated_at is 'Timestamp when the item was last updated';

......
```

在 SQL 编辑器中执行初始化 SQL 脚本后，您可以在表编辑器中看到创建的数据表。数据库初始化代码的具体执行逻辑如下：

1. 创建 menu_items 表：
2. 该表存储汉堡店菜单上的所有商品。它包括字段如 name、description、price_cents（以分为单位的价格，以避免浮点精度问题）、category 和 available（是否可售）。这基本上涵盖了一件菜单项所需的所有信息。
3. 创建 promo_codes 表：
4. 该表管理促销活动，例如折扣码。它定义的字段包括 code（折扣码）、discount_type（折扣类型，如百分比或固定金额）、discount_value（折扣值）等。
5. 禁用行级安全（RLS）：
6. 为了便于开发和测试，脚本明确禁用了 RLS。然而，如前面所讲的 RLS 核心逻辑：RLS 是 Supabase 确保数据安全的一项重要功能，能够对“谁可以访问/修改哪些数据”进行细粒度策略控制（例如，仅允许管理员编辑促销代码，而普通用户只能查看菜单）。因此，在生产环境中，必须启用 RLS 并配置合理的策略，以在基础层面阻止未经授权的访问（例如，防止用户恶意修改他人创建的菜单或泄露促销代码规则）。
7. 插入种子数据：
8. 为了让前端项目在启动后即可显示真实的菜单和促销数据（无需手动输入测试数据），`init.sql` 脚本还向 `menu_items` 和 `promo_codes` 表插入了“种子数据”（示例数据）。例如，您可以看到各种汉堡、配菜、饮料以及多种折扣码。

### 设置数据库连接

数据库准备好后，我们需要将此前端项目连接到 Supabase，以便它可以正确地从数据库读取数据。我们需要将 Supabase 项目 URL 和匿名 key 写入指定配置中。本项目提供了两种灵活的配置方法：

1. 通过环境变量进行配置

在项目根目录创建一个 .env 文件，并填写您的 Supabase 凭据：

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

2. 在项目页面上直接设置

为了快速演示和在不同的 Supabase 项目之间切换，首页在右上角提供了一个设置按钮。你可以点击它，并在弹出模式中直接输入或粘贴 Supabase URL 和匿名密钥。

点击“保存”后，这些信息将用于动态创建一个 Supabase 客户端实例，如下面的代码所示：

```JavaScript
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// Optional client factory for demos: returns null when env is not set.
export function maybeCreateBrowserClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) return null;
  return createClient(url, anon);
}
```

创建数据库并填写相应的 Supabase 链接配置后，你将看到以下界面。你可以尝试添加、删除、查询和修改产品，并观察 Supabase 中对应数据表的变化。

![](/zh-cn/stage-2/backend/database-supabase/images/image37.png)

![](/zh-cn/stage-2/backend/database-supabase/images/image38.png)

### 作业

1. 尝试添加和删除现有条目，并在表格编辑器中查看修改操作对数据表内容变化的影响。

## 3.4 项目 2 - 汉堡店认证用户

项目 1 实现了“菜单 CRUD 数据库连接”。项目 2 引入了更接近真实业务的核心功能：用户认证（Auth）和行级安全（RLS）权限管理。

项目 2 包含一个独立的登录页面，支持用户通过“电子邮件 密码”登录。核心逻辑调用 Supabase Auth 的原生方法，快速实现认证流程，无需手动开发复杂的登录验证逻辑：

```
const { error: err } = await supabaseClient.auth.signUp({
  email,
  password,
  options: {
    data: {
      full_name: fullName || null,
      birthday: birthday || null,
      avatar_url: avatarUrl || null
    }
  }
});
```

![](/zh-cn/stage-2/backend/database-supabase/images/image39.png)

登录成功后，Supabase 会自动为用户创建会话，并在所有后续的数据库请求中自动携带认证信息。通过 RLS，每个用户只能看到基于其认证信息的自己的账户信息（购买的商品、剩余钱包余额），无法查看其他用户的账户信息。这实现了不同用户登录后的数据隔离——每个人只能看到自己的内容。

与项目 1 一样，你需要先使用 `init.sql` 初始化数据表（注意：如果遇到初始化错误，请先在表编辑器中删除已经创建的数据表，或者直接删除该 Supabase 项目并新建一个）。

在使用你的邮箱成功注册账户、在邮箱中确认注册并登录后，你将在商店界面看到如下内容：

![](/zh-cn/stage-2/backend/database-supabase/images/image40.png)

但此时，点击“admin”不会显示如下界面。你需要尝试找到在数据表中控制用户权限的部分，并将权限更改为 `admin`，这样你才能正确看到管理员界面的如下内容：

![](/zh-cn/stage-2/backend/database-supabase/images/image41.png)

值得注意的是，目前每次使用新邮箱注册时，都需要在邮箱中确认注册后才能登录。然而，这一步并非强制。你可以在 Supabase 的认证部分找到“登录 / 提供者”，点击“确认邮箱”来关闭强制邮箱确认。

![](/zh-cn/stage-2/backend/database-supabase/images/image42.png)

### 作业

1. 请先领取新手礼包并完成一次商品购买操作。
2. 尝试找到数据表中用户权限设置的位置，将权限更改为 `admin`，并在订单管理界面成功修改商品数量。
3. 尝试定位数据表中与钱包余额相关的表，并通过修改增加剩余钱包余额。

# 4. 构建你的第一个 Supabase 应用

在前几节系统学习后，你已经掌握了 Supabase 的核心功能（数据库操作、用户认证、RLS 安全策略）。现在是动手实践的时候，构建你的第一个具有数据库支持和用户登录系统的应用！

## 4.1 连接任意应用到 Supabase 数据库的标准流程

我们可以使用标准化的流程将任何应用连接到 Supabase 数据库：

1. 首先，整理需求并同步信息，明确目标并通知 AI
   1. 你需要向 AI 清楚描述当前应用的核心功能和新的数据库需求。例如：“我有一个本地的 React Todo 应用，数据只存在于浏览器本地存储。我需要增加‘云端数据同步’功能并连接到 Supabase 数据库。请帮我分析：这个应用涉及哪些数据操作（如添加待办、修改状态、删除待办）？需要创建哪些数据表来存储这些数据？”
   2. 添加关键约束（可选）：例如字段格式要求（时间戳使用 `timestamptz`，金额使用整数存储（以分为单位））、数据权限规则（仅自己可见），使 AI 的分析更贴合实际需求。
   3. 查看 AI 返回的结果。如果 AI 的方案有遗漏（如未考虑“待办截止日期”字段），需添加提示予以修正：“你遗漏了截止日期字段，请添加它。”
2. 根据确认的表结构，让 AI 生成适用于 Supabase 的 `init.sql` 脚本：“根据上面讨论的方法和表结构，返回一个可用于 Supabase 初始化的 init.sql 脚本。”然后你需要在 SQL 编辑器中执行该脚本。如果执行出错，将错误信息反馈给 AI，让它修复脚本。
3. 在 Supabase 中运行 init.sql 脚本后，让 AI 根据脚本重构当前代码，使其能正确与 Supabase 数据库交互：“请根据我的 SQL 脚本和上述设置重构项目代码，使其能与对应的 Supabase 数据库通信并处理数据。”
4. 完成重构后，你只需配置 Supabase 的 URL 和 key 参数（生产项目通常只使用环境变量配置），然后检查是否正常。如果没有问题，就说明成功将应用连接到 Supabase 数据库。
   1. 运行项目并测试所有数据库交互功能。前往 Supabase 的 Table Editor 以实时查看数据同步情况。
   2. 如果出现问题（如数据未插入，只看到部分数据），将问题详情反馈给 AI，让其诊断原因并修复代码。

此外，如果目标是开发用户登录页面，你可以直接让 AI 帮助集成登录页面：“现在需要帮我为该应用添加 Supabase 的用户登录系统，使用邮箱进行注册和登录。”你还需向 AI 明确页面导航逻辑和路径（例如登录成功后跳转系统首页，首页 URL 是什么，登录失败时停留在当前页面并显示错误信息）。集成完成后，需要尝试注册和登录，并验证是否能在 Supabase 的 Authentication 中看到新用户数据，同时能正确进入之前未登录无法访问的应用界面。

当然，你也可以让 AI 直接引用某个特定项目的实现，以迁移相应的 Supabase 功能。例如，如果某个项目使用了高级数据库和 Edge 功能功能，你可以直接让 AI 迁移类似的功能，具体如下：“请在本项目中引用与 Supabase 相关的功能实现逻辑{在此粘贴参考项目的绝对路径}，并为当前项目添加类似的实现逻辑（如用户登录、数据库管理、函数请求等）。”

## 4.2 案例研究：打造在线蛇类游戏

按照上述标准操作程序，我们来练习一个具体的真实案例：`Project5-Supabase-Demos/apps_snakegame` —— 为现有的“Snake”游戏项目添加得分排行榜，包括用户登录和基本数据库功能。

![]（/zh-cn/stage-2/backend/database-supabase/images/image43.png）

### 4.2.1 项目分析，识别数据需求

首先，类似于之前提到的标准化流程，我们可以向人工智能展示需求，让它根据我们的项目和需求提出修改计划。然后我们会在这个修改计划基础上进行扩展。

**你可以使用以下提示来引导AI：**

> “我有一个蛇类游戏，位于{粘贴蛇蛇游戏的绝对路径这里}。现在我想和Supabase结合，增加在线排行榜功能并支持用户登录系统。排行榜可以根据用户名和邮箱显示排名。
>
> 请帮我分析：实现这个功能需要创建哪些数据表？每个表应该包含哪些字段？”

此时，你会收到类似以下回复：

![]（/zh-cn/stage-2/backend/database-supabase/images/image44.png）

### 4.2.2 生成 `init.sql` 脚本

确认所需部分后，我们可以让AI生成数据库初始化脚本，准备在Supabase中执行：“请根据上述分析在项目中生成脚本/init.sql脚本，用于初始化Supabase所需的数据库。”

![]（/zh-cn/stage-2/backend/database-supabase/images/image45.png）

### 4.2.3 重构项目代码

接下来，我们只需要让AI根据之前的内容重构当前的Snake代码：“现在请使用Supabase实现基于之前想法和SQL表的排行榜功能。排行榜是一个独立页面，需要能够通过电子邮件和用户名区分不同用户的总分。你还需要支持基于电子邮件的用户登录系统——用户必须注册并登录才能玩这款游戏。”

如果当前的AI对话回合太多，你想重新开始项目重构会话，可以把上面提到的`init.sql`作为上下文，让AI根据SQL文件重构项目。

如果你发现AI的用户登录系统实现不正常，可以直接在提示中加入`Project5-Supabase-Demos/apps/project-burger-shop-auth-users-2`的地址，让AI基于该项目实现用户登录系统。还要确认连接Supabase的必要条件设置正确，以避免因Supabase配置错误而出错。

在代码修改过程中，如果实际效果与预期不符（例如排行榜数据未显示、登录验证失效等），只需完整记录该现象并反馈给 AI，逐步趋向正确结果。成功重构的标准是：用户能够成功完成注册和登录操作，登录后可以正确查看对应的游戏排行榜。

![]（/zh-cn/stage-2/backend/database-supabase/images/image46.png）

![]（/zh-cn/stage-2/backend/database-supabase/images/image47.png）

### 作业

1. 将用户管理系统集成到蛇游戏试玩版中。
2. 将用户管理系统集成到你的应用中（如果你之前开发过应用）。

# 5.成为苏帕巴斯大师

以上内容涵盖了Supabase的基本操作。在接下来的旅程中，我们将探讨Supabase的高级原理和功能。你将理解我们为何选择Supabase作为教学示例，以及如何利用Supabase实现更高级的操作，帮助你实现更复杂的交互功能。掌握这些功能后，即使面对Supabase以外的类似工具，你也能从更基础的层面上理解后端服务的核心原则。当然，你不需要在短时间内掌握所有内容——也许只需学习第三方登录支持就足够了。你可以先浏览以下内容，等项目遇到相应需求时再回来深入研究。

## 5.1 我们为何选择Supabase

在深入探讨高级话题之前，让我们先回顾这个问题：在众多可用的后端技术解决方案中，为什么我们最终选择了Supabase作为我们的技术基础？

初创团队在选择技术时常面临矛盾：他们希望完全掌控后台系统，但又必须快速推出产品。从零开始构建后端通常意味着花费数月时间建立具实时同步、用户认证、API服务、文件存储、定时任务、监控和警报及其他核心组件的数据库——除非团队成员在相关领域积累了丰富的实践经验。在资金不足和市场窗口狭窄的双重压力下，陷入基础设施的困境很容易导致迭代延迟和错失早期增长机会。

Supabase将这些后端功能打包为现成服务（PostgreSQL数据库、实时订阅、认证、对象存储、边缘功能、自动生成API等），使初创团队能够将有限资源集中于核心功能开发，避免因基础设施建设而上线速度放缓——这已成为当前风险投资环境中务实的生存策略。当然，我们也可以采用其他一体化后端产品进行开发，如PocketBase（轻量化且极简）和Appwrite（跨平台兼容）。然而，考虑到功能的完整性、SQL生态系统的成熟度以及GitHub社区的关注度，Supabase更适合支持企业的长期稳定运营。

在类似产品中，Supabase 的开源策略具有更大的优势。以市场份额更高的 Firebase 为例：其闭源性质容易导致平台锁定，迁移成本极高。Supabase 采用完全开源模式，支持私有部署，避免了供应商锁定风险，并允许根据需要切换到其他竞争产品。

总之，技术选择需要匹配业务规模和目标。对于个人项目或非常小规模的测试，像 PocketBase 这样超轻量级的解决方案就足够了。如果企业需要对接复杂的身份系统或满足上市公司合规审计要求，则像 WorkOS 这样的企业级完整身份治理解决方案更合适。但对于验证 MVP 并承担早期用户的核心业务场景，Supabase 的完整功能已经完全足够。它不仅可以独立支持至少一万用户规模，还可以灵活集成第三方服务，如 Stripe（支付）、Resend（邮件）和 Cloudflare（CDN）。即使未来业务需求扩展到企业级别，Supabase 的开源架构也可以与企业系统并行部署，不同功能使用最合适的平台。这种渐进式的灵活性使初创团队能够避免过早投资于庞大的基础设施，同时保留未来发展的空间。

## 5.2 Google 和 GitHub 登录支持

在前面的教程中，我们讲解了如何直接使用邮箱注册和登录。然而，在实际中，我们经常希望简化注册流程，例如使用 Google 和 GitHub 的第三方登录快速注册和登录系统。我们将在本教程部分覆盖每个细节。同时，一个完整的认证系统还必须提供安全可靠的密码重置功能，我们也将在本部分的项目中集成此功能。

这个项目 (`Project5-Supabase-Demos/apps/project-burger-shop-auth-advanced-supabase-6`) 完整展示了如何实现这些高级功能。

![](/zh-cn/stage-2/backend/database-supabase/images/image48.png)

### 5.2.1 OAuth 流程：第三方登录是如何工作的？

第三方登录的核心是 OAuth 2.0 开放授权协议。其本质是“授权代理”：允许用户授权我们的应用（汉堡店项目）访问他们在第三方平台（如 Google）的公开信息（例如邮箱、头像），而无需向我们的应用暴露第三方平台的密码，从根本上消除了密码泄露风险。

完整流程可以分为 5 个关键步骤，以 Google 登录为例：

1. 用户发起授权请求：用户在页面上点击“使用 Google 登录”按钮，我们的应用会自动将用户重定向到 Google 官方授权页面（确保授权过程的安全性，避免钓鱼风险）。
2. 用户完成第三方授权：用户在 Google 页面登录其账号（验证用户身份）并同意我们应用请求的权限（例如“获取电子邮件地址”）。
3. Google 返回一次性授权码：授权通过后，Google 会将用户重定向回我们事先约定的“回调 URL”，并在 URL 参数中附带一次性、短期有效的授权码（而不是直接返回用户信息，进一步增强安全性）。
4. Supabase 交换获取访问令牌：我们的后端（由 Supabase 托管，无需自行构建）使用此授权码向 Google 官方接口请求，将其交换为可获取用户信息的访问令牌（授权码仅用于换取令牌，避免在前端直接传输令牌）。
5. 创建账号并建立会话：Supabase 使用访问令牌从 Google 获取用户的公开信息（如邮箱、头像），并在我们的项目中自动为该用户创建账号（首次登录）或直接关联至已有账号，最终生成有效用户会话（Session），完成登录。

![](/zh-cn/stage-2/backend/database-supabase/images/image49.png)

### 5.2.2 配置 Google Cloud 获取客户端 ID 和密钥

无论采用哪种第三方登录方式，我们通常都需要获取客户端 ID 和密钥进行配置。对于 Google 第三方登录，首先需要在 Google Cloud 平台创建一个 OAuth 2.0 客户端 ID，以获取相应参数。

1. **访问 Google Cloud 控制台**：
2. 前往 [Google Cloud Console](https://console.cloud.google.com/)。
3. 创建一个新项目或选择已有项目。
4. **配置 OAuth 同意屏幕**：
5. 在左侧导航栏找到“API 与服务”->“OAuth 同意屏幕”。
6. 选择“外部”用户类型，然后点击“创建”。
7. 填写应用名称、用户支持邮箱及其他必填信息。
8. 在“授权域名”部分，添加您的 Supabase 项目域名，格式为 `*.supabase.co`。
9. 保存并继续。您可以暂时跳过“权限范围”和“测试用户”步骤，只需保存即可。
10. **创建凭证**：
11. 进入“API 与服务”->“凭证”。
12. 点击“创建凭证”并选择“Oauth 客户端 ID”。
13. 在“应用类型”中选择“Web 应用程序”。
14. 为其命名，例如“Supabase Auth”。
15. 在“授权重定向 URI”部分，点击“添加 URI”并输入您的 Supabase 项目的回调 URL。您可以在 Supabase 仪表板的“认证”->“提供商”->“Google”中找到该 URL，其格式通常为 `https://<your-project-id>.supabase.co/auth/v1/callback`。
    ![](/zh-cn/stage-2/backend/database-supabase/images/image50.png)
16. 点击“创建”。
17. **获取客户端 ID 和客户端密钥**：
18. 创建成功后，会弹出窗口显示您的 **客户端 ID** 和 **客户端密钥**。请务必 **立即复制并保存**。

### 5.2.3 配置 GitHub 获取客户端 ID 和密钥

同样，您也需要在 GitHub 上注册 OAuth 应用。

1. **前往GitHub开发者设置**：
   1. 登录你的GitHub账户。
   2. 点击右上角的头像，进入“设置”。
   3. 在左侧导航栏底部，找到“开发者设置”。

2. **注册新申请**：
3. 选择“OAuth 应用”并点击“新 OAuth 应用”。
4. 填写申请名称，如“我的汉堡店”。
5. **主页网址**：输入应用的实时网址或本地开发网址`http://localhost:3000`。
6. **授权回调URL**：输入你Supabase项目的回调URL。同样，你可以在Supabase仪表盘的“认证”->“提供者”->“GitHub”中找到。格式为`https://<your-project-id>.supabase.co/auth/v1/callback`。
7. 点击“注册申请”。
8. **获取客户端ID和客户端秘密**：
9. 注册成功后，页面将显示您的**客户ID**。
   ![]（/zh-cn/stage-2/backend/database-supabase/images/image51.png）
10. 点击“生成新客户端秘密”以生成你的**客户端秘密**。同样，**立即复制并保存**。

### 5.2.4 在 Supabase 中配置提供者

现在，让我们把获得的凭证配置进Supabase。

1. **前往Supabase Dashboard**：
2. 选择你的项目，进入“认证”->“提供者”。
3. **启用并配置 Google**：
4. 找到“Google”并启用它。
5. 将你从谷歌云获得的**客户端ID**和**客户端秘密**粘贴到相应的输入字段中。
6. 点击“保存”。
7. **启用并配置GitHub**：
   1. 找到“GitHub”并启用它。
   2. 将你从 GitHub 获得的 **Client ID** 和 **Client Secret** 粘贴到相应的输入字段中。
   3. 点击“保存”。

![]（/zh-cn/stage-2/backend/database-supabase/images/image52.png）

此时，你已经可以使用第三方账户登录你搭建的网站。你可以直接让 AI 引用 `Project5-Supabase-Demos/apps/project-burger-shop-auth-advanced-supabase-6` 项目，支持项目中的用户登录系统，将用户登录界面与 GitHub 和 Google 认证集成，成本极低。

### 5.2.6 密码重置实现

作为一个成熟的用户登录组件，密码重置也是关键部分。本项目（`project-burger-shop-auth-advanced-supabase-6`）也包含了该功能的完整实现。你可以直接让AI基于本项目的密码重置功能复制完整的密码重置组件。主要步骤如下：

1. 启动请求：用户在忘记密码页面输入邮箱，前端调用 `supabase.auth.resetPasswordForEmail()` 函数，指定重定向 URL（如 /auth/reset）。
2. 发送邮件：Supabase 发送包含唯一重置链接的邮件至该邮箱地址。
3. 访问链接：用户点击邮件中的链接，会被重定向到应用程序内指定的重置页面。
4. 更新密码：在重置页面，用户输入新密码。前端调用 `supabase.auth.updateUser()`，向 Supabase 提交新密码。Supabase 会自动验证链接的有效性并完成密码更新。

最后，如果你觉得当前的密码重置邮件太基础，可以在 Supabase 仪表盘的认证 - >邮件模板下自定义“重置密码”邮件模板。

除了重置密码功能外，你还会看到许多与用户管理相关的高级设置（如邀请用户等）。你可以参考每个功能的开发文档，并用 Vibe 编程工具自行添加相应功能。

![]（/zh-cn/stage-2/backend/database-supabase/images/image53.png）

## 5.3 实时功能

Supabase 的实时功能是其最强大的特性之一，为构建协作文档、实时仪表板、游戏大厅或客户服务系统提供了极大的便利。

本项目 (`Project5-Supabase-Demos/apps/project-burger-shop-realtime-orders-3`) 通过构建多人实时聊天室和光标位置共享功能，展示了 Supabase Realtime 的三大核心能力——数据库变更监听（Postgres Changes）、广播（Broadcast）和在线状态（Presence）。

![](/zh-cn/stage-2/backend/database-supabase/images/image54.png)

如果你觉得相关代码部分有些困难，可以直接让 AI 参考本节的文档内容来修改你的程序。

### 5.3.1 使用 Postgres Changes 实时数据库变更

最常用的 Realtime 功能是通过 Postgres Changes 对数据库变更进行实时监控。它允许客户端订阅特定表、特定行甚至特定列的 INSERT、UPDATE 或 DELETE 事件。一旦数据库发生变更（无论是通过 API 调用、Supabase 仪表盘操作还是 SQL 脚本执行），Supabase 将利用 PostgreSQL 底层的复制机制，立即通过 WebSocket 将变更的数据推送给订阅了该通道的所有前端客户端，无需前端重复轮询。

通常，可以在表编辑器中找到“启用实时”并点击来开启此功能，但通过 SQL 脚本初始化会更加方便。例如：

```sql
-- Enable realtime replication
ALTER TABLE public.chat_messages REPLICA IDENTITY FULL;
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime'
      AND schemaname = 'public'
      AND tablename = 'chat_messages'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_messages;
  END IF;
END $$;
```

此语句将 `chat_messages` 表添加到 Supabase 的预设 `supabase_realtime` 发布中。一旦将表添加到这个特殊的 `publication`，Supabase 的实时服务器就会开始监听其所有数据更改。

基于上述特殊数据表，我们可以使用监听代码实时监控表中的数据变化。我们需要实现的是，当一个用户发送消息时，所有其他在线用户可以立即在他们的屏幕上看到。这可以通过订阅 chat_messages 表的 INSERT 事件来实现。

```typescript
    const sub = supabase
      .channel('chat_messages_channel')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'chat_messages'
      }, (payload: any) => {
        console.log('New message received:', payload.new);
        const newMessage = payload.new as Message;
        // ... //
      .subscribe((status: string) => {
        console.log('Chat subscription status:', status);
      });
```

- `.channel('chat_messages_channel')`：创建一个独立的通信通道。  
- `.on('postgres_changes', ...)`：这是核心订阅方法。我们告诉 Supabase 我们只对 `chat_messages` 表上的 `INSERT` 事件感兴趣。  
- `payload.new`：当数据库中插入新消息时，Supabase 会通过 `payload.new` 将这些新数据的完整内容推送给所有已订阅的客户端。  
- `.subscribe()`：启动订阅。  

### 5.3.2 消息广播与同步：Broadcast & Presence

对于不需要存储在数据库中的“即时”交互，例如光标移动和在线状态，Supabase 提供了 Broadcast 和 Presence 功能。  

- Presence：用于跟踪通道内所有客户端的**共享状态**。非常适合实现“谁在线”的功能。  
- Broadcast：用于向通道内的其他所有客户端发送**低延迟**的**临时消息**。  

Presence 的核心理念是：让每个客户端声明自己的在线状态，而 Supabase 的服务器负责可靠地将这些状态同步给通道内的所有其他客户端。实现 Presence 需要以下关键步骤：  

1. 创建支持 Presence 的通道  

首先，我们创建一个名为 `lobby_presence` 的通道，专门用于处理这些交互，并在配置中指定一个唯一键来标识当前用户。此键通常是用户的 ID。

```
const ch = supabase.channel
('lobby_presence', {
  config: {
    presence: { key: anonymousUser.id },
  }
});
```

2. 订阅频道并宣布“我在线”

频道创建后，我们需要订阅它。在成功订阅的回调中（status === 'SUBSCRIBED'），我们调用 channel.track() 方法。此方法将当前用户的信息（例如用户ID、姓名、头像颜色等）广播给频道中的所有其他客户端，声明他们的“在线”状态。

```
const me = {
  id: anonymousUser.id,
  name: anonymousUser.name,
  color: anonymousUser.color
};

ch.subscribe(async (status) => {
  if (status === 'SUBSCRIBED') {
    await ch.track(me);
  }
});
```

3. 同步完整的在线列表

当新用户加入频道时，他们需要获取当前所有在线用户的列表。这可以通过监听 presence 同步事件来实现。同步事件在你首次加入频道时触发，为你提供完整的“快照”。

channel.presenceState() 方法返回一个对象，包含频道中所有当前在线用户的状态信息。我们处理这些信息并更新应用的状态，以呈现完整的在线用户列表。

```
ch.on('presence', { event: 'sync' }, () 
=> {
  const state = ch.presenceState();
  const flat = {};
  Object.values(state).forEach((arr) => {
    arr.forEach((u) => { flat[u.id] = 
    { ...u }; });
  });
  setOnline(flat);
});
```

4. 监听单个用户的加入和离开

除了同步事件，我们还可以监听加入和离开事件，以便在新用户进入或离开时立即作出响应，例如显示“用户已加入”通知。

```
ch.on('presence', { event: 'join' }, ({ 
key, newPresences }) => {
  console.log('User joined:', key, 
  newPresences);
});

ch.on('presence', { event: 'leave' }, ({ 
key, leftPresences }) => {
  console.log('User left:', key, 
  leftPresences);
});
```

通过上述步骤，我们已经构建了一个功能完善的在线状态系统。Supabase 会自动处理用户意外断开连接的情况（例如关闭浏览器或网络中断），并在合适的时间触发离开事件，从而确保在线列表的准确性。

Presence 告诉我们“谁在线”，而 Broadcast 则使他们之间能够“对话”，但对话内容是短暂存储的。一个典型例子是实时光标跟踪。如果每一次鼠标移动都导致数据库的读取和写入，将会造成巨大的性能浪费和延迟。Broadcast 完美解决了这个问题——它允许消息通过 WebSocket 直接在客户端之间传递，完全绕过数据库。

Broadcast 的工作模式主要依赖两个核心方法：channel.send() 用于发送，channel.on() 用于接收。

1. 发送端：广播我的光标位置

我们为 mousemove 事件添加一个监听器。当鼠标移动时，我们构建一个包含用户 ID、坐标和颜色的负载，然后通过 channel.send() 进行广播，并将事件名称指定为 'cursor'。

```typescript
const handleMouseMove = (e) => {
  const payload = {
    id: anonymousUser.id,
    x: e.clientX,
    y: e.clientY,
    name: anonymousUser.name,
    color: anonymousUser.color
  };

  channelRef.current?.send({
    type: 'broadcast',
    event: 'cursor',
    payload
  });
};

document.addEventListener('mousemove', handleMouseMove);
```

2. 接收方：监听并渲染其他人的光标

在同一频道内，所有客户端使用 channel.on() 来监听带有事件 'cursor' 的广播类型消息。一旦接收到匹配的消息，就会触发回调函数。我们从负载中解析发送方的数据，并使用这些数据更新本地在线状态，从而实时在屏幕上渲染其他用户的光标位置。

```typescript
ch.on('broadcast', { event: 'cursor' }, ({ payload }) => {
  setOnline((prev) => ({
    ...prev,
    [payload.id]: {
      ...(prev[payload.id] || {}),
      x: payload.x,
      y: payload.y
    }
  }));
});
```

通过这种方法，Presence 和 Broadcast 协同工作；Presence 用于维护在线用户列表，而 Broadcast 负责在这些用户之间传输瞬态状态，如光标位置，从而最终以较低成本实现丰富的实时交互功能。

## 5.4 存储

除了可以明确界定的结构化数据，如用户信息和订单外，一个完整的应用通常还需要处理大量非结构化文件——例如用户头像、产品展示图片以及用户上传的订单文档。这类文件的特点是大小不一且数量可能极其庞大（例如一个电商平台的产品图片可能有数十万或上百万张）。如果直接存储在应用自身的业务服务器上，会显著增加服务器存储负载，可能降低数据读写速度，并影响整体应用性能。

在实际开发中，这些非结构化文件通常由“对象存储服务”（Object Storage Services, OSS）统一管理。OSS 和 Amazon S3 都是此类服务的例子。它们是专门为大规模文件存储设计的“专业存储工具”，能够高效地处理文件存储、备份和快速检索需求。当我们在应用中访问这些文件时，不是直接从对象存储服务的“底层仓库”获取，而是使用 URL 地址：每个存储在对象存储中的文件都会被分配一个唯一的 URL（类似“https://xxx.oss.com/avatar/user123.jpg”的地址——可以把这个“网站”看作只有一张图片）。这个 URL 就是文件的“专用访问地址”。前端页面只需使用这个地址即可直接下载或加载头像和产品图片，无需依赖应用的业务服务器作为中间层，既提升了文件加载速度，也减轻了业务服务器的负载。

本项目(`project-burger-shop-storage-uploads-4`)通过用户头像上传功能，深入展示了如何使用 Supabase Storage 构建现代文件上传系统，让开发者直观理解从上传非结构化文件到通过 URL 访问文件的完整流程。此外，本项目使用 `Uppy` 库提供优秀的文件上传界面，并结合 `Tus` 插件实现可断点续传，通过将 Uppy 的上传端点指向 Supabase 的标准 API(`<supabaseUrl>/storage/v1/upload/resumable`)。你可以参考这种类似的方法来实现上传功能组件。

![](/zh-cn/stage-2/backend/database-supabase/images/image55.png)

![](/zh-cn/stage-2/backend/database-supabase/images/image56.png)

### 5.4.1 存储桶

Supabase Storage 的组织单元是存储桶（Storage Bucket）。你可以把它理解为计算机操作系统中的一个文件夹。每个存储桶可以有独立的安全策略和配置。

存储中的所有文件都可以通过公共 URL 直接访问，但这并不意味着任何人都可以随意上传或修改文件。具体的访问权限由更细粒度的策略控制。与数据库类似，Storage 的访问权限通过行级安全（Row Level Security, RLS）策略来管理。SQL 策略写在两个特殊表：storage.objects 和 storage.buckets 上，可以精确地定义谁可以读取（SELECT）、上传（INSERT）、更新（UPDATE）或删除（DELETE）文件。

例如，我们可以创建一个策略，只允许用户上传到以其 user_id 命名的文件夹，并且只允许上传图像文件类型：

```
CREATE POLICY "Allow authenticated 
uploads to avatars bucket"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'avatars' AND
  auth.uid() = (storage.foldername(name))
  [1]::uuid AND
  (storage.extension(name) IN ('png', 
  'jpg', 'jpeg'))
);

CREATE POLICY "Allow public read access 
to avatars"
ON storage.objects FOR SELECT
USING ( bucket_id = 'avatars' );
```

### 5.4.2 获取可访问的文件 URL

本项目要求您手动创建一个名为“avatars”的公共存储桶。所有文件都将上传并存储在此公共存储桶中。文件上传成功后，我们只会获得它在存储中的路径，例如 `public/avatar1.png`。这只是存储在数据库中的一个字符串。为了让浏览器能够渲染此图像，我们需要将其转换为可访问的 HTTP URL。

Supabase 提供了两种截然不同的获取 URL 的策略，它们在安全性、持久性和成本控制上有根本区别。

#### 1. 公共 URL - 永久链接

这是最直接的方法。如果您的文件存储在**公共存储桶**中，您可以获得一个固定的、永久的公共链接。

```typescript
const { data } = supabase.storage
  .from('avatars')
  .getPublicUrl('public/avatar1.png');
const publicUrl = data.publicUrl;
```

这些链接有两个核心特征：首先，它们简单直接——其 URL 结构是固定的，使得在实践中容易进行拼接和管理，降低了技术门槛。其次，它们易于缓存——作为永久链接，可以被 CDN（内容分发网络）和浏览器有效缓存，从而显著提高资源访问速度，优化用户体验。基于这些特性，它们适用于真正的公共资源场景，例如网站徽标、产品目录图片以及博客文章插图，能够有效满足此类资源的访问和管理需求。

然而，在生产环境中，这些链接存在明显的带宽盗用（热链接）风险。由于链接是永久公开的，外部方可以轻松地将你的图片链接嵌入到自己流量高的网站中，从而非法消耗带宽。这种行为会为你的 Supabase 项目产生大量不必要的流量费用，而且消耗的带宽并没有服务于你的应用——这是典型的成本浪费，需要在生产环境中高度防范。因此，我们需要转向临时签名 URL 来对外暴露资源。

#### 2. 签名 URL - 临时授权链接

为了解决公共 URL 的安全性和成本问题，Supabase 提供了一种生成临时签名 URL 的方法。这是大多数在线应用推荐的最佳实践，例如为用户生成限时图片查看链接的文本生成图像应用、仅允许下单用户获取临时发票下载地址的电商平台，以及为订阅用户提供短期课程播放链接的付费内容平台——防止文件被盗或带宽被滥用，适应性极强。

```typescript
const { data, error } = await supabase.storage
  .from('avatars')
  .createSignedUrl('private/user-invoice.pdf', 3600); // Link valid for 3600 seconds (1 hour)
const signedUrl = data?.signedUrl;
```

临时签名 URL 有三个核心优势：安全性和可控性意味着链接具有安全标识和有效期——一旦过期，就无法使用。权限绑定很简单——只有有权限查看文件的人才能生成此链接，即使文件存储在私有存储桶中，他们也可以通过此链接正常打开文件。防止带宽被滥用是因为链接是临时的——如果被复制到其他地方，很快就会过期，无法用于恶意带宽滥用。得益于这些优势，需要权限管理的文件，如用户头像、私人照片、付费内容和订单发票，都可以使用这种方式。

从安全性和成本控制的角度来看，建议养成优先使用临时签名 URL 的习惯。只有当资源确实需要永久公开且不受限制访问时（例如应用的公共 Logo、公开活动宣传图片等），才考虑使用公共 URL。这样可以在满足特定业务需求的同时，最大限度地降低不必要的风险和成本消耗。

## 5.5 Edge Functions

Edge Functions 是无服务器（serverless 架构）生态系统中最核心且有价值的形式之一，为“无需自建后端”的场景提供轻量、高效的函数执行支持。

什么是无服务器？无服务器（serverless 架构）并不意味着没有服务器，而是意味着开发者无需关心服务器的购买、运维、配置和扩展。你只需编写业务代码（函数），当特定事件触发时，云服务商会自动分配资源运行代码，并按实际运行时间计费。

当你的应用需要执行无法或不应在客户端（浏览器）完成的逻辑时——例如调用需要私钥的第三方 API、执行计算密集型任务或强制执行复杂的业务规则——Edge Functions 就派上用场。Supabase Edge Functions 基于 Deno 和 TypeScript 构建，部署在全球边缘节点，物理上接近用户，提供极低的函数执行延迟。

目前主流云服务提供商都推出了自己的 Edge Function 服务。常见的有：

- AWS Lambda@Edge：AWS Lambda 扩展出的边缘函数服务，可与 CloudFront CDN 配合使用，支持 Node.js、Python 等语言。
- Cloudflare Workers：Cloudflare 的边缘函数，部署在其全球 275 个边缘节点，支持 JavaScript/TypeScript，以“毫秒级延迟”为核心优势。
- Vercel Edge Functions：为 Vercel 前端项目适配的边缘函数，与 Next.js 深度集成，支持 TypeScript，注重“前端与边缘逻辑的无缝连接”。

回到 Supabase，当你的应用需要执行“客户端（浏览器）无法完成的逻辑”时——例如调用带私钥的第三方 API（如 LLM 接口）、处理计算密集型任务（如图像压缩）或执行权限检查（如文件访问规则）——Supabase Edge Functions 可以派上用场。基于 Deno 运行时和 TypeScript 构建，部署在全球边缘节点，实现“物理接近用户”的极低执行延迟，是编写自定义可信任服务端逻辑的核心工具。

该项目 (`Project5-Supabase-Demos/apps/project-burger-shop-edge-function-5`) 通过与大型语言模型 (LLM) 的实时流式聊天功能演示了 Edge Functions 最简单的应用流程。

![](/zh-cn/stage-2/backend/database-supabase/images/image57.png)

### 5.5.1 LLM 聊天案例分析

假设你想在应用中集成一个类似 ChatGPT 的聊天机器人。你需要在服务器端调用 OpenAI 的 API，这需要一个私密的 API Key。该 Key 绝对不能暴露在前端代码中，否则任何人都可以通过查看网页源代码窃取你的 Key，从而产生高额费用。这正是 Edge Functions 发挥作用的地方。我们将创建一个名为 "llm-chat" 的函数，作为前端与 OpenAI API 之间的安全代理。

请参考 `project-burger-shop-edge-function-5/scripts/llm-chat.ts` 中的代码。让我们看看它是如何工作的：

```typescript
// scripts/llm-chat.ts
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { OpenAI } from "npm:openai";

const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");

Deno.serve(async (req) => {
  try {
    const openai = new OpenAI({ apiKey: OPENAI_API_KEY });
    const { prompt } = await req.json();

    const stream = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      stream: true,
    });

    return new Response(stream.toReadableStream(), {
      headers: { "Content-Type": "text/event-stream" },
    });
  } catch (err) {
  }
});
```

在这种情况下，关于密钥安全，OPENAI_API_KEY 被安全地存储在 Supabase 服务器的环境变量中。本地前端代码完全无法访问此密钥，有效地保证了密钥的安全性。

### 5.5.2 创建和部署函数

Supabase 提供了一个非常用户友好的界面，让您无需接触命令行即可完成部署。

1. **进入 Edge Functions 面板**：
2. 登录您的 Supabase 项目仪表板。
3. 在左侧导航栏中，点击类似代码的图标进入“Edge Functions”。
4. **创建新函数**：
5. 点击“创建新函数”按钮。
   ![](/zh-cn/stage-2/backend/database-supabase/images/image58.png)
6. 为函数命名，例如 `llm-chat`。
7. **粘贴代码**：
   ![](/zh-cn/stage-2/backend/database-supabase/images/image59.png)
8. 在弹出的在线编辑器中，**删除所有默认占位代码**。
9. 打开本地 `llm-chat.ts` 文件并**复制其全部内容**。
10. **将复制的代码粘贴**到 Supabase 在线编辑器中。
11. **配置环境变量（Secrets）**：
    1. 在侧边栏找到 Secrets。
       ![](/zh-cn/stage-2/backend/database-supabase/images/image60.png)
    2. 名称：输入 `OPENAI_API_KEY`。
    3. 值：粘贴您自己的 OpenAI API Key。
    4. 点击“保存”。在此设置的 Secret 会被加密存储，并安全地注入到函数的运行环境中。

如果函数需要更新，记得在 Edge Function 部分执行“部署更新”。Supabase 会在云中构建并部署此函数。几分钟内，您的函数即可在线访问。

除了作为语言模型的安全代理之外，Edge Functions 的应用场景远不止于此。实际上，任何需要服务端逻辑处理的任务，无论是简单的 API 调用、数据验证，还是更复杂的计算，都可以通过 Edge Functions 实现。它为您提供了轻量级、可扩展的后端，而无需管理任何服务器基础设施。

如果您想探索更多可能性，可以参考项目中的其他示例。例如：

- 图像生成 (txt2img.ts)：此函数演示了如何使用 Edge Functions 调用第三方文本生成图像 API（如 Stability AI、Midjourney 等）以动态生成图像。这是典型的计算密集型或安全的外部服务调用场景。与 llm-chat 案例类似，API 密钥安全地存储在 Supabase 后端，前端只发送文本描述，然后接收并显示生成的图像——整个过程安全且高效。
- 发送邮件 (send-email.ts)：在应用中发送欢迎邮件、交易通知或密码重置邮件是一项常见需求。send-email.ts 示例展示了如何通过 Edge Functions 集成邮件服务（如 Resend、SendGrid）。您无需在客户端代码中暴露敏感的邮件服务 API Key——只需创建一个函数，让前端通过调用该函数触发邮件发送。