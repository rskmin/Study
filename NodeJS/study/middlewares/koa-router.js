const layers = []

class Router {
  constructor() {

  }
  get(path, middleware) {
    layers.push({
      path,
      method: 'GET',
      middleware
    })
  }
  compose(middlewares, ctx, next) {
    function dispatch(i) {
      if (i === middlewares.length) return next()
      let middleware = middlewares[i]
      return Promise.resolve(middleware(ctx, () => dispatch(i + 1)))
    }
    return dispatch(0)
  }
  routes() {
    return async (ctx, next) => {
      let matchRoutes = layers.filter(layer => ctx.method === layer.method && ctx.path === layer.path)
      this.compose(matchRoutes.map(layer => layer.middleware), ctx, next)
    }
  }
}

module.exports = Router