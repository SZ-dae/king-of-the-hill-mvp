import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // 'ethers5'를 찾으면 실제 'ethers' 패키지를 사용하도록 별명을 설정합니다.
      ethers5: 'ethers'
    }
  }
})
