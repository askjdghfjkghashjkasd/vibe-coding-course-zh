# 后端项目架构入门

::: tip 🎯 核心问题
**从简单脚本到大型分布式系统，如何为不同规模和语言的后端项目选择合适的架构？** 这就像问：从家庭作坊到大型工厂，如何根据产量和工艺设计不同的生产线？良好的后端架构应随着业务增长而演进，同时充分利用语言特性。
:::

---

## 1. 架构演进：从脚本到系统

### 1.1 按用户数划分的架构等级

后端项目架构应与业务规模和用户量匹配：

| 等级 | 用户数 | 并发数 | 典型场景 | 关键关注点 |
|------|--------|--------|----------|------------|
| **入门级** | < 1k | < 100 | 个人项目、MVP、内部工具 | 快速开发，简单部署 |
| **中级** | 1k-100k | 100-10k | 企业系统、SaaS、中型平台 | 分层架构、编码规范 |
| **企业级** | > 100k | > 10k | 大型平台、互联网应用 | 微服务、高可用性、性能优化 |

### 1.2 按语言特性选择架构风格

不同编程语言有不同的设计理念和生态系统——架构设计应契合语言特性：

| 语言 | 设计理念 | 推荐架构 | 代表框架 |
|------|----------|--------------|----------|
| **Node.js** | 事件驱动、非阻塞 I/O | 分层架构，异步流程 | Express, NestJS, Fastify |
| **Python** | 简单优雅、快速开发 | MTV/MVC, 分层架构 | Django, Flask, FastAPI |
| **Go** | 简单高效、原生并发 | 清晰分层、微服务 | Gin, Echo, Fiber |
| **Java** | 企业级、强类型 | 严格分层、领域驱动 | Spring Boot, Spring Cloud |

::: tip 💡 架构选择原则
1. **不要过度设计**：小项目用简单架构；大项目需要复杂架构  
2. **遵循语言特性**：不要试图在 Python 中写 Java 风格代码  
3. **渐进演进**：从简单开始，随着业务增长逐步优化  
4. **团队熟悉度**：选择团队熟悉的架构风格，降低学习成本  
:::

---

## 2. 入门级架构（用户 < 1k）

### 2.1 适用场景

- 个人项目、学习练习  
- 创业 MVP（最小可行产品）  
- 内部工具、管理后台  
- 原型验证、概念验证  

### 2.2 Node.js — 简单脚本风格

**特点**：单文件或简单拆分，快速上线

```
my-node-api/
├── src/
│   ├── app.js              # Application entry point
│   ├── routes.js           # Route definitions
│   ├── db.js               # Database connection
│   └── utils.js            # Utility functions
├── .env                    # Environment variables
├── package.json
└── README.md
```

**代码示例**：

```javascript
// src/app.js
const express = require('express');
const app = express();

app.use(express.json());

// Routes written directly in the entry point (suitable when there are very few endpoints)
app.get('/users', async (req, res) => {
  const users = await db.query('SELECT * FROM users');
  res.json(users);
});

app.post('/users', async (req, res) => {
  const { name, email } = req.body;
  const result = await db.query(
    'INSERT INTO users (name, email) VALUES (?, ?)',
    [name, email]
  );
  res.status(201).json({ id: result.insertId });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

**参考开源项目**：
- [expressjs/express](https://github.com/expressjs/express) — 官方示例
- [vercel/micro](https://github.com/vercel/micro) — 微服务风格

### 2.3 Python — 快速原型开发风格

**特点**：利用 Python 的简单性快速实现功能

```
my-python-api/
├── app.py                  # Main application
├── models.py               # Data models
├── config.py               # Configuration
├── requirements.txt
└── README.md
```

**代码示例（Flask）**:

```python
# app.py
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
db = SQLAlchemy(app)

# Model definitions
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

# Routes
@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([{'id': u.id, 'name': u.name, 'email': u.email} for u in users])

