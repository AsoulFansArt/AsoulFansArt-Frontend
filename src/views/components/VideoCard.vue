<template>
  <div
      class="main-item"
      style="margin: 1rem"
  >
    <div :style="{width:'70rem', overflow:'hidden'}">
      <div class="col-rank" @click="jumpBili(item.bvid)">
        <img
            v-lazy="`${item.pic}@${412}w_${232}h_1e_1c.webp`"
            :style="{width: videoWidth}"
            alt="" class="image" >

        <div class="col-info">
          <div class="col-title">{{item.title}}</div>
          <div class="col-data">
            <div class="col-rank-item" v-if="item.his_rank">
              全站排行榜最高第{{item.his_rank}}名
            </div>
            <div class="col-rank-item" v-if="item.now_rank">
              当前排行榜第{{item.now_rank}}名
            </div>

            <div>
              <a class="picowner"  @click="jumpSpace($event)" :href="`space/${item.uid}`" target="_blank">
                <div style="display: flex; align-items: center" >
                  <img style="width: 20px; height: 20px; border-radius: .75rem;margin-right: 1px;: " v-lazy="`${item.face}@32w_32h_1e_1c.webp`">
                  {{item.name}}
                </div>
              </a>
            </div>
            <span class="col-data-item"><font-awesome-icon icon="circle-play" class="mr-1"/>{{g._changeBillionToCN(item.stat_view)}}</span>
            <span class="col-data-item"><font-awesome-icon icon="chart-gantt" class="mr-1"/>{{g._changeBillionToCN(item.stat_danmaku)}}</span>
            <span class="col-data-item"><font-awesome-icon icon="clock" class="mr-1"/>{{g._timestampToTime(item.pubdate)}}</span>
            <span v-if="!isMobile">
              <span class="col-data-item"><font-awesome-icon icon="heart" class="mr-1"/>{{g._changeBillionToCN(item.stat_like)}} </span>
              <span class="col-data-item"><font-awesome-icon icon="coins" class="mr-1"/>{{g._changeBillionToCN(item.stat_coin)}}</span>
              <span class="col-data-item"><font-awesome-icon icon="star" class="mr-1"/>{{g._changeBillionToCN(item.stat_favorite)}}</span>
              <span class="col-data-item"><font-awesome-icon icon="comment" class="mr-1"/>{{g._changeBillionToCN(item.stat_reply)}}</span>
              <span class="col-data-item"><font-awesome-icon icon="share" class="mr-1"/>{{g._changeBillionToCN(item.stat_share)}}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
import g from '../../util/general'
export default {
  name: "VideoCard",
  data(){
    return{
      g:g,
    }
  },
  methods:{
    jumpBili(bvid){
      window.open(`https://www.bilibili.com/video/${bvid}`)
    },
    jumpSpace(event){
      event.stopPropagation()
      console.log(event)
    },
  },
  props:{
    item:{
      type:Object,
      description:"视频数据"
    },
    videoWidth:{
      type:String,
      description: "视频宽度"
    },
    isMobile:{
      type:Boolean,
      description:"是否手机"
    }
  },

}
</script>

<style lang="scss" scoped>
a{
  text-decoration: none;
  color: black;
}
.col-rank{
  width: 100%;
  display: flex;
  border: none;
  border-bottom:1px solid gray;
  padding-bottom: 5px;
  position:relative;
  height: 100%;
  .image {
    border-radius: 5px;
    object-fit: cover;
  }
  .col-info{
    position:relative;
    width:60%;
    height: 100%;
    margin-left: 0.5em;
    .col-title{
      font-size: smaller;
      flex:1;
      overflow: hidden;
      height: 50%;
    }
    .col-data{
      position:absolute;
      font-size: x-small;
      bottom: 0;
      .col-data-item{
        margin-right: 1em;
        i {
          margin-right: 0.3em;
        }
      }
    }
  }
  .col-score{
    text-align: center;
    width: 5rem;
    margin-top: 1rem;
    position: absolute;
    right: 1rem;
  }
}


.col-rank-item{
  color:#ea9999;
  font-size: xx-small;
}
.col-tags{
  display: flex;
  justify-content: space-between;
}
.col-sel{
  display: flex;
  justify-content: center;
  margin-bottom: 5px;
}
.col-tag-item{
  margin: 5px;
}

.main-item{
  display: flex;
  justify-content: center;
}
</style>