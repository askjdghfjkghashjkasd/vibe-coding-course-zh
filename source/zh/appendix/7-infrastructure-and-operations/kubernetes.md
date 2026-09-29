# Kubernetes 编排原理

::: tip 前言
**Docker 解决了“打包”问题，而 Kubernetes 解决了“管理”问题。** 当你有数十甚至数百个需要部署、扩展和故障恢复的容器时，手动管理是不切实际的。Kubernetes（简称 K8s）是容器的“操作系统”，可以自动化容器化应用的部署、扩展和运维。
:::

**你将从本文学到什么？**

完成本章后，你将获得：

- **架构理解**：掌握 K8s 控制平面和工作节点的组成
- **核心资源**：熟悉 Pod、部署 和 Service 等核心概念
- **声明式管理**：理解“声明期望状态，系统自动收敛”的理念
- **运维能力**：了解滚动更新、自动扩缩容、健康检查等机制
- **实操入门**：使用 kubectl 和 YAML 部署完整应用

| 章节 | 内容 | 核心概念 |
|---------|---------|---------------|
| **第1章** | 为什么需要 K8s | 容器编排的挑战 |
| **第2章** | K8s 架构 | 控制平面、工作节点、etcd |
| **第3章** | 核心资源 | Pod、部署、Service、Ingress |
| **第4章** | 声明式管理 | YAML、kubectl、控制循环 |
| **第5章** | 运维实践 | 滚动更新、HPA、健康检查 |

---

## 1. 使用 Kubernetes 的动机

Docker 使单个容器的打包和运行变得简单，但当你遇到以下场景时，手动管理就显得不足：

| 挑战 | 描述 | K8s 解决方案 |
|-----------|-------------|-------------|
| 多实例部署 | 一个服务需要运行 10 个副本 | 部署 自动管理副本数量 |
| 故障恢复 | 容器崩溃，需要自动重启 | 控制器会自动检测并重新创建 Pod |
| 服务发现 | 容器 IP 会变化，如何互相找到？ | Service 提供稳定的 DNS 和 IP |
| 滚动更新 | 更新版本时不能停止服务 | 逐步替换旧 Pod，实现零停机 |
| 弹性扩缩容 | 流量高峰时自动扩容 | HPA 根据 CPU/内存自动调整副本数量 |
| 资源调度 | 将容器放置在最合适的机器上 | Scheduler 智能调度 |

::: tip K8s 核心理念：声明式
你不会告诉 K8s “启动 3 个容器”（命令式），而是告诉它“我希望有 3 个副本运行”（声明式）。K8s 会持续监控，确保实际状态与声明的期望状态一致。如果 Pod 崩溃，它会自动创建一个新的 Pod 来替代。
:::

---

## 2. Kubernetes 架构

一个 K8s 集群由控制平面和工作节点组成。

<K8sArchitectureDemo />

### 请求的完整路径

```
User Request → Ingress Controller → Service → kube-proxy → Pod (Container)
                                              ↑
                                    Endpoint list (maintained by Service)
```

---

## 3. 核心资源对象

K8s 通过各种“资源对象”描述集群的期望状态。

<K8sWorkloadsDemo />

### 资源对象类别

| 类别 | 资源 | 目的 |
|------|------|------|
| 工作负载 | Pod, 部署, StatefulSet, DaemonSet, Job | 运行应用程序 |
| 网络 | Service, Ingress, NetworkPolicy | 服务发现和流量管理 |
| 配置 | ConfigMap, Secret | 配置和敏感数据管理 |
| 存储 | PersistentVolume, PersistentVolumeClaim | 持久存储 |
| 调度 | Node, Namespace, ResourceQuota | 资源隔离和限制 |

---

## 4. 声明式管理和 kubectl

### 对账循环

K8s 的核心工作机制是对账循环：

```
Observe → Diff → Act → Observe...
     ↓          ↓        ↓
  Read actual   Compare   Execute
  state         with      corrective
                desired   actions
                state
```

