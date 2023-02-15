const express = require("express");
const Product = require("../Models/ProductModel");

const router = new express.Router();

// get product
router.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json("Product Not Found");
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all products
// GET http:3000/products?skip=3
router.get("/products", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;
    let numOfProducts;
    const page = +req.query.page || 1;
    const itemsPerPage = +req.query.limit || 8;
    const options = {
      skip: (page - 1) * itemsPerPage,
      limit: itemsPerPage,
    };

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      numOfProducts = await Product.countDocuments({
        categories: {
          $in: [qCategory],
        },
      });

      products = await Product.find(
        {
          categories: {
            $in: [qCategory],
          },
        },
        null,
        options
      );
    } else {
      numOfProducts = await Product.countDocuments();
      products = await Product.find({}, null, options);
    }
    res.status(200).json({ products, numOfProducts });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET /products/search?search=""&skip=1

router.get("/product/search", async (req, res) => {
  try {
    let numOfProducts;
    let products;

    const itemsPerPage = 8;
    const page = +req.query.page || 1;
    const options = {
      skip: (page - 1) * itemsPerPage,
      limit: itemsPerPage,
    };
    //products
    products = await Product.find(
      { $text: { $search: req.query.search } },
      null,
      options
    );

    //products length
    numOfProducts = await Product.countDocuments({
      $text: { $search: req.query.search },
    });
    res.status(200).send({ products, numOfProducts });

    // if (products.length === 0) {
    //   //products
    //   products = await Product.find({}, null, options);

    //   //products length
    //   numOfProducts = await Product.countDocuments();

    //   return res.status(200).send({ products, numOfProducts });
    // }
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
