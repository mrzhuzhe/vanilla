var { Vertex, Edge, subMark, Matrix, buildRow } = require('./Graph2Matrix.js');

var _floydWarshall = (m) => {
  var _subMark = m.subMark;
  var _len = m.Matrix.length;
  var _distinct = m.Matrix;
  var _INF = 999;
  var _pre = buildRow(buildRow(_INF, _len), _len);

  for (i = 0; i < _len; i++) {
      for (j = 0; j < _len; j++) {
          if(i == j || _distinct[i][j] == _INF) _pre[i][j] = _INF;
          else _pre[i][j] = i;
      }
  }
  //console.log("first pre", _pre);

  for ( var k = 0; k < _len; k++ ) {
    for ( var i = 0; i< _len; i++ ) {
      for ( var j = 0; j < _len; j++ ) {
        if (+_distinct[i][k] + +_distinct[k][j] < +_distinct[i][j] ) {
          _distinct[i][j] = +_distinct[i][k] + +_distinct[k][j];
          _pre[i][j] = _pre[k][j];
        }
      }
    }
    console.log("every pre " + k, _pre);
  }
  //  console.log("final pre", _pre);
  return {
    subMark: _subMark,
    distinct: _distinct,
    pre: _pre
  }
}
console.log("floydWarshall", _floydWarshall({ subMark, Matrix }));
