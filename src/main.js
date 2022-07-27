import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import TypeNav from "./pages/HomePage/TypeNav/TypeNav.vue"
Vue.config.productionTip = false;

//引入全局组件(组件名称，组件)
Vue.component(TypeNav.name, TypeNav)
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
