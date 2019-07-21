import Vue from 'vue'
// 根组件为App.vue
import App from './App.vue'
import router from '@/router'
import elementUI from 'element-ui'
import '../node_modules/element-ui/lib/theme-chalk/index.css'
import '@/styles/index.less'
Vue.use(elementUI)
Vue.config.productionTip = false
// 设置状态保持与重定向
router.beforeEach((to, from, next) => {
  var token = localStorage.getItem('itcast_manger')
  console.log(to, from)
  console.log(token)
  // 判断是否登录过或者是否跳转到登录页面,否则跳转到登录页面
  if (token || to.path === '/login') {
    next()
  } else {
    next({ name: 'login' })
  }
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
