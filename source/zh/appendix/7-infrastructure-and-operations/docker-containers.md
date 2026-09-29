# Docker 容器化简介

::: tip 前言
**“在我机器上可以运行”是最经典的开发者借口，而 Docker 使这个借口彻底消失。** 容器化技术将应用及其所有依赖打包成标准化单元，从而确保在任何环境中的一致执行。它是现代软件交付的基石。
:::

**你将从本文中学到什么？**

完成本章节后，你将获得：

- **核心概念**：理解镜像、容器和仓库这三个核心概念
- **架构对比**：了解容器与虚拟机之间的根本区别
- **动手技能**：掌握 Dockerfile 编写及常用命令
- **编排基础**：学习使用 Docker Compose 管理多服务应用
- **最佳实践**：了解镜像优化、安全加固及其他生产级实践

| 章节 | 内容 | 核心概念 |
|---------|---------|---------------|
| **第1章** | 为什么需要容器 | 环境一致性、资源效率、标准化交付 |
| **第2章** | 核心概念 | 镜像、容器、仓库、Dockerfile |
| **第3章** | Docker 生命周期 | 编写、构建、推送、运行、管理 |
| **第4章** | Docker Compose | 多服务编排、网络、卷 |
| **第5章** | 最佳实践 | 镜像优化、安全、多阶段构建 |

---

## 1. 容器化的动机

在容器出现之前，部署应用需要手动安装运行时、配置环境变量，并处理服务器上的依赖冲突。不同环境（开发、测试、生产）之间的差异是错误的温床。

<DockerArchitectureDemo />

### 容器解决了哪些问题

| 问题 | 传统方法 | 容器方法 |
|---------|---------------------|-------------------|
| 环境不一致 | “在我机器上可以运行” | 打包所有依赖，到处一致 |
| 依赖冲突 | 应用 A 需要 Node 14，应用 B 需要 Node 18 | 每个容器有独立环境 |
| 资源浪费 | 每个虚拟机都有完整操作系统 | 共享内核，MB 级开销 |
| 部署慢 | 手动安装和配置 | `docker run` — 一条命令 |
| 难以扩展 | 创建新虚拟机，安装环境，部署 | 秒级启动新容器 |

::: tip 容器的本质
容器不是轻量级虚拟机。其本质是**隔离的进程**。Linux 内核通过两种机制实现容器：
- **命名空间 (Namespaces)**：隔离进程的视图（PID、网络、文件系统等）
- **控制组 (Cgroups)**：限制进程的资源使用（CPU、内存、IO）

容器内的进程本质上和主机上的普通进程没什么不同——它们只是“被锁在一个看不到外面的房间里”。
:::

---

## 2. 核心概念

Docker 世界围绕三个核心概念：镜像、容器和仓库。

| 概念 | 类比 | 描述 |
|---------|---------|-------------|
| 镜像 | 类 / 模板 | 只读的应用模板，包含代码、运行时、库和配置 |
| 容器 | 实例 / 对象 | 镜像的运行实例，可读写，具有独立生命周期 |
| 注册表 | 应用商店 | 用于存储和分发镜像的服务（Docker Hub、ACR、ECR） |
| Dockerfile | 食谱 / 蓝图 | 定义如何构建镜像的文本文件 |
| 卷 | 外部硬盘 | 持久化数据；数据在容器删除后仍然存在 |

### 镜像层结构

Docker 镜像由多个只读层叠加而成。每个 Dockerfile 指令都会创建一层：

```
┌─────────────────────────┐
│  CMD ["node", "app.js"] │  ← Startup command layer
├─────────────────────────┤
│  COPY . /app            │  ← Application code layer (changes frequently)
├─────────────────────────┤
│  RUN npm install        │  ← Dependency installation layer (changes occasionally)
├─────────────────────────┤
│  FROM node:18-alpine    │  ← Base image layer (rarely changes)
└─────────────────────────┘
```

::: tip 为什么分层很重要
Docker 会缓存每一层。如果某一层没有变化，构建时会重用缓存。因此，在 Dockerfile 中，你应该将**不常变化的指令放在顶部**（例如安装依赖）以及**经常变化的指令放在底部**（例如复制代码）。这样，大多数构建都可以命中缓存，从而大大加快速度。
:::

---

## 3. Docker 生命周期

从编写 Dockerfile 到运行容器，Docker 的工作流程是一条清晰的管道。

<DockerLifecycleDemo />

### Dockerfile 常用指令参考

