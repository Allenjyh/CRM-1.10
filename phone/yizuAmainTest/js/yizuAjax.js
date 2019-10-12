const yizuAjax = {
    tsSubmit : function(obj){

        try {
            console.log(obj)
        }catch (e) {

        }
        //url,ele,data,callback
        if(obj.ele){
            $(obj.ele).on('click',function(){

                f(obj,this)

            })
        }else {
            f(obj)
        }



        function f(o,e) {
            if(o.beforeCall){
                let beforeStatus =  o.beforeCall();

                if(typeof beforeStatus == "object"){


                    if(beforeStatus.status){
                        layer.tips(beforeStatus.msg, o.ele, {
                            tips: [2, '#3595CC'],
                            time: 4500
                        });
                        return false;
                    }

                }else {
                    if(beforeStatus){
                        return false;
                    }
                }
            }



            let loading = $('<div class="test-loading-box"></div>');
            let _parents = e ? $(e).parents(".test-loading") : $("body");
            _parents.css("position", "relative").append(loading)

            if(o.url){
                $.ajax({
                    type:o.url ? o.url : "post",
                    url:o.url,
                    data:o.data ? o.data : "",
                    dataType: 'json',
                    contentType: "application/x-www-form-urlencoded",
                    success: function(res){
                        layer.msg('成功', {icon: 1});

                        if(o.confirm){
                            layer.close(o.confirm);
                        }

                    },
                    error : function(e){
                        layer.alert(e)
                    },
                    complete : function(res){
                        loading.remove()
                        if(o.callback){
                            o.callback(res)
                        }


                    }
                });
            }else {
                setTimeout(function () {
                    loading.remove();
                    if(o.confirm){
                        layer.close(o.confirm);
                    }
                },1500)
            }
        }

        return this;

    },
    /* 是否是正确的手机号码*/
    validatePhone : function (value,callback) {
        const reg =/^[1][3,4,5,6,7,8,9][0-9]{9}$/;
        if(value==''||value==undefined||value==null){
            callback();
        }else {
            if ((!reg.test(value)) && value != '') {
                return {status:true,msg:'请输入正确的电话号码'}
            } else {
                return false;
            }
        }
    }
}
