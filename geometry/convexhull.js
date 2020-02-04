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
})(2000))
/* * /
var _pointList = [{"x":10,"y":10},{"x":10,"y":20},{"x":10,"y":5},{"x":15,"y":20},{"x":200,"y":300},{"x":220,"y":330},{"x":330,"y":5},{"x":248,"y":47},{"x":320,"y":351},{"x":432,"y":327},{"x":389,"y":331},{"x":88,"y":331},{"x":437,"y":275},{"x":413,"y":277},{"x":426,"y":292},{"x":483,"y":490},{"x":134,"y":61},{"x":404,"y":347},{"x":83,"y":117},{"x":231,"y":315},{"x":312,"y":1},{"x":119,"y":384},{"x":243,"y":454},{"x":234,"y":211},{"x":102,"y":73},{"x":87,"y":213},{"x":178,"y":484},{"x":374,"y":9},{"x":120,"y":391},{"x":468,"y":51},{"x":159,"y":329},{"x":267,"y":136},{"x":420,"y":382},{"x":323,"y":164},{"x":218,"y":262},{"x":58,"y":453},{"x":445,"y":498},{"x":111,"y":476},{"x":483,"y":498},{"x":304,"y":418},{"x":176,"y":120},{"x":176,"y":192},{"x":430,"y":139},{"x":124,"y":12},{"x":331,"y":179},{"x":463,"y":460},{"x":231,"y":244},{"x":329,"y":437},{"x":215,"y":382},{"x":485,"y":275},{"x":103,"y":61},{"x":391,"y":182},{"x":54,"y":329},{"x":190,"y":304},{"x":119,"y":99},{"x":480,"y":56},{"x":148,"y":88},{"x":55,"y":242},{"x":452,"y":474},{"x":331,"y":268},{"x":216,"y":439},{"x":240,"y":293},{"x":457,"y":204},{"x":101,"y":441},{"x":382,"y":136},{"x":19,"y":177},{"x":92,"y":141},{"x":396,"y":211},{"x":245,"y":65},{"x":401,"y":170},{"x":84,"y":320},{"x":343,"y":486},{"x":299,"y":89},{"x":398,"y":484},{"x":131,"y":239},{"x":461,"y":193},{"x":482,"y":420},{"x":301,"y":149},{"x":156,"y":447},{"x":423,"y":43},{"x":417,"y":33},{"x":333,"y":187},{"x":417,"y":198},{"x":193,"y":196},{"x":75,"y":498},{"x":362,"y":141},{"x":196,"y":297},{"x":124,"y":71},{"x":362,"y":178},{"x":457,"y":178},{"x":258,"y":134},{"x":493,"y":274},{"x":152,"y":172},{"x":417,"y":95},{"x":271,"y":226},{"x":187,"y":98},{"x":217,"y":199},{"x":323,"y":145},{"x":294,"y":179},{"x":67,"y":158},{"x":283,"y":375},{"x":93,"y":341},{"x":94,"y":408},{"x":405,"y":25},{"x":122,"y":142},{"x":124,"y":12},{"x":132,"y":128}];
/* */

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
    /*  算一下夹角  (x0 * y1 - y0 * x1)/(|x0-x1|*|y0-y1|)
    _cur-_prew e-_cur
    |x0 x1|
    |y0 y1|
    _det = ( _cur.x -_prew.x ) * (e.y - _cur.y) - ( _cur.y -_prew.y ) * (e.x - _cur.x);
     */
    var _p01 = { x: _cur.x - _prew.x , y: _cur.y - _prew.y };
    var _p12 = { x: e.x - _cur.x , y: e.y - _cur.y };
    var _det = _p01.x * _p12.y - _p01.y * _p12.x;
    console.log("_p01, _p12, _det", _prew, _cur, e , _p01,_p12,_det)
    return {
      det: _det
    }
  }
  arr.forEach((e, i) => {
    var _angle = e.angle;
    //  直接push 进去
    if (_angle == 'p0 self' || _angle == "positive inf" || _angle == 'negtive inf' || i < 3) {
      _hullStack.push(e);
    } else {
       // 必须要小于
       while ( _getDeterminant(e, _hullStack).det >= 0 ) {
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
