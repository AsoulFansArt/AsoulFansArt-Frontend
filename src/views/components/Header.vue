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
        :style="{width: '16rem'}"
    >

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
import {useRoute} from 'vue-router'

export default {
  name: "Header",
  components:{
    NavItem
  },
  data(){
    return{
      scrollbarHeight:0,
      g:g,
      drawer: false,
      direction:'ltr',
      isCollapse:false,
      isShow:true,
    }
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
