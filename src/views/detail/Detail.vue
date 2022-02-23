<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" ref="nav" @changeClick="changeClick">
    </detail-nav-bar>
    <scroll class="center" ref="scroll" @scroll="detailScroll" :probeType="3">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info
        :detailInfo="detailInfo"
        @imageLoad="imageLoad"
      ></detail-goods-info>
      <detail-param-info
        ref="params"
        :paramInfo="paramInfo"
      ></detail-param-info>
      <detail-comment-info
        ref="comment"
        :commentInfo="commentInfo"
      ></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends" />
    </scroll>
    <detail-bottom-bar @addToCart="addToCart" />
    <back-top @click.native="backclick" v-show="this.isShowBackTop"></back-top>
    <!-- 后面通过自定义$toast实现 -->
    <!-- <Toast :isShow="isShowToast" :message="message"></Toast> -->
  </div>
</template>

<script>
import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue";
import DetailBottomBar from "./childComps/DetailBottomBar.vue";

import GoodsList from "@/components/content/goods/GoodsList";
import BackTop from "@/components/content/backTop/BackTop";

import Scroll from "@/components/common/scroll/Scroll";

// import Toast from "@/components/common/toast/Toast.vue";

// import itemListenerMixin from "@/common/mixin"

import {
  getDetail,
  getRecommend,
  Goods,
  Shop,
  GoodsParam,
} from "@/network/detail";

import { debounce } from "@/common/untils";

import { mapActions } from "vuex";

export default {
  name: "Detail",
  components: {
    // Toast,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
    BackTop,
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      itemImgListener: null,
      // 需要回到位置时y值
      themeTopYs: [],
      // 赋距离的函数
      getThemeTopY: null,
      // 可以通过该方式获取到navbar中得currentIndex  this.$refs.nav.currentIndex
      // navBarIndex:0,
      currentIndex: 0,
      isShowBackTop: false,
      // // 显示toast
      // isShowToast: 0,
      // // toast的文本
      // message:'text'
    };
  },
  // 混入 , 将共同的代码混入进vue实例
  // mixins: [itemListenerMixin],
  // 组件创建后
  created() {
    this.iid = this.$route.params.iid;
    // 请求详细数据
    getDetail(this.iid).then((res) => {
      const data = res.result;

      //  获取商品轮播图
      this.topImages = data.itemInfo.topImages;
      // console.log(data);

      // 获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 创建店铺信息
      this.shop = new Shop(data.shopInfo);
      // console.log(this.shop);

      // 保存商品详细信息
      this.detailInfo = data.detailInfo;

      // 获取参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      // 取出评论信息 判断是否有
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
        // console.log(this.commentInfo);
      }

      // $el没有被渲染出来 所以错误
      // this.themeTopYs.push(0);
      // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);

      // console.log(this.themeTopYs);

      // this.$nextTick(() => {
      // 更具最新的数据,对应的dom时已经被加载出来的
      // 图片的高度还没被计算出来所有还是错误的
      // offsetTop值不对的时候基本都是图片的问题
      //   this.themeTopYs = [];

      //   this.themeTopYs.push(0);
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);

      //   console.log(this.themeTopYs);
      // });
    });

    // 请求推荐数据
    getRecommend().then((res) => {
      // console.log(res.data.list);
      this.recommends = res.data.list;
    });

    // 获取各组件的scrollY位置 给this.themeTopYs赋值进行防抖
    this.getThemeTopY = debounce(() => {
      // 赋距离的值
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      // Number.MAX_VALUE为最大值，给到数组里该值就是最大
      this.themeTopYs.push(Number.MAX_VALUE);

      // console.log(this.$refs.scroll);
    }, 100);
  },
  // destroyed () {
  //   console.log("111")
  // },
  mounted() {
    // 防抖处理
    let refresh = debounce(this.$refs.scroll.refresh, 100);

    this.itemImgListener = () => {
      refresh();
    };
    this.$bus.$on("itemImageLoad", this.itemImgListener);
  },
  updated() {},
  // 组件被销毁
  destroyed() {
    // 取消全局事件的监听，这里的第二个参数(on对应的第二个参数)必须要传，不然这个全局事件全部取消
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  },
  methods: {
    //引入vuex中的Actions的addCart函数
    ...mapActions(["addCart"]),
    // 图片加载完后刷新滚动条
    imageLoad() {
      this.$refs.scroll.refresh();

      // 赋距离的值
      this.getThemeTopY();
    },

    // 根据对应标题到达指定位置
    changeClick(index) {
      // console.log(index);
      // console.log(-this.themeTopYs[index]);
      this.navBarIndex = index;
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100);
    },
    // 根据滑动位置改变标题的class（计算得到哪个class）
    detailScroll(position) {
      // if(-position.y<this.themeTopYs[1]){
      //   this.$refs.nav.currentIndex=0;
      // }else if(-position.y<this.themeTopYs[2]){
      //   this.$refs.nav.currentIndex=1;
      // }else if(-position.y<this.themeTopYs[3]){
      //   this.$refs.nav.currentIndex=2;
      // }else{
      //   this.$refs.nav.currentIndex=3;
      // }
      // console.log(this.navBarIndex);
      // console.log(this.$refs.nav.currentIndex);
      let positionY = -position.y;
      // 因为加了一个最大值
      let length = this.themeTopYs.length;
      for (let i = 0; i < length; i++) {
        if (
          this.currentIndex !== i &&
          i < length - 1 &&
          positionY > this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = i;
          // console.log(this.$refs.nav.currentIndex);
        }
      }

      // 隐藏/显示backTop
      if (positionY > 2000) {
        this.isShowBackTop = true;
      } else {
        this.isShowBackTop = false;
      }
    },
    // 回到顶部
    backclick() {
      // console.log("11");
      this.$refs.scroll.scrollTo(0, 0, 100);
    },
    // 添加购物车
    addToCart() {
      // 获取需要的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.id = this.iid;
      // produck.arr=[1,2,3,4,5];
      // produck.count=0;
      // produck.co=this.iid;
      // console.log(produck);

      // 将信息添加到购物车里
      // this.$store.cartList.push(product)
      // 通过commit  提交  传入方法的名字  可带一个参数传入
      // this.$store.commit('increment')
      // this.$store.commit("addCart", produck);
      // console.log(this.$store.dispatch);
      // 对异步事件 在store action处理 分发dispatch

      // 因为引入了mapActions
      // this.$store.dispatch("addCart", product).then((res) => {
      //   console.log(res);
      // });
      this.addCart(product).then((res) => {
        console.log(res);

        // 加入购物车后显示提示 一秒后消失 改自定义插件Toast
        // this.isShowToast = 1;
        // setTimeout(() => {
        //   this.isShowToast = 0;
        // }, 1000);
        this.$toast.toastShowClick(res, 1000);
      });
    },

    // console.log(this.$store.state.cartList);
    // console.log(typeof(this.$store.state.cartList[0].count));
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.center {
  /* position: absolute;
  top: 44px;
  bottom: 0px;
  left: 0;
  right: 0; */
  overflow: hidden;
  height: calc(100% - 102px);
}
</style>