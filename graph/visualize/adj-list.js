/*
 用临接链表表示图
 */

 var Vertex = [
            { n: "a" },{ n: "b" },{ n: "c" },{ n: "d" },
            { n: "e" },{ n: "f" },{ n: "g" },{ n: "h" },
            { n: "i" },{ n: "j" },{ n: "k" },{ n: "l" }
        ];

 var Edge = [
   { s: "a" ,e: "b", w: 1 },
   { s: "a" ,e: "c", w: 1 },
   { s: "a" ,e: "d", w: 2 },
   { s: "b" ,e: "c", w: 2 },
   { s: "b" ,e: "d", w: 2 },
   { s: "b" ,e: "e", w: 2 },
   { s: "i" ,e: "j", w: 3 },
   { s: "g" ,e: "h", w: 3 },
   { s: "b" ,e: "h", w: 3 },
   { s: "i" ,e: "l", w: 3 },
   { s: "d" ,e: "j", w: 1 },
   { s: "e" ,e: "f", w: 1 },
   { s: "c" ,e: "k", w: 1 },
   { s: "l" ,e: "k", w: 1 },
   { s: "g" ,e: "e", w: 1 },
   { s: "f" ,e: "d", w: 1 }
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
