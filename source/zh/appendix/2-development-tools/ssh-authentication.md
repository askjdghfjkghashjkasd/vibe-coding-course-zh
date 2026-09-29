# SSH与密钥认证导论

> 💡 **学习指南**：每次`git push`都输入密码感到厌倦了吗？连接服务器时出现“权限被拒绝”的提示？本章花5分钟解释SSH密钥认证的工作原理，以及如何用一个命令设置无密码登录GitHub和服务器。

---

## 0.你肯定遇到过这种情况

- `git push` 不断弹出密码提示 — 超级烦人
- SSH连接服务器失败，你不知道`id_rsa`和`id_ed25519`是什么
- 你听说过“公钥”和“私钥”，但不确定该共享哪个，保留哪个

**核心问题**：密码既不安全又不便。SSH密钥同时解决了安全和便利性。

---

## 1.密码与密钥：为什么密钥更好

👇 试试看：比较密码登录和密钥登录的区别

<SSHAuth演示/>

::: 提示 💡 一句话总结
密码登录 = 每次发送密码以便对方验证（密码可能被拦截）;
密钥登录 = 证明“我有密钥”，但不向任何人展示密钥（私钥从未传输）。
:::

---

## 2.非对称加密：公钥与私钥

SSH 密钥基于**非对称加密**，同时生成两个密钥：

| |私钥 |公钥 |
|---|---|---|
|**存储在**你的电脑 `~/.ssh/id_ed25519` |服务器 / GitHub |
|**你能分享吗？** |❌绝不 |✅自由分享 |
|**功能** |签名（证明身份）|验证签名（确认身份）|
|**类比** |钥匙 |锁 |

### 公共密钥类型

|类型 |命令 |推荐 |注释 |
|---|---|---|---|
|**Ed25519** |`ssh-keygen -t ed25519` |⭐⭐⭐ |最新、最快、最安全的 |
|**RSA** |`ssh-keygen -t rsa -b 4096` |⭐⭐ |兼容性不错，但速度较慢 |
|**ECDSA** |`ssh-keygen -t ecdsa` |⭐ |一般不推荐 |

---

## 3.动手操作：生成和配置SSH密钥

### 3.1 生成密钥对

```bash
ssh-keygen -t ed25519 -C "your@email.com"
```

运行后，你将被提示输入：
- **文件路径**：按回车使用默认路径 `~/.ssh/id_ed25519`
- **密码短语**：你可以设置额外保护（或留空）

### 3.2 将公钥添加到 GitHub

```bash
# 1. Copy the public key content
cat ~/.ssh/id_ed25519.pub | pbcopy  # macOS
cat ~/.ssh/id_ed25519.pub | xclip   # Linux

# 2. Open GitHub → Settings → SSH and GPG keys → New SSH key
# 3. Paste the public key and save

# 4. Test the connection
ssh -T git@github.com
# Success message: Hi username! You've been authenticated...
```

### 3.3 将公钥添加到服务器

```bash
# Method 1: ssh-copy-id (recommended)
ssh-copy-id user@your-server

# Method 2: Manual copy
cat ~/.ssh/id_ed25519.pub | ssh user@server "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"
```

---

## 4. SSH 配置：告别冗长命令

在 `~/.ssh/config` 中配置别名——只需设置一次，终身受益：

```
Host dev
  HostName 192.168.1.100
  User deploy
  IdentityFile ~/.ssh/id_ed25519

Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519
```

配置后：

| 之前 | 之后 |
|---|---|
| `ssh -i ~/.ssh/id_ed25519 deploy@192.168.1.100` | `ssh dev` |
| 每次记住 IP 和用户名 | 只需记住一个别名 |

---

## 5. 常见问题排查

| 问题 | 原因 | 解决方案 |
|---|---|---|
| `Permission denied (publickey)` | 公钥未添加到服务器 | `ssh-copy-id user@server` |
| `WARNING: UNPROTECTED PRIVATE KEY FILE` | 私钥文件权限过宽 | `chmod 600 ~/.ssh/id_ed25519` |
| `Could not resolve hostname` | SSH 配置错误 | 检查 `~/.ssh/config` 格式 |
| GitHub 仍然要求输入密码 | 使用 HTTPS 而非 SSH | 切换到 `git@github.com:user/repo.git` |

---

## 6. 总结

::: tip 📚 关键要点
1. **密钥 > 密码**：私钥从不传输，比密码安全得多
2. **推荐 Ed25519**：最现代的密钥算法——快速且高度安全
3. **公开密钥可以自由分享，私钥绝不泄露**：记住这个黄金法则
4. **SSH 配置**：设置别名一次，然后 `ssh alias` 即可立即连接
5. **GitHub/GitLab**：添加公钥后，`git push/pull` 再也不需要密码
:::

**下一步**：
- [端口与本地主机原理](./ports-localhost) - 了解网络连接基础
- [环境变量及 PATH 入门](./environment-path) - 了解系统配置