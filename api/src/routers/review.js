const express = require("express");
const { auth } = require("../Auth/auth");
const Review = require("../Models/ProductReviewModel");
const Product = require("../Models/ProductModel");

const router = new express.Router();

// post new review
router.post("/product/new-review", auth, async (req, res) => {
  try {
    const existReview = await Review.findOne({
      userReviewId: req.body.userReviewId,
      productId: req.body.productId,
    });
    if (existReview) {
      throw new Error("Review already given.");
    }
    const review = await new Review(req.body);
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

// get  all reviews of product  by product's id
router.get("/product/reviews/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const reviews = await Review.find({ productId: id }).sort({ _id: -1 });
    let productRatings = 0;
    // calculating product's ratings
    if (reviews.length > 0) {
      const averageRatings =
        reviews
          ?.map((curr) => curr.ratings)
          .reduce((acc, rating) => (acc += rating), 0) / reviews.length;
      productRatings = averageRatings.toFixed(1);
    }

    const product = await Product.findById(id);
    product.ratings = productRatings;
    await product.save();

    res.status(200).json(reviews);
  } catch (error) {
    res.status(400).json(error);
  }
});

// get user's review by product's id
router.get("/product/user/review/:id", auth, async (req, res) => {
  const id = req.params.id;
  try {
    const review = await Review.findOne({
      userReviewId: req.user._id,
      productId: id,
    });
    res.status(200).json(review);
  } catch (error) {
    res.status(400).json(error);
  }
});

// update user's review  by product's id
router.patch("/product/user/review/:id", auth, async (req, res) => {
  const id = req.params.id;
  try {
    const inputFields = Object.keys(req.body);
    const allowedFields = ["ratings", "review"];
    const isValidUpdate = inputFields.every((field) =>
      allowedFields.includes(field)
    );
    if (!isValidUpdate) {
      return res.status(400).json({ error: "Invalid Input fields." });
    }
    const review = await Review.findOne({
      userReviewId: req.user._id,
      productId: id,
    });

    inputFields.forEach((field) => (review[field] = req.body[field]));

    await review.save();
    res.status(200).json(review);
  } catch (error) {
    res.status(400).json(error);
  }
});

// calculate ratings by users' ratings
router.get("/product/ratings/:id");

module.exports = router;
