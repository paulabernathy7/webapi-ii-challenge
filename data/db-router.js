const express = require("express");
const Posts = require("./db");
const router = express.Router();

//THIS FILE HANDLES ROUTES

// router.get("/", (req, res) => {
//   res.send({ success: " ready" });
// });

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
        res.status(201).json(post);
      })
      .catch(err => {
        res.status(500).json({
          error: "There was an error while saving the post to the database",
          message: err.message // always include err.message
        });
      });
  }
});

router.post("/:id/comments", (req, res) => {
  const { id } = req.params;
  const text = req.body;

  if (!id) {
    res
      .status(404)
      .json({ message: "The post with the specified ID does not exist." });
  } else {
    Posts.insertComment(text)
      .then(post => {
        if (post) {
          res.status(201).json(post);
        } else {
          res
            .status(400)
            .json({ errorMessage: "Please provide text for the comment." });
        }
      })
      .catch(err => {
        res.status(500).json({
          error: "There was an error while saving the comment to the database",
          err: err.message // always include err.message
        });
      });
  }
});

router.get("/", (req, res) => {
  Posts.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});
module.exports = router;
// server.use("/api/posts", postsRouter);
