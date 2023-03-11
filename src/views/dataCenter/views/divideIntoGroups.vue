<template>
    <div class="contents">
        <div class="nav_top_con">
            <div class="nav_con_d" v-for="(item,index) in navList" :key="index">
                <div class="daodao" :style="{background: item.id == activeItem ? 'linear-gradient(#588ef1,#2c71f5)' : 'linear-gradient(#5a90f1,#5e92f1)',}" @click="navClick(item.id)">{{item.name}}</div>
            </div>
            <div class="right_time" @click="timeClick">
                <span>{{time}}</span> 
                <i class="iconfont icon-xiangxia icon_xia"></i>
            </div>
        </div>
        <div class="" v-if="activeItem == 0">
            <daodao :time="time" ref="daodaos" :performance="performance" :dataObj="dataObj" :isLoading="isLoading"/>
        </div>
        <div class="" v-else>
            <jina :time="time" ref="jinas" :performance="performance" :dataObj="dataObj" :isLoading="isLoading"/>
        </div>

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
    
</template>
<script>
import  * as api from "@/api/order.js";

import daodao from "../components/daodao.vue"
import jina from "../components/jina.vue"
export default {
    components:{
        daodao,
        jina
    },
    data(){
        return{
            activeItem:0,
            navList:[
                {
                    id:0,
                    name:'刀刀组'
                },
                {
                    id:1,
                    name:'吉娜组'
                },
                
            ],
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
        navClick(value){
            // sessionStorage.setItem('divdeIntoActive',value)
            if(value == 0){
                this.activeItem = value
                this.getPerformanceByLiveAnchorName()
                return
            }else{
                this.activeItem = value
                this.getPerformanceByLiveAnchorName()
                return
            }
            
        },
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
                liveAnchorBaseId:this.activeItem == 0 ? 'f0a77257-c905-4719-95c4-ad2c4f33855c' : 'af69dcf5-f749-41ea-8b50-fe685facdd8b',
                isSelfLiveAnchor:true
            }
            this.isLoading = true
            api.PerformanceByLiveAnchorName(data).then((res)=>{
                if(res.code == 0){
                    this.isLoading = false
                    const {cueerntMonthTotalPerformance,totalPerformanceTarget,newCustomerPerformanceTarget,currentMonthNewCustomerPerformance,currentMonthOldCustomerPerformance,oldCustomerTarget,existPricePerformance,zeroPricePerformance,duringMonthSendDuringMonthDeal,historySendDuringMonthDeal,videoConsultationPerformance,pictureConsultationPerformance,acompanyingPerformance,notAcompanyingPerformance} = res.data.performance
                    this.performance =  res.data.performance
                    this.dataObj.cueerntMonthTotalPerformance = cueerntMonthTotalPerformance > 10000 ? (cueerntMonthTotalPerformance / 10000).toFixed(3) + ' w': cueerntMonthTotalPerformance
                    this.dataObj.totalPerformanceTarget = totalPerformanceTarget > 10000 ? (totalPerformanceTarget / 10000) + ' w': totalPerformanceTarget
                    // 新客业绩
                    this.dataObj.newCustomerPerformanceTarget = newCustomerPerformanceTarget > 10000 ? (newCustomerPerformanceTarget / 10000) + ' w': newCustomerPerformanceTarget
                    this.dataObj.currentMonthNewCustomerPerformance = currentMonthNewCustomerPerformance > 10000 ? (currentMonthNewCustomerPerformance / 10000).toFixed(3) + ' w': currentMonthNewCustomerPerformance.toFixed(3) 
                    // 老客业绩
                    this.dataObj.currentMonthOldCustomerPerformance = currentMonthOldCustomerPerformance > 10000 ? (currentMonthOldCustomerPerformance / 10000).toFixed(3) + ' w': currentMonthOldCustomerPerformance.toFixed(3) 
                    // 老客目标
                    this.dataObj.oldCustomerTarget = oldCustomerTarget > 10000 ? (oldCustomerTarget / 10000) + ' w': oldCustomerTarget
                    // 199元业绩
                    this.dataObj.existPricePerformance = existPricePerformance > 10000 ? (existPricePerformance / 10000).toFixed(3) + ' w': existPricePerformance.toFixed(3) 
                    // 0元业绩
                    this.dataObj.zeroPricePerformance = zeroPricePerformance > 10000 ? (zeroPricePerformance / 10000).toFixed(3) + ' w': zeroPricePerformance.toFixed(3)
                    // 当月派单当月成交
                    this.dataObj.duringMonthSendDuringMonthDeal = duringMonthSendDuringMonthDeal > 10000 ? (duringMonthSendDuringMonthDeal / 10000).toFixed(3) + ' w': duringMonthSendDuringMonthDeal.toFixed(3) 
                    // 历史派单当月成交业绩
                    this.dataObj.historySendDuringMonthDeal = historySendDuringMonthDeal > 10000 ? (historySendDuringMonthDeal / 10000).toFixed(3) + ' w': historySendDuringMonthDeal.toFixed(3) 
                    // 主播视频业绩
                    this.dataObj.videoConsultationPerformance = videoConsultationPerformance > 10000 ? (videoConsultationPerformance / 10000).toFixed(3) + ' w': videoConsultationPerformance.toFixed(3) 
                    // 助理照片业绩
                    this.dataObj.pictureConsultationPerformance = pictureConsultationPerformance > 10000 ? (pictureConsultationPerformance / 10000).toFixed(3) + ' w': pictureConsultationPerformance.toFixed(3) 
                    // 主播接诊业绩
                    this.dataObj.acompanyingPerformance = acompanyingPerformance > 10000 ? (acompanyingPerformance / 10000).toFixed(3) + ' w': acompanyingPerformance.toFixed(3) 
                    // 非主播接诊业绩
                    this.dataObj.notAcompanyingPerformance = notAcompanyingPerformance > 10000 ? (notAcompanyingPerformance / 10000).toFixed(3) + ' w': notAcompanyingPerformance.toFixed(3) 



                }else{
                    this.$toast(res.msg)
                }
            })
        }
    },
    created(){
        if(this.activeItem == 0){
            this.getPerformanceByLiveAnchorName()
            return
        }
        // this.activeItem = sessionStorage.getItem('divdeIntoActive') ? sessionStorage.getItem('divdeIntoActive') : 0
    }
}
</script>

<style scoped lang="less">
.contents{
    width: 100%;
    background:linear-gradient(#8ab4fe,#f5f5f5);
    // height: 100vh;
    
    .nav_top_con{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
            box-sizing: border-box;
            font-size: 14px;
            padding-left: 75px;
            box-sizing: border-box;
            .nav_con_d{
                display: flex;
                .daodao{
                    background: linear-gradient(#6398f8,#4980e6);
                    padding: 5px 20px;
                    box-sizing: border-box;
                    margin-right: 10px;
                    color: #fff;
                    border-radius: 8px;
                }
            }
            
        }
    
    
    .right_time{
        color: #fff;
    }
}
</style>