<template>
  <div>
    <div class="account-card">
      <el-image class="account-face" src="https://i0.hdslb.com/bfs/album/e60150aa8dc26c9ac2845c1529a49ac9a716f05d.jpg@208w_208h_1e_1c.webp"></el-image>
      <div style="width: 100%;" class="account-work">
        <div class="work-nums">
          <span style="color: gray">关注</span>
          <div>999</div>
        </div>
        <div class="work-nums">
          <span style="color: gray">粉丝</span>
          <div>999</div>
        </div>
        <div class="work-nums">
          <span style="color: gray">作品</span>
          <div>999</div>
        </div>
      </div>
      <div class="account-name">
        <h1 style="font-weight: 600; margin:0">测试账号</h1>
      </div>
      <div class="account-name">
        <span class="account-level">LV11</span>
      </div>
    </div>
    <div class="account-sign">测试~</div>
    <div class="account-card">
      <div class="icon-menu" ref="menuContainer">
        <div class="icon-card" href="/video" ref="menuIcon">
          <el-icon :size="32" style="margin: 9px">
            <Star />
          </el-icon>
          <div class="icon-desc">我的收藏</div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import '../../assets/scss/account.scss'
import '../../assets/scss/menu.scss'
import { Star } from '@element-plus/icons'
export default {
  name: "Account",
  components:{
    Star,
  },
}
</script>

<style scoped>

</style>