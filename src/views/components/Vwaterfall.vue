<template>
  <div :style="{height:maxHeight + 'px'}">
    <div style="width: 100%; height: 100%" ref="container">
      <div class="v-waterfall-content"
           v-infinite-scroll="getMoreData"
           :infinite-scroll-disabled="disabled"
           infinite-scroll-distance="10"
      >
        <Waterfall :showRank="showRank" :owner="owner" class="relative" :isload="isload" :waterfallList="waterfallList" :imageWidth="imageWidth"/>
      </div>
      <div v-loading="isload" style="text-align: center; height: 200px">

      </div>
    </div>
  </div>
</template>

<script>
import Waterfall from "./Waterfall";
import {ElMessage} from "element-plus";

export default {
  name: 'v-waterfall',
  components: {
    Waterfall,
  },
  props:{
    loadFunc:{
      type: Function
    },
    uid:{
      type:String,
      description:"用户UID",
      default:"0",
    },
    type:{
      type:Number,
      default:1
    },
    owner:{
      type:Boolean,
      description: "显示作者名字",
      default: true
    },
    showRank:{
      type:Boolean,
      description:"图片索引",
      default:false,
    },
    detailHeight:{
      type: Number,
      default: 40,
    }
  },
  data() {
    return {
      currentPage: 0,
      //容器高度
      maxHeight: 'auto',
      //是否还有数据
      noMore: false,
      isload: false,
      //存放计算好的数据
      waterfallList: [],
      //每一列的宽度
      imageWidth: 280,
      //多少列
      waterfallImgCol: 5,
      //右边距
      waterfallImgRight: 10,
      //下边距
      waterfallImgBottom: 10,
      //存放瀑布流各个列的高度
      waterfallColHeight: [],
      //整体左偏移量，左右相同
      colLeft: 0,
      //搜索内容
      //随机占位色卡的颜色
      randomColor: ['#b4ffe3','#66CDAA','#acc2e6','#d7b0d8','#95abe6','#ffc47b','#b6d288','#f49586','#bcaf7a'],
    };
  },
  created() {
    this.getMoreData();
  },

  mounted() {
    let fullWidth = this.$refs.container.clientWidth;
    let maxColNum = this.waterfallImgCol
    if (fullWidth < 800) {
      this.isMobile= true;
      this.imageWidth = 160;
      this.waterfallImgCol = 2
      maxColNum = 2
      this.imageWidth = (fullWidth - 24 - this.waterfallImgRight * (maxColNum-1))/(maxColNum)
    }
    let imageOccupyWidth = this.imageWidth * maxColNum + (maxColNum - 1) * 10
    while (imageOccupyWidth > fullWidth){
      maxColNum--
      imageOccupyWidth = this.imageWidth * maxColNum + (maxColNum - 1) * 10
    }
    let contentWhith = (this.imageWidth + this.waterfallImgRight) * maxColNum;
    if ((fullWidth - contentWhith) < (this.imageWidth * 0.8)) {
      contentWhith = (this.imageWidth + this.waterfallImgRight) * maxColNum;
    }
    this.colLeft = (fullWidth - contentWhith) / 2;
    this.waterfallImgCol = maxColNum;
    this.waterfallColHeight = new Array(this.waterfallImgCol);
    for (let i = 0; i < this.waterfallColHeight.length; i++) {
      this.waterfallColHeight[i] = 0;
    }
  },
  methods: {
    getLoadStatus(bool){
      this.isload = bool
    },
    getResult(data){
      this.waterfallList = [];
      this.currentPage = 1;
      for (let i = 0; i < this.waterfallColHeight.length; i++) {
        this.waterfallColHeight[i] = 0;
      }
      this.load_params = data.load_params;
      this.imgPreloading(data.response);
    },
    getMoreData() {
      this.isload = true
      this.currentPage++
      this.loadFunc({page: this.currentPage}).then((res) => {
        this.isload = false
        if (res.data.message === "没有更多数据"){
          //alert(res.data.message)'
          ElMessage.warning("没有更多数据")
          this.noMore = true;
          return
        }else if  (res.data.message === "非法Token"){
          ElMessage.warning("登陆已过期,请重新登陆")
          localStorage.clear()
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
        this.waterfallList = [...this.waterfallList,imgData];
        let webp_w = Math.round(this.imageWidth * 1.5) ;
        let webp_h =Math.round((imgData.height-this.detailHeight) * 1.5) ;

        if (webp_w < 200){
          webp_w = webp_w * 2
          webp_h = webp_h * 2
        }
        let suffix = `@${webp_w}w_${webp_h}h_1e_1c.webp`
        aImg.onload = () => {
          aImg.src =  `${moreList[i].img_src}${suffix}`;
        };
        this.rankImg(imgData);
        imgData.src =  `${moreList[i].img_src}${suffix}`;

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
</style>

