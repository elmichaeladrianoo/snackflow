import { Router, Request, Response } from 'express';
import { GetStatus } from './controllers/status/status';
import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';
import { DeleteUserController } from './controllers/user/DeleteUserController';
import { UpdateUserController } from './controllers/user/UpdateUserConttroller';
import { ListUsersController } from './controllers/user/ListUsersController';
import { isAuthenticated } from './middlewares/isAuthenticated';
import { isMaskValid } from './middlewares/validateFieldsMiddleware';
import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoryController } from './controllers/category/ListCategoryController';
import { DetailCategoryController } from './controllers/category/DetailCategoryController';
import { UpdateCategoryController } from './controllers/category/UpdateCategoryController';
import { CreateProductController } from './controllers/product/CreateProductController';
import { ListProductByCategoryController } from './controllers/product/ListProductByCategoryController';
import { DeleteProductController } from './controllers/product/DeleteProductController';
import { UpdateProductController } from './controllers/product/UpdateProducrController';
import { DeleteCategoryController } from './controllers/category/DeleteCategoryController';
import { CreateCompanyController } from './controllers/company/CreateCompanyController';
import { ListCompanyController } from './controllers/company/ListCompanyController';
import { UpdateCompanyController } from './controllers/company/UpdateCompanyController';
import { CreateCompanyUserController } from './controllers/CompanyUser/CreateCompanyUserController';
import { ListCompanyFromUserController } from './controllers/CompanyUser/ListCompanyFromUserController';
import { CreateOrderController } from './controllers/order/CreateOrderController';
import { DeleteOrderController } from './controllers/order/DeleteOrderController';
import { CreateOrderItemController } from './controllers/orderItem/CreateOrderItemController';
import { DeleteOrderItemController } from './controllers/orderItem/DeleteOrderItemController';
import { ListOrderController } from './controllers/order/ListOrderController';
import { ListOrderItensController } from './controllers/orderItem/ListOrderItensController';
import { DeleteCompanyUserControlle } from './controllers/CompanyUser/DeleteCompanyUserController';
import { CloseOrderController } from './controllers/order/CloseOrderController';
import { FinishOrderController } from './controllers/order/FinishOrderController'
import { CreateCommandController } from './controllers/Command/CreateCommandController';
import { UpdateCommandController } from './controllers/Command/UpdateCommandController';
import { ListCommandByTableController } from './controllers/Command/ListCommandByTableController';
import { ListCommandByCompanyController } from './controllers/Command/ListCommandByCompanyController';
import { UpdateStatusCommandController } from './controllers/Command/UpdateStatusCommandController';
import { CreateTableController } from './controllers/table/CreateTableController';
import { ListTableByCompanyService } from './services/table/ListTableByCompanyService';
import { ListTableByCompanyController } from './controllers/table/ListTableByCompanyController';

const router = Router();

// Rotas Status
router.get('/summary', new GetStatus().status);

// Rotas USER
router.post('/user.userCreate', isMaskValid, new CreateUserController().handle);
router.post('/user.auth.login', new AuthUserController().handle);
router.get('/user.auth.userSession', isAuthenticated(false), new DetailUserController().handle);
router.get('/user.users', isAuthenticated(false), new ListUsersController().getUser);
router.delete('/user.userRemove', isAuthenticated(false), new DeleteUserController().deleteUserById);
router.put('/user.UpdateUser', isAuthenticated(false), new UpdateUserController().UpdateUser);

// Rotas CATEGORIE
router.post('/category.CategoryCreate', isAuthenticated(true), new CreateCategoryController().handle);
router.get('/category.categories', isAuthenticated(false), new ListCategoryController().getCategory);
router.get('/category.category', isAuthenticated(false), new DetailCategoryController().handle);
router.put('/category.updateCategory', isAuthenticated(false), new UpdateCategoryController().updateCategory);
router.delete('/category.CategoryRemove', isAuthenticated(false), new DeleteCategoryController().deleteCategoryById);

// Rotas PRODUCTS
router.post('/product.productCreate', isAuthenticated(false), new CreateProductController().createProduct);
router.get('/product.products', isAuthenticated(false), new ListProductByCategoryController().getProductsByCategory);
router.put('/product.updateProduct', isAuthenticated(false), new UpdateProductController().updateProductById);
router.delete('/product.productRemove', isAuthenticated(false), new DeleteProductController().deleteProductById);

// Rotas Companies
router.post('/company.companyCreate', isAuthenticated(false), new CreateCompanyController().createCompany);
router.get('/company.companies', isAuthenticated(false), new ListCompanyController().listCompany);
router.put('/company.updateCompany', isAuthenticated(false), new UpdateCompanyController().UpdateUser);

// RotasCompanyUser
router.post('/companyUser.linkUserCompany', isAuthenticated(false), new CreateCompanyUserController().createCompanyUser);
router.get('/companyUser.companyUser', isAuthenticated(false), new ListCompanyFromUserController().listCompanyUser);
router.delete('companyUser.userRemove',isAuthenticated(false), new DeleteCompanyUserControlle().deleteUserCompany )

// Rotas Order
router.post('/order.orderCreate', isAuthenticated(true), new CreateOrderController().createOrder);
router.get('order.orders', isAuthenticated(false), new ListOrderController().listOrder)
router.delete('/order.orderRemove', isAuthenticated(false), new DeleteOrderController().DeleteOrder);
router.put('/order.orderClose',isAuthenticated(false), new CloseOrderController().closeOrder  )
router.put('/order.orderFinish', isAuthenticated(false), new FinishOrderController().finishOrder)


// Rotas Item
router.post('/order.orderItemAdd', isAuthenticated(false), new CreateOrderItemController().addItem);
router.get('/order.orderItens',isAuthenticated(false), new ListOrderItensController().listOrderItens)
router.delete('/order.orderItemRemove', isAuthenticated(false), new DeleteOrderItemController().DeleteOrderItem)

// Rotas Command
router.post('/command.commandCreate',isAuthenticated(false), new CreateCommandController().commandCreate)
router.put('/command.updateCommand', isAuthenticated(false), new UpdateCommandController().updateCommand)
router.get('/command.commandsByTable', isAuthenticated(false), new ListCommandByTableController().listCommand)
router.get('/command.commandsByCompany/:company_id', isAuthenticated(false), new ListCommandByCompanyController().listCommand)
router.put('/command.updateStatus', isAuthenticated(false), new UpdateStatusCommandController().updatestatus)

// Rotas Table
router.post('/table.tableCreate', isAuthenticated(false), new CreateTableController().createTable)
router.get('./table.tables',isAuthenticated(false),new ListTableByCompanyController().listTable )

export { router };
