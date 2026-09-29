---
title: 平台差异
description: 比较 Windows、macOS 和 Linux 的安装包、系统入口、语音识别与桌面限制。
---

这页帮助你判断同一操作在不同系统上的差异。它描述 v0.1.7 发布材料和源码中的平台实现，不代表所有系统组合都经过实机验证。

## 安装与入口

| 项目 | Windows | macOS | Linux |
| --- | --- | --- | --- |
| 发布包架构 | x64 | Apple 芯片 arm64、Intel x64 | x64 |
| 安装格式 | EXE 安装器 | DMG、ZIP | DEB、AppImage |
| 项目声明的环境 | Windows 10 / 11 | macOS 13+ | X11 或 XWayland 图形桌面 |
| 常用系统入口 | 任务栏托盘 | 屏幕顶部菜单栏 | 桌面托盘，取决于环境支持 |
| 默认说话键 | 轻点左 Alt 后再按住 | 轻点左 Option 后再按住 | 轻点左 Alt 后再按住 |
| 语音识别引擎 | FunASR、Windows 自带 | FunASR | FunASR |

安装步骤分别见 [Windows](/start/windows/)、[macOS](/start/macos/)、[Linux](/start/linux/)。各系统的数据目录、备份和卸载放在[数据管理](/safety/data/)。

## macOS 的系统权限

语音涉及麦克风和输入监控；电脑操作涉及截图和辅助功能。权限按用途分别处理，详见[权限、费用与隐私](/safety/permissions/)。系统授权变化后要退出并重新打开整个应用。

## Linux 的 X11 与 Wayland

v0.1.7 的 Linux 桌宠窗口和按键检测使用 X11。Wayland 会话下通过 XWayland 运行，有以下边界：

- 需要可用的 X 显示环境；没有 `DISPLAY` 时，按键收音和电脑操作无法按该实现工作。
- XWayland 只在 X 窗口具有键盘焦点时掌握相应按键状态，因此默认全局说话键不一定能在所有原生 Wayland 应用前台使用。
- 电脑操作实现可列出的窗口是 X11 客户端，不能据此承诺可以控制所有原生 Wayland 窗口。
- 当 X 服务器无法提供屏幕画面时，会尝试系统截图工具。相关依赖和失败提示见[电脑操作与授权](/guides/computer/)。

若需要排查桌宠、按键或电脑操作问题，可在登录界面选择发行版提供的 X11 会话再验证。不要将 Linux 支持理解成对任意桌面环境的兼容性保证。

## 没有托盘时

Linux 桌面可能不显示状态栏图标。仍可右键桌宠打开设置；若桌宠也未出现，检查窗口合成和显示会话后，按[常见问题排查](/troubleshooting/common/)反馈。

依据：[发布包配置](https://github.com/Pal-AI-Lab/Coopanion/blob/v0.1.7/electron-builder.yml)、[Linux 按键实现](https://github.com/Pal-AI-Lab/Coopanion/blob/v0.1.7/packages/cortico-world-desktop-pet/src/asr/hotkey.ts)、[Linux 电脑操作实现](https://github.com/Pal-AI-Lab/Coopanion/blob/v0.1.7/packages/cortico-world-cua/src/engine/linux.ts)。
