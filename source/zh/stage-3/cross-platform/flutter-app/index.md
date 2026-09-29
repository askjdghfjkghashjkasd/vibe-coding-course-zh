---
标题：《如何用Flutter构建跨平台应用》
描述：“用Flutter构建并核实一个小型商店的费用账本，然后了解移动端和桌面端发布的工作从哪里开始。”
---

# 如何用Flutter构建跨平台应用

当一个团队想从一个Dart项目交付Android和iOS应用——通常还有网页版或桌面版——时，Flutter非常有用。它尤其适用于那些屏幕、交互性和品牌样式应在不同设备上保持一致的产品。

本章我们构建一个小型**商店费用账本**。员工录入一项费用，查看每日总额，重新打开申请后仍能找到记录。

## 1.什么是Flutter

Flutter 是谷歌的界面工具包。应用语言是 **Dart**。Flutter 不通过平台的标准控件合成屏幕，而是通过自身渲染系统绘制一致的界面。

这让团队对布局和动画有了强有力的控制权。这并不会取消平台的工作：权限、支付、通知、签名、无障碍和商店规则仍需在每个目标平台上测试。

Flutter 是一个不错的选择，当：

- Android 和 iOS 几乎需要相同的产品;
- 自定义视觉系统很重要;
- 团队愿意使用飞镖;
- 大多数工作是表单、列表、仪表盘、媒体或业务工作流程。

当产品高度依赖最新的平台 API、深度平台特定交互或庞大的原生代码库时，选择原生 SwiftUI 或 Jetpack Compose。

## 2.看看三款生产产品

### 我的宝马：一款车辆伴侣应用

我的宝马将车辆状态、充电、维修和遥控功能整合到一个移动产品中。界面将车辆及其当前状态置于次要操作之前。

