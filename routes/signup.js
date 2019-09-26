var express = require("express");
var router = express.Router();

var mongoClient = require("mongodb").MongoClient;
var db;
mongoClient.connect(
  "mongodb://localhost:27017",
  { useUnifiedTopology: true },
  function(err, client) {
    if (err) throw err;
    db = client.db("parcelninja");
  }
);

router.use(express.static("public"));
router.get("/customer", function(req, res) {
  res.sendFile("signup.html", { root: "public" });
});
router.get("/ninja", function(req, res) {
  res.sendFile("signupninja.html", { root: "public" });
});
router.post("/", function(req, res) {
  if (req.body.ninja) {
    db.collection("ninja").insertOne(req.body);
    console.log(req.body);
    res.redirect("/signup");
  } else {
    db.collection("ninjaUser").insertOne(req.body);
    console.log(req.body);
    res.redirect("/signup");
  }
});

module.exports = router;
