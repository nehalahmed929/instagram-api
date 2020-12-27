var mongoose = require("mongoose");
var joi = require("joi");
var bcrypt = require("bcryptjs");

userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  imageUrl: {
    type: String,
    default: null,
  },
  role: {
    type: String,
    default: "user",
  },

  account: {
    type: String,
    enum: ["public", "private"],
    default: "public",
  },
  dateOfBirth: Date,
  biography: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.methods.genHashPass = async function () {
  let salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
};

let User = mongoose.model("User", userSchema);

function validateUser(data) {
  const schema = joi.object({
    name: joi.string().min(3).max(10).required(),
    email: joi.string().email().min(3).required().unique(),
    password: joi.string().min(8).required(),
  });
  return schema.validate(data, { abortEarly: false });
}

function validateUserLogin(data) {
  const schema = joi.object({
    email: joi.string().email().min(3).required(),
    password: joi.string().min(8).required(),
  });
  return schema.validate(data, { abortEarly: false });
}

module.exports.User = User;
module.exports.validateRegister = validateUser;
module.exports.validateLogin = validateUserLogin;
