const express = require("express");
const {
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogsByRegion,
  getBlogsByUser,
} = require("../controllers/blog.controller");
const { authenticateJWT } = require("../middlewares/auth");
const router = express.Router();

router.post("/", authenticateJWT, createBlog);
router.get("/user", authenticateJWT, getBlogsByUser);
router.get("/:region", getBlogsByRegion);
router.put("/:id", authenticateJWT, updateBlog);
router.delete("/:id", authenticateJWT, deleteBlog);

module.exports = router;
