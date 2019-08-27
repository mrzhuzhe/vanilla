/*
 用临接链表表示图
 */

 var Vertex = [
            { n: "a" },{ n: "b" },{ n: "c" },
            { n: "d" },{ n: "e" },{ n: "f" }
        ];

 var Edge = [
   { s: "a" ,e: "b", w: 16 },
   { s: "a" ,e: "c", w: 13 },
   { s: "b" ,e: "c", w: 10 },
   { s: "c" ,e: "b", w: 4 },
   { s: "c" ,e: "d", w: 14 },
   { s: "b" ,e: "e", w: 12 },
   { s: "e" ,e: "c", w: 9 },
   { s: "d" ,e: "e", w: 7 },
   { s: "d" ,e: "f", w: 4 },
   { s: "e" ,e: "f", w: 20 }
 ]

//  转化为临接链表
var Adj = {};
Vertex.forEach(e => {
  Adj[e.n] = [];
})
//  存一下临近的点和边
Edge.forEach(e => {
  Adj[e.s].push({ neighbour: e.e, path: e })
})

//  用于可视化
Vertex.map((e, i) => e.id = e.n);
Edge.map((e, i) => {
  e.source = e.s;
  e.target = e.e;
  e.weight = e.w;
});

module.exports = {
  Vertex,
  Edge,
  Adj
};
