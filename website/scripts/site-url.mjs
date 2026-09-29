/** The first release is hosted at an independent origin, never under a subpath. */
export function siteUrl(value, { required = false } = {}) {
  if (!value?.trim()) {
    if (required) throw new Error('生产部署必须设置 DOCS_SITE_URL（实际 HTTPS 站点根地址）。');
    return undefined;
  }
  let url;
  try { url = new URL(value.trim()); } catch { throw new Error('DOCS_SITE_URL 必须是完整 HTTPS URL。'); }
  const host = url.hostname.toLowerCase();
  if (url.protocol !== 'https:' || url.username || url.password || url.port ||
      url.pathname !== '/' || url.search || url.hash ||
      !host.includes('.') || host.endsWith('.') || host.endsWith('.localhost') || host.endsWith('.local') ||
      /(^|\.)(example\.(com|org|net)|example|invalid|test)$/.test(host) ||
      /^[\d.]+$/.test(host) || host.includes(':')) {
    throw new Error('DOCS_SITE_URL 必须是不含账号、非默认端口、子路径、查询或片段的实际 HTTPS 根地址，不能使用占位或本机地址。');
  }
  return url.origin;
}
