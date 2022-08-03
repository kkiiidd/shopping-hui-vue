import Vue from "vue";
import VueRouter from "vue-router";
import SearchPage from "@/pages/SearchPage/SearchPage.vue"
import HomePage from "@/pages/HomePage/HomePage.vue"

Vue.use(VueRouter);

const originPush = VueRouter.prototype.push;
const originReplace = VueRouter.prototype.replace;

/**
 * 重写push和replace方法，解决重复点击报错的问题
 * 
 */

//重写push方法
VueRouter.prototype.push = function (target, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, target, resolve, reject);
  }
  else {
    originPush.call(this, target, () => { }, () => { });
  }
}
//重写 replace方法
VueRouter.prototype.replace = function (target, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, target, resolve, reject);
  }
  else {
    originReplace.call(this, target, () => { }, () => { });
  }
}
const routes = [
  //重定向到首页
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/search/:searchContent?',//当 params 可有可无时，一定要加一个问号，否则出错 @kofeine 2022/08/03 14:55
    name: 'search',
    component: SearchPage
  },
  {
    path: '/home',
    component: HomePage
  }
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
