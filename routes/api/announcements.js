const express = require("express");
const router = express.Router();
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const keys = require("../../config/keys");


// Load Announcement model
const Announcement = require("../../models/Announcement");



router.post("/add", (req, res) => {
    
  
  
          const newAnnouncement = new Announcement({
            title: req.body.title,  
            description: req.body.description,
            price: req.body.price,
            user_id: req.body.user_id,
    });
  

        
            newAnnouncement
              .save()
              .then(Announcement => res.json(Announcement))
              .catch(err => console.log(err));
        
        
  });


module.exports = router;