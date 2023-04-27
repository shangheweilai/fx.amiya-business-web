<template>
  <div id="app">
    <!-- <router-view/> -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive && isRouterAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive && isRouterAlive"></router-view>
  </div>
</template>
<script>
import tabbar from "./components/tabbar/tabbar.vue"
export default {
  name: 'App',
  components:{
    tabbar
  },
  data(){
    return{
      isRouterAlive: true,
    }
  },
  provide() {
    return {
      reload: this.reload,
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => (this.isRouterAlive = true));
    },
  },
}
</script>
<style >
*{
  margin: 0;
    padding: 0;
}
html,body,#app{

    margin: 0;

    padding: 0;

    height: 100%;

}
body{
  -webkit-overflow-scrolling: touch;
}
</style>
