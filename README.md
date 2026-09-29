<picture>
  <source media="(prefers-color-scheme: dark)" srcset="website/public/images/banner-dark.svg">
  <img src="website/public/images/banner.svg" alt="Coopanion" width="806">
</picture>

# Coopanion 中文文档

Coopanion 是一个能聊天、接受语音输入、换装，并在授权后操作电脑的桌面伴侣。
本仓库只维护中文文档站，产品源码在 [Pal-AI-Lab/Coopanion](https://github.com/Pal-AI-Lab/Coopanion)。

- [官方下载](https://github.com/Pal-AI-Lab/Coopanion/releases/latest)
- [首次配置与第一次对话](website/src/content/docs/start/first-chat.md)
- [权限、费用与隐私](website/src/content/docs/safety/permissions.md)
- [文档维护与部署](website/README.md)

安装适合系统的官方包，启动后按屏幕底边的气泡引导配置模型服务。
模型 API 可能按用量收费；本机保存数据不代表聊天与截图不会发送给所选服务。
不要在问题反馈中附上 API Key 或未脱敏日志。

## 本地阅读与维护

使用 `.node-version` 指定的 Node.js 和 `package.json` 固定的 pnpm：

```sh
corepack enable
pnpm install --frozen-lockfile
pnpm docs:dev
```

正式正文只有 `website/src/content/docs/` 一份。本地预览地址由命令输出。
生产域名尚未配置；部署默认关闭，具体流程见[维护说明](website/README.md)。

## 内容与许可

手册按已发布的 **v0.1.7** 核验（上游提交 `9f891627d285867c647fc953f71e57ac96377c14`）。
更新记录只索引[上游 Release](https://github.com/Pal-AI-Lab/Coopanion/releases)，不手动维护第二份发布说明。
上游开发资料、验证清单和历史评审仍在原仓库。本仓库不包含或构建桌面应用。

沿用上游 [MIT 许可证](LICENSE)，素材来源见 [website/README.md](website/README.md)。
