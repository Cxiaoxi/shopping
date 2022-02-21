export default{
    // 添加购物车信息
    addCart(context,payload){
      let oldProduct=null;
      for (const item of context.state.cartList) {
        if(item.id===payload.id){
          // 浅拷贝 会顺带赋值地址 改变赋值后的对象属性会影响原对象 改变非对象属性不会改
          oldProduct=item;
        }
      }
      // 判断oldProduct
      if(oldProduct){
        // oldProduct.count+=1;
        // oldProduct.arr.push(6);
        context.commit('addCounter',oldProduct);
      }else{
        payload.count=1;
        // context.state.cartList.push(payload)
        context.commit('addToCart',payload);
      }
    }
}