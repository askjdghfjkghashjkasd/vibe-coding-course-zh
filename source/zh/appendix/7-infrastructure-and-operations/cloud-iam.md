# 云身份与访问管理原则
> **学习指南**：提示工程解决的是“如何清晰地表达”，而云账户权限管理解决的是“谁能做什么”。本章围绕一个问题：**在云端世界中，如何便捷地授予访问权限而不把钥匙交给错误的人？**

在开始之前，建议先复习两个基础知识：

- **什么是令牌（词元）**：你可以阅读《大型语言模型简介》中“词元化与令牌”部分 ([Introduction to Large Language Models](../8-artificial-intelligence/llm-principles.md))。
- **什么是提示（提示词）**：如果你还不熟悉基本的系统 / 用户 / 助手结构，可以查看 [提示工程](../8-artificial-intelligence/prompt-engineering/)。

---

## 0. 介绍：上云即踩“地雷”的动机

<IamRamComparisonDemo />

很多人在初次使用云服务时会遇到类似情况：

- 直接在代码中硬编码 AccessKey 并提交到 GitHub 以便捷使用；
- 给所有员工“管理员权限”，结果有人意外删除了生产数据库；
- 项目交接后，不知道谁还持有前员工的账户凭证；
- 听说要启用多因素认证（MFA），但因觉得“麻烦”而拖延。

直观上，我们可能会认为：**“这些员工缺乏安全意识。”**

但大多数情况下，问题不在于人，而在于**未能建立合理的权限管理体系。**

<IntroProblemReasonSolution />

面对这些挑战，仅仅依赖“更加小心”已经不够。我们需要系统化的权限管理方法——而这正是**IAM（身份与访问管理）**旨在解决的问题。

---

## 1. 从“访问控制系统”开始的 IAM/RAM 概览

### 1.1 类比：公司的智能门禁系统

想象你的公司搬入了一栋新办公楼：

| 情景               | 没有 IAM                                                    | 使用 IAM                                                              |
| :----------------- | :---------------------------------------------------------- | :-------------------------------------------------------------------- |
| 新员工入职         | 给他们一把可以打开所有门的主钥匙                             | 给他们一张仅能打开工作区域门的门禁卡                                |
| 员工离职           | 钥匙丢失，无人知晓持有者                                     | 立即在系统中吊销其门禁卡——所有门都被锁                               |
| 外包人员           | 借给他们钥匙几天                                               | 发放临时门禁卡，自动在 3 天后过期                                     |
| 访客               | 前台发给他们钥匙                                               | 发放一次性访客码，仅能进入会议室                                       |

**IAM（身份与访问管理）**就像这个“智能门禁系统”：

- **身份（Identity）**：谁？员工、外包人员、访客、应用程序
- **访问（Access）**：可以进入哪些门？能够执行哪些操作？
- **管理（Management）**：如何发放钥匙？如何吊销？如何查看记录？

### 1.2 AWS IAM 与阿里云 RAM

<IamRamComparisonDemo />

不同云服务提供商有各自的 IAM 实现：

| 云服务提供商       | 服务名称                         | 核心概念                       |
| :------------------- | :----------------------------------- | :---------------------------------- |
| **AWS**              | IAM（身份和访问管理） | 用户、用户组、角色、策略           |
| **阿里云**           | RAM（资源访问管理）   | 用户、用户组、角色、策略          |
| **腾讯云**           | CAM（云访问管理）     | 用户、用户组、角色、策略          |
| **华为云**           | IAM                  | 用户、用户组、代理、策略          |
| **Azure**            | Azure AD RBAC         | 用户、用户组、角色、RBAC          |

虽然名称不同，**核心概念是相同的**：

- **用户**：代表具体的个人或应用程序
- **用户组**：管理一批用户的权限
- **角色**：定义可以“被承担”的一组权限
- **策略**：具体的权限规则（允许/拒绝的操作）

---

