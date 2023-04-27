<template>
    <div class="contents" v-if="isLoading == false">
        <div class="top">
            <div class="top_con">
                <div class="top_title">总业绩</div>
                <div class="total_num">{{performance.cueerntMonthTotalPerformance ? performance.cueerntMonthTotalPerformance + 'w' : ' -'}}</div>
                <div class="line"></div>
                <div class="bot_num">
                    <span>目标 <span class="num"> {{performance.totalPerformanceTarget ? performance.totalPerformanceTarget + 'w' : ' -'}}</span></span>
                    <span class="bot_r">完成率 <span class="num">{{ performance.totalPerformanceTargetComplete ? performance.totalPerformanceTargetComplete + '%' : '-'}} </span></span>
                </div>
                <div class="bot_num">
                    <span>
                        同比
                        <span v-if="Math.sign(performance.totalPerformanceYearOnYear)== 1"> <span class="num red"><i class="iconfont icon-xiangshang1 icon_ziy"></i></span>{{ Math.abs(performance.totalPerformanceYearOnYear) + '%'}}</span>
                        <span v-else-if="Math.sign(performance.totalPerformanceYearOnYear)== -1"><span  class="num green"><i class="iconfont icon-xiangxia1 icon_ziy"></i></span>{{ Math.abs(performance.totalPerformanceYearOnYear) + '%'}}</span>
                        <span v-else>-</span>
                    </span>
                    <span>
                        环比
                        <span v-if="Math.sign(performance.totalPerformanceChainratio)== 1"> <span class="num red"><i class="iconfont icon-xiangshang1 icon_ziy"></i></span>{{ Math.abs(performance.totalPerformanceChainratio) + '%'}}</span>
                        <span v-else-if="Math.sign(performance.totalPerformanceChainratio)== -1"><span  class="num green"><i class="iconfont icon-xiangxia1 icon_ziy"></i></span>{{ Math.abs(performance.totalPerformanceChainratio) + '%'}}</span>
                        <span v-else>-</span>
                    </span>
                </div>
            </div>
            <div class="time" @click="timeClick">
                <span>{{time}}</span> 
                <i class="iconfont icon-xiangxia icon_xia"></i>
            </div>
        </div>
        
        <div class="center">
            <div class="cen_left">
                <div class="new_customer_con">
                    <span class="new_customer">新客业绩</span>
                    <span class="target">目标<span>{{performance.newCustomerPerformanceTarget ? performance.newCustomerPerformanceTarget + 'w': ' -'}}</span></span>
                </div>
                <div class="total_num">{{performance.currentMonthNewCustomerPerformance ? performance.currentMonthNewCustomerPerformance + 'w': ' -'}}</div>
                <div class="line"></div>
                <div class="cen_bot_w">
                    <div class="t_con">
                        <div  class="t_h">完成比率</div>
                        <span>{{performance.newCustomerPerformanceTargetComplete ? performance.newCustomerPerformanceTargetComplete  + '%': '-'}}</span>
                    </div>
                    <div  class="t_con">
                        <div class="t_h">业绩占比</div>
                        <span>{{performance.newCustomerPerformanceRatio ? performance.newCustomerPerformanceRatio + '%' : '-'}}</span>
                    </div>
                </div>
                <div class="cen_bot_w">
                    <div class="t_con">
                        <div  class="t_h">同比</div>
                        <span>
                            <span v-if="Math.sign(performance.newCustomerPerformanceYearOnYear)== 1"> <span class="num red"><i class="iconfont icon-xiangshang1 icon_ziy"></i></span>{{ Math.abs(performance.newCustomerPerformanceYearOnYear) + '%'}}</span>
                            <span v-else-if="Math.sign(performance.newCustomerPerformanceYearOnYear)== -1"><span  class="num green"><i class="iconfont icon-xiangxia1 icon_ziy"></i></span>{{ Math.abs(performance.newCustomerPerformanceYearOnYear) + '%'}}</span>
                            <span v-else>-</span>
                        </span>
                    </div>
                    <div  class="t_con">
                        <div class="t_h">环比</div>
                        <div>
                            <span v-if="Math.sign(performance.newCustomerPerformanceChainRatio)== 1"> <span class="num red"><i class="iconfont icon-xiangshang1 icon_ziy"></i></span>{{ Math.abs(performance.newCustomerPerformanceChainRatio) + '%'}}</span>
                            <span v-else-if="Math.sign(performance.newCustomerPerformanceChainRatio)== -1"><span  class="num green"><i class="iconfont icon-xiangxia1 icon_ziy"></i></span>{{ Math.abs(performance.newCustomerPerformanceChainRatio) + '%'}}</span>
                            <span v-else>-</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="cen_left">
                <div class="new_customer_con">
                    <span class="new_customer">老客业绩</span>
                    <span class="target">目标<span>{{performance.oldCustomerTarget ? performance.oldCustomerTarget + 'w' : ' -'}}</span></span>
                </div>
                <div class="total_num">{{performance.currentMonthOldCustomerPerformance ? performance.currentMonthOldCustomerPerformance + 'w': ' -'}}</div>
                <div class="line"></div>
                <div class="cen_bot_w">
                    <div class="t_con">
                        <div  class="t_h">完成比率</div>
                        <span>{{performance.oldCustomerTargetComplete ? performance.oldCustomerTargetComplete  + '%': '-'}}</span>
                    </div>
                    <div  class="t_con">
                        <div class="t_h">业绩占比</div>
                        <span>{{performance.oldCustomerPerformanceRatio ? performance.oldCustomerPerformanceRatio + '%' : '-'}}</span>
                    </div>
                </div>
                <div class="cen_bot_w">
                    <div class="t_con">
                        <div  class="t_h">同比</div>
                        <span>
                            <span v-if="Math.sign(performance.oldCustomerPerformanceYearOnYear)== 1"> <span class="num red"><i class="iconfont icon-xiangshang1 icon_ziy"></i></span>{{ Math.abs(performance.oldCustomerPerformanceYearOnYear) + '%'}}</span>
                            <span v-else-if="Math.sign(performance.oldCustomerPerformanceYearOnYear)== -1"><span  class="num green"><i class="iconfont icon-xiangxia1 icon_ziy"></i></span>{{ Math.abs(performance.oldCustomerPerformanceYearOnYear) + '%'}}</span>
                            <span v-else>-</span>
                        </span>
                    </div>
                    <div  class="t_con">
                        <div class="t_h">环比</div>
                        <div>
                            <span v-if="Math.sign(performance.oldCustomerPerformanceChainRatio)== 1"> <span class="num red"><i class="iconfont icon-xiangshang1 icon_ziy"></i></span>{{ Math.abs(performance.oldCustomerPerformanceChainRatio) + '%'}}</span>
                            <span v-else-if="Math.sign(performance.oldCustomerPerformanceChainRatio)== -1"><span  class="num green"><i class="iconfont icon-xiangxia1 icon_ziy"></i></span>{{ Math.abs(performance.oldCustomerPerformanceChainRatio) + '%'}}</span>
                            <span v-else>-</span>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>

        <div class="center">
            <div class="cen_left">
                <div class="new_customer_con">
                    <span class="new_customer">有效业绩</span>
                </div>
                <div class="total_num">{{performance.existPricePerformance ? performance.existPricePerformance + 'w': ' -'}}</div>
                <div class="line"></div>
                <div class="cen_bot_w">
                    <div  class="t_con1">
                        <div class="t_h">业绩占比 </div>
                        <span style="margin-left:4px;margin-top:1px">{{ performance.existPricePerformanceRatio ?  performance.existPricePerformanceRatio + '%' : ' -'}}</span>
                    </div>
                </div>
                <div class="cen_bot_w">
                    <div class="t_con">
                        <div  class="t_h">同比</div>
                        <span>
                            <span v-if="Math.sign(performance.existPricePerformanceYearOnYear)== 1"> <span class="num red"><i class="iconfont icon-xiangshang1 icon_ziy"></i></span>{{ Math.abs(performance.existPricePerformanceYearOnYear) + '%'}}</span>
                            <span v-else-if="Math.sign(performance.existPricePerformanceYearOnYear)== -1"><span  class="num green"><i class="iconfont icon-xiangxia1 icon_ziy"></i></span>{{ Math.abs(performance.existPricePerformanceYearOnYear) + '%'}}</span>
                            <span v-else>-</span>
                        </span>
                    </div>
                    <div  class="t_con">
                        <div class="t_h">环比</div>
                        <div>
                            <span v-if="Math.sign(performance.existPricePerformanceChainRatio)== 1"> <span class="num red"><i class="iconfont icon-xiangshang1 icon_ziy"></i></span>{{ Math.abs(performance.existPricePerformanceChainRatio) + '%'}}</span>
                            <span v-else-if="Math.sign(performance.existPricePerformanceChainRatio)== -1"><span  class="num green"><i class="iconfont icon-xiangxia1 icon_ziy"></i></span>{{ Math.abs(performance.existPricePerformanceChainRatio) + '%'}}</span>
                            <span v-else>-</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="cen_left">
                <div class="new_customer_con">
                    <span class="new_customer">潜在业绩</span>
                </div>
                <div class="total_num">{{performance.zeroPricePerformance ? performance.zeroPricePerformance + 'w': ' -'}}</div>
                <div class="line"></div>
                <div class="cen_bot_w">
                    <div  class="t_con1">
                        <div class="t_h">业绩占比 </div>
                        <span style="margin-left:4px;margin-top:1px">{{ performance.zeroPricePerformanceRatio ?  performance.zeroPricePerformanceRatio + '%' : ' -'}}</span>
                    </div>
                </div>
                <div class="cen_bot_w">
                    <div class="t_con">
                        <div  class="t_h">同比</div>
                        <span>
                            <span v-if="Math.sign(performance.zeroPricePerformanceYearOnYear)== 1"> <span class="num red"><i class="iconfont icon-xiangshang1 icon_ziy"></i></span>{{ Math.abs(performance.zeroPricePerformanceYearOnYear) + '%'}}</span>
                            <span v-else-if="Math.sign(performance.zeroPricePerformanceYearOnYear)== -1"><span  class="num green"><i class="iconfont icon-xiangxia1 icon_ziy"></i></span>{{ Math.abs(performance.zeroPricePerformanceYearOnYear) + '%'}}</span>
                            <span v-else>-</span>
                        </span>
                    </div>
                    <div  class="t_con">
                        <div class="t_h">环比</div>
                        <div>
                            <span v-if="Math.sign(performance.zeroPricePerformanceChainRatio)== 1"> <span class="num red"><i class="iconfont icon-xiangshang1 icon_ziy"></i></span>{{ Math.abs(performance.zeroPricePerformanceChainRatio) + '%'}}</span>
                            <span v-else-if="Math.sign(performance.zeroPricePerformanceChainRatio)== -1"><span  class="num green"><i class="iconfont icon-xiangxia1 icon_ziy"></i></span>{{ Math.abs(performance.zeroPricePerformanceChainRatio) + '%'}}</span>
                            <span v-else>-</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="center">
            <div class="cen_left">
                <div class="new_customer_con2">
                    <div class="new_customer">当月派单</div>
                    <div class="new_customer">当月成交业绩</div>
                </div>
                <div class="total_num">{{performance.duringMonthSendDuringMonthDeal ? performance.duringMonthSendDuringMonthDeal + 'w' : ' -'}}</div>
                <div class="line"></div>
                <div class="cen_bot_w">
                    <div  class="t_con1">
                        <div class="t_h">业绩占比 </div>
                        <span style="margin-left:4px;margin-top:1px">{{ performance.duringMonthSendDuringMonthDealPerformanceRatio ?  performance.duringMonthSendDuringMonthDealPerformanceRatio + '%' : ' -'}}</span>
                    </div>
                </div>
                <div class="cen_bot_w">
                    <div class="t_con">
                        <div  class="t_h">同比</div>
                        <span>
                            <span v-if="Math.sign(performance.duringMonthSendDuringMonthDealYearOnYear)== 1"> <span class="num red"><i class="iconfont icon-xiangshang1 icon_ziy"></i></span>{{ Math.abs(performance.duringMonthSendDuringMonthDealYearOnYear) + '%'}}</span>
                            <span v-else-if="Math.sign(performance.duringMonthSendDuringMonthDealYearOnYear)== -1"><span  class="num green"><i class="iconfont icon-xiangxia1 icon_ziy"></i></span>{{ Math.abs(performance.duringMonthSendDuringMonthDealYearOnYear) + '%'}}</span>
                            <span v-else>-</span>
                        </span>
                    </div>
                    <div  class="t_con">
                        <div class="t_h">环比</div>
                        <div>
                            <span v-if="Math.sign(performance.duringMonthSendDuringMonthDealChainRatio)== 1"> <span class="num red"><i class="iconfont icon-xiangshang1 icon_ziy"></i></span>{{ Math.abs(performance.duringMonthSendDuringMonthDealChainRatio) + '%'}}</span>
                            <span v-else-if="Math.sign(performance.duringMonthSendDuringMonthDealChainRatio)== -1"><span  class="num green"><i class="iconfont icon-xiangxia1 icon_ziy"></i></span>{{ Math.abs(performance.duringMonthSendDuringMonthDealChainRatio) + '%'}}</span>
                            <span v-else>-</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="cen_left">
                <div class="new_customer_con2">
                    <div class="new_customer">历史派单</div>
                    <div class="new_customer">当月成交业绩</div>
                </div>
                <div class="total_num">{{performance.historySendDuringMonthDeal ? performance.historySendDuringMonthDeal + 'w' : ' -'}}</div>
                <div class="line"></div>
                <div class="cen_bot_w">
                    <div  class="t_con1">
                        <div class="t_h">业绩占比 </div>
                        <span style="margin-left:4px;margin-top:1px">{{ performance.historySendDuringMonthDealPerformanceRatio ?  performance.historySendDuringMonthDealPerformanceRatio + '%' : ' -'}}</span>
                    </div>
                </div>
                <div class="cen_bot_w">
                    <div class="t_con">
                        <div  class="t_h">同比</div>
                        <span>
                            <span v-if="Math.sign(performance.historySendDuringMonthDealYearOnYear)== 1"> <span class="num red"><i class="iconfont icon-xiangshang1 icon_ziy"></i></span>{{ Math.abs(performance.historySendDuringMonthDealYearOnYear) + '%'}}</span>
                            <span v-else-if="Math.sign(performance.historySendDuringMonthDealYearOnYear)== -1"><span  class="num green"><i class="iconfont icon-xiangxia1 icon_ziy"></i></span>{{ Math.abs(performance.historySendDuringMonthDealYearOnYear) + '%'}}</span>
                            <span v-else>-</span>
                        </span>
                    </div>
                    <div  class="t_con">
                        <div class="t_h">环比</div>
                        <div>
                            <span v-if="Math.sign(performance.historySendDuringMonthDealChainRatio)== 1"> <span class="num red"><i class="iconfont icon-xiangshang1 icon_ziy"></i></span>{{ Math.abs(performance.historySendDuringMonthDealChainRatio) + '%'}}</span>
                            <span v-else-if="Math.sign(performance.historySendDuringMonthDealChainRatio)== -1"><span  class="num green"><i class="iconfont icon-xiangxia1 icon_ziy"></i></span>{{ Math.abs(performance.historySendDuringMonthDealChainRatio) + '%'}}</span>
                            <span v-else>-</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="center">
            <div class="cen_left">
                <div class="new_customer_con">
                    <span class="new_customer">视频业绩</span>
                </div>
                <div class="total_num">{{performance.videoConsultationPerformance ? performance.videoConsultationPerformance + 'w': ' -'}}</div>
                <div class="line"></div>
                <div class="cen_bot_w">
                    <div  class="t_con1">
                        <div class="t_h">业绩占比 </div>
                        <span style="margin-left:4px;margin-top:1px">{{ performance.videoConsultationPerformanceRatio ?  performance.videoConsultationPerformanceRatio + '%' : ' -'}}</span>
                    </div>
                </div>
                <div class="cen_bot_w">
                    <div class="t_con">
                        <div  class="t_h">同比</div>
                        <span>
                            <span v-if="Math.sign(performance.videoConsultationPerformanceYearOnYear)== 1"> <span class="num red"><i class="iconfont icon-xiangshang1 icon_ziy"></i></span>{{ Math.abs(performance.videoConsultationPerformanceYearOnYear) + '%'}}</span>
                            <span v-else-if="Math.sign(performance.videoConsultationPerformanceYearOnYear)== -1"><span  class="num green"><i class="iconfont icon-xiangxia1 icon_ziy"></i></span>{{ Math.abs(performance.videoConsultationPerformanceYearOnYear) + '%'}}</span>
                            <span v-else>-</span>
                        </span>
                    </div>
                    <div  class="t_con">
                        <div class="t_h">环比</div>
                        <div>
                            <span v-if="Math.sign(performance.videoConsultationPerformanceChainRatio)== 1"> <span class="num red"><i class="iconfont icon-xiangshang1 icon_ziy"></i></span>{{ Math.abs(performance.videoConsultationPerformanceChainRatio) + '%'}}</span>
                            <span v-else-if="Math.sign(performance.videoConsultationPerformanceChainRatio)== -1"><span  class="num green"><i class="iconfont icon-xiangxia1 icon_ziy"></i></span>{{ Math.abs(performance.videoConsultationPerformanceChainRatio) + '%'}}</span>
                            <span v-else>-</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="cen_left">
                <div class="new_customer_con">
                    <span class="new_customer">照片业绩</span>
                </div>
                <div class="total_num">{{performance.pictureConsultationPerformance ? performance.pictureConsultationPerformance + 'w' : ' -'}}</div>
                <div class="line"></div>
                <div class="cen_bot_w">
                    <div  class="t_con1">
                        <div class="t_h">业绩占比 </div>
                        <span style="margin-left:4px;margin-top:1px">{{ performance.pictureConsultationPerformanceRatio ?  performance.pictureConsultationPerformanceRatio + '%' : ' -'}}</span>
                    </div>
                </div>
                <div class="cen_bot_w">
                    <div class="t_con">
                        <div  class="t_h">同比</div>
                        <span>
                            <span v-if="Math.sign(performance.pictureConsultationPerformanceYearOnYear)== 1"> <span class="num red"><i class="iconfont icon-xiangshang1 icon_ziy"></i></span>{{ Math.abs(performance.pictureConsultationPerformanceYearOnYear) + '%'}}</span>
                            <span v-else-if="Math.sign(performance.pictureConsultationPerformanceYearOnYear)== -1"><span  class="num green"><i class="iconfont icon-xiangxia1 icon_ziy"></i></span>{{ Math.abs(performance.pictureConsultationPerformanceYearOnYear) + '%'}}</span>
                            <span v-else>-</span>
                        </span>
                    </div>
                    <div  class="t_con">
                        <div class="t_h">环比</div>
                        <div>
                            <span v-if="Math.sign(performance.pictureConsultationPerformanceChainRatio)== 1"> <span class="num red"><i class="iconfont icon-xiangshang1 icon_ziy"></i></span>{{ Math.abs(performance.pictureConsultationPerformanceChainRatio) + '%'}}</span>
                            <span v-else-if="Math.sign(performance.pictureConsultationPerformanceChainRatio)== -1"><span  class="num green"><i class="iconfont icon-xiangxia1 icon_ziy"></i></span>{{ Math.abs(performance.pictureConsultationPerformanceChainRatio) + '%'}}</span>
                            <span v-else>-</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="center">
            <div class="cen_left">
                <div class="new_customer_con">
                    <span class="new_customer">主播接诊业绩</span>
                </div>
                <div class="total_num">{{performance.acompanyingPerformance ? performance.acompanyingPerformance + 'w': ' -'}}</div>
                <div class="line"></div>
                <div class="cen_bot_w">
                    <div  class="t_con1">
                        <div class="t_h">业绩占比 </div>
                        <span style="margin-left:4px;margin-top:1px">{{ performance.acompanyingPerformanceRatio ?  performance.acompanyingPerformanceRatio + '%' : ' -'}}</span>
                    </div>
                </div>
                <div class="cen_bot_w">
                    <div class="t_con">
                        <div  class="t_h">同比</div>
                        <span>
                            <span v-if="Math.sign(performance.acompanyingPerformanceYearOnYear)== 1"> <span class="num red"><i class="iconfont icon-xiangshang1 icon_ziy"></i></span>{{ Math.abs(performance.acompanyingPerformanceYearOnYear) + '%'}}</span>
                            <span v-else-if="Math.sign(performance.acompanyingPerformanceYearOnYear)== -1"><span  class="num green"><i class="iconfont icon-xiangxia1 icon_ziy"></i></span>{{ Math.abs(performance.acompanyingPerformanceYearOnYear) + '%'}}</span>
                            <span v-else>-</span>
                        </span>
                    </div>
                    <div  class="t_con">
                        <div class="t_h">环比</div>
                        <div>
                            <span v-if="Math.sign(performance.acompanyingPerformanceChainRatio)== 1"> <span class="num red"><i class="iconfont icon-xiangshang1 icon_ziy"></i></span>{{ Math.abs(performance.acompanyingPerformanceChainRatio) + '%'}}</span>
                            <span v-else-if="Math.sign(performance.acompanyingPerformanceChainRatio)== -1"><span  class="num green"><i class="iconfont icon-xiangxia1 icon_ziy"></i></span>{{ Math.abs(performance.acompanyingPerformanceChainRatio) + '%'}}</span>
                            <span v-else>-</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="cen_left">
                <div class="new_customer_con">
                    <span class="new_customer">非主播接诊业绩</span>
                </div>
                <div class="total_num">{{performance.notAcompanyingPerformance ? performance.notAcompanyingPerformance + 'w': ' -'}}</div>
                <div class="line"></div>
                <div class="cen_bot_w">
                    <div  class="t_con1">
                        <div class="t_h">业绩占比 </div>
                        <span style="margin-left:4px;margin-top:1px">{{ performance.notAcompanyingPerformanceRatio ?  performance.notAcompanyingPerformanceRatio + '%' : ' -'}}</span>
                    </div>
                </div>
                <div class="cen_bot_w">
                    <div class="t_con">
                        <div  class="t_h">同比</div>
                        <span>
                            <span v-if="Math.sign(performance.notAcompanyingPerformanceYearOnYear)== 1"> <span class="num red"><i class="iconfont icon-xiangshang1 icon_ziy"></i></span>{{ Math.abs(performance.notAcompanyingPerformanceYearOnYear) + '%'}}</span>
                            <span v-else-if="Math.sign(performance.notAcompanyingPerformanceYearOnYear)== -1"><span  class="num green"><i class="iconfont icon-xiangxia1 icon_ziy"></i></span>{{ Math.abs(performance.notAcompanyingPerformanceYearOnYear) + '%'}}</span>
                            <span v-else>-</span>
                        </span>
                    </div>
                    <div  class="t_con">
                        <div class="t_h">环比</div>
                        <div>
                            <span v-if="Math.sign(performance.notAcompanyingPerformanceChainRatio)== 1"> <span class="num red"><i class="iconfont icon-xiangshang1 icon_ziy"></i></span>{{ Math.abs(performance.notAcompanyingPerformanceChainRatio) + '%'}}</span>
                            <span v-else-if="Math.sign(performance.notAcompanyingPerformanceChainRatio)== -1"><span  class="num green"><i class="iconfont icon-xiangxia1 icon_ziy"></i></span>{{ Math.abs(performance.notAcompanyingPerformanceChainRatio) + '%'}}</span>
                            <span v-else>-</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="no_data">没有更多了</div>


        <van-popup v-model="timeModel" position="bottom" style="height: 50%" round >
            <van-datetime-picker
                v-model="currentDate"
                type="year-month"
                title="选择年月"
                :min-date="minDate"
                :max-date="maxDate"
                @cancel="timeModel = false"
                @confirm="timeConfirm"
            />
        </van-popup> 
        
    </div>
    <van-loading size="24px" vertical text-color="#fff" color="#fff" style="height:100vh;padding:140px 0 0 0px;background:linear-gradient(#8ab4fe,#f5f5f5);margin-left:60px" v-else>加载中...</van-loading>
