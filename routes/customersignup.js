var express = require("express");
var router = express.Router();
var mongoClient = require("mongodb").MongoClient;
var db;
mongoClient.connect(
  "mongodb://localhost:27017",
  { useUnifiedTopology: true },
  function(err, client) {
    if(err) throw err;
    db = client.db("ninjaparcel")});

router.use(express.urlencoded({extended: false}));
router.use(express.static("public"));

router.get("/", function(req, res) {
  res.sendFile("customersignup.html", { root: "public" });
});

router.post("/", function(req, res){
  db.collection("customer").insertOne(req.body);
  console.log("inserted");
  res.redirect("/login");
});

module.exports = router;