<template>
  <div class="tabs is-toggle is-small is-centered" style="margin-top: 2rem">
    <ul>
      <li v-for="tab in tabs" :class="tabActive === tab.param ? 'is-active':''" :key="tab.name" @click="handleTabsClick(tab.param)">
        <a>
          <span class="icon is-small" ><i :class="tab.icon"></i></span>
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
        infinite-scroll-distance="10"
        infinite-scroll-disabled="disabled"

        v-loading="isload"

    >

      <VideoCard
          v-for="(item,index) in response"
          v-bind:key="index"
          :item="item"
          :videoWidth="mainStyle.col_rank_image_width"
          :isMobile="isMobile"
      ></VideoCard>

    </div>

    <p v-if="loading" style="text-align: center"><i class="el-icon-loading"></i></p>

  </div>
</template>

<script>
import g from '../util/general'
import Api from '../util/http.js'
import {ElMessage} from "element-plus";
import VideoCard from "./components/VideoCard";
import Axios from "axios";

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
          "icon":"el-icon-timer",
          "param":"default",
        },        {
          "name":"B站热门",
          "icon":"el-icon-medal",
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
      this.loading = true
      if(this.tabActive === "top"){
        Axios({
          url:"https://api.asoul.cloud:8000/AsoulRT-top30",
          method: "get",
        }).then((res)=>{
          console.log(res.data.data.result)
          this.response = res.data.data.result
          this.response.splice(this.response.findIndex(item => item.owner.mid === 660551654), 1)
          for (let item of this.response){
            item.uid = item.owner.mid
            item.face = item.owner.face
            item.name = item.owner.name
            item.stat_view = item.stat.view
            item.stat_danmaku = item.stat.danmaku
            item.stat_like = item.stat.like
            item.stat_coin = item.stat.coin
            item.stat_favorite = item.stat.favorite
            item.stat_reply = item.stat.reply
            item.stat_share = item.stat.share
          }
          this.loading = false

        })
      }else{
        this.response = []
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
      if(this.tabActive === "top"){
        return
      }
      this.loading = true
      this.load_params.page++;
      try {
        Api._getBV(this.load_params).then((res) => {
          this.loading = false
          if (res.data.message === "没有更多数据") {
            ElMessage.warning({
              message: '没有更多了......',
              type: 'warning'
            });
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
      return this.noMore || this.loading
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
