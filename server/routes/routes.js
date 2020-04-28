let express = require("express");

let router = express.Router();

let path = require("path");

let customer = require("../models/customer");

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../client/public/html/index.html"));
});

router.get("/data/customer", function(req, res) {
    customer.all(function(data) {
      res.json({ customer: data });
    });
});

module.exports = router;