/*
 用临接链表表示图
 */
var { Vertex, Edge } = require('./graph-example.js');

//  转化为临接链表
var Adj = {};
Vertex.forEach(e => {
  Adj[e.n] = [];
})
//  存一下临近的点和边
Edge.forEach(e => {
  Adj[e.s].push({ neighbour: e.e, path: e })
})

module.exports = {
  Vertex,
  Edge,
  Adj
};
