---
title: Linux 安装
description: 安装 v0.1.7 的 Linux x64 包，了解 X11、XWayland 与 AppImage 的要求。
---

这页帮助你安装已发布的 Linux 版本，并区分桌面环境带来的限制。**Linux x64 安装包从 v0.1.7 开始提供。**

## 安装前

需要 64 位 x86 Linux 图形桌面，以及 X11 或 XWayland。桌宠依赖透明、置顶和可定位的窗口，桌面需要启用窗口合成。

:::note[Wayland 的适用范围]
v0.1.7 会让 Electron 使用 X11 后端，在 Wayland 会话中通过 XWayland 运行。全局说话键和电脑操作受到 XWayland 的限制，不能据此认为所有原生 Wayland 应用都可被控制。详情见[平台差异](/reference/platforms/)。
:::

## Debian / Ubuntu

1. 从 [Coopanion 官方 Release](https://github.com/Pal-AI-Lab/Coopanion/releases/latest) 下载 `Coopanion-版本号-linux-x64.deb`。
2. 在安装包所在目录打开终端，将下面的版本号换成实际下载的版本：

   ```bash
   sudo apt install ./Coopanion-0.1.7-linux-x64.deb
   ```

3. 在应用菜单打开 Coopanion。安装系统软件包需要管理员权限，应用日常运行使用普通用户即可。

DEB 声明的依赖包括电脑操作使用的 `xdotool` 和 `zenity`，由系统包管理器处理。

## AppImage

1. 在同一 Release 下载 `Coopanion-版本号-linux-x64.AppImage`。
2. 给所下载的文件执行权限，然后运行：

   ```bash
   chmod +x Coopanion-0.1.7-linux-x64.AppImage
   ./Coopanion-0.1.7-linux-x64.AppImage
   ```

3. 若提示缺少 FUSE，按 [AppImage 官方排查说明](https://docs.appimage.org/user-guide/troubleshooting/fuse.html)安装对应发行版的运行库。不同 Ubuntu 版本的包名可能是 `libfuse2` 或 `libfuse2t64`，不要直接替换系统现有的 FUSE。

AppImage 不替你安装电脑操作所需的系统工具；需要该能力时，先阅读[电脑操作与授权](/guides/computer/)。

## 找到设置与继续使用

看到屏幕底边的桌宠后，右键它并打开设置，即可[连接模型并开始对话](/start/first-chat/)。

托盘图标依赖桌面环境的状态栏支持；缺少托盘不代表应用没有启动。若桌宠透明背景或位置异常，先确认正在使用的桌面合成器和 X11 / XWayland 环境。故障反馈请附发行版、桌面环境、会话类型和版本号。

依据：[v0.1.7 发布说明](https://github.com/Pal-AI-Lab/Coopanion/blob/v0.1.7/docs/releases/v0.1.7.md)、[Linux 打包配置](https://github.com/Pal-AI-Lab/Coopanion/blob/v0.1.7/electron-builder.yml)。
