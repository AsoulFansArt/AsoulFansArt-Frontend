<template>
  <div
      class="main-item col-sm-12 col-md-12 col-lg-12 m-1"
  >


    <div :style="{width:'70rem', overflow:'hidden'}">

      <div class="col-rank" @click="jumpBili(item.bvid)">
        <el-image
            :src="`${item.pic}@${412}w_${232}h_1e_1c.webp`"
            :style="{width: videoWidth}"
            alt="" class="image" lazy>

        </el-image>
        <div class="col-info">
          <div class="col-title">{{item.title}}</div>
          <div class="col-data">
            <div class="col-rank-item" v-if="item.his_rank">
              <i class="el-icon-trophy"></i>全站排行榜最高第{{item.his_rank}}名
            </div>
            <div class="col-rank-item" v-if="item.now_rank">
              <i class="el-icon-trophy"></i>当前排行榜第{{item.now_rank}}名
            </div>

            <div><span><i class="el-icon-user-solid"></i>{{item.owner_name}}</span></div>
            <span><i class="el-icon-video-play"></i>{{g._changeBillionToCN(item.stat_view)}}</span>
            <span class="col-data-item"><i class="el-icon-postcard"></i>{{g._changeBillionToCN(item.stat_danmaku)}}</span>
            <span class="col-data-item"><i class="el-icon-time"></i>{{g._timestampToTime(item.pubdate)}}</span>
            <span v-if="!isMobile">
                    <span class="col-data-item"><i class="iconfont icon-0_like1" style="font-size: xx-small;"></i>{{g._changeBillionToCN(item.stat_like)}} </span>
                    <span class="col-data-item"><i class="el-icon-coin"></i>{{g._changeBillionToCN(item.stat_coin)}}</span>
                    <span class="col-data-item"><i class="el-icon-star-off"></i>{{g._changeBillionToCN(item.stat_favorite)}}</span>
                    <span class="col-data-item"><i class="el-icon-chat-line-square"></i>{{g._changeBillionToCN(item.stat_reply)}}</span>
                    <span class="col-data-item"><i class="el-icon-share"></i>{{g._changeBillionToCN(item.stat_share)}}</span>
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
  }
}
</script>

<style lang="scss" scoped>
.el-card{
  height: 100%;
}
.col-rank{
  width: 100%;
  display: flex;
  border-bottom:1px solid #b8c0cc;
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
      margin-left: 5px;
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
.el-select{
  border: 0;
  margin-right: 2px;
  margin-left:0;
}

.col-tag-item{
  margin: 5px;
}
.el-row{
  justify-content: center;
  flex-direction:column;
}

.main-item{
  display: flex;
  justify-content: center;
}
</style>