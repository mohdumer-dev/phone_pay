const { Router } = require("express");
const UserRoute = Router();
const { UserModel, AccountModel } = require("../db");

UserRoute.get("/", (req, res) => {
  res.json("Everything working fine");
});

UserRoute.post("/signup", async(req, res) => {
  const { firstname, email, password, lastname } = req.body;
  await UserModel.create({
    firstname,
    email,
    password,
    lastname
  })
  res.json({
    message:"User Created",
  })
});

module.exports = {
  UserRoute,
};
