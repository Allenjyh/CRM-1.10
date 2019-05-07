
    function QueryString()
    {
        var s = location.href;
        s = s.replace("parkDetail/","parkDetail/&").split("&");
        var re = "";
            re = s[1];
        return re;
    }
    function fun2(){
        if(typeof QueryString() == "string"){
                wz_center(QueryString())
            }   
    } 
    function wz_center(a){
        var left = 0 ;
            var aa =$(".select_park").length;
            for(var i=0;i<aa;i++){
                if($(".select_park").eq(i).attr("data-id") == a){
                    for(let ii=0;ii<i;ii++){
                        var blockWidth = $(".select_park").eq(ii).width() ;//文字的总宽度
                        left += blockWidth;
                    }
                    // console.log('left '+left)
                    // console.log('文字的总宽度 '+blockWidth);
                    if(i >= 3 ){//&& i < aa-1
                        $(".top_box ul").scrollLeft(left+12);
                    }
                };
            }
        }
    fun2();

$(function(){ 
    setTimeout(() => {
       pie();
    }, 1000);
    
     // 顶部标题点击
     $('.top_box ul li').click(function (e) { 
        // var ii = $(this).index();
        e.preventDefault();
         //切换园区
         var moveX = $(this).position().left+$(this).parent().scrollLeft();
        //  console.log('$(this).position().left '+$(this).position().left)
         var pageX = document.documentElement.clientWidth;//设备的宽度
         var blockWidth = $(this).width();//每一块文字的宽度
        //  console.log(moveX)
        //  console.log(pageX);
        // console.log('每一块文字的宽度 '+blockWidth);
         var left = moveX-(pageX/2)+(blockWidth/2);
        //  console.log('中间显示需要移动的距离2  '+left);
         $(this).addClass('Active').siblings().removeClass('Active');
         $(".top_box ul").scrollLeft(left);
         var park_id = $(this).children('a').attr('data-id');
        $.ajax({
            type:"get",
            url:'/parkDetail/'+park_id,
            // data: obj,
            dataType: 'json',
            contentType: "application/x-www-form-urlencoded",
            success: function(res){
                if (res.error_code == 200) {
                // console.log(res)
                lease_no_count =res.data.cur_park.settled_in_count;
                $('#lease_no_count').text(lease_no_count)
                lease_yes_count =res.data.cur_park.total_num -lease_no_count;
                $('#lease_yes_count').text(lease_yes_count)
                auditing_park(res.data.auditing_park_rooms,res.data.cur_park);
                no_settled_park(res.data.no_settled_park_rooms,res.data.cur_park);
                due_park_rooms(res.data.due_park_rooms,res.data.cur_park);
                all_park_rooms(res.data.all_park_rooms,res.data.cur_park);
                pie();
                }
            }
        });
    });

    //待审核
    function  auditing_park(auditing_park_rooms,cur_park) {
         // console.log(auditing_park_rooms[0])
        if (auditing_park_rooms.length > 0){
            var html = '<div class="box2">'+
            ' <p class="ptitle" style="padding-top:0;position: relative; ">待审核'+
            ' <span class="dsh_a" style="position:absolute;right:18px;bottom:10px;">'+
            '<a href="/moreAud/' + cur_park.park_id + '">更多<i class="iconfont iconnext" style="line-height: 16px;"></i></a>'+
            ' </span></p><ul>';
            for (var i = 0; i < auditing_park_rooms.length; ++i){
                html += '<li onclick="location.href="/auditingDetail/' + auditing_park_rooms[i].aud_user_id + 
                '/' + auditing_park_rooms[i].aud_id + '">' + 
                '<img src="/wechat/images/enter/label1.png" alt="">' + 
                '<span>' + auditing_park_rooms[i].name + '</span></li>';
                    }
                html += '</ul></div>';
                // console.log(html)
                $('.box2_1').html(html);
                return html;    
        }else{
                $('.box2_1').html('');
            }
        

        return '';
     }
     //待租赁
     function  no_settled_park(no_settled_park_rooms,cur_park) {
        //  console.log('no_settled_park_rooms.length '+no_settled_park_rooms.length)
        if (no_settled_park_rooms.length > 0){
            var html = '<div class="box2">'+
            ' <p class="ptitle" style="padding-top:0;position: relative; ">待租赁'+
            ' <span class="dsh_a" style="position:absolute;right:18px;bottom:10px;">'+
            '<a href="/moreSettled/' + cur_park.park_id + '">更多<i class="iconfont iconnext" style="line-height: 16px;"></i></a>'+
            ' </span></p><ul>';
            for (var i = 0; i < no_settled_park_rooms.length; ++i){
                html += 
                ' <li data_id="'+no_settled_park_rooms[i].id+'">'+
                '<img src="/wechat/images/enter/label2.png" alt="">' + 
                '<span>' + no_settled_park_rooms[i].name + '</span></li>';
                    }
            html += '</ul></div>';
            // console.log(html)
            $('.box2_2').html(html);
            return html;    
        }else{
            $('.box2_2').html('');
        }
        return '';
     }
     //即将到期
     function  due_park_rooms(due_park_rooms,cur_park) {
        if (due_park_rooms.length > 0){
            var html = '<div class="box2">'+
            ' <p class="ptitle" style="padding-top:0;position: relative; ">即将到期'+
            ' <span class="dsh_a" style="position:absolute;right:18px;bottom:10px;">'+
            '<a href="/moreDue/' + cur_park.park_id + '">更多<i class="iconfont iconnext" style="line-height: 16px;"></i></a>'+
            ' </span></p><ul>';
            for (var i = 0; i < due_park_rooms.length; ++i){
                html += 
                ' <li data_id="'+due_park_rooms[i].id+'">'+
                '<img src="/wechat/images/enter/label1.png" alt="">' + 
                '<span>' + due_park_rooms[i].name + '<p class="dqsj">'+ new Date( due_park_rooms[i].end_time).toLocaleDateString().replace(/\//g, "-").substr(5, 8)+'到期</p></span></li>';
                    }
            html += '</ul></div>';
            // console.log(html)
            $('.box2_3').html(html);
            return html;    
        }else{
            $('.box2_3').html('');
        }
        return '';
     }
    //全部
    function  all_park_rooms(all_park_rooms,cur_park) {
        if (all_park_rooms.length > 0){
            var html = '<div class="box3">'+
            ' <p class="ptitle">全部</p>'+
            '  <ul id="al_room">';
            for (var i = 0; i < all_park_rooms.length; ++i){
                html += 
              ' <li> <div class="list_each">'+
                    '<div class='+(all_park_rooms[i].is_settled_in == 1 ? "list_qb_l1":"list_qb_l2")+'>'+
                        '<span>'+all_park_rooms[i].name+'</span>'+
                    '</div>'+
                    '<div class="list_qb_r">'+
                        '<p>'+(all_park_rooms[i].is_settled_in == 1 ? all_park_rooms[i].company_name:'待出租')+'</p>'+
                       ' <span>'+(all_park_rooms[i].start_time != 0 ? new Date(all_park_rooms[i].start_time*1000).toLocaleDateString().replace(/\//g, "-"):'')+'</span>'+(all_park_rooms[i].start_time != 0 ?'-':'')+
                       ' <span>'+(all_park_rooms[i].start_time != 0 ? new Date(all_park_rooms[i].end_time*1000).toLocaleDateString().replace(/\//g, "-"):'')+'</span>'+
                        '<span class="list_qb_r_div">'+ (all_park_rooms[i].due !='' && all_park_rooms[i].due ? '即将到期':'')+'</span>'+//isset(
                   ' </div>'+
                '</div>'+
                '</li>';
            }
            html += '</ul></div>';
            // console.log('.box3_1 '+html)
            $('.box3_1').html(html);
            return html;    
        }else{
            $('.box3_1').html('');
        }
        return ''; 
    }
    function pie(){
        var lease_yes_count = (Number( $('#lease_yes_count').text())==0?"":Number( $('#lease_yes_count').text()));//已入驻
        var lease_no_count = Number( $('#lease_no_count').text());//未入驻
        //top_box饼状图
        var labels=[];//图例
        var occupancy;//入驻率
        var data = [{
            "name": "未入驻",
            "value": lease_no_count,
            type : 0,
        }, {
            "name": "已入驻",
            "value": lease_yes_count ,
            type : 1,
        }, {
            "name": "总间数",
            "value": "",
            type : 2,
        }, ]
        let total=0;//总间数
        for(let i=0;i<data.length;i++){
            labels.push({
                name:data[i].name,
                icon:'circle' //设置为圆形
            });
            total+=data[i].value;
        }

        if(data[1].value == 0  ){
            occupancy= "  0";
        }else{

            occupancy=( data[1].value/total*100).toFixed(1)
        }
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));
        var app = {};
        option = null;
        // 指定图表的配置项和数据
        app.title = '环形图';
        option = {
            color:['#FF3758','#0A88EC','#FFB31A'],   //环形颜色
            title: {//图形中间文字
                text: '入住率',
                subtext:' '+occupancy+'%',
                textStyle: {
                    color: 'rgba(0,0,0,0.85)',
                    fontSize: 16,
                    // align: 'center'
                },
                subtextStyle: {
                    fontSize: 16,
                    color: ['rgba(0,0,0,1)']
                },
                x: '41%',
                y: '43%',
            },
            //    tooltip: {//hover
            //        trigger: 'item',
            //        formatter: "{b}: {c}间 ({d}%)"
            //    },
            legend: {//图例
                selectedMode:false,//取消图例上的点击事件
                orient: 'vertical',
                x: 'left',
                itemWidth: 8,   // 设置图例图形的宽
                itemHeight: 10,  // 设置图例图形的高
                formatter:  function(name){
                    var total = 0;
                    var target;
                    var arr=[];
                    for (var i = 0, l = data.length; i < l; i++) {
                        total += data[i].value;
                        target = data[i].value;
                        if (data[i].name == name &&  i ==0) {
                            target = data[0].value;
                            arr = ['{a|'+name+' : '+target+'}', ]
                        }else if(data[i].name == name && i ==1){
                            target = data[1].value;
                               arr = ['{a|'+name+' : '+(target == "" ? 0 : target)+'}', ]
                        }else if(data[i].name == name && i ==2){
                            // target = data[i].value;
                            arr = ['{a|'+name+' : '+total+'}', ]
                        }
                        /*switch(data[i].type){
                            case 0 :
                                arr = ['{a|'+name+' : '+(target == 100 ? 0 : target)+'}', ];
                                break;
                            case 1 :
                                arr = ['{a|'+name+' : '+target+'}', ];
                                break;
                            case 2 :
                                arr = ['{a|'+name+' : '+total+'}', ];
                                break;
                        }*/
                    }
                    // return name + ' ' + ((target/total)*100).toFixed(2) + '%';
                    return arr.join('\n')
                },
                textStyle: {
                    color: 'rgba(0,0,0,0.65)' , // 图例文字颜色
                    rich:{
                        a:{
                            // fontSize:16,
                            // color:'#333'
                            // verticalAlign:'top',
                            //align:'center',
                            lineHeight:8,
                            //   padding:[0,0,-1,0]
                        },
                    }
                },
                data:labels,//['已入驻 ' ,'未入驻 ','总间数 ']//b
            },
            series: [
                {
                    name:'入驻情况',//a
                    type:'pie',//饼状图
                    radius: ['40%', '75%'],
                    center: ['50%', '51%'],
                    labelLine: {    //图形外文字线
                        normal: {
                            length: ((lease_yes_count != 0 && lease_yes_count == (lease_yes_count+lease_no_count)) ? 0 :10),
                            length2:((lease_yes_count != 0 && lease_yes_count == (lease_yes_count+lease_no_count)) ? 0 :40)
                        }
                    },
                    label: {//图形外文字
                        normal: {
                            formatter:function(data){

                                if(data.data.value == 0 && data.data.type == 0){
                                    if(lease_yes_count != 0 && lease_yes_count == (lease_yes_count+lease_no_count)){
                                        return ""
                                    }else {
                                        return data.name+"100%\n\n";
                                    }


                                }else {
                                    return data.name+parseInt(data.percent.toFixed(1)*10)/10+"%\n\n";
                                }
                            } , // '{b}'+'{d}'+'% \n\n',
                            padding: [0, -38],          //文字和图的边距
                            // borderWidth: 60,
                            // borderRadius: 14,
                            rich: {
                            },
                        },
                    },
                    // itemStyle 设置饼状图扇形区域样式
                    itemStyle: {
                        // emphasis：英文意思是 强调;着重;（轮廓、图形等的）鲜明;突出，重读
                        // emphasis：设置鼠标放到哪一块扇形上面的时候，扇形样式、阴影
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(255, 85, 255，0.5)',
                        }
                    },
                    itemStyle:{//板块之间有间隔
                        borderWidth:2, //设置border的宽度有多大
                        borderColor:'#fff',
                    },
                    data:data,
                    // [//   c       //b
                    //  {value:20, name:'未入驻 '},{value:60, name:'已入驻 ' }, {value:'', name:'总间数 '},]
                }
            ]
        };
        // 使用刚指定的配置项和数据显示图表。
        if (option && typeof option === "object") {
            myChart.setOption(option, true);
        }
    }
   //切换园区
    // $('.select_park').click(function () {
    //     var park_id = $(this).attr('data-id');
    //     document.location = '/parkDetail/'+park_id;
    // });
});