/*
开发中 红黑数 排序
var node = {
  n: "12",
  c: "r",
  l: {},
  r: {}
}
*/

// 树根节点
var _tree = {};

//  建叶子节点
var _createLeaf = (n, p) => {
  // rb-fix 黑高fix 函数
  return {
    p,
    n,
    l: null,
    r: null
  }
}

// 左旋
var _leftRotate = (node, node_r) => {
  if (!node_r) throw new Error(node.n + " 右子树不存在");
  //  暂存当前结点父亲
  let _p = node.p;
  //  当前节点父亲为 当前右节点
  node.p = node_r;
  //  当前节点右节点为 当前右节点左节点
  node.r = node_r.l;
  if (node_r.l) node_r.l.p = node;
  //  右节点 的左节点为当前节点
  node_r.l = node;
  // 右节点 替代当前节点
  node_r.p = _p;
  // 右节点 必须覆盖当前节点
  return node_r
}

// 右旋
var _rightRotate = (node, node_l) => {
  if (!node_l) throw new Error(node.n + " 左子树不存在");
  //  暂存当前结点父亲
  let _p = node.p;
  //  当前节点父亲为 当前左节点
  node.p = node_l;
  //  当前节点左节点为 当前左节点右节点
  node.l = node_l.r;
  if (node_l.r) node_l.r.p = node;
  //  左节点 的右节点为当前节点
  node_l.r = node;
  // 左节点 替代当前节点
  node_l.p = _p;
  // 右节点 必须覆盖当前节点
  return node_l
}

// 插入
var _insert = (tree, n) => {
  //  根节点为空
  if (!tree.n) {
    tree = _createLeaf(n, null);
  } else {
    let _cur = tree;
    let _done = false;
    while (!_done) {
      if ( n < _cur.n ) {
        if (_cur.l) {
          _cur = _cur.l;
        } else {
          _cur.l = _createLeaf(n, _cur);
          _done = true;
        }
      } else if (n > _cur.n) {
        if (_cur.r) {
          _cur = _cur.r;
        } else {
          _cur.r = _createLeaf(n, _cur);
          _done = true;
        }
      }
    }
  }
  return tree
}

// 搜
var _search = (tree, n) => {
  let _cur = tree;
  while (n !== _cur.n) {
    if ( n > _cur.n ) {
      _cur = _cur.r
    } else {
      _cur = _cur.l
    }
  }
  return _cur
}

var _arr = [12, 4, 8, 19, 23, 31, 38, 41];
_arr.forEach(e => {
  _tree = _insert(_tree, e);
})

console.log(_tree);