## 2. 用户、用户组、角色：应该选择哪一个

### 2.1 三种“身份”的区别

<IdentityProviderDemo />

我们用办公室场景作比喻：

| 概念           | 类比                                           | 使用场景                       | 特征                                    |
| :---------------- | :--------------------------------------------- | :----------------------------- | :-------------------------------------- |
| **用户**          | 拥有自己工位和门禁卡的全职员工                | 长期、稳定的团队成员           | 拥有永久凭证（密码、AK/SK）             |
| **用户组**        | 部门，如“工程部”或“销售部”                   | 批量权限管理                   | 无法登录，仅作为权限容器                |
| **角色**          | 临时访客证、合同工临时卡                       | 临时授权、跨账户访问           | 无永久凭证，通过“承担”获得临时凭证    |

### 2.2 实例：初创公司的权限演进

**阶段 1：创始团队（2-3 人）**

```
Problem: Using the root account directly to log into the console because it's "easier"
Risk: The root account has all permissions; if compromised, the entire account is ruined
```

**第二阶段：团队扩展（5-10人）**

```
Improvement: Create IAM Users for everyone, assign different permissions
Problems:
- Ops engineer Xiao Wang left — where are his AK/SK scattered across servers?
- The new frontend dev needs S3 read-only access, the backend dev needs RDS access — configuring each one manually is too tedious
```

**第三阶段：标准化（10-30人）**

```
Improvements:
1. Create IAM Groups by role:
   - Developers: S3, EC2, RDS read/write
   - DevOps: Full permissions, but MFA required
   - ReadOnly: View all resources, cannot modify
   - QAs: Test environment resource access

2. Use IAM Roles:
   - EC2 instances use Instance Profiles — no more storing AK/SK on servers
   - Cross-account access via Role Assume — no shared AK/SK
   - CI/CD uses OIDC Federation — no long-term credential storage
```

**第4阶段：多账户 / 企业（30人）**

```
Architecture:
- Master Account: Only used for billing and organizational management; no resources placed here
- Audit Account: Collects logs from all accounts
- Dev Account: Development environment
- Staging Account: Pre-release/testing environment
- Prod Account: Production environment, strictest permissions

Permission Flow:
- Developers have read-only access to the Dev account by default
- To modify production, submit a ticket to request Assume into a temporary Prod Role
- All Assume operations are logged by CloudTrail for periodic auditing
```

---

## 3. 角色与策略：权限管理的“灵魂”

### 3.1 角色的本质：信任 与 权限

<RolePolicyDemo />

一个 IAM 角色有两个核心组成部分：

1. **信任策略**：谁可以承担此角色？
2. **权限策略**：他们在成功承担该角色后可以做什么？

使用戏剧表演的类比：

| 概念                     | 类比                                      | 解释                                                                                                     |
| :---------------------- | :--------------------------------------- | :------------------------------------------------------------------------------------------------------ |
| **角色**                | 剧本中的“哈姆雷特”                        | 定义要表演的剧目（权限）                                                                                       |
| **信任策略**            | 导演说“谁可以扮演哈姆雷特”                 | 可以是“该剧团的演员”（同账户用户）、“从邻近剧团借来的演员”（跨账户）、“特邀演员”（外部身份提供者）                |
| **权限策略**            | 剧本内容                                   | 哈姆雷特可以做什么：说台词、决斗、发疯（具体权限）                                                             |
| **承担角色**            | 演员上台                                   | 小李被选中扮演哈姆雷特；一旦上台，他拥有剧本中定义的所有权限                                                     |
| **临时凭证**            | 表演通行证                                 | 小李获得一个“临时表演通行证”，在演出结束后失效                                                                  |

### 3.2 策略：权限的“语法”

<PermissionHierarchyDemo />

IAM 策略是一个 JSON 文档，用于定义“谁可以对哪些资源做什么”。

