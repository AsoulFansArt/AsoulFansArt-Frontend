<template>
  <div style="display: flex; justify-content: center; height: auto; width: 100% " class="p-6">
    <el-timeline>
      <div style="font-weight: bold;" class="mb-2">
        <p>整理了5.10珈乐毕业节奏相对完整的时间线，供大家参考</p>
        <p>• 蓝色 - 官方相关已证实信息</p>
        <p>• 绿色 - 珈乐中之人相关</p>
        <p>• 黄色 - 间接已证实信息</p>
        <p>• 灰色 - 造谣信息</p>
      </div>
      <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :icon="activity.icon"
          :type="activity.type"
          :color="activity.color"
          :size="activity.size"
          :hollow="activity.hollow"
          :timestamp="activity.timestamp"
      >
        <div v-html="activity.content"></div>
        <span class="desc" v-if="activity.srcList">({{activity.srcList.length}}图)</span>
        <div>
          <el-image
              v-if="activity.url"
              style="width: 100px; height: 100px"
              :src="activity.url"
              :preview-src-list="activity.srcList"
              fit="cover"
              :initial-index="0"
          />
        </div>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script setup>
import local from "../util/local";
import {ref} from "vue";
const activities = ref()
local._getTimeLine({time: new Date().getTime()}).then(res=>{
  activities.value = res.data
})
// const activities = [
//   {
//     content: '啵啵小狗美图秀秀发文【三月四月就知道个人信息泄露，被开盒的人做什么都无济于事】',
//     timestamp: '2022-05-27 20:50',
//     type: 'success',
//     hollow: true,
//     url: 'https://message.biliimg.com/bfs/im/ad13b4d0d894fdfbc6e3e04f60bf126fbb7b8a7b.jpg',
//     srcList: ['https://message.biliimg.com/bfs/im/ad13b4d0d894fdfbc6e3e04f60bf126fbb7b8a7b.jpg']
//   },
//   {
//     content: '啵啵小狗3小时后补充回复【这是今天我有印象觉得可爱的小动物 其实还有一只金龟子 很多很多鱼和鸟】',
//     timestamp: '2022-05-24 21:51',
//     type: 'success',
//     hollow: true,
//   },
//   {
//     content: '啵啵小狗评论区回复【宝宝回来了 今天去晒太阳爬山去了  看到了一只松许 两只蜈蚣  两只蜗牛  回答完毕你们今天在干嘛】',
//     timestamp: '2022-05-24 18:51',
//     type: 'success',
//     hollow: true,
//     url: 'https://message.biliimg.com/bfs/im/110c49105fe1e07155747a92bc0c96432482233c.png',
//     srcList: [
//         'https://message.biliimg.com/bfs/im/110c49105fe1e07155747a92bc0c96432482233c.png',
//         'https://message.biliimg.com/bfs/im/df44eecef19613e9ace135c74227ec97b354022a.png',
//         'https://message.biliimg.com/bfs/im/f9cdfef3dd64e719f8072812ba17f14dffdb5e24.jpg'
//     ]
//   },
//   {
//     content: 'A-SOUL_Official发布【<a href="https://www.bilibili.com/read/cv16772169" target="_blank">[每周QA]称原住所泄漏是因为"某张自拍照被三角定位导致"</a>】',
//     timestamp: '2022-05-24 18:51',
//     type: 'primary',
//     hollow: true,
//   },
//   {
//     content: '青瞳视觉发布澄清声明【<a href="https://t.bilibili.com/662277394389794914?spm_id_from=333.999.0.0" target="_blank">动捕服理论不可能划伤皮肤</a>】',
//     timestamp: '2022-05-20 16:54',
//     type: 'success',
//     hollow: true,
//   },
//   {
//     content: 'A-SOUL企划上级对江南、V项目组的一封信，决定最后一次回应本次事件【<a href="https://t.bilibili.com/661275378503909411" target="_blank">无论你说什么做什么，别人都可能误解为大公司在霸凌一位处于弱势群体的员工</a>】',
//     timestamp: '2022-05-18 00:06',
//     type: 'success',
//     hollow: true,
//   },
//   {
//     content: 'A-SOUL_Official发布【<a href="https://www.bilibili.com/read/cv16659651" target="_blank">[每周QA]个人隐私泄漏问题联系警方处理</a>】',
//     timestamp: '2022-05-17 18:06',
//     type: 'primary',
//     hollow: true,
//   },
//   {
//     content: '滨江区人力社保局回应【<a href="https://shimo.im/docs/aBAYV0Xy41s6O03j/" target="_blank">未发现杭州看潮信息咨询有限公司存在克扣工资和强迫签订劳动合同的情况</a>】',
//     timestamp: '2022-05-16 18:39',
//     type: 'success',
//     hollow: true,
//   },
//   {
//     content: '某聊天记录<br>• 5.1凌晨联系网易云[此时ID为三松许]删除动态，之后她隐藏了动态、名字改为二手月季。<br>• 爆料人称57分钟前动态的为5月8日13:42(截图时间为14:24)<br>• 有一张与[二手月季]的wyy私信聊天截图(截图时间为凌晨1:14)',
//     timestamp: '2022-05-16 15:00',
//     type: 'info',
//     hollow: true,
//     url:'https://message.biliimg.com/bfs/im/ea07a7317fdad9899392b59862423fb7b20b9f8a.jpg',
//     srcList: ['https://message.biliimg.com/bfs/im/ea07a7317fdad9899392b59862423fb7b20b9f8a.jpg']
//   },
//   {
//     content: 'S1应援会在B站发布专栏【<a href="https://www.bilibili.com/read/cv16627214" target="_blank">3.5晚珈乐半夜被叫醒不存在期压、向晚脸模、绩效为假，4月中旬有人要挖全部成员的账号</a>】',
//     timestamp: '2022-05-15 19:49',
//     type: 'success',
//     hollow: true,
//   },
//   {
//     content: '乐报、前乐组组长回旋镖发帖称【还好自己人挖出来，提前10几天知道wyy，事情确实朝着对她有利的方向发展，在5.28晚销号，帖子删除】',
//     timestamp: '2022-05-15 02:41',
//     type: 'warning',
//     hollow: true,
//     url: 'https://message.biliimg.com/bfs/im/dc2176bd55f6bdb8e2cd4f4468235c2389e1378f.jpg',
//     srcList: ['https://message.biliimg.com/bfs/im/dc2176bd55f6bdb8e2cd4f4468235c2389e1378f.jpg']
//   },
//   {
//     content: '字节内部苏轼对于本次事件的回应【<a href="https://shimo.im/docs/8Nk6Mb2G0dcn2qLz" target="_blank">珈乐离队尝试挽留，但未能达成一致。薪资：粉丝在直播时候打赏了100元，小姐姐们可以获得10元分成</a>】',
//     timestamp: '2022-05-14 18:56',
//     type: 'success',
//     hollow: true,
//
//   },
//   {
//     content: 'A-SOUL_Official发布【<a href="https://www.bilibili.com/read/cv16610028" target="_blank">A-SOUL制作委员会对近期事件的说明</a>】',
//     timestamp: '2022-05-14 15:30',
//     type: 'primary',
//     hollow: true,
//   },
//   {
//     content: '啵啵小狗(珈乐中之人)转发微博后删除(设备为iPhone 13 mini)【最后一段原文称"珈乐不是逃脱的胆小鬼，是勇于冲破资本霸陵的酷盖。另外四个女孩子是被资本欺骗的可怜人"】，次日微博显示昨日发博1',
//     timestamp: '2022-05-14 02:16',
//     type: 'success',
//     hollow: true,
//     url:'https://message.biliimg.com/bfs/im/6424dce21f83c50cb5bd255c7105742ab215b9db.jpg',
//     srcList: ['https://message.biliimg.com/bfs/im/6424dce21f83c50cb5bd255c7105742ab215b9db.jpg',
//     'https://message.biliimg.com/bfs/im/2e1eb9d524c6a32a37c94f776a4d52a6a63578b0.jpg']
//   },
//   {
//     content: 'A-SOUL_Official发布【<a href="https://t.bilibili.com/658971394809266198" target="_blank">《给一个魂的一封信》A-SOUL企划负责人苏轼</a>】',
//     timestamp: '2022-05-11 19:05',
//     type: 'primary',
//     hollow: true,
//   },
//   {
//     content: 'A-SOUL_Official发布【<a href="https://t.bilibili.com/658921010562596919" target="_blank">追加一场珈乐的单播</a>】',
//     timestamp: '2022-05-11 15:50',
//     type: 'primary',
//     hollow: true,
//   },
//   {
//     content: 'A-SOUL_Official发布【<a href="https://www.bilibili.com/read/cv16550966" target="_blank">A-SOUL制作委员会的临时QA</a>】',
//     timestamp: '2022-05-11 02:39',
//     type: 'primary',
//     hollow: true,
//   },
//   {
//     content: '原乐组组长、乐超主持人岁纳京子发文【<a href="https://shimo.im/docs/1lq7MnX274sNv2Ae/" target="_blank">你们现在随便一搜都能看到，关于她的那些消息。训练到凌晨，练到吐，身体受伤，职业病。</a>】',
//     timestamp: '2022-05-10 18:54',
//     type: 'warning',
//     hollow: true,
//   },
//   {
//     content: '珈乐网易云动态留档截图开始在各处传播, 其中一张截图为57分钟前、另一张为12:42都没有截日期、网易云ID为[二手月季], 本次事件的疑点',
//     timestamp: '2022-05-10 17:30-18:00',
//     type: 'success',
//     hollow: true,
//     url:'https://message.biliimg.com/bfs/im/59b30bd7f0d1fb5f30789e58e4d6086fe0e6c2cc.jpg',
//     srcList: ['https://message.biliimg.com/bfs/im/59b30bd7f0d1fb5f30789e58e4d6086fe0e6c2cc.jpg',
//       'https://message.biliimg.com/bfs/im/f3608a15a9facebe02ddd590bd07b30e251367bf.jpg',
//       'https://i0.hdslb.com/bfs/article/6ab6fc4fd29d5f9916d38e9d1e87c073340b65b0.jpg',
//       'https://i0.hdslb.com/bfs/article/698f99e2ffe6181e070aebe281b28d1d3681f2a2.jpg',
//       'https://i0.hdslb.com/bfs/article/494fc0c30884cffd9c414386c7363c64e6621d24.jpg']
//   },
//   {
//     content: '原乐组组长、乐超主持人岁纳京子发文【<a href="https://shimo.im/docs/1lq7MnX274sNv2Ae/" target="_blank">嘉然的处境很困难,与珈乐相依为暖,无法解约,称A-SOUL甩锅给珈乐</a>】',
//     timestamp: '2022-05-10 17:42',
//     type: 'warning',
//     hollow: true,
//   },
//   {
//     content: '原乐组组长、乐超主持人岁纳京子发文【<a href="https://shimo.im/docs/1lq7MnX274sNv2Ae/" target="_blank">珈乐失去声音、失去健康讨厌杭州,宿舍不能养富贵,捡来的小狗也被抢走</a>】',
//     timestamp: '2022-05-10 17:13',
//     type: 'warning',
//     hollow: true,
//   },
//   {
//     content: '某楼友的核中核',
//     timestamp: '2022-05-10 16:52',
//     type: 'info',
//     hollow: true,
//     url:'https://message.biliimg.com/bfs/im/b97cf1c71164b1ad253661c0deaf43b30259bcdd.png',
//     srcList: ['https://i0.hdslb.com/bfs/article/5aa3e07af0af7ec46a4cbd9695a16fbe8191bca5.jpg']
//   },
//   {
//     content: '某用户回帖【聊天截图时间为4.28，A-SOUL要换UE了，5.10会宣布珈乐毕业】',
//     timestamp: '2022-05-10 16:50',
//     type: 'info',
//     hollow: true,
//   },
//   {
//     content: '原乐组组长、乐超主持人岁纳京子发文【<a href="https://shimo.im/docs/1lq7MnX274sNv2Ae/" target="_blank">更多更恶心的事在这个企划中,中之人就是人下人</a>】,王力口乐吧吧主涉咕咕后续在贴吧、B站发文',
//     timestamp: '2022-05-10 16:36',
//     type: 'warning',
//
//     hollow: true,
//   },
//   {
//     content: 'A-SOUL_Official发布【<a href="https://t.bilibili.com/658560233295052806" target="_blank">珈乐因身体及学业原因进入"直播休眠"</a>】',
//     timestamp: '2022-05-10 16:30',
//     type: 'primary',
//     hollow: true,
//   },
// ]
// console.log(JSON.stringify(activities))
</script>

<style>
.desc{
  color: gray;
}
</style>