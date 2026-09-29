<script setup>
import RelatedArticlesSection from '../../../../.vitepress/theme/components/RelatedArticlesSection.vue'
import { relatedArticlesMap } from '../../../../.vitepress/theme/data/relatedArticles'
</script>

# 将你的网站上线（高级）：设置你自己的 VPS

> 💡 **“将网站上线”是什么意思？** 也叫 “上线” 或 “部署/发布”。你在自己电脑上搭建的网站只能自己打开。**将其上线意味着将网站放在全天运行的服务器上，这样任何人都可以在浏览器中输入网址访问它** —— 就像一个你自己能读的 Word 文档，一旦发布到博客就可以被所有人看到；不同的是，这次你发布的是完整的网站。

在上一章中，我们学习了最简单的发布方法 —— 使用一键式 PaaS 平台，如 Vercel 或 Zeabur。本章讲解更灵活的自助式方法：**购买自己的云服务器，从零设置一切，并自己发布网站**。你将学习如何选择服务器、连接服务器、安装环境、配置 Nginx、绑定域名以及启用 HTTPS。一旦掌握了这些，没有任何平台可以限制你 —— 可以运行任何你想要的服务。

---

# 0. 明智选择：部署平台决策树

在选择平台之前，先回答三个问题：

1. **你的项目是否需要全天运行？**
   - 不需要（只在访问时响应，例如文档、博客、静态网站） → **静态托管 / PaaS**
   - 需要（定时任务、爬虫、Telegram/Discord 机器人、WebSocket 服务） → **全天运行的 PaaS 或 VPS**

2. **你是否需要 GPU？**
   - 不需要（仅调用 OpenAI/Anthropic API） → 常规平台即可
   - 需要（运行开源模型、生成图像/视频） → **GPU 云平台**（Modal、Replicate、Lambda Labs）

3. **你的用户主要分布在哪里？**
   - 全球 / 美欧 → Vercel / Railway / Fly.io / AWS
   - 中国大陆 → 中国云（阿里云 / 腾讯云）或 Cloudflare（在中国访问快）
   - 两者都有 → 使用 CDN，将面向中国的资源部署在中国云，全球用户用 AWS 并配置 GeoDNS

```
What type of project are you deploying?
│
├─ Pure frontend static site (Vite/React/Vue build output)
│   ├─ Completely free → Cloudflare Pages (unlimited bandwidth) / GitHub Pages
│   ├─ Next.js project → Vercel (official platform, best DX)
│   └─ China users primarily → Cloudflare Pages or domestic OSS+CDN
│
├─ Backend API, doesn't need to be always-on (request-triggered)
│   ├─ Node.js/Python API → Vercel Functions / Cloudflare Workers
│   └─ Full-stack frameworks (Next.js/Nuxt/SvelteKit) → Vercel
│
├─ Needs always-on process (Bot, cron, WebSocket)
│   ├─ Don't want to manage servers → Railway / Render / Fly.io
│   ├─ Full control & cost savings → Buy a VPS (DigitalOcean / Vultr / Hetzner / AWS EC2)
│   └─ China-facing projects → Tencent Cloud Lighthouse / Alibaba Cloud ECS
│
├─ Need to run AI models / GPU
│   ├─ Inference API → Modal / Replicate / Hugging Face Inference
│   ├─ Training/Fine-tuning → Modal / Lambda Labs
│   └─ China GPU → AutoDL / Alibaba Cloud PAI
│
└─ Large production projects
    └─ AWS/GCP + Kubernetes (hire DevOps or let AI write Terraform)
```

---

# 1.免费/低成本部署平台详细介绍（无需服务器）

对于大多数个人项目、演示和作品集，你**根本不需要购买服务器**。本节介绍了最受欢迎的免费/低价平台，包括如何注册、如何使用以及它们的陷阱。

## 1.1 Vercel — Next.js / 前端首选

**网站：** https://vercel.com

**最佳用途：** Next.js项目、React/Vue前端、带无服务器功能的全栈应用、AI聊天机器人（响应速度快）

**如何使用：**
1. 用你的GitHub账号注册
2. 点击“添加新......”→ “项目”
3. 选择你的 GitHub 仓库
4. Vercel 自动检测你的框架（Next.js/Vite/React 等），填充环境变量
5. 点击“部署”——您的网站将在1-2分钟内上线，邮箱`xxx.vercel.app`

**免费套餐（爱好计划）:**
- 每月100 GB带宽
- 每月100小时的建造时间
- 无服务器函数执行时间 **10 秒**（最关键的限制！）
- 自动HTTPS、全球CDN、PR预览链接

**付费（专业，每月20美元）:**
- 功能超时延长至60-300秒
- 1 TB 带宽
- 团队协作功能

** ⚠️ 初学者遇到的主要限制：**
- **免费套餐10秒功能超时**：AI API调用超过10秒将断开连接。专业版每月20美元可延长至60先令，300先令需额外付费
- **无始终在线进程**：无cron，无WebSocket长轮询，无永久运行的机器人
- **冷启动**：暂时未使用的功能首次请求会变慢
- **AI项目成本**：流式AI响应消耗带宽;大量流量可能使Pro账单每月达到200美元

**结论：** Vercel 是部署前端页面、文档和快速演示最流畅的体验。但对于始终在线的代理或长时间运行的 AI 通话——不要使用 Vercel。

## 1.2 Cloudflare 页面 — 无限带宽，全球高速

**网站：** https://pages.cloudflare.com

**最佳用途：** 静态网站、带宽密集项目、全球受众、边缘功能

**免费版：**
- **无限带宽**（最大卖点！）
- 每月500台组装
- 无限请求
- Cloudflare 工作人员：每天 100,000 次请求
- 全球300个边缘点，即使在中国也有一定速度

