var express = require("express");
var router = express.Router();
var auth = require("../../middlewares/auth");
var admin = require("../../middlewares/admin");
var { Like } = require("../../models/Like");

router.post("/", async function (req, res, next) {
  let like = new Like();
  like.user = req.body.userId;
  like.post = req.body.postId;
  like.date = req.body.date;
  await like.save();
  res.send(like);
});

router.post("/total", async function (req, res, next) {
  let likes = await Like.find({
    post: req.body.postId,
  }).countDocuments();
  res.send(`${likes}`);
});

router.get("/", async function (req, res, next) {
  let likes = await Like.find();
  res.send(likes);
});

router.get("/:id", async function (req, res, next) {
  try {
    let like = await Like.findById(req.params.id);
    if (!like) return res.status(400).send("like with given id is not present");
    return res.status(200).send(like);
  } catch (err) {
    res.status(400).send("invalid id");
  }
});

router.put("/:id", auth, async function (req, res, next) {
  let like = await Like.findById(req.params.id);
  like.user = req.body.userId;
  like.post = req.body.postId;
  await like.save();
  res.send(like);
});

router.delete("/:id", auth, async function (req, res, next) {
  let like = await Like.findByIdAndDelete(req.params.id);

  res.send(like);
});

router.post("/isLiked", async function (req, res, next) {
  let like = await Like.find({
    user: req.body.userId,
    post: req.body.postId,
  });
  if (like == "") {
    res.status(404).send(false);
  } else {
    console.log("found :" + req.body.userId);
    res.send(like);
  }
});

module.exports = router;
