//参考  http://staff.ustc.edu.cn/~csli/graduate/algorithms/book6/chap21.htm
/*
  现在有个问题
  deceaseKey 查找元素非常麻烦
  需要增加一个hash表来链接到每一个元素
  key 元素名称 x.n value 元素指针
这样的话 每个元素都必须有名称 n
 */

// 创建和返回一个新的不含任何元素的堆。
var MAKE_HEAP = () => {
  return {
    root: [],
    min: null,
    hash: {}
    //  n: 0
  }
}

var root_concat = (root, x) => {
  root = root.concat([x]);
  var _length = root.length - 2 > 0 ? root.length - 2 : 0;
  var _last = root[_length];
  var _first = root[0];
  x.left = _last;
  _last.right = x;
  x.right = _first;
  _first.left = x;
  return root
}

var root_delete = (root, x) => {
  // 把 x 的左右 连在一起 x 本身的左右不变
  for ( var i = 0; i < root.length; i++ ) {
    if ( x === root[i] ) {
      root[i].left.right = root[i].right;
      root[i].right.left = root[i].left;
      root.splice(i, 1)
      break;
    }
  }
  return root
}

// 将一个已填入关键字的元素x插入堆H中。
var INSERT = (H, x) => {
  x.d = 0;
  x.p = null;
  x.child = [];
  x.left = x;
  x.right = x;
  x.mark = false;
  H.root = root_concat(H.root, x);
  if ( !!!H.min || x.key < H.min.key ) {
    H.min = x;
  }
  //  做一个快速寻址的hash表
  H.hash[x.n] = x
  //  H.n = H.n + 1; // 等价于 root.length 可舍去
}

//  返回一个指向堆H中具有最小关键字元素的指针。
var MINIMUM = (H) => {
  return H.min
}

//  从堆H中删除最小关键字的元素，并返回指向该元素的指针。
var EXTRACT_MIN = (H) => {
  var z = H.min;
  if (!!z) {
    while (z.child.length) {
      // TODO注意此处到底是 shift 还是 pop
      var _cur = z.child.shift();
      _cur.p = null;
      H.root = root_concat(H.root, _cur);
    }
    H.root = root_delete(H.root, z);
    if ( z === z.right ){
      H.min = null;
    } else {
      H.min = z.right;
    }
    CONSOLIDATE(H);
    //  hash 表中删除这个元素
    delete H.hash[z.n]
    //  H.n = H.n - 1
    return z
  }
}

var getDegree = (root) => {
  let max_D = 0;
  for ( var i = 0; i < root.length; i++ ) {
    if ( root[i] && root[i].d > max_D ) {
      max_D = root[i].d;
    }
  }
  return max_D
}

var CONSOLIDATE = (H) => {
  //  TODO 这个地方可能也要优化下 这个地方还是线性时间
  var max_D = getDegree(H.root);
  var A = {};
  for ( var j = 0; j <= max_D; j++ ) {
    A[j] = null;
  }
  //  debugger
  var w = 0;
  while ( w < H.root.length ) {
    var x = H.root[w];
    var _d = x.d;
    while (!!A[_d]) {
      var y = A[_d];
      if ( x.key > y.key ) {
        var _temp = Object.assign({}, y);
        y = Object.assign(y, x);
        x = _temp;
        //  对调的话 hash表中值也要对调
        H.hash[x.n] = x;
        H.hash[y.n] = y;
      }
      H = FIB_HEAP_LINK(H, y, x);
      A[_d] = null;
      _d += 1;
    }
    A[_d] = x;
    w++;
  }
  H.min = null;
  // 重新来一次
  max_D = getDegree(Object.values(A));
  //  似乎可以用 A 完全覆盖 H.root
  H.root = [];
  for ( var j = 0; j <= max_D; j++ ) {
    if (A[j]) {
      //  then add A[i] to the root list of H
      H.root = root_concat(H.root, A[j]);
      if ( H.min === null || A[j].key < H.min.key ) {
        H.min =  A[j];
      }
    }
  }
  return H
}

var FIB_HEAP_LINK = (H, y, x) => {
  //  H.root = root_delete(H.root, y);
  x.child = root_concat(x.child, y);
  //  只有这一种情况会增加高度
  y.p = x;
  x.d += 1;
  y.mark = false;
  return H
}

var FIB_HEAP_DECREASE_KEY = (H,x,k) => {
  if ( k > x.key ) {
    throw new Error("new key is greater than current key")
  }
  x.key = k;
  y = x.p;
  if ( y !== null && x.key < y.key ) {
    CUT(H, x, y);
    CASCADING_CUT(H, y);
  }
  if ( x.key < H.min.key ) {
    H.min = x;
  }
}

var CUT = (H, x, y) => {
  y.child = root_delete(y.child, x)
  //  此处不能仅仅减一
  y.d = getDegree(y.child);
  H.root = root_concat(H.root, x);
  x.p = null;
  x.mark = false;
}

var CASCADING_CUT = (H,y) => {
  z = y.p;
  if (z !== null) {
    if (y.mark === false) {
      y.mark = true;
    } else {
      CUT(H, y, z);
      CASCADING_CUT(H, z);
    }
  }
}

/* * /
var H = MAKE_HEAP();
INSERT(H, { "key": 3, "n": "a" });
INSERT(H, { "key": 1, "n": "b" });
INSERT(H, { "key": 2, "n": "c" });
INSERT(H, { "key": 3, "n": "d" });
INSERT(H, { "key": 2, "n": "e" });
INSERT(H, { "key": 4, "n": "f" });
INSERT(H, { "key": 5, "n": "g" });
INSERT(H, { "key": 6, "n": "h" });
INSERT(H, { "key": 1, "n": "i" });
INSERT(H, { "key": 2, "n": "j" });
//  console.log(H, MINIMUM(H));
console.log(EXTRACT_MIN(H));
console.log(FIB_HEAP_DECREASE_KEY(H, H.root[1].child[2].child[1].child[0], 1 ));
/* */

//  创建并返回一个包含堆H1和堆H2中所有元素的新堆。堆H1和H2
var UNION = (H1, H2) => {
/*
FIB-HEAP-UNION(H1,H2)
H = MAKE-FIB-HEAP()
min[H] = min[H1]
concatenate the root list of H2 with the root list of H
if (min[H1] = NIL) or (min[H2]  NIL and min[H2] < min[H1])
then min[H] = min[H2]
n[H] = n[H1] + n[H2]
return H
*/
}


module.exports = {
  MAKE_HEAP,
  EXTRACT_MIN,
  INSERT,
  FIB_HEAP_DECREASE_KEY
};
