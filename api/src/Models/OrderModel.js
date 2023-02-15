const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userOrderId: { type: String, required: true, trim: true },
    products: { type: Array, required: true },
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "Pending" },
    paymentDone: { type: Boolean, default: false },
    paymentIntent: { type: String, required: true },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
