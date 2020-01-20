//1.加载模块 mysql
const mysql = require("mysql");
//2.创建对象
var pool = mysql.createPool({
   host:"127.0.0.1",
   port:3306,
   user:"root",//账号
   password:"",
   database:"xz",//数据库
   connectionLimit:"20",   //活动连接数量（实际得算差不多100-150）
})
//3.导出对象
module.exports = pool;