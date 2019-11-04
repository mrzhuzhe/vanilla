/*
  计算其他点对这个点的角度 并排序
  连接 角度最小的点 记录下一个点 保存在凸包中的点在一个栈中
  确认是否左转 如果 右转 向前回退直到产生一个左转 直到最后一个点（去连接p0）
*/
//  先对点做一个可视化
const __MAXAXIES__ = 500;
//  先来几个固定点
var _pointList = [
 { x: 10,y: 10},
 { x: 10,y: 20},
 { x: 10,y: 5},
 { x: 15,y: 20},
 { x: 200,y: 300},
 { x: 220,y: 330},
 { x: 330,y: 5}
]
// 再来几个随机点
_pointList = _pointList.concat((function(count){
  var _res = []
  for (var i=0;i<count;i++) {
    _res.push({
      x: parseInt(Math.random()*__MAXAXIES__),
      y: parseInt(Math.random()*__MAXAXIES__)
    })
  }
  return _res
})(100))

// 再把页面上把点标起来
function draw (arr) {
  //  打印
  console.log(JSON.stringify(arr));
  //  画图
  var canvas = document.getElementById("main");
  var canvasWidth = canvas.width;
  var canvasHeight = canvas.height;
  var ctx = canvas.getContext("2d");
  //  画点
  function point(x, y, ctx){
    ctx.beginPath();
    ctx.arc(x, y, 1, 0, 2 * Math.PI, true);
    ctx.stroke();
  }
  var _min_x_p = {
    x: __MAXAXIES__,
    y: __MAXAXIES__
  };
  for (var i=0;i<arr.length;i++) {
    var _cur = arr[i];
    if ( _cur.x < _min_x_p.x) _min_x_p = _cur;
    point(_cur.x, _cur.y, ctx);
  }
  //  取x或者y最小点
  console.log('point with minium x', _min_x_p);
  //  编号
  for (var i=0;i<arr.length;i++) {
    var _cur = arr[i];
    //  算一下仰角 这一步用了除法 可能会有点问题
    var _angle = 0;
    if ( _cur.x - _min_x_p.x === 0 ){
      if (_cur.y - _min_x_p.y > 0) {
        _angle = 'negtive inf';
      } else if ( _cur.y - _min_x_p.y < 0) {
        _angle = 'positive inf';
      } else {
        _angle = 'p0 self';
      }
    } else if (_cur.y - _min_x_p.y === 0) {
      _angle = 0;
    } else {
      _angle = (_min_x_p.y - _cur.y) / (_cur.x - _min_x_p.x);
    }
    _cur.angle = _angle;
  }
  //  排个序
  console.log('angle added', arr);
  //  可以换个 nlogn的排序
  arr = arr.sort(function(a, b) {
    var _an = a.angle, _bn = b.angle;
    if ( _an == 'p0 self' || _bn == "positive inf" || _an == 'negtive inf' ) {
      return _bn == 'p0 self'? 1 : -1
    } else if (_bn == 'p0 self' || _an == "positive inf" || _bn == 'negtive inf' ) {
      return _an == 'p0 self' ? -1 : 1
    } else {
      //  只做大小判断，后面不会用到，此处除法误差应该没啥问题
      return _an - _bn
    }
  })
  console.log("sorted", arr)
  //  从夹角最小的开始遍历
  var _hullStack = [];
  //  算行列式
  var _getDeterminant = (e, _hullStack) => {
    var _prew = _hullStack[_hullStack.length-2];
    var _cur = _hullStack[_hullStack.length-1];
    var _p01 = { x: _cur.x - _prew.x , y: _cur.y - _prew.y };
    var _p12 = { x: e.x - _cur.x , y: e.y - _cur.y };
    var _det = _p01.x * _p12.y - _p01.y * _p12.x;
    console.log("_p01, _p12, _det", _p01,_p12,_det)
    return {
      det: _det
    }
  }
  arr.forEach(e => {
    var _angle = e.angle;
    //  直接push 进去
    if (_angle == 'p0 self' || _angle == "positive inf" || _angle == 'negtive inf' || _hullStack.length <= 3) {
      _hullStack.push(e);
    } else {
      /*  算一下夹角  (x0 * y1 - y0 * x1)/(|x0-x1|*|y0-y1|)
      |x0 x1|
      |y0 y1|
      _det = _min_x_p.x * _cur.y - _min_x_p.y * _cur.x;
       */
       // 必须要小于
       while ( _getDeterminant(e, _hullStack).det > 0 ) {
         _hullStack.pop();
       }
       _hullStack.push(e);
    }
  })
  console.log("hullStack", _hullStack);
  //  画线
  function drawLine (pointArr, ctx) {
    pointArr.forEach((e,i) => {
        if (i==0){
          ctx.moveTo(e.x, e.y);
        } else {
          ctx.lineTo(e.x, e.y);
        }
    })
    ctx.lineTo(pointArr[0].x, pointArr[0].y);
    ctx.stroke();
  }
  //  连线
  drawLine(_hullStack, ctx);
}
draw(_pointList);
