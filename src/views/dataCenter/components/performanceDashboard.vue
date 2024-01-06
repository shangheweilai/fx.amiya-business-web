<template>
    <div class="performanceDashboard_con">
        <div class="per_item" @click="detail('下单GMV')">
            <div class="per_top">
                <div class="top_con">
                    <div class="gmv1">
                        <div class="num1">{{commerceParams.gmvData.orderGmv}}</div>
                        <div class="title">下单GMV</div>
                    </div>
                </div>
                <div class="top_con2">
                    <div class="gmv">
                        <div class="title">目标完成率</div>
                        <div class="num">{{commerceParams.gmvData.orderGmvCompleteRate}}%</div>
                    </div>
                    <div class="gmv"> 
                        <div class="title">环比</div>
                        <div  class="num" v-if="Math.sign(commerceParams.gmvData.orderGMVChainRatio)== 1"> 
                            <span  class="red ">增长</span>{{ Math.abs(commerceParams.gmvData.orderGMVChainRatio) + '%'}}
                        </div>
                        <div class="num" v-else-if="Math.sign(commerceParams.gmvData.orderGMVChainRatio)== -1">
                            <span  class="green">下降</span>{{ Math.abs(commerceParams.gmvData.orderGMVChainRatio) + '%'}}
                        </div>
                        <div class="num"  v-else>-</div>
                    </div>
                    <div class="gmv">
                        <div class="title">同比</div>
                        <div  class="num" v-if="Math.sign(commerceParams.gmvData.orderGMVYearOnYear)== 1"> 
                            <span  class="red ">增长</span>{{ Math.abs(commerceParams.gmvData.orderGMVYearOnYear) + '%'}}
                        </div>
                        <div class="num" v-else-if="Math.sign(commerceParams.gmvData.orderGMVYearOnYear)== -1">
                            <span  class="green">下降</span>{{ Math.abs(commerceParams.gmvData.orderGMVYearOnYear) + '%'}}
                        </div>
                        <div class="num"  v-else>-</div>
                    </div>
                </div>
               
            </div>
        </div>

        <div class="per_item"  @click="detail('直播间投流')">
            <div class="per_top">
                <div class="top_con">
                    <div class="gmv1">
                        <div class="num1">{{commerceParams.gmvData.qianChuanPutIn}}</div>
                        <div class="title">直播间投流</div>
                    </div>
                    
                </div>
                <div class="top_con2">
                    <div class="gmv">
                        <div class="title">目标完成率</div>
                        <div class="num">{{commerceParams.gmvData.qianChuanPutInCompleteRate}}%</div>
                    </div>
                    <div class="gmv"> 
                        <div class="title">环比</div>
                        <div  class="num" v-if="Math.sign(commerceParams.gmvData.qianChuanPutInChainRatio)== 1"> 
                            <span  class="red ">增长</span>{{ Math.abs(commerceParams.gmvData.qianChuanPutInChainRatio) + '%'}}
                        </div>
                        <div class="num" v-else-if="Math.sign(commerceParams.gmvData.qianChuanPutInChainRatio)== -1">
                            <span  class="green">下降</span>{{ Math.abs(commerceParams.gmvData.qianChuanPutInChainRatio) + '%'}}
                        </div>
                        <div class="num"  v-else>-</div>
                    </div>
                    <div class="gmv">
                        <div class="title">同比</div>
                        <div  class="num" v-if="Math.sign(commerceParams.gmvData.qianChuanPutInYearOnYear)== 1"> 
                            <span  class="red ">增长</span>{{ Math.abs(commerceParams.gmvData.qianChuanPutInYearOnYear) + '%'}}
                        </div>
                        <div class="num" v-else-if="Math.sign(commerceParams.gmvData.qianChuanPutInYearOnYear)== -1">
                            <span  class="green">下降</span>{{ Math.abs(commerceParams.gmvData.qianChuanPutInYearOnYear) + '%'}}
                        </div>
                        <div class="num"  v-else>-</div>
                    </div>
                </div>
               
            </div>
        </div>
        <div class="per_item"  @click="detail('刀刀组GMV')" v-if="params.active == 0 || params.active == 3" >
            <div class="per_top">
                <div class="top_con">
                    <div class="gmv1">
                        <div class="num1">{{commerceParams.gmvData.daoDaoOrderGmv}}</div>
                        <div class="title1">刀刀组GMV</div>
                    </div>
                    
                </div>
                <div class="top_con2">
                    <div class="gmv">
                        <div class="title">目标完成率</div>
                        <div class="num">{{commerceParams.gmvData.daoDaoOrderGmvCompleteRate}}%</div>
                    </div>
                    <div class="gmv"> 
                        <div class="title">环比</div>
                        <div  class="num" v-if="Math.sign(commerceParams.gmvData.daoDaoOrderGMVChainRatio)== 1"> 
                            <span  class="red ">增长</span>{{ Math.abs(commerceParams.gmvData.daoDaoOrderGMVChainRatio) + '%'}}
                        </div>
                        <div class="num" v-else-if="Math.sign(commerceParams.gmvData.daoDaoOrderGMVChainRatio)== -1">
                            <span  class="green">下降</span>{{ Math.abs(commerceParams.gmvData.daoDaoOrderGMVChainRatio) + '%'}}
                        </div>
                        <div class="num"  v-else>-</div>
                    </div>
                    <div class="gmv">
                        <div class="title">同比</div>
                        <div  class="num" v-if="Math.sign(commerceParams.gmvData.daoDaoOrderGMVYearOnYear)== 1"> 
                            <span  class="red ">增长</span>{{ Math.abs(commerceParams.gmvData.daoDaoOrderGMVYearOnYear) + '%'}}
                        </div>
                        <div class="num" v-else-if="Math.sign(commerceParams.gmvData.daoDaoOrderGMVYearOnYear)== -1">
                            <span  class="green">下降</span>{{ Math.abs(commerceParams.gmvData.daoDaoOrderGMVYearOnYear) + '%'}}
                        </div>
                        <div class="num"  v-else>-</div>
                    </div>
                </div>
               
            </div>
        </div>
        <div class="per_item"  @click="detail('吉娜组GMV')" v-if="params.active == 0 || params.active == 3">
            <div class="per_top">
                <div class="top_con">
                    <div class="gmv1">
                        <div class="num1">{{commerceParams.gmvData.jiNaOrderGmv}}</div>
                        <div class="title1">吉娜组GMV</div>
                    </div>
                    
                </div>
                <div class="top_con2">
                    <div class="gmv">
                        <div class="title">目标完成率</div>
                        <div class="num">{{commerceParams.gmvData.jiNaOrderGmvCompleteRate}}%</div>
                    </div>
                    <div class="gmv"> 
                        <div class="title">环比</div>
                        <div  class="num" v-if="Math.sign(commerceParams.gmvData.jiNaOrderGMVChainRatio)== 1"> 
                            <span  class="red ">增长</span>{{ Math.abs(commerceParams.gmvData.jiNaOrderGMVChainRatio) + '%'}}
                        </div>
                        <div class="num" v-else-if="Math.sign(commerceParams.gmvData.jiNaOrderGMVChainRatio)== -1">
                            <span  class="green">下降</span>{{ Math.abs(commerceParams.gmvData.jiNaOrderGMVChainRatio) + '%'}}
                        </div>
                        <div class="num"  v-else>-</div>
                    </div>
                    <div class="gmv">
                        <div class="title">同比</div>
                        <div  class="num" v-if="Math.sign(commerceParams.gmvData.jiNaOrderGMVYearOnYear)== 1"> 
                            <span  class="red ">增长</span>{{ Math.abs(commerceParams.gmvData.jiNaOrderGMVYearOnYear) + '%'}}
                        </div>
                        <div class="num" v-else-if="Math.sign(commerceParams.gmvData.jiNaOrderGMVYearOnYear)== -1">
                            <span  class="green">下降</span>{{ Math.abs(commerceParams.gmvData.jiNaOrderGMVYearOnYear) + '%'}}
                        </div>
                        <div class="num"  v-else>-</div>
                    </div>
                </div>
               
            </div>
        </div>
        <div class="per_item" >
            <div class="per_top">
                <div class="top_con">
                    <div class="gmv1">
                        <div class="num1">{{commerceParams.gmvData.refunGMV}}</div>
                        <div class="title1">退款GMV</div>
                    </div>
                    
                </div>
                <div class="top_con2">
                    <div class="gmv">
                        <div class="title">目标完成率</div>
                        <div class="num">{{commerceParams.gmvData.refunGMVCompleteRate}}%</div>
                    </div>
                    <div class="gmv"> 
                        <div class="title">环比</div>
                        <div  class="num" v-if="Math.sign(commerceParams.gmvData.refunGMVChainRatio)== 1"> 
                            <span  class="red ">增长</span>{{ Math.abs(commerceParams.gmvData.refunGMVChainRatio) + '%'}}
                        </div>
                        <div class="num" v-else-if="Math.sign(commerceParams.gmvData.refunGMVChainRatio)== -1">
                            <span  class="green">下降</span>{{ Math.abs(commerceParams.gmvData.refunGMVChainRatio) + '%'}}
                        </div>
                        <div class="num"  v-else>-</div>
                    </div>
                    <div class="gmv">
                        <div class="title">同比</div>
                        <div  class="num" v-if="Math.sign(commerceParams.gmvData.refunGMVYearOnYear)== 1"> 
                            <span  class="red ">增长</span>{{ Math.abs(commerceParams.gmvData.refunGMVYearOnYear) + '%'}}
                        </div>
                        <div class="num" v-else-if="Math.sign(commerceParams.gmvData.refunGMVYearOnYear)== -1">
                            <span  class="green">下降</span>{{ Math.abs(commerceParams.gmvData.refunGMVYearOnYear) + '%'}}
                        </div>
                        <div class="num"  v-else>-</div>
                    </div>
                </div>
               
            </div>
        </div>

        <!-- 数据诊断弹窗 -->
        <van-popup v-model="diagnosisModel"  style="width:90%">
            <div class="diagnosis_con">
                <div class="rule_title">数据诊断</div>
                <div v-if="isFlag == '下单GMV'">
                    <div class="top_con">
                        <span class="top_title">下单GMV </span>
                        <span class="top_num"> {{commerceParams.gmvData.orderGmv}}</span>
                    </div>
                    <div class="center">
                        <div class="cen_item">
                            <div class="cen_num">{{commerceParams.gmvData.orderGmvCompleteRate}}%</div>
                            <div class="cen_text">目标完成率</div>
                        </div>
                        <div class="cen_item">
                            <div  class="cen_num" v-if="Math.sign(commerceParams.gmvData.orderGMVChainRatio)== 1"> 
                                <span  class="red ">增长</span>{{ Math.abs(commerceParams.gmvData.orderGMVChainRatio) + '%'}}
                            </div>
                            <div class="cen_num" v-else-if="Math.sign(commerceParams.gmvData.orderGMVChainRatio)== -1">
                                <span  class="green">下降</span>{{ Math.abs(commerceParams.gmvData.orderGMVChainRatio) + '%'}}
                            </div>
                            <div class="cen_num"  v-else>-</div>
                            <div class="cen_text">环比</div>
                        </div>
                        <div class="cen_item">
                            <div  class="cen_num" v-if="Math.sign(commerceParams.gmvData.orderGMVYearOnYear)== 1"> 
                                <span  class="red ">增长</span>{{ Math.abs(commerceParams.gmvData.orderGMVYearOnYear) + '%'}}
                            </div>
                            <div class="cen_num" v-else-if="Math.sign(commerceParams.gmvData.orderGMVYearOnYear)== -1">
                                <span  class="green">下降</span>{{ Math.abs(commerceParams.gmvData.orderGMVYearOnYear) + '%'}}
                            </div>
                            <div class="cen_num"  v-else>-</div>
                            <div class="cen_text">同比</div>
                        </div>
                    </div>
                    <div class="rule_content">
                        <div class="rule_text">数据诊断：</div>
                        <!-- <div class="cen_text">对比时间进度： 下降90% </div> -->
                        <div  class="cen_text">
                            对比时间进度：
                            <span  class="h5" v-if="Math.sign(commerceParams.gmvData.orderGMVToDateSchedule)== 1"> <span  class="red ">增长</span>{{ Math.abs(commerceParams.gmvData.orderGMVToDateSchedule) + '%'}}</span>
                            <span class="h5" v-else-if="Math.sign(commerceParams.gmvData.orderGMVToDateSchedule)== -1"><span  class="green">下降</span>{{ Math.abs(commerceParams.gmvData.orderGMVToDateSchedule) + '%'}}</span>
                            <span class="h5"  v-else>-</span>
                        </div>
                        <div class="cen_text">对比时间进度，业绩偏差：{{commerceParams.gmvData.orderGMVDeviation}}元</div>
                        <div class="cen_text">距目标达成，后期需完成：{{commerceParams.gmvData.laterCompleteEveryDayOrderGMV}}元/天</div>
                    </div>
                </div>
                <div v-else-if="isFlag == '直播间投流'">
                    <div class="top_con">
                        <span class="top_title">直播间投流 </span>
                        <span class="top_num"> {{commerceParams.gmvData.qianChuanPutIn}}</span>
                    </div>
                    <div class="center">
                        <div class="cen_item">
                            <div class="cen_num">{{commerceParams.gmvData.qianChuanPutInCompleteRate}}%</div>
                            <div class="cen_text">目标完成率</div>
                        </div>
                        <div class="cen_item">
                            <div  class="cen_num" v-if="Math.sign(commerceParams.gmvData.qianChuanPutInChainRatio)== 1"> 
                                <span  class="red ">增长</span>{{ Math.abs(commerceParams.gmvData.qianChuanPutInChainRatio) + '%'}}
                            </div>
                            <div class="cen_num" v-else-if="Math.sign(commerceParams.gmvData.qianChuanPutInChainRatio)== -1">
                                <span  class="green">下降</span>{{ Math.abs(commerceParams.gmvData.qianChuanPutInChainRatio) + '%'}}
                            </div>
                            <div class="cen_num"  v-else>-</div>
                            <div class="cen_text">环比</div>
                        </div>
                        <div class="cen_item">
                            <div  class="cen_num" v-if="Math.sign(commerceParams.gmvData.qianChuanPutInYearOnYear)== 1"> 
                                <span  class="red ">增长</span>{{ Math.abs(commerceParams.gmvData.qianChuanPutInYearOnYear) + '%'}}
                            </div>
                            <div class="cen_num" v-else-if="Math.sign(commerceParams.gmvData.qianChuanPutInYearOnYear)== -1">
                                <span  class="green">下降</span>{{ Math.abs(commerceParams.gmvData.qianChuanPutInYearOnYear) + '%'}}
                            </div>
                            <div class="cen_num"  v-else>-</div>
                            <div class="cen_text">同比</div>
                        </div>
                    </div>
                    <div class="center center_item">
                        <div class="cen_item " style="border:none;">
                            <div class="cen_num">{{commerceParams.gmvData.qianChuanNum}}</div>
                            <div class="cen_text">千川</div>
                        </div>
                        <div class="cen_item" style="border:none">
                            <div class="cen_num">{{commerceParams.gmvData.tikTokPlusNum}}</div>
                            <div class="cen_text">抖+</div>
                        </div>
                        <div class="cen_item" style="border:none">
                            <div class="cen_num">{{commerceParams.gmvData.shuiXinTuiNum}}</div>
                            <div class="cen_text">随心推</div>
                        </div>
                        <div class="cen_item" style="border:none">
                            <div class="cen_num">{{commerceParams.gmvData.weiXinDou}}</div>
                            <div class="cen_text">微信豆</div>
                        </div>
                    </div>
                    <div class="rule_content">
                        <div class="rule_text">数据诊断：</div>
                        <!-- <div class="cen_text">对比时间进度： 下降90% </div> -->
                        <div  class="cen_text">
                            对比时间进度：
                            <span  class="h5" v-if="Math.sign(commerceParams.gmvData.qianChuanToDateSchedule)== 1"> <span  class="red ">增长</span>{{ Math.abs(commerceParams.gmvData.qianChuanToDateSchedule) + '%'}}</span>
                            <span class="h5" v-else-if="Math.sign(commerceParams.gmvData.qianChuanToDateSchedule)== -1"><span  class="green">下降</span>{{ Math.abs(commerceParams.gmvData.qianChuanToDateSchedule) + '%'}}</span>
                            <span class="h5"  v-else>-</span>
                        </div>
                        <div class="cen_text">对比时间进度，业绩偏差：{{commerceParams.gmvData.qianChuanDeviation}}元</div>
                        <div class="cen_text">距目标达成，后期需完成：{{commerceParams.gmvData.laterCompleteEveryDayQianChuan}}元/天</div>
                    </div>
                </div>
                <div v-else-if="isFlag == '刀刀组GMV'">
                    <div class="top_con">
                        <span class="top_title">刀刀组GMV </span>
                        <span class="top_num"> {{commerceParams.gmvData.daoDaoOrderGmv}}</span>
                    </div>
                    <div class="center">
                        <div class="cen_item">
                            <div class="cen_num">{{commerceParams.gmvData.daoDaoOrderGmvCompleteRate}}%</div>
                            <div class="cen_text">目标完成率</div>
                        </div>
                        <div class="cen_item">
                            <div  class="cen_num" v-if="Math.sign(commerceParams.gmvData.daoDaoOrderGMVChainRatio)== 1"> 
                                <span  class="red ">增长</span>{{ Math.abs(commerceParams.gmvData.daoDaoOrderGMVChainRatio) + '%'}}
                            </div>
                            <div class="cen_num" v-else-if="Math.sign(commerceParams.gmvData.daoDaoOrderGMVChainRatio)== -1">
                                <span  class="green">下降</span>{{ Math.abs(commerceParams.gmvData.daoDaoOrderGMVChainRatio) + '%'}}
                            </div>
                            <div class="cen_num"  v-else>-</div>
                            <div class="cen_text">环比</div>
                        </div>
                        <div class="cen_item">
                            <div  class="cen_num" v-if="Math.sign(commerceParams.gmvData.daoDaoOrderGMVYearOnYear)== 1"> 
                                <span  class="red ">增长</span>{{ Math.abs(commerceParams.gmvData.daoDaoOrderGMVYearOnYear) + '%'}}
                            </div>
                            <div class="cen_num" v-else-if="Math.sign(commerceParams.gmvData.daoDaoOrderGMVYearOnYear)== -1">
                                <span  class="green">下降</span>{{ Math.abs(commerceParams.gmvData.daoDaoOrderGMVYearOnYear) + '%'}}
                            </div>
                            <div class="cen_num"  v-else>-</div>
                            <div class="cen_text">同比</div>
                        </div>
                    </div>
                    <div class="rule_content">
                        <div class="rule_text">数据诊断：</div>
                        <!-- <div class="cen_text">对比时间进度： 下降90% </div> -->
                        <div  class="cen_text">
                            对比时间进度：
                            <span  class="h5" v-if="Math.sign(commerceParams.gmvData.daoDaoOrderGMVToDateSchedule)== 1"> <span  class="red ">增长</span>{{ Math.abs(commerceParams.gmvData.daoDaoOrderGMVToDateSchedule) + '%'}}</span>
                            <span class="h5" v-else-if="Math.sign(commerceParams.gmvData.daoDaoOrderGMVToDateSchedule)== -1"><span  class="green">下降</span>{{ Math.abs(commerceParams.gmvData.daoDaoOrderGMVToDateSchedule) + '%'}}</span>
                            <span class="h5"  v-else>-</span>
                        </div>
                        <div class="cen_text">对比时间进度，业绩偏差：{{commerceParams.gmvData.daoDaoOrderGMVDeviation}}元</div>
                        <div class="cen_text">距目标达成，后期需完成：{{commerceParams.gmvData.laterCompleteEveryDayDaoDaoOrderGMV}}元/天</div>
                    </div>
                </div>
                <div v-else-if="isFlag == '吉娜组GMV'">
                    <div class="top_con">
                        <span class="top_title">吉娜组GMV </span>
                        <span class="top_num"> {{commerceParams.gmvData.jiNaOrderGmv}}</span>
                    </div>
                    <div class="center">
                        <div class="cen_item">
                            <div class="cen_num">{{commerceParams.gmvData.jiNaOrderGmvCompleteRate}}%</div>
                            <div class="cen_text">目标完成率</div>
                        </div>
                        <div class="cen_item">
                            <div  class="cen_num" v-if="Math.sign(commerceParams.gmvData.jiNaOrderGMVChainRatio)== 1"> 
                                <span  class="red ">增长</span>{{ Math.abs(commerceParams.gmvData.jiNaOrderGMVChainRatio) + '%'}}
                            </div>
                            <div class="cen_num" v-else-if="Math.sign(commerceParams.gmvData.jiNaOrderGMVChainRatio)== -1">
                                <span  class="green">下降</span>{{ Math.abs(commerceParams.gmvData.jiNaOrderGMVChainRatio) + '%'}}
                            </div>
                            <div class="cen_num"  v-else>-</div>
                            <div class="cen_text">环比</div>
                        </div>
                        <div class="cen_item">
                            <div  class="cen_num" v-if="Math.sign(commerceParams.gmvData.jiNaOrderGMVYearOnYear)== 1"> 
                                <span  class="red ">增长</span>{{ Math.abs(commerceParams.gmvData.jiNaOrderGMVYearOnYear) + '%'}}
                            </div>
                            <div class="cen_num" v-else-if="Math.sign(commerceParams.gmvData.jiNaOrderGMVYearOnYear)== -1">
                                <span  class="green">下降</span>{{ Math.abs(commerceParams.gmvData.jiNaOrderGMVYearOnYear) + '%'}}
                            </div>
                            <div class="cen_num"  v-else>-</div>
                            <div class="cen_text">同比</div>
                        </div>
                    </div>
                    <div class="rule_content">
                        <div class="rule_text">数据诊断：</div>
                        <!-- <div class="cen_text">对比时间进度： 下降90% </div> -->
                        <div  class="cen_text">
                            对比时间进度：
                            <span  class="h5" v-if="Math.sign(commerceParams.gmvData.jinaOrderGMVToDateSchedule)== 1"> <span  class="red ">增长</span>{{ Math.abs(commerceParams.gmvData.jinaOrderGMVToDateSchedule) + '%'}}</span>
                            <span class="h5" v-else-if="Math.sign(commerceParams.gmvData.jinaOrderGMVToDateSchedule)== -1"><span  class="green">下降</span>{{ Math.abs(commerceParams.gmvData.jinaOrderGMVToDateSchedule) + '%'}}</span>
                            <span class="h5"  v-else>-</span>
                        </div>
                        <div class="cen_text">对比时间进度，业绩偏差：{{commerceParams.gmvData.jinaOrderGMVDeviation}}元</div>
                        <div class="cen_text">距目标达成，后期需完成：{{commerceParams.gmvData.jInaLaterCompleteEveryDayOrderGMV}}元/天</div>
                    </div>
                </div>
            </div>
        </van-popup>
    </div>
