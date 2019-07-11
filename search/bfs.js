// 非递归实现 右序
var tree = require('./simple-tree');

let _bfs = (t) => {
  // 根节点先入队列
  let _stack = [t];
  let _res = [];
  let _addChild = (node) => {
    // 如果要改为左序 把这里的child倒过来便利
    if (!node.child) return
    node.child.forEach(e => {
      // 加到队列前端
      _stack.push(e)
    })
  }
  while (_stack.length) {
    let _cur = _stack.pop();
    _res.push(_cur.n);
    //  子元素入队列
    _addChild(_cur);
  }
  return _res
}
console.log('-- 结果 --', _bfs(tree[0]))
