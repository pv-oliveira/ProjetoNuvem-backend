const mongoose = require('mongoose')

const Pedido = mongoose.model('Pedido', {
  description: { type: String, required: true },
  product_id: { type: String, required: true },
  client_id: { type: String, required: true },
  address: { type: String, required: true },
});

module.exports = Pedido