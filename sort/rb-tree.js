/*
开发中 红黑数 排序
var node = {
  p: {}, // 父节点指针
  n: "12",
  c: "r",
  l: {},
  r: {}
}
*/

// 树根节点
var _root = {};

//  建叶子节点
var _createLeaf = (n, p) => {
  return {
    p,
    n,
    l: null,
    r: null,
    c: 'r'
  }
}

// 左旋
var _leftRotate = (node, node_r) => {
  if (!node_r) throw new Error(node.n + " 右子树不存在");
  //  暂存当前结点父亲
  let _p = node.p;
  let _pf = '' ;
  if ( _p ) {
    // 切断 node 与 node.p
    if ( node == _p.l ) {
      _pf = 'l';
    } else {
      _pf = 'r';
    }
  }
  //  当前节点右节点为 当前右节点左节点
  node.r = node_r.l;
  if (node_r.l) node_r.l.p = node;
  //  右节点 的左节点为当前节点
  node_r.l = node;
  //  当前节点父亲为 当前右节点
  node.p = node_r;
  // 右节点 替代当前节点
  node_r.p = _p;
  // 连上
  if (_p) {
    node_r.p[_pf] = node_r
  }
}

// 右旋
var _rightRotate = (node, node_l) => {
  if (!node_l) throw new Error(node.n + " 左子树不存在");
  //  暂存当前结点父亲
  let _p = node.p;
  //  判断node是父亲的哪个节点
  let _pf = '' ;
  if ( _p ) {
    // 切断 node 与 node.p
    if ( node == _p.l ) {
      _pf = 'l';
    } else {
      _pf = 'r';
    }
  }
  //  当前节点左节点为 当前左节点右节点
  node.l = node_l.r;
  if (node_l.r) node_l.r.p = node;
  //  左节点 的右节点为当前节点
  node_l.r = node;
  //  当前节点父亲为 当前左节点
  node.p = node_l;
  // 左节点 替代当前节点
  node_l.p = _p;
  // 连上
  if (_p) {
    node_l.p[_pf] = node_l
  }
}

// 插入
var _insert = (root, n) => {
  //  根节点为空
  if (!root.n) {
    Object.assign(root, _createLeaf(n, null));
    // 黑高fix函数
    root = _rb_fix(root, root);
  } else {
    let _cur = root;
    let _done = false;
    while (!_done) {
      if ( n < _cur.n ) {
        if (_cur.l) {
          _cur = _cur.l;
        } else {
          _cur.l = _createLeaf(n, _cur);
          // 黑高fix函数
          root = _rb_fix(_cur.l, root);
          _done = true;
        }
      } else if (n > _cur.n) {
        if (_cur.r) {
          _cur = _cur.r;
        } else {
          _cur.r = _createLeaf(n, _cur);
          // 黑高fix函数
          root = _rb_fix(_cur.r, root);
          _done = true;
        }
      } else {
        //  [TODO]相等的情况
      }
    }
  }
  return root
}

var _rb_fix = (node, root) => {
    // 递归到顶
    if ( node == root ) {
      node.c = "b";
      return root
    }
    // 当前节点的 p 是红色
    if ( node.c == "b" || node.p.c !== "r" ) return root
    // 当前节点 p 为 p.p 左节点
    if (node.p == node.p.p.l) {
      // 当前节点的 p.p.r 是红色 > p.p 变红 & p.p.l 和 p.p.r 变为黑色 & rb_fix(node.p.p)
      if ( node.p.p.r && node.p.p.r.c == "r" ) {
        node.p.p.c = 'r';
        node.p.p.l.c = 'b';
        node.p.p.r.c = 'b';
        return _rb_fix(node.p.p, root);
      } else {
        // 当前节点 为 p 的右节点 & p.p.r 不存在
        if ( node == node.p.r) {
          //node.p = _leftRotate(node.p, node);
          _leftRotate(node.p, node);
          node.c = 'b';
          node.p.c = 'r';
          _rightRotate(node.p, node);
          if ( !node.p ) {
            root = node
          } else {
            return _rb_fix(node, root);
          };
        } else {
          node.p.c = 'b';
          node.p.p.c = 'r';
          // 当前节点 为 p 的左节点 & p.p.r 不存在
          _rightRotate(node.p.p, node.p);
          if ( !node.p.p ) {
            root = node.p;
          } else {
            return _rb_fix(node.p, root);
          };
        }
      }
    // 当前节点 p 为 p.p 右节点
    } else if (node.p == node.p.p.r) {
        // 当前节点的 p.p.l 是红色
        if ( node.p.p.l && node.p.p.l.c == "r" ) {
          node.p.p.c = 'r';
          node.p.p.l.c = 'b';
          node.p.p.r.c = 'b';
          return _rb_fix(node.p.p, root);
        } else {
          // 当前节点 为 p 的右节点 & p.p.l 不存在
          if ( node == node.p.l) {
            _rightRotate(node.p, node);
            node.c = 'b';
            node.p.c = 'r';
            _leftRotate(node.p, node);
            if ( !node.p ) {
              root = node
            } else {
              return _rb_fix(node, root);
            };
          } else {
            // 当前节点 为 p 的左节点 & p.p.l 不存在
            node.p.c = 'b';
            node.p.p.c = 'r';
            _leftRotate(node.p.p, node.p);
            if ( !node.p.p ) {
              root = node.p;
            } else {
              return _rb_fix(node.p, root);
            };
          }
      }
    }
    root.c = "b";
    return root
}

// 搜
var _search = (root, n) => {
  let _cur = root;
  while (n !== _cur.n) {
    if ( n > _cur.n ) {
      _cur = _cur.r
    } else {
      _cur = _cur.l
    }
  }
  // todo 改
  if ( _cur.n == n ) {
    return _cur
  } else {
    return null
  }
}

var _arr = [12, 4, 8, 19, 23, 31, 38, 41, 10, 13, 22, 5, 7, 9, 15];
_arr.forEach(e => {
  _root = _insert(_root, e);
})

console.log(_root);
