const express = require("express");
const router = express.Router();
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
router.get("/", function(req, res) {
  db.collection("ninjaUser")
    .find({})
    .toArray(function(err, result) {
      if (err) {
        throw err;
      }
      res.render("client", {
        title: "Client Dashboard",
        style: "/client.css",
        script: "/fare.js",
        data: result
      });
    });
});

router.post("/form", function(req, res) {
  console.log(req.body);
  res.render("form", {
    id: req.body.booking,
    fare: req.body.fare
  });
});

router.post("/parceldetails", function(req, res) {
  db.collection("parcel").insertOne(req.body, function(err, result) {
    if (err) {
      throw err;
    }
    console.log(req.body);
  });
  res.redirect("/clientdashboard");
});

module.exports = router;
