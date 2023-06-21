<template>
    <div class="containers">
        <div class="my_data" >
            <div class="item">
                <span>头像</span>
                <!-- <van-uploader :after-read="afterReadClick" :max-count="1" :max-size="5 * 1024 * 1024" @oversize="onOversize" :before-read="beforeRead" v-if="this.form.avatar.length<1"/>
                <van-image width="30" height="30" :src="employeeInfo.avatar" v-else/> -->
                <div  class="img_content">
                    <div v-for="(item,index) in form.avatar" :key="index" style="display:flex;" @click="deletClick(index)">
                    <div class="img_item">
                        <viewer v-if="item"  baseLayerPicker ="true" >
                          <img :src="item" alt=""  class="img" >
                        </viewer>
                        <!-- <span class="opacity_con"  @click="deletClick(index)">x</span> -->
                    </div>
                    </div>
                    <van-uploader :after-read="afterReadClick" :max-count="1" :max-size="1 * 1024 * 1024" @oversize="onOversize" :before-read="beforeRead" v-if="form.avatar.length<1"/>
                </div>
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
import * as api from "@/api/order.js";

import editPassword from '@/components/editPassword/editPassword.vue'
export default {
    components:{
        editPassword
    },
    data(){
        return{
             // 头像
            form:{
                avatar:[sessionStorage.getItem('avatar') ? sessionStorage.getItem('avatar') : 'https://ameiya.oss-cn-hangzhou.aliyuncs.com/9a17d0afbb844465b90462e96d0702bb.jpg']
            },
            // 是否显示弹窗
            isPassword:false,
            // 获取父页面数据
            employeeInfo:this.$route.query.employeeInfo,

            isPassword:false,
            
            employeeType:sessionStorage.getItem('employeeType')
        }
    },
    methods:{
        beforeRead(file) {
        if (!/(jpg|jpeg|png|JPG|PNG)/i.test(file.type)) {
            this.$toast("请上传正确格式的图片！");
            return false;
        }
        return true;
        },
        onOversize(file) {
        this.$toast("只能上传5M以内的图片！");
        },
        deletClick(index){
        this.form.avatar.splice(index, 1)
        },
        afterReadClick(file){
        // 此时可以自行将文件上传至服务器
        let content = file.file;
            let data = new FormData();
            data.append('uploadfile',content);
            api.upload(data).then(res=>{
            if(res.code == 0){
                this.form.avatar.push(res.data.url)
                this.updateAvatar()
                return
            }else if(res.code == 404){
                this.$toast("上传失败！");
                return
            }
            })
        },
        // 修改头像
        updateAvatar(){
            const data = {
                id:sessionStorage.getItem('employeeId'),
                url:this.form.avatar[0]
            }
            api.updateAvatar(data).then(res=>{
                if(res.code === 0){
                    sessionStorage.setItem('avatar',res.data.avatar)
                }
            })
        },
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
/deep/ .van-uploader__upload{
    width: 30px;
    height: 30px;
    margin-top: 7px;
}
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
            .img_content{
                display: flex;
                .img_item{
                position:relative;
                margin-right:5px;
                .img{
                    width:30px;
                    height:30px;
                    margin-top: 3px;
                    border-radius: 50%;
                }
                .opacity_con{
                    background:#000;
                    position:absolute;
                    right:0;
                    top:0;
                    opacity:0.2;
                    padding:1px 4px;
                    box-sizing:border-box;
                    color:#fff;
                    margin-top: 7px;
                }
                }
            }
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
