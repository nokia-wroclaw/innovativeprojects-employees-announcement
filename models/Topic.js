const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

// Create Schema
const TopicSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  user_id: {
    type: ObjectId,
    required: true
  },
  date_of_add: {
    type: Date,
    default: Date.now
  },
  last_activity: {
    type: Date,
    default: Date.now
  }
});

module.exports = Topic = mongoose.model("Topics", TopicSchema);
