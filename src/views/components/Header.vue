<template>

  <!--  悬浮工具栏-->
  <div style="position: fixed;left:20px;bottom: 20px; z-index:99;">
    <button class="button is-medium" @click="modalActive.nav === '' ? modalActive.nav='is-active':modalActive.nav=''">
        <span class="icon is-medium is-centered">
          <font-awesome-icon icon="bars" />
        </span>
    </button>
  </div>
  <!--  导航弹窗-->
  <div class="modal" :class="modalActive.nav" >
    <div class="modal-background" @click="modalActive.nav=''"></div>
    <div class="modal-card">
      <section class="modal-card-body" style="margin: 1rem; border-radius: 0.75rem">
        <NavItem @navRouterPush="navRouterPush"></NavItem>
      </section>
    </div>
  </div>
  <!--  登陆弹窗-->
  <div class="modal" :class="modalActive.login" >
    <div class="modal-background" @click="modalActive.login=''"></div>
    <div class="modal-card">
      <div class="box p-5">
        <div class="tabs is-size-4 has-text-weight-bold">
          <ul @click="selectTabs($event)">
            <li ref="initTab" class="1111"><a>登录</a></li>
            <li><a>注册</a></li>
          </ul>
        </div>
        <template v-if="loginModalActiveName==='登录'">
          <input class="input is-info mt-5" placeholder="账号" v-model="formLoginData.username">
          <input class="input is-info my-5" type="password" placeholder="密码" v-model="formLoginData.password">
          <button class="button is-info mb-4" style="width: 100%" @click="sendLogin">提交</button>
        </template>
        <template v-else>
          <button class="button is-info mb-4" style="width: 100%" @click="win.open('https://oauth.asoulcnki.asia?redirect_uri=https://asoul.cloud')">哔哩哔哩账号快捷注册</button>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import Api from '../../util/http.js'
import NavItem from "./NavItem";
import md5 from 'blueimp-md5'
import router from "../../router";
import {ElMessage} from "element-plus";

const initTab = ref()
let lastSelectTab = null
const win = window
let loginModalActiveName = ref("登录")
let modalActive = ref({nav: "", login:""})
let formLoginData = ref(
    {
      "username": "",
      "password": "",
    }
)

onMounted( async () => {
  initTab.value.className="is-active"
  lastSelectTab = initTab.value
  let res = await Api._getAccountProfile()
  if ("buid" in res.data){
    localStorage.setItem("buid", res.data.buid)
    localStorage.setItem("uid", res.data.uid)
    localStorage.setItem("name", res.data.name)
  }

});


const navRouterPush = ret =>{
  if (ret === "login"){
    if (localStorage.getItem("token") && localStorage.getItem("buid") !== 'undefined'){
      router.push({path: `/space/${localStorage.getItem("buid")}`})
      modalActive.value['nav'] = ""
      //window.location.reload()
    }
    else{
      modalActive.value['nav'] = ""
      modalActive.value['login'] = "is-active"
    }
    return
  }
  modalActive.value[ret] = ""
}


const selectTabs = (e) =>{
  if (["登录", "注册"].includes(e.target.innerHTML)){
    if (lastSelectTab)
      lastSelectTab.className = ""
    e.target.parentNode.className="is-active"
    lastSelectTab = e.target.parentNode
    loginModalActiveName.value = e.target.innerHTML

  }

}

const sendLogin = async () => {
  let res = await Api._accountLogin({
    "username": formLoginData.value.username,
    "password": md5(formLoginData.value.password)
  })
  ElMessage.success(res.data.message)
  if ("token" in res.data) {
    localStorage.setItem("token", res.data.token)
    modalActive.value.login = ""
    res = await Api._getAccountProfile()
    if ("buid" in res.data) {
      localStorage.setItem("buid", res.data.buid)
      localStorage.setItem("uid", res.data.uid)
      localStorage.setItem("name", res.data.name)
    }
    await router.push("/")

  }
}
</script>
