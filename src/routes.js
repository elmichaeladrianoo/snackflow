"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var status_1 = require("./controllers/status/status");
var CreateUserController_1 = require("./controllers/user/CreateUserController");
var AuthUserController_1 = require("./controllers/user/AuthUserController");
var DetailUserController_1 = require("./controllers/user/DetailUserController");
var isAuthenticated_1 = require("./middlewares/isAuthenticated");
var router = (0, express_1.Router)();
exports.router = router;
//Rotas Status
router.get('/summary', new status_1.GetStatus().status);
//Rotas USER 
router.post('/session', new AuthUserController_1.AuthUserController().handle);
router.post('/users', new CreateUserController_1.CreateUserController().handle);
router.get('/user', isAuthenticated_1.isAuthenticated, new DetailUserController_1.DetailUserController().handle);
