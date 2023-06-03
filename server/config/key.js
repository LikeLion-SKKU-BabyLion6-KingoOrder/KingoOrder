// production 모드(deploy 이후)일 경우
if(process.env.NODE_ENV === 'production') {
    // prod.js 에서 module.exports
    module.exports = require('./prod') 
// development 모드일 경우
} else {
    // dev.js에서 module.exports
    module.exports = require('./dev')
}