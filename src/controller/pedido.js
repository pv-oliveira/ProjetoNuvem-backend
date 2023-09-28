const Pedido = require('../models/Pedido');
const Client = require('../models/Client');
const Product = require('../models/Product');

module.exports = {
// Cria um novo produto
async createPedido(req, res) {
  const newPedido = new Pedido(req.body);
console.log(newPedido)
newPedido.save()
     .then((pedido) => {
       res.json(pedido);
     })
     .catch((err) => {
       res.status(500).send(err);
     });
},

// Carrega todos os produtos
async getPedidos(req, res) {
  Pedido.find()
    .then(async (pedidos) => {
      const pedidosList = []
      const promise = pedidos.map(async pedido => {
        const client = await Client.findById(pedido.client_id).then((client) => { return client })
        const product = await Product.findById(pedido.product_id).then((product) => { return product })

        const updatedPedido = {
          ...pedido.toObject(), // Convert Mongoose document to plain JavaScript object
          cliente: client.name,
          produto: product.name,
          // valor: `R$ ${pedido.price - (pedido.price * pedido.discount / 100)}`,
          // price: `R$ ${pedido.price}`,
          // desconto: `${parseFloat(pedido.discount)}%`,
        };
        
        pedidosList.push(updatedPedido)
      });

      await Promise.all(promise)

      res.json(pedidosList);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
},

// Carrega usuario unico por id
async getPedidoById(req, res) {
  Pedido.findById(req.params.id)
    .then((pedido) => {
      if (!pedido) {
        return res.status(404).send({ message: 'Pedido not found' });
      }
      res.json(pedido);
    })
    .catch((err) => {
    //   if (err.kind === 'ObjectId') {
    //     return res.status(404).send({ message: 'Pedido not found' });
    //   }
      return res.status(500).send({ message: 'Error retrieving pedido' });
    });
},

// Atualiza usuario
async updatePedido(req, res) {
  Pedido.findByIdAndUpdate(req.body._id, req.body, { new: true })
    .then((pedido) => {
      if (!pedido) {
        return res.status(404).send({ message: 'Pedido not found' });
      }
      res.json(pedido);
    })
    .catch((err) => {
    //   if (err.kind === 'ObjectId') {
    //     return res.status(404).send({ message: 'Pedido not found' });
    //   }
      return res.status(500).send({ message: 'Error updating pedido' });
    });
},

// Apagar usuario
async deletePedido(req, res) {
  Pedido.findByIdAndRemove(req.body.id)
    .then((pedido) => {
      if (!pedido) {
        return res.status(404).send({ message: 'Pedido not found' });
      }
      res.json({ message: 'Pedido deleted successfully!' });
    })
    .catch((err) => {
        // if (err.kind === 'ObjectId') {
        //   return res.status(404).send({ message: 'Pedido not found' });
        // }
        return res.status(500).send({ message: 'Error updating pedido' });
      });
  }
};