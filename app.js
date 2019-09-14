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

mongoClient.connect(url, (err, client) => {
    if (err) throw err;
    app.locals.db = client.db("parcelninja");
  });

app.engine("hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");



app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.get("/" ,function(req, res){
    res.send("welcome to homepage")
});

// app.use("/home",home);
// app.use("/aboutus",aboutus);
// app.use("/contactus",contactus);
// app.use("/ninjalogin",ninjalogin);
// app.use("/clientlogin",clientlogin);
app.use("/clientdashboard",clientdashboard);
// app.use("/ninjadashboard",ninjadashboard);

app.listen(3000, function(){
    console.log("port is running!!!")
});