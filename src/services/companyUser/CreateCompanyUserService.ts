import { PrismaClient } from '@prisma/client';

interface CompanyServiceRequest {
    user_id: number;
    company_id: number;
}

const prisma = new PrismaClient();

class CreateCompanyUserService {
    async createCompanyUser({ user_id, company_id }: CompanyServiceRequest) {
        try {
            // Verificar se o usuário existe
            const userExist = await prisma.user.findFirst({
                where: {
                    id: user_id
                }
            });

            if (!userExist) {
                throw new Error('Usuário especificado não existe!');
            }

            // Verificar se a empresa existe
            const companyExist = await prisma.company.findFirst({
                where: {
                    id: company_id
                }
            });

            if (!companyExist) {
                throw new Error('Empresa especificada não existe!');
            }

            // Verificar se o usuário já está vinculado à empresa
            const userCompanyExist = await prisma.companyUser.findFirst({
                where: {
                    AND: [
                        { user_id: user_id },
                        { company_id: company_id }
                    ]
                }
            });

            if (userCompanyExist) {
                throw new Error('Usuário já está vinculado a esta empresa!');
            }

            // Se todas as verificações passarem, criar o vínculo entre usuário e empresa
            const newCompanyUser = await prisma.companyUser.create({
                data: {
                    user_id: user_id,
                    company_id: company_id
                }
            });

            return newCompanyUser;
        } catch (error) {
            throw new Error(error.message);
        } finally {
            await prisma.$disconnect();
        }
    }
}

export { CreateCompanyUserService };
