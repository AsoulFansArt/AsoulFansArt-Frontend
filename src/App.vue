<template>
  <meta name="referrer" content="no-referrer" />
  <meta name="viewport" content="width=device-width,height=device-height,initial-scale=1.0,maximum-scale=1.0,user-scalable=no">
  <meta content="yes" name="apple-mobile-web-app-capable">
  <div id="app">
      <Header></Header>
      <router-view></router-view>
      <el-button class="add-button">点击将网站添加到桌面</el-button>
  </div>
  <amp-ad width="100vw" height="320"
      type="adsense"
      data-ad-client="ca-pub-7074634969717219"
      data-ad-slot="3332100452"
      data-auto-format="rspv"
      data-full-width="">
    <div overflow=""></div>
  </amp-ad>
</template>
<script>
import Header from "./views/components/Header";
import Api from "./util/http";
import local from "./util/local";
import { ElNotification } from 'element-plus'

export default {
  name: 'App',
  components: {
    Header,
  },
  methods:{
    showNotice(content){
      setTimeout(() => {
        ElNotification({
          title: '网站公告',
          message: content,
          duration: 5000
        });
      }, 1000)
    },
    showPwaAddBut(){
      let deferredPrompt;
      const addBtn = document.querySelector('.add-button');
      addBtn.style.display = 'none';

      window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent Chrome 67 and earlier from automatically showing the prompt
        e.preventDefault();
        // Stash the event so it can be triggered later.
        deferredPrompt = e;
        // Update UI to notify the user they can add to home screen
        addBtn.style.display = 'block';

        addBtn.addEventListener('click', (e) => {
          // hide our user interface that shows our A2HS button
          addBtn.style.display = 'none';
          // Show the prompt
          deferredPrompt.prompt();
          // Wait for the user to respond to the prompt
          deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
              console.log('User accepted the A2HS prompt');
            } else {
              console.log('User dismissed the A2HS prompt');
            }
            deferredPrompt = null;
          });
        });
      });
    }
  },
  mounted() {
    local._getVersion({time:new Date().getTime()}).then(res => {
      if(localStorage.version===undefined){
        localStorage.setItem("version", res.data.version)
      }else{
        if(localStorage.version!==res.data.version){
          localStorage.removeItem("version")
          this.$router.go(0)
        }
      }
    })
    Api._tempLogin()
    this.showPwaAddBut()
    Api._getNotification().then((res)=>{
      if(res.data.length > 0)
        for (let item of res.data)
          this.showNotice(item.content)
    })
  }
}
</script>

<style>
#app{
  height: 100%;

}
html,body{
  margin: 0;
  padding: 0;
  width:100%;
  height:auto;
  position: relative;
}

html{
  background: #f8f8f8 !important;
}
.add-button {
  position: absolute;
  top: 1px;
  left: 50%;
  z-index: 999;
  border: none;
  background: #FC966E;
}
</style>
