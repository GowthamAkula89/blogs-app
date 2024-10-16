const jwt = require('jsonwebtoken');
const { User } = require('../models/user.model');
require('dotenv').config()

const authenticateJWT = async(req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(verified.id);
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}

  
  module.exports = { authenticateJWT };