const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const { JWT_TIMEOUT } = require("../utils/constants");

const TokenSchema = new Schema({
  _userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  token: { type: String, required: true },
  expireAt: {
    type: Date,
    required: true,
    default: new Date(Date.now() + JWT_TIMEOUT * 1000 ),
    expires: 60,
  },
});

const Token = mongoose.model("Token", TokenSchema);
module.exports = Token;
