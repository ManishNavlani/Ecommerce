const express = require("express");
const Cart = require("../Models/CartModel");
const Product = require("../Models/ProductModel");
const User = require("../Models/UserModel");
const Order = require("../Models/OrderModel");
const { adminAuth } = require("../Auth/auth");

const router = new express.Router();

// setting multer for configuration

// admin login

router.post("/admin/login", async (req, res) => {
  try {
    const enteredEmail = req.body.email;
    const enteredPassword = req.body.password;
    const user = await User.findByCredentials(enteredEmail, enteredPassword);
    const token = await user.genAuthToken();
    if (!user.isAdmin) {
      return res
        .status(401)
        .json({ error: "Only Admin Can Access Admin Dashboard." });
    }
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

//////(Users)///////

// see all users (GET)
router.get("/admin/users", adminAuth, async (req, res) => {
  try {
    const query = req.query.new;
    const users = query
      ? await User.find({}).sort({ _id: -1 }).limit(query)
      : await User.find({});

    // if (!users) {
    //   return res.status(404).json({ error: "Not Found Products" });
    // }
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// get a particular user
router.get("/admin/users/:id", adminAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {}
});

//deleting a particular user
router.delete("/admin/users/:id", adminAuth, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json("No User Found");
    }
    res.status(200).json();
  } catch (err) {
    res.status(500).json(err);
  }
});

// get data about user signup
router.get("/admin/users/stats", adminAuth, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

///////(Product)/////////

// see all products (GET)
router.get("/admin/products", adminAuth, async (req, res) => {
  try {
    const query = req.query.new;
    const products = query
      ? await Product.find({}).sort({ _id: -1 }).limit(query)
      : await Product.find({}).sort({ _id: -1 });

    // if (!users) {
    //   return res.status(404).json({ error: "Not Found Products" });
    // }
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create New Product
router.post("/admin/products/new-product", adminAuth, async (req, res) => {
  try {
    const newProduct = await new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update product
router.patch("/admin/products/:id", adminAuth, async (req, res) => {
  try {
    const inputFields = Object.keys(req.body);
    const allowedFields = [
      "active",
      "cost",
      "categories",
      "title",
      "description",
      "discount",
      "ratings",
      "productImage",
      "size",
      "price",
      "inStock",
      "stoke",
      "search",
      "createdAt",
      "updatedAt",
      "__v",
      "_id",
    ];
    const isValidUpdate = inputFields.every((field) =>
      allowedFields.includes(field)
    );
    if (!isValidUpdate) {
      return res.status(400).json({ error: "Invalid Input fields." });
    }
    const UpdatedProduct = await Product.findById(req.params.id);

    inputFields.forEach((field) => (UpdatedProduct[field] = req.body[field]));

    await UpdatedProduct.save();
    res.status(200).json(UpdatedProduct);
  } catch (err) {
    res.status(400).json(err);
  }
});

//deleting a particular product
router.delete("/admin/products/:id", adminAuth, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json("Product Not Found");
    }
    res.status(200).json();
  } catch (err) {
    res.status(500).json(err);
  }
});

/////(Cart)/////

// get all carts
router.get("/admin/carts", adminAuth, async (req, res) => {
  try {
    const carts = await Cart.find({});
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
});

/////(Order)//////

// get all orders
router.get("/admin/orders", adminAuth, async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ _id: -1 });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get user's order details
router.get("/admin/orders/:id", adminAuth, async (req, res) => {
  try {
    const orderDetails = await Order.findById(req.params.id);
    // if()
    res.status(200).json(orderDetails);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Update Particular Order
router.patch("/admin/orders/:id", adminAuth, async (req, res) => {
  try {
    const inputFields = Object.keys(req.body);
    const allowedFields = ["userId", "products", "amount", "address", "status"];
    const isValidUpdate = inputFields.every((field) =>
      allowedFields.includes(field)
    );
    if (!isValidUpdate) {
      return res.status(400).json({ error: "Invalid Input fields." });
    }
    const UpdatedOrder = await Order.findById(req.params.id);

    inputFields.forEach((field) => (UpdatedOrder[field] = req.body[field]));

    await UpdatedOrder.save();
    res.status(200).json(UpdatedOrder);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete particular order
router.delete("/admin/orders/:id", adminAuth, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("order has been deleted");
  } catch (err) {}
});

// get data about income(monthly income)
router.get("/admin/income", adminAuth, async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(date.setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
          ...(productId && {
            products: { $elemMatch: { productId } },
          }),
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get the user avatar
router.get("/product/image/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product || !product.productImage) {
      throw new Error();
    }
    res.set("Content-Type", "image/png");
    res.send(product.productImage);
  } catch (err) {
    res.status(404).send();
  }
});

module.exports = router;
