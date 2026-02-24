import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { initMouseSpotlight } from './utils/mouseSpotlight'

// Initialize mouse spotlight effect
initMouseSpotlight();

createRoot(document.getElementById("root")!).render(<App />);
