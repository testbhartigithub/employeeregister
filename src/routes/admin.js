var express=require('express')
var router=express.Router()
var pool=require('./pool')
var LocalStorage = require("node-localstorage").LocalStorage;
localStorage = new LocalStorage("./scratch");


router.get('/dashboard',function(req,res){

    res.render('dashboardemployee',{message:'',status:false})
})

router.get("/adminlogin", function (req, res, next) {
    res.render("logininterface", { message: "" });
  });
  router.post("/check_password", function (req, res, next) {
    pool.query(
      "select * from adminss where (emailid=? or mobileno=?) and password=?",
      [req.body.email, req.body.email, req.body.password],
      function (error, result) {
        if (error) {
          res.render("logininterface", {
            message: "Server Error..Pls Contact Database Admin",
          });
        } else {
          if (result.length == 1) {
            localStorage.setItem("ADMIN", JSON.stringify(result[0]));
            res.render("dashboardemployee", { data: result[0] });
          } else {
            res.render("logininterface", { message: "Invalid Userid/Password" });
          }
        }
      }
    );
  });
  
module.exports=router