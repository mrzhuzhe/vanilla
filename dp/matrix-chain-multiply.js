//  矩阵链乘
//  var _arr = [5, 10 , 20, 50, 6, 8 , 12, 15, 18, 21];
var _arr = [5, 10 , 20, 50];

//  算
var _MatrixChainMultiply = (arr) => {
  var _m = {};
  var _s = {};
  // 自己乘自己为 0
  arr.forEach((e, i) => {
    _m[i + "-" + i] = 0;
  })
  // 以 l=2 开始
  for ( var l = 2; l < arr.length; l++ ){
    for ( var i = 0; i < arr.length - l; i++ ) {
      //  注意 只有 0 到 8
      j = i + l - 1;
      _m[i + "-" + j] = 999999999999999;
      // 在 i 到 l 中取分割点 记录最小值 m[i + "-" + j] 并记录 s[i + "-" + j] 中的分割点
      for (var k = i; k < j; k++ ){
        let p = _m[i + "-" + k] + _m[(k+1) + "-" + j] + _arr[i] * _arr[k+1] * _arr[j+1];
        if ( p < _m[i + "-" + j]) {
          _m[i + "-" + j] = p;
          _s[i + "-" + j] = k;
        }
      }
    }
  }
  return {
    m: _m,
    s: _s
  }
}

// 展示
var _showMatrixChainMultiply = (s, i, j) => {
  if (i == j) {
    return "A[" + i + "]"
  }
  let _k = s[i + "-" + j];
  var _res = "(";
      _res += _showMatrixChainMultiply(s, i, _k);
      _res += _showMatrixChainMultiply(s, _k + 1, j);
      _res += ")";
  return _res
}

//  console.log("最优化矩阵", _MatrixChainMultiply(_arr));
console.log("最优化矩阵", _showMatrixChainMultiply(_MatrixChainMultiply(_arr).s, 0 , _arr.length - 2));
