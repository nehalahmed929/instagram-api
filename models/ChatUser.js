var mongoose = require("mongoose");
var joi = require("joi");

chatUserSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chat",
  },

  createdAt: {
    type: Date,
    default: new Date(),
  },
});

let ChatUser = mongoose.model("ChatUser", chatUserSchema);

function validateChatUser(data) {
  const schema = joi.object({
    user: joi.required(),
    chat: joi.required(),
  });
  return schema.validate(data, { abortEarly: false });
}

module.exports.ChatUser = ChatUser;
module.exports.validate = validateChatUser;
