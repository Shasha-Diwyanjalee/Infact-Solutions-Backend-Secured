const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Product ID is required"],
        ref: "products",
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "users",
      },
      userPicture: {
        type: String,
        required: [true, "User picture is required"]
      },
      userName: {
        type: String,
        required: [true, "User name is required"]
      },
      rating: {
        type: Number,
        required: [true, "Rating is required"]
      },
      comment: {
        type: String,
        required: [true, "Comment is required"]
      },
      date: {
          type: String,
          required: [true, "Date is required"]
      }
    });

//module.exports = mongoose.model('Feedbacks', feedbackSchema);

const Feedback = mongoose.model('feedbacks', feedbackSchema);

module.exports = Feedback;