import axios from 'axios'
import { ElMessage } from 'element-plus'

const instance = axios.create({
  baseURL: 'http://127.0.0.1:3006',
  timeout: 15000,
})

// 请求拦截器
instance.interceptors.request.use(
  config => {
    let token = localStorage.getItem('blog_token')
    if (token && token !== '') {
      // 因为config.headers是可选属性,可能为undefined
      config.headers = config.headers || {}
      config.headers.Authorization = token
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  result => {
    return result.data
  },
  err => {
    if (err.response.status == 401) {
      localStorage.removeItem('blog_token')
      ElMessage({ message: '登录过期，请重新登录！', type: 'error' })
      location.reload()
    }
    return Promise.reject(err)
  }
)

export default instance
