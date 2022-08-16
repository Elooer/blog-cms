<template>
  <div class="container">
    <div class="title">留言列表</div>
    <el-table :data="commentList" border style="width: 100%">
      <el-table-column header-align="center" align="center" prop="username" label="留言人" />
      <el-table-column header-align="center" align="center" label="留言时间">
        <template v-slot:default="scope">
          {{ useTimeFormat(scope.row.pubTime) }}
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" prop="comments" label="留言内容" show-overflow-tooltip />
      <el-table-column header-align="center" align="center" prop="ip" label="ip地址" />
      <el-table-column header-align="center" align="center" prop="location" label="ip来源" />
      <el-table-column header-align="center" align="center" label="操作">
        <template v-slot:default="scope">
          <el-popconfirm confirm-button-text="是" cancel-button-text="否" icon-color="#626AEF" title="确定删除该留言吗?"
            @confirm="deleteComment(scope.row._id)">
            <template #reference>
              <el-button type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :current-page="page" @update:current-page="changePage"
      :page-size="10" :total="total" />
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref, toRefs, getCurrentInstance } from 'vue'
import { getCommentList, getMessagePageInfo, deleteMessage } from '../../request/api'
import useTimeFormat from '../../hooks/useTimeFormat'

const state = reactive<{ commentList: CommentsRes[]; page: number; total: number }>({
  commentList: [],
  page: 1,
  total: 0
})

let { commentList, page, total } = toRefs(state)

// 获取所有评论
const getCommentAll = () => {
  getMessagePageInfo({ page: 1 }).then(res => {
    if (res.status === 200) {
      page.value = res.data?.current as number
      total.value = res.data?.total as number
    } else {
      ctx?.appContext.config.globalProperties.$message.error('获取分页信息出错！')
    }
    getCommentList({ count: page.value, flag: true }).then(res => {
      if (res.status === 200) {
        commentList.value = res.data?.list as CommentsRes[]
        total.value = res.data?.total as number
      } else {
        ctx?.appContext.config.globalProperties.$message.error('获取留言列表出错！')
      }
    })
  })
}

getCommentAll()

const changePage = (newPage: number) => {
  getMessagePageInfo({ page: newPage }).then(res => {
    if (res.status === 200) {
      page.value = res.data?.current as number
      total.value = res.data?.total as number
    } else {
      ctx?.appContext.config.globalProperties.$message.error('获取分页信息出错！')
    }
    getCommentList({ count: page.value, flag: true }).then(res => {
      if (res.status === 200) {
        commentList.value = res.data?.list as CommentsRes[]
        total.value = res.data?.total as number
      } else {
        ctx?.appContext.config.globalProperties.$message.error('获取留言列表出错！')
      }
    })
  })
}

const deleteComment = (_id: string) => {
  deleteMessage({ _id }).then(res => {
    if (res.status === 200) {
      ctx?.appContext.config.globalProperties.$message.success(res.message)
      getCommentAll()
    } else {
      ctx?.appContext.config.globalProperties.$message.error('删除留言失败！')
    }
  })
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

  .el-pagination {
    margin: 30px;
    margin-left: 50%;
    transform: translateX(-25%);
  }
}
</style>
