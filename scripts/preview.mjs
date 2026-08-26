import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { extname, join, normalize } from 'node:path'

const BASE = '/java-portfolio'
const OUT = join(process.cwd(), 'out')
const PORT = process.env.PORT ?? 3000

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml',
  '.json': 'application/json',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
}

async function send(res, status, body, type = 'text/html') {
  res.writeHead(status, { 'content-type': type })
  res.end(body)
}

async function serveFile(res, filePath) {
  try {
    const s = await stat(filePath)
    const target = s.isDirectory() ? join(filePath, 'index.html') : filePath
    const body = await readFile(target)
    await send(res, 200, body, TYPES[extname(target)] ?? 'application/octet-stream')
  } catch {
    try {
      const body = await readFile(join(OUT, '404.html'))
      await send(res, 404, body)
    } catch {
      await send(res, 404, 'Not found')
    }
  }
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url ?? '/', `http://localhost:${PORT}`)
  if (url.pathname === '/' || url.pathname === BASE) {
    res.writeHead(301, { location: `${BASE}/` }).end()
    return
  }
  if (!url.pathname.startsWith(`${BASE}/`)) {
    await serveFile(res, join(OUT, url.pathname))
    return
  }
  const rel = normalize(url.pathname.slice(BASE.length)).replace(/^(\.\.[/\\])+/, '')
  await serveFile(res, join(OUT, rel))
})

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is busy. Stop the other process or run: PORT=3001 npm run start`)
    process.exit(1)
  }
  throw err
})

server.listen(PORT, () => {
  console.log(`Preview (GitHub Pages style): http://localhost:${PORT}${BASE}/`)
})
