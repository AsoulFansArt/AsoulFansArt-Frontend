<template>

  <div class="img-card">
    <!-- 排名卡片 -->
    <div v-if="showRank" class="img-rank" :class="[imgIndex === 1?'img-rank-gold':imgIndex === 2?'img-rank-silver':imgIndex === 3?'img-rank-copper':'img-rank-normal']" >
      <div size="10" style="display: flex;justify-content: center">{{ imgIndex }}</div>
    </div>
    <!-- 图片数量卡片 -->
    <div class="imgnums" v-if="img.pic_url.length>1">
      <div><font-awesome-icon icon="clone"/> {{img.pic_url.length}}</div>
    </div>
    <!-- 作者卡片 -->
    <a class="picowner" v-if="owner" :href="`space/${img.uid}`" target="_blank">
      <div style="display: flex; align-items: center" >
        <img style="width: 24px; height: 24px; border-radius: .75rem;margin-right: 1px;: " :src="`${img.face}@64w_64h_1e_1c.webp`">
        {{img.name}}
      </div>
    </a>

    <a class="img-div" :href="`https://t.bilibili.com/${img.dy_id}?tab=2`" @click="jumpBili(img.dy_id)" target="_blank">
      <!-- 图片懒加载 -->
      <img v-lazy="img.src" class='image' :key='img.src' alt="">

<!--        &lt;!&ndash; 加载前占位 &ndash;&gt;-->
<!--        <template #placeholder>-->
<!--          <div  class="image-slot">-->
<!--            <div-->
<!--                v-loading="true"-->
<!--                element-loading-background="rgba(0,0,0,0.4)"-->
<!--                :style="{height: img.height+'px',width:imageWidth + 'px',backgroundColor:img.color}"></div>-->
<!--          </div>-->
<!--        </template>-->
<!--        &lt;!&ndash; 加载失败占位 &ndash;&gt;-->
<!--        <template #error>-->
<!--          <div  class="image-slot">-->
<!--            <div :style="{height:img.height+'px',width:imageWidth + 'px',backgroundColor:img.color}"></div>-->
<!--          </div>-->
<!--        </template>-->
    </a>
  </div>

</template>

<script>
import Api from '../../util/http'

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
    jumpBili(dyID){
      Api._tempView({
        work_type: 1,
        work_id: dyID
      })
      // alert(dyID)

    },
  },
  data() {
    return {
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      srcList: [
        'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg',
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
a{
  text-decoration: none;
}
.img-div{
  padding: 0;
  //border-radius: 10px;
  overflow: hidden;
}
.image{
  box-shadow: 0 0 8px rgba(0,0,0,.175)!important;
  //border-radius: 16px;
  transition: transform .45s ease-in-out;
}

.img-title{
  transition: opacity .25s ease-in-out;
  opacity: 0;
  bottom: 50%;
  transform: translateY(50%);
}
.img-rank{
  position: absolute;
  z-index: 90;
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
.imgnums{
  position: absolute;
  z-index: 90;
  top: 8px;
  right: 10px;
  border-radius: .375rem;
  background: rgba(99,99,99,.5);
  color: white;
  font-size: x-small;
  padding: .35rem .375rem;
}
.picowner{
  position: absolute;
  z-index: 90;
  bottom: 8px;
  right: 10px;
  border-radius: .375rem;
  background: rgba(99,99,99,.5);
  color: rgb(247,247,247);
  font-size: x-small;
  font-weight: 500;
  padding: .35rem .375rem;
}
.img-card{
  &:hover{
    .img-title{
      opacity: 1;
    }
    .image{
      transform: scale(1.1,1.1);
    }

  }
}

</style>
