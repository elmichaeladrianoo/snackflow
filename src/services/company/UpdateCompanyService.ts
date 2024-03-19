import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

class UpdateCompanyService {
    async updateCompany(id: number, newData: Prisma.CompanyUpdateInput) {
        try {
            // Verifica se o campo a ser atualizado é o e-mail ou CNPJ
            if ('email' in newData || 'CNPJ' in newData) {
                // Verifica se o novo e-mail ou CNPJ já está sendo usado por outra empresa
                const existingCompany = await prisma.company.findFirst({
                    where: {
                        OR: [
                            { email: newData.email as string }, // Força a tipagem para string
                            { CNPJ: newData.CNPJ as string }
                        ],
                        NOT: {
                            id: id // Exclui o próprio usuário da consulta
                        }
                    }
                });
                if (existingCompany) {
                    // Se o e-mail ou CNPJ já está em uso, lança um erro
                    throw new Error('E-mail ou CNPJ em uso!');
                }
            }

            // Remove o email e CNPJ do objeto newData para evitar sua atualização
            delete newData.email;
            delete newData.CNPJ;

            // Obtendo a data e hora atuais
            const now = new Date();

            // Atualizando a empresa incluindo a data atual
            const updatedCompany = await prisma.company.update({
                where: { id: id },
                data: {
                    ...newData,
                    updated_at: now
                }
            });

            const ObjReturn = {
                status: "Atualizado",
                conteudo: { updatedCompany }
            };
            return ObjReturn;
        } catch (error) {
            // Se ocorrer algum erro, retorna uma resposta de erro
            throw new Error(error.message); // Alterado para retornar apenas a mensagem de erro
        } finally {
            await prisma.$disconnect();
        }
    }
}

export { UpdateCompanyService };
