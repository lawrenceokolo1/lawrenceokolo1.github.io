// Post-build step: bake the rendered app into index.html so search engines and link previews see real content.
import { readFileSync, rmSync, writeFileSync } from 'node:fs'
import { render } from './dist-ssr/entry-server.js'

const file = new URL('./dist/index.html', import.meta.url)
const shell = readFileSync(file, 'utf8')
if (!shell.includes('<div id="root"></div>')) throw new Error('No empty #root in dist/index.html')
writeFileSync(file, shell.replace('<div id="root"></div>', `<div id="root">${render()}</div>`))
rmSync(new URL('./dist-ssr', import.meta.url), { recursive: true, force: true })
console.log('prerendered dist/index.html')
