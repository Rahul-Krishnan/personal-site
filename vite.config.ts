/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    // Pure-logic tests run in node. Component/DOM tests opt into jsdom per-file
    // with a `// @vitest-environment jsdom` comment at the top of the file.
    environment: 'node',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
  },
})
