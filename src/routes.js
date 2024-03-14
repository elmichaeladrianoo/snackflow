"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const status_1 = require("./controllers/status/status");
const CreateUserController_1 = require("./controllers/user/CreateUserController");
const AuthUserController_1 = require("./controllers/user/AuthUserController");
const DetailUserController_1 = require("./controllers/user/DetailUserController");
const ListUsersController_1 = require("./controllers/user/ListUsersController");
const isAuthenticated_1 = require("./middlewares/isAuthenticated");
const validateSession_1 = require("./middlewares/validateSession");
const DeleteUserController_1 = require("./controllers/user/DeleteUserController");
const UpdateUserConttroller_1 = require("./controllers/user/UpdateUserConttroller");
const CreateCetegoryController_1 = require("./controllers/category/CreateCetegoryController");
const ListCategoryController_1 = require("./controllers/category/ListCategoryController");
const DetailCategoryController_1 = require("./controllers/category/DetailCategoryController");
const CreateProductController_1 = require("./controllers/product/CreateProductController");
const ListProductByCategoryController_1 = require("./controllers/product/ListProductByCategoryController");
const multer_2 = __importDefault(require("./config/multer"));
const DeleteProductController_1 = require("./controllers/product/DeleteProductController");
const UpdateProducrController_1 = require("./controllers/product/UpdateProducrController");
const router = (0, express_1.Router)();
exports.router = router;
const upload = (0, multer_1.default)(multer_2.default.upload("./tmp"));
//Rotas Status
router.get('/summary', new status_1.GetStatus().status);
//Rotas USER 
router.post('/user.auth.login', new AuthUserController_1.AuthUserController().handle);
router.post('/user.userCreate', new CreateUserController_1.CreateUserController().handle);
router.get('/user.auth.userSession', isAuthenticated_1.isAuthenticated, new DetailUserController_1.DetailUserController().handle);
router.get('/user.users', validateSession_1.validateSession, new ListUsersController_1.ListUsersController().getUser);
router.delete('/user.userRemove', validateSession_1.validateSession, new DeleteUserController_1.DeleteUserController().deleteUserById);
router.put('/user.UpdateUser', validateSession_1.validateSession, new UpdateUserConttroller_1.UpdateUserController().UpdateUser);
// Rotas CATEGORIE
router.post('/category.CategoryCreate', validateSession_1.validateSession, new CreateCetegoryController_1.CreateCategoryController().handle);
router.get('/category.categories', validateSession_1.validateSession, new ListCategoryController_1.ListCategoryController().getCategory);
router.get('/category.category', validateSession_1.validateSession, new DetailCategoryController_1.DetailCategoryController().handle);
// Rotas PRODUCTS
router.post('/product.productCreate', validateSession_1.validateSession, upload.single('file'), new CreateProductController_1.CreateProductController().createProduct);
router.get('/product.products', validateSession_1.validateSession, new ListProductByCategoryController_1.ListProductByCategoryController().getProductsByCategory);
router.put('/product.updateProduct', validateSession_1.validateSession, new UpdateProducrController_1.UpdateProductController().updateProductById);
router.delete('/product.productRemove', validateSession_1.validateSession, new DeleteProductController_1.DeleteProductController().deleteProductById);
