import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    dts({
      tsconfigPath: 'src/lib/components/chart/client/tsconfig.json',
    })
  ],
  build: {
    rollupOptions: {
      input: '/src/lib/components/chart/client/index.ts',
      output: {
        format: 'iife',
        dir: 'static/chart',
        entryFileNames: 'index.js'
      }
    }
  }
});