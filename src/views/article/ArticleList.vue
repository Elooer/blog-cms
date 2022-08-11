<template>
  <div class="container">
    <div class="title">文章列表</div>
    <el-table :data="articleList" border style="width: 100%">
      <el-table-column header-align="center" align="center" width="210" label="文章封面">
        <template v-slot:default="scope">
          <img style="width: 180px;height: 100px" :src="scope.row.img" alt="">
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" prop="title" label="文章标题" />
      <el-table-column header-align="center" align="center" width="100" label="标签">
        <template v-slot:default="scope">
          <el-tag size="large">{{ scope.row.tag }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" prop="describe" label="描述" />
      <el-table-column header-align="center" align="center" prop="count" width="80" label="浏览量" />
      <el-table-column header-align="center" align="center" label="发布时间">
        <template v-slot:default="scope">
          {{ userTimeFormat(scope.row.pubTime) }}
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" label="操作">
        <template v-slot:default="{ row }">
          <el-button type="primary" @click="editArticle(row._id)">编辑</el-button>
          <el-button type="danger" @click="deleteArticle(row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :current-page="page" @update:current-page="changePage"
      :page-size="6" :total="total" />
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref, toRefs } from 'vue'
import { getArticleList, getPageInfo } from '../../request/api'
import userTimeFormat from '../../hooks/useTimeFormat'
import { useRouter } from 'vue-router'

const state = reactive<{ articleList: ArticleListRes; page: number; total: number }>({
  articleList: [],
  page: 1,
  total: 0
})

let { page, articleList, total } = toRefs(state)
getPageInfo({ page: 1 }).then(res => {
  if (res.status === 200) {
    page.value = res.data?.current as number
    total.value = res.data?.total as number
  }
  getArticleList({ page: page.value }).then(res => {
    if (res.status !== 200) {
      return console.log('获取文章列表出错！');
    }
    res.data && (articleList.value = res.data)
  })
})

const changePage = (newPage: number) => {
  console.log(newPage)
  getPageInfo({ page: newPage }).then(res => {
    if (res.status === 200) {
      page.value = res.data?.current as number
      total.value = res.data?.total as number
    }
    getArticleList({ page: page.value }).then(res => {
      if (res.status !== 200) {
        return console.log('获取文章列表出错！');
      }
      res.data && (articleList.value = res.data)
    })
  })
}

const router = useRouter()
const editArticle = (_id: string) => {
  router.push(`/editArticle/?id=${_id}`)
}

const deleteArticle = (_id: string) => {

}

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

  .el-pagination {
    margin: 30px;
    margin-left: 50%;
    transform: translateX(-25%);
  }
}
</style>
