#!/usr/bin/env bun
/**
 * Serves `pages/` as static files (no HTML-entry HMR).
 * Avoids Bun’s `bun pages/index.html` bundler bug with `./app.ts`.
 */
import { extname, join } from 'node:path'

const pagesRoot = join(import.meta.dir, '..', 'pages')
const host = process.env.HOST ?? '127.0.0.1'
const port = Number(process.env.PORT ?? 3000)

const MIME: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.png': 'image/png',
  '.ttf': 'font/ttf',
  '.woff2': 'font/woff2',
  '.map': 'application/json; charset=utf-8',
}

Bun.serve({
  hostname: host,
  port,
  async fetch(req) {
    const url = new URL(req.url)
    let rel = url.pathname === '/' || url.pathname === '' ? 'index.html' : url.pathname.slice(1)
    if (rel.includes('..')) {
      return new Response('Bad path', { status: 400 })
    }
    const filePath = join(pagesRoot, rel)
    const file = Bun.file(filePath)
    if (await file.exists()) {
      const type = MIME[extname(rel).toLowerCase()] ?? 'application/octet-stream'
      return new Response(file, { headers: { 'Content-Type': type } })
    }
    if (rel === 'build/app.js' || rel.startsWith('build/')) {
      return new Response(
        'Run from repo root: bun build ./pages/app.ts --outdir ./pages/build --target=browser --format=esm',
        { status: 404, headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
      )
    }
    return new Response('Not Found', { status: 404 })
  },
})

console.log(`Type drift → http://${host}:${port}/`)
