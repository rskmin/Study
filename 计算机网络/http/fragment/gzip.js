const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

/**
 * 压缩
 * @param {string} src 
 */
function gzip(src) {
  fs.createReadStream(src)
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream(`${src}.gz`));
}

/**
 * 解压
 * @param {string} src
 */
function gunzip(src) {
  fs.createReadStream(src)
    .pipe(zlib.createGunzip())
    .pipe(fs.createWriteStream(path.join(__dirname, path.basename(src, '.gz'))));
}

gunzip(path.join(__dirname, 'msg.txt.gz'));

// gzip(path.join(__dirname, 'msg.txt'));