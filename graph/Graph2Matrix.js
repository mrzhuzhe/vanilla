/*
 用临接链表表示图

var { Vertex, Edge } = require('./graph-example.js');
 */
var Vertex = [
           { n: "a" },{ n: "b" },{ n: "c" },{ n: "d" },
           { n: "e" },{ n: "f" },{ n: "g" },{ n: "h" },
           { n: "i" },{ n: "j" },{ n: "k" },{ n: "l" }
       ];

var Edge = [
  { s: "a" ,e: "b", w: 1 },
  { s: "a" ,e: "c", w: 1 },
  { s: "a" ,e: "d", w: 2 },
  { s: "b" ,e: "c", w: 2 },
  { s: "b" ,e: "d", w: 2 },
  { s: "b" ,e: "e", w: 2 },
  { s: "i" ,e: "j", w: 3 },
  { s: "g" ,e: "h", w: 3 },
  { s: "b" ,e: "h", w: 3 },
  { s: "i" ,e: "l", w: 3 },
  { s: "d" ,e: "j", w: 1 },
  { s: "e" ,e: "f", w: 1 },
  { s: "c" ,e: "k", w: 1 },
  { s: "l" ,e: "k", w: 1 },
  { s: "g" ,e: "e", w: 1 },
  { s: "f" ,e: "d", w: 1 }
]


var _buildMatrix = (Vertex, Edge) => {
  var _subMark = {};
  var _len = Vertex.length;
  //  初始化矩阵
  var _buildRow = (item, length) => {
    var _res = [];
    for ( var i = 0; i < _len; i++ ) {
      // B 如果是对象 需要深拷贝 不然是指针 循环了n次
      if ( typeof item === "object") {
        //  切断原型
        var another_item = item.concat([]);
        another_item[i] = 0;
      } else {
        var another_item = item;
      }
      _res.push(another_item)
    }
    return _res
  }
  var _res = _buildRow(_buildRow(999, _len), _len);

  Vertex.forEach((e, i) => {
    _subMark[e.n] =  i
  })

  Edge.forEach(e => {
    _res[_subMark[e.s]][_subMark[e.e]] = e.w
  })

  return {
    subMark: _subMark,
    Matrix: _res
  };
}

var _Matrix = _buildMatrix( Vertex, Edge );
console.log("Matrix", _Matrix);

module.exports = {
  Vertex,
  Edge,
  subMark: _Matrix.subMark,
  Matrix: _Matrix.Matrix
};
