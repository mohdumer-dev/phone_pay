const { Router } = require("express");
const UserRoute = Router();
const { UserModel, AccountModel } = require("../db");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "hb8989asdv787989wqweqwe88ssca8ad8w83";
const JWT_LOGIN = "njkdnakjs-dd99asd-asdasd98avbbgnswrgs88";
// const cookieParser = require("cookie-parser");
const { sendMail } = require("../email");
const bcrypt = require("bcrypt");
const { z } = require("zod");

const userMiddleware = require("../middleware/user");

const userObject = z.object({
  email: z.string().email().min(8),
  password: z
    .string()
    .min(8)
    .max(50)
    .regex(/^(?=.*\d).+$/, "Password must contain at least one number."),
  firstname: z.string().min(1).max(50),
  lastname: z.string().min(1).max(50),
});

UserRoute.post("/signup", async (req, res) => {
  const { firstname, email, password, lastname } = req.body;
  //Checking the user for to resend the Verification Link

  const { success, error } = userObject.safeParse(req.body);
  if (!success) {
    res.status(403).json({ error });
    return
  }

  const existinguser = await UserModel.findOne({
    email,
    isVerified: false,
  });

  if (!existinguser) {
    const hashedPassword = await bcrypt.hash(password, 8);
    const User = await UserModel.create({
      firstname,
      email,
      password: hashedPassword,
      lastname,
    });
    const verificationToken = await jwt.sign({ id: User._id }, JWT_SECRET);
    const verificationLink = `http://192.168.29.252:3000/api/v1/user/verification?token=${verificationToken}`;
    await sendMail(User.email, verificationLink);
    res.json("Verification Link Send");
    return
  }

  const hashedpassword = bcrypt.compareSync(password, existinguser.password);

  if (!hashedpassword) {
    res.status(404).json("Email or Password Incorrect");
  } else {
    const verificationToken = await jwt.sign(
      { id: existinguser._id },
      JWT_SECRET
    );
    const verificationLink = `http://192.168.29.252:3000/api/v1/user/verification?token=${verificationToken}`;
    await sendMail(existinguser.email, verificationLink);
    res.json("Another Verification Send");
    return
  }
});

UserRoute.get("/verification", async (req, res) => {
  const token = req.query.token;
  const decodedToken = jwt.verify(token, JWT_SECRET);
  console.log(decodedToken);
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
    res.json({
      msg: "User Verified , Please Signin Now",
      username: User.firstname,
    });
  } else {
    res.status(404).json({ msg: "Please Signup Again" });
  }
});

UserRoute.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const nonVerified = await UserModel.findOne({
    email,
    password,
    isVerified: false,
  });
  if (nonVerified) {
    res.status(404).json({ msg: "Please Verify" });
  }
  const User = await UserModel.findOne({
    email,
    // password
  });
  if (!User) {
    res.status(422).json({ msg: "Invalid User" });
  }
  const hashedPassword = await bcrypt.compare(password, User.password);
  if (!hashedPassword) {
    res.status(404).json("Email or password is incorrect");
  }
  const Wallet = await AccountModel.create({
    userId: User._id,
    balance: 20000,
  });
  const token = jwt.sign({ id: User._id }, JWT_LOGIN);
  res.json({ msg: token, balance: Wallet.balance });
});

UserRoute.get("/me", userMiddleware, async (req, res) => {
  const _id = req.data;
  const User = await UserModel.findOne({ _id });
  res.json(User.firstname);
});

UserRoute.put("/me", userMiddleware, async (req, res) => {
  const _id = req.data;
  const { password, firstname, lastname } = req.body;
  //   const hashedPassword = await bcrypt.hash(password, 8);
  const { success, error } = userObject.safeParse(req.body);
  if (!success) {
    res.status(403).json({ error });
  }
  const User = await UserModel.findOneAndUpdate(
    { _id },
    { firstname, lastname }
  );
  res.json({ Changed: "Updated Firstname and Lastname" });
});

UserRoute.get("/bulk", userMiddleware, async (req, res) => {
  try {
    const filter = req.query.filter || "";
    const User = await UserModel.find({
      $or: [
        { firstname: { $regex: filter } },
        { lastname: { $regex: filter } },
      ],
    });
    res.json({
      Users: User.map((data) => ({
        firstname: data.firstname,
        lastname: data.lastname,
        _id: data._id,
      })),
    });
  } catch (err) {
    res.status(502).json("Server Not working");
  }
});

module.exports = {
  UserRoute,
};
