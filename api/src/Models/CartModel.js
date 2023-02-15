const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userCartId: { type: String, required: true, unique: true, trim: true },
    products: { type: Array, default: [] },
    cartQuantity: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;
