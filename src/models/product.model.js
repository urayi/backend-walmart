const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Product = new Schema(
  {
    id: { type: Number, required: true },
    brand: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true }
  }
)

module.exports = mongoose.model('products', Product)