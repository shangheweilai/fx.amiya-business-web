<template>
  <div class="content">
    <div class="anchor">其他内容</div>
    <div>
      <van-field
        v-model="form.consultingContent"
        label="咨询内容"
        placeholder="请输入咨询内容"
        class="customer_content"
        @input="consultingContentInput"
        type="textarea"
        :rows="4"
      />
      <van-field
        v-model="form.unSendReason"
        label="未派单原因"
        placeholder="请输入未派单原因"
        class="customer_content"
        @input="unSendReasonInput"
        type="textarea"
        :rows="4"
      />
      <van-field
        v-model="form.lateProjectStage"
        label="后期项目铺垫"
        placeholder="请输入后期项目铺垫"
        class="customer_content"
        @input="lateProjectStageInput"
        type="textarea"
        :rows="4"
      />
      <van-field
        v-model="form.remark"
        label="备注"
        placeholder="请输入备注"
        class="customer_content"
        @input="remarkInput"
        type="textarea"
        :rows="4"
      />
    </div>
    <div class="bottom">
      <van-button round block type="info" class="button" @click="prevStep"
        >上一步</van-button
      >
      <van-button round block type="info" class="button" @click="nextStep"
        >完成</van-button
      >
    </div>
  </div>
</template>
<script>
import * as api from "@/api/order.js";
export default {
  props: {
    active: Number,
    anchorCustomerServiceMessage: Object,
    message:Object
  },
  data() {
    return {
      // 用于页面展示
      form: {
        // 咨询内容
        consultingContent: "",
        // 未派单原因
        unSendReason: "",
        // 后期铺垫
        lateProjectStage: "",
        // 备注
        remark: "",
      },
      
    };
  },
  methods: {
    prevStep() {
      this.$emit("edidActive4", {
        active: 2,
       
      });
    },
    nextStep() {
      this.$emit("edidActive4", {
        active: 4,
        anchorCustomerServiceMessage: this.form,
      });
      const {anchorCustomerServiceMessage,customerMessage,orderMessage,otherContents} = this.message
      const data = {
        id:this.$route.query.orderInfo.id,
        // 主播客服数据
        belongEmpId:Number(anchorCustomerServiceMessage.belongEmpId),
        contentPlateFormId:anchorCustomerServiceMessage.contentPlateFormId,
        goodsId:anchorCustomerServiceMessage.goodsId,
        hospitalDepartmentId:anchorCustomerServiceMessage.hospitalDepartmentId,
        liveAnchorId:Number(anchorCustomerServiceMessage.liveAnchorId),
        liveAnchorWeChatNo:anchorCustomerServiceMessage.liveAnchorWeChatNo,
        // 客户信息
        birthday:customerMessage.birthday ? customerMessage.birthday : null,
        city:customerMessage.city,
        customerName:customerMessage.customerName,
        occupation:customerMessage.occupation,
        phone:customerMessage.phone,
        sex:customerMessage.sex,
        wechatNumber:customerMessage.wechatNumber,
        // 订单信息
        addOrderPirce:Number(orderMessage.addOrderPrice), 
        appointmentHospitalId:Number(orderMessage.appointmentHospitalId),
        belongMonth:Number(orderMessage.belongMonth),
        consultationType:Number(orderMessage.consultationType),
        depositAmount:Number(orderMessage.depositAmount),
        orderSource:Number(orderMessage.orderSource),
        orderType:Number(orderMessage.orderType),
        // 其他内容
        consultingContent:otherContents.consultingContent,
        lateProjectStage:otherContents.lateProjectStage,
        remark:otherContents.remark,
        unSendReason:otherContents.unSendReason,
        appointmentDate:null,
        customerPictures:[],
        consultationEmpId:0,
        acceptConsulting:''
      }
      api.updateContentPlateFormOrder(data).then((res) => {
        if(res.code === 0){
            this.$toast("编辑成功");
            // 返回上一页面且刷新页面
            this.$router.go(-1)
        }else{
            this.$toast(res.msg)
        }
      })
    },
    consultingContentInput(value) {
      this.form.consultingContent = value;
    },
    unSendReasonInput(value) {
      this.form.unSendReason = value;
    },
    remarkInput(value) {
      this.form.remark = value;
    },
    lateProjectStageInput(value) {
      this.form.lateProjectStage = value;
    },
    
  },
  created() {
    const {consultingContent,unSendReason,lateProjectStage,remark} = this.$route.query.orderInfo
    this.form.consultingContent = consultingContent
    this.form.unSendReason = unSendReason
    this.form.lateProjectStage = lateProjectStage
    this.form.remark = remark
    
  },
};
</script>

<style scoped lang="less">
.content {
  width: 92%;
  background: #fff;
  // height: 505px;
  margin: 20px auto 20px;
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
  .bottom {
    display: flex;
    margin-top: 20px;
    .button {
      width: 40%;
      height: 42px;
      margin: 0 auto 20px;
    }
  }
}
</style>
