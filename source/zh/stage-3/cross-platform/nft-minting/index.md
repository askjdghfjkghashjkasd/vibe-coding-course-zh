# 如何快速构建并铸造一个NFT：10分钟入门版

# 第一章：什么是NFT和智能合约

在本教程中，我们将完成一个完整的闭环：从零开始编写NFT智能合约，部署到以太坊测试网，铸造自己的NFT，并在OpenSea上查看。整个过程使用基于浏览器的工具，无需本地环境搭建，10分钟内即可完成。

对于这个教程，你至少应该具备：

- Chrome 浏览器（已安装 MetaMask 钱包扩展）
- 一个MetaMask钱包账户
- 少量Sepolia测试网ETH（免费领取，见下文）

> **零成本，零设置**：整个过程使用基于浏览器的工具（Remix IDE），无需安装Node.js/硬帽;代码使用OpenZeppelin官方安全模板;铸造完成后，你可以在OpenSea测试网上查看你的NFT。

## 1.1 什么是NFT？

NFT（非同质化代币）是一种区块链上的数字资产。与比特币或以太币等同质化代币不同，每个NFT都是独一无二的，世界上没有两幅画是完全相同的。

你可以把NFT理解为**“数字世界中的收藏证书”。** 它可以代表：

* 数字艺术品的所有权
* 活动门票
* 游戏物品
* 学习证书
* 甚至一条推文

NFT的核心价值是：**它们利用区块链技术证明“这个数字物品属于你”，并且证明是公开、透明且防篡改的。**

