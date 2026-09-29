<脚本设置>
从 '@theme/data/relatedArticles' 导入 { relatedArticlesMap }

const relatedArticles = relatedArticlesMap['en/stage-2/frontend/lovart-assets'] ？？[]
</script>

# 从纳米香蕉开始：打造属于你的资产生产代理

## 第一章：1分钟内生成你的第一个图像资源

在我们深入设计、风格或提示之前，先用最少的步骤生成第一张图片。

### 1.1 认识纳米香蕉

在讨论设计风格和提示工程之前，先谈谈更重要的问题：**确认你真的能生成图像。**

当今主流大型模型已经具备图像生成和编辑功能。这些模型通常被称为**生成模型**

为了让过程尽可能简单，本教程使用了一个已经具备稳定图像生成和编辑功能的模型——NanoBanana。这是谷歌发布的图像生成模型，官方名称为**Gemini 3.1 Flash图像预览**，支持通过自然语言直接生成图像，同时也支持编辑现有图像。

![]（/zh-cn/stage-2/frontend/lovart-assets/images/image1.png）

就能力而言，它与你可能听说过的其他模型（如GPT-4o、Claude、Qwen、Midjourney等）本质上没有区别：**你提供描述，模型生成结果。**

![]（/zh-cn/stage-2/frontend/lovart-assets/images/image2.png）！[]（/zh-cn/stage-2/frontend/lovart-assets/images/image3.png）！[]（/zh-cn/stage-2/frontend/lovart-assets/images/image4.png）

你可以把它看作“画笔”。在本章中，我们只关心一件事：
👉 **这把画笔能否在你手中画出第一笔。**

实际上，NanoBanana 可以通过官方平台如 **Google AI Studio** 直接使用，或通过 **API** 集成到开发流程中。本教程采用了 API 方法。NanoBanana 2 模型也已发布，你可以尝试使用最新的大型模型。

### 1.2 “你好世界”关卡生成

在开始之前，你只需完成以下三个步骤：

1. 在Trae中创建新文件夹

![]（/zh-cn/stage-2/frontend/lovart-assets/images/image5.png）

2. 创建一个新的 Python 文件

![]（/zh-cn/stage-2/frontend/lovart-assets/images/image6.png）

![]（/zh-cn/stage-2/frontend/lovart-assets/images/image7.png）

![]（/zh-cn/stage-2/frontend/lovart-assets/images/image8.png）

3. 将完整代码粘贴在下方

Trae 会自动处理所需的环境设置和依赖安装——无需额外配置。

代码使用了NanoBanana的API密钥。这里不涉及应用流程——只要你能获得并填写相应参数，就没问题。**目前阶段，我们不追求理解每一行代码，只希望它能成功运行。**

```Python
# /// script
# dependencies = [
#  "gradio>=4.0.0",
#  "pillow>=10.0.0",
#  "requests>=2.31.0",
# ]
# ///

import gradio as gr
import requests
import base64
from PIL import Image
import io
import os
import time
import re
from typing import Optional, Dict, Any, List

# Configure API information
NANOBANANA_API_URL: str = "YOUR API URL"
NANOBANANA_API_KEY: str = "YOUR API KEY"
OUTPUT_DIR: str = "outputs"

# Ensure output directory exists
os.makedirs(OUTPUT_DIR, exist_ok=True)

def image_to_base64_data_uri(image: Image.Image) -> str:
    """
    Convert a PIL image to an OpenAI API compatible data URI format.
    """
    buffer = io.BytesIO()
    # Convert to PNG for compatibility
    image.save(buffer, format="PNG")
    encoded = base64.b64encode(buffer.getvalue()).decode('utf-8')
    return f"data:image/png;base64,{encoded}"

def base64_to_image(base64_str: str) -> Optional[Image.Image]:
    """
    Convert a pure base64 string to a PIL Image.
    """
    try:
        image_bytes = base64.b64decode(base64_str)
        return Image.open(io.BytesIO(image_bytes))
    except Exception as e:
        print(f"Base64 decoding failed: {e}")
        return None

def extract_base64_from_response(content: Any) -> Optional[str]:
    """
    Core parsing logic: Extract image Base64 data from API response content.
    Compatible with both Markdown format and structured list format.
    """
    if not content:
        return None

    base64_data = None

    # 1. Try structured extraction (List)
    # Corresponding response format: [{"type": "image_url", "image_url": {"url": "data:..."}}]
    if isinstance(content, list):
        for part in reversed(content):  # Search in reverse, latest images are usually at the end
            if isinstance(part, dict):
                # Check image_url or output_image field
                img_field = part.get("image_url") or part.get("image") or part.get("output_image")
                if isinstance(img_field, dict):
                    url = img_field.get("url", "")
                    if url.startswith("data:image/") and "," in url:
                        return url.split(",", 1)[1].strip()

        # If no structured images in list, try concatenating text from list items to find Markdown
        text_parts = [
            str(p.get("text", ""))
            for p in content
            if isinstance(p, dict) and p.get("type") in ["text", "input_text"]
        ]
        content_str = "".join(text_parts)
    else:
        content_str = str(content)

    # 2. Try Markdown regex extraction (String)
    # Corresponding response format: "Here is your image: ![img](data:image/png;base64,AAAA...)"
    pattern = re.compile(r"!\[.*?\]\((data:image/[^;]+;base64,[^)]+)\)", re.IGNORECASE)
    match = pattern.search(content_str)

    if match:
        data_url = match.group(1)
        if "," in data_url:
            return data_url.split(",", 1)[1].strip()

    return None

def synthesize(prompt: str, input_image: Optional[Image.Image]) -> Optional[Image.Image]:
    """
    Call the Nanobanana API for generation.
    """
    if not prompt or not prompt.strip():
        gr.Warning("Please enter a prompt")
        return None

    print(f">>> Starting task: {prompt[:50]}...")

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {NANOBANANA_API_KEY}"
    }

    # Build payload conforming to OpenAI Vision / Chat standard
    messages = []

    if input_image is not None:
        # Image-to-image / multimodal input mode
        print(">>> Input image detected, using multimodal mode")
        img_base64 = image_to_base64_data_uri(input_image)
        messages.append({
            "role": "user",
            "content": [
                {"type": "text", "text": prompt},
                {"type": "image_url", "image_url": {"url": img_base64}}
            ]
        })
    else:
        # Text-to-image mode
        messages.append({
            "role": "user",
            "content": prompt
        })

    payload = {
        "messages": messages,
        # Use the model verified in the first code section
        "model": "gemini-2.5-flash-image",
        # Optional parameters, depending on API support
        "stream": False
    }

    try:
        # Increase timeout, image generation is usually slower
        response = requests.post(NANOBANANA_API_URL, headers=headers, json=payload, timeout=120)

        # Check HTTP status
        if response.status_code != 200:
            error_msg = f"API request failed: {response.status_code} - {response.text}"
            print(error_msg)
            gr.Error(error_msg)
            return None

        result = response.json()
        # Debug: Print first part of response for debugging
        print(f"API raw response (truncated): {str(result)[:200]}...")

        # Extract Content
        content = None
        if "choices" in result and len(result["choices"]) > 0:
            content = result["choices"][0].get("message", {}).get("content")

        if not content:
            gr.Warning("No content field in API response")
            return None

        # Use the previously verified logic to extract Base64
        base64_str = extract_base64_from_response(content)

        if base64_str:
            output_image = base64_to_image(base64_str)
            if output_image:
                return output_image

        # If no image was extracted, the model may have refused or only returned text
        text_content = str(content) if not isinstance(content, list) else " ".join([str(x) for x in content])
        gr.Info(f"No image generated, model returned text: {text_content[:100]}...")
        return None

    except requests.exceptions.Timeout:
        gr.Error("Request timed out, please try again later")
        return None
    except Exception as e:
        import traceback
        traceback.print_exc()
        gr.Error(f"An unknown error occurred: {str(e)}")
        return None

# Gradio interface configuration
with gr.Blocks(title="Nanobanana Image Generator") as app:
    gr.Markdown("# 🍌 Nanobanana Text/Image to Image")
    gr.Markdown("Based on Gemini-2.5-Flash-Image model, supports text-to-image and image-to-image.")

    with gr.Row():
        with gr.Column():
            prompt_input = gr.Textbox(
                label="Prompt",
                placeholder="e.g.: A cyberpunk cat holding a neon sign...",
                lines=3
            )
            image_input = gr.Image(
                label="Reference Image (optional, for image-to-image)",
                type="pil",
                height=300
            )
            submit_btn = gr.Button("Start Generation", variant="primary")

        with gr.Column():
            image_output = gr.Image(label="Generation Result", format="png")

    submit_btn.click(
        fn=synthesize,
        inputs=[prompt_input, image_input],
        outputs=image_output
    )

if __name__ == "__main__":
    app.launch(share=True)
```

