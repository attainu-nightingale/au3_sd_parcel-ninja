const express = require("express");
const router = express.Router();

router.get("/profile", function(req,res){
//    if (req.app.locals.loggedin == true){
    const db = req.app.locals.db;
    db.collection("ninja").find({}).toArray(function(err,result){
        if(err) {
            throw err;
        }
        console.log(result)
        res.render("client",{
            title:"Client Dashboard",
            style:"/client.css",
            data: result,
        });
    });   
// //    }else {
//     res.redirect("/");
//   }
});

router.post("/profile/:id", function(req, res) {
    console.log(req.params.id);
    res.render("form", {
    title:"client form",
    id: req.params.id
    });
});

router.post("/parceldetails", function(req,res){
const db = req.app.locals.db;
db.collection("parcel").insertOne(req.body ,function(err,result){
if(err) {
    throw err;
    }
console.log(req.body)
});
res.redirect("/clientdashboard/profile")
});
    
module.exports = router;