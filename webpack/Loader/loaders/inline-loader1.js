function loader(source) {
  console.log("loader -> inline-loader1");
  return source+'//inline-loader1';
};
loader.pitch = function () {
  console.log('inline-pitch1');
};
module.exports = loader;