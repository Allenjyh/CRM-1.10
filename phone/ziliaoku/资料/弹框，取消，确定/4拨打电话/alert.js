var alertObj = {
    oAlert: function (opts, callBack) {
        var zIndex = 1000;
        $("body").append("<div class='o-alert-mask'></div>")
        // 设置默认参数
        var opt = {
            'style': 'wap', //移动端和PC端
            'title': '', //标题
            'content': '', //内容
            'contentTextAlign': 'center', //内容对齐方式
            'width': '300px', //宽度
            'height': 'auto', //高度
            'padding': '',
            'minWidth': '0', //最小宽度
            "className": '', //添加类名
            'position': 'fixed', //定位方式
            'animateType': 'scale',
            'modal': false, //是否存在蒙层
            'isModalClose': false, //点击蒙层是否关闭
            'bodyScroll': false, //是否关闭body的滚动条
            'closeTime': 3000, //当没有按钮时关闭时间
            "buttons": {}, //按钮对象</pre>
        }

        // 参数合并
        var option = $.extend({}, opt, opts);

        var dialog = {}

        dialog.time = 450; //动画关闭时间
        dialog.init = function () {
            dialog.framework();
        }

        // 事件处理
        var isHaveTouch = "ontouchend" in document ? true : false;
        if (isHaveTouch) {
            dialog.event = 'touchstart';
        } else {
            dialog.event = 'click';
        }

        var $modal = $("<div class='alert-modal'>")
        var $container = $("<div class='alert-container animated'>");
        var $title = $("<div class='alert-title'>" + option.title + "</div>");
        var $content = $("<div class='alert-content'>");
        var $buttonBox = $("<div class='alert-btn-box'>");
        var $closeBtn = $("<div class='alert-btn-close'>×</div>");


        if (option.content[0].nodeType == 1) {
            var $newContent = option.content.clone();
            $content.append($newContent)
        } else {
            $content.html(option.content);
        }

        dialog.framework = function () {

            dialog.buttons = [];
            for (var key in option.buttons) {
                dialog.buttons.push(key);
            }
            dialog.buttonsLength = dialog.buttons.length;

            $container.append($title)
                .append($content);
            if (callBack) {
                callBack();
            }
            if (option.style == 'pc') {
                $container.append($closeBtn).addClass('pcAlert');
            }

            if (option.modal || option.modal == 'true') {
                $('body').append($modal)
                option.bodyScroll && $('body').css('overflow', 'hidden');
            }
            $('body').append($container)

            // 设置内容的对齐方式
            $content.css({
                'text-align': option.contentTextAlign
            })

            if (option.minWidth != 0) {
                if (parseInt(option.minWidth) > parseInt($container.css('width'))) {
                    option.width = option.minWidth;
                } else {
                    option.width = parseInt($container.css('width')) + "px";
                }
            }
            $modal.css('position', option.position);
            $modal.css('z-index', zIndex);

            ++zIndex;

            if (option.position == 'fixed') {
                $container.css({
                    'position': option.position,
                    'left': '50%',
                    'top': '50%',
                    'z-index': zIndex,
                })
            }
            if (option.position == 'absolute') {
                $container.css({
                    'position': option.position,
                    'left': $(window).width() / 2,
                    'top': $(window).height() / 2 + $(window).scrollTop(),
                    'z-index': zIndex,
                })
            }

            $container.css('width', option.width);
            $container.css('height', option.height);

            if (option.width == 'auto') {
                $container.css('width', $container[0].clientWidth + 10);
            }

            if (parseInt($(window).height()) <= parseInt($container.css('height'))) {
                $container.css('height', $(window).height());
            }

            // 设置class
            (!!option.className) && $container.addClass(option.className);

            // 设置button内容
            for (var key in option.buttons) {
                var $button = $("<p class='alert-btn-p'>" + key + "</p>");
                if (option.style != 'pc') {
                    if (key == "确定") {
                        $button.css({
                            'background': 'linear-gradient(180deg,rgba(24,189,247,1) 0%,rgba(10,136,236,1) 100%)',
                            'color': '#FFFFFF'
                        })
                    }
                    $button.css({
                        'width': Math.floor(($container[0].clientWidth) / dialog.buttonsLength),
                    })
                }
                //绑定点击后的事件
                $button.bind(dialog.event, option.buttons[key]);
                $buttonBox.append($button);

            }


            if (dialog.buttonsLength > 0) {
                $container.append($buttonBox);
            }

            if (dialog.buttonsLength <= 0 && option.title == '') {
                $container.addClass('alert-container-black');
            }

            // 设置定位
            $container.css({
                'margin-left': -parseInt($container.css('width')) / 2,
                'margin-top': -parseInt($container.css('height')) / 2,
            });

            if (option.animateType == 'scale') {
                $container.addClass('bounceIn');
            }

            if (option.animateType == 'linear') {
                $container.addClass('linearTop');
            }

            isSelfClose();

        };

        // 判断是否满足自动关闭的条件
        function isSelfClose() {
            if (dialog.buttonsLength <= 0 && option.style != 'pc') {
                setTimeout(function () {
                    $container.fadeOut(300);
                    $modal.fadeOut(300);
                    option.bodyScroll && $('body').css('overflow', 'auto');
                }, option.closeTime)
            }
        }

        dialog.toggleAnimate = function () {
            if (option.animateType == 'scale') {
                return $container.removeClass('bounceIn').addClass('bounceOut');
            } else if (option.animateType == 'linear') {
                return $container.removeClass('linearTop').addClass('linearBottom');
            } else {
                return $container;
            }
        }

        dialog.close = function () {
            dialog.toggleAnimate().fadeOut(dialog.time);
            $modal.fadeOut(dialog.time);
            option.bodyScroll && $('body').css('overflow', 'auto');
            $($container).remove()
            $(".o-alert-mask").remove();

        };

        option.style == 'pc' && $closeBtn.bind(dialog.event, dialog.close);
        option.isModalClose && $modal.bind(dialog.event, dialog.close);

        dialog.destroy = function () {
            dialog.toggleAnimate().fadeOut(dialog.time);
            setTimeout(function () {
                $container.remove();
                $modal.remove();
                option.bodyScroll && $('body').css('overflow', 'auto');
            }, dialog.time)
        }
        dialog.show = function () {

            $modal.css('z-index', zIndex);

            ++zIndex;

            $container.css({
                'z-index': zIndex,
            })

            if (option.animateType == 'scale') {
                $container.fadeIn().removeClass('bounceOut').addClass('bounceIn');
            } else if (option.animateType == 'linear') {
                $container.fadeIn().removeClass('linearBottom').addClass('linearTop');
            } else {
                $container.fadeIn()
            }

            if (option.position == 'fixed') {
                $container.css({
                    'top': $(window).height() / 2 + $(window).scrollTop(),
                })
            }

            $modal.fadeIn();
            option.bodyScroll && option.modal && $('body').css('overflow', 'hidden');
            isSelfClose();
        }

        $(window).resize(function () {
            if (($(".alert-container").length > 0 && opts.width && parseInt(opts.width) > 300) || ($(".alert-container").length > 0 && opts.minWidth)) {
                $(".alert-container").css({
                    'width': $(window).width() + "px",
                    'height': $(window).height() + "px",
                    'margin-left': -$(window).width() / 2,
                    'margin-top': -$(window).height() / 2
                })
            }
        })


        dialog.init();

        return dialog;

    }
};


/*
 * 用法
 */
// function rentPay(_this,state,order_id){
               
//     var recor = alertObj.oAlert({
//         style:'wap',
//         title:(state == 0 ? '付款' : '收款' ),
//         content : (state == 0 ? '是否确认已付款？' : "是否确认收款？" ),
//         buttons :{
//             '取消' : function(){
//                 recor.close();
//             },
//             '确定' : function(){
//                 // $loading.init({
//                 //     next: function (e) {
//                 //         var _that = e;
//                         $.ajax({
                            
//                         })
//                     // }
//                 // })
//             }
//         }
//     })
// }