/*
FORD-FULKERSON（G，t，s）

for each edge(u,v) 属于 E（G）
   do f[u,v]=0
         f[v,u]=0
while there exists a path p from s to t in the residual network Gf
// 根据最大流最小切割定理，当不再有增广路径时，流 f 就是最大流
      do cf(p)=min{cf(u,v):(u,v)is in p}
      // cf(p)为该路径的残余容量
       for each edge (u,v) in p
                     do f[u,v]=f[u,v]+cf(p)  //为该路径中的每条边中注入刚才找到到的残余容量
                 f[v,u]=-f[u,v]   //反向边注入反向流量
*/
