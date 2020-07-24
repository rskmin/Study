// 合并路由

let articleRouter = require('./article')
let userRouter = require('./user')
let combineRoutes = require('koa-combine-routers')

module.exports = combineRoutes([articleRouter, userRouter])