const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlushieSchema = new Schema(
  {
    _creator: { type: Schema.Types.ObjectId, ref: "User", required: true },
    type: {
      type: String,
      enum: ["perro", "conejo", "oso", "mapache", "gato"],
    },
    color: {
      type: String,
      enum: ["rosa", "amarillo", "verde"],
    },
    props: {
      type: String,
      enum: ["camiseta y pelota de futbol", "guitarra electrica", "notebook"],
    },
  },
  {
    timestamps: true,
  }
);

const Plushie = mongoose.model("Plushie", PlushieSchema);

module.exports = Plushie;
