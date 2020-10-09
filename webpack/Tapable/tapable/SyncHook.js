let Hook = require('./Hook.js');
let HookCodeFactory = require('./HookCodeFactory.js');
let factory = new HookCodeFactory();

class SyncHook extends Hook {
  compile(options) {
    factory.setup(this, options);
    return factory.create(options);
  }
}

module.exports = SyncHook;