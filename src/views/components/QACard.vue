<template>
  <ul v-if="!isload">
    <li v-for="qaItem in qaList" :key="qaItem">
      <div class="question" style="color: gray"><span style="font-weight: bold">Q:</span><span v-html="qaItem.q"></span></div>
      <div class="answer"><span style="font-weight: bold">A:</span><span v-html="qaItem.a"></span></div>
      <div v-if="showTime === true" class="pub_time">
        <a :href="`https://www.bilibili.com/read/cv${qaItem.cvid}`" target="_blank">{{qaItem.title}}</a>
      </div>
      <el-divider style="margin-top: 8px;margin-bottom: 12px"></el-divider>
    </li>
  </ul>
</template>

<script>
import g from "../../util/general";

export default {
  name: "QACard",
  data(){
    return{
      g:g
    }
  },
  props:{
    isload:{
      type:Boolean,
      default:false
    },
    qaList:{
      type:Array
    },
    showTime:{
      type:Boolean,
    }
  }
}
</script>

<style scoped>
ul{
  padding: 0;
}

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
.question{
  font-size: medium;
  margin-bottom: .15rem;
}
.answer{
  font-size: medium;
}
.pub_time{
  color: gray;
  font-size: small;
}
</style>