**完整策略示例**：

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowS3ReadWrite",
      "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:PutObject", "s3:DeleteObject"],
      "Resource": "arn:aws:s3:::my-app-bucket/*",
      "Condition": {
        "StringEquals": {
          "aws:RequestedRegion": "ap-northeast-1"
        },
        "Bool": {
          "aws:MultiFactorAuthPresent": "true"
        }
      }
    },
    {
      "Sid": "DenySensitiveData",
      "Effect": "Deny",
      "Action": "s3:*",
      "Resource": "arn:aws:s3:::my-app-bucket/sensitive/*"
    }
  ]
}
```

**关键字段说明**：

| 字段          | 含义                                                         | 示例                       |
| :------------- | :----------------------------------------------------------- | :------------------------- |
| **Version**    | 策略语法版本                                                  | "2012-10-17"             |
| **Statement**  | 权限语句数组；可以包含多条规则                                 | [...]                      |
| **Sid**        | 语句ID，可选，用于标识此规则                                   | "AllowS3ReadWrite"       |
| **Effect**     | 效果：允许或拒绝                                              | "Allow"                  |
| **Action**     | 允许/拒绝的操作；支持通配符                                    | "s3:GetObject"，"s3:*"  |
| **Resource**   | 目标资源，通过 ARN 标识                                         | "arn:aws:s3:::bucket/*" |
| **Condition**  | 可选；仅在满足特定条件时生效                                   | 区域限制、多因素认证要求等 |

### 3.3 权限优先级：拒绝 > 允许 > 默认拒绝

IAM 的权限评估逻辑可以用一句话概括：**显式拒绝始终优先；没有允许则为拒绝。**

评估流程如下：

```
1. First check if there is a Deny policy
   ├─ Has Deny → Denied (regardless of any Allow)
   └─ No Deny → Continue checking

2. Then check if there is an Allow policy
   ├─ Has Allow → Allowed
   └─ No Allow → Denied (default deny principle)
```

**实际示例：保护敏感数据**

```json
// Policy 1: Normal permissions for developers
{
  "Effect": "Allow",
  "Action": ["s3:*"],
  "Resource": "arn:aws:s3:::company-data/*"
}

// Policy 2: Protect sensitive directories (even developers with s3:* cannot access)
{
  "Effect": "Deny",
  "Action": ["s3:*"],
  "Resource": "arn:aws:s3:::company-data/sensitive/*"
}
```

**要点**：

- 尽管开发者拥有 `s3:*` 允许权限
- 敏感目录有明确的拒绝规则
- 拒绝优先级更高，因此开发者无法访问敏感数据
- 即使开发者是管理员，该拒绝仍然适用（除非是 root 账户）

---

## 4. 访问密钥 (AK/SK)：需要小心处理的“钥匙”

### 4.1 AK/SK 概述

<AccessKeyManagementDemo />

访问密钥是云服务提供的长期凭证，用于程序化 API 调用。它由两部分组成：

| 组件                  | 名称                 | 作用                               | 类比            |
| :------------------- | :----------------- | :-------------------------------- | :------------- |
| **访问密钥 ID**       | Access Key ID        | 用于识别你的身份（类似用户名）       | 银行卡号        |
| **私密访问密钥**     | Secret Access Key     | 用于证明你就是你所说的身份（类似密码） | 银行卡密码(PIN) |

### 4.2 为什么 AK/SK 是“高风险项目”

**真实案例：一家初创公司的教训**

小李是一家初创公司的新后端工程师。在他的第一周，任务是调试一个文件上传功能。

```python
# Xiao Li's code (serious security issue!)
import boto3

# Hard-coded AK/SK directly in the code for convenience
s3 = boto3.client(
    's3',
    aws_access_key_id='AKIAIOSFODNN7EXAMPLE',
    aws_secret_access_key='wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY',
    region_name='ap-northeast-1'
)

def upload_file(file_path, bucket_name, object_name):
    s3.upload_file(file_path, bucket_name, object_name)
    print(f"File uploaded to s3://{bucket_name}/{object_name}")

