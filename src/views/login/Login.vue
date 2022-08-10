<template>
  <div class="login_container">
    <div class="login_panel">
      <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" autocomplete="off" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 450px" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref, toRefs, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import { loginApi } from '../../request/api'

const state = reactive({
  ruleForm: {
    username: '',
    password: ''
  }
})


// 校验规则
const rules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, max: 8, message: '用户名长度必须在2-8个字符', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9]{6,12}$/, message: '密码由6-12位数字或字母组成', trigger: 'blur' },
  ],
})

const login = () => {
  ruleFormRef.value.validate().then(() => {
    loginApi({
      username: ruleForm.value.username,
      password: ruleForm.value.password
    }).then(res => {
      console.log(res)
      if (res.status === 200) {
        let token = res.data?.token
        localStorage.setItem('blog_token', token || '')
        ctx?.appContext.config.globalProperties.$message.success(res.message)
        setTimeout(() => {
          router.push('/index')
        }, 1000)
      }
    })
  }).catch((err: Error) => console.log('err' + err))
}

let { ruleForm } = toRefs(state)
const ruleFormRef = ref()
let router = useRouter()
const ctx = getCurrentInstance()
</script>
<style lang="less" scoped>
.login_container {
  position: relative;
  height: 100vh;
  background-color: #304156;

  .login_panel {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 450px;
    height: 250px;
    // background-color: #fff;
  }
}
</style>