@app.route('/users', methods=['POST'])
def create_user():
    data = request.json
    user = User(name=data['name'], email=data['email'])
    db.session.add(user)
    db.session.commit()
    return jsonify({'id': user.id}), 201

if __name__ == '__main__':
    app.run(debug=True)
```

**参考开源项目**：
- [pallets/flask](https://github.com/pallets/flask) — 官方示例
- [tiangolo/fastapi](https://github.com/tiangolo/fastapi) — 现代异步风格

### 2.4 Go — 简洁的标准库风格

**特点**：使用 Go 的标准库，依赖最少

```
my-go-api/
├── main.go                 # Entry point
├── handlers.go             # Handlers
├── models.go               # Models
├── db.go                   # Database
├── go.mod
└── README.md
```

**代码示例**：

```go
// main.go
package main

import (
    "database/sql"
    "encoding/json"
    "log"
    "net/http"
    _ "github.com/mattn/go-sqlite3"
)

type User struct {
    ID    int    `json:"id"`
    Name  string `json:"name"`
    Email string `json:"email"`
}

var db *sql.DB

func main() {
    var err error
    db, err = sql.Open("sqlite3", "./app.db")
    if err != nil {
        log.Fatal(err)
    }

    http.HandleFunc("/users", usersHandler)
    log.Println("Server starting on :8080")
    log.Fatal(http.ListenAndServe(":8080", nil))
}

func usersHandler(w http.ResponseWriter, r *http.Request) {
    switch r.Method {
    case http.MethodGet:
        getUsers(w, r)
    case http.MethodPost:
        createUser(w, r)
    }
}

func getUsers(w http.ResponseWriter, r *http.Request) {
    rows, _ := db.Query("SELECT id, name, email FROM users")
    defer rows.Close()

    var users []User
    for rows.Next() {
        var u User
        rows.Scan(&u.ID, &u.Name, &u.Email)
        users = append(users, u)
    }

    json.NewEncoder(w).Encode(users)
}
```

**参考开源项目**：
- [golang/go](https://github.com/golang/go) — 标准库示例
- [go-chi/chi](https://github.com/go-chi/chi) — 轻量级路由器

### 2.5 Java — Spring Boot 启动器风格

**特点**：利用 Spring Boot 的自动配置快速启动

```
my-spring-app/
├── src/main/java/com/example/
│   ├── controller/
│   │   └── UserController.java
│   ├── model/
│   │   └── User.java
│   ├── repository/
│   │   └── UserRepository.java
│   └── Application.java
├── src/main/resources/
│   └── application.yml
├── pom.xml
└── README.md
```

**代码示例**：

```java
// Application.java
@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}

// User.java
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    // getters and setters
}

// UserRepository.java
public interface UserRepository extends JpaRepository<User, Long> {
}

// UserController.java
@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userRepository.save(user);
    }
}
```

**参考开源项目**：
- [spring-projects/spring-boot](https://github.com/spring-projects/spring-boot) — 官方示例
- [spring-projects/spring-petclinic](https://github.com/spring-projects/spring-petclinic) — 经典示例

---

## 3. 中级架构（用户量 1k–100k）

### 3.1 适用场景

- 企业管理系统（ERP、CRM、OA）
- SaaS 应用
- 电子商务平台
- 需要多团队协作的项目

### 3.2 分层架构说明

建议中型项目采用**四层架构**（Controller-Service-Repository-Model）：

```
project/
├── src/
│   ├── controllers/          # Controller layer: handles HTTP requests
│   ├── services/             # Service layer: business logic
│   ├── repositories/         # Repository layer: data access
│   ├── models/               # Model layer: data structures
│   ├── middlewares/          # Middleware
│   ├── utils/                # Utility functions
│   ├── config/               # Configuration
│   └── routes/               # Route definitions
├── tests/
├── docs/
└── scripts/
```

### 3.3 Node.js — 企业分层

**参考开源项目**：
- [nestjs/nest](https://github.com/nestjs/nest) — 企业级 Node.js 框架
- [goldbergyoni/nodebestpractices](https://github.com/goldbergyoni/nodebestpractices) — Node.js 最佳实践

```
node-enterprise/
├── src/
│   ├── modules/              # Organized by feature modules
│   │   ├── users/
│   │   │   ├── users.controller.ts
│   │   │   ├── users.service.ts
│   │   │   ├── users.repository.ts
│   │   │   ├── users.module.ts
│   │   │   └── dto/
│   │   ├── orders/
│   │   └── products/
│   ├── common/               # Shared modules
│   │   ├── filters/          # Exception filters
│   │   ├── guards/           # Guards
│   │   ├── interceptors/     # Interceptors
│   │   └── pipes/            # Pipes
│   ├── config/
│   └── main.ts
```

**NestJS 代码示例**：

```typescript
// users/users.controller.ts
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(@Query() query: QueryUserDto) {
    return this.usersService.findAll(query);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}

