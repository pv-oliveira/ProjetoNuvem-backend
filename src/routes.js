const { Router } = require('express');
const routes = Router();

const UserController = require('./controller/login');
const ClientController = require('./controller/client');

//Rotas para criar usuário e fazer login
routes.post("/auth/login", UserController.createSession);
routes.post("/auth/register", UserController.registerUser);
// routes.get("/auth/getUsers", UserController.getUsers);

//Rotas para criar, listar, atualizar e deletar clientes
routes.post("/client/create", UserController.checkToken, ClientController.createClient);
routes.get("/client/getClients", UserController.checkToken, ClientController.getClients);
routes.post("/client/getClientById", UserController.checkToken, ClientController.getClientById);
routes.put("/client/updateClient", UserController.checkToken, ClientController.updateClient);
routes.post("/client/deleteClient", UserController.checkToken, ClientController.deleteClient);

module.exports = routes;