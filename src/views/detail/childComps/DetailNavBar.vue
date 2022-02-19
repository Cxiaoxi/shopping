<template>
  <div>
    <nav-bar>
      <div slot="left" @click="backClick">
        <img class="image" src="~@/assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div
          class="title-item"
          v-for="(item, index) in titles"
          :key="index"
          @click="changeColor(index)"
          :class="{ active: index === currentIndex }"
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
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  methods: {
    changeColor(index) {
      this.currentIndex=index;
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