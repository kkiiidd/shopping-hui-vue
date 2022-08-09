import Vue from "vue";
import VueRouter from "vue-router";

import routes from '@/router/route.js';
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


const router = new VueRouter({
  mode: "history",
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { y: 0 };
  }
});

export default router;