**如何使用：**
1. 注册免费的Cloudflare账户
2. 访问 Workers and Pages →创建→页面→连接到 Git
3. 选择你的仓库，设置构建命令（Vite： `npm run build`，输出指令： `dist`）
4. 点击保存并部署

**额外内容：Workers AI：** Cloudflare 还提供在边缘节点运行开源 AI 模型（Llama 3、Mistral、Stable Diffusion），每天免费获得 10,000 个神经元。非常适合运行小型模型而不依赖 OpenAI API。

**结论：** 静态网站，尤其是面向全球受众的项目，是最佳选择。无限带宽是个杀手级功能。

## 1.3 铁路 — 后端服务的最佳体验（始终在线）

**网站：** https://railway.app

**最佳用途：** 始终在线的后端服务、Node.js/Python/Go API、Discord/Telegram机器人、需要数据库的全栈项目

**如何使用：**
1. 注册 GitHub
2. 新项目 → 从 GitHub 仓库部署（或选择模板）
3. 铁路自动检测你的项目类型，安装 deps，建造并启动
4. 一键添加PostgreSQL/Redis/MySQL/MongoDB数据库
5. 自动生成域名，或绑定自定义域名

**价格：**
- 新用户可获得**$5试用积分**（非永久免费）
- 基于使用量的计费，起薪为每月5美元（最低标准常开服务数据库）
- 免费试用期间闲置5分钟后进入睡眠;付费后不休息

**结论：** Railway在部署后端API、机器人和需要数据库的全栈应用方面拥有最佳体验——可从GitHub自动部署，内置数据库、日志和监控功能均包含在内。

## 1.4 Fly.io — Truly 24/7 免费容器

**网站：** https://fly.io

**最佳用途：** 低延迟的全球分布式服务，想要一个**真正免费的24/7**容器，接受轻微的学习曲线

**免费版：**
- 3个微共享虚拟机（micro-1x，256MB RAM）
- **无运行时间限制**（不像Render那样睡眠）
- 每月160 GB出站流量
- 3 GB 持久卷
- 30 全球数据中心区域
- GPU 支持（A100/H100）

**如何使用：**
1. 注册需要信用卡（不收取费用，需身份验证）
2. 安装flyctl CLI
3. 在你的项目中写一个`fly.toml`配置（AI可以生成这个配置）
4. `fly launch` → 自动构建 Docker 映像，分配 IP，部署
5. `fly deploy` 以更新，`fly logs` 查看日志

**结论：** 如果你需要一个真正24小时免费的容器来做机器人/API/cron工作，Fly.io 是最好的免费选择。权衡是学习flyctl命令和Docker基础知识。

## 1.5 渲染 — 750小时免费但沉睡

**网站：** https://render.com

**最适合：** 学习阶段、个人项目、不介意冷启动的项目

**免费版：**
- Web服务：每月750小时（一个实例连续运行）
- PostgreSQL：免费90天（⚠️数据库结束后会被删除！）
- 静态站点：完全免费，100 GB 带宽

** ⚠️ 关键问题：**
- **15分钟不活动后睡眠**，冷启动需要10-30秒（用户体验很差）
- 免费数据库在90天后删除——记得备份！

**结论：** 适合开发/测试/学校项目，但不要把面向生产的用户项目放到免费套餐。付费从每月7美元起，用于禁用睡眠功能。

## 1.6 其他著名平台

|平台 |类型 |免费层级 |亮点 |
|----------|------|-----------|------------|
|**GitHub页面** |静态托管 |无限（100GB软限制）|最简单：推送到GitHub，它就会上线 |
|**拥抱面部空间** |AI应用 |免费CPU小实例 |专注于AI演示（Gradio/Streamlit） |
|**模态** |AI/无服务器GPU |每月30美元信用点 |Python 函数即服务，GPU 冷启动 <4s |
|**复制** |AI模型托管 |按呼叫付费 |将模型转化为无需基础设施管理的API|
|**Denoland 部署**Deno/Edge |每天免费请求10万 |Deno 官方平台，原生 TypeScript |
|**Netlify** |静态托管 |每月100GB带宽 |丰富的插件生态系统 |
|**Supabase** |BaaS |500MB 免费数据库 |开源 Firebase 替代方案，Postgres 认证存储 |
|**Neon** |无服务器Postgres |500MB免费 |无服务器分支数据库 |
|**Upstash** |无服务器Redis|每天免费1万条命令|基于请求的Redis无服务器版|

---

# 2.购买云VPS：AWS攻略

如果你需要对服务器环境的完全控制、运行定制服务，或者PaaS无法满足你的需求，那就该购买自己的云服务器了。本节介绍AWS（全球最广泛使用的云平台），并涵盖了DigitalOcean、Vultr和Hetzner等替代方案。

## 2.1 AWS 免费套餐 — 免费 12 个月

AWS为新用户提供了一个为期12个月的免费套餐，非常适合学习和个人项目。以下是包含的内容：

| 服务 | 免费套餐分配 |
|---------|----------------------|
| **EC2** | 每月750小时 t2.micro 或 t3.micro（一个实例全天运行） |
| **S3** | 5GB 标准存储 |
| **RDS** | 每月750小时 db.t2.micro/db.t3.micro，20GB 存储 |
| **Lambda** | 每月100万次请求，3.2百万秒计算 |
| **CloudFront** | 50GB 出流量，每月200万次请求 |
| **CloudWatch** | 10个自定义指标，1GB 日志摄取 |
| **DynamoDB** | 25GB 存储，250万读/写容量单位 |

**⚠️ 重要提示:** 免费套餐在注册后12个月到期，届时将按标准费率收费。务必设置账单提醒（账单仪表板 → 预算）以避免意外费用。删除未使用的资源！

