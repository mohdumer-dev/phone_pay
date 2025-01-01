const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { UserRoute } = require("./routes/user");
const cookieParser = require('cookie-parser')
const  AccountRoute =require('./routes/account')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use("/api/v1/user", UserRoute);
app.use('/api/v1/account',AccountRoute)


app.listen(3000, () => {
  try {
    console.log("Port working")
    mongoose.connect(
      "mongodb+srv://umer:7JeFHoBqTX4PbdIp@amazon.eitro.mongodb.net/phonepay-clone"
    );
    console.log("Connected to the database")
  } catch (err) {
    console.log(err);
  }
});
