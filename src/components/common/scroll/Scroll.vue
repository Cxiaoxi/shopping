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
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
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
    let wrapper = this.$refs.swiper;
    // console.log(wrapper);
    this.scroll = new BScroll(wrapper, {
      movable: true,
      zoom: true,
      // 监听滚动的距离  0，1 不生效 2只监听手指按下和离开的距离  3会计算惯性的距离
      probeType: this.probeType,
      // 允许点击
      click: true,
      // 上拉加载
      pullUpLoad: this.pullUpLoad,
    });
    // 监听滚动的位置
    this.scroll.on("scroll", (position) => {
      // console.log(this.probeType);
      // console.log(position);
      // 发出事件
      this.$emit("scroll", position);
    });
    // 回到顶部
    // this.scroll.scrollTo(0,0);

    // 上拉加载
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        this.$emit("pullingUp");
        // console.log("上拉加载更多");
      });
    }
  },
  methods: {
    // 回到某个位置
    scrollTo(s, y, time=300) {
      // 判断scroll是否有值 再被创建后才能运行
      this.scroll && this.scroll.scrollTo(s, y, time);
    },
    // 可再次刷新
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    // 重新算滚动高度
    refresh() {
      // console.log("111");
      this.scroll && this.scroll.refresh();
    },
  },
};
</script>

<style scoped>
</style>