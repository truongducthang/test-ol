import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '*': '/src',
      'api': '/src/api',
      'assets': '/src/assets',
      'app': '/src/app',
      'components': '/src/components',
      'constants': '/src/constants',
      'features': '/src/features',
      'hooks': '/src/hooks',
      'model': '/src/model',
      'utils': '/src/utils',
    },
  },
})
