export default {
  // 这里面的操作可以跟踪
  addCounter(state,payload){
    payload.count++;
    // console.log(payload);
  },
  // 添加商品
  addToCart(state,payload){
    payload.checked=true;
    state.cartList.push(payload);
    // console.log(payload);
  }
}