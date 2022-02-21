export default {
  // 这里面的操作可以跟踪
  addCounter(state,payload){
    payload.count++;
    // console.log(payload);
  },
  addToCart(state,payload){
    state.cartList.push(payload)
    // console.log(payload);
  }
}