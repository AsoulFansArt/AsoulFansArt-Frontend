<template>
<div>
  <div>
    <el-image v-if="isMobile" src="https://message.biliimg.com/bfs/im/22ad7f7d6143031c1ae70004024e2162f82a3981.png"></el-image>
    <el-image v-else src="https://message.biliimg.com/bfs/im/a982c01cccdf8f32e1a81254be8b3683b08bdfda.png"></el-image>
  </div>
  <div class="icon-menu" ref="menuContainer">

    <a class="icon-card" href="/video" ref="menuIcon">
      <font-awesome-icon icon="circle-play" size="2x" style="margin: 9px"/>
      <div class="icon-desc">视频</div>
    </a>
    <a class="icon-card" href="/pic">
      <font-awesome-icon icon="image" size="2x" style="margin: 9px"/>
      <div class="icon-desc">图片</div>
    </a>
    <a class="icon-card" href="/article">
      <font-awesome-icon icon="book-open" size="2x" style="margin: 9px"/>
      <div class="icon-desc">专栏</div>
    </a>
<!--    <a class="icon-card" href="/meme">-->
<!--      <font-awesome-icon icon="ice-cream" size="2x" style="margin: 9px"/>-->
<!--      <div class="icon-desc">P图大赛</div>-->
<!--    </a>-->
    <a class="icon-card" href="/submit">
      <font-awesome-icon icon="upload" size="2x" style="margin: 9px"/>
      <div class="icon-desc">提交作品</div>
    </a>
    <a class="icon-card" href="/asoul/history">
      <font-awesome-icon icon="history" size="2x" style="margin: 9px"/>
      <div class="icon-desc">510节奏时间线</div>
    </a>
    <a class="icon-card" href="https://space.bilibili.com/291072226" target="_blank">
      <font-awesome-icon icon="envelope" size="2x" style="margin: 9px"/>
      <div class="icon-desc">联系我们</div>
    </a>
    <a v-for="link in links" :key="link" class="icon-card" :href="link.link" target="_blank">
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
    <a v-for="linkAfter in linksAfter" :key="linkAfter" class="icon-card-no-hover">

    </a>

  </div>
<!--  <div>-->
<!--    <el-image src="https://message.biliimg.com/bfs/im/0422b3339ac4b7ad302206d04940128f2fda68e5.png"></el-image>-->
<!--  </div>-->



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

export default {
  name: "MainPage",
  components:{
    Modal
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
        local._getLinks().then((res)=>{
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



.icon-card{
  width: 7.5rem;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  :hover{
    border: none;
    border-radius: 0;
  }
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
