class _isingModel {
    constructor ({ wn=50, hn=50, interval=1000 }) {

        this.eles = {};
        //  空间复杂度 n^2
        this.nodeHash = {};
        //  空间复杂度 3^2 - n^2
        this.curEpoch = {};
        //  空间复杂度 3^2 - n^2
        this.nextEpoch = {};

        this.colorList = [];

        this.wn = wn;
        this.hn = hn;
        this.interval = interval;
        
        this.init();                
    }
    getElms(){
        this.eles.main = document.getElementById("main");
    }    
    createSingleNode() {
        var _node = document.createElement("div");
            _node.className = "nd";          
        return _node
    }
    createIsingBox (divFrame) {
        /*
            给页面上建 100 × 100 个小格子
            格子建一个hash矩阵
         */ 
        
        divFrame.style.width = (this.wn * 14) + "px";
        var i = 0;
        while (i < this.wn) {            
            var j = 0;
            while (j < this.hn){
                var _node = this.createSingleNode();
                this.nodeHash[j + "-" + i]= {
                    e: _node,
                    s: 0
                };             
                divFrame.appendChild(_node);
                j++;
            }
            i++;
        }
        
    }
    setNodeStatus(arr) {
        arr.forEach((item, index) => {
            this.colorList.push(this.getRandomColor());
            item.arr.forEach(e => {
                this.activeSingleNode(e);
                this.curEpoch[e] = index + 1;
            })            
        })        
    }
    calculateNextEpoch() {
        for (var i in this.curEpoch) {
            var _arr  = i.split("-");
            var x = _arr[0];            
            var y = _arr[1];
            var _status = this.curEpoch[i];
            /*
                上下左右真的要设置四次
             */
            //  right
            if ( x < this.wn - 1) {
                var _t = (Number(x)+1) + "-" + y;
                !!!this.curEpoch[_t] && (this.nextEpoch[_t] = _status);
            }
            //  left
            if (x > 0) {
                var _t = (Number(x)-1) + "-" + y;
                !!!this.curEpoch[_t] && (this.nextEpoch[_t] = _status);
            }
            //  top
            if ( y < this.hn -1) {
                var _t = x + "-" + (Number(y)+1);
                !!!this.curEpoch[_t] && (this.nextEpoch[_t] = _status);
            }
            // down
            if (y > 0) {
                var _t = x + "-" + (Number(y)-1);
                !!!this.curEpoch[_t] && (this.nextEpoch[_t] = _status);
            }
        }
    }
    activeSingleNode(num) {
        this.nodeHash[num].e.style.backgroundColor = this.colorList[this.nextEpoch[num] - 1];
        this.nodeHash[num].s = this.nextEpoch[num];
    }
    resetSingleNode(num) {
        this.nodeHash[num].e.style.backgroundColor = "#fff";
        this.nodeHash[num].s = 0;
    }
    refreshVisual(){
        for (var i in this.nextEpoch){            
            this.activeSingleNode(i);
        }
        for (var i in this.curEpoch){
            this.resetSingleNode(i);
        }
    }
    startSetIntervalEpoch() {
        /*
         只需要保存当前状态和下一状态即可
         */
        var _timer = setInterval(() => {
            this.calculateNextEpoch();
            this.refreshVisual();
            
            delete this.curEpoch;
            this.curEpoch = {};

            this.curEpoch = Object.assign(this.curEpoch, this.nextEpoch);

            delete this.nextEpoch;
            this.nextEpoch = {};
        }, this.interval)
    }
    getRandomColor () {    
        return '#'+Math.floor(Math.random()*16777215).toString(16);   
    } 
    init() {
        this.getElms();
        this.createIsingBox(this.eles.main);
        this.startSetIntervalEpoch();
    }
}

/*
 仅在扩散时有概率限制， 只有百分之六十概率扩散成功
 */
class _simpleLifeGame extends _isingModel {
    activeSingleNode (num) {
        //  只有百分之六十的概率激活
        var _prop = Math.random() * 10;
        if (_prop > 4 ) {            
            this.nodeHash[num].e.style.backgroundColor = this.colorList[this.nextEpoch[num] - 1];
            this.nodeHash[num].s = this.nextEpoch[num];
        }
    }    
}

/* * /
var lifeGameInstance = new _simpleLifeGame({ 
    interval: 200,
    wn: 50,
    hn: 50
});


//  改一下
//  https://zh.wikipedia.org/wiki/%E5%BA%B7%E5%A8%81%E7%94%9F%E5%91%BD%E6%B8%B8%E6%88%8F
lifeGameInstance.setNodeStatus([
    { 
        arr: ["30-30", "30-31", "29-30", "28-30", "28-31", "27-30"]
    },
    { 
        arr: ["20-30", "20-31", "19-30", "18-30", "18-31", "17-30"]
    }  
])
/* */

/*
 前后左右各有不同的概率
 nextEpoch 时不清除 curEpoch 保留轨迹
 */
class _malkovSampling extends _isingModel {
    refreshVisual(){
        for (var i in this.nextEpoch){
            this.activeSingleNode(i);
        }
    }
    calculateNextEpoch() {
        for (var i in this.curEpoch) {
            var _arr  = i.split("-");
            var x = _arr[0];            
            var y = _arr[1];
            var _rand = Math.random() * 10;
            var _status = this.curEpoch[i];
            var _t;
            /*
             右 左 下 上  概率分别为 4 1 4 1
             */
            //  right
            if( _rand < 4 ) {
                (x < this.wn - 1) && (_t = (Number(x)+1) + "-" + y);
            //  left
            } else if ( _rand >= 4 && _rand < 5 ) {
                (x > 0) && (_t = (Number(x)-1) + "-" + y);
            //  down
            } else if ( _rand >= 5 && _rand < 9  )  {
                (y < this.hn -1) && (_t = x + "-" + (Number(y)+1));
            // up
            } else if ( _rand >= 9 )  {
                (y > 0) && (_t = x + "-" + (Number(y)-1));
            } else {

            }
            //  Bug 如果_t已经有值，会原地停住，所以这里改成允许穿过已经激活的点
            //  !!!this.curEpoch[_t] && (this.nextEpoch[_t] = 1);  
            if(_t){
                //  没有 _t 就是撞到边了
                this.nextEpoch[_t] = _status;
            }          
        }
    }
}
/* */
var malkovSamplingInstance = new _malkovSampling({
    interval: 200,
    wn: 100,
    hn: 100
})

malkovSamplingInstance.setNodeStatus([
    { 
        arr: ["30-30", "30-31", "29-30", "28-30", "28-31", "27-30"]
    },
    { 
        arr: ["20-30", "20-31", "19-30", "18-30", "18-31", "17-30"]
    }   
]) /* */