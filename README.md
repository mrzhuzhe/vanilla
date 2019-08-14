# vanilla

 > 猪老板手动撸的一些简单算法和数据结构实现，用来在网上争论用

## Command Script
``` javascript
//  depth first search 非递归
npm run dfs
//  breath first search 非递归 右序
npm run bfs
//  [DP]最大自增子序列  
npm run miSubArr
//  [DP]矩阵链乘法
node dp/matrix-chain-multiply
//  [graph] disjoint set
node graph/connected-component
//  [graph] 最小生成树 Kruskal
node graph/Kruskal
//  [mergeable-heap] 斐波那契堆 用来在prim 和 dijstra 中做 extractMin 和 decrease key
node mergeable-heap/fibonacciHeap
//  [WIP][graph] 最小生成树 prim
node graph/prim
//  [WIP]红黑树排序 目前未做删除功能/存在一个Object.assign(root)问题/还在测试中
node sort/rb-tree


//  一道 wpc2018 题目 marble game
node wpc2018/acm-marble-game

```

## 可视化图
### graph

``` javascript
graph/visualize/index.html
```
可以可视化演示
``` javascript
graph/visualize/adj-list.js
```
中用临接链表显示的有向图，方便调试

## TODO
