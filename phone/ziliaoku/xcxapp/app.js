//node app.js
//1.使用express构建web服务器
const express = require("express")
const pool = require("./pool")
const bodyParser = require('body-parser');
const session = require('express-session');
/*引入路由模块*/
const fenlei = require("./routes/fenlei")
const login = require("./routes/login")
const shopingcart = require("./routes/shopingcart")
//2.创建express对象
var app= express();
//服务器node.js 允许跨域访问配置
//2.1：引入跨域模块
const cors = require("cors");
//2.2:配置允许哪个程序跨域访问 脚手架
app.use(cors({
    origin:[
        "http://127.0.0.1:3001","http://localhost:3001"],
    credentials:true  //是否信任
}))

//3.指定静态目录
app.use(express.static(__dirname+"/public"));
//使用body-parser中间件 作用是对post请求的请求体进行解析
app.use(bodyParser.urlencoded({extended:false}));
app.use(session({
    secret: '128位随机字符串',
    resave: false,
    saveUninitialized: true,
  })) 
  
app.use("/fenlei",fenlei)
app.use("/login",login)//1.登录
//app.get("/login",(req,res)=>{
    //1.参数 2个uname upwd
    //2.
//     var uname = req.query.uname;
//     var upwd = req.query.upwd;
//   var sql= "SELECT count(id) as c FROM xz_user1"
//      sql+= "   where uname=? AND upwd = md5(?)"
//     pool.query(sql,[uname,upwd],(err,result)=>{
//         if(err)throw err;
//         if(result[0].c==0){
//             res.send({code:-1,msg:"用户名或密码错误"})
//         }else{
//             res.send({code:1,msg:"登录成功"})
//         }
//     })
//   }) 
//app.use("/shopingcart",fenlei)
//4.绑定监听端口
app.listen(3000);   

//功能七：购物车数据列表
//组件发送ajax请求获取并显示数据
app.get("/shopCart",(req,res)=>{
    var obj = [];
    obj.push({id:1,title:"衬衫 免烫 天蓝色",price:258,count:2})
    obj.push({id:2,title:"衬衫 牛津坊 白色",price:358,count:1})
    obj.push({id:3,title:"衬衫 牛津坊 白色",price:258,count:1})
    res.send(obj);
})

