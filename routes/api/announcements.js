const express = require("express");
const announcementRoutes = express.Router();

// Load Announcement model
const Announcement = require("../../models/Announcement");

announcementRoutes.route("/").get(function(req, res) {
  Announcement.find(function(err, announcements) {
    if (err) {
      console.log(err);
    } else {
      res.json(announcements);
    }
  });
});

announcementRoutes.route("/:id").get(function(req, res) {
  let id = req.params.id;
  Announcement.findById(id, function(err, announcement) {
    res.json(announcement);
  });
});

announcementRoutes.route("/add").post(function(req, res) {
  let announcement = new Announcement(req.body);
  announcement
    .save()
    .then(announcement => {
      res.status(200).json({ announcement: "Announcement added successfully" });
    })
    .catch(err => {
      res.status(400).send("adding new Announcement failed");
    });
});

announcementRoutes.route("/update/:id").post(function(req, res) {
  Announcement.findById(req.params.id, function(err, announcement) {
    if (!announcement) res.status(404).send("data is not found");
    else announcement.title = req.body.title;
    announcement.description = req.body.description;
    announcement.price = req.body.price;
    announcement.user_id = req.body.user_id;

    announcement
      .save()
      .then(announcement => {
        res.json("Announcement updated");
      })
      .catch(err => {
        res.status(400).send("Update not possible");
      });
  });
});

announcementRoutes.route("/delete/:id").post(function(req, res) {
  Announcement.findById(req.params.id, function(err, announcement) {
    if (!announcement) res.status(404).send("data is not found");
    else
      announcement
        .delete()
        .then(announcement => {
          res.json("Announcement deleted");
        })
        .catch(err => {
          res.status(400).send("Delete not possible");
        });
  });
});

module.exports = announcementRoutes;