当 Trae 指示运行成功时，点击它提供的本地链接（通常是 http://127.0.0.1:7860）。

![](/zh-cn/stage-2/frontend/lovart-assets/images/image9.png)

如果一切正常，你将看到一个功能齐全的 AI 绘画界面。

这个界面看起来可能很简单，但它已经拥有商业级绘图工具中最核心的两个功能：文本生成图像和图像生成图像。

* **左侧：命令区域（输入区）** — 这里是你给出指令的位置。
* **提示词（文本框）：** 输入你的创意描述（建议使用英文）。
* **输入图像（参考图像框）：**
  * **文本生成图像模式：** 保持此框为空。
  * **图像生成图像模式：** 将本地图像拖到这里，AI 将以此作为创作基础。
* **提交按钮：** 点击以发送你的指令并开始生成。
* **右侧：显示区域（输出区）** — 魔法发生的地方，生成的结果将显示在这里。

![](/zh-cn/stage-2/frontend/lovart-assets/images/image10.png)

现在我们可以尝试生成你的第一张图像！

本示例中的提示为：

> **一个红苹果**

这是一个故意简化的例子，没有包含任何风格或参数描述。

#### 实际流程

运行代码后，流程可以总结为三步：

1. 将文本描述发送给模型
2. 模型生成对应的图像
3. 图像被保存为本地文件

几秒钟后，你将在本地看到生成的结果。由于模型生成具有随机性，同样的提示会产生不同的结果。你可以多次生成并选择最喜欢的图像。

![](/zh-cn/stage-2/frontend/lovart-assets/images/image11.png)![](/zh-cn/stage-2/frontend/lovart-assets/images/image12.png)

你也可以通过提供更多描述和限制来丰富你的提示。例如，以下提示将产生一个更具特色的图像。

```Plain
"A hyper-realistic close-up of a fresh red apple with water droplets on its skin, sitting on a dark rustic wooden table. Cinematic dramatic lighting, rim light, shallow depth of field, bokeh background, 8k resolution, macro photography."
```

![]（/zh-cn/stage-2/frontend/lovart-assets/images/image13.png）

点击“输出图片”区域的下载，将图片保存到本地。

![]（/zh-cn/stage-2/frontend/lovart-assets/images/image14.png）

### 1.3 图像模型的常见资产生成场景

在现实工作中，大型模型图像生成更常用于**高效生产设计资产**，而非单件艺术作品。

当你看看那些以设计为核心的营销账户中常见的案例时，你会发现它们的大部分产出大致分为两类：

* **文本转图像（从0到1）**
* **基于参考的图像生成（从1到N）**

#### 一：文本转图像——快速获取设计素材

该类别侧重于效率。当你需要填补设计空白（如空状态、头像、插图）时，AI本质上是一个**即时生成的图像库**。

