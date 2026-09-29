# 文档站维护

本仓库是独立的文档仓库，没有桌面应用 workspace。`website/` 加入本仓库的根 pnpm workspace，**只使用根 `pnpm-lock.yaml`**；不创建第二份锁文件，不依赖 Electron、Cortico 或子模块。
正文只维护在 `src/content/docs/`，不会递归发布上游 Markdown。

## 开发与检查

Node 使用根 `.node-version`（22.22.0），最低 22.13.0；pnpm 固定 11.5.0，与上游约定一致。Astro 7.3.5 与 Starlight 0.42.4 的 peer 版本兼容，全部依赖固定并锁定。

在仓库根目录执行：

```sh
corepack enable
pnpm install --frozen-lockfile
pnpm docs:dev
pnpm docs:verify
pnpm docs:preview
```

| 命令 | 用途 |
| --- | --- |
| `pnpm docs:dev` | 本地内容开发，搜索以生产预览为准 |
| `pnpm docs:check` | Astro/内容类型检查、纳入范围的 Markdown 格式检查、站点地址规则测试 |
| `pnpm docs:build` | 纯静态构建到 `website/dist/`，生成 Pagefind 中文全文索引 |
| `pnpm docs:check-links` | 检查生成 HTML 的内部页面、锚点、图片、脚本、样式和 CSS 资源引用 |
| `pnpm docs:check-search` | 使用真实生产索引检查六项中英文查询与目标页面 |
| `pnpm docs:verify` | 顺序执行 check、build、check-links、check-search，CI 使用此命令 |
| `pnpm docs:preview` | 预览生产产物，检查搜索和阅读体验 |
| `pnpm docs:cf-preview` | Wrangler 本地静态服务，检查嵌套路径和 404，不连接生产站点 |

更新依赖时编辑对应 `package.json` 并运行 `pnpm install` 更新根锁文件，再跑 `docs:verify`。不使用忽略脚本或强制解除冻结的方式掩盖 CI 失败。`allowBuilds` 只允许文档工具链所需的 esbuild、sharp、workerd；不涉及应用安装脚本。

