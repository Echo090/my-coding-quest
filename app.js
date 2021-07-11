const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");
const Blog = require("./models/blog");
const daily_notes_routes = require("./routes/daily_notes_routes");
const mock_projects_routes = require("./routes/mock_projects_routes");

const app = express();
const port = process.env.PORT || 5000;

//for the form
app.use(express.urlencoded({extended: true}));

const dbURI =
  "mongodb+srv://Echo090:Chinatown66!@nodetuts.mkhcn.mongodb.net/my-coding-quest?retryWrites=true&w=majority";

mongoose
  .connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
  .then((results) => app.listen(port))
  .catch((err) => console.log(err));

app.set("view engine", "ejs");
//HOW TO SETUP MUTLIPLE VIEW FOLDERS

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.redirect("daily-notes");
});

app.get("/create-note", (req, res) => {
  res.render("create-note");
});

app.get("/tips", (req, res) => {
  res.render("tips");
});

app.use("/mock-projects", mock_projects_routes);

app.use("/daily-notes", daily_notes_routes);
