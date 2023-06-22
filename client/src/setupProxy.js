const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    const { createProxyMiddleware } = require('http-proxy-middleware');

    module.exports = function(app) {
      app.use(
        '/api',
        createProxyMiddleware({
          target: 'http://localhost:4000', // 서버 포트
          changeOrigin: true,
        })
      );
    };
};