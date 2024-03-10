"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const status_1 = require("./controllers/status/status");
const CreateUserController_1 = require("./controllers/user/CreateUserController");
const AuthUserController_1 = require("./controllers/user/AuthUserController");
const DetailUserController_1 = require("./controllers/user/DetailUserController");
const ListUsersController_1 = require("./controllers/user/ListUsersController");
const isAuthenticated_1 = require("./middlewares/isAuthenticated");
const validateSession_1 = require("./middlewares/validateSession");
const DeleteUserController_1 = require("./controllers/user/DeleteUserController");
const UpdateUserConttroller_1 = require("./controllers/user/UpdateUserConttroller");
const router = (0, express_1.Router)();
exports.router = router;
//Rotas Status
router.get('/summary', new status_1.GetStatus().status);
//Rotas USER 
router.post('/user.auth.login', new AuthUserController_1.AuthUserController().handle);
router.post('/user.userCreate', new CreateUserController_1.CreateUserController().handle);
router.get('/user.auth.userSession', isAuthenticated_1.isAuthenticated, new DetailUserController_1.DetailUserController().handle);
router.get('/user.users', validateSession_1.validateSession, new ListUsersController_1.ListUsersController().getUser);
router.delete('/user.userRemove', validateSession_1.validateSession, new DeleteUserController_1.DeleteUserController().deleteUserById);
router.put('/user.UpdateUser', validateSession_1.validateSession, new UpdateUserConttroller_1.UpdateUserController().UpdateUser);
