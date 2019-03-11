$(function(){
	/*头部导航*/
	$('.header-2-l>ul li').click(function(){
		$(this).addClass('active').siblings().removeClass('active');
	})
	
	// 点击回到顶部
	$('.gototop').click(function () {
        $('body,html').animate({scrollTop: 0}, 1000);
    })
	
	$('.clickSM').click(function(){
		if ($('.thisSM').css('display') == 'none') {
			$('.tishiyu').fadeOut();
			$('.thisSM').fadeIn(500);
		} else{
			$('.thisSM').fadeOut(500);
		}
		
	});
	
	$('.header-2-r .select_bt').click(function(){
		if ($('.header-2-r .select_info').css('display') == 'none') {
			$('.header-2-r .select_info').slideDown();
		}else{
			$('.header-2-r .select_info').slideUp();
		}
	});
	
	$('.select_info li').click(function(){
		var selected = $(this).index();
		$('.select_cont').text($(this).text());
		$('.header-2-r .select_info').slideUp();
		console.log(selected);
	});
	
	/*上，中，下午好，晚上好*/
	function timess(){
		var mydate = new Date();  
	   	var thisTime = mydate.getHours();
	 	if (thisTime>=3 && thisTime<=11) {
	 		$('.hours span').eq(0).show().siblings().hide();
	 		$('.hours1 span').eq(0).show().siblings().hide();
	 	} else if (thisTime>=12 && thisTime<14) {
	 		$('.hours span').eq(1).show().siblings().hide();
	 		$('.hours1 span').eq(1).show().siblings().hide();
	 	} else if(thisTime>=14 && thisTime<18){
	 		$('.hours span').eq(2).show().siblings().hide();
	 		$('.hours1 span').eq(2).show().siblings().hide();
	 	}else{
	 		$('.hours span').eq(3).show().siblings().hide();
	 		$('.hours1 span').eq(3).show().siblings().hide();
	 	}
 	}
	timess();
	setInterval(function () {
		timess();
	},60000);
 	/*上，中，下午好，晚上好   结束*/
 	
 	$('.logged').hover(function(){
 		$('.isLogin').stop();
 		$(this).find('.isLogin').slideDown();
 	},function(){
 		$('.isLogin').stop();
 		$(this).find('.isLogin').slideUp();
 	});
 	
 	
	
	/*弹框禁止滚动条滚动*/
    //阻止浏览器事件
    function disabledMouseWheel() {  
           document.addEventListener('DOMMouseScroll', scrollFunc, false);  
           document.addEventListener('mousewheel',scrollFunc,false);
    }
    //取消阻止浏览器事件
    function cancelDisMouseWheel(){
           document.removeEventListener('DOMMouseScroll',scrollFunc,false);
           document.removeEventListener('mousewheel',scrollFunc,false);
    }  
    function scrollFunc(evt) {  
           evt = evt || window.event;  
            if(evt.preventDefault) {  
                // Firefox  
                evt.preventDefault();  
                evt.stopPropagation();  
                } else{  
                // IE  
                evt.cancelBubble=true;  
                evt.returnValue = false;  
        }  
             return false;  
    }
   
    /*判断是哪种内核浏览器*/
	var browser={
	    versions:function(){
	        var u = navigator.userAgent, app = navigator.appVersion;
	        return {
	            trident: u.indexOf('Trident') > -1, //IE内核
	            presto: u.indexOf('Presto') > -1, //opera内核
	            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
	            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
	            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
	            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
	            android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
	            iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
	            iPad: u.indexOf('iPad') > -1, //是否iPad
	            webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
	            weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
	            qq: u.match(/\sQQ/i) == " qq" //是否QQ
	        };
	    }(),
	    language:(navigator.browserLanguage || navigator.language).toLowerCase()
	}
	

	if(browser.versions.trident){ /*IE浏览器*/
	}else if(browser.versions.webKit){ /*webKit内核*/
	}else{/*IE,webkit以外的浏览器*/
		$('.sousuo').css('top','6px');
		$('.select_box').css('top','-1px');
	}
 	

		//对话框开始
    /*	调用对话框
        objname = new newsconfirmPopup('标题','内容');
        objname.trigger(); 
        tit 弹窗的标题
        content 弹窗的内容

        newsconfirmbtnqding 确定按钮
    */
    newsconfirmPopup = function(tit, content) {
    	let obj = new Object;
    	obj.tit = tit;
    	obj.content = content;
    	obj.trigger = function(){
    		$('.newsconfirmbox').show();
            $('.temp').show();
            $('.newsconfirmtext').text(tit);
            $('.newsconfirmp2').text(content);
    	}
    	return obj;
    }

    /*
        newsconfirmClose() 调用关闭对话框的方法
    */

    /*
		侧边弹出提示框 调用方法
		有两种样式 1：通过，蓝色 2：失败，红色 
		objname = new noticeappen('1','标题','内容');
		objname.trigger();
    */
    noticeappen = function (number, thisnoticetit, thiscontent) {
    	let obj = new Object();
    	obj.number = number;
    	obj.thisnoticetit = thisnoticetit;
    	obj.thiscontent = thiscontent;
    	obj.trigger=function(){
    		$('.noticebigbox').show();
            var notice = '<div class="Noticebox">'
                + '<p class="noticep1 clear">'
                + '<span class="noticetit thisnotice' + number + '"><i class="iconfont iconfontthis"></i>' + thisnoticetit
                + '</span>'
                + '<span class="iconfont icon-cuo1 noticeicon"></span>'
                + '</p>'
                + '<p class="noticep2">'
                + thiscontent
                + '</p>'
                + '</div>';
            $('.noticebigbox').append(notice);
            // 状态表情
            $('.thisnotice1 i').addClass('icon-smile');
            $('.thisnotice2 i').addClass('icon-meh');
    	}
    	return obj;
    }
    /*
        第一种样式
        tipsPopup(number,thiscontent)；
        number 状态编号 1：通过 2：错误 3：警告 4：普通
        举个栗子：
        objname = new tipsPopup(3,'抱歉，申请加入企业不通过，请联系客服。');
        objname.trigger();
    */
    tipsPopup = function(number, thiscontent) {
    	let obj = new Object();
    	obj.number = number;
    	obj.thiscontent = thiscontent;
    	obj.trigger = function(){
    		$('.tipsPopupbigbox').show();
            var tipsbox = '<div class="thistips tipsPopup' + number + '">'
                + '<p>'
                + '<i class="iconfont"></i>'
                + '<span>' + thiscontent + '</span>'
                + '<span class="iconcuo iconfont icon-cuo1"></span>'
                + '</p>'
                + '</div>';
            $('.tipsPopupbigbox').append(tipsbox);
            $('.tipsPopup1 i').addClass('icon-check-circle-fill');
            $('.tipsPopup2 i').addClass('icon-close-circle-fill');
            $('.tipsPopup3 i').addClass('icon-info-circle-fill');
            $('.tipsPopup4 i').addClass('icon-warning-circle-fill');
    	}
        return obj;
    }
    /*
        第二种样式
        tipsPopup(number,thiscontent)；
        number 状态编号 1：通过 2：错误 3：警告 4：普通
        再举个栗子：
        objname = new tipsPopup2(3,'抱歉，申请加入企业不通过，请联系客服。');
        objname.trigger();
    */
    tipsPopup2 = function(number, thiscontent) {
    	let obj = new Object();
    	obj.number = number;
    	obj.thiscontent = thiscontent;
    	obj.trigger = function(){
    		$('.tipsPopupbigbox').show();
            var tipsbox = '<div class="thistips tipsPopup' + number + '">'
                + '<p>'
                + '<i class="iconfont"></i>'
                + '<span>' + thiscontent + '</span>'
                + '<span class="iconcuo">不再提醒</span>'
                + '</p>'
                + '</div>';
            $('.tipsPopupbigbox').append(tipsbox);
    	}
        return obj;
    }
});