const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var userSchema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    instaID: { type: String, required: true },
    fbID: { type: String, required: true }
  },
  { timestamps: true }
);
module.exports = mongoose.model("user", userSchema);
