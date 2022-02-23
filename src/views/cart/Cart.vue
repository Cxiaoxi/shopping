<template>
  <!-- <div>购物车</div> -->
  <div class="cart">
    <NavBar class="cart-nav-bar">
      <div slot="center">购物车({{ cartLength }})</div>
    </NavBar>
    <CartList></CartList>
    <CartBottomBar></CartBottomBar>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import CartBottomBar from './childComps/CartBottomBar.vue';

import CartList from "./childComps/CartList";

// 可以直接用vuex中的计算属性
import { mapGetters } from "vuex";

export default {
  name: "Cart",
  components: {
    NavBar,
    CartBottomBar,
    CartList,
  },
  // 计算属性
  computed: {
    // 显示商品条数
    // 在vuex的getters中定义了 cartLength(state){ return state.cartList.length};
    // cartLength(){
    //   return this.$store.state.cartList.length
    // },
    ...mapGetters(["cartLength", "cartList"]),
  },
};
</script>

<style scoped>
.cart{
  height: 100vh;
}
.cart-nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
</style>