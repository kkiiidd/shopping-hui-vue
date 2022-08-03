<template>
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="carousel in list" :key="carousel.id">
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  // 封装轮播图全局组件
  //@kofeine 2022/08/02 16:19
  name: "Carousel",
  props: ["list"],

  watch: {
    list: {
      immediate: true, //一上来就监听一次，因为数据是父亲给的，从来没有发生过变化
      handler(newValue, oldValue) {
        this.$nextTick(() => {
          var mySwiper = new Swiper(this.$refs.cur, {
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },
            loop: true,
          });
        });
      },
    },
  },
};
</script>

<style></style>
