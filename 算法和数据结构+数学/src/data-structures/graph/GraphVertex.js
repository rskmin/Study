const LinkedList = require('../linked-list/LinkedList');
const LinkedListNode = require('../linked-list/LinkedListNode');
const GraphEdge = require('./GraphEdge');
const { edgeComparator } = require('./GraphEdge');

/**
 * 图顶点
 */
class GraphVertex {
  /**
   * @param {*} value 顶点值
   */
  constructor(value) {
    if (value === undefined) {
      throw new Error('Graph vertex must have a value');
    }

    this.value = value;
    /** @var 节点的边 */
    this.edges = new LinkedList(edgeComparator);
  }
  /**
   * 添加节点边
   * @param {GraphEdge} edge 节点的边
   * @returns {GraphVertex}
   */
  addEdge(edge) {
    this.edges.append(edge);
    return this;
  }
  /**
   * 删除指定边
   * @param {GraphEdge} edge 指定边
   */
  deleteEdge(edge) {
    this.edges.delete(edge);
  }
  /**
   * 获得该节点所有相邻的节点
   * @returns {GraphVertex[]}
   */
  getNeighbors() {
    const edges = this.edges.toArray();
    /** @param {LinkedListNode} node */
    const neighborsConverter = (node) => node.value.startVertex === this ? node.value.endVertex : node.value.startVertex;
    return edges.map(neighborsConverter);
  }
  /**
   * 获取该顶点所有的边
   * @returns {GraphEdge[]}
   */
  getEdges() {
    return this.edges.toArray().map(LinkedListNode => LinkedListNode.value);
  }
  /**
   * 获取边数
   * @returns {number}
   */
  getDegree() {
    return this.edges.toArray().length;
  }
  /**
   * 查找是否有指定边
   * @param {GraphEdge} requiredEdge 指定边
   * @returns {boolean}
   */
  hasEdge(requiredEdge) {
    const edgeNode = this.edges.find({
      callback: (edge) => edge === requiredEdge,
    });
    return !!edgeNode;
  }
  /**
   * 判断指定顶点是否是该顶点的相邻顶点
   * @param {GraphVertex} vertex 指定顶点
   * @returns {boolean}
   */
  hasNeighbor(vertex) {
    const vertexNode = this.edges.find({
      callback: (edge) => edge.startVertex === vertex || edge.endVertex === vertex,
    })
    return !!vertexNode;
  }
  /**
   * 查找该顶点与指定顶点的边
   * @param {GraphVertex} vertex 指定顶点
   * @returns {GraphEdge|null}
   */
  findEdge(vertex) {
    const edgeFinder = (edge) => {
      return edge.startVertex === vertex || edge.endVertex === vertex;
    }
    const edgeNode = this.edges.find({ callback: edgeFinder });
    return edgeNode ? edgeNode.value : null;
  }
  /**
   * 获取顶点值
   * @returns {string}
   */
  getKey() {
    return this.value;
  }
  /**
   * 删除所有边
   * @returns {GraphVertex}
   */
  deleteAllEdges() {
    this.getEdges().forEach(edge => this.deleteEdge(edge));
    return this;
  }
  toString(callback) {
    return callback ? callback(this.value) : `${this.value}`;
  }
}

module.exports = GraphVertex;