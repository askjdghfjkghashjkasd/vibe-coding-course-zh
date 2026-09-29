# 缓存原则：策略与模式
::: 提示 🎯 核心问题
**为什么有些网站加载时间是50毫秒，而有些网站只需5秒？**这就像问：为什么从背包里拿书只需1秒，而去图书馆找书却需要10分钟？答案是——缓存。本章将深入探讨缓存的核心原则、设计模式和实用技巧，帮助你将系统性能提升100倍。
:::

---

## 1.卡钦的动机

### 1.1 从“每次查询”到“记住常用数据”的演变

在计算机的早期，程序员每次需要数据都会查询硬盘或数据库。这就像翻阅教科书，查找每个数学问题的公式——准确，但效率极低。随着系统规模扩大，这种“每次查询”方法开始暴露出严重问题：数据库CPU飙升至95%，响应时间从100毫秒激增至8秒，最终系统全面崩溃。

这就像学生每天跑50次，从宿舍跑到图书馆查找参考资料，最终在半路上累垮。解决办法很简单：背包里放一本常用公式笔记本，先检查背包，而不是每次都跑去图书馆。缓存是计算机系统的“公式笔记本”——它把常用数据存储在快速访问的地方，这样系统就不用每次都去“图书馆”（数据库）。

<div style=“display： flex; gap： 20px; margin： 20px 0;”>
<div style=“flex： 1;填充：16px;border： 1px 实心 #e4e7ed;border-radius： 12px;”>

** 🐌 无缓存**
- 每个请求都进入数据库
- 数据库CPU使用率95%
- 响应时间 5–8 秒
- 系统易崩溃

</div>
<div style=“flex： 1;填充：16px;border： 1px 实心 #e4e7ed;border-radius： 12px;”>

** 🚀 带缓存 **
- 95%的请求直接返回
- 数据库 CPU 使用率 < 20%
- 响应时间：50毫秒
- 系统运行稳定

</div>
</div>

**这就是缓存解决的核心问题：通过存储常用数据的副本，它减少了对慢存储（数据库）的访问，使系统更快更稳定。**

<缓存性能比较演示 />

### 1.2 案例：缓存是救命稻草

你可能会想：“我的系统现在没问题，为什么要提前设计缓存？”让我讲个真实的故事，让你明白缓存不是“可选”而是“强制”的。

::: 警告 阿强数据库崩溃
阿强是一家初创公司的全栈工程师，正在开发一款社交应用。早期，只有几百名用户，系统运行流畅。阿强认为不需要缓存——直接查询数据库即可。

六个月后，用户数增长到10万。有一天，一位名人在应用上发布了帖子，立刻涌入了10万用户。数据库崩溃：CPU达到100%，响应时间从100毫秒降至30秒，整个应用崩溃，导致大量用户流失。

事后分析：如果有一个简单的缓存层（比如Redis）来缓存趋势帖子，数据库负载至少会下降95%，系统也能轻松应对流量激增。

阿强学到了一个沉痛的教训：**缓存不是可有可无的，它是高并发系统的生命线。没有缓存就像开车不系安全带——大多数时候没事，但出了问题可能要命。**
:::

::: info 💡 关键启示
缓存的价值不仅仅是“更快”——更重要的是“保护”。它保护数据库免于被压垮，并在高流量情况下保持系统稳定。设计系统时，不要等到出问题才考虑缓存——从第一天起就把它作为架构的核心部分。
:::

---

## 2. 核心概念：缓存概览

::: tip 🤔 缓存到底是什么？
简单来说，**缓存是数据副本的存储空间**。就像在桌子上贴一张便利贴，上面写着经常拨打的电话号码，这样每次就不用翻手机联系人列表。

**三个要点**：
1. **复制**：缓存中的数据是原始数据（数据库中的数据）的副本，而不是主数据
2. **快速访问**：缓存通常在内存中，读取速度比硬盘快 100,000 倍
3. **容量有限**：缓存空间有限——只能存储最常用的数据

所以，**缓存就是用空间换时间**——牺牲一些内存空间来换取极快的数据访问速度。
:::

在深入具体技术之前，我们需要明确一些核心概念。为了帮助理解，我们用“学生书包”来类比缓存系统。

### 2.1 通过“书包类比”理解核心缓存概念

想象你是一个每天都需要查各种参考资料的学生，这个过程和缓存系统的工作方式非常相似：

| 概念 | 🎒 书包类比 | 技术含义 | 现实示例 |
|------|-----------|----------|----------|
| **缓存命中** | 你需要的公式正好在便利贴上 | 请求的数据在缓存中找到 | 查询用户信息——Redis 中存在，直接返回 |
| **缓存未命中** | 便利贴上没有，只能翻书 | 请求的数据不在缓存中 | 查询用户信息——Redis 中没有，必须查询数据库 |
| **命中率** | 100 次查公式，有 95 次在便利贴上 | 缓存命中的比例 | 95% 的命中率意味着 95% 的请求都不触碰数据库 |
| **TTL（存活时间）** | 在便利贴上写“3 天后撕掉” | 缓存条目的过期时间 | 设置用户信息缓存 30 分钟后自动过期 |
| **驱逐** | 书包满了——扔掉最旧的便利贴 | 缓存满时删除旧数据 | Redis 内存满——自动删除最少使用的数据 |

### 2.2 缓存命中 vs. 缓存未命中

缓存命中和未命中之间的性能差异巨大。来看具体数字：

