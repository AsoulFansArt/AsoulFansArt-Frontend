<template>
<div>
  <ul>
    <li class="article-item" v-for="item in articleList" :key="item">
      <div class="article-title"><a :href="`https://www.bilibili.com/read/${item.cvid}`" target="_blank">{{item.title}}</a></div>
<!--      <div class="article-summary"><span v-for="i in 100" :key="i">{{item.remarks}}</span></div>-->
      <div class="article-info">
        <el-avatar class="me-1" size="small" :src="item.owner_face"></el-avatar>
        <span class="me-3 article-mid"><a :href="`https://space.bilibili.com/${item.owner_id}`" style="color: gray;">{{item.owner_name}}</a></span>
        <span class="me-1 article-mid"><i class="el-icon-view"></i>{{general._changeBillionToCN(item.stats_views)}}</span>
        <span class="me-1 article-mid"><i class="iconfont icon-0_like1" style="font-size: xx-small;"></i>{{general._changeBillionToCN(item.stats_like)}}</span>
        <span class="me-1 article-mid"><i class="el-icon-chat-line-square"></i>{{general._changeBillionToCN(item.stats_reply)}}</span>
        <span class="me-1 article-mid"><i class="el-icon-time"></i>{{general._timestampToTimeY(item.publish_time)}}</span>
      </div>
      <el-divider class="my-3"></el-divider>
    </li>
  </ul>
</div>
</template>

<script>
import general from "../../util/general";
import '../../assets/scss/a.scss'

export default {
  name: "ArticleCard",
  data(){
    return{
      general:general
    }
  },
  props:{
    articleList:{
      type:Array
    },
  }
}
</script>

<style lang="scss" scoped>
li{
  list-style: none;
}
.article-item {
  margin-left: 0.7em;
}
.article-title{
  font-weight: bold;
  margin-bottom: .5rem;
}
.article-summary{
  color: gray;
  font-size: smaller;
  margin-top: .5rem;
  margin-bottom: .5rem;
}
.article-info{
  margin-top: .5rem;
  color: gray;
  display: flex;
  align-items: center;
  font-size: smaller;
  .article-mid {
    margin-right: 0.7em !important;
    i {
      margin-right: 0.3em;
    }
  }
}
</style>
