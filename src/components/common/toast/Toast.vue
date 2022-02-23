<template>
  <div class="toast" :style="{ 'opacity': isShow?1:0 }" :class="{'toast-active':!isShow}">
    <div>{{ message }}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  // props: {
  //   message: {
  //     type: String,
  //     default: "",
  //   },
  //   // isShow:{
  //   //   type:Boolean,
  //   //   default:false
  //   // }
  //   isShow: {
  //     type: Number,
  //     default: 0,
  //   },
  // },
  data () {
    return {
      message:'',
      isShow:false
    }
  },
  methods: {
    toastShowClick(message='提示',duration=1000){
      this.isShow = true;
      this.message = message
      setTimeout(() => {
        this.isShow = false;
      }, duration);
    }
  }
};
</script>

<style scoped>
.toast {
  background-color: rgba(121, 121, 121, 0.8);
  color: #fff;
  /* width: 100px;
  height: 60px; */
  padding: 8px 12px;
  position: fixed;
  left: 50%;
  top: 50%;
  border-radius: 5px;
  /* transform: translateX(-50%) translateY(-50%); */
  transform: translate(-50%, -50%);
  /* 不可选中 无法触发任何事件 */
  pointer-events: none;

  z-index: 99;

  /* opacity: 0; */
}
.toast-active {
  transition: all 1s linear;
}
</style>