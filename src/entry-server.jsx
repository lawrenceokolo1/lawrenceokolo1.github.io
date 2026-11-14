import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.jsx'

/** Build-time render used by prerender.js. */
export const render = () => renderToString(<StrictMode><App /></StrictMode>)
