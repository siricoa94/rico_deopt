var orm = require("../orm/orm");

var purchasehist = {
    all: function(cb) {
        orm.all("purchasehistory", function(res) {
        cb(res);
        });
    },
    // The variables cols and vals are arrays.
    create: function(cols, vals, cb) {
        orm.create("purchasehistory", cols, vals, function(res) {
        cb(res);
        });
    },
    update: function(objColVals, vals, condition, cb) {
        orm.update("purchasehistory", objColVals, vals, condition, function(res) {
        cb(res);
        });
    },
    delete: function(condition, cb) {
        orm.delete("purchasehistory", condition, function(res) {
        cb(res);
        });
    },
    updateState: function(objColVals, condition, cb) {
        orm.updateState("purchasehistory", objColVals, condition, function(res) {
          cb(res);
        });
    },
};
  
module.exports = purchasehist;