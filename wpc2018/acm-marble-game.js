//  这是一道acm 题目  此问题用来研究 运行时间和空间开销
//  TODO 浏览器如何限制运行内存 
//  时间复杂度 n^2 空间n
//  var input = [1, 2, 3, 4, 5];
var input = [3, 3, 3, 3, 3, 3, 3, 3, 3, 3];
var _marbleGame = (arr) => {
  //  记录 i 到 arr.length 位 的项的值
  var _tb = {};
  let _sum = 0;
  for (var i = arr.length - 1; i >= 0; i-- ) {
    //  给个初始值
    _tb[i] = arr[i];
    for (var j = i + 1; j <= arr.length - 1; j++ ) {
      _tb[i] += _tb[j];
    }
    _sum += _tb[i];
  }
  console.log("tb", _tb)
  return _sum
}
console.log("sum", _marbleGame(input));
