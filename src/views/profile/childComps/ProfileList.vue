<template>
  <div class="profilelist">
    <div class="profilelist-item">
      <div class="profilelist-icon"></div>
      <div class="profilelist-text">我的消息</div>
    </div>
    <div class="profilelist-item">
      <div class="profilelist-icon"></div>
      <div class="profilelist-text">我的消息</div>
    </div>
    <div class="profilelist-item">
      <div class="profilelist-icon"></div>
      <div class="profilelist-text">我的消息</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileList",
};
</script>

<style scoped>
.profilelist {
  height: 22px;
  width: 100vw;
  border-top: 16px solid rgba(134, 134, 134, 0.2);
}
.profilelist-item {
  display: flex;
  align-items: center;
  font-size: 18px;
}
.profilelist-icon {
  display: block;
  width: 22px;
  height: 22px;
  margin: 10px 13px;
  background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
}
.profilelist-text {
  width: 100%;
  padding: 10px 0px 9px 0px;
  border-bottom: 1px solid rgba(134, 134, 134, 0.2);
}
</style>>
