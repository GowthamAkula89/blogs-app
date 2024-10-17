const express = require('express');
const blogRoute = require("./blog.routes")
const authRoute = require("./auth.route")
const router = express.Router();

router.use("/auth", authRoute);
router.use("/blogs", blogRoute);
module.exports = router;