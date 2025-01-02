import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
  // 获取各个环境下对应的变量//
  let env = loadEnv(mode, process.cwd());
  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),  // 例如 '@' 指向 'src' 目录
      },
    },
    // 代理跨域//
    server: {
      proxy: {
        // 由于提供的商品相关的api服务器有问题所以特殊处理这类api//
        '/api/admin/product': {
          // 获取数据的服务器地址设置//
          target: env.VITE_SERVER_PRODUCT,
          // 是否需要代理//
          changeOrigin: true,
          // 路径重写//
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
        [env.VITE_APP_BASE_API]: {
          // 获取数据的服务器地址设置//
          target: env.VITE_SERVER,
          // 是否需要代理//
          changeOrigin: true,
          // 路径重写//
          rewrite: (path) => path.replace(/^\/api/, ''),
        }
      }
    }
  }
})
