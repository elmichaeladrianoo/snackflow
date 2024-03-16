"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const status_1 = require("./controllers/status/status");
const CreateUserController_1 = require("./controllers/user/CreateUserController");
const AuthUserController_1 = require("./controllers/user/AuthUserController");
const DetailUserController_1 = require("./controllers/user/DetailUserController");
const DeleteUserController_1 = require("./controllers/user/DeleteUserController");
const UpdateUserConttroller_1 = require("./controllers/user/UpdateUserConttroller");
const ListUsersController_1 = require("./controllers/user/ListUsersController");
const isAuthenticated_1 = require("./middlewares/isAuthenticated");
const validateFieldsMiddleware_1 = require("./middlewares/validateFieldsMiddleware");
const CreateCategoryController_1 = require("./controllers/category/CreateCategoryController");
const ListCategoryController_1 = require("./controllers/category/ListCategoryController");
const DetailCategoryController_1 = require("./controllers/category/DetailCategoryController");
const UpdateCategoryController_1 = require("./controllers/category/UpdateCategoryController");
const CreateProductController_1 = require("./controllers/product/CreateProductController");
const ListProductByCategoryController_1 = require("./controllers/product/ListProductByCategoryController");
const DeleteProductController_1 = require("./controllers/product/DeleteProductController");
const UpdateProducrController_1 = require("./controllers/product/UpdateProducrController");
const DeleteCategoryController_1 = require("./controllers/category/DeleteCategoryController");
const router = (0, express_1.Router)();
exports.router = router;
//Rotas Status
router.get('/summary', new status_1.GetStatus().status);
//Rotas USER 
router.post('/user.userCreate', validateFieldsMiddleware_1.isMaskValid, new CreateUserController_1.CreateUserController().handle);
router.post('/user.auth.login', new AuthUserController_1.AuthUserController().handle);
router.get('/user.auth.userSession', isAuthenticated_1.isAuthenticated, new DetailUserController_1.DetailUserController().handle);
router.get('/user.users', isAuthenticated_1.isAuthenticated, new ListUsersController_1.ListUsersController().getUser);
router.delete('/user.userRemove', isAuthenticated_1.isAuthenticated, new DeleteUserController_1.DeleteUserController().deleteUserById);
router.put('/user.UpdateUser', isAuthenticated_1.isAuthenticated, new UpdateUserConttroller_1.UpdateUserController().UpdateUser);
// Rotas CATEGORIE
router.post('/category.CategoryCreate', isAuthenticated_1.isAuthenticated, new CreateCategoryController_1.CreateCategoryController().handle);
router.get('/category.categories', isAuthenticated_1.isAuthenticated, new ListCategoryController_1.ListCategoryController().getCategory);
router.get('/category.category', isAuthenticated_1.isAuthenticated, new DetailCategoryController_1.DetailCategoryController().handle);
router.put('/category.updateCategory', isAuthenticated_1.isAuthenticated, new UpdateCategoryController_1.UpdateCategoryController().updateCategory);
router.delete('/category.CategoryRemove', isAuthenticated_1.isAuthenticated, new DeleteCategoryController_1.DeleteCategoryController().deleteCategoryById);
// Rotas PRODUCTS
router.post('/product.productCreate', isAuthenticated_1.isAuthenticated, new CreateProductController_1.CreateProductController().createProduct);
router.get('/product.products', isAuthenticated_1.isAuthenticated, new ListProductByCategoryController_1.ListProductByCategoryController().getProductsByCategory);
router.put('/product.updateProduct', isAuthenticated_1.isAuthenticated, new UpdateProducrController_1.UpdateProductController().updateProductById);
router.delete('/product.productRemove', isAuthenticated_1.isAuthenticated, new DeleteProductController_1.DeleteProductController().deleteProductById);
