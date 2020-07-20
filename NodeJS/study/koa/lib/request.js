const url = require('url')

module.exports = { // this -> ctx.request
  get url() {
    return this.req.url
  },
  get query() {
    let { query } = url.parse(this.req.url, true)
    return query
  },
  get path() {
    let { pathname } = url.parse(this.req.url, true)
    return pathname
  }
}

