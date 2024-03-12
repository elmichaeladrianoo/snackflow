import {Request, Response} from 'express';
import { CreateUserService } from '../../services/user/CreateUserService'

class CreateUserController{ //recebe os parms e passa para os services
    async handle(req:Request, res: Response){
    const {name, email, password, cpf, phone,address} =  req.body;
    
    const createUserService = new CreateUserService();
    const user = await createUserService.execute({
        name, 
        email,
        password,
        cpf,
        phone,
        address


    });


    return res.json(user);
    }
}

export {CreateUserController}