<template>
<div>
  <div class="icon-menu">
    <a class="icon-card" href="/video">
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
    <a class="icon-card" href="https://asoulcnki.asia/" target="_blank">
      <el-image src="./img/zwcc.svg" style="margin: 9px;width: 32px;height: 32px"></el-image>
      <div class="icon-desc">枝网查重</div>
    </a>
    <a class="icon-card" href="https://www.asoulworld.com/" target="_blank">
      <el-image src="./img/aswd.png" style="margin: 9px;width: 32px;height: 32px"></el-image>
      <div class="icon-desc">AsoulWorld</div>
    </a>
    <a class="icon-card" href="https://asoulfan.com/" target="_blank">
      <el-image src="./img/asf.ico" style="margin: 9px;width: 32px;height: 32px"></el-image>
      <div class="icon-desc">AsoulFan</div>
    </a>
    <a class="icon-card" href="https://asdb.live" target="_blank">
      <el-image src="./img/asdb.ico" style="margin: 9px;width: 32px;height: 32px"></el-image>
      <div class="icon-desc">AsoulDB</div>
    </a>
    <a class="icon-card" href="https://asoul.icu/#/" target="_blank">
      <el-image src="./img/xzw.ico" style="margin: 9px;width: 32px;height: 32px"></el-image>
      <div class="icon-desc">小作文</div>
    </a>
    <a class="icon-card" href="https://asoulwiki.com/" target="_blank">
      <el-image src="./img/asdb.ico" style="margin: 9px;width: 32px;height: 32px"></el-image>
      <div class="icon-desc">AsoulWIKI</div>
    </a>
    <a class="icon-card" href="https://zhijiang.university/" target="_blank">
      <el-image src="./img/zj.png" style="margin: 9px;width: 32px;height: 32px"></el-image>
      <div class="icon-desc">枝江大学</div>
    </a>
    <a class="icon-card" href="https://asoul.jp/" target="_blank">
      <el-image src="./img/asjp.ico" style="margin: 9px;width: 32px;height: 32px"></el-image>
      <div class="icon-desc">AsoulJP</div>
    </a>
    <a class="icon-card" href="https://github.com/XiaoMiku01/bili-live-heart" target="_blank">
      <el-image src="./img/github.png" style="margin: 9px;width: 32px;height: 32px"></el-image>
      <div class="icon-desc">B站粉丝牌助手</div>
    </a>
    <a class="icon-card" href="https://jiawanfan.cn/" target="_blank">
      <el-image src="./img/jwf.jpg" style="margin: 9px;width: 32px;height: 32px"></el-image>
      <div class="icon-desc">嘉晚饭</div>
    </a>
    <a class="icon-card" href="https://h.bilibili.com/156259680" target="_blank">
      <el-image src="./img/asdb.ico" style="margin: 9px;width: 32px;height: 32px"></el-image>
      <div class="icon-desc">枝江异闻录</div>
    </a>
    <a class="icon-card" href="https://marketplace.visualstudio.com/items?itemName=AS042971.asoul" target="_blank">
      <el-image src="./img/asdb.ico" style="margin: 9px;width: 32px;height: 32px"></el-image>
      <div class="icon-desc">A-SOUL鼓励师</div>
    </a>

  </div>
</div>
</template>

<script>

import { VideoCamera,Picture,Reading,Lollipop,Upload,Message } from '@element-plus/icons'
import "../assets/scss/card.scss"
import "../assets/scss/a.scss"
export default {
  name: "MainPage",
  data(){
    return{
      picList:[],
      imageWidth:"200px",
      totalImgWidth:0,
    }
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
  justify-content: center;
  display: flex;
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



.icon-desc{
  font-size: x-small;
}


</style>
