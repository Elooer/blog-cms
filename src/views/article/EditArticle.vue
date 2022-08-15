<template>
  <div class="container">
    <div class="title">发布文章</div>
    <el-form label-width="100px" :model="article" style="max-width: 460px">
      <el-form-item label="标题">
        <el-input v-model="article.title" />
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="article.describe" />
      </el-form-item>
      <el-form-item label="标签">
        <el-input v-model="article.tag" />
      </el-form-item>
      <el-form-item label="封面">
        <el-input v-model="article.img" />
      </el-form-item>
    </el-form>
    <el-button type="primary" style="float: right" @click="pubArticle">发布文章</el-button>
    <md-editor v-model="article.content" class="editor" />
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref, onMounted, toRefs, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import { getArticleById, addArticle, updateArticle } from '../../request/api'
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'

const state = reactive<{ id: string; article: ArticleItf }>({
  id: '',
  article: {
    _id: '',
    title: '',
    describe: '',
    content: '',
    pubTime: '',
    tag: '',
    count: 0,
    img: '',
    state: true
  }
})

let { id, article } = toRefs(state)

const router = useRouter()
if (router.currentRoute.value.query.id) {
  id.value = router.currentRoute.value.query.id as string
  getArticleById({ _id: id.value }).then(res => {
    if (res.status === 200) {
      article.value = res.data as ArticleItf
    }
  })
}

const pubArticle = () => {
  if (id.value !== '') {
    updateArticle({
      _id: id.value,
      title: article.value.title,
      tag: article.value.tag,
      describe: article.value.describe,
      content: article.value.content,
      img: article.value.img
    }).then(res => {
      if (res.status === 200) {
        ctx?.appContext.config.globalProperties.$message.success(res.message)
      } else {
        ctx?.appContext.config.globalProperties.$message.error('更新文章失败！')
      }
    })
  } else {
    addArticle({
      title: article.value.title,
      tag: article.value.tag,
      describe: article.value.describe,
      content: article.value.content,
      img: article.value.img
    }).then(res => {
      if (res.status === 200) {
        ctx?.appContext.config.globalProperties.$message.success(res.message)
      } else {
        ctx?.appContext.config.globalProperties.$message.error('发布文章失败！')
      }
    })
  }
}

const ctx = getCurrentInstance()
</script>
<style lang="less" scoped>
.container {
  background-color: #fff;
  padding: 15px;

  .title {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 20px;
  }

  .el-button {
    width: 100px;
    height: 40px;
    margin-bottom: 15px;
  }

  .editor {
    margin-bottom: 30px;
  }
}
</style>
