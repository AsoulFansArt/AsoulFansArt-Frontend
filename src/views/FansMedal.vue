<template>
  <el-card class="m-2" style="position: relative;" shadow="hover">
    <el-row class="mb-2" align="top">
      <el-col>
        <el-date-picker
            @change="curType='range'"
            v-model="selectTimes"
            type="datetimerange"
            range-separator="To"
            start-placeholder="选择开始时间"
            end-placeholder="选择结束时间"
            value-format="YYYY-MM-DD HH:mm:ss"
        />
      </el-col>
    </el-row>
    <el-row align="middle">
      <el-select v-model="curType"  class="mr-2 mb-1" placeholder="选择方式">
        <el-option
            v-for="(item, key) in titles"
            :key="key"
            :label="item"
            :value="key"
        />
      </el-select>
      <div class="mb-1">
        <el-button
            v-for="(item, key) in rooms"
            :key="key"
            :color="item.color"
            plain
            @click="curRoom=key; getFansMedalLog()">
          {{ item.name }}
        </el-button>
      </div>
    </el-row>
    <div v-if="!Util._isMobile()" style="position: absolute; right: 5%; top: 40%; font-weight: bolder; font-size: large">2022年6月27日开始记录，数据每小时更新一次~</div>
  </el-card>


  <el-card
      v-loading="loading"
      class="m-2"
      style="height: 47rem;"
      shadow="hover"
  >
    <template #header>
      <div style="font-weight: bolder; font-size: large">
        <span>{{ `${rooms[curRoom].name}粉丝团(${titles[curType] === '选择时间段' ? selectTimes : titles[curType]})` }}</span>
      </div>
    </template>
    <StackedLine v-if="fansMedalCountList.length > 0"
                 :key="curRoom"
                 :title=" `${rooms[curRoom].name}粉丝团(${titles[curType] === '选择时间段' ? selectTimes : titles[curType]})`"
                 :lineColor="rooms[curRoom].color"
                 :timeList="timeList"
                 :fansMedalCountList="fansMedalCountList"
                 :guardCountList="guardCountList"></StackedLine>
  </el-card>
  <el-card v-loading="loading" class="m-2" shadow="hover">
    <template #header>
      <div style="font-weight: bolder; font-size: large">
        <span>日均变化</span>
      </div>
    </template>
    <el-table :data="dayAverages" stripe>
      <el-table-column prop="time" label="日期" />
      <el-table-column prop="data.fansMedalCount" label="粉丝团"></el-table-column>
      <el-table-column label="粉丝团变化">
        <template #default="scope">
          <span v-if="scope.row.data.fansMedalChange>0" class="more">+{{scope.row.data.fansMedalChange}}</span>
          <span v-if="scope.row.data.fansMedalChange<0" class="less">{{scope.row.data.fansMedalChange}}</span>
          <span v-if="scope.row.data.fansMedalChange===0">{{scope.row.data.fansMedalChange}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="data.guardCount" label="舰团"></el-table-column>
      <el-table-column label="舰团变化">
        <template #default="scope">
          <span v-if="scope.row.data.guardChange>0" class="more">+{{scope.row.data.guardChange}}</span>
          <span v-if="scope.row.data.guardChange<0" class="less">{{scope.row.data.guardChange}}</span>
          <span v-if="scope.row.data.guardChange===0">{{scope.row.data.guardChange}}</span>

        </template>
      </el-table-column>
    </el-table>
  </el-card>
  <el-card class="m-2" shadow="hover">
    完成任意任务可点亮粉丝牌, 亲密度（100+600+500+100=1300）获取方式：<br>
    1、发弹幕打卡100<br>
    2、双击点赞200，一天三次<br>
    3、分享直播间100，一天五次<br>
    4、连续观看直播30分钟100（必须主播开播）<br>
    5、送礼物
  </el-card>
</template>

<script setup>
import StackedLine from "@components/StackedLine"
import {onMounted, ref} from "vue";
import Api from "@util/http"
import Util from "@util/general"

let fansMedalCountList = ref([])
let guardCountList = ref([])
let timeList = ref([])
let loading = ref(true)
let curRoom = ref('ava')
let curType = ref('week')
let selectTimes = ref()
let dayAverages = ref([])
const rooms = {
  "ava":{
    name: "向晚",
    roomId: 22625025,
    color: '#9AC8E2'
  },
  "bella":{
    name: "贝拉",
    roomId: 22632424,
    color: '#BD7D74'
  },
  "diana":{
    name: "嘉然",
    roomId: 22637261,
    color: '#E799B0'
  },
  "eileen":{
    name: "乃琳",
    roomId: 22625027,
    color: '#576690'
  }
}
const titles = {
  day: "24小时内",
  week: "本周",
  month: "本月",
  range: "选择时间段"
}


const getFansMedalLog = ()=>{
  console.log( rooms[curRoom.value].roomId)
  loading.value = true
  fansMedalCountList.value = []
  guardCountList.value = []
  timeList.value = []
  const params = {type: curType.value, roomId: rooms[curRoom.value].roomId}
  if (curType.value === 'range'){
    params.start = selectTimes.value[0]
    params.end = selectTimes.value[1]
  }
  Api._getFansMedalLog(params).then((res)=>{
    const tmpMap = {}
    res.data.forEach((item)=>{
      fansMedalCountList.value.push(item.light_count)
      guardCountList.value.push(item.guard_count)
      let dateText = item.time.substring(6,10)
      timeList.value.push(dateText + ' ' + item.time.substring(11,16))
      if (!tmpMap[dateText])
        tmpMap[dateText] = {}
      tmpMap[dateText].fansMedalCount = (tmpMap[dateText].fansMedalCount ? tmpMap[dateText].fansMedalCount: 0) + item.light_count
      tmpMap[dateText].guardCount = (tmpMap[dateText].guardCount ? tmpMap[dateText].guardCount: 0) + item.guard_count
      tmpMap[dateText].count = (tmpMap[dateText].count ? tmpMap[dateText].count: 0) + 1
    })

    loading.value = false
    let lastFansMedalCount = 0
    let lastGuardCount  = 0
    dayAverages.value = Object.keys(tmpMap).map(key => {
      tmpMap[key].fansMedalCount = Math.round(tmpMap[key].fansMedalCount / tmpMap[key].count)
      tmpMap[key].guardCount = Math.round(tmpMap[key].guardCount / tmpMap[key].count)
      tmpMap[key].fansMedalChange = lastFansMedalCount ===0 ? 0 : tmpMap[key].fansMedalCount - lastFansMedalCount
      tmpMap[key].guardChange = lastGuardCount ===0 ? 0 : tmpMap[key].guardCount - lastGuardCount
      lastFansMedalCount = tmpMap[key].fansMedalCount
      lastGuardCount = tmpMap[key].guardCount
      return {time: key, data: tmpMap[key]}
    })
    dayAverages.value.reverse()
  })
}

onMounted(()=>{
  getFansMedalLog()
})
</script>

<style scoped>
.more{
  color: limegreen;
}
.less{
  color: red;
}
</style>