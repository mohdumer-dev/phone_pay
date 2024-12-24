const { Router } = require("express");
const UserRoute = Router();
const { UserModel, AccountModel } = require("../db");
const { findOne, findOneAndUpdate } = require("mongoose/lib/model");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "hb8989asdv787989wqweqwe88ssca8ad8w83";
const JWT_LOGIN="njkdnakjs-dd99asd-asdasd98avbbgnswrgs88"
const cookieParser = require("cookie-parser");
const { sendMail } = require("../email");

const userMiddleware=require('../middleware/user')

UserRoute.get("/", (req, res) => {
  res.json("Everything working fine");
});

UserRoute.post("/signup", async (req, res) => {
  const { firstname, email, password, lastname } = req.body;
  //Checking the user for to resens the Verification Link
  const existinguser = await UserModel.findOne({
    email,
    password,
    isVerified: false,
  });

  if (existinguser) {
    const verificationToken = await jwt.sign({id:existinguser._id}, JWT_SECRET);
    const verificationLink = `http://192.168.29.252:3000/api/v1/user/verification?token=${verificationToken}`;
    await sendMail(existinguser.email, verificationLink);
    res.json("Another Verification Send");
  } else {
    const User = await UserModel.create({
      firstname,
      email,
      password,
      lastname,
    });

    const verificationToken = await jwt.sign({ id: User._id }, JWT_SECRET);
    const verificationLink = `http://192.168.29.252:3000/api/v1/user/verification?token=${verificationToken}`;
    await sendMail(User.email, verificationLink);
    res.json("Verification Link Send");
  }
});

UserRoute.get("/verification", async (req, res) => {
  const token = req.query.token;
  const decodedToken=jwt.verify(token,JWT_SECRET)
  console.log(decodedToken)
  if (!token) {
    res.status(404).json({ msg: "User Not Exist " });
  }
  if (decodedToken.id) {
    const User = await UserModel.findOneAndUpdate(
      {
        _id: decodedToken.id,
      },
      {
        isVerified: true,
      }
    );
    res.json({ msg: "User Verified", username: User.firstname });
  } else {
    res.status(404).json({ msg: "Please Signup Again" });
  }
});

UserRoute.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const nonVerified = await UserModel.findOne({email,password,isVerified:false})
  if(nonVerified){
    res.status(404).json({msg:"Please Verify"})
  }
  const User = await UserModel.findOne({
    email,
    password,
  });
  if (!User) {
    res.status(422).json({ msg: "Invalid User" });
  }
  const token =jwt.sign({id:User._id},JWT_LOGIN)
  res.json({msg:token})
});

UserRoute.get('/me',userMiddleware,async(req,res)=>{
    const _id= req.data
    const User=await UserModel.findOne({_id})
    res.json(User.firstname)
   
})


module.exports = {
  UserRoute,
};
