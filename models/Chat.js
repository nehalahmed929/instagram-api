var mongoose = require("mongoose");
var joi = require("joi");

chatSchema = mongoose.Schema({
  lastMessage: String,

  createdAt: {
    type: Date,
    default: new Date(),
  },

  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

let Chat = mongoose.model("Chat", chatSchema);

function validateChat(data) {
  const schema = joi.object({
    lastMessage: joi.string(),
  });
  return schema.validate(data, { abortEarly: false });
}

module.exports.Chat = Chat;
module.exports.validate = validateChat;
