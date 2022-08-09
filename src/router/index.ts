import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/index',
  },
  {
    path: '/index',
    name: 'Index',
    component: () => import('../views/index/Index.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes, // 路由配置
})

export default router
