<template>
<div>
  <div style="width: 100%; height: 100%">
    <ImgGallery></ImgGallery>
  </div>

  <div class="icon-menu" ref="menuContainer">
      <el-card shadow="hover" :body-style="{padding: 0}">
        <a class="icon-card" href="/video" ref="menuIcon">
          <el-icon :size="32" style="margin: 9px"><VideoCamera /></el-icon>
          <div class="icon-desc">视频</div>
        </a>
      </el-card>
      <el-card shadow="hover" :body-style="{padding: 0}">
        <a class="icon-card" href="/pic">
          <el-icon :size="32" style="margin: 9px"><Picture /></el-icon>
          <div class="icon-desc">图片</div>
        </a>
      </el-card>
      <el-card shadow="hover" :body-style="{padding: 0}">
        <a class="icon-card" href="/article">
          <el-icon :size="32" style="margin: 9px"><Reading /></el-icon>
          <div class="icon-desc">专栏</div>
        </a>
      </el-card>
      <el-card shadow="hover" :body-style="{padding: 0}">
        <a class="icon-card" href="/submit">
          <el-icon :size="32" style="margin: 9px"><Upload /></el-icon>
          <div class="icon-desc">提交作品</div>
        </a>
      </el-card>
      <el-card shadow="hover" :body-style="{padding: 0}">
        <a class="icon-card" href="/fans/medal">
          <el-icon :size="32" style="margin: 9px"><DataLine /></el-icon>
          <div class="icon-desc">粉丝团数据</div>
        </a>
      </el-card>
      <el-card shadow="hover" :body-style="{padding: 0}">
        <a class="icon-card" href="/asoul/history">
          <el-icon :size="32" style="margin: 9px"><Clock /></el-icon>
          <div class="icon-desc">5.10节奏时间线</div>
        </a>
      </el-card>
      <el-card shadow="hover" :body-style="{padding: 0}">
        <a class="icon-card" href="https://space.bilibili.com/291072226" target="_blank">
          <el-icon :size="32" style="margin: 9px"><Message /></el-icon>
          <div class="icon-desc">联系我们</div>
        </a>
      </el-card>
      <el-card shadow="hover" :body-style="{padding: 0}" v-for="link in links" :key="link">
        <a  class="icon-card" :href="link.link" target="_blank">
          <el-image :src="link.icon" style="margin: 9px;width: 32px;height: 32px">
            <!-- 加载前占位 -->
            <template #placeholder>
              <div  class="image-slot">
                <div
                    v-loading="true"
                    element-loading-background="rgba(0,0,0,0.4)"></div>
              </div>
            </template>
          </el-image>
          <div class="icon-desc">{{ link.name }}</div>
        </a>
      </el-card>

    </div>





  <Modal :modalActive="modalActive">
    <input class="input is-info mt-5" placeholder="昵称" v-model="formRegData.nickname">
    <input class="input is-info mt-5" placeholder="登录用账号" v-model="formRegData.username">
    <input class="input is-info mt-5" type="password" placeholder="密码" v-model="firstPassword">
    <input class="input is-info mt-5" type="password" placeholder="确认密码" v-model="confirmPassword">
    <div class="control">
      <input class="input is-info my-5" type="text" :placeholder="'注册密钥:' + regToken" disabled>
    </div>
    <button class="button is-info mb-4" style="width: 100%" @click="sendReg">提交注册信息</button>
    <p style="color: indianred">Tips:不要将注册密钥泄漏给他人,每个B站账号仅允许注册一个账号</p>
  </Modal>
</div>
</template>

<script>
import "../assets/scss/card.scss"
import "../assets/scss/a.scss"
import local from "../util/local";
import Modal from "@components/Modal"
import Api from "@util/http"
import md5 from 'blueimp-md5'
import {ElMessage} from "element-plus";
import {
  VideoCamera,
  Picture,
  Reading,
  Upload,
  DataLine, Clock, Message
} from '@element-plus/icons-vue'
import ImgGallery from "@components/ImgGallery.vue"


export default {
  name: "MainPage",
  components:{
    Message,
    Clock,
    Reading,
    DataLine,
    Modal,
    VideoCamera,
    Picture,
    Upload,
    ImgGallery
  },
  data(){
    return{
      picList:[],
      imageWidth:"200px",
      totalImgWidth:0,
      links:[],
      navNum:5,
      linksAfter:0,
      modalActive: '',
      formRegData:{

      },
      regToken:'',
      confirmPassword:'',
      firstPassword:'',
      isMobile:''
    }
  },
  methods:{
    sendReg(){
      this.formRegData.token = this.regToken
      if (this.confirmPassword === this.firstPassword){
        this.formRegData.password = md5(this.firstPassword)
        Api._regAccount(
            this.formRegData
        ).then(async res => {
          if ("token" in res.data) {
            ElMessage.success(res.data.message)
            localStorage.setItem("token", res.data.token)
            await this.$router.push("/")
            this.modalActive = ""
            res = await Api._getAccountProfile()
            if ("buid" in res.data) {
              localStorage.setItem("buid", res.data.buid)
              localStorage.setItem("uid", res.data.uid)
              localStorage.setItem("name", res.data.name)
            }
          }else{
            ElMessage.error(res.data.message)
          }

        })
      }else{
        alert("两次密码输入不一致")
      }

    }
  },
  mounted() {
    this.regToken = window.location.hash.substring(7)
    if (this.regToken.length === 32){
      console.log(this.regToken)
      this.modalActive = "is-active"
    }

    if (document.documentElement.clientWidth < 1280) this.isMobile=true



    let fullWidth = this.$refs.menuContainer.clientWidth;
    let iconWidth = this.$refs.menuIcon.clientWidth;
    let col = Math.floor(fullWidth/iconWidth)
        local._getLinks({time:new Date().getTime()}).then((res)=>{
        this.links = res.data;
        let linksNum = this.links.length + this.navNum
        let row = Math.ceil(linksNum / col);
        let fullLinks = row * col;
        this.linksAfter = fullLinks - linksNum
    })



  },
}
</script>

<style lang="scss" scoped>

a{
  text-decoration: none;
  color: black;
  transition: 0.5s;
}
a:hover{
  color:black;
}
.icon-menu{
  padding: .5rem;
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(auto-fill, 7rem);
  grid-gap: 10px;
  pointer-events: auto;
  border:-1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
}



.icon-card{
  padding-top: .5rem;
  padding-bottom: .5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.icon-card-no-hover{
  width: 7.5rem;
  padding: 1rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  pointer-events: none;
}




.icon-desc{
  font-size: x-small;
}


</style>
