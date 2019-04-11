const express = require("express");
const router = express.Router();
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const keys = require("../../config/keys");


// Load Topic model
const Topic = require("../../models/Topic");



router.post("/add", (req, res) => {
    
  
  
          const newTopic = new Topic({
            title: req.body.title,  
            description: req.body.description,
            user_id: req.body.user_id,
    });
  

        
            newTopic
              .save()
              .then(Topic => res.json(Topic))
              .catch(err => console.log(err));
        
        
  });


module.exports = router;