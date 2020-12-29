var express = require("express");
var router = express.Router();
var auth = require("../../middlewares/auth");
var admin = require("../../middlewares/admin");
var { ChatUser } = require("../../models/ChatUser");

router.post("/whereChat", async function (req, res, next) {
  let chatsUsers = await ChatUser.find({
    chat: req.body.chatId,
  }).populate("user");
  res.send(chatsUsers);
});

router.post("/whereUser", async function (req, res, next) {
  let chatsUsers = await ChatUser.find({
    user: req.body.userId,
  }).populate("chat");
  res.send(chatsUsers);
});

module.exports = router;
