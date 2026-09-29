# 网关与反向代理的原理
::: tip 🎯 核心问题
**在高并发的互联网架构中，如何安全高效地将流量路由到正确的服务？** 反向代理解决“如何分发流量”，而 API 网关解决“如何处理请求”。本文通过现实世界的类比（接待台、安全系统、智能路由）来探讨网关的设计理念与工程实践。
:::

---

## 1. “网关”的动机

### 1.1 一个真实案例：电商平台的架构演进

在业务快速增长过程中，一家电商平台遇到了严重的架构问题：

**场景：**

```
Phase 1: Directly Exposing Services
Client → Directly calls User Service, Order Service, Payment Service...
         ↓
Problem 1: Service IPs are exposed — security risk
Problem 2: No unified authentication or rate limiting
Problem 3: Adding a new service requires modifying client configuration
```

::: 警告 ⚠️ 直接暴露的关键问题

- **安全风险**：所有服务 IP 都被暴露，容易受到攻击
- **功能冗余**：每个服务都必须实现身份验证、速率限制和日志记录
- **扩展困难**：添加新服务需要修改所有客户端
- **协议混乱**：部分服务使用 HTTP，其他使用 gRPC —— 客户端必须适应所有协议
  :::

**改进架构（使用网关）：**

```
Client → API Gateway (Nginx/Kong) → Internal Services
         ↓
      Unified authentication, rate limiting, routing
         ↓
      Client only knows the gateway address
```

::: 提示 ✨ 改进后的好处

- **安全性**：真实服务 IP 隐藏，仅网关对外暴露
- **整合**：认证、限流和日志集中处理
- **易于扩展**：添加新服务只需在网关上配置路由
- **协议统一**：对外 HTTP，对内 gRPC
  :::

### 1.2 网关的现实生活类比

**接待台**

想象访问一家大公司：

- **没有接待台**：访客直接进入各部门，不知道去哪里，现场混乱
- **有接待台**：访客先在接待台登记，说明来意，然后被引导到正确部门

**API 网关就是系统的“接待台”**：

- **反向代理**：接待员，引导访客到正确部门
- **API 网关**：智能接待员，同时验证访客身份（认证）并限制访客数量（限流）

<ReverseProxyDemo />

---

## 2. 反向代理概述

### 2.1 正向代理 vs. 反向代理

::: 提示 🤔 术语
**正向代理**：

- 部署在客户端
- 代表客户端访问外部资源
- 典型应用：VPN、翻墙工具
- 示例：在企业网络中，通过代理访问互联网

**反向代理**：

- 部署在服务器端
- 接收客户端请求并转发到内部服务
- 客户端只知道代理存在，不知道真实服务器
- 示例：Nginx, HAProxy
  :::

**对比：**

| 维度                  | 正向代理                            | 反向代理                            |
| -------------------- | ---------------------------------- | ---------------------------------- |
| **部署端**            | 客户端                              | 服务器端                            |
| **服务对象**          | 客户端                              | 服务器                              |
| **典型用途**          | VPN, 翻墙工具                       | 负载均衡, 网关                      |
| **透明度**            | 服务器看到代理 IP                     | 客户端看到代理 IP                     |
| **目的**              | 隐藏真实客户端，加速访问               | 隐藏真实服务器，负载均衡               |

### 2.2 反向代理的核心价值

::: 详情 核心价值 1: 负载均衡
将流量分配到多个后端服务器，避免单点过载。

```
Client
  ↓
Nginx (Reverse Proxy)
  ↓
┌──────────┬──────────┬──────────┐
│ Server 1 │ Server 2 │ Server 3 │
└──────────┴──────────┴──────────┘
```

::: 

::: 详情 值 2：安全保护
隐藏真实服务器IP以防止直接攻击。安全性在代理层得到保障。

```
Client → Only sees Nginx's IP
Real servers → Only on the internal network, inaccessible externally
```

:::

::: 详情 值 3：SSL 终止
在代理层处理 HTTPS 加密/解密；后端服务使用 HTTP，从而减少后端计算开销。

```
HTTPS Client → Nginx (encrypt/decrypt) → HTTP Backend Services
                   ↑
              SSL termination point
```

::: 

---

## 3. Nginx：处理数百万并发连接的方法

### 3.1 主-工作进程模型

Nginx 使用**多进程**架构，而非多线程：

**主进程（管理者）**：

- 读取和验证配置文件
- 管理工作进程（启动、停止、重载）
- 不处理实际请求

**工作进程（Workers）**：

