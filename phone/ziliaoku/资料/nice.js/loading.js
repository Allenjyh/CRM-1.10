const loadingStyle = true;
const $loading = {
    init: function (opt) {
        this.opt = opt;
        this.box = opt.ele ? ".min-l-wrapper" : ".l-wrapper";
        let that = this;

        let setInit = new Promise(function (resolve, reject) {
            that.open();
            resolve(that);
        }).then(function onFulfilled(that) {
            if (typeof that.opt.next == "function") {

                that.opt.next(that)
            }else {
                return false;
            }
        })

    },
    open: function () {
        let me = this;
        let setOpen = new Promise(function (resolve, reject) {
            if(loadingStyle){
                me.setCss().setKeyframes();
            }
            resolve(me,loadingStyle);
        }).then(function onFulfilled(me,loadingStyle) {
            loadingStyle = false;
            me.setHtml(me.opt.ele);
        })
    },
    setCss: function (p) {
        let that = this,
            cssText = that.box + "{position:"+(that.opt.ele ? "absolute":"fixed")+";left:0;top:0;z-index:100;width:100%;height:100%;overflow:hidden;text-align:center;font-size:14px;background-color:rgba(90,99,108,0.4)}svg{height:42px;width:42px;overflow:visible;border-radius:120px;z-index:1000;position:absolute;background:#fff;left:calc((100% - 42px)/2);top:calc((100% - 42px)/2)}.g-circles{-webkit-transform:scale(0.9)translate(7px,7px);-ms-transform:scale(0.9)translate(7px,7px);transform:scale(0.9)translate(7px,7px)}circle{fill:#9ED110;fill-opacity:0;-webkit-animation:opacity 1.2s linear infinite;animation:opacity 1.2s linear infinite}circle:nth-child(12n+1){fill:#50B517;-webkit-animation-delay:-0.1s;animation-delay:-0.1s}circle:nth-child(12n+2){fill:#179067;-webkit-animation-delay:-0.2s;animation-delay:-0.2s}circle:nth-child(12n+3){fill:#476EAF;-webkit-animation-delay:-0.3s;animation-delay:-0.3s}circle:nth-child(12n+4){fill:#9f49ac;-webkit-animation-delay:-0.4s;animation-delay:-0.4s}circle:nth-child(12n+5){fill:#CC42A2;-webkit-animation-delay:-0.5s;animation-delay:-0.5s}circle:nth-child(12n+6){fill:#FF3BA7;-webkit-animation-delay:-0.6s;animation-delay:-0.6s}circle:nth-child(12n+7){fill:#FF5800;-webkit-animation-delay:-0.7s;animation-delay:-0.7s}circle:nth-child(12n+8){fill:#FF8100;-webkit-animation-delay:-0.8s;animation-delay:-0.8s}circle:nth-child(12n+9){fill:#FEAC00;-webkit-animation-delay:-0.9s;animation-delay:-0.9s}circle:nth-child(12n+10){fill:#FFCC00;-webkit-animation-delay:-1s;animation-delay:-1s}circle:nth-child(12n+11){fill:#EDE604;-webkit-animation-delay:-1.1s;animation-delay:-1.1s}circle:nth-child(12n+12){fill:#EDE604;-webkit-animation-delay:-1.2s;animation-delay:-1.2s}";

        if (that.opt.cssText) {
            cssText = that.opt.cssText;
        }
        ;

        let cssEle = document.createElement("style");
        cssEle.type = "text/css";
        cssEle.appendChild(document.createTextNode(cssText));
        document.getElementsByTagName("head")[0].appendChild(cssEle);

        return that;
    },
    //插入动画
    setKeyframes: function () {
        let insetKeyframes = document.styleSheets[0];
        try {
            insetKeyframes.insertRule("@-webkit-keyframes opacity{3%{fill-opacity:1}75%{fill-opacity:0}}");
            insetKeyframes.insertRule("@keyframes opacity{3%{fill-opacity:1}75%{fill-opacity:0}}");
            insetKeyframes.insertRule("@-webkit-keyframes opacity-stroke{10%{stroke-opacity:1}85%{stroke-opacity:0}}");
            insetKeyframes.insertRule("@keyframes opacity-stroke{10%{stroke-opacity:1}85%{stroke-opacity:0}}");

            insetKeyframes.insertRule("@-webkit-keyframes colors{0%{fill:yellowgreen}10%{fill:gold}75%{fill:crimson}}");
            insetKeyframes.insertRule("@keyframes colors{0%{fill:yellowgreen}10%{fill:gold}75%{fill:crimson}}");
            insetKeyframes.insertRule("@-webkit-keyframes colors-stroke{0%{stroke:yellowgreen}10%{stroke:gold}75%{stroke:crimson}}");
            insetKeyframes.insertRule("@keyframes colors-stroke{0%{stroke:yellowgreen}10%{stroke:gold}75%{stroke:crimson}}");

            insetKeyframes.insertRule("@-webkit-keyframes colors-2{0%{fill:yellow}50%{fill:red}65%{fill:orangered}95%{fill:gold}}");
            insetKeyframes.insertRule("@keyframes colors-2{0%{fill:yellow}50%{fill:red}65%{fill:orangered}95%{fill:gold}}");
            insetKeyframes.insertRule("@-webkit-keyframes colors-3{0%{fill:yellowgreen}50%{fill:turquoise}65%{fill:yellow}95%{fill:orange}}");
            insetKeyframes.insertRule("@keyframes colors-3{0%{fill:yellowgreen}50%{fill:turquoise}65%{fill:yellow}95%{fill:orange}}");

            insetKeyframes.insertRule("@-webkit-keyframes transform{10%{-webkit-transform:scale(0.75);transform:scale(0.75)}}");
            insetKeyframes.insertRule("@keyframes transform{10%{-webkit-transform:scale(0.75);transform:scale(0.75)}}");

            insetKeyframes.insertRule("@-webkit-keyframes transform-2{40%{-webkit-transform:scale(0.85);transform:scale(0.85)}60%{stroke-width:20}}");
            insetKeyframes.insertRule("@keyframes transform-2{40%{-webkit-transform:scale(0.85);transform:scale(0.85)}60%{stroke-width:20}}");
        } catch (e) {
            console.log(e);
        }
        return this;
    },
    setHtml: function (ele) {

        let _body = document.querySelector(this.box),



            loadingSvg = '<svg viewBox="0 0 120 120"version="1.0"><g id="circle"class="g-circles g-circles--v1"><circle id="12"transform="translate(35, 16.698730) rotate(-30) translate(-35, -16.698730) "cx="35"cy="16.6987298"r="10"></circle><circle id="11"transform="translate(16.698730, 35) rotate(-60) translate(-16.698730, -35) "cx="16.6987298"cy="35"r="10"></circle><circle id="10"transform="translate(10, 60) rotate(-90) translate(-10, -60) "cx="10"cy="60"r="10"></circle><circle id="9"transform="translate(16.698730, 85) rotate(-120) translate(-16.698730, -85) "cx="16.6987298"cy="85"r="10"></circle><circle id="8"transform="translate(35, 103.301270) rotate(-150) translate(-35, -103.301270) "cx="35"cy="103.30127"r="10"></circle><circle id="7"cx="60"cy="110"r="10"></circle><circle id="6"transform="translate(85, 103.301270) rotate(-30) translate(-85, -103.301270) "cx="85"cy="103.30127"r="10"></circle><circle id="5"transform="translate(103.301270, 85) rotate(-60) translate(-103.301270, -85) "cx="103.30127"cy="85"r="10"></circle><circle id="4"transform="translate(110, 60) rotate(-90) translate(-110, -60) "cx="110"cy="60"r="10"></circle><circle id="3"transform="translate(103.301270, 35) rotate(-120) translate(-103.301270, -35) "cx="103.30127"cy="35"r="10"></circle><circle id="2"transform="translate(85, 16.698730) rotate(-150) translate(-85, -16.698730) "cx="85"cy="16.6987298"r="10"></circle><circle id="1"cx="60"cy="10"r="10"></circle></g><use xlink:href="#circle"class="use"/></svg>';

        if(!_body){
            let div = document.createElement('div');

            div.innerHTML = loadingSvg;

            if(ele){//min-l-wrapper
                div.className = "min-l-wrapper";
                (ele).appendChild(div)
            }else {
                div.className = "l-wrapper";
                document.body.appendChild(div);
            }

        }

        //_body.innerHTML = loadingSvg;
    },
    close: function () {

        if(this.opt.ele){
            this.opt.ele.removeChild(document.querySelector(this.box))
        }else {
            if(document.querySelector(this.box)){
                document.body.removeChild(document.querySelector(this.box))
            }
        }



    }
}
/**
 * 用法
 * **/
/*$loading.init({
        next:function(){
            let that = this;
            ajax(that)//执行ajax操作
            // complete : function(){
            //  that.close();
        }
    })
    
    function ajax(e){
        e.close();//关闭操作
    };*/
