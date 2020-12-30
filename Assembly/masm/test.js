/**
 * floyd 求最短路径
 * @param {number[][]} map 
 */
function floyd(map) {
  for (let k = 0; k < map.length; k++) {
    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map.length; j++) {
        map[i][j] = Math.min(map[i][j], map[i][k] + map[k][j]);
      }
    }
  }
  return map;
}

const map = [
  [0, 2, Infinity, 1, 8],
  [6, 0, 3, 2, Infinity],
  [Infinity, Infinity, 0, 4, Infinity],
  [Infinity, Infinity, 2, 0, 3],
  [3, Infinity, Infinity, Infinity, 0]
];

console.log(floyd(map));