Pagefind 1.5.2 存在索引与查询端中文分词不同的问题，例如「卸载」无法命中数据页，见[上游同类问题 #1237](https://github.com/Pagefind/pagefind/issues/1237)。`build-search.mjs` 在 Astro 构建后只对内存中的 HTML 副本按 `Intl.Segmenter` 添加分词边界，再用 Pagefind 官方 API 生成索引；实际页面、代码复制和默认搜索界面保持原样。`check-search.mjs` 用生成的查询模块验证六项查询。上游修复后，先确认去掉兼容步骤仍能通过这些检查和浏览器搜索，再删除该步骤。

## 新增页面与素材

- 普通正文用 `.md`，文件开头填写 `title`、`description`。首页使用 MDX 和 Starlight 自带卡片。
- 在 `astro.config.mjs` 的 `sidebar` 添加准确 `slug`。第一版只有中文 root locale（`zh-CN`）。
- 内链使用 `/guides/chat-voice/` 形式；锚点来自实际构建。提示使用 `:::note`、`:::caution`，不用 GitHub 专用提示语法。
- 需 Astro 优化的图片放 `src/assets/`，直接复制的公开文件放 `public/`。为图片写有意义的替代文本，截图注明适用范围。
- 对外正文只有 `src/content/docs/`；`public/` 会完整发布，不要放用户数据、安装包或凭据。评审、实验、验证清单留在上游原路径。未进入站点不等于私有。
- 统一的版本说明和反馈入口在 `src/components/Footer.astro`。编辑链接指向本仓库 `main/website/`；仓库迁移时一起改配置。

## 发布基线与单一正文

本次核验基线是上游 Release **v0.1.7**（2026-09-29），标签提交 `9f891627d285867c647fc953f71e57ac96377c14`；检查时上游 main 与标签一致。安装资产以 GitHub Release 为准，下载按钮始终链接 `releases/latest`，浏览器不轮询 GitHub API。

用户操作从上游 README 和源码核验后按任务整理；上游 README、`docs/DEVELOPMENT.md`、World/Provider 技术资料不在此仓库，未修改或搬移它们。网站开发页面提供必要步骤和原位权威入口，不复制完整工程手册。本地原本没有旧文档，因此没有需要保留的本地迁移桩。

发布说明只在上游维护，本站 `src/content/docs/releases/index.md` 是索引。升级基线时先检查 Release 的非预发布状态、资产与标签代码，再更新相关正文、页脚版本和本节。未发布功能必须在相关页明确标记适用版本；不要只按 main 的版本号更新稳定手册。

应用与文档同仓库的目标尚未落到上游；本次遵守独立文档仓库的工作边界。未来合并到应用仓库时，需重新验证 workspace 安装隔离并合并锁文件，不能直接声称 `--filter` 足够，也不能同时保留两份管理相同依赖树的锁文件。上游旧入口的替换应在该迁移中完成。

## 生产站点地址

`DOCS_SITE_URL` 是真实站点的 **HTTPS 根地址**。不设置时，本地构建和预览正常，产物不生成 canonical 或 sitemap。不要填占位域名。

用 shell 环境变量或 CI repository variable 传入；`astro.config.mjs` 读取 `process.env`，不会自动从 `.env` 文件加载此配置。`.env.example` 只记录变量名称。

设置后重新执行 `pnpm docs:verify`。校验拒绝占位域名、localhost、IP、HTTP、账号密码、非默认端口、子路径、query 和 hash。生产部署前还会核对首页 canonical 与该变量，避免上传旧的本地预览产物。站点按根路径设计，不绑定自定义域名。

## Cloudflare Workers Static Assets

`wrangler.jsonc` 只上传 `dist/`，没有 Worker 业务脚本、SSR adapter 或存储绑定。`index.html` 对应嵌套目录；缺失页面使用 Starlight 的 `404.html` 并返回 404。

部署工作流 **只可手动触发且默认关闭**。维护者启用前配置：

| 位置 | 名称 | 值或用途 |
| --- | --- | --- |
| Repository variables | `DOCS_DEPLOY_ENABLED` | 明确设为 `true` 才启用 |
| Repository variables | `DOCS_SITE_URL` | 实际 Workers 地址或已由维护者配置的域名 |
| GitHub Environment | `docs-production` | 部署分支必须限制为 `main`，建议配置 required reviewers |
| Environment secrets | `CLOUDFLARE_API_TOKEN` | 仅目标账户 Workers 部署所需权限的令牌 |
| Environment secrets | `CLOUDFLARE_ACCOUNT_ID` | 目标 Cloudflare 账户 ID |

确认 `wrangler.jsonc` 的 Worker 名 `coopanion-docs` 对应预期站点。工作流固定正式仓库 `leafliber/coopanion-guide-website` 和 `main`，先在无部署凭据的 job 中检查所选 SHA，再在部署 job 中重建、复查同一 SHA，最后一个步骤才注入 Cloudflare secrets。不导入其他 run 的构建产物，不使用 `pull_request_target`。

必须启用环境的分支限制：只有代码内条件不足以防止有分支写权限的人修改工作流。PR、fork 和未合并的分支不应获得环境密钥。建议保护 `main`，要求审查和文档检查通过。

准备好后，从 Actions → Deploy docs to Cloudflare → Run workflow，选择 main。推送代码或开启变量本身均不会自动部署。`pnpm docs:deploy` 是执行真实上传的命令，只供有意部署时使用。本次实现没有运行该命令、连接 Cloudflare 或修改远程配置。

## 排查与验收

- 安装失败：确认 Node/pnpm 版本、网络和根锁文件一致；不要初始化 Cortico 来修复文档依赖。
- Astro 检查失败：根据文件与行号检查 frontmatter、MDX 导入和 sidebar slug。
- 当前 Astro/Starlight 构建会提示 MDX 的 `head-inject` 指令和自定义 404 路由优先级警告；页面与 404 行为已单独验收。未设置 `DOCS_SITE_URL` 时跳过 sitemap 是预期行为。升级后应重新核验这些提示，不要全局屏蔽构建警告。
- 断链失败：先构建，再按输出修复目标路径、大小写、锚点与资源引用。
- 外链需单独检查：`pnpm --dir website check:links --external`。它报告限流、认证或网络失败，与内部断链分开；不要因外部 HEAD 被拒绝就删掉正确的权威入口。
- 搜索无结果：先重新 build 再 preview；用「桌宠不见了」「麦克风」「API Key」「左 Option」「卸载」「Cortico」检查真正的结果条目。
- 页面修改后检查桌面/手机宽度、键盘焦点、明暗主题、侧边栏、目录、复制按钮、长代码与表格溢出。用本地 Wrangler 检查嵌套 URL 直接访问、刷新与未知路径 404。
- 上线后再验证实际域名 TLS、缓存、下载链接与目标地区访问体验；本地检查不等于生产环境已验证。

## 素材与官方参考

素材来自 [Coopanion v0.1.7](https://github.com/Pal-AI-Lab/Coopanion/tree/v0.1.7)，保留根 MIT 许可证：`public/images/banner*.svg` 来自 `assets/`；`src/assets/coo.png` 来自 `app/icons/icon.png`；favicon 来自 `app/icons/tray.png`；`src/assets/appearance.png` 来自 `image/README/1790222143546.png`。后者是上游提供的早期装扮示例，不冒充本次运行截图。

实现核对的官方参考：[Astro 环境要求](https://docs.astro.build/en/install-and-setup/)、[Starlight 内容配置](https://starlight.astro.build/manual-setup/)、[单语言设置](https://starlight.astro.build/guides/i18n/#monolingual-sites)、[搜索](https://starlight.astro.build/guides/site-search/)、[侧边栏](https://starlight.astro.build/guides/sidebar/)、[样式与主题](https://starlight.astro.build/guides/css-and-tailwind/)、[Workers 静态站点路由](https://developers.cloudflare.com/workers/static-assets/routing/static-site-generation/)。