# Test upload
upload_file('./test.jpg', 'my-company-bucket', 'uploads/test.jpg')
```

**一周后发生了什么**：

1. 小李将代码提交到了 GitHub（包括 AK/SK）
2. GitHub 上的代码被爬虫扫描，AK/SK 被提取出来
3. 攻击者使用这些凭证在公司账户中创建大量 EC2 实例进行加密货币挖矿
4. 月底账单到达：额外产生了 12,000 美元的费用
5. 审计发现了 AK/SK 泄露，小李被叫去谈话……

**这个案例教会了我们什么？**

| 错误做法                          | 正确做法                                                         |
| :-------------------------------- | :--------------------------------------------------------------- |
| 在代码中硬编码 AK/SK               | 使用 IAM 角色，让程序自动获取临时凭证                              |
| 将 AK/SK 提交到 Git 仓库           | 使用 `.gitignore` 排除配置文件；使用机密管理服务                          |
| 长期使用同一 AK/SK 且不轮换        | 定期轮换 AK/SK；使用临时凭证代替长期凭证                            |
| 给 AK/SK 分配过多权限              | 遵循最小权限原则；只授予必要的权限                                  |

### 4.3 AK/SK 安全最佳实践

**情景 1：本地开发**

```bash
# Correct approach: Use AWS CLI to configure credentials — don't write them in code
aws configure
# Then enter Access Key ID and Secret Access Key as prompted
# This info is saved in ~/.aws/credentials with permissions set to 600

# No credential configuration needed in code
import boto3
s3 = boto3.client('s3')  # Automatically reads from ~/.aws/credentials
```

**场景 2：服务器 / EC2**

```python
# Correct approach: Use IAM Instance Profile
# 1. Create an IAM Role and attach the needed permissions (e.g., S3ReadOnly)
# 2. Create an Instance Profile and associate it with this Role
# 3. When launching EC2, select this Instance Profile

# No credentials needed in code at all
import boto3
s3 = boto3.client('s3')  # Automatically obtains temporary credentials from EC2 metadata service

# Temporary credentials auto-rotate — no need to worry about expiration
```

**场景 3：持续集成 / 持续部署 管道**

```yaml
# Correct approach: Use OIDC Federation (OpenID Connect)
# Example with GitHub Actions:

# 1. Create an OIDC Identity Provider in AWS, trusting GitHub
# 2. Create an IAM Role with a trust policy allowing specific GitHub repos to assume it
# 3. Configure in GitHub Actions

name: Deploy
on: [push]

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      id-token: write # Critical: allows requesting an OIDC token
      contents: read
    steps:
      - uses: actions/checkout@v3

      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          role-to-assume: arn:aws:iam::123456789012:role/GitHubActionsRole
          aws-region: ap-northeast-1
          # Note: No Access Key here! Entirely using temporary credentials

      - name: Deploy
        run: aws s3 sync ./build s3://my-bucket/