- 实际处理 HTTP 请求
- 每个工作进程都是独立、隔离的进程
- 数量通常设置为 CPU 核心数，以避免上下文切换开销

::: tip 💡 优势

- **强隔离性**：一个 Worker 崩溃不会影响其他 Worker
- **充分利用多核**：每个 Worker 独立运行
- **避免多线程复杂性**：无需处理锁、竞争条件等问题
  :::

### 3.2 事件驱动 异步非阻塞

这是 Nginx 高性能的核心秘密：

**传统 Apache（多进程/线程模型）**：

- 一条连接 = 一个进程/线程
- 并发能力受系统进程/线程数量限制
- 在高连接数情况下，上下文切换开销巨大

**Nginx（事件驱动模型）**：

- 使用高效的 I/O 多路复用机制，比如 epoll（Linux）/ kqueue（macOS）
- 单个 Worker 进程可以同时处理成千上万的连接
- 当连接没有数据时不消耗 CPU；新数据到来时通过事件通知唤醒

::: tip 生活类比

- **Apache**：每位顾客都有一个专属服务员（进程）；顾客多则需要服务员多
- **Nginx**：一个超级服务员同时服务所有顾客，根据需要去服务而不是站在单个顾客旁边
  :::

<NginxArchitectureDemo />

---

## 4. API 网关概述

### 4.1 需要 API 网关的动机

**想象一个没有网关的系统：**

- 客户端必须知道多个服务的地址（用户服务、订单服务、支付服务…）
- 每个服务必须实现自身的认证、限流和日志记录
- 协议不统一——有的使用 HTTP，有的使用 gRPC
- 当服务升级时，客户端也必须更改

::: warning ⚠️ 没有网关的问题

- **客户端复杂性**：必须配置多个服务地址
- **功能冗余**：每个服务都要实现认证和限流
- **协议混乱**：客户端必须适应多种协议
- **升级困难**：服务升级迫使客户端更改
  :::

**有了 API 网关：**

- 客户端只需知道网关地址，网关路由到正确的服务
- 跨切面关注点如认证、限流和日志记录由中心统一处理
- 网关可以进行协议转换；对外统一暴露 HTTP
- 后端服务升级仅需修改网关配置——客户端不受影响

<ApiGatewayDemo />

### 4.2 API 网关核心功能

| 功能                     | 描述                                                               | 典型场景                                                   |
| :------------------- | :---------------------------------------------------------------- | :----------------------------------------------------------- |
| **路由转发**             | 根据 URL、头信息等将请求转发到不同的服务                                | `/api/users` → 用户服务, `/api/orders` → 订单服务                         |
| **负载均衡**             | 当服务有多个实例时分配流量                                          | 用户服务有 3 个实例，采用轮询请求分发                        |
| **认证**                 | 集中验证 JWT、OAuth 令牌                                           | 未认证用户无法访问 `/api/admin`                                   |
| **限流与熔断**           | 控制流量上限以防止服务过载                                         | 每秒最多 1000 个请求；超过则返回 429                       |
| **协议转换**             | 对外使用 HTTP，内部可转换为 gRPC                                    | 客户端使用 HTTP，网关将请求转换为 gRPC 进行内部调用         |
| **金丝雀发布**           | 通过头信息或比例将部分流量导向新版本                                  | 5% 的用户体验新版本，95% 使用旧版本                         |
| **日志与监控**           | 集中记录请求日志以进行分析和排障                                     | 记录请求延迟、状态码、响应大小                               |

---

## 5. 实践中的网关：构建完整网关架构的方法

### 5.1 完整架构图

