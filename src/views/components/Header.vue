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

    <a href="/">
      <img
        class="head-menu"
        src="../../../public/logo.png"
        alt=""
        :style="{width: '16rem'}"
      >
    </a>
  <div class="user-avatar">
    <el-avatar
        v-once
        @click="loginMessageBox"
        :src="`https:${avatarList[randomFaceIndex]}`"></el-avatar>
  </div>
</div>



<div class="aside" style="overflow: auto" ref="aside">
  <el-drawer
      v-model="isCollapse"
      direction="ltr"
      :size="{width: g._isMobile()?'100%':'30%'}"
      :withHeader="false"
      style="overflow: auto"
  >
    <el-scrollbar :height="`${scrollbarHeight}px`">
      <NavItem></NavItem>
    </el-scrollbar>
  </el-drawer>
</div>




</template>

<script>
import g from '../../util/general'
import NavItem from "./NavItem";

export default {
  name: "Header",
  components:{
    NavItem,
  },
  data(){
    return{
      randomFaceIndex: this.getRandom(0,4),
      scrollbarHeight:0,
      g:g,
      drawer: false,
      direction:'ltr',
      isCollapse:false,
      isShow:true,
      avatarList:[
          "//i0.hdslb.com/bfs/album/e60150aa8dc26c9ac2845c1529a49ac9a716f05d.jpg@64w_64h_1e_1c.webp",
          "//i0.hdslb.com/bfs/album/3645a6c37c00a3e2e3cec9653d487d63025307a0.jpg@64w_64h_1e_1c.webp",
          "//i0.hdslb.com/bfs/album/889abf8b47d0587cc20061a572163592ed4d5aae.jpg@64w_64h_1e_1c.webp",
          "//i0.hdslb.com/bfs/album/5a057f6ae3767b8f2fe9e650f08a5cc02e5a74c6.jpg@64w_64h_1e_1c.webp",
          "//i0.hdslb.com/bfs/album/0dd69527fe1873bd48bcc245ec81a709431cd73d.jpg@64w_64h_1e_1c.webp"
      ]
    }
  },
  methods:{
    getRandom(min, max){
      return (Math.random() * (max - min + 1) | 0) + min
    },
    loginMessageBox(){
      this.$prompt('请输入登录密钥', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern:
          /^[0-9a-zA-Z_]+$/,
        inputErrorMessage: '密钥格式不正确',
      })
          .then(({ value }) => {
            this.$message({
              type: 'error',
              message: 'error',
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '取消输入',
            })
          })
    },
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
  },


  mounted() {
    this.scrollbarHeight = this.$refs.aside.offsetHeight

    let router = window.location.href
    if (router.substr(-1) === "/"){
      // this.isCollapse = true
    }


  }

}
</script>

<style lang="scss" scoped>
.header{
  width: 100%;
  margin-bottom: 5px;
  background: #fff;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  box-shadow: 0 0 8px rgba(0,0,0,.175)!important;
  .user-avatar{
    position: absolute;
    right: 2rem;
    top:6px;
  }
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
