import { PrismaClient } from '@prisma/client';

interface UserRequest {
    inId: number;
}

const prisma = new PrismaClient();

class DeleteUserService {
    async deleteUserById(inId: UserRequest) {
        try {
            const user = await prisma.user.delete({
                where: {
                    id: inId.inId, // Acessando o ID diretamente
                },
            });
            //console.log('Usuário excluído:', user);

            const ObjReturn: { [status: string]: any } = {
                nome: user.name,
                id: user.id,
                status: "Removido",
            }


            return ObjReturn;


        } catch (err) {
            throw new Error(err)
        } finally {
            await prisma.$disconnect();
        }
    }
}

export { DeleteUserService };