### 如何创建 EC2 实例 (AWS VPS)：

1. **注册** https://aws.amazon.com/，使用邮箱和信用卡
2. 进入 **EC2 仪表板** → **启动实例**
3. **步骤1：选择 Amazon 机器镜像 (AMI)**
   - 选择 **Ubuntu Server 22.04 LTS (HVM), SSD 卷类型** (64位x86) — 这是最适合初学者的选项
4. **步骤2：选择实例类型**
   - 选择 **t2.micro**（免费套餐适用，1 vCPU，1GB RAM）
5. **步骤3：配置实例详情**
   - 保持默认设置（1个实例，默认 VPC）
6. **步骤4：添加存储**
   - 默认8GB gp2 根卷对于初学者足够
7. **步骤5：添加标签**（可选，用于组织）
8. **步骤6：配置安全组**（⚠️ 关键 — 这是你的防火墙）
   - 创建新的安全组
   - 添加规则：
     - 类型：**SSH**，端口：22，来源：**我的IP**（只有你的IP可以SSH）
     - 类型：**HTTP**，端口：80，来源：**任意位置 (0.0.0.0/0)**
     - 类型：**HTTPS**，端口：443，来源：**任意位置**
9. **步骤7：审查并启动**
10. **密钥对**：系统提示时，创建新的密钥对（例如 `my-aws-key.pem`），下载并妥善存储。**无法再次下载！**
11. 点击 **启动实例** → 等待2-5分钟启动完成

### 连接到你的 EC2 实例：

```bash
# On your local Mac/Linux terminal
chmod 400 my-aws-key.pem  # Set correct permissions (required!)
ssh -i my-aws-key.pem ubuntu@YOUR_PUBLIC_IP
# e.g. ssh -i my-aws-key.pem ubuntu@54.123.45.67

# On Windows use PuTTY (convert .pem to .ppk) or Windows Terminal with OpenSSH
```

**获取你的公共IP：** 前往EC2仪表盘→实例→选择你的实例→在详情中寻找“公共IPv4地址”。

## 2.2 DigitalOcean — 初学者的绝佳文档

**网站：** https://www.digitalocean.com

**价格：** Droplet起价为每月4美元（512MB内存，10GB SSD，500GB带宽）

**为什么选择DO：**他们的文档（称为“社区教程”）非常出色——几乎所有Linux/服务器问题都有写得很好的DO教程。他们的界面简洁且适合初学者。

**如何使用：**
1. 注册（信用卡或PayPal，PayPal最低存款2美元）
2. 点击“创建”→“滴子”
3. 选择Ubuntu 22.04，每月4美元的基础套餐，选择离用户近的数据中心（纽约、旧金山国际机场、伦敦、新加坡等）
4. 添加你的SSH公钥（推荐）或设置根密码
5. 点击“创建滴”—— 约1分钟后准备好
6. 通过：`ssh root@YOUR_DROPLET_IP` 连接

## 2.3 Vultr — 按小时计费，多个地点

**网站：** https://www.vultr.com

**价格：** 普通云计算起价为每月5美元（1个vCPU，1GB RAM，25GB SSD，1TB带宽）

**为什么选择Vultr：**按小时付费（你可以启动服务器10分钟测试，然后销毁并付钱），拥有30个全球地点，而且他们有经济实惠的GPU实例，以防以后需要。

## 2.4 赫茨纳——长期项目的最佳性价比

**网站：** https://www.hetzner.com/cloud

**价格：** CX11起价为每月3.49欧元（1个vCPU，2GB内存，20GB SSD，20TB流量！）

**为什么选择Hetzner：** 欧洲性价比最佳，网络极其稳定。非常适合长期生产项目。权衡是数据中心分布在德国、芬兰和美国（亚洲无据点）。

## 2.5 VPS 提供商快速比较

|供应商 |起始价格 |最佳优惠 |免费试用 |
|----------|---------------|----------|-----------|
|**AWS EC2** |免费套餐12个月，然后~每月10美元 |学习AWS，企业集成 |12个月免费套餐 |
|**数字海洋** |每月4美元 |初学者，优秀文档 |60天200美元积分（新用户） |
|**Vultr** |每月5美元（仅IPv6为2.50美元） |按小时测试，覆盖多个地区 |30天可获得100美元积分|
|**赫茨纳** |每月3.49欧元 |最划算的长期项目 |20欧元信用额度 |
|**Linode（Akamai）** |每月5美元 |成熟可靠 |60天100美元信用额度 |

---

# 3.服务器初始设置（Ubuntu 22.04）

一旦你SSH连接到服务器，第一步是更新系统并安装基础工具。你可以**把下面的提示复制给你的AI助手**，让它生成你需要的精确命令：

>“我刚刚搭建了一个新的Ubuntu 22.04服务器，想部署一个[Node.js/Python/...]项目。请给我完整的初始化命令，包括：系统更新，创建非root用户，配置SSH密钥认证，安装Node.js 20，安装Nginx，安装Docker，配置基础的UFW防火墙。”

典型的初始设置：

```bash
# 1. Update system and install basic tools
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl wget git vim ufw build-essential

# 2. Create a regular user (don't always use root!)
sudo adduser yourname
sudo usermod -aG sudo yourname

# 3. Install Node.js (use nvm, NOT apt)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.bashrc
nvm install 20
node -v  # verify

# 4. Install Nginx
sudo apt install -y nginx
sudo systemctl start nginx
sudo systemctl enable nginx
# Visit http://YOUR-IP in browser, should see Nginx welcome page

# 5. Install Docker (if using containers)
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker yourname  # run Docker without sudo
# Log out and back in for this to take effect
docker --version

# 6. Configure firewall
sudo ufw allow ssh
sudo ufw allow http
sudo ufw allow https
sudo ufw enable
sudo ufw status
```

