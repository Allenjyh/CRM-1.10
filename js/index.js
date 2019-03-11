$(function(){
	var aa = true,bb=true;
	var loginType;
	
	/*中部行业*/
	$('.main-top-l-index').hover(function(){},function(){
		$('.hy-all').hide();
	})
	
	$('.hangye-biaoti>li,.hy-all>li').hover(function(){
		$(this).addClass('active').siblings().removeClass('active');
	},function(){
		$(this).removeClass('active');
	})
	
	$('.showAll').hover(function(){
		$('.hy-all').show();
	},function(){
		
	})
	
	/*头》右部登录方式*/
	$('.loginType ul li').click(function(){
		$(this).addClass('active').siblings().removeClass('active');
		loginType = $(this).index();
		if (loginType==0) {
			$('.phoneLogin').show();
			$('.accountLogin').hide();
		} else{
			$('.phoneLogin').hide();
			$('.accountLogin').show();
		}
	})
	$('.loginType ul li').eq(0).click();
	
	
	/*表单验证*/
	$(".telphone,.yzm").focus(function () {
        $(this).css("border", "1px solid #198CFF");
    })
	
	function Phone(){
		var tel = $(".telphone").val();
        var phone = /^[1][3,4,5,7,8][0-9]{9}$/;
        if (tel == null || tel == "") {
            $(".telphone").css({"border": "1px solid #F52230"});
            aa = false;
        } else if (!phone.test(tel)) {
            $(".telphone").css({"border": "1px solid #F52230"});
            aa = false;
        } else {
            $(".telphone").css({"border": "1px solid #5FCC29"});
            aa = true;
        }
	}
	function Yzm(){
		var yzm_val = $(".yzm").val();
        var yanzm = /^[0-9]{4}$/;
        if (yzm_val == "" || !yanzm.test(yzm_val)) {
            $(".yzm").css({"border": "1px solid #F52230"});
            aa = false;
        } else {
            $(".yzm").css({"border": "1px solid #5FCC29"});
            aa = true;
        }
	}
	function Account(){
		var acc = $(".account").val();
        if (acc == null || acc == "") {
            $(".account").css({"border": "1px solid #F52230"});
            bb = false;
        }else {
            $(".account").css({"border": "1px solid #5FCC29"});
            bb = true;
        }
	}
	function Pwd(){
		var yzm_val = $(".pwd").val();
        var yanzm = /^[0-9]{6}$/;
        if (yzm_val == "" || !yanzm.test(yzm_val)) {
            $(".pwd").css({"border": "1px solid #F52230"});
            bb = false;
        } else {
            $(".pwd").css({"border": "1px solid #5FCC29"});
            bb = true;
        }
	}
	
	$(".telphone").blur(function () {
        Phone();
    })

    $(".yzm").blur(function () {
       Yzm();
    });
    
    $(".account").blur(function () {
       Account();
    });
    
    $(".pwd").blur(function () {
       Pwd();
    });
    
	/*获取验证码 60s后重试*/
    var ding = null;
    var ifclick = true;
    $(".sendYZM").click(function () {
    	Phone();
    	if (aa) {
    		var time = 60;
	        if (ifclick == true) {
	            ding = setInterval(function () {
	                ifclick = false;
	                $(".sendYZM").text(time + "s 重试");
	                $(".sendYZM").css({"cursor": "not-allowed", "color": "rgba(0,0,0,0.65)"});
	                time--;
	                if (time == -2) {
	                    ifclick = true;
	                    clearInterval(ding);
	                    $(".sendYZM").text("重新获取");
	                    $(".sendYZM").css({"cursor": "pointer", "color": "#F52230"});
	                }
	            }, 1000);
	            /*
	             * 这里写发送验证码的功能
	             * */
	        }
    	}
        
    });
    /*获取验证码 60s后重试结束*/
   
    /*选择账号*/
    var  seleUser = 0;
  	$('.sele_user ul li').click(function(){
  		seleUser = $(this).index();
  		$(this).addClass("active").siblings().removeClass("active");
  	})
  	$('.sele_user ul li').eq(0).click();
    
   	/*提交表单*/
   	$('.noLogin demand').submit(function(){
   		if (loginType == 0) {//手机登录
   			Phone();
   			Yzm();
   			if (aa) {
   				$('.temp').show();
   				$('.sele_user').show();
   				return false;
	   		} else{
	   			return false;
	   		}
   		} else{//账号密码登录
   			Account();
   			Pwd();
   			if (bb) {
   			
	   		} else{
	   			return false;
	   		}
   		}
   	})
   	/*提交表单结束*/
   	
   	/*确定账号按钮*/
   	$(".sele_user_ok").click(function(){
   		$('.temp').hide();
   		$('.sele_user').hide();
   		console.log(seleUser);
   	})
   	
   	
   	$('.login-btn').click(function(){//模拟点击提交表单
   		$(".noLogin input[type='submit']").click();
   	})
	/*表单验证结束*/
	
	/*自动登录*/
	var zddl=0;
	$('.zddl').click(function(){
		zddl++;
		if (zddl%2==1) {
			$('.zddl i').removeClass('icon-icon-');
			$('.zddl i').addClass('icon-duoxuankuang1');
			$('.zddl i').css("color","#198CFF");
			$('.zddl-check').prop("checked",true);
		} else{
			$('.zddl i').addClass('icon-icon-');
			$('.zddl i').removeClass('icon-duoxuankuang1');
			$('.zddl i').css("color","rgba(0,0,0,0.45)");
			$('.zddl-check').prop("checked",false);
		}
	})
	
	
	
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
		var aa = document.querySelector('.wysq');
		var module1 = aa.querySelectorAll('.zome-introduce');
		console.log(module1.length);
		for (var i=0;i<module1.length; i++) {
			$clamp(module1[i], {clamp: 3});
		} 
	}else if(browser.versions.webKit){ /*webKit内核*/
		var aa = document.querySelector('.wysq');
		var module1 = aa.querySelectorAll('.zome-introduce');
		for (var i=0;i<module1.length; i++) {
			$clamp(module1[i], {clamp: 3});
		}
	}else{/*IE,webkit以外的浏览器*/
		var aa = document.querySelector('.wysq');
		var module1 = aa.querySelectorAll('.zome-introduce');
		console.log(module1.length);
		for (var i=0;i<module1.length; i++) {
			$clamp(module1[i], {clamp: 3});
		} 
	}
})
