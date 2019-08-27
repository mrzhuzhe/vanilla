var {
  Vertex,
  Edge,
  Adj
} = require('./graph-example/adj-list.js');

var graph_bfs = (vertex, adj, t, s) => {
  var _vertexHash = {};
  Vertex.forEach(e => {
    _vertexHash[e.n] = e
  })

  // 根节点先入队列
  let _queue = [_vertexHash[s]];
  //  let _res = [];
  let _addChild = (node, adj) => {
    if (!adj[node.n]) return
    adj[node.n].forEach(e => {
      var _neighbour = _vertexHash[e.neighbour];
      // 如果没访问过 加到队列前端
      if (!_neighbour.hasDetected) {
        _neighbour.p = node.n;
        _neighbour.pw = e.path.w;
        _neighbour.hasDetected = true;
        _queue.unshift(_neighbour);
      }
    })
  }
  while (_queue.length && !_vertexHash[t].hasDetected ) {
    let _cur = _queue.pop();
    //  _res.push(_cur);
    //  子元素入队列
    _addChild(_cur, adj);
  }
  if (!_vertexHash[t].hasDetected) {
    throw new Error("no path");
    return
  }
  //  create a path and find min
  var _p = _vertexHash[t].p
  var _path = [_vertexHash[t]];
  var _min = _vertexHash[t].pw;
  while ( _p !== s ) {
    _path.unshift(_vertexHash[_p]);
    _min = _vertexHash[_p].pw < _min ? _vertexHash[_p].pw : _min;
    _p = _vertexHash[_p].p;
  }
  return {
    _path,
    _min
  }
}

console.log("graph_bfs", graph_bfs(Vertex, Adj, "f", "a"));