```

**摘要：AK/SK使用安全级别**

|安全级别 |实践 |适合 |风险级别 |
|:------------- |:-------------------------------- |:------------------------------- |:------------ |
|最高 |使用 IAM 角色（无长期资历） |EC2、Lambda、ECS、持续集成 / 持续部署 |非常低 |
|高 |使用 OIDC 联邦 |GitHub Actions，GitLab CI |低 |
|中等 |使用秘密管理服务 |本地发展，小团队 |中等 |
|低 |使用环境变量 |快速原型制作，个人项目 |高 |
|非常低 |源代码中有硬代码 |不推荐在任何情况下使用 |非常低 |

---

## 5.多因素认证（MFA）：为您的账户添加“锁”

### 5.1 MFA概述

<MfaSecurity演示 />

多因素认证（MFA），也称为两因素认证（2FA），是一种安全机制，要求用户在登录时提供**两种或以上**不同类型的认证因素：

|因子类型 |它是什么 |示例 |
|:----------------------------------- |:------------------------------------- |:-------------------- |
|**知识因子**（你知道的东西）|只有用户知道的信息 |密码，PIN码 |
|**占有因子**（你拥有的东西） |用户拥有的实体设备 |手机，硬件钥匙 |
|**内在因子**（你是某物）|用户的生物特征 |指纹，面部识别 |

### 5.2 攻读MFA的动机如此重要

**真实数据告诉我们答案**：

|攻击方法 |无多重身份验证的成功率 |多因素认证成功率 |
|:------------------------------------- |:----------------------- |:------------------------------------------- |
|密码猜测 / 暴力破解 |非常高 |极低（仍需第二个因素） |
|钓鱼攻击以获取密码 |非常高 |极低（钓鱼页面无法获得多重身份验证码） |
|密码泄露（来自其他网站泄露事件） |非常高 |极低（第二因素未知） |

**Microsoft 安全报告（2020）**：启用多重身份验证可以阻挡**99.9%**的自动攻击。

### 5.3 MFA实践：为AWS根账户启用MFA

**步骤1：登录AWS控制台**

1. 用你的根账户邮箱和密码登录
2. 点击右上角的账户名称，选择“安全凭证”

**步骤2：启用多重身份验证**

1. 查找“多因素认证（MFA）”部分
2. 点击“分配多重身份验证设备”
3. 选择多重身份验证设备类型（推荐“认证器应用”）

**步骤3：配置虚拟多重身份验证**

1. 在您的手机上安装 Google 身份验证器或 Microsoft 身份验证器
2. 扫描二维码或手动输入密钥
3. 输入应用中显示的6位数字代码（输入两个连续代码，因为代码每30秒刷新一次）

**完成！** 你的根账户现在有了多重身份验证保护。

---

## 6.跨账户访问：安全“访问”的方法

### 6.1 需要跨账户访问的动机

<CrossAccountAccess演示 />

随着企业的发展，许多公司采用**多账户架构**来隔离不同的环境：

| 账户类型             | 目的                                     | 权限要求                         |
| :------------------- | :--------------------------------------- | :------------------------------ |
| **主账户**           | 组织管理、计费                           | 很少使用                         |
| **安全审计**         | 集中收集所有账户日志                      | 对其他账户只读访问                |
| **共享服务**         | 共享资源（镜像仓库等）                    | 从其他账户只读访问                |
| **开发**             | 开发环境                                 | 开发人员全面访问                  |
| **预发布**           | 测试/预发布环境                           | 测试人员权限                      |
| **生产**             | 生产环境                                 | 严格限制，需要审批                |

**问题：生产账户的 EC2 如何从共享服务账户的仓库拉取镜像？**

- 选项 A：在生产的用户数据中写入 AK/SK （危险！有 AK/SK 泄露风险）
- 选项 B：使用跨账户 Role 假设（推荐！临时凭证，自动轮换）

### 6.2 跨账户 Role 假设的工作原理

```
Account A (Production)                    Account B (Shared Services)
    |                                           |
    |  1. Request Assume Role                  |
    |  "I want to assume Account B's          |
    |   ECRReadRole"                            |
    |------------------------------------------>|
    |                                           |
    |                    2. Check Trust Policy  |
    |                    "Can Account A         |
    |                     assume me?"           |
    |                                           |
    |  3. Return temporary credentials         |
    |  AccessKeyId, SecretKey, SessionToken    |
    |<------------------------------------------|
    |                                           |
    |  4. Use temporary credentials            |
    |     to access ECR                         |
    |  docker pull accountB.dkr.ecr...         |
