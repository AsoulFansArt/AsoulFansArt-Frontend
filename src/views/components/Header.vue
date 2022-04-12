<template>
<!--  悬浮工具栏-->
  <div style="position: fixed;left:20px;bottom: 20px; z-index:99;">
    <button class="button is-medium" @click="this.modalActive === '' ? this.modalActive='is-active':this.modalActive=''">
        <span class="icon is-medium is-centered">
          <font-awesome-icon icon="bars" />
        </span>
    </button>
  </div>
<!--  导航弹窗-->
  <div class="modal" :class="modalActive" >
    <div class="modal-background" @click="modalActive=''"></div>
    <div class="modal-card">
      <section class="modal-card-body" style="margin: 1rem; border-radius: 0.75rem">
        <NavItem></NavItem>
      </section>
    </div>
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
      modalActive:"",
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
    getRandom(){
      let day = new Date().getDay();
      return Math.ceil(day%5)
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
              type: 'success',
              message: '登录成功: ' + value,
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
