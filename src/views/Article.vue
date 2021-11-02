<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="changeSort">
      <el-tab-pane
          v-for="item in options"
          :label="item.title"
          :name="`${item.id}`"
          :key="item.id"
      ></el-tab-pane>
    </el-tabs>
  </div>
  <div v-loading="isLoading">
    <ArticleCard :articleList="response"></ArticleCard>
  </div>
  <div>
    <el-pagination
        background layout="pager"
        :page-count="total"
        @current-change="getMoreArticle"
        :hide-on-single-page="hidePagination"
    >
    </el-pagination>
  </div>
</template>

<script>
import Api from "../util/http"
import ArticleCard from "./components/ArticleCard";


export default {
  name: "Article",
  components:{
    ArticleCard,
  },
  data(){return{
    response:[],
    total:0,
    options:[
      {"id": 0, "title": "全部"}
    ],
    activeName:"0",
    params:{
      "page": 0,
      "sort_id": 0,
      "order": "publish_time",
      "type": 1,
    },
    isLoading:false,
    hidePagination:false
  }},
  methods:{
    changeSort(tab, event){
      this.params.sort_id = this.activeName
      // console.log(this.params.sort_id)
      this.getArticleList(this.params)
    },
    getMoreArticle(val){
      this.params.page = val;
      this.getArticleList(this.params)
    },
    getArticleList(params){
      this.isLoading = true
      return Api._getArticleList(params).then((res)=>{
        console.log(res.data.data)
        if(res.data.data === undefined)
          this.response = res.data
        else
          this.response = res.data.data
        this.total = res.data.total ? res.data.total:1
        this.hidePagination = this.total <= 1
        this.isLoading = false
      })
    }

  },
  async mounted() {
    Api._getArticleSorts({}).then((res) => {
      this.options = [...this.options, ...res.data]
    })
    await this.getArticleList(this.params)
  }
}
</script>

<style lang="scss" scoped>

</style>
