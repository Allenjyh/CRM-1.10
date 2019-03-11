$(function(){
	// 多选框
    var jj =0;
    $('.thischeckbox1').click(function(){
        jj++;
        if(jj%2 ==0){
            // 不变色
            $('.thischeckbox1').removeClass('icon-duoxuankuang1');
            $('.thischeckbox1').addClass('icon-icon-');
            $('.thischeckbox1').css({'color':'rgba(0,0,0,.45)'});
            $('.thisbox1').click();
            // console.log('3'+$('.thisbox1').is(':checked'));
        }else{
            // 变蓝色
            $('.thischeckbox1').removeClass('icon-icon-');
            $('.thischeckbox1').addClass('icon-duoxuankuang1');
            $('.thischeckbox1').css({'color':'#1A8CFF'});
            $('.thisbox1').click();
            // console.log('4'+$('.thisbox1').is(':checked'));
        }
    })
    /*获取验证码 60s后重试结束*/
    var ding1 = null;
    var ifclick1 = true;
    $(".thisYZM1").click(function(){
        var time1 = 10;
        if (ifclick1==true) {
            ding1 = setInterval(function(){
                ifclick1 = false;
                $(".thisYZM1").text(time1+"s 重试");
                $(".thisYZM1").css({"cursor":"not-allowed","color":"rgba(0,0,0,0.65)"});
                
                time1--;
                if(time1==-2){
                    ifclick1 = true;
                    clearInterval(ding1);
                    $(".thisYZM1").text("重新获取");
                    $(".thisYZM1").css({"cursor":"pointer","color":"#198cff"});
                }
            },1000);
        } 
    })
    /*获取验证码 60s后重试结束*/
    //正则判断
    function textphone(thisclass){  //电话号码判断
        var Uphone = $(thisclass).val();
        var Tphone = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/;
        if(Tphone.test(Uphone) == false|| Uphone == ''){
            $(thisclass).css({'border':'1px solid #F52230'});
            return false;
        }else if(Tphone.test(Uphone)==true){
            $(thisclass).css({'border':'1px solid #5FCC29'});
            return true;
        }
    }
    function textnum(thisclass){   //六位验证码判断
        var Unum = $(thisclass).val();
        var Tnum = /^\d{6}$/;
        if(Tnum.test(Unum) == false || Unum == ''){
            $(thisclass).css({'border':'1px solid #F52230'});
            return false;
        }else if(Tnum.test(Unum) == true){
            $(thisclass).css({'border':'1px solid #5FCC29'});
            return true;
        }
    }

    // 正则判断两个表单
    $('.register2').click(function(){
    	if(textphone('.register_input8') == false || textnum('.register_input9') == false){
    		alert(false);
    	}else if(textphone('.register_input8') == true && textnum('.register_input9') == true){
    		alert(true);
    	}
    })
})