// users/users.service.ts
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(query: QueryUserDto) {
    const [data, total] = await this.usersRepository.findAndCount({
      skip: (query.page - 1) * query.limit,
      take: query.limit,
    });
    return { data, total };
  }

  async create(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }
}
```

### 3.4 Python — Django/DRF 风格

**参考开源项目**：
- [django/django](https://github.com/django/django) — 官方项目
- [encode/django-rest-framework](https://github.com/encode/django-rest-framework) — REST 框架
- [cookiecutter/cookiecutter-django](https://github.com/cookiecutter/cookiecutter-django) — 项目模板

```
django-enterprise/
├── apps/
│   ├── users/                # Users app
│   │   ├── models.py
│   │   ├── views.py          # API views
│   │   ├── serializers.py    # Serializers
│   │   ├── permissions.py    # Permissions
│   │   ├── urls.py
│   │   └── tests/
│   ├── orders/
│   └── products/
├── config/                   # Project configuration
│   ├── settings/
│   │   ├── base.py
│   │   ├── development.py
│   │   └── production.py
│   ├── urls.py
│   └── wsgi.py
├── utils/                    # Shared utilities
├── templates/
├── static/
└── manage.py
```

**Django REST 框架代码示例**:

```python
# users/models.py
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    phone = models.CharField(max_length=20, blank=True)
    avatar = models.URLField(blank=True)

# users/serializers.py
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'phone', 'avatar']

# users/views.py
from rest_framework import viewsets, permissions
from rest_framework.decorators import action

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=['get'])
    def me(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)

# users/urls.py
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'users', UserViewSet)

urlpatterns = router.urls
```

### 3.5 Go — 清洁架构风格

**参考开源项目**：
- [gin-gonic/gin](https://github.com/gin-gonic/gin) — Web 框架
- [go-kit/kit](https://github.com/go-kit/kit) — 微服务工具包
- [bxcodec/go-clean-arch](https://github.com/bxcodec/go-clean-arch) — 清洁架构示例

```
go-enterprise/
├── cmd/
│   └── api/                  # Application entry point
│       └── main.go
├── internal/                 # Private code
│   ├── domain/               # Domain layer (entities, interfaces)
│   │   ├── user.go
│   │   └── repository.go
│   ├── usecase/              # Use case layer (business logic)
│   │   └── user_usecase.go
│   ├── delivery/             # Delivery layer (HTTP/gRPC)
│   │   └── http/
│   │       └── user_handler.go
│   ├── repository/           # Repository layer (data access)
│   │   └── user_repository.go
│   └── config/
├── pkg/                      # Public libraries
├── migrations/
└── go.mod
```

**清晰架构代码示例**:

```go
// domain/user.go
type User struct {
    ID        int64     `json:"id"`
    Username  string    `json:"username"`
    Email     string    `json:"email"`
    CreatedAt time.Time `json:"created_at"`
}

// domain/repository.go
type UserRepository interface {
    GetByID(ctx context.Context, id int64) (*User, error)
    GetByEmail(ctx context.Context, email string) (*User, error)
    Create(ctx context.Context, user *User) error
    Update(ctx context.Context, user *User) error
}

