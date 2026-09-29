import { test } from 'node:test';
import assert from 'node:assert/strict';
import { siteUrl } from './site-url.mjs';

test('local builds omit canonical origin, deployments require it', () => {
  assert.equal(siteUrl(undefined), undefined);
  assert.equal(siteUrl('  '), undefined);
  assert.throws(() => siteUrl('', { required: true }));
});
test('accept and normalize HTTPS root URL', () => {
  assert.equal(siteUrl('https://docs.coopanion.org/'), 'https://docs.coopanion.org');
});
test('reject placeholder, non-root, credentials and local deployment origins', () => {
  for (const value of ['https://example.com', 'https://example.com.', 'https://localhost.', 'https://docs.example', 'https://docs.example.org', 'https://docs.test', 'https://localhost', 'https://127.0.0.1', 'http://docs.coopanion.org', 'https://docs.coopanion.org/docs', 'https://docs.coopanion.org/?preview=1', 'https://user:pass@docs.coopanion.org', 'https://docs.coopanion.org:8787', 'https://docs.coopanion.org/#a', 'not a URL']) {
    assert.throws(() => siteUrl(value), value);
  }
});
