import http from "../utils/requestIntercept"
//刷新啊美雅登录账号token
export const amiyaRefreshToken = (params) => {
    return http({
        url: "/businessWechat/Auth/amiyaRefreshToken",
        method: "get",
        params
    });
};
// 啊美雅账号登录【使用场景：code检索返回无啊美雅员工数据时使用】
export const amiyaLogin = (params) => {
    return http({
        url: "/businessWechat/Auth/amiyaLogin",
        method: "get",
        params
    });
};
// 企业微信登录【使用场景：code检索返回有啊美雅员工数据时使用】
export const qwAmiyaLoginByUserIdAndCode = (params) => {
    return http({
        url: "/businessWechat/Auth/amiyaLoginByUserIdAndCode",
        method: "get",
        params
    });
};

// 检查密码是否合法
export const checkPassword = (password) => {
    return http({
        url: `/businessWechat/AmiyaEmployee/checkPassword/${password}`,
        method: "get",
    });
};

// 修改密码
export const updatePassword = (data) => {
    return http({
        url: "/businessWechat/AmiyaEmployee/updatePassword",
        method: "put",
        data
    });
};
// 解密手机号
export const decryptoPhone = (params) => {
    return http({
        url: `/businessWechat/Customer/decryptoPhone`,
        method: "get",
        params
    });
};