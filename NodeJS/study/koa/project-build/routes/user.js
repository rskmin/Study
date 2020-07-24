// 用户路由
const Router = require('@koa/router')
const UserController = require('../controller/user')

const router = new Router({
  prefix: '/user'
})

router.get('/add', UserController.add)

router.get('/remove', UserController.remove)

module.exports = router