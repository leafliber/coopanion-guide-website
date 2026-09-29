import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = fileURLToPath(new URL('../dist/', import.meta.url));
const origin = 'https://search-check.invalid';
const cases = [
  ['桌宠不见了', '/troubleshooting/common/'],
  ['麦克风', '/guides/chat-voice/'],
  ['API Key', '/start/first-chat/'],
  ['左 Option', '/reference/controls/'],
  ['卸载', '/safety/data/'],
  ['Cortico', '/develop/architecture/'],
];

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
    const routes = await Promise.all(result.results.map(async (item) =>
      new URL((await item.data()).url, origin).pathname));
    assert.ok(routes.includes(expected), `搜索「${query}」未找到 ${expected}；实际：${routes.join(', ')}`);
    console.log(`通过：${query} → ${expected}`);
  }
  console.log(`Pagefind 生产索引查询通过：${cases.length}/${cases.length}。浏览器交互需另行验证。`);
} finally {
  if (pagefind) await pagefind.destroy();
  globalThis.fetch = previousFetch;
  if (previousDocument === undefined) delete globalThis.document;
  else globalThis.document = previousDocument;
}
