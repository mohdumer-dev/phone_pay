const { Router, response } = require("express");
const AccountRoute = Router();
const userMiddleware = require("../middleware/user");
const { UserModel, AccountModel } = require("../db");
const mongoose = require("mongoose");

AccountRoute.get("/balance", userMiddleware, async (req, res) => {
  try {
    const user_id = req.data;
    const User = await AccountModel.findOne({ userId: user_id });
    res.json({ balance: User.balance });
  } catch (err) {
    res.json(err);
  }
});

AccountRoute.post("/transfer", userMiddleware, async (req, res) => {
    const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const { amount, to } = req.body;
    const user_id = req.data;

    const Sender = await AccountModel.findOne({ userId: user_id }).session(
      session
    );
    if (Sender.balance >= amount) {
      await AccountModel.findOneAndUpdate(
        { userId: user_id },
        { $inc: { balance: -amount } }
      ).session(session);
      await AccountModel.findOneAndUpdate(
        { userId: to },
        { $inc: { balance: +amount } }
      ).session(session);
      await session.commitTransaction();
      res.json({response:"Amount Tranfered"});
    } else {
      await session.abortTransaction();
      res.json({response:"Insufficeint balance"});
    }
  } catch (err) {
    console.log(err);
    res.json(err);
  } finally {
   await session.endSession();
  }
});

module.exports = AccountRoute;
