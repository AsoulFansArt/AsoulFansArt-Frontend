<template>
  <div class="tabs is-size-7-mobile">
    <ul>
      <li
          :class="item.id === Number(activeName) ? 'is-active': ''"
          :key="item.id"
          v-for="item in options"
          @click="changeSort(item)"
      >
        <a>{{item.title}}</a>
      </li>
    </ul>
  </div>
  <div>
    <ArticleCard :articleList="response"></ArticleCard>
  </div>
  <div>
    <nav
        style="margin-left: 1rem"
        class="pagination"
        role="navigation"
        aria-label="pagination">
      <ul class="pagination-list">
        <li>
          <a
              class="pagination-link is-current"
              aria-current="page"
              aria-label="Goto page 1">1</a>
        </li>
      </ul>
    </nav>

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
      "page": 1,
      "sort_id": 0,
      "order": "publish_time",
      "type": 1,
    },
    isLoading:false,
    hidePagination:false
  }},
  methods:{
    changeSort(item){
      this.activeName = item.id
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
