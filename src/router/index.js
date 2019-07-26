// 引入vue实例
import Vue from 'vue'
// 引入vue-router
import VueRouter from 'vue-router'
// 引入路由组件
import Login from '@/components/login.vue'
import Index from '@/components/index.vue'
import List from '@/components/views/list.vue'
import Welcome from '@/components/welcome.vue'
import RoleList from '@/components/views/roleList.vue'
import PowerList from '@/components/views/powerList.vue'
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
      path: '/',
      redirect: { name: 'welcome' }
    },
    {
      name: 'index',
      path: '/index',
      component: Index,
      redirect: { name: 'welcome' },
      children: [
        {
          name: 'users',
          path: 'users',
          component: List
        },
        {
          name: 'welcome',
          path: 'welcome',
          component: Welcome
        },
        {
          name: 'rights',
          path: 'rights',
          component: PowerList
        },
        {
          name: 'roles',
          path: 'roles',
          component: RoleList
        }
      ]
    }
  ]
})

export default router
