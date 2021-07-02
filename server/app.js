const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes.routes");

app.use(userRoutes);
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    //res.status(200).sendFile("home.html", { root: "./views" });
    res.render("dashboard.ejs");
});

app.use((req, res) => {
    res.status(404).send("Page doesn't exist!");
  });

module.exports = app;