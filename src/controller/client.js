const Client = require('./../models/Client');

module.exports = {
// Cria novo usuario
async createClient(req, res) {
  const newUser = new Client(req.body);

  newUser.save()
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
},

// Carrega todos os usuarios
async getClients(req, res) {
  Client.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
},

// Carrega usuario unico por id
async getClientById(req, res) {
  Client.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }
      res.json(user);
    })
    .catch((err) => {
    //   if (err.kind === 'ObjectId') {
    //     return res.status(404).send({ message: 'User not found' });
    //   }
      return res.status(500).send({ message: 'Error retrieving user' });
    });
},

// Atualiza usuario
async updateClient(req, res) {
  Client.findByIdAndUpdate(req.body._id, req.body, { new: true })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }
      res.json(user);
    })
    .catch((err) => {
    //   if (err.kind === 'ObjectId') {
    //     return res.status(404).send({ message: 'User not found' });
    //   }
      return res.status(500).send({ message: 'Error updating user' });
    });
},

// Apagar usuario
async deleteClient(req, res) {
  Client.findByIdAndRemove(req.body.id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }
      res.json({ message: 'User deleted successfully!' });
    })
    .catch((err) => {
        // if (err.kind === 'ObjectId') {
        //   return res.status(404).send({ message: 'User not found' });
        // }
        return res.status(500).send({ message: 'Error updating user' });
      });
  }
};