//功能一：1.1 homeContair.vue首页轮播图
app.get("/imagelist1",(req,res)=>{
    var formatDate = function () {
        var date = new  Date();
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return y + '-' + m + '-' + d;
    };
var myYear = formatDate();
    var obj = [
        {id:1,img_url:"http://127.0.0.1:3000/img/1.jpg",title:"休闲鞋子",ctime:myYear,desc:"鞋子大降价"},
        {id:2,img_url:"http://127.0.0.1:3000/img/2.jpg",title:"飞行外套",ctime:myYear,desc:"外套大降价"},
        {id:3,img_url:"http://127.0.0.1:3000/img/3.jpg",title:"免烫衬衫",ctime:myYear,desc:"免烫衬衫大降价"},
        {id:4,img_url:"http://127.0.0.1:3000/img/4.jpg",title:"牛津纺衬衫",ctime:myYear,desc:"牛津纺衬衫大降价"},
    ];
    res.send(obj);
})
//功能一：1.2 homeContair.vue小图片拉转
app.get("/imagelist2",(req,res)=>{
    var obj = [
        {id:1,img_url1:"http://127.0.0.1:3000/img/3-1.jpg",img_url2:"http://127.0.0.1:3000/img/3-2.jpg",img_url3:"http://127.0.0.1:3000/img/3-3.jpg",img_url4:"http://127.0.0.1:3000/img/3-4.jpg"},
        {id:2,img_url1:"http://127.0.0.1:3000/img/3-11.jpg",img_url2:"http://127.0.0.1:3000/img/3-8.jpg",img_url3:"http://127.0.0.1:3000/img/3-9.jpg",img_url4:"http://127.0.0.1:3000/img/3-5.jpg"},
        {id:3,img_url1:"http://127.0.0.1:3000/img/3-12.jpg",img_url2:"http://127.0.0.1:3000/img/3-2.jpg",img_url3:"http://127.0.0.1:3000/img/3-3.jpg",img_url4:"http://127.0.0.1:3000/img/3-4.jpg"},
       
    ];
    res.send(obj);
})
//1.3小程序
app.get("/imagelist11",(req,res)=>{
    var obj = [
        {id:1,img_url1:"http://127.0.0.1:3000/img/3-8.jpg",title:"衬衫 免烫 天蓝色"},
        {id:2,img_url1:"http://127.0.0.1:3000/img/3-2.jpg",title:"衬衫 免烫 天蓝色"},
        {id:3,img_url1:"http://127.0.0.1:3000/img/3-3.jpg",title:"衬衫 免烫 天蓝色"},
        {id:4,img_url1:"http://127.0.0.1:3000/img/3-4.jpg",title:"衬衫 免烫 天蓝色"},
        {id:5,img_url1:"http://127.0.0.1:3000/img/3-5.jpg",title:"衬衫 免烫 天蓝色"},
        {id:6,img_url1:"http://127.0.0.1:3000/img/3-6.jpg",title:"衬衫 免烫 天蓝色"},
        {id:7,img_url1:"http://127.0.0.1:3000/img/3-7.jpg",title:"衬衫 免烫 天蓝色"},
        {id:8,img_url1:"http://127.0.0.1:3000/img/3-8.jpg",title:"衬衫 免烫 天蓝色"},
        {id:9,img_url1:"http://127.0.0.1:3000/img/3-9.jpg",title:"衬衫 免烫 天蓝色"},  
    ];
    res.send(obj);
})
//1.4
app.get("/imgdetail1",(req,res)=>{
    var obj = [
        {id:0,img_url:"http://127.0.0.1:3000/img/3.jpg"},
        {id:1,img_url:"http://127.0.0.1:3000/img/4_01.jpg"},
        {id:2,img_url:"http://127.0.0.1:3000/img/4_02.jpg"},
        {id:3,img_url:"http://127.0.0.1:3000/img/4_03.jpg"},
        {id:4,img_url:"http://127.0.0.1:3000/img/4_04.jpg"},
        {id:5,img_url:"http://127.0.0.1:3000/img/4_05.jpg"}, 
        {id:6,img_url:"http://127.0.0.1:3000/img/4_06.jpg"},
        {id:7,img_url:"http://127.0.0.1:3000/img/4_07.jpg"},
        {id:8,img_url:"http://127.0.0.1:3000/img/4_08.jpg"},
        {id:9,img_url:"http://127.0.0.1:3000/img/4_09.jpg"}, 
        {id:10,img_url:"http://127.0.0.1:3000/img/4_10.jpg"},
        {id:11,img_url:"http://127.0.0.1:3000/img/4_11.jpg"},
        {id:12,img_url:"http://127.0.0.1:3000/img/4_12.jpg"},
        {id:13,img_url:"http://127.0.0.1:3000/img/4_13.jpg"}, 
        {id:14,img_url:"http://127.0.0.1:3000/img/4_14.jpg"},
        {id:15,img_url:"http://127.0.0.1:3000/img/4_15.jpg"},
        {id:16,img_url:"http://127.0.0.1:3000/img/4_16.jpg"}, 
        {id:17,img_url:"http://127.0.0.1:3000/img/4_17.jpg"},
        {id:18,img_url:"http://127.0.0.1:3000/img/4_18.jpg"},
        {id:19,img_url:"http://127.0.0.1:3000/img/4_19.jpg"},
        {id:20,img_url:"http://127.0.0.1:3000/img/4_20.jpg"},
    ];
    res.send(obj)
})
//功能二:2.1分页显示:新闻分页
app.get("/newslist",(req,res)=>{
    //1:参数  当前页码  页大小(一页显示几行数据)
    var pno = req.query.pno;            //2
    var pageSize = req.query.pageSize;  //5
    //2:sql
    //2.1:查找总记录数->转换总页数  15->3
    var sql = "SELECT count(id) as c FROM xz_news";
    var obj = {};      //保存发送客户端数据
    var progress = 0;  //进度
    pool.query(sql,(err,result)=>{
        if(err)throw err;
        var c = Math.ceil(result[0].c/pageSize);
        obj.pageCount = c;
        progress+=50;
        if(progress==100){
          res.send(obj);
        }
    });
    //2.2:查找当前页内容           中间5行
    var sql = " SELECT id,title,img_url,ctime,point";
       sql += " FROM xz_news";
       sql += " LIMIT ?,?";
    var offset = parseInt((pno-1)*pageSize);   
    //计算分页偏移量z
    pageSize = parseInt(pageSize)
    pool.query(sql,[offset,pageSize],(err,result)=>{
        if(err)throw err;
        //console.log(result);
        obj.data = result;
        progress+=50;
        if(progress==100){
          res.send(obj);
        }
    })
    //3:结果格式
  });
