<template>
  <div class="profile-login">
    <div class="profile-img">
      <img :src="profileimg" alt="" />
    </div>
    <div class="profile-more">
      <div class="profile-title">
        <div class="p-login">登录/注册</div>
        <div class="p-phone">
          <img src="~@/assets/img/profile/phone.png" alt="" />暂无绑定手机号码
        </div>
      </div>
      <div class="profile-m">
        <img src="~@/assets/img/profile/arrow_right.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileLogin",
  props: {
    profileimg: {
      type: String,
      // 在vue的js引入图片，就需要使用require（“路径”）进来
      default: require("@/assets/img/profile/daxiong.jpg"),
    },
  },
};
</script>

<style scoped>
.profile-login {
  width: 100vw;
  height: 120px;
  background-color: var(--color-tint);
  display: flex;
}
.profile-img {
  width: 120px;
  height: 120px;
  /* background-color: pink; */
}
.profile-img img {
  padding: 20px;
  border-radius: 50%;
  height: 100%;
}
.profile-more {
  width: 100%;
  display: flex;
}
.profile-title {
  width: 100%;
  /* background-color: red; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 5px;

  color: #fff;
  font-size: 18px;
}
.p-phone{
  margin-top: 8px;
}
.p-phone img{
  position: relative;
  top:2px
}
.profile-m {
  width: 40px;
  height: 120px;
  margin-right: 10px;
}
.profile-m img {
  width: 20px;
  height: 20px;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>