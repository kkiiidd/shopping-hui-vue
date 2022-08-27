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
//引入API
import * as api from "@/api/index"
//引入elementui信息提示框
import { MessageBox } from 'element-ui';
//引入懒加载插件
import VueLazyload from 'vue-lazyload'
// Vue.component(Button.name, Button);
// const loading = require("./soogif.gif");
import loading from './loading.gif'
Vue.config.productionTip = false;


//引入全局组件(组件名称，组件)
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name, Carousel);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
// Vue.use(MessageBox);  
// console.log(api);

Vue.use(VueLazyload, {
  preLoad: 1.3,
  // error: errorimage,
  loading: loading,
  attempt: 1
})
new Vue({
  router,
  store,
  render: (h) => h(App),
  beforeCreate() {
    // 将包含了所有请求方法的api对象放入Vue的原型中
    Vue.prototype.$API = api;
    Vue.prototype.$bus = this;
  },
}).$mount("#app");
