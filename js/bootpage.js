$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});
$(function(){
	 $('#demo1').click(function(){
        $('#test1').click();
    })

    $('.styleradio i').on('click',function(){
        let i = $(this).index();
        if(i == 3){
            $('.styleradio input:eq(1)').click();
            $('.styleradio i').removeClass('clikradio');
            $(this).addClass('clikradio');
        }else{
            $('.styleradio input:eq(0)').click();
            $('.styleradio i').removeClass('clikradio');
            $(this).addClass('clikradio');
        }
    })

	// 图片转换成base64 模拟点击触发上传弹框 监听上传框是否有值，有变化则触发转换方法并返回到文本域里
    $('.shangchuan1').click(function(){
        $('.filesfz1').click();
    })
    $('.shangchuan2').click(function(){
        $('.filesfz2').click();
    })
    $('.shangchuan3').click(function(){
        $('.filesfz3').click();
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
    $(".filesfz3").change(function () {
        run(this,'.sfzbase3', function (data) {
            $('.shangchuan3').attr('src', data);
        });
    });
    function run(input_file,textval, get_data) {
        $(textval).val('');
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
                    console.log(file.type);
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
        let Tphone = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/;
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
    function textFixed1(thisclass){ //座机
        let Ufixed = $(thisclass).val();
        let Tfixed = /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/;
        if(Ufixed == ''){
            $(thisclass).css({'border':'1px solid #5FCC29'});
            return true;
        }else if(Tfixed.test(Ufixed) == false ){
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
    })
    $('.dataform2').blur(function(){
        if(textnull('.dataform2') == false){
            let thistext = $('.dataform2').val();
            if(thistext.length == 0){
                $('.datap2').show();
                $('.datap2').text('职位不能为空');
            }
        }else{
            $('.datap2').hide();
        }
    })
    $('.dataform3').blur(function(){
        if(textphone('.dataform3') == false){
            let thistext = $('.dataform3').val();
            if(thistext.length == 0){
                $('.datap3').show();
                $('.datap3').text('手机号码不能为空');
            }else if(thistext.length > 11){
                $('.datap3').show();
                $('.datap3').text('手机号码不能超过11位');
            }else if(textphone('.dataform3') == false){
                $('.datap3').show();
                $('.datap3').text('手机号码格式错误');
            }
        }else{
            $('.datap3').hide();
        }
    })
    $('.dataform4').blur(function(){
        textFixed1('.dataform4');
    })

    $('.lastsubmit').click(function(){
        if(textchines('.dataform1') == false || textnull('.dataform2') == false ||
           textphone('.dataform3') == false){
            return false;
        }else if(textchines('.dataform1') == true && textnull('.dataform2') == true &&
           textphone('.dataform3') == true){
            $('.datap1').hide();$('.datap2').hide();$('.datap3').hide();
            let dataform1 = $('.dataform1').val();
            let dataform2 = $('.dataform2').val();
            let dataform3 = $('.dataform3').val();
            let dataform4 = $('.dataform4').val();
            if(textFixed1('.dataform4') == false){
                $('.datap4').show();
                $('.datap4').text('座机号码格式错误');
                return false;
            }else if(dataform4.length == 0 || textFixed1('.dataform4') == true){
                $('.datap4').hide();
                $.ajax({
                    type: "POST",
                    url: "/user",
                    data: {
                        contacts: dataform1,
                        position: dataform2,
                        mobile_phone: dataform3,
                        tel_phone: dataform4
                    },
                    dataType: 'json',
                    contentType: "application/x-www-form-urlencoded",
                    success:function(res){
                        console.log(res);
                    },
                    error:function(msg){
                        console.log(msg);
                    }
                })
            }
        }
    })

    $('.nextpage2').click(function(){
    	let i = $('.sfzbase1').val().length;
    	let j = $('.sfzbase2').val().length;
    	let k = $('.sfzbase3').val().length;
    	if( i == 0 || j == 0 || k == 0){
    		return	false;
    	}else{
    		return true;
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