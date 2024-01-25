/**
 * 洋葱模型
 * 顺序执行中间件
 */

class Koa {
  middlewares = [];

  use(mid) {
    this.middlewares.push(mid);
  }

  listen(port) {
    http.on('request', ctx => {
      action(this, ctx);
    })
  }
}

function action(koaInstance, ctx) {
  let index = 1;
  function next() {
    const nextMiddleware = middlewares[index]
    if (nextMiddleware) {
      index++;
      return Promise.resolve(nextMiddleware(ctx, next));
    } else {
      return Promise.resolve();
    }
  }

  middlewares[0](ctx, next);
}