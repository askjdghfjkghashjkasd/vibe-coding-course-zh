# 如何构建一个简单的安卓应用 - 原生Compose开发

# 1 什么是安卓应用和安卓开发

在这个教程中，我们将完成一个完整的闭环：**从你脑海中的一个想法，到一个可以成功安装并在安卓手机上运行的真实应用。**

对于这个教程，你至少应该具备：

- 性能尚可的计算机（Windows或Mac）
- 安卓手机（可选;如果没有，我们将使用模拟器）
- 安装Android Studio（用于搭建）
- Trae 安装并注册（用于 AI 编码）

## 1.1 安卓应用定义

安卓应用是运行在安卓操作系统上的原生应用。与微信不同，它不依赖于微信等主机。它直接在系统层面运行。它拥有自己的主屏幕图标，启动快速，手感流畅，并能深入访问系统级功能，如蓝牙、传感器和后台服务。

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image1.png）

## 1.2 安卓应用开发

Android 开发指的是构建此类应用程序的整个过程。在本教程中使用的 氛围编程 开发模式中，借助 **AI 辅助编程**，开发者的角色从“代码编写者”转变为“产品架构师”：

1. **你（架构师/项目经理）**：负责业务逻辑设计、提示写作及最终结果接受。
2. **Trae（AI工程师）**：负责执行指令、将自然语言转换为标准Kotlin代码和Jetpack Compose布局，并处理语法错误和逻辑细节。
3. **Android Studio（构建工厂）**：负责提供编译环境、将代码打包成可运行应用以及提供模拟器预览。

## 1.3 构建安卓应用的常见方法

在实际开发中，构建安卓应用的方法不止一种。我们这里不会深入探讨，只提供整体理解。

**第一种方式：本土发展**  
这是谷歌官方推荐的路线。你可以直接使用**Kotlin**和**Jetpack Compose**进行开发。它的优势是性能最佳，并且可以完全使用手机硬件。

