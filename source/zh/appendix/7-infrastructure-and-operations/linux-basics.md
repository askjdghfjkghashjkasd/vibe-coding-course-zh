# Linux 基础

::: tip 前言
**在服务器世界中，Linux 是无可争议的明星。** 全球超过 90% 的服务器运行 Linux —— 从微信到谷歌搜索，Linux 在后台驱动这一切。对于开发者而言，掌握 Linux 基础不是可选的，而是必修的。
:::

**你将从本文学到什么？**

完成本章后，你将获得：

- **文件系统**：了解 Linux 的目录结构及“万物皆文件”的理念
- **常用命令**：掌握文件操作、文本处理和进程管理的核心命令
- **权限模型**：了解用户、用户组和权限
- **Shell 基础**：学习管道、重定向、环境变量及其他核心 Shell 概念
- **实用技能**：学习日志检查、进程排错、网络诊断等运维基础

| 章节 | 内容 | 核心概念 |
|------|------|-----------|
| **第 1 章** | 文件系统 | 目录结构，万物皆文件 |
| **第 2 章** | 常用命令 | 文件、文本、进程、网络 |
| **第 3 章** | 权限模型 | 用户、用户组、rwx、sudo |
| **第 4 章** | Shell 基础 | 管道、重定向、变量、脚本 |
| **第 5 章** | 实战场景 | 日志排错、性能诊断 |

---

## 1. 文件系统：万物皆文件

Linux 最基本的哲学之一是 **万物皆文件**。普通文件是文件，目录是文件，硬盘是文件，甚至网络连接和进程信息也是文件。这种统一的抽象让你可以使用同一套工具（读、写、权限控制）来操作几乎所有系统资源。

<LinuxFileSystemDemo />

### 目录结构速查表

可以把 Linux 文件系统看作一棵倒置的树：

```
/                    ← Root directory (tree root)
├── home/            ← Users' home (your files live here)
├── etc/             ← Configuration files (the system's "settings panel")
├── var/             ← Variable data (logs, cache)
├── usr/             ← User-installed programs
├── tmp/             ← Temporary files (gone after reboot)
├── proc/            ← Process info (virtual, no disk usage)
├── dev/             ← Device files (hard drives, terminals)
├── bin/             ← Basic commands (ls, cp, mv)
├── sbin/            ← System admin commands (requires root)
├── opt/             ← Third-party software
└── root/            ← root user's home directory
```

### 两种路径类型

| 类型 | 格式 | 示例 | 描述 |
|------|--------|---------|-------------|
| 绝对路径 | 从 `/` 开始 | `/home/alice/code/app.js` | 从根目录开始，明确无歧义 |
| 相对路径 | 从当前目录开始 | `./code/app.js` 或 `../config` | `.` 是当前目录，`..` 是上级目录 |

::: tip “一切皆文件”的力量
想查看 CPU 信息？读取一个文件：`cat /proc/cpuinfo`
想查看内存使用情况？读取一个文件：`cat /proc/meminfo`
想生成随机数？读取一个文件：`cat /dev/urandom`
想丢弃输出？写入一个文件：`echo "no thanks" > /dev/null`

无需特殊 API —— 仅需读写文件。这就是 Unix 哲学的优雅之处。
:::

---

## 2. 常用命令

Linux 命令遵循一致的格式：`command [options] [arguments]`。例如，在 `ls -la /home` 中，`ls` 是命令，`-la` 是选项，`/home` 是参数。

<LinuxCommandDemo />

### 十大最常用命令

如果你只能记住 10 个命令，请记住这些：

| 命令 | 用途 | 记忆提示 |
|---------|---------|------------|
| `ls` | 列出文件 | list |
| `cd` | 切换目录 | change directory |
| `cat` | 查看文件内容 | concatenate |
| `grep` | 搜索文本 | global regular expression print |
| `find` | 查找文件 | just "find" |
| `ps` | 查看进程 | process status |
| `tail -f` | 实时查看日志 | 查看文件“tail”，-f 表示跟随 |
| `chmod` | 修改权限 | change mode |
| `curl` | 发送 HTTP 请求 | client URL |
| `ssh` | 远程登录 | secure shell |

### 命令组合的艺术

Linux 的强大不在于单个命令，而在于 **命令组合**。通过使用管道 `|` 连接多个简单命令，你可以解决复杂问题：

```bash
# Find the top 5 processes by CPU usage
ps aux --sort=-%cpu | head -6

# Count the most frequent error types in logs
grep "ERROR" app.log | awk '{print $4}' | sort | uniq -c | sort -rn | head -10

# Find files larger than 100MB
find / -size +100M -type f 2>/dev/null

# Monitor errors in logs in real-time
tail -f /var/log/app.log | grep --color "ERROR"
```

