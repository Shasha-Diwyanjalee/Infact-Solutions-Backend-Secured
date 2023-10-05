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
    required: true,
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

  wishList: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "products",
      },
      productName: {
        type: String,
        require: true,
      },
      productPrice: {
        type: String,
        required: true,
      },
      coverImage: {
        type: String,
        required: false,
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
        require: true,
      },
      productPrice: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      productImage: {
        type: String,
        required: false,
      },
      totalPrice: {
        type: Number,
        required: true,
      },
    },
  ],

  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// @Action - encrypt the password
customerSchema.pre("save", async function (next) {
  if (!this.isModified("pwd")) {
    next();
  }
  const salt = await bcrypt.genSalt(8);
  this.pwd = await bcrypt.hash(this.pwd, salt);
});

// @Action - Get auth token
customerSchema.methods.generateAuthToken = async function () {
  const customer = this;
  const token = jwt.sign({ _id: customer._id }, process.env.JWT_SECRET, {
    expiresIn: "2d",
  });
  customer.tokens = customer.tokens.concat({ token });
  await customer.save();
  return token;
};

// @Action - Find customer by credentials
customerSchema.statics.findByCredentials = async (res, email, pwd) => {
  const customer1 = await customer.findOne({ email });
  // if (!customer1) {
  //   return res.status(400).send({ error: "Invalid login credentials" });
  // }

  if (customer1.tryCount >= 3) {
    // return res
    //   .status(400)
    //   .send({ error: "Account is locked..! Please contact Admin" });
  }

  const isMatch = await bcrypt.compare(pwd, customer1.pwd);
  if (!isMatch) {
    customer1.tryCount = customer1.tryCount + 1;
    // await customer1.save();
    // return res.status(400).send({ error: "Invalid login credentials" });
  } else {
    customer1.tryCount = 0;
    await customer1.save();
  }
  return customer1;
};

const customer = mongoose.model("customers", customerSchema);

module.exports = customer;
