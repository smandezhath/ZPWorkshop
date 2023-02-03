const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

db.policies = require("./policy.model.js")(mongoose);
db.blog = require("./blog.model.js")(mongoose);
db.carreview = require("./carreview.model.js")(mongoose);
db.movierating = require("./movierating.model.js")(mongoose);

module.exports = db;
