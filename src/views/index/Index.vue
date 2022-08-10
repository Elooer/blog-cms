<template>
  <div class="index_container">
    <div class="left">
      <div class="logo">Blog Admin</div>
      <div class="menu">
        <el-menu active-text-color="#ffd04b" class="el-menu-vertical-demo" background-color="#304156" text-color="#fff"
          default-active="2" unique-opened router>
          <el-sub-menu index="1">
            <template #title>
              <el-icon>
                <Document />
              </el-icon>
              <span>文章管理</span>
            </template>
            <el-menu-item index="/articleList">文章列表</el-menu-item>
            <el-menu-item index="/editArticle">发布文章</el-menu-item>
            <el-menu-item index="/tags">标签管理</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <el-icon>
                <User />
              </el-icon>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/user">用户列表</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <el-icon>
                <ChatLineSquare />
              </el-icon>
              <span>消息管理</span>
            </template>
            <el-menu-item index="/message">留言列表</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </div>
    </div>
    <div class="right">
      <div class="header">
        <div class="avatar">
          <img src="https://avatars.githubusercontent.com/u/75289160?v=4" alt="">
        </div>
      </div>
      <div class="content_box">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { Document, ChatLineSquare, User } from '@element-plus/icons-vue'

const a = ref()
</script>
<style lang="less" scoped>
.index_container {
  position: relative;

  .left {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    background-color: #304156;

    .logo {
      height: 70px;
      width: 250px;
      line-height: 70px;
      font-size: 30px;
      color: #5fc5ed;
      text-align: center;
    }

    .menu {
      width: 250px;
    }
  }

  .right {
    position: absolute;
    left: 250px;
    right: 0;
    top: 0;
    bottom: 0;

    .header {
      height: 70px;
      background-color: #fff;
      box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.3);
      border: 1px solid #eee;

      .avatar {
        height: 45px;
        width: 45px;
        float: right;
        margin-top: 12px;
        margin-right: 50px;

        img {
          width: 100%;
          border-radius: 50%;
        }
      }
    }

    .content_box {
      background-color: #f7f9fb;
      padding: 20px;
    }

  }
}
</style>
