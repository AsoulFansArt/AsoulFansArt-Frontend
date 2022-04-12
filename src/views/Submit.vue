<template>
  <div class="tabs is-size-7-mobile">
    <ul>
      <li v-for="tab in tabs" :key="tab.id" :class="activeName === tab.name ? 'is-active' : ''" @click="selectTab(tab)">
        <a>{{ tab.name }}</a>
      </li>
    </ul>
  </div>
  <SubmitPic v-if="activeName === '图片/视频'"></SubmitPic>
  <SubmitArticle v-else></SubmitArticle>
</template>

<script setup>
import SubmitPic from "./components/SubmitPic";
import SubmitArticle from "./components/SubmitArticle";
import {ref} from "vue";
let activeName = ref('图片/视频')
let tabs = [
  {
    "name": "图片/视频",
    id: 1
  },
  {
    "name": "专栏/文章",
    id: 2
  }
]

let selectTab = (tab) => {
  activeName.value = tab.name
}
</script>

<style scoped>


</style>
