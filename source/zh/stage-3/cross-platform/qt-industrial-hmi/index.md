# 如何构建工业级 Qt 桌面应用：泵监控 HMI 系统

# 第1章：什么是工业 HMI 及 Qt 开发

在本教程中，我们将完成一个完整闭环：使用 Qt 从零构建工业级泵监控 HMI（人机界面）系统。它可以实时读取传感器数据、绘制压力趋势图、触发超限自动报警并记录故障日志。整个过程使用 PC 上的免费仿真软件，而非真实工业硬件。

对于本教程，你至少需要：

- 一台电脑（Windows 或 Mac，推荐 Windows 以获得更好的工业软件兼容性）
- Qt 6.5 开发环境（Qt Creator、Qt Serial Bus、Qt Charts 模块）
- Modbus Slave 仿真软件（免费下载，可作为“虚拟泵”）
- 你的 AI 编码助手（Cursor / Trae / Claude Code）

> **零硬件，零成本**：使用免费 PC 仿真软件（Modbus Slave）作为下位设备；无需购买硬件。直接使用官方 Qt 和 Qt Charts 模块，无需手动解析协议。运行后，你将看到实时压力趋势、超限报警弹窗以及故障日志，完全模拟真实工厂的工作流程。

## 1.1 上位机和下位机是什么？

在工业自动化中，有两个概念必须理解：**上位机** 和 **下位机**。

**下位机**：现场的“手脚” 

下位机是直接与物理设备交互的控制器。在工厂中，它通常是 **PLC（可编程逻辑控制器）** 或 **传感器**，负责：

* 读取现场数据（温度、压力、流量、液位等）
* 控制设备动作（启动泵、关闭阀门、调节速度等）
* 自动执行预定义逻辑（例如压力超过阈值时停止泵）

你可以把下位机看作工厂车间的“工人”。它不需要复杂思考，但必须可靠执行任务。

**上位机**：控制室的“眼睛和大脑” 

上位机是运行在 PC 或工业计算机上的监控软件，即我们今天要构建的 **HMI（人机界面）**。它负责：

* 实时显示现场数据（数字、图表、动画）
* 记录历史数据和报警日志
* 为操作员提供远程控制功能
* 提供数据分析和报告

你可以把上位机看作工厂的“监控中心”。操作员可以通过屏幕了解工厂状态。

**它们如何通信？**

上位机与下位机通过 **工业通信协议** 交换数据。最常用的是 **Modbus**，一种诞生于 1979 年的“元老级”协议。它仍然被广泛使用，因为它简单、可靠，几乎所有工业设备都支持。

```text
Control room                           Factory site
┌──────────┐    Modbus protocol    ┌──────────┐
│ Upper    │ ◄──────────────────►  │ Lower    │
│ computer │   "Tell me pressure"  │ computer │
│ (Qt HMI) │   "Pressure is 1.20MPa"│ (PLC/Sensor)
│ Display  │                       │ Read data│
│ Log data │                       │ Control  │
│ Alarms   │                       │ Protect  │
└──────────┘                       └──────────┘
```

