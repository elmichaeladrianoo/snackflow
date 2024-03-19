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
const CreateCompanyController_1 = require("./controllers/company/CreateCompanyController");
const ListCompanyController_1 = require("./controllers/company/ListCompanyController");
const UpdateCompanyController_1 = require("./controllers/company/UpdateCompanyController");
const CreateCompanyUserController_1 = require("./controllers/CompanyUser/CreateCompanyUserController");
const ListCompanyFromUserController_1 = require("./controllers/CompanyUser/ListCompanyFromUserController");
const router = (0, express_1.Router)();
exports.router = router;
//Rotas Status
router.get('/summary', new status_1.GetStatus().status);
//Rotas USER 
router.post('/user.userCreate', validateFieldsMiddleware_1.isMaskValid, new CreateUserController_1.CreateUserController().handle);
router.post('/user.auth.login', new AuthUserController_1.AuthUserController().handle);
router.get('/user.auth.userSession', (0, isAuthenticated_1.isAuthenticated)(false), new DetailUserController_1.DetailUserController().handle);
router.get('/user.users', (0, isAuthenticated_1.isAuthenticated)(false), new ListUsersController_1.ListUsersController().getUser);
router.delete('/user.userRemove', (0, isAuthenticated_1.isAuthenticated)(false), new DeleteUserController_1.DeleteUserController().deleteUserById);
router.put('/user.UpdateUser', (0, isAuthenticated_1.isAuthenticated)(false), new UpdateUserConttroller_1.UpdateUserController().UpdateUser);
// Rotas CATEGORIE
router.post('/category.CategoryCreate', (0, isAuthenticated_1.isAuthenticated)(true), new CreateCategoryController_1.CreateCategoryController().handle);
router.get('/category.categories', (0, isAuthenticated_1.isAuthenticated)(false), new ListCategoryController_1.ListCategoryController().getCategory);
router.get('/category.category', (0, isAuthenticated_1.isAuthenticated)(false), new DetailCategoryController_1.DetailCategoryController().handle);
router.put('/category.updateCategory', (0, isAuthenticated_1.isAuthenticated)(false), new UpdateCategoryController_1.UpdateCategoryController().updateCategory);
router.delete('/category.CategoryRemove', (0, isAuthenticated_1.isAuthenticated)(false), new DeleteCategoryController_1.DeleteCategoryController().deleteCategoryById);
// Rotas PRODUCTS
router.post('/product.productCreate', (0, isAuthenticated_1.isAuthenticated)(false), new CreateProductController_1.CreateProductController().createProduct);
router.get('/product.products', (0, isAuthenticated_1.isAuthenticated)(false), new ListProductByCategoryController_1.ListProductByCategoryController().getProductsByCategory);
router.put('/product.updateProduct', (0, isAuthenticated_1.isAuthenticated)(false), new UpdateProducrController_1.UpdateProductController().updateProductById);
router.delete('/product.productRemove', (0, isAuthenticated_1.isAuthenticated)(false), new DeleteProductController_1.DeleteProductController().deleteProductById);
//Rotas Companies
router.post('/company.companyCreate', (0, isAuthenticated_1.isAuthenticated)(false), new CreateCompanyController_1.CreateCompanyController().createCompany);
router.get('/company.companies', (0, isAuthenticated_1.isAuthenticated)(false), new ListCompanyController_1.ListCompanyController().listCompany);
router.put('/company.updateCompany', (0, isAuthenticated_1.isAuthenticated)(false), new UpdateCompanyController_1.UpdateCompanyController().UpdateUser);
//RotasCompanyUser
router.post('/companyUser.linkUserCompany', isAuthenticated_1.isAuthenticated, new CreateCompanyUserController_1.CreateCompanyUserController().createCompanyUser);
router.get('/companyUser.companyUser', isAuthenticated_1.isAuthenticated, new ListCompanyFromUserController_1.ListCompanyFromUserController().listCompanyUser);
