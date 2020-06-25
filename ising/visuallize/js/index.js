class _app {
    constructor () {
        this.eles = {};
        this.wn = 50;
        this.hn = 50;
        //  空间复杂度 n^2
        this.nodeHash = {};
        //  空间复杂度 3^2 - n^2
        this.curEpoch = {};
        //  空间复杂度 3^2 - n^2
        this.nextEpoch = {};
        this.init();        
        console.log("nodeHash", this.nodeHash);
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
                this.nodeHash[i + "-" + j]= {
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
        arr.forEach(e => {
            this.activeSingleNode(e);
            this.curEpoch[e] = 1;
        })        
    }
    calculateNextEpoch() {
        for (var i in this.curEpoch) {
            var _arr  = i.split("-");
            var x = _arr[0];            
            var y = _arr[1];
            /*
                上下左右真的要设置四次
             */
            //  right
            if ( x < this.wn - 1) {
                var _t = (Number(x)+1) + "-" + y;
                !!!this.curEpoch[_t] && (this.nextEpoch[_t] = 1);
            }
            //  left
            if (x > 0) {
                var _t = (Number(x)-1) + "-" + y;
                !!!this.curEpoch[_t] && (this.nextEpoch[_t] = 1);
            }
            //  top
            if ( y < this.hn -1) {
                var _t = x + "-" + (Number(y)+1);
                !!!this.curEpoch[_t] && (this.nextEpoch[_t] = 1);
            }
            // down
            if (y > 0) {
                var _t = x + "-" + (Number(y)-1);
                !!!this.curEpoch[_t] && (this.nextEpoch[_t] = 1);
            }
        }
        return 
    }
    activeSingleNode(num) {
        this.nodeHash[num].e.style.backgroundColor = "#000";
        this.nodeHash[num].s = 1;
    }
    resetSingleNode(num) {
        this.nodeHash[num].e.style.backgroundColor = "#fff";
        this.nodeHash[num].s = 0;
    }
    refreshVisual(){
        for (var i in this.curEpoch){            
            this.activeSingleNode(i);
        }
        for (var i in this.nextEpoch){
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
        }, 1000)
    }
    init() {
        this.getElms();
        this.createIsingBox(this.eles.main);
        this.startSetIntervalEpoch();
    }
}
const app = new _app();
//  改一下
//  https://zh.wikipedia.org/wiki/%E5%BA%B7%E5%A8%81%E7%94%9F%E5%91%BD%E6%B8%B8%E6%88%8F
app.setNodeStatus(["30-30", "30-31", "29-30", "28-30", "28-31", "27-30"])