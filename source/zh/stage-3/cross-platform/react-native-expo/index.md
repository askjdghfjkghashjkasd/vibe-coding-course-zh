---
标题：“用 React Native 和 Expo 构建商店检查应用”
描述：“一条适合初学者的路径，从一个空白的博览会项目，到一个运行在网络上，之后还能面向Android和iOS的店铺检查应用。”
---

# 用 React Native 和 Expo 构建商店检查应用

假设一个零售团队需要一个小型应用来进行每日门店检查。员工打开清单，标记每一项物品，留下备注，并保存结果。同一项目最终应能在Android和iPhone上运行，而浏览器版本则适合快速内部审核。

这是一个很好的 React Native 和 Expo 项目：产品主要包含表单、列表、照片和业务数据，团队希望将大部分 TypeScript 代码共享到各个平台。

## 1.React Native 和 Expo 的具体工作

**React Native** 允许你用 React 和 TypeScript 构建 Android 和 iOS 接口。它渲染原生控件，而不是把网站放在应用窗口里。

**Expo** 提供围绕 React Native 的项目工具：项目创建、开发服务器、通用设备 API、构建、更新和存储提交服务。你可以从 Expo 开始，之后产品需要时仍使用原生代码。

本章的项目是一个**商店检查应用**。“检查”简单来说，就是员工检查一个简短的清单——入口照明、货架标签、消防出口等等——并记录结果。

## 2.看看真实产品是如何利用这个堆栈的

### Shopify POS：实体店的销售点平台

Shopify POS 是员工在店面柜台用来销售产品、检查库存和处理零售硬件的应用程序。Shopify 描述了将 POS 应用迁移到 React Native，同时继续在商店实际使用的低功率设备上测试。

