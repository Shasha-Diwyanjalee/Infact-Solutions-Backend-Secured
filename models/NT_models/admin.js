const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const adminSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: [true, "First name is required"],
  },

  lname: {
    type: String,
    required: [true, "Last name is required"],
  },

  email: {
    type: String,
    require: [true, "Email is required"],
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Please enter valid email address");
      }
    },
  },

  username: {
    type: String,
    required: [true, "User name is required"],
  },

  password: {
    type: String,
    required: [true, "Password is required"],
  },

  nic: {
    type: String,
    required: [true, "NIC is required"],
  },

  description: {
    type: String,
  },

  profileImage: {
    type: String,
  },

  role: {
    type: String,
    default: "Admin",
  },

  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

//password encryption
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(8);
  this.password = await bcrypt.hash(this.password, salt);
});

adminSchema.methods.generateAuthToken = async function () {
  const admin = this;
  const token = jwt.sign({ _id: admin._id }, "jwtSecret");
  admin.tokens = admin.tokens.concat({ token });
  await admin.save();
  return token;
};

adminSchema.statics.findByCredentials = async (username, password) => {
  const admin1 = await admin.findOne({ username });
  if (!admin1) {
    throw new Error("Please enter acorrect user name");
  }
  const isMatch = await bcrypt.compare(password, admin1.password);
  if (!isMatch) {
    throw new Error("Password is not matched");
  }
  return admin1;
};

const admin = mongoose.model("admin", adminSchema);
module.exports = admin;
