const { Schema, model } = require("mongoose");
const commentSchema = new Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    article: {
      type: Schema.Types.ObjectId,
      ref: "Article",
    },
  },
  {
    createdAt: true,
    timestamps: true,
  }
);
const Comment = model("Comment", commentSchema);
module.exports = Comment;