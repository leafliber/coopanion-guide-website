---
title: macOS 安装
description: 选择 Apple 芯片或 Intel 安装包，完成首次打开并找到菜单栏入口。
prev: false
next:
  link: /start/first-chat/
  label: 首次配置与第一次对话
---

这页帮助你在 Mac 上安装 Coopanion，并处理第一次打开时的系统提示。安装说明以已发布的 **v0.1.10** 为基线。

## 选择安装包

项目声明支持 macOS 13 及以上，提供两种架构。打开苹果菜单 →「关于本机」，查看芯片或处理器信息：

| 你的 Mac | Release 中的文件名 |
| --- | --- |
| Apple M 系列芯片 | `Coopanion-版本号-mac-arm64.dmg` |
| Intel 处理器 | `Coopanion-版本号-mac-x64.dmg` |

从 [Coopanion 官方 Release](https://github.com/Pal-AI-Lab/Coopanion/releases/latest) 下载对应的 DMG。Release 中也有 ZIP，普通安装优先使用 DMG。

## 安装与第一次打开

1. 双击 DMG，把 Coopanion 拖入「应用程序」。
2. 在「应用程序」中打开 Coopanion。
3. v0.1.10 使用临时签名，未经 Apple 公证。如果系统阻止打开，先核对来源；确认信任该下载后，到「系统设置 → 隐私与安全性」找到本次阻止提示，选择「仍要打开」，按系统要求确认。
4. 若系统提示不同或没有「仍要打开」，参考 [Apple 的打开 App 说明](https://support.apple.com/zh-cn/102445)。不要关闭整个系统的安全检查。

## 找到设置窗口

正常运行后，桌宠位于屏幕底边，屏幕顶部的菜单栏会出现图标。Coopanion 主要通过菜单栏运行，平时没有程序坞图标；打开设置窗口时才会显示。

点击菜单栏图标 →「打开设置」，或右键桌宠打开菜单中的设置按钮，然后完成[首次配置与第一次对话](/start/first-chat/)。关闭设置窗口不会退出应用。

## 什么时候需要系统权限

文字聊天不需要麦克风权限。准备使用语音时，再按提示允许麦克风；全局说话键使用「输入监控」。截图与键鼠操作所需权限见[权限、费用与隐私](/safety/permissions/)及[电脑操作与授权](/guides/computer/)。

修改输入监控、辅助功能或屏幕录制权限后，应从菜单栏退出 Coopanion，再重新打开应用。仅关闭设置窗口不等于退出。

依据：[v0.1.10 发布说明](https://github.com/Pal-AI-Lab/Coopanion/blob/v0.1.10/docs/releases/v0.1.10.md)、[macOS 打包配置](https://github.com/Pal-AI-Lab/Coopanion/blob/v0.1.10/electron-builder.yml)。