| 操作 | 响应时间 | 相对速度 | 适用场景 |
|---------|---------|----------|----------|
| **CPU L1 缓存** | ~0.5 纳秒 | 最快（基准） | CPU 内部操作 |
| **内存读取** | ~100 纳秒 | 慢 200 倍 | 本地缓存（如 Caffeine） |
| **Redis 查询** | ~1 毫秒 | 慢 2,000,000 倍 | 分布式缓存 |
| **MySQL 查询** | ~10 毫秒 | 慢 20,000,000 倍 | 基于磁盘的数据库查询 |

::: tip 📊 从这个表中你能看出什么？
**性能差距令人震惊**：内存操作比 MySQL 查询快 100,000 倍！就像从你的桌子上拿一本书（1 秒）和去图书馆找它（100,000 秒，约 28 小时）之间的区别。

**三层性能阶梯**：
1. **本地缓存（内存）**：最快，但容量小——适合热点数据
2. **Redis 缓存**：速度中等，容量大——适合分布式场景
3. **数据库**：最慢，但容量无限——最终的真实数据来源

**实际启示**：你的系统应从缓存层响应超过 95% 的请求，少于 5% 的请求需要访问数据库。这可以保持数据库负载低，同时提升整体系统性能。
:::

::: details 🔍 真实代码：缓存命中 vs. 缓存未命中
让我们用代码比较这两种情况：

```javascript
// Scenario: querying user information

// ===== Cache Hit =====
// 1. Check Redis cache first
const userFromCache = await redis.get('user:123')
if (userFromCache) {
  // Hit! Return directly, ~1 millisecond
  return JSON.parse(userFromCache)
}

// ===== Cache Miss =====
// 2. Not in cache, query the database
const userFromDB = await db.query('SELECT * FROM users WHERE id = 123')
// Miss! Must query database, ~10 milliseconds, 10× slower

// 3. Write to cache after querying, so next time it hits
await redis.set('user:123', JSON.stringify(userFromDB), 'EX', 1800)
return userFromDB
```

**关键要点**：
- 缓存命中：1 毫秒返回 —— 极佳的用户体验
- 缓存未命中：10 毫秒返回 —— 用户体验略差
- **缓存的价值**：将未命中转化为命中可带来 10 倍的性能提升
:::

### 2.3 缓存生命周期

缓存条目从创建到销毁会经历完整的生命周期。理解这一过程对于设计缓存系统至关重要。

**四个阶段**：

**阶段 1：写入**
- **主动写入**：在系统启动时将热点数据预加载到缓存（缓存预热）
- **延迟加载**：首次访问时从数据库加载并写入缓存（最常见）

**阶段 2：命中 / 未命中**
- 每个请求首先检查缓存
- 命中 → 直接返回；未命中 → 查询数据库

**阶段 3：过期**
- **TTL（生存时间）**：为缓存条目设置寿命（例如 30 分钟）
- 到期后，缓存条目会自动失效；下一次访问必须重新加载

**阶段 4：驱逐**
- 缓存空间有限 —— 当缓存满时，必须删除旧数据
- 常用驱逐策略：
  - **LRU（最近最少使用）**：驱逐最久未访问的数据（最常见）
  - **LFU（最不经常使用）**：驱逐访问频率最低的数据
  - **FIFO（先进先出）**：驱逐最早写入的数据

👇 **自己试试**：
下面的演示展示了缓存生命周期。点击“添加缓存”，观察缓存条目如何经历写入、命中、过期和驱逐的完整过程：

<CacheLifecycleDemo />

---

## 3. 缓存的演进：从单机到分布式

::: tip 🤔 为什么我们需要不同类型的缓存？
就像你在学习时将参考资料保存在不同地方：最常用的放在桌面上（便签），常用的放在书包里（笔记本），所有资料都在图书馆（书架）。

**缓存系统也是如此**：
- **本地缓存（桌面）**：最快，容量小 —— 用于超热点数据
- **分布式缓存（公共存储柜）**：较快，容量大 —— 用于常用数据
- **数据库（图书馆）**：最慢，容量无限 —— 用于所有数据

**为什么要分层？** 因为不同层具有不同的性能和成本特性。合理组合可获得最佳效果。
:::

现在我们已经了解了概念，来看一个真实案例：电商系统如何从“无缓存”演变为“多级缓存架构”。这个案例会让你更直观地理解缓存设计的重要性。

### 3.1 阶段 1：无缓存时代 —— 数据库裸奔

**背景**：早期，用户只有几百个，所有请求都直接访问数据库，没有缓存层。

**技术栈**：
- 数据库：MySQL
- 无缓存：没有 Redis，也没有本地缓存

**系统架构**：```
User Request → Application Server → MySQL Database
```

**该阶段的特征**：
- ✅ **优点**：架构简单，开发快速
- ❌ **缺点**：数据库负载重，性能差，超过一千用户时会崩溃

::: details 查看此阶段的代码和问题
**代码示例**（每次查询数据库）:

```javascript
// Get product details — query the database every single time
async function getProduct(productId) {
  // Direct database query, no caching whatsoever
  const product = await db.query(
    'SELECT * FROM products WHERE id = ?',
    [productId]
  )
  return product
}
```

**遇到的问题**：
1. **数据库 CPU 峰值**：每个请求都访问数据库，CPU 使用率达到 80%
2. **响应缓慢**：复杂查询耗时 50–100 毫秒 — 用户体验差
3. **并发能力差**：数据库 QPS（每秒查询数）最高 2000 — 超过这个数就会崩溃
4. **热门产品瓶颈**：热门商品详情页被大量查询；数据库成为瓶颈

