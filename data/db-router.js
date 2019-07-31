const express = require("express");
const Posts = require("./db");
const router = express.Router();

router.get("/", (req, res) => {
  res.send({ success: " ready" });
});

router.post("/", (req, res) => {
  const { title, contents } = req.body;
  console.log(req.body, "api");

  if (!title || !contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  } else {
    Posts.insert(req.body)
      .then(post => {
        res.status(201), json(post);
      })
      .catch(err => {
        res.status(500).json({
          error: "There was an error while saving the post to the database"
        });
      });
  }
});

router.post("/:id/comments", (req, res) => {});

module.exports = router;
// server.use("/api/posts", postsRouter);