```

**关键点**：

- 临时凭证默认有效期为1小时，可配置最长至12小时
- 无需在代码中存储任何长期凭证
- 信任策略可以限制谁可以承担该角色（例如，特定账户、特定外部 ID）

### 6.3 实操：配置跨账户 ECR 访问

**场景**：生产账户的 EC2 需要从共享服务账户拉取 Docker 镜像。

**步骤 1：在共享服务账户中创建 IAM 角色**

1. 登录共享服务账户的 AWS 控制台
2. 转到 IAM → 角色 → 创建角色
3. 选择“另一个 AWS 账户”
4. 输入生产账户的账户 ID
5. 可选：勾选“需要外部 ID”并输入一个随机字符串（增加安全性）
6. 附加权限：AmazonEC2ContainerRegistryReadOnly
7. 角色命名：CrossAccountECRReadRole

**步骤 2：获取角色 ARN**

创建后，复制角色的 ARN：

```
arn:aws:iam::SHARED_SERVICES_ACCOUNT_ID:role/CrossAccountECRReadRole
```

**步骤 3：在生产账户中配置 EC2 实例**

方法 A：使用实例配置文件（推荐）

1. 在生产账户中创建一个 IAM 角色（供 EC2 使用）
2. 信任策略：信任 EC2 服务
3. 权限策略：允许假设跨账户角色

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "sts:AssumeRole",
      "Resource": "arn:aws:iam::SHARED_SERVICES_ACCOUNT_ID:role/CrossAccountECRReadRole"
    }
  ]
}
```

4. 创建一个实例配置文件并将其与此角色关联
5. 启动 EC2 时，选择此实例配置文件

方法 B：在 EC2 用户数据中动态假设角色

```bash
#!/bin/bash
# Install AWS CLI
yum install -y aws-cli

# Assume cross-account Role
CREDS=$(aws sts assume-role \
  --role-arn arn:aws:iam::SHARED_SERVICES_ACCOUNT_ID:role/CrossAccountECRReadRole \
  --role-session-name EC2PullSession)

# Extract temporary credentials
export AWS_ACCESS_KEY_ID=$(echo $CREDS | jq -r '.Credentials.AccessKeyId')
export AWS_SECRET_ACCESS_KEY=$(echo $CREDS | jq -r '.Credentials.SecretAccessKey')
export AWS_SESSION_TOKEN=$(echo $CREDS | jq -r '.Credentials.SessionToken')

# Log in to ECR
aws ecr get-login-password --region ap-northeast-1 | \
  docker login --username AWS --password-stdin SHARED_SERVICES_ACCOUNT_ID.dkr.ecr.ap-northeast-1.amazonaws.com

# Pull the image
docker pull SHARED_SERVICES_ACCOUNT_ID.dkr.ecr.ap-northeast-1.amazonaws.com/my-app:latest
```

**步骤 4：测试跨账户访问**

在生产环境的 EC2 实例上运行：

```bash
# Test if Assume Role works
aws sts get-caller-identity
# Should show: arn:aws:sts::PRODUCTION_ACCOUNT_ID:assumed-role/CrossAccountECRReadRole/EC2PullSession

# Test if we can list Shared Services ECR repositories
aws ecr describe-repositories --registry-id SHARED_SERVICES_ACCOUNT_ID
```

**完成！** 现在生产环境的 EC2 可以安全地从共享服务中拉取镜像，而无需共享任何长期凭证。

---

## 7. 动手操作：构建安全的权限系统

### 7.1 从零开始构建权限架构

<BestPracticesDemo />

假设你是一家 10 人初创公司的技术负责人，需要从零开始设计 AWS 权限架构。以下是推荐的实施步骤：

**阶段 1：根账户保护（第 1 天）**

```
Goal: Protect the root account — this is the most important account

1. Enable root account MFA (mandatory)
   - Hardware MFA recommended (YubiKey), or Google Authenticator

2. Create an IAM admin user
   - Username: admin (or your name)
   - Permissions: AdministratorAccess (but will be tightened later)
   - Enable MFA

3. Delete the root account's Access Keys (if any were created)
   - The root account should never have AK/SK

4. Configure root account usage alerts
   - Use CloudWatch + SNS to send email/SMS whenever the root account logs in
```