**当时的临时解决方案**：
- 购买更贵的服务器（更多 CPU，更多内存） — 成本高，效果有限
- 数据库读写分离 — 缓解读取压力，但写入压力依然存在
- SQL 优化 — 提升 20–30%，但未解决根本问题
:::

这种“裸跑”模式在用户少于 1,000 时可行，但随着用户量增长到 10,000 或 100,000，数据库开始频繁崩溃，团队迫切需要引入缓存。

### 3.2 阶段 2：引入 Redis 缓存 — 性能提升 10 倍

**背景**：用户增长到 10,000，数据库无法跟上。团队决定引入 Redis 作为缓存层。

**技术栈**：
- 数据库：MySQL
- 缓存：Redis（单实例）

**系统架构**：```
User Request → Application Server → Redis Cache (query DB only on miss) → MySQL Database
```

**此阶段的特点**：
- ✅ **优点**：性能提升10倍，数据库负载减少90%
- ❌ **缺点**：Redis 单点故障，可能出现缓存与数据库不一致

::: details 查看 Redis 缓存实现代码
**代码示例**（添加 Redis 缓存）：

```javascript
// Get product details — check Redis first, fall back to database
async function getProduct(productId) {
  // 1. Check Redis cache first
  const cacheKey = `product:${productId}`
  const cached = await redis.get(cacheKey)

  if (cached) {
    // Cache hit! Return directly, ~1 millisecond
    return JSON.parse(cached)
  }

  // 2. Cache miss, query the database
  const product = await db.query(
    'SELECT * FROM products WHERE id = ?',
    [productId]
  )

  // 3. Write to Redis after querying, set 30-minute TTL
  await redis.setex(
    cacheKey,
    1800,  // 30 minutes = 1800 seconds
    JSON.stringify(product)
  )

  return product
}
```

**性能对比**：

| 场景 | 无缓存 | 使用 Redis 缓存 | 提升 |
|------|-------|--------------|---------|
| 普通商品查询 | 50毫秒 | 5毫秒（缓存命中时） | **10×** |
| 热门商品查询 | 80毫秒 | 1毫秒（命中率95%） | **80×** |
| 数据库 QPS | 2000（达到容量） | 200（缓存拦截90%） | **数据库负载降低10倍** |
| 系统最大并发 | 2,000 用户 | 20,000 用户 | **10×** |

**取得的改进**：
1. **响应速度**：缓存命中时，响应时间从50毫秒降至1–5毫秒
2. **并发能力**：系统可支持20,000用户，从2,000提升
3. **数据库负载**：90%的请求被 Redis 拦截，数据库 CPU 从80%降至20%
4. **用户体验**：页面加载明显加快，用户抱怨减少

**新挑战**：
1. **缓存一致性**：商品价格变更，数据库已更新，但缓存仍保留旧值
2. **缓存穿透**：恶意查询不存在的商品ID（如 id=-1）每次都打到数据库
3. **缓存雪崩**：系统重启后，所有缓存同时过期，数据库请求暴增
4. **Redis 单点故障**：若 Redis 出问题，所有请求直接打到数据库 — 系统可能崩溃

**解决方案**：
- **缓存一致性**：更新数据库时，同步删除缓存
- **缓存穿透**：对不存在的数据也进行缓存（使用空值并设置短 TTL，例如5分钟）
- **缓存雪崩**：为缓存 TTL 添加随机偏移，避免同时过期
:::

引入 Redis 后，系统性能大幅提升，但出现了新的问题。团队开始研究如何解决这些缓存相关的问题。

### 3.3 阶段3：多级缓存架构 — 再获5×性能提升

**背景**：用户增长至100,000，甚至 Redis 缓存也开始成为瓶颈（单实例 Redis QPS 约上限为100,000）。团队决定引入多级缓存。

**技术栈**：
- L1 缓存：应用本地缓存（Caffeine）
- L2 缓存：Redis 集群
- 数据库：MySQL 主从集群

**系统架构**：
```
User Request → CDN Cache (static assets) → Application Server
                                               ↓
                                 L1: Local Cache (Caffeine) → Miss → L2: Redis → Miss → MySQL
```

**此阶段的特点**：
- ✅ **优点**：终极性能（本地缓存仅需约 0.1 毫秒）、高可用性（Redis 停机不影响热点数据）
- ❌ **缺点**：架构复杂，难以保证跨缓存层的一致性

::: 详情 查看多级缓存实现代码
**代码示例**（本地缓存 + Redis 双层缓存）：

```javascript
// Using Caffeine local cache
const caffeine = require('caffeine')
const localCache = new caffeine.Cache({
  max: 1000,              // Max 1000 entries
  ttl: 30,                // 30-second TTL
})

// Get product details — two-level caching
async function getProduct(productId) {
  const cacheKey = `product:${productId}`

  // L1: Check local cache first (fastest, ~0.1 ms)
  const localCached = localCache.get(cacheKey)
  if (localCached) {
    console.log('L1 hit')
    return localCached
  }

  // L2: Local cache miss, check Redis (fast, ~1 ms)
  const redisCached = await redis.get(cacheKey)
  if (redisCached) {
    console.log('L2 hit, backfilling L1')
    const product = JSON.parse(redisCached)
    // Backfill local cache
    localCache.set(cacheKey, product)
    return product
  }

  // L3: Redis also missed, query database (slowest, ~10 ms)
  console.log('L3 hit, backfilling L2 and L1')
  const product = await db.query(
    'SELECT * FROM products WHERE id = ?',
    [productId]
  )

  // Backfill Redis (30-minute TTL)
  await redis.setex(cacheKey, 1800, JSON.stringify(product))
  // Backfill local cache
  localCache.set(cacheKey, product)

  return product
}
```

