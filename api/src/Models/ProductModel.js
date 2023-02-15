const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true, trim: true },
    price: { type: Number, required: true, trim: true },
    stoke: { type: Number, required: true, trim: true },
    discount: { type: Number, required: true, default: 0 },
    ratings: { type: Number, trim: true, default: 0 },
    productImage: {
      type: String,
    },
    size: { type: Array || String, required: true, trim: true },
    description: {
      type: Object,
      required: true,
      trim: true,
    },
    cost: { type: Number, required: true },
    categories: { type: Array || String },
    inStock: { type: Boolean || String, default: true },
    active: { type: Boolean || String, default: true, required: true },
    search: { type: String, default: "" },
  },
  { timestamps: true }
);
ProductSchema.index({
  title: "text",
  search: "text",
  categories: "text",
  description: "text",
});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
