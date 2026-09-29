import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { parse } from 'parse5';
import { siteUrl } from './site-url.mjs';

const root = path.resolve('dist');
const origin = siteUrl(process.env.DOCS_SITE_URL) || 'https://local-build.invalid';
const failures = [];
const external = new Set();
const pages = new Map();
const references = [];
let checked = 0;
async function files(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (await Promise.all(entries.map((entry) => {
    const name = path.join(dir, entry.name);
    return entry.isDirectory() ? files(name) : name;
  }))).flat();
}
const allFiles = await files(root);
function visit(node, fn) {
  fn(node);
  for (const child of node.childNodes || []) visit(child, fn);
  if (node.content) visit(node.content, fn);
}
for (const file of allFiles.filter((file) => file.endsWith('.html'))) {
  const ids = new Set();
  const html = await readFile(file, 'utf8');
  const pathname = '/' + path.relative(root, file).split(path.sep).join('/').replace(/index\.html$/, '');
  const base = new URL(pathname, origin);
  visit(parse(html), (node) => {
    const attrs = Object.fromEntries((node.attrs || []).map((attr) => [attr.name, attr.value]));
    if (attrs.id) ids.add(attrs.id);
    if (node.tagName === 'a' && attrs.name) ids.add(attrs.name);
    if (node.tagName === 'html' && attrs.lang !== 'zh-CN') failures.push(`${pathname}: 页面语言不是 zh-CN`);
    if (!process.env.DOCS_SITE_URL && node.tagName === 'link' && attrs.rel === 'canonical') failures.push(`${pathname}: 未设置站点地址却生成 canonical`);
    for (const key of ['href', 'src', 'poster', 'xlink:href']) {
      if (attrs[key]) references.push({ file, base, value: attrs[key] });
    }
    // Astro's image srcset consists of ordinary URLs and width descriptors.
    if (attrs.srcset && !attrs.srcset.startsWith('data:')) {
      for (const item of attrs.srcset.split(',')) references.push({ file, base, value: item.trim().split(/\s+/)[0] });
    }
  });
  pages.set(file, ids);
}
for (const file of allFiles.filter((file) => file.endsWith('.css'))) {
  const css = await readFile(file, 'utf8');
  const base = new URL('/' + path.relative(root, file).split(path.sep).join('/'), origin);
  for (const match of css.matchAll(/url\(\s*['"]?([^'"\s)]+)['"]?\s*\)/g)) references.push({ file, base, value: match[1] });
}
for (const { file, base, value } of references) {
  if (/^(data:|mailto:|tel:|javascript:)/i.test(value)) continue;
  let url;
  try { url = new URL(value, base); } catch { failures.push(`${file}: 无效 URL ${value}`); continue; }
  if (!['http:', 'https:'].includes(url.protocol)) { failures.push(`${file}: 不支持的链接协议 ${value}`); continue; }
  if (url.origin !== origin) { external.add(url.href); continue; }
  let target;
  try { target = path.resolve(root, '.' + decodeURIComponent(url.pathname)); } catch { failures.push(`${file}: 无效编码 ${value}`); continue; }
  if (target !== root && !target.startsWith(root + path.sep)) { failures.push(`${file}: 路径超出 dist ${value}`); continue; }
  try {
    const info = await stat(target);
    if (info.isDirectory()) target = path.join(target, 'index.html');
    await stat(target);
  } catch {
    failures.push(`${path.relative(root, file)}: 缺少页面或资源 ${value}`);
    continue;
  }
  checked++;
  if (url.hash && pages.has(target)) {
    const id = decodeURIComponent(url.hash.slice(1));
    // Text fragments do not refer to an element ID.
    if (!id.startsWith(':~:text=') && !pages.get(target).has(id)) failures.push(`${path.relative(root, file)}: 缺少锚点 ${value}`);
  }
}
if (!allFiles.some((file) => file.endsWith('/pagefind/pagefind.js'))) failures.push('缺少 Pagefind 生产搜索索引。');
if (!allFiles.includes(path.join(root, '404.html'))) failures.push('缺少静态 404.html。');
if (!process.env.DOCS_SITE_URL && allFiles.some((file) => /sitemap.*\.xml$/.test(file))) failures.push('无站点地址的构建不应产生 sitemap。');
if (failures.length) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`通过：${pages.size} 个 HTML 页面，${checked} 个内部页面、锚点与静态资源引用；404 与 Pagefind 产物存在。`);
}
console.log(`外部链接 ${external.size} 个，不混入内部断链判定。用 --external 单独检测网络可达性。`);
if (process.argv.includes('--external')) {
  let unavailable = 0;
  for (const address of external) {
    try {
      const response = await fetch(address, { method: 'HEAD', signal: AbortSignal.timeout(15000), redirect: 'follow' });
      if (!response.ok) { unavailable++; console.warn(`外部 HTTP ${response.status}: ${address}`); }
    } catch (error) { unavailable++; console.warn(`外部网络失败: ${address} (${error.message})`); }
  }
  console.log(`外部检测完成：${external.size - unavailable}/${external.size} 可达；限流/认证/网络失败需人工复核，不当作内部断链。`);
}
