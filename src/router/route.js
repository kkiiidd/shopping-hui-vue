import SearchPage from "@/pages/SearchPage/SearchPage.vue";
import HomePage from "@/pages/HomePage/HomePage.vue";
import Detail from '@/pages/Detail';
import AddCartSuccess from "@/pages/AddCartSuccess";
import ShopCart from "@/pages/ShopCart"
export default [
    //重定向到首页
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/shopcart',
        name: 'shopcart',
        component: ShopCart
    },
    {
        path: '/detail/:skuid',
        name: 'detail',
        component: Detail
    },
    {
        path: '/addcartsuccess',
        name: 'addcartsuccess',
        component: AddCartSuccess
    },
    {
        path: '/search/:keyword?',//当 params 可有可无时，一定要加一个问号，否则出错 @kofeine 2022/08/03 14:55
        name: 'search',
        component: SearchPage
    },
    {
        path: '/home',
        component: HomePage
    }
];