---
title: 更新记录与文档版本
description: 查看官方 Release，了解本手册的 v0.1.7 发布基线和升级前需要核对的事项。
---

这页帮助你确认手册与安装版本是否对应，并找到完整的官方发布说明。

## 本手册对应什么版本

本手册以 **Coopanion v0.1.7** 为发布基线。核验时（2026 年 9 月 29 日），GitHub 将该版本标记为最新已发布版本，且不是预发布。应用源码标签指向 `9f891627`。

这是一份按版本核验的手册，不会因上游主分支变动而自动宣称功能已经发布。若你下载了更新的版本，先查看它自己的 Release；尚未纳入本手册的变化以对应发布说明为准。

## 下载与完整说明

- [最新官方 Release 与下载](https://github.com/Pal-AI-Lab/Coopanion/releases/latest)：始终从项目官方发布页选择与你系统、架构对应的安装文件。
- [v0.1.7 官方 Release](https://github.com/Pal-AI-Lab/Coopanion/releases/tag/v0.1.7)：本手册核验的版本，包括 Linux 支持与桌宠形象更新。
- [所有官方 Releases](https://github.com/Pal-AI-Lab/Coopanion/releases)：查找历史版本和完整变更。
- [发布说明源目录](https://github.com/Pal-AI-Lab/Coopanion/tree/v0.1.7/docs/releases)：应用发布工作流使用的说明正文，本站不另存一份。

## 升级前后

1. 退出应用，按[数据与备份](/safety/data/)保留现有数据。
2. 阅读目标版本的完整说明，特别注意权限、模型连接、扩展兼容与数据迁移相关变化。
3. 升级后检查桌宠、模型连接和常用扩展。不确定问题是否由新版本引起时，保留备份及版本信息，再到[故障排查](/troubleshooting/common/)定位。

不应把旧版数据直接覆盖到新版唯一的数据目录上试错；先复制并保留原始备份。