**多级缓存性能比较**：

|缓存层 |响应时间 |命中率 |适用数据 |
|---------|---------|--------|--------------|
|**L1：本地缓存** |~0.1毫秒 |70%（超高温度）|热门产品，系统配置，用户会话 |
|**L2：Redis 缓存** |~1毫秒 |25%（热）|大部分产品数据，评论汇总 |
|**L3：数据库** |~10毫秒 |5%（冷数据）|完整产品目录 |

**整体性能提升**：
- **平均响应时间**：5毫秒（第二阶段）→1毫秒（第三阶段），**又提升5×
- **最大系统并发**：20,000用户（第二阶段）→100,000用户（第三阶段），**5×改进**
- **数据库QPS**：200（第二阶段）→50（第三阶段），**又减少4×

**此阶段已解决新问题**：
1. **本地缓存一致性**：多个应用实例可能存在不一致的本地缓存（实例A缓存旧价格，实例B缓存新缓存）
   - **解决方案**：设置一个短的本地缓存TTL（30秒），以最小化不一致窗口
2. **缓存预热**：系统重启后，本地缓存为空——大量请求会传入Redis。
   - **解决方案**：在系统启动时主动将热数据加载到本地缓存中
:::

多级缓存架构被大型互联网公司广泛采用（如淘宝、JD.com），能够支持数百万个QPS。

### 3.4 缓存架构演进全景

|阶段 |架构 |响应时间 |最大并发 |密钥变更 |
|------|------|---------|---------|---------|
|**第一阶段：无缓存**应用→数据库 |50毫秒 |2000 用户 |数据库裸运行，性能差 |
|**第二阶段：单级缓存** |应用→ Redis →数据库 |5ms |20,000 用户 |Redis引入，性能提升 10× |
|**第三阶段：多级缓存** |应用→ 本地缓存→Redis →数据库 |1ms |10万用户 |本地缓存Redis，再提升5× |

::: 提示 📊 你能从这张桌子看到什么？
**第一阶段→第二阶段**：质的飞跃。引入Redis带来了10×的性能提升，数据库负载降低90%。这是从“勉强工作”到“足够好”的关键一步。

**第二阶段→第三阶段**：极限优化。添加本地缓存带来5×的提升。这是从“足够好”到“优秀”的进阶，适合超高流量场景。

**实用建议**：
- **用户<10,000**：第一阶段（无缓存）即可，但建议引入Redis（第二阶段）- **用户10,000–100,000**：第二阶段（Redis缓存）是最佳选择 - **用户>100,000**：考虑第三阶段（多级缓存），但请注意一致性复杂度

**总结**：缓存架构演进不仅仅是“增加缓存层”——而是**选择适合流量规模的架构**。过度设计会增加不必要的复杂性;工程不足会导致性能瓶颈。
:::

---

## 4.三大经典缓存问题：穿透、崩溃和雪崩

实际上，缓存引入了三个经典问题。如果你不理解它们，系统可能在某个时刻突然崩溃。让我们用日常类比来理解这些问题。

### 4.1 缓存渗透：查询不存在的数据

**问题定义**：查询**不存在的数据**（例如id=-1）。它不在缓存里（因为从未存储过），也不在数据库里——所以每个请求都会直接跳转到数据库。

::: 提示 🤔 缓存穿透的“图书馆借书”类比
想象一下你在图书馆找书。你问图书管理员：“你们有《不存在的书》吗？”

**正常流程**：
- 图书管理员查目录：“没有这本书”
- 你离开

**缓存穿透场景**：
- 第一次来，图书管理员查数据库：“没有”，告诉你
- 第二次来，图书管理员又查数据库：“没有”
- 第100次来，图书管理员仍然查数据库：“没有”

**问题**：图书管理员（数据库）疲惫了——每次查询都打到数据库，即使答案总是“没有”。

**解决方案**：图书管理员记住“《不存在的书》不存在”。下次你问时，他们直接说“没有”，无需再查数据库。这就是**缓存空对象**。
:::

**现实场景**：
- 恶意攻击者构造大量不存在的ID进行查询（例如，id=-1, id=999999999）
- 爬虫遍历不存在的资源路径（例如，/api/products/invalid-id）
- 业务逻辑错误导致查询无效数据

**解决方案1：缓存空对象**

```javascript
async function getProduct(productId) {
  const cacheKey = `product:${productId}`

  // 1. Check cache first
  const cached = await redis.get(cacheKey)
  if (cached !== null) {
    // Note: cached could be the string "null"
    if (cached === 'null') {
      // Cached "null object" — the database doesn't have this data
      return null
    }
    return JSON.parse(cached)
  }

  // 2. Query the database
  const product = await db.query(
    'SELECT * FROM products WHERE id = ?',
    [productId]
  )

  // 3. Even if the database has nothing, cache "null" with a short TTL (e.g., 5 minutes)
  if (!product) {
    await redis.setex(cacheKey, 300, 'null')
    return null
  }

  // 4. Data found, cache normally
  await redis.setex(cacheKey, 1800, JSON.stringify(product))
  return product
}
```

**解决方案 2：布隆过滤器**

布隆过滤器是一种“快速判断数据是否存在”的工具——就像一个“超级索引”：

::: tip 📖 什么是布隆过滤器？
想象你有一个“魔法黑盒”：
- 你问它：“产品 ID 123 存在吗？”
- 它说：“**绝对不存在**” → 那它真的不存在——无需查询数据库
- 它说：“**可能存在**” → 那就去查询数据库以确认

