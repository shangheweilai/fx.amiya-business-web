import http from "../utils/requestIntercept"
// 获取我的客户
export const getMyCustomer = () => {
    return http({
        url: "/businessWechat/BindCustomerService/getMyCustomer",
        method: "get",
    });
};
//获取今日到院订单
export const todayToHospitalInfo = (params) => {
    return http({
        url: "/businessWechat/ContentPlatFormOrderDealInfo/todayToHospitalInfo",
        method: "get",
        params
    });
};
//根据手机号筛选归属客服
export const getCustomerServiceNameByPhone = (params) => {
    return http({
        url: "/businessWechat/BindCustomerService/getCustomerServiceNameByPhone",
        method: "get",
        params
    });
};