<!-- ![占位符：上下计算机关系示意图：左侧为PC屏幕（上层计算机），右侧为PLC和泵（下层计算机），通过Modbus连接](../../../../zh-cn/stage-3/跨平台/qt-industrial-hmi/images/image1.png） -->

## 1.2 什么是Modbus协议？

Modbus是工业通信的“通用语言”。它定义了高层和低层计算机“交流”的方式。

**只有两个核心概念：**

* **注册**：下层计算机中的数据“单元”。每个单元包含一个地址（`0`， `1`， `2`， ...），存储一个数字。例如，地址`0`存储压力，地址`1`存储温度。
* **读写操作**：上层计算机可以读取寄存器（获取数据）或写寄存器（发送控制命令）。

**两种常见的Modbus变体：**

|变体 |运输 |典型场景 |
|------|---------|---------|
|Modbus RTU |串口（RS-485/RS-232） |短距离，直接设备连接 |
|Modbus TCP |以太网（TCP/IP） |长距离网络通信 |

本教程使用**Modbus TCP**。由于它是基于网络的，上层应用和下层计算机模拟器可以在同一台机器上运行，无需物理布线。

## 1.3 为什么选择Qt？

Qt是工业软件的首选框架。工厂、医院和交通系统的许多监控接口都是基于Qt构建的。原因很简单：

|优势 |解释 |
|------|------|
|跨平台 |一个代码库可编译到 Windows、Linux 和嵌入式设备 |
|内置工业协议支持 |Qt Serial Bus 原生支持 Modbus，无需第三方库 |
|强大的图表 |Qt Charts 提供专业的实时图表 |
|高性能 |适用于实时数据刷新的C基础 |
|成熟稳定 |30年历史，工业领域验证 |

## 1.4 我们在建造什么？

我们将构建一个**泵监测HMI系统**，模拟真实的工厂泵压监测：

|功能 |描述 |
|------|------|
|实时数据读取 |每秒从下级计算机读取压力 |
|压力趋势图 |过去60秒压力线图 |
|超阈值警报 |压力超过阈值时弹窗警告和红色界面 |
|故障日志 |将所有警报事件记录在数据库中，以便历史查询 |
|手动控制 |一键启动/停止泵（写入下级计算机寄存器） |

<!-- ![占位符：泵监测HMI预览，显示实时压力数、趋势图、报警指示器、启动/停止按钮及日志列表](../../../../zh-cn/stage-3/cross-platform/qt-industrial-hmi/images/image2.png） -->

## 1.5 教程路线图

我们将通过以下步骤完成流程：

1. **准备环境和模拟下级计算机**（2分钟）：安装Qt 6.5和Modbus Slave模拟器
2. **创建Qt项目并连接Modbus**（3分钟）：建立上层应用与模拟器之间的通信
3. **实现实时读写显示**（3分钟）：定时压力读取和界面更新
4. **绘制实时压力趋势图**（3分钟）：含Qt图的动态折线图
5. **实现报警和故障日志**（3分钟）：超阈值报警SQLite日志
6. **打包并部署**（可选）：将应用打包成独立可执行文件

# 第二章：准备环境与模拟下级计算机（2分钟）

## 2.1 安装Qt 6.5

Qt 提供了一个免费的开源版本，足够本教程使用。

1. 访问 [Qt 官方网站](https://www.qt.io/download-qt-installer) 并下载 Qt 在线安装程序
2. 运行安装程序，登录或注册 Qt 账户（免费）
3. 在组件选择中，勾选：
   - **Qt 6.5.x**（或更新版本）
   - **Qt Serial Bus** 位于 **Additional Libraries** 下（支持 Modbus）
   - **Qt Charts** 位于 **Additional Libraries** 下（图表渲染）
   - **Qt Creator**（IDE，通常默认选中）
4. 点击安装并等待

> **提示**：如果 Qt 已安装但缺少 Serial Bus 或 Charts，请重新运行 Qt Maintenance Tool 并添加组件。

<!-- ![占位符：Qt 安装程序组件选择截图，高亮显示 Qt Serial Bus 和 Qt Charts](../../../../zh-cn/stage-3/cross-platform/qt-industrial-hmi/images/image3.png) -->

## 2.2 安装 Modbus 从站：你的“虚拟泵”

Modbus Slave 是一个免费的 Modbus 从站模拟器。它可以在你的电脑上模拟一个工业设备（PLC/传感器），让你的上位应用有对象进行通信。

1. 访问 [modbustools.com](https://www.modbustools.com/modbus_slave.html) 并下载 Modbus Slave
2. 安装并打开它
3. 配置连接：
   - 菜单 **Connection -> Connect**
   - 选择 **Modbus TCP/IP**
   - IP 地址：`127.0.0.1`（本地主机）
   - 端口：`502`（Modbus TCP 默认端口）
   - 点击 **OK** 开始监听

4. 设置模拟数据：
   - 你会看到一个寄存器表，每行是一个寄存器地址（`0`, `1`, `2`, ...）
   - 双击地址 **0** 的值，修改为 **120**（表示压力 1.20 MPa，在应用中除以 100）
   - 双击地址 **1** 的值，修改为 **350**（表示温度 35.0°C）
   - 双击地址 **2** 的值，修改为 **1**（泵状态：`1=running`, `0=stopped`）

现在 Modbus Slave 就是你的“24/7 虚拟泵”。保持窗口打开，它会持续响应读/写请求。

<!-- ![占位符：Modbus Slave 截图显示 TCP 配置和模拟寄存器值](../../../../zh-cn/stage-3/cross-platform/qt-industrial-hmi/images/image4.png) -->

> **动态模拟提示**：Modbus Slave 支持自动递增/随机变化。右键点击寄存器值，选择“Auto increment”或“Random”，以模拟真实传感器波动。

# 第3章：创建 Qt 项目并连接 Modbus（3 分钟）

## 3.1 创建新 Qt 项目

打开 Qt Creator 并创建新项目：

1. 点击 **文件 -> 新建项目**
2. 选择 **应用程序 (Qt) -> Qt Widgets Application**
3. 项目名称：**PumpHMI**
4. 选择已安装的 Qt 6.5 kit
5. 完成创建

打开 `PumpHMI.pro`（如果使用 CMake，则打开 `CMakeLists.txt`），并添加关键模块：

```pro
QT += core gui widgets serialbus charts sql
```

| 模块 | 目的 |
|------|------|
| `serialbus` | 为 Modbus TCP 通信提供 `QModbusTcpClient` |
| `charts` | 为实时趋势图提供 `QChart`，`QLineSeries` |
| `sql` | 为 SQLite 故障日志提供 `QSqlDatabase` |

如果使用 CMake，等效配置：

```cmake
find_package(Qt6 REQUIRED COMPONENTS Widgets SerialBus Charts Sql)
target_link_libraries(PumpHMI PRIVATE
    Qt6::Widgets Qt6::SerialBus Qt6::Charts Qt6::Sql)
```

## 3.2 声明核心成员

请让 AI 生成头文件：

```text
Please help me write mainwindow.h with core members for pump monitoring HMI:
1. QModbusTcpClient for Modbus TCP communication
2. QTimer for timed data reading
3. QChart + QLineSeries for real-time trend chart
4. QSqlDatabase for fault log storage
5. UI elements: pressure label, status indicator, start/stop button, log table
```

核心标题：

```cpp
// mainwindow.h
#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>
#include <QModbusTcpClient>
#include <QModbusDataUnit>
#include <QTimer>
#include <QtCharts>
#include <QSqlDatabase>
#include <QLabel>
#include <QPushButton>
#include <QTableWidget>

class MainWindow : public QMainWindow {
    Q_OBJECT

public:
    explicit MainWindow(QWidget *parent = nullptr);
    ~MainWindow();

private slots:
    void connectModbus();        // connect lower computer
    void readPressure();         // timed pressure read
    void onReadReady();          // read callback
    void triggerAlarm(float v);  // trigger alarm
    void togglePump();           // start/stop pump

private:
    // Modbus communication
    QModbusTcpClient *m_modbusClient = nullptr;
    QTimer *m_pollTimer = nullptr;

    // Real-time chart
    QChart *m_chart = nullptr;
    QLineSeries *m_series = nullptr;
    QDateTimeAxis *m_axisX = nullptr;
    QValueAxis *m_axisY = nullptr;

    // Database
    QSqlDatabase m_db;

    // UI elements
    QLabel *m_pressureLabel = nullptr;    // pressure display
    QLabel *m_statusLight = nullptr;      // status indicator
    QPushButton *m_pumpButton = nullptr;  // start/stop button
    QTableWidget *m_logTable = nullptr;   // log table

    // Alarm threshold
    float m_alarmThreshold = 1.50f;  // alarm above 1.50 MPa
    bool m_pumpRunning = false;

    void setupUI();
    void setupDatabase();
    void logAlarm(float pressure, const QString &message);
};

#endif // MAINWINDOW_H
```

<!-- ![占位符: Qt Creator 中 mainwindow.h 的截图](../../../../zh-cn/stage-3/cross-platform/qt-industrial-hmi/images/image5.png) -->

## 3.3 构建 Modbus TCP 连接

在 `mainwindow.cpp` 中实现连接逻辑：

```cpp
// mainwindow.cpp - connection section
void MainWindow::connectModbus()
{
    m_modbusClient = new QModbusTcpClient(this);

    // Connect to Modbus Slave simulator
    m_modbusClient->setConnectionParameter(
        QModbusDevice::NetworkPortParameter, 502);
    m_modbusClient->setConnectionParameter(
        QModbusDevice::NetworkAddressParameter, "127.0.0.1");
    m_modbusClient->setTimeout(1000);       // 1s timeout
    m_modbusClient->setNumberOfRetries(3);  // retry 3 times

    if (!m_modbusClient->connectDevice()) {
        statusBar()->showMessage("Failed to connect lower computer!", 3000);
        return;
    }

    statusBar()->showMessage("Connected to lower computer (127.0.0.1:502)", 3000);

    // Start timer, read once per second
    m_pollTimer = new QTimer(this);
    connect(m_pollTimer, &QTimer::timeout, this, &MainWindow::readPressure);
    m_pollTimer->start(1000);  // 1000ms = 1s
}
```

**代码说明：**

| 代码 | 含义 |
|------|------|
| `QModbusTcpClient` | 内置 Qt Modbus TCP 客户端，与下位机通信 |
| `NetworkPortParameter, 502` | 连接到端口 `502`（与 Modbus 从机配置相同） |
| `NetworkAddressParameter, "127.0.0.1"` | 连接本地主机（模拟器本地运行） |
| `m_pollTimer->start(1000)` | 每秒调用 `readPressure()` |

## 3.4 读取压力数据

```cpp
// mainwindow.cpp - reading section
void MainWindow::readPressure()
{
    if (!m_modbusClient || m_modbusClient->state() != QModbusDevice::ConnectedState)
        return;

    // Build read request: start at address 0, read 3 holding registers
    QModbusDataUnit readUnit(
        QModbusDataUnit::HoldingRegisters,  // register type
        0,                                   // start address
        3                                    // quantity
    );

    // Send async read request
    if (auto *reply = m_modbusClient->sendReadRequest(readUnit, 1)) {
        if (!reply->isFinished()) {
            connect(reply, &QModbusReply::finished,
                    this, &MainWindow::onReadReady);
        } else {
            delete reply;  // broadcast request, delete directly
        }
    }
}

void MainWindow::onReadReady()
{
    auto *reply = qobject_cast<QModbusReply *>(sender());
    if (!reply) return;

    if (reply->error() == QModbusDevice::NoError) {
        const QModbusDataUnit unit = reply->result();

        // Parse values (divide register value for real units)
        float pressure = unit.value(0) / 100.0f;   // addr 0: pressure (MPa)
        float temperature = unit.value(1) / 10.0f;  // addr 1: temperature (°C)
        int pumpStatus = unit.value(2);              // addr 2: pump state

        // Update UI
        m_pressureLabel->setText(
            QString("%1 MPa").arg(pressure, 0, 'f', 2));

        // Check alarm
        if (pressure > m_alarmThreshold) {
            triggerAlarm(pressure);
        }

        // Update trend chart (implemented next chapter)
        // updateChart(pressure);

    } else {
        statusBar()->showMessage(
            QString("Read failed: %1").arg(reply->errorString()), 2000);
    }

    reply->deleteLater();
}
```

**Modbus读取流程：**

```text
readPressure() triggered by timer
    -> Build QModbusDataUnit ("read addresses 0-2")
    -> sendReadRequest() async send (UI not blocked)
    -> lower computer returns data
    -> onReadReady() triggered
    -> parse register values and update UI
```

<!-- ![占位符：运行应用程序截图，显示实时压力更新和状态栏“已连接下位机`](../../../../zh-cn/stage-3/cross-platform/qt-industrial-hmi/images/image6.png) -->

# 第4章：绘制实时压力趋势（3分钟）

## 4.1 初始化图表

Qt Charts 提供专业的图表组件。在构造函数中让 AI 初始化:

```text
Please help me initialize Qt Charts real-time line chart in MainWindow constructor:
1. Create QChart and QLineSeries
2. X axis uses QDateTimeAxis, showing latest 60 seconds
3. Y axis uses QValueAxis, range 0-3.0 MPa
4. Line color blue, width 2px
5. Place chart into QChartView and add to layout
```

核心代码：

```cpp
// mainwindow.cpp - chart initialization
void MainWindow::setupChart()
{
    m_series = new QLineSeries();
    m_series->setName("Pressure (MPa)");
    m_series->setPen(QPen(QColor("#2196F3"), 2));

    m_chart = new QChart();
    m_chart->addSeries(m_series);
    m_chart->setTitle("Real-time Pressure Trend");
    m_chart->setAnimationOptions(QChart::NoAnimation); // no animation for real-time data

    // X axis: time
    m_axisX = new QDateTimeAxis();
    m_axisX->setFormat("HH:mm:ss");
    m_axisX->setTitleText("Time");
    m_chart->addAxis(m_axisX, Qt::AlignBottom);
    m_series->attachAxis(m_axisX);

    // Y axis: pressure
    m_axisY = new QValueAxis();
    m_axisY->setRange(0, 3.0);
    m_axisY->setTitleText("Pressure (MPa)");
    m_axisY->setLabelFormat("%.1f");
    m_chart->addAxis(m_axisY, Qt::AlignLeft);
    m_series->attachAxis(m_axisY);

    // Create chart view
    QChartView *chartView = new QChartView(m_chart);
    chartView->setRenderHint(QPainter::Antialiasing);

    // Add to layout (assuming existing centralLayout)
    centralLayout->addWidget(chartView);
}
```

## 4.2 实时更新图表

每当读取一个新的压力值时，添加一个点，并仅保留最近 60 秒的数据：

```cpp
// mainwindow.cpp - chart updates
void MainWindow::updateChart(float pressure)
{
    QDateTime now = QDateTime::currentDateTime();

    // Append new point
    m_series->append(now.toMSecsSinceEpoch(), pressure);

    // Keep only latest 60s data
    QDateTime cutoff = now.addSecs(-60);
    while (m_series->count() > 0 &&
           m_series->at(0).x() < cutoff.toMSecsSinceEpoch()) {
        m_series->remove(0);
    }

    // Update X axis range: always show latest 60s
    m_axisX->setRange(cutoff, now);
}
```

然后在`onReadReady()`中调用它：

```cpp
// Add after pressure parsing in onReadReady():
updateChart(pressure);
```

现在运行程序。您将看到一个蓝色的折线实时更新，每秒一个点，始终显示最近 60 秒。如果您手动修改 Modbus 从站中的寄存器值，折线会立即反映变化。

<!-- ![占位符：实时压力趋势截图，显示滚动蓝线，X 轴为时间，Y 轴为压力](../../../../zh-cn/stage-3/cross-platform/qt-industrial-hmi/images/image7.png) -->

> **性能提示**：`QChart::NoAnimation` 很重要。实时数据每秒刷新一次；动画可能导致界面延迟。这是工业 HMI 中的常见做法。

# 第五章：报警系统与故障日志（3 分钟）

## 5.1 超阈值报警

当压力超过阈值时，我们需要：红色界面警告  弹出警报  日志记录。

```cpp
// mainwindow.cpp - alarm logic
void MainWindow::triggerAlarm(float pressure)
{
    // Turn UI red
    m_pressureLabel->setStyleSheet(
        "color: white; background-color: #F44336;"
        "font-size: 32px; padding: 10px; border-radius: 8px;");

    // Status indicator red
    m_statusLight->setStyleSheet(
        "background-color: #F44336; border-radius: 12px;"
        "min-width: 24px; min-height: 24px;");

    // Popup alarm (only first time crossing threshold to avoid repeated popups)
    static bool alarmActive = false;
    if (!alarmActive) {
        alarmActive = true;
        QMessageBox::warning(this, "Pressure Alarm",
            QString("Current pressure %1 MPa exceeds threshold %2 MPa!\nPlease check pump status immediately.")
                .arg(pressure, 0, 'f', 2)
                .arg(m_alarmThreshold, 0, 'f', 2));
    }

    // Record to DB
    logAlarm(pressure,
        QString("Pressure over threshold: %1 MPa > %2 MPa")
            .arg(pressure, 0, 'f', 2)
            .arg(m_alarmThreshold, 0, 'f', 2));

    // Reset when pressure returns to normal
    if (pressure <= m_alarmThreshold) {
        alarmActive = false;
        m_pressureLabel->setStyleSheet(
            "color: #2196F3; font-size: 32px; padding: 10px;");
        m_statusLight->setStyleSheet(
            "background-color: #4CAF50; border-radius: 12px;"
            "min-width: 24px; min-height: 24px;");
    }
}
```

<!-- ![占位符：超阈值报警截图显示红色压力背景、红色指示器和报警弹出窗口](../../../../zh-cn/stage-3/cross-platform/qt-industrial-hmi/images/image8.png) -->

## 5.2 SQLite 故障日志

工业系统必须记录所有报警事件以便追溯。我们使用 SQLite：

```cpp
// mainwindow.cpp - database initialization
void MainWindow::setupDatabase()
{
    m_db = QSqlDatabase::addDatabase("QSQLITE");
    m_db.setDatabaseName("pump_alarm_log.db");

    if (!m_db.open()) {
        qWarning() << "Cannot open database:" << m_db.lastError().text();
        return;
    }

    // Create alarm table
    QSqlQuery query;
    query.exec(
        "CREATE TABLE IF NOT EXISTS alarm_log ("
        "  id INTEGER PRIMARY KEY AUTOINCREMENT,"
        "  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,"
        "  pressure REAL,"
        "  message TEXT"
        ")"
    );
}
```

## 5.3 日志和显示记录

```cpp
// mainwindow.cpp - write logs
void MainWindow::logAlarm(float pressure, const QString &message)
{
    // Write to DB
    QSqlQuery query;
    query.prepare(
        "INSERT INTO alarm_log (pressure, message) VALUES (?, ?)");
    query.addBindValue(pressure);
    query.addBindValue(message);
    query.exec();

    // Update on-screen table
    int row = m_logTable->rowCount();
    m_logTable->insertRow(row);
    m_logTable->setItem(row, 0,
        new QTableWidgetItem(
            QDateTime::currentDateTime().toString("yyyy-MM-dd HH:mm:ss")));
    m_logTable->setItem(row, 1,
        new QTableWidgetItem(QString::number(pressure, 'f', 2)));
    m_logTable->setItem(row, 2,
        new QTableWidgetItem(message));

    // Auto-scroll to latest row
    m_logTable->scrollToBottom();
}
```

日志表有三列：时间、压力值和报警信息。每次报警都会添加一行，并持久化到 SQLite。

<!-- ![占位符：故障日志表截图，包含多个记录，包括时间戳、压力和报警信息](../../../../zh-cn/stage-3/cross-platform/qt-industrial-hmi/images/image9.png) -->

## 5.4 手动启动/停止泵

除了读取数据，上位机还应控制下位机。我们通过写入寄存器值来实现这一点：

```cpp
// mainwindow.cpp - pump control
void MainWindow::togglePump()
{
    if (!m_modbusClient || m_modbusClient->state() != QModbusDevice::ConnectedState)
        return;

    m_pumpRunning = !m_pumpRunning;

    // Build write request: write 1 (start) or 0 (stop) to address 2
    QModbusDataUnit writeUnit(
        QModbusDataUnit::HoldingRegisters, 2, 1);
    writeUnit.setValue(0, m_pumpRunning ? 1 : 0);

    if (auto *reply = m_modbusClient->sendWriteRequest(writeUnit, 1)) {
        connect(reply, &QModbusReply::finished, this, [this, reply]() {
            if (reply->error() == QModbusDevice::NoError) {
                m_pumpButton->setText(m_pumpRunning ? "Stop Pump" : "Start Pump");
                m_pumpButton->setStyleSheet(m_pumpRunning
                    ? "background-color: #F44336; color: white; padding: 12px;"
                    : "background-color: #4CAF50; color: white; padding: 12px;");
                statusBar()->showMessage(
                    m_pumpRunning ? "Pump started" : "Pump stopped", 2000);
            }
            reply->deleteLater();
        });
    }
}
```

在 Modbus 从站中，当你点击按钮时，你将看到地址 `2` 在 `0` 和 `1` 之间切换。这是上位机的“控制”过程。

<!-- ![占位符：泵启动/停止按钮截图，显示绿色“启动泵”和红色“停止泵”状态](../../../../zh-cn/stage-3/cross-platform/qt-industrial-hmi/images/image10.png) -->

# 第6章：打包与部署（可选）

## 6.1 使用 windeployqt / macdeployqt 打包

Qt 提供官方部署工具，可自动收集所需的动态库。

**Windows：**

```bash
# Build Release first, then run in build directory:
windeployqt PumpHMI.exe
```

`windeployqt` 将 Qt DLL、插件、翻译文件等复制到可执行文件旁边。打包好的文件夹可以直接发送。

**macOS:**

```bash
macdeployqt PumpHMI.app -dmg
```

这会生成一个 `.dmg` 安装程序映像。

## 6.2 使用 Qt 安装程序框架构建安装程序

如果你想要一个专业的安装向导（“下一步 -> 下一步 -> 完成”），请使用 Qt 安装程序框架：

```text
Please help me create an installer for PumpHMI with Qt Installer Framework:
1. Create installer directory structure (config, packages)
2. Configure config.xml (installer name, version, target directory)
3. Put windeployqt output files into packages/com.example.pumphmi/data/
4. Run binarycreator to generate installer
```

<!-- ![占位符：PumpHMI 设置向导截图显示安装路径和进度](../../../../zh-cn/stage-3/跨平台/qt-industrial-hmi/images/image11.png） -->

# 第七章：最后的笔记

恭喜！你从零开始构建了一个工业级泵监测HMI系统。回顾：

1. 理解上层计算机、下层计算机和Modbus协议的核心概念
2. 用 Modbus Slave 模拟一个“虚拟泵”，没有真正的硬件
3. 使用Qt `QModbusTcpClient`构建上下交流
4. Drew 实时滚动压力趋势图与 Qt 图表
5. 实现了超阈值弹出警报和SQLite故障日志
6. 实现远程启动/停止泵控制

整个过程没有使用真正的工业硬件，但架构和功能与真实工厂HMI系统相匹配。如果你用真正的PLC替换Modbus Slave，这个应用可以直接用于生产场景。

**高级说明：**

* **多设备监控**：连接多台低级计算机，并使用标签页/分视图显示不同设备数据
* **历史回放**：从SQLite读取历史数据，并带时间线控制重放趋势图表
* **OPC UA 协议**：Modbus 适用于更简单的场景;复杂的工业系统通常使用 OPC UA，Qt 也支持（Qt OPC UA 模块）
* **Web远程监控**：使用Qt WebSocket将实时数据推送到浏览器以便移动端查看
* **AI预测性维护**：将历史压力数据输入机器学习模型，提前预测故障

使用代码保护工业运营中的每一个设备。***

# 参考文献

* [Qt Serial Bus Docs]（https://doc.qt.io/qt-6/qtserialbus-index.html）
* [Qt Modbus TCP 客户端示例]（https://doc.qt.io/qt-6/qtserialbus-modbus-client-example.html）
* [Qt 图表文档]（https://doc.qt.io/qt-6/qtcharts-index.html）
* [Modbus 协议规范]（https://modbus.org/specs.php）
* [Modbus 从属模拟器]（https://www.modbustools.com/modbus_slave.html）
* [Qt 安装框架文档]（https://doc.qt.io/qtinstallerframework/）