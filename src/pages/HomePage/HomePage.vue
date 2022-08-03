<template>
  <div class="home-page">
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Like></Like>
    <Recommend></Recommend>
    <Rank></Rank>
    <Brand></Brand>
    <Floor v-for="(fl, index) in floorList" :key="fl.id" :list="fl"></Floor>
  </div>
</template>

<script>
import Brand from "@/pages/HomePage/Brand";
import Floor from "@/pages/HomePage/Floor";
import Like from "@/pages/HomePage/Like";
import Rank from "@/pages/HomePage/Rank";
import ListContainer from "@/pages/HomePage/ListContainer";
import Recommend from "@/pages/HomePage/Recommend";
import { mapState } from "vuex";
export default {
  components: {
    Brand,
    Floor,
    Like,
    Rank,
    ListContainer,
    Recommend,
  },
  computed: {
    ...mapState("home/", { floorList: "floorList" }),
  },
  mounted() {
    this.$store.dispatch("home/getFloorList");
  },
};
</script>

<style></style>
