import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App, { ROUTES } from './App.jsx'

export { ROUTES }

/** Build-time render used by prerender.js to emit real HTML for each route. */
export const render = (url) => renderToString(
  <StrictMode><StaticRouter location={url}><App /></StaticRouter></StrictMode>,
)
