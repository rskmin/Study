/**
 * 部分选主元法 - 寻找第 pivotRow 列系数的绝对值最大的行，作为第 pivotRow 次修改的基点
 * @param {number} pivotRow - 当前变换的行
 * @param {Array<Array<number>>} A - [n][n+1]矩阵
 */
function partialPivoting(pivotRow, A) {
  const n = A.length;
  let _pivotRow = pivotRow;
  for (let j = pivotRow + 1; j < n; j++) {
    Math.abs(A[j][pivotRow]) > Math.abs(A[_pivotRow][pivotRow]) && (_pivotRow = j);
  }
  for (let k = pivotRow; k <= n; k++) {
    [A[_pivotRow][k], A[pivotRow][k]] = [A[pivotRow][k], A[_pivotRow][k]];
  }
}

/**
 * 前向消去 - 矩阵初等变换
 * @param {Array<Array<number>>} A - [n][n+1]矩阵
 */
function forwardElimination(A) {
  const n = A.length;
  // 初等变换
  for (let i = 0; i < n - 1; i++) {
    partialPivoting(i, A);
    for (let j = i + 1; j < n; j++) {
      const temp = A[j][i] / A[i][i];
      for (let k = n; k >= i; k--) {
        A[j][k] -= A[i][k] * temp;
      }
    }
  }
}

/**
 * 反向替换
 * @param {Array<Array<number>>} A - [n][n+1]矩阵
 * @returns {Array<number>} res - 最终解
 */
function backSubstitution(A) {
  const n = A.length;
  const res = Array(n);
  for (let i = n - 1; i >= 0; i--) {
    for (let j = i + 1; j < n; j++) {
      A[i][n] -= res[j] * A[i][j];
    }
    res[i] = A[i][n] / A[i][i];
  }
  return res;
}

/**
 * 高斯消元法 - 求解 n 个方程的 n 元连立方程组
 * @param {Array<Array<number>>} A - [n][n+1]矩阵
 * @param {Array<number>} b - 列向量
 * @returns {Array<number>} res - 最终解
 */
function gaussianElimination(A, b) {
  A.forEach((arr, index) => arr.push(b[index])); // 用列向量扩展矩阵
  forwardElimination(A);
  return backSubstitution(A);
}

module.exports = gaussianElimination;