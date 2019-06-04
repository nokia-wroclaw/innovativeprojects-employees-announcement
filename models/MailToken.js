const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TokenSchema = new Schema({
  _userId: {
    type: String,
    required: true
  },
  token: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now, expires: 43200 }
});

module.exports = Token = mongoose.model("tokens", TokenSchema);
