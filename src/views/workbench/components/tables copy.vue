<template>
    <div>
        <ve-table
          :columns="query.columns"
          :table-data="query.list"
          border-y
          :sort-option="sortOption"
        />
    <div v-show="query.list.length === 0" class="empty_data">暂无数据</div>
    </div>
</template>
<script>
import  * as api from "@/api/index.js";
export default {
  components:{
  },
  data () {
    return {
      sortOption: {
        multipleSort: true,
        sortChange: (params) => {
          this.sortChange(params);
        },
      },
      // 搜索字段
      query:{
          pageNum:1,
          pageSize:10,
          totalCount:0,
          // 今日到院订单（表格数据）
          list:[],
          columns: [
            {
              field: "phone",
              key: "phone",
              title: "客户手机号",
              align: "center",
              width:'150px'
            },
            {
              field: "isDeal",
              key: "isDeal",
              title: "是否成交",
              align: "center",
              width:'150px'
            },
            {
              field: "dealPrice",
              key: "dealPrice",
              title: "成交金额",
              align: "center",
              width:'150px'
            },
            {
              field: "dealDate",
              key: "dealDate",
              title: "成交时间",
              align: "center",
              width:'150px'
            },
      ],
      },
    }
  },
  methods: {
    // 获取今日到院订单
        getTodayToHospitalInfo(){
            const {pageNum,pageSize} = this.query
            const data ={
                startDate:this.$moment().format("YYYY-MM-DD"),
                endDate:null,
                dealStartDate:null,
                dealEndDate:null,
                isDeal:true,
                lastDealHospitalId:null,
                keyWord:'',
                pageNum,
                pageSize
            }
            api.todayToHospitalInfo(data).then((res) => {
                if(res.code == 0){
                    // this.query.contentPlatFormOrderDealInfo = res.data.contentPlatFormOrderDealInfo
                    const { list, totalCount } = res.data.contentPlatFormOrderDealInfo;
                    this.query.list = list;
                    // this.query.pageNum++;
                    // this.loading = false;
                    // if (this.query.list.length === totalCount) {
                    //   this.finished = true;
                    // }
                }
            })
        },
    
    // 上拉加载更多
    onLoad () {
      this.getTodayToHospitalInfo()
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
