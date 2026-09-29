# 对象存储与CDN原则
> 💡 **学习指南**：本文将带你完成完整的链条——从文件上传到用户下载。你将看到对象存储如何管理像“智能仓库”一样的大文件，CDN如何像“快递网络”一样将内容送到用户门口，以及过程中可能遇到的陷阱。建议首先了解基本的HTTP请求和DNS解析原则。

在开始之前，以下是一些基础知识点，供我们复习：

- **HTTP 请求流程**：你可以阅读[在浏览器输入 URL 时会发生什么]（./web-basics/url-to-browser.md）来理解完整的请求链。
- **DNS解析原则**：如果您还不熟悉域名解析，可以查看[DNS查询流程]（./deployment/dns-flow.md）中的图解部分。

---

## 0.引言：上传和下载文件“慢”的动机

想象这样一个场景：你上传了一张10MB的高分辨率照片到一个图片分享社区，完成只需半分钟。然而你在北京的朋友仅用2秒钟就能下载它。为什么同一个文件的上传和下载体验会有如此巨大的差异？

或者想想：你的电商网站举办了Double 11促销活动，产品详情页突然涌入数百万访问量——你的服务器完全瘫痪了。是带宽不足吗？还是架构设计有缺陷？

这些问题的答案隐藏在“黄金二重奏”——**对象存储**和**CDN**中。

---

## 1.对象存储：您的“智能云仓库”

### 1.1 对象存储概述

传统的文件系统就像你家里的衣橱：衣服按“上衣/裤子/裙子”分层分类。要找到衬衫，你必须打开衣柜→上衣部分→衬衫隔层。当文件数量爆炸式增长时，这种“层级嵌套”模式变得非常繁琐。

而对象存储则类似于现代仓储物流：每个包裹都有唯一的“追踪号码”（对象密钥）。你只需提供追踪号码，仓库机器人就能从包裹海洋中精确检索。

<ObjectStorageDemo />

**主要区别一览**：

|维度 |传统文件系统 |对象存储 |
|:----------------- |:--------------------------- |:----------------------------- |
|**组织结构** |层级目录树 |扁平键值对 |
|**访问协议**|POSIX（本地文件操作）|HTTP/REST API |
|**可扩展性**受限于单台机器 |近乎无限的水平缩放|
|**元数据**基本属性（大小、时间）|丰富的自定义元数据 |
|**典型用例**|本地办公室文档 |图片/视频/备份/静态资产 |

### 1.2 对象存储的核心概念

#### 桶：你的“仓库隔断”

桶是对象存储中的顶层容器，相当于独立命名空间。所有对象都必须存储在一个桶中。

**命名规则**（以阿里云OSS为例）：

- 全球唯一：不能在所有云服务提供商用户间复制
- 只能包含小写字母、数字和连字符
- 必须以小写字母或数字开头和结尾
- 长度在3-63字符之间

**现实陷阱**：一个团队曾根据业务线创建了数十个桶，结果当月度账单到账时感到震惊——每个桶都会产生最低存储费和请求费。建议：结合“环境目的”来规划桶，比如`prod-static-assets`@、`dev-backup-archive`。

#### 对象：你的“数据包”

对象是存储的基本单位，由三个部分组成：

1. **密钥**：对象的唯一标识符，等同于“追踪号码”
   - 示例：`images/avatar/2024/user123.jpg`
   - 虽然看起来像条路，但本质上只是一根绳子

2. **Data**：物体本身的内容
   - 可以是任意二进制数据
   - 大小限制取决于云服务提供商（通常每个对象最高可达5TB）

3. **元数据**：描述对象的额外信息
   - 系统元数据：内容类型、ETag、最后修改等
   - 自定义元数据：例如 `x-oss-meta-owner`， `x-oss-meta-project`

####访问控制：谁能动我的“仓库”？

对象存储提供多层权限控制：

|层 |控制方法 |典型用例 |
|:-------------- |:-------------------------- |:---------------------------------------- |
|**桶级**|桶策略 |阻止所有外部访问，只允许特定IP |
|**对象级**|ACL（访问控制列表）|公共图片，私有文档 |
|**临时认证**|STS（安全令牌服务）|前端直接上传，移动端上传 |

**安全红线**：绝不要在前端代码中写入访问密钥ID和访问密钥秘密！正确的做法是：前端向你的后端请求临时STS凭证，后端在验证用户身份后返回带有过期时间的临时凭证。

---

## 2.CDN：您的“全球快递网络”

### 2.1 需要CDN的动机

想象一下，你在深圳运营一个带有服务器的在线商店。现在北京的用户想要访问你的图片：

- **无CDN**：请求从北京→河北→河南→湖北→湖南→广东→深圳传输，跨越2000多公里，往返超过4000公里。仅网络传输需数十毫秒，网络拥堵时更为严重。

- **使用 CDN**：请求直接从北京发送到北京的 CDN 节点（可能位于北京联通数据中心）。距离从 2,000 公里缩小到 20 公里，延迟从 50ms 降至 5ms。

这就是CDN的核心价值：**让内容更贴近用户**。

<CdnAccelerationDemo />

### 2.2 CDN 核心架构

#### 边缘节点：“离用户最近的”快递站”

边缘节点是CDN网络中最接近用户的层级，通常部署在：

- ISP数据中心（中国联通/中国电信/中国移动）
- 主要城市互联网交换点
- 主要交通枢纽

**中国的CDN节点分布**：

- 一线城市：北京、上海、广州、深圳
- 二线城市：杭州、南京、成都、武汉、西习安
- 海外：香港、新加坡、东京、硅谷、法兰克福

<EdgeNodeDistributionDemo />

#### Origin服务器：“内容的”主仓库”

起点是指CDN在缓存未命中时获取内容的位置。它可以是：

- 对象存储（OSS/COS/S3）
- 自管理服务器（ECS/物理机器）
- 负载均衡器（SLB/CLB）

**密钥配置**：

- **源主机 (Origin HOST)**：CDN 节点访问源站时使用的域名/IP
- **源协议 (Origin Protocol)**：HTTP 或 HTTPS
- **源端口 (Origin Port)**：80、443 或自定义端口

#### 中间层节点："区域分发中心"

在边缘节点和源站之间，CDN 通常会有一层或多层中间节点：

- **汇聚节点**：整合来自多个边缘节点的源站请求，以减少源站压力
- **区域中心**：负责在大区域内进行内容分发和调度

这种分层架构的好处：

1. **减轻源站压力**：1000 个边缘节点请求可能只需向源站发起 10 次请求
2. **提高命中率**：热门内容在中间层被拦截，无需回源
3. **故障隔离**：如果某条链路失败，流量能自动切换到另一条路径

### 2.3 完整的 CDN 加速流程

让我们追踪一个真实用户请求：

<CachePolicyDemo />

**步骤 1：DNS 解析**（智能调度）

```
User enters: cdn.example.com/image.jpg
↓
DNS server returns: Beijing Unicom CDN node IP (1.2.3.4)
```

关键在于**智能 DNS**：它根据用户的 ISP、地理位置和节点负载，返回最优的 CDN 节点 IP。

**步骤 2：边缘节点查找**（缓存命中？）

```
Request arrives at Beijing Unicom CDN node (1.2.3.4)
↓
Node checks local cache:
├─ Hit? Return content directly ✓
└─ Miss? Continue to next step
```

**步骤3：来源获取**（逐层向上）

```
Edge node miss
↓
Request to parent node (e.g., North China regional center)
├─ Parent node hit? Return content
└─ Parent node miss? Continue upward
    ↓
    Request to origin
    ↓
    Origin returns content
```

