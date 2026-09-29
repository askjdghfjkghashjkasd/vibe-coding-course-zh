---
title: '如何发布您构建的应用程序'
description: '从发布构建和签名到商店审核、分阶段发布、监控以及在移动端、桌面端和网页上的更新。'
---

# 如何发布您构建的应用程序

在您的计算机上运行的应用程序尚不是用户可以安全安装的产品。

无论是使用 Flutter、React Native、Electron、Qt 还是原生工具构建，公开发布通常遵循相同的总体路径：

> 选择渠道 → 修复应用程序身份 → 创建发布构建 → 签名 → 测试 → 准备商店资料 → 提交审核 → 分阶段发布 → 监控并更新

商店要求会变化。在提交前，请立即再次检查当前控制台和官方文档。

## 1. 将打包、签名、分发和审核分开

**打包**将项目转化为可安装的产物。**签名**证明是谁制作的并保护更新链。**分发**通过商店、网站或公司系统提供应用。**审核**是平台的政策和质量检查。

一个构建可以是打包但未签名、已签名但未分发，或者私下分发而没有公开商店审核。知道哪一步失败可以更轻松地解决发布问题。

## 2. 在首次发布前准备所有权

对于真正的产品，请使用由组织控制的账户、邮箱、域名、云服务和支付记录。不要将应用永久绑定到承包商或员工的私人账户。

记录所有者并启用双因素身份验证，用于：

- 开发者和商店账户；
- 域名、DNS 和支持网站；
- 签名证书、密钥库和恢复资料；
- 云服务、数据库、存储和监控；
- 支付、税务和合同记录。

## 3. 修复应用程序身份和版本

Android 包名、Apple Bundle ID 以及商店产品记录都是应用程序的身份。发布后更改它们通常会创建一个不同的应用，而不是更新。

使用反向域名，例如：

```text
com.example.fridgechef
```

不要发布类似 `com.example.myapplication` 的教程值。

将面向用户的版本和上传的构建编号分开：

```text
Version: 1.0.0
Build: 1
Git tag: v1.0.0
Planned release date: 2026-09-01
```

每次新的上传都需要更高的构建号，即使版本名称保持不变。

## 4. 构建真实的发布环境

发布构建不能意外使用 localhost、测试数据库或沙盒支付。请确认：

- API 使用生产 HTTPS 域名；
- 服务器、管理员和模型密钥不在客户端中；
- 演示账户和调试菜单不对普通用户暴露；
- 禁用不必要的详细日志；
- 崩溃报告、服务警报和客户支持已准备就绪；
- 数据库升级保留现有用户数据。

## 5. 从真实构建中准备商店材料

将图标、截图、描述、隐私文件、审核说明和许可记录集中存放。截图必须显示正在提交的版本，而非设计稿。

从每张图片中删除电话号码、私人对话、访问令牌、客户数据和本地文件路径。

隐私政策和商店问卷必须与应用及其 SDK 实际收集的数据匹配。检查位置、照片、相机、联系人和麦克风权限，以及分析、广告、崩溃报告、登录、账户删除和数据保留。

如果审核需要登录，请提供专用账户和不依赖短信或过期邀请的路径。请让开发团队以外的人严格按照审核说明操作。

## 6. 发布 Android 应用

在 Android Studio 中，使用 **Build → Generate Signed Bundle / APK**。新 G​​oogle Play 应用通常上传 Android App Bundle（`.aab`）；APK 主要用于直接安装和测试。

保护密钥库和恢复说明，切勿提交到 Git，并在真实设备上安装发布构建。

在 Google Play Console 中：

1. 验证开发者账户并创建应用；
2. 完成应用列表、内容分级、目标用户、广告和数据安全表单；
3. 上传 `.aab` 并解决目标 API 和权限检查；
4. 发布到内部或封闭测试通道；
5. 安装商店交付版本并重新测试登录、支付、通知和升级；
6. 启动分阶段发布的生产版本。

