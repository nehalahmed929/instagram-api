var express = require("express");
var router = express.Router();
var auth = require("../../middlewares/auth");
var admin = require("../../middlewares/admin");
var { Message } = require("../../models/Message");

router.post("/whereChat", async function (req, res, next) {
  let messages = await Message.find({ chat: req.body.chatId });
  res.send(messages);
});

module.exports = router;
