<template>
  <div class="wrapper">
    <div ref="dom" :style="{ width: '100%', height: '220px' }"></div>
  </div>
</template>

<script>
import { on, off } from "@/utils/util";
import tdTheme from "./theme.json";
import * as echarts from "echarts";
echarts.registerTheme("tdTheme", tdTheme);
export default {
  props: {
    brokenLineData:Object
  },
  data() {
    return {
      myChart: "",
    };
  },
  methods: {
    // 业绩
    myEcharts(value) {
      let date = [];
      let orderGMVBrokenLineLists = [];
      if(value){
        value.map((item) => {
          date.push(item.date);
          orderGMVBrokenLineLists.push(item.performance);
        });
      }
      let option = {
        xAxis: {
          type: "category",
          data: date,
          name: "日期",
          nameTextStyle: {
            	fontSize:12,
            	padding: [0, 0, 0, -13]
            },
        },
        yAxis: {
          name: "业绩/元",
          type: "value",
          axisLabel: {
            formatter: (value) => {
              return value;
            },
          },
        },
        tooltip: {
          trigger: "axis",
          confine: true,
          formatter: (params) => {
            let list = [];
            let listItem = "";
            let axisValueLabel = params[0].axisValueLabel + "号";
            for (let i = 0; i < params.length; i++) {
              list.push(
                '<i style="display: inline-block;width: 10px;height: 10px;background: ' +
                  params[i].color +
                  ';margin-right: 5px;border-radius: 50%;}"></i>' +
                  '<span style="display:inline-block;">' +
                  params[i].seriesName +
                  '</span><span style="display:inline-block;">&nbsp&nbsp' +
                  params[i].data +
                  "元" +
                  "</span>"
              );
            }
            listItem = list.join("<br>");
            return axisValueLabel + "<br>" + listItem;
          },
        },

        grid: {
          top: "25%",
          containLabel: true,
        },
        legend: {
          x: "center",
          y: '5%',
          data: [
            "下单GMV",
            
          ],
          selected: {
            下单GMV: true,
          },
        },
        series: [
          {
            name: "下单GMV",
            type: "line",
            data: orderGMVBrokenLineLists,
            itemStyle: {
              normal: {
                color: "#2d8cf0", // 折线的颜⾊
              },
            },
          },
       
        ],
      };
      this.myChart = echarts.init(this.$refs.dom, "tdTheme");
      this.myChart.clear();
      this.myChart.setOption(option);
      on(window, "resize", this.myChart.resize);
    },
  },
  beforeDestroy() {
    off(window, "resize", this.myChart.resize);
  },
  watch: {
    brokenLineData: {
        handler(value){
          const {orderGMVBrokenLineList} = value
            this.$nextTick(() => {
                this.myEcharts(orderGMVBrokenLineList);
            });
        },
        immediate:true
      
    },
  },
};
</script>
<style lang="less" scoped>
.wrapper {
  width: 90%;
  height: 170px;
  display: flex;
  margin-left:5%;
  background:#fff;
  // margin-left: 5%;
  overflow-y: hidden;
}
</style>
