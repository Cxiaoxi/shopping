<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="itme-icon"></slot></div>
    <div v-else><slot name="itme-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="itme-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: "TabbarItem",
  props: {
    path: String,
    activeColor: {
      type: String,
      // 默认值
      default: "red",
    },
  },
  data() {
    return {
      // isActive:false
    };
  },
  // 计算属性
  computed: {
    // 动态颜色控制，点到哪个控制哪个
    isActive() {
      //   /home -> item1(home) =true
      // indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。
      // 如果要检索的字符串值没有出现，则该方法返回 -1。
      return this.$route.path.indexOf(this.path) !== -1;
    },
    // 封装控制颜色的方法
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {};
    },
  },
  methods: {
    // 动态获取path
    itemClick() {
      this.$router.replace(this.path).catch((err) => err);
      // console.log("aaa");
    },
  },
};
</script>

<style>
.tab-bar-item {
  /* 元素内均等分 */
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
  /* line-height: 49px; */
}
.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  /* 除去图片底部小空隙 */
  vertical-align: middle;
}
/* .active{
	color: red;
} */
</style>