::: 提示 Unix 哲学
“只做一件事，并且做好它。” 每个命令只处理一个功能；复杂操作通过管道组合来实现。这就是为什么 Linux 命令如此简洁——它们是构建模块，而不是瑞士军刀。
:::

---

## 3. 权限模型

Linux 是一个多用户系统，权限模型是安全性的基础。每个文件都有三组权限，控制 **所有者**、**用户组** 和 **其他人** 可以做什么。

### 阅读 `ls -l` 输出

```bash
$ ls -l app.js
-rwxr-xr-- 1 alice developers 2048 Jan 15 10:30 app.js
│├──┤├──┤├──┤   │     │          │
│ │   │   │     │     │          └── File size
│ │   │   │     │     └── Group
│ │   │   │     └── Owner
│ │   │   └── Others permission: r-- (read-only)
│ │   └── Group permission: r-x (read + execute)
│ └── Owner permission: rwx (read + write + execute)
└── File type: - regular file, d directory, l link
```

### 三种权限操作

| 权限 | 字母 | 数字 | 文件含义 | 目录含义 |
|------|------|------|-----------|-----------|
| 读 | `r` | 4 | 查看文件内容 | 列出目录内容 (ls) |
| 写 | `w` | 2 | 修改文件内容 | 在目录中创建/删除文件 |
| 执行 | `x` | 1 | 运行程序/脚本 | 进入目录 (cd) |

<LinuxPermissionsDemo />

### 数字权限快速计算

三个数字分别表示所有者、用户组和其他人的权限。每个数字是 r(4) + w(2) + x(1) 的总和：

```
chmod 755 script.sh
  7 = rwx (4+2+1)  → Owner: read + write + execute
  5 = r-x (4+0+1)  → Group: read + execute
  5 = r-x (4+0+1)  → Others: read + execute
```

| 常见权限 | 含义 | 典型用途 |
|-------------------|---------|-------------|
| `644` | rw-r--r-- | 普通文件（所有者可写，其他人只读） |
| `755` | rwxr-xr-x | 可执行文件 / 目录 |
| `600` | rw------- | 私密文件（如 SSH 密钥） |
| `777` | rwxrwxrwx | 所有人可读、写、执行（危险，避免使用） |

### sudo：临时获取超级用户权限

普通用户的权限有限。有些操作需要 root 权限。`sudo` 允许你临时以 root 身份执行命令：

```bash
# Regular user cannot modify system configuration
$ vim /etc/nginx/nginx.conf
# Permission denied

# Use sudo to temporarily elevate privileges
$ sudo vim /etc/nginx/nginx.conf
# Enter your password, then you can edit

# Switch to root user (use with caution)
$ sudo su -
```

::: 警告 最小权限原则
切勿使用 `chmod 777` 来解决权限问题——那就像是拆掉门锁。正确的方法是弄清楚谁需要哪些权限，并精确授予。类似地，不要长期以 root 身份操作；仅在必要时使用 `sudo`。
:::

---

## 4. Shell 基础

Shell 是你与 Linux 内核之间的“翻译器”。你输入命令，Shell 解释并传递给内核执行。最常见的 Shell 是 **Bash**（大多数 Linux 发行版的默认）和 **Zsh**（macOS 的默认）。

### 管道与重定向

这是 Shell 中两个最强大的功能：

| 符号 | 名称 | 功能 | 示例 |
|--------|------|----------|---------|
| `|` | 管道 | 将一个命令的输出作为另一个命令的输入 | `cat log \| grep ERROR` |
| `>` | 输出重定向 | 将输出写入文件（覆盖） | `echo "hello" > file.txt` |
| `>>` | 追加重定向 | 将输出追加到文件末尾 | `echo "world" >> file.txt` |
| `<` | 输入重定向 | 从文件读取输入 | `wc -l < file.txt` |
| `2>` | 错误重定向 | 将错误写入文件 | `cmd 2> error.log` |
| `2>&1` | 合并输出 | 将错误与标准输出合并 | `cmd > all.log 2>&1` |

### 环境变量

环境变量是 Shell 中的“全局配置”，会影响命令行为：

```bash
# View all environment variables
env

# View a specific variable
echo $PATH
echo $HOME

# Set temporarily (only in current Shell)
export API_KEY="abc123"

# Set permanently (write to config file)
echo 'export API_KEY="abc123"' >> ~/.bashrc
source ~/.bashrc   # Apply config immediately
```

| 常用变量 | 含义 | 示例值 |
|-----------------|---------|---------------|
| `$PATH` | 命令搜索路径 | `/usr/local/bin:/usr/bin:/bin` |
| `$HOME` | 用户主目录 | `/home/alice` |
| `$USER` | 当前用户名 | `alice` |
| `$PWD` | 当前工作目录 | `/var/log` |
| `$SHELL` | 当前 shell | `/bin/bash` |

