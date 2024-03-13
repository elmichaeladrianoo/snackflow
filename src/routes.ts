import { Router, Request, Response} from 'express';
import multer from 'multer';
import { GetStatus} from './controllers/status/status';
import { CreateUserController} from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';
import { ListUsersController } from './controllers/user/ListUsersController';
import { isAuthenticated} from './middlewares/isAuthenticated';
import { validateSession } from './middlewares/validateSession';
import { DeleteUserController } from './controllers/user/DeleteUserController';
import { UpdateUserController } from './controllers/user/UpdateUserConttroller';
import { CreateCategoryController } from './controllers/category/CreateCetegoryController';
import { ListCategoryController } from './controllers/category/ListCategoryController'
import { DetailCategoryController } from './controllers/category/DetailCategoryController';
import { CreateProductController } from './controllers/product/CreateProductController';
import { ListProductByCategoryController } from './controllers/product/ListProductByCategoryController'
import uploadConfig from './config/multer'
import { DeleteProductController } from './controllers/product/DeleteProductController';


const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));
//Rotas Status

router.get('/summary', new GetStatus().status)

//Rotas USER 
router.post('/user.auth.login', new AuthUserController().handle)

router.post('/user.userCreate', new CreateUserController().handle)

router.get('/user.auth.userSession', isAuthenticated,  new DetailUserController().handle)

router.get('/user.users', validateSession , new ListUsersController().getUser)

router.delete('/user.userRemove', validateSession , new DeleteUserController().deleteUserById)

router.put('/user.UpdateUser',validateSession, new UpdateUserController().UpdateUser )


// Rotas CATEGORIE
router.post('/category.CategoryCreate',validateSession, new CreateCategoryController().handle)
router.get('/category.categories', validateSession, new ListCategoryController().getCategory)
router.get('/category.category',validateSession, new DetailCategoryController().handle)

// Rotas PRODUCTS
router.post('/product.productCreate',validateSession, upload.single('file'), new CreateProductController().createProduct)
router.get('/product.products',validateSession, new ListProductByCategoryController().getProductsByCategory )
router.delete('/product.productRemove',validateSession, new DeleteProductController().deleteProductById)

export{router};



