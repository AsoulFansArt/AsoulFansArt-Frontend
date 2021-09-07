<template>
  <div class="v-waterfall">
    <ImageCard
        v-for="img in waterfallList"
        :img="img"
        :key="img.key"
        class="v-waterfall-item"
        @click="jumpBili(img)"
        :style="{top:img.top+'px',left:img.left+'px',width:imageWidth+'px',height:img.height+'px', bottom:0, position:'absolute'}">
    ></ImageCard>
  </div>
</template>

<script>
import ImageCard from "./ImageCard";


export default {
  name: "Waterfall",
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
  }
}
</script>

<style lang="scss" scoped>
.v-waterfall{
  height: 100%;
}
.v-waterfall-item{
  box-shadow: 0 0 8px rgba(0,0,0,.175)!important;
  overflow: hidden;
  transition: none !important;
  position: relative;
  z-index:10;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 16px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
}
</style>