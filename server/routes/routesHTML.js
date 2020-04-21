let express = require("express");

let router = express.Router();

let path = require("path");

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../client/public/html/index.html"));
});

module.exports = router;