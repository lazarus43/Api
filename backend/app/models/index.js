const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
//set url mongo
db.url = dbConfig.url;

db.items = require("./item.model.js")(mongoose);
db.bills = require("./bill.model.js")(mongoose);
db.cates = require("./cate.model.js")(mongoose);
db.brands = require("./brand.model.js")(mongoose);

//awt role user
db.user = require("./user.model")(mongoose);
db.role = require("./role.model")(mongoose);

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;