const express = require("express");
const dataRouter = require("./data/db-router");

const server = express(); // other req parsers are available, this is also called middleware
server.use(express.json());
server.use("/api/posts", dataRouter);

module.exports = server;
