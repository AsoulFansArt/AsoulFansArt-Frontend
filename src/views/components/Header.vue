<template>
  <div class="header">
    <button
        class="nav-menu-button"
        @click="isCollapse = !isCollapse">
      <svg viewBox="0 0 24 24" class="nav-menu-icon"><path d="M4 7C4 6.44772 4.44772 6 5 6H19C19.5523 6 20 6.44772 20 7C20
           7.55228 19.5523 8 19 8H5C4.44772 8 4 7.55228 4 7ZM4 12C4 11.4477 4.44772 11
           5 11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H5C4.44772
           13 4 12.5523 4 12ZM5 16C4.44772 16 4 16.4477 4 17C4 17.5523 4.44772 18 5
           18H19C19.5523 18 20 17.5523 20 17C20 16.4477 19.5523 16 19 16H5Z"></path>
      </svg>
    </button>

    <img
        class="head-menu"
        src="../../../public/logo.png"
        alt=""
        style="width: 16rem"
    >

</div>
  <div class="aside">
    <el-row class="tac">
      <el-col>
        <el-menu
            v-show="isCollapse"
            default-active="1"
            @open="handleOpen"
            @close="handleClose"
            @select="handleSelect"
            router="true"
            active-text-color="#303133"
            :collapse="!isCollapse"
        >
<!--          <el-menu-item index="/">-->
<!--            <i class="el-icon-s-home"></i>-->
<!--            <template #title>首页</template>-->
<!--          </el-menu-item>-->
          <el-submenu index="2">
            <template #title><i class="el-icon-menu"></i><span>二创作品</span></template>
            <el-menu-item-group title="类型">
              <el-menu-item index="1-1"  route="/video"><i class="el-icon-video-camera"></i>视频</el-menu-item>
              <el-menu-item index="1-2"  route="/pic"><i class="el-icon-picture-outline"></i>图片</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!--        <el-menu-item index="2" route="/rank">-->
          <!--          <i class="el-icon-s-data"></i>-->
          <!--          <template #title>排行榜</template>-->
          <!--        </el-menu-item>-->
          <!--        <el-menu-item index="3">-->
          <!--          <i class="el-icon-discover"></i>-->
          <!--          <template #title>推荐</template>-->
          <!--        </el-menu-item>-->
          <el-menu-item index="/submit">
            <i class="el-icon-upload"></i>
            <template #title>提交/推荐作品</template>
          </el-menu-item>
          <el-menu-item-group title="其他">
            <el-menu-item
                v-for="item in links"
                v-bind:key="item.index"
                @click="onSelect(item.link)"
            >
              <i class="el-icon-paperclip"></i>
              <template #title>{{ item.title }}</template>
            </el-menu-item>
          </el-menu-item-group>
          <Bottom></Bottom>
        </el-menu>
      </el-col>
    </el-row>
  </div>




</template>

<script>


import Bottom from "./Bottom";

export default {
  name: "Header",
  data(){
    return{
      drawer: false,
      direction:'ltr',
      isCollapse:false,
      isShow:true,
      links:[
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
          title:"A-SOUL Database - 二创切片的有力助手,免费且开源",
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

    }
  },
  components:{
    Bottom
  },
  methods:{
    onSelect(link){
      window.open(link)
    },
    handleSelect(key, keyPath){
      this.isCollapse =!this.isCollapse
      console.log(key, keyPath);
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
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
</style>
