import prismaClient from "../../prisma";
import { hash } from 'bcryptjs';

interface UserRequest {
    name: string;
    email: string;
    password: string;
    cpf: string;
    phone: string;
    address: string;
}

class CreateUserService {
    async execute({ name, email, password, cpf, phone, address }: UserRequest) {
        try {
            if (name.length < 5) {
                throw new Error("Nome inválido!");
            }

            if (!email.includes('@')) { // Verificar se o e-mail é válido
                throw new Error("E-mail incorreto!");
            }

            const userAlreadyExists = await prismaClient.user.findFirst({
                where: {
                    OR: [
                        { email: email },
                        { cpf: cpf }
                    ]
                }
            });

            if (userAlreadyExists) {
                throw new Error("CPF/E-mail já cadastrado!");
            }

            const passwordHash = await hash(password, 8);

            const user = await prismaClient.user.create({
                data: {
                    name: name,
                    email: email,
                    password: passwordHash,
                    cpf: cpf,
                    phone: phone,
                    address: address,
                },
                select: {
                    id: true,
                    created_at: true,
                }
            });

            return user;
        } catch (err) {
            throw err; // Permitir que o erro original seja propagado
        }finally{

            prismaClient.$disconnect();
        }
    }
}

export { CreateUserService };