| 指令 | 目的 | 示例 |
|------------|---------|---------|
| `FROM` | 指定基础镜像 | `FROM node:18-alpine` |
| `WORKDIR` | 设置工作目录 | `WORKDIR /app` |
| `COPY` | 将文件复制到镜像中 | `COPY package.json ./` |
| `RUN` | 在构建期间执行命令 | `RUN npm install` |
| `ENV` | 设置环境变量 | `ENV NODE_ENV=production` |
| `EXPOSE` | 声明端口（仅作文档用途） | `EXPOSE 3000` |
| `CMD` | 容器启动命令 | `CMD ["node", "app.js"]` |
| `ENTRYPOINT` | 容器入口点（更难被覆盖） | `ENTRYPOINT ["nginx"]` |

---

## 4. Docker Compose：多服务编排

实际项目通常涉及多个容器。一个 Web 应用可能需要：应用服务器、数据库、Redis、Nginx。Docker Compose 使用单个 YAML 文件来定义和管理多个容器。

### docker-compose.yml 示例

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DB_HOST=db
      - REDIS_HOST=redis
    depends_on:
      - db
      - redis

  db:
    image: postgres:15-alpine
    volumes:
      - db-data:/var/lib/postgresql/data
    environment:
      - POSTGRES_PASSWORD=secret

  redis:
    image: redis:7-alpine

volumes:
  db-data:
```

### Compose 核心概念

| 概念 | 描述 | 示例 |
|---------|-------------|---------|
| services | 定义单个容器服务 | app, db, redis |
| volumes | 持久化数据卷 | db-data 存储数据库文件 |
| networks | 自定义网络（默认自动创建） | 服务通过服务名称相互访问 |
| depends_on | 启动顺序依赖 | app 依赖 db 和 redis |
| environment | 环境变量 | 数据库密码，连接地址 |

::: tip 服务发现
在 Docker Compose 中，服务名称就是主机名。app 容器可以直接使用 `db:5432` 访问数据库，使用 `redis:6379` 访问 Redis，而无需了解 IP 地址。这都得益于 Docker 内置的 DNS。
:::

---

## 5. 最佳实践

### 5.1 多阶段构建

多阶段构建是优化镜像大小的强大工具。构建阶段安装所有工具和依赖，而最终阶段只保留运行时所需的文件。

```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Runtime stage
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "dist/server.js"]
```

### 5.2 镜像优化清单

| 优化措施 | 方法 | 效果 |
|---------|------|------|
| 选择小的基础镜像 | 使用 `alpine` 而不是 `ubuntu` | 镜像从约 200MB 减少到约 50MB |
| 合并 RUN 指令 | 使用 `&&` 连接多个命令 | 减少镜像层 |
| 使用 .dockerignore | 排除 node_modules、.git 等 | 加快构建速度，减少上下文 |
| 多阶段构建 | 分离构建环境和运行环境 | 最终镜像不包含构建工具 |
| 锁定版本号 | 使用 `node:18.17-alpine` 而不是 `node:latest` | 可复现的构建 |

### 5.3 安全实践

| 实践 | 描述 |
|------|------|
| 不以 root 运行 | 使用 `USER node` 指定非 root 用户 |
| 扫描漏洞 | 使用 `docker scout` 或 Trivy 扫描镜像 |
| 最小权限原则 | 只安装必要的包，不使用调试工具 |
| 不硬编码密钥 | 使用环境变量或 Docker Secrets |
| 定期更新基础镜像 | 及时修复安全漏洞 |

---

## 总结

Docker 容器化是现代软件交付的基础设施，理解它对任何开发者都至关重要。

本章核心要点：

1. **容器 vs 虚拟机**：容器共享主机内核，更轻量、更快速，但隔离性略逊于虚拟机
2. **核心三要素**：镜像（模板）、容器（实例）、镜像仓库（分发）
3. **Dockerfile**：分层构建、利用缓存、将不常变化的指令放在前面
4. **Docker Compose**：使用 YAML 定义多服务应用，服务名即主机名
5. **生产环境实践**：多阶段构建减少镜像大小，使用 alpine 基础镜像，以非 root 身份运行

## 延伸阅读

- [Docker 官方文档](https://docs.docker.com/) - 最权威的参考资料
- [Docker 入门指南](https://docs.docker.com/get-started/) - 官方初学者教程
- [Dockerfile 最佳实践](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/) - 官方最佳实践指南
- [Docker Compose 文档](https://docs.docker.com/compose/) - 完整的 Compose 参考