您声明 `replicas: 3`。控制器只发现 2 个正在运行的 Pod，并创建 1 个新的 Pod。这个循环每隔几秒执行一次，确保系统始终趋向于所需状态。

### 常用 kubectl 命令

| 命令 | 目的 | 示例 |
|---------|---------|---------|
| `kubectl apply -f` | 应用 YAML 配置 | `kubectl apply -f deployment.yaml` |
| `kubectl get` | 列出资源 | `kubectl get pods -o wide` |
| `kubectl describe` | 查看资源详情 | `kubectl describe pod my-app-xxx` |
| `kubectl logs` | 查看 Pod 日志 | `kubectl logs -f my-app-xxx` |
| `kubectl exec` | 进入 Pod 终端 | `kubectl exec -it my-app-xxx -- sh` |
| `kubectl delete` | 删除资源 | `kubectl delete -f deployment.yaml` |
| `kubectl scale` | 手动扩缩容 | `kubectl scale deploy my-app --replicas=5` |

::: tip apply 与 create 的区别
`kubectl create` 是命令式的 — “创建这个资源”，如果已存在会报错。`kubectl apply` 是声明式的 — “确保资源处于此状态”，如果不存在则创建，如果存在则更新。在生产环境中，你应该始终使用 `apply`。
:::

---

## 5. 运维实践

### 5.1 滚动更新与回滚

部署 默认使用滚动更新策略：逐步创建新版本 Pods，同时逐步终止旧版本 Pods。

```yaml
spec:
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1        # At most create 1 extra Pod
      maxUnavailable: 0   # No Pods allowed to be unavailable
```

| 操作 | 命令 |
|-----------|---------|
| 更新镜像 | `kubectl set image deploy/my-app app=my-app:2.0` |
| 查看更新状态 | `kubectl rollout status deploy/my-app` |
| 查看修订历史 | `kubectl rollout history deploy/my-app` |
| 回滚到之前的版本 | `kubectl rollout undo deploy/my-app` |

### 5.2 自动伸缩（HPA）

HPA（水平 Pod 自动伸缩器）会根据 CPU、内存或自定义指标自动调整 Pod 副本的数量。

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: my-app-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: my-app
  minReplicas: 2
  maxReplicas: 10
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
```

### 5.3 健康检查（探针）

K8s 通过三类探针监控 Pod 的健康状况：

| 探针 | 目的 | 失败后果 |
|-------|---------|-------------------|
| livenessProbe | 检测容器是否存活 | 重启容器 |
| readinessProbe | 检测容器是否准备就绪 | 从服务中移除，不接收流量 |
| startupProbe | 检测容器是否已完成启动 | 启动期间不运行其他探针 |

::: tip 探针的重要性
如果未配置健康检查探针，K8s 只能通过进程是否存在来判断健康状况。但通常进程仍在运行，而服务已不再响应（如死锁、接近 OOM）。配置 livenessProbe 允许 K8s 自动重启这些“僵尸”容器。
:::

---

## 总结

Kubernetes 是容器编排的事实标准，理解其核心概念是云原生开发的基础。

本章的关键要点：

1. **声明式管理**：告诉 K8s "我想要什么"，而不是 "如何做"——控制循环自动收敛
2. **分层架构**：控制平面做决策，工作节点执行操作，etcd 存储状态
3. **核心资源**：Pod（最小单元）、部署（副本管理）、Service（服务发现）、Ingress（外部入口）
4. **操作自动化**：零停机滚动更新、HPA 弹性扩缩、探针自动故障恢复
5. **配置分离**：ConfigMap 和 Secret 将配置与镜像解耦

## 延伸阅读

- [Kubernetes 官方文档](https://kubernetes.io/docs/) - 最权威的参考资料
- [Kubernetes the Hard Way](https://github.com/kelseyhightower/kubernetes-the-hard-way) - 手工从零构建 K8s 集群
- [The Illustrated Children's Guide to Kubernetes](https://www.cncf.io/phippy/) - CNCF 的趣味入门指南
- [Kubernetes Patterns](https://www.oreilly.com/library/view/kubernetes-patterns-2nd/9781098131678/) - K8s 设计模式