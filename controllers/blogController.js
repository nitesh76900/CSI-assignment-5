const Blog = require("../models/blogModel");

exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    console.log("blogs", blogs);
    res.json(blogs);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createBlog = async (req, res, next) => {
  try {
    const { title, description, isActive } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const blog = await Blog.create({ title, description, isActive });
    res.status(201).json(blog);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateBlog = async (req, res, next) => {
  try {
    const { title, description, isActive } = req.body;

    // Optional validation
    if (title && title.trim().length < 3) {
      return res
        .status(400)
        .json({ message: "Title must be at least 3 characters long" });
    }

    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, description, isActive },
      { new: true, runValidators: true }
    );

    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.toggleBlogIsActive =  async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    blog.isActive = !blog.isActive;
    await blog.save();

    res.json({ message: 'Blog status updated', blog });
  } catch (error) {
    console.error('Error toggling blog status:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: 'Server error' });
  }
};
