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
const CreateOrderController_1 = require("./controllers/order/CreateOrderController");
const DeleteOrderController_1 = require("./controllers/order/DeleteOrderController");
const CreateOrderItemController_1 = require("./controllers/orderItem/CreateOrderItemController");
const DeleteOrderItemController_1 = require("./controllers/orderItem/DeleteOrderItemController");
const ListOrderController_1 = require("./controllers/order/ListOrderController");
const ListOrderItensController_1 = require("./controllers/orderItem/ListOrderItensController");
const DeleteCompanyUserController_1 = require("./controllers/CompanyUser/DeleteCompanyUserController");
const CloseOrderController_1 = require("./controllers/order/CloseOrderController");
const FinishOrderController_1 = require("./controllers/order/FinishOrderController");
const CreateCommandController_1 = require("./controllers/Command/CreateCommandController");
const UpdateCommandController_1 = require("./controllers/Command/UpdateCommandController");
const ListCommandByTableController_1 = require("./controllers/Command/ListCommandByTableController");
const ListCommandByCompanyController_1 = require("./controllers/Command/ListCommandByCompanyController");
const UpdateStatusCommandController_1 = require("./controllers/Command/UpdateStatusCommandController");
const router = (0, express_1.Router)();
exports.router = router;
// Rotas Status
router.get('/summary', new status_1.GetStatus().status);
// Rotas USER
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
// Rotas Companies
router.post('/company.companyCreate', (0, isAuthenticated_1.isAuthenticated)(false), new CreateCompanyController_1.CreateCompanyController().createCompany);
router.get('/company.companies', (0, isAuthenticated_1.isAuthenticated)(false), new ListCompanyController_1.ListCompanyController().listCompany);
router.put('/company.updateCompany', (0, isAuthenticated_1.isAuthenticated)(false), new UpdateCompanyController_1.UpdateCompanyController().UpdateUser);
// RotasCompanyUser
router.post('/companyUser.linkUserCompany', (0, isAuthenticated_1.isAuthenticated)(false), new CreateCompanyUserController_1.CreateCompanyUserController().createCompanyUser);
router.get('/companyUser.companyUser', (0, isAuthenticated_1.isAuthenticated)(false), new ListCompanyFromUserController_1.ListCompanyFromUserController().listCompanyUser);
router.delete('companyUser.userRemove', (0, isAuthenticated_1.isAuthenticated)(false), new DeleteCompanyUserController_1.DeleteCompanyUserControlle().deleteUserCompany);
// Rotas Order
router.post('/order.orderCreate', (0, isAuthenticated_1.isAuthenticated)(true), new CreateOrderController_1.CreateOrderController().createOrder);
router.get('order.orders', (0, isAuthenticated_1.isAuthenticated)(false), new ListOrderController_1.ListOrderController().listOrder);
router.delete('/order.orderRemove', (0, isAuthenticated_1.isAuthenticated)(false), new DeleteOrderController_1.DeleteOrderController().DeleteOrder);
router.put('/order.orderClose', (0, isAuthenticated_1.isAuthenticated)(false), new CloseOrderController_1.CloseOrderController().closeOrder);
router.put('/order.orderFinish', (0, isAuthenticated_1.isAuthenticated)(false), new FinishOrderController_1.FinishOrderController().finishOrder);
// Rotas Item
router.post('/order.orderItemAdd', (0, isAuthenticated_1.isAuthenticated)(false), new CreateOrderItemController_1.CreateOrderItemController().addItem);
router.get('/order.orderItens', (0, isAuthenticated_1.isAuthenticated)(false), new ListOrderItensController_1.ListOrderItensController().listOrderItens);
router.delete('/order.orderItemRemove', (0, isAuthenticated_1.isAuthenticated)(false), new DeleteOrderItemController_1.DeleteOrderItemController().DeleteOrderItem);
// Rotas Command
router.post('/command.commandCreate', (0, isAuthenticated_1.isAuthenticated)(false), new CreateCommandController_1.CreateCommandController().commandCreate);
router.put('/command.updateCommand', (0, isAuthenticated_1.isAuthenticated)(false), new UpdateCommandController_1.UpdateCommandController().updateCommand);
router.get('/command.commandsByTable', (0, isAuthenticated_1.isAuthenticated)(false), new ListCommandByTableController_1.ListCommandByTableController().listCommand);
router.get('/command.commandsByCompany/:company_id', (0, isAuthenticated_1.isAuthenticated)(false), new ListCommandByCompanyController_1.ListCommandByCompanyController().listCommand);
router.put('/command.updateStatus', (0, isAuthenticated_1.isAuthenticated)(false), new UpdateStatusCommandController_1.UpdateStatusCommandController().updatestatus);
