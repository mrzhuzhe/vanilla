var graph = require('./undirect-weighted-graph.js');
var connectedComponent = require('./connected-component.js')
//  查在哪个集合
var _findSet = connectedComponent.FINDSET;
//  连接两个集合
var _union = connectedComponent.UNION;

// 此时可采用按位排序，但是此时重点不在此
graph.Edge.sort((a, b) => {
  return a.w - b.w
})
//  console.log("sorted-edge", graph.Edge);

//  转化一下 方便 union TODO 查一下有没有更好的办法
var _EdgeSet = graph.Vertex.map(e => [e.n]);
//  实际操作
var miniTree = [];
graph.Edge.forEach(e => {
  var _us = _findSet(_EdgeSet, e.s);
  var _vs = _findSet(_EdgeSet, e.e);
  if (_us !== _vs) {
      miniTree.push(e);
      _EdgeSet = _union(_EdgeSet, _us, _vs);
  }
})
console.log("minimumSpanTree", miniTree);
