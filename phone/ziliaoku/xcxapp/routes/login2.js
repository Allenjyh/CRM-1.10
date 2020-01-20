const express = require('express');
const pool = require('../pool')
var router = express.Router();

var url = "http://127.0.0.1:3000/img/"

 //1.登录
router.get("/login",(req,res)=>{
  //1.参数 2个uname upwd
  //2.
  var uname = req.query.uname;
  var upwd = req.query.upwd;
  var sql= "SELECT count(id) as c FROM xz_user1"
      sql+= "   where uname=? AND upwd = md5(?)"
  pool.query(sql,[uname,upwd],(err,result)=>{
      if(err)throw err;
      if(result[0].c==0){
          res.send({code:-1,msg:"用户名或密码错误"})
      }else{
          res.send({code:1,msg:"登录成功"})
      }
  })
}) 
//2.注册
router.post("/register",(req,res)=>{
    //1.参数 2个uname upwd
    var uname = req.query.uname;
    var upwd = req.query.upwd;
    var sql= "INSERT INTO  xz_user1(id, uname,upwd)"
        sql+= "   VALUES(?,?,?)"
    pool.query(sql,[uname,upwd],(err,result)=>{
        console.log(result)
        // if(err)throw err;
        // if(result[0].c==0){
        //     res.send({code:-1,msg:"用户名或密码错误"})
        // }else{
        //     res.send({code:1,msg:"登录成功"})
        // }
    })
  }) 
module.exports = router;