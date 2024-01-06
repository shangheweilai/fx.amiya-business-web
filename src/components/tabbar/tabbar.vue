<template>
  <div class="tabbar">
    <van-tabbar v-model="current_active" :border="false" >
      <van-tabbar-item icon="home-o" to="/workbench">首页</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/personal">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  props: ["active"],
  data() {
    return {
      current_active: 0,
    };
  },
  watch: {
    active: {
      handler(newValue) {
        this.current_active = newValue;
      },
      immediate: true,
    },
  },
};
</script>
<style lang='less' scoped>
.tabbar {
  padding-top: 100px;
  box-sizing: border-box;
}
</style>