$(function () {
    // 多选框
    var jj = 0;
    var checktype = 0;//选择框是否选择的状态 0未选择 1选择
    $('.xuanzhe').click(function () {
        jj++;
        if (jj % 2 == 0) {
            // 不变色
            checktype = 0;
            $('.thischeckbox1').removeClass('icon-duoxuankuang1');
            $('.thischeckbox1').addClass('icon-icon-');
            $('.thischeckbox1').css({'color': 'rgba(0,0,0,.45)'});
            $('.thisbox1').click();
        } else {
            // 变蓝色
            checktype = 1;
            $('.thischeckbox1').removeClass('icon-icon-');
            $('.thischeckbox1').addClass('icon-duoxuankuang1');
            $('.thischeckbox1').css({'color': '#1A8CFF'});
            $('.thisbox1').click();
        }
    })
    /*获取验证码 60s后重试结束*/
    var ding1 = null;
    var ifclick1 = true;
    $(".thisYZM1").click(function () {
        if (!ifclick1)
            return;
        var input3 = $('.register_input8').val();
        if (input3.length == 0) {
            $('.thisp1').show();
            $('.thisp2').hide();
            $('.thisp1').text('请输入手机号码');
            timeremove();
        } else if (textphone('.register_input8') == false) {
            $('.thisp1').show();
            $('.thisp2').hide();
            $('.thisp1').text('请输入正确的手机号码');
            timeremove();
        } else {
            $('.thisp2').show();
            $('.thisp1').hide();
            var time1 = 60;
            $.ajax({
                url: '/sms',
                type: 'POST',
                dataType: 'json',
                data: {
                    verify_type: 7,
                    verify_num: input3
                },
                contentType: "application/x-www-form-urlencoded",
                success: function (res) {
                    if (res.error_code == 200) {
                        time1 = res.end_time;
                        ding1 = setInterval(function () {
                            ifclick1 = false;
                            if (time1 <= 0) {
                                clearInterval(ding1);
                                $(".thisYZM1").text("重新获取");
                                $(".thisYZM1").css({"cursor": "pointer", "color": "#198cff"});
                                ifclick1 = true;
                            } else {
                                $(".thisYZM1").text(time1 + "s 重试");
                                $(".thisYZM1").css({"cursor": "not-allowed", "color": "rgba(0,0,0,0.65)"});
                                --time1;
                            }
                        }, 1000);
                    } else if (res.error_code == 1012) {
                        alert(res.message);
                        // $('.phonebox').text(res.message);
                        // $('.phonebox').show();
                        // timeremove();
                    } else if (res.end_time != undefined) {
                        time1 = res.end_time;
                        ding1 = setInterval(function () {
                            ifclick1 = false;
                            if (time1 <= 0) {
                                clearInterval(ding1);
                                $(".thisYZM1").text("重新获取");
                                $(".thisYZM1").css({"cursor": "pointer", "color": "#198cff"});
                                ifclick1 = true;
                            } else {
                                $(".thisYZM1").text(time1 + "s 重试");
                                $(".thisYZM1").css({"cursor": "not-allowed", "color": "rgba(0,0,0,0.65)"});
                                --time1;
                            }
                        }, 1000);
                    } else {
                        alert('验证码发送失败');
                        // $('.phonebox').text('验证码发送失败');
                        // $('.phonebox').show();
                        // timeremove();
                    }
                },
                error: function (msg) {
                    alert('验证码发送失败');
                    // $('.phonebox').show();
                    // $('.phonebox').text('验证码发送失败');
                    // timeremove();
                }
            })
        }
    })
    /*获取验证码 60s后重试结束*/

    //正则判断
    function textphone(thisclass) {  //电话号码判断
        var Uphone = $(thisclass).val();
        var Tphone = /^(0|86|17951)?(1[3-9])[0-9]{9}$/;
        // var Tphone = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/;
        if (Tphone.test(Uphone) == false || Uphone == '') {
            $(thisclass).css({'border': '1px solid #F52230'});
            return false;
        } else if (Tphone.test(Uphone) == true) {
            $(thisclass).css({'border': '1px solid #5FCC29'});
            return true;
        }
    }

    function textnum(thisclass) {   //6位验证码判断
        var Unum = $(thisclass).val();
        var Tnum = /^\d{6}$/;
        if (Tnum.test(Unum) == false || Unum == '') {
            $(thisclass).css({'border': '1px solid #F52230'});
            return false;
        } else if (Tnum.test(Unum) == true) {
            $(thisclass).css({'border': '1px solid #5FCC29'});
            return true;
        }
    }

    $('input').click(function () {//点击添加蓝色边框
        $('input').css({'border': '1px solid rgba(0,0,0,0.15)'});
        $(this).css({'border': '1px solid #198dff'});
        $(this).parent().find('i').eq(0).addClass('color_blue');
    });
    $("input").focus(function () {
        $(this).css({'border': '1px solid #198dff'});
        $(this).parent().find('i').eq(0).addClass('color_blue');
    });
    $('input').blur(function () {
        $(this).css({'border': '1px solid rgba(0,0,0,0.15)'});
        $(this).parent().find('i').eq(0).removeClass('color_blue');
    });

    function timeremove() {
        setTimeout(function () {
            $('.phonebox').hide();
        }, 2000);
    }

    //弹窗点击之后隐藏
    $('.phonebox').click(function () {
        $('.phonebox').hide();
    })

    /*$('.maskbox img').click(function(){//添加新弹窗
        wx.closeWindow();
    })*/

    // 正则判断两个表单
    var  ifclicksubmit= true;
    
    $('.register1').click(function () {
        if (!ifclicksubmit)
             return;
        ifclicksubmit =  false;
        var input1 = $('.register_input8').val();
        var input2 = $('.register_input9').val();
        if (textphone('.register_input8') == false || textnum('.register_input9') == false || checktype == 0) {
            if (textphone('.register_input8') == false) {
                if (input1.length == 0) {
                    $(".register_input8").focus();
                    $('.thisp1').show();
                    $('.thisp2').hide();
                    $('.thisp1').text('手机号不能为空！');
                    return false;
                } else {
                    $(".register_input8").focus();
                    $('.thisp1').show();
                    $('.thisp2').hide();
                    $('.thisp1').text('请输入正确的手机号！');
                    return false;
                }
            } else {
                if (textnum('.register_input9') == false) {
                    if (input2.length == 0) {
                        $(".register_input9").focus();
                        $('.thisp2').hide();
                        $('.thisp1').show();
                        $('.thisp2').hide();
                        $('.thisp1').text('验证码不能为空！');
                        return false;
                    } else {
                        $(".register_input9").focus();
                        $('.thisp1').show();
                        $('.thisp2').hide();
                        $('.thisp1').text('请输入6位验证码！');
                        return false;
                    }
                } else {
                    if (checktype == 0) {
                        $('.thisp1').show();
                        $('.thisp2').hide();
                        $('.thisp1').text('请勾选已阅读用户协议');
                    } else {
                        $('.thisp2').show();
                    }
                }
            }
        } else if (textphone('.register_input8') == true && textnum('.register_input9') == true && checktype == 1) {
            var sub = $('body').attr('data-sub');
            var key = $('body').attr('data-key');
            $('.thisp1').hide();
            $('.thisp2').show();
            var bind_type = $('.register1').attr('bind_type');
            var req_data = sub == '0' ? {type: bind_type, verify_num: input1, verify_code: input2}:{phone_num: input1, code: input2};
            if (bind_type == 3)
                req_data['search'] = location.search;

            $.ajax({
                url: sub == '0' ? '/user/bind' : '/invite/' + key,
                type: 'POST',
                dataType: 'json',
                data: req_data,
                contentType: "application/x-www-form-urlencoded",
                success: function (res) {
                    //上传成功关闭页面
                    // console.log(res);
                    if (res.error_code == 200) {
                        $('.curtain').show();
                        $('.maskbox').show();//弹框图片：绑定成功-确定

                        if ($('.register1').length > 0) {
                            $(".qd_btn").click(function () {
                                document.location = res.data;
                            })
                        } else {
                            //document.location = res.data;
                        }
                    } else if (res.error_code == 2015) {
                        // 绑定失败,用户不存在或者已绑定
                        if (bind_type == 1) {
                            document.location = '/personalCenter?type=' + bind_type;  // 租赁
                        } else if (bind_type == 2) {
                            document.location = '/submit/repair?type=' + bind_type;   // 报修
                        } else if (bind_type == 3) {
                            document.location = '/receive/repair?type=' + bind_type;  // 接单
                        } else if (bind_type == 4) {
                            document.location = '/patrolManagerIndex?type=' + bind_type;    // 巡逻管理
                        }else{
                            alert(res.message);
                            ifclicksubmit = true;
                        }
                    } else if (res.error_code == 2021) {
                        document.location = res.data;
                    } else {
                        alert(res.message);
                        ifclicksubmit = true;
                        // $('.phonebox').show();
                        // $('.phonebox').text(res.message);
                        // timeremove();
                    }
                },
                error: function (msg) {
                    alert('绑定失败');
                    // $('.phonebox').show();
                    // $('.phonebox').text('绑定失败');
                    // timeremove();
                }
            });
        }
    })

    $(document).keypress(function (e) {
        // 回车键事件
        if (e.which == 13) {
            $('.register1').click();
        }
    });
    // 跳转用户协议
    // localStorage.lastname = "lu1";
    $('.service').click(function () {
        $('.curtain').show();
        $('.nav_box').show();
    })
    $('.curtain ,.thisclose').click(function () {
        $('.curtain').hide();
        $('.nav_box').hide();
    })
    //  用户协议文字开始
    $('.service').click(function () {
        $('.main_l_tab .yhxy_text').html(yhxy_text);
    })

    var yhxy_text =
        `<div class="content">
        <div>
            <p class="block65" style="line-height: 24px;">
                创客桥网（以下简称“本网站”）依据
                《创客桥网服务协议》（以下简称“本协议”）的规定提供服务，本协议具有合同效力。用户注册时，请您认真阅读本协议，审阅并接受或不接受本协议（未成年人应在法定监护人陪同下审阅）。<br />  
                若您已经注册为本网站用户，即表示您已充分阅读、理解并同意自己与本网站订立本协议，且您自愿受本协议的条款约束。本网站有权随时变更本协议并在本网站上予以公告。经修订的条款一经在本网站的公布后，立即自动生效。如您不同意相关变更，必须停止使用本网站。本协议内容包括协议正文及所有创客桥网已经发布的各类规则。所有规则为本协议不可分割的一部分，与本协议正文具有同等法律效力。一旦您继续使用本网站，则表示您已接受并自愿遵守经修订后的条款。
            </p>
        </div>
        <div>
            <p class="fsize18">第一条&nbsp;&nbsp;&nbsp;&nbsp; 用户资格</p>
            <p class="block65" style="line-height: 24px;">
                1、只有符合下列条件之一的自然人或法人才能申请成为本网站用户，可以使用本网站的服务： <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A、年满十八岁，并具有民事权利能力和民事行为能力的自然人； <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;B、无民事行为能力人或限制民事行为能力人应经过其监护人的同意；<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;C、根据中国法律、法规、行政规章成立并合法存在的机关、企事业单位、社团组织和其他组织。无法人资格的单位或组织不能注册为本网站用户的，其与本网站之间的协议自始无效，本网站一经发现，有权立即终止对该用户的服务，并追究其使用本网站服务的一切法律责任。 <br />
                2、用户需要提供明确的联系地址和联系电话，并提供真实姓名或名称。 <br />
                3、本网站用户须承诺遵守法律法规、社会主义制度、国家利益、公民合法权益、公共秩序、社会道德风尚和信息真实性。<br />
            </p>
        </div>
        <div>
            <p class="fsize18">第二条&nbsp;&nbsp;&nbsp;&nbsp;用户的权利和义务</p>
            <p class="block65" style="line-height: 24px;">
                1、用户有权根据本协议及本网站发布的相关规则，利用本网站发布需求信息、查询用户信息、参与需求投标，在本网站社区及相关产品发布信息，参加本网站的有关活动及有权享受本网站提供的其他有关资讯及信息服务。<br/>
                2、用户有权对部分自身账号相关信息进行查询、更新、删除，并且注销账户。创客桥网网提供部分自助查询、更新、删除信息的功能，如用户可通过登录账号进入“账号设置中心”查看和更新部分账号基础信息、账号安全信息、实名信息等；通过“个人中心”查询和更新部分订单信息、开票信息、评价信息等。同时用户也可通过创客桥网官方客服热线要求创客桥网客服提供相关信息的查询、更新、删除及账户注销服务。<br/>
                3、用户须自行负责自己的用户账号和密码，且须对在用户账号密码下发生的所有活动（包括但不限于发布需求信息、网上点击同意各类协议、规则、参与需求投标等）承担责任。用户有权根据需要更改登录和账户提现密码。因用户的过错导致的任何损失由用户自行承担，该过错包括但不限于：不按照交易提示操作，未及时进行交易操作，遗忘或泄漏密码，密码被他人破解，用户使用的计算机被他人侵入。<br />
                4、用户应当向本网站提供真实准确的注册信息，包括但不限于真实姓名、身份证号、联系电话、地址、邮政编码、企业工商信息等。保证本网站可以通过上述联系方式与自己进行联系。同时，用户也应当在相关资料实际变更时及时更新有关注册资料。<br />
                5、用户在本网站注册的账号名称，不得有下列情形：<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（1）违反宪法或法律法规规定的；<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（2）危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（3）损害国家荣誉和利益的，损害公共利益的；<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（4）煽动民族仇恨、民族歧视，破坏民族团结的；<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（5）破坏国家宗教政策，宣扬邪教和封建迷信的；<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（6）散布谣言，扰乱社会秩序，破坏社会稳定的；<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（7）散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（8）侮辱或者诽谤他人，侵害他人合法权益的；<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（9）含有法律、行政法规禁止的其他内容的。<br />
                6、用户不得以虚假信息骗取账号名称注册，或其账号头像、简介等注册信息存在违法和不良信息。<br/>
                7、用户不得冒用、关联机构或社会名人注册账号名称。<br/>
                8、用户不得以任何形式擅自转让或授权他人使用自己在本网站的用户帐号（实名认证通过后，不能进行变更）。<br/>
                9、用户有义务确保在本网站上发布的需求信息真实、准确，无误导性。　<br/>
                10、用户在本网站上发布需求和在社区内及相关产品发布信息，不得违反国家法律、法规、行政规章的规定，不得侵犯他人知识产权或其他合法权益的信息，不得违背社会公共利益或公共道德，不得违反创客桥网的相关规定。<br/>
                11、用户在本网站交易中应当遵守诚实信用原则，不得以干预或操纵发布需求等不正当竞争方式扰乱网上交易秩序，不得从事与网上交易无关的不当行为。<br/>
                12、用户不应采取不正当手段（包括但不限于虚假需求、互换好评等方式）提高自身或他人信用度，或采用不正当手段恶意评价其他用户，降低其他用户信用度。<br/>
                13、用户不得违反《银行卡业务管理办法》使用银行卡，或利用信用卡套取现金（以下简称套现）；用户不得盗刷他人银行卡；用户不得明知或应知他人可能盗刷银行卡而与对方进行交易。<br/>
                14、用户承诺自己在使用本网站实施的所有行为遵守法律、法规、行政规章和本网站的相关规定以及各种社会公共利益或公共道德。如有违反导致任何法律后果的发生，用户将以自己的名义独立承担相应的法律责任。<br/>
                15、用户在本网站网上交易过程中如与其他用户因交易产生纠纷，可以请求本网站从中予以协调处理。用户如发现其他用户有违法或违反本协议的行为，可以向本网站举报。<br/>
                16、除创客桥网另有规定外，用户应当自行承担因交易产生的相关费用，并依法纳税。<br/>
                17、未经本网站书面允许，用户不得将本网站的任何资料以及在交易平台上所展示的任何信息作商业性利用（包括但不限于以复制、修改、翻译等形式制作衍生作品、分发或公开展示）。<br/>
                18、用户不得使用以下方式登录网站或破坏网站所提供的服务：<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A、以任何机器人软件、蜘蛛软件、爬虫软件、刷屏软件或其它自动方式访问或登录本网站；<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;B、通过任何方式对本公司内部结构造成或可能造成不合理或不合比例的重大负荷的行为；<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;C、通过任何方式干扰或试图干扰网站的正常工作或网站上进行的任何活动。<br/>
                19、用户有权在同意本网站相关规则的前提下享受消费者保障服务（包括但不限于诚信保证、保证完成、保证原创、保证提供源码、保证推广效果、三个月维护、免费修改等）。<br/>
                20、用户同意接收来自本网站的信息，包括但不限于活动信息、交易信息、促销信息等。<br/>
            </p>
        </div>
        <div>
            <p class="fsize18">第三条&nbsp;&nbsp;&nbsp;&nbsp;创客桥网的权利和义务</p>
            <p class="block65" style="line-height: 24px;">
                1、本网站仅为用户提供一个信息交流平台，是雇主发布需求和知识工作者提供解决方案的一个交易市场，本网站对交易双方均不加以监视或控制，亦不主动介入交易的过程。（创客桥网指定主体授权知识工作者进行的交易按照相关规定执行）。<br/>
                2、本网站有义务在现有技术水平的基础上努力确保整个网上交流平台的正常运行，尽力避免服务中断或将中断时间限制在最短时间内，保证用户网上交流活动的顺利进行。<br/>
                3、本网站有义务对用户在注册使用本网站信息平台中所遇到的与交易或注册有关的问题及反映的情况及时作出回复。<br/>
                4、本网站有权对用户的注册资料进行审查，对存在任何问题或怀疑的注册资料，本网站有权发出通知询问用户并要求用户做出解释、改正。<br/>
                5、用户因在本网站网上交易与其他用户产生纠纷的，用户将纠纷告知本网站，或本网站知悉纠纷情况的，经审核后，本网站有权通过电子邮件及电话联系向纠纷双方了解纠纷情况，并将所了解的情况通过电子邮件互相通知对方；用户通过司法机关依照法定程序要求本网站提供相关资料，本网站将积极配合并提供有关资料。<br/>
                6、因网上信息平台的特殊性，本网站不承担对所有用户的交易行为以及与交易有关的其他事项进行事先审查的义务，但如发生以下情形，本网站有权无需征得用户的同意限制用户的活动、向用户核实有关资料、发出警告通知、暂时中止、无限期中止及拒绝向该用户提供服务：<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A、用户以非自然人名义进行认证之后认证主体自行注销或者经有权机关吊销或撤销的；<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;B、用户违反本协议或因被提及而纳入本协议的相关规则；<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;C、存在用户或其他第三方通知本网站，认为某个用户或具体交易事项存在违法或不当行为，并提供相关证据，而本网站无法联系到该用户核证或验证该<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;用户向本网站提供的任何资料；<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;D、存在用户或其他第三方通知本网站，认为某个用户或具体交易事项存在违法或不当行为，并提供相关证据。本网站以普通非专业人员的知识水平标准<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;对相关内容进行判别，可以明显认为这些内容或行为可能对他方或本网站造成财务损失或承担法律责任。<br/>
                7、根据国家法律、法规、行政规章规定、本协议的内容和本网站所掌握的事实依据，可以认定该用户存在违法或违反本协议行为以及在本网站交易平台上的其他不当行为，本网站有权无需征得用户的同意在本网站交易平台及所在网站上以网络发布形式公布该用户的违法行为，并有权随时作出删除相关信息、终止服务提供等处理。<br/>
                8、本网站依据本协议及相关规则，可以冻结、使用、先行赔付、退款、处置用户缴存并冻结在本网站账户内的资金。因违规而被封号的用户账户中的资金在按照规定进行处置后尚有余额的，该用户可申请提现。<br/>
                9、本网站有权在不通知用户的前提下，删除或采取其他限制性措施处理下列信息：包括但不限于以规避费用为目的；以炒作信用为目的；存在欺诈等恶意或虚假内容；与网上交易无关或不是以交易为目的；存在恶意竞价或其他试图扰乱正常交易秩序因素；违反公共利益或可能严重损害本网站和其他用户合法利益。<br/>
            </p>
        </div>
        <div>
            <p class="fsize18">第四条&nbsp;&nbsp;&nbsp;&nbsp;服务的中断和终止</p>
            <p class="block65" style="line-height: 24px;">
                1、本网站可自行全权决定以任何理由(包括但不限于本网站认为用户已违反本协议及相关规则的字面意义和精神等)终止对用户的服务。同时本网站可自行全权决定，在发出通知或不发出通知的情况下，随时停止提供全部或部分服务。服务终止后，本网站没有义务为用户保留原账户中或与之相关的任何信息，或转发任何未曾阅读或发送的信息给用户或第三方。<br/>
                2、若用户申请终止本网站服务，需经本网站审核同意，方可解除与本网站的协议关系，但本网站仍保留下列权利：<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A、本网站有权在法律、法规、行政规章规定的时间内保留该用户的资料，包括但不限于以前的用户资料、交易记录等；<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;B、若终止服务之前，该用户在本网站交易平台上存在违法行为或违反本协议的行为，本网站仍可行使本协议所规定的权利。<br/>
                3、用户存在下列情况，本网站可以终止向该用户提供服务：<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A、在用户违反本协议及相关规则规定时，本网站有权终止向该用户提供服务。本网站将在中断服务时通知用户。但该用户在被本网站终止提供服务后，再一次直接或间接或以他人名义注册为本网站用户的，本网站有权再次单方面终止为该用户提供服务；<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;B、本网站发现用户注册资料中主要内容是虚假的，本网站有权随时终止为该用户提供服务；<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;C、本协议终止或更新时，用户未确认新的协议的；<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;D、其它本网站认为需终止服务的情况。<br/>
            </p>
        </div>
        <div>
            <p class="fsize18">第五条&nbsp;&nbsp;&nbsp;&nbsp;本网站的责任范围</p>
            <p class="block65" style="line-height: 24px;">
                当用户接受该协议时，用户应当明确了解并同意：<br/>
                1、本网站不能随时预见到任何技术上的问题或其他困难。该等困难可能会导致数据损失或其他服务中断。本网站是在现有技术基础上提供的服务。本网站不保证以下事项：<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A、本网站将符合所有用户的要求；<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;B、本网站不受干扰、能够及时提供、安全可靠或免于出错；<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;C、本服务使用权的取得结果是正确或可靠的。<br/>
                2、是否经由本网站下载或取得任何资料，由用户自行考虑、衡量并且自负风险，因下载任何资料而导致用户电脑系统的任何损坏或资料流失，用户应负完全责任。希望用户在使用本网站时，小心谨慎并运用常识。<br/>
                3、用户经由本网站取得的建议和资讯，无论其形式或表现，绝不构成本协议未明示规定的任何保证。<br/>
                4、基于以下原因而造成的利润、商誉、使用、资料损失或其它无形损失，本网站不承担任何直接、间接、附带、特别、衍生性或惩罚性赔偿（即使本网站已被告知前款赔偿的可能性）：<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A、本网站的使用或无法使用；<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;B、用户的传输或资料遭到未获授权的存取或变更；<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;C、本网站中任何第三方之声明或行为；<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;D、本网站在服务交易中为用户提供交易机会，推荐交易方；<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;E、本网站其它相关事宜。<br/>
                5、本网站只是为用户提供一个服务交易的平台，对于用户所发布的需求的合法性、真实性及其品质，以及用户履行交易的能力等，本网站一律不负任何担保责任。（创客桥网指定主体授权知识工作者进行的交易按照相关规定执行）。<br/>
                6、本网站提供与其它互联网上的网站或资源的链接，用户可能会因此连结至其它运营商经营的网站，但不表示本网站与这些运营商有任何关系。其它运营商经营的网站均由各经营者自行负责，不属于本网站控制及负责范围之内。对于存在或来源于此类网站或资源的任何内容、广告、物品或其它资料，本网站亦不予保证或负责。因使用或依赖任何此类网站或资源发布的或经由此类网站或资源获得的任何内容、物品或服务所产生的任何损害或损失，本网站不负任何直接或间接的责任。<br/>
            </p>
        </div>
        <div>
            <p class="fsize18">第六条&nbsp;&nbsp;&nbsp;&nbsp;知识产权</p>
            <p class="block65" style="line-height: 24px;">
                1、本网站及本网站所使用的任何相关软件、程序、内容，包括但不限于作品、图片、档案、资料、网站构架、网站版面的安排、网页设计、经由本网站或广告商向用户呈现的广告或资讯，均由本网站或其它权利人依法享有相应的知识产权，包括但不限于著作权、商标权、专利权或其它专属权利等，受到相关法律的保护。未经本网站或权利人明示授权，用户保证不修改、出租、出借、出售、散布本网站及本网站所使用的上述任何资料和资源，或根据上述资料和资源制作成任何种类产品。<br/>
                2、本网站授予用户不可转移及非专属的使用权，使用户可以通过单机计算机使用本网站的目标代码（以下简称“软件”），但用户不得且不得允许任何第三方复制、修改、创作衍生作品、进行还原工程、反向组译，或以其它方式破译或试图破译源代码，或出售、转让“软件”或对“软件”进行再授权，或以其它方式移转“软件”之任何权利。用户同意不以任何方式修改“软件”，或使用修改后的“软件”。<br/>
                3、用户不得经由非本网站所提供的界面使用本网站。<br/>
            </p>
        </div>
        <div>
            <p class="fsize18">第七条&nbsp;&nbsp;&nbsp;&nbsp;隐私权</p>
            <p class="block65" style="line-height: 24px;">
                1、信息使用<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A、本网站不会向任何人出售或出借用户的个人或法人信息，除非事先得到用户得许可；<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;B、本网站亦不允许任何第三方以任何手段收集、编辑、出售或者无偿传播用户的个人或法人信息。任何用户如从事上述活动，一经发现，本网站有权立即终止与该用户的服务协议，查封其账号。<br/>
                2、信息披露<br/>
                用户的个人或法人信息将在下述情况下部分或全部被披露：<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A、经用户同意，向第三方披露；<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;B、用户在使用本网站过程中涉及到知识产权类纠纷，有他方主张权利的，本网站在审核主张方提交的资料后认为披露用户信息有助于纠纷解决的；<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;C、根据法律的有关规定，或者行政、司法机关的要求，向第三方或者行政、司法机关披露；<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;D、若用户出现违反中国有关法律或者网站规定的情况，需要向第三方披露；<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;E、为提供你所要求的产品和服务，而必须和第三方分享用户的个人或法人信息；<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;F、为保护您、我们的其他用户或我们的关联方的合法权益，我们可能将您的个人信息用于预防、发现、调查以下事项：欺诈、危害安全、违法或违反与我们或其关联方协议、政策或规则的行为；<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;G、在遵循隐私权保护以及其他相应的保密安全措施的前提下，允许我们将您的个人信息提供给相关合作方，让其根据我方指令处理相关信息；<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;H、其它本网站根据法律或者网站规定认为合适的披露。<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;若您不同意以上内容，请立即停止使用创客桥网平台服务。<br/>
                用户或者第三方申请本网站披露其他用户信息的，本网站有权视实际情况要求申请人出具申请书，申请书内容应包含申请披露的信息范围、用途及使用承诺等内容。<br/>
                3、信息安全<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A、在使用本网站服务进行网上交易时，请用户妥善保护自己的个人或法人信息，仅在必要的情形下向他人提供；<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;B、如果用户发现自己的个人或法人信息泄密，尤其是用户账户或“支付账户管理”账户及密码发生泄露，请用户立即联络本网站客服，以便我们采取相应措施。<br/>
            </p>
        </div>
        <div>
            <p class="fsize18"> 第八条&nbsp;&nbsp;&nbsp;&nbsp;不可抗力</p>
            <p class="block65" style="line-height: 24px;">
                因不可抗力或者其他意外事件，使得本协议的履行不可能、不必要或者无意义的，双方均不承担责任。本合同所称之不可抗力意指不能预见、不能避免并不能克服的客观情况，包括但不限于战争、台风、水灾、火灾、雷击或地震、罢工、暴动、法定疾病、黑客攻击、网络病毒、电信部门技术管制、政府行为或任何其它自然或人为造成的灾难等客观情况。<br/>
            </p>
        </div>
        <div>
            <p class="fsize18">第九条&nbsp;&nbsp;&nbsp;&nbsp;保密</p>
            <p class="block65" style="line-height: 24px;">
                用户保证在使用本网站过程中所获悉的属于创客桥网及他方的且无法自公开渠道获得的文件及资料（包括但不限于商业秘密、公司计划、运营活动、财务信息、技术信息、经营信息及其他商业秘密）予以保密。未经该资料和文件的原提供方同意，用户不得向第三方泄露该商业秘密的全部或者部分内容。但法律、法规、行政规章另有规定或者双方另有约定的除外。<br/>
            </p>
        </div>
        <div>
            <p class="fsize18">第十条&nbsp;&nbsp;&nbsp;&nbsp;交易纠纷解决方式</p>
            <p class="block65" style="line-height: 24px;">
                1、本协议及其规则的有效性、履行和与本协议及其规则效力有关的所有事宜，将受中华人民共和国法律管辖，任何争议仅适用中华人民共和国法律。<br/>
                2、本网站有权受理并调处您与其他用户因交易服务产生的纠纷，同时有权单方面独立判断其他用户对您的举报及索偿是否成立，若判断索偿成立，则本网站有权划拨您已支付的担保金或交纳的保证金以及账户余额进行相应偿付。本网站没有使用自用资金进行偿付的义务，但若进行了该等支付，您应及时赔偿本网站的全部损失，否则本网站有权通过前述方式抵减相应资金或权益，如仍无法弥补损失，则本网站保留继续追偿的权利。因本网站非司法机关，您完全理解并承认，本网站对证据的鉴别能力及对纠纷的处理能力有限，受理交易纠纷完全是基于您之委托，不保证处理结果符合您的期望，本网站有权决定是否参与争议的调处。详情请查看《创客桥网举报和争议纠纷处理规则》。<br/>
                3、凡因履行本协议及其规则发生的纠纷以及在创客桥网上交易产生的所有纠纷，各方可协商解决，若协商不成的，各方一致同意提交重庆仲裁委员会按其仲裁规则进行仲裁。<br/>
            </p>
        </div>
        <div>
            <p class="fsize18">第十一条&nbsp;&nbsp;&nbsp;&nbsp;完整协议</p>
            <p class="block65" style="line-height: 24px;">
                本协议由本协议条款与《创客桥网服务规则》《创客桥网弃选需求赏金分配规则》《创客桥网发票开具规则》等本网站公示的各项规则组成，相关名词可互相引用参照，如有不同理解，以本协议条款为准。<br/>
                您对本协议理解和认同，您即对本协议所有组成部分的内容理解并认同，一旦您使用本服务，你和本公司即受本协议所有组成部分的约束。<br/>
            </p>
        </div>
        <div>
            <p class="fsize18">第十二条&nbsp;&nbsp;&nbsp;&nbsp;创客桥网对本服务协议包括基于本服务协议制定的各项规则拥有最终解释权。</p>
        </div>
        <div>
            <p class="fsize18">第十三条&nbsp;&nbsp;&nbsp;&nbsp;附则</p>
            <p class="block65" style="line-height: 24px;">
                "在本协议中所使用的下列词语，除非另有定义，应具有以下含义：<br/>
                "本网站"在无特别说明的情况下，均指"创客桥网"（www.scrmmc.com）。<br/>
                "用户"：指具有完全民事行为能力的创客桥网各项服务的使用者。<br/>
                "雇主"：是指在本网站上进行发布需求或购买增值服务等"买"操作的用户。<br/> 
                "知识工作者"：是指在本网站上参加竞标、销售服务、出售技能等"卖"操作的用户。<br/>
            </p>
        </div>
    </div>  `
    //  用户协议文字结束
})
