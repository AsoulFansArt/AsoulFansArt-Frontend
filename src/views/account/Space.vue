<template>
  <div v-if="!isLoad">
    <div class="account-card">
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

    <WaterfallPic :uid="`${uid}`" :type="2" :owner="false" v-if="!isLoad"></WaterfallPic>
  </div>
</template>

<script>
import WaterfallPic from "../WaterfallPic";
import Api from '../../util/http.js'

export default {
  name: "space",
  components:{
    WaterfallPic
  },
  data(){
    return{
      uid:"",
      response:{},
      isLoad:true
    }
  },
  mounted() {
    this.uid = this.$route.params.uid
    Api._getAccountInfo({uid:this.uid, p:10}).then((res)=>{
      console.log(res.data)
      this.response = res.data
      this.isLoad = false
    })
  }
}
</script>

<style lang="scss" scoped>
.account-card{
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  box-shadow: 0 0 8px rgba(0,0,0,.175)!important;
  margin: 1rem;
  padding: 1.5rem;
  .account-face{
    width: 168px;
    height: 168px;
    border-radius: 50%;
  }
  .account-work{
    width: 100%;
    display: flex;
    justify-content: center;
    justify-items: center;
    .work-nums{
      display: flex;
      flex-flow: column;
      align-items: center;
      margin-right: 10px;
      padding: 1rem;
      font-size: medium;
      font-weight: bolder;
    }
  }
  .account-name{
    width: 100%;
    text-align: center;
    font-size: larger;
    font-weight: bold;
    line-height: 1.5;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.25rem;
  }
  .account-level{
    font-size: xx-small;
    background: #FC966E;
    border-radius: .45rem;
    padding: 2px  8px;
    color: white;
    margin-right: 4px;
  }
  .account-uid{
    background: #42b983;
    color: white;
    padding: 2px 8px;
    border-radius: .45rem;
    font-size: xx-small;
  }

}
.account-sign{
  font-weight: 400;
  line-height: 1.5;
  box-shadow: 0 0 8px rgba(0,0,0,.175)!important;
  margin: 1rem;
  padding: 1.5rem;
}

</style>
