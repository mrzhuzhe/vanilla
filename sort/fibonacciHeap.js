//参考  http://staff.ustc.edu.cn/~csli/graduate/algorithms/book6/chap21.htm
// 创建和返回一个新的不含任何元素的堆。
var MAKE_HEAP = () => {
  return {
    root: [],
    min: null,
    n: 0
  }
}

var root_concat = (H, x) => {
  H.root = H.root.concat([x]);
  if (H.root.length == 1) return H
  var _last = H.root[H.root.length - 2];
  var _first = H.root[0];
  x.left = _last;
  _last.right = x;
  x.right = _first;
  _first.left = x;
  return H
}

// 将一个已填入关键字的元素x插入堆H中。
var INSERT = (H, x) => {
  x.d = 0;
  x.p = null;
  x.child = null;
  x.left = x;
  x.right = x;
  x.mark = false;
  H = root_concat(H, x);
  if ( !!!H.min || x.key < H.min.key ) {
    H.min = x;
  }
  //  H.n = H.n + 1; // 等价于 root.length 可舍去
}

//  返回一个指向堆H中具有最小关键字元素的指针。
var MINIMUM = (H) => {
  return H.min
}

/*
var H = MAKE_HEAP();
INSERT(H, { "key": 3 });
INSERT(H, { "key": 1 });
INSERT(H, { "key": 2 });
INSERT(H, { "key": 3 });
INSERT(H, { "key": 2 });
console.log(H, MINIMUM(H));
*/

//  从堆H中删除最小关键字的元素，并返回指向该元素的指针。
var EXTRACT_MIN = (H) => {
/*
  FIB-HEAP-EXTRACT-MIN(H)
  z = min[H]
  if z != NIL
  then for each child x of z
  do add x to the root list of H
  p[x] = NIL
  remove z from the root list of H
  if z = right[z]
  then min[H] = NIL
  else min[H] = right[z]
  CONSOLIDATE(H)
  n[H] = n[H] - 1
  return z
  */
}

var CONSOLIDATE(H) = (H) => {
/*
for i = 0 to D(n[H])
      do A[i] != NIL
for each node w in the root list of H
      do x = w
      d = degree[x]
      while A[d] != NIL
      do y != A[d]
      if key[x] > key[y]
        then exchange x , y
      FIB-HEAP-LINK(H,y,x)
      A[d] = NIL
      d = d + 1
      A[d] = x
min[H] = NIL
for i = 0 to D(n[H])
do if A[i] != NIL
  then add A[i] to the root list of H
    if min[H] = NIL or key[A[i]] < key[min[H]]
    then min[H] = A[i]
*/
}

var FIB_HEAP_LINK = (H, y, x) => {
/*
remove y from the root list of H
make y a child of x, incrementing degree[x]
mark[y] = FALSE
*/
}

var FIB_HEAP_DECREASE_KEY = (H,x,k) => {
  /*
  if k > key[x]
    then error "new key is greater than current key"
  key[x] = k
  y = p[x]
  if y != NIL and key[x] < key[y]
  then CUT(H,x,y)
  CASCADING-CUT(H,y)
  if key[x] < key[min[H]]
  then min[H] = x
  */
}

var CUT = (H,x,y) => {
  /*
  remove x from the child list of y, decrementing degree[y]
  add x to the root list of H
  p[x] = NIL
  mark[x] = FALSE
  */
}

var CASCADING_CUT = (H,y) => {
/*
  z = p[y]
  if z != NIL
  then if mark[y] = FALSE
  then mark[y] = TRUE
  else CUT(H,y,z)
  CASCADING_CUT(H,z)
*/
}

//  创建并返回一个包含堆H1和堆H2中所有元素的新堆。堆H1和H2
var UNION = (H1，H2) => {
/*
FIB-HEAP-UNION(H1,H2)
H = MAKE-FIB-HEAP()
min[H] = min[H1]
concatenate the root list of H2 with the root list of H
if (min[H1] = NIL) or (min[H2]  NIL and min[H2] < min[H1])
then min[H] = min[H2]
n[H] = n[H1] + n[H2]
return H
*/
}
