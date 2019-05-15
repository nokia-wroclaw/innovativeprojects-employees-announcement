const express = require("express");
const commentRoutes = express.Router();

// Load comment model
const Comment = require("../../models/Comment");

commentRoutes.route("/").get(function(req, res) {
  Comment.find(function(err, comments) {
    if (err) {
      console.log(err);
    } else {
      res.json(comments);
    }
  });
});

commentRoutes.route("/topicId/:id").get(function(req, res) {
  let id = req.params.id;
  Comment.find({ topic_id: id }, function(err, comment) {
    res.json(comment);
  });
});

commentRoutes.route("/add").post(function(req, res) {
  let comment = new Comment(req.body);
  comment
    .save()
    .then(comment => {
      res.status(200).json({ comment: "Comment added successfully" });
    })
    .catch(err => {
      res.status(400).send("adding new Comment failed");
    });
});

commentRoutes.route("/update/:id").post(function(req, res) {
  Comment.findById(req.params.id, function(err, comment) {
    if (!comment) res.status(404).send("data is not found");
    else comment.message = req.body.message;
    comment.user_id = req.body.user_id;
    comment.topic_id = req.body.topic_id;

    comment
      .save()
      .then(comment => {
        res.json("Comment updated");
      })
      .catch(err => {
        res.status(400).send("Update not possible");
      });
  });
});

commentRoutes.route("/delete/:id").post(function(req, res) {
  Comment.findById(req.params.id, function(err, comment) {
    if (!comment) res.status(404).send("data is not found");
    else
      comment
        .delete()
        .then(comment => {
          res.json("Comment deleted");
        })
        .catch(err => {
          res.status(400).send("Delete not possible");
        });
  });
});

module.exports = commentRoutes;
