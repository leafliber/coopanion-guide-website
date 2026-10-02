import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'parse5';

const dist = fileURLToPath(new URL('../dist/', import.meta.url));
const origin = 'https://search-check.invalid';
const cases = [
  ['桌宠不见了', '/troubleshooting/common/'],
  ['麦克风', '/guides/chat-voice/'],
  ['API Key', '/start/first-chat/'],
  ['左 Option', '/reference/controls/'],
  ['卸载', '/safety/data/'],
  ['Cortico', '/develop/architecture/'],
  ['匿名使用统计', '/safety/permissions/'],
  ['系统提示词', '/guides/personality/'],
  ['什么时候先问你', '/guides/computer/'],
  ['更新提醒', '/releases/'],
];
const pageIds = new Map();
const checkedUrls = new Set();

async function checkSearchUrl(value) {
  const url = new URL(value, origin);
  if (checkedUrls.has(url.href)) return;
  assert.equal(url.origin, origin, `搜索结果不是站内链接：${value}`);
  const pathname = decodeURIComponent(url.pathname);
  const file = path.resolve(dist, '.' + pathname, pathname.endsWith('/') ? 'index.html' : '');
  assert.ok(file.startsWith(path.resolve(dist) + path.sep), `搜索结果超出产物目录：${value}`);
  if (!pageIds.has(file)) {
    const ids = new Set();
    const visit = (node) => {
      for (const attr of node.attrs || []) {
        if (attr.name === 'id' || (node.tagName === 'a' && attr.name === 'name')) ids.add(attr.value);
      }
      for (const child of node.childNodes || []) visit(child);
    };
    visit(parse(await readFile(file, 'utf8')));
    pageIds.set(file, ids);
  }
  if (url.hash) {
    assert.ok(pageIds.get(file).has(decodeURIComponent(url.hash.slice(1))), `搜索结果缺少锚点：${value}`);
  }
  checkedUrls.add(url.href);
}

// Run the generated, unmodified Pagefind query module against actual build files.
// Only its document language and fetch transport are supplied here; no fake
// results, network requests, or alternate tokenizer are used in this regression.
const previousFetch = globalThis.fetch;
const previousDocument = globalThis.document;
let pagefind;
try {
  globalThis.document = {
    currentScript: null,
    querySelector: (selector) => selector === 'html'
      ? { getAttribute: (name) => name === 'lang' ? 'zh-CN' : null }
      : null,
  };
  globalThis.fetch = async (input) => {
    const url = new URL(typeof input === 'string' || input instanceof URL ? input : input.url, origin);
    assert.equal(url.origin, origin, '搜索回归不允许网络请求');
    assert.ok(url.pathname.startsWith('/pagefind/'), '仅允许读取生成的搜索文件');
    const file = path.resolve(dist, '.' + decodeURIComponent(url.pathname));
    assert.ok(file.startsWith(path.join(dist, 'pagefind') + path.sep), '搜索文件不能超出产物目录');
    return new Response(await readFile(file));
  };
  pagefind = await import(new URL('../dist/pagefind/pagefind.js', import.meta.url));
  await pagefind.options({ basePath: origin + '/pagefind/' });
  for (const [query, expected] of cases) {
    const result = await pagefind.search(query);
    const data = await Promise.all(result.results.map((item) => item.data()));
    const routes = data.map((item) => new URL(item.url, origin).pathname);
    assert.ok(routes.includes(expected), `搜索「${query}」未找到 ${expected}；实际：${routes.join(', ')}`);
    for (const item of data) {
      for (const result of [item, ...(item.sub_results || [])]) await checkSearchUrl(result.url);
    }
    console.log(`通过：${query} → ${expected}`);
  }
  console.log(`Pagefind 生产索引查询通过：${cases.length}/${cases.length}；${checkedUrls.size} 个结果页面与锚点有效。浏览器交互需另行验证。`);
} finally {
  if (pagefind) await pagefind.destroy();
  globalThis.fetch = previousFetch;
  if (previousDocument === undefined) delete globalThis.document;
  else globalThis.document = previousDocument;
}
