const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const { isEmail } = require("validator");

const { SALT_ROUNDS } = require("../utils/constants");

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
    isValidated: {
      type: Boolean,
      default: false,
    },
    token: {
      type: String,
      default: null,
    },
    plushies: [{ type: Schema.Types.ObjectId, ref: "Plushie" }],
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

UserSchema.statics.login = async function (email, textPassword) {
  const user = await this.findOne({ email });

  if (user) {
    const isMatch = await bcrypt.compare(textPassword, user.password);

    if (isMatch) {
      return user;
    }

    throw Error("Incorrect password");
  }

  throw Error("Incorrect email");
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
