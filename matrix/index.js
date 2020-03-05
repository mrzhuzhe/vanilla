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
[1 ,2 ,3 ,0, 0],
[0 ,4 ,5 ,6, 0],
[0 ,0 ,7 ,8, 9],
[0 ,0 ,0 ,0, 0]
];

// 两边矩阵长度需要相等
var _limit = 50;
// 原始矩阵补边
var a = _inpPadding(a, _limit)

// 获取一个转移矩阵
var b = _getToeplitzMatrix(_limit)

// 初始化
var _r = _matmul(a, b);

//  映射
var _hash = (num) => {
  var _r = {
    0: "&nbsp;",
    1: "你",
    2: "是",
    3: "猪",
    4: "她",
    5: "撸",
    6: "猫",
    7: "他",
    8: "遛",
    9: "狗",
  }[num]
  if (_r){
    return _r
  } else {
    return num
  }
}

var _createElem = () => {
  var _mask = document.createElement("div");
  _mask.style.position = "fixed";
  _mask.style.width = "100%";
  _mask.style.height = "100%";
  _mask.style.top = "0px";
  _mask.style.left = "0px";
  _mask.style.color = "#f00";
  _mask.style.background = "#ccc";
  _mask.style.opacity = ".75";
  return _mask
}

var _mask = _createElem();
document.body.appendChild(_mask)
//  每秒刷新
var _timer = setInterval(function(){
  _r = _matmul(_r, b);
  var _html = '';
  _r.forEach(m => {
    _html += '<p>';
    m.forEach((n) => {
      _html += _hash(n) + "&emsp;"
    });
    _html += '</p>';
  })
  _mask.innerHTML = _html;
  //console.log(JSON.stringify(_r));
}, 1000);