## 3.1 配置安全组 / 防火墙（非常重要！）

在 AWS 上，这是通过 **安全组**（在 EC2 控制台中）完成的。在 DigitalOcean/Vultr 上，可以在它们的仪表板防火墙设置中完成。在 Ubuntu 上，你还需要 `ufw`。

**至少开放这些端口：**

| 端口 | 目的 | 建议 |
|------|---------|---------------|
| **22** | SSH | 必需；如果可能，限制为你的 IP |
| **80** | HTTP | 需要用于网站 |
| **443** | HTTPS | 需要用于安全网站 |
| **3000-3999** | Node.js 开发端口 | 临时开放用于调试，部署后关闭 |

> ⚠️ **初学者常犯错误 #1：** 应用程序运行了，但无法访问。90% 的情况是因为安全组/防火墙不允许该端口。

---

# 4. 三种典型部署场景

## 4.1 场景 1：部署静态前端（Vite/React/Vue）

完成 `npm run build` 后，你会得到一个 `dist/` 文件夹，里面全是 HTML/CSS/JS 文件。

**将代码上传到服务器：**

```bash
# Option A: rsync from local machine
rsync -avz --exclude=node_modules ./dist/ yourname@YOUR-IP:/var/www/myapp/

# Option B: git clone on server (recommended, easier updates)
cd /var/www
sudo git clone https://github.com/YOUR_USER/YOUR_REPO.git myapp
cd myapp
npm install
npm run build
```

**配置 Nginx：**

```bash
sudo vim /etc/nginx/sites-available/myapp
```

```nginx
server {
    listen 80;
    server_name YOUR-IP-OR-DOMAIN;

    root /var/www/myapp/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;  # SPA routing fallback
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff2?)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

启用该网站：

```bash
sudo ln -s /etc/nginx/sites-available/myapp /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

## 4.2 场景 2：部署 Node.js 后端（Express/Fastify/NestJS）

使用 **PM2** 来保持应用在后台运行：

```bash
npm install -g pm2
cd /path/to/your/app
npm install
npm run build  # if TypeScript
pm2 start dist/main.js --name "myapp"
pm2 startup && pm2 save  # auto-start on boot
pm2 logs myapp  # view logs
```

**Nginx 反向代理：**

```nginx
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## 4.3 场景 3：Docker Compose 全栈部署

```yaml
# docker-compose.yml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:pass@db:5432/myapp
    depends_on: [db, redis]
    restart: always

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: myapp
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: always

  redis:
    image: redis:7-alpine
    restart: always

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/conf.d/default.conf
      - ./frontend/dist:/usr/share/nginx/html
    depends_on: [app]
    restart: always

volumes:
  postgres_data:
```

与 `docker compose up -d` 一起运行

---

# 5. 域名与 HTTPS

## 5.1 购买域名并设置 DNS

通过 Namecheap、Cloudflare Registrar、GoDaddy 或 AWS Route 53 注册域名。在您的域名 DNS 设置中，添加 **A 记录**：

| 类型 | 主机 | 值 |
|------|------|-------|
| A | @ | 您的服务器 IP |
| A | www | 您的服务器 IP |
| A | api | 您的服务器 IP（用于后端） |

## 5.2 使用 Let's Encrypt 一键启用 HTTPS

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com -d api.yourdomain.com
# Choose option 2 (Redirect) to auto-redirect HTTP to HTTPS
sudo certbot renew --dry-run  # test auto-renewal
```

---

# 6. 云服务提供商服务深入解析（超越 VPS）

当你登录 AWS 控制台（或任何云平台仪表盘）时，你会看到几十个带有神秘名称的服务（EC2、S3、RDS、ELB、VPC……）。本节解释最常见的服务，以及在何时使用它们，**以 AWS 为主要示例**（这些概念可以直接映射到其他云平台）。

## 6.1 云架构概览

运行在云上的典型 Web 应用程序如下所示：

```
User → CloudFront (CDN) → ALB (Load Balancer) → EC2 (Your App Server)
                              │                     │
                              │                     ├── S3 (images/files)
                              │                     ├── RDS (database)
                              │                     └── ElastiCache (Redis)
                              │
                              └── ECS/EKS (containers, advanced)
                              
         └── Route 53 (DNS) → maps your domain to CloudFront/ALB
             + ACM (SSL certs) → HTTPS encryption
```

我们来逐一介绍每个礼拜。

## 6.2 计算：你的代码运行之地

### EC2（弹性计算云）——VPS

这就是我们一直在用的“云服务器”。这是一个虚拟机，你可以SSH登录，安装任何东西，并随意配置。

- **阿里云：** ECS
- **腾讯云：** CVM / 灯塔
- **DigitalOcean：** Droplet
- **Hetzner：** 云服务器

**何时使用：** 当你需要完全控制、定制软件、始终在线的流程时。

### Lambda — 无服务器函数

上传代码片段，无需管理服务器。按调用和执行时间付费。仅在触发时运行。

- **阿里巴巴云：** 函数计算
- **腾讯云：** SCF（无服务器云功能）
- **GCP：** 云函数

**何时使用：**偶尔任务（webhook处理、图像处理、调度作业）、流量尖峰的API。**不适用于**像WebSocket机器人这样的始终在线进程。

### ECS/EKS — 容器编排

如果你的项目使用 Docker 并扩展到多个容器/服务，建议使用 Kubernetes 进行编排。

- **AWS ECS：** 亚马逊更简单的容器服务
- **AWS EKS：** 托管Kubernetes（托管Kubernetes）
- **阿里云：** ACK
- **腾讯云：** TKE
- **Google Cloud：** GKE

**何时使用：** 多服务微服务架构、自动扩展、团队项目。大多数个人项目不需要这些——VPS Docker Compose就足够了。