1. ##### 生成界面设计资源

* 流行趋势：玻璃形态和《Dribbble》中常见的粘土风格3D图标
* 常见表现：透明材质、边缘发光、糖果色功能或天气图标

**示例提示：**

>一组3D天气图标（太阳、云朵、雨），玻璃形态风格，磨砂玻璃纹理，柔和的柔和渐变色，柔和的工作室光线，等距视角，透明背景，4K。

![]（/zh-cn/stage-2/frontend/lovart-assets/images/image15.png）

2. ##### 生成标志

* 流行趋势：极简线条，几何组合，打造科技风格标志
* 常见表现：黑白配色方案，负空间设计，清晰的品牌识别

**示例提示：**

>为科技品牌“Coffee Code”设计的极简主义矢量标志，结合了咖啡杯和编码括号，< >平面设计，实心黑线，白色背景，保罗·兰德风格，svg。

![]（/zh-cn/stage-2/frontend/lovart-assets/images/image16.png）

3. ##### 生成网站用户头像

* 流行趋势：SaaS网站常用的3D虚拟头像，以避免真实人物版权问题
* 常见表现：友好表情，卡通比例，偏向皮克斯或Memoji风格

**示例提示：**

> 一位友善的年轻技术专业人士特写肖像，微笑着，Memoji 3D风格，粘土渲染，鲜艳色彩，柔和灯光，纯朴背景，皮克斯角色设计。

![]（/zh-cn/stage-2/frontend/lovart-assets/images/image17.png）

4. ##### 生成文章插图

* 流行趋势：科技公司博客中常见的抽象平面插画
* 常见表现：紫蓝色配色方案，夸张的人物比例，漂浮的界面元素

**示例提示：**

>编辑平面插画，代表远程工作，一个坐在巨大地球仪上使用笔记本电脑的人，企业孟菲斯艺术风格，鲜艳的色彩（紫色和青绿色），矢量纹理。

![]（/zh-cn/stage-2/frontend/lovart-assets/images/image18.png）

#### 第二：基于参考的图像生成——保持视觉一致性

这个类别更侧重于**可扩展性**。当你已经有一个满意的主视觉效果，需要生成一整套风格一致的资产时，它才会被用到。

5. ##### 一组按钮或与主视觉类似的交互资源

在游戏开发中，UI一致性至关重要。假设你已经为主界面制作了一个“PLAY”按钮，现在需要将其扩展为一整套样式统一的功能按钮（如暂停、设置、主页）。仅依靠手工绘制，很难确保每个按钮在光泽、透视和色值上完全一致。

**基本操作流程：**

1. 保存现有的蓝色“PLAY”按钮图片

![](/zh-cn/stage-2/frontend/lovart-assets/images/image19.png)

2. 将其拖入 **输入图片** 区域，作为后续生成的参考模板
3. 保持提示中的风格描述不变，只修改主体内容

通过这个流程，只要替换主体描述，就可以获得功能不同但风格一致的按钮。

**示例提示：**

**变体 A：暂停按钮（图标类型）**

> 一个胶囊形状的游戏UI按钮，内部有白色暂停图标（两条竖线）。相同的光亮蓝色果冻风格，闪亮的塑料质感，白色粗轮廓，矢量插画，高质量。

![](/zh-cn/stage-2/frontend/lovart-assets/images/image20.png)

**变体 B：设置按钮（复杂图标）**

> 一个胶囊形状的游戏UI按钮，内部有白色齿轮图标（设置符号）。相同的光亮蓝色果冻风格，闪亮的塑料质感，白色粗轮廓，矢量插画，高质量。

![](/zh-cn/stage-2/frontend/lovart-assets/images/image21.png)

**变体 C：重播按钮（形状变化）**

如果需要更改按钮形状，可以直接在提示中描述形状。模型将尝试在保留材质特性的同时改变结构。

> 一个圆形游戏UI按钮，内部有白色圆形箭头图标（重播符号）。相同的光亮蓝色果冻风格，闪亮的塑料质感，白色粗轮廓，矢量插画，高质量。

![](/zh-cn/stage-2/frontend/lovart-assets/images/image22.png)

通过这一系列操作，你不仅可以替换按钮功能和图标，甚至可以改变按钮形状，同时所有生成结果在材质、配色和光照上保持高度一致。这正是大型模型在设计素材生成场景中的核心价值。

## 第2章：更听话的图像生成助手——以 Lovart 为例

在第一部分，我们通过代码直接调用 NanoBanana，体验了基本的“输入并生成”流程。当需求简单时，这种方式完全可行。但当生成任务开始包含更多约束时，例如：

* 需要多张样式一致的图片
* 需要根据现有结果反复调整
* 需要根据用户输入动态修改生成方向

单次调用的方法逐渐显得不足。

这时你需要引入 **AI 智能代理（Intelligent 智能体）**。本节以 **Lovart** 为例，展示当图像生成模型拥有“思考层”时，整体工作流程会如何变化。注意！这不是广告，只是帮助大家快速了解 AI 智能代理的便利~

### 2.0 Lovart 简介：你的 AI 设计代理

Lovart 是一款基于代理的网页设计工具。相比普通的图像生成工具，它在生成前增加了一层“思考与规划”。

![](/zh-cn/stage-2/frontend/lovart-assets/images/image23.png)

![](/zh-cn/stage-2/frontend/lovart-assets/images/image24.png)

进入Lovart后，你主要需要理解以下操作：

#### 模特选择

点击输入框下方的立方体图标，查看当前可用的生成模型（如 GPT Image、Flux 等）。

为了与前述例子保持一致，本节仍以纳米香蕉作为底层生成模型。

![]（/zh-cn/stage-2/frontend/lovart-assets/images/image25.png）

#### 思考模式

这是洛瓦特的核心开关：

