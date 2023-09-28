const mongoose = require('mongoose')

const Product = mongoose.model('Product', {
  name: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  promotion: { type: Boolean, required: true },
  discount: { type: Number, required: true },
});

module.exports = Product