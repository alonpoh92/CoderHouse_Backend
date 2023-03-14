const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  thumbnail: { type: String, required: true }
});
ProductSchema.index({ tittle: 1 });
module.exports = ProductSchema;