const koa = require('koa')
const server = require('koa-static')
const { historyApiFallback } = require('koa2-connect-history-api-fallback')
const proxy = require('koa2-proxy-middleware')

const app = new koa()
app.use(historyApiFallback({
  whiteList: ['/prod-api']
}))
app.use(proxy({
  targets: {
    '/prod-api/(.*)': {
     target: 'http://ihrm.itheima.net/api',
    //  target: 'http://192.168.21.74:3000/api',
      changeOrigin: true,
      pathRewrite: {
        'prod-api': ''
      }
    }
  }
}))
app.use(server(__dirname + '/public'))

app.listen(3131, function() {
  console.log('人力资源项目已启动，地址:http://127.0.0.1:3131')
})