const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, "Product name is required"],
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required"],
  },

  originalTitle: {
    type: String,
    required: [true, "Original title is required"],
  },

  productPrice: {
    type: Number,
  },

  marketPrice: {
    type: Number,
  },

  brandName: {
    type: String,
    required: [true, "Brand name is required"],
  },

  warrantYear: {
    type: String,
    required: [true, "Warrant year is required"],
  },

  version: {
    type: String,
    required: [true, "Version is required"],
  },

  description: {
    type: String,
  },

  coverImage: {
    type: String,
    required: [true, "Cover image is required"],
  },
  availability: {
    type: String,
    required: [true, "Availability is required"],
  },

  averageRating: {
    type: Number,
  },

  offerPrice: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Products", productSchema);
