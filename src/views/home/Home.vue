<template>
  <div id="home">
    <nav-bar class="home-nav-bar">
      <div slot="center">购物</div>
    </nav-bar>
    <scroll
      class="centent"
      ref="scroll"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control
        class=""
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
      ></tab-control>
      <goods-list :goods="showGoods"></goods-list>
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

import{debounce} from "@/common/untils";

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
    const refresh =debounce(this.$refs.scroll.refresh);
    this.$bus.$on("itemImageLoad", () => {
      refresh();
      // console.log("2");
    });
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
      // console.log(index);
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
    },
    backclick() {
      // 拿到子组件的scroll
      
      // 回到顶部
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    // 显示回到顶部
    contentScroll(position) {
      if (position.y <= -1000) {
        this.isShowBackTop = true;
      } else {
        this.isShowBackTop = false;
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

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
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