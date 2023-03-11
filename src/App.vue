<template>
  <div id="app">
    <router-view/>
    <!-- <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view> -->
  </div>
</template>
<script>

export default {
  name: 'App',
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
