<template>
  <div class="container-fluid" :style="{display: 'flex', justifyContent: 'center'}">
    <div class="row justify-content-center" :style="{width:'80rem', overflow:'hidden'}">

      <div class="col" :style="{marginBottom: '5px'}">
        <el-card>
          <template #header>
            <span>排序</span>
          </template>
          <div class="col-sel m-1" :style="{textAlign:'center'}">
            <el-select v-model="sortValue" placeholder="默认排序" size="mini" @change ="onSelectedSort" >
              <el-option
                  v-for="item in sortOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              >
              </el-option>
            </el-select>

            <el-select v-model="rankValue" placeholder="榜单" size="mini" @change ="onSelectedRank" >
              <el-option
                  v-for="item in rankOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              >
              </el-option>
            </el-select>

            <el-date-picker
                size="mini"
                v-model="value1"
                type="datetime"
                placeholder="日期"
                @change ="onSelectedTime"
            >
            </el-date-picker>

          </div>
          <div :style="{textAlign:'center'}" v-if="type==='video'">
            <el-check-tag
                class="m-1"
                v-for="(item) in tags"
                :key="item.id"
                :checked="item.checked"
                @change="onChange(item.id,item)"
            >
              {{item.name}}
            </el-check-tag>

<!--            <el-switch v-model="showOfficial" active-color="#13ce66" inactive-color="#ff4949" active-text="不显示官号" @change="showChange">-->
<!--            </el-switch>-->
          </div>
          <div :style="{textAlign:'center'}">
            <el-tooltip
                v-for="item in asouls"
                v-bind:key="item.uid"
                class="item" effect="dark" :content="item.name" placement="bottom-start">
              <el-avatar

                  :size="50"
                  shape="square"
                  @click="clickAvatar(item)"
                  :src="item.pic">
              </el-avatar>
            </el-tooltip>
          </div>

        </el-card>
      </div>


      <div class="col" :style="{marginBottom: '5px'}">
        <el-card>
          <template #header>
            <span>全部分区</span>
          </template>
          <el-scrollbar height="8rem">
            <el-check-tag
                class="col-tag-item"
                v-for="(item,index) in videoTagOptions"
                :key="item.tid?item.tid:item.tag_id"
                :checked="item.checked"
                @change="onVideoTagChange(index,item)"

            >{{`${item.tname?item.tname:item.tag_title}`}}
            <span v-if="type==='video'">{{`${item.num?'('+item.num+')':''}`}}</span></el-check-tag>
          </el-scrollbar>

        </el-card>
      </div>

    </div>
  </div>
</template>

<script>
import Api from "../../util/http";