//1.4 免烫图片详情
app.get("/imgdetailList",(req,res)=>{
    var obj = [     
        {id:0,img_url1:"http://127.0.0.1:3000/img/1-3.jpg",img_url2:"http://127.0.0.1:3000/img/3-8.jpg",title:"衬衫 免烫 天蓝色",price:"288",color:"天蓝色",size:"M",img_url3:"http://127.0.0.1:3000/img/3-3.jpg",title1:"衬衫 免烫 天蓝色",price1:"258",color:"天蓝色",size:"M"},
        {id:1,img_url1:"http://127.0.0.1:3000/img/1-6.jpg",img_url2:"http://127.0.0.1:3000/img/3-9.jpg",title:"衬衫 牛津坊 白色",price:"388",color:"白色",size:"L",img_url3:"http://127.0.0.1:3000/img/3-4.jpg",title1:"衬衫 牛津坊 白色",price1:"358",color:"白色",size:"L"},
        {id:2,img_url1:"http://127.0.0.1:3000/img/1-9.jpg",img_url2:"http://127.0.0.1:3000/img/3-5.jpg",title:"衬衫 牛津坊 红色",price:"288",color:"白色",size:"XL",img_url3:"http://127.0.0.1:3000/img/3-7.jpg",title1:"衬衫 牛津坊 红色",price1:"258",color:"白色",size:"XL"},
        {id:3,img_url1:"http://127.0.0.1:3000/img/1-3.jpg",img_url2:"http://127.0.0.1:3000/img/3-6.jpg",title:"衬衫 免烫 天蓝色",price:"288",img_url3:"http://127.0.0.1:3000/img/3-8.jpg",title1:"衬衫 免烫 天蓝色",price1:"258"},
        {id:4,img_url1:"http://127.0.0.1:3000/img/1-6.jpg",img_url2:"http://127.0.0.1:3000/img/3-9.jpg",title:"衬衫 免烫 天蓝色",price:"288",img_url3:"http://127.0.0.1:3000/img/1-8.jpg",title1:"衬衫 免烫 天蓝色",price1:"258"},
        {id:5,img_url1:"http://127.0.0.1:3000/img/1-9.jpg",img_url2:"http://127.0.0.1:3000/img/3-5.jpg",title:"衬衫 免烫 天蓝色",price:"288",img_url3:"http://127.0.0.1:3000/img/3-10.jpg",title1:"衬衫 免烫 天蓝色",price1:"258"},
        {id:6,img_url1:"http://127.0.0.1:3000/img/1-3.jpg",img_url2:"http://127.0.0.1:3000/img/3-9.jpg",title:"衬衫 免烫 天蓝色",price:"288",img_url3:"http://127.0.0.1:3000/img/3-3.jpg",title1:"衬衫 免烫 天蓝色",price1:"258"},
        {id:7,img_url1:"http://127.0.0.1:3000/img/1-6.jpg",img_url2:"http://127.0.0.1:3000/img/3-8.jpg",title:"衬衫 免烫 天蓝色",price:"288",img_url3:"http://127.0.0.1:3000/img/3-2.jpg",title1:"衬衫 免烫 天蓝色",price1:"258"},
        {id:8,img_url1:"http://127.0.0.1:3000/img/1-9.jpg",img_url2:"http://127.0.0.1:3000/img/3-5.jpg",title:"衬衫 免烫 天蓝色",price:"288",img_url3:"http://127.0.0.1:3000/img/3-6.jpg",title1:"衬衫 免烫 天蓝色",price1:"258"},     
    ];
    res.send(obj)
})
//1.4 免烫图片详情
app.get("/imgGoodinfo",(req,res)=>{
    var obj = [
        
        {id:0,img_url2:"http://127.0.0.1:3000/img/3-8.jpg",img_url3:"http://127.0.0.1:3000/img/3-3.jpg"},
        {id:1,img_url2:"http://127.0.0.1:3000/img/3-9.jpg",img_url3:"http://127.0.0.1:3000/img/3-4.jpg"},
        {id:2,img_url2:"http://127.0.0.1:3000/img/3-5.jpg",img_url3:"http://127.0.0.1:3000/img/3-7.jpg"},
        {id:3,img_url2:"http://127.0.0.1:3000/img/3-6.jpg",img_url3:"http://127.0.0.1:3000/img/3-8.jpg"},
        {id:4,img_url2:"http://127.0.0.1:3000/img/1-7.jpg",img_url3:"http://127.0.0.1:3000/img/1-8.jpg"},
        {id:5,img_url2:"http://127.0.0.1:3000/img/3-5.jpg",img_url3:"http://127.0.0.1:3000/img/3-10.jpg"},
        {id:6,img_url2:"http://127.0.0.1:3000/img/3-9.jpg",img_url3:"http://127.0.0.1:3000/img/3-3.jpg"},
        {id:7,img_url2:"http://127.0.0.1:3000/img/3-8.jpg",img_url3:"http://127.0.0.1:3000/img/3-2.jpg"},
        {id:8,img_url2:"http://127.0.0.1:3000/img/3-5.jpg",img_url3:"http://127.0.0.1:3000/img/3-6.jpg"},
        
        
    ];
    res.send(obj)
})
//1.5布鞋图片
app.get("/imgdetail2",(req,res)=>{
    var obj = [
        {id:1,img_url1:"http://127.0.0.1:3000/img/5-0.jpg",img_url2:"http://127.0.0.1:3000/img/5-1.jpg",img_url3:"http://127.0.0.1:3000/img/5-2.jpg",img_url4:"http://127.0.0.1:3000/img/5-3.jpg",img_url5:"http://127.0.0.1:3000/img/5-4.jpg"},
        {id:2,img_url1:"http://127.0.0.1:3000/img/5-7.jpg",img_url2:"http://127.0.0.1:3000/img/5-9.jpg",img_url3:"http://127.0.0.1:3000/img/5-9.jpg",img_url4:"http://127.0.0.1:3000/img/5-10.jpg",img_url5:"http://127.0.0.1:3000/img/5-11.jpg"},
        {id:3,img_url1:"http://127.0.0.1:3000/img/5-15.jpg",img_url2:"http://127.0.0.1:3000/img/5-6.jpg",img_url3:"http://127.0.0.1:3000/img/5-5.jpg",img_url4:"http://127.0.0.1:3000/img/5-12.jpg",img_url5:"http://127.0.0.1:3000/img/5-13.jpg"},
        {id:4,img_url1:"http://127.0.0.1:3000/img/5-0.jpg",img_url2:"http://127.0.0.1:3000/img/5-1.jpg",img_url3:"http://127.0.0.1:3000/img/5-2.jpg",img_url4:"http://127.0.0.1:3000/img/5-3.jpg",img_url5:"http://127.0.0.1:3000/img/5-4.jpg"},
        {id:5,img_url1:"http://127.0.0.1:3000/img/5-7.jpg",img_url2:"http://127.0.0.1:3000/img/5-9.jpg",img_url3:"http://127.0.0.1:3000/img/5-9.jpg",img_url4:"http://127.0.0.1:3000/img/5-10.jpg",img_url5:"http://127.0.0.1:3000/img/5-11.jpg"},
        {id:6,img_url1:"http://127.0.0.1:3000/img/5-15.jpg",img_url2:"http://127.0.0.1:3000/img/5-6.jpg",img_url3:"http://127.0.0.1:3000/img/5-5.jpg",img_url4:"http://127.0.0.1:3000/img/5-12.jpg",img_url5:"http://127.0.0.1:3000/img/5-13.jpg"},
        
    ];
    res.send(obj)
})
//1.6外套
app.get("/imgdetail3",(req,res)=>{
    var obj = [
        {id:1,img_url1:"http://127.0.0.1:3000/img/6377993_00.jpg"},
        {id:2,img_url1:"http://127.0.0.1:3000/img/6377993_01.jpg"},
        {id:3,img_url1:"http://127.0.0.1:3000/img/6377993_02.jpg"},
        {id:4,img_url1:"http://127.0.0.1:3000/img/6377993_03.jpg"},
        {id:5,img_url1:"http://127.0.0.1:3000/img/6377993_04.jpg"},
        {id:6,img_url1:"http://127.0.0.1:3000/img/6377993_05.jpg"},
        {id:7,img_url1:"http://127.0.0.1:3000/img/6377993_06.jpg"},
        {id:8,img_url1:"http://127.0.0.1:3000/img/6377993_07.jpg"},
        {id:9,img_url1:"http://127.0.0.1:3000/img/6377993_08.jpg"},
        {id:10,img_url1:"http://127.0.0.1:3000/img/6377993_09.jpg"},
        {id:11,img_url1:"http://127.0.0.1:3000/img/6377993_10.jpg"},
        {id:12,img_url1:"http://127.0.0.1:3000/img/6377993_11.jpg"},
        {id:13,img_url1:"http://127.0.0.1:3000/img/6377993_12.jpg"},
        {id:14,img_url1:"http://127.0.0.1:3000/img/6377993_13.jpg"},
        {id:15,img_url1:"http://127.0.0.1:3000/img/6377993_14.jpg"},
        {id:16,img_url1:"http://127.0.0.1:3000/img/6377993_15.jpg"},
        {id:17,img_url1:"http://127.0.0.1:3000/img/nvm_01.jpg"},
        {id:18,img_url1:"http://127.0.0.1:3000/img/nvm_02.jpg"},
        {id:19,img_url1:"http://127.0.0.1:3000/img/nvm_03.jpg"},
        {id:20,img_url1:"http://127.0.0.1:3000/img/nvm_04.jpg"},
        {id:21,img_url1:"http://127.0.0.1:3000/img/nvm_05.jpg"},
        {id:22,img_url1:"http://127.0.0.1:3000/img/nvm_06.jpg"},
        {id:23,img_url1:"http://127.0.0.1:3000/img/nvm_07.jpg"},
        {id:24,img_url1:"http://127.0.0.1:3000/img/nvm_08.jpg"},
        {id:25,img_url1:"http://127.0.0.1:3000/img/nvm_09.jpg"},
        {id:26,img_url1:"http://127.0.0.1:3000/img/nvm_10.jpg"},
        {id:27,img_url1:"http://127.0.0.1:3000/img/nvm_11.jpg"},
        {id:28,img_url1:"http://127.0.0.1:3000/img/nvm_12.jpg"},
        {id:29,img_url1:"http://127.0.0.1:3000/img/nvm_13.jpg"},
        {id:30,img_url1:"http://127.0.0.1:3000/img/6377993_16.jpg"},
        {id:31,img_url1:"http://127.0.0.1:3000/img/6377993_17.jpg"},
        {id:33,img_url1:"http://127.0.0.1:3000/img/6377993_19.jpg"},
        {id:34,img_url1:"http://127.0.0.1:3000/img/6377993_20.jpg"},
        {id:35,img_url1:"http://127.0.0.1:3000/img/6377993_21.jpg"},
        {id:36,img_url1:"http://127.0.0.1:3000/img/6377993_22.jpg"},
        {id:37,img_url1:"http://127.0.0.1:3000/img/6377993_23.jpg"},
        {id:38,img_url1:"http://127.0.0.1:3000/img/6377993_24.jpg"},
        {id:39,img_url1:"http://127.0.0.1:3000/img/6377993_25.jpg"},
        {id:40,img_url1:"http://127.0.0.1:3000/img/6377993_26.jpg"},
        {id:41,img_url1:"http://127.0.0.1:3000/img/6377993_27.jpg"},
        {id:42,img_url1:"http://127.0.0.1:3000/img/6377993_28.jpg"},
        {id:43,img_url1:"http://127.0.0.1:3000/img/6377993_29.jpg"},
        {id:44,img_url1:"http://127.0.0.1:3000/img/6377993_30.jpg"},
        {id:45,img_url1:"http://127.0.0.1:3000/img/6377993_31.jpg"},
        {id:46,img_url1:"http://127.0.0.1:3000/img/6377993_32.jpg"},
        {id:47,img_url1:"http://127.0.0.1:3000/img/6377993_33.jpg"},
        {id:48,img_url1:"http://127.0.0.1:3000/img/6377993_34.jpg"},
        {id:49,img_url1:"http://127.0.0.1:3000/img/6377993_35.jpg"}


    ];
    res.send(obj)
})
//1.7牛津纺衬衫
app.get("/imgdetail4",(req,res)=>{
    var obj = [
        {id:1,img_url1:"http://127.0.0.1:3000/img/njfxzt_01.jpg"},
        {id:2,img_url1:"http://127.0.0.1:3000/img/njfxzt_02.jpg"},
        {id:3,img_url1:"http://127.0.0.1:3000/img/njfxzt_03.jpg"},
        {id:4,img_url1:"http://127.0.0.1:3000/img/njfxzt_04.jpg"},
        {id:5,img_url1:"http://127.0.0.1:3000/img/njfxzt_05.jpg"},
        {id:6,img_url1:"http://127.0.0.1:3000/img/njfxzt_06.jpg"},
        {id:7,img_url1:"http://127.0.0.1:3000/img/njfxzt_07.jpg"},
        {id:8,img_url1:"http://127.0.0.1:3000/img/njfxzt_08.jpg"},
        {id:9,img_url1:"http://127.0.0.1:3000/img/njfxzt_09.jpg"},
        {id:10,img_url1:"http://127.0.0.1:3000/img/njfxzt_10.jpg"},
        {id:11,img_url1:"http://127.0.0.1:3000/img/njfxzt_11.jpg"},
        {id:12,img_url1:"http://127.0.0.1:3000/img/njfxzt_12.jpg"},
        {id:13,img_url1:"http://127.0.0.1:3000/img/njfxzt_13.jpg"},
        {id:14,img_url1:"http://127.0.0.1:3000/img/njfxzt_14.jpg"},
        {id:15,img_url1:"http://127.0.0.1:3000/img/njfxzt_15.jpg"},
        {id:16,img_url1:"http://127.0.0.1:3000/img/njfxzt_16.jpg"},
        {id:17,img_url1:"http://127.0.0.1:3000/img/njfxzt_17.jpg"},
        {id:18,img_url1:"http://127.0.0.1:3000/img/njfxzt_18.jpg"},
        {id:19,img_url1:"http://127.0.0.1:3000/img/njfxzt_19.jpg"},
        {id:20,img_url1:"http://127.0.0.1:3000/img/njfxzt_20.jpg"},

    ];
    res.send(obj)
})
 //1.8.功能八;将商品信息添加到购物车
 //- INSERT INTO xz_cart VALUES();
 app.get("/addCart",(req,res)=>{
    //1.参数  商品的id
    //1.1 获取参数
    var pid = req.query.pid;
    var count = req.query.count;
   // console.log(pid)
    //1.2 创建正则表达式验证  一定要做
    //所有用户参数都需要验证 js第一次 node.js第二次
    //目的为了安全
    var reg = /^[0-9]{1,}$/;//正则表达式
    if(!reg.test(pid)){     //如果参数验证失败
       res.send({code:-1,msg:"参数有误"});
       return;              //输出错误信息并停止
    }
    if(!reg.test(count)){
        res.send({code:-2,msg:"商品数量参数有误"});
        return;
    }
    //2.连接数据库
    //3.返回成功值
    res.send({code:1,msg:"添加成功"});
 }
 )
