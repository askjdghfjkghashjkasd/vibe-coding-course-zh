# 后端分层架构原则

> **核心问题**：随着代码变得越来越混乱，应该如何组织代码以保持清晰易懂？

当一个项目从几十行代码扩展到数万行，从个人开发发展到团队协作，从简单的增删改查（CRUD）演变为复杂的业务逻辑时，代码的组织方式直接决定了项目的生存能力。分层架构不是为了炫耀或遵循教条——它存在的目的是解决软件工程中的一个根本性矛盾：**业务复杂性的自然增长**与**人类认知能力的有限性**之间的冲突。

---

## 1. 分层的动机

### 1.1 问题的根源

**早期版本**（100 行代码）：```java
@PostMapping("/register")
public Result register(@RequestBody User user) {
    // 1. Check if username already exists
    if (userRepository.findByUsername(user.getUsername()) != null) {
        return Result.error("Username already exists");
    }
    // 2. Encrypt password
    user.setPassword(encrypt(user.getPassword()));
    // 3. Save user
    userRepository.save(user);
    // 4. Send welcome email
    emailService.sendWelcome(user.getEmail());
    // 5. Log
    log.info("User registered: {}", user.getUsername());
    return Result.success();
}
```

**6个月后**（500行代码）：
- 添加了手机号验证
- 添加了实名认证
- 添加了推荐奖励
- 添加了风控检查
- ...

现在这个方法有500行，每次修改都让人紧张，因为：
- 逻辑纠缠在一起——修改一部分可能影响其他功能
- 难以测试——每次测试都需要模拟完整的HTTP请求
- 新人无法理解——所有逻辑都堆在一起

**问题的本质**：代码没有“边界”；所有职责混在一起。

**技术债务的叠加效应**：
- ❌ **高耦合**：业务逻辑与数据访问和HTTP协议耦合——一次修改影响四处
- ❌ **低内聚**：一个方法承担多重职责，违背单一职责原则
- ❌ **难以测试**：无法单独测试业务逻辑——必须启动完整的HTTP容器
- ❌ **难以复用**：业务逻辑绑定在HTTP请求上；定时任务和消息队列无法复用
- ❌ **认知负担大**：开发者必须同时理解所有层的细节，难以集中精力

### 1.2 分层的核心理念

分层架构为代码划清边界：

```
┌─────────────────────────────────────┐
│  Accept requests ← Controller       │  Only responsible for "taking orders"
├─────────────────────────────────────┤
│  Business orchestration ← Service   │  Only responsible for "cooking"
├─────────────────────────────────────┤
│  Data access ← Repository           │  Only responsible for "fetching ingredients"
├─────────────────────────────────────┤
│  Business definition ← Domain       │  Only responsible for "recipe standards"
└─────────────────────────────────────┘
```

**关键原则**：
- 每一层只做自己的工作
- 各层通过明确定义的接口进行通信
- 业务逻辑集中在服务（Service）和领域（Domain）层
- 数据访问逻辑集中在仓储（代码仓库）层

**分层架构的工程价值**：

1. **减轻认知负担**：开发人员可以专注于当前层的职责，而无需了解全局的每个细节
2. **提高可测试性**：每一层都可以通过模拟依赖进行独立的单元测试
3. **增强可维护性**：当需求变化时，修改范围清晰，可降低风险
4. **促进代码复用**：业务逻辑不绑定于 HTTP，可在定时任务和消息队列中重复使用
5. **支持团队协作**：不同开发人员可以并行开发不同层次，减少冲突
6. **延长代码寿命**：清晰的边界使代码更易于重构和演进

---

## 2. 四层架构详解

### 2.1 整体结构

分层架构的核心是**关注点分离**和**依赖方向控制**：

