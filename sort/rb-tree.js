/*
开发中 红海数排序
var node = {
  n: "12",
  c: "r",
  l: {},
  r: {}
} */
var _tree = {};
var _createLeaf = n => {
  // rb-fix 黑高fix 函数
  return {
    n,
    l: null,
    r: null
  }
}
var _insert = (tree, n) => {
  //  根节点为空
  if (!tree.n) {
    tree = _createLeaf(n);
  } else {
    let _cur = tree;
    let _done = false;
    while (!_done) {
      if ( n < _cur.n ) {
        if (_cur.l) {
          _cur = _cur.l;
        } else {
          _cur.l = _createLeaf(n);
          _done = true;
        }
      } else if (n > _cur.n) {
        if (_cur.r) {
          _cur = _cur.r;
        } else {
          _cur.r = _createLeaf(n);
          _done = true;
        }
      }
    }
  }
  return tree
}


var _arr = [12, 4, 8, 19, 23, 31, 38, 41];
_arr.forEach(e => {
  _tree = _insert(_tree, e);
})

console.log(_tree);
