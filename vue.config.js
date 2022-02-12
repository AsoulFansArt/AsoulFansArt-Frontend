
module.exports = {

  configureWebpack: {
    devtool: 'source-map'
  },
  // 公共路径(必须有的)
  publicPath: "/",
  // 输出文件目录
  outputDir: "dist",
  // 静态资源存放的文件夹(相对于ouputDir)
  assetsDir: "public",
  // eslint-loader 是否在保存的时候检查(果断不用，这玩意儿我都没装)
  lintOnSave:false,
  // 我用的only，打包后小些
  runtimeCompiler: false,
  productionSourceMap: true, // 不需要生产环境的设置false可以减小dist文件大小，加速构建
  devServer: {
    open: true,  // npm run serve后自动打开页面
    host: '0.0.0.0',  // 匹配本机IP地址(默认是0.0.0.0)
    port: 9000, // 开发服务器运行端口号
    disableHostCheck: true,
    proxy: {  //配置跨域
      '/api': {
        target: 'http://124.223.8.236:5200/',  //这里后台的地址模拟的;应该填写你们真实的后台接口
        changOrigin: true,  //允许跨域
        pathRewrite: {
          /* 重写路径，当我们在浏览器中看到请求的地址为：http://localhost:8080/api/core/getData/userInfo 时
            实际上访问的地址是：http://121.121.67.254:8185/core/getData/userInfo,因为重写了 /api
           */
          '^/api': ''
        }
      },
    }
  },
  pwa: {
    workboxPluginMode: 'GenerateSW', // 也可以定义为‘InjectManifest’模式。但是需自己写SW.js文件进行配置
    workboxOptions: {
      importWorkboxFrom: 'cdn', //从''cdn"导入workbox,也可以‘local’
      skipWaiting: true, // 安装完SW不等待直接接管网站
      clientsClaim: true,
      navigateFallback: '/index.html',
      exclude: [/\.(?:png|jpg|jpeg|svg)$/], //在预缓存中排除图片
      // 定义运行时缓存
      runtimeCaching: [
        {
          urlPattern: new RegExp('^https://cdn'),
          handler: 'NetworkFirst',
          options: {
            networkTimeoutSeconds: 20,
            cacheName: 'cdn-cache',
            cacheableResponse: {
              statuses: [200]
            }
          }
        }
      ]
    }
  }

}
