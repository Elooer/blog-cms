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
      <el-table-column header-align="center" align="center" prop="comments" label="留言内容" />
      <el-table-column header-align="center" align="center" prop="ip" label="ip地址" />
      <el-table-column header-align="center" align="center" prop="location" label="ip来源" />
      <el-table-column header-align="center" align="center" label="操作">
        <template v-slot:default="scope">
          <el-popconfirm confirm-button-text="是" cancel-button-text="否" icon-color="#626AEF" title="确定删除该留言吗?"
            @confirm="deleteMessage">
            <template #reference>
              <el-button type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref, toRefs } from 'vue'
import { getCommentList } from '../../request/api'
import useTimeFormat from '../../hooks/useTimeFormat'

const state = reactive<{ commentList: CommentsRes[]; count: number; total: number }>({
  commentList: [],
  count: 1,
  total: 0
})

let { commentList, count, total } = toRefs(state)

// 获取所有评论
const getCommentAll = (more?: boolean) => {
  if (more) count.value++
  getCommentList({ count: count.value }).then(res => {
    if (res.status === 200) {
      commentList.value = res.data?.list as CommentsRes[]
      total.value = res.data?.total as number
    }
  })
}
getCommentAll()

const deleteMessage = () => {

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
}
</style>
