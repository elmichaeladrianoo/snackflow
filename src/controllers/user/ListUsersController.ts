import {Request, Response} from 'express';
import {ListUsersService} from '../../services/user/ListUsersService';


class ListUsersController{
    async  getUser(req:Request,res:Response){

        const listUsersService = new ListUsersService();

        const users              = await listUsersService.execute();

        return res.json(users)




            
    }

}

export {ListUsersController}