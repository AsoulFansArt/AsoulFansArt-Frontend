<template>
<div class="mx-2">
  <el-input
      class="my-2"
      placeholder="专栏cv号 cvxxxxx  xxxx为一串数字"
      prefix-icon="el-icon-link"
      v-model="cvid">
  </el-input>
  <el-select v-model="value" placeholder="请选择分区">
    <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
    >
    </el-option>
  </el-select>
  <span class="mx-2" style="font-size: smaller">Tips:添加分区请在B站私信~</span>
  <el-input
      class="my-2"
      type="textarea"
      placeholder="请输入备注(可空)"
      v-model="remarks"
      maxlength="30"
      show-word-limit
  >
  </el-input>
  <el-button @click="submitArticle">提交</el-button>
</div>
</template>

<script>
import Api from '../util/http'
import {ElMessage} from "element-plus";


export default {
  name: "SubmitArticle",
  data(){
    return{
      cvid:"",
      response:[],
      options:[],
      value:"",
      remarks:""
    }
  },
  methods:{
    submitArticle(){
      Api._submitArticle({
        "cvid": this.cvid,
        "sort_id": this.value,
        "remark": this.remarks
      }).then((res)=>{
        this.response = res.data
        console.log(res.data)
        ElMessage.success(`${this.response.message}`)
      })
    }
  },
  mounted() {
    Api._getArticleSorts().then((res)=>{
      for (let item of res.data)
        this.options = [ ...this.options, {"value":item.id, "label":item.title}]
    })
  }
}
</script>

<style scoped>

</style>
