import Vue from "vue";
import VueRouter from "vue-router";

import routes from '@/router/route.js';
import store from '@/store';
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

//设置导航守卫，对登录页和购物车页的跳转进行判断
//@kofeine 2022/08/14 14:28
router.beforeEach(async (to, from, next) => {
  //获取仓库中的token与用户名
  const token = store.state.user.token;
  const userName = store.state.user.userName;
  // console.log(to);
  let toPath = to.path;
  if (to.path == '/login') {
    if (token) {
      //已登录，不跳转到登录页
      next('/home');
    } else {
      //未登录，放行
      next();
    }
  } else {
    //非login页
    if (token) {
      //已登录，放行，但要先看看仓库中有没有用户名，没有的话派发请求获取用户名，存入仓库
      if (userName) {
        console.log('有用户名');
        next();
      } else {
        console.log('没有用户名');
        try {
          await store.dispatch('user/getUserInfo');
          next();
        } catch (error) {
          //出现异常，获取不到用户信息，重新登录
          //先下线
          await store.dispatch('user/logout');
          alert('登录失败，请重新登录')
          next('/login');
        }
      }
    } else {
      //未登录
      //（全局守卫）受限制路由，跳转至登录页面，带上redirect参数
      //@kofeine 2022/08/26 18:00
      // console.log(toPath);
      if (toPath.indexOf('/shopcart') != -1 ||
        toPath.indexOf('/addcartsuccess') != -1 ||
        toPath.indexOf('/trade') != -1 ||
        toPath.indexOf('/paySuccess') != -1 ||
        toPath.indexOf('/center') != -1 ||
        toPath.indexOf('/pay') != -1) {
        console.log(toPath);
        next('/login?redirect=' + toPath);
      }
      else {
        console.log(toPath);
        next();

      }
    }

  }
})
export default router;
