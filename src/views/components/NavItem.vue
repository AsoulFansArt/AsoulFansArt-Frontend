<template>

  <ul class="menu-list" >
    <li><a href="/" class="menu-link"><span class="icon" ><i class="el-icon-house menu-item-icon"></i></span><span class="menu-item-text">首页</span></a></li>
    <li><a href="/video" class="menu-link"><span class="icon" ><i class="el-icon-video-camera menu-item-icon"></i></span><span class="menu-item-text">视频</span></a></li>
    <li><a href="/pic" class="menu-link"><span class="icon" ><i class="el-icon-picture-outline menu-item-icon"></i></span><span class="menu-item-text">图片</span></a></li>
    <li><a href="/article" class="menu-link"><span class="icon" ><i class="el-icon-reading menu-item-icon"></i></span><span class="menu-item-text">专栏</span></a></li>
    <li><a href="/meme" class="menu-link"><span class="icon" ><i class="el-icon-lollipop menu-item-icon"></i></span><span class="menu-item-text">趣味P图大赛</span></a></li>
    <li><a href="/submit" class="menu-link"><span class="icon" ><i class="el-icon-upload2 menu-item-icon"></i></span><span class="menu-item-text">提交/推荐作品</span></a></li>
  </ul>

</template>

<script>
export default {
  name: "NavItem",
  data(){return{
    links:[
      {
        index:3,
        title:"联系我们",
        link:"https://space.bilibili.com/291072226"
      },
      {
        index:4,
        title:"A-SOUL WORLD - 一个魂的各种网站",
        link:"https://www.asoulworld.com/"
      },
      {
        index:5,
        title:"A-SOUL FAN - 属于一个魂的小工具捏",
        link:"https://asoulfan.com"
      },
      {
        index:6,
        title:"A-SOUL Database - 二创切片的有力助手",
        link:"https://asdb.live"
      },        {
        index:7,
        title:"枝网查重（查重姬）",
        link:"https://asoulcnki.asia"
      },{
        index:8,
        title:"小作文收录",
        link:"https://asoul.icu/#/"
      },{
        index:9,
        title:"A-SOUL WIKI",
        link:"https://asoulwiki.com"
      },{
        index:9,
        title:"嘉晚饭",
        link:"https://jiawanfan.cn/"
      },{
        index:10,
        title:"[游戏]枝江异闻录",
        link:"https://h.bilibili.com/156259680"
      },{
        index:11,
        title:"[VS Code插件]A-SOUL鼓励师",
        link:"https://marketplace.visualstudio.com/items?itemName=AS042971.asoul"
      }
    ]
  }},
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