**特点**：
- **无假阴性**：如果它说某物不存在，那它确实不存在
- **可能出现假阳性**：如果它说某物可能存在，它实际上可能不存在（概率低，可调）

**价值**：布隆过滤器可以在请求到达缓存之前拦截 99% 的“不存在”请求，从而保护数据库。
:::

```javascript
// Using a Bloom filter
const { BloomFilter } = require('bloom-filters')

// Initialize Bloom filter (assuming up to 1 million product IDs)
const bloomFilter = new BloomFilter(1000000, 0.01)  // 1% false positive rate

// At system startup, add all product IDs to the Bloom filter
async function initBloomFilter() {
  const allIds = await db.query('SELECT id FROM products')
  allIds.forEach(row => {
    bloomFilter.add(row.id)
  })
}

// Before querying a product, check with the Bloom filter first
async function getProduct(productId) {
  // 1. Check with Bloom filter first
  if (!bloomFilter.has(productId)) {
    // Definitely doesn't exist — return null, no need to query the database
    console.log('Bloom filter intercept: product does not exist')
    return null
  }

  // 2. Bloom filter says "might exist" — check cache
  const cached = await redis.get(`product:${productId}`)
  if (cached) {
    return JSON.parse(cached)
  }

  // 3. Cache miss — query database
  const product = await db.query(
    'SELECT * FROM products WHERE id = ?',
    [productId]
  )

  if (!product) {
    // Bloom filter false positive (very low probability) — actually doesn't exist
    await redis.setex(`product:${productId}`, 300, 'null')
    return null
  }

  // 4. Data found, write to cache
  await redis.setex(`product:${productId}`, 1800, JSON.stringify(product))
  return product
}
```

### 4.2 缓存击穿：热点数据过期

**问题定义**：一条**热点数据**（如热门商品或热门新闻）在缓存中失效（TTL 到期）。此时，大量并发请求同时到达并查询数据库，导致数据库负载骤增。

::: tip 🤔 缓存击穿的“抢书”类比
想象一下图书馆里有一本《哈利·波特》——非常受欢迎，有 100 人想借。

**正常情况**：
- 图书馆将《哈利·波特》放在“借书柜台”（缓存）
- 每个人直接从柜台拿书，无需去书架查找

**缓存击穿情况**：
- 柜台上的《哈利·波特》过期（归还到书架）
- 100 人同时来借，发现柜台空了
- 所有人都去抢书架上的书（数据库）
- 管理员（数据库）不堪重负

**问题**：这不是“书不存在”——而是一本“超热门书”突然从缓存消失，导致大量请求同时涌向数据库。
:::

**现实场景**：
- 微博热门话题过期——成千上万的人同时访问
- 明星八卦新闻缓存过期——粉丝蜂拥而至
- 秒杀活动开始，库存数据过期

**解决方案 1：互斥锁（Mutex Lock）

```javascript
async function getProduct(productId) {
  const cacheKey = `product:${productId}`

  // 1. Check cache first
  const cached = await redis.get(cacheKey)
  if (cached) {
    return JSON.parse(cached)
  }

  // 2. Cache miss — acquire distributed lock
  const lockKey = `lock:${productId}`
  const lock = await redis.set(lockKey, '1', 'NX', 'EX', 10)  // 10-second lock

  if (lock === 'OK') {
    // 3. Lock acquired — query database
    console.log('Lock acquired, querying database')
    const product = await db.query(
      'SELECT * FROM products WHERE id = ?',
      [productId]
    )

    // 4. Write to cache
    await redis.setex(cacheKey, 1800, JSON.stringify(product))

    // 5. Release lock
    await redis.del(lockKey)
    return product
  } else {
    // 6. Lock not acquired — wait 50ms and retry
    console.log('Lock not acquired, waiting and retrying')
    await new Promise(resolve => setTimeout(resolve, 50))
    return getProduct(productId)  // Recursive retry
  }
}
```

**方案二：逻辑过期**

```javascript
async function getProduct(productId) {
  const cacheKey = `product:${productId}`

  // 1. Check cache
  const cached = await redis.get(cacheKey)
  if (cached) {
    const data = JSON.parse(cached)

    // 2. Check logical expiration time
    if (Date.now() < data.expireTime) {
      // Not expired — return directly
      return data.product
    } else {
      // 3. Logically expired — rebuild cache asynchronously while returning old data
      console.log('Logically expired, rebuilding cache asynchronously')
      rebuildCacheAsync(productId)  // Async rebuild
      return data.product  // Return old data
    }
  }

  // 4. Cache doesn't exist (first load) — query database synchronously
  const product = await db.query(
    'SELECT * FROM products WHERE id = ?',
    [productId]
  )

  // 5. Write to cache (including logical expiration time)
  const cacheData = {
    product: product,
    expireTime: Date.now() + 30 * 60 * 1000  // Logically expires in 30 minutes
  }
  await redis.set(cacheKey, JSON.stringify(cacheData))

  return product
}

// Async cache rebuild
async function rebuildCacheAsync(productId) {
  const lockKey = `rebuild:${productId}`
  const lock = await redis.set(lockKey, '1', 'NX', 'EX', 10)

  if (lock === 'OK') {
    console.log('Async cache rebuild started')
    const product = await db.query(
      'SELECT * FROM products WHERE id = ?',
      [productId]
    )

    const cacheData = {
      product: product,
      expireTime: Date.now() + 30 * 60 * 1000
    }
    await redis.set(`product:${productId}`, JSON.stringify(cacheData))
    await redis.del(lockKey)
    console.log('Async cache rebuild complete')
  }
}
```

