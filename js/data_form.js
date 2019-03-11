$(function(){
	$('.shangchuan1').click(function(){
		$('.filesfz1').click();
	})
	$('.shangchuan2').click(function(){
		$('.filesfz2').click();
	})

    $(".filesfz1").change(function () {
        run(this,'.sfzbase1', function (data) {
            $('.shangchuan1').attr('src', data);
        });
    });
    $(".filesfz2").change(function () {
        run(this,'.sfzbase2', function (data) {
            $('.shangchuan2').attr('src', data);
        });
    });
	function run(input_file,textval, get_data) {
        /*input_file：文件按钮对象*/
        /*get_data: 转换成功后执行的方法*/
        if (typeof (FileReader) === 'undefined') {
            alert("抱歉，你的浏览器不支持 FileReader!请更换浏览器~");
        } else {
            try {
                /*图片转Base64 核心代码*/
                var file = input_file.files[0];
                //这里我们判断下类型如果不是图片就返回 去掉就可以上传任意文件
                if (!/image\/\w+/.test(file.type)) {
                    alert("请确保文件为图像类型");
                    return false;
                }
                var reader = new FileReader();
                reader.onload = function () {
                    get_data(this.result);
                    $(textval).val(this.result);
                }
                reader.readAsDataURL(file);
            } catch (e) {
                alert('图片转Base64出错啦！' + e.toString())
            }
        }
    }

    // 正则判断  职位和电话号码只判断了不为空~~
    function textchines(thisdiv){   // 正则表达式——中文名字
        let Utext = $(thisdiv).val();
        let oldtext = $(thisdiv).val().replace(/\s/g, '');
        let Thisterm = /^[\u4e00-\u9fa5]{2,5}$/;
        if(Thisterm.test(Utext)==true && Utext.length == oldtext.length){
            $(thisdiv).css({'border':'1px solid #5FCC29'});
            return true;
        }else{
            $(thisdiv).css({'border':'1px solid #F52230'});
            return false;
        }
    }
    function textphone(thisclass){  //电话号码判断
        let Uphone = $(thisclass).val();
        let Tphone = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
        if(Tphone.test(Uphone) == false|| Uphone == ''){
            $(thisclass).css({'border':'1px solid #F52230'});
            return false;
        }else if(Tphone.test(Uphone)==true){
            $(thisclass).css({'border':'1px solid #5FCC29'});
            return true;
        }
    }
    function textemail(thisclass){  //邮箱判断
        let Uemail = $(thisclass).val();
        let Temail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        if(Temail.test(Uemail) == false || Uemail == ''){
            $(thisclass).css({'border':'1px solid #F52230'});
            return false;
        }else if(Temail.test(Uemail) == true){
            $(thisclass).css({'border':'1px solid #5FCC29'});
            return true;
        }
    }
    function textqq(thisclass){   //QQ号码判断
        let Uqq = $(thisclass).val();
        let Tqq = /^[1-9][0-9]\d{5,12}$/;
        if(Tqq.test(Uqq) == false || Uqq == ''){
            $(thisclass).css({'border':'1px solid #F52230'});
            return false;
        }else if(Tqq.test(Uqq) == true){
            $(thisclass).css({'border':'1px solid #5FCC29'});
            return true;
        }
    }
    function textFixed(thisclass){
        let Ufixed = $(thisclass).val();
        let Tfixed = /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/;
        if(Tfixed.test(Ufixed) == false ){
            $(thisclass).css({'border':'1px solid #F52230'});
            return false;
        }else if(Tfixed.test(Ufixed) == true){
            $(thisclass).css({'border':'1px solid #5FCC29'});
            return true;
        }
    }
    function textnull(thisclass){   //不为空判断
        let Unull = $(thisclass).val();
        if(Unull == ''){
            $(thisclass).css({'border':'1px solid #F52230'});
            return false;
        }else{
            $(thisclass).css({'border':'1px solid #5FCC29'});
            return true;
        }
    }
    $('.dataform1').blur(function(){
        textchines('.dataform1');
    })
    $('.dataform2').blur(function(){
        textnull('.dataform2');
    })
    $('.dataform3').blur(function(){
        textphone('.dataform3');
    })
    $('.dataform4').blur(function(){
        textFixed('.dataform4');
    })
    $('.dataform5').blur(function(){
        textemail('.dataform5');
    })

    $('.lastsubmit').click(function(){
        if(textchines('.dataform1') == false || textnull('.dataform2') == false ||
           textphone('.dataform3') == false || textFixed('.dataform4') == false ||
           textemail('.dataform5') == false){
            if(textchines('.dataform1') == false){
                let thistext = $('.dataform1').val();
                if(thistext.length == 0){
                    $('.datap1').show();
                    $('.datap1').text('名字不能为空');
                }else if(textchines('.dataform1') == false){
                    $('.datap1').show();
                    $('.datap1').text('请输入你的中文名字');
                }
            }else{
                $('.datap1').hide();
            }
            if(textnull('.dataform2') == false){
                let thistext = $('.dataform2').val();
                if(thistext.length == 0){
                    $('.datap2').show();
                    $('.datap2').text('职位不能为空');
                }
            }else{
                $('.datap2').hide();
            }
            if(textphone('.dataform3') == false){
                let thistext = $('.dataform3').val();
                if(thistext.length == 0){
                    $('.datap3').show();
                    $('.datap3').text('手机号码不能为空');
                }else if(textphone('.dataform3') == false){
                    $('.datap3').show();
                    $('.datap3').text('手机号码格式错误');
                }
            }else{
                $('.datap3').hide();
            }
            if(textFixed('.dataform4') == false){
                let thistext = $('.dataform4').val();
                if(thistext.length == 0){
                    $('.datap4').show();
                    $('.datap4').text('电话号码不能为空');
                }else if(textFixed('.dataform4') == false){
                    $('.datap4').show();
                    $('.datap4').text('该电话号码格式不支持');
                }
            }else{
                $('.datap4').hide();
            }
            if(textemail('.dataform5') == false){
                let thistext = $('.dataform5').val();
                if(thistext.length == 0){
                    $('.datap5').show();
                    $('.datap5').text('邮箱地址不能为空');
                }else if(textemail('.dataform5') == false){
                    $('.datap5').show();
                    $('.datap5').text('邮箱地址错误');
                }
            }else{
                $('.datap5').hide();
            }
            return false;
        }else if(textchines('.dataform1') == true && textnull('.dataform2') == true &&
           textphone('.dataform3') == true && textFixed('.dataform4') == true &&
           textemail('.dataform5') == true){
            $('.datap1').hide();$('.datap2').hide();$('.datap3').hide();$('.datap4').hide();$('.datap5').hide();
            return true;
        }
    })
})