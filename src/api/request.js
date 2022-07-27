import axios from "axios";

import nprogress from "nprogress";

//引入进度条样式
//@kofeine 2022/07/27 16:47
import "nprogress/nprogress.css";


//封装axios
//@kofeine 2022/07/27 14:31
const requests = axios.create({
    baseURL: '/api',
    timeout: 5000
})

requests.interceptors.request.use(config => {

    nprogress.start();
    return config;
})

requests.interceptors.response.use((res) => {
    nprogress.done();
    return res.data;
}, (error) => {
    console.log("响应失败", error);
    return Promise.reject(new Error('fail'));
})

export default requests;

