<template>
  <div>
    <nav-bar>
      <div slot="left" @click="backClick">
        <img class="image" src="~@/assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <!-- :class="{ active: navBarIndex>-1 ? navBarIndex === index :  index === currentIndex }" -->
        <div
          class="title-item"
          v-for="(item, index) in titles"
          :key="index"
          @click="changeClick(index)"
          :class="{ active:index === currentIndex }"
        >
          {{ item }}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";

export default {
  name: "DetailNavBar",
  components: {
    NavBar,
  },
  // props: {
  //   navBarIndex:{
  //     type:Number,
  //     default(){
  //       // 为-1就不需要scroll联动标题
  //       return -1;
  //     }
  //   }
  // },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  methods: {
    changeClick(index) {
      this.currentIndex=index;
      this.$emit("changeClick",index);
    },
    // 返回 
    backClick(){
      this.$router.back()
    }
  },
};
</script>

<style scoped>
.title {
  display: flex;
}
.title-item {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}
.image{
  vertical-align:middle;
}
</style>