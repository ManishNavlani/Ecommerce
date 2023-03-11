const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true, trim: true },
    ratings: { type: Number, default: 1, min: 1, max: 5 },
    review: { type: String, trim: true },
    userReviewId: {
      type: String,
      required: true,
      trim: true,
    },
    userName: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", ReviewSchema);
module.exports = Review;
