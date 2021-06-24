const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.status(200).send("<H1>Home Page - GET Request</H1>");
});

app.post("/", (req, res) => {
    res.status(200).send("<H1>Home Page - POST Request</H1>");
});

app.get("/register", (req, res) => {
    //res.cookie("username", "susmi");
    //res.clearCookie("username");
    res.append("username", "susmi"); // info passing in the header
    res.send("<H1>Register</H1>");
});

app.get("/login", (req, res) => {
    res.json({ name: "Susmi", profession: "Student" });
});

app.get("/dashboard", (req, res) => {
    res.send("<H1>Dashboard</H1>");
});

app.use((req, res) => {
    res.status(404).send("Page doesn't exist!");
  });

module.exports = app;