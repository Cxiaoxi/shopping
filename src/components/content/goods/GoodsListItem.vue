<template>
  <div class="goods-item" @click="itemClick">
      <img :src="showImage" alt="" @load="imageLoad" />
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
  computed: {
    // 展示图片
    showImage() {
      return (
        this.goodsItem.img || this.goodsItem.image || this.goodsItem.show.img
      );
    },
  },
  methods: {
    // 图片加载完后
    imageLoad() {
      // 监听总线  会通知给home
      this.$bus.$emit("itemImageLoad");
      // console.log("1");
    },
    itemClick() {
      // 使用push好返回
      if(this.goodsItem.iid){
        this.$router.push("/detail/" + this.goodsItem.iid);
      } 
      // console.log("跳转到详情页");
    },
  },
};
</script>

<style scoped>
.goods-item {
  width: 48vw;
  display: flex;
  flex-direction:column;
  justify-content: space-between;
  /* padding-bottom: 40px; */
}
.goods-item img {
  width: 100%;
  border-radius: 5px;
}
.goods-info {
  text-align: center;
}
.goods-info p {
  /* 文字多出省略号 */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
  margin-top: 3px;
}
.price {
  color: var(--color-high-text);
  margin-right: 18px;
}
.collect::before {
  content: "";
  position: relative;
  display: inline-block;
  /* left: -10px; */
  width: 14px;
  height: 14px;
  background: url("~@/assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>