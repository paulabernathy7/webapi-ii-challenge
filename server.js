const express = require("express");
const dataRouter = require("./data/db-router"); //importing db-router file

const server = express(); // other req parsers are available, this is also called middleware
server.use(express.json());
server.use("/api/posts", dataRouter); // allows me to use the db-router for routes

//base URL
server.get("/", (req, res) => {
  res.send({ success: "We're ready" });
});

module.exports = server;
