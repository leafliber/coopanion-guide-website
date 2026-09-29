# 参与文档维护

正式正文位于 `website/src/content/docs/`。修改用户可见行为的说明时，更新对应页面，不向 README 继续堆叠教程。
此仓库独立于桌面应用；应用行为变更需在上游提交，同时关联文档改动。

1. 对照目标 Release 标签、源码、测试与实际发布资产核验事实。未发布的行为必须显式标注适用范围。
2. 优先 Markdown；仅首页使用 MDX。新增页面后在 `website/astro.config.mjs` 配置导航。
3. 保留操作前提、步骤、成功标志与故障排查入口。不要填写真实 Key、私人数据或未脱敏日志。
4. 运行 `pnpm docs:verify`，再在 `pnpm docs:preview` 中检查阅读和搜索。修改静态路由时也用 `pnpm docs:cf-preview` 检查。
5. PR 说明受影响页面、核验来源与实际检查结果。只修改文档依赖，不改应用或 Cortico。

工作流路径与 Cloudflare 配置说明见 [website/README.md](website/README.md)。
