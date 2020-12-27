var express = require("express");
var router = express.Router();
var auth = require("../../middlewares/auth");
var admin = require("../../middlewares/admin");
var { Friendship } = require("../../models/Friendship");

router.post("/", async function (req, res, next) {
  let friendship = new Friendship();
  friendship.follower = req.body.followerId;
  friendship.followed = req.body.followingId;
  friendship.createdAt = req.body.createdAt;
  await friendship.save();
  res.send(friendship);
});

router.post("/total", async function (req, res, next) {
  let friendships = await Friendship.find({
    post: req.body.postId,
  }).countDocuments();
  res.send(`${friendships}`);
});

router.get("/", async function (req, res, next) {
  let friendships = await Friendship.find();
  res.send(friendships);
});

router.get("/:id", async function (req, res, next) {
  try {
    let friendship = await Friendship.findById(req.params.id);
    if (!friendship)
      return res.status(400).send("friendship with given id is not present");
    return res.status(200).send(friendship);
  } catch (err) {
    res.status(400).send("invalid id");
  }
});

router.delete("/:id", auth, async function (req, res, next) {
  let friendship = await Friendship.findByIdAndDelete(req.params.id);

  res.send(friendship);
});

router.post("/isFollowing", async function (req, res, next) {
  let friendship = await Friendship.find({
    follower: req.body.followerId,
    followed: req.body.followingId,
  });
  if (friendship == "") {
    res.status(404).send(false);
  } else {
    console.log("found :" + req.body.userId);
    res.send(friendship);
  }
});

router.post("/followings", async function (req, res, next) {
  let followings = await Friendship.find({
    follower: req.body.followerId,
  }).populate("followed");
  if (followings == "") {
    res.status(404).send(false);
  } else {
    console.log("found :" + req.body.userId);
    res.send(followings);
  }
});

module.exports = router;
