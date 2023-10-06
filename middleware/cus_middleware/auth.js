const jwt = require("jsonwebtoken");
const config = require("config");
const customer = require("../../models/DH_models/customer");

const auth = async (req, res, next) => {
  try {
    // const token = req.header("Authorization");
    const token = req.cookies.computer;
    const decode = jwt.verify(token, "jwtSecret");
    const Cus = await customer.findOne({
      _id: decode._id,
    });
    if (!Cus) {
      throw new Error("Your not authorized to access this resource!");
    }

    if (Cus.role != "Customer") {
      throw new Error("Your not authorized to access this resource!");
    }

    req.token = token;
    req.Cus = Cus;
    next();
  } catch (error) {
    res.status(401).send({ message: error.message });
    console.log("Error in auth.js middleware ", error.message);
  }
};

module.exports = auth;
