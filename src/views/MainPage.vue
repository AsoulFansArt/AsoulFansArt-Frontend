<template>
<div>
  <div class="icon-menu" ref="menuContainer">
    <a class="icon-card" href="/video" ref="menuIcon">
      <el-icon :size="32" style="margin: 9px">
        <VideoCamera />
      </el-icon>
      <div class="icon-desc">视频</div>
    </a>
    <a class="icon-card" href="/pic">
      <el-icon :size="32" style="margin: 9px">
        <Picture />
      </el-icon>
      <div class="icon-desc">图片</div>
    </a>
    <a class="icon-card" href="/article">
      <el-icon :size="32" style="margin: 9px">
        <Reading />
      </el-icon>
      <div class="icon-desc">专栏</div>
    </a>
    <a class="icon-card" href="/meme">
      <el-icon :size="32" style="margin: 9px">
        <Lollipop />
      </el-icon>
      <div class="icon-desc">P图大赛</div>
    </a>
    <a class="icon-card" href="/submit">
      <el-icon :size="32" style="margin: 9px">
        <Upload />
      </el-icon>
      <div class="icon-desc">提交作品</div>
    </a>
    <a class="icon-card" href="https://space.bilibili.com/291072226" target="_blank">
      <el-icon :size="32" style="margin: 9px">
        <Message />
      </el-icon>
      <div class="icon-desc">联系我们</div>
    </a>
    <a v-for="link in links" :key="link" class="icon-card" :href="link.link" target="_blank">
      <el-image :src="link.icon" style="margin: 9px;width: 32px;height: 32px"></el-image>
      <div class="icon-desc">{{ link.name }}</div>
    </a>
    <a v-for="linkAfter in linksAfter" :key="linkAfter" class="icon-card-no-hover">

    </a>

  </div>
</div>
</template>

<script>

import { VideoCamera,Picture,Reading,Lollipop,Upload,Message } from '@element-plus/icons'
import "../assets/scss/card.scss"
import "../assets/scss/a.scss"
import local from "../util/local";

export default {
  name: "MainPage",
  data(){
    return{
      picList:[],
      imageWidth:"200px",
      totalImgWidth:0,
      links:[],
      navNum:6,
      linksAfter:0,
    }
  },
  mounted() {
    let fullWidth = this.$refs.menuContainer.clientWidth;
    let iconWidth = this.$refs.menuIcon.clientWidth;
    let col = Math.floor(fullWidth/iconWidth)
        local._getLinks().then((res)=>{
        this.links = res.data;
        let linksNum = this.links.length + this.navNum
        let row = Math.ceil(linksNum / col);
        let fullLinks = row * col;
        this.linksAfter = fullLinks - linksNum
    })

  },
  components:{
    VideoCamera,
    Picture,
    Reading,
    Lollipop,
    Upload,
    Message
  },
}
</script>

<style lang="scss" scoped>
a{
  text-decoration: none;
  color: black;
  transition: 0.5s;
}
a:hover{
  color:black;
}
.icon-menu{

  display: flex;
  justify-content: center;

  flex-wrap: wrap;
  pointer-events: auto;
  border:-1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  :hover {
    border:-1px solid rgba(0, 0, 0, 0.08);
    border-radius: 8px;
    background: rgba(245, 245, 245, 0.88);
  }


}



.icon-card{
  width: 7.5rem;
  padding: 1rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  :hover{
    border: none;
    border-radius: 0;
  }
}

.icon-card-no-hover{
  width: 7.5rem;
  padding: 1rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  pointer-events: none;
}




.icon-desc{
  font-size: x-small;
}


</style>
