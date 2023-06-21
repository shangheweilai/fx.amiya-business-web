import http from "../utils/requestIntercept"
// 上传图片
export const upload = (data) => {
    return http({
        url: "/fxopenoss/aliyunoss/uploadone",
        method: "post",
        data
    });
};
//内容平台录单
export const todayToHospitalInfo = (data) => {
    return http({
        url: "/businessWechat/ContentPlateFormOrder/contentPlateFormAddOrder",
        method: "post",
        data
    });
};
//获取客服
export const customerServiceNameList = () => {
    return http({
        url: "/businessWechat/AmiyaEmployee/customerServiceNameList",
        method: "get",
    });
};
// 获取平台（下拉框）
export const contentPlatFormValidList = () => {
    return http({
        url: "/businessWechat/ContentPlatForm/validList",
        method: "get",

    });
};
// 获取主播（下拉框）
export const LiveAnchor = (params) => {
    return http({
        url: "/businessWechat/LiveAnchor/validByContentPlatFormId",
        method: "get",
        params
    });
};
// 获取微信号（下拉框）
export const LiveAnchorWechatInfo = (params) => {
    return http({
        url: "/businessWechat/LiveAnchorWechatInfo/validListByLiveAnchorId",
        method: "get",
        params
    });
};
// 获取科室（下拉框）
export const getAmiyaHospitalDepartmentList = () => {
    return http({
        url: "/businessWechat/AmiyaHospitalDepartment/getAmiyaHospitalDepartmentList",
        method: "get",
    });
};
// 获取需求（下拉框）
export const getAmiyaGoodsDemandList = (params) => {
    return http({
        url: "/businessWechat/AmiyaGoodsDemand/getAmiyaGoodsDemandList",
        method: "get",
        params
    });
};
// 订单类型（下拉框）
export const contentPlateFormOrderTypeList = () => {
    return http({
        url: "/businessWechat/ContentPlateFormOrder/contentPlateFormOrderTypeList",
        method: "get",
    });
};
// 订单来源（下拉框）
export const contentPlateFormOrderSourceList = () => {
    return http({
        url: "/businessWechat/ContentPlateFormOrder/contentPlateFormOrderSourceList",
        method: "get",
    });
};
// 面诊状态（下拉框）
export const getOrderConsultationTypeList = () => {
    return http({
        url: "/businessWechat/ContentPlateFormOrder/getOrderConsultationTypeList",
        method: "get",
    });
};
// 获取有效医院（下拉框）
export const HospitalInfo = () => {
    return http({
        url: "/businessWechat/HospitalInfo/nameList",
        method: "get",
    });
};
// 内容平台录单
export const contentPlateFormAddOrder = (data) => {
    return http({
        url: "/businessWechat/ContentPlateFormOrder/contentPlateFormAddOrder",
        method: "post",
        data
    });
};
// 获取内容平台订单列表
export const contentPlateFormOrderLlistWithPage = (params) => {
    return http({
        url: "/businessWechat/ContentPlateFormOrder/contentPlateFormOrderLlistWithPage",
        method: "get",
        params
    });
};
// 根据订单编号获取订单信息
export const getByidContentPlateFormOrder = (id) => {
    return http({
        url: `/businessWechat/ContentPlateFormOrder/byId/${id}`,
        method: "get",
    });
};
// 获取未派单订单列表
export const unContentPlatFormSendOrderList = (params) => {
    return http({
        url: "/businessWechat/ContentPlateFormOrder/unContentPlatFormSendOrderList",
        method: "get",
        params
    });
};
// 获取已派单订单列表
export const ContentPlateFormSendOrder = (params) => {
    return http({
        url: "/businessWechat/ContentPlateFormSendOrder/list",
        method: "get",
        params
    });
};
// 内容平台派单
export const ContentPlateFormOrder = (data) => {
    return http({
        url: "/businessWechat/ContentPlateFormOrder",
        method: "post",
        data
    });
};
// 客服完成订单（确认成交）
export const finishContentPlateFormOrderByEmployee = (data) => {
    return http({
        url: "/businessWechat/ContentPlateFormOrder/finishContentPlateFormOrderByEmployee",
        method: "put",
        data
    });
};
// 获取到院类型
export const contentPlateFormOrderToHospitalTypeList = () => {
    return http({
        url: "/businessWechat/ContentPlateFormOrder/contentPlateFormOrderToHospitalTypeList",
        method: "get",
    });
};
// 获取业绩类型
export const contentPlateFormOrderDealPerformanceType = () => {
    return http({
        url: "/businessWechat/ContentPlatFormOrderDealInfo/contentPlateFormOrderDealPerformanceType",
        method: "get",
    });
};
// 根据id获取订单信息
export const byIdContentPlateFormOrder = (id) => {
    return http({
        url: `/businessWechat/ContentPlateFormOrder/byId/${id}`,
        method: "get",
    });
};
// 编辑订单
export const updateContentPlateFormOrder = (data) => {
    return http({
        url: "/businessWechat/ContentPlateFormOrder/updateContentPlateFormOrder",
        method: "put",
        data
    });
};
// 获取总业绩数据
export const TotalPerformance = (params) => {
    return http({
        url: "/businessWechat/AmiyaBusinessPerformance/TotalPerformance",
        method: "get",
        params
    });
};
// 达人业绩
export const PerformanceByLiveAnchorName = (params) => {
    return http({
        url: "/businessWechat/AmiyaBusinessPerformance/PerformanceByLiveAnchorName",
        method: "get",
        params
    });
};
// 机构业绩
export const hospitalPerformance = (params) => {
    return http({
        url: "/businessWechat/AmiyaBusinessPerformance/hospitalPerformance",
        method: "get",
        params
    });
};
// 助理业绩
export const customerServicePerformance = (params) => {
    return http({
        url: "/businessWechat/AmiyaBusinessPerformance/customerServicePerformance",
        method: "get",
        params
    });
};
// 根据客服id获取助理详细业绩
export const customerServiceDetailPerformanceById = (params) => {
    return http({
        url: "/businessWechat/AmiyaBusinessPerformance/customerServiceDetailPerformanceById",
        method: "get",
        params
    });
};
// 获取有效主播基础信息列表
export const LiveAnchorBaseInfo = (params) => {
    return http({
        url: "/businessWechat/LiveAnchorBaseInfo/valid",
        method: "get",
        params
    });
};
// 根据id获取主播基础信息
export const LiveAnchorBaseInfoAnchor = (id) => {
    return http({
        url: `/businessWechat/LiveAnchorBaseInfo/byId/${id}`,
        method: "get",
    });
};
// 录单申请列表查询
export const getContentPlatFormOrderAddWork = (params) => {
    return http({
        url: "/businessWechat/ContentPlatFormOrderAddWork/listWithPage",
        method: "get",
        params
    });
};
// 修改录单申请信息
export const updateContentPlatFormOrderAddWork = (data) => {
    return http({
        url: "/businessWechat/ContentPlatFormOrderAddWork/update",
        method: "put",
        data
    });
};
// 作废订单
export const deleteOrder = (id) => {
    return http({
        url: `/businessWechat/ContentPlatFormOrderAddWork/${id}`,
        method: "delete",
    });
};
// 审核录单申请信息
export const ContentPlatFormOrderAddWorkcheck = (data) => {
    return http({
        url: "/businessWechat/ContentPlatFormOrderAddWork/check",
        method: "put",
        data
    });
};
// 根据手机号筛选归属客服
export const getCustomerServiceNameByPhone = (params) => {
        return http({
            url: "/businessWechat/BindCustomerService/getCustomerServiceNameByPhone",
            method: "get",
            params
        })
    }
    // 根据录单申请手机号获取录单申请信息
