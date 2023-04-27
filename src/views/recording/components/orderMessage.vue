<template>
    <div class="content">
        <div class="anchor">订单信息</div>
        <div>
            <van-field
                v-model="form.orderType"
                label="订单类型"
                disabled
                placeholder="请选择订单类型"
                class="customer_content"
                @click="model.orderTypeModel = true"
            />
            <van-field
                v-model="form.depositAmount"
                label="定金金额"
                placeholder="请输入定金金额"
                class="customer_content"
                @input="depositAmountInput"
                :disabled ="form2.orderType !=2"
                type="number"
            />
            <van-field
                v-model="form.appointmentHospitalId"
                label="预约门店"
                disabled
                placeholder="请选择预约门店"
                class="customer_content"
                @click="model.appointmentHospitalIdModel = true"
            />
            <van-field
                v-model="form.orderSource"
                label="订单来源"
                disabled
                placeholder="请选择订单来源"
                class="customer_content"
                @click="model.orderSourceModel = true"
            />
            <van-field
                v-model="form.consultationType"
                label="面诊状态"
                disabled
                placeholder="请选择面诊状态"
                class="customer_content"
                @click="model.consultationTypeModel = true"
            />
            <van-field
                v-model="form.belongMonth"
                label="归属月份"
                disabled
                placeholder="请选择归属月份"
                class="customer_content"
                @click="model.belongMonthModel = true"
            />
            <van-field
                v-model="form.addOrderPrice"
                label="下单金额"
                placeholder="请输入下单金额"
                class="customer_content"
                @input="addOrderPriceInput"
                type="number"
            />
        </div>
        <div>
            <van-popup v-model="model.orderTypeModel" round position="bottom">
                <van-picker
                    show-toolbar
                    :columns="list.orderTypesName"
                    @cancel="model.orderTypeModel = false"
                    @confirm="orderTypeConfirm"
                />
            </van-popup>
            <van-popup v-model="model.orderSourceModel" round position="bottom">
                <van-picker
                    show-toolbar
                    :columns="list.orderSourcesName"
                    @cancel="model.orderSourceModel = false"
                    @confirm="orderSourceConfirm"
                />
            </van-popup>
            <van-popup v-model="model.consultationTypeModel" round position="bottom">
                <van-picker
                    show-toolbar
                    :columns="list.orderConsultationTypesName"
                    @cancel="model.consultationTypeModel = false"
                    @confirm="orderConsultationTypesConfirm"
                />
            </van-popup>
            <van-popup v-model="model.belongMonthModel" round position="bottom">
                <van-picker
                    show-toolbar
                    :columns="list.belongMonthListName"
                    @cancel="model.belongMonthModel = false"
                    @confirm="belongMonthListConfirm"
                />
            </van-popup>
            <van-popup v-model="model.appointmentHospitalIdModel" round position="bottom">
                <van-picker
                    show-toolbar
                    :columns="searchColumns"
                    @cancel="model.appointmentHospitalIdModel = false"
                    @confirm="appointmentHospitalIdConfirm"
                >
                <!-- 添加模糊搜素 -->
                <template #title>
                    <van-field
                        v-model="searchKey"
                        placeholder="请输入医院进行搜索"
                        clearable
                        style="width:200px"
                    />
                </template>
                </van-picker>
            </van-popup>
        </div>
        <div class="bottom">
            <van-button round block type="info"  class="button" @click="prevStep">上一步</van-button>
            <van-button round block type="info"  class="button" @click="nextStep">下一步</van-button>
        </div>
    </div>
</template>
<script>
import * as api from "@/api/order.js";

