import http from "../utils/requestIntercept"
//刷新啊美雅登录账号token
export const amiyaRefreshToken = (params) => {
    return http({
        url: "/Auth/amiyaRefreshToken",
        method: "get",
        params
    });
};
// 啊美雅账号登录【使用场景：code检索返回无啊美雅员工数据时使用】
export const amiyaLogin = (params) => {
    return http({
        url: "/Auth/amiyaLogin",
        method: "get",
        params
    });
};
// 企业微信登录【使用场景：code检索返回有啊美雅员工数据时使用】
export const qwAmiyaLoginByUserIdAndCode = (params) => {
    return http({
        url: "/Auth/amiyaLoginByUserIdAndCode",
        method: "get",
        params
    });
};