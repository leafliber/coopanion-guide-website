---
title: Windows 安装
description: 下载官方 Windows 安装包，找到桌宠与设置入口。
prev: false
next:
  link: /start/first-chat/
  label: 首次配置与第一次对话
---

这页帮助你在 Windows 上安装 Coopanion，并找到第一次配置的入口。安装说明以已发布的 **v0.1.10** 为基线。

## 安装前

- 使用 Windows 10 或 Windows 11 的 64 位系统。
- 准备一家模型服务的 API Key，用于安装后的对话配置。安装本身不需要 Key。
- 从 [Coopanion 官方 Release](https://github.com/Pal-AI-Lab/Coopanion/releases/latest) 下载，先阅读对应版本的发布说明。

## 下载安装包

1. 在 Release 的 Assets 中找到 `Coopanion-Setup-版本号.exe`。不要把 GitHub 自动生成的 Source code 当成安装包。
2. 双击安装包。v0.1.10 的 Windows 安装包没有数字签名；如果系统显示「Windows 已保护你的电脑」，先核对下载来源，再决定是否通过「更多信息 → 仍要运行」继续。无需关闭系统全部安全保护。
3. 选择安装位置。默认在 `C:\Users\你的用户名\Coopanion`，安装器按当前用户安装。
4. 完成后启动 Coopanion，之后可从桌面快捷方式打开。

:::note[没有开始菜单入口]
此版本不创建开始菜单快捷方式。找不到应用时，先检查桌面快捷方式或所选安装目录中的 `Coopanion.exe`。
:::

Release 还提供 `SHA256SUMS.txt`。需要核对下载是否完整时，可在 PowerShell 中对实际下载的文件运行以下命令，再与该文件中的对应条目比较：

```powershell
Get-FileHash .\Coopanion-Setup-0.1.10.exe -Algorithm SHA256
```

## 安装成功后

Coo 会出现在屏幕底边，任务栏通知区域会出现托盘图标。程序启动时不一定打开设置窗口。

- 单击托盘图标打开设置；托盘被折叠时，先点任务栏右下角的上箭头。
- 也可以右键 Coo，找到齿轮形的设置按钮。
- 继续阅读[首次配置与第一次对话](/start/first-chat/)。

## 没有看到桌宠

右键托盘图标，选择「显示桌宠」。仍没有出现时，按[桌宠不见了的排查步骤](/troubleshooting/common/#桌宠不见了)处理。重装前先了解[数据备份与卸载](/safety/data/)，不要直接删除数据文件夹。

依据：[v0.1.10 安装配置](https://github.com/Pal-AI-Lab/Coopanion/blob/v0.1.10/electron-builder.yml)、[Windows 安装器行为](https://github.com/Pal-AI-Lab/Coopanion/blob/v0.1.10/installer/nsis.nsh)。