//功能二：
// //app.js
// //1.加载模块
// const express = require("express");
// const pool = require("./pool");

// //2.创建express对象
// var app= express();
// //服务器node.js 允许跨域访问配置
// //2.1：引入跨域模块
// const cors = require("cors");
// //2.2:配置允许哪个程序跨域访问 脚手架
// app.use(cors({
//     origin:[
//         "http://127.0.0.1:3001","http://localhost:3001"],
//     credentials:true  //是否信任}))
// //3.指定静态目录
// //服务器指定目录          绝对路径 （相对路径可能出错）
// app.use(express.static(__dirname+"/public"));//注意  /

// //4.绑定监听端口
// app.listen(3000);

// //功能一：学子商城首页图片轮播
// //GET /imagelist   json 
// app.get("/imagelist",(req,res)=>{//http://127.0.0.1:3000/imagelist
//     var obj=[
//         {id:1,img_url:"http://127.0.0.1:3000/img/banner1.png"},
//         {id:2,img_url:"http://127.0.0.1:3000/img/banner2.png"},
//         {id:3,img_url:"http://127.0.0.1:3000/img/banner3.png"},
//         {id:4,img_url:"http://127.0.0.1:3000/img/banner4.png"},
//     ];
//     res.send(obj)
// });


// //功能二：分页显示:新闻分页
// app.get("/newslist",(req,res)=>{
//     //1:参数  当前页码  页大小(一页显示几行数据)
//     var pno = req.query.pno;            //2
//     var pageSize = req.query.pageSize;  //5
//     //2:sql
//     //2.1:查找总记录数->转换总页数  15->3
//     var sql = " SELECT count(id) as c FROM xz_news";
//     var obj = {};      //保存发送客户端数据
//     var progress = 0;  //进度
//     pool.query(sql,(err,result)=>{
//         if(err)throw err;
//         var c = Math.ceil(result[0].c/pageSize);
//         obj.pageCount = c;//页码数
//         progress+=50;
//         if(progress==100){
//           res.send(obj);
//         }
//     });
//     //2.2:查找当前页内容           中间5行
//     var sql = " SELECT id,title,img_url,ctime,point";
//        sql += " FROM xz_news";//from前面加空格
//        sql += " LIMIT ?,?";
//     var offset = parseInt((pno-1)*pageSize);   //计算分页偏移量
//     pageSize = parseInt(pageSize)
//     pool.query(sql,[offset,pageSize],(err,result)=>{
//         if(err)throw err;
//         //console.log(result);
//         obj.data = result;
//         progress+=50;
//         if(progress==100){
//           res.send(obj);
//         }
//     })
//     //3:结果格式
//     //res.send({code:"ok"})
//   });


