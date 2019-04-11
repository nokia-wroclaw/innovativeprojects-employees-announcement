const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// Create Schema
const AnnouncementSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  user_id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  date_of_add: {
    type: Date,
    default: Date.now
  },
  is_active: {
    type: Boolean,
    default: true
  }
});

module.exports = Announcement = mongoose.model("Announcements", AnnouncementSchema);
