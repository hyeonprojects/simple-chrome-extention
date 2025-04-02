import { defineConfig } from 'vite'
import { crx } from '@crxjs/vite-plugin'
import { resolve } from 'path'

// manifest.json 가져오기
import manifest from './manifest.json'

export default defineConfig({
  plugins: [
    crx({ manifest }),
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
        background: resolve(__dirname, 'src/background/background.js'), // HTML 대신 JS 파일로 수정일로 수정일로 수정
      },
    },
    outDir: 'dist',
    sourcemap: true, // sourcemap 옵션 추가
  },
})