**步骤4：缓存并返回**（下次更快）

```
Content returns along the chain
↓
Each layer caches a copy
↓
Finally reaches the user
```

这样，下次用户请求相同文件时，可以直接从边缘节点提供，实现“即时加载”。

---

## 3. 从上传到访问：完整链路分析

### 3.1 三种文件上传方式

<UploadProcessDemo />

#### 方法1：客户端 → 服务器 → 对象存储（传统模式）

```
Browser → Your Backend Server → Object Storage
```

**流程**：

1. 用户选择文件并点击上传  
2. 文件首先上传到你的后端服务器  
3. 后端在接收到完整文件后，将其转发到对象存储  
4. 上传结果返回给用户  

**优点**：

- 实现简单，前端和后端都容易控制  
- 可以在后端进行文件验证和格式转换  
- 敏感操作可以进行权限检查和日志记录  

**缺点**：

- **双倍带宽消耗**：用户上传一次消耗带宽，服务器转发再次消耗带宽  
- **服务器压力大**：大文件占用大量内存和CPU资源  
- **上传慢**：实际上增加了中转步骤，延长了用户感知的上传时间  

**适用场景**：小文件（<10MB）、需要后端处理的场景（如图片压缩、水印），内部管理系统  

#### 方法2：客户端直接上传到对象存储（现代推荐）

```
Browser ──────→ Object Storage
        ↑
        Backend only issues temporary credentials
```

**流程**：

1. 用户选择文件；前端首先向后端请求“上传凭证”
2. 后端验证用户身份，并从对象存储服务请求**临时STS凭证**（有有效期）
3. 后端将临时凭证返回给前端
4. 前端使用凭证**直接将文件上传到对象存储**
5. 对象存储返回上传结果；前端通知后端“上传完成”

**优点**：

- **上传速度快**：无需中转，用户感知速度最快
- **服务器压力低**：只处理凭证发放，不处理文件流
- **节省带宽**：仅一次上传传输
- **安全性高**：临时凭证有有效期，即使泄露，损害有限

**缺点**：

- 实现略复杂；需要理解STS和签名机制
- 前端需要处理分片上传、断点续传等逻辑
- 需要配置跨域 (CORS)

**使用场景**：大文件上传、用户生成内容（UGC）、需要高并发上传的业务。

#### 方法三：分片上传 断点续传（大文件必备）

```
10GB video file
↓
Split into 1,000 chunks of 10MB each
↓
Parallel upload (5 chunks at a time)
↓
Network drops! 600 chunks already uploaded
↓
Network recovers, resume from chunk 601
↓
All chunks uploaded, initiate "merge" request
```

**为什么选择分片上传？**

| 场景                 | 无分片上传                         | 使用分片上传                         |
| :------------------ | :-------------------------------- | :--------------------------------- |
| **网络波动**         | 上传到 99% 时断开 → 重新上传全部   | 只重新上传失败的分片               |
| **上传速度**         | 单线程，慢                         | 多线程并行，快                      |
| **内存使用**         | 必须缓存整个文件                   | 只缓存当前分片                       |
| **进度显示**         | 只有 0% 和 100%                     | 精确显示每个分片的进度              |

**主要云提供商的分片上传规格**：

| 提供商               | 分片大小上限                        | 最大分片数                          | 最小分片大小                         |
| :----------------- | :--------------------------------- | :-------------------------------- | :--------------------------------- |
| **阿里云 OSS**       | 100MB                              | 10,000                             | 100KB                               |
| **腾讯云 COS**       | 5GB                                | 10,000                             | 1MB                                 |
| **AWS S3**           | 5GB                                | 10,000                             | 5MB（推荐）                          |
| **七牛云**           | 100MB                              | 10,000                             | 4MB                                 |

### 3.2 CDN 源站拉取策略说明

<CachePolicyDemo />

#### 什么是“源站拉取”？

CDN 节点会缓存源站的内容，但当：

- 用户请求的内容 **首次访问**
- 缓存内容已 **过期（TTL 已到）**
- 缓存被 **手动清理/预热**

CDN 节点需要从 **源站** 获取最新内容——这一过程称为“源站拉取”。

#### 三种源站拉取模式

| 模式                     | 原理                             | 使用场景                          | 优劣                                |
| :----------------------- | :-------------------------------- | :-------------------------------- | :--------------------------------- |
| **直接源站拉取**          | CDN 节点 → 源站                  | 源站有公网 IP 且流量较小           | 简单直接，但源站压力大              |
| **中间层源站拉取**        | CDN 节点 → 中间层 → 源站          | 大型网站，多层缓存                  | 减轻源站压力，但架构复杂             |
| **OSS/COS 作为源站**      | CDN 节点 → 对象存储               | 静态资源、图片、视频                | 最佳实践，成本低，性能好             |

#### 源站拉取的实际配置

**场景 1：对象存储作为源站（推荐）**

```
User accesses: cdn.example.com/images/photo.jpg
                    ↓
            CDN Edge Node (Beijing)
                    ↓
            Miss, fetch from origin
                    ↓
            Origin: bucket-name.oss-cn-beijing.aliyuncs.com
                    ↓
            Returns image, CDN caches and responds to user
```

关键配置项：

- **源类型**：OSS/COS 域名或自定义源
- **源协议**：HTTP 或 HTTPS（建议使用 HTTPS）
- **源 HOST**：访问源时使用的 Host 头
- **源 SNI**：用于 HTTPS 源抓取的服务器名称指示

**场景 2：多源负载均衡**

当单个源无法处理源抓取压力时，配置多个源：

```
CDN Edge Node
    ├─ Origin A (weight 50%)
    ├─ Origin B (weight 30%)
    └─ Origin C (weight 20%)
```

主动/待机模式：

```
CDN Edge Node
    ├─ Primary Origin A (all traffic when healthy)
    └─ Backup Origin B (failover when primary fails)
```

#### 源站拉取带宽 vs. CDN 带宽

这里有一个容易混淆的概念：

| 指标                     | 定义                                       | 计费关系                                |
| :-------------------- | :---------------------------------------- | :-------------------------------------- |
| **CDN 下行带宽**          | 从 CDN 节点到用户的流量                    | 通常按 CDN 流量费用计费                  |
| **源站拉取带宽**          | 从源站到 CDN 节点的流量                    | 通常按对象存储或源站出口流量计费        |

**节约成本技巧**：

- 提高 CDN 命中率（让更多请求命中缓存，减少源站拉取）
- 设置合理的缓存时间（TTL）
- 使用预热，在用户访问前缓存热门内容
- 启用“跟随 301/302”，避免不必要的源站拉取重定向

### 3.3 缓存策略配置

<CachePolicyDemo />

#### 缓存键：确定什么算作“同一文件” 

CDN 如何判断两个请求是否应该返回相同的缓存副本？它依赖于**缓存键**。

**默认缓存键通常包括**：

- URL 路径（不包括查询参数）
- 例如：`/images/photo.jpg`

**问题场景**：

```
User A requests: /images/photo.jpg?w=100&h=100  (100×100 thumbnail)
User B requests: /images/photo.jpg?w=800&h=600  (800×600 large image)
```

如果缓存键仅包含路径，那么两个不同尺寸的图像将被视为相同的文件，导致混淆。

**解决方案：自定义缓存键规则**

