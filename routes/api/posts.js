var express = require("express");
var router = express.Router();
var validate = require("../../middlewares/validateProduct");
var auth = require("../../middlewares/auth");
var admin = require("../../middlewares/admin");
var { Post } = require("../../models/Post");
var multer = require("multer");
var upload = multer({ dest: "uploads/" });
var { config, uploader } = require("cloudinary");

const cloudinaryConfig = () => {
  config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
};

const storage = multer.memoryStorage();const multerUploads = multer({ storage }).single(‘image’);

router.get("/", async function (req, res, next) {
  console.log(req.user);
  let page = Number(req.query.page ? req.query.page : 1);
  let perPage = Number(req.query.perPage ? req.query.perPage : 10);
  let skipRecords = perPage * (page - 1);
  let posts = await Post.find().skip(skipRecords).limit(perPage);
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

router.post("/", upload.single("file"), async function (req, res, next) {
  let post = new Post();
  post.name = req.body.name;
  post.price = req.body.price;
  console.log(req.body.caption);
  // console.log(req.file);
  await post.save();
  res.send(post);
});

module.exports = router;
