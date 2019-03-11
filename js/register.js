$(function(){
	var aa = true;
	var bb = false;
	$('input').click(function(){
		$(this).css({'border':'1px solid #198dff'});
		$(this).parent().find('i').addClass('color_blue');
	});
	
	//验证错误提示
   	errorInfo = function(id,type,message){
   		switch (type){
   			case 1:
   				$("#"+id+" .error_info").text(message);
   				$("#"+id+" .error_info").slideDown();
   				break;
   			case 2:
   				$("#"+id+" .error_info").slideUp();
   				break;
   			default:
   				break;
   		}
   		
   	}
	
	function Phone(id){
		var tel = $("#"+id+" .telphone").val();
        var phone = /^[1][3,4,5,7,8,9][0-9]{9}$/;
        if (tel == null || tel == "") {
            $("#"+id+" .telphone").css({"border": "1px solid #F52230"});
            errorInfo(id,1,'手机号不能为空！');
            aa = false;
        } else if (!phone.test(tel)) {
            $("#"+id+" .telphone").css({"border": "1px solid #F52230"});
            errorInfo(id,1,'请输入正确的手机号！');
            aa = false;
        } else {
            $("#"+id+" .telphone").css({"border": "1px solid #5FCC29"});
            aa = true;
        }
	}
	
	function Pwd(id) {
        var pwd_val = $(".pwd").val();
        var pwd = /^[A-Za-z0-9]([A-Za-z0-9._@]){5,15}$/;
        if(pwd_val == null || pwd_val == ""){
        	$(".pwd").css({"border": "1px solid #F52230"});
        	if (aa) {
        		errorInfo(id,1,'密码不能为空！');
        	}
        	aa = false;
        }else if (!pwd.test(pwd_val)) {
            $(".pwd").css({"border": "1px solid #F52230"});
            errorInfo(id,1,'密码有误！');
            aa = false;
        } else {
            $(".pwd").css({"border": "1px solid #5FCC29"});
            aa = true;
        }
    }
	
	function Yzm(id){
		var yzm_val = $(".yzm").val();
        var yanzm = /^[0-9]{6}$/;
        if (yzm_val == "" || !yanzm.test(yzm_val)) {
            $(".yzm").css({"border": "1px solid #F52230"});
            if(aa){
            	errorInfo(id,1,'请输入6位验证码！');
            }
            aa = false;
        } else {
            $(".yzm").css({"border": "1px solid #5FCC29"});
            aa = true;
        }
	}
	
	
	
	$("#pwd_login .telphone").blur(function(){
		Phone('pwd_login');
		$(this).parent().find('i').removeClass('color_blue');
	});
	
	$("#pwd_login .telphone").keyup(function(){
		var tel = $("#pwd_login .telphone").val();
        var phone = /^[1][3,4,5,7,8,9][0-9]{9}$/;
		if (phone.test(tel)) {
			$("#pwd_login .telphone").css({"border": "1px solid #5FCC29"});
			errorInfo('pwd_login',2,'');
		}
	});
	
	$(".pwd").blur(function () {
        Pwd('pwd_login');
        $(this).parent().find('i').removeClass('color_blue');
    });
    $('.pwd').keyup(function(){
    	var pwd_val = $(".pwd").val();
        var pwd = /^[A-Za-z0-9]([A-Za-z0-9._@]){5,15}$/;
        if (pwd.test(pwd_val)) {
        	$(".pwd").css({"border": "1px solid #5FCC29"});
        	errorInfo('pwd_login',2,'');
        }
    });
    
    $(".yzm").blur(function(){
    	Yzm('pwd_login');
    	$(this).parent().find('i').removeClass('color_blue');
    });
	$(".yzm").keyup(function(){
		var yzm_val = $(".yzm").val();
        var yanzm = /^[0-9]{6}$/;
        if (yanzm.test(yzm_val)) {
        	$(".yzm").css({"border": "1px solid #5FCC29"});
            errorInfo('pwd_login',2,'');
        }
	});
	
	$('.check_xy').click(function(){
		if ($('.check_xy i').eq(1).css("display") == 'none') {
			$('.check_xy i').eq(1).css('display','inline-block');
			$('.check_xy i').eq(0).hide();
			bb = true;
			errorInfo('pwd_login',2,'');
		} else{
			$('.check_xy i').eq(1).css('display','none');
			$('.check_xy i').eq(0).show();
			bb = false;
		}
	});
	
	/*获取验证码 60s后重试*/
    var ding = null;
    var ifclick = true;
    $(".sendYZM").click(function () {
    	let isYZ = $('#checkPhone').attr('data-status');
        Phone('pwd_login');
        Pwd('pwd_login');
//      let phone = $('#phone').val();
        if (aa && isYZ == 200) {
//          $.post('/sendPhone/1', {
//              phone: phone
//          }, function (res) {
//              if (res['error'] == 0) {
                    var time = 5;
                    if (ifclick == true) {
                        ding = setInterval(function () {
                            ifclick = false;
                            $(".sendYZM").text("已发送(" + time + "s)");
                            $(".sendYZM").css({"cursor": "not-allowed", "color": "rgba(0,0,0,0.65)"});
                            time--;
                            if (time == -2) {
                                ifclick = true;
                                clearInterval(ding);
                                $(".sendYZM").text("重新发送");
                                $(".sendYZM").css({"cursor": "pointer", "color": "#F52230"});
                            }
                        }, 1000);
                    }
//              }
//          });
        }else if(aa && isYZ != 200){
        	errorInfo('pwd_login',1,'请滑动验证块进行验证');
        }
    });
    /*获取验证码 60s后重试结束*/
   
   	/*注册*/
   	$('.pwd_login_btn').click(function(){
		Phone('pwd_login');//验证手机号
		Pwd('pwd_login');//验证密码
		let isYZ = $('#checkPhone').attr('data-status');
		Yzm('pwd_login');//验证验证码
		if (aa && isYZ == 200) {
			if(bb){
				//验证完成（数据处理）
				console.log('验证通过');
			}else{
				errorInfo('pwd_login',1,'请阅读并同意平台协议');
			}
		} else if(aa && isYZ != 200){
			errorInfo('pwd_login',1,'请滑动验证块进行验证');
		}
   	});
   	/*注册结束*/
   	
   	$(document).keypress(function (e) {
        // 回车键事件
        if (e.which == 13) {
	   		$('.pwd_login_btn').click();
        }
    });
   
});
