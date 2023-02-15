const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_KEY);
const router = new express.Router();

const products = [
  { id: 1, name: "nisha", price: 20 },
  { id: 2, name: "manish", price: 20 },
];

router.post("/payment", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: req.body.products.map((item) => {
        return {
          price_data: {
            currency: "inr",
            product_data: {
              name: item.title,
            },
            unit_amount: item.price * 100,
          },
          quantity: item.quantity,
        };
      }),
      client_reference_id: req.body.customer._id,
      customer_email: req.body.customer.email,
      mode: "payment",
      success_url: process.env.SUCCESS_PAGE_URL,
      cancel_url: process.env.CANCEL_PAGE_URL,
    });

    res.json({ url: session.url, paymentIntent: session.payment_intent });
  } catch (err) {
    console.log("err 😣", err);
  }
});
module.exports = router;
