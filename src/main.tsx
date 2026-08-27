import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './forms'; // registers every form with the engine — must run before any page reads the registry
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
