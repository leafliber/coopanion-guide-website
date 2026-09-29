---
title: 项目结构与扩展开发
description: 了解 Coopanion 与 Cortico 的职责边界，找到 World、Provider 的准确开发入口。
---

这页帮你判断一个改动属于桌面应用、桌宠扩展还是 Cortico 框架，并找到对应开发资料。目录以 **Coopanion v0.1.7** 为准。

## Coopanion 负责什么

Coopanion 把 Cortico Core、Cormini Persona、桌宠 World、电脑操作 World 和模型 Provider 组装成桌面应用。

- **Core** 管理事件、会话和模型调用。
- **Persona** 定义角色的上下文与记忆行为；Coopanion 使用 Cormini。
- **World** 连接外部环境，接收事件并提供工具，例如桌宠互动和键鼠操作。
- **Provider** 适配模型服务的请求与响应；它不是桌面 UI，也不是角色记忆层。

这些职责不同。修改文档、外观或安装方式，通常不需要改 Cortico 的核心接口。

## 应用仓库目录

| 路径 | 职责 |
| --- | --- |
| `app/` | Electron 主进程、托盘与菜单栏、设置窗口、Core 子进程管理 |
| `core/` | 装配各模块、首次配置、桌宠引导与应用种子数据 |
| `console/` | Coopanion 控制台入口与开始、习惯、装扮、语音等页面 |
| `packages/cortico-world-desktop-pet/` | 桌宠窗口、互动、装扮、本地语音输入 |
| `packages/cortico-world-cua/` | 电脑操作工具、逐轮许可与系统输入实现 |
| `packages/cortico-provider-coo/` | Coo 内置模型服务连接与价目 |
| `vendor/cortico/` | 由 Git 子模块锁定的 Cortico 框架 |
| `scripts/stage.ts`、`scripts/pack.ts` | 组装开发运行目录、制作桌面安装包 |

两个 World 和 Coo Provider 是应用仓库自己的 workspace 包，不能因为名称相似就去改历史独立仓库。`vendor/cortico` 才是子模块；v0.1.7 锁定的提交为 `fb710ef01755a170186a8c940a0c9fd19015de0f`。

本网站是当前独立文档仓库中的 `website/`，不在上表对应的 v0.1.7 应用目录内。应用与文档未来合并到同一仓库，需要维护者另行迁移；本站不假定迁移已经发生。

## World 开发入口

先看锁定 Cortico 版本的 [World 契约](https://github.com/Pal-AI-Lab/Cortico/blob/fb710ef01755a170186a8c940a0c9fd19015de0f/docs/worlds.md)和[扩展格式与校验](https://github.com/Pal-AI-Lab/Cortico/blob/fb710ef01755a170186a8c940a0c9fd19015de0f/docs/extensions.md)。它们解释配置、工具、事件和扩展入口。

需要参考 Coopanion 的现成实现时：

- [桌宠 World README](https://github.com/Pal-AI-Lab/Coopanion/blob/v0.1.7/packages/cortico-world-desktop-pet/README.md)：桌宠事件、动作、窗口与语音。
- [电脑操作 World README](https://github.com/Pal-AI-Lab/Coopanion/blob/v0.1.7/packages/cortico-world-cua/README.md)：工具坐标、平台支持与电脑操作测试。

外部扩展的安装验证见[扩展安装与管理](/guides/extensions/)。开发时使用隔离数据，不把真实账号凭据放进示例、快照或测试夹具。

## Provider 开发入口

先看锁定版本的 [Provider 文档](https://github.com/Pal-AI-Lab/Cortico/blob/fb710ef01755a170186a8c940a0c9fd19015de0f/docs/providers.md)与[Provider 接口说明](https://github.com/Pal-AI-Lab/Cortico/blob/fb710ef01755a170186a8c940a0c9fd19015de0f/src/providers/README.md)。Coopanion 自己的 [Coo Provider](https://github.com/Pal-AI-Lab/Coopanion/blob/v0.1.7/packages/cortico-provider-coo/README.md)说明厂商表、端点配置与连接流程。

框架上游拥有的功能不一定随 Coopanion 打包。例如 `stage.ts` 会裁剪一些 Cortico 内置模块，不能把 Cortico 文档中的所有 Provider 或 World 当作 Coopanion 已内置的功能。新增协议或更新子模块应遵循应用项目自身的评审流程。
