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
//  [DP]一道 wpc2018 题目 marble game
node wpc2018/acm-marble-game

//  [mergeable-heap] 斐波那契堆 用来在prim 和 dijstra 中做 extractMin 和 decrease key
node mergeable-heap/fibonacciHeap
//  [WIP]红黑树排序 目前未做删除功能/存在一个Object.assign(root)问题/还在测试中
node sort/rb-tree


//  [graph] disjoint set
node graph/connected-component
//  [graph] 最小生成树 Kruskal
node graph/Kruskal
//  [graph] 最小生成树 prim
node graph/prim
//  [graph] bellman-ford负权最短路径
node graph/bellman-ford
//  [graph] floyd-floydWarshall
node graph/floyd-warshall

//  [WIP][flow-network] 流网络 FF 算法
//  还有很多疑点 例如 dfs 的实现 是否满流量判断等
node flow-network/ford-fulkerson

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

###  [Geometry] 计算几何学
``` javascript
//  [convexhull]可视化演示凸包 [bug]数量多的时候还是有点bug
geometry/convexhull.html
//  [convexhull]简单的计算凸包，处理了90度的情况
geometry/convexhull.js
```

## 简单离线数据分析

 这一部分改为用 octave 实现

``` matlab
[linearRegression] 线性回归拟合
 % 计算损失函数
 linearRegression/computeCost.m
 % 梯度下降
 linearRegression/gradientDescent.m
 %  演示运行，演示二元一阶多项式 在均方差损失函数下，用梯度下降，的线性回归
 linearRegression/testShow.m
```


## TODO
多源最短路径:
johnson
A* 搜索

最大流:
push-relabel
pre-push-relabel

矩阵计算:
矩阵LU LUP分解
矩阵求逆
最小二乘
矩阵求导

数论算法：
中国余数定理
rsa

字符串匹配：
有限自动机
KMP-pi函数

计算几何学：
线段相交
扫描法
凸包包装法
