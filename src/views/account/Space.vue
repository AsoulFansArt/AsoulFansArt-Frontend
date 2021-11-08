<template>
  <div v-if="!isLoad">
    <div class="account-card" >

      <a :href="`https://space.bilibili.com/${response.account.uid}`" target="_blank"><el-image class="account-face" :src="response.account.face" ></el-image></a>
      <div style="width: 100%;" class="account-work">
        <div class="work-nums">
          <span style="color: gray">视频</span>
          <div>{{response.videos.num}}</div>
        </div>
        <div class="work-nums">
          <span style="color: gray">插画</span>
          <div>{{response.illusts.num}}</div>
        </div>
        <div class="work-nums">
          <span style="color: gray">专栏</span>
          <div>{{response.articles.num}}</div>
        </div>
      </div>
      <div class="account-name">
        <h1 style="font-weight: 600; margin:0">{{ response.account.name }}</h1>
      </div>
      <div class="account-name">
        <span class="account-level">LV{{ response.account.level }}</span>
        <span class="account-uid">{{ response.account.uid }}</span>
      </div>
    </div>
    <div class="account-sign" v-if="response.account.sign">{{ response.account.sign }}</div>
    <el-tabs v-model="activeName" @tab-click="handleClick" style="padding: 1rem">
      <el-tab-pane :label="tab.label" :name="tab.name" v-for="tab in tabs" :key="tab.name">
        <TabPage :uid="uid" :name="nowName" v-if="tab.name === nowName && tab.num > 0"></TabPage>
        <div v-else>暂无数据</div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Api from '../../util/http.js'
import '../../assets/scss/account.scss'
import TabPage from "../components/TabPage";

export default {
  name: "space",
  components:{
    TabPage
  },
  data(){
    return{
      uid:"",
      response:{},
      isLoad:true,
      activeName:"videos",
      nowName: "videos",
      videosList:[],
      tabs:[
        {
          name:"videos",
          label:"视频",
          num:0
        },
        {
          name:"illusts",
          label:"插画",
          num:0
        },
        {
          name:"articles",
          label:"专栏",
          num:0
        }
      ]
    }
  },
  methods:{
    handleClick(tab){
      //console.log(tab)
      //console.log(tab.props.name)
      this.nowName=tab.props.name
    }
  },
  mounted() {
    this.uid = this.$route.params.uid
    Api._getAccountInfo({uid:this.uid, p:10}).then((res)=>{

      this.response = res.data
      this.isLoad = false
      let workTypeList = [this.response.videos.num, this.response.illusts.num, this.response.articles.num]
      for (let [workType,num] of workTypeList.entries()){
        this.tabs[workType].num = num
        if (workType > 0){

          if (workTypeList[workType-1] < num){
            //console.log(workTypeList[workType-1], num,this.tabs[workType].name)
            this.nowName=this.tabs[workType].name
            this.activeName = this.tabs[workType].name
          }
        }

        //console.log(workType)
      }


    })
  }
}
</script>

<style lang="scss" scoped>


</style>
