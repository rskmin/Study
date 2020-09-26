/**
 * 多条件过滤
 * @param {Array} arr 
 * @param  {Array<Function>} functions 
 */
export function filterWith(arr, ...functions) {
  let funcLen = functions.length;
  return arr.filter((item, index, _arr) => {
    for (let i = 0; i < funcLen; i++) {
      if (functions[i](item, index, _arr)) {
        continue;
      } else {
        return false;
      }
    }
    return true;
  });
}