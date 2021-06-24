require("dotenv").config();
const app = require("./app");
const mongoose = require('mongoose')
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}.`);
});

mongoose.connect(process.env.DATABASE_ACCESS, () =>console.log('DB connected'))
.catch((error) => console.log(error.message));