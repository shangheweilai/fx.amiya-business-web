<template>
    <div class="container2">
        <div class="date_con">
            <div class="title">{{noonTip}}，{{employeeName}}</div>
            <div class="date">{{todayDate}}，{{week}}</div>
        </div>
        <div class="data_content">
            <div class="customer">
                <span class="customer_title">我的客户</span>
                <span class="customer_num">{{myCustomerCount}}</span>
            </div>
            <div class="customer">
                <span class="customer_title">近期新增</span>
                <span class="customer_num">{{sevenDaysInsertCount}}</span>
            </div>
            <div class="customer">
                <span class="customer_title">今日新增</span>
                <span class="customer_num">{{todayInsertCount}}</span>
            </div>
        </div>
        <div class="report_content">
            <div class="report_list">
                <div class="report_item" @click="duplicateCheckModel = true">
                    <i class="iconfont icon-kehuguanli report_icons2"></i>
                    <div class="report_title">录单</div>
                </div>
                <div class="report_item" @click="$router.push('/orderList')">
                    <i class="iconfont icon-baobiaozhongxin report_icons1"></i>
                    <div  class="report_title" >订单列表</div>
                </div>
                <div class="report_item">
                    <i class="iconfont icon-zy_yuyue report_icons"></i>
                    <div  class="report_title" @click="$router.push('/dispatchList')">派单列表</div>
                </div>
                <div class="report_item">
                    <i class="iconfont icon-zy_yuyue report_icons"></i>
                    <div  class="report_title" @click="dataCenterClick()">数据中心</div>
                </div>
            </div>
        </div>
        <div class="order_content">
            <span class="today_order">今日登记到院订单（{{toHospitalNum}}）</span>
            <span class="all_order" @click="$router.push('/dispatched')">全部订单></span>
        </div>
       
       <!-- 今日到院数据 -->
        <div class="bottom_table"> 
            <tables @tables="tables"/>
        </div>

        <tabbar :active="0" />
        
        <!-- 修改密码 -->
        <!-- <editPassword :isPassword="isPassword" @isPasswordChange="isPasswordChange"/> -->
        <div class="mc" v-if="isLoading"></div>

        <!-- 录单查重 -->
        <van-popup v-model="duplicateCheckModel" position="bottom" class="dispatch_content" round :close-on-click-overlay="false">
            <div class="phone_title">请输入手机号进行查询</div>
            <van-field v-model="phone"  maxlength="11"  />
                        <div class="green" v-if="checkStateTexts == '未绑定或者是与登录id一样'">该顾客手机号是新顾客或已绑定在您的账号下，可按照正常流程进行操作</div>
                        <div class="red" v-else-if="checkStateTexts == '绑定在别人名下'">该顾客手机号已绑定了啊美雅客服，若仍需要录单，您可在管理端向主管提交录单申请！</div> 
                        <div class="red" v-else-if="checkStateTexts == '未审核'">该订单已在录单申请列表进行申请，请等待审核通过后录单！</div>
                        <div class="red" v-else-if="checkStateTexts == '审核通过'">该订单已在录单申请列表进行申请(审核通过)，请在录单申请中录单！</div>
                        <div class="red" v-else-if="checkStateTexts == '审核不通过'">该订单已在录单申请列表进行申请，当前审核不通过，请与主管确认数据信息是否正常！</div>
                        <div class="ts" >温馨提示：查重规则根据该顾客手机号在系统中进行检索，最终反馈结果以系统为准</div>
            <div class="bottom">
                <van-button round block type="default"  class="button" @click="cancel">取消</van-button>
                <van-button round block type="info"  class="button" @click="duplicateCheck" :disabled="isFlag == false">下一步</van-button>
            </div>

                

        </van-popup>
    </div>
</template>
<script>
import  * as api from "@/api/index.js";
import  * as orderApi from "@/api/order.js";

