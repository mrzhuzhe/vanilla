// 最基本的矩阵相乘
var _matmul = (a, b) => {
  var c = [];
  for ( var i = 0; i < a.length; i++ ) {
    c.push([])
    for ( var j = 0; j < a[i].length; j++ ){
      c[i].push(0)
      for ( var k = 0; k < b.length; k++ ){
        c[i][j] += a[i][k] * b[k][j]
      }
    }
  }
  return c
};

//  创建一个 n x n 的转移矩阵 step1
// 例如转移矩阵
/* var b = [
[0 ,1 ,0 ,0, 0],
[0 ,0 ,1 ,0, 0],
[0 ,0 ,0 ,1, 0],
[0 ,0 ,0 ,0, 1],
[1 ,0 ,0 ,0, 0]
]; */
var _getToeplitzMatrix = (s) => {
  var i = 0;
  var _res = [];
  while (i < s) {
    _res.push([]);
    var j = 0;
    while (j < s) {
      if ( j === (i + 1) % s ){
        _res[i].push(1);
      } else {
        _res[i].push(0);
      }
      j++;
    }
    i++;
  }
  return _res
}

//  给原始矩阵做增补 左右补 0 加长 跟转移矩阵长度相等
var _inpPadding = (originMatrix, paddingSize) => {
  //  var n = originMatrix.length;
  var m = originMatrix[0].length;
  //  左右补 0
  if (m < paddingSize){
    var _pads = (paddingSize - m) * .5;
    var _padsLeft = Math.floor(_pads);
    originMatrix.forEach(e => {
      for (var i = 0; i < _padsLeft; i++){
        e.push(0)
        e.unshift(0)
      }
      if (_padsLeft < _pads) {
        e.push(0)
      }
    })
  }
  //  上下补 0  一般不会上下补 0 不会影响向量条数
  return originMatrix
}

//  原始矩阵
var a = [
[0 ,0 ,0 ,0, 0],
[0 ,1 ,2 ,3, 0],
[0 ,1 ,2 ,3, 0],
[0 ,1 ,2 ,3, 0],
[0 ,0 ,0 ,0, 0]
];

var _limit = 50;
// 原始矩阵补边
var a = _inpPadding(a, _limit)

// 获取一个转移矩阵
var b = _getToeplitzMatrix(_limit)

// 初始化
var _r = _matmul(a, b);

//  每秒刷新
var _timer = setInterval(function(){
  _r = _matmul(_r, b);

  var _html = '';
  _r.forEach(m => {
    _html += '<p>';
    _html += m.join(" ")
    _html += '</p>';
  })
  document.body.innerHTML = _html;
  //console.log(JSON.stringify(_r));
}, 1000);