**阶段 2：团队权限分组（第 1 周）**

```
Goal: Group team members and manage permissions in batches

1. Analyze team roles:
   - Backend developers (2)
   - Frontend developer (1)
   - Mobile developer (1)
   - Product manager (1)
   - Designer (1)
   - Founders / admins (3)

2. Create IAM Groups:

   Group: Developers
   ├── Members: All developers (backend, frontend, mobile)
   ├── Permissions:
   │   ├── EC2: Start, stop, view (but cannot delete others' instances)
   │   ├── S3: Read/write development environment buckets
   │   ├── RDS: Read-only (cannot modify production database)
   │   └── CloudWatch: View logs
   └── Restriction: Can only operate in the ap-northeast-1 region

   Group: ProductTeam
   ├── Members: Product manager, designer
   ├── Permissions:
   │   ├── S3: Read-only (view data files)
   │   ├── CloudWatch Dashboard: View monitoring charts
   │   └── Cost Explorer: View billing (but cannot modify)
   └── Restriction: Read-only; cannot modify any resources

   Group: Administrators
   ├── Members: Founders, tech lead
   ├── Permissions: AdministratorAccess
   └── Requirement: Must use MFA to perform operations

3. Create an IAM User for each person and add them to the corresponding Group
   - Never attach permissions directly to individuals — always manage via Groups
   - Enable MFA (mandatory)
```

**第3阶段：应用层权限优化（第2-4周）**

```
Goal: Let applications access AWS resources securely

1. EC2 instances use Instance Profiles
   - No more configuring AK/SK on servers
   - Create an IAM Role and attach needed permissions (e.g., S3 read/write)
   - Create an Instance Profile and associate it with this Role
   - Select this Instance Profile when launching EC2
   - Application code uses boto3 directly without credential configuration

2. If AK/SK must be used (third-party integrations)
   - Use AWS Secrets Manager to store AK/SK
   - Application reads from Secrets Manager at startup
   - Set up regular rotation (90 days)
   - Monitor AK/SK usage

3. Configure CloudTrail to record all API calls
   - Create a dedicated S3 bucket for log storage
   - Enable log file validation (to prevent tampering)
   - Configure SNS notifications for critical events (e.g., root account usage, policy changes)
```

**阶段 4：安全加固（持续进行中）**

```
Goal: Establish continuous security monitoring and improvement mechanisms

1. Enable AWS Config
   - Monitor resource configuration changes
   - Check compliance (e.g., whether security groups have 0.0.0.0/0 open)

2. Enable IAM Access Analyzer
   - Continuously analyze resource policies
   - Identify external access (e.g., whether S3 buckets are public)

3. Regularly review IAM configuration
   - Monthly check for unused IAM Users and Roles
   - Check Access Key usage
   - Verify Group membership is reasonable

4. Establish a security incident response process
   - If AK/SK leak is discovered: Immediately delete, rotate, audit the impact scope
   - If abnormal API calls are detected: Immediately investigate and restrict permissions
```

---

## 8. 常见误区及避免指南

### 8.1 十大 IAM 反模式

