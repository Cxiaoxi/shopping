<template>
  <div class="profile-money">
    <div class="profile-balance rigth-p">
      <div>
        <span class="title-color">{{ showBalance }}</span
        >元
      </div>
      <div>我的余额</div>
    </div>
    <div class="profile-discount rigth-p">
      <div>
        <span class="title-color">{{ discount }}</span
        >个
      </div>
      <div>我的优惠</div>
    </div>
    <div class="profilr-integral">
      <div>
        <span class="title-color">{{ integral }}</span
        >分
      </div>
      <div>我的积分</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileMoney",
  props: {
    balance: {
      type: Number,
      default: 0.1,
    },
    discount: {
      type: Number,
      default: 0,
    },
    integral: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    showBalance() {
      let oldnum=""+this.balance;
      // console.log(Math.floor(this.balance*100)/100);
      let reg=new RegExp(/\.(\d){1,2}/);
      let nubLength=oldnum.match(reg).length;
      // console.log(nubLength);
      // 保留两位小数
      if (nubLength==0) {
        return oldnum+'.00';
      }
      if(nubLength==2){
        return oldnum+'0'
      }
      return Math.floor(this.balance * 100) / 100;
    },
  },
};
</script>

<style scoped>
.profile-money {
  width: 100vw;
  height: 100px;
  display: flex;
  background-color: pink;
  /* justify-self: center; */
  align-items: center;
}
.profile-money div {
  text-align: center;
  flex-grow: 1;
}
.rigth-p{
  border-right: 1px solid rgb(155, 155, 155);
}
.title-color {
  color: var(--color-high-text);
  font-size: 24px;
}
</style>>
