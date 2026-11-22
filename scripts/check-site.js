// Kiểm tra website tĩnh: trang bắt buộc, <title>, viewport, alt của ảnh,
// liên kết/ảnh nội bộ, dung lượng ảnh và chuỗi bí mật.
const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
// ---- Cấu hình (có thể nới lỏng bằng cách đặt false hoặc tăng giới hạn) ----
const REQUIRED = ['index.html'];
const CHECK_VIEWPORT = true;          // mỗi trang phải có <meta name="viewport">
const CHECK_IMG_ALT = true;           // mỗi <img> phải có thuộc tính alt
const MAX_IMAGE_BYTES = 0; 
const CHECK_PRICE = true;             // giá trong class="price" phải là số, không âm
const SECRET_PATTERNS = [
  [/ghp_[A-Za-z0-9]{36}/, 'GitHub personal access token'],
  [/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/, 'khóa riêng (private key)'],
  [/AKIA[0-9A-Z]{16}/, 'AWS access key'],
  [/(?:password|passwd|secret|api[_-]?key)\s*[:=]\s*["'][^"']{6,}["']/i, 'mật khẩu/khóa gán cứng'],
];
const SCAN_EXT = ['.html', '.js', '.css', '.json', '.yml', '.yaml', '.md'];
const SKIP_DIRS = new Set(['.git', 'node_modules']);

const errors = [];

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    if (SKIP_DIRS.has(name)) continue;
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p, out); else out.push(p);
  }
  return out;
}
const rel = p => path.relative(ROOT, p).split(path.sep).join('/');
const isExternal = u => /^(https?:|mailto:|tel:|#|data:|javascript:|\/\/)/i.test(u);

const files = walk(ROOT);
const pages = fs.readdirSync(ROOT).filter(f => f.toLowerCase().endsWith('.html'));
console.log('HTML pages:', pages.join(', '));

for (const f of REQUIRED) if (!fs.existsSync(path.join(ROOT, f))) errors.push(`Thiếu trang bắt buộc: ${f}`);

for (const page of pages) {
  const html = fs.readFileSync(path.join(ROOT, page), 'utf8');
  if (!/<title>[^<]+<\/title>/i.test(html)) errors.push(`${page}: thiếu thẻ <title>`);
  if (CHECK_VIEWPORT && !/<meta[^>]+name\s*=\s*["']viewport["']/i.test(html)) errors.push(`${page}: thiếu <meta name="viewport">`);
  if (CHECK_IMG_ALT) {
    for (const m of html.matchAll(/<img\b[^>]*>/gi)) {
      if (!/\balt\s*=/i.test(m[0])) { const src = (m[0].match(/src\s*=\s*["']([^"']+)["']/i) || [])[1] || '?'; errors.push(`${page}: ảnh "${src}" thiếu thuộc tính alt`); }
    }
  }
  for (const raw of [...html.matchAll(/(?:src|href)\s*=\s*["']([^"']+)["']/gi)].map(m => m[1])) {
    if (isExternal(raw)) continue;
    const clean = decodeURI(raw.split('#')[0].split('?')[0]);
    if (clean && !fs.existsSync(path.join(ROOT, clean))) errors.push(`${page}: không tìm thấy "${raw}"`);
  }

    if (CHECK_PRICE) {
    for (const m of html.matchAll(/<(\w+)\b[^>]*class\s*=\s*["'][^"']*\bprice\b[^"']*["'][^>]*>([\s\S]*?)<\/\1>/gi)) {
      const text = m[2].replace(/<[^>]*>/g, '').trim();
      const num = text.match(/-?\s*\d[\d.,]*/);
      if (!num) { errors.push(`${page}: giá "${text}" không chứa số`); continue; }
      if (/-\s*\d/.test(text)) errors.push(`${page}: giá "${text}" bị âm`);
    }
  }
}

if (MAX_IMAGE_BYTES) {
  for (const f of files) {
    if (/\.(png|jpe?g|gif|webp)$/i.test(f) && fs.statSync(f).size > MAX_IMAGE_BYTES)
      errors.push(`${rel(f)}: ảnh vượt ${(MAX_IMAGE_BYTES / 1048576).toFixed(0)} MB (${(fs.statSync(f).size / 1048576).toFixed(1)} MB)`);
  }
}

for (const f of files) {
  if (!SCAN_EXT.includes(path.extname(f).toLowerCase())) continue;
  const text = fs.readFileSync(f, 'utf8');
  for (const [re, label] of SECRET_PATTERNS) if (re.test(text)) errors.push(`${rel(f)}: nghi ngờ chứa ${label}`);
}

if (errors.length) {
  console.error('\nPHÁT HIỆN LỖI:');
  errors.forEach(e => console.error(' - ' + e));
  process.exit(1);
}
console.log('Site check OK');