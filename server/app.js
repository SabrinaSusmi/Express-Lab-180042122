const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("<H1>Home Page</H1>");
});

module.exports = app;