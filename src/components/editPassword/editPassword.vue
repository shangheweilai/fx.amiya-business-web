<template>
    <div>
        <van-popup v-model="isPasswords" :close-on-click-overlay="false" style="width:90%">
            <!-- <div class="edit_title">修改密码</div> -->
            <van-cell-group>
                <van-field
                    v-model="oldPassword"
                    label="旧密码"
                    placeholder="请输入旧密码"
                    style="border-radius: 5px/5px;border:none;margin-top:30px"
                    type="password"
                />
            </van-cell-group>
            <van-cell-group>
                <van-field
                    v-model="newPassword"
                    clearable
                    label="新密码"
                    placeholder="请输入数字加字母最少8位的密码"
                    style="border-radius: 5px/5px;border:none"
                    type="password"
                />
            </van-cell-group>
            <div class="button_con">
                <span class="cancel" @click="cancel">取消</span>
                <span class="confim" @click="confim">确认</span>
            </div>
        </van-popup>
    </div>
</template>
<script>
import  * as api from "@/api/user.js";

export default {
    props:{
        isPassword:Boolean
    },
    data(){
        return{
            // 旧密码
            oldPassword:'',
            // 新密码
            newPassword:'',
            isPasswords:false
        }
    },
    methods:{
        cancel(){
            this.$emit("isPasswordChange",false);
        },
        confim(){
            // this.$emit("isPasswordChange",false);
            if(!this.oldPassword){
                this.$toast('请输入旧密码')
                return
            }
            if(!this.newPassword){
                this.$toast('请输入新密码')
                return
            }
            const data ={
                oldPassword: this.oldPassword,
                newPassword: this.newPassword,
            }
            api.updatePassword(data).then(res=>{
                if(res.code === 0){
                    this.$toast.success('密码修改成功，请重新登录！')
                    this.oldPassword = ''
                    this.newPassword = ''
                    this.$emit("isPasswordChange",false);
                    setTimeout(()=>{
                        sessionStorage.clear();
                        this.$router.push('/')
                    },2000)
                    
                }else{
                    this.$toast(res.msg)
                }
            })
        }
    },
    watch:{
       isPassword(value){
        this.isPasswords = value
       }
    }
}
</script>
<style scoped lang="less">
.van-popup ,.van-popup--center{
    border-radius: 10px;
}
/deep/.van-cell__title ,.van-field__label{
    width: 15%;
}
.button_con{
        margin: 20px 0;
        display: flex;
        justify-content: flex-end;
        font-size: 14px;
        .cancel{
            background: #ccc;
            color: #fff;
            padding: 5px 30px;
            box-sizing: border-box;
            border-radius: 20px;
        }
        .confim{
            background: #5492fe;
            color: #fff;
            padding: 5px 30px;
            box-sizing: border-box;
            margin: 0 10px;
            border-radius: 20px;
        }
    }
</style>
