<template>
  <div class="content">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <ve-table
        is-horizontal-resize
        style="width: 100%;"
        :columns="columns"
        :table-data="list"
        :fixed-header="true"
      ></ve-table>
    </van-list>
  </div>
</template>
<script>
import * as api from "@/api/index.js";

export default {
  data() {
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
          key: "a",
          renderBodyCell:(({ row, column, rowIndex }, h)=> {
            return h("span", [
              h('span',{style:{position: "relative",zIndex:1}},row.phone),
              h("span", {
                style: {
                  display: "inline-block",
                  height: "100%",
                  position: "absolute",
                  left: "0",
                  top: "0",
                  width: row.phone,
                  zIndex:'0'
                },
              }),
            ]);
          }),
        },
        {
          field: "isDeal",
          title: "是否成交",
          key: "b",
          renderBodyCell:(({ row, column, rowIndex }, h)=> {
            return h("span", [
              h('span',{style:{position: "relative",zIndex:1}},row.isDeal==true ? '已成交' : '未成交'),
              h("span", {
                style: {
                  display: "inline-block",
                  height: "100%",
                  position: "absolute",
                  left: "0",
                  top: "0",
                  width: row.isDeal,
                  zIndex:'0'
                },
              }),
            ]);
          }),
        },
        {
          field: "dealPrice",
          title: "成交金额",
          key: "c",
          renderBodyCell:(({ row, column, rowIndex }, h)=> {
            return h("span", [
              h('span',{style:{position: "relative",zIndex:1}},row.dealPrice),
              h("span", {
                style: {
                  display: "inline-block",
                  height: "100%",
                  position: "absolute",
                  left: "0",
                  top: "0",
                  width: row.dealPrice,
                  zIndex:'0'
                },
              }),
            ]);
          }),
        },
        
        {
          field: "dealDate",
          title: "成交时间",
          key: "d",
           renderBodyCell: ({ row, column, rowIndex }, h) => {
            return h(
                "div",
                this.$moment(row.dealDate).format(
                  "YYYY-MM-DD"
                )
              );
              
          },
        },
        
        
      ],
    };
  },
  created() {
    this.getTodayToHospitalInfo();
  },
  methods: {
    getTodayToHospitalInfo() {
      const data = {
        startDate: '2023-01-01',
        endDate: '2023-01-03',
        dealStartDate: null,
        dealEndDate: null,
        isDeal: true,
        lastDealHospitalId: null,
        keyWord: "",
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      };

      api.todayToHospitalInfo(data).then((res) => {
        if (res.code == 0) {
          // this.list = res.data.contentPlatFormOrderDealInfo.list
          // const {list,totalCount} = res.data.contentPlatFormOrderDealInfo
          // this.query.list = list
          // this.query.totalCount = totalCount
          // this.fileLists = result
          // this.fakePage()
          // this.$toast.clear()
          let rows = res.data.contentPlatFormOrderDealInfo.list;
          this.loading = false;
          this.total = res.totalCount;
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
      });
    },
    onLoad() {
            this.pageNum += 1;
            this.getTodayToHospitalInfo();
    },
  },
};
</script>
<style scoped lang="less">
/deep/ .ve-table-fixed-header ,.ve-table-header{
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #fff;
  z-index: 99;
}
/deep/.ve-table-header-tr{
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  box-sizing: border-box;
  overflow-x:scroll ;
  flex-wrap: nowrap;
}

</style>
