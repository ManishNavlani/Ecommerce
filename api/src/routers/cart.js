const express = require("express");
const { auth } = require("../Auth/auth");
const Cart = require("../Models/CartModel");
const router = new express.Router();

// Create New Cart
router.post("/user/cart", auth, async (req, res) => {
  // const id = req.params.id;
  try {
    const newCart = new Cart({ userCartId: req.user._id });
    const savedCart = await newCart.save();
    res.status(201).json(savedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get User Cart
router.get("/user/cart", auth, async (req, res) => {
  // const id = req.params.id;
  try {
    const cart = await Cart.findOne({ userCartId: req.user._id });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update cart
router.patch("/user/cart", auth, async (req, res) => {
  // const id = req.params.id;

  try {
    const inputFields = Object.keys(req.body);
    const allowedFields = ["products", "cartQuantity", "total"];
    const isValidUpdate = inputFields.every((field) =>
      allowedFields.includes(field)
    );
    if (!isValidUpdate) {
      return res.status(400).json({ error: "Invalid Input fields." });
    }
    const cart = await Cart.findOne({ userCartId: req.user._id });

    inputFields.forEach((field) => (cart[field] = req.body[field]));

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/user/cart", auth, async (req, res) => {
  try {
    const cart = await Cart.findOneAndDelete({ userCartId: req.user._id });
    if (!cart) {
      return res.status(404).json({ err: "Cart not found" });
    }
    res.status(200).json("Cart has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