<!-- ![占位符：NFT概念图：左侧数字艺术品，右侧区块链所有权记录，通过箭头连接](../../../../zh-cn/stage-3/跨平台/nft-minting/images/image1.png） -->

## 1.2 什么是智能合约？

智能合约是一段运行在区块链上的代码。你可以把它看作**“自动执行的合约”**。一旦部署到链上，它会根据代码逻辑自动运行，没有人能篡改它。

NFT是通过智能合约创建和管理的。当你“铸造”一个NFT时，实际上是在调用智能合约中的一个函数，在链上写道：“NFT #0属于你的钱包地址。”

我们将使用**Solidity**来撰写合同。别担心。使用OpenZeppelin的现成模板，您只需编写少于15行代码。

## 1.3 我们铸造的是什么NFT？

我们将铸造一份**“Vibe Coder 学习证书”** NFT，以证明您已完成本教程并掌握了区块链开发基础知识。该NFT将：

* 拥有唯一的令牌ID
* 将在以太坊Sepolia测试网上记录
* 可在OpenSea测试网上查看和显示
* （可选）包含您的自定义图片

当然，你可以更改为任何你喜欢的主题：AI生成的艺术作品、活动纪念卡、像素头像等等。NFT内容完全由你决定。

## 1.4 为什么要用测试网？

以太坊有“主网”和“测试网”：

|比较 |主网 |测试网（Sepolia） |
|------|----------------|------------------|
|ETH价值 |真钱 |自由宣称，无真实价值 |
|部署费用 |需要真实的燃气费 |完全免费 |
|使用场景 |生产发布 |学习、测试、开发 |
|功能差异 |无 |与主网相同 |

Testnet 和主网在功能上是一样的。唯一的区别是 testnet 以太坊没有真正的价值。所以你可以安全地在 testnet 上学习和实验，不用担心花钱。

## 1.5 教程路线图

我们将通过以下步骤完成流程：

1. **准备钱包并测试ETH**（2分钟）：安装MetaMask并领取免费测试ETH
2. **编写并部署合约**（4分钟）：在Remix IDE中编写NFT合约并部署到Sepolia
3. **铸造NFT并查看结果**（4分钟）：呼叫合约铸造NFT并在OpenSea和Etherscan上验证
4. **高级：将图片添加到NFT中**（可选）：将图片存储在IPFS上以使NFT完整

# 第二章：准备钱包并测试以太坊（2分钟）

## 2.1 安装MetaMask钱包

MetaMask 是以太坊上最受欢迎的钱包。它是一个浏览器扩展，允许你与区块链应用交互。

1. 打开Chrome并访问[MetaMask官方网站]（https://metamask.io/）
2. 点击**“下载”**并安装Chrome扩展
3. 安装后，点击右上角的MetaMask狐狸图标
4. 选择**“创建新钱包”**并设置密码
5. **重要**：保护好你的恢复短语（12个单词）。丢失测试钱包没关系，但良好习惯很重要

<!-- ![占位符：MetaMask 安装和钱包创建流程截图：安装扩展 -> 创建钱包 -> 设置密码 -> 备份恢复短语]（../../../../zh-cn/stage-3/跨平台/NFT铸造/图片/image2.png）-->

## 2.2 切换到 Sepolia Testnet

MetaMask默认连接到以太坊主网。我们需要切换到Sepolia测试网：

1. 点击MetaMask顶部的网络下拉菜单（默认：“以太坊主网”）
2. 点击**“显示测试网络”**
3. 选择**“Sepolia测试网络”**

如果没有看到Sepolia，请点击**“添加网络”**并手动添加：

|配置项 |值 |
|-------|-----|
|网络名称 |Sepolia测试网络 |
|RPC网址 |`https://rpc.sepolia.org` |
|链条编号 |11155111 |
|货币符号 |SepoliaETH |
|方块探索器 |`https://sepolia.etherscan.io` |

<!-- ![占位符：通过网络下拉菜单切换 MetaMask 到 Sepolia 测试网的截图](../../../../zh-cn/stage-3/跨平台/NFT铸造/图片/image3.png） -->

## 2.3 无索赔测试以太坊

部署合约和铸造NFT需要支付Gas费。在testnet上，Gas是用测试ETH支付的，测试ETH是免费的。

请访问下方任意水龙头，输入您的钱包地址即可免费领取Sepolia ETH：

|水龙头 |网址 |每次索赔金额 |需要登录 |
|--------|------|-----------|------------|
|快速节点 |`https://faucet.quicknode.com/ethereum/sepolia` |0.1 ETH |是的 |
|炼金术 |`https://www.alchemy.com/faucets/ethereum-sepolia` |0.1 ETH |是的 |
|谷歌云 |`https://cloud.google.com/application/web3/faucet/ethereum/sepolia` |0.05 ETH |是的（谷歌账户） |

> **提示**：0.1测试ETH足够部署合约和铸造数十个NFT。如果一个水龙头坏了，试试另一个。

成功领取后，返回MetaMask，你的余额应该会从0变成0.1 ETH（可能需要几秒钟）。

<!-- ![占位符：水龙头网站截图显示钱包地址输入并申报测试ETH](../../../../zh-cn/stage-3/跨平台/NFT铸造/图片/image4.png） -->

# 第三章：编写并部署NFT智能合约（4分钟）

## 3.1 开放混音集成开发环境

Remix 是以太坊官方推荐的在线智能合约开发环境。它完全运行在浏览器中，无需安装。

开场时间：**https://remix.ethereum.org/**

你会看到类似 VS Code 的界面：左边是文件资源管理器，中间是代码编辑器，右边是编译/部署面板。

<!-- ![占位符：Remix IDE 主屏幕截图，显示文件资源管理器、代码编辑器和右侧面板](../../../../zh-cn/stage-3/跨平台/NFT铸造/图片/image5.png） -->

## 3.2 创建合同文件

1. 在左侧文件资源管理器中，点击 **"contracts"** 文件夹
2. 点击上方的 **" "** 按钮以创建新文件
3. 将其命名为 **`MySimpleNFT.sol`**
4. 粘贴以下代码：

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Import OpenZeppelin official secure ERC721 template
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

// Simplest NFT contract: name, symbol, mint function only
contract MySimpleNFT is ERC721 {
    uint256 private _tokenId;

    // Initialize collection name and symbol
    constructor() ERC721("VibeCoder", "VIBE") {}

    // Mint NFT: call once to mint one token to caller
    function mint() public {
        _safeMint(msg.sender, _tokenId);
        _tokenId++;
    }
}
```

**代码讲解（少于15行，每行都易于理解）：**

| 代码 | 含义 |
|------|------|
| `pragma solidity ^0.8.20` | 指定 Solidity 编译器版本 |
| `import "@openzeppelin/..."` | 导入 OpenZeppelin ERC721 标准实现（经过安全审计的模板） |
| `contract MySimpleNFT is ERC721` | 创建一个继承 ERC721 标准的合约 |
| `ERC721("VibeCoder", "VIBE")` | 设置收藏名称为 "VibeCoder"，符号为 "VIBE" |
| `_safeMint(msg.sender, _tokenId)` | 向调用者铸造一个新的 NFT |
| `_tokenId++` | 每次铸造后递增代币 ID |

> **什么是 ERC721？** 它是以太坊上的 NFT 标准，定义了基本的 NFT 功能（转移、所有者查询等）。OpenZeppelin 提供了经过安全审计的实现，所以我们可以直接继承，而无需从零构建。

<!-- ![占位符：在 Remix IDE 中粘贴的合约代码截图](../../../../zh-cn/stage-3/cross-platform/nft-minting/images/image6.png) -->

## 3.3 编译合约

1. 点击左侧面板中的 **“Solidity 编译器”**（锤子图标）
2. 选择编译器版本 **0.8.20**（或 0.8.x 中更高版本）
3. 点击 **“编译 MySimpleNFT.sol”**
4. 出现绿色勾 ✅ 表示编译成功

> 如果出现错误，请检查 Solidity 版本是否匹配以及 OpenZeppelin 导入路径是否正确。Remix 会自动从 npm 下载 OpenZeppelin 依赖。

<!-- ![占位符: Remix 编译成功截图，带绿色勾选和所选编译器版本](../../../../zh-cn/stage-3/cross-platform/nft-minting/images/image7.png) -->

## 3.4 部署合约到 Sepolia 测试网

1. 在左侧面板（以太坊图标）点击 **“Deploy & Run Transactions”**
2. 将 **Environment** 设置为 **“Injected Provider - MetaMask”**
   - 这会自动连接你的 MetaMask 钱包
   - MetaMask 会弹出连接请求，点击 **“Connect”**
3. 确认网络为 **Sepolia (11155111)**
4. 在合约下拉菜单中选择 **MySimpleNFT**
5. 点击 **“Deploy”**
6. MetaMask 弹出交易确认，点击 **“Confirm”**（Gas 很低；测试网络免费）

几秒钟后，当部署成功时，下方的 **“已部署合约”** 部分将显示你的合约地址。**复制并保存此地址**；你稍后将需要它。

<!-- ![占位符：Remix 部署截图，显示环境选择、MetaMask 确认、部署按钮和已部署合约地址](../../../../zh-cn/stage-3/cross-platform/nft-minting/images/image8.png) -->

# 第4章：铸造NFT并验证结果（4分钟）

## 4.1 铸造你的第一个 NFT

部署成功后，在 Remix 的 **"已部署合约"** 部分，您将看到合约交互面板。

1. 展开合约面板并找到 **“铸造”** 按钮（橙色）
2. 直接点击 **“铸造”**（无需输入参数）
3. MetaMask 弹出交易确认，点击 **“确认”**
4. 等待几秒钟完成

恭喜！你刚刚铸造了 NFT #0，它现在属于你的钱包地址。

你可以继续点击“铸造”来创建更多。每次铸造时，代币ID会自动递增（#1，#2，#3...）。

<!-- ![占位符：在 Remix 中点击铸造并在 MetaMask 中确认交易的截图](../../../../zh-cn/stage-3/cross-platform/nft-minting/images/image9.png) -->

## 4.2 验证铸造结果

**方法 1：在 Remix 中验证**

在合约面板中，找到 **"balanceOf"**（蓝色按钮），输入你的钱包地址，然后调用它。如果返回 `1`（或你铸造的数量），则铸造成功。

你也可以调用 **"ownerOf"**，输入 `0`（代币 ID），它会返回你的钱包地址，证明 NFT #0 属于你。

**方法 2：在 Etherscan 上验证（推荐）**

1. 打开 [Sepolia Etherscan](https://sepolia.etherscan.io/)
2. 将你的 **合约地址** 粘贴到搜索栏
3. 你会看到包含所有交易记录的合约详情页面
4. 点击 **"词元 Tracker"** 查看你的合约铸造的所有 NFT

在 Etherscan 上，每笔铸造交易都有完整记录：谁铸造了、何时铸造以及代币 ID。这就是区块链“公开、透明、防篡改”的魅力。

<!-- ![placeholder: Screenshot of viewing contract and NFT mint records on Sepolia Etherscan, including transaction list and 词元 Tracker](../../../../zh-cn/stage-3/cross-platform/nft-minting/images/image10.png) -->

# 第五章：高级 - 为 NFT 添加图像（可选）

迄今为止铸造的 NFT 只有 ID，没有图像或描述。为了让 NFT 完整，我们需要 **IPFS（星际文件系统）** 来存储图像和元数据。

## 5.1 什么是 IPFS？

IPFS 是一个去中心化的文件存储网络。与普通云存储不同，IPFS 上的文件不依赖于单一服务器，而是分布在全球节点。这意味着：

* 单个服务器宕机时文件不会丢失
* 文件内容通过哈希唯一标识，无法篡改
* 非常适合存储 NFT 的图像和元数据

## 5.2 上传图像到 Pinata

[Pinata](https://pinata.cloud/) 是最流行的 IPFS 存储服务。免费套餐提供 1GB 存储空间，对我们来说足够。

1. 访问 https://pinata.cloud/ 并注册免费账户
2. 登录后，点击 **"Upload"** -> **"File"**
3. 选择你想作为 NFT 艺术品的图像（AI 生成的图像也可以，或者任何图像）
4. 上传成功后，复制 **CID**（类似 `QmXyz...` 的字符串）

你的图像 URI 为：`ipfs://yourCID`

<!-- ![placeholder: Screenshot of image upload in Pinata, including upload button and resulting CID](../../../../zh-cn/stage-3/cross-platform/nft-minting/images/image11.png) -->

## 5.3 创建元数据 JSON

NFT 元数据是一个 JSON 文件，用于描述 NFT 的名称、描述和图像 URI。创建一个 `metadata.json`:

```json
{
  "name": "Vibe Coder Certificate #0",
  "description": "This NFT certifies that the holder has completed the NFT minting tutorial and entered the world of Web3.",
  "image": "ipfs://your-image-cid",
  "attributes": [
    { "trait_type": "Course", "value": "Easy Vibe" },
    { "trait_type": "Skill", "value": "Smart Contract" },
    { "trait_type": "Level", "value": "Beginner" }
  ]
}
```

也将 `metadata.json` 上传到 Pinata，并获得一个元数据 CID。

## 5.4 升级合约以支持图片

为了在 NFT 中包含图片，我们需要通过添加 `tokenURI` 略微升级合约。返回 Remix 并创建一个新文件 `MyNFTWithImage.sol`：

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MyNFTWithImage is ERC721, ERC721URIStorage {
    uint256 private _tokenId;

    constructor() ERC721("VibeCoder", "VIBE") {}

    // Pass metadata URI when minting
    function mint(string memory uri) public {
        _safeMint(msg.sender, _tokenId);
        _setTokenURI(_tokenId, uri);
        _tokenId++;
    }

    // Overrides required by Solidity
    function tokenURI(uint256 tokenId)
        public view override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public view override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
```

部署后，调用 `mint` 并传入你的元数据 URI（例如 `ipfs://QmAbc.../metadata.json`）。然后你铸造的 NFT 将包含图像和描述。

<!-- ![占位符：显示在 Etherscan 上的 NFT 详情截图](../../../../zh-cn/stage-3/cross-platform/nft-minting/images/image12.png) -->

# 第6章：最终说明

恭喜！你已经完成了从零开始的一整套 NFT 开发流程。让我们回顾一下：

1. 理解了 NFT 和智能合约的核心概念
2. 安装了 MetaMask 并切换到 Sepolia 测试网
3. 在 Remix IDE 中用不到 15 行代码编写了 NFT 智能合约
4. 将合约部署到以太坊测试网
5. 铸造了自己的 NFT 并在 Etherscan 上验证
6.（可选）学习了如何通过 IPFS 添加图像和元数据

整个过程无需安装本地环境，不花钱，并且完全在浏览器中完成。这就是区块链开发的吸引力：门槛比大多数人预期的要低得多。

**进阶方向：**

* **使用 Hardhat / Foundry 进行本地开发**：当合约逻辑变复杂时，Remix 不够用。Hardhat 和 Foundry 是专业的本地开发框架，提供自动化测试、脚本化部署、Gas 优化等功能
* **添加白名单和铸造限制**：控制谁可以铸造、每个钱包的最大铸造数量、铸造价格及类似规则
* **构建铸造前端页面**：使用 React + ethers.js / viem 构建一个便捷的一键 Web 铸造页面
* **探索 ERC1155 多版本 NFT**：ERC1155 允许一个代币 ID 下拥有多个副本，适用于游戏道具和票务
* **部署到主网**：准备好后，可部署到以太坊主网（或 L2 链如 Polygon 或 Base，拥有更低的 Gas 费）

***你的第一个 NFT 已经在链上。区块链世界的大门现在已经向你打开。***

# 参考资料

* [OpenZeppelin ERC721 文档](https://docs.openzeppelin.com/contracts/5.x/erc721)
* [Remix IDE 官方文档](https://remix-ide.readthedocs.io/)
* [MetaMask 官方文档](https://docs.metamask.io/)
* [Solidity 官方文档](https://docs.soliditylang.org/)
* [Sepolia Etherscan](https://sepolia.etherscan.io/)
* [Pinata IPFS 存储服务](https://pinata.cloud/)
* [ERC721 标准规范 (EIP-721)](https://eips.ethereum.org/EIPS/eip-721)