var topRefresh = function (option) {

    //插入样式
    var RefreshHtml = " #refreshLoading,#refreshLoadingEnd {margin: 20px auto 0 auto; width: 2px; height: 2px; border-radius: 1px; box-shadow: 0 -12px 0 1px #17b6ee, 0 12px 0 1px #17b6ee, -12px 0 0 1px #17b6ee, 12px 0 0 1px #17b6ee, -9px -9px 0 1px #17b6ee, 9px -9px 0 1px #17b6ee, -9px 9px 0 1px #17b6ee, 9px 9px 0 1px #17b6ee ; animation: refreshLoading 1.5s linear 0s infinite; -webkit-animation: refreshLoading 1.5s linear 0s infinite; -o-animation: refreshLoading 1.5s linear 0s infinite; -moz-animation: refreshLoading 1.5s linear 0s infinite; display: none; }";

    var cssEle = document.createElement("style");
    cssEle.type = "text/css";
    cssEle.appendChild(document.createTextNode(RefreshHtml));
    document.getElementsByTagName("head")[0].appendChild(cssEle);

    //插入@keyframes 动画效果
    //插入@keyframes 动画效果
    try{
        var insetKeyframes = document.styleSheets[0];
        insetKeyframes.insertRule("@keyframes refreshLoading { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }");
        insetKeyframes.insertRule("@-webkit-keyframes refreshLoading { from { -webkit-transform: rotate(0deg); } to { -webkit-transform: rotate(360deg); } }");
        insetKeyframes.insertRule("@keyframes refreshLoadingEnd { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }");
        insetKeyframes.insertRule("@-webkit-keyframes refreshLoadingEnd { from { -webkit-transform: rotate(0deg); } to { -webkit-transform: rotate(360deg); } }");
    }catch (e){

    }




    function hasScrollbar() {
        return document.getElementById(option.scrollContainer).scrollHeight > (document.getElementById(option.scrollContainer).innerHeight || document.getElementById(option.scrollContainer).clientHeight);
    }
    /**
     * 刷新添加必须是滚动条已经到顶部
     * **/
    var scrollType = true //初始化顶部状态
    var scrollBottomType = false //初始化底部部状态
    window.onload = function() {
        var scrollContainer = document.getElementById(option.scrollContainer);//滚动容器
        scrollContainer.onscroll = function() {
            var x = scrollContainer.scrollTop;
            var y = scrollContainer.scrollHeight;
            var z = scrollContainer.clientHeight;
            if(x == 0) {
                scrollType = true;
                scrollBottomType = false;
            }else if(x == y - z) {
                scrollBottomType = true;
                scrollType = false;
            }else{
                scrollType = false;
                scrollBottomType = false
            }

        }


    }
    var start,
        end,
        length,
        isLock = false,//是否锁定整个操作
        isCanDo = false,//是否移动滑块
        isTouchPad = (/hp-tablet/gi).test(navigator.appVersion), //验证客户端的设备类型
        isCanDoHeightEnd = 30;//滑块移动的高度初始化；判断从多少高度开始执行刷新操作
    isHasScrollbar = false;//是否出现滚动
    hasTouch = 'ontouchstart' in window && !isTouchPad;
    var obj = document.querySelector(option.container);
    var loading = document.getElementById("refreshLoading"); //顶部loading元素
    var loadingEnd = document.getElementById("refreshLoadingEnd"); //底部loading元素
    var offset = loading.clientHeight;
    var objparent = obj.parentElement;
    /*操作方法*/
    var fn =
        {
            //移动容器
            translate: function (diffs) {
                function moveTranslate(diff){
                    obj.style.webkitTransform = 'translate3d(0,' + diff + 'px,0)';
                    obj.style.transform = 'translate3d(0,' + diff + 'px,0)';
                }


                if(scrollType && diffs >= 0 && isHasScrollbar){
                    moveTranslate(diffs)
                }
                if(scrollBottomType && diffs <= 0 && isHasScrollbar){
                    moveTranslate(diffs)
                }



            },
            //设置效果时间
            setTransition: function (time) {
                obj.style.webkitTransition = 'all ' + time + 's';
                obj.style.transition = 'all ' + time + 's';
            },
            //返回到初始位置
            back: function () {
                loading.style.display = "none";
                loadingEnd.style.display = "none";
                fn.translate(0 - offset);
                //标识操作完成
                isLock = false;
            },
            addEvent: function (element, event_name, event_fn) {
                if (element.addEventListener) {
                    element.addEventListener(event_name, event_fn, false);
                } else if (element.attachEvent) {
                    element.attachEvent('on' + event_name, event_fn);
                } else {
                    element['on' + event_name] = event_fn;
                }
            }
        };

    fn.translate(0 - offset);
    fn.addEvent(obj, 'touchstart', start);
    fn.addEvent(obj, 'touchmove', move);
    fn.addEvent(obj, 'touchend', end);
    fn.addEvent(obj, 'mousedown', start);
    fn.addEvent(obj, 'mousemove', move);
    fn.addEvent(obj, 'mouseup', end);

    //滑动开始
    function start(e) {


        if(hasScrollbar()){
            isHasScrollbar = true;
        }else{
            isHasScrollbar = false;
        }

        if(!scrollType && !scrollBottomType){
            return false;
        }

        if ((objparent.scrollTop <= 0 && !isLock) ) {
            var even = typeof event == "undefined" ? e : event;
            //标识操作进行中
            isLock = true;

            isCanDo = true;


            //保存当前鼠标Y坐标
            try{
                start = hasTouch ? even.touches[0].pageY : even.pageY;
            }catch(e){
                //TODO handle the exception
            }

            //消除滑块动画时间
            fn.setTransition(0);
        }
        return false;
    }

    //滑动中
    function move(e) {
        if (objparent.scrollTop <= 0 && isCanDo) {
            var even = typeof event == "undefined" ? e : event;
            //保存当前鼠标Y坐标
            end = hasTouch ? even.touches[0].pageY : even.pageY;

            //设置滑块动画时间&移动滑块
            function setPrevent(_event){
                //_event.preventDefault();
                //消除滑块动画时间
                fn.setTransition(0);
                //移动滑块
                if ((end - start - offset) / 2 <= 150) {
                    length = (end - start - offset) / 2;
                    fn.translate(length);
                } else {
                    length += 0.3;
                    fn.translate(length);
                }
            }

            //下拉
            if (start < end && isHasScrollbar) {
                setPrevent(event);
                if(length >= isCanDoHeightEnd ){
                    loading.style.display = "block";
                }else{
                    loading.style.display = "none";
                }
            }else if(start > end && isHasScrollbar){//上滑
                setPrevent(event);
                //console.log(length)
                if(length < -isCanDoHeightEnd){
                    loadingEnd.style.display = "block";
                }else{
                    loadingEnd.style.display = "none";
                }
            }

        }
    }

    //滑动结束
    function end(e) {
        if (isCanDo) {
            isCanDo = false;
            //判断滑动距离是否大于等于指定值 && loading的状态是否为显示状态
            if (end - start >= offset && scrollType && loading.style.display == "block") {
                //设置滑块回弹时间
                fn.setTransition(1);
                //保留提示部分
                fn.translate(0);
                //执行回调函数
                if (typeof option.next == "function") {
                    option.next.call(fn, e);
                }
            }else if(end - start < offset && scrollBottomType && loadingEnd.style.display == "block"){
                //设置滑块回弹时间
                fn.setTransition(1);
                //保留提示部分
                fn.translate(0);
                //执行回调函数
                if (typeof option.slide == "function") {
                    option.slide.call(fn, e);
                }
            }else {
                //返回初始状态
                fn.back();
            }
        }
    }
}




