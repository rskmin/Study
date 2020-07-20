/* eslint-disable no-undefined */
module.exports = { // this -> ctx.response
  _body: undefined,
  get body() {
    return this._body
  },
  set body(body) {
    this._body = body
    this.res.statusCode = 200
  }
}