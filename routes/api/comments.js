const express = require("express");
const router = express.Router();
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const keys = require("../../config/keys");

// Load comment model
const Comment = require("../../models/Comment");

router.post("/add", (req, res) => {
  const newComment = new Comment({
    message: req.body.message,
    user_id: req.body.user_id,
    topic_id: req.body.topic_id
  });

  newComment
    .save()
    .then(Comment => res.json(Comment))
    .catch(err => console.log(err));
});

module.exports = router;
