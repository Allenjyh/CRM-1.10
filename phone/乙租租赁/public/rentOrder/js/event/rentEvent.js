define(function(){
    var setRentEvent = {

        selectTime : function(){
            //租期开始时间
            picker(["#or_starDate"],function(a){

            },1)

            var MonthArry = [],
                yearArry = [];
            for(var y=0;y<=19;y++){
                if(y <= 11){
                    MonthArry.push({id:y,name:y+"个月"})
                }
                if(y == 0){
                    yearArry.push({id:y,name:y+"年",children:MonthArry})
                }else {
                    yearArry.push({id:y,name:y+"年"})
                }

            }

            var TimeLimit = {
                    levelItem: yearArry
                },
                TheLease = {
                    levelItem: [
                        {id:0,name:"每月",children:[
                                {id:"1,5",name:"1-5日"},
                                {id:"6,10",name:"6-10日"},
                                {id:"11,15",name:"11-15日"},
                                {id:"16,20",name:"16-20日"},
                                {id:"21,25",name:"21-25日"},
                                {id:"26,31",name:"26-31日"}
                            ]}
                    ]
                }

            //租赁期限
            document.querySelector("#timeLimitbtn").addEventListener("click",function(){
                document.getElementById("room-controller").style.display = "block";
                document.body.style.overflow = 'hidden';//浮层出现时窗口不能滚动设置
                document.querySelector("#repTitle").textContent = "租赁期限";
                var repTypePicker = new roomPicker({
                    data:TimeLimit,
                    id:"boxId"
                });
                repTypePicker.init("timeLimitbtn",function(){
                    if(document.querySelector("#repTitle").textContent == "租赁期限"){
                        if(getRoomItem.level1.id == 0 && getRoomItem.level2.id == 0){
                            //alert("租赁期限不能为0年0月");
                            document.getElementById("timeLimitbtn").value = "";
                            document.getElementById("timeLimitbtn").dataset.value = "";
                        }else if(getRoomItem.level1.id == 0 && getRoomItem.level2.id <= 5){
                            //alert("租赁期限不能小于6个月");
                            document.getElementById("timeLimitbtn").value = "";
                            document.getElementById("timeLimitbtn").dataset.value = "";
                        }else {
                            document.getElementById("timeLimitbtn").value = getRoomItem.level1.name + getRoomItem.level2.name;
                            document.getElementById("timeLimitbtn").dataset.value = getRoomItem.level1.id*12 + getRoomItem.level2.id;
                        }

                        document.body.style.overflow = 'auto'; // 浮层关闭时滚动设置
                    }
                })
            },false)

            //交租期
            document.querySelector("#TheLeaseBtn").addEventListener("click",function(){
                document.getElementById("room-controller").style.display = "block";
                document.body.style.overflow = 'hidden';//浮层出现时窗口不能滚动设置
                document.querySelector("#repTitle").textContent = "交租期";
                var repTypePicker = new roomPicker({
                    data:TheLease,
                    id:"boxId"
                });
                repTypePicker.init("TheLeaseBtn",function(){
                    if(document.querySelector("#repTitle").textContent == "交租期"){
                        document.getElementById("TheLeaseBtn").value = getRoomItem.level1.name + getRoomItem.level2.name;
                        document.getElementById("TheLeaseBtn").dataset.value = "0000,00,"+(getRoomItem.level2.id<10?"0"+getRoomItem.level2.id:getRoomItem.level2.id);
                        document.body.style.overflow = 'auto';// 浮层关闭时滚动设置
                    }
                })
            },false)

            return this;
        },
        //input输入判断
        setInputEvent : function(){
            //整数系列
            $(".or-area,.or-waterMeter,.or-electricityMeter").on("input",function(e){
                //this.value=this.value.replace(/\D/g,'')
                yzCheck.setInteger(e.target.value,true,function(val){
                    e.target.value = val;
                });
            })
            //保留两位小数
            $(".or-rent,.or-magfee,.or-deposit,.or-waterRent,.or-electricity").on("input",function(e){
                yzCheck.toDecimal(e.target.value,function(val){
                    e.target.value = val;
                });
            })
            return this;
        },
        //创建协议前判断
        judgeEvent : function(){
            var judgeStatus = true;

            yzCheck.isEmpty([
                {name:"面积",val:$(".or-area").val()},
                {name:"租金",val:$(".or-rent").val()},
                {name:"管理费",val:$(".or-magfee").val()},
                {name:"起租日期",val:$("#or_starDate").val()},
                {name:"租期",val:$("#timeLimitbtn").val()},
                {name:"交租期",val:$("#TheLeaseBtn").val()},
                {name:"免租期",val:$(".or-Rentfree").val()},
                {name:"押金",val:$(".or-deposit").val()},

                {name:"租金递增率",val:$(".or-IncreasingRateForRent").val()},
                {name:"租金递增起始年",val:$(".or-IncreasingForRent").val()},
                {name:"租金递增频次",val:$(".or-IncreasingForRentSpread").val()},

                {name:"水费单价",val:$(".or-waterRent").val()},
                {name:"上月水表读数",val:$(".or-waterMeter").val()},
                {name:"电费单价",val:$(".or-electricity").val()},
                {name:"上月电表读数",val:$(".or-electricityMeter").val()},
                {name:"损耗",val:$(".or-loss").val()},
            ],function(obj){
                alert("请输入"+obj.name);
                judgeStatus = false;

            });
            return judgeStatus;
        },
        //创建协议
        subimtRent : function(rentData){
            var me = this;

            $("#or_subimtRent").on("click",function(){

                if(me.judgeEvent()){
                    $loading.init({
                        next: function (e) {
                            rentData.setAjax({
                                url:"/auditingNext",
                                type:"PUT",
                                data:{
                                    id : $("body").attr("data-id"),
                                    area : parseInt($(".or-area").val()),
                                    rent : parseFloat($(".or-rent").val()) * 100,
                                    manage_fee : parseFloat($(".or-magfee").val()) * 100,
                                    start_time : (new Date($("#or_starDate").val())).getTime() / 1000 , //租期开始时间
                                    age_limit : parseInt($("#timeLimitbtn").attr("data-value")), //租期
                                    pay_time : $("#TheLeaseBtn").attr("data-value"),//交租期，年,月,开始日,结束日 没有的年或月以空字符补充
                                    rent_free_time : $(".or-Rentfree").val(),
                                    deposit : parseFloat($(".or-deposit").val()) * 100, //押金，乘100

                                    add_ratio : parseFloat($(".or-IncreasingRateForRent").val()) * 100, //租金递增率，乘100，不用传%
                                    add_start : $(".or-IncreasingForRent").val(),//租金递增起始年
                                    add_frequency : $(".or-IncreasingForRentSpread").val(),//租金递增频次

                                    water_ton : parseFloat($(".or-waterRent").val()) * 100, //水费单价，乘100
                                    last_water_ton : parseFloat($(".or-waterMeter").val()), //上月水表读数，乘100
                                    electric_degree : parseFloat($(".or-electricity").val()) * 100, //电费单价，乘100
                                    last_electric_degree : parseFloat($(".or-electricityMeter").val()), //上月电表读数，乘100
                                    loss_fee : parseFloat($(".or-loss").val()) * 100 //损耗，乘100，不用%
                                },
                                loading:e
                            })
                        }
                    });
                };

            })


            $("#or_renewal").on("click",function(){

                if(me.judgeEvent()){
                    $loading.init({
                        next: function (e) {
                            rentData.setAjax({
                                url:"/renewal",
                                type:"POST",
                                data:{
                                    user_id : $("body").attr("data-user_id"),
                                    area : parseInt($(".or-area").val()),
                                    rent : parseFloat($(".or-rent").val()) * 100,
                                    manage_fee : parseFloat($(".or-magfee").val()) * 100,
                                    start_time : (new Date($("#or_starDate").val())).getTime() / 1000 , //租期开始时间
                                    age_limit : parseInt($("#timeLimitbtn").attr("data-value")), //租期
                                    pay_time : $("#TheLeaseBtn").attr("data-value"),//交租期，年,月,开始日,结束日 没有的年或月以空字符补充
                                    rent_free_time : $(".or-Rentfree").val(),
                                    deposit : parseFloat($(".or-deposit").val()) * 100, //押金，乘100

                                    add_ratio : parseFloat($(".or-IncreasingRateForRent").val()) * 100, //租金递增率，乘100，不用传%
                                    add_start : $(".or-IncreasingForRent").val(),//租金递增起始年
                                    add_frequency : $(".or-IncreasingForRentSpread").val(),//租金递增频次

                                    water_ton : parseFloat($(".or-waterRent").val()) * 100, //水费单价，乘100
                                    last_water_ton : parseFloat($(".or-waterMeter").val()), //上月水表读数，乘100
                                    electric_degree : parseFloat($(".or-electricity").val()) * 100, //电费单价，乘100
                                    last_electric_degree : parseFloat($(".or-electricityMeter").val()), //上月电表读数，乘100
                                    loss_fee : parseFloat($(".or-loss").val()) * 100 //损耗，乘100，不用%
                                },
                                loading:e
                            })
                        }
                    });
                };

            })


        }

    }
    return setRentEvent;
})