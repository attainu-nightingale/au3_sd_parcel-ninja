var express=require("express");
var exphbs =require("express-handlebars");
var app=express();

app.engine("hbs",exphbs({defaultLayout:"main", extname:".hbs"}));
app.set("view engine","hbs");

var db;
var mongoclient=require("mongodb").MongoClient;
mongoclient.connect("mongodb://localhost:27017",{ useNewUrlParser: true },function(err,client){
    if(err) {
    throw err
}
db=client.db("parcelninja")
});

app.use(express.urlencoded({extended:false}));
app.use(express.static("public"));

// var home =require("./home");
// var aboutus =require("./aboutus");
// var contactus =require("./contactus");
// var adminlogin =require("./adminlogin");
// const ninjalogin =require("./ninjalogin");
// const clientlogin=require("./clientlogin");
// const adminlanding=require("./adminlanding");
// const clientdashboard=require("./clientdashboard");
// const ninjadashboard=require("./ninjadashboard");
// const ninjabooking=require("./ninjabooking");

app.get("/" ,function(req, res){
    res.sendfile("home.html");
});

app.get("/clientdashboard", function(req,res){
db.collection("ninja").find({}).toArray(function(err,result){
    if(err) {
        throw err;
    }
    console.log(result)
    res.render("client",{
        title:"Client Dashboard",
        style:"/client.css",
        script:"/client.js",
        data: result,
    });
});
});

// app.get("/ninjabooking",function(req,res){
//     res.render("form",{
//     title:"Ninja Booking",
//     style:"/client.css",
// });
// });

app.post("/clientdashboard/:id", function(req,res){
db.collection("parcel").UpdateOne({"_id": require("mongodb").ObjectId(req.params.id)},{$set:req.body}).toArray(function(err,result){
        if(err) {
            throw err;
        }
        console.log(result)
        
});
});

// app.use("/home",home);
// app.use("/aboutus",aboutus);
// app.use("/contactus",contactus);
// app.use("/adminlogin",adminlogin);
// app.use("/ninjalogin",ninjalogin);
// app.use("/clientlogin",clientlogin);
// app.use("/adminlanding",adminlanding);
// app.use("/clientdashboard",clientdashboard);
// app.use("/ninjabooking",ninjabooking);
// app.use("/ninjadashboard",ninjadashboard);

app.listen(3000, function(){
    console.log("port is running!!!")
});