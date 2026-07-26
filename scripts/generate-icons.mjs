/**
 * Dependency-freier PWA-Icon-Generator.
 * Zeichnet das ForgeFit-Logo (Farbverlauf-Hintergrund + Hantel) per Pixel
 * und schreibt PNGs nach public/icons. Regenerieren: `node scripts/generate-icons.mjs`.
 */
import { deflateSync } from 'node:zlib'
import { writeFileSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'icons')
mkdirSync(OUT, { recursive: true })

// --- minimaler PNG-Encoder (RGBA) ---
function crc32(buf) {
  let c = ~0
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i]
    for (let k = 0; k < 8; k++) c = (c >>> 1) ^ (0xedb88320 & -(c & 1))
  }
  return ~c >>> 0
}
function chunk(type, data) {
  const t = Buffer.from(type, 'ascii')
  const len = Buffer.alloc(4)
  len.writeUInt32BE(data.length)
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(Buffer.concat([t, data])))
  return Buffer.concat([len, t, data, crc])
}
function encodePng(width, height, rgba) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(width, 0)
  ihdr.writeUInt32BE(height, 4)
  ihdr[8] = 8 // bit depth
  ihdr[9] = 6 // color type RGBA
  const raw = Buffer.alloc((width * 4 + 1) * height)
  for (let y = 0; y < height; y++) {
    raw[y * (width * 4 + 1)] = 0
    rgba.copy(raw, y * (width * 4 + 1) + 1, y * width * 4, (y + 1) * width * 4)
  }
  return Buffer.concat([
    sig,
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ])
}

function lerp(a, b, t) {
  return Math.round(a + (b - a) * t)
}

/** Zeichnet ein Icon der Größe s. maskable => weniger Rand-Radius (Full-bleed). */
function drawIcon(s, { maskable = false } = {}) {
  const rgba = Buffer.alloc(s * s * 4)
  const radius = maskable ? 0 : s * 0.22
  // Brand-Verlauf indigo -> violett
  const c1 = [124, 92, 255]
  const c2 = [180, 92, 255]
  const bg = [11, 11, 18]

  const inRounded = (x, y) => {
    if (radius <= 0) return true
    const rx = Math.min(x, s - 1 - x)
    const ry = Math.min(y, s - 1 - y)
    if (rx >= radius || ry >= radius) return true
    const dx = radius - rx
    const dy = radius - ry
    return dx * dx + dy * dy <= radius * radius
  }

  // Hantel-Geometrie (zentriert, diagonal wirkt zu komplex -> horizontal)
  const cx = s / 2
  const cy = s / 2
  const barH = s * 0.09
  const barW = s * 0.34
  const plateW = s * 0.07
  const plateH = s * 0.30
  const plate2H = s * 0.20
  const gap = s * 0.015

  const isBar = (x, y) =>
    Math.abs(y - cy) <= barH / 2 && Math.abs(x - cx) <= barW / 2
  const isPlate = (x, y) => {
    const dxOuter = barW / 2 + gap + plateW
    const dxInner = barW / 2 + gap
    const ax = Math.abs(x - cx)
    if (ax >= dxInner && ax <= dxOuter && Math.abs(y - cy) <= plateH / 2) return true
    const dxOuter2 = dxOuter + gap + plateW
    if (ax >= dxOuter + gap && ax <= dxOuter2 && Math.abs(y - cy) <= plate2H / 2) return true
    return false
  }

  for (let y = 0; y < s; y++) {
    for (let x = 0; x < s; x++) {
      const i = (y * s + x) * 4
      const inside = inRounded(x, y)
      // Verlauf diagonal
      const t = (x + y) / (2 * s)
      let r, g, b, a
      if (!inside) {
        r = g = b = a = 0
      } else if (isBar(x, y) || isPlate(x, y)) {
        r = 244
        g = 244
        b = 251
        a = 255
      } else {
        // Hintergrund: Verlauf mit leichter Vignette zur bg-Farbe an den Ecken
        const gr = lerp(c1[0], c2[0], t)
        const gg = lerp(c1[1], c2[1], t)
        const gb = lerp(c1[2], c2[2], t)
        const edge = Math.min(x, y, s - 1 - x, s - 1 - y) / (s * 0.5)
        const v = Math.max(0, Math.min(1, edge))
        r = lerp(bg[0], gr, 0.4 + 0.6 * v)
        g = lerp(bg[1], gg, 0.4 + 0.6 * v)
        b = lerp(bg[2], gb, 0.4 + 0.6 * v)
        a = 255
      }
      rgba[i] = r
      rgba[i + 1] = g
      rgba[i + 2] = b
      rgba[i + 3] = a
    }
  }
  return encodePng(s, s, rgba)
}

writeFileSync(join(OUT, 'icon-192.png'), drawIcon(192))
writeFileSync(join(OUT, 'icon-512.png'), drawIcon(512))
writeFileSync(join(OUT, 'icon-512-maskable.png'), drawIcon(512, { maskable: true }))
writeFileSync(join(OUT, 'apple-touch-icon.png'), drawIcon(180, { maskable: true }))

// SVG-Favicon (scharf in jeder Größe)
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#7c5cff"/>
      <stop offset="1" stop-color="#b45cff"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="112" fill="url(#g)"/>
  <g fill="#f4f4fb">
    <rect x="169" y="233" width="174" height="46" rx="8"/>
    <rect x="132" y="196" width="36" height="120" rx="10"/>
    <rect x="96" y="216" width="30" height="80" rx="10"/>
    <rect x="344" y="196" width="36" height="120" rx="10"/>
    <rect x="386" y="216" width="30" height="80" rx="10"/>
  </g>
</svg>`
writeFileSync(join(OUT, 'icon.svg'), svg)

console.log('Icons generiert:', OUT)
