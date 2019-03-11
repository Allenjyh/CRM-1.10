$(function(){
	var szqy_first = $('input[type="hidden"]').attr('data-areacode');
	var gsjd_first = $('.select_gsjd').text();
	var rygm_first = $('.select_rygm').text();
	var szhy_first = $('.select_szhy').text();
	var gsjc_first = $('.property_text').val();
	var gsjj_first = $('.propert_textarea').val();
	/*公司阶段，人员规模，所在行业*/
	var sele_gsjd = false,sele_rygm = false,sele_szhy = false;
	function sele(id){
		$('.'+id+' .select_'+id).click(function(){
			if($('.'+id+'_box').css('display') == 'none'){
				$('.'+id+'_box').slideDown();
			}else{
				$('.'+id+'_box').slideUp();
			}
		});
		$('.'+id+'_box li').click(function(){/*选择某一项*/
			if (id == 'gsjd') {
				sele_gsjd = true;
			} else if(id == 'rygm'){
				sele_rygm = true;
			}else if(id == 'szhy'){
				sele_szhy = true;
			}
			
			$('.'+id+' .select_'+id).text($(this).text());
			$('.'+id+'_box').slideUp();
			$('.'+id).css({'border':'1px solid #5FCC29'});
		});
	}
	sele('gsjd');
	sele('rygm');
	sele('szhy');
	

	$('.lastsubmit').click(function(){
		$('.thissubmit').click();
	});
    $('#demo1').click(function(){
        $('#test1').click();
    })
    /*$('.propert_textarea').keydown(function(){
        let text = $('.propert_textarea').val();
        let textnumber = $('.propert_textarea').val().length;
        if(textnumber <= 300){
            $('.newnumber').text(textnumber);
        }else{
            $('.propert_textarea').val(text.substring(0,299));
        }
        console.log(textnumber);
    })*/

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
        // $('.firstform').click();
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

    function textnull(thisclass){   //不为空判断
        let Unull = $(thisclass).val();
        if(Unull.length==0){
            $(thisclass).css({'border':'1px solid #F52230'});
            return false;
        }else{
            $(thisclass).css({'border':'1px solid #5FCC29'});
            return true;
        }
    }
    $('.lastsubmit').click(function(){
    	let pick = $('input[type="hidden"]').attr('data-areacode');//城市ID
		let picknumber = pick.split(',');
		var gsjd = $('.select_gsjd').text();
		var rygm = $('.select_rygm').text();
		var szhy = $('.select_szhy').text();
		var gsjc = $('.property_text').val();
		var gsjj = $('.propert_textarea').val();
        if(picknumber.length == 3 && sele_gsjd == true && sele_rygm == true && sele_szhy == true && textnull('.property_text') == true && textnull('.propert_textarea') == true){
            $('.home_p1').hide();$('.home_p2').hide();
			if (szqy_first == pick && gsjd_first == gsjd && rygm_first == rygm && szhy_first == szhy && gsjc_first == gsjc && gsjj_first == gsjj) 
			{//没有修改，直接成功
				alert("修改成功");
				window.history.go(-1);
			} else{
				$.ajax({
					type:"post",
					url:"",
					data: {
						a: (picknumber[2]*1000000),//区域
						a: gsjd,	//公司阶段
						a: rygm,	//人员规模
						a: szhy,	//所在行业
						a: gsjc,	//公司简称
						a: gsjj		//公司简介
					},
					dataType: 'json',
	                contentType: "application/x-www-form-urlencoded",
					success: function(res){
						console.log(res)
						if (res.error_code == 200) {
	                        alert("修改成功");
	                        window.location.href = url;
	                    }else {
	                    	alert(res.message);
	                    }
					},
					error: function(msg){
						if (msg.status == 422) {
	                        var json = JSON.parse(msg.responseText);
	                        json = json.errors;
	                        console.log(json);
	                    } else {
	                        alert('服务器连接失败');
	                        return;
	                    }
					}
				});
			}
        }else{
            console.log(132);
            if (picknumber.length != 3) {
            	$('.pick-area').css({'border':'1px solid #F52230'});
            } else{
            	$('.pick-area').css({'border':'1px solid #5FCC29'});
            }
            if (sele_gsjd == false) {//公司阶段
            	$('.gsjd').css({'border':'1px solid #F52230'});
            } else{
            	$('.gsjd').css({'border':'1px solid #5FCC29'});
            }
            
            if (sele_rygm == false) {//人员规模
            	$('.rygm').css({'border':'1px solid #F52230'});
            } else{
            	$('.rygm').css({'border':'1px solid #5FCC29'});
            }
            
            if (sele_szhy == false) {//所在行业
            	$('.szhy').css({'border':'1px solid #F52230'});
            } else{
            	$('.szhy').css({'border':'1px solid #5FCC29'});
            }
            
            if(textnull('.property_text') == false){
                if($('.property_text').val().length == 0){
                    $('.home_p1').show();
                    $('.home_p1').text('不能为空')
                }
            }else{
                 $('.home_p1').hide();
            }
            if(textnull('.propert_textarea') == false){
                 if($('.propert_textarea').val().length == 0){
                    $('.home_p2').show();
                    $('.home_p2').text('不能为空')
                }
            }else{
                $('.home_p2').hide();
            }
            return false;
        }
    });
    
    /*文本域的字数控制*/
    $('.propert_textarea').on("keyup", function () {
        $('.textNum').text($('.propert_textarea').val().length);//这句是在键盘按下时，实时的显示字数
        if ($('.propert_textarea').val().length > 600) {
            $('.textNum').text(600);//长度大于100时0处显示的也只是100
            $('.propert_textarea').val($('.propert_textarea').val().substring(0, 600));//长度大于100时截取钱100个字符
        }
    });
    $('.textNum').text($('.propert_textarea').val().length);//这句是在刷新的时候仍然显示字数
    
});