| 规则                        | 示例                       | 作用                                  |
| :-------------------------- | :---------------------------- | :-------------------------------------- |
| **保留指定的查询参数**       | 保留 `w`, `h`             | 分别缓存不同尺寸的文件                 |
| **保留所有查询参数**         | 保留全部                      | 完全精确匹配                           |
| **忽略特定查询参数**         | 忽略 `token`, `timestamp`             | 带时间戳的 URL 也可以命中缓存         |
| **包含请求头**               | 包含 `Accept-Language`                     | 针对不同语言返回不同内容               |

**实际配置示例**（阿里云 CDN）:

```
Cache key rules:
- URL path: /images/*
- Keep query params: w, h, format
- Ignore query params: token, timestamp, utm_source
```

#### 缓存时间 (TTL)：平衡内容“新鲜度”

TTL（存活时间）决定了内容在 CDN 节点上缓存的时长。设置得太短，会导致频繁从源站获取内容和高成本；设置得太长，用户在内容更新后可能会看到过期内容。

**按文件类型推荐的 TTL**：

| 文件类型      | 推荐 TTL                  | 原因                                   |
| :------------ | :------------------------ | :-------------------------------------- |
| HTML 页面     | 0-5 分钟                  | 更新频繁，需要实时性                    |
| JS/CSS 文件   | 1 年（带文件名哈希）      | 内容不变；当文件名变化时缓存失效        |
| 图片/视频     | 7-30 天                   | 更新频率低，可长期缓存                  |
| 字体文件      | 1 年                      | 几乎不变                               |
| API 响应      | 0-5 分钟（取决于业务）     | 数据要求高度实时                        |

**使用 CDN 进行前端工程的最佳实践：**

```javascript
// webpack/vite configuration
output: {
  filename: 'js/[name]-[contenthash:8].js',
  chunkFilename: 'js/[name]-[contenthash:8].chunk.js',
}
```

生成的文件名：`app-a3f2b1c9.js`

- 文件内容变化 → 哈希变化 → 新 URL → 自然缓存失效
- 文件内容不变 → 哈希不变 → URL不变 → 长期缓存命中

#### 缓存清理与预热

**手动清理（紧急情况）**：

当你已更新源内容，但 CDN 缓存尚未过期时，用户仍会看到旧内容：

| 清理类型        | 影响                                  | 所需时间     | 使用场景          |
| :--------------- | :----------------------------------- | :----------- | :---------------- |
| **URL 清理**     | 使特定 URL 的缓存失效                  | 5-10 分钟    | 单文件更新        |
| **目录清理**     | 使目录下的所有内容缓存失效             | 10-30 分钟   | 批量更新          |
| **全站清理**     | 使整个域名下的所有缓存失效             | 30 分钟      | 紧急回滚          |

**重要提醒**：清理仅使缓存失效；下一次请求会从源站获取新内容。不要在高峰时段进行大规模清理，否则可能会导致源站压力过大。

**预热（主动优化）**：

清理是被动的（内容已经更新）；预热是主动的（提前缓存）。

```
Scenario: A viral article is going live tomorrow at 10 AM

Submit preheat request tonight:
- URL: https://cdn.example.com/articles/viral-article.html
- Preheat scope: All edge nodes nationwide

Result:
When users access it at 10 AM tomorrow, the content is already waiting at edge nodes
→ Zero origin fetch latency, instant loading experience
```

---

## 4. 流量调度：将用户引导到“最近”的节点

<TrafficSchedulingDemo />

### 4.1 智能 DNS 调度

传统的 DNS 解析：

```
User asks: What's the IP for cdn.example.com?
DNS answers: 1.2.3.4 (fixed)
```

智能 DNS 解析：

```
User (Beijing Unicom) asks: What's the IP for cdn.example.com?
Intelligent DNS: Let me check... Beijing Unicom's CDN node is 1.2.3.4

User (Shanghai Telecom) asks: What's the IP for cdn.example.com?
Intelligent DNS: Shanghai Telecom's CDN node is 5.6.7.8
```

**调度维度**：
| 维度                | 描述                                | 作用                                |
| :---------------- | :--------------------------------- | :---------------------------------- |
| **地理位置**       | 按省/市/国家分配                    | 附近访问，降低延迟                  |
| **ISP**            | 联通/电信/移动/BGP                  | 同ISP传输，避免跨ISP               |
| **节点负载**       | 实时CPU/带宽/QPS                    | 避免节点过载                        |
| **节点健康**       | 可用性探测                           | 自动移除故障节点                     |
| **成本因素**       | 带宽单价差异                         | 平衡性能与成本                       |

### 4.2 HTTP DNS 与直接IP连接

传统DNS存在一个问题：**DNS劫持和解析延迟**。

**HTTP DNS 解决方案**：

```
Client → Bypasses system DNS → Directly queries HTTP DNS service (e.g., 223.5.5.5:80)
         ↓
    Returns optimal IP list (with weights)
         ↓
    Client probes network quality and selects the best IP
```

优势：

- 防劫持：绕过ISP DNS
- 更精准：可以根据客户端网络质量选择IP
- 实时性：故障切换更快

**实用建议**：

- 强烈建议移动应用集成HTTP DNS
- Web应用可以使用CDN提供的基于CNAME的调度
- 关键服务可以实现多IP故障切换（一个域名返回多个IP）

---

## 5. HTTPS优化：平衡安全性与性能

<HttpsOptimizationDemo />

### 5.1 在CDN上使用HTTPS的重要动机

**场景对比**：

```
Without HTTPS:
User accesses http://cdn.example.com/image.jpg
↓
Browser address bar shows "Not Secure"
↓
Some browsers/APPs directly block access
↓
SEO ranking drops
```

```
With HTTPS:
User accesses https://cdn.example.com/image.jpg
↓
Browser shows green lock icon
↓
HTTP/2 multiplexing takes effect
↓
Performance + security both improved
```

### 5.2 CDN HTTPS 配置要点

#### 证书管理

| 方案                           | 描述                                | 成本                   | 使用场景                       |
| :----------------------------- | :--------------------------------- | :-------------------- | :---------------------------- |
| **云提供商免费证书**           | 由阿里云/腾讯云提供                 | 免费                   | 单域名，快速启动              |
| **Let's Encrypt**              | 社区免费证书                        | 免费                   | 自动化部署                      |
| **商业 DV/OV/EV 证书**         | Symantec、GeoTrust 等               | 每年几百到几万人民币      | 企业需绿色地址栏               |
| **通配符证书**                 | \*.example.com                     | 每年几千人民币           | 多子域名                        |

**实用建议**：

- 测试环境：使用 Let's Encrypt 或云提供商免费证书
- 生产环境：使用通配符证书（方便）或单域名 OV 证书（成本效益高）
- 注意证书到期时间；设置自动续期提醒

#### HTTPS 优化配置

**TLS 版本选择**：

```
Recommended: TLS 1.2 and TLS 1.3 only
Compatibility: TLS 1.1 + TLS 1.2 + TLS 1.3 (for legacy browsers)
```

**密码套件**：

```
Recommended: ECDHE key exchange + AES-GCM encryption
Disabled: DES, RC4, MD5, SHA1
```

**OCSP钉扎**:

```
Function: CDN node pre-fetches certificate revocation status
Effect: Reduces client verification time by 200-500ms
Recommendation: Always enable
```

**TLS 会话恢复**:

```
Session ID resumption: Client sends last Session ID, server resumes session
Session Ticket resumption: Server encrypts session state and sends to client, client sends it back next time
Effect: Avoids full TLS handshake, saves 1-RTT
```

### 5.3 CDN 上的 HTTP/2 和 HTTP/3

