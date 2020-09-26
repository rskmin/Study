function loader(source) {
  let callback = this.async();
  setTimeout(() => {
    return callback(null, source+'//async2');
  }, 3000);
};

loader.pitch = function (remainingRequest, previousRequest, data) {
  console.log('async-loader2-pitch');
  return 'back';
};
module.exports = loader;