/**
 * 吐司效果
 * **/
var Toast = {
    // 隐藏的 setTimeOut 引用
    hideTimeOut: null,
    RefreshHtml:true,
    /**
     * 初始化
     */
    init: function (position) {

        //插入样式
        if(this.RefreshHtml){
            var RefreshHtml = "._toast{z-index:999999;background: #FFFFFF; width: calc(100vw * 0.4); height: 40px; line-height: 40px; margin: 20px auto; text-align: center; border-radius: 5px; box-shadow: #D6D6D6 1px 1px 10px 1px; opacity: 1; font-size: 14px; position: fixed; left: calc( (100vw - 100vw * 0.4)/2); transition: opacity 1s ease-in-out; -moz-transition: opacity 1s ease-in-out; -webkit-transition: opacity 1s ease-in-out; }";

            var cssEle = document.createElement("style");
            cssEle.type = "text/css";
            cssEle.appendChild(document.createTextNode(RefreshHtml));
            document.getElementsByTagName("head")[0].appendChild(cssEle);
        }

        this.RefreshHtml = false;

        if(document.getElementsByClassName("toast").length > 0){
            for(var i=0;i<document.getElementsByClassName("toast").length;i++){
                //alert(1)
                document.body.removeChild(document.getElementsByClassName("toast")[i])
            }
        }

        var toastNode = document.createElement('section');
        toastNode.innerHTML = '<div style="display: inline-block;" class="_text">系统错误</div>';
        toastNode.id = '_toast'; // 设置id，一个页面有且仅有一个Toast
        toastNode.setAttribute('class', '_toast');   // 设置类名
        document.body.appendChild(toastNode);

        var domToastWaka = document.getElementById('_toast');
        if (domToastWaka) {

            switch (position) {
                case "bottom" :
                    domToastWaka.style.bottom = "60px";
                    break;
                case "top" :
                    domToastWaka.style.top = "60px";
                    break;
                case "center" :
                    domToastWaka.style.top = "45%";
                    break;
            }


        }

    },
    /**
     * 显示Toast
     * @param text 文本内容
     * @param type 类型 success error
     * @param duration 持续时间
     */
    show: function (text, position, duration) {
        this.init(position);
        // 确保上一次的 TimeOut 已被清空
        if (this.hideTimeOut) {
            clearTimeout(this.hideTimeOut);
            this.hideTimeOut = null;
        }
        if (!text) {
            console.error('text 不能为空!');
            return;
        }
        var domToastWaka = document.getElementById('_toast');
        if (!domToastWaka) {
            console.error('toast不存在!');
            return;
        }

        var domToastText = domToastWaka.querySelector('._text');   // 文字
        domToastText.innerHTML = text || '';

        domToastWaka.style.opacity = 1;
        // 不传的话默认2s
        var that = this;
        this.hideTimeOut = setTimeout(function () {
            domToastWaka.style.opacity = 0;
            that.hideTimeOut = null;    // 置 TimeOut 引用为空
        }, duration || 2000);




        var that = this;
        setTimeout(function () {
            that.hide();
        }, 2000);
    },
    /**
     * 隐藏 Toast
     */
    hide: function () {
        // 如果 TimeOut 存在
        if (this.hideTimeOut) {
            // 清空 TimeOut 引用
            clearTimeout(this.hideTimeOut);
            this.hideTimeOut = null;
        }
        var domToastWaka = document.getElementById('_toast');
        if (domToastWaka) {
            domToastWaka.style.opacity = 0;
        }
        if(document.getElementsByClassName("_toast").length > 0){
            for(var i=0;i<document.getElementsByClassName("_toast").length;i++){
                //alert(1)
                document.body.removeChild(document.getElementsByClassName("_toast")[i])
            }
        }
    }
};


