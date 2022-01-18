import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import("@/views/home/Home")
const Cart = () => import("@/views/cart/Cart")
const Category = () => import("@/views/category/Category")
const Profile = () => import("@/views/profile/Profile")

Vue.use(VueRouter)

const routes = [
  // 设置默认路径
  {
    path: '/',
    // name: 'HelloWorld',
    // 重定向
    redirect: "/home"
    // component: HelloWorld
  },
  {
    path: "/home",
    component: Home
  },
  {
    path: "/cart",
    component: Cart
  },
  {
    path: "/category",
    component: Category
  },
  {
    path: "/profile",
    component: Profile
  }
]

const router = new VueRouter({
  routes,
  // 模式
  mode: "history"
})

export default router
