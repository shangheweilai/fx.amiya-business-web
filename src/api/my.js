import http from "../utils/requestIntercept"
// 根据员工编号获取员工信息
export const AmiyaEmployee = (id) => {
    return http({
        url: `/businessWechat/AmiyaEmployee/byId/${id}`,
        method: "get",
    });
};
//根据客服id获取助理简单业绩数据
export const customerServiceSimplePerformanceById = (params) => {
        return http({
            url: '/businessWechat/AmiyaBusinessPerformance/customerServiceSimplePerformanceById',
            method: 'get',
            params
        })
    }
    // 获取我的当月业绩排名
export const getMyRank = (params) => {
    return http({
        url: '/businessWechat/AmiyaBusinessPerformance/getMyRank',
        method: 'get',
        params
    })
}