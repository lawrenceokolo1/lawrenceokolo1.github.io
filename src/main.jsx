import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import '@fontsource-variable/bricolage-grotesque'
import '@fontsource-variable/instrument-sans'
import '@fontsource-variable/jetbrains-mono'
import '@fontsource-variable/mona-sans/wdth.css'
import './styles.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'

const root = document.getElementById('root')
const app = <StrictMode><BrowserRouter><App /></BrowserRouter></StrictMode>

// The built page ships prerendered HTML (see prerender.js); hydrate it instead of re-rendering.
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