// usecase/user_usecase.go
type UserUsecase struct {
    userRepo UserRepository
}

func (u *UserUsecase) GetByID(ctx context.Context, id int64) (*User, error) {
    return u.userRepo.GetByID(ctx, id)
}

func (u *UserUsecase) Create(ctx context.Context, user *User) error {
    // Business logic: check if email already exists
    existing, _ := u.userRepo.GetByEmail(ctx, user.Email)
    if existing != nil {
        return errors.New("email already exists")
    }
    return u.userRepo.Create(ctx, user)
}

// delivery/http/user_handler.go
type UserHandler struct {
    UserUsecase *usecase.UserUsecase
}

func (h *UserHandler) GetUser(c *gin.Context) {
    id, _ := strconv.ParseInt(c.Param("id"), 10, 64)
    user, err := h.UserUsecase.GetByID(c.Request.Context(), id)
    if err != nil {
        c.JSON(404, gin.H{"error": "user not found"})
        return
    }
    c.JSON(200, user)
}
```

### 3.6 Java — Spring Boot 企业级

**参考开源项目**：
- [spring-projects/spring-boot](https://github.com/spring-projects/spring-boot)
- [spring-cloud-samples](https://github.com/spring-cloud-samples) — 微服务示例
- [ali-baba/spring-cloud-alibaba](https://github.com/alibaba/spring-cloud-alibaba) — 阿里巴巴微服务

```
spring-enterprise/
├── src/main/java/com/example/
│   ├── application/          # Application layer
│   │   ├── controller/       # Controllers
│   │   ├── dto/              # Data transfer objects
│   │   └── assembler/        # Assemblers
│   ├── domain/               # Domain layer
│   │   ├── entity/           # Entities
│   │   ├── valueobject/      # Value objects
│   │   ├── repository/       # Repository interfaces
│   │   └── service/          # Domain services
│   ├── infrastructure/       # Infrastructure layer
│   │   ├── repository/       # Repository implementations
│   │   ├── config/           # Configuration
│   │   └── common/           # Utility classes
│   └── Application.java
├── src/main/resources/
│   ├── application.yml
│   └── mapper/
└── src/test/
```

**领域驱动设计 (DDD) 代码示例**:

```java
// domain/entity/User.java
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false, unique = true)
    private String email;

    @Embedded
    private UserStatus status;

    // Domain methods
    public void deactivate() {
        this.status = UserStatus.INACTIVE;
    }

    public boolean isActive() {
        return this.status == UserStatus.ACTIVE;
    }
}

// domain/repository/UserRepository.java
public interface UserRepository {
    Optional<User> findById(Long id);
    Optional<User> findByEmail(String email);
    User save(User user);
    void delete(User user);
}

// application/controller/UserController.java
@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final UserAssembler userAssembler;

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUser(@PathVariable Long id) {
        User user = userService.findById(id);
        return ResponseEntity.ok(userAssembler.toDTO(user));
    }

    @PostMapping
    public ResponseEntity<UserDTO> createUser(@RequestBody @Valid CreateUserRequest request) {
        User user = userService.createUser(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(userAssembler.toDTO(user));
    }
}

// infrastructure/repository/UserRepositoryImpl.java
@Repository
@RequiredArgsConstructor
public class UserRepositoryImpl implements UserRepository {
    private final UserJpaRepository jpaRepository;

    @Override
    public Optional<User> findById(Long id) {
        return jpaRepository.findById(id);
    }

