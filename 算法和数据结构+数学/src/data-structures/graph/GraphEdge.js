const GraphVertex = require("./GraphVertex");

/**
 * 图边比较方法
 * @param {GraphEdge} edgeA 边A
 * @param {GraphEdge} edgeB 边B
 */
const edgeComparator = (edgeA, edgeB) => {
  if (edgeA.getKey() === edgeB.getKey()) return 0;
  return edgeA.getKey() < edgeB.getKey() ? -1 : 1;
};

/**
 * 图的边
 */
class GraphEdge {
  /**
   * @param {GraphVertex} startVertex 起始点
   * @param {GraphVertex} endVertex 结束点
   * @param {number} [weight] 权重
   */
  constructor(startVertex, endVertex, weight = 0) {
    this.startVertex = startVertex;
    this.endVertex = endVertex;
    this.weight = weight;
  }
  /**
   * 获得该边两个顶点数据 A_B
   * @returns {string}
   */
  getKey() {
    const startVertexKey = this.startVertex.getKey();
    const endVertexKey = this.endVertex.getKey();
    return `${startVertexKey}_${endVertexKey}`;
  }
  /**
   * 反转顶点
   * @returns {GraphEdge}
   */
  reverse() {
    const tmp = this.startVertex;
    this.startVertex = this.endVertex;
    this.endVertex = tmp;
    return this;
  }
  /**
   * @returns {string}
   */
  toString() {
    return this.getKey();
  }
}

module.exports = GraphEdge;
module.exports.edgeComparator = edgeComparator;