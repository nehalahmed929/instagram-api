var mongoose = require("mongoose");
var joi = require("joi");

messageSchema = mongoose.Schema({
  message: String,

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

  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

let Message = mongoose.model("Message", messageSchema);

function validateMessage(data) {
  const schema = joi.object({
    user: joi.required(),
    chat: joi.required(),
  });
  return schema.validate(data, { abortEarly: false });
}

module.exports.Message = Message;
module.exports.validate = validateMessage;