export default {
    props:{
        active:Number,
        anchorCustomerServiceMessage:Object,
        message:Object
    },
    data(){
        return{
            // 模糊搜索
            searchKey:'',
            searchColumns:[],
            // 用于页面展示
            form:{
                // 订单类型
                orderType:null,
                // 定金金额
                depositAmount:null,
                // 预约门店
                appointmentHospitalId:null,
                // 订单来源
                orderSource:null,
                // 面诊状态
                consultationType:null,
                // 归属月份
                belongMonth:null,
                // 下单金额
                addOrderPrice:null
            },
            // 用于传给接口id
            form2:{
                // 订单类型
                orderType:null,
                // 定金金额
                depositAmount:null,
                // 预约门店
                appointmentHospitalId:null,
                // 订单来源
                orderSource:null,
                // 面诊状态
                consultationType:null,
                // 归属月份
                belongMonth:null,
                // 下单金额
                addOrderPrice:null
            },
            // 获取接口数据
            joggle:{
                // 订单类型
                orderTypes:[],
                // 订单来源
                orderSources:[],
                // 面诊状态
                orderConsultationTypes:[],
                // 归属月份
                belongMonthList:[
                    {
                        id:0,
                        name:'当月'
                    },
                    {
                        id:1,
                        name:'历史'
                    }
                ],
                // 医院
                hospitalInfo:[]
            },
            // model
            model:{
                // 订单类型
                orderTypeModel:false,
                appointmentHospitalIdModel:false,
                orderSourceModel:false,
                consultationTypeModel:false,
                belongMonthModel:false,
            },
            // 用于页面展示数据
            list:{
                orderTypesName:[],
                orderSourcesName:[],
                orderConsultationTypesName:[],
                belongMonthListName:['当月','历史'],
                appointmentHospitalIdName:[]
            }
        }

    },
    methods:{
        prevStep(){
            this.$emit('edidActive2',{
                active:0,
                // anchorCustomerServiceMessage:{
                //     // 订单类型
                //     orderType:null,
                //     // 定金金额
                //     depositAmount:null,
                //     // 预约门店
                //     appointmentHospitalId:null,
                //     // 订单来源
                //     orderSource:null,
                //     // 面诊状态
                //     consultationType:null,
                //     // 归属月份
                //     belongMonth:null,
                //     // 下单金额
                //     addOrderPrice:null
                // },
            })
            sessionStorage.setItem('orderFormName',JSON.stringify(this.form))
            sessionStorage.setItem('orderFormId',JSON.stringify(this.form2))
        },
        nextStep(){
            const {orderType,depositAmount,appointmentHospitalId,orderSource,consultationType,belongMonth,addOrderPrice} = this.form
            if(!orderType){
                this.$toast("请选择订单类型");
                return
            }
            if(depositAmount==2){
                this.$toast("请输入定金金额");
                return
            }
            if(!appointmentHospitalId){
                this.$toast("请选择预约门店");
                return
            }
            if(!orderSource){
                this.$toast("请选择订单来源");
                return
            }
            if(!consultationType){
                this.$toast("请选择面诊状态");
                return
            }
            if(!belongMonth){
                this.$toast("请选择归属月份");
                return
            }
             if(!addOrderPrice){
                this.$toast("请输入下单金额");
                return
            }

            // this.$emit('edidActive',2)
            this.$emit('edidActive2',{
                active:2,
                anchorCustomerServiceMessage:this.form2
            })
            sessionStorage.setItem('orderFormName',JSON.stringify(this.form))
            sessionStorage.setItem('orderFormId',JSON.stringify(this.form2))
        },
        // 获取订单类型
        getCustomerServiceNameList() {
            api.contentPlateFormOrderTypeList().then((res) => {
                this.joggle.orderTypes =res.data.orderTypes;
                let orderTypesName=[]
                this.joggle.orderTypes.map(item=>{
                    orderTypesName.push(item.name)
                })
                this.list.orderTypesName = orderTypesName
            
            });
        },
        // 获取订单来源
        getcontentPlateFormOrderSourceList() {
            api.contentPlateFormOrderSourceList().then((res) => {
                this.joggle.orderSources =res.data.orderSources;
                let orderSourcesName=[]
                this.joggle.orderSources.map(item=>{
                    orderSourcesName.push(item.name)
                })
                this.list.orderSourcesName = orderSourcesName
            
            });
        },
        // 获取面诊状态
        getOrderConsultationTypeLists() {
            api.getOrderConsultationTypeList().then((res) => {
                this.joggle.orderConsultationTypes =res.data.orderConsultationTypes;
                let orderConsultationTypesName=[]
                this.joggle.orderConsultationTypes.map(item=>{
                    orderConsultationTypesName.push(item.name)
                })
                this.list.orderConsultationTypesName = orderConsultationTypesName
            
            });
        },
        // 获取医院
        getHospitalInfo() {
            api.HospitalInfo().then((res) => {
                this.joggle.hospitalInfo =res.data.hospitalInfo;
                let appointmentHospitalIdName=[]
                this.joggle.hospitalInfo.map(item=>{
                    appointmentHospitalIdName.push(item.name)
                })
                this.list.appointmentHospitalIdName = appointmentHospitalIdName
                this.searchColumns = appointmentHospitalIdName

            
            });
        },
        // 
        orderSourceConfirm(value){
            this.form.orderSource = value;
            this.model.orderSourceModel = false;
            // 取id
            this.joggle.orderSources.map((item) => {
                if (item.name == value) {
                this.form2.orderSource = item.id;
                }
            });
        },
        orderTypeConfirm(value){
            this.form.orderType = value;
            this.model.orderTypeModel = false;
            // 取id
            this.joggle.orderTypes.map((item) => {
                if (item.name == value) {
                this.form2.orderType = item.id;
                }
            });
        },
        orderConsultationTypesConfirm(value){
            this.form.consultationType = value;
            this.model.consultationTypeModel = false;
            // 取id
            this.joggle.orderConsultationTypes.map((item) => {
                if (item.name == value) {
                this.form2.consultationType = item.id;
                }
            });
        },
        belongMonthListConfirm(value){
            this.form.belongMonth = value;
            this.model.belongMonthModel = false;
            this.form2.belongMonth = value == '当月' ? 0 : 1;
               
        },
        appointmentHospitalIdConfirm(value){
            this.form.appointmentHospitalId = value;
            this.model.appointmentHospitalIdModel = false;
            this.searchKey = ''
            this.searchColumns = []
            // 取id
            this.joggle.hospitalInfo.map((item) => {
                if (item.name == value) {
                this.form2.appointmentHospitalId = item.id;
                }
            });
        },
        depositAmountInput(value){
            this.form.depositAmount = value
            this.form2.depositAmount = value
        },
        addOrderPriceInput(value){
            this.form.addOrderPrice = value
            this.form2.addOrderPrice = value
        },
    },
    created(){
        this.getCustomerServiceNameList()
        this.getcontentPlateFormOrderSourceList()
        this.getOrderConsultationTypeLists()
        this.getHospitalInfo()
        let orderFormName = JSON.parse(sessionStorage.getItem('orderFormName'))
        let orderFormId = JSON.parse(sessionStorage.getItem('orderFormId'))
        if(orderFormName || orderFormId){
                this.form.orderType = orderFormName.orderType
                this.form.depositAmount = orderFormName.depositAmount ? orderFormName.depositAmount : 0
                this.form.appointmentHospitalId = orderFormName.appointmentHospitalId
                this.form.orderSource = orderFormName.orderSource
                this.form.consultationType = orderFormName.consultationType
                this.form.belongMonth = orderFormName.belongMonth
                this.form.addOrderPrice = orderFormName.addOrderPrice

                this.form2.orderType = orderFormId.orderType
                this.form2.depositAmount = orderFormId.depositAmount ? orderFormId.depositAmount : 0
                this.form2.appointmentHospitalId = orderFormId.appointmentHospitalId
                this.form2.orderSource = orderFormId.orderSource
                this.form2.consultationType = orderFormId.consultationType
                this.form2.belongMonth = orderFormId.belongMonth
                this.form2.addOrderPrice = orderFormId.addOrderPrice
        }
    },
    watch: {  //实时监听搜索输入内容
        searchKey: function () {
            let key = String( this.searchKey );
            key =  key.replace( /\s*/g, "" );//去除搜索内容中的空格
            const reg =  new RegExp( key, "ig" );//匹配规则-i：忽略大小写，g：全局匹配
            /* 进行筛选，将筛选后的数据放入新的数组中，‘name’键可根据需要搜索的key进行调整 */
            this.searchColumns = this.list.appointmentHospitalIdName.filter( item => item.match( reg ) !=null );
        }
    }
}
</script>

<style scoped lang="less">
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
        width: 70px;
        color: #5492fe;
        }
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