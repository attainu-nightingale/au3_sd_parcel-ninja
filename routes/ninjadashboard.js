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
  db.collection("ninja")
    .find({})
    .toArray(function(err, result) {
      if (err) {
        throw err;
      }
      res.render("ninjadashboard", {
        title: "Ninja Dashboard"
      });
    });
});

module.exports = router;
