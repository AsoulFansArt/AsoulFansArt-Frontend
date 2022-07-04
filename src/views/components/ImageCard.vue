<template>

  <el-card style="overflow: hidden;" shadow="hover" :body-style="{padding: 0}">
    <!-- 排名卡片 -->
    <div v-if="showRank" class="img-rank" :class="[imgIndex === 1?'img-rank-gold':imgIndex === 2?'img-rank-silver':imgIndex === 3?'img-rank-copper':'img-rank-normal']" >
      <div size="10" style="display: flex;justify-content: center">{{ imgIndex }}</div>
    </div>
    <!-- 图片数量卡片 -->
    <div class="img-nums" v-if="img.pic_url.length>1">
      <div><font-awesome-icon icon="clone"/> {{img.pic_url.length}}</div>
    </div>

    <div style="overflow: hidden; width: 100%; border-bottom: 1px solid #e4e7ed; background: white; font-size: 0">
      <div class="img-div" @click="jumpBili(img.dy_id, `https://t.bilibili.com/${img.dy_id}?tab=2`)" target="_blank">
        <!-- 图片懒加载 -->
        <el-image
            class="img-card image"
            style="transition: transform .45s ease-in-out"
            :src="formatSrc(img.src, img.pic_url[0].img_width)"
            :key='img.src'
            :style="{height: img.height - 40 +'px',width:imageWidth + 'px'}"
        lazy>
          <!-- 加载前占位 -->
          <template #placeholder>
            <div  class="image-slot">
              <div
                  v-loading="true"
                  element-loading-background="rgba(0,0,0,0.4)"
                  :style="{height: img.height+'px',width:imageWidth + 'px',backgroundColor:img.color}"></div>
            </div>
          </template>
          <!-- 加载失败占位 -->
        </el-image>
      </div>
    </div>
    <!-- 作者卡片 -->
    <div class="img-action p-1">
      <div class="img-owner">
        <img alt="" style="width: 32px; height: 32px; border-radius: 50%;margin-right: 1px; " :src="`${img.face}@64w_64h_1e_1c.webp`">
        <span class="owner-name" @click="$router.push({path:`/space/${img.uid}`})">{{img.name}}</span>
      </div>
      <div class="img-art-star" @click="sendFavouriteArt(img.dy_id, img)" :class="isClick || img.isLike ? 'art-star-check':''">
        <font-awesome-icon icon="star"></font-awesome-icon>
      </div>
    </div>
  </el-card>

</template>

<script>
import Api from '../../util/http'
import {ElMessage} from "element-plus";


export default {
  name: "ImageCard",
  props:{
    img:{
      type:Object,
      description:"图片数据"
    },
    imageWidth: {
      type:Number,
      description:"图片宽度"
    },
    mode: {
      type:String,
      description:"样式"
    },
    owner: {
      type:Boolean,
      description:"显示作者",
      default:true,
    },
    imgIndex:{
      type:Number,
      description:"图片索引"
    },
    showRank:{
      type:Boolean,
      description:"图片索引",
      default:false,
    }
  },
  methods:{
    formatSrc(src, originWidth){
      /*
      let _src = src.split("/")[5].split("@")
      let hash = _src[0]
      let params = _src[1]

      let imgWidth = params.substring(0, 3)
      if (originWidth < Number(imgWidth))
        imgWidth = originWidth
      return `https:///images/${hash}?w=${imgWidth}&format=webp`*/
      return src
    },
    jumpBili(id, url){
      window.open(`/pic/${id}`)
      //window.open(url)
      try{
        if (localStorage.getItem("token").length > 10){
          Api._addView({
            art_id: id
          })
        }else{
          Api._tempView({
            work_type: 1,
            work_id: id
          })
        }
      }catch (err){
        Api._tempView({
          work_type: 1,
          work_id: id
        })
      }

      // alert(dyID)

    },
    async sendFavouriteArt(id, img){
      try {
        this.isClick = !this.isClick
        let res = await Api._addFavorites({art_id: id})
        if (res.data.message === "添加成功"){
          this.isClick = true

          ElMessage.success({
            message: "添加成功",
            duration: 500,
          })
        }
        else if (res.data.message === "删除成功"){
          this.isClick = false
          img.isLike = false
          ElMessage.error({
            message: "删除成功",
            duration: 500,
          })
        }else{
          if(res.data.code===401){
            ElMessage.error("请先登陆")
          }else{
            alert(res.data.message)
          }
          this.isClick = false
        }

      }catch (err){
        ElMessage.error("网络错误")
        console.log(err)
      }
    }
  },
  data() {
    return {
      isClick: false,
    }
  },

}
</script>

<style lang="scss" scoped>


a{
  text-decoration: none;
  color: black;
}
.img-div{
  cursor: pointer;
  padding: 0;
  overflow: hidden;
  font-size: 0;
  &:hover{
    .image{
      transform: scale(1.1,1.1);
    }
  }
}

.img-title{
  transition: opacity .25s ease-in-out;
  opacity: 0;
  bottom: 50%;
  transform: translateY(50%);
}
.img-rank{
  position: absolute;
  z-index: 39;
  top: 8px;
  left: 10px;
  border-radius: 50%;
  color: white;
  font-size: 16px;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.img-rank-normal{
  background: rgba(99,99,99,.5);
}
.img-rank-gold{
  background: rgba(255,215,0,.9);
}
.img-rank-silver{
  background: rgba(192,192,192,.9);
}
.img-rank-copper{
  background: rgba(184,115,51,.9);
}
.img-nums{
  position: absolute;
  z-index: 39;
  top: 8px;
  right: 10px;
  border-radius: .375rem;
  background: rgba(99,99,99,.5);
  color: white;
  font-size: x-small;
  padding: .35rem .375rem;
}

.img-owner{
  display: flex;
  align-items: center;
  .owner-name{
    font-size: small;
    font-weight: bolder;
    cursor: pointer;
    color: gray;
    &:hover{
      color: black;
    }
  }


}

.img-art-star{
  color: gray;
  margin-right: .5rem;
  &:hover{
    /* 执行动画: 动画名 时长 加速后减速 停留在最后一帧 */
    //animation: anm 0.5s ease-in-out forwards;
    ///* 动画延迟时间 */
    //animation-delay: 0.85s;
    color: #FC966E;
    cursor: pointer;
  }
}
.art-star-check{
  color: #FC966E;
  animation: anm 0.5s;
}
@keyframes anm {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
}

.img-action{
  background: white;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center
}
</style>
