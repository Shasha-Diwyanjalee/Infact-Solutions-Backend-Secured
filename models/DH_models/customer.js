const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const customerSchema = new mongoose.Schema({
  googleId: {
    type: String,
  },
  facebookId: {
    type: String,
  },
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  add1: {
    type: String,
    trim: true,
  },
  add2: {
    type: String,
    trim: true,
  },
  city: {
    type: String,
    trim: true,
  },
  area: {
    type: String,
    trim: true,
  },
  pscode: {
    type: String,
    trim: true,
  },
  country: {
    type: String,
    trim: true,
  },
  phone: {
    type: String,
    maxlength: 13,
    trim: true,
    validate(value) {
      if (!validator.isMobilePhone(value)) {
        throw new Error("Please enter valid mobile number");
      }
    },
  },
  DOB: {
    type: String,
  },

  email: {
    type: String,
    lowercase: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Please enter valid email address");
      }
    },
  },
  pwd: {
    type: String,
    trim: true,
  },
  tryCount: {
    type: Number,
    default: 0,
  },
  imageUrl: {
    type: String,
  },
  role: {
    type: String,
    default: "Customer",
  },

  wishList: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "products",
      },
      productName: {
        type: String,
        require: [true, "Product name is required"],
      },
      productPrice: {
        type: String,
        required: [true, "Product price is required"],
      },
      coverImage: {
        type: String,
        required: [true, "Cover image is required"],
      },
    },
  ],

  cart: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "products",
      },
      productname: {
        type: String,
        required: [true, "Product name is required"],
      },
      productPrice: {
        type: Number,
        required: [true, "Product price is required"],
      },
      quantity: {
        type: Number,
        required: [true, "Quantity is required"],
      },
      productImage: {
        type: String,
        required: [true, "Product image is required"],
      },
      totalPrice: {
        type: Number,
        required: [true, "Total price is required"],
      },
    },
  ],

  // tokens: [
  //   {
  //     token: {
  //       type: String,
  //       required: true,
  //     },
  //   },
  // ],
});

const customer = mongoose.model("customers", customerSchema);

module.exports = customer;
