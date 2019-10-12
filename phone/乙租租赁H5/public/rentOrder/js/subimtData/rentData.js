define(function(){
    var rentData = {
        setAjax : function(opt){
            console.log(opt);
            var me = this;
            $.ajax({
                type: opt.type,
                url: opt.url,
                data: opt.data,
                dataType: 'json',
                contentType: "application/x-www-form-urlencoded",
                success: function (res) {
                    if(res.error_code == 200){
                        me.operation(opt.url,res)
                    }else  if(res.error_code == 2021){
                        document.location = res.data;
                    }else  if(res.error_code == 2023){
                        window.location.reload()
                    }else if(res.error_code == 2024){
                        document.location = "/auditingLast/"+document.body.dataset.id;
                    }
                },
                error: function(msg){
                    alert("系統出錯！");
                },
                complete : function(){
                    opt.loading.close();
                }
            })

        },
        operation : function(type,res){
            switch (type){

                //续租
                case "/renewal" :
                    alert(res);
                    break;
                //创建订单
                case "/createOrder" :
                    alert(res);
                    history.back(-1);
                    break;
                case "/auditingLast" :
                    alert(res)

                case " /auditingNext" :
                    //document.location = "/auditingLast/"+document.body.dataset.id;
                    break;
                default:
                    break;
            }
        }
    }
    return rentData;
})