const express = require('express');
const pool = require('../pool')
var router = express.Router();

var url = "http://127.0.0.1:3000/img/"

 
//功能八:将商品信息添加至购物车
    //-INSERT INTO xz_cart VALUES();
    router.get("/addCart",(req,res)=>{
        //1:参数  商品id 商品数量
          //1.1：获取参数
          var pid = req.query.pid;
          var count = req.query.count;
          //1.2: 创建正则表达式验证  一定做
          //所有用户参数都需要验证 js第一次 node.js第二次
          //安全 
          var reg = /^[0-9]{1,}$/;     //正则表达式
          if(!reg.test(pid)){          //如果参数验证失败
            res.send({code:-1,msg:"商品编号参数有误"});
            return;               //输出错误信息并停止
          }
          if(!reg.test(count)){
            res.send({code:-2,msg:"商品数量参数有误"});
            return;               //输出错误信息并停止
          }
          //1.3: 如果验证失败返回
          //2:连接数据库
          //3:返回成功值
          res.send({code:1,msg:"添加成功"});
      })

module.exports = router;