```
┌─────────────────────────────────────────────────────┐
│  Frontend request                                     │
└────────────────────┬────────────────────────────────┘
                     │ HTTP Request
                     ▼
┌─────────────────────────────────────────────────────┐
│  Controller Layer                                    │
│  - Accept requests, validate parameters              │
│  - DTO conversion                                    │
│  - Call Service                                      │
│  - Return response                                   │
└────────────────────┬────────────────────────────────┘
                     │ Business call
                     ▼
┌─────────────────────────────────────────────────────┐
│  Service Layer                                       │
│  - Business logic orchestration                     │
│  - Transaction management                            │
│  - Coordinate multiple Repositories                  │
│  - Cross-module coordination                         │
└────────────────────┬────────────────────────────────┘
                     │ Data access
                     ▼
┌─────────────────────────────────────────────────────┐
│  Repository Layer                                    │
│  - Database CRUD                                     │
│  - Query encapsulation                               │
│  - ORM mapping                                       │
└────────────────────┬────────────────────────────────┘
                     │ Domain objects
                     ▼
┌─────────────────────────────────────────────────────┐
│  Domain Layer                                        │
│  - Entity                                            │
│  - Value Object                                      │
│  - Business rules                                    │
└─────────────────────────────────────────────────────┘
```

**依赖方向**：代码依赖必须指向**更稳定、更抽象**的方向  
- Controller 依赖 Service 接口（抽象）  
- Service 依赖 代码仓库 接口（抽象）  
- 所有层都依赖 Domain（业务核心，最稳定）  
- **禁止反向依赖**（例如 代码仓库 依赖 Service）  

<LayeredArchitectureDemo />

### 2.2 控制器层

**职责**：请求的“接待员”

- 接收 HTTP 请求，解析参数  
- 验证参数（格式、必填字段等）  
- DTO 转换（Request → Param）  
- 调用 Service 执行业务逻辑  
- DTO 转换（Result → Response）  
- 返回 HTTP 响应  

**不应做的事情**：  
- 直接编写业务逻辑  
- 直接访问数据库  
- 处理事务  

**设计理念**：  
Controller 是系统的“外观”，充当适配器 — 将外部 HTTP 协议转换为内部业务调用。它不应包含任何业务决策，因为业务决策包含领域知识，应与传输协议解耦。  

**示例**：```java
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    @PostMapping
    public UserResponse createUser(
            @RequestBody @Valid UserRequest request) {

        // 1. Request DTO → Param DTO
        UserParam param = UserParam.builder()
                .username(request.getUsername())
                .password(encrypt(request.getPassword()))
                .email(request.getEmail())
                .build();

        // 2. Call Service
        User user = userService.createUser(param);

        // 3. Entity → Response DTO
        return UserResponse.from(user);
    }
}
```

**关键点**：
- 使用 `@Valid` 进行自动参数验证
- 使用 DTO 来隔离前端和后端的数据结构
- 只做「转换」和「分发」——不要涉及业务逻辑

<ControllerLayerDemo />

### 2.3 服务层

**职责**：业务的“厨师”

- 实现核心业务逻辑
- 协调多个 代码仓库 的操作
- 管理事务边界
- 处理跨模块协调

**它不应该做的事情**：
- 直接编写 SQL（交给 代码仓库）
- 处理 HTTP 相关事务
- 向 Controller 返回数据库实体

**设计理念**：
服务层承载业务逻辑，应保持纯粹。不依赖任何框架或传输协议，从而实现：
- 可独立于 Web 层进行单元测试
- 在定时任务和消息队列消费者中复用
- 保护业务逻辑不受技术栈变化影响

**示例**：
```java
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final EmailService emailService;

    @Transactional
    public User createUser(UserParam param) {
        // 1. Business rule: check if username already exists
        if (userRepository.existsByUsername(param.getUsername())) {
            throw new UserAlreadyExistsException();
        }

        // 2. Create user entity
        User user = new User();
        user.setUsername(param.getUsername());
        user.setPassword(param.getPassword());
        user.setEmail(param.getEmail());

        // 3. Save to database
        userRepository.save(user);

        // 4. Send welcome email (cross-module coordination)
        emailService.sendWelcomeEmail(user);

        return user;
    }
}
```

