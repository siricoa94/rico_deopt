var orm = require("../orm/orm");

var product = {
    all: function(cb) {
        orm.all("products", function(res) {
        cb(res);
        });
    },
    // The variables cols and vals are arrays.
    create: function(cols, vals, cb) {
        orm.create("products", cols, vals, function(res) {
        cb(res);
        });
    },
    update: function(objColVals, vals, condition, cb) {
        orm.update("products", objColVals, vals, condition, function(res) {
        cb(res);
        });
    },
    delete: function(condition, cb) {
        orm.delete("products", condition, function(res) {
        cb(res);
        });
    },
    updateState: function(objColVals, condition, cb) {
        orm.updateState("products", objColVals, condition, function(res) {
          cb(res);
        });
    },
};
  
module.exports = product;