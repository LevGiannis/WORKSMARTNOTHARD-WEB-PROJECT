import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { registerNotifications } from './utils/notifications'

// Initialize theme from localStorage or system preference before render
try{
  const saved = localStorage.getItem('theme')
  if(saved === 'dark') document.documentElement.classList.add('dark')
  else if(saved === 'light') document.documentElement.classList.remove('dark')
  else if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) document.documentElement.classList.add('dark')
}catch(e){}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {(() => {
      const isElectron = typeof window !== 'undefined' && !!window.wsDeviceStorage
      const isFile = typeof window !== 'undefined' && window.location?.protocol === 'file:'
      if (isElectron || isFile) {
        return (
          <HashRouter>
            <App />
          </HashRouter>
        )
      }

      const baseUrl = import.meta.env.BASE_URL
      const basename = baseUrl && baseUrl.startsWith('.') ? '/' : baseUrl
      return (
        <BrowserRouter basename={basename}>
          <App />
        </BrowserRouter>
      )
    })()}
  </React.StrictMode>
)

// Try to register a service worker / notifications helper (best-effort)
registerNotifications().catch(()=>{
  // ignore registration errors in prototype
})
