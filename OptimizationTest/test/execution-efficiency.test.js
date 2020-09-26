const chai = require('chai');

describe('JSCodeOptimize', function () {
  it('JS对比字符串速度和对比对象速度比较', function () {
    const time = 1;
    
    let a = 'NOT_LOADED';
    let b = 'LOADED';
    console.time('string');
    for (let i = 0; i < time; i++) {
      a === b;
    }
    console.timeEnd('string');
    let A = {
      status: 'NOT_LOADED',
    };
    let B = {
      status: 'LOADED',
    };

    console.time('object');
    for (let i = 0; i < time; i++) {
      A === B;
    }
    console.timeEnd('object');
  });

});