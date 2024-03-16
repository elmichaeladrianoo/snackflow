import { Router, Request, Response}         from 'express';
import { GetStatus}                         from './controllers/status/status';
import { CreateUserController}              from './controllers/user/CreateUserController';
import { AuthUserController }               from './controllers/user/AuthUserController';
import { DetailUserController }             from './controllers/user/DetailUserController';
import { DeleteUserController }             from './controllers/user/DeleteUserController';
import { UpdateUserController }             from './controllers/user/UpdateUserConttroller';
import { ListUsersController }              from './controllers/user/ListUsersController';
import { isAuthenticated}                   from './middlewares/isAuthenticated';
import { isMaskValid }                  from './middlewares/validateFieldsMiddleware';
import { CreateCategoryController }         from './controllers/category/CreateCategoryController';
import { ListCategoryController }           from './controllers/category/ListCategoryController'
import { DetailCategoryController }         from './controllers/category/DetailCategoryController';
import { UpdateCategoryController }         from './controllers/category/UpdateCategoryController';
import { CreateProductController }          from './controllers/product/CreateProductController';
import { ListProductByCategoryController }  from './controllers/product/ListProductByCategoryController'
import { DeleteProductController }          from './controllers/product/DeleteProductController';
import { UpdateProductController }          from './controllers/product/UpdateProducrController';
import { DeleteCategoryController } from './controllers/category/DeleteCategoryController';

const router = Router();

//Rotas Status
router.get('/summary', new GetStatus().status)

//Rotas USER 
router.post('/user.userCreate',isMaskValid, new CreateUserController().handle)
router.post('/user.auth.login', new AuthUserController().handle)
router.get('/user.auth.userSession', isAuthenticated,  new DetailUserController().handle)
router.get('/user.users', isAuthenticated , new ListUsersController().getUser)
router.delete('/user.userRemove', isAuthenticated , new DeleteUserController().deleteUserById)
router.put('/user.UpdateUser',isAuthenticated, new UpdateUserController().UpdateUser )

// Rotas CATEGORIE
router.post('/category.CategoryCreate',isAuthenticated, new CreateCategoryController().handle)
router.get('/category.categories', isAuthenticated, new ListCategoryController().getCategory)
router.get('/category.category',isAuthenticated, new DetailCategoryController().handle)
router.put('/category.updateCategory',isAuthenticated, new UpdateCategoryController().updateCategory )
router.delete('/category.CategoryRemove',isAuthenticated, new DeleteCategoryController().deleteCategoryById)

// Rotas PRODUCTS
router.post('/product.productCreate',isAuthenticated, new CreateProductController().createProduct)
router.get('/product.products',isAuthenticated, new ListProductByCategoryController().getProductsByCategory )
router.put('/product.updateProduct', isAuthenticated, new UpdateProductController().updateProductById)
router.delete('/product.productRemove',isAuthenticated, new DeleteProductController().deleteProductById)

export{router};



