import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

if (/iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) {
  document.documentElement.classList.add('ios-safari')
}

/* Temporary: capture JS errors for iOS white-screen debugging (remove after fix) */
window.addEventListener('error', function (e) {
  const msg = `JS Error: ${e.message} at line ${e.lineno}`
  if (typeof alert !== 'undefined') alert(msg)
  console.error(msg, e)
})
window.onerror = function (msg, src, line, col, err) {
  const payload = { msg: String(msg), src: String(src || ''), line, col }
  try {
    fetch('/log-error', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }).catch(() => {})
  } catch (_) {}
  return false
}

createRoot(document.getElementById("root")!).render(<App />);
