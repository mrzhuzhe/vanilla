var arr = [3, 4, 1, 2, 3, 5, 6, 7, 9, 8, 12, 15, 4, 3];

//  计算函数
var _maxIncreasingSubArr = (arr)=> {
  //  把数组拓展成一个对象数组 memo策略
  var _arrTB = [];
  arr.forEach((e, i) => {
    //  每个对象包含当前数字 n 和当前元素在最大自增子序列中的位置 index
    _arrTB[i] = {
      n: e,
      index: 0,  //  初始化为 0
      prev: null  //  方便还原
    }
    //  倒着往前遍历 找当前位置的最长自增子序列长度
    let _max = -1;
    // 向前遍历所有的
    for (var j = 0; j < i; j++) {
      //  比一个元素大 && 当前元素自增子序列长度index 比最大的大
      if (_arrTB[i].n > _arrTB[j].n && _arrTB[j].index > _max) {
        //  更新最长子序列长度
        _max = _arrTB[j].index;
        //  当前元素为最长 + 1
        _arrTB[i].index = _max + 1;
        _arrTB[i].prev = _arrTB[j];
      }
    }
  })
  console.log("maxlength-increasing-sub-array-table", _arrTB);
  return _arrTB
}

// 输出函数
var _showMaxIncreasingSubArr = (ObjsArr) => {
  let _max = {
    n: 0,
    index: 0,  //  初始化为 0
    prev: null
  };
  let _maxArr = [];
  //  找最大
  ObjsArr.forEach(e => {
    if (e.n > _max.n) {
      _max = e;
    }
  });
  //  输出
  while (_max.prev) {
    _max = _max.prev;
    _maxArr.push(_max.n)
  }

  return _maxArr
}


console.log("maxlength-increasing-sub-array", _showMaxIncreasingSubArr(_maxIncreasingSubArr(arr)));