**关键点**：
- 使用 `@Transactional` 来保证事务一致性
- 抛出业务异常，由 Controller 统一处理
- 不依赖 HTTP 概念——可复用

<ServiceLayerDemo />

### 2.4 仓储层

**职责**：数据的“仓库管理员”

- 封装所有数据访问逻辑
- 执行 CRUD 操作
- 处理 ORM 映射
- 封装查询条件

**不应该做的事情**：
- 编写业务逻辑
- 处理事务（由 Service 层管理）
- 依赖上层模块

**设计理念**：
仓储层是数据访问的抽象层，隐藏了底层数据库的细节。该抽象的价值在于：
- 在切换数据库时，只需修改 代码仓库 的实现 — 业务逻辑不受影响
- 便于单元测试中的模拟
- 查询逻辑集中管理，避免重复代码

**示例**：```java
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Automatically implemented by Spring Data JPA
    Optional<User> findByUsername(String username);
    boolean existsByUsername(String username);

    // Custom complex query
    @Query("SELECT u FROM User u WHERE u.email = :email AND u.deleted = false")
    Optional<User> findActiveByEmail(@Param("email") String email);
}
```

**要点**：
- 仓库是一个接口——不包含业务逻辑
- 通过方法名表达查询意图
- 对于自定义复杂查询使用 `@Query`

<RepositoryLayerDemo />

### 2.5 领域层

**职责**：业务的“配方标准”

- 定义业务实体
- 定义值对象
- 封装业务规则
- 作为所有层的公共依赖

**重要特性**：
- 领域层不依赖其他层
- 所有层依赖领域层
- 它是分层架构的基础

**设计理念**：
领域层是整个系统的业务核心，表达领域知识和业务规则。其纯粹性至关重要：
- 不依赖框架意味着业务逻辑不受技术栈束缚
- 所有层依赖它确保业务规则的一致性
- 支持长期演进——技术栈可以被替换，但业务规则相对稳定

**示例**：```java
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    // ✅ Business method: encapsulates business rules
    public boolean isPasswordCorrect(String rawPassword) {
        return BCrypt.checkpw(rawPassword, this.password);
    }

    public void changePassword(String oldPassword, String newPassword) {
        if (!isPasswordCorrect(oldPassword)) {
            throw new IncorrectPasswordException();
        }
        this.password = BCrypt.hashpw(newPassword);
    }
}
```

**关键点**：
- 实体具有唯一标识符
- 业务规则封装在领域对象中
- 领域层是纯业务逻辑，不依赖任何框架

<DomainModelDemo />

---

## 3. DTO：各层之间的“翻译者”

### 3.1 使用 DTO 的动机

**问题**：如果你直接将数据库实体返回给前端：

```java
// ❌ Wrong: directly returning Entity
@Entity
public class User {
    private Long id;
    private String username;
    private String password;        // Sensitive information!
    private Boolean isDeleted;      // Internal field!
}
```

前端会收到不应被暴露的字段，从而造成安全风险。

**解决方案**：使用 DTO 作为“翻译器”

```
Database Entity → Service Param/Result → Controller Request/Response → Frontend
```

### 3.2 DTO 类型

| 类型 | 目的 | 示例 |
|------|---------|---------|
| 请求 DTO | 控制器接收参数 | UserCreateRequest |
| 响应 DTO | 控制器返回数据 | UserResponse |
| 参数 DTO | 服务方法参数 | UserParam |
| 结果 DTO | 服务返回结果 | UserResult |
| 实体 | 数据库映射 | User |

**关键原则**：
每一层使用自己的 DTO——绝不直接传递实体。DTO 只包含必要的字段，这可以避免暴露内部实现细节，并保持各层的独立性。

