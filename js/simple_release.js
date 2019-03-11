$(function(){
    function textnull(thisclass){   //不为空判断
        let Unull = $(thisclass).val();
        // console.log(Unull);
        if(Unull.length == 0){
            $(thisclass).css({'border':'1px solid #F52230'});
            return false;
        }else{
            $(thisclass).css({'border':'1px solid #5FCC29'});
            return true;
        }
    }
    function textphone(thisclass){  //手机号码判断
        let Uphone = $(thisclass).val();
        let Tphone = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/;
        if(Tphone.test(Uphone) == false|| Uphone == ''){
            $(thisclass).css({'border':'1px solid #F52230'});
            $('.thisp3').show();
            $('.thisp3').text('手机号码不能为空');
            return false;
        }else if(Tphone.test(Uphone)==true){
            $(thisclass).css({'border':'1px solid #5FCC29'});
            return true;
        }
    }
    function Yzm(thisclass){
        let yzm_val = $(thisclass).val();
        let yanzm =  /^[0-9]{6}$/;
        if (yzm_val == "" || !yanzm.test(yzm_val)) {
            $(thisclass).css({"border": "1px solid #F52230"});
            return false;
        }else if(yanzm.test(yzm_val) == true){
            $(thisclass).css({'border':'1px solid #5FCC29'});
            return true;
        }
    }
    /*获取验证码 60s后重试*/
    var ding = null;
    var ifclick = true;
    $(".sendYZM").click(function () {
        textphone('.phone');
        // textnull('')
                    var time = 30;
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
    });
    /*获取验证码 60s后重试结束*/
    // 点击提交
    $('.clickformbox4').click(function(){
        if( textnull('.company') == false || textnull('.contact') == false || textphone('.phone')== false || textnull('.crmformtitle') == false || Yzm('.yzm') == false ){
            if(textnull('.company') == false){
                let thistext = $('.company').val();
                if(thistext.length == 0){
                    $('.thisp1').show();
                    $('.thisp1').text('企业名称不能为空');
                }else if(textnull('.company') == false){
                    $('.thisp1').show();
                    $('.thisp1').text('企业名称格式错误');
                }
            }else if(textnull('.company') == true){
                $('.thisp1').hide();
            }
            if(textnull('.contact') == false){
                let thistext = $('.contact').val();
                if(thistext.length == 0){
                    $('.thisp2').show();
                    $('.thisp2').text('联系人不能为空');
                }else if(textnull('.contact') == false){
                    $('.thisp2').show();
                    $('.thisp2').text('联系人格式错误');
                }
            }else if(textnull('.contact') == true){
                $('.thisp2').hide();
            }
            if(textphone('.phone') == false){
                let thistext = $('.phone').val();
                if(thistext.length == 0){
                    $('.thisp3').show();
                    $('.thisp3').text('联系电话不能为空');
                }else{
                    $('.thisp3').show();
                    $('.thisp3').text('联系电话格式错误');
                }
            }else if(textphone('.phone') == true){
                $('.thisp3').hide();
            }
            if(textnull('.crmformtitle') == false){
                let thistext = $('.crmformtitle').val();
                if(thistext.length == 0){
                    $('.thisp4').show();
                    $('.thisp4').text('标题不能为空');
                }
            }else if(textnull('.crmformtitle') == true){
                $('.thisp4').hide();
            }
            if(Yzm('.yzm') == false){
                let thisyzm = $('.yzm').val();
                if(thisyzm.length == 0){
                    $('.thisp5').show();
                    $('.thisp5').text('验证码不能为空');
                }else{
                    $('.thisp5').show();
                    $('.thisp5').text('验证码格式错误');
                }
            }else if(Yzm('.yzm') == true){
                $('.thisp5').hide();
            }
        }else if(textnull('.company') == true || textnull('.contact') == true || textphone('.phone')== true || textnull('.crmformtitle') == true || Yzm('.yzm') ==  true){
            $('.thisp1').hide();$('.thisp2').hide();$('.thisp3').hide();$('.thisp4').hide();$('.thisp5').hide();
            //ajax()
            //表单提交
            // $('.clickformbox4').click(function(){
                var fullname = $('.company').val();//企业名称
                var contacts = $('.contact').val();//联系人
                var phone_num = $('..phone').val();//联系电话
                var trades = $('.position').val();//行业
                var title = $('.crmformtitle').val();//标题
                var description = $('.textArea').val();//补充描述
                var code = $('.yzm').val();//验证码
                $.ajax({
                    type:'post',
                    url:'/fast/publish',
                    data:{'fullname':fullname,'contacts':contacts,'phone_num':phone_num,'trades':trades,'title':title,'description':description,'code':code},
                    contentType: "application/x-www-form-urlencoded",
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                    },
                    success: function (res) {
                    console.log(res)
                        //alert(msg);
                        setTimeout(function () {
                            window.location.href = "/";
                        }, 1500);

                    },
                    error: function (xhr) {
                        console.log(xhr);
                    }
                });
            // })

            return true;
        }
    });

})