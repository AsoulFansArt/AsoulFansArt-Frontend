<template>
  <div class="tabs is-small is-toggle is-centered" style="margin-top: 2rem">
    <ul>
      <template v-for="(tab,index) in tabs" :key="tab.name">
        <li v-if="!isMobile" :class="tabs[tabActive].param === tab.param ? 'is-active':''" :key="tab.name" @click="handleTabsClick(index)">
          <a>
            <span class="icon is-small" ><font-awesome-icon :icon="tab.icon"/></span>
            <span>{{ tab.name }}</span>
          </a>
        </li>
      </template>


      <li class="is-active" v-if="isMobile" @click="this.modalActive = 'is-active'; this.modalType='sort'">
        <a>
          <span class="icon is-small" ><font-awesome-icon :icon="tabs[tabActive].icon"/></span>
          <span>{{ tabs[tabActive].name }}</span>
          <span class="icon is-small" ><font-awesome-icon icon="chevron-down"/></span>
        </a>
      </li>

      <li>
        <a style="padding: 0">
          <Datepicker ref="datePicker" placeholder="日期" class="is-small" @change="pickDate"></Datepicker>
        </a>
      </li>
      <li @click="this.modalActive = 'is-active'; this.modalType='tag'">
        <a>
          <span class="icon is-small" ><font-awesome-icon icon="tag"/></span>
          <span>{{ activeTagText }}</span>
          <span class="icon is-small" ><font-awesome-icon icon="chevron-down"/></span>
        </a>
      </li>
    </ul>
  </div>
<!--  悬浮弹窗-->
  <div class="modal" :class="modalActive">
    <div class="modal-background" @click="modalActive=''"></div>
    <div class="modal-card">
      <section class="modal-card-body" style="margin: 1rem; border-radius: 0.75rem">
        <!-- Content ... -->
        <ul class="menu-list is-medium">
          <template
              v-for="(tab,index) in tabs"
          >
            <li
                v-if="this.modalType === 'sort'"
                :class="tabs[tabActive].param === tab.param ? 'is-active':''" :key="tab.name"
                @click="handleTabsClick(index)"
            >
              <a style="display: flex; align-items: center">
                <span class="icon" ><font-awesome-icon :icon="tab.icon"/></span>
                <span>{{ tab.name }}</span>
              </a>
            </li>
          </template>
        </ul>

        <ul class="menu-list is-medium">
          <template
              v-for="(tag,index) in picTags"
              :key="tag.tag_id"
          >
            <li v-if="this.modalType === 'tag'" @click="selectTag(index)">
              <a>
                <span>{{ tag.tag_title }}</span>
              </a>
            </li>
          </template>
        </ul>

      </section>
    </div>
  </div>


  <el-scrollbar style="white-space: nowrap; display: flex; flex-direction: row; " class="mx-2 mb-2" :class="largerMargin">
    <div
        v-for="(tag, index) in picTags"
        :key="tag.tag_id"
        class="mb-4 my-2 mx-1 cover-img"

        @click="selectTag(index)"
    >
      <el-image

          style="width: 176px; height: 176px; border-radius: 10px;"
          class="scroll-item image"
          :src="`${tag.cover_pics[0].img_src}@276w_276h_1e_1c.webp`"
      ></el-image>
      <div style="position: absolute;z-index: 15; left: 0; bottom: 0; right: 0; top: 85%; display: flex; justify-content: center; color: white; font-weight: bolder">
        {{ tag.tag_title }}</div>
    </div>
  </el-scrollbar>


  <div :style="{height:maxHeight + 'px'}">
    <div style="width: 100%; height: 100%" ref="container">
      <div class="v-waterfall-content"
           v-infinite-scroll="getMoreData"
           :infinite-scroll-disabled="disabled"
           infinite-scroll-distance="100"
      >
        <Waterfall :showRank="showRank" class="relative" :isload="isload" :waterfallList="waterfallList" :imageWidth="imageWidth"/>
      </div>
      <div v-loading="isload" style="text-align: center; height: 200px">

      </div>
    </div>
  </div>
</template>

<script>
import {ElMessage} from "element-plus";

window.addEventListener("beforeunload", (e) => {
  window.scroll(0, 0);
});
import Api from '../util/http.js'
import Datepicker from 'vue-bulma-datepicker'
import Waterfall from "./components/Waterfall";

