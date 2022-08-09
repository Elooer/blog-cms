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
                <location />
              </el-icon>
              <span>Navigator One</span>
            </template>
            <el-menu-item>
              第一个
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </div>
    </div>
    <div class="right">
      <div class="header"></div>
      <div class="content">哈哈</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { Location } from '@element-plus/icons-vue'

const a = ref()
</script>
<style lang="less" scoped>
.index_container {
  display: flex;
  position: relative;

  .left {
    // height: 100vh;
    background-color: #304156;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;

    .logo {
      height: 50px;
      width: 250px;
      line-height: 50px;
      font-size: 30px;
      color: #5fc5ed;
      text-align: center;
    }

    .menu {
      width: 250px;
    }
  }

  .right {
    flex: 1;
    background-color: #f7f9fb;

    .header {
      height: 70px;
      background-color: #fff;
      box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.3);
    }

    .content {
      margin: 20px;
      height: 1000px;
      background-color: #fff;
    }
  }
}
</style>
