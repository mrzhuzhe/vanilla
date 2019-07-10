// 非递归实现
var tree = require('./simple-tree');
console.log('tree', JSON.stringify(tree));
/*
  5 - 6 - 7 - 16 - 17
                 - 18
                 - 19
                 - 20
        - 8
        - 9
        - 10
    - 11 - 12
         - 13
         - 14
         - 15
 */
let _dfs = (t) => {
  // 根节点先入队列
  let _queue = [t];
  let _res = [];
  let _addChild = (node) => {
    if (!node.child) return
    node.child.forEach(e => {
      // 加到队列前端
      _queue.unshift(e)
    })
  }
  while (_queue.length) {
    let _cur = _queue.pop();
    _res.push(_cur.n);
    //  子元素入队列
    _addChild(_cur);
  }
  return _res
}
console.log('-- 结果 --', _dfs(tree[0]))
