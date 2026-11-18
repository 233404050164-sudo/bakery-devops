// Kiểm tra cấu trúc website tĩnh: trang bắt buộc, thẻ <title>, liên kết nội bộ và ảnh.
const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const REQUIRED = ['index.html'];            // thêm các trang bắt buộc khác nếu muốn
const errors = [];

function listHtml(dir) {
  return fs.readdirSync(dir).filter(f => f.toLowerCase().endsWith('.html'));
}

function isExternal(u) {
  return /^(https?:|mailto:|tel:|#|data:|javascript:|\/\/)/i.test(u);
}

const pages = listHtml(ROOT);
console.log('HTML pages:', pages.join(', '));

for (const f of REQUIRED) {
  if (!fs.existsSync(path.join(ROOT, f))) errors.push(`Thiếu trang bắt buộc: ${f}`);
}

for (const page of pages) {
  const html = fs.readFileSync(path.join(ROOT, page), 'utf8');
  if (!/<title>[^<]+<\/title>/i.test(html)) errors.push(`${page}: thiếu thẻ <title>`);
  const refs = [...html.matchAll(/(?:src|href)\s*=\s*["']([^"']+)["']/gi)].map(m => m[1]);
  for (const raw of refs) {
    if (isExternal(raw)) continue;
    const clean = decodeURI(raw.split('#')[0].split('?')[0]);
    if (!clean) continue;
    const target = path.join(ROOT, clean);
    if (!fs.existsSync(target)) errors.push(`${page}: không tìm thấy "${raw}"`);
  }
}

if (errors.length) {
  console.error('\nPHÁT HIỆN LỖI:');
  errors.forEach(e => console.error(' - ' + e));
  process.exit(1);
}
console.log('Site check OK');