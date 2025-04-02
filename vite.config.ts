import { defineConfig } from 'vite'
import { crx } from '@crxjs/vite-plugin'
import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { copyFileSync } from 'fs'

// __dirname 대체하기 (ES 모듈 환경)
const __dirname = fileURLToPath(new URL('.', import.meta.url))

// manifest.json 가져오기
import manifest from './manifest.json'

export default defineConfig({
  plugins: [
    crx({ manifest }),
    {
      name: 'copy-manifest',
      closeBundle() {
        try {
          copyFileSync(
            resolve(__dirname, 'manifest.json'),
            resolve(__dirname, 'dist/manifest.json')
          );
        } catch (error) {
          console.error('Error copying manifest.json:', error);
        }
      }
    }
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'src/popup/popup.html'),
        options: resolve(__dirname, 'src/options/options.html'),
        background: resolve(__dirname, 'src/background/background.js'),
      },
    },
    outDir: 'dist',
    sourcemap: true,
  },
})
