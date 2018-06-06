// dev server，定义反向代理
const devServer = {
  hot: true,
  historyApiFallback: true,
  disableHostCheck: true,
  host: '0.0.0.0',
  port: 8080,
  compress: true,
  stats: {
    colors: true
  },
  headers: { 'X-My-Header': '^_^' }, //自定义返回头
  proxy: {
    '/qfang-agent-api/cameraman/survey/*': {
      changeOrigin: true,

      target: 'http://172.16.72.130:8090'
      // target: 'http://192.168.0.130'
      // target: 'http://192.168.0.41'

      // target: 'http://172.16.6.249:3000',
      // pathRewrite: { // 根据实际情况配置是否需要重写 url
      //   '^/qfang-agent-api/cameraman/survey': ''
      // }
    },

    '/qfang-agent-api/api/mobile/*': {
      target: 'http://192.168.0.46/',
      changeOrigin: true
    }
  }
};

module.exports = devServer;
