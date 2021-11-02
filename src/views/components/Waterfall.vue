<template>
  <div class="v-waterfall">

    <ImageCard
        v-for="img in waterfallList"
        :img="img"
        :key="img.key"
        class="v-waterfall-item"
        @click="jumpBili(img)"
        :style="{top:img.top+'px',left:img.left+'px',width:imageWidth+'px',height:img.height+'px', bottom:0, position:'absolute'}">
    >

    </ImageCard>
  </div>
</template>

<script>
import ImageCard from "./ImageCard";
// @click="jumpBili(img)"
//@click="show(img)"

export default {
  name: "Waterfall",
  data(){
    return {
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      srcList: [
        'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg',
      ],
      images: [
        'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg',
      ]
    }
  },
  props:{
    waterfallList:{
      type:Array,
      description: "瀑布流数据"
    },
    imageWidth:{
      type:Number,
      description: "图片宽度"
    },
  },
  components:{
    ImageCard
  },
  methods:{
    jumpBili(item){
      window.open(`https://t.bilibili.com/${item.dy_id}?tab=2`)
    },
    show(imgs) {
      let images = []
      let suffix = ""
      for (let item of imgs.pic_url){
        console.log(item.img_width, item.img_height)
        if (item.img_width > 1000 || item.img_height > 1000){
          while (item.img_width > 1000 || item.img_height > 1000){
            item.img_width = item.img_width * 0.5
            item.img_height = item.img_height * 0.5
            suffix = `@${parseInt(item.img_width)}w_${parseInt(item.img_height)}h_1e_1c.webp`
          }

        }else{
          suffix = `@${parseInt(item.img_width * 0.8)}w_${parseInt(item.img_height * 0.8)}h_1e_1c.webp`
        }
        images = [...images,item.img_src + suffix]
        console.log(images)
      }

      this.$viewerApi({
        images: images,
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.v-waterfall{
  height: 100%;
  position: relative;
}
.v-waterfall-item{
  box-shadow: 0 0 8px rgba(0,0,0,.175)!important;
  overflow: hidden;
  transition: none !important;
  z-index:0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 16px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
}
</style>
