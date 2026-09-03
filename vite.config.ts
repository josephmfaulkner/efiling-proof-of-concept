import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  // GitHub Pages serves this as a project site at /<repo>/, not the domain root — only
  // needed for the production build; local dev keeps serving from '/' so `npm run dev`
  // URLs don't change. See .github/workflows/deploy.yml for the deploy that relies on this.
  base: command === 'build' ? '/efiling-proof-of-concept/' : '/',
}))
