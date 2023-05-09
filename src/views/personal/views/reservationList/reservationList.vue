<template>
  <div class="content" :style="{height:list.length < 4 ? '100vh' : 'auto'}">
    <div class="list_wrap" >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
        :error.sync="error"
      >
        <div>
        <van-swipe-cell v-for="(item, index) in list" :key="index">
          <div class="item" @click="detail(item)">
            <div class="item_con"></div>
            <div class="item_top">
              <div style="color:#000" class="white">昵称：{{item.customerName}}</div>
              <div style="color:#000;margin-left:10px" >手机号：{{item.phone}}</div>
            </div>
            <div class="item_top">
            <div style="color:#000">是否完成：{{item.isFinish == true ? '已完成' : '未完成'}}</div>
            <div style="color:#000;margin-left:10px" >重要程度： {{item.importantTypeText }} </div>
            </div>
            <div class="item_top">
              <div style="color:#000" >预约日期： {{item.appointmentDate ? $moment(item.appointmentDate).format("YYYY-MM-DD") : ''}}</div>
              <div style="color:#000;margin-left:10px" class="white">预约医院：{{item.appointmentHospitalName}} </div>
            </div>
            <div class="remark">
                备注：{{item.remark}}
            </div>
        </div>   
        </van-swipe-cell>
        </div>
      </van-list>

      <van-popup
            v-model="detailModel"
            position="bottom"
            class="dispatch_content"
            round
            style="padding:30px 10px"
          >
            <div class="text">
              预约医院：{{detailInfo.appointmentHospitalName}}
            </div>
            <div class="text" >
              备注：{{detailInfo.remark}}
            </div>
            <div class="bottom2">
              <van-button
                round
                block
                type="default"
                class="button"
                @click="detailModel=false"
                style="height:35px"
                >取消</van-button
              >
            </div>
          </van-popup>
    </div>

  </div>
</template>
<script>
import * as api from "@/api/order.js";
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
      // 滚动位置
      scrollTop:0,
      // 
      detailModel:false,
      detailInfo:{}
      }
  },
  created() {

  },
  methods: {
    detail(value){
      this.detailModel = true
      this.detailInfo = value
    },
    // 获取我收到的数据
    getCustomerAppointmentSchedule() {
      const { pageNum, pageSize} = this.query;
      const data = {
        pageNum,
        pageSize,
        appointmentType:2,
        liveAnchorId:this.$route.query.liveAnchorBaseId
      };
      api.getCustomerAppointmentSchedule(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.customerAppointmentScheduleInfo;
          this.list = [...this.list, ...list];
          this.query.pageNum++;
          this.loading = false;
          if (this.list.length === totalCount) {
            this.finished = true;
          }
        }
      }).catch(() => {
          this.error = true;
        });
    },
    

    onLoad() {
      this.getCustomerAppointmentSchedule();
    },
  },

};
</script>
<style lang="less" scoped>
// /deep/.van-list{
//   min-height: calc(100vh - 100px); overflow: hidden;
// }

.content{
  background: #C7DBFF;
  width: 100%;
  // height: 100vh;
}
.white{
    width: 50%;
    overflow: hidden; /*超出隐藏*/
            text-overflow: ellipsis;/*隐藏后添加省略号*/
            white-space: nowrap;/*强制不换行*/
}
.text{
  font-size: 14px;
  margin-bottom: 10px;
}
.list_wrap {
  .item {
    width: 96%;
    background: #E9F3FF;
    border-radius: 10px;
    margin: 15px auto 0;
    color: #565151;
    font-size: 13px;
    padding: 10px;
    box-sizing: border-box;
    .item_con{
    //   background-image: url('../../../../assets/right.png');
    //   background-size: 100% 100%;
    //   background-repeat: no-repeat no-repeat ;
    //   position: fixed;
    //   right: 20px;
    //   top: 35px;
    //   width: 90px;
    //   height: 70px;
    }
    .remark{
        width: 100%;
        overflow: hidden; /*超出隐藏*/
        text-overflow: ellipsis;/*隐藏后添加省略号*/
        white-space: nowrap;/*强制不换行*/
        color: #000;
        margin-bottom: 5px;
    }
    .item_top{
      display: flex;
      justify-content: space-between;
      margin-bottom: 5px;
      color: #000;
      .hospital_con{
            display: flex;
            width: 187px;
            .hospital{
              width: 77%;
            overflow: hidden; /*超出隐藏*/
            text-overflow: ellipsis;/*隐藏后添加省略号*/
            white-space: nowrap;/*强制不换行*/
            color: #000;
          }
          .hospital2{
            width: 65%;
            overflow: hidden; /*超出隐藏*/
            text-overflow: ellipsis;/*隐藏后添加省略号*/
            white-space: nowrap;/*强制不换行*/
            color: #000;
          }
          }
      
    }
    .item_center{
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 7px 0;
      .item_right{
        width: 70%;
        flex:1;
        .right_content{
          display: flex;
          justify-content: space-between;
          align-items: center;
          .nickname_con{
            display: flex;
            .nickname{
                width: 100px ;
                overflow: hidden; /*超出隐藏*/
                text-overflow: ellipsis;/*隐藏后添加省略号*/
                white-space: nowrap;/*强制不换行*/
              }
          }
          .ip_con{
            margin-left: 10px;
            display: flex;
              .ip{
                width: 100px ;
                overflow: hidden; /*超出隐藏*/
                text-overflow: ellipsis;/*隐藏后添加省略号*/
                white-space: nowrap;/*强制不换行*/
              }
          }
          
        }
        
      }
      .hospital_con{
            display: flex;
            .hospital{
              width: 70%;
            overflow: hidden; /*超出隐藏*/
            text-overflow: ellipsis;/*隐藏后添加省略号*/
            white-space: nowrap;/*强制不换行*/
          }
          }
      
      
    }
    .item_bottom{
      display: flex;
      justify-content: space-between;
      // .nickname_con{
      //   display: flex;
      //   .nickname{
      //       width: 130px ;
      //       overflow: hidden; /*超出隐藏*/
      //       text-overflow: ellipsis;/*隐藏后添加省略号*/
      //       white-space: nowrap;/*强制不换行*/

      //     }
      // }
      .nickname_con{
        display: flex;
        width: 48%;
        .nickname{
          width: 100px;
          overflow: hidden; /*超出隐藏*/
          text-overflow: ellipsis;/*隐藏后添加省略号*/
          white-space: nowrap;/*强制不换行*/
        }
        .nick_title2{
          width: 120px;
          overflow: hidden; /*超出隐藏*/
          text-overflow: ellipsis;/*隐藏后添加省略号*/
          white-space: nowrap;/*强制不换行*/
        }
        
      }
    }
  }
  .nodata{
    display: flex;
    text-align: center;
}
}
.bottom{
        display: flex;
        margin-top: 20px;
        .button{
            width: 40%;
            height: 42px;
            margin:0 auto
        }
    }
    .bottom2{
      width: 40%;
      height: 30px;
      margin: 0 auto;
    }
</style>
