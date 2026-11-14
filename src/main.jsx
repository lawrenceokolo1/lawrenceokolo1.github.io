import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import '@fontsource-variable/instrument-sans'
import '@fontsource-variable/jetbrains-mono'
import './styles.css'
import App from './App.jsx'

const root = document.getElementById('root')
const app = <StrictMode><App /></StrictMode>

// The built page ships prerendered HTML (see prerender.js); hydrate it instead of re-rendering.
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
