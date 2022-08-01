import axios from "axios";
import nprogress from "nprogress";


const mockRequest = axios.create({
    baseURL: '/mock',
    timeout: 5000
})

axios.interceptors.request.use(config => {
    nprogress.start();
    return config;
})

axios.interceptors.response.use(res => {
    nprogress.done();
    return res.data;
}, err => {
    alert('服务器响应失败');
    return Promise.reject(new Error('fail'));
})

export default mockRequest;