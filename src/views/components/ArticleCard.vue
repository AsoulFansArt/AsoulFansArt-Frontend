<template>
  <div>
    <ul>
      <li class="article-item" v-for="item in articleList" :key="item">
        <div class="article-title"><a :href="`https://www.bilibili.com/read/${item.cvid}`" target="_blank">{{item.title}}</a></div>
        <div class="article-info">
          <figure class="image is-32x32 mr-1">
            <img class="is-rounded" :src="`${item.owner_face}@64w_64h_1e_1c`" alt="">
          </figure>
          <span class="me-3 article-mid"><a :href="`https://space.bilibili.com/${item.owner_id}`" style="color: gray;">{{item.owner_name}}</a></span>
          <span class="me-1 article-mid"><font-awesome-icon icon="eye" class="mr-1"/>{{general._changeBillionToCN(item.stats_views)}}</span>
          <span class="me-1 article-mid"><font-awesome-icon icon="heart" class="mr-1"/>{{general._changeBillionToCN(item.stats_like)}}</span>
          <span class="me-1 article-mid"><font-awesome-icon icon="comment" class="mr-1"/>{{general._changeBillionToCN(item.stats_reply)}}</span>
          <span class="me-1 article-mid"><font-awesome-icon icon="clock" class="mr-1"/>{{general._timestampToTimeY(item.publish_time)}}</span>
        </div>
        <div class="my-3" style="background-color: #000000; height:5px;transform:scale(1 , 0.2);"></div>
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