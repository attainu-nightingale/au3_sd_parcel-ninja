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
  res.render("signup", { layout: false });
});
router.get("/ninja", function(req, res) {
  res.render("signupninja", { layout: false });
});
router.post("/customer", function(req, res) {
  db.collection("ninjaUser")
    .find({
      email: req.body.email
    })
    .toArray(function(err, result) {
      if (err) {
        throw err;
      } else {
        if (result == undefined || result.length == 0) {
          console.log("k");
          db.collection("ninjaUser").insertOne(req.body);
          console.log(req.body);
          res.redirect("/signup/customer");
        } else {
          console.log("h");
          req.session.errMsg = "Email already in use";
          res.render("signup", {
            layout: false,
            error: req.session.errMsg
          });
        }
      }
    });
});

router.post("/ninja", function(req, res) {
  db.collection("ninja")
    .find({
      email: req.body.email
    })
    .toArray(function(err, result) {
      if (err) {
        throw err;
      } else {
        if (result == undefined || result.length == 0) {
          console.log("k");
          db.collection("ninja").insertOne(req.body);
          console.log(req.body);
          res.redirect("/signup/ninja");
        } else {
          console.log("h");
          req.session.errMsg = "Email already in use";
          res.render("signupninja", {
            layout: false,
            error: req.session.errMsg
          });
        }
      }
    });
});

module.exports = router;
