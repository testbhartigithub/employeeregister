var express = require('express');
var router = express.Router();
var pool=require('./pool.js')

/* GET home page. */
router.get('/fetch_all_states', function(req, res, next) {
pool.query("select * from states",function(error,result){
  if(error)
  { 
    res.status(500).json({status:false,message:'Pls contact database administrator'})
  }
  else
  {
    
    res.status(200).json({status:true,message:'Success',data:result})
  }

})
});
router.get('/fetch_all_cities', function(req, res, next) {
  pool.query("select * from cities where stateid=?",[req.query.stateid],function(error,result){
    if(error)
    { 
      res.status(500).json({status:false,message:'Pls contact database administrator'})
    }
    else
    {
      res.status(200).json({status:true,message:'Success',data:result})
    }
  
  })
  });

module.exports=router;