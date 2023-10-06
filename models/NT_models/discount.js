const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const discountSchema = new Schema(
  {
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "products",
    },

    productName: {
      type: String,
      required: [true, "Product name is required"],
    },

    marketPrice: {
      type: Number,
      required: [true, "Market price is required"],
    },

    percentage: {
      type: String,
      required: [true, "Percentage is required"],
    },

    ammount: {
      type: Number,
      required: [true, "Amount is required"],
    },

    startingdate: {
      type: Date,
      required: [true, "Starting date is required"],
    },
    endingdate: {
      type: Date,
      required: [true, "Ending date is required"],
    },
  },
  {
    collection: "discounts",
  }
);

module.exports = mongoose.model("Discount", discountSchema);
