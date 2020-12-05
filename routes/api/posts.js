var express = require("express");
var router = express.Router();
var validate = require("../../middlewares/validateProduct");
var auth = require("../../middlewares/auth");
var admin = require("../../middlewares/admin");
var { Post } = require("../../models/Post");
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

router.post("/", parser.single("image"), async function (req, res, next) {
  let post = new Post();
  post.caption = req.body.caption;
  post.imageUrl = req.file.path;
  post.user = req.body.userId;
  console.log(req.body.caption);
  console.log(req.file);
  await post.save();
  res.send(post);
});

router.get("/", async function (req, res, next) {
  console.log(req.user);
  let page = Number(req.query.page ? req.query.page : 1);
  let perPage = Number(req.query.perPage ? req.query.perPage : 10);
  let skipRecords = perPage * (page - 1);
  let posts = await Post.find().populate("user");
  // .skip(skipRecords)
  // .limit(perPage);
  let total = await Post.find().countDocuments();
  res.send({ total, posts });
});

router.get("/:id", async function (req, res, next) {
  try {
    let post = await Post.findById(req.params.id);
    if (!post) return res.status(400).send("post with given id is not present");
    return res.status(200).send(post);
  } catch (err) {
    res.status(400).send("invalid id");
  }
});

router.put("/:id", validate, auth, admin, async function (req, res, next) {
  let post = await Post.findById(req.params.id);
  post.name = req.body.name;
  post.price = req.body.price;
  await post.save();
  res.send(post);
});

router.delete("/:id", auth, admin, async function (req, res, next) {
  let post = await Post.findByIdAndDelete(req.params.id);

  res.send(post);
});

module.exports = router;
