import { readdir, readFile, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse, serialize } from 'parse5';
import * as pagefind from 'pagefind';

const dist = fileURLToPath(new URL('../dist/', import.meta.url));
const segmenter = new Intl.Segmenter('zh-CN', { granularity: 'word' });
const untouched = new Set(['script', 'style', 'code', 'pre', 'svg', 'template']);

// Pagefind 1.5.2 indexes Chinese differently from its Intl.Segmenter query path.
// See https://github.com/Pagefind/pagefind/issues/1237. Insert word boundaries
// into an IN-MEMORY HTML copy only: the published pages and copied code stay intact.
// Remove this compatibility step once unmodified Pagefind passes check:search.
function segmentText(node, skip = false) {
  skip ||= untouched.has(node.tagName) ||
    (node.attrs || []).some((attr) => attr.name === 'data-pagefind-ignore');
  if (!skip && node.nodeName === '#text' && /\p{Script=Han}/u.test(node.value)) {
    node.value = [...segmenter.segment(node.value)].map(({ segment }) => segment).join('\u200B');
  }
  for (const child of node.childNodes || []) segmentText(child, skip);
}

function hasSearchBody(node) {
  return (node.attrs || []).some((attr) => attr.name === 'data-pagefind-body') ||
    (node.childNodes || []).some(hasSearchBody);
}

function checked(result) {
  if (result.errors.length) throw new Error(result.errors.join('\n'));
  return result;
}

try {
  const { index } = checked(await pagefind.createIndex());
  if (!index) throw new Error('Pagefind 未创建索引。');
  const files = (await readdir(dist, { recursive: true }))
    .filter((file) => file.endsWith('.html') && !file.startsWith('pagefind' + path.sep))
    .sort();
  let indexed = 0;
  for (const file of files) {
    const document = parse(await readFile(path.join(dist, file), 'utf8'));
    // Starlight marks searchable docs explicitly. Preserve that scope, including
    // exclusion of its 404 page and pages with `pagefind: false` frontmatter.
    if (!hasSearchBody(document)) continue;
    segmentText(document);
    const result = checked(await index.addHTMLFile({
      sourcePath: file.split(path.sep).join('/'),
      content: serialize(document),
    }));
    if (result.file) indexed++;
  }
  if (!indexed) throw new Error('未找到可索引的文档页面。');
  // This directory contains only generated Pagefind files. Remove stale chunks
  // from Starlight's initial index, then let the same official API write the index.
  const outputPath = path.join(dist, 'pagefind');
  await rm(outputPath, { recursive: true, force: true });
  checked(await index.writeFiles({ outputPath }));
  console.log(`Pagefind 中文分词兼容索引：${indexed} 页；原 HTML 未修改。`);
} finally {
  await pagefind.close();
}
