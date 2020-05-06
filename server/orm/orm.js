var connection = require("../connection/connection");

function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob, vals) {
  console.log("this is the ob " +ob);
  console.log("this is the values " +vals);
  var arr = [];
  // loop through the keys and push the key/value as a string int arr
  for (var key in vals) {
    var value = ob[key];
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
    };
    var newVal = vals[key];
    // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
    newVal = "'" + newVal + "'";

    // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
    // e.g. {sleepy: true} => ["sleepy=true"]
    arr.push(value + "=" + newVal);
  };
  // translate array of strings to a single comma-separated string
  return arr.toString();
}

// Object for all our SQL statement functions.
var orm = {
  all: function(tableInput, cb) {
    var queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  create: function(table, cols, vals, cb) {
    var queryString = "INSERT INTO " + table;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";

    console.log(queryString);

    connection.query(queryString, vals, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
  // An example of objColVals would be {name: panther, sleepy: true}
  update: function(table, objColVals, vals, condition, cb) {
    var queryString = "UPDATE " + table;

    queryString += " SET ";
    queryString += objToSql(objColVals, vals);
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
  delete: function(table, condition, cb) {
    var queryString = "DELETE FROM " + table;
    queryString += " WHERE ";
    queryString += condition;

    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
  updateData: function(table, cols, vals, condition, cb) {
    let queryString = "UPDATE " + table;
    
    queryString = queryString + " SET ";
    queryString += cols.toString();
    queryString += " = ";
    queryString += printQuestionMarks(vals.length);
    queryString = queryString + " WHERE ";
    queryString = queryString + condition;

    console.log("condition +++++++" + condition);
    console.log("query string " +queryString);
    connection.query(queryString, vals, function(err, result){
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
};


// Export the orm object for the model (note.js).
module.exports = orm;