function yizuSide(opt,callBack){

    function addEvent(dom,type,fn){
        if(dom.addEventListener){
            dom.addEventListener(type,fn,false);
        }else if(dom.attachEvent){
            dom.attachEvent('on'+type,fn);
        }else{
            dom['on' + type] = fn;
        }
    }

    function setCss(ele,obj){
        for(var i in obj){
            ele.style[i] = obj[i];
        }
    }

    function according(){
        if(document.querySelector(".side-bar").className.indexOf("slide-left") < 0){
            document.querySelector(".slide-mask").style.display = "block";

            document.querySelector('.side-bar').classList.add('slide-left');
            document.querySelector('.side-bar').classList.remove("slide-right");


        }else {
            document.querySelector(".slide-mask").style.display = "none";

            document.querySelector('.side-bar').classList.remove('slide-left');
            document.querySelector('.side-bar').classList.add("slide-right");
        }
    }
    var _ele = document.querySelector(opt.ele);
    addEvent(_ele,'click',function(){
        according();
    })


    /**
     * 创建元素
     * -- 蒙版 slide-mask
     * -- 内容盒子 side-bar
     * **/

    //蒙版
    if(!document.querySelector(".slide-mask")){
        var _mask = document.createElement("div");

        setCss(_mask,{
            position: 'fixed',
            left: 0,
            top: 0,
            zIndex: 10,
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            textAlign: 'center',
            fontSize: '14px',
            backgroundColor: 'rgba(90, 99, 108, 0.4)',
            display: 'none'
        })
        _mask.className = "slide-mask";
        document.body.appendChild(_mask);
        addEvent(_mask,'click',function(){
            according();
        })
    }

    //内容盒子
    if(!document.querySelector(".side-bar")){
        //插入样式
        var cssText = ['.side-bar {',
            '        width: 287px;',
            '        height: 100%;',
            '        min-width: 120px;',
            '        display: inline-block;',
            '        margin: 0px;',
            '        right: -287px;',
            '        position: fixed;',
            '        z-index: 11;',
            '        top: 0;',
            '    }',
            '    .side-bar-right{',
            '        width: 287px;',
            '        display: inline-block;',
            '        height: 100%;',
            '        float: left;',
            '    }',
            '    .btn{',
            '        background-color: green;',
            '    }',
            '    .side-bk{',
            '        background-color: #ffffff;',
            '    }',
            '    .slide-left{',
            '        transform: translate(-287px,0px);',
            '        transition-delay: 0s;',
            '        transition-timing-function: ease;',
            '        transition-duration: .5s;',
            '    }',
            '    .slide-right{',
            '        transform: translate(-0px,0px);',
            '        transition-delay: 0s;',
            '        transition-timing-function: ease;',
            '        transition-duration: .5s;',
            '    }',
            '    ',
            '    .slide-time{',
            '        width: 267px;',
            '        margin: 0 auto;',
            '        border-collapse: separate;',
            '        border-spacing: 0px;',
            '        margin: 0 auto;',
            '    }',
            '    .slide-time>caption{',
            '        height: 40px;',
            '        line-height: 40px;',
            '        text-align: left;',
            '        font-size: 13px;',
            '    }',
            '    .slide-time tbody tr td{',
            '       text-align: center;',
            '    }',
            '    .slide-time tbody tr td input{',
            '        border: 0;',
            '        outline: none;',
            '        text-align: center;',
            '        padding: 5px 0;',
            '        width: 100%;',
            '        border-bottom: 1px solid #CCCCCC;',
            '    }',
            '    .slide-time tbody tr td{',
            '        height: 40px;',
            '        border-bottom: 1px solid #EFEFEF;',
            '    }',
            '    .or-centen{',
            '        width: 100%;',
            '        position: absolute;',
            '        bottom: 0;',
            '    }',
            '    .or-table{',
            '        width: 92%;',
            '        border-collapse:separate;',
            '        border-spacing:0px;',
            '        margin: 0 auto;',
            '    }',
            '    .or-table tr td{',
            '        padding: 13px 0;',
            '    }',
            '    .or-table tr td:first-child{',
            '        text-indent: 15px;',
            '    }',
            '    .or-btn{',
            '        width:330px;',
            '        height:44px;',
            '        background:linear-gradient(180deg,rgba(24,189,247,1) 0%,rgba(10,136,236,1) 100%);',
            '        text-align: center;',
            '        line-height: 44px;',
            '        margin: 0 auto;',
            '        color: #FFFFFF;',
            '        font-size: 20px;',
            '        box-shadow: #CBE5F9 1px 1px 30px 1px;',
            '    }'].join("");


        var cssEle = document.createElement("style");
        cssEle.type = "text/css";
        cssEle.appendChild(document.createTextNode(cssText));
        document.getElementsByTagName("head")[0].appendChild(cssEle);

        var _sideBar = document.createElement("div");
        _sideBar.className = "side-bar";

        var _sideBarRight = document.createElement("div");
        _sideBarRight.className = "side-bk side-bar-right";


        var _content = ['<table class="slide-time">',
            '            <caption>时间区间筛选</caption>',
            '            <tbody>',
            '            <tr>',
            '                <td class="_starting-time">',
            '                    <input id="starting-time" class="starting-time" style="width: 105px;background: #fff;" type="text" placeholder="起始时间" readonly>',
            '                </td>',
            '                <td style="width: 57px;">——</td>',
            '                <td class="_ending-time">',
            '                    <input id="ending-time" class="ending-time" style="width: 105px;background: #fff;" type="text" placeholder="终止时间" readonly>',
            '                </td>',
            '            </tr>',
            '            </tbody>',
            '        </table>',
            '        <div class="or-centen">',
            '            <table class="or-table" style="width: 100%;">',
            '                <tr>',
            '                    <td style="width: 50%;padding: 0;"><div  class="or-btn or-closeTime" style="width: 100%;color: #1A8CFF;background: #FFFFFF;">重置</div></td>',
            '                    <td style="width: 50%;padding: 0;"><div  class="or-btn or-searchTime" style="width: 100%;">确定</div></td>',
            '                </tr>',
            '            </table>',
            '        </div>'].join("");


        _sideBarRight.innerHTML = _content;
        _sideBar.appendChild(_sideBarRight);
        document.body.appendChild(_sideBar);


    };
    /**
     * 终止时间不能比起始时间小
     * 起始时间不能比终止时间大
     * 暴露已选时间
     * **/
    if(document.querySelector(".or-searchTime")){

        addEvent(document.querySelector(".starting-time"),'change',function(e){
            document.querySelector(".ending-time").min = e.target.value;
        });

        addEvent(document.querySelector(".ending-time"),'change',function(e){
            document.querySelector(".starting-time").max = e.target.value;
        });

        addEvent(document.querySelector(".or-searchTime"),'click',function(){
            if(callBack && typeof callBack == "function"){
                
                callBack(document.querySelector(".starting-time").value,document.querySelector(".ending-time").value,according);
            }
        })

        addEvent(document.querySelector(".or-closeTime"),'click',function(){
            document.querySelector(".starting-time").value = "";
            document.querySelector(".ending-time").value = "";
        })

    }

}

/**
 * 应用 
 * 
 * // 筛选 页面上class=".select"
        yizuSide({ele:".select",width:"287"},function(star,end,fn){

        if(new Date(star).getTime() > new Date(end).getTime()){
            alert("开始时间不能大于结束时间",function(){
                $("#ending-time").val();
            })
            return;
        }

        fn();

        let _star = Date.parse(star)/1000 - 28800;
        let _end = Date.parse(end)/1000 +57599;
        // if(_star && _end)
        // getAjax("",0,0,park_id,_star,_end)
        });
 */