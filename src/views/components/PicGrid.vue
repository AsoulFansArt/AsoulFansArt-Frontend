<template>
  <div class="row">
    <div v-for="img in waterfallList"  :key="img" class="col-6 m-0 p-0" style="font-size:0;position: relative">

      <!-- 图片数量卡片 -->
      <div class="imgnums" v-if="img.pic_url.length>1">
        <div><i class="el-icon-copy-document"></i> {{img.pic_url.length}}</div>
      </div>
      <div>
        <a :href="`https://t.bilibili.com/${img.dy_id}?tab=2`" target="_blank"></a>
      </div>
      <el-image :src="`${img.pic_url[0].img_src}@${400}w_${400}h_1e_1c.webp`">

      </el-image>
    </div>
  </div>
</template>

<script>
export default {
  name: "PicGrid",
  props:{
    waterfallList:{
      type:Array
    },
  },
}
</script>

<style scoped>
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
</style>