![Shopify POS 库存和商店界面，摘自官方产品页面](../../../../zh-cn/stage-3/跨平台/react-native-expo/images/shopify-pos-product.jpg）

我们检查应用的教训是实用的：主屏幕应立即显示下一项任务和当天的进度。真正的店员不应需要在多个装饰页面间浏览。

阅读：[Shopify 的 React Native 迁移]（https://shopify.engineering/migrating-our-largest-mobile-app-to-react-native）。

### Discord：安卓和iOS上的同一款产品

Discord 是一个面向社区、朋友和工作小组的交流平台。其移动团队使用 React Native 在 Android 和 iOS 之间分享产品工作，同时保留针对特定平台行为的空间。

![Discord官方对安卓角色界面的对比](../../../../zh-cn/stage-3/跨平台/react-native-expo/images/discord-react-native-roles.png）

这是第二个教训：先共享屏幕和业务逻辑。只有在两个平台确实需要不同的行为时，才添加仅限Android或仅限iOS的文件。

阅读：[Discord如何改进Android上的React Native]（https://discord.com/blog/how-discord-achieves-native-ios-performance-with-react-native）。

### MTA TrainTime：一款用Expo开发的生产应用

MTA TrainTime 是纽约通勤铁路服务的官方行程规划和票务应用。Expo 的案例研究解释了其团队如何利用 Expo 工具进行构建和发布。

![世博会官方案例研究中的MTA TrainTime应用](../../../../zh-cn/stage-3/跨平台/react-native-expo/images/expo-mta-case.png）

它在这里的价值不在于铁路接口。它显示了 Expo 可以支持生产发布流程，而不仅仅是课堂演示。

阅读：[MTA 的 Expo 案例研究](https://expo.dev/customers/mta)。

## 3. 一个项目如何覆盖多个平台

![React Native 和 Expo 如何组织多平台项目](../../../../zh-cn/stage-3/cross-platform/react-native-expo/images/react-native-expo-architecture.svg)

你用 TypeScript 编写屏幕和状态。React Native 提供移动控件。Expo 启动项目，提供通用 API，并创建构建。Web 构建可以重用大部分相同的项目，尽管并非每个原生功能在浏览器中都有完全相同的等效实现。

这就是为什么“单一代码库”并不意味着“每行代码都相同”。它的意思是共享的产品逻辑保持在一起，而少数真正的平台差异保持小而明确。

## 4. 创建第一个项目

安装当前的 Node.js LTS 版本，然后在存放项目的文件夹中打开终端：

```bash
npx create-expo-app@latest store-inspection
cd store-inspection
npm run web
```

当浏览器显示启动程序时，停止操作并保持该版本正常运行。它为你提供了一个安全点，可以返回。

现在问你的编码助手：

> 将这个 Expo 启动程序变成一个商店检查主页。显示商店名称、今天的进度，以及一个打开检查清单的按钮。

不要在同一消息中请求登录、相机访问、离线同步或后端。首先确认主页可以打开。

## 5. 添加检查清单

对于第一个版本，使用四个普通项目：入口照明、价格标签、通道清洁和消防出口。

> 添加一个带有四个检查清单项目的检查页面。点击一个项目应该在完成与未完成之间切换，并更新进度数字。

再次运行页面。每个项目点击一次，然后再点击一个项目一次。计数应该正确增加和减少。

![在 Expo Web 中运行的商店检查应用](../../../../zh-cn/stage-3/cross-platform/react-native-expo/images/expo-web-running.png)

接下来缩小浏览器窗口。控件应保持可读，无需横向滚动。

![窄布局下相同的 Expo Web 应用](../../../../zh-cn/stage-3/cross-platform/react-native-expo/images/expo-web-mobile-layout.png)

## 6. 保存一条检查记录

第一条记录只需要一个备注和一个保存按钮。

> 添加一个备注字段和一个保存按钮。保存后，在检查清单下方显示记录卡，显示时间、完成项目数和备注。

测试三种情况：

1. 保存正常备注；
2. 尝试在没有完成项目时保存；
3. 保存第二条记录，并确认第一条记录仍然可见。

![点击并保存后的真实检查记录](../../../../zh-cn/stage-3/cross-platform/react-native-expo/images/expo-web-record-saved.png)

## 7. 使记录在重启后依然存在

目前，刷新页面可能会清除记录。“本地存储”意味着在当前设备上保留一份副本，以便用户可以关闭应用后稍后继续。

> 在此设备上保存检查清单的进度和记录。应用再次打开时恢复它们。暂时不要添加服务器。

对于一些简单的值，`AsyncStorage` 在移动端通常足够。当数据增长到检查、条目和重试队列时，`expo-sqlite` 更易管理。浏览器版本需要相应的网页存储路径。

修改之后，保存两条记录，关闭标签页，再次打开，并确认两条记录都返回。

参考：[AsyncStorage](https://react-native-async-storage.github.io/async-storage/) 和 [Expo SQLite](https://docs.expo.dev/versions/latest/sdk/sqlite/)。

## 8. 保存功能正常后再添加相机

照片在员工需要记录损坏标志或堵塞出口时非常有用。首先添加一个小功能：

> 允许用户为未完成的检查清单项目附加一张照片。显示预览并允许删除照片。

Expo 的 [ImagePicker 指南](https://docs.expo.dev/versions/latest/sdk/imagepicker/) 介绍了系统照片选择器。相机会添加权限提示和更多设备特定测试，所以在目标手机上未测试前不要声称它可用。

## 9. 连接公司后端

后端是拥有账户、商店权限、共享记录和上传照片的服务器。移动应用应显示这些数据；不应自行决定谁是管理员。

先从数据关系开始：

> 描述用户、商店、检查、检查清单项目和照片之间的关系。暂时不要写代码。

然后连接登录：

> 连接现有的登录 API。用户只能看到服务器分配的商店。

将移动登录令牌存储在 `SecureStore` 中，而不是普通文本存储。切勿将服务器密钥放在 `EXPO_PUBLIC_` 变量中：应用中包含的值最终用户可以读取。

关于照片上传：

> 通过后台上传检查照片。限制文件类型和大小，显示上传进度，并在上传失败时保留本地记录。

用两个账户进行测试。账户 A 不能读取账户 B 的商店、记录、照片或重试队列。隐藏按钮不是访问控制；后台必须拒绝请求。

## 10. 理解离线同步

“离线同步”意味着当网络不可用时，设备将工作内容保存在本地，并在之后上传。首个原型不要求实现该功能。

一旦普通本地保存和后台都能正常工作，每次增加一个状态：

> 将未发送的记录标记为“待处理”。添加一个重试按钮，当网络恢复时发送一个待处理记录。

之后可以添加“发送中”、“已同步”和“失败”等状态。每次提交都应有唯一请求 ID，以确保重试不会创建重复的检查记录。

## 11. 在手机上运行并准备发布

在早期开发阶段，Expo Go 对其内置原生模块支持的功能非常方便。**开发构建**是你自己的可安装测试应用，一旦添加自定义原生代码，它是更好的选择。

请参考 Expo 的 [开发构建指南](https://docs.expo.dev/develop/development-builds/introduction/) 和 [EAS 构建指南](https://docs.expo.dev/build/introduction/)。

发布前，请在真实设备上测试实际的 Android 和 iOS 构建：

- 首次启动及权限提示；
- 屏幕键盘的文本输入；
- 照片选择或相机拍摄；
- 关闭并重新打开应用；
- 网络弱、重试和重复提交；
- 账户隔离及注销；
- 升级到上一版本而不丢失本地记录。

## 12. 本章节验证内容

该原型使用 Expo SDK 57 和 TypeScript 创建。类型检查通过，Web 生产导出完成，并在浏览器中打开应用。检查列表交互、记录保存及上文演示的窄布局在运行构建中进行了测试。

此机器没有可用的 Android 模拟器或 iOS 模拟器运行环境，因此本章节未假设移动构建、相机权限、签名或应用商店提交已完成。在自己的项目中也使用相同规则：准确记录运行了什么、在哪台设备上、使用哪个构建。

第一个可用的里程碑很小：打开检查列表，完成一项内容，保存备注，并再次查看记录。一旦此路径可靠，可以按顺序添加照片、账户、同步和发布工作。