<DtoFlowDemo />

---

## 4. 依赖方向：分层架构的铁律

### 4.1 依赖倒置原则

**错误方法**：```
Controller → UserServiceImpl → UserDaoImpl → UserEntity
```

**正确方法**：```
Controller → UserService (interface) → UserRepository (interface) → UserEntity
```

**依赖方向**：

正确的依赖方向是所有层都依赖于更抽象、更稳定的层。具体来说，Controller 依赖于 Service 接口，Service 依赖于 代码仓库 接口，所有层都依赖于 Domain 层，而 Domain 层不依赖于其他任何层。这种依赖方向保证了业务逻辑的独立性和可测试性。

错误的做法包括 Service 直接依赖于 代码仓库 的实现类，Controller 直接访问数据库，或者 Domain 层依赖其他层——这些都会增加耦合度，降低系统可维护性。

### 4.2 代码示例

```java
// ✅ Correct: depends on interfaces
@Service
public class OrderService {
    private final OrderRepository orderRepository;  // interface
    private final PaymentService paymentService;    // interface
}

// ✅ Implementation class injected automatically by Spring
@Repository
public class OrderRepositoryImpl implements OrderRepository {
    // Implementation details
}
```

<DependencyDirectionDemo />

---

## 5. 真实案例研究：电子商务订单系统

### 5.1 需求

创建订单：
1. 用户选择产品
2. 检查库存
3. 计算总金额
4. 创建订单
5. 扣减库存

### 5.2 实现

**领域层**：
```java
@Entity
public class Order {
    @Id
    private Long id;
    private Long userId;
    private List<OrderItem> items;
    private Money totalAmount;
    private OrderStatus status;

    public void calculateTotal() {
        Money total = Money.zero();
        for (OrderItem item : items) {
            total = total.add(item.getSubTotal());
        }
        this.totalAmount = total;
    }

    public void cancel() {
        if (this.status != OrderStatus.PENDING_PAYMENT) {
            throw new IllegalStateException("Only pending-payment orders can be cancelled");
        }
        this.status = OrderStatus.CANCELLED;
    }
}
```

**存储库层**：```java
@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserIdOrderByCreatedAtDesc(Long userId);
}
```

**服务层**：```java
@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final InventoryService inventoryService;

    @Transactional
    public OrderDTO createOrder(OrderParam param) {
        // 1. Validate products and reserve inventory
        for (OrderItemParam item : param.getItems()) {
            inventoryService.reserveStock(item.getProductId(), item.getQuantity());
        }

        // 2. Create order
        Order order = new Order();
        order.setUserId(param.getUserId());
        order.calculateTotal();

        // 3. Save order
        orderRepository.save(order);

        return OrderDTO.from(order);
    }
}
```

**控制器层**：```java
@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public OrderResponse createOrder(@RequestBody @Valid OrderRequest request) {
        OrderParam param = OrderParam.builder()
                .userId(request.getUserId())
                .items(request.getItems())
                .build();

        OrderDTO order = orderService.createOrder(param);

        return OrderResponse.from(order);
    }
}
```

---

## 6.常见问题解答

### 6.1 控制器能否包含业务逻辑

控制器不应包含业务逻辑——它仅负责接受请求和返回响应。业务逻辑应封装在服务层。其优点是代码可以重复使用：例如，调度任务或消息队列的消费者可以直接调用服务，无需经过HTTP。此外，业务逻辑集中在一个地方更容易测试和维护，避免了逻辑分散引起的不一致。

### 6.2 贫血域模型与富域模型概述

**贫困领域模型**意味着实体类仅包含属性及其对应的获取/设置方法，没有业务逻辑——所有业务规则都存在于服务层。该模型结构简单，易于理解，是大多数项目采用的方法。

**丰富域模型**意味着实体类不仅包含属性，还包含与实体相关的业务方法，将业务规则封装在实体内部。这种方法更符合面向对象设计原则，保持数据和行为的统一性，提升代码的内聚力。

