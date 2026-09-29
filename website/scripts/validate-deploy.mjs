import { readFile } from 'node:fs/promises';
import { parse } from 'parse5';
import { siteUrl } from './site-url.mjs';

const site = siteUrl(process.env.DOCS_SITE_URL, { required: true });
const html = parse(await readFile(new URL('../dist/index.html', import.meta.url), 'utf8'));
let canonical;
function visit(node) {
  const attrs = Object.fromEntries((node.attrs || []).map((attr) => [attr.name, attr.value]));
  if (node.tagName === 'link' && attrs.rel === 'canonical') canonical = attrs.href;
  for (const child of node.childNodes || []) visit(child);
}
visit(html);
if (canonical !== site + '/') throw new Error('构建产物的 canonical 与 DOCS_SITE_URL 不一致；请用同一地址重新执行 pnpm docs:verify。');
await readFile(new URL('../dist/404.html', import.meta.url));
console.log('生产站点地址和构建产物校验通过。');
