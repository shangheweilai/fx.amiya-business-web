<template>
    <div class="container">
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
                <div class="report_item" @click="recordingClick">
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
            <span class="all_order" @click="$router.push('/orderList')">全部订单></span>
        </div>
       
       <!-- 今日到院数据 -->
        <div class="bottom_table"> 
            <tables @tables="tables"/>
        </div>
    </div>
</template>
<script>
import  * as api from "@/api/index.js";
import tables from "./components/tables.vue"
export default {
    components:{
        tables,
    },
    data(){
        return{
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
        }
    },
    methods:{
        dataCenterClick(){
            if(this.readDataCenter == 'true'){
                this.$router.push('/dataCenter')
                return false
            }else{
                this.$toast('你暂无权限查看')
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
        recordingClick(){
            this.$router.push('/recording')
        }
    },
    created(){
        this.myNoonTip()
        this.setNowTimes()
        if(!sessionStorage.getItem('myCustomerCount')){
            this.getCustomer()
        }
        // this.getTodayToHospitalInfo()
    },
    
}
</script>
<style scoped lang="less">
.container{
    width: 100%;
    height: 100vh;
    position:relative;
    background-image: url(../../assets/workbench_bg.png) ;
    background-size: 100% 100%;
    // overflow-x: hidden;
    // overflow-y: hidden;
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
        .customer{
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-direction: column;
            font-size: 13px;
            color: #5492FE;
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
        margin:20px 0 ;
        height: 50%;
        overflow: scroll;
        // background: red;
    }
}
</style>
