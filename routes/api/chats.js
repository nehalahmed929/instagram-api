var express = require("express");
var router = express.Router();
var auth = require("../../middlewares/auth");
var admin = require("../../middlewares/admin");
var { Chat } = require("../../models/Chat");
var { ChatUser } = require("../../models/ChatUser");

router.post("/loggedInUserchats", async function (req, res, next) {
  let chats = await Chat.find();
  res.send(chats);
});

module.exports = router;
