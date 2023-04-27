<template>
  <div class="content">
    <div class="anchor">主播客服信息</div>
    <div>
      <!-- <van-field
        v-model="form.belongEmpId"
        label="绑定客服"
        disabled
        @click="belongEmpIdClick"
        placeholder="请选择绑定客服"
        class="customer_content"
      /> -->
      <van-field
        v-model="form.contentPlateFormId"
        label="主播平台"
        disabled
        @click="contentPlateFormIdModel =  true;form.liveAnchorId='';form2.liveAnchorId='';form.liveAnchorWeChatNo=null;form2.liveAnchorWeChatNo=null"
        placeholder="请选择主播平台"
        class="customer_content"
      />
      <van-field
        v-model="form.liveAnchorId"
        label="主播IP号"
        disabled
        @click="liveAnchorIdClick"
        placeholder="请选择主播IP号"
        class="customer_content"
      />
      <van-field
        v-model="form.liveAnchorWeChatNo"
        label="主播微信号"
        disabled
        @click="liveAnchorWeChatNoClick"
        placeholder="请选择主播微信号"
        class="customer_content"
      />
      <van-field
        v-model="form.hospitalDepartmentId"
        label="科室"
        disabled
        @click="hospitalDepartmentIdModel = true;form.goodsId='';form2.goodsId=''"
        placeholder="请选择科室"
        class="customer_content"
      />
      <van-field
        v-model="form.goodsId"
        label="需求"
        disabled
        @click="goodsIdClick"
        placeholder="请选择需求"
        class="customer_content"
      />
    </div>
    <div class="bottom">
        <van-button round block type="info"  class="button" @click="nextStep">下一步</van-button>
    </div>
    <!-- 绑定客服 -->
    <van-popup v-model="belongEmpIdModel" round position="bottom">
      <van-picker
        show-toolbar
        :columns="searchColumns"
        @cancel="belongEmpIdModel = false"
        @confirm="belongEmpIdConfirm"
      >
        <!-- 添加模糊搜素 -->
        <template #title>
            <van-field
                v-model="searchKey"
                placeholder="请输入绑定客服进行搜索"
                clearable
                style="width:200px"
            />
        </template>
      </van-picker>
    </van-popup>
    <!-- 平台 -->
    <van-popup v-model="contentPlateFormIdModel" round position="bottom">
      <van-picker
        show-toolbar
        :columns="terraceName"
        @cancel="contentPlateFormIdModel=false"
        @confirm="contentPlateFormIdConfirm"
      />
    </van-popup>
    <!-- 主播IP -->
    <van-popup v-model="liveAnchorIdModel" round position="bottom">
      <van-picker
        show-toolbar
        :columns="liveAnchorName"
        @cancel="liveAnchorIdModel = false"
        @confirm="liveAnchorIdConfirm"
      />
    </van-popup>
    <!-- 主播微信号 -->
    <van-popup v-model="liveAnchorWeChatNoModel" round position="bottom">
      <van-picker
        show-toolbar
        :columns="liveAnchorWeChatNoName"
        @cancel="liveAnchorWeChatNoModel = false"
        @confirm="liveAnchorWeChatNoConfirm"
      />
    </van-popup>
    <!-- 科室 -->
    <van-popup v-model="hospitalDepartmentIdModel" round position="bottom">
      <van-picker
        show-toolbar
        :columns="hospitalDepartmentName"
        @cancel="hospitalDepartmentIdModel = false"
        @confirm="hospitalDepartmentIdConfirm"
      />
    </van-popup>
    <!-- 需求 -->
    <van-popup v-model="goodsIdModel" round position="bottom">
      <van-picker
        show-toolbar
        :columns="goodsName"
        @cancel="goodsIdModel = false"
        @confirm="goodsIdConfirm"
      />
    </van-popup>
  </div>
</template>
<script>
import * as api from "@/api/order.js";

