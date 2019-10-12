define(function () {
    var setWithoutAnyEvent = {
        //请出园区
        submitWithoutAny: function (rentData,oAlert) {
            var me = this;
            $("#or_outPark").on("click", function () {

                var alert1 = oAlert.oAlert({
                    style:'wap',
                    title:'提示',
                    content : "确定请出园区！",
                    buttons :{
                        '确定' : function(){
                            alert1.close();
                            $loading.init({
                                next: function (e) {
                                    rentData.setAjax({
                                        url:"/kickOutPark",
                                        type:"POST",
                                        data:{
                                            user_id : document.body.dataset.user_id,
                                            room_id : document.body.dataset.room_id,
                                            park_id : document.body.dataset.room_id
                                        },
                                        loading:e
                                    })
                                }
                            });
                        },
                        '取消': function(){
                            alert1.close();
                        },
                    }
                })


            })


            $("#or_receive").on("click", function () {
                window.location.href = "/renewal/" + document.body.dataset.user_id;
            })

        }

    }
    return setWithoutAnyEvent;
})