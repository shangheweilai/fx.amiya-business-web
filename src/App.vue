<template>
  <div id="app">
    <!-- <router-view/> -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <!-- 解决tabbar组件点击两次才高亮  通过路由判断才展示 否则不展示 -->
    <!-- <tabbar v-if="$route.path == '/workbench' || $route.path == '/personal'" /> -->
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
    }
  },
  created(){
    
  }
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
