<template>
  <div class="publicHeader" :class="headclass">
    <van-nav-bar :title="title" :border="false" >
      <div class="left" slot="left" v-show="isShow" @click="goback">
        <img src="//static.gaokaoq.com/open/pkb_wap/image/common/icon-goback.png" alt="" class="goback">
        <span>{{leftText}}</span>
      </div>
      <div class="left" slot="left" v-show="closeweb" @click="closeself">
        <img :src="closeIcon" alt="" class="goback">
      </div>
      <div class="right" slot="right">
        <slot></slot>
      </div>
    </van-nav-bar>
  </div>
</template>

<script type="text/javascript">
import { NavBar } from 'vant'
export default {
  props: {
    title: { // 头部标题
      type: String,
      default: ''
    },
    headclass: { // 头部class
      type: String,
      default: ''
    },
    isShow: { // 是否显示返回按钮
      type: Boolean,
      default: false
    },
    closeweb: { // 是否显示关闭按钮
      type: Boolean,
      default: false
    },
    closeIcon: { // 关闭图标
      type: String,
      default: '//static.gaokaoq.com/open/pkb_wap/image/common/icon-close.png'
    },
    rightFont: { // 右侧文字
      type: String,
      default: ''
    },
    rightIcon: { // 右侧的图标
      type: String,
      default: ''
    },
    leftText: { // 左侧的文字
      type: String,
      default: ''
    }
  },
  data () {
    return {

    }
  },
  methods: {
    goback () {
      this.$router.back() // 返回上一个路由
    },
    closeself () {
      var userAgent = navigator.userAgent;
      if (userAgent.indexOf("Firefox") != -1 || userAgent.indexOf("Chrome") !=-1)	{
        undefined
        
        window.open('', '_self').close()
      }else {
        undefined
        window.opener = null;
        window.open("about:blank", "_self");
        window.close();
      }
    }
  },
  components: {
    [NavBar.name]: NavBar
  }
}
</script>

<style lang="less" scoped>
/deep/ .van-ellipsis {
  color: #ffffff;
}

.van-nav-bar{
  background: #3774c3;
}
.publicHeader{
  position: fixed;
  top:0;
  left: 0;
  width: 100%;
  height:44px;
  background:#0052D9;
  z-index:9999;
  color: #fff;
  .left{
    display: flex;
    align-items: center;
    .goback{
      width: 20px;
    }
    span{
      font-size: 18px;
    }
  }
  .right{
    span{
      font-size: 18px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #1F2429;
    }
  }
  &.whitebg{
    background: #fff;
  }
}
</style>
