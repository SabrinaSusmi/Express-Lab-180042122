const express = require("express");
const app = express();
const PORT = 2122;

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}.`);
});