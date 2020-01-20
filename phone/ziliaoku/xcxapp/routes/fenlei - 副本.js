const express = require('express');
const pool = require('../pool')
var router = express.Router();

var url = "http://127.0.0.1:3000/img/"
router.get('/Nav',(req,res)=>{
  var obj = [
    {id:1,title:'推荐'},
    {id:2,title:'男装'},
    {id:3,title:'女装'},
    {id:4,title:'男鞋'},
    {id:5,title:'女鞋'},
    {id:6,title:'袜子'},
    {id:7,title:'家居'},
    {id:8,title:'童鞋'},
    {id:9,title:'内衣'}
  
  ]
  res.send(obj)
})

// router.get('/')
// recomondbox
router.get('/tuijian',(req,res)=>{
  var obj = [
      {id:1,img_url:url+'3-1.jpg'},
      {id:2,img_url:url+'3-2.jpg'},
      {id:3,img_url:url+'3-3.jpg'}
    ]
    
  
  res.send(obj)
})

  



module.exports = router;