* **快速模式（⚡）:** 接近原生API，响应快速，适合单一且清晰指示的生成
* **思考模式（💡）:** 代理模式，AI先拆解需求，重写提示，然后执行生成

![]（/zh-cn/stage-2/frontend/lovart-assets/images/image26.png）

![]（/zh-cn/stage-2/frontend/lovart-assets/images/image27.png）

#### 网络访问

启用地球图标后，代理可以在生成过程中获取网络信息（如设计趋势、配色方案）作为补充输入。

### 2.1 为什么原生API还不够？

即使你已经可以通过Python生成不错的图片，原生API在复杂任务中仍有局限。关键原因是原生API本质上是必需的。当你要求它生成特定对象时，它可以直接执行;但当输入变成“规划一整套游戏资源”时，它不会主动将目标拆解成多个可执行步骤。

Lovart的核心区别在于其代理机制。在用户输入和图像生成模型之间，它增加了理解和规划的逻辑层：先识别用户意图，然后分解任务，重写提示，最后才执行生成。

### 2.2 动手演示：5分钟内制作一套IP贴纸包

我们以**“制作一套程序员鸭子IP贴纸包”**为例，看看代理如何参与整个过程。

#### 第一阶段：计划（特工的思维能力）

**原生API的问题：**
你需要自己思考角色设计和情绪状态，并为每张图片写出单独的提示。

**洛瓦特的方法：**

1. 开启💡**思考模式**
2. 输入一条指令：

> 设计一套程序员鸭子IP贴纸包，平面款式，可爱

AI不会立刻开始绘图。它首先会在网上搜索相关的程序员鸭子设计。然后它输出一个分解后的图纸，自动生成诸如调试、咖啡休息、恐慌等场景，并为每个场景配有相应的视觉描述。

![]（/zh-cn/stage-2/frontend/lovart-assets/images/image28.png）！[]（/zh-cn/stage-2/frontend/lovart-assets/images/image29.png）

在此步骤中，AI从“执行者”转变为“规划者”。AI分析完您的需求后，您可以在Lovart的画布区域看到各种程序员鸭子图片的样式和内容。您可以开始筛选您喜欢的样式。

![]（/zh-cn/stage-2/frontend/lovart-assets/images/image30.png）

#### 第二阶段：一致性（基于参考的视觉锚定）

洛瓦特中的图像不仅是结果——它们还参与了后续生成。

##### 完整参考图

* 从草图中选择最满意的“标准鸭子”，点击画布区域对应的图片
* 图片将自动出现在对话区域作为参考

![]（/zh-cn/stage-2/frontend/lovart-assets/images/image31.png）

* 输入一个新动作（如快乐）并生成

生成的结果将继承主模板的配色方案、比例和细节。

![]（/zh-cn/stage-2/frontend/lovart-assets/images/image32.png）

##### 部分参考/多图像集成

除了使用整张图片作为参考外，Lovart 还支持：

* **仅选择图像的部分区域**（例如，仅引用帽子或表达式）

点击画布区域左侧的标签栏，选择“标记”按钮，标记图片上的目标区域。这些内容会自动同步到对话框。例如，这里我们可以选择更改背景颜色。

![]（/zh-cn/stage-2/frontend/lovart-assets/images/image33.png）

![]（/zh-cn/stage-2/frontend/lovart-assets/images/image34.png）

![]（/zh-cn/stage-2/frontend/lovart-assets/images/image35.png）

你可以看到新生成的图像只改变了背景颜色，这与我们的输入要求一致。

* **分别引用多张图像的子元素**，然后将它们组合生成新结果

例如：你可以保留图片A中的角色作为主体，只用图片B中的样式替换帽子。代理会自动在背景中整合这些视觉约束。

以程序员鸭为例，我们可以选择保留第一张图片中的鸭子角色，并将其替换为第二张图片的主要主题元素。

![]（/zh-cn/stage-2/frontend/lovart-assets/images/image36.png）

![]（/zh-cn/stage-2/frontend/lovart-assets/images/image37.png）

最终效果非常惊人。你也可以尝试其他组合！

#### 第三阶段：交付（特工工具呼叫）

生成完成后，你可以直接执行：放大、移除背景、擦除及其他操作。

![]（/zh-cn/stage-2/frontend/lovart-assets/images/image38.png）

![]（/zh-cn/stage-2/frontend/lovart-assets/images/image39.png）

这些不是简单的过滤器——而是代理自动协调不同工具的结果。

确定了基础样式后，你可以非常快速地生成一系列贴纸包图片。

![]（/zh-cn/stage-2/frontend/lovart-assets/images/image40.png）

最终我们得到的是可以直接交付的生产资源，而不仅仅是展示图像。

### 2.3 使用情况与价格信息

Lovart 采用基于订阅的定价模式，不同套餐对应不同的使用配额和功能权限。具体详情请参阅官方网站。

本教程不推荐或比较任何具体套餐;如果你有实际使用需求，可以根据个人情况选择升级。
目前支持通过支付宝及其他方式支付。

![]（/zh-cn/stage-2/frontend/lovart-assets/images/image41.png）

#### 摘要

Lovart 并不取代底层模型——相反，通过其代理机制，它将图像生成从“单一执行”升级为“连续工作流”。

当任务开始涉及规划、一致性和交付时，这些工具的优势就非常明显了。

## 第三章：打造属于你自己的智能绘画助手

除了直接使用Lovart，我们还可以自己实现一个简化版的绘图助手。

本章以“自动文章插图”为例，从真实问题出发，逐步构建具备思考能力的代理。

### 3.1 问题：为什么直接发送文章到图像模型无法正常工作？

直接把长文输入NanoBanana并要求插图通常不会得到理想效果。原因不是模型“画得不好”，而是**它不擅长理解长文本**

