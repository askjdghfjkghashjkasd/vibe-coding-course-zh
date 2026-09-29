# 如何建立你自己的个人网站和学术博客——GitHub Pages 静态部署

# 1.什么是个人网站和学术博客？

在本教程中，我们将完整地进行一个闭环：**从寻找现有网站模板，到将其修改为Elon Musk的个人主页，最后免费在线发布**。

对于这个教程，你至少应该具备：

* **一台电脑**（Windows或Mac）
* **您的GitHub账户**（用于存储网站代码并提供免费托管）
* **Trae 已安装**（你的AI编程伙伴）
* **一个Git环境**
* **Ruby环境**

## 1.1 什么是学术个人主页？

**学术个人主页**是你在互联网上的私人领地。

与微信时刻、知化或LinkedIn不同，它不依赖任何平台的推荐算法，平台关闭也不会消失。这是一个长期稳定的**个人展示空间**，可以被谷歌和谷歌学术收录。通常包含你的个人简介、出版物、项目和技术博客。

![](../../../../zh-cn/stage-3/personal-brand/personal-website-blog/images/image1.png）

## 1.2 为什么要自己建网站？

在Vibe Codining的开发模式中，我们不再需要像十年前那样翻阅厚重的HTML/CSS书籍。有了人工智能，构建网站的角色从“挣扎中的程序员”转变为“网站主编”：

1. **你（编辑/私信）**：决定网站的语气和内容。例如：“把马斯克的火星殖民PPT放这里”，或者“把这个按钮改成特斯拉红。”
2. **Trae（AI工程师）**：负责繁重的实现工作。它将你的自然语言指令转化为代码，包括布局、配色方案和移动端适配。
3. **GitHub Pages（展厅）**：提供免费服务器和域名，让全球用户都能看到你的作品。

**为什么学术界或技术人员值得拥有它？**

* **外部（影响力建立）**：它是**“永青名片”。** 申请博士项目、工作或合作项目时，整洁的个人主页通常比PDF简历更具说服力。
* **内部（知识积累）**：它是你的**“第二大脑”。** 你可以用它记录课程笔记、技术思维，构建自己的知识体系。
* **未来（可被发现）**：搜索引擎喜欢结构化内容。有了首页，当人们搜索你的名字时，**你定义的内容**可以先显示，而不是同名的无关用户。

## 1.3 建立个人网站的四种典型方法

实际上，建立网站的方法有无数种。这里我们只介绍四种最主流的：

**方法1：用HTML / CSS / JS从零开始手写**
这是传统的计算机科学路线。你逐个字符写代码。优点是极高的灵活性。缺点是入门门槛非常高，调整CSS时很容易卡住。这对我们这些想专注于内容的人来说并不理想。

![](../../../../zh-cn/stage-3/personal-brand/personal-website-blog/images/image2.png）

**方法2：视觉化网站建设工具，如Wix / WordPress**
这就像用积木建造。优点是可以轻松拖拽编辑。缺点是它通常需要付费，容易生成臃肿的代码，缺乏学术极客的感觉，且难以深度定制。

![](../../../../zh-cn/stage-3/personal-brand/personal-website-blog/images/image3.png）

**方法三：基于GitHub的模板（静态站点生成器）**
这是学术界和极客社区中**最推荐**的主流路线。我们直接分支由他人编写的成熟模板，比如基于Jekyll或Hugo的模板，然后只修改配置文件和内容。

![](../../../../zh-cn/stage-3/personal-brand/personal-website-blog/images/image4.png）

**方法4：氛围编码（AI视觉生成流程）**
对于拥有强大多模态视觉理解的AI代理，你只需在线看到喜欢的网站风格，截图，然后告诉AI：“基于这种风格为我写一个网页。”AI随后可以分析这些视觉元素，并为你生成底层代码。

![](../../../../zh-cn/stage-3/personal-brand/personal-website-blog/images/image5.png）

**本教程中的选择：GitHub Pages 学术模板 AI 修改。**
原因很简单：

* **零成本**：无需购买服务器，无需购买域名。
* **高质量**：模板通常由顶级开发者设计，风格简约，结构专业，加载速度快。
* **易于维护**：你主要写Markdown，类似于Feishu Docs或Notion，AI帮助生成网页。

## 1.4 本教程的完整路线图

为了让配置过程更直观、不那么无聊，我们将使用一个有趣的案例：**为Musk构建学术主页**。

虽然埃隆·马斯克不是大学教授，但他发表了许多公开的“技术白皮书”，如*超高铁Alpha*，并且拥有许多著名项目，如SpaceX和特斯拉。我们将使用这些材料作为测试数据，并结合Trae的氛围编程工作流程，走访可重复使用的网站建设路线：

1. **找到骨架**：在GitHub上找到高质量的网站模板，并将其分叉到自己的仓库中。
2. **准备环境**：本地拉取代码并配置Trae，让AI能够读取你的项目。
3. **用AI迭代**：用埃隆·马斯克替换模板中的占位者，上传简历，把“发表列表”改成“技术白皮书展示”，甚至让AI把网站颜色改成“火星红”。
4. **在线部署**：将修改后的代码推回GitHub，立即获得可访问的网站URL。

本部分仅负责绘制整体情况。目前，请记住主旨：
**分叉模板 -> AI翻新 ->推送上线**
在接下来的章节中，我们将一起讲解每一步。

# 2.环境准备

## 2.1 本教程中使用的工具

整个建造过程使用四种工具或资源，分别扮演设计师、承包商、土地所有者或物流系统的角色。

* **电脑**：Windows 或 Mac 均可。与通常需要高内存的 Android 开发不同，网页开发非常轻量，在普通办公笔记本上也能运行流畅。
* **Trae**：这是你的 **AI 编程伙伴** 和核心生产力工具。在 氛围编程 模式下，你不需要掌握 HTML 或 CSS 语法。你主要用自然语言告诉 AI，比如“把导航栏改成黑色”或者“这里放马斯克的照片”，让它为你编写和修改代码。
* **GitHub 账号**：这是你的 **免费服务器和代码仓库**。我们需要它来存储所有网站文件。最重要的是，我们将使用 **GitHub Pages** 免费将代码变成全球可访问的 URL，无需购买服务器或域名。
* **Git 环境**：这是后台的 **快递员**。虽然我们在 Trae 中本地写代码，但 Git 是把代码从你的电脑推送到 GitHub 的工具。你不需要掌握 Git 命令，Trae 可以帮助调用它们，但必须先安装 Git。
* **Ruby 环境**：这是本地的 **网页工作坊**。因为本教程中的学术模板使用 Jekyll，它运行在 Ruby 上，所以我们需要在本地安装 Ruby，以便在推送上线前预览网站。

## 2.2 下载 Trae

**Trae** 是我们进行 氛围编程 的主要战场。你可以把它看作一个 **内置超级 AI 的代码编辑器**。与传统冷冰冰的编辑器不同，它就像一个经验丰富的程序员坐在你旁边，随时准备提供帮助。

* **下载地址**：访问官方网站 [https://www.trae.cn](https://www.trae.cn)，下载适合你操作系统的版本，Windows 或 Mac。
* **安装**：安装非常简单，就像安装微信或 QQ。一键双击安装包，然后点击“下一步”直到完成。

准备好这个工具后，在接下来的实操步骤中，我们不再需要盯着枯燥的代码面板。我们可以直接在这里打开项目，并在右侧聊天面板用自然语言告诉 AI，最好用中文，让它帮助我们编写代码、修复错误，甚至重构整个页面。

![](../../../../zh-cn/stage-3/personal-brand/personal-website-blog/images/image6.png)

## 2.3 下载 Git

**什么是 Git？**
如果 Trae 是负责在 氛围编程 中编写代码的 AI 工程师，那么 **Git 就是负责运输代码的快递员**。你需要它将电脑上写的代码打包，并安全地推送到你的云端仓库 GitHub。没有它，你的网站只能在自己的电脑上运行，别人无法访问。

过去，你需要访问官方网站，下载安装包，并手动配置环境变量，非常麻烦。现在，我们可以直接让 Trae 帮助检测并安装。

**步骤 1：检查是否已安装 Git**

打开 Trae，在右下角聊天面板输入以下指令：

```markdown
Please help me check whether Git is already installed on this computer. Please run the `git --version` command in the terminal.
```

* **情况 A（已安装）**：如果你看到类似 `git version 2.xx.x` 的内容，恭喜你。你可以直接跳过安装步骤。
* **情况 B（未安装）**：如果你看到“command not found”或一组红色错误信息，请继续以下操作。

![](../../../../zh-cn/stage-3/personal-brand/personal-website-blog/images/image7.png)

**步骤 2：AI辅助安装**

不要关闭 Trae。继续在聊天面板中输入：

**说明（Windows 用户）：**

```markdown
I have not installed Git. Please write the command that uses the `winget` command-line tool to install Git automatically, and tell me how to run it in the terminal.
```

**说明（Mac 用户）：**

```markdown
I have not installed Git. Please tell me how to quickly install Git through terminal commands, for example using `git` or `brew`.
```

Trae会给你一个指令，通常是类似`winget install --id Git.Git`@这样的。

你只需点击代码块中的**在终端运行**按钮，或者复制到底部的终端并按回车。它会自动帮你下载并安装Git。

如果你仍然觉得AI辅助流程不够完善，可以参考这个教程进行手动下载和安装：
[Git 下载与安装教程]（https：//blog.csdn.net/weixin_41293671/article/details/144255269？ops_request_misc=elastic_search_misc&request_id=63236900b52320a7beb177787ba97f07&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~baidu_landing_v2~default-5-144255269-null-null.142^v102^pc_search_result_base4&utm_term=git下载安装&spm=1018.2226.3001.4187）

## 2.4 安装Ruby环境

在正式开始写代码之前，我们还需要最后一块拼图。本教程中使用的学术主页模板是用Jekyll构建的，而Jekyll本身基于Ruby编程语言。

为了在将代码推送到 GitHub 让全世界看到之前，先在自己的电脑上预览和调试“翻新效果”，我们必须在电脑上安装一个 Ruby 环境。可以把这看作是雇佣一个懂 Ruby 的解释器。别担心，你不需要学会写 Ruby。你只需要安装它，Trae 就能完成剩下的。

### 2.4.1 Windows 安装

**步骤1：使用家用镜像下载安装程序**

对于Windows用户，https://rubyinstaller.org/downloads/ 官方网站提供一键安装程序，但由于网络不同，了解一些技巧会有帮助。初学者的官方推荐通常是**`Ruby+Devkit 3.X.X (x64)`**，因为它包含了所需的工具链。

**初学者提醒**：实际上，直接从官网下载可能会很慢甚至失败。我们强烈建议使用[RubyInstaller for Windows - China mirror]（https://rubyinstaller.cn/）的家庭镜像，通常会快得多。

![](../../../../zh-cn/stage-3/personal-brand/personal-website-blog/images/image8.png）

**步骤2：运行安装**

双击下载的安装程序。在安装向导中，务必勾选**“将Ruby可执行文件添加到你的PATH。”**这是最重要的步骤。否则电脑将无法“找到”你刚安装的解释器。

检查完后，继续点击**下一步**以完成安装。

![](../../../../zh-cn/stage-3/personal-brand/personal-website-blog/images/image9.png）

**步骤3：配置开发工具包**

安装完成后，一个黑色命令行窗口会自动打开。不要慌。在光标闪烁处输入数字 `3`，这意味着安装 MSYS2 基础环境和 MINGW 工具链，然后按下回车键。等待命令运行结束，窗口自动关闭。

![](../../../../zh-cn/stage-3/personal-brand/personal-website-blog/images/image10.png）

**步骤4：验证结果**

现在是时候让AI检查你的作业了。打开Trae，在右侧聊天中输入以下自然语言指令：

```markdown
Please help me check whether the Ruby environment has been installed correctly on this computer. Please run the `ruby -v` command in the terminal at the bottom and tell me the result.
```

如果 Trae 回复类似 `ruby 3.x.x` 的内容，那么你的 Windows Ruby 环境就已经完全设置好了。

![](../../../../zh-cn/stage-3/personal-brand/personal-website-blog/images/image11.png)

### 2.4.2 Mac 安装

配置 Mac 环境感觉更“极客”，因为通常需要使用终端命令。但在 氛围编程 模式下，我们甚至不需要手动打开终端。我们可以让 Trae 充当我们的个人 IT 操作员。

**步骤 1：给出一次性环境设置指令**

打开 Trae，并将以下自然语言指令粘贴到右侧聊天中。我们将让它处理检查 Homebrew，如果缺失则安装，然后再安装 Ruby：

```markdown
I am using a Mac computer and need to configure a Ruby development environment. Please help me complete the following steps:
1. Check whether Homebrew is already installed. If not, please run Homebrew's official installation script in the terminal.
2. After confirming Homebrew is ready, run `brew install ruby` in the terminal.
3. When everything is done, run `ruby -v` to confirm the installation succeeded.
Please guide me step by step, and when necessary provide terminal commands that I can click and run directly.
```

在接收到指令后，Trae 将开始工作，并在聊天面板中显示带有运行按钮的代码块。

**初学者注意事项**

安装 Homebrew 时，终端经常会提示类似 `Password:` 的信息，并要求你输入 Mac 登录密码。

**注意：** 当你在 Mac 终端输入密码时，屏幕上不会显示任何字符或星号。这是正常现象。只需盲目输入密码并按回车即可。

**步骤 2：验证结果**

安装完成后，回到 Trae 并输入：

```markdown
I just installed Ruby on this Mac through `brew`. Please help me run the `ruby -v` command in the terminal and check whether the installation and environment variables are correct.
```

当你在终端看到类似 `ruby 3.x.x` 的字样时，本地网页工作坊已经准备好，你的 Mac 也准备好进行 Vibe 编码。

## 2.5 注册 GitHub 账户

**什么是GitHub？**
如果说Git是快递，那么**GitHub就是云仓库和展厅**。它不仅免费托管你的代码，更重要的是，借助**GitHub Pages**，它能将你的代码转化为全球可访问的网站URL。它也是全球最大的代码托管平台，拥有GitHub账户就像进入技术世界的通行证。

**注册步骤：**

1. **访问官方网站**：打开[https://github.com/]（https://github.com/）。
2. **点击注册**：点击右上角的**“注册”**。

![](../../../../zh-cn/stage-3/personal-brand/personal-website-blog/images/image12.png）

3. **填写您的信息**
4. **电子邮件**：输入真实邮箱地址。
5. **密码**：选择强密码。
6. **用户名（重要！）**： **请谨慎选择**。您的首页URL后来将变为**`https://your-username.github.io`**。最好使用英文名、拼音、熟悉的ID，或简单的字母和数字组合。切勿**选择`a1b2c3d4`这样的名称，否则网站链接将难以记忆。
7. **验证与激活**：完成人类验证，通常会旋转图像或选择螺旋星系，然后查看邮箱获取验证码。

![](../../../../zh-cn/stage-3/personal-brand/personal-website-blog/images/image13.png）

注册完成后，你将在网上拥有自己的地块。下一节我们将开始在这块地块上建设。

![](../../../../zh-cn/stage-3/personal-brand/personal-website-blog/images/image14.png）

# 3.从模板到你的第一个可访问页面

一切准备就绪。在前两章中，我们准备了工具。在本章中，我们将正式在互联网上宣称土地。本章的任务很简单：
**暂时不用担心装饰或内容。先建立网站骨架，获取实时访问链接。**

我们将直接分支成熟的学术模板，并使用GitHub Pages自动化，在二十分钟内完成运行。完成后，您将拥有一个全球可访问的链接。

## 3.1 获取网站模板

在Vibe编码模式下，我们不需要从零开始写HTML。GitHub上有成千上万个优秀的开源模板。我们只需要“借用”一个，并把它改成我们自己的名字。

**步骤1：找到模板**

这里我们挑选了一个结构清晰且适合学术展示的经典模板：
https://github.com/luost26/academic-homepage?tab=readme-ov-file
该模板基于Jekyll框架。

当然，你也可以在GitHub上搜索**`academic-homepage`**，选择你喜欢的其他风格，但按照本教程操作，建议先使用上面的模板。

我们还为你准备了几份额外的模板推荐：

* 极简之光个人主页主题：https://github.com/yaoyao-liu/minimal-light？
* 最小错误：[https://github.com/mmistakes/minimal-mistakes]（https://github.com/mmistakes/minimal-mistakes?utm_source=chatgpt.com）
* 皮克西尔：https://github.com/johno/pixyll
* 海德杰克：https://github.com/hydecorp/hydejack
* 四十杰基尔主题曲：https://github.com/andrewbanchich/forty-jekyll-theme
* 列昂尼德：https://github://github.com/renyuanz/leonids
* YAT：https://github.com/jeffreytse/jekyll-theme-yat

**步骤2：分支项目**

访问目标仓库主页，然后点击右上角的 **Fork** 按钮。一个确认框将会弹出。直接点击 **Create Fork**。

* 说明：这一步相当于将别人的代码仓库连同完整的权限键复制到你自己的 GitHub 账户中。现在，你拥有了自己网站的副本。

![](../../../../zh-cn/stage-3/personal-brand/personal-website-blog/images/image15.png)

**步骤 3：重命名仓库，这是最重要的一步**

将仓库名称更改为：
`your-username.github.io`

**对初学者的重要提示**：
这是 GitHub Pages 的硬性规定。
例如，如果你的 GitHub 用户名是 `musk-fan`，那么仓库名称 **必须** 是 `musk-fan.github.io`。
只有这样，GitHub 才会自动给你分配一个免费的域名。如果名字错误，网页以后将无法打开。

![](../../../../zh-cn/stage-3/personal-brand/personal-website-blog/images/image16.png)

## 3.2 获取 GitHub 项目 URL

重命名后，我们需要获取仓库提取地址。

1. 返回仓库主页，在 **Code** 标签下。
2. 点击绿色的 **Code** 按钮。
3. 确保选中 **HTTPS** 标签。
4. 点击复制按钮，并复制以 `.git` 结尾的 URL，例如 `https://github.com/musk-fan/musk-fan.github.io.git`。

![](../../../../zh-cn/stage-3/personal-brand/personal-website-blog/images/image17.png)

## 3.3 在本地拉取项目

过去，程序员必须在黑色终端中输入复杂的 Git 命令来下载代码。在 氛围编程 时代，我们有了 Trae。我们只需告诉 AI：“我想要这个，帮我拉下来。”

**步骤 1：准备**

在电脑上创建一个新文件夹，例如 `MyWebsite`，然后右键选择 **Open with Trae**，或者先打开 Trae，然后选择 **Open Folder**。

![](../../../../zh-cn/stage-3/personal-brand/personal-website-blog/images/image18.png)

**步骤 2：给出克隆命令**

Trae 打开后，在右侧调出 AI 聊天面板，并输入以下自然语言指令：

```text
Please help me clone the remote GitHub repository into the current folder.
Repository address: paste the URL you just copied, for example https://github.com/musk-fan/musk-fan.github.io.git
Execution requirement: please run the `git clone` command directly in the terminal.
```

**步骤 3：确认下载**

Trae 会自动在下方调用终端并执行命令。等待几秒钟。当你在左侧的文件树中看到 `_config.yml` 和 `index.html` 这样的文件出现时，说明项目已成功移动到你的电脑上。

![](../../../../zh-cn/stage-3/personal-brand/personal-website-blog/images/image19.png)

## 3.4 在本地预览网页

代码已经在你的机器上，并且 Ruby 环境已准备好。在修改网站之前，我们必须先在自己的电脑上本地检查它。这就像装修房子：你先在展厅里摆好一切，确认看起来没问题，然后才公开展示。

多亏了在 **第 2.4 节** 安装的 Ruby 环境，现在操作变得非常简单。

**步骤 1：安装依赖**

Jekyll 网站运行依赖许多 Gems。这就像从购物清单上购买所有家具。**然而**，由于网络条件，直接下载可能会中断。我们将让 Trae **切换到国内镜像** 并从那里安装依赖。

在 Trae 的聊天框中输入：

```markdown
I need to install the Jekyll dependencies. Considering the network environment, please first change the `source` in the Gemfile to the domestic mirror `https://gems.ruby-china.com/`. After that, please run the `bundle install` command in the terminal to install all dependencies.
```

**第2步：启动本地服务**

现在我们将启动一个**本地服务器**来模拟网站的运行。继续并告诉 Trae：

```markdown
The dependencies have finished installing. Please help me start the Jekyll local preview service in the terminal. Please run the `bundle exec jekyll serve` command.
```

在终端运行几秒钟后，你会看到类似如下的内容：
`Server address: http://127.0.0.1:4000/academic-homepage/`

1. **打开浏览器**：点击该链接，或直接在浏览器中输入它：
   `http://127.0.0.1:4000/academic-homepage/`
2. **观看魔法**：现在你的网站已经在浏览器中运行了。虽然它仍显示原模板作者的名字，但它已经在你的本地电脑上运行。

从这一刻起，每当你更改内容并按下 `Ctrl+S`，然后刷新浏览器，**网页内容也会随之改变**。

![](../../../../zh-cn/stage-3/personal-brand/personal-website-blog/images/image20.png)

一旦本地预览正常工作，我们就可以进入下一章，开始将网站打造成像埃隆·马斯克那样的风格。

# 4. AI辅助内容修改

为了帮助大家快速体验完整流程，我们不会使用自己的个人信息，以避免隐私焦虑。相反，我们将以**埃隆·马斯克为例**，为他建立一个学术主页。这让我们可以摆脱写个人简历的无聊压力，专注于用氛围编程打造网站的乐趣。同时，这也让我们看到，将硅谷铁人如*Hyperloop Alpha*的“技术白皮书”放在学术风格的网站上是多么酷。

我们将完整经历从**获取模板**到**发布网站**的整个流程，并手工打造一个世界级的个人展示空间。

跟随我的节奏，发送第一条指令给AI。

## 4.1 统一的全局约束

这是**全局设置提示**。你只需发送一次。
它的目的是为AI设定规则，防止其即兴发挥而破坏网站结构。直接将其复制到Trae中：

```text
You are now the maintainer of a “GitHub Pages + Jekyll academic homepage template” site.
The current repository is a Jekyll-powered academic homepage (including `_config.yml`, `_data`, `_layouts`, etc.).
Your modifications must follow these principles:
1. Each step should only solve the current stage goal. Do not do later-stage content in advance.
2. Do not modify the site structure, do not introduce new plugins, and do not change the theme style.
3. All content must be renderable by Jekyll without errors.
4. All identity information must follow an “academic-style simulation” tone and must not use first-person voice.
5. Do not invent obviously fake IEEE / Nature papers.
6. If information is uncertain, use “publicly well-known facts” or “reasonable academic simulation labeling.”
```

## 4.2 构建马斯克的主页，内容部分

### 4.2.1 第一个全局指令：替换身份

我们首先需要解决的问题是“我是谁？”模板中填充了原作者的信息，我们需要一次性用AI来替换它。

**步骤 1：准备素材**

将我提供给你的图片素材 `University_of_Pennsylvania.jpg` 和 `Queen_University.jpg` 放入对应的项目文件夹中，通常是 `/assets/images/badges/`。

![](../../../../zh-cn/stage-3/personal-brand/personal-website-blog/images/image21.png)
![](../../../../zh-cn/stage-3/personal-brand/personal-website-blog/images/image22.png)

**步骤 2：发送指令**

在 Trae 右侧的聊天框中输入以下提示。注意，我们不需要手动查找和编辑代码行，我们只需要告诉 AI 我们想要的内容：

```text
1. Goal: replace the “person identity” of the current academic homepage with Elon Musk. Only modify the basic profile information.
2. Specific requirements:
1. Name: Elon Musk
2. Professional identity:
    Technology Entrepreneur
    Engineer
    Founder & CEO of SpaceX
    CEO of Tesla, Inc.
3. Education:
    Queen’s University (Physics and Economics, not completed) (image path: /assets/images/badges/Queen_University.jpg)
    University of Pennsylvania (B.S. in Physics, B.A. in Economics) (image path: /assets/images/badges/University_of_Pennsylvania.jpg)
4. Research Interests (can be simulated as):
    Space Systems Engineering
    Sustainable Energy Systems
    Artificial Intelligence & Robotics
    Large-scale Technological Innovation
5. Honors & Recognition:
    Time Person of the Year (2021)
    Fellow of the Royal Society (FRS)
    Listed in Forbes Billionaires (multiple years)
6. Constraints:
    Do not add papers / publications
    Do not invent IEEE, Nature, or Science papers
    Use academic-style wording and avoid commercial promotional tone
    Keep the original field structure unchanged and only replace the content
```

此时，您可以看到 Trae 已完成我们所有的修改要求。

![](../../../../zh-cn/stage-3/personal-brand/personal-website-blog/images/image23.png)

**步骤 3：刷新本地浏览器**

现在刷新本地浏览器，您应该可以看到所有内容都已正确替换。

![](../../../../zh-cn/stage-3/personal-brand/personal-website-blog/images/image24.png)

### 4.2.2 迭代改进：添加“论文”和项目

因为埃隆·马斯克不是传统的大学教授，他很少在 *Nature* 或 *Science* 上发表论文。但作为“首席工程师”，他发布了许多高度技术性的**白皮书**和**总体规划**。

在学术主页的语境下，我们可以重新定义“Publications（出版物）”的含义为**“技术白皮书与远景规划”**。这一点也不尴尬。实际上，它非常符合他的建设者身份。

![](../../../../zh-cn/stage-3/personal-brand/personal-website-blog/images/image25.png)

**步骤 1：准备资源**

下载我提供的封面图片，即 `Hyperloop_Alpha_sketch.jpg`、`SpaceX_Starship.jpg` 和 `Neuralink_sewing_machine_robot.jpg`，将它们放在 `/assets/images/covers/` 文件夹下，并删除该文件夹中原有的示例图片。

![](../../../../zh-cn/stage-3/personal-brand/personal-website-blog/images/image26.png)
![](../../../../zh-cn/stage-3/personal-brand/personal-website-blog/images/image27.png)
![](../../../../zh-cn/stage-3/personal-brand/personal-website-blog/images/image28.png)

**步骤 2：发送指令**

将以下提示发送给 Trae，让它帮助我们重建数据结构：

```text
1. Role setting: you are a static site development expert who is proficient in Jekyll and Liquid syntax.
2. Task goal:
Modify the section title on the homepage or in the navigation bar.
The current file structure is organized by year subfolders, for example `_publications/2023/xxx.md`.
Create three new Markdown files in the specified format to display Elon Musk's technical white papers and visionary plans.
3. Specific steps and requirements:
1. Modify the section title
    Please search globally for the string "Selected Publications" (it may appear in `index.html`, `_config.yml`, or `_pages/publications.md`).
    Replace it with: "Technical White Papers & Visionary Plans".
2. Rebuild the publication data (critical step)
    Clear all old content under the `_publications` folder, including old year folders such as 2023 and 2024.
    Create three new folders: `_publications/2013/`, `_publications/2017/`, and `_publications/2019/`.
    In those folders, create the following three Markdown files.
3. Strictly follow this file format
Important: you must strictly follow the YAML Front Matter format below, and must not invent new field names:
    - title:          "paper title"
    - date:           YYYY-MM-DD HH:MM:SS +0800
    - selected:       true
    - pub:            "venue / journal name"
    - pub_date:       "year"
    - abstract: >-    abstract content...
    - cover:          /assets/images/covers/cover_name.jpg
    - authors:        - Author1- Author2
    - links:Paper:    https://paper-link
4. Please generate the full code for the following three files (including the path descriptions):
(1) Path: `_publications/2013/2013-hyperloop.md`
    Title: Hyperloop Alpha
    Date: 2013-08-12
    Pub: Tesla Blog (Open Source)
    Pub_date: "2013"
    Abstract: A proposal for a fifth mode of transport, utilizing a low-pressure tube and air bearings to achieve subsonic speeds.
    cover: /assets/images/covers/Hyperloop_Alpha_sketch.jpg
    Authors: Elon Musk, SpaceX & Tesla Teams
    Link: https://www.tesla.com/sites/default/files/blog_images/hyperloop-alpha.pdf
(2) Path: `_publications/2017/2017-mars.md`
    Title: Making Humans a Multi-Planetary Species
    Date: 2017-06-01
    Pub: New Space
    Pub_date: "2017"
    Abstract: Detailed architecture of the Starship system designed to colonize Mars. This paper outlines the technical challenges to establish a self-sustaining city.
    cover: /assets/images/covers/SpaceX_Starship.jpg
    Authors: Elon Musk
    Link: https://www.liebertpub.com/doi/10.1089/space.2017.29009.emu
(3) Path: `_publications/2019/2019-neuralink.md`
    Title: An Integrated Brain-Machine Interface Platform
    Date: 2019-10-16
    Pub: Journal of Medical Internet Research
    Pub_date: "2019"
    Abstract: We have built arrays of small and flexible electrode threads, with as many as 3,072 electrodes per array, and a neurosurgical robot.
    cover: /assets/images/covers/Neuralink_sewing_machine_robot.jpg
    Authors: Elon Musk, Neuralink
    Link: https://www.jmir.org/2019/10/e16194/
Execution requirement:
Please directly provide the complete content of these three files, and also provide the modification code for the file where you changed the title.
```

**第3步：刷新本地浏览器**

当构建完成后，你会发现原本沉闷的出版物列表已经变成了一个未来科技感十足的展示。

![](../../../../zh-cn/stage-3/personal-brand/personal-website-blog/images/image33.png)

### 4.2.3 最终润色：社交链接和头像

这是将评分从90分提升到100分的关键步骤。侧边栏可能仍然包含模板中的原GitHub链接或错误的电子邮箱。我们需要将它们指向Musk的真实社交账户，主要是X.com。

**第1步：准备**

在谷歌搜索一个好看的Musk照片，保存为`portrait.png`，或者将其拖入Trae的`images/photo`文件夹中并替换原来的图片。

**第2步：将以下提示复制到Trae**

```text
1. Role setting: you are a detail-oriented Jekyll website development expert.
2. Task goal: complete the final update of the website sidebar and personal information configuration. We need to update the author's avatar, intro, and social links to Elon Musk's real information.
Please first scan the project structure and find the configuration file that controls the author information.
3. Please make the following modifications:
1. Avatar path fix
    I have already uploaded a new image named `portrait.png` into the `images/` or `assets/images/` folder.
    Please modify the avatar path in the configuration file to point to this image, and ensure the relative path is correct, for example `/images/portrait.png`.
2. Social link cleanup
    Please update or remove the social icon links in the sidebar:
    Email: change it to `elon@spacex.com`, or if the field allows, comment it out or remove it to avoid harassment.
    Twitter / X: change it to `https://x.com/elonmusk` (this is the core link).
    GitHub: change it to `https://github.com/tesla` to point to the Tesla open-source repository, or remove it directly.
    Google Scholar: must be removed, because he does not maintain it.
    LinkedIn / ResearchGate: if they exist, remove them all.
Output requirement:
Please directly provide the complete modified configuration code snippet.
```

**步骤 3：刷新本地浏览器**

1. 看一下侧边栏。它现在使用那张帅气的照片了吗？点击 Twitter 图标会带你到 X.com 吗？

此时，在本地，你已经拥有一个完整的、专业的、具有明显 Musk 风格的个人学术主页。

![](../../../../zh-cn/stage-3/personal-brand/personal-website-blog/images/image34.png)

## 4.3 通过 UI 定制注入灵魂——样式部分

现在内容是正确的，但页面看起来仍像打印出来的简历，缺少科技感。在 氛围编程 模式下，我们不需要理解 CSS。我们只需要将想要的**感觉**描述给 AI。

**示例场景**：
如果你觉得灰色背景太单调，想换成**火星红**，只需问 Trae：
*"我想将侧边栏的背景颜色改为深红色 (#8B0000)，以体现火星的感觉。我应该修改哪个 CSS 或 SCSS 文件？请直接给我代码。"*

![](../../../../zh-cn/stage-3/personal-brand/personal-website-blog/images/image35.png)

如果你喜欢上面示例图中的**SpaceX 仪表盘**风格，你可以直接复制以下设计师级提示：

```text
1. Role setting: you are a top UI designer who admires “Swiss internationalist style” and is good at interfaces like Notion, Linear, or Apple.
2. Task goal: please completely rewrite the CSS / SCSS to create a “SpaceX Dashboard” style minimalist academic homepage. The core keywords are: transparent, restrained, precise.
3. Please apply the following concrete style overrides:
1. Global typography
    Font: abandon the original serif font. Force the whole site to use the system-level sans-serif stack:
    'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif.
    Line height: increase breathing room in the body text with `line-height: 1.75`.
    Colors:
        Main title: #111111
        Body text: #333333
        Secondary information such as dates or citations: #666666
2. Clean header
    Background: remove the previous black background and use pure white (#FFFFFF), or translucent white with blur if supported, for example `rgba(255, 255, 255, 0.9)` plus `backdrop-filter: blur(10px)`.
    Border: keep only a very thin bottom border, `border-bottom: 1px solid #EAEAEA`.
    Text: navigation links should use dark gray #333333, and only become black and bold on hover.
3. Remove cards and return to content
    Remove the background and shadow of the left sidebar and the About me cards (`box-shadow: none`, `background: transparent`).
    Great minimalism lets the text float directly on the page background.
    Increase spacing: significantly increase `margin-bottom`, for example 80px, between sections and use whitespace instead of borders to separate content.
4. Restrained use of brand color
    Use Tesla Red (#E82127) only on links and important buttons.
    Link style: remove underline and only change color. On hover, add a light red background block such as `background: rgba(232, 33, 39, 0.05)`.
5. Avatar tuning
    Keep it circular with `border-radius: 50%`.
    Remove the border.
    Keep only a very light shadow, such as `box-shadow: 0 10px 30px rgba(0,0,0,0.08)`.
Execution requirement:
Please analyze the `_sass` or CSS files. Do not patch the old code. Instead, directly provide the code that resets and overrides the styles above.
```

## 4.4 用你自己的信息替换它，自定义部分

恭喜你。通过上述 Musk 首页流程之后，你已经掌握了 氛围编程 构建网站的核心思维方式。现在将这个示例空间变成你自己的家其实很简单。

你不需要重新开始。你只需要重复上述步骤，但采用稍微灵活一点的策略：

**步骤 1：物理替换，头像和基本信息**

这是最简单的步骤：

1. **更换照片**：在 Trae 左侧的文件面板中找到 `assets/images/`，然后拖入你自己的头像来替换 `portrait.png`。
2. **更改名字**：告诉 Trae，“将整个网站中所有出现的 Elon Musk 都替换为 [你的名字]。”

**步骤 2：AI 预处理，让 ChatGPT / Gemini 帮助整理内容**

Trae 擅长写代码，但如果你直接把一份杂乱的 PDF 简历扔给它，它可能会感到困惑。

**所以更高效的方法是**：
首先使用擅长处理长文本的 AI，例如 ChatGPT、Gemini 或 Kimi，来帮助你**清晰地格式化**简历。

你可以给 ChatGPT 发送如下提示：

```text
Role setting: you are a professional academic website content planner.
Task goal:
I will send you my personal resume / CV. Please help me extract key information from it and organize it into a clear Markdown structure suitable for filling directly into a static website.
Please strictly organize and refine it into the following five modules. If some content does not exist, leave it blank.
1. Profile
Name: my full name.
Tagline: a one-line professional tag, for example “CS Student @ XX Univ | AI Enthusiast”.
Bio: a 50 to 100 word third-person introduction summarizing my background and core skills, in a professional academic tone.
Socials: extract email, GitHub, LinkedIn, blog links, and so on.
2. Education
Please list: school name, degree such as B.S. in CS, and time range.
Optional: if GPA or core courses are available, add them on a separate line.
3. Selected Projects — important
Please extract 2 to 3 strongest projects, and for each include:
Title: project name.
Tech Stack: technologies used, such as Python, React, PyTorch.
TL;DR: a one-line summary of what the project does.
Description: 2 to 3 core contributions, refined using STAR style.
Image Placeholder: reserve an image filename such as `project_name.jpg`.
4. Publications / Articles
If there are papers or technical articles, please extract:
Title
Venue
Date, year is enough
Abstract, one-sentence summary
5. Skills
Please organize them into categories: programming languages, frameworks / tools, and other skills.
Output requirement:
Do not explain the process. Directly output the cleaned Markdown content.
```

一旦你得到这个清理过的文本，将其输入到 Trae 中，准确性将显著提高。

![](../../../../zh-cn/stage-3/personal-brand/personal-website-blog/images/image36.png)
![](../../../../zh-cn/stage-3/personal-brand/personal-website-blog/images/image37.png)

**步骤 3：替换核心内容，有两种可能的方法**

在这一步，根据你的偏好，你可以选择两种不同的 氛围编程 模式：

1. **模式 A：让 AI 导航，然后手动编辑**

如果你想确切地知道每个内容是如何被修改的，你可以问 Trae：

```markdown
I want to modify the “Education” section. Please tell me where the corresponding file path is and which lines contain the code.
```

Trae 会在聊天中告诉你类似的话：
“你需要修改的文件是 `_pages/about.md`，相关代码在第 XX 行左右……”

然后你可以自己从左侧的文件树中打开该文件，并像结构化编辑练习一样填写 ChatGPT 清理过的内容。

![](../../../../zh-cn/stage-3/personal-brand/personal-website-blog/images/image38.png)

2. **模式 B：完全托管的自动化**

如果你觉得找文件太麻烦，可以直接将清理过的信息粘贴到 Trae 中：

```markdown
Here is the cleaned content for my “Education” and “Project Experience” sections (paste the Markdown content).
Please directly replace the corresponding content in the current site and preserve the existing layout format.
```

# 5.在线部署

## 5.1 部署到 GitHub 页面

**步骤1：启用GitHub Actions，云构建**

回到GitHub浏览器里：

1. 点击仓库顶部的**设置**。
2. 在左侧边栏，点击**Pages**。
3. 在**构建和部署**中，将**Source**从 `Deploy from a branch`@ 改为**`GitHub Actions`**。

![](../../../../zh-cn/stage-3/personal-brand/personal-website-blog/images/image39.png）

**步骤2：自动配置Jekyll工作流程**

切换后，页面布局会发生变化。GitHub 会自动识别这是 Jekyll 项目。

1. 找到**Jekyll（由GitHub Actions）**卡。
2. 点击那张卡上的**配置**。

![](../../../../zh-cn/stage-3/personal-brand/personal-website-blog/images/image40.png）

**步骤3：提交配置文件**

点击后，你会进入一页代码。这是GitHub已经编写的`.yml`配置文件，用于构建Jekyll网站。

1. **不要修改任何代码**。
2. 点击右上角的绿色 **提交更改......**按钮。
3. 在弹窗确认框中再次点击**提交更改**。

![](../../../../zh-cn/stage-3/personal-brand/personal-website-blog/images/image41.png）

![](../../../../zh-cn/stage-3/personal-brand/personal-website-blog/images/image42.png）

**步骤4：等待并核实**

提交完成后，GitHub 的服务器会自动开始运行。

1. 点击顶部菜单中的**Actions**标签。
2. 你会看到一个名为`Deploy Jekyll site to Pages`的任务在旋转。
3. 等待一到两分钟，直到黄色圆圈变成**绿色勾选**。

![](../../../../zh-cn/stage-3/personal-brand/personal-website-blog/images/image43.png）

**步骤5：访问您的网站**

一旦圆圈变绿，你可以通过类似地址访问模板的默认版本：
**`https://your-username.github.io/`**

恭喜你。你现在已经成功部署了一个全球可访问的个人学术主页。

## 5.2 提交更改并更新主页

现在我们将把之前做的所有本地修改推送到GitHub，这样这个Musk风格的个人主页就能被全世界看到。

1. 点击左侧的**源控**。
2. 将所有**变更**添加到**分阶段变更**中。
3. 让Trae协助生成提交消息，然后点击**提交**。
4. 点击**同步更改**或**Push**以推送到`main`分支。
5. 等待片刻，直到**Actions**标签下的所有进程完成。

![](../../../../zh-cn/stage-3/personal-brand/personal-website-blog/images/image44.png）

现在，恭喜你。打开 **`https://your-username.github.io/`**，你已经拥有了一个完整、专业且浓厚的马斯克风格学术主页。

![](../../../../zh-cn/stage-3/personal-brand/personal-website-blog/images/image45.png）

# 6.高级游戏：从零手工构建个人主页

如果你觉得学术模板太死板，或者想做一个像《黑客帝国》那样酷炫的一页网站，欢迎来到**DIY版块**。

在这里，我们不分叉别人的代码。我们会从 Trae 从一个空文件夹开始，生成一个包含一条指令的完整网站，然后部署到网上。

## 6.1 为什么要手工建造

* **绝对自由**：无模板限制。如果你想要右侧的导航栏，或者背景里的烟花，只需告诉AI。
* **极简主义**：模板通常包含数百个文件，而手工制作的网站可能只需一个`index.html`。
* **技术控制**：这是理解网页实际运行方式的最佳方式。

我们将演示经典的 **纯 HTML 流程**：无需编译，并且 GitHub Pages 原生支持，这使得它非常适合构建个人主页。

## 6.2 实践示例：请 AI 编写“火星指挥中心”主页

这一次我们不走学术路线。假设马斯克想要一个极简、未来感的个人主页来展示他的火星计划。

**步骤 1：创建一个空项目**

在你的电脑上创建一个新文件夹，并用 Trae 打开它。此时，左侧的文件树完全为空。

*(提示：你可以提前准备好马斯克的照片，并命名为 `portrait.png`。)*

**步骤 2：建立框架**

在 Trae 的聊天面板输入以下提示。注意，我们要求 AI 将所有代码写入单个文件，以便初学者易于管理：

```text
I want to build a minimalist personal homepage for Elon Musk from scratch, without any complex framework, using only HTML + CSS + JS.
Design style: SpaceX dashboard style.
    Background: use deep space black (#000000), with starlight animation.
    Main accent color: use “Mars red” (#E82127).
    Font: use a monospace font stack to imitate the feel of a code terminal.
Page content:
    Place Elon Musk's avatar in the center, circular, with a rotating border. The image path is `portrait.png`.
    Name: Elon Musk (Technoking of Tesla)
    Intro: "Occupying Mars... 99% Loading."
    At the bottom, put three glowing buttons linking to X (Twitter), SpaceX, and Tesla.
Technical requirement:
Please put all CSS styles and HTML structure inside a single `index.html` file.
Please generate the full code directly.
```

![](../../../../zh-cn/stage-3/personal-brand/personal-website-blog/images/image46.png)

**步骤 3：生成和预览**

在上一步中，Trae 已经帮我们生成了一个 `index.html` 文件。那么我们如何查看它当前的效果呢？

在聊天中告诉 Trae：

```markdown
Please help me start a local service to preview this webpage.
```

您将收到一个类似 `http://localhost:8000` 的链接。复制并在浏览器中打开它，您将看到一个很酷的“火星首页”，也许背景中还有闪烁的星星。

![](../../../../zh-cn/stage-3/personal-brand/personal-website-blog/images/image47.png)

但是我们会注意到，目前的页面只是一个非常酷的登陆页。作为一个完整的个人主页，它的信息仍然太少，缺乏学术主页所期望的深度。因此，在这个视觉框架的基础上，我们现在继续用关于埃隆·马斯克的学术风格信息来丰富它。

![](../../../../zh-cn/stage-3/personal-brand/personal-website-blog/images/image48.png)

**步骤 4：进一步完善信息**

我们希望 Trae 保持当前的火星风格，但将页面重构为更像学术模板的形式。我们需要明确告诉它，将现有元素移至左侧，并在右侧创建一个新的内容区域，用于个人简介文字和白皮书，同时保持所有新添加的内容都采用相同的黑色和红色赛博朋克风格。

复制以下提示并发送给 Trae:

```text
Core principle:
You must strictly preserve the current “SpaceX / Mars” design style, including pure black background, starlight decorations, red neon accent color, and monospace code-style font. Do not use the white background from the reference image.

Specific modification steps:
1. Create a two-column layout
Split the page into left and right columns. The left sidebar should take about 30% to 35% width, and the right content area should take about 65% to 70%.

2. Left sidebar - move the existing information
Move all current elements from the original hero screen into the fixed left sidebar:
    - Avatar: keep Elon Musk's circular avatar.
    - Name and title: keep the red neon text “ELON MUSK” and “Technoking of Tesla”.
    - Loading bar: keep “Occupying Mars... 99% Loading” as the personal signature.
    - Social buttons: move the three red buttons, X, SPACE X, and TESLA, to the bottom of the left sidebar.

3. Right content area - add detailed information
Add detailed personal introduction and achievements in the right area. All new body text should use white or light gray, while titles should use red neon emphasis. Please create the following sections:
- About Me:
    Write a short introduction, for example: “Technology entrepreneur and engineer focused on multi-planetary expansion, sustainable energy, and artificial intelligence.”
- Focus Areas:
    List Space Systems Engineering, Mars Colonization Architecture, Brain-Machine Interfaces.
- Visionary Plans & White Papers:
    This is the key section. Refer to the list style in the example image, but convert it into a black-background style.
    Create a list displaying his important technical plans, using red borders or glow effects to distinguish each item.
    Item 1: “Making Humans a Multi-Planetary Species” (Starship Architecture, 2017).
    Item 2: “Hyperloop Alpha” (High-speed transportation proposal, 2013).
    Item 3: “Neuralink: An Integrated Brain-Machine Interface Platform” (2019).
- Notable Achievements:
    Briefly list milestones such as:
    First private liquid-propellant rocket to reach orbit (Falcon 1)
    First reusable orbital class rocket (Falcon 9)

4. Style detail requirements
All section titles on the right, such as “About Me,” should use the same red glowing style as the “ELON MUSK” text on the left.
Make sure the whole page remains responsive and preserves a good two-column layout on different screen sizes.
```

刷新浏览器后，你的赛博朋克学术页面就完成了。当然，你可以根据自己的喜好继续改进它。和之前的步骤一样，你只需要清楚地告诉 Trae 你的目标，它就会为你处理繁琐的编码过程。

![](../../../../zh-cn/stage-3/personal-brand/personal-website-blog/images/image49.png)

## 6.3 如何部署手工搭建的网站

与之前的模板分叉不同，之前的模板来自别人的仓库，而这个项目是你新建的，还没有对应的 GitHub 地址。因此我们需要手动绑定它。

**步骤 1：在 GitHub 上创建新仓库**

1. 在浏览器中登录 GitHub。
2. 点击右上角的 **+** 图标，然后选择 **New repository（新建仓库）**。

![](../../../../zh-cn/stage-3/personal-brand/personal-website-blog/images/image50.png)

3. **仓库名称**：输入 `mars-profile`，或者任何你喜欢的名字。

**注意**：
如果你已经使用过 **`your-username.github.io`**，就不能重复使用此名称。你可以选择其他名称，GitHub 会生成类似 **`your-username.github.io/mars-link`** 的 URL。

4. **公开 / 私有**：选择 **Public（公开）**。
5. **不要勾选“Add a README file（添加 README 文件）”！**
   其他选项保持默认。
6. 点击 **Create repository（创建仓库）**。

![](../../../../zh-cn/stage-3/personal-brand/personal-website-blog/images/image51.png)

**步骤 2：将本地代码推送到云端**

创建完成后，GitHub 会跳转到一个显示大量代码内容的页面。不要担心，我们只需要复制该页面上显示的仓库链接。

![](../../../../zh-cn/stage-3/personal-brand/personal-website-blog/images/image52.png)

回到 Trae，并在聊天中输入：

```markdown
I have created an empty repository on GitHub. The address is: https://github.com/your-username/mars-link.git (please replace this with the actual repository address you just created).
Now please help me initialize the current local project as a Git repository and push the code to the `main` branch of this remote address.
```

Trae通常会帮你执行下面的标准流程，你只需点击即可运行：

1. `git init`
2. `git add .` 和 `git commit -m "First commit"`
3. `git branch -M main` 和 `git remote add origin [your address]`
4. `git push -u origin main`

Trae 完成推送后，返回 GitHub 刷新页面。点击 **Code** 标签，你会看到 Trae 编写的代码已成功推送到仓库。

![](../../../../zh-cn/stage-3/personal-brand/personal-website-blog/images/image53.png）

**步骤3：启用GitHub Pages**

代码推送后，网页不会自动显示。我们还需要手动开启开关：

1. 回到GitHub仓库页面，点击顶部的**设置**。
2. 点击左侧边栏的**Pages**。
3. 在**构建与部署**下：
   1. 将**Source**设置为`Deploy from a branch`。
   2. 将**Branch**设置为`main`，并选择`/(root)`作为文件夹。
4. 点击**保存**。

![](../../../../zh-cn/stage-3/personal-brand/personal-website-blog/images/image54.png）

点击保存后，网页不会立即显示。GitHub 的后台就像一个小型机器人工厂。打包、构建代码并发布到全球服务器大约需要 **1 到 2 分钟**。

耐心等待并刷新页面。在大大的**GitHub页面**标题下，你会看到一行URL类似：
**“您的网站现已上线，地址为`https://your-username.github.io/mars-link/`”**

![](../../../../zh-cn/stage-3/personal-brand/personal-website-blog/images/image55.png）

点击它，你的火星指挥中心就上线了。

![](../../../../zh-cn/stage-3/personal-brand/personal-website-blog/images/image56.png）

# 7.结语

教程结束了。现在，当你看到浏览器地址栏中 `.github.io` 发光时，你会不会觉得自己在互联网上插了个旗帜？

在这个教程中，我们借用了埃隆·马斯克的形象，搭建了一个看起来相当令人印象深刻的乐高项目网站。但这仅仅是开始。Vibe Codeding 最迷人的部分不是节省了多少打字时间。而是它**彻底打破了“想法”与“现实”之间的墙壁。**

过去，你可能因为**你写不出CSS**而放弃展示一个项目。
现在，剩下的只有你的**想象力**和你的**品味**。

**不要让本网站停留在“马斯克启发的克隆”。**
你练习时用的特斯拉链接和火星殖民白皮书，最终都是别人的故事。你的首页应该是你数字世界中的名片。

去那里展示你的第一个真正的项目经验。
去发表你对某个技术话题的独特想法吧。
你甚至可以在上面放上你最喜欢的书单或自己的照片。
那些会被埋在微信时刻里的想法可以永远留在这里。
简历中无法容纳的热情在这里可以自由传播。

不要让这块地空着。
去试验。去破坏它。去重建它。
一直这样，直到它长成你最喜欢的形状。

![](../../../../zh-cn/stage-3/personal-brand/personal-website-blog/images/image57.png）

去吧，让全世界看到你。***

# 参考文献

CSDN： [2025 最新保姆级教程：使用GitHub构建个人主页的逐步教程]（https://blog.csdn.net/qq_45743991/article/details/145505150?ops_request_misc=&request_id=&biz_id=102&utm_term=github 构建个人主页&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduweb~default-0-145505150.142^v102^pc_search_result_base4&spm=1018.2226.3001.4187）

CSDN: [Git 下载与安装教程](https://blog.csdn.net/weixin_41293671/article/details/144255269?ops_request_misc=elastic_search_misc&request_id=63236900b52320a7beb177787ba97f07&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~baidu_landing_v2~default-5-144255269-null-null.142^v102^pc_search_result_base4&utm_term=git下载安装&spm=1018.2226.3001.4187)

CSDN: [Windows 下 Ruby 安装教程](https://blog.csdn.net/alive_tree/article/details/103043158?ops_request_misc=elastic_search_misc&request_id=ad7e29ea7f702554d785c2fc82ec6e95&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~ElasticSearch~search_v2-11-103043158-null-null.142^v102^pc_search_result_base4&utm_term=ruby安装教程&spm=1018.2226.3001.4187)