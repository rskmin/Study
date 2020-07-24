// 文章路由
const Router = require('@koa/router')
const ArticleController = require('../controller/article')

const router = new Router({
  prefix: '/article'
})

router.get('/add', ArticleController.add)

router.get('/remove', ArticleController.remove)

router.post('/upload', ArticleController.upload)

module.exports = router