export default {
  // 添加购物车信息
  addCart(context, payload) {
    return new Promise((reslove, reject) => {
      let oldProduct = null;
      // for (const item of context.state.cartList) {
      //   if (item.id === payload.id) {
      //     // 浅拷贝 会顺带赋值地址 改变赋值后的对象属性会影响原对象 改变非对象属性不会改
      //     oldProduct = item;
      //   }
      // }
      oldProduct=context.state.cartList.find(item=>item.id===payload.id)
      // 判断oldProduct
      if (oldProduct) {
        // oldProduct.count+=1;
        // oldProduct.arr.push(6);
        // 商品数量+1
        context.commit('addCounter', oldProduct);
        reslove('已+1')
      } else {
        payload.count = 1;
        // context.state.cartList.push(payload)
        context.commit('addToCart', payload);
        reslove('已添加')
      }
    })
  }

  // 使用promise

  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     context.commit('updateInfo'),
  //       console.log(payload),
  //       // payload.success()
  //       resolve("111")

  //     // 在app.vue  的该按钮方法中写then
  //   }, 2000)
  // })
}
