<template>
  <Condition @changeMs="getResult" @changeLoad="getLoadStatus"></Condition>
  <!--主界面-->
  <div class="container-fluid">
    <div
        ref="container"
        style="position: relative"
        v-infinite-scroll="load"
        infinite-scroll-distance="10"
        infinite-scroll-disabled="disabled"
        class="main row justify-content-center"
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
    <p v-if="!loading" style="text-align: center;padding-bottom: 5px">
      <el-button
          plain
          :disabled="noMore"
          type="primary" @click="nextPage"
          lazy
      >下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button></p>
  </div>
</template>

<script>
import g from '../util/general'
import Api from '../util/http.js'
import Condition from "./components/Condition";
import {ElMessage} from "element-plus";
import VideoCard from "./components/VideoCard";

export default {
  name: "Rank",
  components:{
    Condition,
    VideoCard
  },
  data() {
    return {
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
    Api._getNotification().then((res)=>{
          if(res.data.length > 0){
            for (let item of res.data){
              console.log(item)
              setTimeout(()=>{
                this.$notify({
                  title: '公告',
                  dangerouslyUseHTMLString: true,
                  message:  item.content,
                  duration: 0
                },1000);
              })


            }
          }

        }
    )
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
    this.load()
  },
}
</script>

<style lang="scss" scoped>

</style>
