$("#company_imformation-btn").trigger("click");
$(function(){
    function textnull(thisclass){   
        let Unull = $(thisclass).val();
        if(Unull.length == 0){
            $(thisclass).focus();
            return false;
        }else{
            return  true;
        }
    }
    //联系人
    function textchines(thisclass){   // 正则表达式——中文名字
        let Utext = $(thisclass).val();
        let oldtext = $(thisclass).val().replace(/\s/g, '');
        let Thisterm = /^[\u4e00-\u9fa5]{2,4}$/;
        if(Thisterm.test(Utext)==true && Utext.length == oldtext.length){
            return true;
        }else if(Utext.length == ''){
            $(thisclass).focus();
            return  false;
        }else{
            return false;
        }
    } 
    //正则判断
    function textphone(thisclass){  //电话号码判断
        var Uphone = $(thisclass).val();
        var Tphone = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/;
        if(Tphone.test(Uphone) == false|| Uphone == ''){
            // $(thisclass).focus();
            return false;
        }else if(Tphone.test(Uphone)==true){
            return true;
        }
    }
    $(".park-name").blur(function(e){
		let park_name = $(".park-name").val();
		if (park_name.length !== 0) {
            $('.contact-name').focus();
		}
		return true;
    });
    $(".contact-name").blur(function(e){
		let Utext1 = $('.contact-name').val();
        let oldtext1 = $('.contact-name').val().replace(/\s/g, '');
        let Thisterm1 = /^[\u4e00-\u9fa5]{2,4}$/;
        if(Thisterm1.test(Utext1)==true && Utext1.length == oldtext1.length){
            $('.phone-tel').focus();
            return true;
        }else if(Utext1.length == ''){
            // alert('联系人不能为空');
            return  false;
        }else if(Thisterm1.test(Utext1)==false){
            // alert('请填写正确中文名');
            // $('.contact-name').focus();
            return false;
        }
    });
    $(".phone-tel").blur(function(e){
		var Uphone1 = $(".phone-tel").val();
        var Tphone1 = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/;
        if( Uphone1 == ''){
            return false;
        }else if(Tphone1.test(Uphone1) == false){
            // alert('请输入正确的手机号')
            // $(".phone-tel").focus();
            return false;
        }else if(Tphone1.test(Uphone1)==true){
            return true;
        }
	});
    $("#company_imformation-btn").on("click", function () {
        if(textnull('.park-name') == false || textchines('.contact-name') == false || textphone('.phone-tel') == false){
            if(textnull('.park-name') == false){
                let thistext = $('.park-name').val();
                if(thistext.length == 0){
                    alert('物业名称不能为空');
                }
            }else if(textchines('.contact-name') == false){
                let thistext = $('.contact-name').val();
                if(thistext.length == 0){
                    alert('联系人不能为空');
                }else if(textchines('.contact-name') == false){
                    alert('请填写正确中文名');
                }
            }else if(textphone('.phone-tel') == false){
                let thistext = $('.phone-tel').val();
                if(thistext.length == 0){
                    alert('手机号不能为空')
                }else if(textphone('.phone-tel') == false){
                    alert('请输入正确的手机号')
                }
            }
            
        }else if(textnull('.park-name') == true && textchines('.contact-name') == true && textphone('.phone-tel') == true){
            var park_name = $('.park-name').val();
            var contact_name = $('.contact-name').val();
            var phone_tel = $('.phone-tel').val();
            $.ajax({
 
            });
        }
    })
})
 // 回车键事件
 $(document).keypress(function (e) {
    if (e.which == 13) {
        $('#company_imformation-btn').click();
    }
});