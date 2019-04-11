const express = require("express");
const topicRoutes = express.Router();

// Load Topic model
const Topic = require("../../models/Topic");

topicRoutes.route("/").get(function(req, res) {
  Topic.find(function(err, topics) {
    if (err) {
      console.log(err);
    } else {
      res.json(topics);
    }
  });
});

topicRoutes.route("/:id").get(function(req, res) {
  let id = req.params.id;
  Topic.findById(id, function(err, topic) {
    res.json(topic);
  });
});

topicRoutes.route("/add").post(function(req, res) {
  let topic = new Topic(req.body);
  topic
    .save()
    .then(topic => {
      res.status(200).json({ topic: "Topic added successfully" });
    })
    .catch(err => {
      res.status(400).send("adding new Topic failed");
    });
});

topicRoutes.route("/update/:id").post(function(req, res) {
  Topic.findById(req.params.id, function(err, topic) {
    if (!topic) res.status(404).send("data is not found");
    else topic.title = req.body.title;
    topic.description = req.body.description;
    topic.user_id = req.body.user_id;

    topic
      .save()
      .then(topic => {
        res.json("Topic updated");
      })
      .catch(err => {
        res.status(400).send("Update not possible");
      });
  });
});

topicRoutes.route("/delete/:id").post(function(req, res) {
  Topic.findById(req.params.id, function(err, topic) {
    if (!topic) res.status(404).send("data is not found");
    else
      topic
        .delete()
        .then(topic => {
          res.json("Topic deleted");
        })
        .catch(err => {
          res.status(400).send("Delete not possible");
        });
  });
});

module.exports = topicRoutes;