```
┌───────────────────────────────────────────────────────────────────────┐
│                           Client (Browser/App)                         │
└───────────────────────────┬─────────────────────────────────────────┘
                                │ HTTPS
                                ▼
┌───────────────────────────────────────────────────────────────────────┐
│                      Outer Layer: CDN + WAF                            │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │  CDN (Content Delivery Network)                              │  │
│  │  - Static asset caching (images, CSS, JS)                    │  │
│  │  - Nearby access, reduced latency                            │  │
│  └───────────────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  WAF (Web Application Firewall)                               │  │
│  │  - Protection against SQL injection, XSS attacks              │  │
│  │  - Block malicious bots and crawlers                          │  │
│  │  - CC attack protection                                       │  │
│  └───────────────────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌───────────────────────────────────────────────────────────────────────┐
│                  Middle Layer: API Gateway (Nginx/Kong)                │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  Layer 1: SSL Termination + Security                          │  │
│  │  - HTTPS / TLS 1.3                                            │  │
│  │  - HSTS, security response headers                            │  │
│  └───────────────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  Layer 2: Authentication & Authorization                      │  │
│  │  - JWT Token validation                                       │  │
│  │  - OAuth 2.0 / SSO integration                                │  │
│  │  - API Key management                                         │  │
│  │  - Permission checks (RBAC)                                   │  │
│  └───────────────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  Layer 3: Traffic Control                                     │  │
│  │  - Rate limiting — token bucket / leaky bucket algorithms     │  │
│  │  - Circuit breaking — prevent fault propagation               │  │
│  │  - Degradation — fallback when a service is unavailable       │  │
│  │  - Canary release — traffic splitting by ratio                │  │
│  └───────────────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  Layer 4: Routing & Load Balancing                            │  │
│  │  - Path-based Routing                                         │  │
│  │  - Host-based Routing                                         │  │
│  │  - Header-based Routing                                       │  │
│  │  - Load balancing algorithms — round-robin / weighted /       │  │
│  │    least connections / IP hash                                │  │
│  │  - Service Discovery integration                              │  │
│  └────────────��──────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  Layer 5: Protocol Translation & Data Processing              │  │
│  │  - SSL Termination — HTTPS ↔ HTTP                             │  │
│  │  - Protocol translation — HTTP ↔ gRPC / WebSocket             │  │
│  │  - Request/Response transformation — JSON ↔ XML               │  │
│  │  - Data compression — Gzip / Brotli                           │  │
│  │  - Caching — static assets and API responses                  │  │
│  └───────────────────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌───────────────────────────────────────────────────────────────────────┐
│                    Inner Layer: Microservice Cluster                   │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐      │
│  │ User Svc    │ │ Order Svc   │ │ Product Svc │ │ Payment Svc │      │
│  │             │ │             │ │             │ │             │      │
│  └──────┬──────┘ └──────┬──────┘ └──────┬──────┘ └──────┬──────┘      │
│         │                │                │                │               │
│         └────────────────┴────────────────┴────────────────┘               │
│                                       │                              │
│                Service Discovery & Config Center (etcd)              │
│                - Service registration & discovery                    │
│                - Health checks                                       │
│                - KV config storage                                   │
└───────────────────────────────────────────────────────────────────────┘
```

### 5.2 路由与负载均衡

网关的核心职责之一是**将请求发送到正确的位置**。这涉及两个关键能力：**路由**（去哪个服务器）和**负载均衡**（如何分配流量）。

::: details 路由规则：从 URL 到服务
想象一个电商系统，不同的 URL 映射到不同的服务：

- `/api/users/*` → 用户服务
- `/api/orders/*` → 订单服务
- `/api/products/*` → 产品服务
- `/api/pay/*` → 支付服务

**Nginx 配置示例：**

```nginx
server {
    listen 80;
    server_name api.example.com;

    # User Service
    location /api/users/ {
        proxy_pass http://user-service;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # Order Service
    location /api/orders/ {
        proxy_pass http://order-service;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # Product Service
    location /api/products/ {
        proxy_pass http://product-service;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # Payment Service (requires higher security)
    location /api/pay/ {
        # Restrict IP access
        allow 10.0.0.0/8;
        deny all;

        proxy_pass http://payment-service;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

:::

::: 详情 负载均衡：比较四种策略
当一个服务有多个实例时，你如何选择？

| 策略                   | 原理                                                         | 使用场景                     | 优点                              | 缺点                                      |
| :-------------------- | :----------------------------------------------------------- | :-------------------------- | :-------------------------------- | :---------------------------------------- |
| **轮询 (Round-robin)** | 按顺序分配到每台服务器                                         | 配置相似的服务器             | 简单公平                           | 不考虑当前服务器负载                       |
| **加权轮询 (Weighted round-robin)** | 按权重比例分配；权重高 = 更多流量                       | 配置不均衡的服务器           | 充分利用高性能服务器                | 需要合理配置权重                           |
| **最少连接 (Least connections)** | 分配给活动连接最少的服务器                                    | 长连接、视频流                 | 动态适应负载变化                   | 需要实时跟踪连接数                         |
| **IP 哈希 (IP hash)**    | 对客户端 IP 进行哈希；相同 IP 始终分配到同一服务器             | 需要会话保持                  | 保证会话一致性                     | 高流量的 IP 可能造成热点                   |

**Nginx 配置示例：**

```nginx
# Weighted round-robin
upstream backend_weighted {
    server 10.0.1.10:8080 weight=3;  # High performance, handles more traffic
    server 10.0.1.11:8080 weight=2;
    server 10.0.1.12:8080 weight=1;  # Lower performance, handles less traffic
}

