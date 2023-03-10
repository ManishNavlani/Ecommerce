const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const salt = 10;
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (value === "password") {
          throw new Error("Password should not contain password word");
        }
        if (value.length < 6) {
          throw new Error("Password must contain at least 6 characters");
        }
      },
      trim: true,
    },
    isAdmin: { type: Boolean, default: false },
    address: { type: Object, trim: true, default: {} },
    image: {
      type: String,
      required: true,
      default:
        "https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236_960_720.png",
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

// creating static(only model can use this method) Method for finding user with email and password while signing in or signing up
UserSchema.statics.findByCredentials = async function (email, password) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Email is not register.");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return user;
};

// hiding password and tokens array being visible to user while logging in
UserSchema.methods.toJSON = function () {
  const user = this;
  const userObj = user.toObject();
  delete userObj.password;
  delete userObj.tokens;
  delete userObj.isAdmin;
  return userObj;
};

// creating method to generate jwt token for specific user who is signing in or signing up

UserSchema.methods.genAuthToken = async function () {
  const user = this;

  const token = jwt.sign(
    { _id: user._id.toString(), isAdmin: user.isAdmin },
    process.env.JWT_SECRET
  );
  user.tokens.push({ token });
  await user.save();
  return token;
};

// hashing password before saving.

UserSchema.pre("save", async function (next) {
  const user = this;
  // "this" comes from when user is saved (it give that save object)

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, salt);
  }

  next();
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
