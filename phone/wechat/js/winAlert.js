var alerts = {
    _show: function (msg, callback) {
        // console.log(1)


        var _html = "";

        _html += '<div id="mb_box"></div><div id="mb_con"><span id="mb_tit">提示</span>';
        _html += '<div id="mb_msg">' + msg + '</div><div id="mb_btnbox">';

        _html += '<input id="mb_btn_ok" type="button" value="确定" />';

        _html += '</div></div>';

        //必须先将_html添加到body，再设置Css样式
        $("body").append(_html);
        GenerateCss();


        $("#mb_btn_ok").click(function () {
            alerts._hide();

            if (callback) {
                callback(true);
            }

        });
        $("#mb_btn_ok").focus().keypress(function (e) {
            if (e.keyCode == 13 || e.keyCode == 27) $("#mb_btn_ok").trigger('click');
        });


    },
    _hide: function () {
        $("#mb_box,#mb_con").remove();
    }
}


//生成Css
var GenerateCss = function () {

    $("#mb_box").css({
        width: '100%', height: '100%', zIndex: '99999', position: 'fixed',
        filter: 'Alpha(opacity=60)', backgroundColor: 'black', top: '0', left: '0', opacity: '0.6'
    });

    $("#mb_con").css({
        zIndex: '999999', width: '262px', position: 'fixed',
        backgroundColor: 'White', borderRadius: '8px'
    });

    $("#mb_tit").css({
        display: 'inline-table', fontSize: '16px', color: '#444', padding: '10px 0px',
        backgroundColor: '#FFFFFF', borderRadius: '8px 8px 0 0',
        borderBottom: '3px solid #009BFE', fontWeight: 'bold',
        width: "auto", marginLeft: "20px"
    });

    $("#mb_msg").css({
        padding: '25px 20px', lineHeight: '20px',
        borderBottom: '1px solid #DDD', fontSize: '13px',color:'#555'
    });

    $("#mb_ico").css({
        display: 'block', position: 'absolute', right: '10px', top: '9px',
        border: '1px solid Gray', width: '18px', height: '18px', textAlign: 'center',
        lineHeight: '16px', cursor: 'pointer', borderRadius: '8px', fontFamily: '微软雅黑'
    });

    $("#mb_btnbox").css({
        textAlign: 'center', height: "40px",
        lineHeight: "40px",
        background: "linear-gradient(180deg,rgba(24,189,247,1) 0%,rgba(10,136,236,1) 100%)",
        borderRadius: "0 0 8px 8px"
    });
    $("#mb_btn_ok,#mb_btn_no").css({
        width: '100%',
        height: '40px',
        color: '#000000',
        border: 'none',
        outline: 'none'
    });
    $("#mb_btn_ok").css({
        backgroundColor: "transparent",
        color: "#FFFFFF"
    });
    $("#mb_btn_no").css({backgroundColor: 'gray', marginLeft: '20px'});


    //右上角关闭按钮hover样式
    $("#mb_ico").hover(function () {
        $(this).css({backgroundColor: 'Red', color: 'White'});
    }, function () {
        $(this).css({backgroundColor: '#DDD', color: 'black'});
    });

    var _widht = document.documentElement.clientWidth; //屏幕宽
    var _height = document.documentElement.clientHeight; //屏幕高

    var boxWidth = $("#mb_con").width();
    var boxHeight = $("#mb_con").height();

    //让提示框居中
    $("#mb_con").css({top: (_height - boxHeight) / 2 + "px", left: (_widht - boxWidth) / 2 + "px"});
}


// window.alert = alerts._show