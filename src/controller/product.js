const Product = require('../models/Product');

module.exports = {
// Cria um novo produto
async createProduct(req, res) {
  const newProduct = new Product(req.body);
console.log(newProduct)
newProduct.save()
     .then((product) => {
       res.json(product);
     })
     .catch((err) => {
       res.status(500).send(err);
     });
},

// Carrega todos os produtos
async getProducts(req, res) {
  Product.find()
    .then((products) => {
      const productsList = []
      products.forEach(product => {
        const updatedProduct = {
          ...product.toObject(), // Convert Mongoose document to plain JavaScript object
          promocao: product.promotion ? 'Sim' : 'Não',
          valor: `R$ ${product.price - (product.price * product.discount / 100)}`,
          price: `R$ ${product.price}`,
          desconto: `${parseFloat(product.discount)}%`,
        };
        productsList.push(updatedProduct)
      });

      res.json(productsList);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
},

// Carrega usuario unico por id
async getProductById(req, res) {
  Product.findById(req.params.id)
    .then((product) => {
      if (!product) {
        return res.status(404).send({ message: 'Product not found' });
      }
      res.json(product);
    })
    .catch((err) => {
    //   if (err.kind === 'ObjectId') {
    //     return res.status(404).send({ message: 'Product not found' });
    //   }
      return res.status(500).send({ message: 'Error retrieving product' });
    });
},

// Atualiza usuario
async updateProduct(req, res) {
  Product.findByIdAndUpdate(req.body._id, req.body, { new: true })
    .then((product) => {
      if (!product) {
        return res.status(404).send({ message: 'Product not found' });
      }
      res.json(product);
    })
    .catch((err) => {
    //   if (err.kind === 'ObjectId') {
    //     return res.status(404).send({ message: 'Product not found' });
    //   }
      return res.status(500).send({ message: 'Error updating product' });
    });
},

// Apagar usuario
async deleteProduct(req, res) {
  Product.findByIdAndRemove(req.body.id)
    .then((product) => {
      if (!product) {
        return res.status(404).send({ message: 'Product not found' });
      }
      res.json({ message: 'Product deleted successfully!' });
    })
    .catch((err) => {
        // if (err.kind === 'ObjectId') {
        //   return res.status(404).send({ message: 'Product not found' });
        // }
        return res.status(500).send({ message: 'Error updating product' });
      });
  }
};