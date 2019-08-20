var {
  Vertex,
  Edge,
  Adj
} = require('./undirect-adjList.js');
var {
  MAKE_HEAP,
  EXTRACT_MIN,
  INSERT,
  FIB_HEAP_DECREASE_KEY
} = require('../mergeable-heap/fibonacciHeap.js');

var _prime = ({
  Vertex,
  Edge,
  Adj
}, s) => {
  var H = MAKE_HEAP();
  var _r = [];
  //  所有节点默认设置成最大
  Vertex.forEach(e => {
    e.key = 999;
    INSERT(H, e);
  })
  //  第一个元素松弛
  FIB_HEAP_DECREASE_KEY(H, H.root[0], 0);
  //  vertex 拿空
  while (H.root.length) {
    var _min = EXTRACT_MIN(H);
    Adj[_min.n].forEach(e => {
      //  把当前元素的相临元素做松弛
      var _cur = H.hash[e.neighbour];
      if ( !!_cur && e.path.w < _cur.key ) {
        FIB_HEAP_DECREASE_KEY(H, _cur, e.path.w);
        _cur.prev = _min;
      }
    })
    _r.push({
      n: _min.n,
      prev: _min.prev ? _min.prev.n : null,
      w: _min.key
    })
  }
  return _r
}
//  第一个
console.info("prime", _prime({
  Vertex,
  Edge,
  Adj
}, Vertex[0]));
