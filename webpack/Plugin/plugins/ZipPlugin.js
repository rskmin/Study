/**
 * 功能：将所有打包产出的文件压缩到一个压缩包里，供上线或者发给别人
 * 1. 知道本次编译产出哪些文件，以及这些文件的内容是什么？
 * 2. 生成一个新的文件，并且添加到输出列表里，以便也写入dist目录
 */

const { RawSource } = require('webpack-sources');
const JSZip = require('jszip');
class ZipPlugin {
  constructor(options) {
    this.options = options;
  }
  apply(compiler) {
    // emit 钩子会在生成资源到 output 目录之前触发，它是修改输出文件最后的机会
    compiler.hooks.emit.tapAsync('ZipPlugin', (compilation, callback) => {
      // compilation.assets 是一个对象，key是文件名，值是源代码
      const zip = new JSZip(); // 创建一个压缩包
      for (let filename in compilation.assets) {
        const source = compilation.assets[filename].source(); // 调用 source 方法可以获得源代码
        // 向压缩包内添加一个文件
        zip.file(filename, source);
      }
      // 生成压缩包
      zip.generateAsync({ type: 'nodebuffer' }).then(content => {
        // 把压缩包添加到输出列表里
        compilation.assets[this.options.filename || 'assets.zip'] = new RawSource(content);
        /* compilation.assets['assets.zip'] = {
          source() {
            return content;
          }
        }; */
        callback();
      });
    });
  }
}

module.exports = ZipPlugin;