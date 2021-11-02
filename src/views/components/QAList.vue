<template>
  <el-collapse class="article-item" v-model="activeNames" @change="handleChange" accordion>
    <el-collapse-item   v-for="(item,index) in articleList" :key="index" :name="index">
      <template #title>
        <a :href="`https://www.bilibili.com/read/cv${item.cvid}`" target="_blank">{{item.title}}</a>
      </template>
      <div v-if="isload">加载中......</div>
        <QACard :isload="isload" :qaList="response" ></QACard>
    </el-collapse-item>
  </el-collapse>
</template>
<script>
import Api from '../../util/http'
import QACard from "./QACard";
export default {
  name: "QAList",
  components:{
    QACard
  },
  props:{
    articleList:{
      type:Array
    },
  },
  data(){
    return{
      activeNames: '1',
      response:[],
      isload:false
    }
  },
  methods: {
    handleChange(val) {
      this.isload = true
      if (val === undefined) return;
      Api._getOfficialQADetail({"cvid":this.articleList[val].cvid}).then((res)=>{
        this.response = res.data
        this.isload = false
      })
    },
  }
}
</script>

<style lang="scss" scoped>
a{
  text-decoration: none;
  color: black;
  transition: 0.5s;
}
a:hover{
  color:#FC966E;
}
li{
  list-style: none;
}
.title{
  font-size: medium;
}
.desc{
  font-size: small;
  color: gray;
  margin-top: .55rem;
  margin-bottom: .55rem;
}
.info{
  font-size: x-small;
  color: gray;
  margin-right: .55rem;
}

</style>
