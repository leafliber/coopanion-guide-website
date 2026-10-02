---
title: 贡献、测试与发布
description: 了解应用与文档的贡献入口、实际检查命令，以及应用发布说明的权威来源。
---

这页帮助你提交可验证的改动。应用代码在 [Coopanion](https://github.com/Pal-AI-Lab/Coopanion)，本站内容在独立文档仓库；请将改动提交到对应位置。

## 提交之前

1. 阅读目标仓库的协作说明，检查现有未提交改动，避免覆盖别人的工作。
2. 用清楚的复现步骤说明问题；涉及平台差异时写明系统、应用版本与安装方式。
3. 修改用户可见行为时，同步更新本站 `website/src/content/docs/` 中的对应页面。未发布行为必须标注适用范围，不能直接替换稳定版步骤。
4. README 保留概览、下载与文档入口；用户操作手册只维护本站正文。工程契约、包 README 和发布说明继续使用各自权威来源。

不要提交真实 API Key、个人数据目录、未脱敏日志或含敏感内容的截图。需要附诊断信息时，先检查并脱敏，只保留定位问题所需部分。

## 应用代码检查

在完成[源码环境准备](/develop/source/)后，v0.1.10 应用 CI 按下面顺序执行：

```bash
pnpm install --frozen-lockfile
pnpm run build:cortico
pnpm run typecheck
pnpm run typecheck:web
pnpm run test
pnpm run typecheck:worlds
pnpm run test:worlds
```

CI 覆盖 Windows、macOS 和 Ubuntu。涉及系统权限、麦克风、窗口层级或电脑操作的改动，仍需在相关平台补充实际验证；单元测试通过不能证明所有真实设备行为都正确。

## 文档检查

在文档仓库运行独立文档命令，安装、检查与预览方法见 [website/README.md](https://github.com/leafliber/coopanion-guide-website/blob/main/website/README.md)。核对内部链接、代码块、中文搜索和手机导航。需要截图时使用真实应用截图，保留来源与许可信息。

普通正文优先 Markdown。开发资料不必完整复制进网站：用固定版本的准确入口连接到上游契约，避免维护两份互相漂移的教程。

## 应用如何发布

v0.1.10 的[应用发布工作流](https://github.com/Pal-AI-Lab/Coopanion/blob/v0.1.10/.github/workflows/release.yml)由推送 `v*` 标签触发。它在对应平台构建 Windows、macOS 两种架构、Linux 的安装文件，校验文件齐全后生成 SHA-256 校验清单，并以 `docs/releases/<标签>.md` 作为 Release 正文发布。

这是应用仓库维护者的发布流程，不是网站部署命令。发布前需确认版本号、说明和检查结果一致；该版本的发布工作流自身没有串联应用 CI 的全部检查，不应把“安装包构建成功”当成“所有测试已通过”。

本站只维护[更新索引](/releases/)，不复制 Release 正文。已发布功能以 Release 及其标签为基线；主分支的版本号或代码变化本身不能证明已经发布。

## 提问与反馈

产品问题请到 [Coopanion Issues](https://github.com/Pal-AI-Lab/Coopanion/issues)。写清楚预期结果、实际结果和最短复现步骤；提供报错文字前去掉 Key、账号、个人路径和对话内容。

更细的工程约定仍见[应用开发文档](https://github.com/Pal-AI-Lab/Coopanion/blob/v0.1.10/docs/DEVELOPMENT.md)与[项目结构](/develop/architecture/)。上游旧文档中要求将用户操作更新进 README 的做法，不是本站正文的维护方式。
