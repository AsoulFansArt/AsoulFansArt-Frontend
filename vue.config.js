const CompressionWebpackPlugin = require('compression-webpack-plugin')
const webpack = require("webpack");
const productionGzipExtensions = ['js', 'css']
const isProduction = process.env.NODE_ENV === 'production'
const path = require("path")
function resolve(dir){
  return path.join(__dirname, dir)
}

module.exports = {
  configureWebpack: {
    module:{
      rules:[{
        test:/\.mjs$/,
        include:/node_modules/,
        type:'javascript/auto'
      }]},

    devtool: 'source-map',
    plugins: [
    // Ignore all locale files of moment.js
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    // 配置compression-webpack-plugin压缩
      new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8
      })
    ]
  },
  publicPath: "/",
  outputDir: "dist",
  assetsDir: "public",
  lintOnSave:false,
  runtimeCompiler: false,
  productionSourceMap: false,
  chainWebpack: config => {
    config.resolve.alias
        .set("@", resolve("src"))
        .set("@views", resolve("src/views"))
        .set("@components", resolve("src/views/components"))
        .set("@util", resolve("src/util"))
        .set("@account", resolve("src/views/account"))
        .set("@public", resolve("public"))
  },
  devServer: {
    open: true,
    host: '0.0.0.0',
    port: 9000,
    disableHostCheck: true,
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