图像生成模型更适合处理简短、清晰的视觉描述。当输入变成包含结构、关键点和上下文关系的文章时，模型无法判断哪些内容真正需要在图像中表达。这常常导致结果偏离主题，或仅捕捉零散细节，缺乏整体总结能力。

本质上，图像模型仅具备“执行”能力，缺乏分析和权衡文本的过程。

![]（/zh-cn/stage-2/frontend/lovart-assets/images/image42.png）

### 3.2 解决方案：使用代理将“理解”与“执行”区分开

解决这个问题的关键不是更复杂的提示，而是**在绘制前先思考问题**。因此，我们在生成过程中引入一个独立的“思考层”，并用它构建最简单且可用的代理。

该代理只有一个核心目标：**使最终生成的图像尽可能接近用户的真实表达意图。**

整体过程可以总结为：**长文本输入 → 语言模型理解与判断 → 生成合适的视觉提示 →图像模型执行生成 →输出图像**

![]（/zh-cn/stage-2/frontend/lovart-assets/images/image43.png）

那么，我们构建的代理如何理解用户的意图呢？

这里我们选择创建一个简化的**“思维层”**，具有三种不同的意图：无效输入、直接生成图像和需要理解的长文本。

在该代理中，不同角色之间的分工可以总结为四点：

1. **语言模型作为决策核心**
   它负责理解文章内容，判断用户输入意图，并将任务分配到合适的生成路径，决定“下一步该做什么”以及如何生成图片提示。
2. **形象模型作为执行人**
   图像模型不参与理解或判断——它只接收有条理的视觉指令，专注于完成图像渲染。
3. **用户作为中间引导者**
   除了直接输入文本外，用户还可以在过程中手动调整生成提示，或添加参考图片以辅助生成，从而指导和微调最终结果。
4. **Gradio 和后端 API 作为整体基础设施**
   他们负责连接接口、模型调用和结果显示，确保整个代理能够作为一个完整的网络应用稳定运行。

![]（/zh-cn/stage-2/frontend/lovart-assets/images/image44.png）

### 3.3 准备工作：获取API

看起来很有趣，对吧！要完成上述流程，我们只需要准备两种类型的API。

#### 手部：纳米香蕉API（图像生成）

直接重用第一章中已配置好的API密钥和API URL——无需额外设置。

#### 大脑：SiliconFlow API（文本思维）

