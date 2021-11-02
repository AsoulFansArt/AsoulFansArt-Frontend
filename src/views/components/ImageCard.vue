<template>

  <div class="img-card">
    <!-- 图片数量卡片 -->
    <div class="imgnums" v-if="img.pic_url.length>1">
      <div><i class="el-icon-copy-document"></i> {{img.pic_url.length}}</div>
    </div>
    <!-- 作者卡片 -->
    <div class="picowner">
      <div><i class="el-icon-user-solid"></i>{{img.owner_name}}</div>
    </div>

    <div :style="{'padding':'0px','border-radius':'10px',overflow:'hidden'}">
      <!-- 图片懒加载 -->

      <el-image
          :src='img.src'
          class='image'
          :key='img.src' lazy>
        <!-- 加载前占位 -->
        <template #placeholder>
          <div  class="image-slot">
            <div :style="{height: img.height+'px',width:imageWidth + 'px',backgroundColor:img.color}"></div>
          </div>
        </template>
        <!-- 加载失败占位 -->
        <template #error>
          <div  class="image-slot">
            <div :style="{height:img.height+'px',width:imageWidth + 'px',backgroundColor:img.color}"></div>
          </div>
        </template>
      </el-image>
    </div>
  </div>
</template>

<script>

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
.image{
  box-shadow: 0 0 8px rgba(0,0,0,.175)!important;
  border-radius: 16px;
  transition: transform .45s ease-in-out;
}

.img-title{
  transition: opacity .25s ease-in-out;
  opacity: 0;
  bottom: 50%;
  transform: translateY(50%);
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
  color: white;
  font-size: x-small;
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
  //::after{
  //  content: "";
  //  position: absolute;
  //  text-align: center;
  //  top: 0;
  //  bottom: 0;
  //  left: 0;
  //  right: 0;
  //  z-index: 0;
  //  width: 100%;
  //  border-radius: 16px;
  //  box-sizing: border-box;
  //  transition: 200ms;
  //  height: 100%;
  //  background-color: rgba(0,0,0,0);
  //  background: {
  //    position: center;
  //    repeat: no-repeat;
  //    size: cover;
  //  }
  //}

  //&:hover{
  //  .img-title{
  //    opacity: 1;
  //  }
  //  .image{
  //    transform: scale(1.1,1.1);
  //  }
  //
  //}


</style>
