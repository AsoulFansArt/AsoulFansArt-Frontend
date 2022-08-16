# A-SoulFansArt-一个魂的二创
网址:https://asoulfanart.com\
项目目前为二创收集,想要方便一个魂们浏览二创作品~  
站内视频需跳转原地址,图片为缩略图,永远不会提供批量下载功能  
互动是对UP们最大的支持, 看到喜欢的作品请给原作者支持(关注,点赞,投币,分享,评论等等)
***
### 关于A-SOUL
A-SOUL是乐华娱乐于2020年11月23日公开的其旗下首个虚拟偶像团体，由~~5~~名成员组成。

A-SOUL_Official：https://space.bilibili.com/703007996  
* 乃琳：https://space.bilibili.com/672342685
* 珈乐(毕业): https://space.bilibili.com/672328094
  * 节奏时间线：https://asoulfanart.com/asoul/history
* 嘉然：https://space.bilibili.com/672328094
* 贝拉：https://space.bilibili.com/672353429
* 向晚：https://space.bilibili.com/672346917
***
**技术栈:**  
新版:vue3+bulma+pwa
***
**声明:**  
如网站侵犯了您的版权,请联系B站项目官号[@A-SoulFansArt](https://space.bilibili.com/291072226)
确认后我会第一时间撤下内容
***
计划(填坑列表):
* 首页[ ]
   - 每日作品(视频,文章,图片)[ ]
   - 每日排行榜[ ]
   - 周报专栏[ ]
   - 推荐作品[ ]
   - 随机推荐[ ]
   - 随机Tag下作品推荐[ ]
   - 人工推荐[ ]
* 搜索功能[ ]
* 排行榜(目前集合在视频/图片页面下)[x]
* 视频页面[x]
* 图片页面[x]
* 关于网站[ ]
## 交流/参与项目
欢迎提交Issue或者B站私信：https://space.bilibili.com/291072226
* 后端技术栈:django+celery
* src结构
  - router - 路由
  - util/http.js - 后端Api
  - util/general.js - 常用函数
  - views/account - 用户相关页面
  - views/components - 组件
  - views/MainPage.vue - 主页
  - views/Video.vue - 视频
  - views/Pic.vue - 图片
  - views/Article.vue - 专栏
  - views/Submit.vue - 提交作品

## 相关项目
[枝网查重](https://github.com/ASoulCnki)  
[A-Soul-Database](https://github.com/peterpei1186861238/A-Soul-Database)


### 运行
```
npm run serve
```

### 打包
```
npm run build
```

### 配置参考
See [Configuration Reference](https://cli.vuejs.org/config/).
