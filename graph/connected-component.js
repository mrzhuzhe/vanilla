var Vertex = [['a'], ['b'], ['c'], ['d'], ['e'], ['f'], ['g'], ['h'], ['i'], ['j'], ['k']];
var Edge = [
  ['d', 'i'], ['f', 'k'], ['g', 'i'], ['b', 'g'], ['a', 'h'],
  ['i', 'j'], ['d', 'k'], ['b', 'j'], ['d', 'f'], ['g', 'i'],
  ['a', 'e']
];

//  找元素所在集合 这个不好算 要用摊还算
var _findSet = (vertex, v) => {
  let _res = undefined;
  for (var i = 0; i < vertex.length; i++ ) {
    for (var j = 0; j < vertex[i].length; j++ ) {
      if (v === vertex[i][j]) {
        _res = vertex[i]
        break
      }
    }
    if (_res) {
      break
    }
  }
  return _res
}
//  _findSet(Vertex, 'a')

//  合并两个集合 O(2u + 2v + 1)
var _union = (vertex, us, vs) => {
  var _u = vertex.indexOf(us);
  var _v = vertex.indexOf(vs);
  //  合并第一个 O(u + v)
  vertex[_u] = vertex[_u].concat(vertex[_v]);
  // 删除第二个 O(1)
  vertex.splice(_v, 1);
  return vertex
}

var _connectComponent = (vertex, edge) => {
  edge.forEach(e => {
    var _u = e[0];
    var _v = e[1];
    var _us = _findSet(vertex, _u);
    var _vs = _findSet(vertex, _v);
    if (_us !== _vs) {
      vertex = _union(vertex, _us, _vs);
    }
  })
  return vertex
}

console.log('connected-component', _connectComponent(Vertex, Edge));


module.exports = {
  "FINDSET": _findSet,
  "UNION": _union
};
