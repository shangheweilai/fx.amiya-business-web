import axios from "axios";
import { baseUrl } from "../http/baseUrl";
import context from "../main";
import router from "../router/index.js";
import * as user from "../api/user";
// 创建一个axios实例
const instance = axios.create({
    baseURL: baseUrl,
});

// 给实例添加一个setToken方法，用于登录后将最新token动态添加到header，同时将token保存在sessionStorage中
instance.setToken = (token, refreshToken) => {
    instance.defaults.headers["Authorization"] = token;
    window.sessionStorage.setItem("token", token);
    window.sessionStorage.setItem("refreshToken", refreshToken);
};


// 重置登录信息
function resetLogin() {
    router.push("/")
    sessionStorage.clear();
}
// 添加请求拦截器
instance.interceptors.request.use((config) => {
    let token = sessionStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = token
    }
    // if (config.method === 'get') {
    //     // 如果是get请求，且params是数组类型如arr=[1,2]，则转换成arr=1&arr=2
    //     config.paramsSerializer = function(params) {
    //         return qs.stringify(params, { arrayFormat: 'repeat' })
    //     }
    // }
    return config;
}, (error) => {
    // ViewUI.LoadingBar.finish();
    return Promise.reject(error);
});

// 是否正在刷新的标记
let isRefreshing = false;
// 重试队列，每一项将是一个待执行的函数形式
let requests = [];

// 添加响应拦截器
instance.interceptors.response.use((response) => {
    const { code } = response.data;
    if (code == -1) {
        // context.$toast.info({
        //     content: response.data.msg,
        //     duration: 5,
        // });
    }
    if (code === 401) {
        resetLogin();
    }
    return response.data;
}, (error) => {
    if (error.response) {
        const { status } = error.response;
        if (status === 401) {
            const config = error.config;
            if (!isRefreshing) {
                isRefreshing = true;
                // const superAdmin = sessionStorage.getItem("token");
                // const superAdmin = sessionStorage.getItem("superAdmin");
                const refreshToken = sessionStorage.getItem("refreshToken");
                return user.amiyaRefreshToken(refreshToken).then((res) => {
                    if (res.code === 0) {
                        const { token, refreshToken } = res.data.account;
                        instance.setToken(token, refreshToken);
                        config.headers["Authorization"] = token;
                        // 已经刷新了token，将所有队列中的请求进行重试
                        requests.forEach((cb) => cb(token));
                        requests = [];
                        return instance(config);
                    }
                }).catch((err) => {
                    resetLogin();
                }).finally(() => {
                    isRefreshing = false;
                });
            } else {
                // 正在刷新token，将返回一个未执行resolve的promise
                return new Promise((resolve) => {
                    // 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
                    requests.push((token) => {
                        config.headers["Authorization"] = token;
                        resolve(instance(config));
                    });
                });
            }
        }
    }
    // ViewUI.LoadingBar.finish();
    return Promise.reject(error);
});
export default instance;