### Shell 脚本入门

将多个命令写入文件会创建一个 Shell 脚本。这是自动化操作的起点：

```bash
#!/bin/bash
# deploy.sh - Simple deployment script

APP_DIR="/opt/myapp"
LOG_FILE="/var/log/deploy.log"

echo "$(date) - Starting deployment..." >> $LOG_FILE

# Pull latest code
cd $APP_DIR && git pull origin main

# Install dependencies
npm install --production

# Restart service
pm2 restart myapp

echo "$(date) - Deployment complete" >> $LOG_FILE
```

```bash
# Give script execute permission and run it
chmod +x deploy.sh
./deploy.sh
```

::: 提示 脚本调试技巧
在脚本开头添加 `set -ex`：`-e` 会在出现错误时立即退出脚本（而不是继续执行），`-x` 会打印每条执行的命令（有助于排查问题）。这两个选项在生产脚本中几乎是标准配置。
:::

---

## 5. 实际场景

理论部分讲解完后，让我们看看在开发中最常遇到的一些实际场景。

### 5.1 日志排查

当服务出现问题时，第一反应应该是检查日志。以下是常见的日志排查技巧：

```bash
# 1. Follow logs in real-time (most common)
tail -f /var/log/app/error.log

# 2. Search for errors in a specific time range
grep "2024-01-15 14:" error.log | grep "ERROR"

# 3. Count errors per hour
grep "ERROR" app.log | awk '{print substr($1,1,13)}' | uniq -c

# 4. View last 100 lines of log
tail -100 app.log

# 5. Search across multiple log files
grep -r "OutOfMemory" /var/log/app/
```

### 5.2 进程故障排除

应用程序冻结、CPU 激增、内存泄漏——这些问题都需要从进程层面开始：

```bash
# View processes with highest CPU usage
ps aux --sort=-%cpu | head -10

# View processes with highest memory usage
ps aux --sort=-%mem | head -10

# Find a specific process
ps aux | grep "node"

# View detailed process info (including threads)
top -Hp <PID>

# View files opened by a process
lsof -p <PID>

# Gracefully terminate a process (SIGTERM)
kill <PID>

# Force kill (SIGKILL, last resort)
kill -9 <PID>
```

### 5.3 网络诊断

服务无法访问？首先确定这是网络问题还是应用程序问题：

```bash
# Test if target is reachable
ping -c 4 google.com

# Check if a port is open
telnet db-server 3306
# Or use nc
nc -zv db-server 3306

# View ports listening on this machine
ss -tlnp
# Or
netstat -tlnp

# DNS resolution check
dig api.example.com
nslookup api.example.com

# Test HTTP endpoint
curl -v http://localhost:3000/health

# View network connection statistics
ss -s
```

### 5.4 磁盘空间故障排除

磁盘满是最常见的生产问题之一：

```bash
# View partition usage
df -h

# Find the largest directories
du -sh /* 2>/dev/null | sort -rh | head -10

# Drill down into large directories
du -sh /var/log/* | sort -rh | head -10

# Find large files (>100MB)
find / -type f -size +100M 2>/dev/null | head -20

# Clean up common space hogs
# Clean old logs
sudo journalctl --vacuum-size=500M
# Clean unused Docker images
docker system prune -a
```

::: 提示 生产环境故障排除口诀
**“先看日志，第二看进程，第三看网络，第四看磁盘。”** 90%的生产问题可以通过这四个步骤追溯到根本原因。一旦成为习惯，你的故障排除效率将显著提高。
:::

---

## 总结

Linux 是开发者的一项基本技能。掌握基础知识足以应对大多数日常开发和运维场景。

本章的主要内容：

1. **一切皆文件**：Linux 使用文件抽象来统一访问硬件、进程、网络和其他资源
2. **命令组合**：单个命令很简单；真正的威力来自将它们通过管道组合 `|`
3. **权限模型**：所有者/用户组/其他人 x 读/写/执行，可通过数字快速设置（如 755）
4. **Shell 基础**：管道、重定向、环境变量和脚本是自动化的基石
5. **实用故障排除**：日志 -> 进程 -> 网络 -> 磁盘——四步诊断大多数生产问题

## 延伸阅读

- [Linux 手册页](https://man7.org/linux/man-pages/) - 官方 Linux 手册页文档
- [The Linux Command Line](https://linuxcommand.org/tlcl.php) - 免费的 Linux 命令行入门书籍
- [Linux Journey](https://linuxjourney.com/) - 互动式 Linux 学习网站
- [explainshell.com](https://explainshell.com/) - 输入命令，它会自动解释每个参数