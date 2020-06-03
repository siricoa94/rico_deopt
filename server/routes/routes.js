let express = require("express");
let router = express.Router();

let path = require("path");

let customer = require("../models/customer");
let product = require("../models/product");
let purchasehist = require("../models/purchasehist");


router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/html/index.html"));
});
router.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/html/home.html"));
});
router.get("/products", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/html/products.html"));
});
router.get("/leaderboard", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/html/leaderboard.html"));
});
// Customer Data =================================
router.get("/data/customer", function(req, res) {
    customer.all(function(data) {
      res.json({ customer: data });
    });
});
router.post("/api/customer", function(req, res) {
  customer.create([
      "firstname", "lastname","phone","address","credit","userPassword","email","userid"
  ], [
      req.body.firstname, req.body.lastname, req.body.phone, req.body.address, req.body.credit,
      req.body.userPassword, req.body.email, req.body.userid
  ], function(result) {
      // Send back the ID of the new quote
      res.json({ id: result.insertId });
  });
});
router.put("/api/customer/:id", function(req, res) {
  let condition = "id = " + req.params.id;
  console.log("condition", condition);

  customer.update([
    "firstname", "lastname","phone","address","credit","userPassword","email","userid"
  ],[
    req.body.firstname, req.body.lastname, req.body.phone, req.body.address, req.body.credit,
    req.body.userPassword, req.body.email, req.body.userid
  ], condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});
// Products Data ================================
router.get("/data/product", function(req, res) {
  product.all(function(data) {
    res.json({ product: data });
  });
});
router.put("/api/product/:id", function(req, res) {
  let condition = "id = " + req.params.id;
  console.log("condition", condition);

  product.updateState({
    stock: req.body.stock,
    ammount: req.body.ammount
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});
// Purchase History Data ============================
router.get("/data/purchasehist", function(req, res) {
  purchasehist.all(function(data) {
    res.json({ purchasehist: data });
  });
});
router.post("/api/purchasehist", function(req, res) {
  purchasehist.create([
      "firstname", "lastname","phone","address","email","purchaseday","price","userid"
  ], [
      req.body.firstname, req.body.lastname, req.body.phone, req.body.address, req.body.email, req.body.purchaseday, req.body.price, req.body.userid
  ], function(result) {
      // Send back the ID of the new quote
      res.json({ id: result.insertId });
  });
});


module.exports = router;