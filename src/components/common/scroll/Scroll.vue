<template>
  <div class="wrapper" ref="swiper">
    <!-- ref如果是绑定在组件中，那么通过this.$refs.refname 获取到的是组件对象 -->
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  data() {
    return {
      scroll: null,
    };
  },
  // 生命周期函数被挂载后
  mounted() {
    // let wrapper = document.getElementById("wrapper");
    // 通过该方法拿的元素不准确 用ref

    // let wrapper = document.querySelector(".wrapper");
    let wrapper =this.$refs.swiper;
    console.log(wrapper);
    this.scroll = new BScroll(wrapper, {
      movable: true,
      zoom: true,
      // 监听滚动的距离  0，1 不生效 2只监听手指按下和离开的距离  3会计算惯性的距离
      probeType: 2,
      // 上拉加载
      pullUpLoad: true,
    });
    this.scroll.on("scroll", (position) => {
      console.log(position);
    });
    // 上拉加载
    this.scroll.on("pullingUp", () => {
      console.log("上拉加载更多");
    });
  },
};
</script>

<style scoped>
</style>