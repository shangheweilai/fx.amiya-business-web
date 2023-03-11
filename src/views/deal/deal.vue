<template>  
  <div class="container">

  
    <div class="content">
        <div class="anchor">成交信息填写</div>
        <div >
            <van-field
                v-model="$route.query.consultatioType"
                label="订单类型"
                disabled
                placeholder="请选择订单类型"
                class="customer_content"
            />
            <div class="switch_content">
                <van-cell center title="是否到院" class="switch_con">
                    <van-switch v-model="form.isToHospital" size="24" class="switch_icon" :disabled="form.isFinish == true" @change="isToHospitalClick(form.isToHospital)"/>
                </van-cell>
            </div>
            <van-field
                v-model="form.lastDealHospitalName"
                label="到院医院"
                disabled
                placeholder="请选择到院医院"
                class="customer_content"
                @click="model.lastDealHospitalModel = true"
                v-if="form.isToHospital == true"
            />
            <van-field
                v-model="form.toHospitalTypeName"
                label="到院类型"
                disabled
                placeholder="请选择到院类型"
                class="customer_content"
                @click="model.toHospitalTypeModel = true"
                v-if="form.isToHospital == true"
            />
            <van-field
                v-model="form.toHospitalDate"
                label="到院时间"
                disabled
                placeholder="请选择到院时间"
                class="customer_content"
                @click="toHospitalDateClick"
                v-if="form.isToHospital == true"
            />
            <div class="switch_content">
            <van-cell center title="是否陪诊" class="switch_con" v-if="form.isToHospital == true">
                <van-switch v-model="form.isAcompanying" size="24" class="switch_icon" />
            </van-cell>
            </div>
            <div class="switch_content">
            <van-cell center title="是否成交" class="switch_con">
                <van-switch v-model="form.isFinish" size="24" class="switch_icon" @change="isFinishClick(form.isFinish)"/>
            </van-cell>
            </div>
            <van-field
                v-model="form.dealAmount"
                label="成交金额"
                placeholder="请输入成交金额"
                class="customer_content"
                @input="dealAmountInput"
                type="number"
                v-if="form.isFinish == true"
            />
            <van-field
                v-model="form.dealDate"
                label="成交时间"
                disabled
                placeholder="请选择成交时间"
                class="customer_content"
                @click="dealDateClick"
                v-if="form.isFinish == true"
            />
            <van-field
                v-model="form.dealPerformanceTypeName"
                label="业绩类型"
                disabled
                placeholder="请选择业绩类型"
                class="customer_content"
                @click="model.dealPerformanceTypeModel = true"
                v-if="form.isFinish == true"
            />
            <van-field
                v-model="form.unDealReason"
                label="未成交原因"
                placeholder="请输入未成交原因"
                class="customer_content"
                type="textarea"
                :rows="2"
                v-if="form.isFinish == false"
            />
            <van-field
                v-model="form.otherContentPlatFormOrderId"
                label="抖店订单号"
                placeholder="请输入抖店订单号"
                class="customer_content"
                type="textarea"
                :rows="2"
            />
            <van-field
                v-model="form.lastProjectStage"
                label="后期项目铺垫"
                placeholder="请输入后期项目铺垫"
                class="customer_content"
                type="textarea"
                :rows="4"
            />
        </div>

        <div>
            <van-popup v-model="model.lastDealHospitalModel" round position="bottom">
                <van-picker
                    show-toolbar
                    :columns="list.hospitalInfoName"
                    @cancel="model.lastDealHospitalModel = false"
                    @confirm="hospitalInfoConfirm"
                />
            </van-popup>
            <van-popup v-model="model.toHospitalTypeModel" round position="bottom">
                <van-picker
                    show-toolbar
                    :columns="list.orderTypesName"
                    @cancel="model.toHospitalTypeModel = false"
                    @confirm="orderTypesConfirm"
                />
            </van-popup>
            <van-popup v-model="model.toHospitalDateModel" position="bottom" style="height: 50%" round >
                <van-datetime-picker
                    v-model="currentDate"
                    type="date"
                    :min-date="minDate"
                    :max-date="maxDate"
                    :show-toolbar="true"
                    @cancel="model.toHospitalDateModel = false"
                    @confirm="confirmFn"
                />
            </van-popup> 
            <van-popup v-model="model.dealDateModel" position="bottom" style="height: 50%" round >
                <van-datetime-picker
                    v-model="currentDate2"
                    type="date"
                    :min-date="minDate"
                    :max-date="maxDate"
                    :show-toolbar="true"
                    @cancel="model.dealDateModel = false"
                    @confirm="confirmFn2"
                />
            </van-popup> 
            <van-popup v-model="model.dealPerformanceTypeModel" round position="bottom">
                <van-picker
                    show-toolbar
                    :columns="list.contentPlateFormOrderDealPerformanceTypeName"
                    @cancel="model.dealPerformanceTypeModel = false"
                    @confirm="contentPlateFormOrderDealPerformanceTypeConfirm"
                />
            </van-popup>
        </div>
        <div class="bottom">
            <!-- <van-button round block type="info"  class="button" @click="prevStep">上一步</van-button> -->
            <van-button round block type="info"  class="button" @click="submite">完成</van-button>
        </div>
    </div>
    </div>