</template>
<script>
export default {
    props:{
        commerceParams:Object,
        params:Object
    },
    data(){
        return{
            diagnosisModel:false,
            isFlag:''
        }
    },
    methods:{
        detail(value){
            if(value == '下单GMV'){
                this.isFlag = '下单GMV'
                this.diagnosisModel = true
            }else if(value == '直播间投流'){
                this.isFlag = '直播间投流'
                this.diagnosisModel = true
            }else if(value == '刀刀组GMV'){
                this.isFlag = '刀刀组GMV'
                this.diagnosisModel = true
            }else if(value == '吉娜组GMV'){
                this.isFlag = '吉娜组GMV'
                this.diagnosisModel = true
            }else if(value == '退款GMV'){
                this.isFlag = '退款GMV'
                this.diagnosisModel = true
            }
        }
    }
}
</script>

<style scoped lang="less">
.van-popup ,.van-popup--center{
    border-radius: 10px;
}
.performanceDashboard_con{
    .per_item{
        width: 90%;
        border-radius: 10px;
        padding: 10px;
        box-sizing: border-box;
        margin: 10px auto;
        background: #e9f3ff;
        margin-bottom: 10px;
    }
    .top_con,.top_con2{
        font-size: 14px;
        display: flex;
        text-align: center;
        width: 100%;
        .gmv1{
            width: 100%;
            .num1{
                font-size: 16px;
                font-weight: bold;
                color: #5492FE;
            }
        }
        .gmv{
            width:50%;
            .num2{
                text-align: start;
            }
        }
        .gmv2{
            width:50%;
            text-align: end;
        }
        .num{
            font-size: 12px;
            font-weight: bold;
        }
        .num{
            font-size: 12px;
            .red {
            color: green;
            margin-right: 4px;
            }
            .green {
            color: red;
            margin-right: 4px;
            }
        }

    }
    .top_con2{
        margin-top: 10px;
    }
    .diagnosis_con{
       
        border-radius: 20px;
        
        .rule_title{
            padding: 5px 20px ;
            box-sizing: border-box;
            text-align: end;
            font-size: 14px;
            font-weight: bold;
            color: #5492FE;
        }
        .rule_content{
            width: 100%;
            font-size: 12px;
            // margin-top: 5px;
            color: #000;
            background: #e9f3ff;
            padding: 10px 20px 10px 10px;
            
            .cen_text{
                color: #a9a8a8;
                padding-bottom: 3px;
                font-size: 12px;
                .h5{
                    .red {
                    color: green;
                    margin-right: 4px;
                    }
                    .green {
                    color: red;
                    margin-right: 4px;
                    }
                }
            }
            .rule_text{
                color: #5492FE;
                margin-bottom: 6px;
            }
        }
        .top_con{
            
            width: 90%;
            border-bottom: 1px solid #ccc;
            padding-bottom: 7px;
            margin: 0 auto;
            .top_title{
                font-size: 14px;
                color: #a9a8a8;
            }
            .top_num{
                font-weight: bold;
                color: #5492FE;
                margin-left: 5px;
                font-size: 16px;
            }
        }
        .center{
            width: 100%;
            display: flex;
            font-size: 12px;
        }
        .center_item{
            width: 100%;
            background:#e9f3ff;
            display: flex;
            justify-content: space-between;
        }
        .cen_item,.cen_item2{
            flex:1;
            border-right: 1px solid #ccc;
            text-align: center;
            padding-top: 10px;
            margin-bottom: 10px;
            .cen_num{
                font-size: 12px;
                color: #5492FE;
                font-weight: bold;
                .red {
                    color: green;
                    margin-right: 4px;
                    font-size: 12px;
                }
                .green {
                    color: red;
                    margin-right: 4px;
                    font-size: 12px;
                }
            }
            .cen_text{
                color: #a9a8a8;
                
                
            }
        }
        .center_item{
            text-align: center;
        }
        .cen_item2{
            width: 25%;
            display: flex;
            justify-content: space-between;
            padding-left: 15px;
        }
        .cen_item:last-child{
            border: none;
        }
        
    }
}
</style>