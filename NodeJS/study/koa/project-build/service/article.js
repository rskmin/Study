class ArticleServices {
  async getList() {
    // 调用数据库
    return [1, 2, 3, 4, 5]
  }
}

module.exports = new ArticleServices()