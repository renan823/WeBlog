const config = require("../config/db.config");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

//create db with collections
const db = {};
db.mongoose = mongoose;
db.url = config.url;
db.user = require("./user.model")(mongoose);
db.post = require("./post.model")(mongoose);

module.exports = db;