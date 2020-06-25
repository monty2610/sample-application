const express = require("express");
const {
  createNewBlog,
  updateBlog,
  fetchBlogById,
  fetchAllBlogs,
  deleteBlog,
} = require("../controllers");

const router = express.Router();

router.post("/blogs", createNewBlog);
router.get("/blogs", fetchAllBlogs);
router.get("/blogs/:id", fetchBlogById);
router.put("/blogs/:id", updateBlog);
router.delete("/blogs/:id", deleteBlog);

module.exports = router;