### 4.3 缓存雪崩：大规模同时过期

**问题定义**：大量缓存数据**在同一时刻过期**（或者 Redis 挂掉），导致所有请求同时打到数据库，瞬间使数据库不堪重负。

::: tip 🤔 缓存雪崩的“图书馆集体还书”比喻
想象图书馆的“借书柜台”（缓存）有 1,000 本书。

**正常情况**：
- 这些书的归还日期分散：有的今天到期，有的明天到期，还有的后天到期
- 每天只有几十本书到期——管理员（数据库）可以轻松处理

**缓存雪崩场景**：
- 系统重启后，管理员将所有 1,000 本书设为“30 天后到期”
- 30 天后，所有 1,000 本书同时到期
- 1,000 个人同时来借书，发现柜台空了
- 所有人都急忙去书架上找书
- 书架管理员（数据库）瞬间被淹没

**问题**：问题不在于单本书，而是**大规模数据同时过期**，引起数据库压力骤增。
:::

**现实场景**：
- 系统重启后，所有缓存从头重建且 TTL 相同（例如 30 分钟）
- 定时任务批量刷新缓存，设置相同的过期时间
- 缓存服务（Redis）宕机或发生网络分区

**解决方案 1：随机 TTL**

```javascript
async function getProduct(productId) {
  const cacheKey = `product:${productId}`

  const cached = await redis.get(cacheKey)
  if (cached) {
    return JSON.parse(cached)
  }

  const product = await db.query(
    'SELECT * FROM products WHERE id = ?',
    [productId]
  )

  // Key: add a random offset (±5 minutes) to the base TTL (30 minutes)
  const baseTTL = 1800  // 30 minutes
  const randomOffset = Math.floor(Math.random() * 600) - 300  // -5 to +5 minutes
  const finalTTL = baseTTL + randomOffset

  console.log(`Cache TTL: ${finalTTL} seconds (${Math.floor(finalTTL / 60)} minutes)`)
  await redis.setex(cacheKey, finalTTL, JSON.stringify(product))

  return product
}
```

**解决方案 2：缓存预热**

```javascript
// At system startup, proactively load hot data into the cache
async function cacheWarmup() {
  console.log('Starting cache preheating...')

  // 1. Query the top 1,000 hottest products (sorted by view count)
  const hotProducts = await db.query(`
    SELECT * FROM products
    ORDER BY view_count DESC
    LIMIT 1000
  `)

  // 2. Batch-write to Redis
  for (const product of hotProducts) {
    const cacheKey = `product:${product.id}`
    const ttl = 1800 + Math.floor(Math.random() * 600)  // 30 minutes ± 5 minutes
    await redis.setex(cacheKey, ttl, JSON.stringify(product))
  }

  console.log(`Cache preheating complete, loaded ${hotProducts.length} hot products`)
}

// Execute at application startup
cacheWarmup()
```

**解决方案 3：带备用的断路器**

```javascript
// Use a circuit breaker to protect the database
const CircuitBreaker = require('opossum')

// Configure the circuit breaker
const dbQueryBreaker = new CircuitBreaker(
  async (productId) => {
    return await db.query('SELECT * FROM products WHERE id = ?', [productId])
  },
  {
    timeout: 3000,  // 3-second timeout
    errorThresholdPercentage: 50,  // Trip when error rate exceeds 50%
    resetTimeout: 30000  // Attempt recovery after 30 seconds
  }
)

// Fallback handling when the circuit is open
dbQueryBreaker.fallback(() => {
  console.log('Database circuit open, returning fallback data')
  return {
    id: productId,
    name: 'Service is busy, please try again later',
    status: 'degraded'
  }
})

async function getProduct(productId) {
  const cacheKey = `product:${productId}`

  const cached = await redis.get(cacheKey)
  if (cached) {
    return JSON.parse(cached)
  }

  // Query database through the circuit breaker
  const product = await dbQueryBreaker.fire(productId)

  if (product.status === 'degraded') {
    return product  // Return fallback data
  }

  await redis.setex(cacheKey, 1800, JSON.stringify(product))
  return product
}
```

👇 **自己试试**：
下面的演示比较了缓存穿透、缓存雪崩和缓存击穿的场景及解决方案：

<CacheProblemsDemo />

---

## 5. 缓存一致性策略：保持缓存与数据库同步

缓存本质上是数据的副本。副本与原始数据（数据库）之间总会存在不一致的窗口。如何控制这个窗口是缓存设计的核心挑战。

### 5.1 缓存和数据库不一致的动机

::: tip 🤔 不一致性的“便签和通讯录”类比
想象你在便签上写了：“小明的电话：123456”——这是你的通讯录（数据库）的副本。

**不一致场景**：
- 你更新了通讯录，将小明的号码改为“7654321”
- 但是你忘了更新便签
- 下次查询号码时，你看了便签——还是旧的“123456”

**问题**：便签（缓存）和通讯录（数据库）不同步。

**原因**：原始数据已更新，但副本没有同步。在计算机系统中，这种情况发生是因为“更新数据库”和“更新缓存”是两个独立操作，中间存在时间间隔，期间可能有其他操作干扰。
:::

**一个真实的并发场景**：

| 时间 | 线程 A（更新用户年龄） | 线程 B（查询用户） | 数据库 | 缓存 |
|------|---------------------|------------------|--------|------|
| T1 | 开始更新数据库 | - | age=20 | age=20 |
| T2 | 数据库更新为 age=25 | 查询缓存，命中 age=20 | age=25 | age=20 ❌ |
| T3 | 删除缓存 | - | age=25 | - |
| T4 | - | - | age=25 | 从数据库加载 age=25 ✅ |

