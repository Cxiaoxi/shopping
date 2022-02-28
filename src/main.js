import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import FastClick from 'fastclick'
//  图片懒加载
import VueLazyLoad from 'vue-lazyload'

// 自定义toast插件
import toast from './components/common/toast'
// 安装toast插件 Vue.use()  会执行 里面导出的对象的install函数 // 会把vue当场参数传递
Vue.use(toast)

// fastclick  解决移动端300ms移动延迟问题
FastClick.attach(document.body)

// 图片懒加载  图片要用的时候才开始加载 用的时候将 <img :src="img">  改为<img v-lazy="img">
Vue.use(VueLazyLoad,{
  // 默认的占位图， 图片还没加载出来的时候用这个替代
  loading: require('@/assets/img/common/placeholder.png')
})

Vue.config.productionTip = false

// 用vue实例做事件总线
Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
