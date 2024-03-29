const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const nodemailer = require("nodemailer");

const crypto = require("crypto");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");

router.route("/:id").get(function(req, res) {
  let id = req.params.id;
  User.findById(id, function(err, user) {
    res.json(user);
  });
});

router.get("/acc/:email", (req, res) => {
  User.findOne({ email: req.params.email }).then(user => {
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    res.json(user);
  });
});

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  // Form validation

  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const token = crypto.randomBytes(20).toString("hex");

      nodemailer.createTestAccount((err, account) => {
        let transporter = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: "empl.announcements", // generated ethereal user
            pass: "emplpassword" // generated ethereal password
          }
        });

        const url = `https://inno-employees-announcements.herokuapp.com/emailconfirmation/${token}`;

        let mailOptions = {
          from: `"noreply" <noreply@employeesannouncements.com>`, // sender address
          to: req.body.email, // list of receivers
          subject: "Email confirmation", // Subject line
          text: `You are receiving this because you or someone else registered on this email. Please click on this link <a href="${url}">${url}</a> If that wasn't you just ignore that email.`, // plain text body
          html: `<b>You are receiving this because you or someone else registered on this email. Please click on this link <a href="${url}">${url}</a> If that wasn't you just ignore that email.</b>` // html body
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error);
          }
        });
      });

      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        token: token
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation

  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    if (user.isVerified === false) {
      return res
        .status(404)
        .json({ notverified: "Your email is not verified" });
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          isAdmin: user.isAdmin
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 604800 //31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

router.post("/update/name/:id", (req, res) => {
  User.findById(req.body.id, (err, user) => {
    if (!user) res.status(404).send("User not found");
    else {
      (user.firstName = req.body.firstName),
        (user.lastName = req.body.lastName);

      user
        .save()
        .then(user => {
          res.json("User's first and/or last name updated");
        })
        .catch(err => {
          res
            .status(400)
            .send("User first and/or last name update not possible");
        });
    }
  });
});

router.post("/emailconfirmation/:token", (req, res) => {
  User.findOne({ token: req.params.token }).then(user => {
    if (!user) res.status(404).send("User not found");
    else {
      user.isVerified = true;

      user
        .save()
        .then(user => {
          res.json("User token done");
        })
        .catch(err => {
          res.status(400).send("User token error");
        });
    }
  });
});

router.post("/update/password/:id", (req, res) => {
  User.findById(req.body.id, (err, user) => {
    if (!user) res.status(404).send("User not found");
    else {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.newPassword, salt, (err, hash) => {
          if (err) throw err;
          user.password = hash;
          user
            .save()
            .then(user => {
              res.json("User's password updated");
            })
            .catch(err => {
              res.status(400).send("User password update not possible");
            });
        });
      });
    }
  });
});

router.post("/update/photo/:id", (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (!user) res.status(404).send("User not found");
    else {
      (user.image = req.body.image),
        user
          .save()
          .then(user => {
            res.json("User's image updated");
          })
          .catch(err => {
            res.status(400).send("User's image update not possible");
          });
    }
  });
});

module.exports = router;
