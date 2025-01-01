// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'normalize.css'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { Provider } from 'react-redux'
import store from './store'
import zhCN from 'antd/locale/zh_CN';
import { ConfigProvider } from 'antd'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <ConfigProvider locale={zhCN}>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </ConfigProvider>
  // </StrictMode>,
)
