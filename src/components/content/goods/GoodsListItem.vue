<template>
  <div class="goods-item">
    <img :src="goodsItem.show.img" alt="" @load="imageLoad"/>
    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    // 图片加载完后
    imageLoad(){
      // 监听总线
      this.$bus.$emit("itemImageLoad");
      // console.log("1");
    }
  }
};
</script>

<style scoped>
.goods-item {
  width: 48vw;
  /* padding-bottom: 40px; */
  /* height: 200px; */
}
.goods-item img {
  width: 100%;
  border-radius: 5px;
}
.goods-info{
  text-align: center;
}
.goods-info p{
  /* 文字多出省略号 */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}
.price{
  color: var(--color-high-text);
  margin-right: 18px;
}
.collect::before{
  content: '';
  position: relative;
  display: inline-block;
  /* left: -10px; */
  width: 14px;
  height: 14px;
  background: url('~@/assets/img/common/collect.svg') 0 0/14px 14px;
}
</style>