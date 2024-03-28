import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

interface CategoryRequest {
    company_id: string;
}

class ListCategoryService {
    async execute({ company_id }: CategoryRequest) {
        if (!company_id) {
            throw new Error("Informe a empresa!");
        }

        try {
            const company = await prismaClient.company.findFirst({
                where: {
                    id: parseInt(company_id)
                }
            });

            if (!company) {
                throw new Error("Empresa não encontrada.");
            }

            const categories = await prismaClient.category.findMany({
                where: {
                    company_id: parseInt(company_id)
                }
            });

            return {
                companyCategory: {
                    ...company,
                    categories: categories
                }
            };
        } catch (err) {
            throw new Error("Erro ao buscar categorias: " + err.message);
        } finally {
            await prismaClient.$disconnect(); // Sempre fechamos a conexão com o banco de dados.
        }
    }
}

export { ListCategoryService };
