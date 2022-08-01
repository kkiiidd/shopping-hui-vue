//引入axios，封装axios
import axios from "axios";

import nprogress from "nprogress";

//引入进度条样式
//@kofeine 2022/07/27 16:47
import "nprogress/nprogress.css";


//封装axios
/*
    1.创建实例
    2.修改实例的拦截器 request 和 response
    3.暴露实例
*/
//@kofeine 2022/07/27 14:31
const request = axios.create({
    baseURL: '/api',
    timeout: 5000
})

request.interceptors.request.use(config => {

    nprogress.start();
    return config;
})

request.interceptors.response.use((res) => {
    nprogress.done();
    return res.data;
}, (error) => {
    console.log("响应失败", error);
    return Promise.reject(new Error('fail'));
})

export default request;

