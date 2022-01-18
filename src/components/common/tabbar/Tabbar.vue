<template>
  <div id="tab-bar">
      <slot></slot>
    <!-- <div class="tab-bar-item">
      <img src="../../assets/img/tabbar/shouye.png" alt="" />
      首页
    </div>
    <div class="tab-bar-item">
      <img src="../../assets/img/tabbar/fenlei.png" alt="" />
      分类
    </div>
    <div class="tab-bar-item">
      <img src="../../assets/img/tabbar/gouwuche.png" alt="" />
      注册
    </div>
    <div class="tab-bar-item">
      <img src="../../assets/img/tabbar/31wode.png" alt="" />
      我的
    </div> -->
  </div>
</template>

<script>
export default {
  name: "Tabbar",
};
</script>

<style>
#tab-bar {
  display: flex;
  background-color: #f6f6f6;
  position: fixed;
  left: 0px;
  right: 0px;
  bottom: 0px;
  box-shadow: 0px -1px 2px rgba(0, 0, 0, 0.15);
}
/* .tab-bar-item {
  元素内均等分
  flex: 1;
  text-align: center;
  height: 49px;
}
.tab-bar-item img{
  width: 24px;
  height: 24px;
} */
</style>