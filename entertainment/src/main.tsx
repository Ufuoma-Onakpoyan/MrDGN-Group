import { createRoot } from 'react-dom/client';
import './index.css';

const REBRAND_MODE = import.meta.env.VITE_REBRAND_MODE === 'true';

function removeStaticOverlay() {
  document.getElementById('rebrand-overlay')?.remove();
}

async function bootstrap() {
  const rootEl = document.getElementById('root')!;
  removeStaticOverlay();

  if (REBRAND_MODE) {
    const { default: RebrandScreen } = await import('./RebrandScreen.tsx');
    createRoot(rootEl).render(<RebrandScreen />);
  } else {
    const { default: App } = await import('./App.tsx');
    createRoot(rootEl).render(<App />);
  }
}

bootstrap();
