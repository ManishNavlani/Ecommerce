const express = require("express");
const User = require("../Models/UserModel");
const { auth } = require("../Auth/auth");
const router = new express.Router();

//user sign up
router.post("/users/register", async (req, res) => {
  try {
    const user = await new User(req.body);
    const token = await user.genAuthToken();
    await user.save();
    return res.status(201).json({ user, token });
  } catch (err) {
    res.status(400).json(err);
  }
});

// user login
router.post("/users/login", async (req, res) => {
  try {
    const enteredEmail = req.body.email;
    const enteredPassword = req.body.password;
    const user = await User.findByCredentials(enteredEmail, enteredPassword);

    const token = await user.genAuthToken();
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(400).json(err.message);
  }
});

// viewing/reading own profile
router.get("/users/me", auth, async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

// updating a particular user (own)
router.patch("/users/me", auth, async (req, res) => {
  try {
    const inputFields = Object.keys(req.body);
    const allowedFields = ["username", "email", "password", "address"];
    const isValidUpdate = inputFields.every((field) =>
      allowedFields.includes(field)
    );
    if (!isValidUpdate) {
      return res.status(400).json({ error: "Invalid Input fields." });
    }
    const user = await User.findById(req.user._id);

    inputFields.forEach((field) => (user[field] = req.body[field]));

    await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
});

// to logout (own)
router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((tokenObj) => {
      return tokenObj.token !== req.token;
    });
    const user = await req.user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: "please try again later" });
  }
});

module.exports = router;
