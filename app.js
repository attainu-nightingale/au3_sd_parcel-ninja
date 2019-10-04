const express=require("express");
const app=express();
const exphbs = require("express-handlebars");
// const home =require("./home");
// const aboutus =require("./aboutus");
// const contactus =require("./contactus");
// const ninjalogin =require("./ninjalogin");
// const clientlogin=require("./clientlogin");
const clientdashboard=require("./routes/clientdashboard");
// const ninjadashboard=require("./ninjadashboard");

const mongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017"
var db;
mongoClient.connect(url, (err, client) => {
    if (err) throw err;
    db = client.db("parcel_ninja");
  });


app.set("view engine", "hbs");



app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.get("/" ,function(req, res){
    res.send("welcome to homepage")
});

// app.use("/home",home);
// app.use("/aboutus",aboutus);
// app.use("/contactus",contactus);
app.use("/ninjalogin",ninjalogin);

app.use("/clientdashboard",clientdashboard);
// app.use("/ninjadashboard",ninjadashboard);

app.get("/clientlogin",function(req,res){
    res.render("login.hbs",{
        title : "Login | Client",
        
    });
})


app.get("/signup",function(req,res){
    res.render("client.hbs")
})

app.post("/login",function(req,res){

    db.collection("clients").find({}).toArray(function(err, result){
        
        if (err) throw err;
        for (var i=0;i<result.length;i++){
            if(result[i].email==req.body.email&&result[i].password==req.body.password){
                
                res.render("clientdashboard.hbs",{
                    title : "Client Dashboard",
                    name : result[i].name
                });
                break;
            }
           
        }
        res.render("login.hbs",{
            
                title : "Login Failed | Retry",
                message : "Login Credentials wrong, Please Try Again"
    
        });
    })

})


app.listen(3000, function(){
    console.log("port is running!!!")
});