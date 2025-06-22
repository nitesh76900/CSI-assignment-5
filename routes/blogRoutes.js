const express = require("express");
const { getBlogs, createBlog, updateBlog, deleteBlog, toggleBlogIsActive } = require("../controllers/blogController");
const router = express.Router();

router.get("/", getBlogs);
router.post("/create", createBlog);
router.put("/:id", updateBlog);
router.delete("/:id", deleteBlog);
router.patch('/toggle/:id', toggleBlogIsActive);

module.exports = router;
