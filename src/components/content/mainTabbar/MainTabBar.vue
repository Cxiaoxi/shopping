<template>
  <tabbar>
    <tabbar-item path="/home" activeColor="blue">
      <img slot="itme-icon" src="@/assets/img/tabbar/shouye.png" alt="" />
      <img
        slot="itme-icon-active"
        src="@/assets/img/tabbar/shouye_active.png"
        alt=""
      />
      <div slot="itme-text">首页</div>
    </tabbar-item>
    <tabbar-item path="/category" activeColor="yellow">
      <img slot="itme-icon" src="@/assets/img/tabbar/fenlei.png" alt="" />
      <img
        slot="itme-icon-active"
        src="@/assets/img/tabbar/fenlei_active.png"
        alt=""
      />
      <div slot="itme-text">分类</div>
    </tabbar-item>
    <tabbar-item path="/cart" activeColor="pink">
      <img slot="itme-icon" src="@/assets/img/tabbar/gouwuche.png" alt="" />
      <img
        slot="itme-icon-active"
        src="@/assets/img/tabbar/gouwuche_active.png"
        alt=""
      />
      <div slot="itme-text">购物车</div>
    </tabbar-item>
    <tabbar-item path="/profile">
      <img slot="itme-icon" src="@/assets/img/tabbar/31wode.png" alt="" />
      <img
        slot="itme-icon-active"
        src="@/assets/img/tabbar/31wode_active.png"
        alt=""
      />
      <div slot="itme-text">我的</div>
    </tabbar-item>
  </tabbar>
</template>

<script>
import Tabbar from "@/components/common/tabbar/Tabbar";
import TabbarItem from "@/components/common/tabbar/TabbarItem";

export default {
  name: "MainTabBar",
  components: {
    Tabbar,
    TabbarItem,
  },
};
</script>

<style>
</style>