const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  title: String,
  content: String,
});

BlogSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

BlogSchema.set("toJSON", {
  virtuals: true,
});

const Blog = mongoose.model("blogs", BlogSchema);

module.exports = Blog;
