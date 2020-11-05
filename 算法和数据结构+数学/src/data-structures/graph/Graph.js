const GraphVertex = require('./GraphVertex');
const GraphEdge = require('./GraphEdge');

/**
 * 图
 */
class Graph {
  /**
   * @param {boolean} [isDirected] 是否是有向图
   */
  constructor(isDirected = false) {
    this.vertices = {};
    this.edges = {};
    this.isDirected = isDirected;
  }
  /**
   * 添加顶点
   * @param {GraphVertex} newVertex 新的顶点
   * @returns {Graph}
   */
  addVertex(newVertex) {
    this.vertices[newVertex.getKey()] = newVertex; // 无法存放同样值的顶点
    return this;
  }
  /**
   * 通过key值获取顶点
   * @param {string} vertexKey 顶点key值
   * @returns {GraphVertex}
   */
  getVertexByKey(vertexKey) {
    return this.vertices[vertexKey];
  }
  /**
   * 获得指定顶点相邻的顶点
   * @param {GraphVertex} vertex 指定顶点
   * @returns {GraphVertex[]}
   */
  getNeighbors(vertex) {
    return vertex.getNeighbors();
  }
  /**
   * 获取所有的顶点
   * @returns {GraphVertex[]}
   */
  getAllVertices() {
    return Object.values(this.vertices);
  }
  /**
   * 获取所有的边
   * @returns {GraphEdge[]}
   */
  getAllEdges() {
    return Object.values(this.edges);
  }
  /**
   * 添加边
   * @param {GraphEdge} edge 新的边
   * @returns {Graph}
   */
  addEdge(edge) {
    // 尝试在图中获取该边的两个顶点
    let startVertex = this.getVertexByKey(edge.startVertex.getKey());
    let endVertex = this.getVertexByKey(edge.endVertex.getKey());
    if (!startVertex) {
      this.addVertex(edge.startVertex);
      startVertex = this.getVertexByKey(edge.startVertex.getKey());
    }
    if (!endVertex) {
      this.addVertex(edge.endVertex);
      endVertex = this.getVertexByKey(edge.endVertex.getKey());
    }
    // 检查边是否已经存在
    if (this.edges[edge.getKey()]) {
      throw new Error('Edge has already been added before');
    } else {
      this.edges[edge.getKey()] = edge;
    }
    // 为顶点添加边
    if (this.isDirected) {
      startVertex.addEdge(edge);
    } else {
      startVertex.addEdge(edge);
      endVertex.addEdge(edge);
    }
    return this;
  }
  /**
   * 删除指定边
   * @param {GraphEdge} edge 指定边
   * @returns {Graph}
   */
  deleteEdge(edge) {
    if (this.edges[edge.getKey()]) {
      delete this.edges[edge.getKey()];
    } else {
      throw new Error('Edge not found in graph');
    }
    const startVertex = this.getVertexByKey(edge.startVertex.getDegree());
    const endVertex = this.getVertexByKey(edge.endVertex.getDegree());
    startVertex.deleteEdge(edge);
    endVertex.deleteEdge(edge);
    return this;
  }
  /**
   * 寻找指定边
   * @param {GraphVertex} startVertex 起始顶点
   * @param {GraphVertex} endVertex 结束顶点
   * @returns {GraphEdge|null}
   */
  findEdge(startVertex, endVertex) {
    const vertex = this.getVertexByKey(startVertex.getKey());
    if (!vertex) return null;
    return vertex.findEdge(endVertex);
  }
  /**
   * 获取总权重
   * @returns {number}
   */
  getWeight() {
    return this.getAllEdges().reduce((weight, graphEdge) => {
      return weight + graphEdge.weight;
    }, 0);
  }
  /**
   * 反转有向图中所有的边
   * @returns {Graph}
   */
  reverse() {
    this.getAllEdges().forEach(edge => {
      // 从图中删除该边
      this.deleteEdge(edge);
      // 反转边
      edge.reverse();
      // 加入反转过的边
      this.addEdge(edge);
    });
    return this;
  }
  /**
   * 获得所有顶点的索引
   * @returns {Record<string, number>}
   */
  getVerticesIndices() {
    const verticesIndices = {};
    this.getAllVertices().forEach((vertex, index) => {
      verticesIndices[vertex.getKey()] = index;
    });
    return verticesIndices;
  }
  /**
   * 获取邻接矩阵
   * @returns {*[][]}
   */
  getAdjacencyMatrix() {
    const vertices = this.getAllVertices();
    const verticesIndices = this.getVerticesIndices();
    // 初始化矩阵，无穷大意味着不连通
    const adjacencyMatrix = Array(vertices.length).fill(null).map(() => {
      return Array(vertices.length).fill(Infinity);
    });
    vertices.forEach((vertex, vertexIndex) => {
      vertex.getNeighbors().forEach(neighbor => {
        const neighborIndex = verticesIndices[neighbor.getKey()];
        adjacencyMatrix[vertexIndex][neighborIndex] = this.findEdge(vertex, neighbor).weight;
      });
    });
    return adjacencyMatrix;
  }
  /**
   * @returns {string}
   */
  toString() {
    return Object.keys(this.vertices).toString();
  }
}

module.exports = Graph;