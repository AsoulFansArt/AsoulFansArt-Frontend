<template>
<div class="mx-2">
  <input
      class="my-2 input"
      placeholder="专栏cv号、例如：cvxxxxx"
      v-model="cvid">
  <div class="select">
    <select @change="selectOption($event)">
      <option v-for="item in options" :key="item.id" :value="item.id">{{ item.title }}</option>
    </select>
  </div>
  <span class="mx-2" style="font-size: smaller">Tips:添加分区请在B站私信~</span>
  <input
      class="my-2 input"
      type="text"
      placeholder="请输入备注(可空)"
      v-model="remarks"
      maxlength="30"
  >
  <div class="button" @click="submitArticle">提交</div>
</div>
</template>

<script setup>
import Api from '../../util/http'
import {ref} from "vue";
let options = ref([])
let selectOptionID = ref(1)
let cvid = ref('')
let remarks = ref('')
let response = ref([])
Api._getArticleSorts().then((res)=>{
  options.value = res.data
})
let selectOption = (e)=>{
  selectOptionID.value = e.target.value
}
let submitArticle = () => {
  Api._submitArticle({
    "cvid": cvid.value,
    "sort_id": selectOptionID.value,
    "remark": remarks.value
  }).then((res)=>{
    response.value = res.data
    console.log(res.data)
    alert(`${response.value.message}`)
  })
}
</script>

<style scoped>

</style>