export default {
  name: "Condition",
  props:{
    type:{
      type:String,
      default: "video",
      description: "视频(video) or 图片(pic)"
    }
  },
  data() {
    return {
      asouls:[
        {
          name:"A-SOUL_Official",
          pic:"http://i2.hdslb.com/bfs/face/48d65a10a2c643dddc4a51e0a60fae892393417a.jpg@128w_128h_1o.webp",
          uid:"703007996"
        },
        {
          name:"向晚大魔王",
          pic:"http://i0.hdslb.com/bfs/face/566078c52b408571d8ae5e3bcdf57b2283024c27.jpg@128w_128h_1o.webp",
          uid:"672346917"
        },
        {
          name:"贝拉kira",
          pic:"https://i2.hdslb.com/bfs/face/668af440f8a8065743d3fa79cfa8f017905d0065.jpg@128w_128h_1o.webp",
          uid:"672353429"
        },
        {
          name:"珈乐Carol",
          pic:"https://i1.hdslb.com/bfs/face/a7fea00016a8d3ffb015b6ed8647cc3ed89cbc63.jpg@128w_128h_1o.webp",
          uid:"351609538"
        },
        {
          name:"嘉然今天吃什么",
          pic:"https://i2.hdslb.com/bfs/face/d399d6f5cf7943a996ae96999ba3e6ae2a2988de.jpg@128w_128h_1o.webp",
          uid:"672328094"
        },
        {
          name:"乃琳Queen",
          pic:"https://i1.hdslb.com/bfs/face/8895c87082beba1355ea4bc7f91f2786ef49e354.jpg@128w_128h_1o.webp",
          uid:"672342685"
        },
      ],
      showOfficial: false,
      response: [],
      isMobile: false,
      checked:true,
      tags:[
        { bgcl:'#404040', id:'1712619', name:"A-SOUL", checked:false },
        { bgcl:'#9AC8E2', id:'9221368', name:"向晚", checked:false },
        { bgcl:'#BD7D74', id:'195579', name:"贝拉", checked:false },
        { bgcl:'#B8A6D9', id:'17872743', name:"珈乐", checked:false },
        { bgcl:'#E799B0', id:'17520266', name:"嘉然", checked:false },
        { bgcl:'#576690', id:'17839311', name:"乃琳", checked:false },

      ],
      tagIndex:0,
      sortOptions:[
        {
          value: '1',
          label: '播放多'
        }, {
          value: '2',
          label: '新发布'
        }, {
          value: '3',
          label: '弹幕多'
        }, {
          value: '4',
          label: '分享多'
        },{
          value: '5',
          label: '热门'
        }],
      sortValue: '',
      sortIndex: 0,
      videoTagOptions:[],
      partOptions:[
        {
          value:'0',
          label:'全部分区'
        }
      ],
      partValue: '',
      partIndex: 0,
      rankOptions:[
        {
          value: '0',
          label: '默认',
        },
        {
          value:'1',
          label:'日榜',
        },
        {
          value:'2',
          label:'周榜',
        },
        {
          value:'3',
          label:'月榜',
        },
        {
          value:'4',
          label:'总榜',
        }
      ],
      rankValue: '',
      rankIndex: 0,
      value1:"",
      ctime:0,
      cPage:0,
    }
  },
  methods:{
    clickAvatar(item){
      window.open("https://space.bilibili.com/" + item.uid)
    },
    f_getBV(){
      this.$emit('changeLoad', true)
      this.cPage = 1;
      if (this.type === "pic"){
        return Api._getPic({
          page:this.cPage,
          tag_id: this.tagIndex,
          sort: this.sortIndex,
          part: this.partIndex,
          rank: this.rankIndex,
          ctime:this.ctime,
        }).then((res) => {
          this.$emit('changeLoad', false)
          this.$emit('changePic', {
            response: res.data,
            load_params:{
              page:this.cPage,
              tag_id: this.tagIndex,
              sort: this.sortIndex,
              part: this.partIndex,
              rank:  this.rankIndex,
              ctime:this.ctime,
            },
          })})
      }
      return Api._getBV({
        page:this.cPage,
        tag_id: this.tagIndex,
        sort: this.sortIndex,
        part: this.partIndex,
        rank: this.rankIndex,
        ctime:this.ctime,
        show_official: this.showOfficial
      }).then((res) => {
        this.$emit('changeLoad', false)
        this.$emit('changeMs', {
          response: res.data,
          load_params:{
            page:this.cPage,
            tag_id: this.tagIndex,
            sort: this.sortIndex,
            part: this.partIndex,
            rank:  this.rankIndex,
            ctime:this.ctime,
            show_official: this.showOfficial
          },
        })
      })
    },
    onVideoTagChange(index,item){
      this.partIndex = item.tid ? item.tid : item.tag_id
      item.checked = !item.checked
      if (item.checked === false){
        this.partIndex = 0;
      }else{
        for (let tag of this.videoTagOptions)
          tag.tid ? tag.checked = tag.tid === item.tid : tag.checked = tag.tag_id === item.tag_id
      }
      this.f_getBV()
    },
    onSelectedTime(ctime){
      this.ctime = new Date(ctime).getTime()/1000
      this.f_getBV()
    },
    onSelectedSort(sort){
      this.sortIndex = sort
      this.f_getBV()
    },
    onSelectedRank(rank){
      this.rankIndex = rank
      this.f_getBV()
    },
    onChange(id, item){
      this.tagIndex = id
      item.checked = !item.checked
      if (item.checked === false){
        this.tagIndex = 0;
      }else{
        for (let item of this.tags)
          item.checked = item.id === id;
      }
      this.f_getBV()
    },
    showChange(){
      this.f_getBV()
    }
  },
  mounted() {
    if (this.type === "pic"){
      this.sortOptions=[
        {
          value: '1',
          label: '浏览量'
        },  {
          value: '2',
          label: '分享数'
        }, {
          value: '3',
          label: '新发布'
        },{
          value: '4',
          label: '热门'
        }]
      try {
        Api._getPicTags().then((res)=>{
          this.videoTagOptions = res.data
          for(let item of res.data)item['checked'] = false;
        })
      }catch (e){
        console.log(e)
      }
      return
    }
    try {
      Api._getVideoPart().then((res)=>{
        this.videoTagOptions = res.data
        for(let item of res.data)item['checked'] = false;
      })
    }catch (e){
      console.log(e)
    }
  },
}
</script>

<style scoped>
.el-card{
  height: 100%;
}
.col-sel{
  display: flex;
  justify-content: center;
  margin-bottom: 5px;
}
.col-tag-item{
  margin: 5px;
}
</style>