//   //功能三：发送脚手架新闻详细
//   app.get("/newsinfo",(req,res)=>{
//       var obj = {
//           title:"北京房价下降，白菜价",
//           content:"16万/平 快快买啊！！！！"
//       };
//       res.send(obj);
    
//   })
  

//   //功能四：用户发表评论
//   //const qs= require("querystring");
//   app.post("/postcomment",(req,res)=>{
//       //为req对象绑定事件data 客户数据发送成功
//       //触发事件
//       req.on("data",(buf)=>{
//           var str = buf.toString(); //1.将参数转字符串
//           var obj = JSON.parse(str);  //2.将字符串转js对象
//           var msg = obj.msg;        //3.msg 评论内容
//           var nid = parseInt(obj.nid); //4.nid 新闻编号 整型
//            //console.log(obj.msg)
//           var sql = "INSERT INTO xz_comment(content,user_name,ctime,nid) VALUES (?,'匿名',now(),?)";
//           pool.query(sql,[msg,nid],(err,result)=>{
//               if(err) throw err;
//               res.send({code:1,msg:"添加成功"})
//           })
//       })
//   })


//   //功能五：用户获取指定新闻编号所有的评论
//   //http://127.0.0.1:3000/getComment?id=1&pno=1&pageSize=5
//   app.get("/getComment",(req,res)=>{
//       //获取指定新闻编号
//      var nid = parseInt(req.query.id);
//      //1:参数  当前页码  页大小(一页显示几行数据)
//      var pno = req.query.pno;            //2
//      var pageSize = req.query.pageSize;  //5
//      //2:sql
//      //2.1:查找总记录数->转换总页数  15->3
//      var sql = " SELECT count(id) as c FROM xz_comment";
//          sql +=" WHERE nid = ?";//打空格,多nid,需要加载
//      var obj = {};      //保存发送客户端数据
//      var progress = 0;  //进度
//      pool.query(sql,[nid],(err,result)=>{//上面sql一个问号，并且指向nid,所有需要加[nid]
//          if(err)throw err;
//          var c = Math.ceil(result[0].c/pageSize);
//          obj.pageCount = c;//页码数
//          progress+=50;
//          if(progress==100){
//            res.send(obj);
//          }
//      });
//      //2.2:查找当前页内容           
//      var sql = " SELECT id,content,ctime,user_name";
//         sql += " FROM xz_comment";//from前面加空格
//         sql += " WHERE nid = ?";
//         sql += " ORDER BY id DESC"//降序排列，最新评论在前面
//         sql += " LIMIT ?,?";
//      var offset = parseInt((pno-1)*pageSize);   //计算分页偏移量
//      pageSize = parseInt(pageSize)
//      pool.query(sql,[nid,offset,pageSize],(err,result)=>{
//          if(err)throw err;
//          //console.log(result);
//          obj.data = result;
//          progress+=50;
//          if(progress==100){
//            res.send(obj);
//          }
//      })
//   })

