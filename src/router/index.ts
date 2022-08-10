import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/Login.vue'),
  },
  {
    path: '/index',
    name: 'Index',
    component: () => import('../views/index/Index.vue'),
    children: [
      {
        path: '/articleList',
        name: 'ArticleList',
        component: () => import('../views/article/ArticleList.vue'),
      },
      {
        path: '/editArticle',
        name: 'EditArticle',
        component: () => import('../views/article/EditArticle.vue'),
      },
      {
        path: '/tags',
        name: 'Tags',
        component: () => import('../views/article/Tags.vue'),
      },
      {
        path: '/message',
        name: 'Message',
        component: () => import('../views/message/Message.vue'),
      },
      {
        path: '/user',
        name: 'User',
        component: () => import('../views/user/User.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes, // 路由配置
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.localStorage.getItem('blog_token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
