const mongoose = require("mongoose");

const adSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter a title"],
  },

  publishdate: {
    type: String,
    required: [true, "Please enter a publish date"],
  },

  description: {
    type: String,
    required: [true, "Please enter a description"],
  },

  image: {
    type: String,
    required: [true, "Please enter a image"],
  },
});

module.exports = mongoose.model("Ads", adSchema);
