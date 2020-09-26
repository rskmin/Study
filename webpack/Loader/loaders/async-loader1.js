function loader(source) {
  let callback = this.async();
  setTimeout(() => {
    return callback(null, source+'//async1');
  }, 3000);
};

loader.pitch = function (remainingRequest, previousRequest, data) {
  let asyncCallback = this.async();
  console.log('async-loader1-pitch');
  asyncCallback(null);
};
module.exports = loader;