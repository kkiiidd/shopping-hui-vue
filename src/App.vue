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
import { reqCategoryList } from "@/api";
export default {
  components: {
    Header,
    Footer,
  },
  created() {
    reqCategoryList();
  },
};
</script>

<style></style>