    @Override
    public User save(User user) {
        return jpaRepository.save(user);
    }
}
```

---

## 4. 企业架构（用户 > 10 万）

### 4.1 适用场景

- 大型互联网平台
- 金融交易系统
- 高并发电商系统
- 需要多团队协作的大型项目

### 4.2 微服务架构

当单体应用无法满足需求时，可以考虑微服务架构：

```
microservices-platform/
├── api-gateway/              # API Gateway
│   ├── src/
│   └── Dockerfile
├── services/                 # Business services
│   ├── user-service/         # User service
│   ├── order-service/        # Order service
│   ├── product-service/      # Product service
│   └── payment-service/      # Payment service
├── shared/                   # Shared libraries
│   ├── proto/                # Protocol Buffers
│   ├── common-lib/
│   └── event-contracts/
├── infrastructure/           # Infrastructure
│   ├── docker-compose.yml
│   ├── kubernetes/
│   └── terraform/
└── docs/
```

### 4.3 按语言划分的微服务框架

| 语言 | 微服务框架 | 服务发现 | 配置中心 | 分布式追踪 |
|------|------------|----------|----------|----------|
| **Node.js** | NestJS gRPC | Consul | etcd | Jaeger |
| **Python** | FastAPI Nameko | Eureka | Consul | Zipkin |
| **Go** | Go-kit gRPC | etcd | etcd | OpenTelemetry |
| **Java** | Spring Cloud | Nacos | Nacos | SkyWalking |

### 4.4 代码库设计（单仓库 vs 多仓库）

**单仓库（Monorepo）**:

```
monorepo/
├── services/
│   ├── user-service/         # Independent service
│   │   ├── src/
│   │   ├── package.json
│   │   └── Dockerfile
│   ├── order-service/
│   └── product-service/
├── shared/
│   ├── types/                # Shared types
│   ├── utils/                # Shared utilities
│   └── proto/                # Shared protocols
├── packages/
│   ├── eslint-config/        # Shared ESLint config
│   └── ts-config/            # Shared TS config
├── docker-compose.yml
└── package.json              # Root package.json
```

**优势**：
- 代码共享方便
- 构建和发布统一
- 重构容易

**劣势**：
- 代码库庞大
- 权限管理复杂

**多仓库（Polyrepo）**：

每个服务都有自己的仓库：
- `github.com/company/user-service`
- `github.com/company/order-service`
- `github.com/company/shared-lib`

**优势**：
- 服务独立演进
- 团队自主性高
- 权限清晰

**劣势**：
- 代码共享困难
- 版本管理复杂

### 4.5 数据层设计

**数据库选择策略**：

| 数据类型 | 推荐数据库 | 使用场景 |
|----------|------------|----------|
| 关系数据 | PostgreSQL | 用户、订单、产品 |
| 缓存 | Redis | 会话、热点数据 |
| 搜索 | Elasticsearch | 产品搜索、日志 |
| 时间序列数据 | InfluxDB/TimescaleDB | 监控、指标 |
| 文档数据 | MongoDB | 日志、配置 |

**数据访问层设计**：

```
data-layer/
├── primary-db/               # Primary database
│   ├── master/               # Write database
│   └── slaves/               # Read replicas
├── cache-layer/              # Cache layer
│   ├── redis-cluster/
│   └── local-cache/
├── search-engine/            # Search engine
│   └── elasticsearch/
└── message-queue/            # Message queue
    ├── kafka/
    └── rabbitmq/
