// Post-build step: render every route to static HTML so search engines and link previews see real content.
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { render, ROUTES } from './dist-ssr/entry-server.js'

// The one place the site's public address lives. Change it here when moving to a custom domain (see docs/custom-domain.md).
const SITE = 'https://lawrenceokolo1.github.io'
const dist = (path) => new URL(`./dist${path}`, import.meta.url)

const shell = readFileSync(dist('/index.html'), 'utf8').replaceAll('__SITE__', SITE)
if (!shell.includes('<div id="root"></div>')) throw new Error('No empty #root in dist/index.html')

const withHead = (html, url, { title, description }) => html
  .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
  .replace(/(<meta name="description" content=")[^"]*/, `$1${description}`)
  .replace(/(<meta property="og:title" content=")[^"]*/, `$1${title}`)
  .replace(/(<meta property="og:description" content=")[^"]*/, `$1${description}`)
  .replace(/(<meta property="og:type" content=")[^"]*/, '$1article')
  .replace(/(<link rel="canonical" href=")[^"]*/, `$1${SITE}${url}`)
  .replace(/(<meta property="og:url" content=")[^"]*/, `$1${SITE}${url}`)

const prerender = ({ url, head }) => {
  const page = (head ? withHead(shell, url, head) : shell)
    .replace('<div id="root"></div>', `<div id="root">${render(url)}</div>`)
  mkdirSync(dist(url), { recursive: true })
  writeFileSync(dist(`${url}index.html`), page)
  console.log(`prerendered ${url}`)
}

ROUTES.forEach(prerender)

const urls = ROUTES.map(({ url }) => `  <url><loc>${SITE}${url}</loc></url>`).join('\n')
writeFileSync(dist('/sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`)
writeFileSync(dist('/robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`)
writeFileSync(dist('/404.html'), shell.replace('<div id="root"></div>', `<div id="root">${render('/404')}</div>`))
rmSync(new URL('./dist-ssr', import.meta.url), { recursive: true, force: true })
