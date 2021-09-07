<template>
  <div class="header">
    <img
        class="head-menu"
        src="../../../public/1.gif"
        alt=""
        style="width: 4rem"
        @click="isCollapse = !isCollapse"
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

<style scoped>
.header{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;
  background: #f8f8f8;
  box-shadow:0 15px 15px -15px rgba(0,0,0,0.1);
}
.head-pic{
  margin-right: 10px;
}
.head-menu{
  margin-left: 10px;
}
.draw{
  height: 100%;
}
.aside{
  position: absolute;
  z-index: 90;
  height: 100%;
}
</style>
