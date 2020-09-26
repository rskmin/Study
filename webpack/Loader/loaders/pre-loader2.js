function loader(source) {
  console.log("loader -> pre-loader2");
  return source+'//pre-loader2';
};
loader.pitch = function () {
  console.log('pre-pitch2');
};
module.exports = loader;