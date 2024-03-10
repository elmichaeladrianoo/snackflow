import { Router, Request, Response} from 'express';
import { GetStatus} from './controllers/status/status';
import { CreateUserController} from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';
import { ListUsersController } from './controllers/user/ListUsersController';
import { isAuthenticated} from './middlewares/isAuthenticated';
import { validateSession } from './middlewares/validateSession';
import { DeleteUserController } from './controllers/user/DeleteUserController';
import { UpdateUserController } from './controllers/user/UpdateUserConttroller';

const router = Router();

//Rotas Status

router.get('/summary', new GetStatus().status)

//Rotas USER 
router.post('/user.auth.login', new AuthUserController().handle)

router.post('/user.userCreate', new CreateUserController().handle)

router.get('/user.auth.userSession', isAuthenticated,  new DetailUserController().handle)

router.get('/user.users', validateSession , new ListUsersController().getUser)

router.delete('/user.userRemove', validateSession , new DeleteUserController().deleteUserById)

router.put('/user.UpdateUser',validateSession, new UpdateUserController().UpdateUser )
export{router};



