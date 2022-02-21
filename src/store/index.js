import Vue from "vue"
import Vuex from "vuex"

// 安装插件
Vue.use(Vuex)

import mutations from './mutations'
import actions from "./actions"

// 创建store对象
const store=new Vuex.Store({ 
  // 保存信息
  state:{
    // 添加购物车信息
    cartList:[]
  },
  // mutations 唯一的目的地就是修改state的状态 每个方法完成的事尽可能单一
  mutations,
  // mutations:{
    // // 这里面的操作可以跟踪
    // addCounter(state,payload){
    //   payload.count++;
    //   // console.log(payload);
    // },
    // addToCart(state,payload){
    //   state.cartList.push(payload)
    //   // console.log(payload);
    // }
  // },
  // 处理一些异步操作 不是改变状态，而是提交突变。
  // 默认参数context(可以理解为store)   上下文
  actions,
  // actions:{
  //   // 添加购物车信息
  //   addCart(context,payload){
  //     let oldProduct=null;
  //     for (const item of context.state.cartList) {
  //       if(item.id===payload.id){
  //         // 浅拷贝 会顺带赋值地址 改变赋值后的对象属性会影响原对象 改变非对象属性不会改
  //         oldProduct=item;
  //       }
  //     }
  //     // 判断oldProduct
  //     if(oldProduct){
  //       // oldProduct.count+=1;
  //       // oldProduct.arr.push(6);
  //       context.commit('addCounter',oldProduct);
  //     }else{
  //       payload.count=1;
  //       // context.state.cartList.push(payload)
  //       context.commit('addToCart',payload);
  //     }
  //   }
  // }
})

export default store