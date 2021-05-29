const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    index: {
      unique: true,
    },
  },
  password: {
    type: String,
    required: true,
  },
  // characters owned by this user
  characters: [
    {
      type: Schema.Types.ObjectId,
      ref: "Character",
    },
  ],
  // bazaars owned by this user
  bazaars: [
    {
      type: Schema.Types.ObjectId,
      ref: "Bazaar",
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

userSchema.methods.comparePassword = function findSimilarType(passwordAttempt) {
  bcrypt.compare(passwordAttempt, this.password, function (err, res) {
    if (err) return err;
    return res;
  });
};

userSchema.pre("save", function (next) {
  var user = this;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();
  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);
    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

const User = mongoose.model("User", userSchema);

module.exports = User;
