var orm = require("../orm/orm");

var customer = {
    all: function(cb) {
        orm.all("customers", function(res) {
        cb(res);
        });
    },
    // The variables cols and vals are arrays.
    create: function(cols, vals, cb) {
        orm.create("customers", cols, vals, function(res) {
        cb(res);
        });
    },
    update: function(objColVals, vals, condition, cb) {
        orm.update("customers", objColVals, vals, condition, function(res) {
        cb(res);
        });
    },
    delete: function(condition, cb) {
        orm.delete("customers", condition, function(res) {
        cb(res);
        });
    },
};
  
module.exports = customer;