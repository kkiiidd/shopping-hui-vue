<template>
  <div class="app">
    <Header></Header>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "./components/Header/Header.vue";
import Footer from "./components/Footer/Footer.vue";
export default {
  components: {
    Header,
    Footer,
  },

  //派发一个action获取商品分类三级列表数据,优化 typeNav 请求次数
  //@kofeine 2022/07/29 12:41
  mounted() {
    this.$store.dispatch("home/getCategoryList");
  },
};
</script>

<style></style>
