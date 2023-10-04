const jwt = require("jsonwebtoken");

const extractToken = (token) => {
  let tokenArray = token.split(" ");
  if (tokenArray.length !== 2) return null;
  return tokenArray[1];
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

const createToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "2d",
    }
  );
};

module.exports = {
  extractToken,
  verifyToken,
  createToken,
};
