define(function () {
    var setBillEvent = {
        //输入框事件
        inputEvent: function () {
            //银行卡号
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
                if ($(this).val().length % 5 == 0 && $(this).val().length != 0) {
                    val = $(this).val().replace(/\D/g,"").replace(/(\d{4})/g, "$1 ");

                }
                $(this).val(val.length > 23 ? val.substring(0, 23) : val);
            });

            //整数系列
            $(".or-waterRentThis,.or-electricityThis,.or-waterMeterSpread,.or-electricityMeterSpread").on("input",function(e){
                yzCheck.setInteger(e.target.value,true,function(val){
                    e.target.value = val;
                });
            })

            //不能输入特殊符号 -- 开户名、开户行
            $(".or-bank,.or-bankName").on("input",function(e){
                yzCheck.isSpecialChar(e.target.value,function(val){
                    e.target.value = val;
                });
            })



            /**
             * 计算费用
             * @formula : 月结电费总价 {(本月电表数 - 上月电表数) * 电费单价} + 月结水费总价{(本月水表数 - 上月水表数) * 水费单价} + 租金 + 损耗费用（（月结电费总价+月结水费总价）* 损耗率）+ 管理费
             * **/
            var costEle = [".or-waterRentThis",".or-waterMeterSpread",".or-electricityThis",".or-electricityMeterSpread"];

            costEle.forEach(function(ele){
                $(ele).on("input",function(e){
                    var me = this
                        _total = 0,
                        _otherTotal = 0,
                        _number = 0,
                        _price = parseFloat($(me).attr("data-price")),
                        _lossRate = parseFloat($("#or_lossRate").text()) / 100;

                    if($(this).val()!=""){
                        _number = parseFloat($(me).val()==""?0:$(ele).val()) - parseFloat(($(me).attr("data-cost")!=undefined?$(me).attr("data-cost"):0));
                    }
                    _total = _price * _number;
                    costEle.forEach(function(ele){

                        if((me.className).indexOf(ele.substring(1,ele.length)) < 0){
                            var _otherPrice = parseFloat($(ele).attr("data-price")),
                                _otherNumber = 0;

                            if($(ele).val()!=""){
                                _otherNumber = parseFloat($(ele).val()) - parseFloat(($(ele).attr("data-cost")!=undefined?$(ele).attr("data-cost"):0));
                            }

                            _otherTotal += _otherPrice*_otherNumber;
                        }

                    })
                    var allTotal = ( parseFloat($("#or-manage-pay").attr("data-money"))+ _otherTotal+_total+ (_otherTotal+_total) * _lossRate +parseFloat($("#or-rentMoney").attr("data-othercost")?$("#or-rentMoney").attr("data-othercost"):$("#or-rentMoney").attr("data-cost")));

                    $("#or-thisMonthPrice").text((allTotal > 0 ? allTotal : 0.00).toFixed(2));

                })
            })
            return this;
        },
        //创建协议前判断
        judgeEvent: function () {
            var judgeStatus = true;

            yzCheck.isEmpty([
                {name: "本月水表读数", val: $(".or-waterRentThis").val()},
                {name: "摊分水量", val: $(".or-waterMeterSpread").val()},
                {name: "本月电表读数", val: $(".or-electricityThis").val()},
                {name: "摊分电量", val: $(".or-electricityMeterSpread").val()},
                {name: "开户行", val: $(".or-bank").val()},
                {name: "户名", val: $(".or-bankName").val()},
                {name: "账号", val: $(".or-bankAccount").val()},
            ], function (obj) {
                alert("请输入" + obj.name);
                judgeStatus = false;

            });
            return judgeStatus;
        },
        //确定提交
        subimtBillInfo: function (rentData) {
            var me = this;

            $("#or_subimtBillInfo").on("click", function () {

                if (me.judgeEvent()) {
                    $loading.init({
                        next: function (e) {
                            rentData.setAjax({
                                url:"/createOrder",
                                type:"POST",
                                data:{
                                    //park_id:"",
                                    //user_id:"",
                                    agreement_id:document.body.dataset.agreement_id,
                                    water_ton:$(".or-waterRentThis").val(),//本单水表读数(吨)
                                    share_water_fee:$(".or-waterMeterSpread").val(),//本单分摊水费
                                    electric_degree:$(".or-electricityThis").val(),//本单电表读数(度)
                                    share_electric_fee:$(".or-electricityMeterSpread").val(),//本单分摊电费
                                    pay_money:(parseFloat($("#or-thisMonthPrice").text())).toFixed(2),//总支付金额
                                    bank_name:$(".or-bank").val(),//银行名称
                                    bank_account:$(".or-bankAccount").val(),//银行帐号
                                    payee:$(".or-bankName").val(),//收款人
                                    rent:(parseFloat($("#or-rentMoney").attr("data-othercost")?$("#or-rentMoney").attr("data-othercost"):$("#or-rentMoney").attr("data-cost"))*100).toFixed(),//租金，乘100

                                    //water_unit_price : parseFloat($(".or-waterRent").attr("data-cost")) * 100, //水费单价
                                    last_water_ton : parseFloat($(".or-waterMeter").attr("data-cost")), //上月水表读数
                                    //electric_unit_price : parseFloat($(".or-electricity").attr("data-cost")) * 100, //电费单价
                                    last_electric_degree : parseFloat($(".or-electricityMeter").attr("data-cost"))//上月电表读数
                                },
                                loading:e
                            })
                        }
                    });
                }
                ;

            })
        }

    }
    return setBillEvent;
})