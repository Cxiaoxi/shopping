<template>
  <div id="detail">
    <detail-nav-bar> </detail-nav-bar>
    <scroll class="center" ref="scroll">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :paramInfo="paramInfo"></detail-param-info>
      <detail-comment-info :commentInfo="commentInfo"></detail-comment-info>
      <goods-list :goods="recommends"></goods-list>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from './childComps/DetailParamInfo';
import DetailCommentInfo from './childComps/DetailCommentInfo.vue';

import GoodsList from '@/components/content/goods/GoodsList';

import Scroll from "@/components/common/scroll/Scroll";

// import itemListenerMixin from "@/common/mixin"

import { getDetail,getRecommend, Goods, Shop ,GoodsParam} from "@/network/detail";

import {debounce} from "@/common/untils"

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    Scroll,
    GoodsList,
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommends:[],
      itemImgListener:null,
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
      this.detailInfo=data.detailInfo;

      // 获取参数信息
      this.paramInfo=new GoodsParam(data.itemParams.info,data.itemParams.rule)

      // 取出评论信息 判断是否有
      if(data.rate.cRate !== 0){
        this.commentInfo =data.rate.list[0];
        console.log(this.commentInfo);
      }
    });

    // 请求推荐数据
    getRecommend().then((res)=>{
      console.log(res.data.list);
      this.recommends=res.data.list;
    })
  },
  // destroyed () {
  //   console.log("111")
  // },
  mounted () {
    // 防抖处理
    let refresh = debounce(this.$refs.scroll.refresh,100);
    
    this.itemImgListener = ()=>{
      refresh();
    }
    this.$bus.$on("itemImageLoad", this.itemImgListener);
  },
  // 组件被销毁
  destroyed () {
    // 取消全局事件的监听，这里的第二个参数(on对应的第二个参数)必须要传，不然这个全局事件全部取消
    this.$bus.$off('itemImageLoad',this.itemImgListener)
  },
  methods: {
    // 图片加载完后刷新滚动条
    imageLoad(){
      this.$refs.scroll.refresh();
    }
  }
};
</script>

<style scoped>
.detail{
  height: 100vh;
}
.center {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
}
</style>