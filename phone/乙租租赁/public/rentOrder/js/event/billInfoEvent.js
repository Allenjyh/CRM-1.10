define(function(){
    var setBillInfoEvent = {
        submitBillPay : function(rentData,oAlert){
            $("#or_submitBillPay").on("click",function(){
                var alert1 = oAlert.oAlert({
                    style:'wap',
                    title:'订单异常',
                    content : "物业方正在修改订单，当前不能确认付款",
                    buttons :{
                        '确定' : function(){
                            alert1.close();
                        }
                    }
                })
            })
        }
    };
    return setBillInfoEvent;
})