![我的宝马在车旁显示车辆状态和维修入口](../../../../zh-cn/stage-3/跨平台/flutter-app/images/flutter-real-bmw.png）

对于我们的账本，借用的信息顺序相同：先是今天的金额，其次是最新的记录，添加操作始终易于操作。

参考资料：[宝马Flutter客户故事]（https://flutter.dev/showcase/bmw 年）。

### Google Pay：操作后即时确认

支付产品必须明确显示某个操作是否成功。Google Pay 使用明确的状态变化和反馈，而不是让用户自行猜测。

![Google Pay奖励反馈及付款状态](../../../../zh-cn/stage-3/跨平台/flutter-app/images/flutter-real-google-pay.png）

我们的账本保存后也会同样：更新总额，添加行，清除表单，并显示成功信息。

参考资料：[Flutter客户故事]（https://flutter.dev/showcase）。

### Nubank：一种层级平静的金融产品

Nubank的应用将账户信息和操作分组，而不会把每个功能都变成竞争卡。

![Nubank账户及帮助入口](../../../../zh-cn/stage-3/跨平台/flutter-app/images/flutter-real-nubank.png）

有用的教训是克制。一个费用工具需要的是可读的数字和可预测的动作，而不是装饰。

参考文献：[Nubank 在 Flutter 上的工程]（https://building.nubank.com.br/flutter-at-nubank/）。

## 3.安装Flutter并验证环境

从[官方指南]（https://docs.flutter.dev/get-started/install）安装稳定版Flutter SDK，然后运行：

```bash
flutter doctor
```

`flutter doctor` 列出了您的计算机实际可以构建的目标。绿色的网络工具链并不能证明 Android Studio、Android SDK、Xcode、CocoaPods 和移动签名已经准备好。

创建项目：

```bash
flutter create store_expense_ledger
cd store_expense_ledger
flutter run -d chrome
```

当计数器样本在Chrome中打开时，先保持它正常工作再进行更改。

## 4.建造第一个有用的屏幕

请问你的编码助理：

> 将计数样本替换为商店费用主页。显示今日总额、简短费用清单和添加费用按钮。

运行应用，同时查看宽屏和窄屏的浏览器窗口。数字不得被裁剪，主按钮必须保持可见。

![运行中的Flutter商店账本，节省了打印机纸张费用](../../../../zh-cn/stage-3/跨平台/flutter-app/images/flutter-expense-home.png）

## 5.添加费用表格

第一种表格只需要一个类别、备注和金额。

> 通过添加费用按钮打开费用表单。添加类别、备注和金额字段，以及保存和取消。

![运行申请中的附加费用底页](../../../../zh-cn/stage-3/跨平台/flutter-app/images/flutter-expense-form.png）

现在测试空输入和无效输入：

> 在每个无效字段下方显示简短消息。请勿保存空类别或零或负数金额。

![现场验证显示在空费用表上](../../../../zh-cn/stage-3/跨平台/flutter-app/images/flutter-expense-validation.png）

有用的错误应该放在需要关注的领域旁边。一个通用的“出了问题”横幅是不够的。

## 6.让保存更新整个屏幕

> 保存成功后，关闭表单，将费用添加到列表顶部，更新今日总额，并显示确认信息。

输入“办公用品”、“打印机纸”和 `56`。总计、行和信息都应该会改变一次。

!【节省开支后的总额、清单和成功信息】(../../../../zh-cn/stage-3/跨平台/flutter-app/images/flutter-expense-saved.png）

如果双击生成两行，先修正后再添加更多功能。

## 7.应用关闭后继续保留记录

先从本地持久化开始。这意味着当前设备会存储记录，并在启动时重新加载。

> 将费用记录保存在本地，应用启动时恢复。暂时不要添加账户或服务器。

小型原型可以序列化一个简单的列表。寿命更长的产品应将存储放在仓库层后面，这样SQLite或远程API就能替换第一个实现，而无需重写每个界面。

自己测试坚持：

1. 节省两项开支;
2. 刷新浏览器;
3. 关闭标签页再打开;
4. 验证总和和两行。

关于架构指导，请阅读[Flutter的应用架构指南]（https://docs.flutter.dev/app-architecture/guide）。

## 8.添加编辑和删除时请谨慎

> 让用户编辑一项费用。重复使用现有表单，保存后重新计算总额。

之后可以：

> 添加删除并带有确认对话框。取消必须保持记录不变。

编辑和删除是对数据模型的有用测试。如果界面使用列表位置作为身份，排序后行可能会意外发生变化。为每个费用设定一个稳定的ID。

## 9.准备好迎接真正的后端

共享公司账本需要账户、权限、服务器端记录和审计历史。首先解释边界：

> 描述用户、门店、费用、类别和审计事件的数据模型。暂时不要编写代码。

然后一次连接一个操作：

> 从现有 API 加载已登录用户的存储。不要让客户端自行选择角色。

> 将一笔开支发送到后端。如果网络失败，请保留本地副本，并让用户重试。

授权整个公司的秘密永远不应存在于 Flutter 包中。服务器必须决定每个账户可以访问哪些商店和记录。

## 10. 打包前测试

运行静态分析和测试：

```bash
flutter analyze
flutter test
```

添加一个小部件测试，输入一个有效的支出并确认总额变化。再添加一个用于无效金额的测试。

对于响应式屏幕，请遵循 Flutter 的[自适应和响应式设计指导](https://docs.flutter.dev/ui/adaptive-responsive)。

## 11. 为每个目标构建

成功的 Web 构建是有用的，但它不是 Android 或 iOS 发布版本。

```bash
flutter build web
```

对于 Android，请安装 Android Studio 和 Android SDK，接受所需的许可协议，创建签名的发布构建，并在真实手机上测试。对于 iOS，请使用带有 Xcode 和有效模拟器运行时或设备的 Mac，配置签名，创建归档，并通过 TestFlight 测试。

桌面目标也需要各自的打包、签名和干净机器测试。请遵循［官方部署指南］(https://docs.flutter.dev/deployment)。

## 12. 在这里验证了什么

该原型运行在 Flutter 3.44.9 和 Dart 3.12.2 上。`flutter analyze`、小部件测试以及 `flutter build web` 测试都通过了。打开已构建的 web 应用程序，保存了一笔打印纸的开支，触发了验证，并在刷新后该记录依然存在。

该机器没有可用的 Android SDK。Xcode 没有 iOS 模拟器运行时或 CocoaPods。因此不保证 Android 和 iOS 的构建、签名、设备行为及应用商店提交是完整的。

合适的第一个完成目标是适度的：输入一笔开支，看到无效输入的明确错误，成功保存，并在重新打开应用后找到同一记录。一旦这可以可靠完成，再继续处理账户、同步和发布构建。