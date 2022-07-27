<template>
  <div class="home-page">
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Like></Like>
    <Recommend></Recommend>
    <Rank></Rank>
    <Brand></Brand>
    <Floor></Floor>
  </div>
</template>

<script>
import Brand from "@/pages/HomePage/Brand";
import Floor from "@/pages/HomePage/Floor";
import Like from "@/pages/HomePage/Like";
import Rank from "@/pages/HomePage/Rank";
import ListContainer from "@/pages/HomePage/ListContainer";
import Recommend from "@/pages/HomePage/Recommend";
import { reqCategoryList } from "@/api/index";
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
};
</script>

<style></style>
