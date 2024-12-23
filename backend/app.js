const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { UserRoute } = require("./routes/user");


app.use(express.json())
app.use("/api/v1/user", UserRoute);

app.listen(3000, () => {
  try {
    console.log("Port working")
    mongoose.connect(
      "mongodb+srv://umer:7JeFHoBqTX4PbdIp@amazon.eitro.mongodb.net/phonepay"
    );
    console.log("Connected to the database")
  } catch (err) {
    console.log(err);
  }
});