/*
 * 用法
 */
// 1.1HTML
// <!--下拉刷新容器-注意高度设置-->
// <div  id="park_data_scroll" style="height: calc(100vh); overflow-y: auto ;padding-top:42px;" class="roomLevel3-ul mui-table-view mui-table-view-chevron">
//         <div class="loading">
//             <div id="refreshLoading"></div>
//         </div>
//         <div id="data_0" >
//           页面内容
//         </div>        
//         <div class="loading" style="height: 35px;">
//             <div id="refreshLoadingEnd"></div>
//         </div>
//  </div>
// <!--下拉刷新容器-->

// 2.1js
// topRefresh({
//     container: "#park_data_scroll",
//     scrollContainer:"park_data_scroll",
//     next: function(e) {
//         var selector_all = document.querySelectorAll('#data_0 .records_box');
//         var up_down_sliding = 0;
//             getAjax.isShow = true;
//         var id = 0;
//         if (selector_all.length > 0){
//             id = selector_all[0].dataset.id;
//             up_down_sliding = 2;
//         }
//         //执行ajax请求数据  下拉
//         getAjax(this,up_down_sliding,id,_type,park_id)
//     },
//     slide:function(e){
//         //执行ajax请求数据
//         var selector_all = document.querySelectorAll('#data_0 .records_box');
//         getAjax(this,1,selector_all[selector_all.length - 1].dataset.id,_type,park_id)
//     }
// });
// 2.2 ajax-请求
    // complete:function(){
    //     if(this != '' )
    //     this.back.call()
    // }