**HTTP/2 多路复用**:

```
HTTP/1.1:
Request 1 (index.html) ────────────────→
Response 1 ←──────────────────────────────
Request 2 (style.css) ─────────────────→
Response 2 ←──────────────────────────────
Request 3 (script.js) ─────────────────→
Response 3 ←──────────────────────────────
(Serial, one finishes before the next)

HTTP/2:
Request 1 ──→
Request 2 ──→   Merged on one TCP connection, frames interleaved
Request 3 ──→
Response 1 ←──   Streamed back by priority
Response 2 ←──
Response 3 ←──
(Parallel, one connection multiplexed)
```

**HTTP/2 服务器推送**:

```
Scenario: User requests index.html, which references style.css and script.js

Traditional approach:
1. User downloads index.html
2. Parsing discovers style.css and script.js are needed
3. Two more requests to fetch them

HTTP/2 Push:
1. User requests index.html
2. CDN node returns index.html while proactively pushing style.css and script.js
3. When the user parses the HTML, the resources are already in the cache

Note: Push cautiously—too much wastes bandwidth, too little has no effect
```

**HTTP/3 (QUIC)**：

```
HTTP/2 problem: TCP-based, head-of-line blocking
→ One TCP packet lost, entire connection waits for retransmission

HTTP/3 solution: QUIC-based (reliable transport over UDP)
→ Each stream is independent; one stream blocked doesn't affect others
→ Connection migration: WiFi to 4G switch, connection doesn't drop
→ 0-RTT handshake: Fast connection establishment even on first visit

Current status: As of 2024, mainstream CDNs support HTTP/3; recommended to enable
```

---

## 6. 访问分析：了解您的 CDN 报告

<AccessAnalyticsDemo />

### 6.1 核心指标解析

#### 带宽

```
Definition: Amount of data transferred per unit of time
Unit: bps (bits per second), Mbps, Gbps

CDN bandwidth = Total egress traffic from all edge nodes

Note the distinction:
- Billing bandwidth: Usually billed by 95th percentile peak or daily peak
- Actual bandwidth: Real-time transfer rate
```

**带宽与流量之间的关系**：

```
1 Mbps bandwidth running continuously for 1 hour = 450 MB of traffic
(Calculation: 1,000,000 bps × 3600s ÷ 8 ÷ 1024 ÷ 1024 ≈ 429 MB)
```

#### 每秒查询数 (QPS)

```
Definition: Number of queries/requests per second

CDN QPS = Total HTTP requests processed per second across all edge nodes

Note: High QPS doesn't mean high bandwidth
- Small file scenarios: High QPS, low bandwidth
- Large file scenarios: Low QPS, high bandwidth
```

#### 命中率

```
Definition: Proportion of requests served from CDN edge node cache out of total requests

Formula:
Hit Ratio = (Hits / Total Requests) × 100%
or
Hit Ratio = (1 - Origin Fetch Traffic / Total Egress Traffic) × 100%

Industry standards:
- Images/videos/JS/CSS: > 95%
- HTML pages: 50-80% (depending on update frequency)
- API endpoints: Usually not cached or very low
```

**命中率低的常见原因**：

| 原因                    | 症状                               | 解决方案                                  |
| :--------------------- | :-------------------------------- | :-------------------------------------- |
| 缓存时间过短            | TTL 仅几分钟                        | 根据文件类型调整 TTL                      |
| 查询参数变化            | URL 携带随机数字                     | 配置忽略特定参数                          |
| 缓存键不当              | 不应区分的内容被区分                  | 优化缓存键规则                            |
| 内容频繁更新            | 文件被频繁覆盖                       | 使用版本号或哈希文件名                     |
| 首次访问量大            | 新内容或新节点                        | 预热缓存                                 |

### 6.2 日志分析与故障排查

#### CDN 日志字段解析

典型的 CDN 访问日志包含以下字段：

```
Time | Client IP | Request Method | URL | HTTP Status Code | Response Size | Cache Status | Response Time | Referer | User-Agent

Example:
2024-01-15 14:32:01 | 114.114.114.114 | GET | https://cdn.example.com/images/photo.jpg | 200 | 153600 | HIT | 23 | https://example.com/ | Mozilla/5.0...
```

关键字段说明：

| 字段            | 描述                 | 分析值                                               |
| :--------------- | :------------------- | :--------------------------------------------------- |
| `cache_status`   | 缓存状态             | HIT（命中）、MISS（未命中）、EXPIRED（已过期）                  |
| `response_time`  | 响应时间（毫秒）     | 决定用户体验；如果 >500ms 则需优化                     |
| `http_status`   | HTTP 状态码          | 排查 404/500 错误                                     |
| `bytes_sent`   | 发送字节数           | 带宽统计                                               |

#### 常见故障排除

**问题 1：用户报告访问缓慢**

故障排除步骤：

```
1. Check log response_time
   - If high (>500ms): Check if cache MISS or slow origin

2. Check cache_status
   - HIT: Cache hit; slowness may be due to large file or node issue
   - MISS: Cache miss; need to optimize cache strategy or hit ratio

3. Check client IP distribution
   - Slow in certain regions: May be high node load or insufficient coverage
```

**问题 2：缓存未生效，总是从源站获取**

故障排查清单：

```
□ Does the origin response header have Cache-Control: no-cache / private?
□ Does the URL carry random parameters (e.g., ?_=123456)?
□ Is the cache key configuration correct?
□ Is the TTL too short?
□ Is it hitting the browser's local cache instead of CDN?
```

**问题 3：成本骤增**

调查方向：

```
1. Check bill details
   - High CDN traffic cost: Check if large files are being frequently accessed or hotlinked
   - High origin fetch traffic cost: Check if hit ratio has dropped sharply
   - High request count cost: Check for CC attacks or crawlers

2. Check access logs
   - Are there many 404 requests (possibly scanning or configuration errors)?
   - Is the Referer abnormal (to determine if hotlinking)?

3. Security settings
   - Enable hotlink protection (Referer whitelist)
   - Enable IP blacklist/whitelist
   - Configure CC protection
```

---

## 7. 真实案例研究：从零构建图像加速解决方案

### 7.1 业务场景

假设你是一个图像分享社区的技术负责人，面临以下挑战：

- **用户上传**：每天上传 100 万张图片（平均每张 2MB）
- **用户访问**：每天有 5000 万次图片浏览请求
- **访问分布**：用户遍布全国，部分海外访问
- **性能要求**：图片加载时间 < 500ms
- **预算**：尽量保持在每月 50,000 元人民币以内

### 7.2 架构设计

