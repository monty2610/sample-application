const Blog = require("../models");

const createNewBlog = async (req, res) => {
  const { title, content } = req.body;

  console.log("req body", title, content);
  try {
    // mongoose model
    const newBlog = new Blog({
      title,
      content,
    });
    const blog = await newBlog.save();
    res.status(201).send(blog);
  } catch (e) {
    console.error("---Error creating blog ----", e);
    res.status(500).send({ message: "Error creating new blog" });
  }
};

const updateBlog = async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.params;

  try {
    // mongoose model
    const currentBlog = await Blog.findOne({ _id: id });
    console.log("blog to update is ", currentBlog);
    if (title) {
      currentBlog.title = title;
    }

    if (content) {
      currentBlog.content = content;
    }

    const blog = await currentBlog.save();
    res.status(200).send(blog);
  } catch (e) {
    console.error("---Error updating blog ----", e);
    res.status(500).send({ message: "Error updating blog" });
  }
};

const deleteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    // mongoose model
    await Blog.findByIdAndDelete({ _id: id });
    res.status(200).send({
      id,
    });
  } catch (e) {
    console.error("---Error deleting blog ----", e);
    res.status(500).send({ message: "Error deleting blog" });
  }
};

const fetchBlogById = async (req, res) => {
  const id = req.params.id;
  console.log("fetching product for ", id);
  try {
    const blog = await Blog.findOne({ _id: id });
    res.status(200).send(blog);
  } catch (e) {
    console.error("---Error fetching blog specific ----", e);
    res
      .status(500)
      .send({ message: "Error fetching specific blog information" });
  }
};

const fetchAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({
      title: { $exists: true, $ne: "" },
      content: { $exists: true, $ne: "" },
    });
    res.status(200).send(blogs);
  } catch (e) {
    console.error("---Error fetching blogs ----", e);
    res.status(500).send({ message: "Error fetching blogs information" });
  }
};

module.exports = {
  createNewBlog,
  updateBlog,
  fetchBlogById,
  fetchAllBlogs,
  deleteBlog,
};
