<template>
<div>
  <div
      class="video-container" ref="videoContainer"
      v-infinite-scroll="load"
      :infinite-scroll-disabled="disabled"
      infinite-scroll-distance="100"
  >
    <a v-for="(item,index) in response" :key="index" class="item" :style="`width:${videoWidth}px`"
      :href="`https://www.bilibili.com/video/${item.bvid}`"
       target="_blank"
    >
      <div>
        <img
            :src="`${item.pic}@${412}w_${232}h_1e_1c.webp`"
            alt="" class="image" >
      </div>

      <div class="title">{{item.title}}</div>
    </a>
  </div>
  <p v-if="isload" style="text-align: center">
    <font-awesome-icon icon="spinner" size="2x"/>
  </p>
</div>
</template>

<script>
import Api from "../../util/http"
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
      isload:false,
    }
  },
  created() {
    this.load()
  },
  methods:{
    load () {
      this.isload = true
      this.busy = true
      this.page++;
      try {
        Api._getBV({
          uid:this.uid,
          page:this.page,
          sort:2,
        }).then((res) => {
          this.isload = false
          if (res.data.message === "没有更多数据") {
            alert(res.data.message)
            this.noMore = true;
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
  computed: {
    disabled() {
      if (this.noMore)
        return this.noMore
      return this.isload;
    },
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