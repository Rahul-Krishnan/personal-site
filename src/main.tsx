import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ThemeProvider } from './theme/ThemeProvider';

// Order matters: base.css owns layout/structure (shared by both themes),
// then each theme layer restyles the same DOM via [data-theme="..."].
import './styles/base.css';
import './styles/retro.css';
import './styles/modern.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
);
