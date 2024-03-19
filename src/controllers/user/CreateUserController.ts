import { Request, Response } from 'express';
import { CreateUserService } from '../../services/user/CreateUserService';
import { CpfFormat } from '../../util/dataValidator';

class CreateUserController { 
    async handle(req: Request, res: Response) {
       
            const { name, email, password, cpf, phone, address } = req.body;
            const cpfw = CpfFormat(cpf);

            const createUserService = new CreateUserService();
            const user = await createUserService.execute({
                name,
                email,
                password,
                cpf:cpfw,
                phone,
                address
            });

            return res.json(user);
       
    }
}

export { CreateUserController };