export default {
  name: 'v-waterfall',
  components: {
    Waterfall,
    Datepicker
  },
  data() {
    return {
      largerMargin: "",
      dailyRankDate:"",
      activeTagText:"标签",
      picTags:[],
      modalActive:"",
      modalType:"sort",
      isMobile:false,
      tabActive: 0,
      tabs:[
        {
          "name":"发布时间",
          "icon":"clock",
          "param":"default",
        },        {
          "name":"最受欢迎",
          "icon":"arrow-trend-up",
          "param":"asfa_score"
        },        {
          "name":"最多点击",
          "icon":"eye",
          "param":"asfa_view"
        },        {
          "name":"B站热门",
          "icon":"fire",
          "param":"bili_hot"
        },        {
          "name":"日榜",
          "icon":"sun",
          "param":"bili_daily"
        },        {
          "name":"周榜",
          "icon":"calendar",
          "param":"bili_weekly"
        },        {
          "name":"月榜",
          "icon":"moon",
          "param":"bili_monthly"
        }
      ],
      imgDataType: "default",
      getMoreFunc:{"default":Api._getPic, "asfa_score": Api._getRank, "asfa_view": Api._getRank},
      getMoreParams:{"default": this.load_params},
      maxHeight: 'auto',
      isload: false,
      //作品信息高度
      detailHeight:40,
      //存放计算好的数据
      waterfallList: [],
      //每一列的宽度
      imageWidth: 320,
      //多少列
      waterfallImgCol: 4,
      //右边距
      waterfallImgRight: 10,
      //下边距
      waterfallImgBottom: 10,
      //存放瀑布流各个列的高度
      waterfallColHeight: [],
      //整体左偏移量，左右相同
      colLeft: 0,
      currentPage: 0,
      showRank:false,
      //是否还有数据
      noMore: false,
      //搜索内容
      //随机占位色卡的颜色
      randomColor: ['#b4ffe3','#66CDAA','#acc2e6','#d7b0d8','#95abe6','#ffc47b','#b6d288','#f49586','#bcaf7a'],
      load_params:{
        page:0,
        tag_id: 0,
        sort: 3,
        part: 0,
        rank: 0,
        ctime:0,
      },

    };
  },
  created() {
    this.getMoreData();
  },
  mounted() {
    let tmpDate = new Date()
    this.$refs.datePicker.setDate(`${tmpDate.getFullYear()}-${tmpDate.getMonth() + 1}-${tmpDate.getDate()}`, "")

    let fullWidth = this.$refs.container.clientWidth; //获取容器宽度
    let maxColNum = this.waterfallImgCol //读取列数

    //媒体查询
    if (fullWidth < 800) {
      this.isMobile= true;
      this.imageWidth = 160;
      this.waterfallImgCol = 2
      maxColNum = 2
      this.imageWidth = (fullWidth - 24 - this.waterfallImgRight * (maxColNum-1))/(maxColNum) //减去边界动态算图片宽
    }
    if (fullWidth > 1100){
      this.largerMargin = "mx-6"
    }
    let imageOccupyWidth = this.imageWidth * maxColNum + (maxColNum - 1) * 10
    while (imageOccupyWidth > fullWidth){
      maxColNum--
      imageOccupyWidth = this.imageWidth * maxColNum + (maxColNum - 1) * 10
    }
    //console.log('可视宽度：' + fullWidth + ',列数：' + maxColNum);

    let contentWhith = (this.imageWidth + this.waterfallImgRight) * maxColNum; //content宽度 图片宽+右边距 * 列数
    if ((fullWidth - contentWhith) < (this.imageWidth * 0.8)) {
      contentWhith = (this.imageWidth + this.waterfallImgRight) * maxColNum;
    }
    //console.log('计算列数：' + maxColNum);
    //获取左边距
    this.colLeft = (fullWidth - contentWhith) / 2;



    this.waterfallImgCol = maxColNum;
    //console.log('总宽度：' + fullWidth + ',内容宽度：' + contentWhith + '左偏移：' + this.colLeft);
    //初始化偏移高度数组
    this.waterfallColHeight = new Array(this.waterfallImgCol);
    for (let i = 0; i < this.waterfallColHeight.length; i++) {
      this.waterfallColHeight[i] = 0;
    }
    Api._getPicTags().then((res)=>{
      this.picTags = res.data
    })
  },
  methods: {
    refreshWaterFallData(){
      this.waterfallList= []
      this.waterfallColHeight = new Array(this.waterfallImgCol);
      for (let i = 0; i < this.waterfallColHeight.length; i++) {
        this.waterfallColHeight[i] = 0;
      }
      this.getMoreData()
    },
    pickDate(){
      this.load_params.ctime =new Date(this.$refs.datePicker.date).getTime()/1000
      this.load_params.rank = 1
      this.load_params.page = 0
      this.load_params.sort = 4
      this.tabActive = 4
      this.imgDataType = "default"
      this.refreshWaterFallData()
    },
    selectTag(index){
      this.modalActive = ''
      let tagId = this.picTags[index].tag_id
      this.activeTagText = this.picTags[index].tag_title
      this.load_params.page = 0
      this.load_params.part = tagId
      if (this.tabActive === 1 || this.tabActive === 2){
        this.imgDataType = "default"
        this.tabActive = 0
      }
      this.refreshWaterFallData()
    },
    handleTabsClick(index){
      this.modalActive = ''
      let label = this.tabs[index].param
      this.showRank = label !== "default";
      this.tabActive = index;
      switch (label){
        case "bili_daily":{
          this.load_params.sort = 4
          this.load_params.rank = 1
          this.load_params.page = 0
          this.imgDataType = "default"
          break
        }
        case "bili_weekly":{
          this.load_params.sort = 4
          this.load_params.page = 0
          this.load_params.rank = 2
          this.imgDataType = "default"
          break
        }
        case "bili_monthly":{
          this.load_params.sort = 4
          this.load_params.rank = 3
          this.load_params.page = 0
          this.imgDataType = "default"
          break
        }
        case "bili_hot":{
          this.load_params.sort = 4
          this.load_params.page = 0
          this.load_params.rank = 0
          this.imgDataType = "default"
          break
        }
        case "default":{
          this.load_params.sort = 3
          this.load_params.page = 0
          this.load_params.rank = 0
          this.imgDataType = "default"
          break
        }

        case "asfa_view":
        case "asfa_score":{
          this.imgDataType = label
          this.activeTagText = "标签"
          break
        }
      }



      this.load_params.page = 0
      this.refreshWaterFallData()
    },
    getMoreData() {
      this.noMore = false
      this.isload = true
      this.load_params.page++
      let load_params;
      if (this.imgDataType === "default")
      {
        load_params = this.load_params;
      }else{
        load_params = {
          "page": this.load_params.page,
          "order": this.imgDataType
        }
      }
      this.getMoreFunc[this.imgDataType](
          load_params
        ).then((res) => {
          this.isload = false
          if (res.data.message === "没有更多数据"){
            ElMessage.warning(res.data.message)
            this.noMore = true;
            return
          }
          if (res.data[0].pic_url.length === 0) {
            this.noMore = true;
          } else {
            this.imgPreloading(res.data);
          }

        })


    },
    //图片预加载
    imgPreloading(moreList) {

      //console.log(listLen, moreList)
      for (let i = 0; i < moreList.length; i++) {
        let imgData = moreList[i];
        moreList[i] = moreList[i].pic_url[0]


        if(moreList[i].img_src.indexOf('http') > 0){
          continue;
        }
        let aImg = new Image();
        //图片渲染列表，先把高宽和占位颜色赋值直接push到waterfallList，图片的实际url等图片加载上了在赋值
        imgData.height = this.imageWidth / moreList[i].img_width * moreList[i].img_height;
        imgData.height = imgData.height + this.detailHeight
        //console.log('第' + i + '张图片的高度是：'+imgData.height );
        imgData.id = moreList[i].id;
        //获取随机占位背景色
        imgData.color=this.randomColor[i%9];
        /*
         if (imgData.height > 750){
           moreList.splice(i,1)
           continue;
         }*/
        this.waterfallList = [...this.waterfallList,imgData];
        let webp_w = Math.round(this.imageWidth * 1.5) ;
        let webp_h =Math.round((imgData.height-this.detailHeight) * 1.5) ;

        if (webp_w < 200){
          webp_w = webp_w * 2
          webp_h = webp_h * 2
        }
        let suffix = `@${webp_w}w_${webp_h}h_1e_1c.webp`
        if (moreList[i].img_src.indexOf('$') > -1){
          suffix = ''
        }
        aImg.onload = () => {
          aImg.src =  `${moreList[i].img_src}${suffix}`;
        };
        this.rankImg(imgData);
        imgData.src =  `${moreList[i].img_src}${suffix}`;
        console.log(imgData.src)


      }
      this.maxHeight = Math.max(...this.waterfallColHeight)
    },
    //瀑布流布局核心，计算高度和左偏移
    rankImg(imgData) {
      let {
        imageWidth,
        waterfallImgRight,
        waterfallImgBottom,
        waterfallColHeight,
        colLeft
      } = this;
      //找出当前最短列的索引
      let minIndex = waterfallColHeight.indexOf(Math.min.apply(null, waterfallColHeight));
      //获取最短列底部高度，既下一张图片的顶部高度
      imgData.top = waterfallColHeight[minIndex];
      //计算左侧偏移，最短列索引*（右边距+列宽度）
      imgData.left = minIndex * (waterfallImgRight + imageWidth) + colLeft;
      //改变当前列高度
      waterfallColHeight[minIndex] += imgData.height + waterfallImgBottom;
    },
  },
  computed: {
    disabled() {
      if (this.noMore)
        return this.noMore
      return this.isload;
    },
  },

};

</script>

<style lang="scss" scoped>
input{
  border: none !important;
}
i{
  margin-right: 0.25rem;
}
.header{
  margin-top: 2rem;
}
.v-waterfall-content{
  width: 100%;
  height: 100%;
}
.relative{
  position: relative;
  height: 100%;
}

.scroll-item:after {
  position: absolute;
  border-radius: 10px;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 0;
  content: "";
  width: 100%;
  box-sizing: border-box;
  height: 100%;
  background-image: linear-gradient(0deg,rgba(50,50,50,.2),hsla(0,0%,100%,0));
}
img{
  display:block;
}
.image{
  transition: transform 0.45s ease-in-out 0s;
}
.cover-img{
  position: relative;
  width: 176px;
  height: 176px;
  display: inline-block;
  border-radius: 10px;
  cursor: pointer;
  padding: 0;
  overflow: hidden;

  &:hover{
    .image{
      transform: scale(1.1,1.1);
    }
  }
}

</style>

