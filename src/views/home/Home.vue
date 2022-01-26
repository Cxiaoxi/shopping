<template>
  <div id="home">
    <nav-bar class="home-nav-bar">
      <div slot="center">购物</div>
    </nav-bar>
		<home-swiper :banners="banners"></home-swiper>
		<recommend-view :recommends="recommends"></recommend-view>
    <feature-view></feature-view>
    <tab-control class="" :titles="['流行','新款','精选']"></tab-control>
    <h2>首页</h2>
    <ul>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
    </ul>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import TabControl from '@/components/content/tabControl/TabControl'

import HomeSwiper from '@/views/home/childComps/HomeSwiper';
import RecommendView from './childComps/RecommendView.vue';
import FeatureView from './childComps/FeatureView.vue'

import { getHomeMultidata } from "@/network/home";

export default {
  name: "Home",
  components: {
    NavBar,
    TabControl,
    HomeSwiper,
    RecommendView,
    FeatureView,
    
  },
	data () {
		return {
			result:null,
			banners:[],
			recommends:[]
		}
	},
  // 生命周期函数，组件创建完成后
  created() {
    // 1.请求多个数据
    getHomeMultidata().then((res) => {
      // console.log(res);
			this.result=res;
			this.banners=res.data.banner.list;
			this.recommends=res.data.recommend.list;
    });
  },
};
</script>

<style>
#home{
  padding-top: 44px;
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
</style>