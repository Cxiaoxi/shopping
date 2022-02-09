<template>
  <div id="app">
    <keep-alive exclude="Profile">
      <!-- 将展示的内容放在这 -->
      <router-view></router-view>
    </keep-alive>
    <!-- <router-view></router-view> -->
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from '@/components/content/mainTabbar/MainTabBar'

export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>

<style>
/* css的引入要加@ */
  @import "assets/css/base.css";
</style>
