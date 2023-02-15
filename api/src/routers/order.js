const express = require("express");
const Order = require("../Models/OrderModel");
const router = new express.Router();
const { auth, adminAuth } = require("../Auth/auth");

// create new order
router.post("/orders/new-order", auth, async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const saveOrder = await newOrder.save();
    res.status(200).json(saveOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//user can access his orders

router.get("/orders/order", auth, async (req, res) => {
  try {
    const order = await Order.find({ userOrderId: req.user._id }).sort({
      _id: -1,
    });
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
