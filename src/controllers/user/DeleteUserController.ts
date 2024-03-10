import {Request, Response} from 'express';
import { DeleteUserService } from '../../services/user/DeleteUserService'

class DeleteUserController{ //recebe os parms e passa para os services
    async deleteUserById(req:Request, res: Response){
    const {inId} =  req.body;
    
    const createUserService = new DeleteUserService();
    const ObjReturn = await createUserService.deleteUserById({inId});

    return res.status(200).json(ObjReturn);
 
    }
}

export {DeleteUserController}