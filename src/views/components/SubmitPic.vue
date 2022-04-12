<template>
  <div class="la-form">
    <div class="p-5">
      <input class="input"
          placeholder="BV号 或 动态id"
          v-model="submit_id">
      <div class="la-btn">
        <div class="button" @click="onclick">推荐作品(提交后需审核)</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Api from '../../util/http.js'

let submit_id = ref('')
submit_id.value = submit_id.value.trim()
let onclick = function (){
  if (submit_id.value.length > 10 && submit_id.value.length < 25)
    Api._submit({"id": submit_id.value}).then((res)=>{
      alert(`${res.data.message}`)
    })
  else
    alert("提交作品ID不合法")
}
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