</template>
<script>
import * as api from "@/api/order.js";

export default {
    props:{
        active:Number,
        anchorCustomerServiceMessage:Object
    },
    data(){
        return{
            currentDate: this.$moment().format("YYYY-MM-DD"),
            currentDate2:this.$moment().format("YYYY-MM-DD"),
            minDate: new Date(2020, 1, 1),
            maxDate: new Date(2026, 1, 1),
            // 用于页面展示
            form:{
                // 订单号
                id:'',
                // 是否成交
                isFinish:false,
                // 成交医院
                lastDealHospitalId:null,
                lastDealHospitalName:'',
                // 是否到院
                isToHospital:false,
                // 到院类型
                toHospitalType:null,
                toHospitalTypeName:null,
                // 到院时间
                toHospitalDate:this.$moment().format("YYYY-MM-DD"),
                // 成交金额
                dealAmount:null,
                // 后期项目铺垫
                lastProjectStage:'',
                // 成交截图url
                dealPictureUrl:'',
                // 未成交原因
                unDealReason:'',
                // 未成交截图url
                unDealPictureUrl:'',
                // 成交时间
                dealDate:this.$moment().format("YYYY-MM-DD"),
                //业绩类型 
                dealPerformanceType:null,
                dealPerformanceTypeName:null,
                // 是否陪诊
                isAcompanying:false,
                // 佣金比例
                commissionRatio:null,
                // 三方订单号
                otherContentPlatFormOrderId:'',
                // 邀约凭证
                invitationDocuments:[]
            },
            // 获取接口数据
            joggle:{
                // 医院
                hospitalInfo:[],
                orderTypes:[],
                contentPlateFormOrderDealPerformanceType:[]
            },
            // model
            model:{
                lastDealHospitalModel:false,
                toHospitalTypeModel:false,
                toHospitalDateModel:false,
                dealDateModel:false,
                dealPerformanceTypeModel:false
            },
            // 用于页面展示数据
            list:{
                hospitalInfoName:[],
                orderTypesName:[],
                contentPlateFormOrderDealPerformanceTypeName:[]
                
            }
        }

    },
    methods:{
        dealDateClick(){
           var myDate = new Date();  
            this.model.dealDateModel = true;
            this.currentDate2 = new Date(this.$moment(myDate).format("YYYY-MM-DD"))
        },
        toHospitalDateClick(){
           var myDate = new Date();  
            this.model.toHospitalDateModel = true;
            this.currentDate = new Date(this.$moment(myDate).format("YYYY-MM-DD"))
        },
        submite(){
            const {isFinish,lastDealHospitalId,isToHospital,toHospitalType,toHospitalDate,dealAmount,lastProjectStage,dealPictureUrl,unDealReason,
            unDealPictureUrl,dealDate,dealPerformanceType,isAcompanying,commissionRatio,otherContentPlatFormOrderId,invitationDocuments
            } = this.form
            if(isToHospital == true){
                if(!lastDealHospitalId){
                    this.$toast("请选择到院医院");
                    return
                }
                if(!toHospitalType){
                    this.$toast("请选择到院类型");
                    return
                }
                if(!toHospitalDate){
                    this.$toast("请选择到院时间");
                    return
                }
            }
            if(isFinish == true){
                if(!dealAmount){
                    this.$toast("请输入成交金额");
                    return
                }
                if(!dealDate){
                    this.$toast("请选择成交时间");
                    return
                }
                if(!dealPerformanceType){
                    this.$toast("请选择业绩类型");
                    return
                }
            }
            if(isFinish == false){
               if(!unDealReason){
                this.$toast("请输入未成交原因");
                return
               }
            }
           const data = {
            id:this.$route.query.orderId,
            isFinish,
            lastDealHospitalId:Number(lastDealHospitalId),
            isToHospital,
            toHospitalType:Number(toHospitalType),
            toHospitalDate:toHospitalDate ? this.$moment(toHospitalDate).format("YYYY-MM-DD") : null,
            dealAmount:Number(dealAmount),
            lastProjectStage,
            dealPictureUrl,
            unDealReason,
            unDealPictureUrl,
            dealDate:dealDate ? this.$moment(dealDate).format("YYYY-MM-DD") : null,
            dealPerformanceType:Number(dealPerformanceType),
            isAcompanying,
            commissionRatio:0,
            otherContentPlatFormOrderId,
            invitationDocuments:[]
           }
           api.finishContentPlateFormOrderByEmployee(data).then((res) => {
                if(res.code === 0){
                    this.$toast('确认成功')
                    this.$router.go(-1)
                }else{
                    this.$toast(res.msg)
                }
           })

        },
        isToHospitalClick(value){
            if(value == false){
                // this.form.toHospitalDate = this.$moment().format("YYYY-MM-DD"),
                this.currentDate = ''
                this.form.lastDealHospitalId = null
                this.form.lastDealHospitalName = ''
                this.form.toHospitalTypeName = ''
                this.form.toHospitalType = null
                this.form.isAcompanying = false
            }
        },
        isFinishClick(value){
            if(value == false){
                // this.form.toHospitalDate =  this.$moment().format("YYYY-MM-DD"),
                this.currentDate = ''
                this.form.lastDealHospitalId = null
                this.form.lastDealHospitalName = ''
                this.form.toHospitalTypeName = ''
                this.form.toHospitalType = null
                this.form.isAcompanying = false
                this.form.isToHospital = false
                this.form.dealAmount = null 
                // this.form.dealDate = this.$moment().format("YYYY-MM-DD")
                this.currentDate2 = ''
                this.form.dealPerformanceType = null 
                this.form.dealPerformanceTypeName = null 
            }else{
                this.form.isToHospital = true
                this.form.unDealReason = ''
            }
        },
        // 获取医院
        getHospitalInfo() {
            api.HospitalInfo().then((res) => {
                this.joggle.hospitalInfo =res.data.hospitalInfo;
                let hospitalInfoName=[]
                this.joggle.hospitalInfo.map(item=>{
                    hospitalInfoName.push(item.name)
                })
                this.list.hospitalInfoName = hospitalInfoName
            
            });
        },
        lastDealHospitalClick(value){
            this.model.lastDealHospitalModel = true
        },
        hospitalInfoConfirm(value){
            this.form.lastDealHospitalName = value;
            this.model.lastDealHospitalModel = false;
            // 取id
            this.joggle.hospitalInfo.map((item) => {
                if (item.name == value) {
                this.form.lastDealHospitalId = item.id;
                }
            });
        },
        // 获取到院状态
        getcontentPlateFormOrderToHospitalTypeList() {
            api.contentPlateFormOrderToHospitalTypeList().then((res) => {
                this.joggle.orderTypes =res.data.orderTypes;
                let orderTypesName=[]
                this.joggle.orderTypes.map(item=>{
                    orderTypesName.push(item.name)
                })
                this.list.orderTypesName = orderTypesName
            
            });
        },
        orderTypesConfirm(value){
            this.form.toHospitalTypeName = value;
            this.model.toHospitalTypeModel = false;
            // 取id
            this.joggle.orderTypes.map((item) => {
                if (item.name == value) {
                this.form.toHospitalType = item.id;
                }
            });
        },
        confirmFn(value){
            this.form.toHospitalDate = this.$moment(value).format("YYYY-MM-DD");
            this.model.toHospitalDateModel = false;
        },
        confirmFn2(value){
            this.form.dealDate = this.$moment(value).format("YYYY-MM-DD");
            this.model.dealDateModel = false;
        },
        dealAmountInput(value){
            this.form.dealAmount = value
        },
        //   获取业绩类型
        getcontentPlateFormOrderDealPerformanceType() {
        api.contentPlateFormOrderDealPerformanceType().then((res) => {
            if (res.code === 0) {
            this.joggle.contentPlateFormOrderDealPerformanceType =res.data.contentPlateFormOrderDealPerformanceType;
                let contentPlateFormOrderDealPerformanceTypeName=[]
                this.joggle.contentPlateFormOrderDealPerformanceType.map(item=>{
                    contentPlateFormOrderDealPerformanceTypeName.push(item.name)
                })
                this.list.contentPlateFormOrderDealPerformanceTypeName = contentPlateFormOrderDealPerformanceTypeName
            }
        });
        },
        contentPlateFormOrderDealPerformanceTypeConfirm(value){
            this.form.dealPerformanceTypeName = value;
            this.model.dealPerformanceTypeModel = false;
            // 取id
            this.joggle.contentPlateFormOrderDealPerformanceType.map((item) => {
                if (item.name == value) {
                this.form.dealPerformanceType = item.id;
                }
            });
        }
    },
    created(){
        // this.getCustomerServiceNameList()
        this.getcontentPlateFormOrderDealPerformanceType()
        this.getcontentPlateFormOrderToHospitalTypeList()
        this.getHospitalInfo()
    }
}
</script>

