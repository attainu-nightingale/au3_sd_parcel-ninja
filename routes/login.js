var express = require("express");
var session = require("express-session");
var router = express.Router();
var mongoClient = require("mongodb").MongoClient;
var db;
mongoClient.connect(
 "mongodb://localhost:27017",
  function(err, client){
   if(err) throw err;
   db = client.db("ninjaparcel");
  });
router.use(session({secret: "Express session secret"}));
router.use(express.urlencoded({ extended: false }));
router.use(express.static("public"));
router.get("/", function(req, res) {
 res.sendFile("login.html", { root: "public" });
});
var flag = false;
router.post("/", function(req, res){
 db.collection("ninjaUser").find().toArray(function(err,result){
     if(err) 
     throw err;
     for(var i=0; i<result.length; i++){
       if(req.body.email == result[i].email && req.body.password == result[i].password){
       req.session.loggedIn = true;
     }
    }
     res.redirect("/user");
   });
  });
router.get("/user", function(req, res){
 if(req.session.loggedIn == true){
   res.send("welcome to ninja parcel");
 }
 else {
   res.redirect("/login");
  }
 });
module.exports = router;