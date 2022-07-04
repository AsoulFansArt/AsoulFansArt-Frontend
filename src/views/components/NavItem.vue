<template>
  <ul class="menu-list" >
    <li v-for="navLink in navLinks" :key="navLink.name">
      <a @click = "clickJump(navLink.link)" class="menu-link">
        <span class="icon" >
          <font-awesome-icon :icon="navLink.icon" />
        </span>
        <span class="menu-item-text">{{ navLink.name }}</span>
      </a>
    </li>
  </ul>
</template>

<script setup>
import router from "../../router";
import {defineEmits} from "vue";
const navLinks = [
  {
    name:"首页",
    icon:['fas', 'house'],
    link:"/"
  },         {
    name:"视频",
    icon:['fas', 'circle-play'],
    link:"/video"
  },        {
    name:"图片",
    icon:['fas', 'image'],
    link:"/pic"
  },        {
    name:"专栏",
    icon:['fas', 'book-open'],
    link:"/article"
  },       {
    name:"提交/推荐作品",
    icon:['fas', 'upload'],
    link:"/submit"
  },        {
    name:"粉丝团数据",
    icon:['fas', 'chart-line'],
    link:"/fans/medal"
  },{
    name:"5.10时间线",
    icon:['fas', 'history'],
    link:"/asoul/history"
  },{
    name:"个人中心",
    icon:['fas', 'user'],
    link:"/space"
  },

]
// {
//   name:"趣味P图大赛",
//       icon:['fas', 'ice-cream'],
//     link:"/meme"
// },
const emit = defineEmits(['navRouterPush'])
const clickJump = function(link){
  if (link !== "/space"){
    router.push({"path": link})
    emit('navRouterPush', "nav")
  }else{
    emit('navRouterPush', "login")
  }
}
</script>

<style lang="scss" scoped>
.header{
  width: 100%;
  margin-bottom: 5px;
  background: #fff;
}
.head-menu{
  padding: .5rem;
}
.aside{
  position: absolute;
  z-index: 90;
  height: 100%;
}
.nav-menu-icon{
  color: grey;
  fill:currentColor;
  width: 28px;
  height: 28px;
  line-height: 0;
  margin-left: 12px;
  border-radius:50%;
}
.nav-menu-button{
  border: none;
  background-color: rgba(0,0,0,0);
  :hover {
    color: #333;
    background-color: #e6e6e6;
    border-color: #adadad;
  }
}

.menu-item{
  padding: .5rem 3rem .5rem 1.5rem;
  list-style: none;
  display: flex;
  align-items: center;
  .menu-item-icon{
    flex:0 0 auto;
    font-size: x-large;
    color: grey;
    margin-right: .5rem;
  }
  .menu-item-text{
    flex:0 0 auto;
    font-size: small;
  }
}
ul{
  margin: 0;
  padding:0;
}
.ul-menu{
  :hover {
    color: #333;
    background-color: #e6e6e6;
    border-color: #adadad;
  }
}

a {
  color: black;
  text-decoration: none;
}
/*正常的未被访问过的链接*/
a:link {
  text-decoration: none;
}
/*已经访问过的链接*/
a:visited {
  text-decoration: none;
}
/*鼠标划过(停留)的链接*/
a:hover {
  text-decoration: none;
}
/* 正在点击的链接*/
a:active {
  text-decoration: none;
}

.menu-link{
  width: 100%;
  display: flex;
  align-items: center;
}
</style>
