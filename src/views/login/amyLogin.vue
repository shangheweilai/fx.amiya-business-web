<template>
<!-- 啊美雅账号密码登录页面 -->
  <div class="container">
    <img :src="logo" alt="" class="logo">
    <div class="login_content">
      <van-cell-group>
        <van-field
          v-model="username"
          label="账号"
          left-icon="manager"
          placeholder="请输入账号"
          style="border-radius: 5px/5px;border:none"
        />
      </van-cell-group>
      <van-cell-group>
        <van-field
          v-model="password"
          clearable
          label="密码"
          left-icon="lock"
          placeholder="请输入密码"
          style="border-radius: 5px/5px;border:none"
          type="password"
          
        />
      </van-cell-group>
      <van-button round block type="info"  class="button" @click="onSubmit">登录</van-button>
      <div class="title" @click="qwLogin">企业微信授权登录</div>
    </div>
  </div>
</template>

<script>
import logo from "@/assets/amy.png"
import  * as api from "@/api/user.js"
export default {
  components: {
   
  },
  data() {
    return {
     logo,
     username: '',
     password: '',
     userInfo: window.sessionStorage.getItem("userInfo") ? JSON.parse(window.sessionStorage.getItem("userInfo")) : {employeeName:"",userId:''},
    };
  },
  methods: {
      // 啊美雅账号密码登录
      onSubmit() {
        if(!this.username){
          this.$toast('请输入账号');
          return
        }
        if(!this.password){
          this.$toast('请输入密码');
          return
        }
        const data = {
          userName : this.username,
          password : this.password,
          userId:this.userInfo.userId,
          code:this.userInfo.code
        }
         api.amiyaLogin(data).then((res) => {
          if (res.code == 0) {
            const {token,employeeName,employeeId,amiyaPositionId,departmentId,departmentName,employeeType,refreshToken,readDataCenter,readLiveAnchorData,isDirector} = res.data.amiyaLogin
            sessionStorage.setItem('userName',this.username)
            sessionStorage.setItem('password',this.password)
            sessionStorage.setItem('employeeId',employeeId)
            sessionStorage.setItem('employeeName',employeeName)
            sessionStorage.setItem('amiyaPositionId',amiyaPositionId)
            sessionStorage.setItem('departmentId',departmentId)
            sessionStorage.setItem('employeeType',employeeType)
            sessionStorage.setItem('departmentName',departmentName)
            sessionStorage.setItem('refreshToken',refreshToken)
            sessionStorage.setItem("token", token);
            sessionStorage.setItem('readDataCenter',readDataCenter)
            sessionStorage.setItem('readLiveAnchorData',readLiveAnchorData)
            sessionStorage.setItem('isDirector',isDirector)

            this.$toast.success('登录成功');
            this.$router.push({path:'/workbench'})
          }else{
            this.$toast(res.msg)
          }
        });
      },
      qwLogin(){
        // this.$toast('暂时无法提供授权，请使用啊美雅账号密码登录')
        this.$router.go(-1)
      }
  },
  created() {
    
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
      border:none
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
    }
  }
 
}

</style>