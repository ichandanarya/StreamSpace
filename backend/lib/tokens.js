const jwt = require("jsonwebtoken");
const { env } = require("../config/env");

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      userId: user._id,
      email: user.email,
      username: user.username,
    },
    env.JWT_SECRET,
    { expiresIn: "15m" }
  );
};

const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, env.JWT_SECRET);
  } catch (error) {
    throw new Error("Invalid refresh token");
  }
};

module.exports = { generateAccessToken, verifyRefreshToken };
