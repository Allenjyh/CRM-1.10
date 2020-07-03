$(function(){



        function textphone(thisclass){  //电话号码判断
            let Uphone = $(thisclass).val();
            let Tphone = /^(0|86|17951)?(1[3-9])[0-9]{9}$/;
             if(Tphone.test(Uphone) == false || Uphone == ''){;
                return false;
            }else if(Tphone.test(Uphone)==true){
                return true;
            }
        }
        function textphone1(thisclass){  //电话号码判断
            let Uphone = $(thisclass).val();
            let Tphone = /^(0|86|17951)?(1[3-9])[0-9]{9}$/;
            let landline= /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/;//座机
            if((Tphone.test(Uphone) == false  && landline.test(Uphone) == false) || Uphone == ''){;
                return false;
            }else if(Tphone.test(Uphone)==true || landline.test(Uphone) == true){
                return true;
            }
        }
        //不为空判断
        function textnull(thisclass){
            let val = $(thisclass).val();
            if(typeof val  != undefined && val){
                // $(thisclass).focus();
                return true;
            }else{
                $(thisclass).focus();
                return  false;
            }
        }
        //联系人
        function textchines(thisclass){   // 正则表达式——中文名字
            let Utext = $(thisclass).val();
            let oldtext = $.trim($(thisclass).val());
            let Thisterm = /^[\u4e00-\u9fa5]{2,4}$/;
            if(Thisterm.test(Utext)==true && Utext.length == oldtext.length){
                return true;
            }else {
                $(thisclass).focus();
                return  false;
            }
        }
        function textnum(thisclass){   //6位验证码判断
            var Unum = $(thisclass).val();
            var Tnum = /^\d{6}$/;
            if(Tnum.test(Unum) == false || Unum == ''){
                return false;
            }else if(Tnum.test(Unum) == true){
                return true;
            }
        }
        // 损耗率
        $("#or_lossRate").on("input",function(e){
            yzCheck.largestNumber(e.target.value,15,function(status){

                if(!status){
                    alerts._show("损耗率最大不能超过15%");
                    e.target.value = "";
                }
            });
        })


        $(".or-bank").on("blur", function (e) {
           yzCheck.isChinese($(".or-bank").val(),function(status){
            if(!status){
                alerts._show("请输入正确的开户行");
                e.target.value = "";
                judgeStatus = false;
            }
           });
        })
        $(".or-bankName").on("blur", function (e) {
           yzCheck.isChinese($(".or-bankName").val(),function(status){
            if(!status  ){
                alerts._show("请输入正确的用户名");
                e.target.value = "";
                judgeStatus = false;
            }else if($(".or-bankName").val().length < 2){
                alerts._show("请输入2~4位中文的用户名");
                e.target.value = "";
                judgeStatus = false;
            }
           });
        })
         //银行卡号
         $(".or-bankAccount").on("blur", function (e) {
            yzCheck.checkStrLength([{length:15,val:$(".or-bankAccount").val(),name:"银行账号格式"}],function(obj){
                alerts._show(obj.name+"有误");
                judgeStatus = false;
            });
         })
         var _textbank = "";
         $(".or-bankAccount").on("input", function (e) {

             yzCheck.isNumber(yzCheck.removeSpace(e.target.value,1),function(status){
                 if(!status){

                     e.target.value = _textbank;
                 }else {
                     _textbank = e.target.value;
                     if(e.target.value.length <= 1){
                         _textbank = "";
                     }
                 }
             });

             var val = $(this).val();
           console.log( val)

             if ($(this).val().length % 5 == 0 && $(this).val().length != 0) {
                 val = $(this).val().replace(/\D/g,"").replace(/(\d{4})/g, "$1 ");

             }
             $(this).val(val.length > 23 ? val.substring(0, 23) : val);
            });

         //不能输入特殊符号 -- 开户名、开户行
        //  $(".or-bank,.or-bankName").on("input",function(e){
        //      e.target.value = yzCheck.removeSpace(e.target.value,1);
        //      yzCheck.isSpecialChar(e.target.value,function(val){
        //          e.target.value = val;
        //      });
        //  })


  //1.更换联系人
    var old_change_contacts =$('#company_contacts').val();
    var old_change_phone_num1 =$('#phone_num1').val();
    $('#companyContacts_submit').click(function(){
        var change_contacts =$('.addParkName-bar input[name="contacts"]').val();
        var change_phone_num1 =$('.addParkName-bar input[name="phone_num1"]').val();
        if($('#company_contacts').val().length == 0 || textphone1('#phone_num1')== false ||(old_change_contacts == change_contacts && old_change_phone_num1 == change_phone_num1)){
            if($('#company_contacts').val().length == 0){
                alerts._show('请输入园区联系人');
                $('#company_contacts').focus();
                return ;
            }else if(textphone1('#phone_num1') == false){
                alerts._show('请输入正确的联系电话')
                $('#phone_num1').focus();
            }else if(old_change_contacts == change_contacts && old_change_phone_num1 == change_phone_num1){
                alerts._show("修改成功！",function(){
                    window.location.href = '/showInfo';
                })
            }
        }else if($('#company_contacts').val().length >0 && textphone1('#phone_num1') == true){

            $loading.init({
                next:function(e){
                    let that = e;
                    //  执行ajax操作
                    $.ajax({
                        type:"put",
                        url:"/updateInfo/1",
                        data:{
                            edit_type:1,
                            contacts:change_contacts,
                            mobile_phone:change_phone_num1,
                            },
                        dataType: 'json',
                        contentType: "application/x-www-form-urlencoded",
                        success: function(res){
                            //  console.log(res)
                            if (res.error_code == 200) {
                                alerts._show("修改成功！",function(){
                                    window.location.href = '/showInfo';
                                })
                            }else if(res.error_code == 2021){
                                document.location = res.data;
                            }else if(res.error_code == 2004){
                                alerts._show('园区已存在');
                            }
                        },
                        complete : function(){
                            that.close();
                        }
                    });
                }
            })
        }
    })
  //2.更换手机号
     /*获取验证码 开始*/
    var ding1 = null;
    var ifclick1 = true;
    $(".thisYZM1").click(function(){
        if (!ifclick1)
            return;
        // var input3 = $('#new_phone_num').val();
        if(textphone('#new_phone_num') == false){
             alerts._show('请输入正确的手机号码');
        }else{
            var time1 = 60;
            $.ajax({
                url: '/sms',
                type: 'POST',
                dataType: 'json',
                data: {
                    verify_type: 10,
                    verify_num: $('#new_phone_num').val(),
                },
                contentType: "application/x-www-form-urlencoded",
                success:function(res){
                    console.log(res)
                    if(res.error_code == 200){
                        time1 = res.end_time;
                        ding1 = setInterval(function(){
                            ifclick1 = false;
                            if (time1 <= 0){
                                clearInterval(ding1);
                                $(".thisYZM1").text("重新获取");
                                $(".thisYZM1").css({"cursor":"pointer","color":"#198cff"});
                                ifclick1 = true;
                            }else{
                                $(".thisYZM1").text(time1+"s 重试");
                                $(".thisYZM1").css({"cursor":"not-allowed","color":"rgba(0,0,0,0.65)"});
                                --time1;
                            }
                        },1000);
                    }else if (res.error_code == 1012 || res.error_code == 1550) {
                        alerts._show(res.message);
                    }else if (res.end_time != undefined){
                        time1 = res.end_time;
                        ding1 = setInterval(function(){
                            ifclick1 = false;
                            if (time1 <= 0){
                                clearInterval(ding1);
                                $(".thisYZM1").text("重新获取");
                                $(".thisYZM1").css({"cursor":"pointer","color":"#198cff"});
                                ifclick1 = true;
                            }else{
                                $(".thisYZM1").text(time1+"s 重试");
                                $(".thisYZM1").css({"cursor":"not-allowed","color":"rgba(0,0,0,0.65)"});
                                --time1;
                            }
                        },1000);
                    }else{
                        alerts._show('验证码发送失败');
                    }
                },
                error:function(msg){
                    alerts._show('验证码发送失败');
                }
            })
        }
    })
    /*获取验证码 60s后重试结束*/
    // 2.ajax
    $('#change_phone_submit').click(function(){
        //    var change_phone =$('.new_phone_num').val();
        if(textphone('#new_phone_num') ==false || textnum('.register_input9') ==false){
            if(textphone('#new_phone_num') ==false){
                alerts._show('请输入正确的手机号码');
                return ;
            }else{
                alerts._show('请输入6位验证码');
                return ;
                }
        }else if(textphone('#new_phone_num') == true && textnum('.register_input9') == true){
                $loading.init({
                    next:function(e){
                        let that = e;
                        //  执行ajax操作
                        $.ajax({
                            type:"put",
                            url:"/updateInfo/2",
                            data:{
                                edit_type:2,
                                phone_num:$('#new_phone_num').val(),
                                verify_code:$('.register_input9').val(),
                                },
                            dataType: 'json',
                            contentType: "application/x-www-form-urlencoded",
                            success: function(res){
                                //  console.log(res)
                                if (res.error_code == 200) {
                                    alerts._show("修改成功！",function(){
                                        window.location.href = '/showInfo';
                                    })
                                }else if(res.error_code == 2021){
                                    document.location = res.data;
                                }else if(res.error_code == 1550){
                                    alerts._show(res.message);
                                }
                            },
                            complete : function(){
                                that.close();
                            }
                        });
                    }
                })
        }

    })
    //3.更换银行卡号
    $('#bank_submit').click(function(){
        var judgeStatus=true;
        yzCheck.isEmpty([
            {name:"开户行",val:$('.or-bank').val(),ele:".or-bank"},
            {name:"用户名",val:$(".or-bankName").val(),ele:".or-bankName"},
            {name:"银行账号",val:$(".or-bankAccount").val(),ele:".or-bankAccount"},
        ],function(obj){
            alerts._show("请输入"+ obj.name);
            judgeStatus = false;

        });
        if(judgeStatus == true){
            $loading.init({
                next:function(e){
                    let that = e;
                    //  执行ajax操作
                    $.ajax({
                        type:"put",
                        url:"/updateInfo/3",
                        data:{
                            edit_type:3,
                            bank_name:$(".or-bank").val(),//银行名称
                            bank_account:yzCheck.removeSpace($(".or-bankAccount").val(),1),//银行帐号
                            payee:$(".or-bankName").val(),//收款人
                            },
                        dataType: 'json',
                        contentType: "application/x-www-form-urlencoded",
                        success: function(res){
                            if (res.error_code == 200) {
                                alerts._show("修改成功！",function(){
                                    window.location.href = '/showInfo';
                                })
                            }else if(res.error_code == 2021){
                                document.location = res.data;
                            }else if(res.error_code == 2004){
                                alerts._show('园区已存在');
                            }
                        },
                        complete : function(){
                            that.close();
                        }
                    });
                }
            })
        }
    })
    //4. 园区设置
    $('.set_addParkName-btn').click(function(){
    if(  $('#park_contacts').val().length == 0 || textphone('#phone_num')== false || textnull('#or-waterRent') ==false || textnull('#or-electricity') ==false || textnull('#or_lossRate') ==false || textnull('#TheLeaseBtn') ==false){
            if( $('#park_contacts').val().length == 0){
            alerts._show('请输入园区联系人');
            $('#park_contacts').focus();
        }else if(textphone('#phone_num')== false){
            alerts._show('请输入正确的手机号')
            $('#phone_num').focus();
        }else if(textnull('#or-waterRent') == false){
            alerts._show('请输入水费单价')
            $('#or-waterRent').focus();
        }else if(textnull('#or-electricity') == false){
            alerts._show('请输入电费单价')
            $('#or-electricity').focus();
        }else if(textnull('#or_lossRate') == false){
            alerts._show('请输入损耗')
            $('#or_lossRate').focus();
        }else if(textnull('#TheLeaseBtn') == false){
            alerts._show('请输入交租期')
        }

    }else if( $('#park_contacts').val().length > 0 && textphone('#phone_num')== true &&  textnull('#or-waterRent') == true && textnull('#or-electricity') == true && textnull('#or_lossRate') == true && textnull('#TheLeaseBtn') == true){

        $loading.init({
            next:function(e){
                let that = e;
                //  执行ajax操作
                $.ajax({
                    type:"put",
                    url:"/updateInfo/4/"+document.getElementById('data-park_id').dataset.park_id,
                    data:{
                        edit_type:4,
                        park_id:document.getElementById('data-park_id').dataset.park_id,
                        contacts:$('.addParkName-bar input[name="park_contacts"]').val(),
                        phone_num:$('#phone_num').val(),
                        electric_degree:$('#or-electricity').val()*100,
                        water_ton:$('#or-waterRent').val()*100,
                        loss_fee:$('#or_lossRate').val(),//损耗
                        pay_time:document.getElementById("TheLeaseBtn").dataset.value,//交租期
                        },
                    dataType: 'json',
                    contentType: "application/x-www-form-urlencoded",
                    success: function(res){
                         console.log(res)
                        if (res.error_code == 200 ) {
                            alerts._show("园区设置成功！",function(){
                                    window.location.href = '/personalCenter/'+document.getElementById('data-park_id').dataset.park_id;
                            })
                        }else if(res.error_code == 2021){
                            document.location = res.data;
                        }else if(res.error_code == 2004){
                            alerts._show('园区已存在');
                        }
                    },
                    complete : function(){
                        that.close();
                    }
                });
            }
        })
    }

    })

})