## 6.3 存储：文件和数据的所在

### S3（简单存储服务）⭐最常用

**这是服务器之外最常见的服务**，用于存储图片、视频、PDF、静态网站资源、备份等。**切勿将用户上传的文件存储在服务器本地磁盘！** 如果你重建、迁移或调整服务器大小，这些文件将会丢失。

- **阿里云：** OSS（对象存储服务）
- **腾讯云：** COS（云对象存储）
- **谷歌云：** GCS（谷歌云存储）
- **替代方案：** Cloudflare R2（零出口费——超划算！）

**免费套餐：** AWS S3在免费套餐下提供5GB标准存储，持续12个月。阿里巴巴云OSS为新用户提供5GB存储，持续6个月。Cloudflare R2提供永久免费套餐，包含10GB存储。

**你能用S3做什么：**
- 存储用户上传（头像、图片、附件、产品照片）
- 托管静态网站（上传您的 `dist/` 文件夹，启用“静态网站托管”）
- 备份数据库导出
- 与CloudFront CDN配合，实现快速全球下载
- 生成预签名的URL，用于分享私有文件

**如何使用S3（AWS控制台攻略）:**

1. 前往**S3仪表盘** → **创建桶**
2. 输入一个**全球唯一**的桶名（例如 `myapp-images`）
3. 选择AWS区域（例如美国东部用us-east-1）
4. **对象所有权：** 选择“启用ACL”→“优先使用桶所有者”（更简单，方便公开访问）
5. **取消勾选** “屏蔽所有公共访问”，如果你想要公共图片（请阅读警告，仅取消勾选公共内容）
6. 保持其他设置为默认→点击**创建桶**
7. 点击你的桶→ **上传** → 选择文件
8. 上传后，每个文件都会获得类似 `https://myapp-images.s3.us-east-1.amazonaws.com/avatar.jpg` 这样的网址
9. 在前端直接使用该URL`<img src="...">`

**使用 S3 配合代码（Node.js例子，让 AI 编写完整逻辑）:**

