import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import TypeNav from "./pages/HomePage/TypeNav/TypeNav.vue";
import Carousel from "./components/Carousel";
//引入mockServe.js文件，执行一遍
import "@/mock/mockServe";
//引入swiper样式
import "swiper/css/swiper.css"
Vue.config.productionTip = false;


//引入全局组件(组件名称，组件)
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name, Carousel);
new Vue({
  router,
  store,


  render: (h) => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
}).$mount("#app");
