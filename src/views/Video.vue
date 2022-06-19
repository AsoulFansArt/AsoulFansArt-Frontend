<template>
  <div class="tabs is-toggle is-small is-centered" style="margin-top: 2rem">
    <ul>
      <li v-for="tab in tabs" :class="tabActive === tab.param ? 'is-active':''" :key="tab.name" @click="handleTabsClick(tab.param)">
        <a>
          <span class="icon is-small" ><font-awesome-icon :icon="tab.icon"/></span>
          <span>{{ tab.name }}</span>
        </a>
      </li>
    </ul>
  </div>
  <!--主界面-->



  <div style="width: 100%;">
    <div
        ref="container"
        style="position: relative"
        v-infinite-scroll="load"
        :infinite-scroll-disabled="disabled"
        infinite-scroll-distance="100"
    >

      <VideoCard
          v-for="(item,index) in response"
          v-bind:key="index"
          :item="item"
          :videoWidth="mainStyle.col_rank_image_width"
          :isMobile="isMobile"
      ></VideoCard>

    </div>

    <div v-loading="loading" style="text-align: center; height: 200px">

    </div>

  </div>
</template>

<script>
import g from '../util/general'
import Api from '../util/http.js'
import VideoCard from "./components/VideoCard";
import Axios from "axios";
import {ElMessage} from "element-plus";

export default {
  name: "Rank",
  components:{
    VideoCard
  },
  data() {
    return {
      tabActive: "top",
      tabs:[
        {
          "name":"发布时间",
          "icon":"clock",
          "param":"default",
        },        {
          "name":"B站热门",
          "icon":"fire",
          "param":"top"
        }
      ],
      g:g,
      mainStyle:{},
      response: [],
      isload:false,
      loading:false,
      noMore:false,
      isMobile: false,
      load_params:{
        page:0,
        tag_id: 0,
        sort: 2,
        part: 0,
        rank: 0,
        ctime:0,
      },
    }
  },
  methods:{

    handleTabsClick(label){
      this.load_params.page = 0
      this.tabActive = label
      if(this.tabActive === "top"){
        this.response = []
        this.load_params.sort = 5
        this.load()
      }else{
        this.response = []
        this.load_params.sort = 2
        this.load()
      }
    },
    getLoadStatus(bool){
      this.isload = bool
    },
    getResult(data){
      this.noMore = false
      this.response = data.response;
      this.load_params = data.load_params;
    },
    load () {
      this.loading = true
      this.load_params.page++;
      try {
        Api._getBV(this.load_params).then((res) => {
          this.loading = false
          if (res.data.message === "没有更多数据") {
            ElMessage.warning("没有更多了......")
            this.noMore=true
            return}
          this.noMore = false
          this.response = [...this.response,...res.data]

        })
      }catch (e){
        console.log(e)
      }


    },

    nextPage(){
      this.load()
    }

  },
  computed: {
    disabled () {
      if (this.noMore)
        return this.noMore
      return this.loading;
    }
  },
  mounted() {
    window.scrollTo(0, 0)
    let fullWidth = this.$refs.container.clientWidth;

    if (g._isMobile()){
      this.isMobile = true
      if (fullWidth > 700) {
        this.isMobile = false
        this.mainStyle = {
          col_rank_image_width:"10rem"
        }
      } else{
        this.mainStyle = {
          col_rank_image_width:"40%"
        }
      }

    }else{
      this.isMobile = false
      this.mainStyle = {
        col_rank_image_width:"10rem",
      }
    }
    if(this.tabActive === "top"){
      this.handleTabsClick("top")
    }else{
      this.load()
    }

  },
}
</script>

<style lang="scss" scoped>

</style>