//   //功能六：返回商品的详细信息
//    //服务器数据：返回模拟数据[id;title;now;old;商号]
//         //参数：商品id
//     app.get("/goodsinfo",(req,res)=>{
//         var id = req.query.id;
//        // console.log(id)
//         var obj = {id:id,title:"华为2000",now:9999,old:8888,pid:"9527"};
//         res.send(obj);
//     })

// //功能七：购物车数据列表
// //组件发送ajax请求获取并显示数据
//  app.get("/shopCart",(req,res)=>{
//      var obj = [];
//      obj.push({id:1,title:"华为p10",price:3999,count:2})
//      obj.push({id:2,title:"华为p11",price:4999,count:1})
//      obj.push({id:3,title:"华为p12",price:5999,count:1})
//      res.send(obj);
//  })

 //8.功能八;将商品信息添加到购物车
 //- INSERT INTO xz_cart VALUES();
// app.get("/addCart",(req,res)=>{
//    //1.参数  商品的id
//    //1.1 获取参数
//    var pid = req.query.pid;
//    var count = req.query.count;
//   // console.log(pid)
//    //1.2 创建正则表达式验证  一定要做
//    //所有用户参数都需要验证 js第一次 node.js第二次
//    //目的为了安全
//    var reg = /^[0-9]{1,}$/;//正则表达式
//    if(!reg.test(pid)){     //如果参数验证失败
//       res.send({code:-1,msg:"参数有误"});
//       return;              //输出错误信息并停止
//    }
//    if(!reg.test(count)){
//        res.send({code:-2,msg:"商品数量参数有误"});
//        return;
//    }
//    //2.连接数据库
//    //3.返回成功值
//    res.send({code:1,msg:"添加成功"});
// }
// )