<template>
  <div class="container">
    <div class="title">用户列表</div>
    <el-table :data="userList" border style="width: 100%">
      <el-table-column header-align="center" align="center" prop="username" label="用户名" />
      <el-table-column header-align="center" align="center" label="用户角色">
        <template v-slot:default="scope">
          <el-tag size="large">{{ scope.row.role }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" label="创建时间">
        <template v-slot:default="scope">
          {{ userTimeFormat(scope.row.createdTime) }}
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" label="是否禁用">
        <template v-slot:default="scope">
          <el-tag size="large" type="danger" v-if="!scope.row.status">是</el-tag>
          <el-tag size="large" v-else>否</el-tag>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" label="操作">
        <template v-slot:default="scope">
          <el-popconfirm confirm-button-text="是" cancel-button-text="否" icon-color="#626AEF" title="确定禁用该用户吗?"
            @confirm="disabled">
            <template #reference>
              <el-button type="danger">禁用</el-button>
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
import { getCurrentInstance, reactive, ref, toRefs } from 'vue'
import { getUserList, getUserPageInfo } from '../../request/api'
import userTimeFormat from '../../hooks/useTimeFormat'

const state = reactive<{ userList: UserList; page: number; total: number }>({
  userList: [],
  page: 1,
  total: 0
})

let { userList, page, total } = toRefs(state)
const ctx = getCurrentInstance()

getUserPageInfo({ page: 1 }).then(res => {
  if (res.status === 200) {
    page.value = res.data?.current as number
    total.value = res.data?.total as number
  }
  getUserList({ page: page.value }).then(res => {
    if (res.status !== 200) {
      return ctx?.appContext.config.globalProperties.$message.error('获取文章列表出错！');
    }
    res.data && (userList.value = res.data)
  })
})

const changePage = (newPage: number) => {
  getUserPageInfo({ page: newPage }).then(res => {
    if (res.status === 200) {
      page.value = res.data?.current as number
      total.value = res.data?.total as number
    }
    getUserList({ page: page.value }).then(res => {
      if (res.status !== 200) {
        return ctx?.appContext.config.globalProperties.$message.error('获取文章列表出错！');
      }
      res.data && (userList.value = res.data)
    })
  })
}

const disabled = () => {

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
