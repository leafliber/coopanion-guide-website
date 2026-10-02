---
title: 更新记录与文档版本
description: 查看当前版本与更新提醒，了解 v0.1.10 文档基线、新版设置入口和升级步骤。
---

这页帮助你确认手册与安装版本是否对应，并找到完整的官方发布说明。

## 本手册对应什么版本

本手册以 **Coopanion v0.1.10** 为发布基线。该版于 2026 年 10 月 1 日发布；核验时（2026 年 10 月 2 日），GitHub 官方 API 将它标记为最新正式版本，且不是草稿或预发布。应用源码标签指向 `78a46f83d779836c182d8176234c93c26c02d539`，已核对七个安装文件和 `SHA256SUMS.txt`。

这是一份按版本核验的手册，不会因上游主分支变动而自动宣称功能已经发布。若你下载了更新的版本，先查看它自己的 Release；尚未纳入本手册的变化以对应发布说明为准。

## 从旧版升级后先看这里

这里只索引变化对应的操作指南，完整变更仍由官方 Release 维护。

| 起始版本 | 可以做什么 | 操作指南 |
| --- | --- | --- |
| v0.1.10 | 查看默认开启的匿名使用统计，按需关闭；首次引导可跳过来源问题 | [权限与隐私](/safety/permissions/#匿名使用统计)、[首次配置](/start/first-chat/) |
| v0.1.9 | 在普通模式修改人设、查看当前版本与更新提醒；使用新版模型与扩展界面 | [系统提示词与人设](/guides/personality/)、[模型连接](/guides/models/)、[扩展管理](/guides/extensions/) |
| v0.1.8 | 调整「什么时候先问你」，分别控制看屏幕和键鼠操作的询问频率 | [电脑操作与授权](/guides/computer/) |

## 查看当前版本与更新提醒

1. 打开设置，查看左上角 Coopanion 字标下的版本号。点击这一行会打开项目 GitHub 主页。
2. v0.1.9 起，设置窗口会查询 GitHub 最新正式 Release；发现更高版本时，下方显示「Coopanion x.y.z 已发布，点这里下载更新」。
3. 点击提醒前往发布页，选择你的系统和架构对应的安装包，再按下方步骤升级。

更新提醒是下载入口，不会自动替你安装。查询失败或超时时只显示当前版本，**没有提醒不代表已经是最新版**；可以直接打开[最新官方 Release](https://github.com/Pal-AI-Lab/Coopanion/releases/latest)核对。

## 下载与完整说明

- [最新官方 Release 与下载](https://github.com/Pal-AI-Lab/Coopanion/releases/latest)：始终从项目官方发布页选择与你系统、架构对应的安装文件。
- [v0.1.10 官方 Release](https://github.com/Pal-AI-Lab/Coopanion/releases/tag/v0.1.10)：本手册核验的版本，包括匿名使用统计、来源引导和大肥鱼嘴部修正。
- [所有官方 Releases](https://github.com/Pal-AI-Lab/Coopanion/releases)：查找历史版本和完整变更。
- [发布说明源目录](https://github.com/Pal-AI-Lab/Coopanion/tree/v0.1.10/docs/releases)：应用发布工作流使用的说明正文，本站不另存一份。

## 升级前后

1. 退出应用，按[数据与备份](/safety/data/)保留现有数据。
2. 阅读目标版本的完整说明，特别注意权限、模型连接、扩展兼容与数据迁移相关变化。
3. 下载并安装对应平台的新包。Windows 升级时沿用原安装位置，便于继续使用原 `data`；各平台步骤见 [Windows](/start/windows/)、[macOS](/start/macos/)、[Linux](/start/linux/)。
4. 升级后检查版本号、桌宠、模型连接和常用扩展，并确认「习惯」页的匿名统计开关及电脑操作授权档位符合你的偏好。不确定问题是否由新版本引起时，保留备份及版本信息，再到[故障排查](/troubleshooting/common/)定位。

不应把旧版数据直接覆盖到新版唯一的数据目录上试错；先复制并保留原始备份。

依据：[更新提醒实现](https://github.com/Pal-AI-Lab/Coopanion/blob/v0.1.10/console/features/release.ts)、[v0.1.8](https://github.com/Pal-AI-Lab/Coopanion/releases/tag/v0.1.8)、[v0.1.9](https://github.com/Pal-AI-Lab/Coopanion/releases/tag/v0.1.9)、[v0.1.10](https://github.com/Pal-AI-Lab/Coopanion/releases/tag/v0.1.10) 官方 Release。
