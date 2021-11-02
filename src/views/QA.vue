<template>
<div>
  <div class="header">
    <Condition type="qa" @changeQA="getResult" @changeLoad="getLoadStatus"></Condition>
  </div>
  <div class="body-contain" :style="{paddingLeft:`${pcPadding}rem`,paddingRight:`${pcPadding}rem`}">
    <QACard :qaList="qaResponse" :showTime="showTime"></QACard>
    <QAList :articleList="response"></QAList>
  </div>
</div>
</template>

<script>
import QAList from './components/QAList'
import Condition from './components/Condition'
import Api from '../util/http'
import QACard from "./components/QACard";
import general from "../util/general";

export default {
  name: "QA.vue",
  components:{
    QACard,
    QAList,
    Condition,
  },
  data(){
    return{
      response: [],
      qaResponse: [],
      pcPadding:0
    }
  },
  methods:{
    getLoadStatus(bool){
      this.isload = bool
    },
    getResult(data){
      console.log(data)
      this.qaResponse=data.response
      this.showTime = true
    },
  },
  mounted() {
    Api._getOfficialQA({}).then((res)=>{
      console.log(res.data)
      this.response = res.data
    })
    if (general._isMobile()){
      this.pcPadding = 0
    }else{
      this.pcPadding = 20
    }

  }
}
</script>

<style scoped>
/*.body-contain{*/
/*  padding-left: 20rem;*/
/*  padding-right: 20rem;*/
/*}*/
</style>
