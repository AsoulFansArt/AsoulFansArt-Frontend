<template>
  <div id="chart"></div>
</template>

<script setup>
import * as echarts from 'echarts';
import {defineProps, onMounted} from "vue";

const props = defineProps({
  title: {
    type: String,
    default: 'Stacked Line'
  },
  lineColor:{
    type: String,
    default: 'blue'
  },
  fansMedalCountList:{
    type: Array,
    default:()=>{
      return [120, 132, 101, 134, 90, 230, 210]
    }
  },
  guardCountList:{
    type: Array,
    default: ()=>{
      return [220, 182, 191, 234, 290, 330, 310]
    }
  },
  timeList:{
    type: Array,
    default: ()=>{
      return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    }
  }
})



onMounted(()=>{
  let chartDom = document.getElementById('chart');

  let myChart = echarts.init(chartDom);

  let option;
  option = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['粉丝牌(点亮)', '舰长']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: props.timeList
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '粉丝牌(点亮)',
        type: 'line',
        data: props.fansMedalCountList,
        showSymbol:false,
        itemStyle:{
          normal:{
            color: props.lineColor,
            lineStyle:{
              color: props.lineColor
            }
          }
        },
      },
      {
        name: '舰长',
        type: 'line',
        data: props.guardCountList,
        showSymbol:false,
        itemStyle:{
          normal:{
            color: 'rgb(227,63,255)',
            lineStyle:{
              color: 'rgb(227,63,255)'
            }
          }
        },

      },
    ]
  };
  option && myChart.setOption(option);
})
</script>

<style scoped>
#chart {
  width: 100%;
  height: 40rem;
}
</style>