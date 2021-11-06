<template>
<div>
  <div
      class="video-container" ref="videoContainer"
      v-infinite-scroll="load"
      infinite-scroll-distance="10"
      infinite-scroll-disabled="busy"
  >
    <a v-for="(item,index) in response" :key="index" class="item" :style="`width:${videoWidth}px`"
      :href="`https://www.bilibili.com/video/${item.bvid}`"
       target="_blank"
    >
      <div>
        <el-image
            :src="`${item.pic}@${412}w_${232}h_1e_1c.webp`"
            alt="" class="image" >
        </el-image>
      </div>

      <div class="title">{{item.title}}</div>
    </a>
  </div>
  <p v-if="loading" style="text-align: center"><i class="el-icon-loading"></i></p>
</div>
</template>

<script>
import Api from "../../util/http"
import {ElMessage} from "element-plus";
export default {
  name: "VideoGrid",
  props:{
    uid:{
      type:String,
    },
  },
  data(){
    return{
      response:[],
      maxColNum:0,
      videoWidth:200,
      noMore: false,
      page:0,
      busy:false,
      loading:false,
    }
  },
  created() {
    this.load()
  },
  methods:{
    load () {
      this.loading = true
      this.busy = true
      this.page++;
      try {
        Api._getBV({
          uid:this.uid,
          page:this.page,
          sort:2,
        }).then((res) => {
          this.loading = false
          if (res.data.message === "没有更多数据") {
            ElMessage.warning({
              message: '没有更多了......',
              type: 'warning'
            });
            return
          }
          this.response = [...this.response,...res.data]
          if (res.data.length === 20)
            this.busy=false
        })
      }catch (e){
        console.log(e)
      }



    },
  },
  mounted() {

    this.$nextTick(()=>{
      //console.log("渲染")
      let fullWidth = this.$refs.videoContainer.clientWidth -24
      if (fullWidth > 1500) {
        this.videoWidth = 200;
      } else if (fullWidth < 800) {
        this.videoWidth = 160;
      }
      //console.log(fullWidth,this.videoWidth)
      this.maxColNum = Math.floor(fullWidth/(this.videoWidth + 10))
      //console.log(this.maxColNum, fullWidth)
      this.videoWidth = (fullWidth - (this.maxColNum * 10)) / this.maxColNum

    })

  },
}
</script>

<style lang="scss" scoped>
a{
  text-decoration: none;
  color: black;
  :hover{
    color: black;
  }
}
.video-container{
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 100%;
  .item{

    margin: 5px;
  }
  .title{
    font-size: 0.7rem;
    font-weight: 500;
  }
  .image{
    border-radius: 0.25rem;
  }
}
</style>