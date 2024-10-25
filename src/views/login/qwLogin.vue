<template>
<!-- 企业微信授权登录页面 -->
  <div class="container">
    <img :src="logo" alt="" class="logo">
    <div class="login_content">
      <van-cell-group>
        <van-field
          v-model="userInfo.employeeName"
          label="账号"
          left-icon="manager"
          placeholder="请输入账号"
          style="border-radius: 5px/5px;"
          disabled
        />
      </van-cell-group>
      <van-cell-group>
        <van-field
          v-model="userInfo.userId"
          label="名称"
          left-icon="friends" 
          placeholder="请输入名称"
          style="border-radius: 5px/5px;"
          disabled
        />
      </van-cell-group>
      <van-button round block type="info"  class="button" @click="onSubmit">登录</van-button>
      <div class="title" @click="$router.push('/amyLogin')">啊美雅账号登录</div>
    </div>
  </div>
</template>

<script>
import logo from "@/assets/amy.png" 
import  * as api from "@/api/user.js"
import axios from "axios";
import * as myApi from "@/api/my.js";

export default {
  components: {
   
  },
  data() {
    return {
     logo,
     userInfo: window.sessionStorage.getItem("userInfo") ? JSON.parse(window.sessionStorage.getItem("userInfo")) : {employeeName:"",userId:''},
    };
  },
  mounted(){
     this.getIp()
  },
  methods: {
    // 获取该员工登录的账号信息
    getAmiyaEmployee() {
      let employeeId = Number(sessionStorage.getItem("employeeId"))
      myApi.AmiyaEmployee(employeeId).then((res) => {
        if (res.code === 0) {
          const {liveAnchorBaseId} = res.data.employeeInfo
          sessionStorage.setItem('liveAnchorBaseId',liveAnchorBaseId)
        } else {
          this.$toast(res.msg);
        }
      });
    },
    // 获取按钮权限
    getPermissions(){
      api.collection().then((res) => {
        if(res.code === 0){
          const {permissions} =  res.data.permissions
            sessionStorage.setItem("permissions", JSON.stringify(permissions));
        }
      })
    },
    getIp(){
        // 获取主机名 
      axios.get('http://localhost:5000/getMyComputerName').then(res=>{
          const ip = res.data.split("\n",1);
          sessionStorage.setItem('hostName',ip[0])
      })
      // 获取客户端IP 网络IP
      axios.get('https://myip.ipip.net/').then(res=>{
          sessionStorage.setItem('ip',res.data)
      })
      },
      onSubmit() {
        if(!this.userInfo.employeeName){
          this.$toast({
              message: '企业微信授权失败，请使用啊美雅账号密码登录!',
              position: "bottom",
              duration:3000
          });
          return
        }
        if(!this.userInfo.userId){
          this.$toast({
              message: '企业微信授权失败，请使用啊美雅账号密码登录!',
              position: "bottom",
              duration:3000
          });
          return
        }
       
        const data = { 
          userId :this.userInfo.userId,
          code :this.userInfo.code,
          ip:sessionStorage.getItem("ip"),
          hostName:sessionStorage.getItem("hostName")
        }
        
        api.qwAmiyaLoginByUserIdAndCode(data).then((res)=>{
          if(res.code == 0){
            const {employeeName,employeeId,amiyaPositionId,amiyaPositionName,token,departmentName,departmentId,refreshToken,readDataCenter,userId,code,readLiveAnchorData,isDirector,isCustomerService,readSelfLiveAnchorData,readCooperateLiveAnchorData,readTakeGoodsData} = res.data.amiyaLoginByUserIdAndCode
            sessionStorage.setItem('employeeName',employeeName)
            sessionStorage.setItem('employeeId',employeeId)
            sessionStorage.setItem('amiyaPositionId',amiyaPositionId)
            sessionStorage.setItem('amiyaPositionName',amiyaPositionName)
            sessionStorage.setItem('token',token)
            sessionStorage.setItem('refreshToken',refreshToken)
            sessionStorage.setItem('departmentId',departmentId)
            sessionStorage.setItem('departmentName',departmentName)
            sessionStorage.setItem('readDataCenter',readDataCenter)
            sessionStorage.setItem('userId',userId)
            sessionStorage.setItem('code',code)
            sessionStorage.setItem('readLiveAnchorData',readLiveAnchorData)
            sessionStorage.setItem('isDirector',isDirector)
            sessionStorage.setItem('isCustomerService',isCustomerService)
            sessionStorage.setItem('readSelfLiveAnchorData',readSelfLiveAnchorData)
            sessionStorage.setItem('readCooperateLiveAnchorData',readCooperateLiveAnchorData)
            sessionStorage.setItem('readTakeGoodsData',readTakeGoodsData)
            // 按钮权限
            this.getPermissions()
            // 根据员工id获取基础主播
            this.getAmiyaEmployee()
            this.$toast.success('登录成功');
            this.$router.push({path:'/workbench'});
          }
        })
      },
  },
  created() {
    if(window.sessionStorage.getItem("errorMessage")){
      this.$toast({
          message: window.sessionStorage.getItem("errorMessage"),
          position: "bottom",
          duration:5000
      });
      return
    }
  },
};
</script>
<style lang='less' scoped>
.container::-webkit-scrollbar {
  display: none;
}
.container{
  width: 100%;
  height: 100vh;
  position:relative;
  background-image: url(../../assets/login.png) ;
  background-size: 100% 100%;
  overflow-x: hidden;
  overflow-y: hidden;
  .logo{
    width: 120px;
    height: 120px;
    position: absolute;
    left: 50%;
    top: 12%;
    margin-left: -60px;
  }
  .login_content{
    width: 80%;
    height: 100px;
    position: absolute;
    left: 50%;
    top: 37%;
    margin-left: -40%;
    .line{
      margin-top: 10px;
    }
    /deep/.van-cell__title ,.van-field__label{
      width: 15%;
    }
    /deep/.van-cell-group{
      margin: 10px 0;
    }
    /deep/.van-cell-group ,.van-hairline--top-bottom{
      border-radius: 50px/50px;
    }
    .button{
      width: 60%;
      height: 35px;
      margin: 0 auto;
    }
    .title{
      text-align: center;
      color: #2D8CF0;
      font-size: 14px;
      margin-top: 10px;
      cursor: pointer;
    }
  }
 
}

</style>