我们需要一个大型语言模型作为“思维层”。本教程使用SiliconFlow提供的模型服务：[https://cloud.siliconflow.cn]（https://cloud.siliconflow.cn/）

![]（/zh-cn/stage-2/frontend/lovart-assets/images/image45.png）

SiliconFlow 提供与 OpenAI API 规范兼容的接口，可以在你的项目中通过标准网络请求轻松调用。这里我们选择免费的 Qwen2.5-7B-Instruct 模型。调用所需的一切已经写入下面的 提示词。在开始之前，你只需要在官方网站注册一个账号并创建一个 API Key。

![](/zh-cn/stage-2/frontend/lovart-assets/images/image46.png)

![](/zh-cn/stage-2/frontend/lovart-assets/images/image47.png)

这个 Key 将用于后续的模型调用。

### 3.4 构建 智能体：

本实验主要使用 Trae 来帮助我们编写代码。本教程使用 Gemini-3-Pro-Preview 模型。总体思路是：创建一个新项目，将下面完整的 提示词 复制到对话框中并提交，逐步替换 API KEY，然后运行代码并完成测试。

![](/zh-cn/stage-2/frontend/lovart-assets/images/image48.png)

#### 阶段 1：Gradio Blocks 基本框架和界面布局

在这一阶段，我们的主要目标是首先为整个 智能体 构建一个“外观”，实现前端页面设计。将以下 提示词 复制到 Trae 对话框中实现它，你将获得一个本地 URL（通常是 http://127.0.0.1:7860），可以在该 URL 查看界面并验证实现效果。

```Plain
Module 1: Gradio Blocks Basic Framework and Interface Layout
1. Task Objective
Based on Gradio 4.0.0+ Blocks layout, implement the basic interface for the "LLM + Nanobanana text-to-image" project, strictly following the fixed left-right split layout, initializing all UI components and setting correct initial states.

2. Tech Stack Requirements
Must use Gradio 4.0.0+ Blocks mode development, Interface mode is prohibited;
Dependencies: gradio>=4.0.0, pillow>=10.0.0 (import only, image processing logic not implemented yet);
Code must be a complete runnable Python file with all necessary import statements.

3. Interface Layout Rules (Core Constraints, Integrating Practical Details)
Overall Layout:
Page title: LLM-Driven Text-to-Image Full-Process Tool;
Fixed left-right split: left side takes 60% width, right side takes 40% width, using gr.Row and gr.Column to implement ratio control.
Left 60% (Prompt Generation Process Area) Component List:
input_text: gr.Textbox, label "Input Text (Tutorial Paragraph / Drawing Instruction)", lines=6, placeholder "Please enter the tutorial text that needs illustration or a direct drawing instruction...";
identify_intent_btn: gr.Button, value="Identify Intent", initial state normally clickable;
intent_status: gr.Textbox, label "Intent Type / Processing Status", lines=2, interactive=False, initial value "Intent not identified";
system_prompt: gr.Textbox, label "System Prompt (Editable only for article illustration intent)", lines=4, interactive=False, placeholder "LLM constraint rules for prompt generation...";
confirm_prompt_btn: gr.Button, value="Confirm Generate Image Prompt", interactive=False (initially disabled to prevent accidental clicks);
generation_prompt: gr.Textbox, label "Image Generation Prompt (Editable)", lines=3, interactive=True, initial value empty, placeholder "Generated English image prompt will be displayed here, supports manual editing...".
Right 40% (Nanobanana Image Generation Function Area) Component List:
ref_image: gr.Image, label "Reference Image (Optional, for Image-to-Image)", type=filepath, height=300, allows upload;
generate_btn: gr.Button, value="Generate Image", interactive=False (initially disabled, cannot click without a prompt);
result_image: gr.Image, label="Generation Result", type=pil, height=300, initial empty, interactive=False.

4. Interaction Logic Requirements
All component interactive initial states strictly follow the above configuration, dynamically updated by functions later;
Button disabled states should be visually apparent (grayed out) to prevent user misoperation.

5. Output Requirements
Generate complete Python code that only implements interface layout and component initialization, without any business logic;
Clear code comments, component naming consistent with the practical version (input_text/identify_intent_btn, etc.);
Code is directly runnable, interface structure matches the description exactly.
```

在浏览器中打开 http://127.0.0.1:7860 后，你可以看到 Trae 根据我们的要求生成了以下网页，大体上与我们的要求一致，你可以进行下一步生成。

![](/zh-cn/stage-2/frontend/lovart-assets/images/image49.png)

#### 阶段 2：LLM 意图识别模块（Siliconflow API）

在日常使用 VLM 绘图时，通常有三种常见的输入场景：

1. 无意义的内容，例如“你好”“你今天吃饭了吗”等，这类内容无法生成对应的图片。
2. 文章/长文本，字数较多，例如一篇大约 200 字的结构化文章，需要先理解文章的结构和内容，再考虑如何生成能完整概括文本的图片。
3. 直接的绘图指令，例如“帮我画一只正在洗澡的狗”，此类需求已经非常具体，可以直接生成图片。

和以前一样，将以下提示复制到 Trae 对话框中以实现，并填写在前几步中获得的 API。

```Plain
Module 2: LLM Intent Recognition Module (Siliconflow API)
1. Task Objective
Based on the implemented Gradio interface, add click logic for the "Identify Intent" button, call the Siliconflow API to complete intent recognition, and link component states.

2. Tech Stack Requirements
Based on Gradio 4.0.0+ Blocks;
Dependencies: requests>=2.31.0, openai;
Output complete runnable Python file, including Module 1 interface + this module's logic.

3. Core Business Rules (Absolutely Must Not Deviate)
Intent Classification Rules (Only 3 categories, strictly return number + description)
1 = Meaningless content: only small talk, greetings, irrelevant conversation, no drawing or illustration needs (e.g., "hello" "did you eat");
2 = Article / Long text illustration need: user inputs a complete article, tutorial, paragraph, explanatory text, content is narrative / explanatory / instructional, implicitly implying the need to generate an illustration for this content, user doesn't need to explicitly say "illustrate this text";
3 = Direct drawing instruction: user inputs a short, clear drawing command, no long text background, directly requesting to draw something specific (e.g., "draw an Apple-style cat").
LLM Call Constraints (Integrating Practical Template)
Interface address: https://api.siliconflow.cn/v1/chat/completions;
Model: Qwen/Qwen2.5-7B-Instruct;
temperature=0.1;
Unified code definition:
python
Run
LLM_BASE_URL = "https://api.siliconflow.cn/v1"
LLM_API_KEY = ""  # User replaces themselves
LLM_MODEL = "Qwen/Qwen2.5-7B-Instruct"# Practical verified intent recognition template (hardcoded in code)
INTENT_PROMPT_TEMPLATE = """You need to identify the intent of the user's input text, only return one of the following 3 categories (format: number + description):
1 = Meaningless content; 2 = Article / Long text illustration need; 3 = Direct drawing instruction.

User input: {user_input}

Recognition result:
Only extract the number and description from the result, no additional content allowed."""

4. Component Linking Rules
Result is 1: intent_status displays "1 = Meaningless content: no drawing need", system_prompt remains disabled, confirm_prompt_btn disabled;
Result is 2: intent_status displays "2 = Article / Long text illustration need: generate illustration for input content", enable system_prompt and fill default rules, activate confirm_prompt_btn;
Result is 3: intent_status displays "3 = Direct drawing instruction: generate image based on instruction", system_prompt disabled and filled with default rules, activate confirm_prompt_btn.

5. Exception Handling
API exceptions, parsing exceptions all give friendly prompts, no crashes, components restore to initial state.

6. Output Requirements
Generate complete runnable code, just replace LLM_API_KEY to use, logic clear with complete comments, intent recognition template strictly uses the practical version.
```

刷新之前的 http://127.0.0.1:7860 URL，并开始测试它是否能正确检测三种场景。

1. 无意义内容，你可以尝试输入“hello”、“thanks”等内容，会发现它可以被正确识别。

![](/zh-cn/stage-2/frontend/lovart-assets/images/image50.png)

2. 文章/长文本，这里我们使用了一段由斗宝生成的关于人工智能的文字。你也可以尝试使用自己的作文段落进行测试。

```Plain
Artificial intelligence is reshaping the education ecosystem with unprecedented depth and breadth. Through adaptive learning algorithms, AI systems can build cognitive maps for each student, track their knowledge mastery trajectory in real-time, and dynamically adjust the difficulty and presentation of teaching content. In traditional classroom environments, teachers often struggle to simultaneously meet the needs of students with different learning styles and ability levels, while deep learning-based education platforms can analyze students' behavioral patterns in interactive simulation experiments, identify their subtle obstacles in understanding complex concepts like quantum mechanics or calculus, and provide precise cognitive scaffolding.

Advanced natural language processing engine-driven virtual tutors can not only deconstruct open-ended questions like "How to evaluate the impact of the French Revolution on modern democratic systems," but also guide Socratic dialogue to stimulate critical thinking. When students write essays about the impact of climate change on polar ecosystems, AI writing assistants can analyze the rigor of their argumentation logic, point out timeliness issues in data citations, and suggest more precise scientific terminology. In special education, computer vision technology enables AI to recognize non-verbal cues from children on the autism spectrum during social interactions and adjust intervention strategies, while affective computing algorithms help detect frustration during online learning and provide timely encouraging feedback.

However, this technological integration raises a series of ethical dilemmas. Algorithmic bias may inadvertently marginalize students from certain cultural backgrounds, transparency issues in data collection raise concerns about academic privacy, and over-reliance on automated grading systems may weaken teachers' deep understanding of students' thinking processes. More complexly, when AI begins generating highly realistic virtual laboratory experiences, we need to redefine the value of "practical experience" in education. The future education paradigm may evolve into human teachers focusing on cultivating creativity, empathy, and moral judgment, while AI systems assume the functions of knowledge transmission, skill training, and personalized assessment, forming a co-evolving educational symbiosis that both leverages machine computational advantages and preserves the unique warmth of human education.
```

也成功检测到了~

![](/zh-cn/stage-2/frontend/lovart-assets/images/image51.png)

3. 直接绘图指令，这里我们输入了“我想画一只猫”，也被准确检测到了。

![](/zh-cn/stage-2/frontend/lovart-assets/images/image52.png)

到此为止，我们已经成功实现了第二阶段——意图识别。

#### 第三阶段：图像提示生成模块（LLM 第二次调用）

在意图识别之后，对于文章或长文本，还有一个非常重要的步骤——生成绘图提示，这也是这个 智能体 的重点工作。

```SQL
Module 3: Image Prompt Generation Module (LLM Second Call)
1. Task Objective
Based on intent recognition, implement the "Confirm Generate Image Prompt" button logic, call LLM to optimize text into English visual prompts suitable for drawing, fill into the edit box and link the "Generate Image" button.

2. Tech Stack Requirements
Same as Module 2, output complete code = Module 1 + Module 2 + this module;
Share the LLM_BASE_URL, LLM_API_KEY, LLM_MODEL defined in Module 2, no new keys needed.

3. Core Business Rules (Integrating Practical Prompt Assembly Logic)
Prompt Generation Input Rules (Must Strictly Follow)
Image prompt generation is no longer simple string concatenation, but building a standard Chat message list, code structure as follows:
python
Run
messages=[# System role: the final confirmed/edited system_prompt content from the web page{"role": "system", "content": final_system_prompt},# User role: carries data to be processed, clarifies task objective{"role": "user", "content": f"Please generate visual prompts for the following content:\n\n{user_input}"}]
When intent is 2: System content takes the user-edited system_prompt final version;
When intent is 3: System content takes the default rules filled in disabled state
user_input is the original text the user initially entered in the input_text box.
Practical Verified System Prompt Preset (Hardcoded in Code)
python
Run
SYSTEM_PROMPT_DEFAULT = """You are now an assistant for creating NanoBanana drawing prompts.
You need to process based on my content. The purpose of this image is to illustrate what this passage is saying, and let everyone understand the overall structure of this text.
It may include some PPT-like annotations (e.g., top left shows core viewpoint, bottom right shows data).
Design style requirements: minimalist, Apple Design Philosophy.
Constraint: Please directly return English prompts usable by NanoBanana, do not return any explanations, prefixes, or unnecessary words."""
LLM Call Constraints
Share the same LLM_BASE_URL, LLM_API_KEY, LLM_MODEL with Module 2;
temperature=0.7 (ensure prompt creativity and adaptability);
max_tokens=200 (limit output length, matching prompt constraints);
Strictly use the above standard Chat message list structure, string concatenation is prohibited.
Example Input/Output (Core Reference)
Example Input 1 (Article Illustration Intent): Original text: "How AI is changing education: With the development of AI technology, the role of teachers has shifted from knowledge transmitters to guides, AI assistants can help students complete personalized learning, and human-machine collaboration in classrooms has become the norm." Final System Prompt: SYSTEM_PROMPT_DEFAULT (unmodified) Expected output: "Minimalist illustration, Apple Design Philosophy, 1024x1024. Top left shows 'AI + Education' core concept, bottom right shows data of teacher-student-AI collaboration, soft color palette, clean lines, no redundant elements."
Example Input 2 (Direct Drawing Instruction): Original text: "Draw an Apple-style cat sitting next to a MacBook" Final System Prompt: SYSTEM_PROMPT_DEFAULT (disabled state) Expected output: "Minimalist cat, Apple style, 1024x1024, sitting next to a silver MacBook, clean white background, soft shadows, geometric shapes, no extra details."
Prompt Output Mandatory Constraints
Pure English, no Chinese;
Must include Apple Design Philosophy/Apple style + 1024x1024;
Length 50-200 characters, verified in code;
No additional explanations, prefixes, or unnecessary words, only return the prompt itself.

4. Component Linking Rules
Generation successful: fill prompt into generation_prompt box, activate generate_btn, append "Prompt generated successfully, can edit then generate image" to intent_status;
Generation failed: show specific reason (such as API call failure, length not met), generate_btn remains disabled, generation_prompt box empty;
User manually edits / clears generation_prompt box:
When cleared, automatically disable generate_btn;
When non-empty, keep generate_btn activated.

5. Exception Handling
API call failure: friendly prompt "Prompt generation failed: {specific error message}", no crash;
Prompt validation failure: clearly state reason (such as "Apple style not included" "length only 40 characters"), allow retry;
Response parsing failure: prompt "Unable to parse LLM return result, please retry".

6. Output Requirements
Complete runnable code, just replace LLM_API_KEY to use;
Clear code structure, complete comments, beautiful and concise interface;
Strictly implement standard Chat message list structure, parameters and example logic consistent;
Include prompt length and content validation logic, friendly error messages.
```

同样，用第二阶段的文本进行测试。

值得注意的是，这里生成图像提示的预设系统提示是：

> 你现在是一个用于创建 NanoBanana 绘图提示的助手。
> 你需要基于我的内容进行处理。此图像的目的是说明这一段文字的内容，并让每个人理解文本的整体结构。
> 它可能包括一些类似 PPT 的注释（例如左上角显示核心观点，右下角显示数据）。
> 设计风格要求：极简主义，苹果设计理念。
> 约束：请直接返回可用于 NanoBanana 的英文提示，不要返回任何解释、前缀或不必要的词语。

如果你想切换到其他预设模板，可以在之前的提示中修改，或通过 Trae 的对话直接修改。

![](/zh-cn/stage-2/frontend/lovart-assets/images/image53.png)

除了修改底层代码，我们还可以快速在网页上编辑。例如，我在这里添加了一句话，“在开头添加‘Pic 提示词’”，你可以看到新生成的提示也会在前面包含它。这个设计是为了方便快速修改生成提示的系统提示，帮助我们快速切换风格。

![](/zh-cn/stage-2/frontend/lovart-assets/images/image54.png)

#### 第四阶段：Nanobanana 文本生成图像 / 图像生成图像模块

最后，我们到了最后一步——如果不连接到图像生成模型，这并不是一个完整的助手！

```Bash
Module 4: Nanobanana Text-to-Image / Image-to-Image Module (Final Version)
1. Task Objective
Implement the "Generate Image" button logic, call the real Nanobanana API, support text-to-image / image-to-image, parse Base64 and display images.

2. Tech Stack Requirements
Based on Gradio 4.0.0+ Blocks;
Dependencies: requests, pillow, base64, io, re;
Complete code = Module 1+2+3 + this module.

3. Core API Configuration (Practical Verified Hardcoded)
Hardcoded configuration:
python
Run
# Hardcoded API configuration
NANOBANANA_API_URL = "https://api.zyai.online/v1/chat/completions"
NANOBANANA_MODEL = "gemini-2.5-flash-image"
NANOBANANA_API_KEY = ""  # User replaces themselves
Authentication: Header Authorization: Bearer {NANOBANANA_API_KEY}.

4. Image Preprocessing Requirements (Must Implement)
Implement function image_to_base64_data_uri (ref_image_path), core logic:
Convert PIL image to PNG format;
Auto-scale to 1024x1024 resolution;
Convert transparent channel to white background;
Encode as Base64, return format: data:image/png;base64,....

5. Request Construction Rules (Strictly Follow Practical Branch Logic)
Core Function Definition
Implement function generate_image (prompt, ref_image_path):
Parameters: prompt (generation_prompt box content), ref_image_path (ref_image uploaded file path);
Returns: PIL Image (displayed in result_image) or error message.
Logic Branch 1: Pure Text-to-Image (ref_image_path is empty)
python
Run
messages = [{"role": "user", "content": prompt}]
Logic Branch 2: Image-to-Image (ref_image_path has value)
python
Run
# First call image preprocessing function
image_base64 = image_to_base64_data_uri(ref_image_path)
messages = [{"role": "user","content": [{"type": "text", "text": prompt},{"type": "image_url", "image_url": {"url": image_base64}}]}]

6. Response Parsing Requirements (Must Be Compatible with Two Formats)
Extract image Base64 from choices[0].message.content, supporting:
Structured JSON returned image_url field;
Markdown format ![img](data:image/...);
Unified extraction of Base64 encoding, decode then convert to PIL Image return.

7. Component Linking and Exception Handling
Generation successful: display PIL Image in result_image, intent_status prompts "Image generation successful";
Generation / parsing / upload failure: display clear text message in intent_status (such as "Base64 parsing failed" "API call timed out"), no crash.

8. Output Requirements
Complete runnable code, just replace LLM_API_KEY and NANOBANANA_API_KEY to run directly, full process available, branch logic strictly matches practical version.
```

![](/zh-cn/stage-2/frontend/lovart-assets/images/image55.png)

太激动了！我们终于成功地从这个智能体生成了第一张图片。仔细看看生成的图片——它与我们的文本和提示完全匹配。到此为止，你基本上已经实现了自己的智能体！

![](/zh-cn/stage-2/frontend/lovart-assets/images/image56.png)

我们还添加了图像到图像的功能——上传你喜欢的图片，AI会自动参考其风格。

![](/zh-cn/stage-2/frontend/lovart-assets/images/image57.png)

值得一提的是，之前步骤中生成的提示也可以在网页上编辑，我们使用的是最终点击按钮时的提示作为最终版本。即使我在这里改成“可爱的小猫”，最终生成的图片也只会是一只可爱的小猫。

## 第四章：总结

![](/zh-cn/stage-2/frontend/lovart-assets/images/image58.png)

**哇哦！终于写完了。**

说实话，当我写完最后一行时，我自己都忍不住长舒了一口气，更不用说你这个一直跟随到这里的人了。能够完整地跑通整个流程，本身就已经很了不起了。这意味着你真的动手在键盘上操作，并一步步完成了任务。太棒了！

在撰写这些内容的过程中，我一直在思考我们真正想留给你的是什么。答案其实不是模型名称、参数，或某些固定公式——而是帮助你逐渐建立一种感觉：哪些事情可以安全地交给AI去理解和规划，哪些地方只是需要你来决定方向。一旦这种分工明确，许多原本看起来复杂的生成过程就会自然地顺畅起来。

回头看，这条路其实并不复杂。找出你想解决的问题，把长文本交给语言模型进行分解，然后把整理好的视觉意图交给绘图模型去渲染，最后把整个过程打包成你自己的小助手。到这个时候，你不再只是“使用一个模型”——你正在构建一个能够长期与你协作的系统。而这正是本教程最想传递给你的内容。

但你已经做得非常棒了！我相信，学习到这里，你已经对氛围编程有了初步的掌握。给自己一点休息时间，好好放松一下吧！

<RelatedArticlesSection
  title="相关文章"
  description="如果你想真正将‘资源生成’整合到产品工作流程中，可以继续学习这些章节。"
  :items="relatedArticles"
/>