建议根据团队的技术背景和项目复杂度来选择模型。无论选择哪种，都要保持一致，域层至少应包含基本的行为方法，而不是完全空壳。

### 6.3 跨多个服务事务处理方法

当业务操作需要跨越多个服务时，在上层服务方法上使用`@Transactional`注释，并在该方法内依次调用下层服务。这样可以确保所有操作在同一事务上下文中执行——要么全部成功，要么全部失败，保持数据一致性。注意事务边界应尽量小，仅包含必要的操作，以避免长时间保留数据库锁并影响并发性能。

---

## 7.摘要

|层 |责任 |关键词 |
|-------|---------------|----------|
|控制器 |接受请求，验证参数，呼叫服务，返回响应 |接待员 |
|服务 |业务逻辑编排、事务管理、坐标仓库 |Chef |
|仓库 |数据访问，ORM映射，查询封装 |仓库管理员 |
|域 |实体定义、业务规则、价值对象 |配方标准 |

**核心原则**：
1. 每个层只执行自己的工作
2. 层通过接口进行通信
3. 业务逻辑集中在服务和域
4. 数据访问逻辑集中在代码仓库中
5. 使用 DTO 来隔离层间的数据结构
---

## 8.更多建筑模式

本文介绍了**分层架构**，这是最常见且最容易入门的后端架构模式。但后端架构远不止于此一个模式——根据业务背景，还有其他值得理解的架构模式：

### 8.1 其他常见建筑模式

| 模式 | 使用场景 | 特点 |
|---------|----------|-----------------|
| **单体架构** | 小型项目，MVP | 所有功能在一个应用中，部署简单 |
| **微服务架构** | 大型、复杂系统 | 拆分为多个独立服务，每个服务可独立部署 |
| **事件驱动架构** | 高并发，异步处理 | 处理流程由事件触发，高度解耦 |
| **清晰架构** | 复杂业务系统 | 核心是业务逻辑，依赖仅指向内部，框架位于最外层 |
| **六边形架构** | 需要多样外部适配器的系统 | 通过端口和适配器隔离核心与外部系统 |
| **洋葱架构** | 领域驱动设计 | 同心层结构，领域模型在最内层，基础设施在最外层 |

让我们逐一探讨：

#### 单体架构

所有功能打包在一个应用中，共享一个数据库和一个进程。

```
┌──────────────────────────────┐
│       Monolithic App         │
│  ┌────┐ ┌────┐ ┌────┐       │
│  │User│ │Order│ │Pay │ ...   │
│  └──┬─┘ └──┬─┘ └──┬─┘       │
│     └──────┼──────┘          │
│        Shared Database       │
└──────────────────────────────┘
```

- **优点**：开发简单，易于部署，本地调试直观
- **缺点**：代码耦合高，难以扩展，一个模块的故障可能导致整个系统瘫痪
- **适用场景**：初创公司早期阶段、单团队开发、快速原型验证

#### 微服务架构

将系统拆分为多个独立的服务，每个服务都有自己的数据和业务逻辑，可以独立部署和扩展。

```
┌────────┐  ┌────────┐  ┌────────┐
│User Svc│  │Order Svc│ │Pay Svc │
│  DB-1  │  │  DB-2  │  │  DB-3  │
└───┬────┘  └───┬────┘  └───┬────┘
    └───────────┼───────────┘
          API Gateway
```

- **优点**：独立部署和扩展，灵活的技术栈，故障隔离
- **缺点**：服务间通信复杂，分布式数据一致性具有挑战性，需要成熟的 DevOps 能力
- **适用场景**：大型复杂系统、多团队协作、需要独立扩展的场景

#### 事件驱动架构

通过异步事件进行通信 —— 生产者发出事件，消费者响应事件，组件高度解耦。

