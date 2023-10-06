const mongoose = require("mongoose");
const validator = require("validator");

const orderSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "customer",
  },
  items: [{
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products"
    },
    itemName: {
      type: String,
      required: [true, "Item name is required"]
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"]
    }
  }],
  customerName: {
    type: String,
    required: [true, "Customer name is required"]
  },
  customerEmail: {
    type: String,
    required: [true, "Customer email is required"],
  },
  cutomerAddress: {
    type: String,
    required: [true, "Customer address is required"],
  },
  totalPrice: {
    type: Number,
    required: [true, "Total price is required"],
  },
  description: {
    type: String,
  },
  deliveryDate: {
    type: Date,
  },
  handOverDate: {
    type: Date,
  },
  deliverMethod: {
    type: String,
  }
});

const order = mongoose.model("orders", orderSchema);

module.exports = order;