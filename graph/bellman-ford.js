var {
  Vertex,
  Edge,
  Adj
} = require('./direct-adjList.js');

var _BellmanFord = ( Vertex, Edge, source ) => {
  //  两个hash 避免指针问题
  var distance = {};
  var predecessor = {};
  Vertex.forEach(e => {
    distance[e.n] = 999;
  })
  distance[source.n] = 0;
  for ( var i = 0; i < Vertex.length - 1;i++ ) {
    Edge.forEach(e => {
      if ( distance[e.s] + e.w < distance[e.e] ) {
        distance[e.e] = distance[e.s] + e.w;
        predecessor[e.e] = e.s;
      }
    })
  }
  for (var i = 0; i < Edge.length; i++ ) {
    var e = Edge[i];
    if (distance[e.s] + e.w < distance[e.e]){
        throw new Error("Graph contains a negative-weight cycle");
        break;
    }
  }
  return {
    distance,
    predecessor
  }
}

console.log("BellmanFord", _BellmanFord(Vertex, Edge, Vertex[0]));

module.exports = {
  BellmanFord: _BellmanFord
};
