// import SearchPage from "@/pages/SearchPage/SearchPage.vue";
// import HomePage from "@/pages/HomePage/HomePage.vue";
// import Detail from '@/pages/Detail';
// import AddCartSuccess from "@/pages/AddCartSuccess";
// import ShopCart from "@/pages/ShopCart";
// import Login from "@/pages/Login";
// import Register from "@/pages/Register";
// import Trade from "@/pages/Trade";
// import Pay from "@/pages/Pay";
// import PaySuccess from "@/pages/PaySuccess";
// import Center from "@/pages/Center";
// import MyOrder from "@/pages/Center/MyOrder";
// import GroupOrder from "@/pages/Center/GroupOrder";

import store from "@/store";
import router from './index';
export default [
    //重定向到首页
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/pages/Login'),

    },
    {
        path: '/register',
        name: 'register',
        component: () => import('@/pages/Register'),
        beforeEnter: function (to, from, next) {
            //已有登录信息
            if (store.state.user.token) {
                console.log('是否退出当前登录');
                router.app.$alert("检测到您已登录，是否退出当前登录，并跳转至注册页面", "提示", {
                    showConfirmButton: true,
                    showCancelButton: true,
                    callback: async function (type, instance) {
                        if (type === 'cancel') next(from);
                        else {
                            //清除已有登录信息
                            try {
                                await store.dispatch("user/logout");
                                localStorage.removeItem("TOKEN");
                                next()

                            } catch (error) {
                                alert('退出登录失败，请稍后重试');
                            }
                        };
                    }
                })
            } else next();
        }
    },
    {
        path: '/shopcart',
        name: 'shopcart',
        component: () => import('@/pages/ShopCart')
    },
    {
        path: '/detail/:skuid?',
        name: 'detail',
        component: () => import('@/pages/Detail'),
        beforeEnter: (to, from, next) => {
            // console.log(from);
            if (from.path.indexOf('/search') != -1) {
                console.log('next');
                next();
            }
            else {
                console.log('next false');
                next(from.path);
                //next(false)
            }
        }
    },
    {
        path: '/addcartsuccess',
        name: 'addcartsuccess',
        component: () => import('@/pages/AddCartSuccess'),
        beforeEnter: (to, from, next) => {
            // console.log(from);
            if (from.path.indexOf('/detail') != -1) {
                console.log('next');
                next();
            }
            else {
                console.log('next false');
                next(from.path);
                //next(false)
            }
        }
    },
    {
        path: '/trade',
        name: 'trade',
        component: () => import('@/pages/Trade'),
        beforeEnter: (to, from, next) => {
            // console.log(from);
            if (from.path.indexOf('/shopcart') != -1) {
                console.log('next');
                next();
            }
            else {
                console.log('next false');
                next(from.path);
                //next(false)
            }
        }
    },
    {
        path: '/pay',
        name: 'pay',
        component: () => import('@/pages/Pay'),
        beforeEnter: (to, from, next) => {
            // console.log(from);
            if (from.path.indexOf('/trade') != -1) {
                console.log('next');
                next();
            }
            else {
                console.log('next false');
                next(from.path);
                //next(false)
            }
        }
    },
    {
        path: '/paySuccess',
        name: 'paySuccess',
        component: () => import('@/pages/PaySuccess'),
        //有bug
        beforeEnter: (to, from, next) => {
            // console.log(from);
            if (from.path.indexOf('/pay') != -1) {
                console.log('next');
                next();
            }
            else {
                console.log('next false');
                next(from.path);
                //next(false)
            }
        }
    },
    {
        path: '/center',
        name: 'center',
        component: () => import('@/pages/Center'),
        children: [
            {
                path: '',
                redirect: 'myOrder',
            },
            {
                path: 'myOrder',
                component: () => import('@/pages/Center/MyOrder'),
                name: 'myOrder'
            },
            {
                path: 'groupOrder',
                component: () => import('@/pages/Center/GroupOrder'),
                name: 'groupOrder'
            }
        ],


    },
    {
        path: '/search/:keyword?',//当 params 可有可无时，一定要加一个问号，否则出错 @kofeine 2022/08/03 14:55
        name: 'search',
        component: () => import('@/pages/SearchPage/SearchPage.vue')
    },
    {
        path: '/home',
        component: () => import('@/pages/HomePage/HomePage.vue')
    }
];