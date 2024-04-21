const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const { isEmail } = require("validator");

const SALT_ROUNDS = 10;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Must provide an email"],
      lowercase: true,
      validate: [isEmail, "Email must be valid"],
      index: { unique: true, dropDups: true },
    },
    name: {
      type: String,
      required: [true, "Must provide a name"],
    },
    password: {
      type: String,
      minLength: 6,
      required: [true, "Must provide a password"],
    },
    roles: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    plushes: [{ type: Schema.Types.ObjectId, ref: "Plush" }],
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  const hashedPassword = await bcrypt.hash(user.password, SALT_ROUNDS);

  user.password = hashedPassword;
  next();
});

UserSchema.methods.comparePassword = async function (textPassword) {
  const user = this;

  try {
    return await bcrypt.compare(textPassword, user.password);
  } catch (error) {
    throw error;
  }
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
