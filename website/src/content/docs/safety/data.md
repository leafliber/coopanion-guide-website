---
title: 数据位置、备份与卸载
description: 找到 Coopanion 数据目录，备份记忆和设置，了解匿名统计文件、卸载上报与删除数据的范围。
---

这页说明 v0.1.10 的数据放在哪里，以及如何备份、恢复或彻底卸载。**卸载应用和删除个人数据是两件事。**

## 找到数据目录

| 运行方式 | 默认数据目录 |
| --- | --- |
| Windows 安装版 | 安装目录下的 `data`，默认安装位置为用户目录下的 `Coopanion` |
| macOS 安装版 | `~/Library/Application Support/Coopanion` |
| Linux 安装版 | 通常是 `~/.config/Coopanion`，跟随 Electron 的系统应用数据目录 |
| 从源码启动 | Coopanion 源码目录下的 `build/data` |
| 自定义启动环境 | 如果设置了 `CORTICO_COMPANION_DATA`，使用它指定的目录 |

macOS 可以在 Finder 选择「前往 → 前往文件夹」，粘贴上述路径。Linux 文件管理器可能默认隐藏以点开头的目录。

目录内主要有：

| 相对数据目录的路径 | 内容 |
| --- | --- |
| `home/companion/` | 部署配置、记忆、对话和运行数据 |
| `home/companion/telemetry.json` | v0.1.10 新增：随机安装编号、统计状态和待发送记录 |
| `home/companion/telemetry-id` | 统计开启时保存安装编号，供 Windows 卸载程序读取；关闭统计后移除 |
| `home/providers/` | 模型端点配置与 `.env` 密钥文件 |
| `home/models/` | 下载后的语音识别模型 |
| `extensions/` | 安装的扩展及依赖 |
| `logs/` | 应用托管进程的日志 |
| `tmp/`、`pnpm/`、`pet-window/` 等 | 临时文件、安装缓存和窗口配置 |

这张表用于定位，不表示只有这些文件会出现。尤其不要把 `home` 当作可公开分享的普通配置。

## 做一份可恢复的备份

1. 在托盘或菜单栏菜单中选择「退出」。仅关闭设置窗口不会退出应用。
2. 把**整个数据目录**复制到另一个安全位置，保留隐藏文件，尤其是 `.env`。
3. 给备份标注 Coopanion 版本、系统和备份日期。不要直接覆盖唯一的旧备份。
4. 检查复制后的目录确实包含 `home`。需要验证恢复时，优先使用备份的副本。

备份里有 API Key、对话、记忆和可能包含敏感内容的日志，也包含匿名统计的安装编号与开关状态。使用受保护的磁盘或加密备份，不要将它作为 Issue 附件。

## 恢复

1. 安装与备份相同的版本，或先阅读目标版本的[发布说明](/releases/)。
2. 完全退出应用；先备份当前数据，再把备份恢复到对应的数据目录。
3. 启动后检查设置、记忆和模型连接是否正常。模型服务可能需要重新授权或更换已撤销的 Key。
4. 检查「习惯」页的「匿名使用统计」是否符合你的选择。完整恢复会带回备份中的统计设置和安装编号；旧版备份没有该设置时，v0.1.10 默认开启。

跨 Windows、macOS、Linux 或处理器架构迁移时，扩展依赖和窗口缓存不一定通用，不要直接假定复制所有文件即可运行。保留原备份，按扩展说明重新安装对应平台的依赖。恢复失败时，不要反复覆盖原备份；先退出应用，再恢复操作前的副本。

## 卸载

### Windows

在系统「设置 → 应用」中卸载 Coopanion。v0.1.10 的卸载脚本仍保留安装目录里的 `data`。如果重新安装到另一个位置，应用不会自动使用旧位置的数据。

v0.1.10 新增卸载统计：统计开启且默认数据位置存在 `home/companion/telemetry-id` 时，卸载程序会向项目服务器尝试发送一次带安装编号的卸载报告；升级过程不报告卸载。若不想发送，先在「习惯」页关闭「匿名使用统计」、确认已保存，再正常退出后卸载。关闭本身会尝试发送最后一条关闭事件，详见[匿名统计说明](/safety/permissions/#关闭后会怎样)。

确认不再需要后，可手动删除原安装目录中保留的数据；先核对路径，避免删除放在该目录中的其他个人文件。

### macOS

退出后，把「应用程序」中的 Coopanion 移到废纸篓。应用数据仍在 `~/Library/Application Support/Coopanion`；只有确认不再需要时才单独删除该目录。

### Linux

先在应用菜单中关闭「开机自动启动」，再退出。deb 安装版使用系统包管理器卸载，例如：

```bash
sudo apt remove coopanion
```

AppImage 版删除下载的 AppImage 文件即可。个人数据通常保留在 `~/.config/Coopanion`。若之前启用了开机自动启动，还应检查 `~/.config/autostart/coopanion.desktop` 是否残留；它位于数据目录之外。

## 彻底删除的范围

完全退出后删除数据目录，会移除本机的设置、密钥副本、记忆、对话和统计状态。若之后作为全新安装再次启动 v0.1.10，会生成新的安装编号，匿名统计恢复默认开启。

单独删除 `home/companion/telemetry.json` 也会在下次启动生成新编号，但不会关闭统计。想停止统计，应使用「习惯」页的开关；不要把删除编号文件当作退出统计的方法。

删除本机数据不会删除其他位置的备份，不会撤销模型 API Key，也不会删除模型服务商或项目统计服务器已经收到的数据。v0.1.10 的统计开关、卸载报告和删除本地文件均不提供远端数据删除功能。备份和密钥需在对应位置另行处理；模型服务的记录按其自己的删除流程处理。参见[权限、费用与隐私](/safety/permissions/)。

依据：[数据目录与 Linux 自启动实现](https://github.com/Pal-AI-Lab/Coopanion/blob/v0.1.10/app/main.cjs)、[Windows 卸载脚本](https://github.com/Pal-AI-Lab/Coopanion/blob/v0.1.10/installer/nsis.nsh)、[安装配置](https://github.com/Pal-AI-Lab/Coopanion/blob/v0.1.10/electron-builder.yml)、[统计状态与编号文件](https://github.com/Pal-AI-Lab/Coopanion/blob/v0.1.10/core/telemetry.ts)、[统计服务端接口](https://github.com/Pal-AI-Lab/Coopanion/blob/v0.1.10/telemetry-server/server.mjs)。
