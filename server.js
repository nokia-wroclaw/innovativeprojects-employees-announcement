const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000; // process.env.port will be Heroku's port when we will deploy the app there
const db = require("./config/keys").mongoURI;
const passport = require("passport");
const users = require("./routes/api/users");

const announcementsRoutes = require("./routes/api/announcements");
const topicsRoutes = require("./routes/api/topics");
const commentsRoutes = require("./routes/api/comments");

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB successfully connected :)"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);
app.use("/api/topics", topicsRoutes);
app.use("/api/comments", commentsRoutes);
app.use("/api/announcements", announcementsRoutes);

app.get("/api/authors", function(request, response) {
  const authors = [
    { id: 1, firstName: "Dawid", lastName: "Białek" },
    { id: 2, firstName: "Łukasz", lastName: "Gil" },
    { id: 3, firstName: "Szymon", lastName: "Bal" },
    { id: 4, firstName: "Kamil", lastName: "Śliwa" }
  ];
  response.json(authors);
});

app.listen(port, function() {
  console.log(`Listening at Port ${port}`);
});

app.use(function(req, res, next) {
  req.db = db;
  next();
});

var authorsFromDbSchema = new mongoose.Schema({
  _id: Number,
  firstName: String,
  lastName: String
});

var authorsFromDbModel = mongoose.model("authors", authorsFromDbSchema);

app.get("/authorsFromDb", async (request, response) => {
  try {
    var result = await authorsFromDbModel.find().exec();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});
