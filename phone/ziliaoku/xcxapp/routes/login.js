const express = require('express');
const pool = require('../pool')
var router = express.Router();

var url = "http://127.0.0.1:3000/img/"

 //1.登录
router.get("/user",(req,res)=>{
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
//2.注册新用户
const md5 = require("md5-node");
router.post("/register",(req,res)=>{
    req.on("data",(buf)=>{
        var obj = buf.toString();
        obj = JSON.parse(obj);
        //console.log(obj)
    
    //1.参数 2个uname upwd
    var uname = obj.uname;
    var upwd = obj.upwd;
        if(uname==""){
            res.send({code:-1,msg:"用户名不能为空"});
             return;
        }
         if(upwd==""){
            res.send({code:-2,msg:"密码不能为空"});
            return;
        }
        var urlName ="SELECT  uname  FROM xz_user1";
        pool.query(urlName,(err,result)=>{
           if(err) throw err;
          // console.log(result)
           var num = 0;
        for(var i=0;i<result.length;i++){
            //console.log(result[i].uname)
          //  console.log(result[i].uname);
            
            if(uname==result[i].uname){
                res.send({code:404});
                return;
            }else{
                num++;
                if(num==1) {
                    var sql= "INSERT INTO xz_user1(id,uname,upwd) VALUES(null,?,?)"
                        pool.query(sql,[uname,md5(upwd)],(err,result)=>{
                            if(err)throw err;
                            result.affectedRows > 0 ? res.send({ok: 1}) : res.send({ok: 0});
                            //console.log(result)
                        })
                }
                return ;
           }
        } 
   })
 })
})
module.exports = router;