```javascript
// npm install @aws-sdk/client-s3 @aws-sdk/lib-storage
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({ region: "us-east-1" });

async function uploadFile(buffer, filename, contentType) {
  await s3.send(new PutObjectCommand({
    Bucket: "myapp-images",
    Key: filename,
    Body: buffer,
    ContentType: contentType,
    ACL: "public-read" // make file publicly accessible
  }));
  return `https://myapp-images.s3.us-east-1.amazonaws.com/${filename}`;
}
```

> ⚠️ **关键安全提示：** AWS 访问密钥就像你的 S3 密码。**切勿硬编码前端代码或提交到 Git ！** 将它们存储在环境变量中或使用 IAM 角色。如果密钥泄露，立即在 IAM 控制台禁用。

### EBS（弹性块存储器）——虚拟硬盘

连接到EC2实例的块存储卷（比如你电脑的硬盘）。EC2实例自带根卷（通常8-60GB）;需要更多空间时可以额外购买额外的EBS卷。

- **阿里云：** 云盘（ESSD/SSD）
- **腾讯云：** CBS（云块存储）

**何时使用：** 为服务器提供额外的磁盘空间，需要独立于EC2实例生命周期持续存在的数据。

### EFS（弹性文件系统）——共享文件存储

一个可以同时挂载多个EC2实例的网络文件系统。适合在多个Web服务器上共享上传文件。

- **阿里巴巴云：** NAS
- **腾讯云：** CFS

大多数小型项目不需要这些——一台服务器 S3 就足够了。

## 6.4 数据库：结构化数据存储

### RDS（关系数据库服务）⭐通用

**不要在同一个VPS上运行生产数据库！**虽然技术上可行（我们在之前的Docker Compose示例中做过），生产环境使用托管数据库：自动化备份、高可用性、监控和一键扩展。

- **阿里云：** RDS
- **腾讯云：** TDSQL-C / CDB
- **Google Cloud：** 云 SQL

**支持的引擎：** MySQL、PostgreSQL、MariaDB、SQL Server、Oracle 和 Amazon Aurora（兼容 MySQL/PostgreSQL，云优化）。

**免费套餐：** AWS RDS每月提供750小时的db.t2.micro或db.t3.micro 20GB存储，持续12个月。

**如何设置RDS（AWS）:**

1. 访问 **RDS** → **创建数据库**
2. 选择**标准创建**→引擎：**MySQL 8.0** 或 PostgreSQL
3. 模板：**免费套餐**（保持免费分配范围内）
4. 设置数据库实例标识符、主用户名、主密码
5. 实例配置：**db.t3.micro**（免费套餐）
6. 存储容量：20GB GP2（免费套餐资格）
7. 连接性：选择与你的EC2实例相同的VPC。
8. **公共访问：** 否（仅允许从VPC内部访问）
9. VPC 安全组：创建新建或选择允许 EC2 安全组端口 5432/3306 的现有端口
10. 点击**创建数据库**→等待~5-10分钟
11. 一旦可用，获取**端点**（看起来是`mydb.xxxxx.us-east-1.rds.amazonaws.com:3306`）
12. 更新你应用的`DATABASE_URL`指向该端点，并将你的EC2安全组添加到RDS安全组的入站规则中

> 💡 **vibecoding 技巧：** 告诉人工智能“我在[端点]有一个AWS RDS PostgreSQL实例，用户名是[用户名]，帮我写连接代码和迁移脚本，为[我的项目]写。”

### ElastiCache — 托管版 Redis/Memcached

用于热数据的内存缓存（减少数据库查询）、会话/令牌存储、消息队列、排行榜等。

- **阿里云：** ApsaraDB for Redis
- **腾讯云：** 腾讯数据库用于Redis
- **替代方案：** Upstash（无服务器Redis，免费套餐）

对于小型项目，你可以在VPS上运行`sudo apt install redis-server`;使用托管的Redis进行生产/高可用性。

## 6.5 网络：更快、更安全的访问

### CloudFront — CDN（内容分发网络）⭐通用

将你的静态资产（图片、CSS、JS、视频）缓存到全球的边缘节点，让用户能从最近的节点获取内容。

- **阿里云：** CDN / DCDN
- **腾讯云：** 加拿大元/EdgeOne
- **Google Cloud：** 云CDN
- **免费替代方案：** Cloudflare CDN（免费套餐含无限带宽）

**何时使用：**
- 包含图片/视频/大文件的网站
- 分布在不同地区的用户
- 降低你起始服务器的带宽成本
- Cloudflare 页面本质上 = CDN 静态托管

**如何配置CloudFront：**
1. CloudFront 控制台 → **Create distribution**
2. 起源域：选择你的S3桶或EC2 ALB
3. 默认缓存行为：将 HTTP 重定向到 HTTPS
4. 创建分发版→等待~5-15分钟部署
5. 通过CNAME记录将你域名的DNS指向CloudFront分发域名（例如`dxxx.cloudfront.net`）

### ELB（弹性负载平衡）

将入站流量分散到多个EC2实例，自动移除不健康的实例。

- **ALB（应用负载均衡器）:** 第7层（HTTP/HTTPS），基于路径的路由，最常见于网页应用
- **NLB（网络负载均衡器）:** 第4层（TCP/UDP），超低延迟
- **GLB（网关负载均衡器）:** 用于网络虚拟设备
- **阿里云：** SLB / ALB
- **腾讯云：** CLB

单服务器项目不需要这个功能。扩展到多个后端服务器时可以用它。

### 53号线 — DNS服务

将域名转换为IP地址。大多数域名注册商都包含免费DNS，但Route 53与AWS深度集成。

- **阿里云：** 阿里巴巴云DNS
- **腾讯云：** DNSPod
- **免费替代方案：** Cloudflare DNS（全球最快之一，完全免费）

**常见的DNS记录类型：**

|类型 |目的 |示例 |
|------|---------|---------|
|**A** |域名→ IPv4 地址 |`@ → 54.123.45.67` |
|**AAAA** |域名→ IPv6 地址 |`@ → 2600:xxxx::` |
|**CNAME** |域名→另一个域名（用于CDN）|`static → dxxx.cloudfront.net` |
|**MX** |邮件服务器（用于商务邮箱）|- |
|**TXT** |任意文本（域名验证，SPF/DKIM） |- |

### ACM（AWS 证书管理器）— 免费 SSL 证书

AWS提供免费的SSL/TLS证书，使用CloudFront或ALB时会自动续期。只需申请证书，通过DNS或邮件验证，然后附加到你的分发/负载均衡器上即可。

- **阿里云：** 免费SSL证书
- **腾讯云：** 免费SSL证书
- **通用免费选项：** Certbot Let's Encrypt（我们在第5节展示的方法，90天自动续费）

### VPC（虚拟专用云）

在AWS上建立一个隔离的虚拟网络，你的EC2、RDS和其他资源都在那里。新账户会有一个默认的VPC。高级使用（公私子网分离、NAT网关）需要更深入的研究。

## 6.6 其他公共服务

### 域名注册

- **Global：** Namecheap，Cloudflare 注册商（免费 WHOIS 隐私），GoDaddy
- **AWS：** 53路（也负责注册）
- **中国：** 阿里云万旺，腾讯云DNSPod（ICP提交必需）

### SES（简单电子邮件服务）——发送电子邮件

不要自己运行邮件服务器（你很可能会收到垃圾邮件）。使用专业的邮件服务。

- **AWS SES**，发送网格，邮件枪，重发送
- **中国：** 阿里云直邮，腾讯SES
- 用途：验证邮件、通知、营销邮件

### SNS（简易通知服务）— 短信/推送通知

短信方面，移动推送通知。Twilio是全球流行的短信替代方案。

### CloudWatch — 监控与日志

监控EC2的CPU/内存/磁盘，查看应用日志，设置警报（CPU高，服务中断）。

- **阿里巴巴云：** 云监控SLS（日志服务）
- **腾讯云：** 云监控 CLS
- **初学者替代方案：** PM2内置监控Uptime Kuma（开源，运行一个Docker容器）

### 第三季高级版：图像处理 / Lambda触发器

S3 可以在上传文件时自动触发 Lambda 功能。例如，当用户上传大照片时，Lambda 功能可以自动将其缩小成缩略图。在中国，阿里巴巴开源系统内置图像处理（在 URL 上添加 `?x-oss-process=image/resize,w_300`），腾讯 COS 也有类似功能。

## 6.7 云服务映射：AWS ↔ 中国云↔替代方案

查找等效服务的快速参考：

|分类 |AWS |阿里云 |腾讯云 |免费/预算替代方案 |
|----------|-----|--------------|---------------|------------------------|
|云服务器 |EC2 |ECS |CVM / 灯塔 |DigitalOcean / Vultr / Hetzner |
|对象存储 |S3 |开源系统 |COS |Cloudflare R2（零退出） |
|关系数据库 |RDS |RDS |TDSQL-C/CDB |Supabase / Neon |
|Redis 缓存 |ElastiCache |ApsaraDB Redis |TencentDB Redis |Upstash |
|CDN |CloudFront |CDN/DCDN |CDN/EdgeOne |Cloudflare CDN（免费） |
|负载均衡器 |ALB/NLB |SLB/ALB |CLB |Nginx 自托管 / Caddy |
|无服务器 |Lambda |函数计算 |SCF |Cloudflare Workers |
|集装箱/K8 |ECS/EKS |ACK |TKE |Fly.io / 铁路 |
|DNS |53号公路 |阿里巴巴云 DNS |DNSPod |Cloudflare DNS（免费） |
|SSL证书 |ACM（免费） |免费证书 |免费证书 |让我们加密（免费） |
|电子邮件 |SES |直邮 |SES |Resend / SendGrid 免费套餐 |
|短信 |短信 |短信 |短信 |特威利奥 |
|监控 |CloudWatch |云监控 |Cloud Monitor |Uptime Kuma（自架） |
|AI/ML API |Bedrock |通义千文/百联 |魂源/TI |OpenAI / 人类 API |
|域名注册 |53号公路 |万旺 |DNSPod |Namecheap / Cloudflare |

## 6.8 常见初学者问题

**问：我应该使用云托管服务，还是所有内容都自托管在VPS上？

- **个人项目/学习：** VPS自主机（Docker Compose everthing）——更便宜，学得更多。
- **真实用户生产环境：** 使用托管服务进行数据库和对象存储（自动备份、稳定性），应用可以保持在 VPS 上。
- **资金充足/团队项目：** 尽可能多使用云托管服务——把时间花在业务逻辑上，而不是运维上。

**问：我怎样才能使用AWS免费套餐而不被收费？**

1. 始终启动**t2.micro/t3.micro**实例（标记为“免费套餐合格”）
2. 设置**计费警报**，金额为0美元或1美元（计费仪表盘→预算→创建预算）
3. **完成后终止/删除**资源：EC2实例、RDS数据库、S3桶、EBS卷、弹性IP
4. 注意，EBS卷和弹性IP**即使实例停止，如果未删除，仍会继续充电**
5. 每月查看账单仪表盘

**问：AWS与其他VPS提供商相比如何？

- 学习AWS生态系统/准备云工作 →使用AWS免费套餐
- 快速部署，项目简单，成本最低→DigitalOcean（每月4美元）或Hetzner（每月3.49欧元）
- 按小时测试→Vultr（按小时计费，随时销毁）
- Modal 或 Lambda Labs → AI/GPU 工作负载
- 完全免费，24小时容器→ Fly.io 免费套餐

---

# 7.AI代理专用部署平台

如果你部署的是AI代理（不仅仅是普通的网页应用），有一些专门为AI工作负载设计的平台：

## 7.1 Modal — 用于 Python AI/ML 的无服务器 GPU

**网站：** https://modal.com

**适合于：** 需要 GPU 推理的 Python AI 项目、定时任务、批量数据处理

**特点：**
- 使用 Python 装饰器定义函数，`modal deploy` 实现一键部署
- GPU 容器冷启动约 1 秒，按毫秒计费
- 内置调度、机密管理、共享存储
- 免费计划包含每月 30 美元的额度（足够大多数个人项目使用）
- 仅支持 Python

```python
import modal
app = modal.App("my-ai-agent")