import tables from "./components/tables.vue"
import tabbar from "@/components/tabbar/tabbar.vue"
// import editPassword from '@/components/editPassword/editPassword.vue';
export default {
    components:{
        tables,
        tabbar,
        // editPassword
    },
    data(){
        return{
            isFlag:true,
            // 录单查重model
            duplicateCheckModel:false,
            // 手机号
            phone:'',
            // 穿给页面的手机号
            CustomerPhone:'',
            CustomerServiceNameByPhone:'',
            isLoading:false,
            // 修改密码弹窗
            isPassword:false,
            toHospitalNum:0,
            error: false,
            loading: false,
            finished: false,
            // 判断早中晚
            noonTip:'',
            // 用户名称
            employeeName:sessionStorage.getItem('employeeName'),
            // 当天日期
            todayDate:this.$moment().format("YYYY-MM-DD"),
            // 周几
            week:'',
            // 我的客户信息
            myCustomerCount:sessionStorage.getItem('myCustomerCount'),
            sevenDaysInsertCount:sessionStorage.getItem('sevenDaysInsertCount'),
            todayInsertCount:sessionStorage.getItem('todayInsertCount'),
            readDataCenter:sessionStorage.getItem('readDataCenter'),
            loading: false,
            finished: false,
            // 审核状态
            checkStateTexts:''
        }
    },
    methods:{
        cancel(){
            this.duplicateCheckModel = false
            this.phone = ''
            this.CustomerServiceNameByPhone = ''
        },
        // 关闭子组件修改密码弹窗
        isPasswordChange(value){
            this.isPassword = value
        },
        dataCenterClick(){
            if(this.readDataCenter == 'true'){
                this.$router.push('/dataCenter')
                return false
            }else{
                this.$toast('您当前的角色暂时无法进入，请联系管理员进行角色升级！')
                return
            }
        },
        tables(value){
            this.toHospitalNum = value
        },
        // 判断时间是早中晚
        myNoonTip(){
            const that = this
            const date = new Date()
            const hour = date.getHours();
            if (hour >= 0 && hour < 12) {
                that.noonTip = '上午好'
            }
            else if(hour===12){
                that.noonTip = '中午好'
            }
            else if(hour  > 12 && hour < 18) {
                that.noonTip = '下午好'
            } else {
                that.noonTip = '晚上好'
            }
        },
        //获取周几
        setNowTimes () {  
            let myDate = new Date()  
            let wk = myDate.getDay()  
            let weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
            let week = weeks[wk]  
            this.week = week
        },
        // 获取我的客户信息
        getCustomer(){
            api.getMyCustomer().then((res) => {
                if(res.code == 0){
                    const {myCustomerCount,sevenDaysInsertCount,todayInsertCount} = res.data.myCustomer
                    this.myCustomerCount = myCustomerCount
                    this.sevenDaysInsertCount = sevenDaysInsertCount
                    this.todayInsertCount = todayInsertCount
                    // 加载慢 防止每次刷新都调用接口
                    sessionStorage.setItem('myCustomerCount',myCustomerCount)
                    sessionStorage.setItem('sevenDaysInsertCount',sevenDaysInsertCount)
                    sessionStorage.setItem('todayInsertCount',todayInsertCount)

                }
            })
        },
        // 根据客户手机号查询
        duplicateCheck() {
            if (!this.phone) {
                this.$toast("请输入客户手机号");
                return;
            }
            if (this.phone) {
                if (!/^1[3456789]\d{9}$/.test(this.phone)) {
                this.$toast("请输入正确的手机号");
                return false;
                }
            }
            this.getIsCustomer()
            // this.getbyPhoneContentPlatFormOrderAddWork()
        },
        // 先根据手机号查询是否绑定客服
        getIsCustomer(){
            const data ={
                phone:this.phone
            }
            this.CustomerPhone = this.phone
            this.isFlag= true
            orderApi.getCustomerServiceNameByPhone(data).then(res=>{
                if(res.code === 0){
                    const {CustomerServiceNameByPhone} = res.data
                    this.CustomerServiceNameByPhone = CustomerServiceNameByPhone
                    if(CustomerServiceNameByPhone == '未绑定' || sessionStorage.getItem('employeeName') == CustomerServiceNameByPhone){
                        this.isFlag= false
                        this.checkStateTexts = '未绑定或者是与登录id一样'
                        setTimeout(()=>{
                            this.$router.push({
                                path:'/recording',
                                query:{
                                    phone:this.CustomerPhone,
                                    belongEmpId:CustomerServiceNameByPhone == '未绑定' ? sessionStorage.getItem('employeeName') : CustomerServiceNameByPhone
                                }
                            })
                        },3000)
                    }
                    else{
                        // 录单申请
                        this.isFlag= false
                        orderApi.byPhoneContentPlatFormOrderAddWork(this.phone).then((res) => {
                            if(res.code === 0){
                            const {id,checkStateText} = res.data.contentPlatFormOrderAddWork
                            
                            if(!id){
                                this.checkStateTexts = '绑定在别人名下'
                                setTimeout(()=>{
                                    this.$router.push({
                                        path:'/recordingApplicationList',
                                        query:{
                                            checkStateText:this.checkStateTexts,
                                            phone:this.CustomerPhone,
                                        }
                                    })
                                },3000)
                                return
                            }else{
                                if(checkStateText == '未审核'){
                                this.checkStateTexts = checkStateText
                                this.isFlag= false
                                setTimeout(()=>{
                                    this.$router.push({
                                        path:'/recordingApplicationList',
                                        query:{
                                            checkStateText:checkStateText,
                                            phone:this.CustomerPhone,
                                        }
                                    })
                                },3000)
                                return
                                }else if(checkStateText == '审核通过'){
                                this.checkStateTexts = checkStateText
                                this.isFlag= false
                                setTimeout(()=>{
                                    this.$router.push({
                                        path:'/recordingApplicationList',
                                        query:{
                                            checkStateText:checkStateText,
                                            phone:this.CustomerPhone,
                                        }
                                    })
                                },3000)
                                return
                                }
                                else if(checkStateText == '审核不通过'){
                                this.checkStateTexts = checkStateText
                                this.isFlag= false
                                setTimeout(()=>{
                                    this.$router.push({
                                        path:'/recordingApplicationList',
                                        query:{
                                            checkStateText:checkStateText,
                                            phone:this.CustomerPhone,
                                        }
                                    })
                                },3000)
                                
                                return
                                }
                            }
                            }
                        })
                    }
                }else{
                    this.$toast(res.msg)
                }
            })
        },
        // 根据录单申请手机号获取录单申请信息
        getbyPhoneContentPlatFormOrderAddWork(){
            orderApi.byPhoneContentPlatFormOrderAddWork(this.phone).then((res) => {
                if(res.code === 0){
                const {id,checkStateText} = res.data.contentPlatFormOrderAddWork
                if(!id){
                    this.checkStateTexts = '没数据'
                    this.getCustomerPhone()
                    return
                }else{
                    if(checkStateText == '未审核'){
                    this.checkStateTexts = checkStateText
                    this.isFlag= false
                    setTimeout(()=>{
                        this.$router.push({
                            path:'/recordingApplicationList',
                            query:{
                                checkStateText:checkStateText
                            }
                        })
                    },3000)
                     this.$router.push({
                            path:'/recordingApplicationList',
                            query:{
                                checkStateText:checkStateText
                            }
                        })
                    return
                    }else if(checkStateText == '审核通过'){
                    this.checkStateTexts = checkStateText
                    this.isFlag= false
                    setTimeout(()=>{
                        this.$router.push({
                            path:'/recordingApplicationList',
                            query:{
                                checkStateText:checkStateText
                            }
                        })
                    },3000)
                    
                    return
                    }
                }
                }
            })
        },
        // 根据手机号查询是否绑定客服
        getCustomerPhone(){
             const data ={
                phone:this.phone
            }
            this.CustomerPhone = this.phone
            this.isFlag= true
            orderApi.getCustomerServiceNameByPhone(data).then(res=>{
                if(res.code === 0){
                    const {CustomerServiceNameByPhone} = res.data
                    this.CustomerServiceNameByPhone = CustomerServiceNameByPhone
                    if(CustomerServiceNameByPhone == '未绑定' || sessionStorage.getItem('employeeName') == CustomerServiceNameByPhone){
                        this.isFlag= false
                        setTimeout(()=>{
                            this.$router.push({
                                path:'/recording',
                                query:{
                                    phone:this.CustomerPhone,
                                    belongEmpId:CustomerServiceNameByPhone == '未绑定' ? sessionStorage.getItem('employeeName') : CustomerServiceNameByPhone
                                }
                            })
                        },3000)
                    }else{
                        // 录单申请
                        this.isFlag= false
                        setTimeout(() => {
                            this.$router.push({
                                path:'/recordingApplicationList',
                                query:{
                                    phone:this.CustomerPhone,
                                }
                            })
                        }, 3000);
                    }
                }else{
                    this.$toast(res.msg)
                }
            })
        },
    },
    created(){
        
        this.myNoonTip()
        this.setNowTimes()
        if(!sessionStorage.getItem('myCustomerCount')){
            this.isLoading = true
            this.getCustomer()
            this.$toast.loading({
                message: '数据正在努力加载中，请耐心等待',
                duration: 3000,
                position: "center",
            });
            setTimeout(()=>{
                this.isLoading = false
            },3000)
        }
        // // 检测当前密码是否合法
        // userApi.checkPassword(sessionStorage.getItem("password")).then((res) => {
        //     if (res.code === 0) {
        //         const { islegitimate } = res.data;
        //         if (!islegitimate) {
        //             this.$toast.fail({
        //                 content: "密码不合法,请修改密码",
        //                 duration: 3,
        //             });
        //             this.isPassword = true;
        //         }
        //     }
        // });
    },
    
}
</script>
<style scoped lang="less">
/deep/.van-cell::after{
    border: none;
}
/deep/.van-field__control{
    width: 80%;
    background: #f8f4f4;
    color: #000;
    padding:  5px 5px 5px 10px;
    margin: 0 auto ;
    border-radius: 6px;
}
.container2{
    width: 100%;
    height: 100%;
    position:relative;
    // background-image: url(../../assets/workbench_bg.png) ;
    // background-size: 100% 100%;
    background: linear-gradient(#5492FE, #fff);
    // overflow-x: hidden;
    overflow-y: hidden;
    .red{
        color: red;
        margin-top: 10px;
        font-size: 12px;
    }
    .green{
        color: green;
        margin-top: 10px;
        font-size: 12px;
        padding: 0 20px;
        margin-bottom: 20px;
    }
    .phone_title{
        padding: 20px 0 10px 20px;
        box-sizing: border-box;
        text-align: center;
        font-size: 14px;
        font-weight: bold;
    }
    .red{
        color: red;
        padding: 0 20px;
        margin-bottom: 20px;
    }
    .green{
        color: green;
        margin-top: 10px;
        font-size: 12px;
        padding: 0 20px;
        margin-bottom: 20px;
    }
    .mc{
        width: 100%;
        height: 100vh;
        position: fixed;
        top: 0 ;
        left: 0;
        background: #000;
        opacity: 0.3;
        z-index: 999;
    }
    .date_con{
        padding: 7% 0 0 10%;
        box-sizing: border-box;
        color: #fff;
        .date{
            font-size: 12px;
        }
    }
    .title{
        font-size: 16px;
        margin-bottom: 5px;
    }
    .data{
        font-size: 14px;
    }
    .data_content{
        width: 88%;
        height: 75px;
        background-image: url(../../assets/workbench.png) ;
        background-size: 100% 100%;
        border-radius: 10px/10px;
        margin: 15px auto 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 5%;
        box-sizing: border-box;
        color: #5492FE;
        .customer{
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-direction: column;
            font-size: 13px;
            // color: #5492FE;
            padding: 0 10px;
            box-sizing: border-box;
        }
        .customer_num{
            margin-top: 5px;
        }
    }
    .report_content{
        margin-top: 20px;
        .report_list{
            display: flex;
            justify-content: space-between;
            color: #fff;
            padding: 0 10px;
            box-sizing: border-box;
            .report_item{
                width: 80px;
                height: 80px;
                background: linear-gradient(#8ab4fe,#5492FE);
                display: flex;
                flex-direction: column;
                margin: 5px 0;
                border-radius: 10px;
               
                align-items: center;
                justify-content: center;
                .report_icons1{
                    font-size: 22px;
                    margin-bottom: 5px;
                }
                .report_icons{
                    font-size: 24px;
                    margin-bottom: 5px;
                }
                .report_icons2{
                    font-size: 26px;
                    margin-bottom: 5px;
                }
                .report_title{
                    font-size: 12px;
                }
            }
        }
    }
    .order_content{
        margin-top: 15px;
        display: flex;
        justify-content: space-between;
        padding: 0 15px;
        .today_order{
            color: #000;
        }
        .all_order{
            color: #797777;
            font-size: 13px;
        }

    }
    .bottom_table{
        margin:20px 0 0 ;
        // height: 50%;
        height: 45%;
        overflow: scroll;
        // background: red;
    }
    .bottom{
        display: flex;
        margin-top: 20px;
        padding-bottom: 30px;
        .button{
            width: 40%;
            height: 42px;
            margin:0 auto
        }
        
    }
    .button2{
        width: 30%;
        height: 30px;
        margin:8px auto 40px;
        margin-bottom: 40px;

    }
    .ts{
        font-size: 12px;
        padding: 0 20px;
        box-sizing: border-box;
        padding-bottom: 20px;
    }
}
</style>
