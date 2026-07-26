import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'
import App from './App'
import './index.css'

// Service Worker registrieren (autoUpdate) und aktiv auf Updates prüfen,
// damit neue Versionen zuverlässig ankommen – auch bei installierter PWA.
const updateSW = registerSW({
  immediate: true,
  onRegisteredSW(_swUrl, registration) {
    if (!registration) return
    const check = () => {
      void registration.update()
    }
    // regelmäßig prüfen …
    setInterval(check, 30 * 60 * 1000)
    // … und immer, wenn die App wieder in den Vordergrund kommt.
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') check()
    })
    window.addEventListener('focus', check)
  },
})
void updateSW

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
