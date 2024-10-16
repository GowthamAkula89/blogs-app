const blogService = require('../services/blog.service');

const createBlog = async (req, res) => {
  try {
    const { title, content, region } = req.body;
    const author = req.user._id;
    const authorName = req.user.name;

    const newBlog = await blogService.createBlog({
      title,
      content,
      region,
      author,
      authorName,
    });

    res.status(201).json({ message: "Blog created successfully!", blog: newBlog });
  } catch (error) {
    console.error("Blog creation error:", error.message);
    res.status(400).json({ error: error.message });
  }
};

const updateBlog = async (req, res) => {
  const { title, content, region, coverImage } = req.body;
  try {
    const blog = await blogService.updateBlog(req.params.id, {
      title,
      content,
      region,
      coverImage,
      authorName: req.user.fullName,
    });

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.status(200).json(blog);
  } catch (error) {
    console.error("Blog update error:", error.message);
    res.status(500).json({ error: "Blog update failed" });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const blog = await blogService.deleteBlog(req.params.id);

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.status(204).send(); // Successfully deleted, no content to return
  } catch (error) {
    console.error("Blog deletion error:", error.message);
    res.status(500).json({ error: "Blog deletion failed" });
  }
};

const getBlogsByRegion = async (req, res) => {
  try {
    const blogs = await blogService.getBlogsByRegion(req.params.region);
    res.status(200).json(blogs);
  } catch (error) {
    console.error("Error retrieving blogs by region:", error.message);
    res.status(500).json({ error: "Failed to retrieve blogs" });
  }
};

const getBlogsByUser = async (req, res) => {
  try {
    const blogs = await blogService.getBlogsByUser(req.user.id);
    res.status(200).json(blogs);
  } catch (error) {
    console.error("Error retrieving user's blogs:", error.message);
    res.status(500).json({ error: "Failed to retrieve blogs" });
  }
};

module.exports = {
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogsByRegion,
  getBlogsByUser
}