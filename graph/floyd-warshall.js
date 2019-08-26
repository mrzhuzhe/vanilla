var { Vertex, Edge, subMark, Matrix } = require('./Graph2Matrix.js');

var _floydWarshall = (m) => {
  var _subMark = m.subMark;
  var _len = m.Matrix.length;
  var _distinct = m.Matrix;
  for ( var k = 0; k < _len; k++ ) {
    for ( var i = 0; i< _len; i++ ) {
      for ( var j = 0; j < _len; j++ ) {
        if (+_distinct[i][k] + +_distinct[k][j] < +_distinct[i][j] ) {
          _distinct[i][j] = +_distinct[i][k] + +_distinct[k][j];
        }
      }
    }
  }
  return {
    subMark: _subMark,
    distinct: _distinct
  }
}
console.log("floydWarshall", _floydWarshall({ subMark, Matrix }));
