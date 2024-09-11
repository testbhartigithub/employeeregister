var express=require('express')
var router=express.Router()
var pool=require('./pool')
var upload=require('./multer')
var LocalStorage = require("node-localstorage").LocalStorage;
     localStorage = new LocalStorage("./scratch");
     router.get('/employeeregister',function(req,res){
      var admin=JSON.parse(localStorage.getItem('ADMIN'))
 
 if(admin==null)
 { return res.render('logininterface',{message:''})}
 else
 {
    return res.render('employeeregister',{message:'',status:false})
 }
})

router.get('/employeeregister',function(req,res){

    res.render('employeeregister',{message:'',status:false})
})
router.post('/employee_form_submit',upload.single('picture') ,function(req,res){

    pool.query("insert into employee(employeename,gender, birthdate, work,salary, department,address, state, city,picture)values(?,?,?,?,?,?,?,?,?,?)",[`${req.body.firstname} ${req.body.middlename} ${req.body.lastname} `, req.body.gender, req.body.dob, req.body.work+"", req.body.salary, req.body.department, req.body.address, req.body.state, req.body.city, req.file.filename] ,function(error,result){
       if(error){
        console.log(error)
           res.render('employeeregister',{message:'SERVER ERROR...',status:false})
        }
        else{
           res.render('employeeregister',{message:'FORM SUBMITTED SUCCESSFULLY',status:true})
        }
       
    })
   })
   router.get('/showallemployee',function(req,res){
    
    pool.query("select E.*,(select S.statename from states S where S.stateid=E.state) as statename, (select C.cityname from cities C where C.cityid=E.city) as cityname from employee E",function(error,result){
   
        if(error)
        {
             return res.render('showemployee',{data:[],status:false})
        }
        else{
            return res.render('showemployee',{data:result,status:true})
        }


    })
 
})
router.get('/search_by_id',function(req,res){
    pool.query("select E.*,(select S.statename from states S where S.stateid=E.state) as statename, (select C.cityname from cities C where C.cityid=E.city) as cityname from employee E where E.employeeid=?",[req.query.eid],function(error,result){
     if(error)
     {
      return res.render('searchemployee',{data:[],status:false})
     }
     else
     {
      return res.render('searchemployee',{data:result[0],status:true})
     }
  
    })
  
    
  })
  
  router.post('/edit_data',function(req,res){
    if(req.body.btn=="Edit")
    {
    pool.query("update  employee set employeename=?, gender=?, birthdate=?, work=?, salary=?, department=?, Address=?, state=?, city=? where employeeid=?",[`${req.body.firstname} ${req.body.middlename} ${req.body.lastname} `, req.body.gender, req.body.dob, req.body.work+"", req.body.salary, req.body.department, req.body.address, req.body.state, req.body.city, req.body.employeeid],function(error,result){
     if(error)    
     {
       res.redirect('/employee/showallemployee')
  
     }
     else
     {
      res.redirect('/employee/showallemployee')
     }
    })
    }
    else
    {
  
      pool.query("delete from employee where employeeid=?", [req.body.employeeid],function(error,result){
        if(error)    
        {
          res.redirect('/employee/showallemployee')
     
        }
        else
        {
         res.redirect('/employee/showallemployee')
        }
       })
    }
  
  })
  router.get('/showpicture',function(req,res){
    return res.render('showpicture',{data:req.query})
   
  
})

router.post('/editpicture',upload.single('picture'),function(req,res){
  pool.query("update  employee set picture=? where employeeid=?",[req.file.filename,req.body.employeeid],function(error,result){
   if(error)    
   { 
    res.redirect('/employee/showallemployee')
  }
   else
   {
    res.redirect('/employee/showallemployee')
   }
  })


})
    

module.exports=router