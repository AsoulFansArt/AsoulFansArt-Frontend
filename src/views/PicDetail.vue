<template>
  <div ref="container" style="width: 100%; height: 100vh">
    <el-skeleton :loading="loading" :rows="5" animated>
      <template #template></template>
      <template #default>
        <div style="display: flex; align-items: flex-start; flex-wrap: wrap" class="m-2">
          <div class="m-2 image-prev" ref="elementImgPrev" :style="{height: `${clientHeight>0?clientHeight+'px':'100%'}`}">
            <el-image
                style="position: relative"
                :key="curImgObj.img_src"
                fit="scale-down"
                :preview-src-list="[curImgObj.img_src]"
                :src="`${curImgObj.img_src}@1e_1c.webp`" lazy>
              <!-- 加载前占位 -->
              <template #placeholder>
                  <div
                      v-loading="true"
                      :style="{width: `10rem`, height: `${clientHeight>0?clientHeight+'px':'50vh'}`}"></div>
              </template>
            </el-image>
            <div>
              <el-button class="m-2" round plain type="success"
                         v-show="curImgIndex > 0"
                         @click="curImgObj = response.pic_url[--curImgIndex];clientHeight=elementImgPrev.clientHeight">上一张</el-button>
              {{`${curImgIndex+1}/${response.pic_url.length}`}}
              <el-button class="m-2" round plain type="primary"
                         v-show="curImgIndex < response.pic_url.length-1"
                         @click="curImgObj = response.pic_url[++curImgIndex];clientHeight=elementImgPrev.clientHeight">下一张</el-button>
            </div>
          </div>
          <el-card class="m-2" :style="{width: `${authorCardWidth}`}">
            <div style="display: flex; align-items: center; flex-wrap: wrap">
<!--              {{response.pic_url[0].img_width}}-->
              <div class="my-2" style="font-weight: bold; font-size: larger">{{response.desc}}</div>
              <el-tag v-for="(tag, index) in response.tags" :key="tag" class="m-1" :type="index % 2?'success':''">
                {{Number(tag.tag_title[tag.tag_title.length-1]) ? tag.tag_title.substring(0, tag.tag_title.length-1): tag.tag_title}}
              </el-tag>
              <el-divider></el-divider>
              <div style="color: gray; width: 100%" class="mb-2">{{response.author.sign}}</div>
              <el-image
                  :src="response.author.face+'@128w_128h_1e_1c.webp'" style="width: 4rem; border-radius: 50%; cursor: pointer" @click="router.push(`/space/${response.author.uid}`)"></el-image>
              <span style="font-weight: bold" class="m-1">{{response.author.name}}</span>
            </div>
          </el-card>
        </div>
      </template>
    </el-skeleton>
  </div>
</template>

<script setup>
import router from "../router";
import Api from "../util/http"
import {nextTick, onMounted, ref, watch} from "vue";

const response = ref()
const curImgObj = ref()
const container = ref()
const elementImgPrev = ref()
const loading = ref(true)
const dyid = router.currentRoute.value.params.dyid
let curImgIndex = ref(0)
let clientHeight = ref(0)
let authorCardWidth = ref('100%')


const refreshHeight = ()=>{
  if (document.documentElement.clientWidth < 760){
    authorCardWidth.value = '100%'
    clientHeight.value = 0
  }
  else{
    authorCardWidth.value = '25%'
    if (curImgObj.value.img_height > document.documentElement.clientHeight)
      clientHeight.value = document.documentElement.clientHeight - 200
    else
      clientHeight.value = curImgObj.value.img_height
  }


}


onMounted(()=>{
  if (document.documentElement.clientWidth < 760){
    authorCardWidth.value = '100%'
  }
  else{
    authorCardWidth.value = '25%'
  }
  Api._getPicDetail(dyid).then(res=>{
    if(res.data.status === 1){
      window.location.href=(`https://t.bilibili.com/${res.data.dy_id}`)
      return
    }
    response.value = res.data

    loading.value = false
    curImgObj.value = response.value.pic_url[0]
    nextTick(()=>{
      refreshHeight()
    })
  })

  window.onresize = ()=>{
    return ( ()=>{
      refreshHeight()
    })()
  }
})



// flex: 1;
// display: flex;
// justify-content: center;
// align-items: flex-start;
</script>
<style scoped>
.image-prev{
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
}
</style>