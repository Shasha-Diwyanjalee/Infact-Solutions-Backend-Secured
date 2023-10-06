const jwt = require("jsonwebtoken");
const config = require("config");
const admin = require("../../models/NT_models/admin");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    const decode = jwt.verify(token, "jwtSecret");
    const admin1 = await admin.findOne({
      _id: decode._id,
      "tokens.token": token,
    });
    if (!admin1) {
      throw new Error("Your not authorized to access this resource!");
    }

    if (admin1.role != "Admin") {
      throw new Error("Your not authorized to access this resource!");
    }
    req.token = token;
    req.admin1 = admin1;
    next();
  } catch (error) {
    res.status(401).send({ message: error.message });
    console.log("Error in auth.js middleware ", error.message);
  }
};

module.exports = auth;