官方指南: [在 Play Console 上传应用](https://developer.android.com/studio/publish/upload-bundle)。

中国大陆有多个 Android 应用商店，而非单一通用商店。团队通常根据用户情况分别发布到华为、小米、OPPO、vivo、荣耀和腾讯应用宝。保持各渠道的包名、兼容签名、递增版本号、隐私声明及源/构建记录一致。提交前检查当前应用备案和营业执照要求。

## 7. 发布 iOS 应用

iPhone 用户的标准公共渠道是 App Store。

1. 使用组织控制的 Apple 帐号加入相应的 Apple Developer Program；
2. 创建 App ID 和功能权限；
3. 在 App Store Connect 创建应用记录；
4. 保持其 Bundle ID 与 Xcode 相同；
5. 从 Xcode 归档，并选择真机作为目标；
6. 验证并上传归档文件；
7. 通过 TestFlight 测试处理后的构建；
8. 完成截图、隐私、年龄分级、出口合规和审核信息；
9. 为审核添加版本，然后提交。

使用提交的完全相同构建测试首次安装、升级、登录、订阅恢复、通知和后台恢复。

官方指南：[App Store Connect 工作流程](https://developer.apple.com/help/app-store-connect/get-started/app-store-connect-workflow) 和 [提交应用](https://developer.apple.com/help/app-store-connect/manage-submissions-to-app-review/submit-an-app)。

## 8. 发布 Windows 和 macOS 应用

对于 Windows，Microsoft Store 提供了一致的安装和更新路径。在 Partner Center 预留名称，构建并测试 MSIX 包，完成应用列表，运行所需的认证检查，然后再次安装已发布的商店版本。

通过直接网站分发意味着你需要负责代码签名、HTTPS 托管、校验和、SmartScreen 声誉、安装、卸载、更新、回滚以及支持的 Windows 版本。

官方指南：[发布你的第一个 Windows 应用](https://learn.microsoft.com/windows/apps/package-and-deploy/publish-first-app)。

对于 macOS，Mac App Store 构建遵循 App Store Connect、签名、沙盒、归档和审核规则。通过网站交付的 DMG 或 PKG 仍需开发者 ID 签名、强化运行时检查、Apple 公证、订书机（stapling）、干净的 Mac Gatekeeper 测试以及安全的更新路径。

官方指南：[测试和发布应用程序的分发](https://developer.apple.com/documentation/xcode/distributing-your-app-for-beta-testing-and-releases/)。

## 9. 发布 Linux 和 Web 应用

Linux 没有适用于所有发行版的单一商店。常见选择有 Flathub、Snap Store、AppImage、`.deb` 和 `.rpm`。无论选择哪种方式，都需发布校验和、架构、依赖说明、更新说明以及可信的下载来源。

参考：[Flathub 提交](https://docs.flathub.org/docs/for-app-authors/submission) 和 [发布 Snap](https://documentation.ubuntu.com/snapcraft/latest/how-to/publishing/publish-a-snap/)。

对于 Web 和 PWA 产品，部署到稳定的 HTTPS 域是主要发布方式。检查 DNS 和证书续期、生产环境变量、404 和离线行为、Manifest 值、Service Worker 更新、可访问性、监控、备份和回滚。

继续阅读 [如何构建本地 PWA](../pwa-local-app/)。

## 10. 发布小程序和浏览器扩展

微信小程序通常通过微信开发者工具上传，在管理控制台选择，填写分类和隐私信息，提交审核，并在批准后发布。在审核版本中重新检查 API 域名、云环境、支付和隐私提示。

Chrome Web Store、Microsoft Edge 插件和 Firefox AMO 各自有自己的控制台。上传扩展包，说明每项请求的权限，提供截图和隐私信息，并使用最少需求权限。

参考：[Chrome Web Store](https://developer.chrome.com/docs/webstore/) 和 [发布 Microsoft Edge 扩展](https://learn.microsoft.com/microsoft-edge/extensions/publish/publish-extension)。

## 11. 处理审核失败

常见原因包括仅在发布版本崩溃、审核账号不可用、隐私声明与 SDK 行为不符、未完成的按钮、禁止的支付流程、权限过多、未授权的资源以及来自旧版本的截图。

向 AI 提供确切的审核消息和当前行为，而不是模糊总结：

> 这是商店审核消息：【粘贴它】。确定必须更改的规则和产品行为。不要猜测。

修复后:

> 列出需要重新测试的操作以及在重新提交前必须更新的商店资料。

平台自身的响应仍然是权威。

## 12. 逐步上线并保持更新

可靠的发布顺序是：开发者测试、内部测试、小范围封闭测试、商店审核、分阶段上线生产，然后在崩溃、API、登录、支付和支持信号保持健康后向更广泛用户开放。

记录谁按下发布按钮、谁进行监控、哪个信号会暂停上线、回滚如何操作以及如何通知用户。

每次更新都必须保留应用身份和兼容的签名链，增加版本号，安全迁移本地数据，保持后端 API 与旧客户端兼容，并在 SDK 或功能变更时更新隐私声明。

## 13. 首次发布检查表

- [ ] 选择一个首发平台和一个分发渠道。
- [ ] 使用组织身份注册开发者账号。
- [ ] 确定应用名称和包名或 Bundle ID。
- [ ] 创建并安全备份签名资料。
- [ ] 构建发布版本并在干净设备上安装。
- [ ] 准备真实的截图、描述、支持页面和隐私页面。
- [ ] 提供长期可用的审核账号。
- [ ] 从测试渠道安装并完成核心工作流程。
- [ ] 保存每条审核消息及对应的修改。
- [ ] 从小范围上线开始，只有在监控健康时才扩展。

发布并不是开发后的行政工作。身份、签名、隐私、测试、监控和回滚都是产品的一部分。在版本一中这样对待它们，每一次后来发布都会更安全、更快速。