| #   | 反模式                                      | 为什么不好                                                   | 正确做法                                                      |
| :-- | :---------------------------------------- | :----------------------------------------------------------- | :------------------------------------------------------------ |
| 1   | 使用 root 账户进行日常操作                  | root 账户具有所有权限；如果被入侵，损害无法限制               | 创建一个 IAM 管理用户；仅在必要时使用 root 账户              |
| 2   | 给每个人授予 AdministratorAccess         | 违反最小权限原则；增加出错和内部威胁的风险                    | 按角色分组；仅授予必要权限                                   |
| 3   | 在源码中硬编码 AK/SK                       | AK/SK 易通过 GitHub 泄露，且难以轮换                         | 使用 IAM 角色、环境变量或密钥管理服务                        |
| 4   | 长期不轮换 AK/SK                           | 凭证泄露后增加暴露窗口                                       | 设置 90 天轮换策略，或更好——使用临时凭证                     |
| 5   | 忽略 MFA                                   | 密码泄露时账户会立即被入侵                                     | 为所有 IAM 用户启用 MFA，尤其是高权限用户                   |
| 6   | 不使用 CloudTrail                          | 无法审计是谁做了什么；无法追踪事件                           | 启用 CloudTrail，并将日志存储在单独的审计账户中              |
| 7   | IAM 策略权限过大                            | 例如 `Resource: "*"`、`Action: "*"` — 会增加攻击面                                | 明确指定资源 ARN 和具体操作                                    |
| 8   | 不清理离职员工的 IAM 用户                   | 僵尸账户可能成为后门                                           | 建立离职流程；立即禁用并删除 IAM 用户                        |
| 9   | 不使用 IAM Access Analyzer                 | 无法发现权限过大的资源策略（例如公共 S3 桶）                 | 启用 IAM Access Analyzer；定期检查外部访问                   |
| 10  | 不在测试环境验证策略                        | 直接在生产环境应用策略可能导致服务中断                         | 使用 IAM Policy Simulator 进行测试；先在测试环境验证         |

---

## 9. 术语表

|英文术语 |中文翻译 |解释 |
|:--------------------------------------- |:----------------------------- |:------------------------------------------------------------------- |
|**IAM（身份与访问管理）** |身份与访问管理                 |用于管理用户身份和访问权限的云服务 |
|**RAM（资源访问管理）** |资源访问管理                   |阿里云的IAM服务名称 |
|**根账户** |根账号                         |注册云账户时创建的所有者账户;拥有最高权限 |
|**IAM 用户** |IAM 用户/子账号 |由根账户创建的日常操作子身份 |
|**IAM 角色** |IAM 角色 |临时许可承载者，没有长期凭证;需要被“假设”|
|**IAM 策略** |IAM 策略 |JSON格式权限规则定义 |
|**ARN** |亚马逊资源名称                 |全球唯一资源标识符 |
|**AK/SK** |访问密钥/密钥                  |程序化云API访问的凭证 |
|**STS** |安全令牌服务                   |提供临时安全凭据的服务 |
|**MFA** |多因素认证                     |认证方法需要两个或更多因素 |
|**SSO** |单点登录                       |认证方法允许用户通过一次登录访问多个系统 |
|**ExternalId** |外部 ID |用于防止混乱副手攻击的安全标识符 |
|**云迹** |云审计服务                     |记录云账户中所有API调用和操作的日志服务 |

---

## 摘要：云账户权限管理的核心原则

云账户权限管理不是一次性的努力——它需要根据团队规模和业务需求持续演进：

1. **起始阶段**（1-10人）：
   - 保护根账户（MFA：日常操作不使用根账户）
   - 创建IAM管理员用户
   - 基础分组（开发者、管理员）

2. **成长阶段**（10-50人）：
   - 精炼权限分组（前端/后端、运维、产品等）
   - 使用IAM 角色代替AK/SK
   - 启用CloudTrail审计
   - 定期许可审核

3. **成熟期**（50人/多账户）：
   - 多账户架构（开发、预设、生产分离）
   - 集中式日志审计账户
   - 自动权限审核和提醒
   - 完善的许可请求和审批工作流程

**记住三大核心原则**：

1. **最小权限原则**：只授予必要的权限;不授予管理员权限
2. **无长期凭证**：优先使用IAM角色和临时凭证以避免AK/SK泄露
3. **启用多重身份验证**：尤其是对于根账户和高权限账户——这是最有效的安全措施

---

> **进一步阅读**：
>
> - [AWS IAM 官方文档](https://docs.aws.amazon.com/iam/)
> - [阿里云 RAM 官方文档](https://www.aliyun.com/product/ram)
> - [AWS IAM 最佳实践](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html)