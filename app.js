const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");
const Blog = require("./models/blog");

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

app.use(express.static("public"));

//NOT WOOOOOOOOOOOORKING
app.get("/", (req, res) => {
  Blog.find()
    .sort({_id: -1})
    .then((result) => {
      res.render("index", {blogs: result});
    })
    .catch((err) => console.log(err));
});

app.get("/tips", (req, res) => {
  res.render("tips");
});

app.get("/create-note", (req, res) => {
  res.render("create-note");
});

app.get("/mock-projects", (req, res) => {
  res.render("mock-projects");
});

app.get("/daily-notes/:id", (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((blog) => {
      res.render("daily-notes-details", {blog});
    })
    .catch((err) => {
      res.status(404).render("404", {title: "404"});
    });
});

app.post("/daily-notes", (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => res.redirect("/"))
    .catch((err) => console.log(err));
});

app.delete("/daily-notes/:id", (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({redirect: "/"});
    })
    .catch((err) => console.log(err));
});

//MANUAL ADD DATA

// app.get("/add-blog", (req, res) => {
//   //read json

//   //put json data to blogmodel

//   const blog = new Blog({
//     title: "Day 1",
//     snippet: "day1 learnings",
//     body: [1, 2, 3],
//   });
//   blog
//     .save()
//     .then((result) => res.send(result))
//     .catch((err) => console.log(err));
// });

//GET JSON DATA

// app.get("/add-json", (req, res) => {
//   fs.readFile(
//     "./json/daily-notes-entries.json",
//     "utf-8",
//     (error, jsonString) => {
//       if (!error) {
//         try {
//           const data = JSON.parse(jsonString);
//           transferToModel(data);
//           res.send("Blog data saved");
//         } catch (err) {
//           console.log("ERR parsing json", err);
//         }
//       } else console.log(error);
//     }
//   );

//   function transferToModel(data) {
//     data.entries.forEach((entry) => {
//       const blog = new Blog({
//         title: entry.day,
//         snippet: entry.intro,
//         body: entry.lessons,
//       });
//       blog.save();
//     });
//   }
// });
