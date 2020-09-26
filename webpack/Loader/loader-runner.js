const fs = require('fs');
const path = require('path');
const readFile = fs.readFile.bind(fs);
const PATH_QUERY_FRAGMENT_REGEXP = /^([^?#]*)(\?[^#]*)?(#.*)?$/;

/**
 * 解析资源路径
 * @param {string} resource - 要加载的资源的绝对路径
 */
function parsePathQueryFragment(resource) {
  const result = PATH_QUERY_FRAGMENT_REGEXP.exec(resource);
  return {
    path: result[1],
    query: result[2],
    fragment: result[3],
  };
};

/**
 * 加载loader
 * @param {loaderObject} loaderObject 
 */
function loadLoader(loaderObject) {
  let normal = require(loaderObject.path);
  loaderObject.normal = normal;
  loaderObject.pitch = normal.pitch;
  loaderObject.raw = normal.raw;
};

function convertArgs(args, raw) {
  if (raw && !Buffer.isBuffer(args[0])) {
    args[0] = Buffer.from(args[0], 'utf-8');
  } else if (!raw && Buffer.isBuffer(args[0])) {
    args[0] = args[0].toString('utf-8');
  }
}

/**
 * @typedef {Object} loaderObject
 * @property {string} path - 当前loader的绝对路径
 * @property {string} query - 当前loader的查询参数
 * @property {string} fragment - 当前loader的片段
 * @property {Function | null} normal - 当前loader的normal函数, 导入的 loader 函数
 * @property {Function | null} pitch - 当前loader的pitch函数
 * @property {boolean} raw - 是否是Buffer
 * @property {Object} data - 自定义对象
 * @property {boolean} [pitchExecuted=false] - 当前loader的pitch函数已经执行过了不需要再执行了
 * @property {boolean} [normalExecuted=false] - 当前loader的normal函数已经执行过了不需要再执行了
 */

/**
 * 构造loader对象
 * @param {string} loader - loader的绝对路径
 */
function createLoaderObject(loader) {
  /**
   * @type {loaderObject}
   */
  const obj = {
    path: '',
    query: '',
    fragment: '',
    normal: null,
    pitch: null,
    raw: null,
    data: {},
    pitchExecuted: false,
    normalExecuted: false,
  };
  Object.defineProperty(obj, 'request', {
    get() {
      return obj.path + obj.query + obj.fragment;
    },
    set(value) {
      let splittedRequest = parsePathQueryFragment(value);
      obj.path = splittedRequest.path;
      obj.query = splittedRequest.query;
      obj.fragment = splittedRequest.fragment;
    },
  });
  obj.request = loader;
  return obj;
};

/**
 * 读取资源
 * @param {Object} options 
 * @param {loaderContext} loaderContext
 * @param {Function} callback - 回调函数
 */
function processResource(options, loaderContext, callback) {
  // 重置loaderIndex
  loaderContext.loaderIndex = loaderContext.loaders.length - 1;
  let resourcePath = loaderContext.resourcePath;
  // 调用文件读取方法 (用户传入方法 ｜ fs.readFile) 读取资源内容
  options.readResource(resourcePath, function (err, buffer) {
    if (err) return callback(error);
    options.resourceBuffer = buffer; // 资源的原始内容
    iterateNormalLoaders(options, loaderContext, [buffer], callback);
  });
}

/**
 * 迭代执行loader normal(loader本体)
 * @param {Object} options 
 * @param {loaderContext} loaderContext 
 * @param {Array} args 
 * @param {Function} callback 
 */
function iterateNormalLoaders(options, loaderContext, args, callback) {
  if (loaderContext.loaderIndex < 0) { // 正常的normal loader 全部执行完
    return callback(null, args);
  }
  let currentLoaderObject = loaderContext.loaders[loaderContext.loaderIndex];
  // 如果normal已经执行过了，让索引减少 1
  if (currentLoaderObject.normalExecuted) {
    loaderContext.loaderIndex--;
    return iterateNormalLoaders(options, loaderContext, args, callback);
  }
  let normalFn = currentLoaderObject.normal;
  currentLoaderObject.normalExecuted = true;
  convertArgs(args, loaderContext.raw);
  runSyncOrAsync(normalFn, loaderContext, args, function (err) {
    if (err) return callback(err);
    let args = Array.prototype.slice.call(arguments, 1);
    iterateNormalLoaders(options, loaderContext, args, callback);
  })
}

/**
 * 迭代加载loader并执行loader pitch
 * @param {Object} options 
 * @param {loaderContext} loaderContext
 * @param {Function} callback - 回调函数
 */
function iteratePitchingLoaders(options, loaderContext, callback) {
  if (loaderContext.loaderIndex >= loaderContext.loaders.length) { // 如果索引越界则说明pitch执行完了
    return processResource(options, loaderContext, callback);
  }
  // 获取当前的 loader
  let currentLoaderObject = loaderContext.loaders[loaderContext.loaderIndex];
  if (currentLoaderObject.pitchExecuted) {
    loaderContext.loaderIndex++;
    return iteratePitchingLoaders(options, loaderContext, callback);
  }
  loadLoader(currentLoaderObject);
  let pitchFunction = currentLoaderObject.pitch;
  currentLoaderObject.pitchExecuted = true;
  if (!pitchFunction) {
    return iteratePitchingLoaders(options, loaderContext, callback);
  }
  runSyncOrAsync(
    pitchFunction,
    loaderContext,
    [loaderContext.remainingRequest, loaderContext.previousRequest, loaderContext.data = {}],
    function (err, args) {
      if (args) { // 如果args有值，说明pitch有返回值
        loaderContext.loaderIndex--;
        iterateNormalLoaders(options, loaderContext, [args], callback);
      } else { // 如果没有返回值，则执行下一个loader的pitch函数
        iteratePitchingLoaders(options, loaderContext, callback);
      }
    }
  );
};

/**
 * 
 * @param {Function} fn - pitch
 * @param {loaderContext} context 
 * @param {Object} args 
 * @param {string} args.remainingRequest
 * @param {string} args.previousRequest
 * @param {Object} args.data
 * @param {Function} callback 
 */
function runSyncOrAsync(fn, context, args, callback) {
  let isSync = true;
  let isDone = false;
  // 调用context.async(this.async) 方法就可以把同步转异步，表示loader里的代码是异步的
  context.async = function () {
    isSync = false;
    return innerCallback;
  }
  const innerCallback = context.callback = function () {
    isDone = true; // 表示当前函数已经完成
    isSync = false; // 改为异步
    callback.apply(null, arguments);
  }
  let result = fn.apply(context, args);
  if (isSync) {
    isDone = true;
    return callback(null, result);
  }
}

/**
 * @typedef {Object} loaderContext - loader上下文
 * @property {string} loaderContext.context - 资源所在目录
 * @property {number} loaderContext.loaderIndex - 当前loader索引
 * @property {Array<loaderObject>} loaderContext.loaders - 需要调用的loader的数组
 * @property {string} loaderContext.resourcePath - 文件路径
 * @property {string} loaderContext.resourceQuery - 查询参数
 * @property {string} loaderContext.resourceFragment - 片段
 * @property {Function | null} loaderContext.async - 一个方法，可以让loader的执行从同步改成异步
 * @property {Function | null} loaderContext.callback - 调用下一个loader
 * @property {string} loaderContext.resource - 文件完整路径
 * @property {string} loaderContext.request - 所有的 loader + resource
 * @property {string} loaderContext.remainingRequest - 从当前的下一个 loader + resource
 * @property {string} loaderContext.currentRequest - 从当前的 loader + resource
 * @property {string} loaderContext.previousRequest - 之前的 loader
 * @property {Object | string} loaderContext.query - 当前 loader 的 query
 * @property {Object} loaderContext.data - 当前 loader 的 data
 */

/**
 * Loaders执行器
 * @param {Object} options - 配置参数
 * @param {Function} callback - 回调
 */
exports.runLoaders = function (options, callback) {
  const resource = options.resource || '';
  // loader 的绝对路径的数组
  let loaders = options.loaders || [];
  // loader 执行时的上下文对象
  const loaderContext = {};
  const readResource = options.readResource || readFile;
  const splittedResource = parsePathQueryFragment(resource);
  const resourcePath = splittedResource.path; // 文件路径
  const resourceQuery = splittedResource.query; // 查询参数
  const resourceFragment = splittedResource.fragment; // 片段
  const contextDirectory = path.dirname(resourcePath); // 此文件所在的上下文目录
  // 准备loader对象
  loaders = loaders.map(createLoaderObject);
  loaderContext.context = contextDirectory;
  loaderContext.loaderIndex = 0; // 当前的 loader的索引
  loaderContext.loaders = loaders;
  loaderContext.resourcePath = resourcePath;
  loaderContext.resourceQuery = resourceQuery;
  loaderContext.resourceFragment = resourceFragment;
  loaderContext.async = null; // 是一个方法，可以让loader的执行从同步改成异步
  loaderContext.callback = null; // 调用下一个loader
  Object.defineProperty(loaderContext, 'resource', {
    get() {
      return loaderContext.resourcePath + loaderContext.resourceQuery + loaderContext.resourceFragment;
    },
  });
  Object.defineProperty(loaderContext, 'request', {
    get() {
      return loaderContext.loaders.map(l => l.request).concat(loaderContext.resource).join('!');
    },
  });
  Object.defineProperty(loaderContext, 'remainingRequest', {
    get() {
      return loaderContext.loaders.slice(loaderContext.loaderIndex + 1).concat(loaderContext.resource).join('!');;
    },
  });
  Object.defineProperty(loaderContext, 'currentRequest', {
    get() {
      return loaderContext.loaders.slice(loaderContext.loaderIndex).concat(loaderContext.resource).join('!');;
    },
  });
  Object.defineProperty(loaderContext, 'previousRequest', {
    get() {
      return loaderContext.loaders.slice(0, loaderContext.loaderIndex);
    },
  });
  Object.defineProperty(loaderContext, 'query', {
    get() {
      let loader = loaderContext.loaders[loaderContext.loaderIndex];
      return loader.options || loader.query;
    },
  });
  Object.defineProperty(loaderContext, 'data', {
    get() {
      let loader = loaderContext.loaders[loaderContext.loaderIndex];
      return loader.data;
    },
  });
  let processOptions = {
    resourceBuffer: null, // loader 执行的 Buffer 结果
    readResource,
  };
  iteratePitchingLoaders(processOptions, loaderContext, function (err, result) {
    if (err) {
      return callback(err, {});
    }
    callback(null, {
      result,
      resourceBuffer: processOptions.resourceBuffer,
    });
  });
};