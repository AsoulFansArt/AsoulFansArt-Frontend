<template>
<div>
  <VideoGrid :uid="uid" v-if="name==='videos'"></VideoGrid>
  <WaterfallPic :uid="uid" v-if="name==='illusts'" :owner="false"></WaterfallPic>
</div>
</template>

<script>
import VideoGrid from "./VideoGrid";
import WaterfallPic from "../WaterfallPic";
export default {
  name: "TabPage",
  components:{
    VideoGrid,
    WaterfallPic
  },
  props:{
    name:{
      type:String
    },
    uid:{
      type:String
    }
  }
}
</script>

<style scoped>

</style>