```
                         ┌──────────────────────────────────────┐
                         │           User Upload Flow              │
                         └──────────────────────────────────────┘

   User Browser                                Backend Service                  Object Storage
       │                                            │                               │
       │  1. Request upload credentials              │                               │
       │───────────────────────────────────────────>│                               │
       │                                            │                               │
       │                                            │  2. Request STS temp credentials│
       │                                            │──────────────────────────────>│
       │                                            │                               │
       │                                            │  3. Return STS credentials    │
       │                                            │<──────────────────────────────│
       │                                            │                               │
       │  4. Return upload credentials (with STS)   │                               │
       │<───────────────────────────────────────────│                               │
       │                                            │                               │
       │  5. Direct file upload (using STS signature)│                              │
       │──────────────────────────────────────────────────────────────────────────>│
       │                                            │                               │
       │  6. Return upload result (URL, ETag, etc.) │                               │
       │<──────────────────────────────────────────────────────────────────────────│
       │                                            │                               │
       │  7. Notify backend upload complete (save to DB)│                           │
       │───────────────────────────────────────────>│                               │


                         ┌──────────────────────────────────────┐
                         │           User Access Flow              │
                         └──────────────────────────────────────┘

   User Browser              DNS Resolution            CDN Node              Object Storage (Origin)
       │                         │                        │                        │
       │  1. Request image URL   │                        │                        │
       │────────────────────────────────────────────────>│                        │
       │                         │                        │                        │
       │                         │  2. DNS query          │                        │
       │                         │───────────────────────>│                        │
       │                         │                        │                        │
       │                         │  3. Return optimal node IP│                     │
       │                         │<───────────────────────│                        │
       │                         │                        │                        │
       │  4. Connect to CDN node │                        │                        │
       │────────────────────────────────────────────────>│                        │
       │                         │                        │                        │
       │                         │  5. Check cache        │                        │
       │                         │                        ├─ Hit? Return directly  │
       │                         │                        └─ Miss? Continue       │
       │                         │                        │                        │
       │                         │                        │  6. Origin fetch       │
       │                         │                        │───────────────────────>│
       │                         │                        │                        │
       │                         │                        │  7. Return file        │
       │                         │                        │<───────────────────────│
       │                         │                        │                        │
       │                         │  8. Cache and respond  │                        │
       │<────────────────────────────────────────────────│                        │
```

### 7.3 关键配置细节

#### 对象存储配置

**存储桶规划**：

```
 Bucket: myapp-images-prod
 ├─ Directory structure:
 │   ├─ uploads/           # Original images uploaded by users
 │   │   ├─ 2024/01/15/user123-abc.jpg
 │   │   └─ 2024/01/15/user456-def.png
 │   ├─ thumbnails/        # Thumbnails
 │   │   ├─ small/         # 100×100
 │   │   ├─ medium/        # 400×300
 │   │   └─ large/         # 800×600
 │   └─ processed/         # Processed images (watermarked, etc.)
 │
 ├─ Access permissions:
 │   ├─ Original images directory: Private (requires signed access)
 │   ├─ Thumbnails directory: Public read
 │   └─ CORS: Allow *.myapp.com access
 │
 └─ Lifecycle policies:
     ├─ 7 days after upload: Infrequent Access storage (save 40% cost)
     ├─ 90 days after upload: Archive storage (save 70% cost)
     └─ 3 years after upload: Auto-delete (or transfer to cheaper cold storage)
```

**CORS 配置**：

```xml
<CORSConfiguration>
  <CORSRule>
    <AllowedOrigin>https://myapp.com</AllowedOrigin>
    <AllowedOrigin>https://www.myapp.com</AllowedOrigin>
    <AllowedMethod>GET</AllowedMethod>
    <AllowedMethod>HEAD</AllowedMethod>
    <AllowedHeader>*</AllowedHeader>
    <ExposeHeader>ETag</ExposeHeader>
    <ExposeHeader>x-oss-request-id</ExposeHeader>
    <MaxAgeSeconds>3600</MaxAgeSeconds>
  </CORSRule>
</CORSConfiguration>
```

#### CDN 加速配置

**缓存策略配置**：

```
Global default rules:
├─ Cache key: URL path + keep w, h, format query params
├─ Default TTL: 7 days
└─ Origin HOST: Auto-follow

By file type:
├─ *.html:
│   ├─ TTL: 5 minutes
│   └─ Prefer memory cache reads
│
├─ *.js, *.css:
│   ├─ TTL: 1 year
│   └─ Ignore query params (since filenames have hashes)
│
├─ *.jpg, *.png, *.gif, *.webp:
│   ├─ TTL: 30 days
│   ├─ Keep query params (w, h, format for dynamic resizing)
│   └─ Enable automatic image compression optimization
│
└─ /api/*:
    ├─ TTL: 0 (no cache)
    └─ Direct origin fetch
```

**HTTPS 优化配置**：

```
Certificate configuration:
├─ Certificate type: Wildcard certificate *.myapp.com
├─ Deployment method: Upload via CDN console, auto-renewal
└─ Backup certificate: EV certificate for main domain (shows green address bar)

TLS configuration:
├─ Minimum TLS version: 1.2 (balance compatibility and security)
├─ Maximum TLS version: 1.3
├─ Cipher suites: Only enable strong cipher suites
├─ OCSP Stapling: Enabled
├─ TLS Session Resumption: Enable Session Ticket
└─ HSTS: Enabled (max-age=31536000)

HTTP/2 and HTTP/3:
├─ HTTP/2: Enabled (multiplexing, header compression)
├─ HTTP/2 Server Push: Enable as needed (Preload recommended as alternative)
└─ HTTP/3 (QUIC): Enabled (experimental feature, gradual rollout)
```

### 7.4 成本控制策略

#### 成本分解分析

```
Monthly CDN + Object Storage cost breakdown:

CDN portion:
├─ Downstream traffic cost (major, ~60%)
│   ├─ China mainland: 0.15-0.30 CNY/GB
│   ├─ Asia-Pacific: 0.40-0.80 CNY/GB
│   └─ Europe & Americas: 0.30-0.60 CNY/GB
│
├─ Request count cost (minor, ~5%)
│   ├─ HTTP: 0.01-0.05 CNY per 10,000 requests
│   └─ HTTPS: 0.05-0.15 CNY per 10,000 requests (TLS handshake consumes resources)
│
├─ Peak bandwidth cost (optional billing method)
│   └─ 95th percentile billing: Suitable for highly fluctuating traffic
│
└─ Value-added feature costs (~5%)
    ├─ HTTPS certificate management
    ├─ WAF protection
    ├─ Real-time log push
    └─ Edge scripts/functions

Object Storage portion:
├─ Storage capacity cost (~15%)
│   ├─ Standard storage: 0.12-0.15 CNY/GB/month
│   ├─ Infrequent Access storage: 0.08-0.10 CNY/GB/month
│   └─ Archive storage: 0.03-0.05 CNY/GB/month
│
├─ Request costs (~5%)
│   ├─ PUT: 0.01-0.05 CNY per 10,000 requests
│   └─ GET: 0.005-0.01 CNY per 10,000 requests
│
├─ Data retrieval costs (Infrequent Access/Archive)
│   └─ Early deletion or retrieval incurs additional fees
│
└─ Origin fetch egress traffic cost (~10%)
    └─ Traffic cost for CDN origin fetch to object storage
```

#### 实践中的节省成本技巧

**技巧 1：使用自动生命周期管理的存储分层**

```yaml
# Lifecycle rule example
rules:
  - id: image-lifecycle
    prefix: uploads/
    transitions:
      # After 7 days, transition to IA storage, save 30% cost
      - days: 7
        storageClass: IA
      # After 90 days, transition to Archive storage, save 70% cost
      - days: 90
        storageClass: Archive
    # Auto-delete after 3 years
    expiration:
      days: 1095
```

**技巧 2：提高 CDN 命中率，减少源站获取**

```
What does improving hit ratio from 90% to 95% mean?

Assuming:
- Daily traffic: 10 TB
- Hit ratio 90%: 1 TB origin fetch
- Hit ratio 95%: 0.5 TB origin fetch

Origin fetch savings: 0.5 TB/day × 0.15 CNY/GB × 30 days = 2,250 CNY/month
```

**技巧 3：压缩与格式优化**

