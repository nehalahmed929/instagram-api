var mongoose = require("mongoose");
var joi = require("joi");

tagSchema = mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },

  taggedUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

let Tag = mongoose.model("Tag", tagSchema);

function validateTag(data) {
  const schema = joi.object({
    post: joi.required(),
    taggedUser: joi.required(),
  });
  return schema.validate(data, { abortEarly: false });
}

module.exports.Tag = Tag;
module.exports.validate = validateTag;
