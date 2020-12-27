var express = require("express");
var router = express.Router();
var auth = require("../../middlewares/auth");
var admin = require("../../middlewares/admin");
var { Comment } = require("../../models/Comment");

router.post("/", async function (req, res, next) {
  let comment = new Comment();
  comment.comment = req.body.comment;
  comment.user = req.body.userId;
  comment.post = req.body.postId;
  comment.createdAt = req.body.createdAt;
  comment.updatedAt = req.body.createdAt;
  await comment.save();
  res.send(comment);
});

router.get("/", async function (req, res, next) {
  let comments = await Comment.find();
  res.send(comments);
});

router.get("/:id", async function (req, res, next) {
  try {
    let comment = await Comment.findById(req.params.id);
    if (!comment)
      return res.status(400).send("comment with given id is not present");
    return res.status(200).send(comment);
  } catch (err) {
    res.status(400).send("invalid id");
  }
});

router.put("/:id", auth, admin, async function (req, res, next) {
  let comment = await Comment.findById(req.params.id);
  comment.comment = req.body.comment;
  comment.user = req.body.userId;
  comment.post = req.body.postId;
  comment.updatedAt = req.body.updatedAt;
  await comment.save();
  res.send(comment);
});

router.delete("/:id", auth, admin, async function (req, res, next) {
  let comment = await Comment.findByIdAndDelete(req.params.id);

  res.send(comment);
});

router.post("/postComments", async function (req, res, next) {
  let comments = await Comment.find({
    post: req.body.postId,
  }).populate("user");
  if (comments == "") {
    res.status(404).send(false);
  } else {
    console.log("found :" + req.body.userId);
    res.send(comments);
  }
});

module.exports = router;
