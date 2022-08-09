import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/global.less'
import 'element-plus/theme-chalk/display.css'
import 'element-plus/es/components/message/style/css'
import { ElMessage } from 'element-plus'

class Message {
  readonly duration = 1000

  success = (message: string, duration = this.duration) => {
    ElMessage({
      message,
      type: 'success',
      duration,
    })
  }

  error = (message: string, duration = this.duration) => {
    ElMessage({
      message,
      type: 'error',
      duration,
    })
  }
}

const app = createApp(App)
app.config.globalProperties.$message = new Message()
app.use(router).mount('#app')
