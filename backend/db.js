const mongoose = require("mongoose");
const { boolean } = require("zod");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// Define User Schema
const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minlength: 10,
    maxlength: 40,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  firstname: {
    type: String,
    required: true,
    trim: true,
    minlength: 4,
    maxlength: 50,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
    minlength: 4,
    maxlength: 50,
  },
  isVerified: { type: Boolean, default: false },
});

// Define Account Schema
const AccountSchema = new Schema({
  userId: {
    type: ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  balance: {
    type: Number,
    required: true,
    min: 0, // Ensure balance is non-negative
  },
});

// Create Models
const UserModel = mongoose.model("User", UserSchema);
const AccountModel = mongoose.model("Account", AccountSchema);

module.exports = {
  UserModel,
  AccountModel,
};
