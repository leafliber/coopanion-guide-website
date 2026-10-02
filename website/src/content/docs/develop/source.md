---
title: 从源码启动
description: 在 Coopanion 应用仓库启动 v0.1.10，理解文档站命令与桌面应用构建的区别。
---

这页说明如何复现本手册对应的应用版本。**以下应用命令在 [Coopanion 应用仓库](https://github.com/Pal-AI-Lab/Coopanion)中运行。** 当前文档站位于独立仓库，运行本站不需要启动 Electron 或初始化 Cortico 子模块。

## 准备环境

v0.1.10 的 `package.json` 声明 Node.js `>=22`、pnpm `11.5.0`；应用 CI 使用 Node.js 22，在 Windows、macOS 和 Ubuntu 上检查。建议选择符合 Node 22 系列要求的维护版本，并使用仓库声明的 pnpm，不要为修改文档升级桌面应用依赖。

还需要 Git。运行桌面应用需要图形桌面；Linux 的桌面环境与电脑操作依赖参见[平台参考](/reference/platforms/)。这些命令会安装并构建应用依赖，不是本站的文档构建流程。

## 获取与启动

下面固定到文档基线 `v0.1.10`，适合复现已发布版本：

```bash
git clone --branch v0.1.10 --recursive https://github.com/Pal-AI-Lab/Coopanion.git
cd Coopanion
corepack enable
pnpm install --frozen-lockfile
pnpm run dev
```

`dev` 先运行 `scripts/stage.ts` 生成 `build/cortico`，再启动 Electron。成功后应看到桌宠以及托盘或菜单栏图标。首次启动仍需按[首次对话](/start/first-chat/)配置模型；不要把真实 Key 写进源码。

如果已克隆但缺少子模块，在应用仓库运行：

```bash
git submodule update --init --recursive
```

不要用 `--remote` 随意更新 Cortico；它由应用提交锁定。若要开发新功能，应按应用仓库协作约定从目标分支建立工作分支；不要将标签上的复现步骤误当作未发布功能说明。

## 常用命令

| 命令 | 作用 |
| --- | --- |
| `pnpm run dev` | 生成 `build/cortico` 并启动桌面应用 |
| `pnpm run start` | 使用已有构建启动，不重新生成控制台 |
| `pnpm run build:cortico` | 准备应用使用的 Cortico 与控制台构建 |
| `pnpm run build:installer` | 构建当前平台的安装包，产物在 `dist/` |

改了控制台却没看到变化时，重新运行 `build:cortico`，再重启应用。测试和类型检查的完整顺序见[贡献、测试与发布](/develop/contributing/)。

## 用隔离数据检查首次启动

源码运行默认写入 `build/data`。需要检查空数据场景时，可通过 `CORTICO_COMPANION_DATA` 指定一个新目录；保留正常使用的数据。

macOS / Linux：

```bash
CORTICO_COMPANION_DATA=/tmp/coopanion-first-run pnpm run start
```

Windows PowerShell：

```powershell
$env:CORTICO_COMPANION_DATA = "$env:TEMP\coopanion-first-run"
pnpm run start
```

应选择尚未用过的目录；已有内容的目录不会变成全新实例。Windows 示例的环境变量在当前终端会话持续有效，恢复默认数据位置时清除它或使用新终端。

## 只修改文档站

本站正文唯一维护在 `website/src/content/docs/`。站点的 `docs:dev`、`docs:check`、`docs:build` 和 `docs:preview` 命令、Node 要求与部署配置见文档仓库的 [website/README.md](https://github.com/leafliber/coopanion-guide-website/blob/main/website/README.md)。不要在这个文档仓库运行应用的 `build:cortico` 或桌面打包命令。

依据：[应用 package.json](https://github.com/Pal-AI-Lab/Coopanion/blob/v0.1.10/package.json)、[应用 CI](https://github.com/Pal-AI-Lab/Coopanion/blob/v0.1.10/.github/workflows/ci.yml)、[构建脚本](https://github.com/Pal-AI-Lab/Coopanion/blob/v0.1.10/scripts/stage.ts)。更细的工程说明继续维护在[应用开发文档](https://github.com/Pal-AI-Lab/Coopanion/blob/v0.1.10/docs/DEVELOPMENT.md)。