![](../../../../zh-cn/stage-3/跨平台/android-app/images/image2.png）！[](../../../../zh-cn/stage-3/跨平台/android-app/images/image3.png）

**第二种方式：跨平台开发**  
比如Flutter或React Native。核心理念是“写一个代码库，生成Android和iOS应用。”

**第三条路：混合开发**  
本质上，这就是将网页包裹在应用壳中。这开发速度快，但体验和流畅度通常不如原生应用，而且很难用这种方式打造一个精致、沉浸式的小工具。

**本教程的选择：原生开发（** **Kotlin Compose）**结合AI工具进行编码。  
原因很简单：Jetpack Compose 原生代码结构非常清晰，非常适合 AI 理解和生成。我们不需要从零开始手写代码。相反，我们用自然语言引导 Trae 生成高质量的原生代码。

![](../../../../zh-cn/stage-3/跨平台/android-app/images/image4.png）

## 1.4 本教程涵盖的Android应用开发步骤

为了让学习过程更有趣，本教程围绕一个轻松但技术上具代表性的案例展开——**电子木制鱼**。我们将Trae的Vibe编码模式与一条可反复使用的路线结合起来：

1. **建立理解和环境**：了解安卓应用是什么，安装Android Studio和Trae，配置中国友好镜像，使工具链顺畅运行。
2. **构建项目骨架**：创建一个能在模拟器中成功运行的空白Android项目。
3. **AI 迭代开发**：先在 Trae 中打开项目，然后通过与 AI 对话，逐步实现木制鱼的图像、敲击动画、音效、漂浮文字等。
4. **真实设备调试与打磨**：超越模拟器，在手机上安装应用，体验真实的振动反馈，让AI协助调查漏洞。
5. **打包与发布**：生成正式的APK，并了解如何分享或发布。

本节仅绘制大局，尚未展开所有命令。目前，请记住主旨：**环境设置 ->骨骼构建 -> AI描述与生成 ->实物设备打磨 ->包装与交付**。在接下来的章节中，我们将带你了解每一步。

#2 开发环境设置

## 2.1 本教程中使用的工具

在整个开发过程中，我们共同使用三种工具，分别扮演“设计”、“构建”和“接受”三个角色。

- **Trae**：这是你的**AI编码伙伴**。在Vibe编码模式下，我们不再需要逐行输入代码。相反，我们主要用自然语言告诉AI我们想要什么，AI负责代码生成和修改。
- **Android Studio**：这是谷歌官方的**应用构建工厂**。虽然它有很多按钮，但在这个教程中，我们主要用它来创建项目骨架，并将Trae生成的代码编译成可安装在手机上的版本。
- **安卓设备**：作为**测试终端**查看结果。你可以将其连接到电脑进行真实设备调试，感受真实的振动反馈。如果没有，Android Studio内置的**模拟器**可以完美模拟虚拟手机，这对早期开发来说足够了。

## 2.2 下载Trae

Trae是我们**Vibe编程**的主要战场。你可以简单地把它看作**“AI驱动的代码编辑器”。**

访问官方网站 [https://www.trae.cn]（https://www.trae.cn），下载与你电脑系统（Windows或Mac）匹配的版本，然后像普通软件一样双击安装程序并按照提示安装。一旦这个工具准备好，后续实践中我们将停止盯着枯燥的代码窗口，而是在这里打开项目，用自然语言告诉人工智能要构建什么。

![](../../../../zh-cn/stage-3/跨平台/android-app/images/image5.png）

## 2.3 下载Android Studio

我们需要Android Studio来提供运行应用所需的Android SDK和模拟器。访问官方下载页面[https://developer.android.com/studio?hl=zh-cn]（https://developer.android.com/studio?hl=zh-cn），下载适用于你操作系统的软件包（本教程基于**2025.2.3**）。下载后，像普通软件一样安装，始终保持默认选项。

**初学者特别提醒：**

虽然现代版本的Android Studio配置大大简化，但这仍然依赖于底层的**JDK（Java Development Kit）**。如果你是第一次做开发，或者在安装过程中遇到与环境变量或SDK配置相关的错误，不要慌。你可以参考这份详细的设置指南：[Android Studio 2024 设置：SDK 和 Gradle 配置]（https：//blog.csdn.net/keiraee/article/details/142321644？ops_request_misc=elastic_search_misc&request_id=a2b858d1f665095c53afa9114ad8864d&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~top_positive~default-2-142321644-null-null.142^v102^pc_search_result_base4&utm_term=android studio安装及配置&spm=1018.2226.3001.4187）

![](../../../../zh-cn/stage-3/跨平台/android-app/images/image6.png）

## 2.4 创建新项目

打开Android Studio，在欢迎界面点击**新项目**。

**步骤1：选择模板**

在模板列表中，选择**空活动**（注意上面的Jetpack Compose图标）。

![](../../../../zh-cn/stage-3/跨平台/android-app/images/image7.png）！[](../../../../zh-cn/stage-3/跨平台/android-app/images/image8.png）

**步骤2：填写项目配置**

然后你会看到一个配置表单。大致填写如下，其余部分保持默认状态：

|**字段** |**推荐价值****说明** |
|----------------- |-------------------------------------------------- |---------------------------------------- |
|**姓名**我的应用1 |应用名称显示在手机主屏幕上 |
|**包名** |com.example.myapplication1 |唯一应用标识符 |
|**保存位置** |自定义路径（例如 `E:\AndroidProjects\Myapplication1`） |项目存储位置;不建议放置于 C 盘 |
|**最低SDK**API 30 |覆盖超过90%的活跃设备，同时平衡兼容性和功能 |
|**语言** |Kotlin（推荐）|Kotlin是谷歌官方推荐的语言，更干净、更安全 |

![](../../../../zh-cn/stage-3/跨平台/android-app/images/image9.png）

**步骤3：等待项目构建**

点击**完成**。Android Studio 会自动下载依赖并构建项目（你会在右下角看到进度条）。

- _Note：首次创建项目可能需要几分钟。耐心等待底部进度完成，项目文件树完全加载left._

## 2.5 依赖配置：Gradle 下载与 Gradle 仓库镜像

>这是Vibe编码工作流程中少数建议**手动操作**的步骤之一。虽然AI也能帮助修改配置，但环境配置涉及底层文件，因此手动更改更为可靠。

为什么我们需要修改配置？

默认情况下，Android Studio连接海外服务器，因此下载构建工具和依赖可能需要一小时甚至失败。切换到国内镜像后，通常几分钟内就能完成。**这是一次性任务，但回报极高。**

1. **准备**

如果Android Studio右下角状态栏当前显示进度条，比如`Gradle Building...`，请先暂停正在进行的依赖下载，以避免文件冲突。

![](../../../../zh-cn/stage-3/跨平台/android-app/images/image10.png）

2. **加快Gradle下载速度**

在左侧的项目文件树中，展开 `gradle` -> `wrapper`，然后打开 `gradle-wrapper.properties`。将下载源更改为腾讯的镜像：

```text
distributionUrl=https\://mirrors.cloud.tencent.com/gradle/gradle-8.7-bin.zip
```

小心：你只需要将 `services.gradle.org/distributions` 替换为 `mirrors.cloud.tencent.com/gradle`。不要更改其他任何内容。

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image11.png)

3. **加快依赖库下载速度**

然后，打开项目根目录下的 `settings.gradle.kts`，并将 `repositories` 块中的内容替换为以下内容：

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image12.png)

将高亮部分替换为此代码（截至 2025-02-21 的最新源列表）：

```json
        // Aliyun mirrors (covering Maven Central, Google, JCenter, etc.)
        maven { setUrl("https://maven.aliyun.com/repository/public/") }
        maven { setUrl("https://maven.aliyun.com/repository/google/") }
        maven { setUrl("https://maven.aliyun.com/repository/jcenter/") }
        maven { setUrl("https://maven.aliyun.com/repository/gradle-plugin/") }
        // Huawei Cloud mirror
        maven { setUrl("https://repo.huaweicloud.com/repository/maven/") }
        // Tencent Cloud mirror
        maven { setUrl("https://mirrors.cloud.tencent.com/nexus/repository/maven-public/") }
        // NetEase mirror
        maven { setUrl("https://mirrors.163.com/maven/repository/maven-public/") }
```

它看起来应该像下面的截图：

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image13.png)

4. **保存并应用更改**

此时，保存文件，然后点击右上角的 `Try Again`。Android Studio 将重新运行下载。等待几分钟。当控制台显示 `BUILD SUCCESSFUL` 时，表示环境设置已完全完成，我们可以开始编码。

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image14.png)

## 2.6 了解项目结构

项目创建成功后，左侧会出现 **Project（项目）** 面板。切换到 **Android** 视图（默认），你将看到类似如下的关键目录：

```text
app/
├── manifests/
│   └── AndroidManifest.xml            <- app "ID card", declares app name and entry Activity (MainActivity)
│
├── java/
│   └── com.example.myapplication1/
│       ├── MainActivity.kt            <- app entry, builds UI with Jetpack Compose
│       │
│       └── ui/                        <- controls the overall UI style (colors, fonts)
├── res/
│   ├── drawable/                      <- image resources (for example ic_launcher.png)
│   ├── mipmap/                        <- app icon
│   ├── values/                        <- text, color, theme styles
│   │   ├── colors.xml
│   │   ├── strings.xml
│   │   └── themes.xml
│   └── xml/                           <- system-related config files (not UI)
└── build.gradle (Module: app)         <- app build config (usually untouched at beginner stage)
```

作为初学者，我们通常只需要关注三个文件：

- `MainActivity.kt`：控制行为并决定“屏幕上显示的内容”
- `AndroidManifest.xml`：注册组件并决定“应用从哪里开始”
- `Theme.kt`：定义视觉外观

# 3 安卓应用开发

在前两章中，我们已经了解了安卓应用是什么，并掌握了两个关键工具：Trae 和 Android Studio。从本节开始，我们将不再停留在纸面讨论，进入实际操作。我们将采用 氛围编程 模式，从零开始构建一个非常受欢迎的解压应用——**电子木鱼**。它非常符合“Vibe”主题（简单而轻松），同时也覆盖安卓开发的三个核心部分：**界面交互（点击）、数据存储（功德计数）和多媒体（音效）**。

现在，跟着一起操作，并向 AI 发送第一个指令。

## 3.1 第一个“主提示”：从零到一

在 氛围编程 模式下，我们不需要像传统开发那样先创建布局文件再编写逻辑代码。我们需要做的是 **一次性清晰描述需求，让 AI 生成第一个可运行的原型**。

打开我们刚在 Trae 中创建的项目目录，在右侧的聊天面板中输入以下提示：

```text
You are a senior Android development expert. Please rewrite the current MainActivity.kt and turn it into an "Electronic Wooden Fish" app. Requirements:
1. The screen background is black.
2. Display a wooden fish graphic in the center of the screen, moderate in size, in white.
3. Show a line of white text above it: "Merit: 0".
4. When the wooden fish in the center is tapped, the number increases by 1 and a simple scale animation effect appears (simulating the feeling of knocking).
5. Use Jetpack Compose.
```

发送完后，Trae 会开始分析你的项目结构。几秒钟后，它会直接生成 `MainActivity.kt` 的完整代码。

1. 从其反应中，我们可以看到其推理逻辑和交互逻辑
2. 我们可以直接看到代码的哪些部分被重写
3. 如果对结果不满意，可以回滚到之前的版本

![](../../../../zh-cn/stage-3/跨平台/android-app/images/image15.png）

## 3.2 运行与预览（模拟器调试）

目前，人工智能已经完成了第一轮开发。但请记住，我们在Trae中看到的只是代码“蓝图”，而非真正的互动应用。Trae本身无法直接运行Android应用，因此我们需要依赖Android Studio提供的**虚拟设备模拟器**。这就像把你的电脑屏幕变成了一部虚拟的Android手机，让我们能够立即安装代码并查看真实结果。

接下来，让我们配置这个“虚拟电话”。

**步骤1：创建模拟器**

回到Android Studio，找到并点击右侧工具栏的**设备管理器**。如果找不到，就用`View -> Tool Windows -> Device Manager`打开它。

在面板中，点击**添加新设备**，然后选择**创建虚拟设备**进入设备选择窗口。

![](../../../../zh-cn/stage-3/跨平台/android-app/images/image16.png）

![](../../../../zh-cn/stage-3/跨平台/android-app/images/image17.png）

在硬件选择窗口中，选择**手机**，然后选择**智能手机**（中等屏幕大小），或者你偏好的其他设备配置文件，比如Pixel，然后点击**下一步**。

![](../../../../zh-cn/stage-3/跨平台/android-app/images/image18.png）

**步骤2：配置系统镜像**

在**系统映像**对话框中，选择**API 36.1**。如果尚未下载，先点击**下载**，下载完成后选择，然后点击**完成**完成**。

![](../../../../zh-cn/stage-3/跨平台/android-app/images/image19.png）

**步骤3：启动模拟器**

成功创建后，你的新手机会出现在设备管理器列表中。点击右侧的**三角形播放按钮**。稍等一会儿，会出现一个手机形状的窗口——这是你的安卓模拟器。

![](../../../../zh-cn/stage-3/跨平台/android-app/images/image20.png）

![](../../../../zh-cn/stage-3/跨平台/android-app/images/image21.png）

**步骤4：运行应用**

现在到了神奇时刻。确认模拟器已启动并显示桌面，然后点击Android Studio顶部工具栏中显眼的**绿色“运行三角形**（或使用快捷方式`Shift + F10`）。Android Studio会自动编译Trae编写的代码，打包成应用，并安装到模拟器中。

几秒钟内，你应该会看到模拟器屏幕亮起，中央显示一个白色木制鱼图案，上面写着“Merit： 0”。试着点击它，看看数字是否增加，动画是否正常。这是你的第一个安卓应用。

![](../../../../zh-cn/stage-3/跨平台/android-app/images/image22.png）

![](../../../../zh-cn/stage-3/跨平台/android-app/images/image23.png）

## 3.3 优化迭代（添加素材和音效）

目前，我们的应用已经有一个基本形状：点击会增加数字。但它仍然是一个“静音”的白色几何图形，缺乏乐趣。接下来，我们将通过添加真实的图像和敲击声效果，让电子木鱼更具沉浸感。

**这正是 氛围编程 模式最有吸引力的部分。** 在传统开发中，添加音效和更复杂的动画通常是初学者的噩梦。你需要管理 `MediaPlayer` 资源的加载和释放（否则可能会发生内存泄漏），还要计算动画曲线。而在 氛围编程 模式下，你根本不用关心这些底层细节。你只需要像导演一样告诉 AI：“点击时更换道具并添加音效”，实现就会立即出现。

**步骤 1：准备资源**  
你需要一张木鱼图片 (`png`) 和一个敲击音效 (`mp3`)。

- **图片资源**：将准备好的 `white_muyu.png` 复制到 `app/src/main/res/drawable`  
- **音频资源**：在 Android Studio 中，在左侧项目面板右键 `res` 文件夹，选择 `New -> Android Resource Directory`，将资源类型选择为 **raw**，点击确定，然后将 `voice.mp3` 复制到新建的 `res/raw` 文件夹中。 _(注意：如果你计划商业发布，请确保你对所有资源拥有合法权利。)_

这是我为你找到的图片和音效资源。如果自己查找不方便，可以直接使用它们。

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image24.png)

敲击音效下载链接：https://www.aigei.com/s?q=木鱼&type=sound  
选择第一个 1 秒的音效。

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image25.png)

**步骤 2：发送迭代指令**

准备好资源后，回到 Trae。Trae 会再次修改代码，并为你处理音频加载和动画逻辑。你只需要告诉它使用哪些资源。输入如下提示:

```text
I have added the assets. The image path is res/drawable/white_muyu.png and the sound effect path is res/raw/voice.mp3. Please update the code:
1. Replace the wooden fish icon in the center with my image.
2. Play the knocking sound every time the wooden fish is tapped.
3. When tapped, show a temporary "+1" text above the wooden fish, then let it float upward and disappear (like floating score text in games).
```

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image26.png)

**步骤 3：验证结果**

在 Trae 完成代码修改后，返回 Android Studio 并再次点击绿色运行按钮（重新运行）以重启模拟器。此时，你的应用会焕然一新。尝试连续点击 —— 你应该会听到清脆的“tok tok”声音，并看到浮动的“Merit  1”文字跳出来。这标志着从“演示”到“产品”的关键过渡完成。

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image27.png)

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image28.png)

## 3.4 如果出现 Bug 怎么办？（与 AI 的调试循环）

AI 生成的代码并不保证第一次就完美无瑕，就像顶尖工程师也无法保证一击即中。然而在 氛围编程 模式下，Bug 不再是阻碍你的墙壁；它们变成你与 AI 协作的垫脚石。

**案例 1：应用崩溃**

假设点击运行后应用立即崩溃，或者点击木鱼没有声音。传统方法中，你需要搜索错误代码，浏览数十个技术论坛，并阅读大量难懂的英文帖子。在 氛围编程 模式下，你只需做一件事 —— **做信息快递员**。

**步骤：**

1. **打开日志**：在 Android Studio 底部找到 **Logcat** 面板（小猫图标）。
2. **定位错误**：你会看到滚动的日志，**红色行**通常是关键错误。
3. **复制并粘贴**：选择红色的英文错误文本，复制并粘贴到 Trae：“我在运行时遇到这个错误。请帮我修复它。”
4. AI 可能立即告诉你：“这是因为 `AndroidManifest.xml` 中未声明振动权限”，然后给出修复后的代码。你只需点击应用并继续。

**案例 2：应用运行，但体验感不好**

有时应用不会崩溃，但仍然让人感觉不爽。例如，当快速点击木鱼时，你可能会发现新的“ 1”动画要等到上一个“ 1”完全消失后才显示。这会让反馈感延迟且不尽如人意。你无需自己学习多线程或动画队列。你只需清楚地向 AI 描述这种不适感。

将这个“高级指令”发送给 Trae：

```text
Please modify the current animation logic to solve the "fast tapping does not trigger" problem.
Current issue: it seems there is only one animation state, so I have to wait until the previous "+1" completely disappears before another click responds.
Requirements:
1. Replace the single animation state with a mutableStateListOf-based list.
2. Every time the wooden fish is tapped, add a new "+1" instance immediately to the list (with its own ID and initial position), regardless of whether the previous animation has finished.
3. In the UI, iterate through this list so each "+1" runs its own upward-floating + fade-out animation independently.
4. After a "+1" animation finishes, automatically remove it from the list to prevent memory leaks.
Please directly provide the updated MainActivity.kt code.
```

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image29.png)

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image30.png)

## 3.5 最终效果展示

在前面的步骤中，我们已经完成了一个可以看见和听见的电子木鱼。为了让它更接近可发布的应用，我们将通过最后一次迭代添加**触摸反馈**和**自定义功能**。我们将实现两个核心功能：第一，**振动反馈**，让每次点击手机电机会产生物理反应，大大提升沉浸感；第二，**自定义文字**，允许用户修改屏幕上的文字，例如将“Merit  1”改为“Salary  1”或“Trouble -1”。

将以下精心设计的提示发送给 Trae。它将一次性处理对话逻辑、状态切换和硬件交互：

```text
Role: You are an Android Jetpack Compose expert.
Task: Please add "custom text" and "vibration feedback" to the existing Electronic Wooden Fish app.
Requirements:
1. Haptic Feedback
Whenever the user taps the wooden fish, in addition to sound and animation, call the phone's haptic feedback (using LocalHapticFeedback.current) to give a light tactile response.
2. Custom Text Feature (UI and interaction)
Entry: Add a small edit icon next to the top text such as "Merit +1" (you can use Icons.Default.Edit).
Dialog logic: When the icon is tapped, show a dialog (Dialog/AlertDialog).
    Dialog title: "Modify Content"
    Input: Allow the user to enter the text they want to accumulate (default is "Merit")
    Value choice: Below the input, provide two options (for example RadioButton or toggle) so the user can choose "+1" or "-1"
    Save button: After clicking save, close the dialog and apply the new settings to the home screen
    Data refresh: If the user updates the content, reset the top counter to 0 and start counting from zero again
3. Effect update
After saving, both the top counter text and the floating animation text shown when tapping the wooden fish should change to the user's custom format.
    The floating text size should not exceed the size of the top counter text
    Example: if the user enters "Salary" and chooses "+1", the top counter logic becomes +1 and the floating text becomes "Salary+1"
    If the user enters "Trouble" and chooses "-1", the top counter logic becomes -1 and the floating text becomes "Trouble-1"
4. Technical requirements:
Make sure the new state (text and number) correctly affects the animation.
Please directly provide the full updated MainActivity.kt while keeping the previous sound and animation logic unchanged.
```

![](../../../../zh-cn/stage-3/跨平台/android-app/images/image31.png）

# 4 实设备调试与润色

模拟器很方便，但无法模拟真实手机震动或完全反映真实触控延迟。为了获得最准确的“手感”，我们需要在真实的安卓手机上安装该应用。以下是两种连接方式可供选择：

1. **无线调试（Wi-Fi）**：无需数据线，便于日常检查。但你的电脑和手机必须连接**同一个Wi-Fi网络**。
2. **USB有线调试**：更稳定，不易断线，适合网络不佳或初次安装失败时使用。

## 4.1 无线调试

这是Android 11及以上版本上最方便的方法。

**步骤1：准备手机**

1. 确保手机和电脑连接同一个Wi-Fi。
2. 打开**开发者选项**并启用**无线调试**。
3. 点击**无线调试**输入详情，然后选择**与二维码设备配对**。你的手机会打开扫描视图。

![](../../../../zh-cn/stage-3/跨平台/android-app/images/image32.png）！[](../../../../zh-cn/stage-3/跨平台/android-app/images/image33.png）

**步骤2：在电脑上配对**

1. 回到Android Studio，点击顶部工具栏的设备选择器。
2. 从下拉菜单中选择**使用Wi-Fi配对设备**。
3. 屏幕上会弹出二维码。

![](../../../../zh-cn/stage-3/跨平台/android-app/images/image34.png）

**步骤3：扫描连接**

1. 用手机扫描电脑屏幕上的二维码。
2. 手机和电脑都应显示“配对成功”。
3. 此时，Android Studio 的顶部设备栏会自动显示你的手机型号（例如 `Google Pixel 8`）。

![](../../../../zh-cn/stage-3/跨平台/android-app/images/image35.png）

4. 点击▶️运行应用

![](../../../../zh-cn/stage-3/跨平台/android-app/images/image36.png）

## 4.2 USB 有线调试

如果无线连接不稳定，或者网络复杂，使用有线连接总是最可靠的解决方案。虽然不那么方便，但传输速度最快，几乎不会断线。

### 4.2.1 在 Android Studio 中准备 USB 驱动（仅限 Windows）

Mac用户可以跳过这一步，因为macOS通常能直接识别手机。Windows用户需要确保电脑能识别Android手机，通常需要安装Google的USB驱动：

1. 在 Android Studio 中，点击 `Tools -> SDK Manager`（或在 `Settings -> Languages & Frameworks -> Android SDK` 下找到）
2. 切换到 **SDK 工具**标签页
3. 检查**Google USB驱动**并点击**应用**下载并安装

![](../../../../zh-cn/stage-3/跨平台/android-app/images/image37.png）！[](../../../../zh-cn/stage-3/跨平台/android-app/images/image38.png）

![](../../../../zh-cn/stage-3/跨平台/android-app/images/image39.png）

### 4.2.2 下载与你真实设备相同的SDK版本

**步骤1：检查手机的安卓版本**

以OPPO手机为例：打开设置 -> 关于手机 ->查看Android版本（示例中是Android 12）。

![](../../../../zh-cn/stage-3/跨平台/android-app/images/image40.png）

**步骤2：在Android Studio下载该Android平台版本**

1. 在Android Studio中，点击`Tools -> SDK Manager`
2. 保持在默认的**SDK Platforms**标签页
3. 选择Android 12.0并点击应用下载

![](../../../../zh-cn/stage-3/跨平台/android-app/images/image41.png）

### 4.2.3 启用手机开发者模式

打开手机设置，进入开发者选项，开启**USB调试**。

![](../../../../zh-cn/stage-3/跨平台/android-app/images/image42.png）

### 4.2.4 在手机上安装USB驱动授权

此时，拿起手机。它应该会显示一个重要的安全对话框：“允许USB调试？”务必勾选**始终允许**，然后点击**允许**或**OK**。这是赋予计算机调试控制权的密钥授权。

![](../../../../zh-cn/stage-3/跨平台/android-app/images/image43.png）

### 4.2.5 在手机上运行应用

1. 在Android Studio的顶部设备选择器中，你现在应该能看到你的手机型号（例如`OPPO-PDKM00`）
2. 点击▶️运行。你的手机会显示“允许USB调试？”对话框;勾选“始终允许”并确认
3. 应用会自动安装并启动

现在试着用手机敲敲木鱼，感受真实的振动马达响应。这就是完整的Vibe CoDing体验。

![](../../../../zh-cn/stage-3/跨平台/android-app/images/image44.png）！[](../../../../zh-cn/stage-3/跨平台/android-app/images/image45.png）！[](../../../../zh-cn/stage-3/跨平台/android-app/images/image46.png）

# 5 将应用打包为APK

代码完成，实际设备测试也有效。现在我们需要“把应用从Android Studio取出”，转成一个你可以发送给朋友安装的文件。这个过程叫做**打包**。在Android开发中，打包有两种完全不同的模式，我们根据使用场景选择。

## 5.1 打包调试版本（用于快速共享）

如果你只是想和朋友分享应用快速试用，或者发给测试手机验证，**调试版本**是最快的选择。它就像一个“草稿”——功能完整，但没有正式签署，所以不能提交到应用商店。

**步骤非常简单：**在Android Studio顶部菜单中，找到`Build`，将鼠标悬停在`Generate App Bundles or APKs`，然后从子菜单点击`Generate APKs`。

![](../../../../zh-cn/stage-3/跨平台/android-app/images/image47.png）

根据项目大小，等待大约5秒。在Android Studio右下角的控制台区域会出现一个提示。点击蓝色的`locate`链接，输出文件夹会自动打开。名为`app-debug.apk`的文件是我们想要的包。

你可以直接通过微信或QQ发送到任何安卓手机，收件人可以安装并使用。注意，调试不是正式发布版本。

![](../../../../zh-cn/stage-3/跨平台/android-app/images/image48.png）

![](../../../../zh-cn/stage-3/跨平台/android-app/images/image49-sidebar-cropped.png）

## 5.2 打包发布版本

如果您想将应用发布到应用商店（如 Google Play 或华为 AppGallery），或避免安装时出现“不安全应用”警告，必须打包 **Release 版本**。该版本需要独特的 **数字签名**，类似于防伪印章，证明您开发了该应用且未被篡改。

> 签署的核心目的
>
> - 确定发布者的身份：因为同包名的应用可以替代已安装的程序，签名可以防止该程序被滥用
> - 确保应用完整性：签名过程涵盖包中的每个文件，确保文件不会被替换

Android 应用签名就像加盖印章。印章一旦加上，应用和开发者就紧密绑定：应用属于你，你对此负责。别人不能冒充你，你也不能冒充别人。

**步骤 1：启动签名向导**

在顶部菜单中，选择 `Build`，然后点击 `Generate Signed Bundle / APK`。在弹出的窗口中，你会看到两个选项：

- Android App Bundle (`.aab`)：Google Play 要求使用，体积更小，但不能直接安装到手机
- APK：标准安装包，可以直接安装
_为了演示，我们先选择 APK，然后点击下一步。_

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image50.png)![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image51.png)

**步骤 2：创建数字密钥（KeyStore）**

这里是初学者最容易卡住的地方。由于这是你第一次发布打包，你需要创建一个新的 **keystore**。在 `Key store path` 下点击 **创建新密钥**。

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image52.png)

在弹窗中，填写所需信息，类似于注册帐号。我们强烈建议 keystore 密码和 key alias 密码 **保持相同**，并且 **务必认真记录**。如果忘记此密码，你的应用将来再也无法更新。

完成后点击确定。你将回到上一个界面，你刚填写的密钥信息将自动填入。

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image53.png)![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image54.png)

**步骤 3：生成正式安装包**

点击下一步，在 Build Variants 中选择 **release**，最后点击 **创建**。

等待片刻，Android Studio 会在右下角再次显示“生成签名 APK 成功”的提示。点击 **定位**，这时你将在文件夹中看到已签名的正式安装包（通常命名为 `app-release.apk`）。此文件即为你作为开发者交付的最终产品。

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image55.png)

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image56.png)![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image57.png)

# 6 官方发布到应用商店

当你的应用开发完成并且 Release 包准备好后，下一步就是发布它，让更多人下载和使用。当前主要的分发渠道分为两类：**国内 Android 应用商店**和**海外应用商店（Google Play）**。

## 6.1 发布到国内市场

中国大陆的 Android 生态比较特殊，没有单一官方商店（因为 Google Play 无法直接访问）。市场被分为 **手机厂商应用商店** 和 **第三方平台**。主要的 **厂商商店** 包括华为、小米、OPPO、vivo、魅族、三星等。由于这些商店预装在设备上，因此流量最大。主要的 **第三方平台** 包括腾讯应用宝和 360 手机助手。

### 6.1.1 核心难点：个人开发者的“拦路石” 

在注册账号之前，有一件非常重要的事情你必须知道：**国内应用市场对个人开发者非常严格**。

目前，几乎所有主要的国内应用店（华为、小米、OV、MyApp等）**都要求**提交*软件版权注册证书*。

![](../../../../zh-cn/stage-3/跨平台/android-app/images/image58.png）！[](../../../../zh-cn/stage-3/跨平台/android-app/images/image59.png）

- **这是什么？** 这是一份法律文件，证明该应用属于你。
- **获取费用**：需通过版权局申请。自行申请通常需2-3个月;通过代理机构加快处理费用可能从数百元到超过一千元不等。
- **当前现实**：没有此证书，您的申请很可能会通过审核，甚至无法创建申请条目。此外，新闻、财经和医疗保健等类别也可能要求提交ICP申请或其他资格认证。

所以如果你的应用只是个人练习项目或小型工具，不想花时间和金钱申请这个证书，我建议直接跳到第6.2节，考虑Google Play，或者直接与朋友分享APK文件。

### 6.1.2 注册开发者账户

如果您已经准备好所需的资格认证，或决定在国内市场发表，第一步是注册账户。各大平台流程相似，个人通常需身份验证，公司则需营业执照验证。

以下是主要应用市场的开发者平台网址：

腾讯开放平台：https://open.tencent.com/

360 开放平台：http://dev.360.cn

百度开发者平台：http://app.baidu.com

小米开放平台：https://dev.mi.com

华为开发者联盟：http://developer.huawei.com/consumer/cn

阿里巴巴开发者平台：http://open.uc.cn 
阿里巴巴发行版集成了万豆家、阿里九友、PP助理、UC App Store、神马搜索和云OS App Store。您只需注册一个阿里巴巴开发者账号。

三星开发者平台：http://support-cn.samsung.com/App/DeveloperChina/Home/Index

OPPO开发者联盟：http://open.oppomobile.com

vivo开发者联盟：https://dev.vivo.com.cn

联想开放平台：http://open.lenovo.com

魅族开发者联盟：http://open.flyme.cn

Gionee开发者联盟：https://open.appgionee.com

**以腾讯MyApp为例：**访问腾讯开放平台并点击注册。建议直接用QQ账号登录。注意，一旦QQ账号绑定，解绑较难，因此最好使用专用的工作QQ账号。按照提示操作，选择“个人开发者”或“企业开发者”，上传身份证照片，完成人脸验证。通过验证后，点击**创建应用**开始。

![](../../../../zh-cn/stage-3/跨平台/android-app/images/image60.png）！[](../../../../zh-cn/stage-3/跨平台/android-app/images/image61.png）

![](../../../../zh-cn/stage-3/跨平台/android-app/images/image62.png）

### 6.1.3 提交流程及所需材料

账户审核获批后，你可以创建应用并提交审核。你需要准备以下“四件套装”：

1. **安装包**：第5章中打包的 **Release APK**
2. **文字信息**：
3. **应用名称**：不得包含敏感词
4. **一句话简介**：在20个汉字以内，简洁明了（例如：“一个轻松的电子木鱼应用”）
5. **详细描述**：用200个汉字介绍应用的功能和使用场景
6. **视觉素材**：
7. **应用图标**：高清PNG，通常为512x512
8. **应用截图**：准备4-5张清晰的应用使用截图，最好覆盖主要页面，通常尺寸一致，如1080x1920
9. **资质证明**：上传软件著作权登记证书的扫描件

**提交与审核**：填写完所有信息并上传APK后，点击 **提交审核**。审核周期一般为1-3个工作日。期间请注意邮箱或短信。审核人员可能因截图不清晰、描述不规范或缺少必要资质而拒绝提交。此时需根据反馈进行修改并重新提交。

## 6.2 发布到海外市场（Google Play）

如果您不想处理国内应用市场的软件著作权证书和备案的复杂性，或者您的目标用户是全球用户，Google Play 是个人开发者的最佳选择。

### 6.2.1 准备工作

- **Google账户**：普通Gmail账户即可
- **$25注册费用**：这是**一次性终身费用**，需使用支持美元支付的信用卡（Visa / Mastercard）
- **可靠的网络访问**：需要能够顺利访问Google Play Console
- **正式安装包**：注意Google Play要求 **.aab**（Android App Bundle）格式，而非APK。在Android Studio中打包时选择Android App Bundle。步骤与打包APK几乎相同。

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image63.png)

### 6.2.2 Google Play Console 发布流程（概览）

由于Google Play注册和支付仍有一些门槛（例如需要海外信用卡），本教程暂不提供逐步截图。但以下是常见的四步流程：

**步骤1：创建应用并进入控制台**

点击 `Create app`，填写应用名称（`Electronic Wooden Fish`），选择英语为语言，选择应用类型为App和免费，然后勾选协议。完成后即可进入后台。

**步骤2：装饰商店页面**

这是用户的第一印象。需要上传准备好的应用 **图标**（512x512）和 **特色图**（1024x500）。至于英文描述，可以直接咨询Trae：**“请帮我写一篇用于在Google Play发布电子木鱼的英文描述，语气轻松轻快。”** AI通常写得比直接翻译更自然。

**步骤3：隐私和内容评级**

- 隐私政策：搜索“App Privacy Policy Generator”并生成免费链接进行粘贴
- 内容评级：填写一个简单问卷（例如是否涉及暴力或赌博）。电子木鱼通常获得一般3级评分。

**步骤4：上传并发布**

在 `Production` 菜单下，点击 `Create new release`，上传您的 `.aab` 文件，保存并提交审核。Google Play的审核通常很快（1-3天）。审核通过后，您的应用即可全球下载。

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image64.png)

_如果你已经完成了开发者账号注册，这个视频教程可以指导你完成剩下的流程：_ [完整工作流程：将 Android 应用上传到 Google Play](https://www.bilibili.com/video/BV16REQzGEnk/?share_source=weixin&vd_source=b42f227a4f2d413fbde18499d83227cf)

# 7 最终注意事项

这就把教程带到了结尾。看到你在手机上亲手创建的电子木鱼，我想知道你现在的感受如何。

作为一名受过软件工程训练的人，在今天这个快速发展的 AI 时代，我实际上感到相当感慨。过去，我们通过厚厚的编程书籍学习复杂的语法，苦于环境搭建，每天花上一半时间与红色错误信息作斗争。但是时代已经变了，现在我们越来越多地学习如何指导 AI。

通过这次 氛围编程 的实践，你已经体验了完整的 Android 应用开发流程。技术门槛确实在降低。我们不再需要整天苦读枯燥的代码，可以将更多精力放在决定**要构建什么**上。但无论工具多强大，它们仍然只是工具。不要让这个应用在你的手机上蒙尘。继续调试它，把它弄坏再修复。只有当你开始有自己的想法并将其实现时，你才真正跨过了门槛。

如果本教程帮你感受到“开发一个应用其实并不难”，那么我很荣幸能帮助带入一位新一代的开发者进入开发世界。

我真的很期待你的下一个作品。继续努力吧！

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image65.png)

**_希望你在 Android 开发的世界里玩得开心！_**

# 参考资料

CSDN: [如何打包/构建 Android Studio 项目 (2024-03-04)](https://blog.csdn.net/GenuineMonster/article/details/136443130?ops_request_misc=&request_id=&biz_id=102&utm_term=android studio 打包 APK 并分享&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduweb~default-1-136443130.142^v102^pc_search_result_base4&spm=1018.2226.3001.4187)

CSDN: [Android Studio 安装与配置](https://blog.csdn.net/Changersh/article/details/149838228?ops_request_misc=&request_id=&biz_id=102&utm_term=android studio安装及配置&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduweb~default-0-149838228.142^v102^pc_search_result_base4&spm=1018.2226.3001.4187)