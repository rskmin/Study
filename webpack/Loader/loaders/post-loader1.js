function loader(source) {
  console.log("loader -> post-loader1");
  return source+'//post-loader1';
};
loader.pitch = function () {
  console.log('post-pitch1');
};
module.exports = loader;