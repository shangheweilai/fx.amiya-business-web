<template>
  <div>
    <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
        :error.sync="error"
      >
    <div class="list_wrap" v-for="(item, index) in list" :key="index">
       
          <div class="item">
            <div class="item_top">
              <div>手机号：{{ item.phone }}</div>
              <div>是否成交：{{ item.isDeal == true ? '已成交' : '未成交' }}</div>
            </div>
            <div class="item_center">
              <div>成交金额：{{ item.dealPrice }}</div>
              <div>成交时间：{{ $moment(item.dealDate).format("YYYY-MM-DD") }}</div>
            </div>
          </div>
          
    </div>
    </van-list>
  </div>
</template>
<script>
import * as api from "@/api/index.js";
export default {
  components: {},
  data() {
    return {
      // 搜索字段
      query: {
        pageNum: 1,
        pageSize: 10,
        totalCount: 0,
      },
      list: [],
      loading: false,
      finished: false,
      error: false,
    };
  },

  methods: {
     onLoad() {
      this.getTodayToHospitalInfo();
    },
    // 获取今日到院订单
    getTodayToHospitalInfo() {
      const { pageNum, pageSize } = this.query;
      const data = {
        startDate: this.$moment().format("YYYY-MM-DD"),
        endDate: this.$moment().format("YYYY-MM-DD"),
        dealStartDate: null,
        dealEndDate: null,
        isDeal: true,
        lastDealHospitalId: null,
        keyWord: "",
        pageNum,
        pageSize,
      };
      api.todayToHospitalInfo(data).then((res) => {
        if (res.code === 0) {
          // this.list = res.data.contentPlatFormOrderDealInfo.list;
          this.$emit('tables',res.data.contentPlatFormOrderDealInfo.totalCount)
          const { list, totalCount } = res.data.contentPlatFormOrderDealInfo;
          this.list = [...this.list, ...list];
          this.query.pageNum++;
          this.loading = false;
          if (this.list.length === totalCount) {
            this.finished = true;
          }
        }
      }).catch(() => {
          this.error = true;
        });;
    },
    
  },
  created() {
    // this.getTodayToHospitalInfo();
  },
};
</script>
<style lang="less" scoped>
/deep/.van-list{
  min-height: calc(100vh - 100px); overflow: hidden;
}
.list_wrap {
  .item {
    width: 92%;
    padding: 10px 20px;
    // background: linear-gradient(#8ab4fe,#5492FE);
    background: #E9F3FF;
    border-radius: 10px;
    // display: flex;
    // align-items: center;
    margin: 10px auto 0;
    color: #565151;
    .item_top,.item_center {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      margin: 10px 0 ;
    }
   
  }
}
</style>
