import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { siteUrl } from './scripts/site-url.mjs';

const site = siteUrl(process.env.DOCS_SITE_URL);

export default defineConfig({
  ...(site ? { site } : {}),
  output: 'static',
  trailingSlash: 'always',
  integrations: [starlight({
    title: 'Coopanion',
    description: '从第一次对话开始，认识你的桌面伴侣。Coopanion 中文使用指南。',
    favicon: '/favicon.png',
    logo: { src: './src/assets/coo.png', alt: 'Coopanion 桌面伴侣 Coo' },
    locales: { root: { label: '简体中文', lang: 'zh-CN' } },
    social: [{ icon: 'github', label: 'Coopanion 源码', href: 'https://github.com/Pal-AI-Lab/Coopanion' }],
    editLink: { baseUrl: 'https://github.com/leafliber/coopanion-guide-website/edit/main/website/' },
    customCss: ['./src/styles/custom.css'],
    components: { Footer: './src/components/Footer.astro' },
    sidebar: [
      { label: '开始使用', items: [
        { slug: 'start/windows' }, { slug: 'start/macos' }, { slug: 'start/linux' }, { slug: 'start/first-chat' },
      ] },
      { label: '使用指南', items: [
        { slug: 'guides/chat-voice' }, { slug: 'guides/companion' }, { slug: 'guides/personality' }, { slug: 'guides/models' },
        { slug: 'guides/extensions' }, { slug: 'guides/computer' },
      ] },
      { label: '安全与数据', items: [{ slug: 'safety/permissions' }, { slug: 'safety/data' }] },
      { label: '故障排查', items: [{ slug: 'troubleshooting/common' }] },
      { label: '参考资料', collapsed: true, items: [{ slug: 'reference/controls' }, { slug: 'reference/platforms' }] },
      { label: '参与开发', collapsed: true, items: [
        { slug: 'develop/source' }, { slug: 'develop/architecture' }, { slug: 'develop/contributing' },
      ] },
      { label: '更新记录', items: [{ slug: 'releases' }] },
    ],
  })],
});
