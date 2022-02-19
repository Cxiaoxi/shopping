<template>
  <div id="home">
    <nav-bar class="home-nav-bar">
      <div slot="center">购物</div>
    </nav-bar>
    <!-- 固定的导航选项 显示与隐藏 -->
    <tab-control
      class="tab-control"
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl2"
      v-show="isTabFixed"
    ></tab-control>
    <scroll
      class="centent"
      ref="scroll"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper
        :banners="banners"
        @swiperImageLoad="swiperImageLoad"
      ></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control
        class=""
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl"
      ></tab-control>
      <goods-list :goods="showGoods" ref="goodsList"></goods-list>
      <h2>首页</h2>
    </scroll>
    <!-- 加native可以监听组件的点击事件 -->
    <back-top @click.native="backclick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import TabControl from "@/components/content/tabControl/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";
import Scroll from "@/components/common/scroll/Scroll";
import BackTop from "@/components/content/backTop/BackTop";

import HomeSwiper from "@/views/home/childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView.vue";
import FeatureView from "./childComps/FeatureView.vue";

import { getHomeMultidata, getHomeGoods } from "@/network/home";

import { debounce } from "@/common/untils";

export default {
  name: "Home",
  components: {
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
    HomeSwiper,
    RecommendView,
    FeatureView,
  },
  data() {
    return {
      result: null,
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop: false,
      scrollTop:0,
      tabOffsetTop: 0,
      isTabFixed: false,
      goodsOffsetTop:0,
      itemImgListener:null,
    };
  },
  // 计算属性
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  // 生命周期函数，组件创建完成后
  created() {
    // 1.请求多个数据
    this.getHomeMultidata();
    // 请求多个商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    // 监听item图片加载后的事件
    // this.$bus.$on("itemImageLoad", () => {
    //   this.$refs.scroll && this.$refs.scroll.refresh();
    //   // console.log("2");
    // });

    // 防抖处理
    let refresh = debounce(this.$refs.scroll.refresh,100);
    
    this.itemImgListener = ()=>{
      refresh();
    }
    this.$bus.$on("itemImageLoad", this.itemImgListener);

    // 赋值  获取tabControl离上面的距离
    // 获取该组件的元素
    // this.tabOffsetTop=this.$refs.tabControl.$el
    // console.log(this.tabOffsetTop.offsetTop);
    // 获取tab-control距离上面的高度 同上
    this.swiperImageLoad();
  },
  // 组件处于不活跃状态时触发
  deactivated () {
    console.log("不活跃");
    // 取消全局事件的监听，这里的第二个参数(on对应的第二个参数)必须要传，不然这个全局事件全部取消
    this.$bus.$off('itemImageLoad',this.itemImgListener)
  },
  methods: {
    // 防抖函数 封装到untils里
    //   网络请求
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // console.log(res);
        this.result = res;
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // console.log(res);
        // 因为不能覆盖掉第二页数据所以不能直接赋值，要用push
        // this.goods[type].list=res.data.list;
        this.goods[type].list.push(...res.data.list);
        // console.log(this.goods[type].list);
        // 页码加1
        this.goods[type].page += 1;
      });
    },
    // 监听事件
    //  获取
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
        default:
          break;
      }
      // 将状态分享给隐藏的tabControl 互相分享
      this.$refs.tabControl2.currentIndex = index;
      this.$refs.tabControl.currentIndex = index;
      // console.log("222");
      this.changeGoodsScroll();
    },
    backclick() {
      // 拿到子组件的scroll

      // 回到顶部
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    // 显示回到顶部 接收的滚动事件
    contentScroll(position) {
      // if (position.y <= -1000) {
      //   this.isShowBackTop = true;
      // } else {
      //   this.isShowBackTop = false;
      // }
      this.scrollTop = -position.y;
      this.isShowBackTop = -position.y >= 1000;

      // 显示或隐藏tab-control
      this.isTabFixed = -position.y >= this.tabOffsetTop;
    },
    // 让tab-control在滑到固定位置时固定
    swiperImageLoad() {
      // 获取tab-control距离上面的高度
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
    },
    // 切换goodsList后回到上面
    changeGoodsScroll(){
      this.goodsOffsetTop = this.$refs.goodsList.$el.offsetTop-44;
      // console.log(this.goodsOffsetTop);
      // 回到第一行数据
      if(this.scrollTop>this.goodsOffsetTop){
        this.$refs.scroll.scrollTo(0, -this.goodsOffsetTop,0)
      }
      
    },
    // 加载更多
    loadMore() {
      this.getHomeGoods(this.currentType);
      // 重新计算高度
      // this.$refs.scroll.scroll.refresh();
      // 默认只刷新一次 必须使用该方法才能进行下一步刷新
      this.$refs.scroll.finishPullUp();
    },
  },
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.home-nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  /* 在浏览器使用原生滚动的时候才需要用 */
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 99; */
}
.tab-control {
  position: relative;
  /* top: -1px; */
  z-index: 99;
}
.centent {
  /* height: calc(100% - 93px);
  margin-top: 44px; */
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>