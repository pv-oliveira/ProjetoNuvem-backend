const { Router } = require('express');
const routes = Router();

const UserController = require('./controller/login');
const ClientController = require('./controller/client');
const ProductController = require('./controller/product');
const OrderController = require('./controller/pedido');

//Rotas para criar usuário e fazer login
routes.post("/auth/login", UserController.createSession);
routes.post("/auth/register", UserController.registerUser);
// routes.get("/auth/getUsers", UserController.getUsers);

//Rotas para criar, listar, atualizar e deletar clientes
routes.post("/client/create", UserController.checkToken, ClientController.createClient);
routes.get("/client/getClients", UserController.checkToken, ClientController.getClients);
routes.post("/client/getClientById", UserController.checkToken, ClientController.getClientById);
routes.post("/client/updateClient", UserController.checkToken, ClientController.updateClient);
routes.post("/client/deleteClient", UserController.checkToken, ClientController.deleteClient);

//Rotas para criar, listar, atualizar e deletar produtos
routes.post("/product/create", UserController.checkToken, ProductController.createProduct);
routes.get("/product/getProducts", UserController.checkToken, ProductController.getProducts);
routes.post("/product/getProductById", UserController.checkToken, ProductController.getProductById);
routes.post("/product/updateProduct", UserController.checkToken, ProductController.updateProduct);
routes.post("/product/deleteProduct", UserController.checkToken, ProductController.deleteProduct);

//Rotas para criar, listar, atualizar e deletar pedidos
routes.post("/pedido/create", UserController.checkToken, OrderController.createPedido);
routes.get("/pedido/getPedidos", UserController.checkToken, OrderController.getPedidos);
routes.post("/pedido/getPedidoById", UserController.checkToken, OrderController.getPedidoById);
routes.post("/pedido/updatePedido", UserController.checkToken, OrderController.updatePedido);
routes.post("/pedido/deletePedido", UserController.checkToken, OrderController.deletePedido);

module.exports = routes;