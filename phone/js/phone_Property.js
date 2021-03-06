$(function(){
    // 顶部标题点击
    $('.top_box ul li').click(function (e) { 
        e.preventDefault();
        // $(".top_box ul li").on("click",function(ev){//li
            var moveX = $(this).position().left+$(this).parent().scrollLeft();
            var pageX = document.documentElement.clientWidth;
            var blockWidth = $(this).width();
            // console.log(moveX)
            // console.log(pageX);
            // console.log(blockWidth);
            var left = moveX-(pageX/2)+(blockWidth/2);
            // console.log(left);
            $(this).addClass('Active').siblings().removeClass('Active');
            $(".top_box ul").scrollLeft(left);//ul


        // })
    });

//     //top_box饼状图
//     var labels=[];//图例
//     var occupancy;//入驻率
//     var data = [{
//            "name": "未入驻",
//            "value":0,
//        }, {
//            "name": "已入驻",
//            "value": 0 == 0 ? '': 0,
//        }, {
//            "name": "总间数",
//            "value": ''
//        }, ]
//     let total=0;//总间数
//    for(let i=0;i<data.length;i++){
//        labels.push({
//                name:data[i].name,
//                icon:'circle' //设置为圆形
//        });
//        total+=data[i].value;
//    }
//    occupancy=(data[1].value/total*100).toFixed(1)
//    // 基于准备好的dom，初始化echarts实例
//    var myChart = echarts.init(document.getElementById('main'));
//    var app = {};
//    option = null;
//            // 指定图表的配置项和数据
//    app.title = '环形图';
//    option = {
//        color:['#FF3758','#0A88EC','#FFB31A'],   //环形颜色
//        title: {//图形中间文字
//            text: '入住率',
//            subtext:' '+occupancy+'%',
//            textStyle: {
//                 color: 'rgba(0,0,0,0.85)',
//                 fontSize: 16,
//                 // align: 'center'
//            },
//            subtextStyle: {
//                fontSize: 16,
//                color: ['rgba(0,0,0,1)']
//            },
//            x: '41%',
//            y: '43%',
//        },
//     //    tooltip: {//hover
//     //        trigger: 'item',
//     //        formatter: "{b}: {c}间 ({d}%)"
//     //    },
//        legend: {//图例
//            orient: 'vertical',
//            x: 'left',
//            itemWidth: 8,   // 设置图例图形的宽
//            itemHeight: 10,  // 设置图例图形的高
//            formatter:  function(name){
//                var total = 0;
//                var target;
//                var arr=[];
//                for (var i = 0, l = data.length; i < l; i++) {
//                total += data[i].value;
//                if (data[i].name == name && i !==2) {
//                    target = data[i].value;
//                     arr = ['{a|'+name+' : '+target+'}', ]
//                }else if(data[i].name == name && i ==2){
//                    // target = data[i].value;
//                     arr = ['{a|'+name+' : '+total+'}', ]
//                }
//                }
//                // return name + ' ' + ((target/total)*100).toFixed(2) + '%';
//                return arr.join('\n')
//            },
//            textStyle: {
//            color: 'rgba(0,0,0,0.65)' , // 图例文字颜色
//            rich:{
//                    a:{
//                        // fontSize:16,
//                        // color:'#333'
//                       // verticalAlign:'top',
//                        //align:'center',
//                       lineHeight:8,
//                     //   padding:[0,0,-1,0]
//                    },
//                }
//            },
//            data:labels,//['已入驻 ' ,'未入驻 ','总间数 ']//b
//        },
//        series: [
//            {
//                name:'入驻情况',//a
//                type:'pie',//饼状图
//                radius: ['40%', '75%'],
//                center: ['50%', '51%'],
//                labelLine: {    //图形外文字线
//                    normal: {
//                        length: 10,
//                        length2:40
//                    }
//                },
//                label: {//图形外文字
//                    normal: {
//                        formatter:'{b}'+'{d}'+'% \n\n',//.toFixed(1)
//                        padding: [0, -38],          //文字和图的边距
//                        // borderWidth: 60,
//                        // borderRadius: 14,
//                        rich: {
//                        },
//                    },
//                },
//                 // itemStyle 设置饼状图扇形区域样式
//                 itemStyle: {
//                    // emphasis：英文意思是 强调;着重;（轮廓、图形等的）鲜明;突出，重读
//                    // emphasis：设置鼠标放到哪一块扇形上面的时候，扇形样式、阴影
//                    emphasis: {
//                    shadowBlur: 10,
//                    shadowOffsetX: 0,
//                    shadowColor: 'rgba(255, 85, 255，0.5)',
//                    }
//                },
//                itemStyle:{//板块之间有间隔
//                    borderWidth:2, //设置border的宽度有多大
//                    borderColor:'#fff',
//                },
//                data:data,
//                // [//   c       //b
//                //  {value:20, name:'未入驻 '},{value:60, name:'已入驻 ' }, {value:'', name:'总间数 '},]
//            }
//        ]
//    };
//    // 使用刚指定的配置项和数据显示图表。
//    if (option && typeof option === "object") {
//     myChart.setOption(option, true);
//     }
//   //饼状图end

    pie()
    function pie(){
        // var lease_yes_count = (Number( $('#lease_yes_count').text()) < 0 ? 0 :Number( $('#lease_yes_count').text()));//已入驻
        // var lease_no_count = (Number( $('#lease_no_count').text()) < 0 ? 0 :Number( $('#lease_no_count').text())) ;//未入驻
        var lease_yes_count =1;
        var lease_no_count =2;
        //top_box饼状图
        var labels=[];//图例
        var occupancy;//入驻率
        var data = [{
            "name": "未入驻",
            "value": lease_no_count  ,
            type : 0,
        }, {
            "name": "已入驻",
            "value": lease_yes_count == 0 ? '': lease_yes_count,
            type : 1,
        }, {
            "name": "总间数",
            "value": '',
            type : 2,
        }, ]
        let total=0;//总间数
        for(let i=0;i<data.length;i++){
            labels.push({
                name:data[i].name,
                icon:'circle' //设置为圆形
            });
            total = lease_yes_count + lease_no_count;
        }

        if(data[1].value == 0  ){
            occupancy= "  0";
        }else{
            occupancy=((data[1].value/total*100).toFixed(1) > 100 ? ' 0 ' : (data[1].value/total*100).toFixed(1))
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
                text: '入驻率',
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
                x: '41.5%',
                y: '42.5%',
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
                        total = lease_yes_count +lease_no_count;
                        target = data[i].value;
                        if (data[i].name == name &&  i ==0) {
                            target = data[0].value;
                            arr = ['{a|'+name+' : '+(target == "" ? 0 : target)+'}', ]
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
                    // return name + ' ' + ((target/total)*100) + '%';
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
                            length: (((lease_yes_count != 0 && lease_yes_count == (lease_yes_count+lease_no_count)) || lease_yes_count == 0) ? 20 :10),//短
                            length2:(((lease_yes_count != 0 && lease_yes_count == (lease_yes_count+lease_no_count))|| lease_yes_count == 0) ? 65 :40)//长
                        }
                    },
                    label: {//图形外文字
                        normal: {
                            formatter:function(data){

                                if(data.data.value == 0 && data.data.type == 0){
                                    if(lease_yes_count != 0 && lease_yes_count == (lease_yes_count+lease_no_count)){
                                        return "\n\n"+data.name+"0%"
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
                            // textStyle: {// 线上文字颜色
                            //   color: 'rgba(0,0,0,0.65)',
                            //   fontSize: 14,
                            //   align: 'center'
                            // },
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


})
