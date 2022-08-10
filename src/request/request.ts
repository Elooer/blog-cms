import axios from 'axios'

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
    return Promise.reject(err)
  }
)

export default instance
