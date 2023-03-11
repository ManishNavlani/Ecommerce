const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const adminRouter = require("./src/routers/admin");
const userRouter = require("./src/routers/users");
const productRouter = require("./src/routers/product");
const orderRouter = require("./src/routers/order");
const cartRouter = require("./src/routers/cart");
const stripeRouter = require("./src/routers/stripe");
const reviewRouter = require("./src/routers/review");
dotenv.config();

require("./src/db/mongoose");

const express = require("express");
const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/v4", productRouter);
app.use("/api/v4", userRouter);
app.use("/api/v4", orderRouter);
app.use("/api/v4", cartRouter);
app.use("/api/v4", stripeRouter);
app.use("/api/v4", reviewRouter);
app.use("/api/v4", adminRouter);

app.use(express.static(path.join(__dirname, "./client/dist")));

app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./client/dist/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});

const port = process.env.PORT;

app.listen(port || 3000, console.log("listening on port " + port || 3000));
