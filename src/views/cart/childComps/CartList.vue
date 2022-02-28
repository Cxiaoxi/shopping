<template>
  <div class="cart-list">
    <Scroll :observeImage="true" class="cart-content" ref="scroll">
      <CartListItem v-for="(item,index ) in cartList" :key="index" :itemInfo="item">
      </CartListItem>
    </Scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";

import CartListItem from "./CartListItem.vue";
import { mapGetters } from "vuex";
export default {
  name: "CartList",
  components: {
    Scroll,
    CartListItem,
  },
  computed: {
    ...mapGetters(["cartList"]),
  },
  activated() {
    // 调用刷新scroll的center高度
    // console.log("111");
    this.$refs.scroll.refresh();
  },
  methods: {
    
  }
};
</script>

<style scoped>
.cart-list{
  /* height: calc(100% - 132px);
  overflow: hidden; */
  height: calc(100% - 44px - 49px - 40px);
}
.cart-content{
  height: 100%;
  overflow: hidden;
}
</style>