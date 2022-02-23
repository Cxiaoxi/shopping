import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 自定义toast插件
import toast from './components/common/toast'
// 安装toast插件 Vue.use()  会执行 里面导出的对象的install函数 // 会把vue当场参数传递
Vue.use(toast)

Vue.config.productionTip = false

// 用vue实例做事件总线
Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
