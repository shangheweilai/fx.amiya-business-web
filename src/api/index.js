import http from "../utils/requestIntercept"
// 获取我的客户
export const getMyCustomer = () => {
    return http({
        url: "/BindCustomerService/getMyCustomer",
        method: "get",
    });
};
//获取今日到院订单
export const todayToHospitalInfo = (params) => {
    return http({
        url: "/ContentPlatFormOrderDealInfo/todayToHospitalInfo",
        method: "get",
        params
    });
};