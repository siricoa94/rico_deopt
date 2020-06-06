let mysql = require("mysql");

let connection;

connection = mysql.createconnection(process.env.JAWSDB_URL);

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
});
  
connection.config.typeCast = function(field, next) {
    if (field.type == "TINY" && field.length == 1) {
        return field.string() == "1"; // 1 = true, 0 = false
    }
    return next();
};

module.exports = connection;