# Least connections
upstream backend_least_conn {
    least_conn;
    server 10.0.1.10:8080;
    server 10.0.1.11:8080;
    server 10.0.1.12:8080;
}

# IP hash (session persistence)
upstream backend_ip_hash {
    ip_hash;
    server 10.0.1.10:8080;
    server 10.0.1.11:8080;
    server 10.0.1.12:8080;
}
```

::: 

<LoadBalancingDemo />

---

## 6. 网关安全：保护系统前端的策略

### 6.1 认证与授权

**传统方法（每个服务独立认证）：**

- 用户服务、订单服务、支付服务……每个都必须验证 JWT
- 代码重复，维护麻烦
- 密钥分散在各个服务中——泄露风险更高

**网关统一认证：**

- 客户端携带令牌访问网关
- 网关验证令牌（签名、过期时间）
- 验证后，将用户信息（如 user_id）添加到请求头并转发到后端服务
- 后端服务无需验证；直接从请求头读取用户信息

::: tip 💡 核心思想
**在网关进行认证，在服务进行授权**：

- **认证**：你是谁？（验证令牌，获取用户身份）
- **授权**：你能做什么？（根据用户角色确定权限）

像公司的接待处：接待处验证你的身份（身份证），但具体权限由各部门决定。
:::

<AuthMiddlewareDemo />

### 6.2 HTTPS 与 SSL 终止

**为什么使用 HTTPS？**

1. **安全性**：防止数据在传输过程中被窃取
2. **合规性**：现代浏览器会对 HTTP 网站显示“不安全”警告
3. **SEO**：搜索引擎优先收录 HTTPS 网站

**SSL 终止方案：**

- 仅在网关层配置 HTTPS 和证书
- 网关处理 TLS 握手及加密/解密
- 网关与后端服务之间的通信使用普通 HTTP（内部网络是可信的）
- 后端服务专注于业务逻辑，无需处理 TLS

::: tip 💡 SSL 终止的优势

- **简化管理**：证书只需配置在网关，不需要在后端配置
- **降低开销**：后端服务无需处理 TLS 握手
- **统一更新**：证书更新只需在网关进行
:::

<SslTerminationDemo />

---

## 7. 限流与熔断：防止系统被“流量洪峰”压垮的策略

### 7.1 限流算法比较

| 算法            | 核心思想                                    | 突发流量                             | 使用场景                                  | 复杂度 |
| :--------------- | :----------------------------------------- | :----------------------------------- | :---------------------------------------- | :--------- |
| **令牌桶**       | 桶中保存令牌；请求需要一个令牌才能通过     | 允许一定突发                        | API 限流、带宽控制                          | 中等       |
| **漏桶**         | 请求进入桶中以恒定速率处理                  | 强制流量平滑；突发被排队或拒绝      | 需要严格平稳处理的场景                       | 中等       |
| **滑动窗口**     | 统计时间窗口内的请求数量                    | 严格按窗口计数；超出拒绝             | 精确计数（如“每分钟最多 100 次”）          | 高         |

### 7.2 Nginx 限流配置实践

```nginx
# Define rate-limiting zones (place in the http block)

# 1. IP-based rate limiting (leaky bucket algorithm)
# zone=mylimit:10m — zone name and memory size (10 MB ≈ 160k IPs)
# rate=10r/s — 10 requests per second
limit_req_zone $binary_remote_addr zone=mylimit:10m rate=10r/s;

# 2. IP-based connection limit (prevents a single IP from opening too many connections)
limit_conn_zone $binary_remote_addr zone=addr:10m;

# 3. Endpoint-based rate limiting (not per-IP; protects the backend as a whole)
limit_req_zone $server_name zone=server_limit:10m rate=100r/s;

