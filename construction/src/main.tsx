import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

if (/iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) {
  document.documentElement.classList.add('ios-safari')
}

createRoot(document.getElementById("root")!).render(<App />);
