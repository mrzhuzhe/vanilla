/*
FORD-FULKERSON（G，t，s）

for each edge(u,v) 属于 E（G）
   do f[u,v]=0
         f[v,u]=0
while there exists a path p from s to t in the residual network Gf
// 根据最大流最小切割定理，当不再有增广路径时，流 f 就是最大流
      do cf(p)=min{cf(u,v):(u,v)is in p}
      // cf(p)为该路径的残余容量
       for each edge (u,v) in p
                     do f[u,v]=f[u,v]+cf(p)  //为该路径中的每条边中注入刚才找到到的残余容量
                 f[v,u]=-f[u,v]   //反向边注入反向流量
*/
 var {
   Vertex,
   Edge,
   Adj
 } = require('./graph-example/adj-list.js');

var graph_bfs = (vertex, adj, t, s, edgeHash) => {
  var _vertexHash = {};
  //  每次进来切断原型
  Vertex.forEach(e => {
    _vertexHash[e.n] = {
      n: e.n
    }
  })

  // 根节点先入队列
  let _queue = [_vertexHash[s]];
  //  let _res = [];
  let _addChild = (node, adj) => {
    if (!adj[node.n]) return
    adj[node.n].forEach(e => {
      var _neighbour = _vertexHash[e.neighbour];
      var _edge = edgeHash[node.n + "-" + _neighbour.n];
      /*
       如果没访问过
       && 流量未饱和
       加到队列前端
       */
      if (!_neighbour.hasDetected && _edge.f < _edge.w ) {
        _neighbour.p = node.n;
        //  _neighbour.pw = e.path.w;
        _neighbour.pw = _edge.w - _edge.f;
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
    //  throw new Error("no path");
    return {
      success: false
    }
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
    _min,
    success: true
  }
}

var FORD_FULKERSON = (Vertex, Edge, Adj, t, s) => {
  var _edgeHash = {};
  Edge.forEach(e => {
    _edgeHash[e.s + "-" + e.e] = {
      w: e.w,
      f: 0
    };
    _edgeHash[e.e + "-" + e.s] = {
      w: e.w,
      f: 0
    };
  })
  var _Gfpath = graph_bfs(Vertex, Adj, "f", "a", _edgeHash);
  while (_Gfpath.success) {
    _Gfpath._path.forEach(e => {
      // 残存容量
      var _cfp = _Gfpath._min;
      _edgeHash[e.p + "-" + e.n].f += _cfp;
      //  反向边注入反向流量 ？？？ TODO 这一步是不是可以不要
      _edgeHash[e.n + "-" + e.p].f = -_edgeHash[e.p + "-" + e.n].f;
    })
    _Gfpath = graph_bfs(Vertex, Adj, "f", "a", _edgeHash);
  }
  return _edgeHash
}

console.log("FORD_FULKERSON", FORD_FULKERSON(Vertex, Edge, Adj, "f", "a"));
