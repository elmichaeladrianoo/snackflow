import prismaClient from "../../prisma";
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

interface AuthRequest {
    email: string;
    password: string;
}

class AuthUserService {
    async execute({ email, password }: AuthRequest) {
        try {
            // Validar se o email existe  
            const user = await prismaClient.user.findFirst({
                where: {
                    email: email
                }
            });

            if (!user) {
                throw new Error("Usuário ou senha incorreto(s)");
            }

            // Validar a senha
            const passwordMatch = await compare(password, user.password);

            if (!passwordMatch) {
                throw new Error("Usuário ou senha incorreto(s)");
            }

            // Gerar token JWT e devolver os dados do usuário
            const token = sign({
                name: user.name,
                email: user.email
            }, process.env.JWT_SECRET || '', // Corrigido: adicionei uma string vazia como fallback
                {
                    subject: user.id.toString(), // Corrigido: converti para string
                    expiresIn: '30d'
                }
            );

            return {
                id: user.id,
                name: user.name,
                email: user.email,
                token: token
            };
        } catch (error) {
            throw new Error("Erro ao autenticar usuário: " + error.message);
        }finally{

            prismaClient.$disconnect();
        }
    }
}

export { AuthUserService };
