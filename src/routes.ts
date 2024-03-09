import { Router, Request, Response} from 'express';
import {GetStatus} from './controllers/status/status';
import {CreateUserController} from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';
import {isAuthenticated} from './middlewares/isAuthenticated';
const router = Router();

//Rotas Status

router.get('/summary', new GetStatus().status)

//Rotas USER 
router.post('/session', new AuthUserController().handle)

router.post('/users', new CreateUserController().handle)

router.get('/user', isAuthenticated,  new DetailUserController().handle)

export{router};