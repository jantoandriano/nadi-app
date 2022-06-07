var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
  first_name: String,
  last_name: String,
  password: String,
  email: String,
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