export const byPhoneContentPlatFormOrderAddWork = (phone) => {
    return http({
        url: `/businessWechat/ContentPlatFormOrderAddWork/byPhone/${phone}`,
        method: "get",
    });
};
// 获取已绑定客服的内容平台订单列表
export const bindCustomerServieOrders = (params) => {
    return http({
        url: "/businessWechat/ContentPlateFormOrder/bindCustomerServieOrders",
        method: "get",
        params
    });
};
// 获取客户池客服下的手机号
export const getPublicPoolPhone = (params) => {
    return http({
        url: "/businessWechat/BindCustomerService/getPublicPoolPhone",
        method: "get",
        params
    });
};
// 改绑公共池客户
export const updatePublicPoolPhone = (data) => {
    return http({
        url: "/businessWechat/BindCustomerService/updatePublicPoolPhone",
        method: "put",
        data
    });
};
// 内容平台修改绑定客服
export const updateContentPlatFormOrderListBindCustomerService = (data) => {
    return http({
        url: "/businessWechat/BindCustomerService/ContentPlatFormOrderListBindCustomerService",
        method: "put",
        data
    });
};
// 添加录单申请
export const addContentPlatFormOrderAddWork = (data) => {
    return http({
        url: "/businessWechat/ContentPlatFormOrderAddWork/add",
        method: "post",
        data
    });
};
// 转移录单申请信息
export const updateAcceptBy = (data) => {
    return http({
        url: "/businessWechat/ContentPlatFormOrderAddWork/updateAcceptBy",
        method: "put",
        data
    });
};
//获取所有员工
export const getEmployeeByPositionId = (params) => {
    return http({
        url: "/businessWechat/AmiyaEmployee/getEmployeeByPositionId",
        method: "get",
        params
    });
};
// 主播获取客户预约日程信息列表（分页）
export const getCustomerAppointmentSchedule = (params) => {
    return http({
        url: "/businessWechat/CustomerAppointmentSchedule/listWithPage",
        method: "get",
        params
    });
};
// 消费类型
export const ContentPlatFormOrderDealInfoTypeList = () => {
    return http({
        url: "/businessWechat/ContentPlatFormOrderDealInfo/typeList",
        method: "get",
    });
};
// 修改头像
export const updateAvatar = (data) => {
    return http({
        url: "/businessWechat/AmiyaEmployee/updateAvatar",
        method: "put",
        data
    });
};