</template>
<script>
import  * as api from "@/api/order.js";

export default {
    data(){
        return{
            time:this.$moment().format("YYYY-MM"),
            minDate: new Date(2020, 0, 1),
            maxDate: new Date(2025, 10, 1),
            currentDate:  this.$moment().format("YYYY-MM"),
            timeModel:false,
            performance:{},
            isLoading:false,
            // 用于存储处理过的数据
            dataObj:{
                // 本月总业绩
                cueerntMonthTotalPerformance:null,
                // 总业绩目标
                totalPerformanceTarget:null,
                // 新客目标
                newCustomerPerformanceTarget:null,
                // 新客业绩
                currentMonthNewCustomerPerformance:null,
                // 老客业绩
                currentMonthOldCustomerPerformance:null,
                // 老客目标
                oldCustomerTarget:null,
                // 199元业绩
                existPricePerformance:null,
                // 0元业绩
                zeroPricePerformance:null,
                // 当月派单当月成交
                duringMonthSendDuringMonthDeal:null,
                // 历史派单当月成交业绩
                historySendDuringMonthDeal:null,
                // 主播视频业绩
                videoConsultationPerformance:null,
                // 助理照片业绩
                pictureConsultationPerformance:null,
                // 主播接诊业绩
                acompanyingPerformance:null,
                // 非主播接诊业绩
                notAcompanyingPerformance:null
                



            }
        }
    },
    methods:{
        timeClick(){
            this.currentDate = new Date(this.$moment(this.time).format("YYYY-MM-DD"))
            this.timeModel = true
        },
        timeConfirm(value){
            this.time = this.$moment(value).format("YYYY-MM")
            this.timeModel = false
            this.getPerformanceByLiveAnchorName()
        },
        getPerformanceByLiveAnchorName(){
            const data ={
                year:this.$moment(this.time).format("YYYY"),
                month:this.$moment(this.time).format("MM"),
                liveAnchorBaseId:'',
                isSelfLiveAnchor:true
            }
            this.isLoading = true
            api.PerformanceByLiveAnchorName(data).then((res)=>{
                if(res.code == 0){
                    this.isLoading  = false
                    this.performance =  res.data.performance
                }else{
                    this.$toast(res.msg)
                }
            })
        }
    },
    created(){
        this.getPerformanceByLiveAnchorName()
    }
}
</script>
<style scoped lang="less">
.contents{
    width: 100%;
    padding-left: 60px;
    box-sizing: border-box;
    background:linear-gradient(#8ab4fe,#f5f5f5);
    .top{
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding:  10px;
        box-sizing: border-box;
        // margin-top: 10px;
        font-size: 12px;
        .top_con{
            width: 70%;
            background-image: url(../../../assets/dataCenter.png) ;
            background-size: 100% 100%;
            border-radius: 10px/10px;
            padding: 10px;
            box-sizing: border-box;
            .total_num{
                color: #5492FE;
                font-size: 16px;
                margin-top: 5px;
                
            }
            .line{
                width: 70px;
                height: 1px;
                border: 1px solid #5492FE;
                margin: 5px 0;
            }
            .bot_num{
                display: flex;
                justify-content: space-between;
                .num{
                    font-size: 14px;
                    color: #5492FE;
                    .icon_ziy{
                        font-size: 10px;
                    }
                   
                }
                .red{
                    color: green;
                }
                .green{
                    color: red;
                }
                .bot_r{
                }
            }
        }
        .time{
            font-size: 13px;
            color: #fff;
            .icon_xia{
                font-size: 20px;
            }
        }
        
    }
    .center{
        display: flex;
        width: 100%;
        justify-content: space-between;
        padding: 5px 10px;
        box-sizing: border-box;
        .cen_left{
            width: 49%;
            background: #e9f3ff;
            border-radius: 10px;
            padding: 10px;
            box-sizing: border-box;
            .new_customer_con{
                display: flex;
                justify-content: space-between;
                align-items: center;
                .new_customer{
                    font-size: 13px;
                }
                .target{
                    font-size: 12px;
                    color: #767474;
                }
            }
            .new_customer_con2{
                align-items: center;
                .new_customer{
                    font-size: 13px;
                }
                .target{
                    font-size: 12px;
                    color: #767474;
                }
            }
            .total_num{
                font-size: 15px;
                color: #5492FE;
                margin-top: 4px;
            }
            .line{
                width: 70px;
                height: 1px;
                border: 1px solid #5492FE;
                margin: 5px 0;
            }
            .cen_bot_w{
                display: flex;
                font-size: 12px;
                justify-content: space-between;
                margin-bottom: 5px;
                .c_title{
                    width: 20px;
                }
                .t_con{
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                    .t_h{
                        // width: 30px;
                        text-align: center;
                    }
                    .icon_ziy{
                        font-size: 10px;
                    }
                    .red{
                    color: green;
                }
                
                .green{
                    color: red;
                }
                }
                .t_con1{
                    display: flex;
                    align-items: center;
                    .t_h{
                        text-align: center;
                    }
                    .icon_ziy{
                        font-size: 10px;
                    }
                    .red{
                    color: green;
                }
                
                .green{
                    color: red;
                }
                }
                
            }
        }
    }
    .no_data{
        text-align: center;
        padding: 10px 0;
        box-sizing: border-box;
        color: #ccc;
        font-size: 14px;
    }
    
}
</style>