```
Image optimization plan:
├─ Store original images in object storage (not directly exposed)
├─ Enable CDN image processing:
│   ├─ Auto format conversion: JPEG → WebP/AVIF (save 30-50%)
│   ├─ Auto quality compression: Visually lossless compression (save 20-40%)
│   ├─ Responsive sizing: Return appropriate size based on device
│   └─ Progressive loading: Blur to sharp
└─ Result: Bandwidth cost reduced by 50-70%
```

**提示 4：带宽峰值限制和警报**

```yaml
# Bandwidth cap configuration
bandwidth_cap:
  daily_limit: 500 # Mbps, auto-disable CDN if daily peak exceeds
  monthly_limit: 10000 # GB, disable if monthly traffic exceeds

  # Alert thresholds
  alerts:
    - threshold: 70% # Alert at 70%
      channels: [sms, email]
    - threshold: 90% # Call at 90%
      channels: [phone]
```

---

## 8. 总结：对象存储 CDN 的黄金法则

### 8.1 架构设计原则

**原则 1：区分静态内容和动态内容**

```
Dynamic content (API, HTML) → Route to origin or edge functions
Static content (images, JS, CSS, videos) → Route through CDN + object storage
```

**原则二：服务身边**

```
Content is cached wherever the users are
→ Choose a CDN provider with broad coverage
→ Enable intelligent DNS scheduling
→ Preheat important content in advance
```

**原则3：分层缓存**

```
Browser local cache (strongest)
    ↓
CDN edge node cache (second strongest)
    ↓
CDN mid-tier/regional node (fallback)
    ↓
Object storage/origin (last line of defense)
```

**原则4：平衡成本与体验**

```
Storage tiering: Hot data on standard storage, cold data on archive storage
Cache strategy: Long TTL for high-frequency content, short TTL for low-frequency content
Compression optimization: WebP/AVIF formats, intelligent quality compression
Monitoring and alerts: Set bandwidth caps, prevent abnormal traffic
```

### 8.2 陷阱检查清单

**存储桶命名和权限**

- [ ] 存储桶名称必须全局唯一；避免名称冲突
- [ ] 私有文件不应设置为公开读取
- [ ] 不要在前端代码中写入 AccessKey；使用 STS 临时凭证
- [ ] 启用服务器端加密（SSE）以保护敏感数据

**CDN 缓存配置**

- [ ] HTML 文件的 TTL 不应太长（推荐 < 5 分钟）
- [ ] JS/CSS 应使用带哈希的文件名，TTL 设置为 1 年
- [ ] 缓存键应合理；不要包含用户特定变量
- [ ] 记得在重要更新后清理缓存或预热缓存

**HTTPS 安全**

- [ ] 证书不可过期；设置自动续期
- [ ] 最低 TLS 版本应为 1.2
- [ ] 启用 HSTS 防止降级攻击
- [ ] 对敏感 Cookie 设置 Secure 和 HttpOnly 标志

**成本控制**

- [ ] 启用带宽上限警报以防止异常流量
- [ ] 不常访问/归档存储有最短存储期限及提前删除费用；注意规则
- [ ] 源站拉取流量也很昂贵；努力提升 CDN 命中率
- [ ] 定期分析访问日志并清理僵尸资源

---

## 9. 实用代码模板

### 9.1 前端直接上传到对象存储（JavaScript）

```javascript
/**
 * Object Storage Direct Upload Utility
 * Supports: Alibaba Cloud OSS, Tencent Cloud COS, AWS S3
 */
class DirectUploader {
  constructor(config) {
    this.provider = config.provider // 'oss' | 'cos' | 's3'
    this.region = config.region
    this.bucket = config.bucket
    this.getCredentials = config.getCredentials // Function to fetch temporary credentials
  }

  /**
   * Fetch STS temporary credentials
   */
  async fetchCredentials() {
    // Request temporary credentials from backend
    const credentials = await this.getCredentials()
    return {
      accessKeyId: credentials.accessKeyId,
      accessKeySecret: credentials.accessKeySecret,
      sessionToken: credentials.securityToken || credentials.sessionToken,
      expiration: credentials.expiration
    }
  }

  /**
   * Generate upload signature (for client-side signature computation)
   */
  generateSignature(credentials, fileKey, fileType, options = {}) {
    const timestamp = new Date().toISOString()
    const date = timestamp.slice(0, 10).replace(/-/g, '')

    // Signature algorithms differ slightly by provider
    switch (this.provider) {
      case 'oss':
        return this._ossSignature(credentials, fileKey, date, options)
      case 'cos':
        return this._cosSignature(credentials, fileKey, date, options)
      case 's3':
        return this._s3Signature(credentials, fileKey, date, options)
      default:
        throw new Error('Unknown provider')
    }
  }

  /**
   * Single file upload (small files < 100MB)
   */
  async upload(file, options = {}) {
    const credentials = await this.fetchCredentials()
    const fileKey = this._generateFileKey(file, options.directory)

    const formData = new FormData()

    // Build form fields (field names differ by provider)
    const formFields = this._buildFormFields(
      credentials,
      fileKey,
      file.type,
      options
    )
    Object.entries(formFields).forEach(([key, value]) => {
      formData.append(key, value)
    })

    formData.append('file', file)

    // Send upload request
    const uploadUrl = this._getUploadUrl()
    const response = await fetch(uploadUrl, {
      method: 'POST',
      body: formData,
      // For large files, you may need a longer timeout
      signal: options.signal // Support AbortController to cancel upload
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Upload failed: ${response.status} ${errorText}`)
    }

    return {
      url: this._getFileUrl(fileKey),
      key: fileKey,
      etag: response.headers.get('ETag'),
      size: file.size
    }
  }

  /**
   * Multipart upload (large files > 100MB)
   */
  async multipartUpload(file, options = {}) {
    const partSize = options.partSize || 10 * 1024 * 1024 // Default 10MB per part
    const parallel = options.parallel || 3 // Default 3 concurrent

    const credentials = await this.fetchCredentials()
    const fileKey = this._generateFileKey(file, options.directory)

    // 1. Initialize multipart upload
    const uploadId = await this._initMultipartUpload(
      credentials,
      fileKey,
      file.type
    )

    // 2. Calculate parts
    const parts = []
    const totalParts = Math.ceil(file.size / partSize)
    for (let i = 0; i < totalParts; i++) {
      const start = i * partSize
      const end = Math.min(start + partSize, file.size)
      parts.push({
        number: i + 1,
        start,
        end,
        blob: file.slice(start, end)
      })
    }

    // 3. Upload parts (with concurrency control and resumable upload)
    const uploadedParts = []
    const failedParts = []

    // Support resumable upload: check which parts are already uploaded
    if (options.resume) {
      const existingParts = await this._listParts(
        credentials,
        fileKey,
        uploadId
      )
      for (const part of existingParts) {
        uploadedParts.push(part)
      }
    }

    // Filter out already uploaded parts
    const pendingParts = parts.filter(
      (p) => !uploadedParts.some((up) => up.partNumber === p.number)
    )

    // Concurrent upload
    const uploadPart = async (part) => {
      try {
        const etag = await this._uploadPart(
          credentials,
          fileKey,
          uploadId,
          part
        )
        return { partNumber: part.number, etag }
      } catch (error) {
        failedParts.push({ part, error })
        throw error
      }
    }

    // Use Promise.all to control concurrency
    const chunks = []
    for (let i = 0; i < pendingParts.length; i += parallel) {
      chunks.push(pendingParts.slice(i, i + parallel))
    }

    for (const chunk of chunks) {
      const results = await Promise.allSettled(chunk.map(uploadPart))
      for (const result of results) {
        if (result.status === 'fulfilled') {
          uploadedParts.push(result.value)
        }
      }
    }

    // Check if all parts uploaded successfully
    if (uploadedParts.length !== totalParts) {
      throw new Error(
        `Upload incomplete: ${uploadedParts.length}/${totalParts} parts uploaded`
      )
    }

    // 4. Complete multipart upload (merge parts)
    await this._completeMultipartUpload(
      credentials,
      fileKey,
      uploadId,
      uploadedParts
    )

    return {
      url: this._getFileUrl(fileKey),
      key: fileKey,
      size: file.size,
      parts: totalParts
    }
  }

  /**
   * Generate file storage path
   */
  _generateFileKey(file, directory = '') {
    const date = new Date()
    const datePath = `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`
    const random = Math.random().toString(36).substring(2, 10)
    const ext = file.name.split('.').pop() || 'bin'
    const key = directory
      ? `${directory}/${datePath}/${random}.${ext}`
      : `${datePath}/${random}.${ext}`
    return key
  }

  // ============ Provider-Specific Methods ============

  _getUploadUrl() {
    switch (this.provider) {
      case 'oss':
        return `https://${this.bucket}.oss-${this.region}.aliyuncs.com`
      case 'cos':
        return `https://${this.bucket}.cos.${this.region}.myqcloud.com`
      case 's3':
        return `https://${this.bucket}.s3.${this.region}.amazonaws.com`
      default:
        throw new Error('Unknown provider')
    }
  }

  _getFileUrl(key) {
    return `https://${this.bucket}.${this.provider === 'oss' ? 'oss' : 'cos'}-${this.region}.${
      this.provider === 'oss'
        ? 'aliyuncs.com'
        : this.provider === 'cos'
          ? 'myqcloud.com'
          : 'amazonaws.com'
    }/${key}`
  }

  // Provider-specific signature, multipart upload methods... (implement as needed)
  _buildFormFields(credentials, fileKey, fileType, options) {
    // Provider-specific form field construction logic
    // Implement according to each provider's documentation
    return {}
  }

  async _initMultipartUpload(credentials, fileKey, fileType) {
    // Provider-specific multipart upload initialization logic
    return 'upload-id'
  }

  async _uploadPart(credentials, fileKey, uploadId, part) {
    // Provider-specific part upload logic
    return 'etag'
  }

  async _completeMultipartUpload(credentials, fileKey, uploadId, parts) {
    // Provider-specific multipart upload completion logic
  }

  async _listParts(credentials, fileKey, uploadId) {
    // Provider-specific logic to list uploaded parts
    return []
  }
}

