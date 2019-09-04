const express=require("express");
const app=express();
const home =require("./home");
const aboutus =require("./aboutus");
const contactus =require("./contactus");
const adminlogin =require("./adminlogin");
const ninjalogin =require("./ninjalogin");
const clientlogin=require("./clientlogin");
const adminlanding=require("./adminlanding");
const clientdashboard=require("./clientdashboard");
const ninjadashboard=require("./ninjadashboard");
const ninjabooking=require("./ninjabooking");

app.get("/" ,function(req, res){
    res.send("welcome to homepage")
});

app.use("/home",home);
app.use("/aboutus",aboutus);
app.use("/contactus",contactus);
app.use("/adminlogin",adminlogin);
app.use("/ninjalogin",ninjalogin);
app.use("/clientlogin",clientlogin);
app.use("/adminlanding",adminlanding);
app.use("/clientdashboard",clientdashboard);
app.use("/ninjabooking",ninjabooking);
app.use("/ninjadashboard",ninjadashboard);

app.listen(3000, function(){
    console.log("port is running!!!")
});