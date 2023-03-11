import http from "../utils/requestIntercept"
//内容平台录单
export const todayToHospitalInfo = (data) => {
    return http({
        url: "/ContentPlateFormOrder/contentPlateFormAddOrder",
        method: "post",
        data
    });
};
//获取客服
export const customerServiceNameList = () => {
    return http({
        url: "/AmiyaEmployee/customerServiceNameList",
        method: "get",
    });
};
// 获取平台（下拉框）
export const contentPlatFormValidList = () => {
    return http({
        url: "/ContentPlatForm/validList",
        method: "get",

    });
};
// 获取主播（下拉框）
export const LiveAnchor = (params) => {
    return http({
        url: "/LiveAnchor/validByContentPlatFormId",
        method: "get",
        params
    });
};
// 获取微信号（下拉框）
export const LiveAnchorWechatInfo = (params) => {
    return http({
        url: "/LiveAnchorWechatInfo/validListByLiveAnchorId",
        method: "get",
        params
    });
};
// 获取科室（下拉框）
export const getAmiyaHospitalDepartmentList = () => {
    return http({
        url: "/AmiyaHospitalDepartment/getAmiyaHospitalDepartmentList",
        method: "get",
    });
};
// 获取需求（下拉框）
export const getAmiyaGoodsDemandList = (params) => {
    return http({
        url: "/AmiyaGoodsDemand/getAmiyaGoodsDemandList",
        method: "get",
        params
    });
};
// 订单类型（下拉框）
export const contentPlateFormOrderTypeList = () => {
    return http({
        url: "/ContentPlateFormOrder/contentPlateFormOrderTypeList",
        method: "get",
    });
};
// 订单来源（下拉框）
export const contentPlateFormOrderSourceList = () => {
    return http({
        url: "/ContentPlateFormOrder/contentPlateFormOrderSourceList",
        method: "get",
    });
};
// 面诊状态（下拉框）
export const getOrderConsultationTypeList = () => {
    return http({
        url: "/ContentPlateFormOrder/getOrderConsultationTypeList",
        method: "get",
    });
};
// 获取有效医院（下拉框）
export const HospitalInfo = () => {
    return http({
        url: "/HospitalInfo/nameList",
        method: "get",
    });
};
// 内容平台录单
export const contentPlateFormAddOrder = (data) => {
    return http({
        url: "/ContentPlateFormOrder/contentPlateFormAddOrder",
        method: "post",
        data
    });
};
// 获取内容平台订单列表
export const contentPlateFormOrderLlistWithPage = (params) => {
    return http({
        url: "/ContentPlateFormOrder/contentPlateFormOrderLlistWithPage",
        method: "get",
        params
    });
};
// 根据订单编号获取订单信息
export const getByidContentPlateFormOrder = (id) => {
    return http({
        url: `/ContentPlateFormOrder/byId/${id}`,
        method: "get",
    });
};
// 获取未派单订单列表
export const unContentPlatFormSendOrderList = (params) => {
    return http({
        url: "/ContentPlateFormOrder/unContentPlatFormSendOrderList",
        method: "get",
        params
    });
};
// 获取已派单订单列表
export const ContentPlateFormSendOrder = (params) => {
    return http({
        url: "/ContentPlateFormSendOrder/list",
        method: "get",
        params
    });
};
// 内容平台派单
export const ContentPlateFormOrder = (data) => {
    return http({
        url: "/ContentPlateFormOrder",
        method: "post",
        data
    });
};
// 客服完成订单（确认成交）
export const finishContentPlateFormOrderByEmployee = (data) => {
    return http({
        url: "/ContentPlateFormOrder/finishContentPlateFormOrderByEmployee",
        method: "put",
        data
    });
};
// 获取到院类型
export const contentPlateFormOrderToHospitalTypeList = () => {
    return http({
        url: "/ContentPlateFormOrder/contentPlateFormOrderToHospitalTypeList",
        method: "get",
    });
};
// 获取业绩类型
export const contentPlateFormOrderDealPerformanceType = () => {
    return http({
        url: "/ContentPlatFormOrderDealInfo/contentPlateFormOrderDealPerformanceType",
        method: "get",
    });
};
// 根据id获取订单信息
export const byIdContentPlateFormOrder = (id) => {
    return http({
        url: `/ContentPlateFormOrder/byId/${id}`,
        method: "get",
    });
};
// 编辑订单
export const updateContentPlateFormOrder = (data) => {
    return http({
        url: "/ContentPlateFormOrder/updateContentPlateFormOrder",
        method: "put",
        data
    });
};
// 获取总业绩数据
export const TotalPerformance = (params) => {
    return http({
        url: "/AmiyaBusinessPerformance/TotalPerformance",
        method: "get",
        params
    });
};
// 达人业绩
export const PerformanceByLiveAnchorName = (params) => {
    return http({
        url: "/AmiyaBusinessPerformance/PerformanceByLiveAnchorName",
        method: "get",
        params
    });
};
// 机构业绩
export const hospitalPerformance = (params) => {
    return http({
        url: "/AmiyaBusinessPerformance/hospitalPerformance",
        method: "get",
        params
    });
};
// 助理业绩
export const customerServicePerformance = (params) => {
    return http({
        url: "/AmiyaBusinessPerformance/customerServicePerformance",
        method: "get",
        params
    });
};
// 根据客服id获取助理详细业绩
export const customerServiceDetailPerformanceById = (params) => {
    return http({
        url: "/AmiyaBusinessPerformance/customerServiceDetailPerformanceById",
        method: "get",
        params
    });
};