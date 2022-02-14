<template>
  <div class="back-top" @click="backclick">
    <img src="~@/assets/img/common/top.png" alt="">
  </div>
</template>

<script>
export default {
  name:"BackTop",
  methods: {
    backclick(){
      console.log("top");
    }
  }
}
</script>

<style scoped>
  .back-top{
    position: fixed;
    right: 10px;
    bottom: 60px;
  }
  .back-top img{
    width: 43px;
    height: 43px;
  }
</style>