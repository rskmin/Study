class Context {
  next = 0
  done = false
  stop() {
    this.done = true;
  }
}

exports.mark = function (generator) {
  return generator;
}

exports.wrap = function (innerFun, marked) {
  let context = new Context();
  let iterator = Object.create(marked.prototype);
  iterator.next = function (sent) {
    context.sent = sent;
    let value = innerFun(context);
    return { value, done: context.done }
  }
  return iterator;
}