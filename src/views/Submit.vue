<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="图片/视频" name="first"><SubmitPic></SubmitPic></el-tab-pane>
    <el-tab-pane label="专栏/文章" name="second"><SubmitArticle></SubmitArticle></el-tab-pane>
  </el-tabs>
<!--  <SubmitPic></SubmitPic>-->
</template>

<script>
import { defineComponent } from 'vue'
import SubmitPic from "./components/SubmitPic";
import SubmitArticle from "./components/SubmitArticle";

export default defineComponent ({
  name: "Submit",
  components:{
    SubmitPic,
    SubmitArticle
  },
  data(){
    return{
      activeName:"first",
    }
  }
})
</script>

<style scoped>


</style>
