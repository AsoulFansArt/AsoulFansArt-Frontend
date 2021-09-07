<template>
  <div class="la-form">
    <div>
      <el-input
          placeholder="BV号 或 动态id"
          prefix-icon="el-icon-link"
          v-model="submit_id">
      </el-input>
      <div class="la-radio">
        <el-radio v-model="radio" label="1">视频</el-radio>
        <el-radio v-model="radio" label="2">图片</el-radio>
        <el-radio v-model="radio" label="3">推荐作品(需审核)</el-radio>
      </div>
      <div class="la-btn">
        <el-button @click="onclick">上传作品</el-button>
      </div>
    </div>
  </div>
  <el-card>
    <template #header>
      提示
    </template>
    <p><span>电脑端：浏览器上方地址栏</span></p>
    <p><span>①[https://www.bilibili.com/video/BV1p64y1s7xx] BV1p64y1s7xx为填写的BV号</span></p>
    <p><span>②[https://t.bilibili.com/5564869983115373xx] 5564869983115373xx为填写的动态id</span></p>
    <p>手机端</p>
    <p><span>①三连上面的 [BV1p64y1s7xx] 长按复制 为填写的BV号</span></p>
    <p><span>②点开动态 右上角三个点 复制链接 然后去浏览器复制打开 新的网址[https://t.bilibili.com/h5/dynamic/detail/5576067821834190xx?] 5576067821834190xx为填写的动态id</span></p>
  </el-card>
</template>

<script>
import { ElMessage } from 'element-plus'
import { defineComponent, ref } from 'vue'
import Api from '../util/http.js'


export default defineComponent ({
  name: "Submit",
  setup() {
    return {
      submit_id: ref(''),
    }
  },
  data(){
    return{
      radio: '1'
    }
  },
  methods:{
    onclick(){
      this.submit_id = this.submit_id.trim()
      if(this.radio == 1){
        if (this.submit_id.length < 10 || this.submit_id.length > 14){
          ElMessage.error("BV号不正确")
          return
        }
        Api._submitBV({"BV": this.submit_id}).then((res)=>{
          if(res.data.code === -1){
            ElMessage.error(`${res.data.message}`)

          }else if(res.data.code === 0){
            ElMessage.warning(`${res.data.message}`)

          }else{
            ElMessage.success(`${res.data.message}`)
          }
        })
      }else if(this.radio == 2){
        if (this.submit_id.length < 16 || this.submit_id.length > 20){
          ElMessage.error("动态id不正确")
          return
        }
        Api._getDynamicDetail({"dynamic_id": this.submit_id}).then((res)=>{
          if (res.data.code === 1){
            ElMessage.success(`${res.data.message}`)
          }else{
            ElMessage.error(`${res.data.message}`)
          }
        })
      }else{
        Api._submit({"id": this.submit_id}).then((res)=>{
          if(res.data.code === -1){
            ElMessage.error(`${res.data.message}`)

          }else if(res.data.code === 0){
            ElMessage.warning(`${res.data.message}`)

          }else{
            ElMessage.success(`${res.data.message}`)
          }
        })
      }
    }
  }
})
</script>

<style scoped>

.la-form{
  text-align: center;
}
.la-radio{
  margin-top: 10px;
}
.la-btn{
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
