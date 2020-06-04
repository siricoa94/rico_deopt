var orm = require("../orm/orm");

var leaderboards = {
    all: function(cb) {
        orm.all("leaderboard", function(res) {
        cb(res);
        });
    },
    // The variables cols and vals are arrays.
    create: function(cols, vals, cb) {
        orm.create("leaderboard", cols, vals, function(res) {
        cb(res);
        });
    },
    update: function(objColVals, vals, condition, cb) {
        orm.update("leaderboard", objColVals, vals, condition, function(res) {
        cb(res);
        });
    },
    delete: function(condition, cb) {
        orm.delete("leaderboard", condition, function(res) {
        cb(res);
        });
    },
    updateState: function(objColVals, condition, cb) {
        orm.updateState("leaderboard", objColVals, condition, function(res) {
          cb(res);
        });
    },
};
  
module.exports = leaderboards;