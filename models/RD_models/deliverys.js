const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema({
  //foreign key

  /*oderId: {
        type : mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "oders",

    },
    adminId: {
        type : mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "admins",

    },*/
  /*id: {
        type: Number,
        required: true,
    },*/
  orderid: {
    type: String,
    required: true,
  },
  numberofitems: {
    type: Number,
    required: [true, "Number of items is required"],
  },
  deliverdate: {
    type: String,
    required: [true, "Deliver date is required"],
  },

  delivercost: {
    type: Number,
    required: [true, "Deliver cost is required"],
  },
  phonenumber: {
    type: String,
    required: [true, "Phone number is required"],
  },
  useremail: {
    type: String,
    required: [true, "User email is required"],
  },
  courierservice: {
    type: String,
    required: [true, "Courier service is required"],
  },
  receiverdetails: {
    type: String,
    required: [true, "Receiver details is required"],
  },
  destination: {
    type: String,
    required: [true, "Destination is required"],
  },
});
module.exports = mongoose.model("Deliverys", deliverySchema);
