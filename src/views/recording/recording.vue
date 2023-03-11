<template>
    <div class="container">
        <div class="step_con">
            <van-steps :active="active"  active-color="#5492FE" style="border-radius: 10px">
                <van-step>主播客服</van-step>
                <van-step>订单信息</van-step>
                <van-step>客户信息</van-step>
                <van-step>其他内容</van-step>
            </van-steps>
        </div>
        <div class="content">
            <!-- 主播客服信息 -->
            <anchorCustomerServiceMessage v-if="active == 0" ref="anchorCustomerServiceMessage" :active="active" @edidActive="edidActive" />
            <!-- 订单信息 -->
            <orderMessage v-else-if="active == 1" ref="anchorCustomerServiceMessage" :active="active" @edidActive2="edidActive2"  />
            <!-- 客户信息 -->
            <customerMessage v-else-if="active == 2" ref="anchorCustomerServiceMessage" :active="active" @edidActive3="edidActive3"  />
            <!-- 其他内容 -->
            <otherContents v-else ref="anchorCustomerServiceMessage" :active="active" @edidActive4="edidActive4" />
        </div>
    </div>
</template>
<script>
import  * as api from "@/api/order.js"
import anchorCustomerServiceMessage from "./components/anchorCustomerServiceMessage.vue"
import orderMessage from "./components/orderMessage.vue"
import customerMessage from "./components/customerMessage.vue"
import otherContents from "./components/otherContents.vue"
export default {
    components:{
        anchorCustomerServiceMessage,
        orderMessage,
        customerMessage,
        otherContents
    },
    data(){
        return{
            active:0,
            message:{
                anchorCustomerServiceMessage:{},
                orderMessage:{},
                customerMessage:{},
                otherContents:{}
            }
        }
    },
    methods:{
        edidActive(value){
            this.active =value.active
            this.message.anchorCustomerServiceMessage = value.anchorCustomerServiceMessage
        },
        edidActive2(value){
            this.active =value.active
            // 如果是上一步（直接覆盖客户主播数据） 如果是下一步单独存储 
            if(value.active == 0){
                this.message.anchorCustomerServiceMessage = value.anchorCustomerServiceMessage
                return
            }else{
                this.message.orderMessage= value.anchorCustomerServiceMessage
            }
            // console.log(this.message,'获取所有数据（订单信息）')
        },
        edidActive3(value){
            this.active =value.active
            // 如果是上一步（直接覆盖客户主播数据） 如果是下一步单独存储 
            if(value.active == 1){
                this.message.orderMessage = value.anchorCustomerServiceMessage
                return
            }else{
                this.message.customerMessage= value.anchorCustomerServiceMessage
            }
            // console.log(this.message,'获取所有数据（客户信息）')
        },
        edidActive4(value){
            this.active =value.active
            // 如果是上一步（直接覆盖客户主播数据） 如果是下一步单独存储 
            if(value.active == 2){
                this.message.customerMessage = value.anchorCustomerServiceMessage
                return
            }else{
                this.message.otherContents= value.anchorCustomerServiceMessage
            }
            // console.log(this.message,'获取所有数据（其他信息）')
        },
    },
    created(){
        sessionStorage.removeItem('anchorFormName')
        sessionStorage.removeItem('anchorFormId')
        sessionStorage.removeItem('orderFormName')
        sessionStorage.removeItem('orderFormId')
        sessionStorage.removeItem('customerFormName')
        sessionStorage.removeItem('customerFormId')
        sessionStorage.removeItem('otherForm')
    }
}
</script>
<style scoped lang="less">
.container{
    width: 100%;
    height: 100vh;
    background: linear-gradient(#8ab4fe,#fff);
    padding-top: 20px;
    box-sizing: border-box;
    .step_con{
        width: 92%;
        background: #fff;
        border-radius: 10px;
        margin: 0 auto;
    }
}
</style>
