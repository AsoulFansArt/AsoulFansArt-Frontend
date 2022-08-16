<template>
  <div style="width: 100%;height: 100%" ref="container">
    <el-carousel  arrow="never" indicator-position="none" :pause-on-hover="false" v-if="images" :height="`${minHeight}px`">
      <el-carousel-item v-for="item in images" :key="item" style="border-radius:0 0 .75rem .75rem; width: 100%">
        <div class="black-hover" @click="jump(item.dy_id)">
          <div class="illust-count">
            <p class="count-title">Asoul Fan Art - 一个魂的二创</p>
            <p class="count-desc">共收录{{illust_count}}张插画</p>
            <p class="count-desc">看到喜欢的作品请去支持原作者</p>
          </div>
          <span class="illus">@{{item.illus}}</span>
          <el-image style="display: block" :src="item.pic_url[0].img_src">
            <!-- 加载前占位 -->
            <template #placeholder>
              <div  class="image-slot">
                <div
                    v-loading="true"
                    element-loading-background="rgba(0,0,0,0.4)"></div>
              </div>
            </template>
          </el-image>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup>

import {onMounted, ref} from "vue";
import Api from '@util/http.js'

let images = ref()
const container= ref()
let minHeight = ref(0)
let illust_count = ref(0)

const jump = (dy_id)=>{
  window.open(`https://t.bilibili.com/${dy_id}?tab=2`)
}

onMounted(()=>{

  Api._getHomeInfo().then(res=> {
    minHeight.value = res.data.data[0].pic_url[0].img_height
    illust_count.value = res.data.count
    res.data.data.forEach(item=>{
      const scale = item.pic_url[0].img_width / container.value.clientWidth
      const scaleHeight = item.pic_url[0].img_height / scale
      if (scaleHeight < minHeight.value) {
        minHeight.value = scaleHeight
      }
      item.pic_url[0].img_src = `${item.pic_url[0].img_src}@${Math.ceil(container.value.clientWidth * 1.3)}w_${Math.ceil(scaleHeight * 1.3)}h_1e_1c.webp`
    })
    images.value = res.data.data
  })


})
</script>

<style scoped>

/*.demonstration {*/
/*  color: var(--el-text-color-secondary);*/
/*}*/

/*.el-carousel__item h3 {*/
/*  color: #475669;*/
/*  opacity: 0.75;*/
/*  line-height: 150px;*/
/*  margin: 0;*/
/*  text-align: center;*/
/*}*/

.illus{
  position: absolute;
  color: #fff;
  top:1%;
  left: 1%;
  z-index: 99;
  font-size: small;
}
.illust-count{
  width: 100%;
  text-align: center;
  text-shadow: 2px 2px 4px rgb(0 0 0 / 50%);
  position: absolute;
  color: #fff;
  top:50%;
  z-index: 99;
  transform: translateY(-50%);
}
.count-title{
  font-size: x-large;
  font-weight: bold;
}
.count-desc{
  font-size: large;
}


.black-hover{
  display: inline-block;
  width: 100%;
  height: 100%;
  position: relative;

}
.black-hover::before{
  display: inline-block;
  z-index: 98;
  width: 100%;
  height: 100%;
  content: " ";
  background: rgba(0,0,0,.15);
  position: absolute;
  top: 0;
  left: 0;
}
</style>