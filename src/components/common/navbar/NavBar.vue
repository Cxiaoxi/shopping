<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
};
</script>

<style scoped>
/* 在vue组件中，在style标签上添加scoped属性，
以表示它的样式作用于当下的模块，很好的实现了样式私有化的目的，这是一个非常好的机制。
但是为什么要慎用呢？在实际业务中我们往往会对公共组件样式做细微的调整，
如果添加了scoped属性，那么样式将会变得不易修改。 */
.nav-bar {
  display: flex;
  height: 44px;
  line-height: 44px;
  text-align: center;
  box-shadow: 0px 1px 1px rgba(0,0,0,0.1);
}
.left,
.right{
  width: 60px;
}
.center{
  flex: 1;
}
</style>