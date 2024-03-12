import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class UpdateUserService {
    async updateUserById(id: number, newData: Prisma.UserUpdateInput) {
        try {
            // Verifica se o campo a ser atualizado é o e-mail
            if ('email' in newData) {
                // Verifica se o novo e-mail já está sendo usado por outro usuário
                const existingUser = await prisma.user.findFirst({
                    where: {
                        email: newData.email as string, // Força a tipagem para string
                        NOT: {
                            id: id // Exclui o próprio usuário da consulta
                        }
                    }
                });
                if (existingUser) {
                    // Se o e-mail já está em uso, lança um erro
                    throw new Error('E-mail em uso!');
                }
            }

            // Obtendo a data e hora atuais
            const now = new Date();

            // Atualizando o usuário incluindo a data atual
            const updatedUser = await prisma.user.update({
                where: { id: id },
                data: {
                    ...newData,
                    updated_at: now
                }
            });

            const ObjReturn = {
                status: "Atualizado",
                conteudo: { updatedUser }
            };
            return ObjReturn;
        } catch (error) {
            // Se ocorrer algum erro, retorna uma resposta de erro
            throw new Error(error);
        } finally {
            await prisma.$disconnect();
        }
    }
}

export { UpdateUserService };
