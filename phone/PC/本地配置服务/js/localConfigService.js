$(function(){

    // 本地配置    
    var serverAddress='', databaseAddress='',databasePort="", databaseName='', databaseNamePwd='',  buyTermSelect='',   projectPreserve='';
    
    // 创建账户
    var loginPhone='', loginPwd='',loginPwd2="";

    // 本地配置    
    var park_name='', park_contacts='',phone_num="", or_waterRent='', or_electricity='',  or_lossRate='' ;
    
    var buyTermSelect =1;//购买期限 
    var pay_timeSelect = '';//交租期

    var str='';
    for (let i=1;i<29;i++  )  {  
         str += "<li value="+i+">每月" + i + "日</li>"; 
    }
    $(".createPark .select_info").append(str) 

    // 下拉选择select 
        $('.select_bt').click(function(){
            if ($(' .select_info').css('display') == 'none') {
                $(' .select_info').slideDown(); 
            }else{
                $(' .select_info').slideUp();
            }
        });
      
    
    $('.localConfig .select_info li').click(function(){
        buyTermSelect = $(this).val(); 
        // console.log(buyTermSelect)
        $('.localConfig .select_cont').text($(this).text());
        $('.localConfig .select_info').slideUp(); 
    }); 
    $('.createPark .select_info li').click(function(){
         pay_timeSelect = $(this).val(); 
        // console.log(pay_timeSelect)
        $('.createPark .select_cont').text($(this).text());
        $('.createPark .select_info').slideUp(); 
    });  

    function textphone(thisclass){  //电话号码判断
        let Uphone = $(thisclass).val();
        let Tphone = /^(0|86|17951)?(1[3-9])[0-9]{9}$/;
         if(Tphone.test(Uphone) == false || Uphone == ''){
            $(thisclass).focus();

            return false;
        }else if(Tphone.test(Uphone)==true){
            return true;
        }
    } 
    function textphoneTwo(thisclass){  //电话号码判断
        let Uphone = $(thisclass).val();
        let Tphone = /^(0|86|17951)?(1[3-9])[0-9]{9}$/;
        let landline= /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/;//座机
        if((Tphone.test(Uphone) == false  && landline.test(Uphone) == false) || Uphone == ''){
            $(thisclass).focus();
            return false;
        }else if(Tphone.test(Uphone)==true || landline.test(Uphone) == true){
            return true;
        }
    }
    //不为空判断
    function textnull(thisclass){
        let val = $(thisclass).val();
        if(typeof val  != undefined && val){ 
            return true;
        }else{
            $(thisclass).focus();
            return  false;
        }
    }
    function largestNumber(val,maxVal,fn){
        if(parseFloat(val) > parseFloat(maxVal)){
            if(fn && typeof fn == "function"){
                fn(false)
            }else {
                return false;
            }

        }else {
            if(fn && typeof fn == "function"){
                fn(true)
            }else {
                return true;
            }
        }
    }
     
 
    $('#next0').click(function(){ //本地配置提交
         serverAddress = $('.serverAddress').val(); //服务器地址
         databaseAddress = $('.databaseAddress').val();//数据库地址
         databasePort = $('.databasePort').val();//数据库端口
         databaseName = $('.databaseName').val();//数据库用户名
         databaseNamePwd = $('.databaseNamePwd').val();//数据库密码
         //   buyTermSelect //购买期限
         projectPreserve = $('.projectPreserve').val();//项目保存

        
         if(textnull('.serverAddress') == false || textnull('.databaseAddress') == false || textnull('.databasePort') == false || textnull('.databaseName') == false || textnull('.databaseNamePwd') == false || textnull('.projectPreserve') == false  ){
            error_hide()
            if(textnull('.serverAddress') == false){
                $('.serverAddressP').show().text('服务器地址不能为空'); 
            }else if(textnull('.databaseAddress') == false){
                $('.databaseAddressP').show().text('数据库地址不能为空');  
            }else if(textnull('.databasePort') == false){
                $('.databasePortP').show().text('数据库端口不能为空');  
            }else if(textnull('.databaseName') == false){
                $('.databaseNameP').show().text('数据库用户名不能为空');  
            }else if(textnull('.databaseNamePwd') == false){
                $('.databaseNamePwdP').show().text('数据库密码不能为空');  
            }else if(textnull('.projectPreserve') == false){
                $('.projectPreserveP').show().text('项目保存路径不能为空');   
            }
        }else if(textnull('.serverAddress') == true && textnull('.databaseAddress') == true && textnull('.databasePort') == true && textnull('.databaseName') == true && textnull('.databaseNamePwd') == true && textnull('.projectPreserve') == true){
            // dateajax(user_type)
            // 本地配置ajax
            error_hide()
            
            next(0)//ajax完成后执行下一步 

            console.log(serverAddress)
            console.log(databaseAddress)
            console.log(databasePort)
            console.log(databaseName)
            console.log(databaseNamePwd)
            console.log(buyTermSelect)
            console.log(projectPreserve) 

             $.ajax({
                type: "post",
                url: "/ ",
                data: { 
                },
                dataType: 'json',
                contentType: "application/x-www-form-urlencoded",
                success: function (res) {
                    console.log(res);
                    if (res.error_code == 200) {

                        next(0)//ajax完成后执行下一步  
                    }else if(res.error_code == 1010){
                        
                    }
                },
                error: function (msg) {
                    console.log(msg);
                }
            });
        }
        
         
    })

    $('#next1').click(function(){ //创建账户提交 

         loginPhone = $('.loginPhone').val(); //登录手机号
         loginPwd = $('.loginPwd').val(); //登录密码
         loginPwd2 = $('.loginPwd2').val(); //再次输入密码
        
         if(textphone('.loginPhone') == false || textnull('.loginPwd') == false || textnull('.loginPwd2') == false ){
            error_hide()
            if(textphone('.loginPhone') == false){
                if(textnull('.loginPhone') == false){
                    $('.loginPhoneP').show().text('手机号不能为空'); 
                }else{
                    $('.loginPhoneP').show().text('请输入正确的手机号'); 
                }
            }else if(textnull('.loginPwd') == false){ 
                $('.loginPwdP').show().text('登录密码不能为空');  
            }else if(textnull('.loginPwd2') == false){ 
                $('.loginPwd2P').show().text('再次输入密码不能为空');  
            } 
        }else if(textphone('.loginPhone') == true && textnull('.loginPwd') == true && textnull('.loginPwd2') == true ){
            if(loginPwd != loginPwd2){
                $('.loginPwd2P').show().text('两个密码不一致');  
                return;   
            }
            error_hide()
            // 创建账户ajax 
            
            next(1)//ajax完成后执行下一步 

            console.log(loginPhone)
            console.log(loginPwd)
            console.log(loginPwd2) 

            console.log(serverAddress)
            console.log(databaseAddress)
            console.log(databasePort)
            console.log(databaseName)
            console.log(databaseNamePwd)
            console.log(buyTermSelect)
            console.log(projectPreserve) 

            // $.ajax({
            //     type: "post",
            //     url: "/ ",
            //     data: { 
            //     },
            //     dataType: 'json',
            //     contentType: "application/x-www-form-urlencoded",
            //     success: function (res) {
            //         console.log(res);
            //         if (res.error_code == 200) {

            //             next(1)//ajax完成后执行下一步  
            //         }else if(res.error_code == 1010){
                        
            //         }
            //     },
            //     error: function (msg) {
            //         console.log(msg);
            //     }
            // });
        }
        
         
    })

    $('#complete').click(function(){ //点击完成 
        park_name = $('#park_name').val(); //园区名称
        park_contacts = $('#park_contacts').val();//园区联系人
        phone_num = $('#phone_num').val();//联系电话
        // pay_timeSelect  //交租期
        or_waterRent = $('#or_waterRent').val();//水费单价
        or_electricity = $('#or_electricity').val();//电费单价
        or_lossRate = $('#or_lossRate').val();//电损耗

        if( textnull('#park_name')== false || $('#park_contacts').val().length == 0 || textphoneTwo('#phone_num')== false || textnull('#or_waterRent') ==false || textnull('#or_electricity') ==false || textnull('#or_lossRate') ==false || !pay_timeSelect){
        
            error_hide() 
            if(or_waterRent < 0 || or_waterRent >20){
                $('.or_waterRentP').show().text('请输入[0,20]之间的数字'); 
                $('#or_waterRent').focus();
                return;   
            }else if(or_electricity < 0 || or_electricity >20){
                $('.or_electricityP').show().text('请输入[0,20]之间的数字');    
                $('#or_electricity').focus(); 
                return;   
            }else if(or_lossRate < 0 || or_lossRate >15){
                $('.or_lossRateP').show().text('请输入[0,15]之间的数字');     
                $('#or_lossRate').focus();
                return;   
            }

            if( textnull('#park_name') == false){
                $('.park_nameP').show().text('园区名称不能为空');   
            }else if($('#park_contacts').val().length == 0){ 
                $('.park_contactsP').show().text('园区联系人不能为空');  
                $('#park_contacts').focus();
            }else if(textphoneTwo('#phone_num')== false){ 
                $('.phone_numP').show().text('请输入正确的联系电话');   
            }else if( !pay_timeSelect){   
                $('.pay_timeP').show().text('交租期不能为空');
                $('.createPark .select_info').click() 
            }else if(textnull('#or_waterRent') == false){  
                $('.or_waterRentP').show().text('水费单价不能为空');    
            }else if(textnull('#or_electricity') == false){  
                $('.or_electricityP').show().text('电费单价不能为空');    
            }else if(textnull('#or_lossRate') == false){  
                $('.or_lossRateP').show().text('损耗不能为空');    
            }

            

        }else if(textnull('#park_name')== true && $('#park_contacts').val().length > 0 && textphoneTwo('#phone_num')== true &&  textnull('#or_waterRent') == true && textnull('#or_electricity') == true && textnull('#or_lossRate') == true && pay_timeSelect){
            
                error_hide()  
                    // 创建账户ajax
        
                    console.log(park_name)
                    console.log(park_contacts)
                    console.log(phone_num)
                    console.log(pay_timeSelect)
                    console.log(or_waterRent)
                    console.log(or_electricity)
                    console.log(or_lossRate)

                    // $.ajax({
                    //     type: "post",
                    //     url: "/applyQuitPark",
                    //     data: {
                    //         // park_code: tcyq,
                    //         // 'remarks': yjcOrWjc
                    //     },
                    //     dataType: 'json',
                    //     contentType: "application/x-www-form-urlencoded",
                    //     success: function (res) {
                    //         console.log(res);
                    //         if (res.error_code == 200) {
                                
                    //             // window.location.reload();
                    //         }else if(res.error_code == 1010){
                               
                    //             // window.location.href = "/login"+res.data;
                    //         }
                    //     },
                    //     error: function (msg) {
                    //         console.log(msg);
                    //     }
                    // });
        }
   })
  

     function error_hide(){

        $('.serverAddressP').hide()  
        $('.databaseAddressP').hide()  
        $('.databasePortP').hide()  
        $('.databaseNameP').hide()  
        $('.databaseNamePwdP').hide()  
        $('.projectPreserveP').hide()   

        $('.loginPhoneP').hide()   
        $('.loginPwdP').hide()   
        $('.loginPwd2P').hide()   

        $('.park_nameP').hide()  
        $('.park_contactsP').hide()  
        $('.phone_numP').hide()  
        $('.pay_timeP').hide()  
        $('.or_waterRentP').hide()  
        $('.or_electricityP').hide()  
        $('.or_lossRateP').hide()  
     }
      $(".pwd_close").on("click",function(){
        $(this).hide()
        $(".pwd_show").show()
        $(".pwd").attr('type','text');
      })

      $(".pwd_show").on("click",function(){
        $(this).hide()
        $(".pwd_close").show()
        $(".pwd").attr('type','password');
      })

      $(".loginPwd_close").on("click",function(){
        $(this).hide()
        $(".loginPwd_show").show()
        $(".loginPwd").attr('type','text');
      })

      $(".loginPwd_show").on("click",function(){
        $(this).hide()
        $(".loginPwd_close").show()
        $(".loginPwd").attr('type','password');
      })
      $(".loginPwd2_close").on("click",function(){
        $(this).hide()
        $(".loginPwd2_show").show()
        $(".loginPwd2").attr('type','text');
      })

      $(".loginPwd2_show").on("click",function(){
        $(this).hide()
        $(".loginPwd2_close").show()
        $(".loginPwd2").attr('type','password');
      })
})

    function next(active){//下一步
        switch(active){
            case 0:
                steps1(1) 
                $('.active0' ).hide()
                $('.active2' ).hide()
                $('.active1' ).show() 
                $('.localConfig' ).hide()
                $('.createPark' ).hide()
                $('.createAccount' ).show() 
                 break;
            case 1:
                steps1(2) 
                $('.active0' ).hide()
                $('.active1' ).hide()
                $('.active2' ).show()
                $('.localConfig' ).hide()
                $('.createPark' ).show()
                $('.createAccount' ).hide()
                break; 
        }  
    }
    function upper(active){//上一步
        switch(active){
            case 1:
                steps1(0) 
                $('.active1' ).hide()
                $('.active2' ).hide()
                $('.active0' ).show()
                $('.localConfig' ).show()
                $('.createPark' ).hide()
                $('.createAccount' ).hide()
                break;
            case 2:
                steps1(1) 
                $('.active0' ).hide()
                $('.active2' ).hide()
                $('.active1' ).show()
                $('.localConfig' ).hide()
                $('.createPark' ).hide()
                $('.createAccount' ).show()
                 break;
        } 
        
    }