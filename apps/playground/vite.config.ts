import { env } from 'node:process'
import tsconfigPaths from 'vite-tsconfig-paths'
import { readEnv } from '../../build/common'
import {
  defineConfig,
  react,
} from '../../build/vite'

delete env.CDN_URL
delete env.CDN_TYPE
delete env.UPLOAD_URL

readEnv()

const cdnUrl = env.CDN_URL || 'https://cdn.jsdelivr.net/npm'
const cdnType = env.CDN_TYPE || 'jsdelivr'
const uploadUrl = env.UPLOAD_URL || ''

export default defineConfig({
  plugins: [
    react(),
    // 产物测试注意注释掉此插件
    tsconfigPaths(),
  ],
  optimizeDeps: {
    exclude: [
      // @v-md/plugin-lang-sass 插件引入时，要解决 sass 的依赖产物问题
      'sass',
    ],
  },
  define: {
    CDN_URL: `${JSON.stringify(cdnUrl)}`,
    CDN_TYPE: `${JSON.stringify(cdnType)}`,
    UPLOAD_URL: `${JSON.stringify(uploadUrl)}`,
  },
  base: '/v-md/',
  build: {
    sourcemap: true,
  },
  server: {
    port: 5173,
    host: true,
    allowedHosts: true,
  },
  preview: {
    port: 5183,
    host: true,
  },
})
