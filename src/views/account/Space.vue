<template>
  <div v-if="!isLoad">
    <div class="account-card" >
        <img class="account-face" :src="
        response.account.face.includes('hdslb.com') ? `${response.account.face}@${256}w_${256}h_1e_1c.webp` : '/img/no-face.jpg'" alt="">
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
        <span class="account-uid" >
          <a
            :href="`https://space.bilibili.com/${response.account.uid}`"
            target="_blank"
            style="color: white"> UID: {{ response.account.uid }}</a>
        </span>

      </div>
    </div>
    <div class="account-sign" v-if="response.account.sign">{{ response.account.sign }}</div>
    <div class="account-sign" v-if="isLogin">
      <div class="icon-menu">
        <div class="icon-card" v-for="item in items" :key="item.icon" @click="onChangeView(item.id)">
          <font-awesome-icon :icon="item.icon" size="2x" style="margin: 9px"/>
          <div>{{ item.name }}</div>
        </div>
      </div>
    </div>

    <Vwaterfall class="is-loading" v-if="nowViews >= 0" :key="nowViews" :load-func="items[nowViews].loadFunc"></Vwaterfall>

    <div class="tabs is-size-7-mobile"  style="padding: 1rem" v-if="!isLogin">
      <ul>
        <li :class="activeName === tab.name ? 'is-active' : ''" v-for="tab in tabs" :key="tab.name" @click="activeName = tab.name">
          <a>{{tab.label}}</a>
        </li>
      </ul>
    </div>
    <TabPage :uid="uid" :name="activeName" v-if="!isLogin"></TabPage>
  </div>

<!--  <el-dialog v-model="showModal" title="账号信息">-->
<!--    <div class="m-2">-->
<!--      <span class="mr-3">等级：3</span>-->
<!--      <span class="mr-3">经验值: {{200}}</span>-->
<!--      <span>身份: 二创作者</span>-->
<!--    </div>-->
<!--    <div class="m-2" style="display: flex;align-items: center">-->
<!--      <span>昵称：</span>-->

<!--    </div>-->

<!--  </el-dialog>-->
</template>

<script setup>
import Api from '../../util/http.js'
import '../../assets/scss/account.scss'
import TabPage from "../components/TabPage";
import Vwaterfall from "../components/Vwaterfall";
import { onMounted, ref} from "vue";
import router from "../../router";
import {ElMessage} from "element-plus";
import {onBeforeRouteUpdate} from "vue-router";

// 局部组件刷新
// const isRouterAlive = ref(true);
//
// const reload = () => {
//   isRouterAlive.value = false;
//   nextTick(() => {
//     isRouterAlive.value = true;
//   });
// };
// provide("reload", reload);


const tabs = ref([
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
])
const items = [
  {
    id: 0,
    "name": "我的收藏",
    "icon": "star",
    loadFunc: Api._getFavorites
  },{
    id: 1,
    "name": "历史记录",
    "icon": "clock",
    loadFunc: Api._getViewHistory
  },  {
    id: 2,
    "name": "账号管理",
    "icon": "edit"
  },  {
    id: 3,
    "name": "作品中心",
    "icon": "upload"
  }
]

let uid = ref("")
let isLogin = ref(false)
let response = ref({})
let isLoad = ref(true)
let activeName = ref("videos")
let nowViews = ref(-1)
let showModal = ref(true)



const onChangeView = (id)=>{
  if (id < 2){
    nowViews.value = id
  }else{
    ElMessage.warning('未开放')
  }
}

const loadInitData = () =>{
  uid.value = router.currentRoute.value.params.uid
  Api._getAccountInfo({uid:uid.value, p:10}).then((res)=>{
    response.value = res.data
    const accountInputs = ref([
      {
        name: "昵称",
        val: response.value.account.name
      },  {
        name: "个性签名",
        val:  response.value.account.sign
      },  {
        name: "旧密码",
        val: ""
      },{
        name: "新密码",
        val: ""
      },{
        name: "确认新密码",
        val: ""
      },
    ])
    if (uid.value === localStorage.getItem("buid")){
      response.value.account.name = localStorage.getItem("name")
      //response.value.account.uid = localStorage.getItem("uid")
      isLogin.value = true
    }else {
      isLogin.value = false
    }
    isLoad.value = false
    let workTypeList = [response.value.videos.num, response.value.illusts.num, response.value.articles.num]

    for (let [workType,num] of workTypeList.entries()){
      tabs.value[workType].num = num
      if (workType > 0){
        if (workTypeList[workType-1] < num){
          activeName.value = tabs.value[workType].name
        }
      }
    }


  }).catch((err)=>{
    //router.push({path: "/login"})
    console.log(err)
  })
}
onBeforeRouteUpdate((to, from, next)=>{
  console.log(to.fullPath, from,next)
  window.location.href=to.fullPath
})


onMounted(()=>{
  loadInitData()
})

</script>

<style lang="scss" scoped>



.icon-card{
  width: 7.5rem;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  &:hover{
    cursor: pointer;
  }
}

.icon-menu{
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  pointer-events: auto;
  border:-1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  :hover {
    border:-1px solid rgba(0, 0, 0, 0.08);
    border-radius: 8px;
    background: rgba(245, 245, 245, 0.88);
  }
}


</style>