```
Producer ──→ [Event Bus / Message Queue] ──→ Consumer A
                                          ──→ Consumer B
                                          ──→ Consumer C
```

- **优点**：高度解耦，自然支持扩展，适合实时处理
- **缺点**：调试困难，事件顺序和幂等性需要额外处理
- **适用场景**：实时数据分析、物联网系统、微服务之间的异步通信

#### 清晰架构

由罗伯特·C·马丁提出，系统被划分为四个同心层，依赖关系仅指向内部：

```
┌─────────────────────────────────────┐
│  Frameworks & Drivers               │
│  ┌─────────────────────────────┐    │
│  │  Interface Adapters          │    │
│  │  ┌─────────────────────┐    │    │
│  │  │  Use Cases            │    │    │
│  │  │  ┌─────────────┐     │    │    │
│  │  │  │  Entities    │     │    │    │
│  │  │  │  (Domain)    │     │    │    │
│  │  │  └─────────────┘     │    │    │
│  │  └─────────────────────┘    │    │
│  └─────────────────────────────┘    │
└─────────────────────────────────────┘
      Dependency direction: outer → inner
```

- **核心规则**：内部层对外部层一无所知；业务逻辑完全独立于框架和数据库
- **优点**：高可测试性，可替换的技术栈，清晰的业务逻辑
- **缺点**：初始开发成本较高，层间映射代码较多，小型项目有过度设计的风险
- **适用场景**：复杂业务系统，需要长期维护的项目

<CleanArchitectureDemo />

#### 六边形架构（端口与适配器）

通过“端口”为核心业务定义输入/输出接口，并通过适配器连接外部系统：

```
        ┌─────────────┐
  HTTP ──→ Port       │
  CLI  ──→ (Inbound)  │  Core Business  │  (Outbound) ──→ Database
  MQ   ──→            │  Logic           │  Port      ──→ External API
        └─────────────┘
```

- **核心理念**：业务逻辑不依赖于任何外部技术；外部系统通过适配器进行连接
- **优点**：外部系统可以自由更换；测试只需使用模拟适配器
- **适用场景**：需要与各种外部系统集成的场景

#### 洋葱架构

类似于清洁架构，强调将领域模型放在最内层，基础设施放在最外层，且依赖关系只指向内层：

```
┌──────────────────────────────┐
│  Infrastructure              │
│  ┌────────────────────────┐  │
│  │  Application Services  │  │
│  │  ┌──────────────────┐  │  │
│  │  │  Domain Services  │  │  │
│  │  │  ┌────────────┐   │  │  │
│  │  │  │Domain Model│   │  │  │
│  │  │  └────────────┘   │  │  │
│  │  └──────────────────┘  │  │
│  └────────────────────────┘  │
└──────────────────────────────┘
```

- **核心思想**：领域模型是系统的核心；所有依赖都指向它
- **与清洁架构的区别**：洋葱架构更强调领域服务层；清洁架构更强调用例层
- **适用场景**：采用领域驱动设计（DDD）的项目

### 8.2 架构演进路径

这些架构并非相互排斥的替代方案——它们代表了一个渐进的演进过程：

```text
Traditional Layered Architecture (N-Layered)
  │  Problem: inter-layer coupling, hard to replace external dependencies
  ▼
Hexagonal Architecture (Ports & Adapters)
  │  Improvement: use ports and adapters to isolate external systems
  ▼
Onion Architecture
  │  Improvement: explicit concentric layering, domain model at the center
  ▼
Clean Architecture
  │  Improvement: unified dependency rules, clear four-layer responsibilities
  ▼
Choose the right architecture based on business needs
```

### 8.3 架构选择指南

```text
Users < 1k, Code < 5,000 lines
    ↓
Monolithic + Simple Layering
    ↓
Users 1k–100k, requires multi-team collaboration
    ↓
Layered Architecture (this article)
    ↓
Users > 100k, high business complexity
    ↓
Microservices / Event-Driven Architecture
```