export default {
  props: {
    active:Number
    // anchorCustomerServiceMessageParams:Object
  },
  data() {
    return {
       searchKey:'',
       searchColumns:[],
      //   用于页面展示
      form: {
        // 客服
        belongEmpId: null,
        // 平台
        contentPlateFormId: "",
        // 主播IP
        liveAnchorId: null,
        // 主播微信号
        liveAnchorWeChatNo: "",
        // 科室
        hospitalDepartmentId: "",
        // 需求
        goodsId: "",
      },
      //   用于传给你后端数据
      form2: {
        // 客服
        belongEmpId: null,
        // 平台
        contentPlateFormId: "",
        // 主播IP
        liveAnchorId: null,
        // 主播微信号
        liveAnchorWeChatNo: "",
        // 科室
        hospitalDepartmentId: "",
        // 需求
        goodsId: "",
      },
      belongEmpIdModel: false,
      contentPlateFormIdModel: false,
      liveAnchorIdModel: false,
      liveAnchorWeChatNoModel: false,
      hospitalDepartmentIdModel: false,
      goodsIdModel: false,
      // 取名字
      serviceName: [],
      terraceName: [],
      liveAnchorName: [],
      liveAnchorWeChatNoName: [],
      hospitalDepartmentName: [],
      goodsName: [],
      // 主播信息参数
      anchorCustomerServiceMessageParams: {
        // 客服
        serviceNameList: [],
        // 主播平台
        terraceList: [],
        // z主播
        LiveAnchorList: [],
        // 微信号
        WechatList: [],
        // 科室
        departmentList: [],
        // 需求
        goodsList: [],
      },
    };
  },
  methods: {
    nextStep(){
        const {belongEmpId,contentPlateFormId,liveAnchorId,liveAnchorWeChatNo,hospitalDepartmentId,goodsId} = this.form2
        if(!belongEmpId){
            this.$toast("请选择绑定客服");
            return
        }
        if(!contentPlateFormId){
            this.$toast("请选择主播平台");
            return
        }
        if(!liveAnchorId){
            this.$toast("请选择主播IP");
            return
        }
        if(!liveAnchorWeChatNo){
            this.$toast("请选择主播微信号");
            return
        }
        if(!hospitalDepartmentId){
            this.$toast("请选择科室");
            return
        }
        if(!goodsId){
            this.$toast("请选择需求");
            return
        }
        // sessionStorage.setItem('anchorCustomerServiceMessageId',JSON.stringify(this.form2))
        // sessionStorage.setItem('anchorCustomerServiceMessageName',JSON.stringify(this.form))
        this.$emit('edidActive',{
          active:1,
          anchorCustomerServiceMessage:this.form2
        })
    },
    contentPlateFormIdClick(){
        this.contentPlateFormIdModel = true
        this.form.liveanchorId = null
        this.form2.liveanchorId = null
        this.form.liveAnchorWeChatNo = null
        this.form2.liveAnchorWeChatNo = null
    },
    liveAnchorIdClick() {
      if (!this.form.contentPlateFormId) {
        this.$toast("请先选择主播平台");
        return;
      }
      this.liveAnchorIdModel = true;
      this.form.liveAnchorWeChatNo = null
      this.form2.liveAnchorWeChatNo = null
      this.getLiveAnchor(this.form2.contentPlateFormId);
      
    },
    liveAnchorWeChatNoClick() {
      if (!this.form.liveAnchorId) {
        this.$toast("请先选择主播IP");
        return;
      }
      this.liveAnchorWeChatNoModel = true;
      this.getLiveAnchorWechatInfo(this.form2.liveAnchorId)
    },
    goodsIdClick(){
      if (!this.form.hospitalDepartmentId) {
        this.$toast("请先选择科室");
        return;
      }
      this.goodsIdModel = true;
      this.getAmiyaGoodsDemandLists(this.form2.hospitalDepartmentId)
    },
    belongEmpIdClick() {
      this.belongEmpIdModel = true;
    },
    // 获取绑定客服
    getCustomerServiceNameList() {
      api.customerServiceNameList().then((res) => {
        this.anchorCustomerServiceMessageParams.serviceNameList =
          res.data.employee;
        let serviceName = [];
        this.anchorCustomerServiceMessageParams.serviceNameList.map((item) => {
          serviceName.push(item.name);
        });
        this.serviceName = serviceName;
        this.searchColumns = serviceName
      });
    },

    // 获取科室
    getAmiyaHospitalDepartmentLists() {
      api.getAmiyaHospitalDepartmentList().then((res) => {
        this.anchorCustomerServiceMessageParams.departmentList =
          res.data.AmiyaHospitalDepartmentList;
         let hospitalDepartmentName = [];
        this.anchorCustomerServiceMessageParams.departmentList.map((item) => {
          hospitalDepartmentName.push(item.name);
        });
        this.hospitalDepartmentName = hospitalDepartmentName;
      });
    },
    // 获取需求
    getAmiyaGoodsDemandLists(value) {
      const data = {
        hospitalDepartmentId:value
      }
      api.getAmiyaGoodsDemandList(data).then((res) => {
        this.anchorCustomerServiceMessageParams.goodsList =
          res.data.AmiyaGoodsDemandList;
         let goodsName = [];
        this.anchorCustomerServiceMessageParams.goodsList.map((item) => {
          goodsName.push(item.name);
        });
        this.goodsName = goodsName;
      });
    },
    // 获取获取平台
    getContentPlatFormValidList() {
      api.contentPlatFormValidList().then((res) => {
        this.anchorCustomerServiceMessageParams.terraceList =
          res.data.contentPalteForms;
        let terraceName = [];
        this.anchorCustomerServiceMessageParams.terraceList.map((item) => {
          terraceName.push(item.name);
        });
        this.terraceName = terraceName;
      });
    },
    // 获取获取主播
    getLiveAnchor(value) {
      const data = {
        contentPlatFormId: value,
      };
      api.LiveAnchor(data).then((res) => {
        this.anchorCustomerServiceMessageParams.LiveAnchorList =
          res.data.liveAnchors;
          if(res.data.liveAnchors==[]){
            this.$toast('暂无数据')
            return
          }
        let liveAnchorName = [];
        this.anchorCustomerServiceMessageParams.LiveAnchorList.map((item) => {
          liveAnchorName.push(item.name);
        });
        this.liveAnchorName = liveAnchorName;
      });
    },
    // 获取获取微信号
    getLiveAnchorWechatInfo(value) {
      const data ={
        liveanchorId:value
      }
      api.LiveAnchorWechatInfo(data).then((res) => {
        this.anchorCustomerServiceMessageParams.WechatList =
          res.data.liveAnchorWechatInfos;
          if(res.data.liveAnchorWechatInfos==[]){
            this.$toast('暂无数据')
            return
          }
          let liveAnchorWeChatNoName = [];
        this.anchorCustomerServiceMessageParams.WechatList.map((item) => {
          liveAnchorWeChatNoName.push(item.name);
        });
        this.liveAnchorWeChatNoName = liveAnchorWeChatNoName;
      });
    },
    onConfirm(value) {
      this.value = value;
      this.showPicker = false;
    },
    // 绑定主播
    belongEmpIdConfirm(value) {
      this.form.belongEmpId = value;
      this.belongEmpIdModel = false;
      this.searchKey = ''
      this.searchColumns = []
      // 取id
      this.anchorCustomerServiceMessageParams.serviceNameList.map((item) => {
        if (item.name == value) {
          this.form2.belongEmpId = item.id;
        }
      });
    },
    // 平台
    contentPlateFormIdConfirm(value) {
      this.form.contentPlateFormId = value;
      this.contentPlateFormIdModel = false;
      this.form.liveanchorId = ''
      this.form2.liveanchorId = ''
      this.form.liveAnchorWeChatNo = null
      this.form2.liveAnchorWeChatNo = null
      // 取id
      this.anchorCustomerServiceMessageParams.terraceList.map((item) => {
        if (item.name == value) {
          this.form2.contentPlateFormId = item.id;
        }
      });
    },
    // 主播IP
    liveAnchorIdConfirm(value) {
      this.form.liveAnchorId = value;
      this.liveAnchorIdModel = false;
      // 取id
      this.anchorCustomerServiceMessageParams.LiveAnchorList.map((item) => {
        if (item.name == value) {
          this.form2.liveAnchorId = item.id;
        }
      });
    },
    // 主播微信号
    liveAnchorWeChatNoConfirm(value) {
      this.form.liveAnchorWeChatNo = value;
      this.liveAnchorWeChatNoModel = false;
      // 取id
      this.anchorCustomerServiceMessageParams.WechatList.map((item) => {
        if (item.name == value) {
          this.form2.liveAnchorWeChatNo = item.id;
        }
      });
    },
    // 科室
    hospitalDepartmentIdConfirm(value) {
      this.form.hospitalDepartmentId = value;
      this.hospitalDepartmentIdModel = false;
      // 取id
      this.anchorCustomerServiceMessageParams.departmentList.map((item) => {
        if (item.name == value) {
          this.form2.hospitalDepartmentId = item.id;
        }
      });
    },
    // 需求
    goodsIdConfirm(value) {
      this.form.goodsId = value;
      this.goodsIdModel = false;
      // 取id
      this.anchorCustomerServiceMessageParams.goodsList.map((item) => {
        if (item.name == value) {
          this.form2.goodsId = item.id;
        }
      });
    },
  },
  created() {
    this.getContentPlatFormValidList();
    this.getCustomerServiceNameList();
    this.getAmiyaHospitalDepartmentLists();
    const {belongEmpName,belongEmpId,contentPlateFormId,contentPlateFormName,liveAnchorId,liveAnchorName,liveAnchorWeChatNo,hospitalDepartmentName,hospitalDepartmentId,goodsName,goodsId,liveAnchorBaseWechatId} = this.$route.query.orderInfo
    this.form.belongEmpId = belongEmpName
    this.form2.belongEmpId = belongEmpId
    this.form.contentPlateFormId = contentPlateFormName
    this.form2.contentPlateFormId = contentPlateFormId
    // this.liveAnchorIdConfirm(contentPlateFormId)
    this.form.liveAnchorId = liveAnchorName
    this.form2.liveAnchorId = liveAnchorId
    // this.getLiveAnchorWechatInfo(liveAnchorId)
    this.form.liveAnchorWeChatNo = liveAnchorWeChatNo
    this.form2.liveAnchorWeChatNo = liveAnchorBaseWechatId
    this.form.hospitalDepartmentId = hospitalDepartmentName
    this.form2.hospitalDepartmentId = hospitalDepartmentId
    // this.getAmiyaGoodsDemandLists(hospitalDepartmentId)
    this.form.goodsId = goodsName
    this.form2.goodsId = goodsId

    // this.getAmiyaGoodsDemandLists();
    // 用于切到到订单详情时保留之前填写的数据
    // let anchorCustomerServiceMessageId = JSON.parse(sessionStorage.getItem('anchorCustomerServiceMessageId'))
    // let anchorCustomerServiceMessageName = JSON.parse(sessionStorage.getItem('anchorCustomerServiceMessageName'))
    // console.log(anchorCustomerServiceMessageId,anchorCustomerServiceMessageName)
    // this.form = {...anchorCustomerServiceMessageName}
    // this.form2 = {...anchorCustomerServiceMessageId}
     // 删除
    // sessionStorage.removeItem("anchorCustomerServiceMessageId");
    // sessionStorage.removeItem("anchorCustomerServiceMessageName");
  },
   watch: {  //实时监听搜索输入内容
      searchKey: function () {
          let key = String( this.searchKey );
          key =  key.replace( /\s*/g, "" );//去除搜索内容中的空格
          const reg =  new RegExp( key, "ig" );//匹配规则-i：忽略大小写，g：全局匹配
          /* 进行筛选，将筛选后的数据放入新的数组中，‘name’键可根据需要搜索的key进行调整 */
          this.searchColumns = this.serviceName.filter( item => item.match( reg ) !=null );
      }
  }
};
</script>
<style scoped lang="less">
.content {
  width: 92%;
  background: #fff;
  // height: 307px;
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
      width: 80px;
      color: #5492fe;
    }
  }
  .button{
    width: 60%;
    height: 42px;
    margin: 20px auto 0;
  }
}
</style>