```

---

## 5. 开源项目架构参考

### 5.1 Node.js 生态系统

**Express.js 官方项目结构**：```
express-project/
├── bin/                      # Startup scripts
├── public/                   # Static assets
├── routes/                   # Routes
├── views/                    # Views
├── app.js                    # Application configuration
└── package.json
```

**NestJS 官方推荐**:```
nest-project/
├── src/
│   ├── modules/              # Feature modules
│   ├── common/               # Shared modules
│   ├── config/
│   └── main.ts
├── test/
└── nest-cli.json
```

### 5.2 Python 生态系统

**Django 官方项目结构**：```
django-project/
├── project_name/             # Project configuration
├── apps/                     # Apps directory
├── templates/
├── static/
├── media/
└── manage.py
```

**FastAPI 项目结构**：```
fastapi-project/
├── app/
│   ├── api/
│   │   ├── deps.py           # Dependencies
│   │   └── v1/
│   │       └── endpoints/
│   ├── core/                 # Core configuration
│   ├── db/                   # Database
│   ├── models/               # Models
│   ├── schemas/              # Pydantic models
│   └── main.py
├── tests/
└── alembic/                  # Migrations
```

### 5.3 Go 生态系统

**标准项目布局**：```
go-project/
├── cmd/                      # Application entry points
│   └── app/
│       └── main.go
├── internal/                 # Private code
├── pkg/                      # Public libraries
├── api/                      # API definitions
├── web/                      # Static assets
├── configs/                  # Configuration
├── scripts/                  # Scripts
└── go.mod
```

**参考**：
- [golang-standards/project-layout](https://github.com/golang-standards/project-layout)

### 5.4 Java 生态系统

**Spring Boot 官方结构**：```
spring-boot-project/
├── src/main/java/com/example/
│   ├── controller/
│   ├── service/
│   ├── repository/
│   ├── entity/
│   ├── dto/
│   ├── config/
│   └── Application.java
├── src/main/resources/
│   ├── static/
│   ├── templates/
│   └── application.yml
└── src/test/
```

**阿里巴巴 Java 开发手册**：
- 清晰的分层：controller/service/manager/dao
- 领域模型：区分 DO/DTO/BO/VO
- 包结构：按功能模块组织

---

## 6. 架构演进路线图

### 6.1 演进示例

```
Phase 1: Monolithic Application (Entry Level)
    ↓ User growth, team expansion
Phase 2: Layered Architecture (Intermediate Level)
    ↓ Business complexity, multi-team collaboration
Phase 3: Modular/Microservices (Enterprise Level)
    ↓ High concurrency, high availability requirements
Phase 4: Cloud-Native Architecture (Platform Level)
```

### 6.2 升级架构的标准

| 信号 | 当前级别 | 建议升级 |
|------|----------|----------|
| 代码文件 > 50 | 入门 | 中级 |
| 构建时间 > 5 分钟 | 中级 | 模块化 |
| 团队 > 10 人 | 中级 | 微服务 |
| 日活跃用户 > 10 万 | 中级 | 企业级 |
| 多语言技术栈 | 单体 | 微服务 |

---

## 7. 总结

::: tip 💡 核心理念
**架构服务于业务，而不是为了架构而架构。**

**按用户数量选择**:
- **< 1k**：简单脚本，快速上线
- **1k–100k**：分层架构，编码规范
- **> 100k**：微服务，高可用设计

**按语言选择**:
- **Node.js**：利用异步特性，适合 I/O 密集型工作负载
- **Python**：快速开发，适合数据处理和 AI
- **Go**：高性能，适合云原生和微服务
- **Java**：企业级，适合大型复杂系统

**通用原则**:
1. **渐进演进**：从简单开始，随业务增长
2. **约定优于配置**：统一标准降低沟通成本
3. **自动化测试**：确保重构安全
4. **文档优先**：记录架构决策

**最终目标**：让你的代码像工厂车间一样高效运行，无论规模大小。
:::

---

## 参考资源

### 开源项目
- [nestjs/nest](https://github.com/nestjs/nest) — Node.js 企业框架
- [django/django](https://github.com/django/django) — Python Web 框架
- [gin-gonic/gin](https://github.com/gin-gonic/gin) — Go Web 框架
- [spring-projects/spring-boot](https://github.com/spring-projects/spring-boot) — Java 框架

### 架构指南
- [goldbergyoni/nodebestpractices](https://github.com/goldbergyoni/nodebestpractices) — Node.js 最佳实践
- [golang-standards/project-layout](https://github.com/golang-standards/project-layout) — Go 项目布局
- [cookiecutter/cookiecutter-django](https://github.com/cookiecutter/cookiecutter-django) — Django 项目模板
- [ali-baba/spring-cloud-alibaba](https://github.com/alibaba/spring-cloud-alibaba) — 阿里巴巴微服务

### 书籍
- *Clean Architecture* — 罗伯特·C·马丁
- *Building Microservices* — Sam Newman
- *Designing Data-Intensive Applications* — Martin Kleppmann