// Usage example
const uploader = new DirectUploader({
  provider: 'oss',
  region: 'cn-beijing',
  bucket: 'myapp-images-prod',
  getCredentials: async () => {
    // Request temporary credentials from backend
    const res = await fetch('/api/upload/credentials')
    return res.json()
  }
})

// Small file upload
async function uploadAvatar(file) {
  try {
    const result = await uploader.upload(file, {
      directory: 'avatars',
      onProgress: (progress) => {
        console.log(`Upload progress: ${progress.percent}%`)
      }
    })
    console.log('Upload successful:', result.url)
    return result
  } catch (error) {
    console.error('Upload failed:', error)
    throw error
  }
}

// Large file multipart upload
async function uploadVideo(file) {
  try {
    const result = await uploader.multipartUpload(file, {
      directory: 'videos',
      partSize: 10 * 1024 * 1024, // 10MB per part
      parallel: 3, // 3 concurrent
      resume: true, // Support resumable upload
      onProgress: (progress) => {
        console.log(
          `Upload progress: ${progress.percent}%, uploaded ${progress.loaded}/${progress.total}`
        )
      },
      onPartComplete: (part) => {
        console.log(`Part ${part.number} upload complete`)
      }
    })
    console.log('Upload successful:', result.url)
    return result
  } catch (error) {
    console.error('Upload failed:', error)
    // You can implement retry logic or save checkpoint info here
    throw error
  }
}
```

### 9.2 后端临时凭证服务（Node.js/Express）

```javascript
/**
 * Object Storage STS Temporary Credential Service
 * Supports: Alibaba Cloud OSS, Tencent Cloud COS, AWS S3
 */
const express = require('express')
const STS = require('ali-oss').STS // Alibaba Cloud
// const COS = require('cos-nodejs-sdk-v5') // Tencent Cloud
const router = express.Router()

// Configuration
const config = {
  // Alibaba Cloud OSS configuration
  oss: {
    accessKeyId: process.env.OSS_ACCESS_KEY_ID,
    accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET,
    region: 'oss-cn-beijing',
    bucket: 'myapp-images-prod',
    // STS role ARN (needs to be created in RAM console)
    roleArn: process.env.OSS_STS_ROLE_ARN
  }
}

/**
 * Get STS temporary credentials (Alibaba Cloud OSS)
 * POST /api/upload/credentials
 */
router.post('/credentials', async (req, res) => {
  try {
    // 1. Verify user identity (implement as needed)
    const userId = req.user?.id
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    // 2. Generate unique file path prefix (for permission isolation)
    const date = new Date()
    const prefix = `uploads/${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${userId}/`

    // 3. Create STS client
    const sts = new STS({
      accessKeyId: config.oss.accessKeyId,
      accessKeySecret: config.oss.accessKeySecret
    })

    // 4. Request temporary credentials
    const result = await sts.assumeRole(
      config.oss.roleArn,
      {
        // Policy restricts permission scope (principle of least privilege)
        Statement: [
          {
            Effect: 'Allow',
            Action: [
              'oss:PutObject',
              'oss:InitiateMultipartUpload',
              'oss:UploadPart',
              'oss:CompleteMultipartUpload',
              'oss:AbortMultipartUpload',
              'oss:ListParts'
            ],
            Resource: [`acs:oss:*:*:${config.oss.bucket}/${prefix}*`]
          }
        ],
        Version: '1'
      },
      3600, // Credential validity: 1 hour
      'web-upload-session-' + Date.now()
    )

    // 5. Return credentials and configuration
    res.json({
      success: true,
      data: {
        // STS temporary credentials
        credentials: {
          accessKeyId: result.credentials.AccessKeyId,
          accessKeySecret: result.credentials.AccessKeySecret,
          sessionToken: result.credentials.SecurityToken,
          expiration: result.credentials.Expiration
        },
        // Upload configuration
        config: {
          provider: 'oss',
          region: config.oss.region,
          bucket: config.oss.bucket,
          endpoint: `https://${config.oss.bucket}.${config.oss.region}.aliyuncs.com`,
          prefix: prefix, // File path prefix
          // Security limits
          maxSize: 100 * 1024 * 1024, // Max 100MB
          allowedTypes: [
            'image/jpeg',
            'image/png',
            'image/gif',
            'image/webp',
            'video/mp4'
          ]
        }
      }
    })
  } catch (error) {
    console.error('Get credentials failed:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to get upload credentials',
      message: error.message
    })
  }
})

/**
 * Callback notification: frontend notifies backend after upload completes
 * POST /api/upload/callback
 */
router.post('/callback', async (req, res) => {
  try {
    const { key, etag, size, mimeType, originalName } = req.body
    const userId = req.user?.id

    // 1. Verify file existence
    // 2. Save file info to database
    const fileRecord = await db.files.create({
      userId,
      key,
      etag,
      size,
      mimeType,
      originalName,
      url: `https://cdn.example.com/${key}`,
      createdAt: new Date()
    })

    // 3. Async processing: generate thumbnails, extract metadata, content moderation, etc.
    await processFileAsync(fileRecord)

    res.json({
      success: true,
      data: {
        fileId: fileRecord.id,
        url: fileRecord.url,
        size: fileRecord.size
      }
    })
  } catch (error) {
    console.error('Upload callback failed:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to process uploaded file'
    })
  }
})