**问题**：在 T2 时间点，线程 B 从缓存读取了旧值 20，而数据库已经是 25。这就是**缓存不一致**。

### 5.2 最佳实践：先更新数据库，再删除缓存

::: tip 🤔 为什么是“删除”而不是“更新”缓存？
你可能会想：为什么不直接“更新缓存”而是“删除缓存”？

**更新缓存的问题**：
- 在并发更新下，线程 A 可能先更新了缓存，然后线程 B 更新数据库，但缓存未被更新
- 更新缓存可能耗费较大（例如需要从多个表汇总数据）
- 如果数据更新后马上被删除，努力就白费了

**删除缓存的优点**：
- 下次查询自动从数据库加载最新数据（懒加载）
- 避免并发更新引起的脏数据
- 简单可靠——行业最佳实践
:::

**标准流程**：

```javascript
// Update product information
async function updateProduct(productId, updateData) {
  // 1. Update the database first
  await db.query(
    'UPDATE products SET name = ?, price = ? WHERE id = ?',
    [updateData.name, updateData.price, productId]
  )

  // 2. Then delete the cache (not update it!)
  await redis.del(`product:${productId}`)

  // 3. On the next query, cache miss triggers automatic reload of the latest data
  console.log('Update complete, cache deleted')
}
```

::: 详情 为什么“先更新数据库，然后删除缓存”是最佳方法
比较三种更新策略：

**策略 1：先更新缓存，然后更新数据库** ❌ 不推荐```javascript
// Problem: if the DB update fails, cache holds the new value, DB holds the old — inconsistent
await redis.set('product:1', newProduct)  // Cache update succeeds
await db.query('UPDATE products SET ...')  // Database update fails!
// Result: cache has new value, database has old value — permanently inconsistent!
```

**策略 2：先删除缓存，然后更新数据库** ❌ 不推荐```javascript
// Problem: between delete and update, another thread queries and loads old data into cache
await redis.del('product:1')  // Cache deleted
// At this moment, Thread B queries, finds no cache, queries DB (still old value), writes to cache
await db.query('UPDATE products SET ...')  // Database updated
// Result: cache has old value, database has new value — inconsistent!
```

**策略3：先更新数据库，然后删除缓存** ✅ 推荐```javascript
// Advantage: the DB update acquires a row lock — other threads must wait, avoiding dirty data
await db.query('UPDATE products SET ...')  // Update database (acquires row lock)
await redis.del('product:1')  // Delete cache
// Even if cache deletion fails, the next query just goes back to the source — no lingering dirty data
```

**为什么策略3是最优的？**
1. **数据库锁保护**：更新操作会获取行锁——其他读/写操作必须等待
2. **删除失败影响小**：即使缓存删除失败，也只是意味着下一次读取会访问源数据——没有脏数据
3. **简单可靠**：无需额外复杂逻辑
:::

### 5.3 延迟双删：极端场景下的一致性保障

**场景**：在高并发情况下，即使“先更新数据库，再删除缓存”也存在极小的不一致概率。延迟双删通过两次删除最大化一致性。

**流程**：```
1. Delete cache
2. Update database
3. Wait for a period (e.g., 500ms)
4. Delete cache again
```

```javascript
async function updateProduct(productId, updateData) {
  const cacheKey = `product:${productId}`

  // 1. First cache deletion
  await redis.del(cacheKey)

  // 2. Update database
  await db.query(
    'UPDATE products SET name = ?, price = ? WHERE id = ?',
    [updateData.name, updateData.price, productId]
  )

  // 3. Wait 500ms (let other threads' queries complete)
  await new Promise(resolve => setTimeout(resolve, 500))

  // 4. Second cache deletion (remove old data possibly loaded by other threads)
  await redis.del(cacheKey)

  console.log('Delayed double-delete complete, data synced')
}
```

**三种一致性策略比较**：

| 策略 | 一致性水平 | 性能影响 | 复杂度 | 适用场景 |
|------|-----------|---------|--------|---------|
| **先更新数据库，再删除缓存** | 最终一致性（不一致窗口 < 100ms） | 低 | 低 | 大多数场景；推荐作为默认策略 |
| **延迟双删** | 强最终一致性（不一致窗口 < 10ms） | 中等（500ms 延迟） | 中等 | 需要更高一致性的场景（如金融、库存） |
| **先删缓存，再更新数据库** | 弱一致性（不一致窗口大） | 低 | 低 | ❌ 不推荐；易产生不一致 |

👇 **自己动手试试**：
下面的演示比较了三种一致性策略的效果。点击“更新数据”，观察缓存和数据库一致性的变化：

<CacheConsistencyDemo />

---

## 6. 实操：构建完整缓存系统

既然我们已经了解了原理，现在来看一个真实案例：如何为电商商品详情页设计完整的缓存系统。

### 6.1 业务场景分析

**需求**：用户访问商品详情页，需要展示基本商品信息、价格、库存、评价等内容。

**特征**：
- **读多写少**：每写入 1 次，读取 100 次（读写比例 100:1）
- **热点集中**：20% 的商品承载 80% 的流量
- **数据复杂度**：基本商品信息、价格、库存、评价汇总
- **一致性要求**：价格和库存需要强一致性；其他数据可以最终一致性处理

**性能目标**：
- P99 响应时间 < 100ms（99% 的请求在 100ms 内返回）
- 数据库峰值 QPS < 5,000
- 缓存命中率 > 95%

### 6.2 架构设计

**多级缓存架构**：

