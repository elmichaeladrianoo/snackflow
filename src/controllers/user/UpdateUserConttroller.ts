import { Request, Response } from 'express';
import { UpdateUserService } from '../../services/user/UpdateUserService';

class UpdateUserController {
    async UpdateUser(req: Request, res: Response) {
       
            // Obtém o ID do usuário a ser atualizado dos parâmetros da requisição
            const id = req.body.id; // Assume-se que o ID está presente no corpo da requisição

            // Obtém os novos dados do corpo da requisição
            const newData = req.body;

            // Cria uma instância da classe UpdateUserService
            const updateUserService = new UpdateUserService();

            // Chama o método updateUserById para atualizar o usuário pelo ID fornecido
            const updatedUser = await updateUserService.updateUserById(id, newData);

            // Retorna a resposta com o usuário atualizado
            return res.json(updatedUser);
    }
}

export { UpdateUserController };
