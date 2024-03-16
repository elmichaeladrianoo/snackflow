import { Request, Response } from 'express';
import { CreateUserService } from '../../services/user/CreateUserService';
import { CpfFormat } from '../../util/dataValidator';

class CreateUserController { // Recebe os parâmetros e passa para os serviços
    async handle(req: Request, res: Response) {
        try {
            const { name, email, password, cpf, phone, address } = req.body;

            // Formatar o CPF antes de passá-lo para o serviço
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
        } catch (err) {
            // Se ocorrer algum erro, retornar uma mensagem de erro
            console.error("Erro ao criar usuário:", err);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    }
}

export { CreateUserController };
