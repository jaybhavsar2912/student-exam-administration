const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: {
    type: String,
    required: [true, "please enter a email"],
    unique: [true, "email already exist"],
  },
  password: { type: String, required: true },
  role: { type: String, enum: ["student", "admin"], default: "student" },
});

module.exports = mongoose.model("User", userSchema);
