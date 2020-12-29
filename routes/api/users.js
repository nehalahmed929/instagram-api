var express = require("express");
const { User } = require("../../models/User");
var bcrypt = require("bcryptjs");
var _ = require("lodash");
var jwt = require("jsonwebtoken");
var config = require("config");
var router = express.Router();
var multer = require("multer");
var cldnryConfig = require("../../config/cloudinary.json");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: cldnryConfig.cloudName,
  api_key: cldnryConfig.apiKey,
  api_secret: cldnryConfig.apiSecret,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,

  params: {
    folder: "insta",
    // allowedFormats: ["png"],
    // transformation: [{ width: 30, height: 30, crop: "limit" }],
  },
});
const parser = multer({ storage: storage });

router.get("/", async function (req, res, next) {
  let users = await User.find();
  let total = await User.find().countDocuments();
  res.send({ total, users });
});

router.post(
  "/register",
  parser.single("image"),
  async function (req, res, next) {
    let user = await User.findOne({ email: req.body.email });
    if (user)
      return res.status(400).send("User with given email already exists");
    user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    user.imageUrl = req.file.path;
    await user.genHashPass();
    await user.save();
    let token = jwt.sign(
      { _id: user._id, name: user.name, role: user.role },
      config.get("jwtPrivateKey")
    );

    let dataToReturn = {
      name: user.name,
      email: user.email,
      token: token,
      imageUrl: user.imageUrl,
    };
    res.send(dataToReturn);
  }
);

router.post("/login", async function (req, res, next) {
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("User not registered");
  let isValid = await bcrypt.compare(req.body.password, user.password);
  if (!isValid) return res.status(401).send("Invalid Password");
  let token = jwt.sign(
    { _id: user._id, name: user.name, role: user.role },
    config.get("jwtPrivateKey")
  );

  res.send(token);
});

module.exports = router;
