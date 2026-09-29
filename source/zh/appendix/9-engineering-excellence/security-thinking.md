# 安全思维基础：进攻与防御

::: tip 前言
**你的网站安全吗？** 许多开发者认为“安全是安全团队的工作”——直到他们自己的项目遭到攻击，用户数据泄露。安全不是可选项；它是每个开发者的基本技能。

本章将帮助你建立安全思维，并理解最常见的网络安全威胁及防御方法。
:::

**你将在本文中学习到什么？**

| 章节 | 内容 | 核心概念 |
|----- |------|---------|
| **第1章** | 安全思维模型 | 像攻击者一样思考 |
| **第2章** | 常见网络攻击 | XSS、SQL注入、CSRF |
| **第3章** | 防御策略 | 输入验证、输出编码、访问控制 |
| **第4章** | 安全检查表 | 上线前的安全自查 |

阅读本章后，你将具备基础的安全意识，并能够识别和防御最常见的网络安全威胁。

---

## 0. 大局观：为什么开发者需要理解安全

想象你建了一座房子——功能齐全，美观装饰——但忘了安装锁。安全漏洞就是代码世界中“被遗忘的锁”。

::: tip 核心安全原则
- **最小权限**：只授予必要的权限——不要多一分
- **纵深防御**：不要依赖单一防线；建立多层防护
- **永不信任输入**：所有来自外部的数据都可能是恶意的
- **默认安全**：默认配置应保证安全，而不是方便
:::

---

## 1. 常见网络攻击

使用下面的互动组件，了解三种最常见的网络攻击原理（仅用于教育目的）：

<WebSecurityDemo />

### 1.1 XSS（跨站脚本）

攻击者将恶意脚本注入网页。当其他用户访问该页面时，脚本会在他们的浏览器中执行。

```javascript
// Dangerous: directly inserting user input into HTML
element.innerHTML = userInput
// If userInput is <script>malicious code</script>, it will execute

// Safe: use textContent or escaping
element.textContent = userInput
// Or use framework's auto-escaping (Vue's {{ }}, React's JSX)
```

**防御要点**：
- 在输出时转义 HTML 特殊字符 (`<`, `>`, `&`, `"`, `'`)
- 使用现代框架的内置自动转义机制
- 设置 `Content-Security-Policy` HTTP 头

### 1.2 SQL 注入

攻击者构造特殊输入以操纵 SQL 查询的逻辑。

```javascript
// Dangerous: string concatenation for SQL
const query = `SELECT * FROM users WHERE name = '${userInput}'`
// If userInput is ' OR '1'='1, it will return all users

// Safe: use parameterized queries
const query = 'SELECT * FROM users WHERE name = ?'
db.execute(query, [userInput])
```

**防御要点**：
- 始终使用参数化查询 / 预处理语句
- 使用 ORM 框架（例如 Prisma、Sequelize）
- 限制数据库账户权限

### 1.3 CSRF（跨站请求伪造）

攻击者诱使已登录用户访问恶意页面，利用用户的登录状态发送请求。

**防御要点**：
- 使用 CSRF 令牌
- 检查 `Referer` / `Origin` 头
- 对关键操作使用 POST 而非 GET
- 在 Cookie 上设置 `SameSite` 属性

---

## 2. 防御策略

### 2.1 输入验证

```javascript
// Whitelist validation: only allow expected formats
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

// Length limits
function isValidUsername(name) {
  return name.length >= 2 && name.length <= 50
}
```

### 2.2 敏感数据保护

| 数据类型 | 保护措施 |
|---------|---------|
| 密码 | bcrypt/argon2 哈希，绝不以明文存储 |
| API 密钥 | 环境变量，绝不提交到代码仓库 |
| 用户数据 | HTTPS 传输，加密存储 |
| 会话令牌 | HttpOnly  Secure  SameSite Cookie |

### 2.3 HTTP 安全头

```
Content-Security-Policy: default-src 'self'
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Strict-Transport-Security: max-age=31536000
```

---

## 3.安全清单

上线前，请使用下方的互动组件检查项目的安全状态：

<安全检查清单演示 />

### 3.1 开发阶段

- [ ] 所有用户输入均经过验证并逃逸
- [ ] 使用参数化查询，不使用 SQL 连接
- [ ] 密码是通过像 bcrypt 这样的算法进行哈希处理的
- [ ] 敏感配置通过环境变量进行管理
- [ ] `.env` 文件被添加到 `.gitignore`

### 3.2 部署阶段

- [ ] HTTPS 已启用
- [ ] 已配置安全HTTP头部
- [ ] 调试模式和冗长错误消息被禁用
- [ ] 数据库使用权限最小的账户
- [ ] 依赖关系会定期更新 （`npm audit`）

---

## 4.人工智能驱动：利用大型语言模型提升安全性

LLM可以充当你的“安全顾问”——帮助你审计代码漏洞并生成安全解决方案。

### 4.1 代码安全审计

> **提示**：
>```
> Please perform a security audit on the following code, checking for:
> - XSS vulnerabilities (unescaped user input)
> - SQL injection (string-concatenated queries)
> - CSRF risks (missing token verification)
> - Sensitive data leakage (hardcoded keys, plaintext passwords)
> For each issue, provide risk level, specific location, and remediation.
>
> [Paste your code]
> ```

### 4.2 生成安全配置

> **提示**：
> ```
> My project uses Express.js + PostgreSQL and is about to go live.
> Please generate a complete security configuration checklist, including:
> - HTTP security header configuration code
> - CORS configuration
> - Secure database connection settings
> - Environment variable management solution
> Provide ready-to-use code snippets.
> ```

### 4.3 解释漏洞原则

> **提示**：
> ```
> Explain the complete flow of a CSRF attack with a concrete example:
> 1. How the attacker constructs the malicious page
> 2. Why the browser automatically includes cookies
> 3. How the server defends using CSRF tokens
> Demonstrate the complete attack and defense process with code.
> ```

::: 提示 AI 使用建议
AI 安全审计不能替代专业的安全测试。应将其视为初步筛查——关键系统仍然需要专业安全团队的审计。
:::

---

## 5. 总结

1. **安全思维**：永远不要盲目信任外部输入，最小权限原则，纵深防御
2. **常见攻击**：XSS、SQL 注入、CSRF 是最常见的网页安全威胁
3. **防御策略**：输入验证、输出编码、参数化查询、安全 HTTP 头
4. **安全习惯**：上线前运行安全检查清单，定期审计依赖项

::: 提示 最终思考
安全不是一次性的任务，而是贯穿整个开发过程的习惯。它就像开车时系安全带——不是因为你期待事故，而是因为这是基本的安全意识。**在编写每一行代码时，问自己：如果这个输入是恶意的，会发生什么？**
:::

---

## 延伸阅读

- **OWASP 前十**：十大网页应用安全风险——每个开发者都应该知道。
- **实用工具**：使用 `npm audit` 检查依赖项漏洞，以及 ESLint 安全插件检查代码。
- **深度学习**：了解 HTTPS 原理、JWT 安全实践和 OAuth 2.0 安全注意事项。
- **安全社区**：关注安全通告，并及时修补已知漏洞。