<template>
  <div class="containers">
    <div class="card_content">
      <div class="img_con">
          <van-image width="50" height="50" :src="employeeInfo.avatar" />
        <div class="title">
          <div class="h3">啊美雅{{employeeInfo.positionName}}-{{employeeInfo.name}}</div>
          <div>{{ employeeInfo.email }}</div>
        </div>
      </div>
      <div class="card_bottom">
        <div class="switch_con">
          <span class="switch_title">客服角色</span>
          <van-switch
            v-model="employeeInfo.isCustomerService"
            size="14px"
            active-color="#8ab4fe"
            disabled
          />
        </div>
        <img
            src="https://ameiya.oss-cn-hangzhou.aliyuncs.com/9d9e6eb6d3824d278fafcc95e37a6812.png"
            alt=""
            class="img"
        />
      </div>
    </div>
    <div class="item_con" >
      <div class="item" @click="$router.push('/myData')">
        <span>我的数据</span>
        <div>
          <span class="rank"><span style="font-weight:bold">排名：</span>{{rank}}</span>
          <i class="iconfont icon-jinrujiantouxiao icon_jt"></i>
        </div>
      </div>
      <div class="item"  @click="anchorClick">
        <span>主播数据</span>
        <i class="iconfont icon-jinrujiantouxiao icon_jt"></i>
      </div>
    </div>
    <div class="item_con">
      <div class="item" @click="$toast('敬请期待！')">
        <span>新手引导</span>
        <i class="iconfont icon-jinrujiantouxiao icon_jt"></i>
      </div>
      <div class="item"  @click="$toast('敬请期待！')">
        <span>升级公告</span>
        <i class="iconfont icon-jinrujiantouxiao icon_jt"></i>
      </div>
      <div class="item"  @click="$toast('敬请期待！')">
        <span>帮助中心</span>
        <i class="iconfont icon-jinrujiantouxiao icon_jt"></i>
      </div>
      <div class="item"  @click="$toast('敬请期待！')">
        <span>意见反馈</span>
        <i class="iconfont icon-jinrujiantouxiao icon_jt"></i>
      </div>
    </div>
    <div class="item" @click="$router.push({path:'/accountNumber',query:{employeeInfo:employeeInfo}})">
      <span>账号设置</span>
      <i class="iconfont icon-jinrujiantouxiao icon_jt"></i>
    </div>

    <tabbar :active="1"/>
  </div>
</template>
<script>
import * as api from "@/api/my.js";

import tabbar from "@/components/tabbar/tabbar.vue";
export default {
  components: {
    tabbar,
  },
  data() {
    return {
      // 获取部门
      departmentName:sessionStorage.getItem("departmentName")
        ? sessionStorage.getItem("departmentName")
        : '',
      // 获取员工id
      employeeId: sessionStorage.getItem("employeeId")
        ? sessionStorage.getItem("employeeId")
        : null,
      // 数据
      employeeInfo: {},
      // 排名
      rank:sessionStorage.getItem('rank')
    };
  },
  methods: {
    // 获取排名
    getMyRank(){
      const data = {
        year:this.$moment().format("YYYY"),
        month:this.$moment().format("MM"),
        custonerServiceId:this.employeeId
      }
      api.getMyRank(data).then((res) => {
        if(res.code === 0 ){
          this.rank = res.data.rank
          sessionStorage.setItem('rank',res.data.rank)
        }
      })
    },
    // 主播信息
    anchorClick(){
      // 啊美雅职位列表查看主播数据为false时  没有权限查看主播信息页面
      if(sessionStorage.getItem('readLiveAnchorData') == 'false'){
        this.$toast('您当前的角色暂时无法进入，请联系管理员进行角色升级！')
        return
      }
      // 如果没有绑定主播基础信息时 禁止进入页面
      if(!this.employeeInfo.liveAnchorBaseId){
        this.$toast('你的账号暂未绑定主播，请在管理端绑定后重试！')
        return
      }
      this.$router.push({
        path:'/anchor',
        query:{
          liveAnchorBaseId:this.employeeInfo.liveAnchorBaseId,
          liveAnchorBaseName:this.employeeInfo.liveAnchorBaseName
        }
      })
      
    },
    // 获取该员工登录的账号信息
    getAmiyaEmployee() {
      api.AmiyaEmployee(this.employeeId).then((res) => {
        if (res.code === 0) {
          this.employeeInfo = res.data.employeeInfo;
        } else {
          this.$toast(res.msg);
        }
      });
    },
  },
  created() {
    this.getAmiyaEmployee();
    // 排名本地存储如果没有调用接口
    if(!sessionStorage.getItem('rank')){
      this.getMyRank()
      return
    }
    
  },
};
</script>
<style scoped lang="less">
/deep/.van-image__img {
  border-radius: 50%;
}
/deep/.van-cell__right-icon {
  color: #5492fe;
}
.containers {
  width: 100%;
  height: 100%;
  background: linear-gradient(#8ab4fe, #fff);
  padding: 14px;
  box-sizing: border-box;
  .card_content {
    width: 100%;
    height: 120px;
    background: #457be3;
    border-radius: 10px;
    margin: 0 auto;
    padding: 15px;
    box-sizing: border-box;
    // box-shadow:0px 0px 10px #fff;
    box-shadow: 0px 15px 10px -15px #fff;
    .img_con {
      display: flex;
      align-items: center;
      .title {
        font-size: 12px;
        color: #fff;
        margin-left: 10px;
        .h3 {
          font-size: 14px;
          margin-bottom: 5px;
          font-weight: bold;
        }
      }
    }
    .card_bottom {
      font-size: 12px;
      color: #fff;
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
      .img {
        width: 40px;
        height: 30px;
      }
      .switch_con {
        display: flex;
        align-items: center;
        .switch_title {
          margin-right: 5px;
        }
      }
    }
  }
  .my_data {
    margin: 20px 0;
    border-radius: 7px;
    box-shadow: 0px 15px 10px -15px #8ab4fe;
    color: #457be3;
    .item {
      font-size: 14px;
      background: #fff;
      padding: 12px 20px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      .icon_jt {
        font-size: 12px;
      }
      .rank{
        margin-right: 5px;
      }
    }
  }
  .item_con {
    margin: 20px 0;
    border-radius: 7px;
    background: #fff;
    box-shadow: 0px 15px 10px -15px #8ab4fe;
    color: #457be3;
    .item {
      font-size: 14px;
      padding: 13px 20px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;

      .icon_jt {
        font-size: 12px;
      }
    }
  }
  .item {
    font-size: 14px;
    padding: 12px 20px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    background: #fff;
    border-radius: 7px;
    box-shadow: 0px 15px 10px -15px #8ab4fe;
    color: #457be3;
    .icon_jt {
      font-size: 12px;
      color: #457be3;
    }
  }
}
</style>
