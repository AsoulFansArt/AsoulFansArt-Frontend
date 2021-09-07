<template>
  <meta name="referrer" content="no-referrer" />
  <meta name="viewport" content="width=device-width,height=device-height,initial-scale=1.0,maximum-scale=1.0,user-scalable=no">
  <meta content="yes" name="apple-mobile-web-app-capable">
  <div id="app">
      <Header/>
      <router-view></router-view>
  </div>
</template>
<script>
import Header from "./views/components/Header";

export default {
  name: 'App',
  components: {
    Header,
  }
}
</script>

<style>

html,body{
  margin: 0;
  padding: 0;
  width:100%;
  height:100%;
  position: relative;
}

</style>
