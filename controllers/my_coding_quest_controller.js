const Blog = require("../models/blog");

//DAILY NOTES
//====================================================

const daily_notes_get = (req, res) => {
  Blog.find()
    .sort({_id: -1})
    .then((result) => {
      res.render("index", {blogs: result});
    })
    .catch((err) => console.log(err));
};

const daily_notes_post = (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => res.redirect("/"))
    .catch((err) => console.log(err));
};

const daily_notes_details = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((blog) => {
      res.render("daily-notes-details", {blog});
    })
    .catch((err) => {
      res.status(404).render("404", {title: "404"});
    });
};

const daily_notes_delete = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({redirect: "/"});
    })
    .catch((err) => console.log(err));
};

//MOCK PROJECTS
//====================================================
const mock_projects_get = (req, res) => {
  res.render("mock-projects");
};

const form_01_get = (req, res) => {
  res.render("form-01");
};

const responsive_site_01_get = (req, res) => {
  res.render("responsive-site-01");
};

const tribute_page_get = (req, res) => {
  res.render("tribute-page");
};

//EXPORTS
//====================================================

module.exports = {
  daily_notes_get,
  daily_notes_post,
  daily_notes_details,
  daily_notes_delete,
  mock_projects_get,
  form_01_get,
  responsive_site_01_get,
  tribute_page_get,
};

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