server {
    listen 80;
    server_name api.example.com;

    # User Service — normal rate limiting
    location /api/users/ {
        # Apply rate limiting
        # burst=20 — bucket capacity, allows 20 burst requests
        # nodelay — don't delay burst requests (process or reject immediately)
        limit_req zone=mylimit burst=20 nodelay;

        # Limit connections per IP
        limit_conn addr 10;

        proxy_pass http://user-service;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # Order Service — stricter rate limiting
    location /api/orders/ {
        # Stricter: 5 requests per second
        limit_req_zone $binary_remote_addr zone=order_limit:10m rate=5r/s;
        limit_req zone=order_limit burst=10 nodelay;

        proxy_pass http://order-service;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # Handling after rate limiting
    # When a request is rate-limited, return 429 Too Many Requests
    error_page 429 /429.html;
    location = /429.html {
        internal;
        return 429 '{"error": "Too Many Requests", "message": "Rate limit exceeded. Please try again later."}';
        add_header Content-Type application/json;
    }
}
```

::: 提示 💡 限流策略建议

- **普通端点**：10 请求/秒，允许突发 20
- **关键端点**（支付、订单）：5 请求/秒，允许突发 10
- **全局保护**：所有请求总计不超过 100/秒
:::

<RateLimitingDemo />

### 7.3 断路器：防止故障传播

**断路器的工作原理：**

1. **关闭状态**：请求正常转发；跟踪错误率
2. **打开状态**：当错误率超过阈值时，断路器打开，立即返回错误，不再转发请求
3. **半开状态**：经过一段时间后，允许少量请求作为探测；如果成功，断路器关闭

::: 提示 💡 核心理念
**断路器就像电气保险丝**：当电流过高时，保险丝会自动熔断，保护整个电路不被烧坏。

同样，当后端服务错误率很高时，断路器会“跳闸”，快速失败，防止故障蔓延到整个系统。
:::

---

## 8. 总结：网关设计的核心思维

### 8.1 核心原则回顾

| 原则              | 含义                                      | 关键实践                                                   |
| ----------------- | ---------------------------------------- | ---------------------------------------------------------- |
| **路由**          | 将请求发送到正确的地方                    | 基于路径、基于主机、基于请求头的路由                     |
| **负载均衡**      | 在服务器间分配流量                        | 轮询、加权、最少连接、IP 哈希                             |
| **安全**          | 守护系统前门                              | 认证与授权、HTTPS、WAF                                     |
| **限流**          | 防止被流量压垮                            | 令牌桶、漏桶、滑动窗口                                     |
| **断路器**        | 防止故障传播                              | 快速失败、降级策略                                         |
| **可观测性**      | 监控与排障                                | 日志、指标、分布式追踪                                     |

### 8.2 技术选型建议

::: 提示 💡 选择决策树

```
Choosing a gateway:
│
├─ Only need reverse proxy & load balancing?
│  ├─ Yes → Nginx (first choice)
│  └─ No → Continue
│
├─ Need a rich plugin ecosystem?
│  ├─ Yes → Kong (built on Nginx)
│  └─ No → Continue
│
├─ Spring Cloud ecosystem?
│  ├─ Yes → Spring Cloud Gateway
│  └─ No → Nginx
```

::: 

---

## 9. 术语表

| 术语                     | 解释                                                                                                                                                |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| **反向代理**             | 部署在服务器端的代理，接收客户端请求并将其转发到内部服务。客户端只知道反向代理，而不知道真实的服务器地址。                                                   |
| **正向代理**             | 部署在客户端的代理，代表客户端访问外部资源。服务器看到的是代理的 IP，而非真实客户端 IP。典型应用：VPN、翻墙工具。                                            |
| **API 网关**             | 位于客户端和后端服务之间的中间层，提供路由、认证、限流、日志等功能 —— 微服务架构的“统一入口”。                                                         |
| **负载均衡**             | 将请求流量分配到多个服务器上，以避免单个服务器过载，提高系统可用性和性能。                                                                           |
| **SSL 终止**             | 在网关层处理 HTTPS 加密/解密；后端服务使用 HTTP，减少后端计算开销并简化证书管理。                                                                   |
| **限流**                 | 限制单位时间内的请求数量，以防系统被流量突增压垮。常用算法：令牌桶、漏桶、滑动窗口。                                                                  |
| **熔断**                 | 自动切断对故障依赖的调用以防止故障传播，同时提供降级策略。                                                                                             |
| **会话保持**             | 确保来自同一客户端的请求总是路由到同一个后端服务器，适用于需要会话状态的场景。                                                                      |
| **健康检查**             | 定期检查后端服务健康状况，自动移除故障节点，确保流量只发送到健康实例。                                                                                |
| **金丝雀发布**           | 将小部分流量路由到新版本，验证稳定性，然后逐步增加比例以降低发布风险。                                                                               |
| **WAF**                  | Web 应用防火墙 —— 防护 SQL 注入、XSS、CC 攻击及其他 Web 安全威胁。                                                                                  |
| **CDN**                  | 内容分发网络 —— 在全球部署边缘节点，加速静态资源访问。                                                                                               |