```
User Request
  ↓
CDN Cache (static assets: images, CSS, JS)
  ↓ Miss
Nginx Local Cache (aggregated product info)
  ↓ Miss
Application Server
  ↓
  ├─ L1: Local Cache (Caffeine, hot products)
  │   ↓ Miss
  ├─ L2: Redis Cache (all product data)
  │   ↓ Miss
  └─ L3: MySQL Database (complete dataset)
```

### 6.3 核心代码实现

**完整多级缓存实现（简化版）**：

```javascript
const caffeine = require('caffeine')

// L1: Local cache (30-second TTL)
const localCache = new caffeine.Cache({
  max: 1000,
  ttl: 30,
})

// Get product details (multi-level cache)
async function getProduct(productId) {
  const cacheKey = `product:${productId}`

  // L1: Local cache (~0.1 ms)
  const localCached = localCache.get(cacheKey)
  if (localCached) {
    console.log('L1 hit')
    return localCached
  }

  // L2: Redis cache (~1 ms)
  const redisCached = await redis.get(cacheKey)
  if (redisCached) {
    console.log('L2 hit, backfilling L1')
    const product = JSON.parse(redisCached)
    localCache.set(cacheKey, product)
    return product
  }

  // L3: Database (~10 ms, with distributed lock to prevent breakdown)
  const lockKey = `lock:${productId}`
  const lock = await redis.set(lockKey, '1', 'NX', 'EX', 10)

  if (lock === 'OK') {
    console.log('L3 hit, querying database')
    const product = await db.query(
      'SELECT * FROM products WHERE id = ?',
      [productId]
    )

    if (product) {
      // Write to Redis (30 minutes + random TTL)
      const ttl = 1800 + Math.floor(Math.random() * 600) - 300
      await redis.setex(cacheKey, ttl, JSON.stringify(product))
      // Backfill local cache
      localCache.set(cacheKey, product)
    }

    await redis.del(lockKey)
    return product
  } else {
    // Lock not acquired — wait and retry
    await new Promise(resolve => setTimeout(resolve, 50))
    return getProduct(productId)
  }
}

// Update product info (update DB first, then delete cache)
async function updateProduct(productId, updateData) {
  const cacheKey = `product:${productId}`

  // 1. Update database
  await db.query(
    'UPDATE products SET name = ?, price = ? WHERE id = ?',
    [updateData.name, updateData.price, productId]
  )

  // 2. Delete local cache
  localCache.del(cacheKey)

  // 3. Delete Redis cache
  await redis.del(cacheKey)

  console.log('Update complete, cache deleted')
}
```

👇 **自己试试吧**：
下面的演示展示了多层缓存系统的完整工作流程。点击“查询产品”，观察请求如何通过缓存层次流动：

<EcommerceCacheArchitectureDemo />

---

## 7.总结与学习路径

### 7.1 核心知识评测

|概念 |一句话解释 |问题解决 |实用技巧 |
|--------|-----------|-----------|----------|
|**缓存命中** |缓存中发现的数据 |10–100×性能提升 |目标命中率>95% |
|**缓存渗透** |查询不存在的数据每次都会进入数据库 |数据库被恶意查询拖拽 |布隆过滤器缓存空对象 |
|**缓存崩溃** |热数据过期，大量请求冲击数据库 |数据库压力骤升 |Mutex 锁逻辑过期 |
|**缓存雪崩**大量同时数据过期 |数据库过载 |随机TTL缓存预热 |
|**多层缓存** |本地缓存 Redis 数据库 |终极性能优化 |L1 本地缓存 70% 命中率，L2 Red 25% 命中率 |
|**缓存一致性** |保持缓存与数据库同步 |数据准确性 |先更新数据库，然后删除缓存 |
|**延迟双重删除** |更新前后删除缓存 |极端情况下的一致性 |第二次删除前等待500毫秒 |

### 7.2 推荐学习路径

**第一阶段：理解原理（1–2天）**
- 掌握缓存的本质（数据副本、时间交换空间）
- 理解核心概念：命中率、TTL、淘汰
- 学习存储介质（内存与磁盘）的性能差异

**第二阶段：掌握基础（2–3天）**
- 学习使用 Redis 缓存（SET、GET、SETEX 命令）
- 实现简单的缓存读写逻辑（先检查缓存，未命中时查询数据库）
- 理解为什么“更新时删除缓存”而不是“更新缓存”

**第三阶段：解决经典问题（1周）**
- 解决缓存渗透问题：实现布隆过滤器或缓存空对象
- 解决缓存崩溃：实现互斥锁或逻辑过期
- 解决缓存雪崩：实现随机TTL和缓存预热

**第四阶段：多级缓存（1–2周）**
- 引入本地缓存（Caffeine/番石榴）
- 设计本地缓存 Redis 两层架构
- 处理跨缓存层的一致性问题

**第五阶段：生产级实践（持续进行）**
- 设计完整的产品详情页面缓存系统
- 设置监控（缓存命中率、响应时间）
- 执行负载测试和性能调优

::: 信息 💡 最后的话
缓存是高并发系统的基石。从淘宝的产品详情页到微博热点话题，从微信时刻到抖音视频——每个高性能系统背后都有精心设计的缓存架构。

理解缓存不仅仅是学习一项技术——更是理解**用空间换取时间，并用副本保护主要数据**的架构思维。当你真正掌握缓存时，你的系统性能将从“勉强工作”跃升至“良好”，最终达到“优秀”。

我希望这篇文章能帮助你全面理解缓存系统。当你在实际项目中遇到性能问题时，你会问自己：“缓存能解决这个问题吗？”
:::