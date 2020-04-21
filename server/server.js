let express = require('express');
let PORT = process.env.PORT || 8080;

let app = express();

app.use(express.static("public"));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

let router = require("./routes/routesHTML.js");

app.use(router);

app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
});