module.exports = router
```

### 9.3 热链接保护与安全配置

```javascript
/**
 * CDN Hotlink Protection and Security Configuration Example
 */

// 1. Referer hotlink protection (prevent other websites from directly referencing your resources)
const refererConfig = {
  // Whitelist mode: only allow the following Referers
  allowList: [
    '*.myapp.com', // Main site
    '*.myapp.cn', // Domestic site
    'localhost:*', // Local development
    '127.0.0.1:*'
  ],

  // Blacklist mode (optional): block the following Referers
  blockList: [
    '*.competitor.com', // Competitors
    'spam-site.com'
  ],

  // Empty Referer handling: whether to allow direct access (typing URL in browser address bar)
  allowEmptyReferer: false // Recommended false for production, can be true for testing
}

// 2. URL authentication (more secure hotlink protection with timestamp and signature)
class URLAuth {
  constructor(config) {
    this.key = config.key // Authentication key, stored only on the server
    this.expireTime = config.expireTime || 3600 // Default 1 hour validity
  }

  /**
   * Generate an authenticated URL
   * @param {string} url - Original URL, e.g., https://cdn.example.com/images/photo.jpg
   * @param {number} expireIn - Validity period (seconds)
   * @returns {string} URL with authentication parameters
   */
  sign(url, expireIn = this.expireTime) {
    const urlObj = new URL(url)
    const pathname = urlObj.pathname
    const timestamp = Math.floor(Date.now() / 1000) + expireIn

    // Construct signature string (format varies by provider; this is a generic example)
    const signStr = `${pathname}-${timestamp}-${this.key}`
    const signature = this._md5(signStr)

    // Add authentication parameters
    urlObj.searchParams.set('sign', signature)
    urlObj.searchParams.set('t', timestamp.toString())

    return urlObj.toString()
  }

  /**
   * Verify URL signature (used at CDN edge or origin)
   */
  verify(url) {
    const urlObj = new URL(url)
    const signature = urlObj.searchParams.get('sign')
    const timestamp = parseInt(urlObj.searchParams.get('t'))
    const pathname = urlObj.pathname

    // Check if expired
    if (timestamp < Math.floor(Date.now() / 1000)) {
      return { valid: false, error: 'URL expired' }
    }

    // Verify signature
    const signStr = `${pathname}-${timestamp}-${this.key}`
    const expectedSign = this._md5(signStr)

    if (signature !== expectedSign) {
      return { valid: false, error: 'Invalid signature' }
    }

    return { valid: true }
  }

  _md5(str) {
    // In real projects, use crypto-js or another MD5 library
    // This is a demonstration only
    return require('crypto').createHash('md5').update(str).digest('hex')
  }
}

// Usage example
const auth = new URLAuth({
  key: 'your-secret-key-only-known-by-server',
  expireTime: 3600 // 1 hour validity
})

// Server generates signed URL
const signedUrl = auth.sign(
  'https://cdn.example.com/private/document.pdf',
  7200
)
// Result: https://cdn.example.com/private/document.pdf?sign=xxxxx&t=1699123456

// CDN edge or origin verification
const result = auth.verify(signedUrl)
if (!result.valid) {
  // Return 403 Forbidden
}

// 3. IP Blacklist/Whitelist
const ipConfig = {
  // Only allow specific IPs (suitable for internal systems)
  whiteList: [
    '192.168.1.0/24', // Internal network segment
    '10.0.0.0/8'
  ],

  // Block specific IPs (ban attackers)
  blackList: ['1.2.3.4', '5.6.7.8']
}

// 4. UA (User-Agent) Blacklist/Whitelist
const uaConfig = {
  // Block crawlers/download tools
  blackList: [
    'Wget',
    'curl',
    'python-requests',
    'Scrapy',
    'AhrefsBot',
    'SemrushBot'
  ],

  // Only allow browser access (strict mode)
  whiteList: [
    'Mozilla/*', // Modern browsers
    'AppleWebKit/*'
  ]
}
```

---

## 10. 词汇表

|英文术语 |中文翻译 |解释 |
|:------------------------- |:------------------- |:---------------------------------------------------------------------------------------------------------- |
|**对象存储** |对象存储             |一种将数据作为对象而非文件系统层级管理的数据存储架构。适合存储图片、视频、备份及其他非结构化数据。|
|**桶** |存储桶               |对象存储中的顶层容器，用于组织和隔离数据。每个桶都有独立的权限控制和配置。|
|**对象** |对象/文件对象        |对象存储的基本单元，包括数据本身、元数据和一个全局唯一键。|
|**加元** |内容分发网络         |内容分发网络。通过全球部署边缘节点，将网站内容缓存到更接近用户的地点，加速访问。|
|**边节点** |边缘节点             |缓存服务器部署在CDN网络的各个区域，直接向用户提供内容。|
|**起源** |源站                 |CDN在缓存未命中时获取内容的服务器，可以是对象存储、ECS或自管理服务器。|
|**缓存击中** |缓存命中             |请求的内容已经存在于CDN边缘节点上，并且可以直接返回，无需从原点获取。|
|**Cache小姐** |缓存未命中           |边缘节点没有请求的内容，必须从源节点获取。|
|**命中率** |命中率               |缓存命中率占总请求数的比例。命中率越高，源取次数越少，成本越低。
|**TTL** |生存时间/缓存时间    |存活时间。内容缓存在CDN节点上的有效期。内容过期后必须从原点重新获取。|
|**返回源代码** |回源                 |CDN边缘节点向源节点请求内容的过程。|
|**清理/刷新** |刷新缓存             |强制CDN缓存失效，使下一个请求从源地获取最新内容。|
|**预热** |预热                 |在正式发布前主动推送内容到CDN节点，使用户首次访问时就能进入缓存。
|**科尔斯** |跨域资源共享         |跨源资源共享。一种控制不同域间资源访问的浏览器安全机制。|
|**裁判** |来源页面             |HTTP 请求头字段，指示请求从哪个页面被链接。用于热链接保护。
|**STS** |安全令牌服务         |安全令牌服务。一种发布临时访问凭证的服务，用于前端直接上传等场景。|
|**多部分上传** |分片上传             |将大文件拆分成多个块以便并行上传，支持可重复上传以提高效率和可靠性。|
|**ETag** |实体标签             |HTTP 响应头用于识别资源的特定版本，通常用于缓存验证。|
|**S3 API** |S3 兼容接口 |AWS S3 的对象存储 API 规范，大多数云服务提供商的对象存储服务都兼容。|
|**规范查询字符串** |规范查询字符串       |用于计算请求签名的签名字符串的一部分，确保请求不会被篡改。|

---

## 概要：对象存储 CDN 的黄金法则

1. **直接上传文件**：大文件使用分片上传，安全性使用 STS
2. **分层缓存**：浏览器 → CDN → 源站，在每一层进行缓存
3. **服务用户就近原则**：智能 DNS + 全球节点覆盖
4. **安全绝不松懈**：HTTPS + 防盗链 + 访问控制
5. **监控成本**：命中率、带宽、存储分层——持续优化

这种架构支撑着互联网上绝大多数静态资源的访问。理解它，就理解了现代网页性能优化的基石。