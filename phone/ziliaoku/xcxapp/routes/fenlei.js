const express = require('express');
const pool = require('../pool')
var router = express.Router();

var url = "http://127.0.0.1:3000/img/"


router.post('/leftNav',(req,res)=>{
  req.on("data",(buf)=>{
    var obj1 = buf.toString();
    obj1 = JSON.parse(obj1);
   // console.log(obj1)
    var obj = [];
    if(obj1.id == 1 ){
      obj = [      
       [
        {id:1,title:'鞋子',img_url:url+'5-11.jpg'},
        {id:2,title:'鞋子',img_url:url+'5-12.jpg'},
        {id:3,title:'鞋子',img_url:url+'5-13.jpg'},
        {id:4,title:'鞋子',img_url:url+'5-14.jpg'},
        {id:5,title:'鞋子',img_url:url+'5-9.jpg'}, 
       ],
       [
        {id:1,title:'长袖',img_url:url+'njfxzt_20.jpg'},
        {id:2,title:'长袖',img_url:url+'njfxzt_21.jpg'},
        {id:3,title:'长袖',img_url:url+'njfxzt_22.jpg'},
        {id:4,title:'长袖',img_url:url+'njfxzt_23.jpg'},
        {id:5,title:'长袖',img_url:url+'njfxzt_25.jpg'},
        {id:6,title:'长袖',img_url:url+'njfxzt_26.jpg'},
       ],
       [
        {id:1,title:'外套',img_url:url+'3-4.jpg'},
        {id:2,title:'外套',img_url:url+'3-5.jpg'},
        {id:3,title:'外套',img_url:url+'3-6.jpg'},
        {id:4,title:'外套',img_url:url+'3-7.jpg'},
        {id:5,title:'外套',img_url:url+'3-8.jpg'},
        {id:6,title:'衬 衫',img_url:url+'3-9.jpg'}
       ],
     ]
      res.send(obj);
     // console.log(obj)
    }else if(obj1.id == 2 ){
      obj =[ 
       [
        {id:1,title:'衬 衫',img_url:url+'3-4.jpg'},
        {id:2,title:'衬 衫',img_url:url+'3-5.jpg'},
        {id:3,title:'衬 衫',img_url:url+'3-6.jpg'},
        {id:4,title:'衬 衫',img_url:url+'3-7.jpg'},
        {id:5,title:'衬 衫',img_url:url+'3-8.jpg'},
        {id:6,title:'衬 衫',img_url:url+'3-9.jpg'}
      ],
      [
        {id:1,title:'衬 衫',img_url:url+'3-4.jpg'},
        {id:2,title:'衬 衫',img_url:url+'3-5.jpg'},
        {id:3,title:'衬 衫',img_url:url+'3-6.jpg'},
        {id:4,title:'衬 衫',img_url:url+'3-7.jpg'},
      ]
     ]
      res.send(obj);
    }else if(obj1.id == 3 ){
      obj = [
       [
        {id:1,title:'鞋子',img_url:url+'5-3.jpg'},
        {id:2,title:'鞋子',img_url:url+'5-1.jpg'},
        {id:3,title:'鞋子',img_url:url+'5-2.jpg'},
        {id:4,title:'鞋子',img_url:url+'5-4.jpg'},
        {id:5,title:'鞋子',img_url:url+'5-10.jpg'},
          
        
      ],
      [
        {id:1,title:'鞋子',img_url:url+'5-3.jpg'},
        {id:2,title:'鞋子',img_url:url+'5-5.jpg'},
        {id:3,title:'鞋子',img_url:url+'5-4.jpg'},
        {id:4,title:'鞋子',img_url:url+'5-6.jpg'},
        {id:5,title:'鞋子',img_url:url+'5-10.jpg'},
        {id:6,title:'鞋子',img_url:url+'5-11.jpg'},
      ]
     ]
      res.send(obj);
    } else if(obj1.id == 4 ){
      obj = [
       [
        {id:1,title:'衬 衫',img_url:url+'3-4.jpg'},
        {id:2,title:'衬 衫',img_url:url+'3-5.jpg'},
        {id:3,title:'衬 衫',img_url:url+'3-6.jpg'},
        {id:4,title:'衬 衫',img_url:url+'3-7.jpg'},
        {id:5,title:'衬 衫',img_url:url+'3-8.jpg'},
        {id:6,title:'衬 衫',img_url:url+'3-9.jpg'},
       ],
       [
        {id:1,title:'衬 衫',img_url:url+'3-4.jpg'},
        {id:2,title:'衬 衫',img_url:url+'3-5.jpg'},
        {id:3,title:'衬 衫',img_url:url+'3-6.jpg'},
        {id:4,title:'衬 衫',img_url:url+'3-7.jpg'},
        {id:5,title:'衬 衫',img_url:url+'3-8.jpg'},
       ]
      ]
      res.send(obj);
    } else if(obj1.id == 5 ){
      obj =  obj = [
      [
        {id:1,title:'鞋子',img_url:url+'5-3.jpg'},
        {id:2,title:'鞋子',img_url:url+'5-1.jpg'},
        {id:3,title:'鞋子',img_url:url+'5-2.jpg'},
        {id:4,title:'鞋子',img_url:url+'5-4.jpg'},
        {id:5,title:'鞋子',img_url:url+'5-10.jpg'},
          
        
      ],
      [
        {id:1,title:'鞋子',img_url:url+'5-3.jpg'},
        {id:2,title:'鞋子',img_url:url+'5-5.jpg'},
        {id:3,title:'鞋子',img_url:url+'5-4.jpg'},
        {id:4,title:'鞋子',img_url:url+'5-6.jpg'},
        {id:5,title:'鞋子',img_url:url+'5-10.jpg'},
        {id:6,title:'鞋子',img_url:url+'5-11.jpg'},
      ]
    ]
      res.send(obj);
    } else if(obj1.id == 6 ){
      obj = [ 
      [
        {id:1,title:'衬 衫',img_url:url+'3-4.jpg'},
        {id:2,title:'衬 衫',img_url:url+'3-5.jpg'},
        {id:3,title:'衬 衫',img_url:url+'3-6.jpg'},
        {id:4,title:'衬 衫',img_url:url+'3-7.jpg'},
        {id:5,title:'衬 衫',img_url:url+'3-8.jpg'},
        {id:6,title:'衬 衫',img_url:url+'3-9.jpg'}
     ],
     [
        {id:1,title:'衬 衫',img_url:url+'3-4.jpg'},
        {id:2,title:'衬 衫',img_url:url+'3-5.jpg'},
        {id:3,title:'衬 衫',img_url:url+'3-6.jpg'},
        {id:4,title:'衬 衫',img_url:url+'3-7.jpg'},
     ]    
    ]
      res.send(obj);
    }else if(obj1.id == 7 ){
      obj = [
      [ {id:1,title:'鞋子',img_url:url+'3-4.jpg'},
        {id:2,title:'鞋子',img_url:url+'3-5.jpg'},
        {id:3,title:'鞋子',img_url:url+'3-6.jpg'},
        {id:4,title:'鞋子',img_url:url+'3-7.jpg'},
        {id:5,title:'鞋子',img_url:url+'3-8.jpg'},
     ],
     [
        {id:1,title:'衬 衫',img_url:url+'3-4.jpg'},
        {id:2,title:'衬 衫',img_url:url+'3-5.jpg'},
        {id:3,title:'衬 衫',img_url:url+'3-6.jpg'},
        {id:4,title:'衬 衫',img_url:url+'3-7.jpg'},
     ]
    ]
      res.send(obj);
    }else if(obj1.id == 8 ){
      obj = [
     [
       {id:1,title:'外套2',img_url:url+'3-4.jpg'},
      {id:2,title:'鞋子',img_url:url+'3-5.jpg'},
      {id:3,title:'鞋子',img_url:url+'3-6.jpg'},
      {id:4,title:'鞋子',img_url:url+'3-7.jpg'},
      {id:5,title:'鞋子',img_url:url+'3-8.jpg'},
      {id:6,title:'鞋子',img_url:url+'3-4.jpg'},
    ],
    [
      {id:1,title:'衬 衫',img_url:url+'3-4.jpg'},
        {id:2,title:'衬 衫',img_url:url+'3-5.jpg'},
        {id:3,title:'衬 衫',img_url:url+'3-6.jpg'},
        {id:4,title:'衬 衫',img_url:url+'3-7.jpg'},
    ]
   ]
      res.send(obj);
    }else {
      obj = [
     [ 
      {id:1,title:'袜子',img_url:url+'3-4.jpg'},
      {id:2,title:'袜子',img_url:url+'3-5.jpg'},
      {id:3,title:'袜子',img_url:url+'3-6.jpg'},
      {id:4,title:'袜子',img_url:url+'3-7.jpg'},
      {id:5,title:'袜子',img_url:url+'3-8.jpg'},
     ],
     [
      {id:1,title:'衬 衫',img_url:url+'3-4.jpg'},
      {id:2,title:'衬 衫',img_url:url+'3-5.jpg'},
      {id:3,title:'衬 衫',img_url:url+'3-6.jpg'},
      {id:4,title:'衬 衫',img_url:url+'3-7.jpg'},
     ]
    ]
      res.send(obj);
    }
  })
})
module.exports = router;