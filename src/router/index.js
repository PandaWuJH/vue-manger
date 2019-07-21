// 引入vue实例
import Vue from 'vue'
// 引入vue-router
import VueRouter from 'vue-router'
// 引入路由组件
import Login from '@/components/login.vue'
import Index from '@/components/index.vue'
// 让App使用路由
Vue.use(VueRouter)
// 创建路由对象
const router = new VueRouter({
  // 用routes进行路由配置
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'default',
      path: '/'
      // redirect: { name: 'login' }
    },
    {
      name: 'index',
      path: '/index',
      component: Index
    }
  ]
})

export default router