@app.function(gpu="A10G", timeout=300)
def run_agent(prompt: str):
    # Run your AI model/agent here
    return result
```

## 7.2 Hugging Face Spaces — AI 演示的首选

**网站:** https://huggingface.co/spaces

**最适合:** 快速展示 AI 演示（Gradio/Streamlit 界面）、开源模型展示

**特点:**
- 免费小型 CPU 实例；GPU 需付费
- 支持 Gradio、Streamlit、Docker
- 社区活跃；每个 Space 都有公开代码和讨论
- 一键 fork 他人的 Space 进行修改

## 7.3 Replicate — 将模型变成 API

**网站:** https://replicate.com

**最适合:** 将 AI 模型变成可调用的 HTTP API，而无需管理服务器

上传你的模型，Replicate 会将其封装成 HTTP API，并按调用次数收费。非常适合发布微调模型。

## 7.4 Lambda Labs — 按需 GPU 实例

**网站:** https://lambdalabs.com

**最适合:** GPU 密集型训练和推理，成本低于 AWS/GCP GPU 实例。按需提供 A100、H100、A10。

---

# 8. 🎯 Vibecoding 部署工作流程：让 AI 成为你的 DevOps

这是 vibecoding 时代部署中最重要的心态：**你不需要记住每一个命令——AI 是你的 DevOps 助手。**

## 8.1 两种 AI 协作模式

**模式 1：本地生成脚本，手动执行**

告诉你的 AI 编码助手（Claude Code, Trae Solo, Cursor）：

> "我想将 [项目描述] 部署到 [平台/服务器]。生成：
> 1. 完整的逐步部署清单
> 2. 所需的所有配置文件（Nginx、PM2、Dockerfile、docker-compose）
> 3. 一个 deploy.sh 部署脚本
> 4. 环境变量清单"

然后只需执行 AI 生成的内容。

**模式 2：AI 直接通过 SSH 连接到你的服务器（更简单）**

Claude Code 支持远程 SSH 操作：

```bash
claude
# Tell it:
# "SSH into root@MY-IP and deploy /root/myapp, configure Nginx + HTTPS + PM2"
```

AI 将自动检查环境、安装缺失的依赖项、拉取代码、构建、配置并验证——所有操作无需你手动输入命令。

> ⚠️ **安全提醒：**
> - 首先在测试服务器上练习，确保 AI 不会进行破坏性更改
> - 定期备份重要数据
> - 给 AI 最小权限用户（不要给 root；sudo 用户可以，但要注意命令）
> - 在 AI 执行危险命令之前，先查看它将要做的操作

## 8.2 通用部署提示模板

无论你选择哪个平台/服务器，填写此模板并发送给 AI，即可获得完整的可操作计划：

```
Help me deploy a project with the following info:

[DEPLOYMENT TARGET]
- Platform/Server: [Vercel / Railway / Fly.io / Ubuntu 22.04 VPS / AWS EC2 / ...]
- Server IP (if VPS): xxx.xxx.xxx.xxx
- Already configured: [SSH key login / Docker installed / Nginx installed / ...]

[PROJECT INFO]
- Project type: [Next.js 14 / Vite+React / Node.js Express / Python FastAPI / ...]
- Code location: GitHub repo https://github.com/xxx/xxx
- Tech stack: Node.js 20 + PostgreSQL 16 + Redis 7
- Start command: npm run start
- Listens on port: 3000
- Environment variables: DATABASE_URL=xxx, JWT_SECRET=xxx, OPENAI_API_KEY=xxx

[DOMAIN]
- Domain: mydomain.com
- DNS already pointing to server: Yes/No
- Need HTTPS: Yes/No

[REQUIREMENTS]
1. Complete steps (list local vs server operations separately)
2. Provide all config files
3. Tell me how to verify successful deployment
4. List common gotchas and troubleshooting steps
```

## 8.3 AI辅助故障排除工作流程

当出现故障时：

1. **首先检查日志：**
   - Nginx: `sudo tail -50 /var/log/nginx/error.log`
   - PM2: `pm2 logs myapp`
   - Docker: `docker compose logs app`
   - systemd: `sudo journalctl -u myapp -n 50`

2. **将完整错误信息连同上下文提供给 AI**：
   > “将 Node.js 部署到 Ubuntu，得到 502 Bad Gateway。Nginx 错误日志：[粘贴]。配置：[粘贴]。PM2 状态：[粘贴]。帮我调试。”

3. **常见问题速查：**
   - **502 Bad Gateway：** 后端未运行、端口错误、proxy_pass 配置错误
   - **无法访问 IP：** 安全组未允许端口、ufw 阻挡、Nginx 未启动
   - **刷新返回 404：** Nginx 缺少用于 SPA 路由的 `try_files`
   - **静态资源 404：** 根路径错误、文件权限问题
   - **HTTPS 证书失败：** 域名未指向服务器、端口 80 被阻挡
   - **PM2 不停重启：** 代码错误导致崩溃，检查 `pm2 logs`
   - **Vercel 函数超时：** 超过 10 秒限制 — 对于长时间任务切换到 Fly.io/Railway/VPS
   - **Railway/Render 503：** 服务休眠或信用额度耗尽
   - **AWS EC2 连接被拒绝：** 安全组缺少 SSH 规则或端口错误

---

# 9. 部署后小贴士

## 9.1 文件传输

```bash
# Local → Server
scp ./file.zip yourname@IP:/home/yourname/
scp -r ./dir yourname@IP:/home/yourname/

# Server → Local
scp yourname@IP:/home/yourname/file.zip ./

# rsync (incremental sync, recommended for deployment)
rsync -avz --exclude=node_modules --exclude=.git ./project/ yourname@IP:/var/www/project/
```

## 9.2 一键更新脚本

在你的服务器上创建 `deploy.sh`:

```bash
#!/bin/bash
set -e
cd /path/to/project
git pull origin main
npm install
npm run build
pm2 restart myapp
echo "✅ Deployment complete!"
```

更新只是 `bash deploy.sh`。要实现完全自动化，请设置 GitHub Actions（让 AI 编写 持续集成 / 持续部署 配置），这样代码推送到主分支即可自动部署。

## 9.3 安全加固清单

让 AI 生成完整的加固脚本，通常包括：
- 禁用密码登录，仅使用 SSH 密钥
- 更改默认 SSH 端口（22 → 其他端口）
- 安装 fail2ban（自动封禁暴力攻击 IP）
- 启用自动安全更新：`sudo apt install unattended-upgrades`
- 永远不要将 secrets/.env 提交到 Git
- 定期将数据库备份到 S3

---

# 10. 章节总结

**部署选项总结：**

| 场景 | 推荐 | 费用 | 难度 |
|----------|------------|------|-----------|
| 纯前端/文档 | Cloudflare Pages / Vercel / GitHub Pages | 免费 | ⭐ |
| Next.js 全栈（快速响应） | Vercel | 免费 / $20/月 | ⭐ |
| 后端 API / Bot（持续运行） | Railway / Fly.io（免费）/ VPS | $0-10/月 | ⭐⭐ |
| 全栈（完全控制） | DigitalOcean / Vultr / AWS EC2 Docker | $4-10/月 | ⭐⭐⭐ |
| AI 代理演示 | Hugging Face Spaces | 免费 | ⭐ |
| AI GPU 推理 | Modal（全球） | $0-30/月 额度 | ⭐⭐ |
| 有用户的生产环境 | AWS/Azure/GCP 托管服务 | 费用各异 | ⭐⭐⭐ |

**记住 5 个核心步骤：**
1. **选择平台** → 根据项目类型（参考上表）
2. **将代码上传到平台** → git push / rsync / GitHub 自动部署
3. **设置环境** → 安装 Node.js/Nginx/Docker（或由平台处理）
4. **保持运行** → PM2 / Docker / systemd
5. **域名与 HTTPS** → 配置 DNS 记录   Certbot / ACM

**Vibecoding 心态：**
1. 了解 *需要做什么*，而不是每条命令
2. 清晰描述需求给 AI —— 它会给完整解决方案
3. 了解 AI 在做什么，确认关键步骤
4. 出现错误时，将日志粘贴给 AI —— 它能诊断 90% 的问题
5. 备份重要数据，使用最小权限

部署一次，你就会明白 —— 上线其实并不难。🎯

---

<RelatedArticlesSection
  :articles="relatedArticlesMap['en/stage-2/backend/cloud-server-deployment']"
  title="相关文章"
  description="继续学习与部署相关的工程技能。"
/>