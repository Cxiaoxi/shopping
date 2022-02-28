<template>
  <div class="profile">
    <NavBar class="home-nav-bar">
      <div slot="center">我的档案</div>
    </NavBar>
    <ProfileLogin></ProfileLogin>
    <ProfileMoney></ProfileMoney>
    <ProfileList />
  </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar.vue";
import ProfileLogin from "./childComps/ProfileLogin.vue";
import ProfileMoney from './childComps/ProfileMoney.vue'
import ProfileList from './childComps/ProfileList.vue'

export default {
  name: "Profile",
  components: {
    NavBar,
    ProfileLogin,
    ProfileMoney,
    ProfileList
  },
};
</script>

<style scoped>
.home-nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  font-size: 20px;
}
</style>