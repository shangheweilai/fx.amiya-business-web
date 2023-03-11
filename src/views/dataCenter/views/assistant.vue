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
            <assistantDaodao   :performance="performance" :isLoading="isLoading" />
        </div>
        <div class="" v-else>
            <assistantJina   :performance="performance" :isLoading="isLoading"/>
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

import assistantDaodao from "../components/assistantDaodao.vue"
import assistantJina from "../components/assistantJina.vue"
export default {
    components:{
        assistantDaodao,
        assistantJina
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
            performance:[],
            isLoading:false
           
        }
    },
    methods:{
        navClick(value){
            sessionStorage.setItem('assistantActive',value)
            if(value == 0){
                this.activeItem = value
                this.getcustomerServicePerformance()
                return
            }else{
                this.activeItem = value
                this.getcustomerServicePerformance()
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
            this.getcustomerServicePerformance()
        },
        getcustomerServicePerformance(){
            const data ={
                year:this.$moment(this.time).format("YYYY"),
                month:this.$moment(this.time).format("MM"),
                liveAnchorBaseId:this.activeItem == 0 ? 'f0a77257-c905-4719-95c4-ad2c4f33855c' : 'af69dcf5-f749-41ea-8b50-fe685facdd8b',
                isSelfLiveAnchor:true
            }
            this.isLoading = true
            api.customerServicePerformance(data).then((res)=>{
                if(res.code == 0){
                   this.performance =  res.data.performance
                   this.isLoading = false
                }else{
                    this.$toast(res.msg)
                }
            })
        }
    },
    created(){
        // if(this.activeItem == 0){
        //     this.getcustomerServicePerformance()
        //     return
        // }
        this.activeItem = sessionStorage.getItem('assistantActive') ? sessionStorage.getItem('assistantActive') : 0
        this.getcustomerServicePerformance()
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