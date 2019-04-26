const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CommentSchema = new Schema({
  message: {
    type: String,
    required: true
  },
  user_id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  topic_id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  date_of_add: {
    type: Date,
    default: Date.now
  }
});

module.exports = Comment = mongoose.model("Comments", CommentSchema);
