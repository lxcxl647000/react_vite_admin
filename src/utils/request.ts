import axios from "axios";
import { get_token } from "./token";

let request = axios.create({
    baseURL: import.meta.env.VITE_SERVER,
    timeout: 10000,
});

request.interceptors.request.use((config) => {
    // 在发送请求之前做些什么
    config.headers.token = get_token();
    return config;
});

request.interceptors.response.use((response) => {
    // 对响应数据做点什么
    return response.data;
}, (error) => {
    // 对响应错误做点什么
    return Promise.reject(error)
});

export default request;