<style scoped lang="less">
/deep/ .customer_content,.van-cell ,.van-cell--center{
    display: flex;
    
}
/deep/.switch_con{
    width: 160px;
    color: #5492fe;
    margin-left: -17px;
    display: flex;
    align-items: center;
}
/deep/ .switch_icon ,.van-switch{
    // margin-right: 120%;
}
.container{
    // width: 100%;
    // height: 100vh;
    // background: linear-gradient(#8ab4fe,#fff);
    // padding-top: 20px;
    // box-sizing: border-box;
}
.content{
    width: 92%;
    background: #fff;
    // height: 350px;
    margin: 20px auto 0;
    border-radius: 10px;
    box-shadow: 10px 10px 10px rgba(0, 0.5);
    padding: 10px;
    box-sizing: border-box;
    .anchor {
        border-left: 3px solid #eacebf;
        font-size: 16px;
        font-weight: bold;
        padding-left: 5px;
        box-sizing: border-box;
        height: 17px;
        line-height: 17px;
        color: #5492fe;
        margin-bottom: 10px;
    }
    .customer_content {
        border-bottom: 1px solid #bbd3ff;
        padding: 10px 0;
        box-sizing: border-box;
        /deep/.van-cell__title,
        .van-field__label {
        width: 90px;
        color: #5492fe;
        }
    }
    .switch_content{
        width: 100%;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #bbd3ff;
        // padding: 10px 0;
        // box-sizing: border-box;
        color: #5492fe;
        // .switch_icon{
        //     position: fixed;
        //     left:28%;
        //     top: 16.5%;
        // }
        // .switch_icon{
        //     position: fixed;
        //     left:28%;
        //     top: 43.5%;
        // }
        // .switch_icon3{
        //     position: fixed;
        //     left:28%;
        //     top: 50%;
        // }
    }
    .bottom{
        display: flex;
        margin-top: 20px;
        .button{
            width: 40%;
            height: 42px;
            margin:0 auto
        }
    }
}
</style>