更详细的选择维度：

| 因素 | 简单分层 | 清洁/六边形架构 | 微服务 |
|------|----------|----------------|--------|
| 团队规模 | 1–5 人 | 5–20 人 | 20 人 |
| 业务复杂度 | 低 | 中–高 | 高 |
| 部署频率 | 低 | 中 | 高（独立部署） |
| 技术栈多样性 | 单一 | 单一 | 可以多样 |
| 运维成本 | 低 | 中 | 高 |

### 8.4 推荐阅读

- **单体架构**: 参见配套文章 [`backend-project-architecture.md`](./backend-project-architecture.md)，了解从脚本到单体的发展
- **微服务架构**: 参见 [从单体到微服务](/en/appendix/6-architecture-and-system-design/monolith-to-microservices)
- **清洁架构**: Robert C. Martin 的 *Clean Architecture* — 介绍了依赖规则和四层同心模型的经典著作
- **企业架构模式**: Martin Fowler 的 *Patterns of Enterprise Application Architecture* — 层次架构和领域逻辑组织的权威参考

### 8.5 选择方法

**记住这个原则**：**架构服务于业务 — 不要为了架构而架构**。

- 小型项目：使用简单架构，快速交付以验证
- 大型项目：在需要时考虑复杂架构，避免过度设计
- 团队熟悉度也很重要 — 选择团队都能理解的方案

---

## 9. 总结

| 层 | 职责 | 关键词 |
|----|------|------|
| 控制器 | 接收请求，验证参数，调用 Service，返回响应 | 接待员 |
| 服务 | 业务逻辑编排、事务管理、协调 代码仓库 | 厨师 |
| 仓储 | 数据访问、ORM 映射、查询封装 | 仓库管理员 |
| 域 | 实体定义、业务规则、值对象 | 食谱标准 |

**核心原则**：

分层架构的核心在于明确的职责划分和依赖方向控制。每一层只关注自身职责，通过接口与相邻层通信，将业务逻辑集中在 Service 和 Domain 层，将数据访问逻辑集中在 代码仓库 层，通过 DTO 隔离层间的数据结构，避免直接暴露内部实现。此设计使系统更易理解、测试和维护，并能够支持持续的业务演进。

---

## 参考文献

1. [企业应用架构模式目录 - Martin Fowler](https://www.martinfowler.com/eaaCatalog/) — Martin Fowler 的企业应用架构模式目录，分层架构的经典参考资料
2. [后端架构演进（N层、DDD、六边形、洋葱、清晰架构）](https://medium.com/@iamprovidence/backend-side-architecture-evolution-n-layered-ddd-hexagon-onion-clean-architecture-643d72444ce4) — 从 N 层架构到清晰架构的演进，理解每种模式出现的原因
3. [清晰架构完整指南 - GeeksforGeeks](https://www.geeksforgeeks.org/complete-guide-to-clean-architecture/) — 清晰架构的完整指南，涵盖层次、依赖规则和关注点分离
4. [深入理解六边形、清晰、洋葱和传统分层架构](https://romanglushach.medium.com/understanding-hexagonal-clean-onion-and-traditional-layered-architectures-a-deep-dive-c0f93b8a1b96) — 对六边形、清晰、洋葱和传统分层架构的深入比较
5. [在现代后端框架中构建清晰架构](https://leapcell.io/blog/building-clean-architectures-in-modern-backend-frameworks) — 在现代后端框架中实现清晰架构的实用指南
6. [后端架构模式：从单体到微服务](https://nerdleveltech.com/backend-architecture-patterns-from-monoliths-to-microservices) — 从单体到微服务的后端架构模式全景概览
7. [MVC 三层架构案例研究](https://www.cnblogs.com/TheMagicalRainbowSea/p/17409206.html) — MVC 与三层架构的关系及实际案例，适合中文读者入门