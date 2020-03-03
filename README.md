# vanilla

 > 猪老板手动撸的一些简单算法和数据结构实现，用来在网上争论用

## Command Script
``` javascript
//  depth first search 非递归
npm run dfs
//  breath first search 非递归 右序
npm run bfs

//  转移矩阵，建议放到控制台里直接执行
matrix/index.js

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

 这一部分是 Andrew Ng 2011版 的 machine learning 课程

 连抄带写，已全部完成

``` matlab
[linearRegression] 线性回归拟合
 % 计算损失函数
 linearRegression/computeCost.m
 % 梯度下降
 linearRegression/gradientDescent.m
 %  演示运行，演示二元一阶多项式 在均方差损失函数下，用梯度下降，的线性回归
 linearRegression/testShow.m

[logisticRegression] 逻辑回归
%  2个feature判定, 附带数据可视化
 logisticRegression/show.m
%  1到10数字的逻辑回归判定，通过交叉熵函数，一对多逻辑回归，其中不仅用到梯度下降法，还用到了梯度检查法
 neuralNetworks/showOnevsAll.m

[neuralNetworks]
% 正向神经网络的演示，其中用的是已经训练好的weight，并没有bp
neuralNetworks/showNN.m
% 反向传播 TODO 梯度计算还需理解
backpropagation/show.m

[svm]
% 高斯核 TODO alpha 训练过程还需理解
svm/gaussianKernelTest.m
% svm判定语料
svm/emailJudge/main.m

[k-mean]
% k-mean 均值聚类
k-mean/main.m

[pca]
% 先做co-matrix 再做 svd 分解 最后练习特征投影
pca/main.m
% 把聚类的颜色三维投影到二维
pca/kmShow.m
% 得特征脸，再对特征脸做降维
pca/pcaShow.m

[F1 abnormalDetect]
% 用 F1 evalate 做异常检测
abnormalDetect\main.m

[Collaborative Filtering]
% TODO 协同过滤的 relative difference 似乎达不到收敛值范围内
cof/main.m
```


## TODO
1. 多源最短路径:
- johnson
- A* 搜索

2. 最大流:
- push-relabel
- pre-push-relabel

3. 矩阵计算:
- 矩阵LU LUP分解
- 矩阵求逆
- 最小二乘
- 矩阵求导

4. 数论算法：
- 中国余数定理
- rsa

5. 字符串匹配：
- 有限自动机
- KMP-pi函数

6. 计算几何学：
- 线段相交
- 扫描法
- 凸包包装法

7. 汉明码
- 实现
- 容错率，性能度量
