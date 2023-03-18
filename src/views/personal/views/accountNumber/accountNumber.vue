<template>
    <div class="containers">
        <div class="my_data" >
            <div class="item">
                <span>头像</span>
                <van-image width="30" height="30" :src="employeeInfo.avatar" />
            </div>
        </div>
        <div class="content">
            <div class="item2">
                <span>手机号</span>
                <span>{{employeeInfo.userName}}</span>
            </div>
            <div class="item2">
                <span>邮箱</span>
                <span>{{employeeInfo.email}}</span>
            </div>
            <div class="item2" @click="isPassword = true">
                <span>修改密码</span>
                <i class="iconfont icon-jinrujiantouxiao icon_jt"></i>
            </div>
        </div>
        <div class="my_data3" >
            <div class="item3" @click="withdrawLogin">退出登录</div>
        </div>
        <!-- 修改密码 -->
        <editPassword :isPassword="isPassword" @isPasswordChange="isPasswordChange"/>
    </div>
</template>
<script>
import editPassword from '@/components/editPassword/editPassword.vue'
export default {
    components:{
        editPassword
    },
    data(){
        return{
            // 是否显示弹窗
            isPassword:false,
            // 获取父页面数据
            employeeInfo:this.$route.query.employeeInfo,
            isPassword:false,
            employeeType:sessionStorage.getItem('employeeType')
        }
    },
    methods:{
        // 关闭子组件修改密码弹窗
        isPasswordChange(value){
            this.isPassword = value
        },
        // 退出登录
        withdrawLogin(){
            sessionStorage.clear();
            this.$router.push('/')
            
        }
    },
    created(){
        
    }
}
</script>
<style lang="less" scoped>

/deep/.van-image__img {
  border-radius: 50%;
  margin-top: 2px;
}
.containers{
    width: 100%;
    height: 100vh;
    background: linear-gradient(#8ab4fe, #fff);
    padding:15px;
    box-sizing: border-box;
    .my_data {
        border-radius: 7px;
        box-shadow: 0px 15px 10px -15px #fff;
        color: #457be3;
        .item {
            font-size: 14px;
            background: #fff;
            padding: 0 10px;
            box-sizing: border-box;
            width: 100%;
            height: 45px;
            display: flex;
            justify-content: space-between;
            border-radius: 7px;
            align-items: center;
        }
    }
    .my_data3 {
        border-radius: 7px;
        box-shadow: 0px 15px 10px -15px #8ab4fe;
        color: #9A9393;
        .item3{
            width: 100%;
            height: 45px;
            line-height: 45px;
            text-align: center;
            background: #fff;
            border-radius: 7px;
            box-shadow: 0px 15px 10px -15px #8ab4fe;
            color: red;
        }
    }
    .content{
        width: 100%;
        background: #fff;
        color: #457be3;
        box-shadow: 0px 15px 10px -15px #8ab4fe;
        margin: 15px 0;
        border-radius: 7px;
        font-size: 14px;
        .item2{
            font-size: 14px;
            padding: 0 10px;
            box-sizing: border-box;
            width: 100%;
            height: 45px;
            display: flex;
            justify-content: space-between;
            border-radius: 7px;
            align-items: center;
            border-bottom: 1px solid #f5f5f5;
            .icon_jt {
                font-size: 12px;
            }
        }
    }
    
    
}
</style>
