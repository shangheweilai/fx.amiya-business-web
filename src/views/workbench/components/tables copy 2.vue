<template>
    <div>
        <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ve-table
          is-horizontal-resize
          style="width: 100%"
          :columns="columns"
          :table-data="list"
          :fixed-header="true"
        ></ve-table>
      </van-list>
    </div>
</template>
<script>
import  * as api from "@/api/index.js";
export default {
  components:{
  },
  data () {
    return {
      list: [],
      pageSize: 10,
      pageNum: 1,
      loading: true,
      finished: false,
      total: "",
      columns: [
        {
          field: "phone",
          title: "客户手机号",
          key: "phone",
        },
        {
          field: "isDeal",
          title: "是否成交",
          key: "isDeal",
        },
        {
          field: "dealPrice",
          title: "成交金额",
          key: "dealPrice",
        },
        {
          field: "dealDate",
          title: "成交时间",
          key: "dealDate",
        },

      ]
    }
  },
  methods: {
    // 获取今日到院订单
        getTodayToHospitalInfo(){
            const data ={
                startDate:null,
                endDate:null,
                dealStartDate:null,
                dealEndDate:null,
                isDeal:true,
                lastDealHospitalId:null,
                keyWord:'',
                pageNum:this.pageNum,
                pageSize:this.pageSize
            }
            api.todayToHospitalInfo(data).then((res) => {
                if(res.code == 0){
                    // this.list = res.data.contentPlatFormOrderDealInfo.list
                    // const {list,totalCount} = res.data.contentPlatFormOrderDealInfo
                    // this.query.list = list
                    // this.query.totalCount = totalCount
                    let rows = res.data.contentPlatFormOrderDealInfo.list;
                    this.loading = false;
                    this.total = res.data.contentPlatFormOrderDealInfo.totalCount;
                    if (rows == null || rows.length === 0) {
                      // 加载结束
                      this.loading = false;
                      this.finished = true;
                      return;
                    }
              
                    this.list = this.list.concat(rows);
                    if (this.list.length >= this.total) {
                      this.finished = true;
                    }

                }
            })
        },
        onLoad() {
          this.pageNum += 1;
          this.getTodayToHospitalInfo();
        },

  },
  created(){
    this.getTodayToHospitalInfo()
  }
}
</script>
<style lang="scss" scoped>
html, body {
  overflow: hidden;
}
::v-deep .van-list__finished-text, ::v-deep .van-list__loading{
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 211;
}
::v-deep .ve-table-content-wrapper {
  width: 21.33rem;
}
.bb {
  height: 50px;
  line-height: 50px;
}
p {
  margin: 0px;
}
.aa {
  height: 100%;
  overflow: hidden;
}
 
table,
div {
  margin: 0px;
  padding: 0px;
}
 
.van-list {
  width: 100%;
  /* 固定滚动高度 */
  height: calc(100vh - 58px);
  overflow: auto;
  table {
    border-collapse: collapse;
    table-layout: fixed;
    width: 100%;
  }
  td,
  th {
    border-right: 1px solid rgb(229,229,229);
    border-bottom: 1px solid #ebebeb;
    width: 100px;
    color: #333;
    box-sizing: border-box;
    background-color: #ffffff;
    font-size: 12px;
    text-align: center;
    padding: 7px;
    word-wrap: break-word
  }
  th {
    background: #fafafa;
    color: #000;
    font-weight: 600;
    height: 47px;
  }
  // 固定首列
  td:first-child,
  th:first-child {
    width: 100px;
    position: sticky;
    left: -1px;
    z-index: 1;
    padding-left: 5px;
  }
  // 固定表头
  thead tr th {
    position: sticky;
    top: -1px;
  }
  th:first-child {
    z-index: 2;
  }
  // 固定表头
  tfoot tr th {
    position: sticky;
    bottom: 0;
    color: #333;
    font-weight: bold;
    border-bottom: 0;
  }
  th:first-child {
    z-index: 2;
  }
}
</style>
